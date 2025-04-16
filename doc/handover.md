# vibe-coding プロジェクト引き継ぎ書

## 1. プロジェクト概要

このリポジトリには以下の5つのプロジェクトが含まれています：

### 1.1 infographic-gen/
インフォグラフィック生成Webアプリケーション
- **目的**: Claude 3.7 Sonnetを活用し、テキストからHTMLベースのインフォグラフィックを生成
- **技術スタック**: Next.js 15.1.3, React 19.0.0, Tailwind CSS 3.4.17, shadcn/ui 2.1.8
- **ステータス**: 開発中

### 1.2 04_youtube-ChromeOP/
YouTube データ抽出Chrome拡張
- **目的**: YouTube動画のメタデータ、字幕、コメントを自動収集
- **技術**: Chrome Extension Manifest V3
- **ステータス**: 実装済み

### 1.3 03_research-app/
ソース統合型リサーチ・レポート生成Webアプリケーション
- **目的**: 複数ソースからの情報統合と文書生成
- **技術スタック**: Next.js 14, TypeScript, Tailwind CSS, Supabase
- **ステータス**: 実装中

### 1.4 02_ai-connect-teen/
中高生向けAIチャットアプリケーション
- **目的**: 中高生とAIの安全な対話プラットフォーム提供
- **技術スタック**: Next.js 14, TypeScript, PostgreSQL, Docker
- **ステータス**: 開発中

### 1.5 01_prompt-generator_20250319/
プロンプト生成ツール
- **目的**: AIプロンプトの生成と管理
- **技術スタック**: Next.js, TypeScript
- **ステータス**: 初期段階

## 2. 環境設定

### 2.1 共通要件
- Node.js: ^20.0.0
- TypeScript: ^5.0.0
- npm: ^10.0.0

### 2.2 プロジェクト固有の環境変数
各プロジェクトの`.env.local`ファイルに必要な環境変数を設定する必要があります。

#### infographic-gen/
```
ANTHROPIC_API_KEY=your_api_key_here
```

#### 03_research-app/
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
CLAUDE_API_KEY=your_claude_key
```

#### 02_ai-connect-teen/
```
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_nextauth_url
AI_API_KEY=your_ai_api_key
```

## 3. プロジェクトのセットアップ手順

### 3.1 共通手順
1. リポジトリのクローン
```bash
git clone https://github.com/your-org/vibe-coding.git
cd vibe-coding
```

2. 必要な環境変数の設定
- 各プロジェクトディレクトリで`.env.local`ファイルを作成
- 必要な環境変数を設定

### 3.2 プロジェクト固有のセットアップ

#### infographic-gen/
```bash
cd infographic-gen
npm install
npm run dev
```

#### 04_youtube-ChromeOP/
```bash
cd 04_youtube-ChromeOP
npm install
npm run generate-icons
npm run build
```
Chrome拡張のインストール:
1. Chrome で `chrome://extensions/` を開く
2. デベロッパーモードを有効化
3. `dist/youtube-data-extractor.zip` を読み込む

#### 03_research-app/
```bash
cd 03_research-app
npm install
npm run db:migrate
npm run dev
```

#### 02_ai-connect-teen/
```bash
cd 02_ai-connect-teen
docker-compose up -d db
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

#### 01_prompt-generator_20250319/
```bash
cd 01_prompt-generator_20250319
npm install
npm run dev
```

## 4. 開発ガイドライン

### 4.1 バージョン管理
- 各プロジェクトのバージョンは`package.json`で管理
- セマンティックバージョニングを採用

### 4.2 コーディング規約
- ESLintとPrettierの設定に従う
- TypeScriptの厳格モードを使用
- コンポーネントはatomicデザインパターンに従う

### 4.3 ドキュメント管理
- 各プロジェクトの`docs/`ディレクトリにドキュメントを保管
- バージョン番号を含むファイル名を使用
- Markdownフォーマットを使用

### 4.4 テスト
- ユニットテスト: Jest/Vitest
- E2Eテスト: Playwright
- テストカバレッジ目標: 80%以上

## 5. デプロイメント

### 5.1 infographic-gen/
- プラットフォーム: Vercel
- 本番URL: [未設定]
- デプロイコマンド: `vercel deploy`

### 5.2 04_youtube-ChromeOP/
- プラットフォーム: Chrome Web Store
- パッケージング: `npm run build`
- 配布方法: Chrome Web Store経由

### 5.3 03_research-app/
- プラットフォーム: Vercel + Supabase
- 本番URL: [未設定]
- データベース: Supabase PostgreSQL

### 5.4 02_ai-connect-teen/
- プラットフォーム: Vercel
- データベース: Supabase
- コンテナ: Docker Hub

### 5.5 01_prompt-generator_20250319/
- プラットフォーム: Vercel
- 本番URL: [未設定]

## 6. 連絡先とサポート

### 6.1 リポジトリ管理者
- 名前: [未設定]
- メール: [未設定]

### 6.2 技術サポート
- 問題報告: GitHub Issues
- 技術文書: 各プロジェクトの`docs/`ディレクトリ

## 7. 注意事項

1. 環境変数の管理
   - 本番環境の環境変数は必ず暗号化して管理
   - 開発環境の環境変数は`.env.local`で管理

2. セキュリティ
   - APIキーの定期的なローテーション
   - 依存パッケージの定期的な更新
   - セキュリティスキャンの定期実行

3. パフォーマンス
   - バンドルサイズの監視
   - パフォーマンスメトリクスの定期的な確認
   - 画像の最適化

4. アクセシビリティ
   - WAI-ARIAガイドラインの遵守
   - キーボードナビゲーションのサポート
   - スクリーンリーダー対応

## 8. 今後の計画

### 8.1 infographic-gen/
- AIモデルの精度向上
- テンプレートの追加
- エクスポート機能の強化

### 8.2 04_youtube-ChromeOP/
- 字幕翻訳機能の追加
- バッチ処理機能
- データ分析機能

### 8.3 03_research-app/
- AIによる自動要約機能
- 協調編集機能
- データ可視化の強化

### 8.4 02_ai-connect-teen/
- 保護者向けダッシュボード
- 学習進捗分析
- グループチャット機能

### 8.5 01_prompt-generator_20250319/
- プロンプトテンプレート
- バージョン管理
- 共有機能 