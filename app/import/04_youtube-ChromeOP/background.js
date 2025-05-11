// YouTube Data Extractor - Background Script (Service Worker)
// Manifest V3のService Workerとして動作し、拡張機能のバックグラウンド処理を担当

// 拡張機能のアイコンがクリックされたとき
chrome.action.onClicked.addListener((tab) => {
  // YouTubeの動画ページのみ対応
  if (tab.url && tab.url.includes('youtube.com/watch')) {
    console.log('YouTube動画ページが検出されました:', tab.url);
    
    // ポップアップがあるので、ポップアップ内のボタンからスタートする
    // このイベントは基本的に使われない（ポップアップがない場合のフォールバック）
  }
});

// コンテンツスクリプトからのメッセージを処理
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('メッセージを受信:', message.action);
  
  if (message.action === 'extractionComplete') {
    handleExtractionComplete(message, sender);
    return true;
  } else if (message.action === 'extractionError') {
    console.error('抽出エラー:', message.error);
    // 必要に応じてポップアップにエラーを通知
    notifyPopup({
      action: 'showError',
      error: message.error
    });
    return true;
  } else if (message.action === 'progressUpdate') {
    // 進捗情報をポップアップに転送
    notifyPopup({
      action: 'updateProgress',
      stage: message.stage,
      progress: message.progress
    });
    return true;
  } else if (message.action === 'startExtraction') {
    // ポップアップからの開始命令をコンテンツスクリプトに転送
    if (sender.tab) {
      // これはコンテンツスクリプトからの要求なので無視
      return false;
    }
    
    // 現在アクティブなタブを取得
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      
      const tab = tabs[0];
      if (tab.url && tab.url.includes('youtube.com/watch')) {
        // ポップアップから直接settings情報を受け取る
        chrome.tabs.sendMessage(tab.id, {
          action: 'startExtraction',
          settings: message.settings || { aiEnabled: false, apiKey: '' }
        });
      } else {
        notifyPopup({
          action: 'showError',
          error: 'この機能はYouTube動画ページでのみ使用できます'
        });
      }
    });
    
    return true;
  } else if (message.action === 'requestAiAnalysis') {
    // AIによる分析リクエスト
    performAiAnalysis(message.data, message.apiKey)
      .then(result => {
        sendResponse({ success: true, result });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    
    return true; // 非同期レスポンスのため
  }
  
  return false;
});

// データ抽出完了時の処理
async function handleExtractionComplete(message, sender) {
  try {
    const { data, markdown, settings } = message;
    console.log('データ抽出が完了しました。Markdownを保存します...');
    
    // ファイル名を動画タイトルから作成（不正な文字を除去）
    let fileName = `${data.meta.title}.md`
      .replace(/[\\/:*?"<>|]/g, '_')
      .replace(/\s+/g, ' ')
      .trim();
    
    // 必要に応じてAI分析を追加
    let finalMarkdown = markdown;
    
    // コンテンツスクリプトから受け取った設定を使用
    if (settings && settings.aiEnabled && settings.apiKey) {
      try {
        notifyPopup({
          action: 'updateProgress',
          stage: 'AI分析中',
          progress: { aiAnalysisInProgress: true }
        });
        
        const aiResult = await performAiAnalysis(data, settings.apiKey);
        
        if (aiResult) {
          finalMarkdown += '\n# AIによる分析\n\n';
          finalMarkdown += aiResult;
        }
      } catch (error) {
        console.error('AI分析に失敗しました:', error);
        finalMarkdown += '\n# AIによる分析\n\n';
        finalMarkdown += '**エラー:** AI分析の実行中に問題が発生しました。\n';
      }
    }
    
    // Markdownテキストをダウンロード
    await downloadMarkdown(finalMarkdown, fileName);
    
    // ポップアップに完了を通知
    notifyPopup({
      action: 'extractionCompleted',
      fileName: fileName
    });
  } catch (error) {
    console.error('データ保存に失敗しました:', error);
    notifyPopup({
      action: 'showError',
      error: `データ保存に失敗しました: ${error.message}`
    });
  }
}

// Markdownファイルをダウンロード
function downloadMarkdown(markdown, fileName) {
  return new Promise((resolve, reject) => {
    try {
      // オフスクリーンドキュメントを利用してBlobを作成
      chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['BLOBS'],
        justification: 'Markdown file download needs blob URL creation'
      }).then(() => {
        // オフスクリーンドキュメントにメッセージを送信
        chrome.runtime.sendMessage({
          target: 'offscreen',
          action: 'createBlob',
          data: markdown,
          type: 'text/markdown'
        }).then(response => {
          // Blob URLを取得したらダウンロード
          if (response && response.blobUrl) {
            chrome.downloads.download({
              url: response.blobUrl,
              filename: fileName,
              saveAs: false
            }, downloadId => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                resolve(downloadId);
              }
            });
          } else {
            reject(new Error('Blob URLの作成に失敗しました'));
          }
        });
      }).catch(error => {
        // offscreenドキュメントの作成に失敗した場合の代替手段
        console.warn('オフスクリーンドキュメントの作成に失敗しました:', error);
        console.log('代替手段でダウンロードを試みます...');
        
        // データURLを使った代替手段
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const reader = new FileReader();
        
        reader.onloadend = function() {
          chrome.downloads.download({
            url: reader.result,
            filename: fileName,
            saveAs: false
          }, downloadId => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              resolve(downloadId);
            }
          });
        };
        
        reader.onerror = function() {
          reject(new Error('FileReaderでのファイル読み込みに失敗しました'));
        };
        
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      reject(error);
    }
  });
}

// ポップアップにメッセージを通知
function notifyPopup(message) {
  // ポップアップが開いていれば通知
  chrome.runtime.sendMessage(message).catch(error => {
    // ポップアップが開いていないときはエラーになるが無視
    console.log('ポップアップへの通知に失敗しました（おそらく開いていません）');
  });
}

// Gemini APIを使ったAI分析
async function performAiAnalysis(data, apiKey) {
  if (!apiKey) {
    throw new Error('API キーが設定されていません');
  }
  
  try {
    // コメントデータから入力を作成
    let commentText = '';
    
    // 処理するコメント数を制限（トークン数を抑える）
    const MAX_COMMENTS = 100;
    const commentsToProcess = data.comments.slice(0, MAX_COMMENTS);
    
    commentsToProcess.forEach(comment => {
      commentText += `${comment.author}: ${comment.text}\n`;
      
      // 返信もある程度含める
      const MAX_REPLIES = 3;
      const repliesToInclude = comment.replies.slice(0, MAX_REPLIES);
      
      repliesToInclude.forEach(reply => {
        commentText += `  - ${reply.author}: ${reply.text}\n`;
      });
      
      commentText += '\n';
    });
    
    // Gemini APIリクエスト用のプロンプト
    const prompt = `
以下はYouTube動画「${data.meta.title}」のコメントです。
これらのコメントを分析して、以下の情報を提供してください：

1. 視聴者の全体的な反応（ポジティブ/ネガティブ/中立）
2. 最も言及されている3-5つのトピックやポイント
3. 注目すべき意見や洞察

コメント：
${commentText}

解析結果はMarkdown形式で、簡潔に箇条書きでまとめてください。結果は全体で500単語以内に収めてください。
`;

    // モック版の実装（APIキーが無効でも動作できるように）
    if (apiKey === 'mock' || apiKey === 'MOCK_KEY') {
      return "**モードAPI応答:**\n\nこれはテスト用のAI分析結果です。実際の分析を行うには、有効なAPI Keyを設定してください。";
    }
    
    // Gemini APIへのリクエスト
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API エラー: ${errorData.error?.message || response.statusText}`);
    }
    
    const responseData = await response.json();
    
    // レスポンスからテキスト抽出
    if (responseData.candidates && 
        responseData.candidates[0] && 
        responseData.candidates[0].content && 
        responseData.candidates[0].content.parts) {
      return responseData.candidates[0].content.parts[0].text;
    } else {
      throw new Error('API からの応答形式が不正です');
    }
  } catch (error) {
    console.error('AI分析中にエラーが発生しました:', error);
    throw error;
  }
}

// ダウンロード完了イベント
chrome.downloads.onCreated.addListener(function(downloadItem) {
  console.log('ダウンロード開始:', downloadItem.filename);
}); 