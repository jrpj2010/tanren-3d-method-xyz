# AI Connect Teen

## 概要
- **プロジェクトの目的**: 中高生とAIが安全に対話できるメッセージングプラットフォームを提供し、学習支援と適切なコミュニケーションスキルの向上を促進する
- **主要機能**:
  - ユーザー認証・アカウント管理（生徒、教師、保護者の役割別）
  - AIチャットアシスタント（学習サポート）
  - メッセージング機能（教師と生徒間の安全な通信）
  - プロフィール管理
  - ダッシュボード・学習進捗管理
- **技術スタック**:
  - フロントエンド: Next.js 14 (App Router), TypeScript, Tailwind CSS
  - バックエンド: Next.js API Routes, Prisma ORM
  - データベース: PostgreSQL
  - 認証: NextAuth.js
  - コンテナ化: Docker, Docker Compose
  - デプロイ: Vercel (フロントエンド), Supabase (データベース)

## 開始方法

### 環境要件
- Node.js 18.x以上
- Docker Desktop
- Git

### インストール手順
1. リポジトリのクローン
```bash
git clone https://github.com/your-org/ai-connect-teen.git
cd ai-connect-teen
```

2. 依存関係のインストール
```bash
npm install
```

3. 環境変数の設定
```bash
cp .env.example .env.local
# .env.localファイルを編集して必要な環境変数を設定
```

### 設定手順
1. データベースのセットアップ
```bash
# Dockerでデータベースを起動
docker-compose up -d db

# Prismaマイグレーションの実行
npx prisma migrate dev
```

2. 初期データの投入
```bash
npx prisma db seed
```

### 起動方法
#### 開発モード
```bash
npm run dev
```

#### 本番モード
```bash
npm run build
npm start
```

#### Dockerを使用する場合
```bash
docker-compose up
```

## 開発環境

### 必要なツール
- VS Code または任意のコードエディタ
- Docker Desktop
- Postman（APIテスト用）

### 環境構築手順
詳細は `docs/development/setup_guide_v1.0.0.md` を参照

### テスト実行方法
```bash
# ユニットテスト
npm run test

# E2Eテスト
npm run test:e2e
```

## デプロイ

### デプロイフロー
1. 開発環境でのテスト
2. ステージング環境へのデプロイと検証
3. 本番環境へのデプロイ

詳細は `docs/operations/deployment_guide_v1.0.0.md` を参照

### 必要な環境変数
主要な環境変数:
- `DATABASE_URL`: データベース接続URL
- `NEXTAUTH_SECRET`: NextAuth.js用のシークレットキー
- `NEXTAUTH_URL`: アプリケーションのURL
- `AI_API_KEY`: AI APIのキー

完全なリストは `.env.example` ファイルを参照

### インフラ要件
- Vercelアカウント（フロントエンドとServerless Functions）
- PostgreSQLデータベース（Supabaseなど）
- S3互換ストレージ（アップロードファイル用）

## 運用・監視

### 監視項目
- APIリクエスト数とレスポンスタイム
- エラー率
- データベースパフォーマンス
- ユーザーアクティビティ（DAU/MAU）

### アラート設定
重要なアラート:
- サーバーダウン
- 高いエラー率
- 異常なリクエスト数

### トラブルシューティング
一般的な問題と解決方法については `docs/operations/troubleshooting_guide_v1.0.0.md` を参照

## ライセンス
本プロジェクトは [MIT License](LICENSE) の下で提供されています。
