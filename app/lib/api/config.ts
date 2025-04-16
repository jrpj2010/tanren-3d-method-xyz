// 環境設定の一元管理ファイル

// APIのベースURLとバージョン
export const API_CONFIG = {
  ANTHROPIC_API_VERSION: '2023-06-01',
  CLAUDE_MODEL: 'claude-3-7-sonnet-20250219',
  MAX_TOKENS_TO_SAMPLE: 128000, // 128kに修正
};

// 環境変数を取得する関数
export function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`環境変数 ${name} が設定されていません`);
  }
  return value;
}

// テーマカラー設定 - 明治・昭和モダンテイスト
export const COLOR_SCHEME = {
  PRIMARY: '#2c2c2c',       // 黒 - ヘッダーやメインテキスト
  SECONDARY: '#f4f1ea',     // 生成色 - 背景や補助的な要素
  ACCENT_1: '#b3322b',      // 朱色 - 強調や重要な要素、ボタン
  ACCENT_2: '#1a5b66',      // 藍色 - セカンダリーアクセント、リンク
  ACCENT_3: '#653a5e',      // 紫色 - 特殊な強調、ハイライト
  BACKGROUND: '#f8f8f5',    // わずかに色味のある白 - ページ背景
};

// アプリケーション全体の設定
export const APP_CONFIG = {
  DEFAULT_SLIDE_COUNT: 5,
  MAX_SLIDE_COUNT: 50, // スライド枚数の最大値を50に修正
  SVG_WIDTH: 1920,
  SVG_HEIGHT: 1080,
  MAX_TEXT_LENGTH: 150000, // 一度に処理できるテキストの最大長 (15万に修正)
};

// AIの設定
export const AI_CONFIG = {
  TEMPERATURE: 0.7,
  SYSTEM_ROLE: 'assistant',
};

// SVGテンプレート関連の設定
export const SVG_CONFIG = {
  FONT_FAMILY_SERIF: 'Noto Serif JP', // 明朝体
  FONT_FAMILY_SANS: 'Noto Sans JP', // ゴシック体
  TITLE_FONT_SIZE: '24px',
  SUBTITLE_FONT_SIZE: '18px',
  BODY_FONT_SIZE: '11px',
  LETTER_SPACING: '0.05em',
}; 