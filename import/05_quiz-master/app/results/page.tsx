"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getGenreInfo } from "@/lib/quiz-data"
import { Share2, Trophy, RotateCcw, Home } from "lucide-react"
import confetti from "canvas-confetti"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const score = Number.parseInt(searchParams.get("score") || "0")
  const total = Number.parseInt(searchParams.get("total") || "10")
  const genre = searchParams.get("genre") || ""
  const difficulty = searchParams.get("difficulty") || ""

  const [genreInfo, setGenreInfo] = useState<any>(null)
  const percentage = Math.round((score / total) * 100)

  useEffect(() => {
    if (genre) {
      const info = getGenreInfo(genre)
      setGenreInfo(info)
    }

    // 高得点の場合、紙吹雪エフェクトを表示
    if (percentage >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [genre, percentage])

  const getResultMessage = () => {
    if (percentage >= 90) return "素晴らしい！あなたは天才です！"
    if (percentage >= 70) return "すごい！よく頑張りました！"
    if (percentage >= 50) return "良い結果です！もっと頑張りましょう！"
    return "次回はもっと良い結果を目指しましょう！"
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">クイズ結果</h1>

      <Card className="mb-8 overflow-hidden">
        <div
          className="h-2"
          style={{
            backgroundColor: genreInfo?.color || "#6366f1",
            width: "100%",
          }}
        />
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="text-6xl font-bold mb-2">
              {score}/{total}
            </div>
            <p className="text-lg font-medium text-muted-foreground">{getResultMessage()}</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">正答率</span>
              <span className="text-sm font-medium">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">ジャンル</p>
              <p className="text-lg font-medium flex items-center gap-2">
                {genreInfo?.icon && <span>{genreInfo.icon}</span>}
                {genreInfo?.name || genre}
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground">難易度</p>
              <p className="text-lg font-medium">
                {difficulty === "easy" && "初級"}
                {difficulty === "medium" && "中級"}
                {difficulty === "hard" && "上級"}
              </p>
            </div>
          </div>

          {percentage >= 70 && (
            <div className="flex items-center gap-3 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mb-6">
              <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="font-medium">新しいバッジを獲得しました！</p>
                <p className="text-sm text-muted-foreground">
                  {genreInfo?.name || genre}マスターバッジを獲得しました！
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2 flex-1">
              <Share2 className="h-4 w-4" />
              結果をシェア
            </Button>
            <Link href={`/quiz/${genre}/${difficulty}`} passHref>
              <Button variant="outline" className="gap-2 flex-1">
                <RotateCcw className="h-4 w-4" />
                もう一度挑戦
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link href="/" passHref>
          <Button variant="ghost" className="gap-2">
            <Home className="h-4 w-4" />
            ホームに戻る
          </Button>
        </Link>
      </div>
    </div>
  )
}
