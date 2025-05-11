// Chrome拡張をZIPファイルにパッケージングするスクリプト
// 使用例: node build.js

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// 出力ディレクトリが存在しない場合は作成
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// zipファイルの出力パス
const outputPath = path.join(distDir, 'youtube-data-extractor.zip');
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // 圧縮レベル
});

// エラーハンドリング
output.on('close', () => {
  console.log(`パッケージングが完了しました: ${outputPath}`);
  console.log(`合計サイズ: ${archive.pointer()} バイト`);
});

archive.on('error', (err) => {
  throw err;
});

// zipファイルへの書き込みを開始
archive.pipe(output);

// パッケージに含めるファイル
const filesToInclude = [
  'manifest.json',
  'background.js',
  'content.js',
  'popup.html',
  'popup.js',
  'options.html',
  'options.js',
  'offscreen.html',
  'offscreen.js',
  'icons/icon16.png',
  'icons/icon48.png',
  'icons/icon128.png'
];

// ファイルを追加
filesToInclude.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    // ファイルパスの親ディレクトリ部分を抽出
    const parentDir = path.dirname(file);
    
    if (parentDir !== '.') {
      // ディレクトリ構造を維持するためのパス設定
      archive.file(filePath, { name: file });
    } else {
      // ルートディレクトリのファイル
      archive.file(filePath, { name: path.basename(file) });
    }
  } else {
    console.warn(`警告: ファイルが見つかりません: ${file}`);
  }
});

// アーカイブを完了
archive.finalize();

// 注意: このスクリプトを実行するには、以下のコマンドが必要です:
// npm install archiver 