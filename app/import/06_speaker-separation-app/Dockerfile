# ベースイメージとしてNode.jsを使用
FROM node:20-slim AS base

# 作業ディレクトリを設定
WORKDIR /app

# Python 3.10とFFmpegをインストール
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# 依存関係をインストールするステージ
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# ビルドステージ
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Pythonの依存関係をインストール
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 実行ステージ
FROM base AS runner
WORKDIR /app

# 環境変数を設定
ENV NODE_ENV=production
ENV PATH="/opt/venv/bin:$PATH"

# 必要なファイルをコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /opt/venv /opt/venv
COPY --from=builder /app/python ./python

# ポートを公開
EXPOSE 3000

# アプリケーションを実行
CMD ["node", "server.js"]
