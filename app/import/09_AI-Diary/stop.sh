#!/bin/bash

# AI-Diary Docker Container Stop Script
# ------------------------------------

# コンテナが実行中か確認
RUNNING_CONTAINER=$(docker ps -q -f name=ai-diary-app)
if [ -z "$RUNNING_CONTAINER" ]; then
  echo "AI-Diaryコンテナは実行されていません"
  exit 0
fi

# コンテナを停止
echo "AI-Diaryコンテナを停止します..."
docker stop $RUNNING_CONTAINER
docker rm $RUNNING_CONTAINER

echo "AI-Diaryコンテナを停止しました"
