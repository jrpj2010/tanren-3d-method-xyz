#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');

// コマンドライン引数からルームIDを取得
const args = process.argv.slice(2);
let roomIdArg = null;

// --room-id=123456 または -r 123456 形式の引数をパース
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--room-id=')) {
    roomIdArg = args[i].split('=')[1];
    break;
  } else if (args[i] === '-r' && i + 1 < args.length) {
    roomIdArg = args[i + 1];
    break;
  }
}

// CSVエスケープ関数
function escapeCSV(text) {
  if (text === null || text === undefined) return '';
  const str = String(text);
  // カンマやダブルクォートを含む場合、ダブルクォートで囲む
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    // 内部のダブルクォートは2つのダブルクォートにエスケープ
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// 日時をフォーマットする関数
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toISOString().replace('T', ' ').slice(0, 19);
}

// HTTPSリクエストを行う関数
function httpsRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`JSON解析エラー: ${e.message}`));
          }
        } else {
          reject(new Error(`ステータスコード ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// メッセージを取得する関数（ページング対応版）
async function getAllMessages(roomId, token, maxCount = 10000) {
  console.log(`ルーム ${roomId} のメッセージを取得中...`);
  
  let allMessages = [];
  let oldestMessageId = null;
  let hasMore = true;
  let batchCount = 0;
  
  while (hasMore && allMessages.length < maxCount) {
    batchCount++;
    let path = `/v2/rooms/${roomId}/messages?force=1`;
    if (oldestMessageId) {
      path += `&message_id=${oldestMessageId}`;
    }
    
    const messages = await httpsRequest({
      hostname: 'api.chatwork.com',
      path: path,
      method: 'GET',
      headers: {
        'X-ChatWorkToken': token
      }
    });
    
    if (!Array.isArray(messages) || messages.length === 0) {
      console.log('これ以上メッセージはありません');
      hasMore = false;
      break;
    }
    
    console.log(`バッチ ${batchCount}: ${messages.length} 件のメッセージを取得しました`);
    
    // 最も古いメッセージIDを記録
    const sortedMessages = [...messages].sort((a, b) => a.send_time - b.send_time);
    if (sortedMessages.length > 0) {
      oldestMessageId = sortedMessages[0].message_id;
      const oldestDate = formatDate(sortedMessages[0].send_time);
      console.log(`最も古いメッセージの日時: ${oldestDate}`);
    }
    
    // 重複を避けるために配列をマージ
    const messageIds = new Set(allMessages.map(m => m.message_id));
    const newMessages = messages.filter(m => !messageIds.has(m.message_id));
    
    const duplicateCount = messages.length - newMessages.length;
    if (duplicateCount > 0) {
      console.log(`重複するメッセージを ${duplicateCount} 件スキップしました`);
    }
    
    allMessages = [...allMessages, ...newMessages];
    console.log(`現在の合計: ${allMessages.length} 件`);
    
    // 新しいメッセージがない、または取得件数が1件以下であれば終了
    if (newMessages.length <= 1) {
      console.log('これ以上新しいメッセージはありません');
      hasMore = false;
    } else {
      // APIリクエスト制限を超えないようにするため少し待機
      console.log('次のバッチを取得するまで1秒待機...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // 日付の新しい順に並べ替え
  console.log('メッセージを日付順に並べ替えています...');
  return allMessages.sort((a, b) => b.send_time - a.send_time);
}

// メイン処理
async function main(roomId) {
  const token = process.env.CHATWORK_API_TOKEN;
  if (!token) {
    console.error('環境変数 CHATWORK_API_TOKEN が設定されていません');
    return;
  }

  try {
    // ルーム情報を取得
    const roomInfo = await httpsRequest({
      hostname: 'api.chatwork.com',
      path: `/v2/rooms/${roomId}`,
      method: 'GET',
      headers: {
        'X-ChatWorkToken': token
      }
    });
    
    console.log(`ルーム名: ${roomInfo.name}`);
    
    // 全メッセージを取得（最大10000件）
    const messages = await getAllMessages(roomId, token);
    console.log(`最終的に合計 ${messages.length} 件のメッセージを取得しました`);
    
    if (messages.length === 0) {
      console.log('メッセージが見つかりませんでした');
      return;
    }
    
    // 最新と最古のメッセージの日時を表示
    const newestDate = formatDate(messages[0].send_time);
    const oldestDate = formatDate(messages[messages.length - 1].send_time);
    console.log(`期間: ${oldestDate} ～ ${newestDate}`);
    
    // CSV形式で出力
    const outputFileName = `chatwork_${roomInfo.name.replace(/[\\/:*?"<>|]/g, '_')}_${roomId}_messages.csv`;
    const outputFile = path.join(process.cwd(), outputFileName);
    
    // CSVヘッダー
    const csvHeader = [
      'メッセージID',
      '送信者ID',
      '送信者名',
      '送信日時',
      '更新日時',
      'メッセージ本文'
    ].map(escapeCSV).join(',');
    
    // ユーザー情報を取得
    console.log('ルームメンバー情報を取得中...');
    const users = await httpsRequest({
      hostname: 'api.chatwork.com',
      path: `/v2/rooms/${roomId}/members`,
      method: 'GET',
      headers: {
        'X-ChatWorkToken': token
      }
    });
    
    const userMap = {};
    users.forEach(user => {
      userMap[user.account_id] = user.name;
    });
    console.log(`${users.length} 人のメンバー情報を取得しました`);
    
    // メッセージをCSV行に変換
    console.log('CSVデータに変換中...');
    const csvRows = messages.map(msg => {
      return [
        msg.message_id,
        msg.account.account_id,
        userMap[msg.account.account_id] || msg.account.name,
        formatDate(msg.send_time),
        msg.update_time ? formatDate(msg.update_time) : '',
        msg.body
      ].map(escapeCSV).join(',');
    });
    
    // CSVファイルに書き込み
    fs.writeFileSync(outputFile, csvHeader + '\n' + csvRows.join('\n'));
    
    console.log(`メッセージをCSVファイルに保存しました: ${outputFile}`);
    console.log('エクスポート完了！');
    
  } catch (error) {
    console.error('エラーが発生しました:', error.message);
  }
}

// ルームIDが引数で指定されていればそれを使う、なければ対話的に入力を求める
if (roomIdArg) {
  main(roomIdArg);
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('ChatWorkのルームIDを入力してください: ', (roomId) => {
    if (!roomId || isNaN(parseInt(roomId))) {
      console.error('無効なルームIDです');
      rl.close();
      return;
    }
    
    rl.close();
    main(roomId);
  });
}

// 使い方を表示
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
ChatWork メッセージエクスポートツール

使用方法:
  node ${path.basename(__filename)} [オプション]

オプション:
  -r, --room-id=ID   エクスポートするChatWorkのルームID
  -h, --help         このヘルプメッセージを表示

環境変数:
  CHATWORK_API_TOKEN  ChatWork APIトークン（必須）

例:
  node ${path.basename(__filename)} -r 123456
  node ${path.basename(__filename)} --room-id=123456
  CHATWORK_API_TOKEN=your_token node ${path.basename(__filename)} -r 123456
`);
  process.exit(0);
} 