// YouTube Data Extractor - Content Script
// このスクリプトはYouTubeの動画ページで実行され、データ抽出を担当します

console.log('YouTube Data Extractor: コンテンツスクリプトが読み込まれました');

let videoData = {
  meta: {
    title: '',
    channelName: '',
    subscribers: '',
    publishDate: '',
    views: '',
    likes: '',
    commentCount: 0,
    description: '',
    url: window.location.href
  },
  subtitles: [],
  comments: []
};

let extractionState = {
  isExtracting: false,
  progress: {
    expandedDescription: false,
    loadedComments: 0,
    expandedReplies: 0,
    totalComments: 0,
    subtitlesLoaded: false
  },
  settings: {
    aiEnabled: false,
    apiKey: '',
    expandReplies: true,
    includeSubtitles: true
  }
};

// メッセージリスナー - バックグラウンドからの指示を待機
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('コンテンツスクリプトがメッセージを受信:', message.action);
  
  if (message.action === 'startExtraction') {
    // 設定情報をメッセージから直接受け取る
    if (message.settings) {
      extractionState.settings = {
        ...extractionState.settings,
        ...message.settings
      };
    }
    
    // データ抽出を開始
    startExtraction()
      .then(() => {
        sendResponse({ success: true });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    
    return true; // 非同期レスポンスのため
  } else if (message.action === 'getProgress') {
    // 現在の進捗状況を返す
    sendResponse({
      isExtracting: extractionState.isExtracting,
      progress: {
        stage: extractionState.progress.expandedDescription ? '概要欄展開完了' : '開始',
        loadedComments: extractionState.progress.loadedComments,
        totalComments: extractionState.progress.totalComments
      }
    });
    return true;
  }
  
  return false;
});

// データ抽出のメイン処理
async function startExtraction() {
  console.log('データ抽出を開始します');
  
  if (extractionState.isExtracting) {
    throw new Error('すでに抽出処理が実行中です');
  }
  
  // 抽出状態をリセット
  resetExtractionState();
  
  // 抽出開始
  try {
    updateProgress('開始');
    
    // 各種データを順番に抽出
    await extractMetaData();
    await expandDescription();
    await extractDescriptionText();
    
    // 字幕の抽出（設定に応じて）
    if (extractionState.settings.includeSubtitles) {
      await extractSubtitles();
    }
    
    // コメントの抽出
    await extractComments();
    
    // Markdownの生成
    const markdown = generateMarkdown();
    
    // 抽出完了をバックグラウンドに通知
    chrome.runtime.sendMessage({
      action: 'extractionComplete',
      data: videoData,
      markdown: markdown,
      settings: extractionState.settings // 設定情報もバックグラウンドに送信
    });
    
    // 抽出状態を更新
    extractionState.isExtracting = false;
    updateProgress('完了');
    
    console.log('データ抽出が完了しました');
  } catch (error) {
    // エラー処理
    console.error('抽出エラー:', error);
    extractionState.isExtracting = false;
    extractionState.progress.expandedDescription = false;
    extractionState.progress.loadedComments = 0;
    extractionState.progress.expandedReplies = 0;
    extractionState.progress.totalComments = 0;
    extractionState.progress.subtitlesLoaded = false;
    
    // エラーをバックグラウンドに通知
    chrome.runtime.sendMessage({
      action: 'extractionError',
      error: error.message
    });
    
    throw error;
  }
}

// 進捗状況の更新
function updateProgress(stage) {
  console.log(`進捗: ${stage}`);
  chrome.runtime.sendMessage({
    action: 'progressUpdate',
    stage: stage,
    progress: extractionState.progress
  });
}

// メタデータ（タイトル、チャンネル名など）の抽出
async function extractMetaData() {
  return new Promise((resolve) => {
    // タイトル
    videoData.meta.title = document.querySelector('h1.title.style-scope.ytd-watch-metadata')?.textContent?.trim() || 'Unknown Title';
    
    // チャンネル名
    videoData.meta.channelName = document.querySelector('#channel-name yt-formatted-string')?.textContent?.trim() || 'Unknown Channel';
    
    // 登録者数
    videoData.meta.subscribers = document.querySelector('#owner-sub-count')?.textContent?.trim() || 'Unknown';
    
    // 再生回数
    const viewCount = document.querySelector('#info-strings yt-formatted-string') || 
                    document.querySelector('.view-count');
    videoData.meta.views = viewCount?.textContent?.trim() || 'Unknown';
    
    // 公開日時
    const dateElement = document.querySelector('#info-strings yt-formatted-string:nth-child(2)') || 
                        document.querySelector('#upload-info .date');
    videoData.meta.publishDate = dateElement?.textContent?.trim() || 'Unknown Date';
    
    // 高評価数
    const likeButton = document.querySelector('ytd-toggle-button-renderer:first-child');
    videoData.meta.likes = likeButton?.querySelector('#text')?.textContent?.trim() || 
                         likeButton?.getAttribute('aria-label')?.replace(/[^0-9]/g, '') || 'Unknown';
    
    // コメント数
    const commentCount = document.querySelector('ytd-comments-header-renderer #count ytd-comments-count-text');
    if (commentCount) {
      const countText = commentCount.textContent.trim();
      const match = countText.match(/[\d,]+/);
      videoData.meta.commentCount = match ? match[0].replace(/,/g, '') : 0;
    }
    
    resolve();
  });
}

// 概要欄を展開する
async function expandDescription() {
  return new Promise((resolve) => {
    const expandButton = document.querySelector('tp-yt-paper-button#expand');
    if (expandButton) {
      expandButton.click();
      // クリック後、少し待機して展開を確認
      setTimeout(() => {
        extractionState.progress.expandedDescription = true;
        resolve();
      }, 1000);
    } else {
      // すでに展開されているか、ボタンが見つからない
      extractionState.progress.expandedDescription = true;
      resolve();
    }
  });
}

// 概要欄のテキストを取得
async function extractDescriptionText() {
  return new Promise((resolve) => {
    const descriptionElement = document.querySelector('#description-inline-expander') || 
                              document.querySelector('#description');
    
    if (descriptionElement) {
      videoData.meta.description = descriptionElement.textContent.trim();
    }
    resolve();
  });
}

// 字幕データの取得
async function extractSubtitles() {
  try {
    // ytInitialPlayerResponseからキャプショントラックを取得するためのスクリプトを注入
    const result = await injectAndExecuteScript(() => {
      if (typeof window.ytInitialPlayerResponse !== 'undefined') {
        const playerResponse = window.ytInitialPlayerResponse;
        if (playerResponse && 
            playerResponse.captions && 
            playerResponse.captions.playerCaptionsTracklistRenderer && 
            playerResponse.captions.playerCaptionsTracklistRenderer.captionTracks) {
          return playerResponse.captions.playerCaptionsTracklistRenderer.captionTracks;
        }
      }
      return null;
    });

    if (!result) {
      console.log('字幕データが見つかりませんでした');
      return;
    }

    const captionTracks = result;
    
    // 各言語の字幕を処理
    for (const track of captionTracks) {
      const langCode = track.languageCode;
      const langName = track.name?.simpleText || langCode;
      const baseUrl = track.baseUrl;
      
      console.log(`字幕取得: ${langName} (${langCode})`);
      
      try {
        const response = await fetch(baseUrl);
        const xmlText = await response.text();
        
        // XMLパース
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const textNodes = Array.from(xmlDoc.getElementsByTagName('text'));
        
        // 字幕テキストとタイムスタンプを抽出
        const subtitleLines = textNodes.map(node => {
          const startTime = parseFloat(node.getAttribute('start') || '0');
          const duration = parseFloat(node.getAttribute('dur') || '0');
          const text = node.textContent || '';
          
          // 時:分:秒 形式に変換
          const formattedTime = formatTime(startTime);
          
          return {
            time: formattedTime,
            text: text
          };
        });
        
        videoData.subtitles.push({
          language: langName,
          languageCode: langCode,
          lines: subtitleLines
        });
      } catch (error) {
        console.error(`字幕 ${langName} の取得に失敗:`, error);
      }
    }
    
    extractionState.progress.subtitlesLoaded = true;
  } catch (error) {
    console.error('字幕取得中にエラーが発生しました:', error);
  }
}

// コメントとその返信を取得
async function extractComments() {
  // コメントセクションまでスクロール
  const commentsSection = document.querySelector('#comments');
  if (commentsSection) {
    commentsSection.scrollIntoView();
    
    // コメント数の取得を試みる（DOM上で見つかる場合）
    const countText = document.querySelector('ytd-comments-header-renderer #count')?.textContent;
    if (countText) {
      const match = countText.match(/[\d,]+/);
      if (match) {
        extractionState.progress.totalComments = parseInt(match[0].replace(/,/g, ''), 10);
      }
    }
    
    // コメント読み込み
    await loadAllComments();
    
    // 全ての「返信を表示」ボタンをクリック
    await expandAllReplies();
    
    // コメントデータの抽出
    await extractCommentData();
  } else {
    console.log('コメントセクションが見つかりません');
  }
}

// 全てのコメントを読み込む（スクロールで）
async function loadAllComments() {
  return new Promise((resolve) => {
    let lastCommentCount = 0;
    let noNewCommentsCounter = 0;
    
    const scrollInterval = setInterval(() => {
      window.scrollTo(0, document.body.scrollHeight);
      
      // 現在のコメント数を取得
      const comments = document.querySelectorAll('ytd-comment-thread-renderer');
      const currentCount = comments.length;
      
      extractionState.progress.loadedComments = currentCount;
      
      // コメント数が増えていなければカウンターを増やす
      if (currentCount === lastCommentCount) {
        noNewCommentsCounter++;
      } else {
        noNewCommentsCounter = 0;
      }
      
      lastCommentCount = currentCount;
      
      // 一定回数新しいコメントが読み込まれなければ完了と見なす
      if (noNewCommentsCounter >= 5) {
        clearInterval(scrollInterval);
        console.log(`${currentCount}件のコメントを読み込みました`);
        resolve();
      }
    }, 1500);
  });
}

// 全ての「返信を表示」ボタンをクリック
async function expandAllReplies() {
  return new Promise((resolve) => {
    const expandReplies = () => {
      // 「返信を表示」ボタンを取得
      const replyButtons = Array.from(document.querySelectorAll('ytd-button-renderer#more-replies:not([clicked-by-script="true"])'));
      
      if (replyButtons.length === 0) {
        // もう展開するボタンがなければ完了
        console.log('全ての返信を展開しました');
        resolve();
        return;
      }
      
      // ボタンをクリックして属性を設定
      replyButtons.forEach(button => {
        button.setAttribute('clicked-by-script', 'true');
        button.click();
      });
      
      extractionState.progress.expandedReplies += replyButtons.length;
      
      // 一定時間後に再度チェック
      setTimeout(expandReplies, 1500);
    };
    
    expandReplies();
  });
}

// コメントデータを抽出
async function extractCommentData() {
  // 全てのトップレベルコメントスレッドを取得
  const commentThreads = document.querySelectorAll('ytd-comment-thread-renderer');
  
  for (const thread of commentThreads) {
    // トップコメントの情報を取得
    const topComment = thread.querySelector('ytd-comment-renderer');
    if (!topComment) continue;
    
    const authorName = topComment.querySelector('#author-text span')?.textContent?.trim() || 'Unknown';
    const publishTime = topComment.querySelector('#published-time-text')?.textContent?.trim() || '';
    const commentText = topComment.querySelector('#content-text')?.textContent?.trim() || '';
    const likeCount = topComment.querySelector('#vote-count-middle')?.textContent?.trim() || '0';
    
    const commentObj = {
      author: authorName,
      publishTime: publishTime,
      text: commentText,
      likes: likeCount,
      replies: []
    };
    
    // 返信コメントの取得
    const replySection = thread.querySelector('ytd-comment-replies-renderer');
    if (replySection) {
      const replies = replySection.querySelectorAll('ytd-comment-renderer');
      
      for (const reply of replies) {
        const replyAuthor = reply.querySelector('#author-text span')?.textContent?.trim() || 'Unknown';
        const replyTime = reply.querySelector('#published-time-text')?.textContent?.trim() || '';
        const replyText = reply.querySelector('#content-text')?.textContent?.trim() || '';
        const replyLikes = reply.querySelector('#vote-count-middle')?.textContent?.trim() || '0';
        
        commentObj.replies.push({
          author: replyAuthor,
          publishTime: replyTime,
          text: replyText,
          likes: replyLikes
        });
      }
    }
    
    videoData.comments.push(commentObj);
  }
  
  console.log(`${videoData.comments.length}件のコメントを抽出しました`);
}

// Markdownテキストを生成
function generateMarkdown() {
  let markdown = '';
  
  // メタ情報セクション
  markdown += '# メタ情報\n\n';
  markdown += `- **タイトル:** ${videoData.meta.title}\n`;
  markdown += `- **チャンネル名:** ${videoData.meta.channelName} (${videoData.meta.subscribers})\n`;
  markdown += `- **公開日:** ${videoData.meta.publishDate}\n`;
  markdown += `- **再生回数:** ${videoData.meta.views}\n`;
  markdown += `- **高評価数:** ${videoData.meta.likes}\n`;
  markdown += `- **コメント数:** ${videoData.meta.commentCount}\n`;
  markdown += `- **概要欄:**\n\n`;
  
  // 概要欄テキストを行ごとに処理して引用形式に
  const descLines = videoData.meta.description.split('\n');
  descLines.forEach(line => {
    markdown += `  ${line}\n`;
  });
  
  markdown += '\n';
  
  // 字幕セクション
  if (videoData.subtitles.length > 0) {
    markdown += '# 字幕\n\n';
    
    videoData.subtitles.forEach(subtitle => {
      markdown += `## 字幕 (${subtitle.language})\n\n`;
      
      subtitle.lines.forEach(line => {
        markdown += `[${line.time}] ${line.text}\n`;
      });
      
      markdown += '\n';
    });
  } else {
    markdown += '# 字幕\n\n字幕データは利用できません。\n\n';
  }
  
  // コメントセクション
  markdown += '# コメント\n\n';
  
  if (videoData.comments.length > 0) {
    videoData.comments.forEach(comment => {
      markdown += `- **${comment.author} (${comment.publishTime})** [高評価: ${comment.likes}]  \n`;
      
      // コメント本文を行ごとに処理してインデント
      const lines = comment.text.split('\n');
      lines.forEach(line => {
        markdown += `  ${line}  \n`;
      });
      
      // 返信コメント
      if (comment.replies.length > 0) {
        comment.replies.forEach(reply => {
          markdown += `  - **${reply.author} (${reply.publishTime})** [高評価: ${reply.likes}]  \n`;
          
          // 返信本文を行ごとに処理して二重インデント
          const replyLines = reply.text.split('\n');
          replyLines.forEach(line => {
            markdown += `    ${line}  \n`;
          });
        });
      }
      
      markdown += '\n';
    });
  } else {
    markdown += 'コメントはありません。\n\n';
  }
  
  return markdown;
}

// 秒数を時:分:秒形式に変換するヘルパー関数
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

// ページのJavaScriptコンテキストでスクリプトを実行するためのヘルパー関数
async function injectAndExecuteScript(func) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        const result = (${func.toString()})();
        document.dispatchEvent(new CustomEvent('script-result', { detail: result }));
      })();
    `;
    
    // スクリプト実行結果を取得するイベントリスナー
    document.addEventListener('script-result', function(event) {
      resolve(event.detail);
    }, { once: true });
    
    document.head.appendChild(script);
    script.remove();
  });
}

// 抽出状態をリセットする関数
function resetExtractionState() {
  extractionState.progress.expandedDescription = false;
  extractionState.progress.loadedComments = 0;
  extractionState.progress.expandedReplies = 0;
  extractionState.progress.totalComments = 0;
  extractionState.progress.subtitlesLoaded = false;
} 