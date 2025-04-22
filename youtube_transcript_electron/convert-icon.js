const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// アイコンのサイズ
const sizes = [16, 32, 64, 128, 256, 512, 1024];

// SVGファイルのパス
const svgPath = path.join(__dirname, 'icons', 'icon.svg');

// 出力ディレクトリ
const outputDir = path.join(__dirname, 'icons');

// 出力ディレクトリが存在しない場合は作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 各サイズのPNGを生成
async function generateIcons() {
  try {
    // SVGファイルを読み込む
    const svgBuffer = fs.readFileSync(svgPath);
    
    // 各サイズのPNGを生成
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon-${size}.png`);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`Generated ${outputPath}`);
    }
    
    // デフォルトのアイコン（512px）をicon.pngとしてコピー
    const defaultIconPath = path.join(outputDir, 'icon.png');
    fs.copyFileSync(path.join(outputDir, 'icon-512.png'), defaultIconPath);
    console.log(`Generated ${defaultIconPath}`);
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

// アイコン生成を実行
generateIcons();
