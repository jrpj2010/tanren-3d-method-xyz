FROM nginx:alpine

# Nginxの設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 静的ファイルをコピー
COPY . /usr/share/nginx/html

# 環境変数の設定
ENV PORT 8080

# コンテナ起動時にポート設定を動的に行うためのスクリプト
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]