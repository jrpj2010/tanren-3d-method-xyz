import { SlideData } from '../api/types';
import { SVG_CONFIG, COLOR_SCHEME } from '../api/config';

/**
 * スライドデータからSVGコードを生成する関数
 */
export const generateSvgFromSlideData = (slideData: SlideData): string => {
  const { title, columns } = slideData;
  
  // 各カラムのアクセントカラー
  const columnColors = [
    COLOR_SCHEME.ACCENT_1, // 左カラム: 朱色
    COLOR_SCHEME.ACCENT_2, // 中央カラム: 藍色
    COLOR_SCHEME.ACCENT_3, // 右カラム: 紫色
  ];
  
  // SVGの基本設定
  const width = 1920;
  const height = 1080;
  const columnWidth = 560;
  const columnGap = 40;
  const columnStart = 100;
  
  // SVGのヘッダー部分
  let svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <!-- 背景 -->
    <rect width="${width}" height="${height}" fill="${COLOR_SCHEME.SECONDARY}" />
    
    <!-- スライドタイトル -->
    <text x="${width/2}" y="80" text-anchor="middle" font-family="${SVG_CONFIG.FONT_FAMILY_SERIF}" font-size="${SVG_CONFIG.TITLE_FONT_SIZE}" font-weight="bold" fill="${COLOR_SCHEME.PRIMARY}" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">${title}</text>
    
    <!-- タイトル下の線と丸のアクセント -->
    <line x1="${width/2 - 150}" y1="100" x2="${width/2 + 150}" y2="100" stroke="${COLOR_SCHEME.PRIMARY}" stroke-width="2" />
    <circle cx="${width/2}" cy="100" r="4" fill="${COLOR_SCHEME.PRIMARY}" />
  `;
  
  // 各カラムの描画
  columns.forEach((column, index) => {
    const x = columnStart + index * (columnWidth + columnGap);
    const columnColor = columnColors[index];
    
    // カラムの背景
    svg += `
    <!-- カラム ${index + 1} -->
    <rect x="${x}" y="140" width="${columnWidth}" height="860" fill="${COLOR_SCHEME.SECONDARY}" stroke="${columnColor}" stroke-width="2" rx="4" ry="4" />
    
    <!-- カラムヘッダー -->
    <rect x="${x}" y="140" width="${columnWidth}" height="60" fill="${columnColor}" rx="4" ry="4" />
    <text x="${x + columnWidth/2}" y="180" text-anchor="middle" font-family="${SVG_CONFIG.FONT_FAMILY_SERIF}" font-size="${SVG_CONFIG.SUBTITLE_FONT_SIZE}" font-weight="bold" fill="white" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">${column.theme}</text>
    `;
    
    if (column.subTheme) {
      svg += `
      <text x="${x + columnWidth/2}" y="210" text-anchor="middle" font-family="${SVG_CONFIG.FONT_FAMILY_SANS}" font-size="14px" fill="${COLOR_SCHEME.PRIMARY}" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">${column.subTheme}</text>
      `;
    }
    
    // 本質セクション
    svg += `
    <!-- 本質セクション -->
    <text x="${x + 20}" y="250" font-family="${SVG_CONFIG.FONT_FAMILY_SERIF}" font-size="16px" font-weight="bold" fill="${columnColor}" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">■ ${column.essenceTitle}</text>
    <foreignObject x="${x + 20}" y="260" width="${columnWidth - 40}" height="100">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: ${SVG_CONFIG.FONT_FAMILY_SANS}; font-size: ${SVG_CONFIG.BODY_FONT_SIZE}; color: ${COLOR_SCHEME.PRIMARY}; letter-spacing: ${SVG_CONFIG.LETTER_SPACING}; line-height: 1.5;">
        ${column.essenceDescription}
      </div>
    </foreignObject>
    `;
    
    // ツールセクション
    let yPos = 370;
    
    if (column.toolName) {
      svg += `
      <!-- ツールセクション -->
      <rect x="${x + 20}" y="${yPos}" width="${columnWidth - 40}" height="30" fill="${columnColor}" fill-opacity="0.1" rx="2" ry="2" />
      <text x="${x + 30}" y="${yPos + 20}" font-family="${SVG_CONFIG.FONT_FAMILY_SANS}" font-size="14px" font-weight="bold" fill="${columnColor}" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">${column.toolName}</text>
      `;
      
      if (column.toolFeature) {
        svg += `
        <text x="${x + 30}" y="${yPos + 50}" font-family="${SVG_CONFIG.FONT_FAMILY_SANS}" font-size="${SVG_CONFIG.BODY_FONT_SIZE}" fill="${COLOR_SCHEME.PRIMARY}" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">${column.toolFeature}</text>
        `;
      }
      
      yPos += 80;
    }
    
    // 2つ目のツール（中央カラムのみ）
    if (index === 1 && column.toolName2) {
      svg += `
      <rect x="${x + 20}" y="${yPos}" width="${columnWidth - 40}" height="30" fill="${columnColor}" fill-opacity="0.1" rx="2" ry="2" />
      <text x="${x + 30}" y="${yPos + 20}" font-family="${SVG_CONFIG.FONT_FAMILY_SANS}" font-size="14px" font-weight="bold" fill="${columnColor}" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">${column.toolName2}</text>
      `;
      
      if (column.toolFeature2) {
        svg += `
        <text x="${x + 30}" y="${yPos + 50}" font-family="${SVG_CONFIG.FONT_FAMILY_SANS}" font-size="${SVG_CONFIG.BODY_FONT_SIZE}" fill="${COLOR_SCHEME.PRIMARY}" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">${column.toolFeature2}</text>
        `;
      }
      
      yPos += 80;
    }
    
    // 特徴セクション
    svg += `
    <!-- 特徴セクション -->
    <text x="${x + 20}" y="${yPos}" font-family="${SVG_CONFIG.FONT_FAMILY_SERIF}" font-size="16px" font-weight="bold" fill="${columnColor}" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">■ ${column.featureTitle}</text>
    `;
    
    yPos += 30;
    
    // 実践セクション
    svg += `
    <!-- 実践セクション -->
    <text x="${x + 20}" y="${yPos}" font-family="${SVG_CONFIG.FONT_FAMILY_SANS}" font-size="14px" font-weight="bold" fill="${columnColor}" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">📝 ${column.practiceHeading}</text>
    `;
    
    yPos += 30;
    
    // 実践ポイント
    if (column.practicePoints && column.practicePoints.length > 0) {
      column.practicePoints.forEach((point, i) => {
        svg += `
        <text x="${x + 30}" y="${yPos + i * 25}" font-family="${SVG_CONFIG.FONT_FAMILY_SANS}" font-size="${SVG_CONFIG.BODY_FONT_SIZE}" fill="${COLOR_SCHEME.PRIMARY}" letter-spacing="${SVG_CONFIG.LETTER_SPACING}">・${point}</text>
        `;
      });
    }
  });
  
  // SVGのフッター部分
  svg += `
  </svg>
  `;
  
  return svg;
};

/**
 * SVGをBase64形式に変換する関数
 */
export const svgToBase64 = (svg: string): string => {
  if (typeof window === 'undefined') {
    // サーバーサイド: Node.jsの場合
    const Buffer = require('buffer').Buffer;
    return Buffer.from(svg).toString('base64');
  } else {
    // クライアントサイド: ブラウザの場合
    return btoa(unescape(encodeURIComponent(svg)));
  }
};

/**
 * SVGをファイルとして保存するURL文字列を生成する関数
 */
export const getSvgDownloadUrl = (svg: string): string => {
  const base64 = svgToBase64(svg);
  return `data:image/svg+xml;base64,${base64}`;
}; 