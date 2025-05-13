#!/bin/sh

# Nginxの設定ファイルにPORTを設定
sed -i "s/\${PORT}/${PORT}/g" /etc/nginx/conf.d/default.conf

# Nginxをフォアグラウンドで起動
nginx -g 'daemon off;'