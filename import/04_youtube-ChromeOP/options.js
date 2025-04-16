// YouTube Data Extractor - Options Script
// オプション画面の動作を制御するスクリプト

document.addEventListener('DOMContentLoaded', function() {
  // 要素への参照
  const aiEnabledCheckbox = document.getElementById('ai-enabled');
  const apiKeyInput = document.getElementById('api-key');
  const apiKeySection = document.getElementById('api-key-section');
  const autoExpandRepliesCheckbox = document.getElementById('auto-expand-replies');
  const includeSubtitlesCheckbox = document.getElementById('include-subtitles');
  const saveButton = document.getElementById('save-button');
  const statusElement = document.getElementById('status');
  
  // 設定を読み込み
  loadSettings();
  
  // AIチェックボックスの変更時の動作
  aiEnabledCheckbox.addEventListener('change', function() {
    toggleApiKeySection(this.checked);
  });
  
  // 保存ボタンのクリックイベント
  saveButton.addEventListener('click', saveSettings);
  
  // 設定の読み込み
  function loadSettings() {
    chrome.storage.sync.get({
      aiEnabled: false,
      apiKey: '',
      autoExpandReplies: true,
      includeSubtitles: true
    }, function(items) {
      aiEnabledCheckbox.checked = items.aiEnabled;
      apiKeyInput.value = items.apiKey;
      autoExpandRepliesCheckbox.checked = items.autoExpandReplies;
      includeSubtitlesCheckbox.checked = items.includeSubtitles;
      
      toggleApiKeySection(items.aiEnabled);
    });
  }
  
  // 設定の保存
  function saveSettings() {
    const settings = {
      aiEnabled: aiEnabledCheckbox.checked,
      apiKey: apiKeyInput.value,
      autoExpandReplies: autoExpandRepliesCheckbox.checked,
      includeSubtitles: includeSubtitlesCheckbox.checked
    };
    
    chrome.storage.sync.set(settings, function() {
      // 保存成功時の表示
      showStatus('設定を保存しました', 'success');
    });
  }
  
  // APIキー入力欄の表示・非表示
  function toggleApiKeySection(show) {
    apiKeySection.style.display = show ? 'block' : 'none';
  }
  
  // ステータスメッセージの表示
  function showStatus(message, type) {
    statusElement.textContent = message;
    statusElement.className = `status ${type}`;
    statusElement.style.display = 'block';
    
    setTimeout(function() {
      statusElement.style.display = 'none';
    }, 3000);
  }
}); 