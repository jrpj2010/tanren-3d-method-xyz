// API関連の型定義

// スライドの3カラム構造のデータ型
export interface ColumnData {
  theme: string;
  subTheme?: string;
  essenceTitle: string;
  essenceDescription: string;
  toolName?: string;
  toolFeature?: string;
  toolName2?: string; // 中央カラムのみ
  toolFeature2?: string; // 中央カラムのみ
  featureTitle: string;
  practiceHeading: string;
  practicePoints: string[];
}

// スライド全体のデータ型
export interface SlideData {
  title: string;
  columns: [ColumnData, ColumnData, ColumnData]; // 左、中央、右の3カラム
  talkScript: string;
  imagePrompts: string[];
}

// プロジェクトデータ型
export interface ProjectData {
  id?: string;
  name: string;
  content: string;
  slides?: SlideData[];
  createdAt?: Date;
  updatedAt?: Date;
}

// API レスポンス型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Claude APIリクエスト型
export interface ClaudeApiRequest {
  model: string;
  messages: ClaudeMessage[];
  max_tokens: number;
  temperature?: number;
  system?: string;
}

// Claude APIメッセージ型
export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string | ClaudeContent[];
}

// Claude APIコンテンツ型
export interface ClaudeContent {
  type: 'text' | 'image';
  text?: string;
  source?: {
    type: 'base64';
    media_type: string;
    data: string;
  };
}

// Claude APIレスポンス型
export interface ClaudeApiResponse {
  id: string;
  type: string;
  role: string;
  content: ClaudeContent[];
  model: string;
  stop_reason: string;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
} 