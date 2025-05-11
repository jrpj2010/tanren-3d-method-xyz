import type { NextRequest } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")
    const speaker = searchParams.get("speaker")

    if (!id || !speaker) {
      return new Response(JSON.stringify({ error: "処理IDまたは話者が指定されていません" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // 実際の実装では、ここで処理結果のファイルパスを取得します
    // この例では、デモ用のMP3ファイルを返します

    let filePath
    if (speaker === "A") {
      // 話者Aのファイルパス
      filePath = join(process.cwd(), "public", "demo-speaker-a.mp3")
    } else if (speaker === "B") {
      // 話者Bのファイルパス
      filePath = join(process.cwd(), "public", "demo-speaker-b.mp3")
    } else {
      return new Response(JSON.stringify({ error: "無効な話者が指定されました" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // ファイルの存在確認
    if (!existsSync(filePath)) {
      console.error(`ファイルが見つかりません: ${filePath}`)
      return new Response(JSON.stringify({ error: "ファイルが見つかりません" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    // ファイルを読み込む
    const fileBuffer = await readFile(filePath)

    // ファイル名を設定
    const filename = `speaker-${speaker}.mp3`

    // レスポンスを返す
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("ダウンロード中にエラーが発生しました:", error)
    return new Response(JSON.stringify({ error: "ファイルのダウンロード中にエラーが発生しました" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
