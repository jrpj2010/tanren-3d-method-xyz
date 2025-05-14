#!/bin/bash

# AI-Diary Docker Container Startup Script
# ----------------------------------------

# APIキーが設定されているか確認
if [ -z "$1" ]; then
  echo "エラー: Gemini APIキーが指定されていません。"
  echo "使用方法: ./start.sh <GEMINI_API_KEY>"
  echo "例: ./start.sh AIzaSyDvZa5QTmqdAB0do_K3W5NAeW6di69_3BI"
  exit 1
fi

GEMINI_API_KEY=$1

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
