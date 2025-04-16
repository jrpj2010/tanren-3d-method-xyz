# VibeCoding - 議事録自動スライド変換アプリケーション

VibeCodingは議事録テキストを美しい明治・昭和モダンテイストのプレゼンテーションスライドに自動的に変換するアプリケーションです。AIが議事録を分析し、最適なスライド構成と内容を生成します。

## 機能

- テキスト入力/ファイルアップロードで議事録を取り込み
- AIによる自動スライド生成
- 美しい明治・昭和モダンテイストのSVGスライド
- トークスクリプト自動生成
- インフォグラフィック用の画像生成プロンプト作成
- プロジェクト管理機能

## 技術スタック

- **フロントエンド**: Next.js 15.1.3、React 18.2.0、Tailwind CSS 3.4.17
- **バックエンド処理**: Node.js 20.0.0
- **AI処理**: Claude-3-7-Sonnet-20250219 (Anthropic API)
- **データベース**: SQLite + Prisma
- **ファイル処理**: ローカルファイルシステム操作

## 開発環境のセットアップ

### 前提条件

- Node.js 20.0.0以上
- npm 10.0.0以上

### インストール手順

1. リポジトリをクローン
   ```
   git clone https://github.com/yourusername/vibe-coding.git
   cd vibe-coding
   ```

2. 依存関係のインストール
   ```
   npm install
   ```

3. 環境変数の設定
   - `.env`ファイルを作成し、以下の内容を追加
   ```
   DATABASE_URL="file:./dev.db"
   ANTHROPIC_API_KEY="YOUR_ANTHROPIC_API_KEY"
   ```
   - AnthropicのAPIキーを取得し、設定

4. データベースの初期化
   ```
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. 開発サーバーの起動
   ```
   npm run dev
   ```

6. ブラウザで http://localhost:3000 にアクセス

## 使い方

1. 「新規プロジェクト作成」ボタンをクリック
2. プロジェクト名と議事録テキストを入力
3. 「スライド生成」ボタンをクリック
4. 生成されたスライドを確認・ダウンロード

## ディレクトリ構造

```
vibe-coding/
├── app/                          # アプリケーションコード
│   ├── api/                      # APIエンドポイント
│   ├── components/               # UIコンポーネント
│   ├── hooks/                    # カスタムフック
│   ├── lib/                      # ユーティリティ関数
│   └── [routes]/                 # アプリケーションのページ
├── prisma/                       # Prismaデータベース設定
├── projects/                     # 生成されたプロジェクトファイル
└── doc/                          # ドキュメント
```

## ライセンス

このプロジェクトはISCライセンスの下で提供されています。 