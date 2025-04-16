// ユーザーの進捗状況を管理するファイル

// クイズ結果を保存する関数
export function saveQuizResult(genre: string, difficulty: string, score: number, total: number) {
  // ローカルストレージからデータを取得
  const resultsString = localStorage.getItem("quizResults")
  const results = resultsString ? JSON.parse(resultsString) : []

  // 新しい結果を追加
  results.push({
    genre,
    difficulty,
    score,
    total,
    date: new Date().toISOString(),
  })

  // ローカルストレージに保存
  localStorage.setItem("quizResults", JSON.stringify(results))

  // ストリークを更新（もしデイリーチャレンジなら）
  if (genre === "daily") {
    updateDailyStreak()
  }
}

// デイリーチャレンジの結果を保存する関数
export function saveDailyChallenge(score: number, total: number) {
  // クイズ結果を保存
  saveQuizResult("daily", "mixed", score, total)

  // 今日の日付を保存
  const today = new Date().toISOString().split("T")[0]
  localStorage.setItem("lastDailyChallenge", today)

  // ストリークを更新
  updateDailyStreak()
}

// デイリーストリークを更新する関数
function updateDailyStreak() {
  const today = new Date().toISOString().split("T")[0]
  const lastCompletedString = localStorage.getItem("lastDailyChallenge")
  const streakString = localStorage.getItem("dailyStreak")

  let streak = streakString ? Number.parseInt(streakString) : 0

  if (lastCompletedString) {
    const lastCompleted = new Date(lastCompletedString)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    // 昨日か今日完了していればストリーク継続
    if (
      lastCompleted.toISOString().split("T")[0] === yesterday.toISOString().split("T")[0] ||
      lastCompleted.toISOString().split("T")[0] === today
    ) {
      streak += 1
    } else {
      // それ以外はリセット
      streak = 1
    }
  } else {
    // 初めての挑戦
    streak = 1
  }

  localStorage.setItem("dailyStreak", streak.toString())
}

// デイリーストリークを取得する関数
export function getDailyStreak() {
  const streakString = localStorage.getItem("dailyStreak")
  return streakString ? Number.parseInt(streakString) : 0
}

// ユーザーの統計情報を取得する関数
export function getUserStats() {
  const resultsString = localStorage.getItem("quizResults")
  const results = resultsString ? JSON.parse(resultsString) : []

  // デフォルト値
  const stats = {
    totalQuizzes: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    averageScore: 0,
  }

  if (results.length > 0) {
    stats.totalQuizzes = results.length

    let totalCorrect = 0
    let totalQuestions = 0

    results.forEach((result) => {
      totalCorrect += result.score
      totalQuestions += result.total
    })

    stats.correctAnswers = totalCorrect
    stats.totalQuestions = totalQuestions
    stats.averageScore = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0
  }

  return stats
}

// ジャンル別の統計情報を取得する関数
export function getGenreStats(genre: string, difficulty?: string) {
  const resultsString = localStorage
