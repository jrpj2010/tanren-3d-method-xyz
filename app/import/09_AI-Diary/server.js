const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// 環境変数からAPIキーを読み込む。Cloud Runで設定することを想定。
const geminiApiKey = process.env.GEMINI_API_KEY;

app.get('/', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'AI駆動型「超自分」発見・30日トーク日記アプリ.html');
  fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading HTML file:', err);
      return res.status(500).send('Error loading the page.');
    }

    // APIキーが設定されていなければエラーメッセージを表示、またはデフォルトの動作をさせる
    if (!geminiApiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set.');
      // 本番環境ではここでエラー終了させるか、機能制限モードで動作させるべき
      // ここでは、キーがない状態でHTMLを返し、クライアント側でキーがない旨の警告を出すことを期待
    }

    // HTMLにAPIキーを注入する (scriptタグを挿入する単純な方法)
    // より堅牢な方法として、テンプレートエンジンを使うことも考えられます。
    const injectedHtml = htmlData.replace(
      '<head>',
      `<head>\n    <script>window.GEMINI_API_KEY = "${geminiApiKey || ''}";</script>`
    );

    res.send(injectedHtml);
  });
});

// 静的ファイル (CSS, JS画像など) があれば、ここで提供できますが、
// 今回はHTMLに全て埋め込まれている想定なので、特別な設定は不要です。
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  if (!geminiApiKey) {
    console.log('Warning: GEMINI_API_KEY is not set. The application might not work as expected.');
  }
});
