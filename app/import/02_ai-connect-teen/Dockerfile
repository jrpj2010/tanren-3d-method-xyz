# AI Connect Teen プロジェクト Dockerfile

# ベースイメージ - Alpine Linux ベースの Node.js 18
FROM node:18-alpine AS base

# 依存関係インストールステージ
FROM base AS deps
WORKDIR /app

# パッケージ管理ファイルのコピー
COPY package.json package-lock.json* ./
RUN npm ci

# 開発環境ステージ
FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# ビルドステージ
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

# 本番環境ステージ
FROM base AS production
WORKDIR /app

ENV NODE_ENV=production

# 必要ファイルのみをコピー
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# セキュリティ対策: root権限を必要としないユーザーでアプリを実行
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

EXPOSE 3000

# アプリケーション起動
CMD ["npm", "start"]
