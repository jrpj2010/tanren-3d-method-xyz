FROM python:3.10-slim

WORKDIR /app

# 依存関係ファイルをコピー
COPY requirements.txt .

# 依存関係のインストール
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションファイルをコピー
COPY . .

# ポートを公開
EXPOSE 8000

# 環境変数の設定
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# アプリケーションの実行
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "wsgi:app"]
