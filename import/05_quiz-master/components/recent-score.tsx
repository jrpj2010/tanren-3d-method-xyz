"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getUserStats } from "@/lib/user-progress"

interface RecentStats {
  totalQuizzes: number
  correctAnswers: number
  totalQuestions: number
  averageScore: number
}

export default function RecentScore() {
  const [stats, setStats] = useState<RecentStats>({
    totalQuizzes: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    averageScore: 0,
  })

  useEffect(() => {
    const userStats = getUserStats()
    setStats(userStats)
  }, [])

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">最近のスコア</h2>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">平均スコア</span>
              <span className="text-sm font-medium">{stats.averageScore.toFixed(1)}%</span>
            </div>
            <Progress value={stats.averageScore} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">挑戦したクイズ</p>
              <p className="text-2xl font-bold">{stats.totalQuizzes}</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">正解率</p>
              <p className="text-2xl font-bold">
                {stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
