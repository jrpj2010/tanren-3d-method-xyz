#!/bin/bash

# スクリプトがあるディレクトリを基準にする場合 (今回は絶対パス指定なので不要)
# SCRIPT_DIR=$(cd $(dirname $0); pwd)
PROJECT_DIR="/Users/jrpj2010/vibe-coding/app/import/07_youtube-search-app-docker-vercel-updated"
LOG_FILE="/tmp/youtube_app_automator_log.txt" # ログファイルパスを定義

# --- ここから追加 ---
# ログファイルの初期化とスクリプト開始の記録
echo "Automator script started at $(date)" > "$LOG_FILE" 
# これ以降の標準出力と標準エラー出力をログファイルに追記
exec >> "$LOG_FILE" 2>&1 
# --- ここまで追加 ---

echo "YouTube字幕マネージャーを起動します..."

# Docker Desktopが起動しているか簡易チェック (mdfindでDockerアプリを探す)
if ! mdfind "kMDItemFSName == 'Docker.app'" | grep -q "Docker.app"; then
    echo "エラー: Docker Desktopが見つかりません。先にDocker Desktopを起動してください。"
    open "$LOG_FILE" # エラー内容をログで確認できるように開く
    exit 1
fi

# Dockerが実際に動作しているかもう少し確認 (docker infoの成功をチェック)
if ! /usr/local/bin/docker info > /dev/null 2>&1; then # docker info の出力はログに不要なので > /dev/null 2>&1 は維持
    echo "エラー: Dockerデーモンが応答しません。Docker Desktopが完全に起動しているか確認してください。"
    open "$LOG_FILE" # エラー内容をログで確認できるように開く
    exit 1
fi

echo "プロジェクトディレクトリに移動します: $PROJECT_DIR"
cd "$PROJECT_DIR" # cd コマンド自体の成否はここではチェックしない (元々なかったため)

echo "Dockerコンテナを起動します (docker-compose up -d)..."
if /usr/local/bin/docker-compose up -d; then # ここの出力は exec によってログファイルに記録される
    echo "コンテナの起動に成功しました。"
    echo "3秒後にブラウザで http://localhost を開きます..."
    sleep 3
    open http://localhost # openコマンドはターミナルで実行した場合の挙動
    echo "YouTube字幕マネージャーが http://localhost で利用可能です。"
else
    echo "エラー: Dockerコンテナの起動に失敗しました。ログを確認してください。"
    open "$LOG_FILE" # エラー時にもログファイルを開く
    exit 1
fi

echo "Script finished successfully at $(date)" # 正常終了のタイムスタンプも記録
open "$LOG_FILE" # 念のため正常終了時もログを開く
exit 0 