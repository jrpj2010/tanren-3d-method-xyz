# Docker 戦略 v1.0.0

## 概要
このドキュメントでは、AI Connect Teen プロジェクトのDocker環境構築戦略について説明します。
開発からデプロイまでの全工程をDockerベースで実施し、環境の再現性と一貫性を確保します。

## Docker環境構成
- 開発環境: `app-dev` サービス
- 本番環境: `app-prod` サービス
- CI/CD環境: ビルド用の一時的コンテナ

## コンテナ構成
- ベースイメージ: `node:18-alpine`
- マルチステージビルド:
  - deps: 依存関係インストール
  - dev: 開発環境
  - builder: ビルド実行
  - production: 本番環境

## 環境変数管理
- `.env.example`: サンプル環境変数
- `.env`: ローカル開発用（gitignore対象）
- Docker Compose環境変数：コンテナ実行時に注入

## ボリューム管理
- ソースコード: ホスト側の変更をコンテナに即時反映
- node_modules: コンテナ内で依存関係を管理し、ホストと分離

## 開発ワークフロー
1. `docker-compose up -d app-dev` で開発環境を起動
2. コードを編集（ホットリロードで即時反映）
3. `docker-compose exec app-dev npm test` でテスト実行
4. `docker-compose build app-prod` で本番イメージをビルド
5. `docker-compose --profile prod up -d` で本番環境をローカルで検証

## イメージ管理
- 開発イメージ: `ai-connect-teen:dev`
- 本番イメージ: `ai-connect-teen:X.Y.Z`（セマンティックバージョニングに対応）
- 最新本番イメージ: `ai-connect-teen:latest`

## バージョン履歴
- v1.0.0 (2025-03-21): 初版作成
