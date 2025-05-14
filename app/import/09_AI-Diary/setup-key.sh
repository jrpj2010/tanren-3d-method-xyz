#!/bin/bash

# Gemini APIキーをセットアップするスクリプト
# ----------------------------------

# APIキーが指定されているか確認
if [ -z "$1" ]; then
  echo "エラー: Gemini APIキーが指定されていません。"
  echo "使用方法: ./setup-key.sh <GEMINI_API_KEY>"
  echo "例: ./setup-key.sh AIzaSyDvZa5QTmqdAB0do_K3W5NAeW6di69_3BI"
  exit 1
fi

GEMINI_API_KEY=$1

# .envファイルにAPIキーを保存
echo "GEMINI_API_KEY=$GEMINI_API_KEY" > .env
chmod 600 .env  # ファイルのアクセス権限を制限

echo "APIキーが.envファイルに保存されました。"
echo "これでstart-with-env.shスクリプトを使用してアプリを起動できます。"
