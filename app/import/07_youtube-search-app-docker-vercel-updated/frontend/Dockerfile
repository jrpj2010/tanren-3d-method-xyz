# ビルドステージ
FROM node:16-alpine as build

WORKDIR /app

# 依存関係ファイルをコピー
COPY package.json package-lock.json ./

# 依存関係のインストール
RUN npm ci

# ソースコードをコピー
COPY . .

# 環境変数の設定（バックエンドAPIのURLを設定）
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# アプリケーションのビルド
RUN npm run build

# 実行ステージ
FROM nginx:alpine

# ビルドステージからビルド済みファイルをコピー
COPY --from=build /app/build /usr/share/nginx/html

# Nginxの設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ポートを公開
EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]
