import os
import sys
import json
import re
import requests
import time
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from datetime import datetime, timedelta
from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound, TranscriptsDisabled
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import isodate
import markdown
import logging
import random
from health import health_bp

# ロギングの設定
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# 環境変数の読み込み
load_dotenv()

app = Flask(__name__)
# CORSの設定 - すべてのオリジンからのリクエストを許可
CORS(app, origins="*", supports_credentials=True)

# ヘルスチェックBlueprintを登録
app.register_blueprint(health_bp)

# YouTube API設定
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

# 国コードから言語コードへのマッピング
COUNTRY_TO_LANGUAGE = {
    'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en',
    'JP': 'ja',
    'KR': 'ko',
    'CN': 'zh-Hans', 'TW': 'zh-Hant', 'HK': 'zh-Hant',
    'FR': 'fr',
    'DE': 'de',
    'IT': 'it',
    'ES': 'es',
    'RU': 'ru',
    'BR': 'pt',
    'MX': 'es',
    'IN': 'hi'
}

# プロキシリスト（無料のオープンプロキシ - 実際の運用では信頼性の高いプロキシサービスを使用することを推奨）
PROXY_LIST = [
    None,  # プロキシなしでの直接接続も試行
    # 以下は例示用のダミープロキシです。実際には機能しません。
    # 'http://proxy1.example.com:8080',
    # 'http://proxy2.example.com:8080',
]

# ISO8601形式の期間を分に変換
def parse_duration_to_minutes(duration_str):
    duration = isodate.parse_duration(duration_str)
    return duration.total_seconds() / 60

# 時間を読みやすい形式に変換
def format_time(seconds):
    minutes, seconds = divmod(int(seconds), 60)
    hours, minutes = divmod(minutes, 60)
    if hours > 0:
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    else:
        return f"{minutes:02d}:{seconds:02d}"

# 字幕取得関数（複数の方法を試す）
def get_transcript(video_id):
    """
    複数の方法を試して字幕を取得する関数
    """
    logger.info(f"Attempting to get transcript for video ID: {video_id}")
    
    # 複数の方法を試行
    methods = [
        get_transcript_with_scraping, # スクレイピングを優先
        get_transcript_with_api
    ]
    
    last_error = None
    for method in methods:
        try:
            result = method(video_id)
            if result and len(result) == 2 and not isinstance(result[0], str):
                # 字幕データが正しく取得できた場合
                transcript_text = "\n\n".join([f"[{format_time(item['start'])} - {format_time(item['start'] + item['duration'])}]\n{item['text']}" for item in result[0]])
                return transcript_text, result[1]
            elif result and len(result) == 2:
                # エラーメッセージが返された場合
                if not result[0].startswith("字幕は利用できません"):
                    return result
        except Exception as e:
            logger.warning(f"Method {method.__name__} failed: {str(e)}")
            last_error = e
    
    # すべての方法が失敗した場合
    error_message = f"字幕は利用できません。YouTubeの制限により取得できませんでした。({str(last_error) if last_error else '不明なエラー'})"
    logger.error(f"All transcript methods failed for {video_id}: {error_message}")
    return error_message, ""

# YouTube Transcript APIを使用して字幕を取得
def get_transcript_with_api(video_id):
    """
    YouTube Transcript APIを使用して字幕を取得する関数
    """
    logger.info(f"Trying to get transcript with YouTube Transcript API for {video_id}")
    
    try:
        # YouTube Data APIを使用して動画情報を取得
        video_info = youtube.videos().list(
            part='snippet',
            id=video_id
        ).execute()
        
        if not video_info['items']:
            logger.warning(f"Video not found: {video_id}")
            return "字幕は利用できません。動画が見つかりませんでした。", ""
        
        # 字幕を取得
        try:
            # 利用可能な字幕リストを取得
            transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
            
            # 利用可能な字幕言語を記録
            logger.info(f"Available transcript languages for {video_id}:")
            available_languages = []
            
            for transcript in transcript_list:
                available_languages.append(f"{transcript.language} (Generated: {transcript.is_generated})")
                logger.info(f"  - {transcript.language} (Generated: {transcript.is_generated})")
            
            # 日本語字幕を優先、なければ英語、それもなければ最初の字幕を使用
            ja_transcript = None
            en_transcript = None
            first_transcript = None
            
            for transcript in transcript_list:
                if first_transcript is None:
                    first_transcript = transcript
                
                if transcript.language_code.startswith('ja'):
                    ja_transcript = transcript
                    break
                
                if transcript.language_code.startswith('en'):
                    en_transcript = transcript
            
            selected_transcript = ja_transcript or en_transcript or first_transcript
            
            if selected_transcript:
                logger.info(f"Selected transcript: {selected_transcript.language}")
                
                # 字幕を取得
                transcript_data = selected_transcript.fetch()
                
                # 直接transcript_dataを返す（後で整形）
                return transcript_data, selected_transcript.language_code
            else:
                logger.warning(f"No suitable transcripts found for video {video_id}")
                return "字幕は利用できません。適切な字幕が見つかりませんでした。", ""
                
        except (NoTranscriptFound, TranscriptsDisabled) as e:
            logger.warning(f"No transcript available via API: {str(e)}")
            return "字幕は利用できません。この動画には字幕がありません。", ""
        except Exception as e:
            logger.error(f"Error getting transcript via API: {str(e)}")
            raise
            
    except Exception as e:
        logger.error(f"Error in get_transcript_with_api: {str(e)}")
        raise

# スクレイピングを使用して字幕を取得（バックアップ方法）
def get_transcript_with_scraping(video_id):
    """
    スクレイピングを使用して字幕を取得する関数（APIが失敗した場合のバックアップ）
    """
    logger.info(f"Trying to get transcript with scraping for {video_id}")
    
    # プロキシをランダムに選択（Noneを含む）
    proxy = random.choice(PROXY_LIST)
    proxies = {'http': proxy, 'https': proxy} if proxy else None
    
    try:
        # YouTubeの動画ページにアクセス
        url = f"https://www.youtube.com/watch?v={video_id}"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
        }
        
        # プロキシを使用してリクエスト
        logger.info(f"Requesting {url} with proxy: {proxy}")
        response = requests.get(url, headers=headers, proxies=proxies, timeout=10)
        response.raise_for_status()
        
        # HTMLを解析
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # スクリプトタグからJSONデータを探す
        script_tags = soup.find_all('script')
        transcript_data = None
        
        for script in script_tags:
            if script.string and 'captionTracks' in script.string:
                # JSONデータを抽出
                json_data = re.search(r'ytInitialPlayerResponse\s*=\s*({.+?});', script.string)
                if json_data:
                    try:
                        data = json.loads(json_data.group(1))
                        captions = data.get('captions', {})
                        caption_tracks = captions.get('playerCaptionsTracklistRenderer', {}).get('captionTracks', [])
                        
                        if caption_tracks:
                            # 日本語字幕を優先、なければ英語、それもなければ最初の字幕を使用
                            ja_track = None
                            en_track = None
                            first_track = caption_tracks[0]
                            
                            for track in caption_tracks:
                                lang_code = track.get('languageCode', '')
                                
                                if lang_code.startswith('ja'):
                                    ja_track = track
                                    break
                                
                                if lang_code.startswith('en'):
                                    en_track = track
                            
                            selected_track = ja_track or en_track or first_track
                            
                            if selected_track:
                                # 字幕URLを取得
                                base_url = selected_track.get('baseUrl', '')
                                if base_url:
                                    # 字幕データを取得
                                    transcript_response = requests.get(base_url, headers=headers, proxies=proxies, timeout=10)
                                    transcript_response.raise_for_status()
                                    
                                    # XMLを解析
                                    transcript_soup = BeautifulSoup(transcript_response.text, 'xml')
                                    text_elements = transcript_soup.find_all('text')
                                    
                                    if text_elements:
                                        # 字幕テキストを整形
                                        transcript_lines = []
                                        for element in text_elements:
                                            start = float(element.get('start', 0))
                                            duration = float(element.get('dur', 0)) if element.get('dur') else 2.0
                                            text = element.text
                                            
                                            if text:
                                                transcript_lines.append({
                                                    'start': start,
                                                    'duration': duration,
                                                    'text': text
                                                })
                                        
                                        return transcript_lines, selected_track.get('languageCode', 'unknown')
                    except Exception as e:
                        logger.error(f"Error parsing JSON data: {str(e)}")
        
        logger.warning(f"No transcript found via scraping for {video_id}")
        return "字幕は利用できません。スクレイピングでも字幕を取得できませんでした。", ""
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error in get_transcript_with_scraping: {str(e)}")
        raise
    except Exception as e:
        logger.error(f"Error in get_transcript_with_scraping: {str(e)}")
        raise

# 検索API
@app.route('/api/search', methods=['GET'])
def search_videos():
    keyword = request.args.get('keyword', '')
    max_results = int(request.args.get('maxResults', 50))
    published_after = request.args.get('publishedAfter', '')
    published_before = request.args.get('publishedBefore', '')
    video_duration = request.args.get('videoDuration', '')
    order = request.args.get('sortBy', request.args.get('order', 'relevance'))
    use_scraping = request.args.get('useScraping', '0') == '1'
    page_token = request.args.get('pageToken', '')
    
    if not keyword:
        return jsonify({'error': 'Keyword is required'}), 400
    
    try:
        # YouTube URLが直接入力された場合、動画IDを抽出
        video_id_match = re.search(r'(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)', keyword)
        if video_id_match:
            video_id = video_id_match.group(1)
            search_response = youtube.videos().list(
                part='snippet,contentDetails,statistics',
                id=video_id
            ).execute()
        else:
            # 検索クエリを構築
            search_params = {
                'q': keyword,
                'part': 'snippet',
                'maxResults': max_results,
                'type': 'video',
                'order': order
            }
            
            # ページトークンがある場合は追加
            if page_token:
                search_params['pageToken'] = page_token
            
            # 日付フィルター
            if published_after:
                search_params['publishedAfter'] = f"{published_after}T00:00:00Z"
            if published_before:
                search_params['publishedBefore'] = f"{published_before}T23:59:59Z"
            
            # 動画の長さフィルター
            if video_duration in ['short', 'medium', 'long']:
                search_params['videoDuration'] = video_duration
            
            # 検索実行
            search_response = youtube.search().list(**search_params).execute()
            
            # 動画IDのリストを取得
            video_ids = [item['id']['videoId'] for item in search_response['items']]
            
            # 次のページトークンを保存
            next_page_token = search_response.get('nextPageToken')
            
            # 動画の詳細情報を取得
            if video_ids:
                videos_response = youtube.videos().list(
                    part='snippet,contentDetails,statistics',
                    id=','.join(video_ids)
                ).execute()
                
                # 検索レスポンスを更新（次のページトークンを保持）
                search_response = {
                    'items': videos_response.get('items', []),
                    'nextPageToken': next_page_token,
                    'pageInfo': search_response.get('pageInfo', {})
                }
        
        # 結果を整形
        items = []
        for item in search_response.get('items', []):
            snippet = item['snippet']
            content_details = item.get('contentDetails', {})
            statistics = item.get('statistics', {})
            
            # サムネイル画像のURLを取得（高解像度優先）
            thumbnails = snippet.get('thumbnails', {})
            thumbnail_url = thumbnails.get('high', {}).get('url', '')
            
            # 動画時間を分単位に変換
            duration = 0
            if 'duration' in content_details:
                duration = parse_duration_to_minutes(content_details['duration'])
            
            # 結果に追加
            items.append({
                'videoId': item['id'],
                'title': snippet['title'],
                'description': snippet['description'],
                'publishedAt': snippet['publishedAt'],
                'channelTitle': snippet['channelTitle'],
                'thumbnail': thumbnail_url,
                'duration': duration,
                'viewCount': statistics.get('viewCount', '0'),
                'likeCount': statistics.get('likeCount', '0'),
                'commentCount': statistics.get('commentCount', '0'),
                'link': f"https://www.youtube.com/watch?v={item['id']}"
            })
        
        # ページネーション情報
        response_data = {
            'items': items,
            'nextPageToken': search_response.get('nextPageToken'),
            'pageInfo': search_response.get('pageInfo', {})
        }
        
        return jsonify(response_data), 200
    
    except Exception as e:
        logger.error(f"Search error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# 字幕取得API
@app.route('/api/video/<video_id>/transcript', methods=['GET'])
def get_video_transcript(video_id):
    use_scraping = request.args.get('useScraping', '0') == '1'
    
    try:
        # リクエスト開始ログ
        logger.info(f"Transcript request received for video ID: {video_id}")
        
        # 字幕取得を試行（複数の方法）
        transcript_text, language = get_transcript(video_id)
        
        # 成功ログ
        if not isinstance(transcript_text, str) or not transcript_text.startswith("字幕は利用できません"):
            logger.info(f"Successfully retrieved transcript for {video_id} in {language}")
        else:
            logger.warning(f"Failed to retrieve transcript for {video_id}: {transcript_text}")
        
        return jsonify({
            'transcript': transcript_text,
            'language': language,
            'hostCountry': 'US'  # デフォルト値
        }), 200
    
    except Exception as e:
        logger.error(f"Transcript error: {str(e)}")
        return jsonify({
            'error': str(e),
            'transcript': f"字幕は利用できません。エラーが発生しました: {str(e)}",
            'language': ""
        }), 500

# コメント取得API
@app.route('/api/video/<video_id>/comments', methods=['GET'])
def get_comments(video_id):
    max_results = int(request.args.get('maxResults', 20))
    
    try:
        # コメントスレッドを取得
        comments_response = youtube.commentThreads().list(
            part='snippet,replies',
            videoId=video_id,
            maxResults=max_results,
            order='relevance'
        ).execute()
        
        # コメントを整形
        comments = []
        for item in comments_response['items']:
            comment = item['snippet']['topLevelComment']['snippet']
            
            # 返信を取得
            replies = []
            if 'replies' in item:
                for reply_item in item['replies']['comments']:
                    reply_snippet = reply_item['snippet']
                    replies.append({
                        'id': reply_item['id'],
                        'authorDisplayName': reply_snippet['authorDisplayName'],
                        'authorProfileImageUrl': reply_snippet['authorProfileImageUrl'],
                        'textOriginal': reply_snippet['textOriginal'],
                        'likeCount': reply_snippet['likeCount'],
                        'publishedAt': reply_snippet['publishedAt']
                    })
            
            comments.append({
                'id': item['id'],
                'authorDisplayName': comment['authorDisplayName'],
                'authorProfileImageUrl': comment['authorProfileImageUrl'],
                'textOriginal': comment['textOriginal'],
                'likeCount': comment['likeCount'],
                'publishedAt': comment['publishedAt'],
                'updatedAt': comment['updatedAt'],
                'totalReplyCount': item['snippet']['totalReplyCount'],
                'replies': replies
            })
        
        # ページネーション情報
        response_data = {
            'comments': comments,
            'nextPageToken': comments_response.get('nextPageToken'),
            'pageInfo': {
                'totalResults': comments_response['pageInfo']['totalResults'],
                'resultsPerPage': comments_response['pageInfo']['resultsPerPage']
            }
        }
        
        return jsonify(response_data), 200
    
    except Exception as e:
        logger.error(f"Comments error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# ダウンロードAPI - 字幕とコメントをMarkdownファイルとして提供
@app.route('/api/download', methods=['GET'])
def download_data():
    video_id = request.args.get('videoId', '')
    use_scraping = request.args.get('useScraping', '0') == '1'
    
    if not video_id:
        return jsonify({'error': 'Video ID is required'}), 400
    
    try:
        # 動画情報を取得
        video_info = youtube.videos().list(
            part='snippet,contentDetails,statistics',
            id=video_id
        ).execute()
        
        if not video_info['items']:
            return jsonify({'error': 'Video not found'}), 404
        
        video = video_info['items'][0]
        snippet = video['snippet']
        
        # 字幕を取得
        transcript_text, language = get_transcript(video_id)
        
        # コメントを取得
        try:
            comments_response = youtube.commentThreads().list(
                part='snippet,replies',
                videoId=video_id,
                maxResults=20,
                order='relevance'
            ).execute()
            
            comments = []
            for item in comments_response['items']:
                comment = item['snippet']['topLevelComment']['snippet']
                
                # 返信を取得
                replies = []
                if 'replies' in item:
                    for reply_item in item['replies']['comments']:
                        reply_snippet = reply_item['snippet']
                        replies.append({
                            'author': reply_snippet['authorDisplayName'],
                            'text': reply_snippet['textOriginal'],
                            'likes': reply_snippet['likeCount'],
                            'date': reply_snippet['publishedAt']
                        })
                
                comments.append({
                    'author': comment['authorDisplayName'],
                    'text': comment['textOriginal'],
                    'likes': comment['likeCount'],
                    'date': comment['publishedAt'],
                    'replies': replies
                })
        except Exception as e:
            logger.warning(f"Error getting comments: {str(e)}")
            comments = []
        
        # Markdownファイルを作成
        md_content = f"# {snippet['title']}\n\n"
        md_content += f"**チャンネル:** {snippet['channelTitle']}\n"
        md_content += f"**公開日:** {snippet['publishedAt'][:10]}\n"
        md_content += f"**URL:** https://www.youtube.com/watch?v={video_id}\n\n"
        
        # 説明文
        md_content += "## 説明\n\n"
        md_content += f"{snippet['description']}\n\n"
        
        # 字幕
        md_content += "## 字幕\n\n"
        if transcript_text and not isinstance(transcript_text, str):
            # transcript_textがリストの場合（正常に取得できた場合）
            formatted_transcript = "\n\n".join([f"[{format_time(item['start'])} - {format_time(item['start'] + item['duration'])}]\n{item['text']}" for item in transcript_text])
            md_content += f"{formatted_transcript}\n\n"
        elif transcript_text and not transcript_text.startswith("字幕は利用できません"):
            md_content += f"{transcript_text}\n\n"
        else:
            md_content += "字幕は利用できません。\n\n"
        
        # コメント
        md_content += "## コメント\n\n"
        if comments:
            for i, comment in enumerate(comments, 1):
                md_content += f"### {i}. {comment['author']} (👍 {comment['likes']})\n"
                md_content += f"{comment['text']}\n\n"
                
                # 返信
                if comment['replies']:
                    for reply in comment['replies']:
                        md_content += f"> **{reply['author']}** (👍 {reply['likes']}): {reply['text']}\n\n"
        else:
            md_content += "コメントは利用できないか、取得できませんでした。\n\n"
        
        # Markdownファイルをレスポンスとして返す
        response = Response(md_content, mimetype='text/markdown')
        response.headers['Content-Disposition'] = f'attachment; filename="{video_id}_transcript.md"'
        return response
    
    except Exception as e:
        logger.error(f"Download error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
