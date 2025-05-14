# Node.jsの公式イメージをベースとして使用 (軽量なslimバージョンを推奨)
FROM node:18-slim

# アプリケーションの作業ディレクトリを作成
WORKDIR /usr/src/app

# package.json と package-lock.json (あれば) をコピー
# package-lock.json があれば、より再現性の高いビルドが可能です
COPY package*.json ./

# アプリケーションの依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
# ここでは、server.js と HTMLファイルがあるディレクトリ全体をコピーする代わりに、
# 必要なファイルのみを明示的にコピーします。
COPY server.js .
COPY AI駆動型「超自分」発見・30日トーク日記アプリ.html .
# もし他にCSSファイルやJSファイル、画像などがあれば、それらもCOPYしてください。
# 例: COPY public ./public

# アプリケーションがリッスンするポートをDockerコンテナに公開
EXPOSE 8080

# コンテナ起動時にサーバーを実行するコマンド
CMD [ "node", "server.js" ]
