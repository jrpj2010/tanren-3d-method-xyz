import os
import sys
from pytube import YouTube
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound, TranscriptsDisabled

def get_transcript_with_pytube(video_id):
    """
    PyTubeを使用して字幕を取得する関数
    """
    try:
        # PyTubeを使用して動画情報を取得
        yt = YouTube(f"https://www.youtube.com/watch?v={video_id}")
        
        # 利用可能な字幕トラックを取得
        caption_tracks = yt.captions
        
        if not caption_tracks:
            print(f"No captions available for video {video_id}")
            return None, None
        
        # 利用可能な字幕言語を表示
        print(f"Available caption languages for {video_id}:")
        for caption in caption_tracks:
            print(f"  - {caption.name} ({caption.code})")
        
        # 日本語字幕を優先、なければ英語、それもなければ最初の字幕を使用
        ja_caption = None
        en_caption = None
        first_caption = None
        
        for caption in caption_tracks:
            if first_caption is None:
                first_caption = caption
            
            if 'ja' in caption.code.lower():
                ja_caption = caption
                break
            
            if 'en' in caption.code.lower():
                en_caption = caption
        
        selected_caption = ja_caption or en_caption or first_caption
        
        if selected_caption:
            print(f"Selected caption: {selected_caption.name} ({selected_caption.code})")
            
            # XMLからテキストに変換
            transcript_text = selected_caption.generate_srt_captions()
            
            return transcript_text, selected_caption.code
        else:
            print(f"No suitable captions found for video {video_id}")
            return None, None
            
    except Exception as e:
        print(f"Error getting transcript with PyTube: {str(e)}")
        return None, None

def get_transcript_with_api(video_id):
    """
    YouTube Transcript APIを使用して字幕を取得する関数
    """
    try:
        # 利用可能な字幕リストを取得
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        
        # 利用可能な字幕言語を表示
        print(f"Available transcript languages for {video_id}:")
        for transcript in transcript_list:
            print(f"  - {transcript.language} (Generated: {transcript.is_generated})")
        
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
            print(f"Selected transcript: {selected_transcript.language} (Generated: {selected_transcript.is_generated})")
            
            # 字幕を取得
            transcript_data = selected_transcript.fetch()
            
            # 字幕テキストを整形
            transcript_text = "\n".join([f"{item['start']:.2f} --> {item['start'] + item['duration']:.2f}\n{item['text']}\n" for item in transcript_data])
            
            return transcript_text, selected_transcript.language_code
        else:
            print(f"No suitable transcripts found for video {video_id}")
            return None, None
            
    except (NoTranscriptFound, TranscriptsDisabled) as e:
        print(f"No transcript available: {str(e)}")
        return None, None
    except Exception as e:
        print(f"Error getting transcript with API: {str(e)}")
        return None, None

def get_transcript(video_id):
    """
    複数の方法を試して字幕を取得する関数
    """
    # まずYouTube Transcript APIで試す
    transcript, language = get_transcript_with_api(video_id)
    
    # 失敗したらPyTubeで試す
    if transcript is None:
        transcript, language = get_transcript_with_pytube(video_id)
    
    return transcript, language

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python subtitle_fix.py VIDEO_ID")
        sys.exit(1)
    
    video_id = sys.argv[1]
    transcript, language = get_transcript(video_id)
    
    if transcript:
        print(f"\nTranscript found in {language}:")
        print(transcript[:500] + "..." if len(transcript) > 500 else transcript)
    else:
        print(f"\nNo transcript found for video {video_id}")
