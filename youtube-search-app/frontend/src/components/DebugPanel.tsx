import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { ApiLogEntry } from '../context/SearchContext';

interface DebugPanelProps {
  apiLogs: ApiLogEntry[];
  onClearLogs?: () => void;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ apiLogs, onClearLogs }) => {
  // 重複するログを除去し、重要なイベントのみを表示
  const filterImportantLogs = (logs: ApiLogEntry[]) => {
    const filteredLogs: ApiLogEntry[] = [];
    const seenUrls = new Set<string>();
    
    // 逆順に処理して最新のログを優先
    for (let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      
      // 検索結果のレスポンスは常に表示
      if (log.type === 'response' && log.url.includes('/search')) {
        filteredLogs.unshift(log);
        continue;
      }
      
      // エラーは常に表示
      if (log.type === 'error') {
        filteredLogs.unshift(log);
        continue;
      }
      
      // 設定情報は最初の1回だけ表示
      if (log.type === 'info' && log.url === 'Configuration') {
        if (!seenUrls.has('Configuration')) {
          filteredLogs.unshift(log);
          seenUrls.add('Configuration');
        }
        continue;
      }
      
      // リクエストは種類ごとに最新のもののみ表示
      const requestKey = `${log.type}-${log.url.split('/').pop()}`;
      if (!seenUrls.has(requestKey)) {
        filteredLogs.unshift(log);
        seenUrls.add(requestKey);
      }
    }
    
    return filteredLogs;
  };
  
  // 重要なログのみをフィルタリング
  const importantLogs = filterImportantLogs(apiLogs);
  
  // ログメッセージを非エンジニア向けにわかりやすく生成する関数
  const formatLogMessage = (log: ApiLogEntry) => {
    let message = '';
    
    switch (log.type) {
      case 'request':
        if (log.url.includes('/search')) {
          message = `検索を開始しました`;
          if (log.params?.keyword) {
            message += `：「${log.params.keyword}」`;
          }
        } else if (log.url.includes('/download')) {
          message = `字幕とコメントのダウンロードを開始しました`;
        } else {
          message = `データの取得を開始しました`;
        }
        break;
        
      case 'response':
        if (log.url.includes('/search')) {
          if (log.data && typeof log.data === 'object' && log.data.items) {
            const count = Array.isArray(log.data.items) ? log.data.items.length : 0;
            if (count > 0) {
              message = `検索が完了しました：${count}件の動画が見つかりました`;
            } else {
              message = `検索が完了しましたが、動画は見つかりませんでした`;
            }
          } else {
            message = `検索が完了しました`;
          }
        } else if (log.url.includes('/download')) {
          message = `字幕とコメントのダウンロードが完了しました`;
        } else {
          message = `データの取得が完了しました`;
        }
        break;
        
      case 'error':
        if (log.url.includes('/search')) {
          message = `検索中にエラーが発生しました`;
        } else if (log.url.includes('/download')) {
          message = `字幕とコメントのダウンロード中にエラーが発生しました`;
        } else {
          message = `通信エラーが発生しました`;
        }
        
        // シンプルなエラーメッセージを追加
        if (log.error) {
          if (log.error.includes('Network Error')) {
            message += `：サーバーに接続できません`;
          } else if (log.error.includes('timeout')) {
            message += `：通信がタイムアウトしました`;
          } else if (log.error.includes('404')) {
            message += `：お探しのデータが見つかりません`;
          } else {
            message += `：しばらく経ってからもう一度お試しください`;
          }
        }
        break;
        
      case 'info':
        if (log.url === 'Configuration') {
          message = `アプリの準備ができました`;
        } else {
          message = `システム情報：${log.url}`;
        }
        break;
        
      default:
        message = `システム情報：${log.url}`;
    }
    
    return message;
  };

  // 日時を読みやすいフォーマットに変換する関数
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      return timestamp;
    }
  };

  if (importantLogs.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">通信ログ</Typography>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={onClearLogs}
            disabled
          >
            ログをクリア
          </Button>
        </Box>
        <Box 
          sx={{ 
            bgcolor: '#000', 
            color: '#0f0', 
            p: 2, 
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            height: '200px',
            overflow: 'auto'
          }}
        >
          <Typography variant="body2" sx={{ color: '#0f0', fontFamily: 'monospace' }}>
            ログはまだありません。検索を実行すると、ここに通信状況が表示されます。
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">通信ログ</Typography>
        <Button 
          variant="outlined" 
          size="small" 
          onClick={onClearLogs}
        >
          ログをクリア
        </Button>
      </Box>
      <Box 
        sx={{ 
          bgcolor: '#000', 
          color: '#0f0', 
          p: 2, 
          borderRadius: 1,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          height: '200px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      >
        {importantLogs.map((log, index) => (
          <div key={index} style={{ marginBottom: '4px' }}>
            {formatTimestamp(log.timestamp || '')} - {formatLogMessage(log)}
          </div>
        ))}
      </Box>
    </Paper>
  );
};

export default DebugPanel;
