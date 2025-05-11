#!/bin/bash

# 変数設定
PROJECT_ID="your-gcp-project-id"
SERVICE_NAME="speaker-separation-app"
REGION="asia-northeast1"  # 東京リージョン
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

# ビルド
echo "Dockerイメージをビルドしています..."
docker build -t ${IMAGE_NAME} .

# GCRにプッシュ
echo "イメージをGoogle Container Registryにプッシュしています..."
docker push ${IMAGE_NAME}

# Cloud Runにデプロイ
echo "Cloud Runにデプロイしています..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --memory 2Gi \
  --cpu 2 \
  --timeout 900 \
  --concurrency 10 \
  --set-env-vars="HUGGINGFACE_TOKEN=${HUGGINGFACE_TOKEN}" \
  --allow-unauthenticated

echo "デプロイが完了しました！"
