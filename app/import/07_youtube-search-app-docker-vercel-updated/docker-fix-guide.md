# Docker修正ガイド

## 問題の解決方法

このガイドでは、YouTube検索アプリのDockerコンテナ化における「isodate」モジュールの問題を解決する方法を説明します。

### 修正内容

1. **requirements.txtの更新**
   - `isodate==0.6.1`を追加しました
   - これにより、バックエンドがクラッシュする原因となっていた「ModuleNotFoundError: No module named 'isodate'」エラーが解消されます

2. **docker-compose.ymlの更新**
   - Google認証情報の設定を追加
   - ヘルスチェック機能を追加
   - 環境変数の設定を強化

3. **ヘルスチェック機能の実装**
   - `health.py`ファイルを新規作成
   - `/health`エンドポイントを追加
   - `app.py`にヘルスチェックBlueprintを登録

### Dockerコンテナの再ビルド手順

1. 更新されたファイルを適切な場所に配置します

2. 以下のコマンドでDockerコンテナを再ビルドします：
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

3. ログを確認して、エラーが解消されていることを確認します：
   ```bash
   docker logs youtube-search-backend --tail 50
   ```

4. ヘルスチェックエンドポイントが正常に動作していることを確認します：
   ```bash
   curl http://localhost:8000/health
   ```

### 注意事項

- `--no-cache`オプションを使用することで、古いキャッシュを使わず、確実に新しいイメージを作成します
- YouTubeのAPIキーは実際の値に置き換えてください
- Google認証情報のパスは実際の環境に合わせて調整してください

この修正により、バックエンドサーバーが正常に起動し、フロントエンドからの操作が可能になります。
