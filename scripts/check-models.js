const https = require('https');
require('dotenv').config();

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  console.error('ANTHROPIC_API_KEY is not set in environment variables');
  process.exit(1);
}

// APIリクエストのオプション
const options = {
  hostname: 'api.anthropic.com',
  path: '/v1/models',
  method: 'GET',
  headers: {
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01'
  }
};

// APIリクエストを送信
const req = https.request(options, (res) => {
  let data = '';

  // レスポンスデータを受信
  res.on('data', (chunk) => {
    data += chunk;
  });

  // レスポンスの完了時
  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const models = JSON.parse(data);
        console.log('利用可能なモデル一覧:');
        models.data.forEach(model => {
          console.log(`- ID: ${model.id}`);
          console.log(`  名前: ${model.display_name}`);
          console.log(`  作成日: ${model.created_at}`);
          console.log('---');
        });
      } catch (e) {
        console.error('JSONのパースに失敗しました:', e);
      }
    } else {
      console.error(`APIエラー: ステータスコード ${res.statusCode}`);
      console.error(data);
    }
  });
});

// エラーハンドリング
req.on('error', (e) => {
  console.error(`リクエストエラー: ${e.message}`);
});

// リクエスト完了
req.end(); 