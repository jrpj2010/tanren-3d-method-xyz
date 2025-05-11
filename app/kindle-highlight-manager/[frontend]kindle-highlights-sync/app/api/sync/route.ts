import { NextResponse } from "next/server"
import { fetchUpdatedHighlights } from "@/lib/kindle-scraper"
import { generateMarkdown, updateMarkdown } from "@/lib/markdown-generator"
import { getOrCreateFolder, saveMarkdownFile } from "@/lib/google-drive"

export async function POST(request: Request) {
  try {
    // リクエストからユーザー情報を取得
    // 実際の実装では、セッションやデータベースからユーザー情報を取得する
    const { amazonCredentials, googleConfig, lastSyncDate } = await request.json()

    // 前回の同期以降に更新されたハイライトを取得
    const updatedBooks = await fetchUpdatedHighlights(amazonCredentials, lastSyncDate || new Date(0).toISOString())

    if (updatedBooks.length === 0) {
      return NextResponse.json({
        success: true,
        message: "新しいハイライトはありません",
        updatedBooks: [],
      })
    }

    // Google Driveのフォルダを取得または作成
    const folderId = await getOrCreateFolder(googleConfig)

    // 各書籍のMarkdownファイルを保存または更新
    const results = await Promise.all(
      updatedBooks.map(async (book) => {
        const fileName = `${book.title}.md`

        try {
          // ファイルが既に存在するか確認し、存在する場合は内容を取得
          // 実際の実装では、Google Drive APIを使用してファイルを検索し、存在する場合は内容を取得する
          const existingContent = "" // 仮の空文字列

          let markdownContent
          if (existingContent) {
            // 既存のファイルに新しいハイライトを追加
            markdownContent = updateMarkdown(existingContent, book.highlights)
          } else {
            // 新しいファイルを作成
            markdownContent = generateMarkdown(book)
          }

          // Google Driveにファイルを保存
          const { fileId, webViewLink } = await saveMarkdownFile(googleConfig, folderId, fileName, markdownContent)

          return {
            title: book.title,
            author: book.author,
            asin: book.asin,
            highlightCount: book.highlights.length,
            fileId,
            webViewLink,
          }
        } catch (error) {
          console.error(`Error processing book ${book.title}:`, error)
          return {
            title: book.title,
            error: (error as Error).message,
          }
        }
      }),
    )

    return NextResponse.json({
      success: true,
      message: `${updatedBooks.length}冊の書籍を同期しました`,
      updatedBooks: results,
    })
  } catch (error) {
    console.error("Sync error:", error)
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 })
  }
}
