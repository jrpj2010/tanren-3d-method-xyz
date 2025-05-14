# AI超自分ダイアリー

AI駆動型「超自分」発見・30日トーク日記アプリケーション。Gemini APIを活用して、日々の音声日記やテキスト日記を「思考3Dメソッド（XYZ軸）」に基づいて9つの視点から分析し、自己理解を深めるアプリです。

## 必要条件

- Docker
- Gemini API キー
- ブラウザ（Chrome、Firefox、Safari など）

## セットアップと起動方法

1. このリポジトリをクローンまたはダウンロードします

2. Gemini APIキーを取得します
   - [Google AI Studio](https://makersuite.google.com/app/apikey)から取得できます

3. アプリケーションを起動します

   **方法1: 直接APIキーを渡す**
   ```bash
   ./start.sh <あなたのGemini APIキー>
   ```
   例：
   ```bash
   ./start.sh AIzaSyDvZa5QTmqdAB0do_K3W5NAeW6di69_3BI
   ```

   **方法2: 環境変数ファイルを使用する（推奨）**
   ```bash
   # 初回のみ: APIキーを環境変数ファイルに保存
   ./setup-key.sh <あなたのGemini APIキー>

   # 起動（以降はこのコマンドだけで起動できます）
   ./start-with-env.sh
   ```

4. ブラウザで以下のURLにアクセスします
   ```
   http://localhost:8088
   ```

5. アプリケーションを停止するには、以下のコマンドを実行します
   ```bash
   ./stop.sh
   ```

## アプリケーションの機能

- 日々の振り返りをテキストで入力
- Gemini AIによる思考3Dメソッド（XYZ軸）に基づく9つの視点からの分析
- 分析結果の可視化と保存
- 30日間の振り返りと成長の記録

## トラブルシューティング

- **APIキーが機能しない場合**:
  APIキーが正しいことを確認し、Gemini APIの利用制限に達していないか確認してください。

- **コンテナが起動しない場合**:
  ```bash
  docker logs ai-diary-app
  ```
  でエラーログを確認してください。

- **その他の問題**:
  イメージを再ビルドしてみてください：
  ```bash
  docker build -t ai-diary-app:latest .
  ```
