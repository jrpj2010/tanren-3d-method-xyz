# VibeCoding プロジェクト引き継ぎ文書

## プロジェクト概要

VibeCodingは、議事録テキストを明治・昭和モダンテイストのSVGスライドに自動変換するWebアプリケーションです。ユーザーが議事録を入力すると、Claude AIが内容を解析し、複数のSVGスライドを生成します。

### 主要機能

- テキスト入力（議事録テキストの入力・ファイルアップロード）
- AI解析（Claude 3.7 Sonnetを使用）
- SVGスライド生成（3カラムレイアウト）
- トークスクリプト生成
- 画像生成プロンプト生成
- リアルタイム進捗表示（Server-Sent Events）
- 最終成果物のダウンロード

## 技術スタック

- **フロントエンド**: Next.js 15.1.3, React 19, Tailwind CSS, shadcn/ui
- **バックエンド**: SQLite, Prisma ORM
- **AI**: Claude 3.7 Sonnet (Anthropic API)
- **その他**: Server-Sent Events, SVG生成

## 現状と課題

現在、アプリケーションは基本的なUI/UXフローが実装されていますが、以下の問題が解決されていません：

### 1. Claude API接続エラー (優先度: 高)

```
Error: 404 {"type":"error","error":{"type":"not_found_error","message":"Not Found"}}
```

- **原因**: おそらくAnthropicのAPIパラメータ形式に問題がある
- **対応方針**: 
  - `app/lib/api/client.ts`の`generateSlideData`関数内のAPI呼び出し部分を修正
  - モデル名は正しい（`claude-3-7-sonnet-20250219`）が、APIリクエスト構造を確認
  - Anthropicの最新ドキュメントを参照して正しい呼び出し方を実装
  - 特に`betas: ["output-128k-2025-02-19"]`パラメータが必要かもしれない

### 2. UI/UXの問題 (優先度: 中)

- **@radix-ui/react-progress パッケージ**: インストールはしたが、ビルド時に見つからないエラーが出ている
- **ボタンのスタイル**: CSSテンプレートリテラル内での変数使用に問題があった（固定値に変更済み）
- **カラースキーム**: 明治・昭和モダンテイストに合わせて更新済み

### 3. App Router関連 (優先度: 低)

- Next.jsのApp Routerパラメータ処理に関するエラーは修正済み
- `params.id`を`const { id } = params;`として解決

### 4. データベース関連 (優先度: 低)

- Prismaマイグレーションは実行済み (`npx prisma migrate dev --name init`)
- プロジェクトとスライドテーブルは作成されたが、たまにエラーが発生する場合あり

## 今後の対応計画

1. **Claude API接続の修正**
   - Anthropicの最新のNode.js SDKドキュメント確認
   - APIパラメータと構造の見直し
   - `.env`ファイルのAPIキー確認

2. **UI/UX修正**
   - @radix-ui/react-progressの依存関係問題解決
   - 進捗表示UI完成

3. **エラーハンドリング強化**
   - APIエラーの詳細表示
   - リトライ機能実装

4. **テスト実施**
   - エンドツーエンドテスト
   - 各種エッジケースのテスト

## 参考資料

- [Anthropic API ドキュメント](https://docs.anthropic.com/claude/reference/messages_post)
- [Next.js App Routerドキュメント](https://nextjs.org/docs/app)
- [Prisma ORM ドキュメント](https://www.prisma.io/docs) 