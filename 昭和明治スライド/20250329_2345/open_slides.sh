#!/bin/bash

# 次世代SVGプレゼン講座スライドビューワー
# このスクリプトは、生成されたSVGスライドをブラウザで開きます

# 現在のディレクトリを取得
CURRENT_DIR=$(dirname "$0")
cd "$CURRENT_DIR"

echo "次世代SVGプレゼン講座スライドを開きます..."

# OSを検出して適切なコマンドを使用
case "$(uname -s)" in
    Darwin*)    # macOS
        open ./index.html
        ;;
    Linux*)     # Linux
        if command -v xdg-open > /dev/null; then
            xdg-open ./index.html
        else
            echo "xdg-openがインストールされていません。ブラウザで手動で開いてください。"
        fi
        ;;
    CYGWIN*|MINGW*|MSYS*)    # Windows
        start ./index.html
        ;;
    *)
        echo "未対応のOSです。index.htmlをブラウザで手動で開いてください。"
        ;;
esac

echo "完了しました。ブラウザが開かない場合は、index.htmlをブラウザで手動で開いてください。" 