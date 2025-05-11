import fs from "fs"
import path from "path"
import { mkdir, writeFile, readFile } from "fs/promises"

// 処理状態の型定義
export type ProcessingStatus = {
  id: string
  status: "processing" | "completed" | "error"
  progress: number
  results: Array<{ label: string; url: string }>
  error: string
  updatedAt: string
}

// 状態を保存するディレクトリ
const STATUS_DIR = path.join(process.cwd(), ".processing-status")

// ディレクトリが存在しない場合は作成する
export async function ensureStatusDir() {
  try {
    if (!fs.existsSync(STATUS_DIR)) {
      await mkdir(STATUS_DIR, { recursive: true })
    }
  } catch (error) {
    console.error("状態ディレクトリの作成に失敗しました:", error)
  }
}

// 処理状態を更新する関数
export async function updateProcessingStatus(
  id: string,
  status: "processing" | "completed" | "error",
  progress: number,
  results: Array<{ label: string; url: string }> = [],
  error = "",
): Promise<void> {
  try {
    await ensureStatusDir()

    const statusData: ProcessingStatus = {
      id,
      status,
      progress,
      results,
      error,
      updatedAt: new Date().toISOString(),
    }

    const statusFilePath = path.join(STATUS_DIR, `${id}.json`)
    await writeFile(statusFilePath, JSON.stringify(statusData), "utf-8")
  } catch (error) {
    console.error(`処理状態の更新に失敗しました (ID: ${id}):`, error)
  }
}

// 処理状態を取得する関数
export async function getProcessingStatus(id: string): Promise<ProcessingStatus | null> {
  try {
    await ensureStatusDir()

    const statusFilePath = path.join(STATUS_DIR, `${id}.json`)

    if (!fs.existsSync(statusFilePath)) {
      return null
    }

    const statusData = await readFile(statusFilePath, "utf-8")
    return JSON.parse(statusData) as ProcessingStatus
  } catch (error) {
    console.error(`処理状態の取得に失敗しました (ID: ${id}):`, error)
    return null
  }
}
