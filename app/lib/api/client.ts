// AIモデルとAPI設定の中核ファイル

import Anthropic from '@anthropic-ai/sdk';
import { API_CONFIG, getEnvVariable } from './config';
import { ClaudeApiRequest, ClaudeApiResponse, SlideData } from './types';

// APIキーの取得ロジック
function getApiKey(): string {
  // クライアントサイドでのみ localStorage を試す
  if (typeof window !== 'undefined') {
    const apiKeyFromStorage = localStorage.getItem('anthropic_api_key');
    if (apiKeyFromStorage) {
      console.log('Using API key from localStorage');
      return apiKeyFromStorage;
    }
  }
  // localStorage にない場合、またはサーバーサイドの場合は環境変数から取得
  console.log('Using API key from environment variable');
  return getEnvVariable('ANTHROPIC_API_KEY');
}

const apiKey = getApiKey();

// API接続情報をログに出力（APIキーは安全のため一部マスク）
console.log('Anthropic API 設定:', {
  // apiBaseURL は削除済み
  apiKeyLength: apiKey.length,
  apiKeyPrefix: apiKey.substring(0, 4) + '...',
  model: API_CONFIG.CLAUDE_MODEL,
  maxTokens: API_CONFIG.MAX_TOKENS_TO_SAMPLE
});

// Anthropic Claude API クライアントの初期化
// 128Kトークン出力を有効にするためのベータヘッダー
export const anthropicClient = new Anthropic({
  apiKey: apiKey,
  // baseURL は最新SDKでは不要なため削除
  defaultHeaders: {
    'anthropic-beta': 'output-128k-2025-02-19'
  }
});

// システムプロンプト
const SYSTEM_PROMPT = `
あなたは議事録を分析して明治・昭和モダンテイストの美しいスライドを生成するAIアシスタントです。
与えられたテキストから、重要なポイントを抽出し、各スライドに3つのカラムで構造化された内容を作成してください。

以下のルールに従ってください：
1. 各スライドには明確なタイトルをつけ、内容を3つのカラムに分割する
2. 各カラムには関連する内容をまとめ、短く簡潔な表現を使用する
3. スライドは明治・昭和モダンテイストのデザインに適した内容にする
4. トークスクリプトは1分程度（約300文字）で話せる量にする
5. 画像生成プロンプトは英語で、カンマ区切りのキーワードリストとする

各スライドには以下の内容を含めてください：
- タイトル
- 3つのカラムの内容（各カラムは特定のテーマ、サブテーマ、本質、特徴などの要素を含む）
- トークスクリプト（そのスライドについて話す内容）
- 画像生成プロンプト（各カラムに対応する画像生成用のプロンプト）

必ず指定されたJSON形式で出力してください。空欄がある場合は、関連する内容で埋めてください。

重要: 応答はJSON配列のみにしてください。JSON以外のテキストは応答に含めないでください。
`;

// 文字列をJSON安全な形式に変換する関数
export const toJsonSafeString = (str: string): string => {
  return str.replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r').replace(/"/g, '\\"');
};

// JSON文字列をパースする関数（エラーハンドリング付き）
export const safeJsonParse = <T>(jsonString: string): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('JSON解析エラー:', error);
    throw new Error(`JSONの解析に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// SVGコードを生成する関数
export const generateSvgCode = (title: string, columns: any[]): string => {
  // SVGコードの生成ロジックをここに実装
  return `<svg>...</svg>`;
};

// Claude APIでスライドデータを生成するメソッド
export async function generateSlideData(
  content: string,
  numberOfSlides: number = 5,
  systemPromptOverride?: string // ★ オプション引数を追加
): Promise<SlideData[]> {
  try {
    console.log(`スライドデータ生成開始: ${numberOfSlides}枚, テキスト長: ${content.length}文字`);
    // 使用するシステムプロンプトを決定 (引数があればそれを優先)
    const finalSystemPrompt = systemPromptOverride || SYSTEM_PROMPT;
    console.log(`使用するシステムプロンプト: ${systemPromptOverride ? 'カスタム' : 'デフォルト'}, 長さ: ${finalSystemPrompt.length}`);
    
    const userPrompt = `
    以下の議事録テキストから、${numberOfSlides}枚のスライドを生成してください。
    各スライドは3カラム構造で、SVGコード、トークスクリプト、画像生成プロンプトを含めてください。
    
    議事録テキスト:
    ${content.length > 200 ? content.substring(0, 200) + '...(省略)' : content}
    
    以下のJSON形式で結果を返してください:
    [
      {
        "title": "スライドタイトル",
        "columns": [
          {
            "theme": "左カラムのテーマ",
            "subTheme": "左カラムのサブテーマ",
            "essenceTitle": "左カラムの本質タイトル",
            "essenceDescription": "左カラムの本質説明",
            "toolName": "左カラムのツール名",
            "toolFeature": "左カラムのツール特徴",
            "featureTitle": "左カラムの特徴タイトル",
            "practiceHeading": "左カラムの実践見出し",
            "practicePoints": ["実践ポイント1", "実践ポイント2"]
          },
          {
            "theme": "中央カラムのテーマ",
            "subTheme": "中央カラムのサブテーマ",
            "essenceTitle": "中央カラムの本質タイトル",
            "essenceDescription": "中央カラムの本質説明",
            "toolName": "中央カラムのツール名1",
            "toolFeature": "中央カラムのツール特徴1",
            "toolName2": "中央カラムのツール名2",
            "toolFeature2": "中央カラムのツール特徴2",
            "featureTitle": "中央カラムの特徴タイトル",
            "practiceHeading": "中央カラムの実践見出し",
            "practicePoints": ["実践ポイント1", "実践ポイント2"]
          },
          {
            "theme": "右カラムのテーマ",
            "subTheme": "右カラムのサブテーマ",
            "essenceTitle": "右カラムの本質タイトル",
            "essenceDescription": "右カラムの本質説明",
            "toolName": "右カラムのツール名",
            "toolFeature": "右カラムのツール特徴",
            "featureTitle": "右カラムの特徴タイトル",
            "practiceHeading": "右カラムの実践見出し",
            "practicePoints": ["実践ポイント1", "実践ポイント2"]
          }
        ],
        "talkScript": "このスライドについてのトークスクリプト（1分間、約300文字）",
        "imagePrompts": [
          "左カラム用の画像生成プロンプト（カンマ区切り、英語）",
          "中央カラム用の画像生成プロンプト（カンマ区切り、英語）",
          "右カラム用の画像生成プロンプト（カンマ区切り、英語）"
        ]
      }
    ]
    `;

    // 修正: contentをtext型オブジェクトの配列として定義
    const requestOptions = {
      model: "claude-3-7-sonnet-20250219", // モデル名を直接指定
      max_tokens: API_CONFIG.MAX_TOKENS_TO_SAMPLE,
      system: finalSystemPrompt, // ★ 決定されたプロンプトを使用
      messages: [
        {
          role: 'user' as 'user', // キャストを元に戻す
          content: [
            {
              type: 'text' as 'text', // キャストを元に戻す
              text: userPrompt
            }
          ]
        }
      ],
      temperature: 0.7
    };
    
    console.log('Claude API リクエスト設定:', {
      model: requestOptions.model,
      max_tokens: requestOptions.max_tokens,
      temperature: requestOptions.temperature,
      systemPromptLength: SYSTEM_PROMPT.length,
      betaHeader: 'output-128k-2025-02-19',
      contentType: 'text[]'
    });

    // Claude APIを直接呼び出す
    const response = await anthropicClient.messages.create(requestOptions);
    
    console.log('Claude API レスポンス受信:', {
      statusCode: 200,
      contentType: typeof response.content[0].text,
      contentLength: response.content[0].text.length,
      id: response.id,
      model: response.model,
    });

    // レスポンスからテキストコンテンツを抽出
    const responseText = response.content[0].text;
    
    try {
      // レスポンステキストからJSON部分を抽出
      // 先頭の ```json と末尾の ``` を除去
      let jsonText = responseText.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.substring(7); // ```json の7文字を除去
      }
      if (jsonText.endsWith('```')) {
        jsonText = jsonText.substring(0, jsonText.length - 3); // 末尾の ``` の3文字を除去
      }
      jsonText = jsonText.trim(); // 再度トリム

      // JSON文字列が配列またはオブジェクトで始まっているか簡易チェック
      if (!jsonText.startsWith('[') && !jsonText.startsWith('{')) {
         console.error('抽出後のテキストがJSON形式ではありません:', jsonText.substring(0, 200) + '...');
         throw new Error('レスポンスから有効なJSONデータを抽出できませんでした');
      }

      console.log('抽出・整形されたJSONデータ（先頭200文字）:', jsonText.substring(0, 200) + '...');

      const slideData = JSON.parse(jsonText) as SlideData[];
      console.log(`パース完了: ${slideData.length}枚のスライドデータ`);
      
      return slideData;
    } catch (parseError) {
      console.error('JSON解析エラー:', parseError);
      console.error('レスポンステキスト（先頭500文字）:', responseText.substring(0, 500) + '...');
      throw new Error(`スライドデータの解析に失敗しました: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }
  } catch (error: any) {
    // エラーオブジェクトから詳細情報を抽出
    const errorDetails = {
      message: error.message,
      status: error.status,
      name: error.name,
      type: error.type,
      errorType: error.error?.type,
      errorMessage: error.error?.message,
    };
    console.error('スライドデータの生成中にエラーが発生しました:', errorDetails);
    
    // エラーの詳細情報をログ出力
    if (error.status === 404) {
      console.error('404エラー: APIエンドポイントまたはモデルが見つかりません。モデル名を確認してください:', API_CONFIG.CLAUDE_MODEL);
    } else if (error.status === 401) {
      console.error('401エラー: 認証エラー。APIキーを確認してください');
    }
    
    throw error;
  }
} 