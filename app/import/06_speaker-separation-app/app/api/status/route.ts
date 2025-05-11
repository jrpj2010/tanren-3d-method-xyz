import { type NextRequest, NextResponse } from "next/server"
import { getProcessingStatus } from "@/lib/processing-status"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "処理IDが指定されていません" }, { status: 400 })
    }

    // 処理状態を取得
    const status = await getProcessingStatus(id)

    if (!status) {
      return NextResponse.json({ error: "指定されたIDの処理が見つかりません" }, { status: 404 })
    }

    return NextResponse.json(status)
  } catch (error) {
    console.error("状態取得中にエラーが発生しました:", error)
    return NextResponse.json({ error: "処理状態の取得中にエラーが発生しました" }, { status: 500 })
  }
}
