# Google Cloud Run デプロイ手順

このドキュメントでは、TANREN 3Dメソッドランディングページを Google Cloud Run にデプロイする手順を説明します。

## 前提条件

1. Google Cloud アカウントを持っていること
2. Google Cloud CLI (`gcloud`) がインストールされていること
3. Docker がインストールされていること

## セットアップ手順

### 1. Google Cloud CLIのインストール（未実施の場合）

Google Cloud CLIをインストールしていない場合は、[公式ドキュメント](https://cloud.google.com/sdk/docs/install)に従ってインストールしてください。

### 2. Google Cloud CLIの認証

```bash
gcloud auth login
```

### 3. プロジェクトの選択

```bash
# 既存のプロジェクトを使用する場合
gcloud config set project YOUR_PROJECT_ID

# 新しいプロジェクトを作成する場合
gcloud projects create YOUR_NEW_PROJECT_ID
gcloud config set project YOUR_NEW_PROJECT_ID
```

### 4. 必要なAPIの有効化

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## デプロイ手順

デプロイスクリプトを使用して簡単にデプロイできます。

```bash
# スクリプトに実行権限を付与（すでに実施済み）
chmod +x deploy-cloud-run.sh

# デプロイの実行
./deploy-cloud-run.sh
```

または、手動で以下のコマンドを実行することもできます：

1. Dockerイメージのビルド
```bash
export PROJECT_ID=$(gcloud config get-value project)
export SERVICE_NAME="tanren-3d-method"
docker build -t gcr.io/${PROJECT_ID}/${SERVICE_NAME} .
```

2. Google Container Registryへのプッシュ
```bash
docker push gcr.io/${PROJECT_ID}/${SERVICE_NAME}
```

3. Cloud Runへのデプロイ
```bash
gcloud run deploy ${SERVICE_NAME} \
  --image gcr.io/${PROJECT_ID}/${SERVICE_NAME} \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --port 8080
```

## デプロイ後の確認

デプロイが完了すると、以下のコマンドでサービスURLを取得できます：

```bash
gcloud run services describe ${SERVICE_NAME} --platform managed --region asia-northeast1 --format 'value(status.url)'
```

このURLにアクセスして、サイトが正常に表示されることを確認してください。

## トラブルシューティング

- **ビルドエラー**: Dockerfileや設定ファイルに誤りがないか確認してください。
- **デプロイエラー**: 権限や有効化されていないAPIがないか確認してください。
- **表示の問題**: ブラウザのデベロッパーツールでエラーがないか確認してください。

## その他の設定

- **カスタムドメイン**: Cloud Runサービスにカスタムドメインをマッピングする場合は、Google Cloudの[Cloud Run カスタムドメイン](https://cloud.google.com/run/docs/mapping-custom-domains)の手順を参照してください。
- **自動デプロイ**: GitHub Actionsを使用して、GitHubにプッシュした際に自動的にデプロイするようにすることもできます。