"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getUserAchievements } from "@/lib/user-progress"

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  unlocked: boolean
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [unlockedCount, setUnlockedCount] = useState(0)

  useEffect(() => {
    const userAchievements = getUserAchievements()
    setAchievements(userAchievements)
    setUnlockedCount(userAchievements.filter((a) => a.unlocked).length)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">アチーブメント</h1>

      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">獲得バッジ</span>
          <span className="text-sm font-medium">
            {unlockedCount}/{achievements.length}
          </span>
        </div>
        <Progress value={(unlockedCount / achievements.length) * 100} className="h-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`overflow-hidden transition-all ${achievement.unlocked ? "border-primary" : "opacity-75"}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className={`text-4xl ${achievement.unlocked ? "" : "grayscale"}`}>{achievement.icon}</div>
                <div>
                  <h3 className="font-semibold">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>

              {!achievement.unlocked && achievement.progress > 0 && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>進捗</span>
                    <span>
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
