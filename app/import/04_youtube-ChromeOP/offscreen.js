// YouTube Data Extractor - Offscreen JS
// Blob URLを生成するためのオフスクリーンページのスクリプト

// バックグラウンドからのメッセージリスナー
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // 自分宛てのメッセージでない場合は無視
  if (message.target !== 'offscreen') return false;
  
  console.log('オフスクリーンページがメッセージを受信:', message.action);
  
  if (message.action === 'createBlob') {
    try {
      // Blobを生成
      const blob = new Blob([message.data], { type: message.type || 'text/plain' });
      
      // Blob URLを作成
      const blobUrl = URL.createObjectURL(blob);
      
      // バックグラウンドに結果を返す
      sendResponse({ success: true, blobUrl });
      
      // Blob URLをクリーンアップするタイマーを設定
      // バックグラウンドがダウンロードを開始した後に実行される
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
        console.log('Blob URLを解放しました');
        
        // オフスクリーンドキュメントをクローズ
        chrome.runtime.sendMessage({
          action: 'closeOffscreen'
        }).catch(err => {
          console.error('オフスクリーン終了リクエストでエラー:', err);
        });
        
        if (chrome.offscreen && chrome.offscreen.closeDocument) {
          chrome.offscreen.closeDocument();
        }
      }, 5000);
      
    } catch (error) {
      console.error('Blob URL作成エラー:', error);
      sendResponse({ success: false, error: error.message });
    }
    
    return true; // 非同期レスポンスを示す
  }
  
  return false;
}); 