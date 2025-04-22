# Vercel用のREADME

## YouTube検索アプリ

このアプリケーションは、YouTubeの動画を検索し、字幕を取得・管理するためのツールです。

### 機能

- キーワードによる動画検索
- 日付、動画の長さ、並び順によるフィルタリング
- 動画の字幕取得と表示
- 字幕のダウンロード（Markdown形式）
- デバッグパネル（通信ログの表示）

### 技術スタック

#### バックエンド
- Python 3.10
- Flask
- YouTube Data API
- YouTube Transcript API

#### フロントエンド
- React
- TypeScript
- Material-UI
- Axios

### デプロイ方法

詳細なデプロイ手順については、`deployment-guide.md`を参照してください。

### 環境変数

バックエンドには以下の環境変数が必要です：
- `YOUTUBE_API_KEY`: YouTube Data APIのキー

### ライセンス

このプロジェクトはMITライセンスの下で公開されています。
