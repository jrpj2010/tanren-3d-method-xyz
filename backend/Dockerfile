# Node.jsの公式イメージをベースイメージとして使用 (特定のバージョンを指定することを推奨)
FROM node:18-alpine

# アプリケーションディレクトリを作成
WORKDIR /usr/src/app

# 依存関係のインストールのため、package.json と package-lock.json (あれば) をコピー
# package-lock.jsonがない場合は、npm installがpackage.jsonに基づいて依存関係を解決します
COPY package*.json ./

# 依存関係をインストール
# 本番環境では --omit=dev をつけて開発依存を除外することを検討
RUN npm install

# アプリケーションのソースコードをバンドル
COPY . .

# アプリケーションがリッスンするポートを公開 (server.js内のポートと合わせる)
EXPOSE 3001

# アプリケーションを起動するコマンド
CMD [ "npm", "start" ]
