import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import { join } from "path"
import fs from "fs/promises"
import { updateProcessingStatus } from "@/lib/processing-status"

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const { id, filePath } = await request.json()

    if (!id || !filePath) {
      return NextResponse.json({ error: "処理IDまたはファイルパスが指定されていません" }, { status: 400 })
    }

    // 出力ディレクトリの作成
    const outputDir = join("/tmp", "outputs", id)
    await fs.mkdir(outputDir, { recursive: true })

    // Pythonスクリプトの実行
    const pythonScript = join(process.cwd(), "python", "process_audio.py")
    const command = `python3 "${pythonScript}" --input "${filePath}" --output-dir "${outputDir}"`

    try {
      // 処理状態を更新
      await updateProcessingStatus(id, "processing", 10)

      // Pythonスクリプトを実行
      const { stdout, stderr } = await execAsync(command)

      // エラーチェック
      if (stderr) {
        console.error("Python処理中のエラー:", stderr)
        await updateProcessingStatus(id, "error", 0, [], stderr)
        return NextResponse.json({ error: stderr }, { status: 500 })
      }

      // 結果の解析
      const result = JSON.parse(stdout)

      // 処理結果からダウンロードURLを生成
      const results = result.files.map((file: any, index: number) => ({
        label: file.speaker,
        url: `/api/download?id=${id}&speaker=${index}`,
      }))

      // 処理状態を更新
      await updateProcessingStatus(id, "completed", 100, results)

      return NextResponse.json({ status: "success", results })
    } catch (error) {
      console.error("Python処理中のエラー:", error)
      await updateProcessingStatus(
        id,
        "error",
        0,
        [],
        error instanceof Error ? error.message : "処理中にエラーが発生しました",
      )
      return NextResponse.json({ error: "音声処理中にエラーが発生しました" }, { status: 500 })
    }
  } catch (error) {
    console.error("リクエスト処理中のエラー:", error)
    return NextResponse.json({ error: "リクエスト処理中にエラーが発生しました" }, { status: 500 })
  }
}
