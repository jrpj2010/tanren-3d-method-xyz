"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getQuizQuestions } from "@/lib/quiz-data"
import { saveQuizResult } from "@/lib/user-progress"
import { ArrowRight, Clock, HelpCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizParams {
  params: {
    genre: string
    difficulty: string
  }
}

export default function QuizPage({ params }: QuizParams) {
  const router = useRouter()
  const { genre, difficulty } = params

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(30) // 30秒のタイマー
  const [timerActive, setTimerActive] = useState(true)

  // クイズの質問を取得
  useEffect(() => {
    const quizQuestions = getQuizQuestions(genre, difficulty)
    setQuestions(quizQuestions)
  }, [genre, difficulty])

  // タイマー処理
  useEffect(() => {
    if (!timerActive || questions.length === 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (!isAnswered) {
            handleAnswer(-1) // タイムアウト時は-1を渡す
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timerActive, isAnswered, questions])

  // 質問が変わるたびにタイマーをリセット
  useEffect(() => {
    if (questions.length > 0) {
      setTimeLeft(30)
      setTimerActive(true)
      setIsAnswered(false)
      setSelectedOption(null)
    }
  }, [currentQuestionIndex, questions])

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return

    setIsAnswered(true)
    setTimerActive(false)
    setSelectedOption(optionIndex)

    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = optionIndex === currentQuestion.correctAnswer

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    // 回答を記録
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // クイズ終了、結果を保存
      saveQuizResult(genre, difficulty, score, questions.length)
      router.push(`/results?score=${score}&total=${questions.length}&genre=${genre}&difficulty=${difficulty}`)
    }
  }

  if (questions.length === 0) {
    return <div className="flex justify-center items-center min-h-[50vh]">読み込み中...</div>
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            問題 {currentQuestionIndex + 1}/{questions.length}
          </span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className={`text-sm font-medium ${timeLeft < 10 ? "text-red-500" : ""}`}>{timeLeft}秒</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">ヒント</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>ヒント</DialogTitle>
                  <DialogDescription>ヒントを見ると得点が減少します。それでもヒントを見ますか？</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">キャンセル</Button>
                  <Button>ヒントを見る</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-3 mt-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg border text-left transition-colors ${
                  selectedOption === index
                    ? isAnswered
                      ? index === currentQuestion.correctAnswer
                        ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                        : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                      : "bg-primary/10 border-primary"
                    : "hover:bg-muted"
                } ${
                  isAnswered && index === currentQuestion.correctAnswer
                    ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                    : ""
                }`}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
              >
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted mr-3 text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {isAnswered && (
        <Card className="mb-6 border-l-4 border-l-primary">
          <CardContent className="p-4">
            <h3 className="font-medium mb-1">解説</h3>
            <p className="text-sm">{currentQuestion.explanation}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={handleNextQuestion} disabled={!isAnswered} className="gap-2">
          {currentQuestionIndex < questions.length - 1 ? "次の問題" : "結果を見る"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
