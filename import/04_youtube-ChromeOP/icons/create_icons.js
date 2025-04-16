// SVGからPNGアイコンを生成するスクリプト
// 使用例: node create_icons.js

const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// アイコンサイズのリスト
const sizes = [16, 48, 128];

// SVGファイルの読み込み
const svgPath = './icon.svg';
const svgData = fs.readFileSync(svgPath, 'utf-8');

// Base64エンコードしてdata URLを作成
const svgBase64 = Buffer.from(svgData).toString('base64');
const dataURL = `data:image/svg+xml;base64,${svgBase64}`;

// 各サイズのPNGファイルを生成
async function generateIcons() {
  try {
    const image = await loadImage(dataURL);
    
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // SVGを描画
      ctx.drawImage(image, 0, 0, size, size);
      
      // PNGとして保存
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(`./icon${size}.png`, buffer);
      
      console.log(`Created icon${size}.png`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

// 実行
generateIcons();

// 注意: このスクリプトを実行するには、以下のコマンドが必要です:
// npm install canvas 