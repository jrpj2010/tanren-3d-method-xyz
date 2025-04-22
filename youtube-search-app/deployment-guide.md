# デプロイメントガイド

このドキュメントでは、YouTube検索アプリをDockerとVercelを使用してデプロイする方法について説明します。

## Dockerを使用したデプロイ

### 前提条件
- Docker
- Docker Compose

### デプロイ手順

1. リポジトリをクローンまたはダウンロードします。

2. プロジェクトのルートディレクトリに移動します。
   ```bash
   cd youtube-search-app
   ```

3. Docker Composeを使用してアプリケーションをビルドおよび起動します。
   ```bash
   docker-compose up -d --build
   ```

4. アプリケーションにアクセスします。
   - フロントエンド: http://localhost
   - バックエンドAPI: http://localhost:8000/api

5. アプリケーションを停止するには、以下のコマンドを実行します。
   ```bash
   docker-compose down
   ```

## Vercelを使用したデプロイ

### 前提条件
- Vercelアカウント
- Vercel CLI（オプション）

### デプロイ手順

1. Vercelにログインします。

2. 新しいプロジェクトを作成します。
   - GitHubなどのリポジトリからプロジェクトをインポートするか、ローカルプロジェクトをアップロードします。

3. プロジェクト設定で、以下の環境変数を設定します。
   - `FLASK_ENV`: production
   - `YOUTUBE_API_KEY`: YouTubeのAPIキー

4. デプロイを開始します。Vercelは自動的に`vercel.json`ファイルを検出し、それに基づいてデプロイを行います。

5. デプロイが完了すると、VercelはプロジェクトのURLを提供します。このURLを使用してアプリケーションにアクセスできます。

### Vercel CLIを使用したデプロイ（オプション）

1. Vercel CLIをインストールします。
   ```bash
   npm install -g vercel
   ```

2. Vercel CLIにログインします。
   ```bash
   vercel login
   ```

3. プロジェクトのルートディレクトリに移動し、デプロイを開始します。
   ```bash
   cd youtube-search-app
   vercel
   ```

4. プロンプトに従って設定を行います。

5. デプロイが完了すると、VercelはプロジェクトのURLを提供します。

## 注意事項

- バックエンドサーバーはYouTube APIキーを必要とします。環境変数として設定するか、`.env`ファイルに追加してください。
- Vercelの無料プランでは、サーバーレス関数の実行時間に制限があります。大量のリクエストを処理する場合は、有料プランへのアップグレードを検討してください。
- Docker Composeを使用する場合、フロントエンドのビルド時にバックエンドAPIのURLを正しく設定してください。
