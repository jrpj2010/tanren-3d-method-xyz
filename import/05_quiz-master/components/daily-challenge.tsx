"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getDailyStreak } from "@/lib/user-progress"

export default function DailyChallenge() {
  const [streak, setStreak] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    // ストリークとデイリーチャレンジの完了状態を取得
    const userStreak = getDailyStreak()
    setStreak(userStreak)

    // 今日のチャレンジが完了しているか確認
    const today = new Date().toISOString().split("T")[0]
    const lastCompleted = localStorage.getItem("lastDailyChallenge")
    setCompleted(lastCompleted === today)
  }, [])

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">🔥</span> デイリーチャレンジ
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {completed
                ? "今日のチャレンジは完了しました！明日また挑戦しましょう。"
                : "今日の5問に挑戦して、ストリークを維持しましょう！"}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-sm font-medium">現在のストリーク:</span>
              <span className="text-sm font-bold">{streak}日</span>
            </div>
          </div>

          <Link href="/daily-challenge" passHref>
            <Button className={completed ? "bg-green-600 hover:bg-green-700" : ""} disabled={completed}>
              {completed ? "完了済み" : "今日のチャレンジに挑戦"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
