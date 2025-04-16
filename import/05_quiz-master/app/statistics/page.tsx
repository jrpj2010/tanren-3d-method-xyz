"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { getUserStats, getGenreStats } from "@/lib/user-progress"
import { genres } from "@/lib/quiz-data"

interface GenreStat {
  genre: string
  totalQuestions: number
  correctAnswers: number
  percentage: number
}

export default function StatisticsPage() {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    averageScore: 0,
  })

  const [genreStats, setGenreStats] = useState<GenreStat[]>([])
  const [difficultyStats, setDifficultyStats] = useState({
    easy: { total: 0, correct: 0, percentage: 0 },
    medium: { total: 0, correct: 0, percentage: 0 },
    hard: { total: 0, correct: 0, percentage: 0 },
  })

  useEffect(() => {
    const userStats = getUserStats()
    setStats(userStats)

    // ジャンル別の統計を取得
    const genreData = genres.map((genre) => {
      const stats = getGenreStats(genre.id)
      return {
        genre: genre.id,
        genreName: genre.name,
        genreIcon: genre.icon,
        genreColor: genre.color,
        ...stats,
      }
    })

    setGenreStats(genreData)

    // 難易度別の統計を取得
    const easy = getGenreStats("all", "easy")
    const medium = getGenreStats("all", "medium")
    const hard = getGenreStats("all", "hard")

    setDifficultyStats({
      easy,
      medium,
      hard,
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">マイ統計</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
            <p className="text-sm text-muted-foreground">挑戦したクイズ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{stats.correctAnswers}</div>
            <p className="text-sm text-muted-foreground">正解した問題</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{stats.averageScore.toFixed(1)}%</div>
            <p className="text-sm text-muted-foreground">平均スコア</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="genres" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="genres">ジャンル別</TabsTrigger>
          <TabsTrigger value="difficulty">難易度別</TabsTrigger>
        </TabsList>

        <TabsContent value="genres">
          <Card>
            <CardHeader>
              <CardTitle>ジャンル別成績</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {genreStats.map((stat) => (
                  <div key={stat.genre}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium flex items-center gap-1">
                        {stat.genreIcon && <span>{stat.genreIcon}</span>}
                        {stat.genreName}
                      </span>
                      <span className="text-sm font-medium">
                        {stat.percentage.toFixed(1)}% ({stat.correctAnswers}/{stat.totalQuestions})
                      </span>
                    </div>
                    <Progress
                      value={stat.percentage}
                      className="h-2"
                      style={
                        {
                          backgroundColor: `${stat.genreColor}20`,
                          "--progress-color": stat.genreColor,
                        } as any
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="difficulty">
          <Card>
            <CardHeader>
              <CardTitle>難易度別成績</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">初級</span>
                    <span className="text-sm font-medium">
                      {difficultyStats.easy.percentage.toFixed(1)}% ({difficultyStats.easy.correct}/
                      {difficultyStats.easy.total})
                    </span>
                  </div>
                  <Progress value={difficultyStats.easy.percentage} className="h-2 bg-green-100 dark:bg-green-900/30" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">中級</span>
                    <span className="text-sm font-medium">
                      {difficultyStats.medium.percentage.toFixed(1)}% ({difficultyStats.medium.correct}/
                      {difficultyStats.medium.total})
                    </span>
                  </div>
                  <Progress
                    value={difficultyStats.medium.percentage}
                    className="h-2 bg-yellow-100 dark:bg-yellow-900/30"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">上級</span>
                    <span className="text-sm font-medium">
                      {difficultyStats.hard.percentage.toFixed(1)}% ({difficultyStats.hard.correct}/
                      {difficultyStats.hard.total})
                    </span>
                  </div>
                  <Progress value={difficultyStats.hard.percentage} className="h-2 bg-red-100 dark:bg-red-900/30" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>学習の進捗</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            グラフはデータが蓄積されると表示されます
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
