// YouTube Data Extractor - Popup Script
// ポップアップUIの動作を制御するスクリプト

document.addEventListener('DOMContentLoaded', function() {
  // 要素の参照
  const extractButton = document.getElementById('extract-button');
  const statusElement = document.getElementById('status');
  const progressBar = document.getElementById('progress-bar');
  const progressBarInner = document.getElementById('progress-bar-inner');
  const aiEnabledCheckbox = document.getElementById('ai-enabled');
  const apiKeyContainer = document.getElementById('api-key-container');
  const apiKeyInput = document.getElementById('api-key');
  
  // ストレージ機能を使わず、デフォルト値を直接設定
  aiEnabledCheckbox.checked = false;
  apiKeyInput.value = '';
  toggleApiKeyContainer(false);
  
  // YouTubeの動画ページかどうかチェック
  try {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentTab = tabs[0];
      const isYouTubeVideo = currentTab.url && currentTab.url.includes('youtube.com/watch');
      
      extractButton.disabled = !isYouTubeVideo;
      
      if (!isYouTubeVideo) {
        statusElement.textContent = 'この機能はYouTube動画ページでのみ使用できます';
      } else {
        statusElement.textContent = '準備完了。ボタンをクリックしてデータ取得を開始します';
        
        try {
          // 現在の抽出ステータスを確認
          chrome.tabs.sendMessage(currentTab.id, {action: 'getProgress'}, function(response) {
            if (chrome.runtime.lastError) {
              console.log(chrome.runtime.lastError.message);
              return;
            }
            
            if (response && response.isExtracting) {
              extractButton.disabled = true;
              updateExtractionStatus('処理中...', response.progress);
            }
          });
        } catch (e) {
          console.error('タブメッセージエラー:', e);
        }
      }
    });
  } catch (e) {
    console.error('tabsクエリエラー:', e);
    statusElement.textContent = 'エラーが発生しました。拡張機能を再読み込みしてください。';
  }
  
  // 抽出ボタンのクリックイベント
  extractButton.addEventListener('click', function() {
    extractButton.disabled = true;
    statusElement.textContent = 'データ抽出を開始します...';
    progressBar.style.display = 'block';
    progressBarInner.style.width = '5%';
    
    // バックグラウンドに抽出開始を通知
    try {
      // AI設定を含めたメッセージを送信
      chrome.runtime.sendMessage({
        action: 'startExtraction',
        settings: {
          aiEnabled: aiEnabledCheckbox.checked,
          apiKey: apiKeyInput.value
        }
      });
    } catch (e) {
      console.error('抽出開始エラー:', e);
      statusElement.textContent = 'エラーが発生しました: ' + e.message;
      extractButton.disabled = false;
    }
  });
  
  // AI分析チェックボックスの変更イベント
  aiEnabledCheckbox.addEventListener('change', function() {
    toggleApiKeyContainer(this.checked);
  });
  
  // APIキーコンテナの表示切替
  function toggleApiKeyContainer(show) {
    apiKeyContainer.style.display = show ? 'block' : 'none';
  }
  
  // バックグラウンド/コンテンツスクリプトからのメッセージを受信
  chrome.runtime.onMessage.addListener(function(message) {
    try {
      if (message.action === 'updateProgress') {
        updateExtractionStatus(message.stage, message.progress);
      } else if (message.action === 'extractionCompleted') {
        progressBar.style.display = 'none';
        statusElement.textContent = `完了！ "${message.fileName}" を保存しました`;
        statusElement.className = 'success';
        extractButton.disabled = false;
      } else if (message.action === 'showError') {
        progressBar.style.display = 'none';
        statusElement.textContent = `エラー: ${message.error}`;
        statusElement.className = 'error';
        extractButton.disabled = false;
      }
    } catch (e) {
      console.error('メッセージ処理エラー:', e);
      statusElement.textContent = `エラーが発生しました: ${e.message}`;
      statusElement.className = 'error';
      extractButton.disabled = false;
    }
  });
  
  // 抽出状況の更新
  function updateExtractionStatus(stage, progress) {
    let statusText = `処理中: ${stage}`;
    let progressPercent = 10; // デフォルト進捗
    
    if (progress) {
      // 進捗状況に基づいた詳細表示
      if (stage === 'コメント抽出完了') {
        statusText += ` (${progress.loadedComments}件)`;
        progressPercent = 80;
      } else if (stage === '開始') {
        progressPercent = 5;
      } else if (stage === 'メタデータ抽出完了') {
        progressPercent = 10;
      } else if (stage === '概要欄展開完了' || stage === '概要欄テキスト抽出完了') {
        progressPercent = 20;
      } else if (stage === '字幕抽出完了') {
        progressPercent = 40;
      } else if (stage.includes('コメント')) {
        // コメント関連の進捗状況
        if (progress.totalComments > 0) {
          const percent = Math.min(100, Math.floor((progress.loadedComments / progress.totalComments) * 100));
          statusText += ` (${progress.loadedComments}/${progress.totalComments}件)`;
          progressPercent = 40 + (percent * 0.4); // 40%~80%の範囲
        }
      } else if (stage === 'AI分析中') {
        progressPercent = 90;
      } else if (stage === '完了') {
        progressPercent = 100;
      }
    }
    
    statusElement.textContent = statusText;
    progressBarInner.style.width = `${progressPercent}%`;
  }
}); 