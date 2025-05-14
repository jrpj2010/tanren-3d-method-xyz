#!/bin/bash

# AIダイアリーアプリを環境変数ファイルから起動するスクリプト
# ------------------------------------------------

# .envファイルが存在するか確認
if [ ! -f .env ]; then
  echo "エラー: .envファイルが見つかりません。"
  echo "先に以下のコマンドでAPIキーを設定してください："
  echo "./setup-key.sh <GEMINI_API_KEY>"
  exit 1
fi

# .envファイルから環境変数を読み込み
source .env

# APIキーが設定されているか確認
if [ -z "$GEMINI_API_KEY" ]; then
  echo "エラー: GEMINI_API_KEYが.envファイルに設定されていません。"
  echo "再度./setup-key.shを実行してAPIキーを設定してください。"
  exit 1
fi

# コンテナがすでに実行されているか確認
RUNNING_CONTAINER=$(docker ps -q -f name=ai-diary-app)
if [ -n "$RUNNING_CONTAINER" ]; then
  echo "すでに実行中のAI-Diaryコンテナを停止します..."
  docker stop $RUNNING_CONTAINER
  docker rm $RUNNING_CONTAINER
fi

# イメージが存在するか確認し、なければビルド
IMAGE_EXISTS=$(docker images -q ai-diary-app:latest)
if [ -z "$IMAGE_EXISTS" ]; then
  echo "AI-Diaryイメージをビルドします..."
  docker build -t ai-diary-app:latest .
fi

# コンテナを実行
echo "AI-Diaryコンテナを起動します..."
docker run -d --name ai-diary-app -p 8088:8080 -e GEMINI_API_KEY="$GEMINI_API_KEY" ai-diary-app:latest

echo "------------------------------------"
echo "AI-Diaryが起動しました！"
echo "ブラウザで http://localhost:8088 にアクセスして利用できます"
echo "------------------------------------"
