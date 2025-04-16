#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');

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
  
  while (hasMore && allMessages.length < maxCount) {
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
      hasMore = false;
      break;
    }
    
    console.log(`${messages.length} 件のメッセージを取得しました (合計: ${allMessages.length + messages.length})`);
    
    // 最も古いメッセージIDを記録
    const sortedMessages = [...messages].sort((a, b) => a.send_time - b.send_time);
    if (sortedMessages.length > 0) {
      oldestMessageId = sortedMessages[0].message_id;
    }
    
    // 重複を避けるために配列をマージ
    const messageIds = new Set(allMessages.map(m => m.message_id));
    const newMessages = messages.filter(m => !messageIds.has(m.message_id));
    
    allMessages = [...allMessages, ...newMessages];
    
    // 新しいメッセージがない、または取得件数が1件以下であれば終了
    if (newMessages.length <= 1) {
      hasMore = false;
    } else {
      // APIリクエスト制限を超えないようにするため少し待機
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // 日付の新しい順に並べ替え
  return allMessages.sort((a, b) => b.send_time - a.send_time);
}

// 対話的にルームIDを入力させる
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('ChatWorkのルームIDを入力してください: ', async (roomId) => {
  if (!roomId || isNaN(parseInt(roomId))) {
    console.error('無効なルームIDです');
    rl.close();
    return;
  }
  
  const token = process.env.CHATWORK_API_TOKEN;
  if (!token) {
    console.error('環境変数 CHATWORK_API_TOKEN が設定されていません');
    rl.close();
    return;
  }

  try {
    // 全メッセージを取得（最大10000件）
    const messages = await getAllMessages(roomId, token);
    console.log(`合計 ${messages.length} 件のメッセージを取得しました`);
    
    // CSV形式で出力
    const outputFile = path.join(process.cwd(), `chatwork_room_${roomId}_messages_full.csv`);
    
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
    
    // メッセージをCSV行に変換
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
  } catch (error) {
    console.error('エラーが発生しました:', error.message);
  }
  
  rl.close();
}); 