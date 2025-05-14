"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Clock,
  Layers,
  Send,
  Zap,
  BarChart3,
  FileText,
  Lightbulb,
  RefreshCw,
  Rocket,
  Calendar,
  FlameIcon,
  Target,
  CheckSquare,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// メッセージの型定義
type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  axis?: "x-axis" | "time-axis" | "meta-axis"
}

// 思考プロセスの型定義
type ThinkingProcess = {
  xAxis: {
    abstraction: number
    concretization: number
  }
  timeAxis: {
    past: number
    present: number
    future: number
  }
  metaAxis: {
    level: "beginner" | "intermediate" | "advanced"
    progress: number
  }
}

// サンプルの事業アイデア
const sampleBusinessIdeas = [
  {
    id: "idea1",
    title: "サブスクリプション型食材宅配サービス",
    description: "地元の農家から新鮮な食材を定期的に届けるサブスクリプションサービス。食材に合わせたレシピも提供。",
  },
  {
    id: "idea2",
    title: "シニア向けオンライン学習プラットフォーム",
    description: "高齢者が新しいスキルを学び、社会とつながるためのオンライン学習プラットフォーム。",
  },
  {
    id: "idea3",
    title: "AI搭載型パーソナルフィットネスコーチ",
    description: "ユーザーの体型、目標、進捗に合わせてパーソナライズされたトレーニングプランを提供するAIコーチ。",
  },
]

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "こんにちは！TANREN 3D思考メソッドのデモへようこそ。あなたの事業アイデアについて教えてください。30日以内に立ち上げるという前提で、一緒に爆速で形にしていきましょう！",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentAxis, setCurrentAxis] = useState<"x-axis" | "time-axis" | "meta-axis" | null>(null)
  const [thinkingProcess, setThinkingProcess] = useState<ThinkingProcess>({
    xAxis: {
      abstraction: 20,
      concretization: 10,
    },
    timeAxis: {
      past: 30,
      present: 50,
      future: 20,
    },
    metaAxis: {
      level: "beginner",
      progress: 25,
    },
  })
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null)
  const [showMockupGenerator, setShowMockupGenerator] = useState(false)
  const [mockupType, setMockupType] = useState<string>("website")
  const [mockupDescription, setMockupDescription] = useState("")
  const [generatedMockup, setGeneratedMockup] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("chat")
  const [deadline, setDeadline] = useState<Date>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
  const [showDeadlineAlert, setShowDeadlineAlert] = useState(false)
  const [actionPlan, setActionPlan] = useState<{ task: string; dueDate: string; status: "pending" | "completed" }[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // メッセージが追加されたときに自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 期限が近づいたらアラートを表示
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diffTime = Math.abs(deadline.getTime() - now.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays <= 7 && !showDeadlineAlert) {
        setShowDeadlineAlert(true)
      }
    }, 60000) // 1分ごとにチェック

    return () => clearInterval(timer)
  }, [deadline, showDeadlineAlert])

  // メッセージ送信処理
  const handleSendMessage = () => {
    if (input.trim() === "") return

    // ユーザーメッセージを追加
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // AIの応答をシミュレート
    setTimeout(() => {
      let response: Message
      let newAxis: "x-axis" | "time-axis" | "meta-axis" | null = currentAxis

      // 入力内容に基づいて応答と軸を決定（実際のAIではもっと高度な分析が行われます）
      if (input.toLowerCase().includes("抽象") || input.toLowerCase().includes("具体")) {
        newAxis = "x-axis"
        response = {
          role: "assistant",
          content:
            "X軸（超抽象化・超具体化）の観点から考えてみましょう。あなたのアイデアの本質は何でしょうか？なぜそれが重要なのか、どのような普遍的な価値を提供するのか、考えてみましょう。30日以内に立ち上げるためには、この本質を明確にすることが重要です！",
          timestamp: new Date(),
          axis: "x-axis",
        }
        setThinkingProcess((prev) => ({
          ...prev,
          xAxis: {
            abstraction: Math.min(prev.xAxis.abstraction + 15, 100),
            concretization: prev.xAxis.concretization,
          },
        }))
      } else if (
        input.toLowerCase().includes("過去") ||
        input.toLowerCase().includes("現在") ||
        input.toLowerCase().includes("未来") ||
        input.toLowerCase().includes("歴史")
      ) {
        newAxis = "time-axis"
        response = {
          role: "assistant",
          content:
            "時間軸の観点から分析してみましょう。この分野はどのように発展してきたのでしょうか？現在の市場状況はどうなっていますか？そして、30日後にローンチした後、将来どのような可能性が広がっているでしょうか？時間は限られていますが、この視点は非常に重要です！",
          timestamp: new Date(),
          axis: "time-axis",
        }
        setThinkingProcess((prev) => ({
          ...prev,
          timeAxis: {
            past: Math.min(prev.timeAxis.past + 10, 100),
            present: Math.min(prev.timeAxis.present + 10, 100),
            future: Math.min(prev.timeAxis.future + 10, 100),
          },
        }))
      } else if (input.toLowerCase().includes("レベル") || input.toLowerCase().includes("経験")) {
        newAxis = "meta-axis"
        response = {
          role: "assistant",
          content:
            "META軸の観点から考えてみましょう。あなたのこの分野での経験レベルはどの程度ですか？初級、中級、上級のどのレベルに近いでしょうか？30日という短期間で成果を出すために、あなたの強みを最大限に活かし、弱みをカバーする戦略を立てましょう！",
          timestamp: new Date(),
          axis: "meta-axis",
        }
        setThinkingProcess((prev) => ({
          ...prev,
          metaAxis: {
            level: prev.metaAxis.level,
            progress: Math.min(prev.metaAxis.progress + 20, 100),
          },
        }))
      } else if (input.toLowerCase().includes("モックアップ") || input.toLowerCase().includes("プロトタイプ")) {
        response = {
          role: "assistant",
          content:
            "アイデアを可視化するためのMVPモックアップを作成しましょう！「モックアップ生成」タブで、必要な情報を入力してください。30日以内の立ち上げには、早期のプロトタイピングが不可欠です。Webサイト、スライド、システムUIなど、様々なタイプのモックアップを生成できます。",
          timestamp: new Date(),
        }
        setShowMockupGenerator(true)

        // 行動計画に追加
        setActionPlan((prev) => [
          ...prev,
          {
            task: "MVPモックアップの作成",
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: "pending",
          },
        ])
      } else if (input.toLowerCase().includes("計画") || input.toLowerCase().includes("プラン")) {
        response = {
          role: "assistant",
          content:
            "30日以内に事業を立ち上げるための具体的な行動計画を作成しましょう！以下のマイルストーンを設定しました。各タスクの期限を守ることが成功への鍵です。今すぐ行動を開始しましょう！",
          timestamp: new Date(),
        }

        // 行動計画を生成
        const today = new Date()
        setActionPlan([
          {
            task: "市場調査とターゲットユーザーの明確化",
            dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: "pending",
          },
          {
            task: "MVPの機能要件定義",
            dueDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: "pending",
          },
          {
            task: "プロトタイプ作成",
            dueDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: "pending",
          },
          {
            task: "初期ユーザーテスト",
            dueDate: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: "pending",
          },
          {
            task: "ローンチ準備と最終調整",
            dueDate: new Date(today.getTime() + 28 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            status: "pending",
          },
        ])
      } else {
        // 一般的な応答（煽り要素を追加）
        response = {
          role: "assistant",
          content:
            "なるほど、興味深いですね！しかし、時間は限られています。30日以内に事業を立ち上げるには、今すぐ行動を開始する必要があります。TANREN 3D思考メソッドでは、X軸（超抽象化・超具体化）、時間軸（過去・現在・未来）、META軸（経験レベル）の3つの視点からアイデアを分析します。どの視点から掘り下げていきたいですか？迷っている時間はありません！",
          timestamp: new Date(),
        }
        // ランダムに思考プロセスを進める
        setThinkingProcess((prev) => ({
          xAxis: {
            abstraction: Math.min(prev.xAxis.abstraction + Math.random() * 10, 100),
            concretization: Math.min(prev.xAxis.concretization + Math.random() * 10, 100),
          },
          timeAxis: {
            past: Math.min(prev.timeAxis.past + Math.random() * 5, 100),
            present: Math.min(prev.timeAxis.present + Math.random() * 5, 100),
            future: Math.min(prev.timeAxis.future + Math.random() * 5, 100),
          },
          metaAxis: {
            level: prev.metaAxis.level,
            progress: Math.min(prev.metaAxis.progress + Math.random() * 15, 100),
          },
        }))
      }

      setMessages((prev) => [...prev, response])
      setCurrentAxis(newAxis)
      setIsLoading(false)

      // 思考プロセスが進んだらMETA軸のレベルを上げる
      if (
        thinkingProcess.xAxis.abstraction > 70 &&
        thinkingProcess.xAxis.concretization > 70 &&
        thinkingProcess.metaAxis.level === "beginner"
      ) {
        setThinkingProcess((prev) => ({
          ...prev,
          metaAxis: {
            level: "intermediate",
            progress: 30,
          },
        }))
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "おめでとうございます！あなたの思考プロセスが深まり、META軸のレベルが「中級」に上がりました。より高度な分析と戦略的思考を提供します。30日という短期間で成果を出すために、さらにスピードアップしましょう！",
            timestamp: new Date(),
            axis: "meta-axis",
          },
        ])
      }
    }, 1000)
  }

  // サンプルアイデア選択処理
  const handleSelectIdea = (ideaId: string) => {
    const idea = sampleBusinessIdeas.find((idea) => idea.id === ideaId)
    if (!idea) return

    setSelectedIdea(ideaId)
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: `「${idea.title}」というアイデアについて分析したいです。${idea.description} 30日以内に立ち上げたいと考えています。`,
        timestamp: new Date(),
      },
    ])

    // AIの応答をシミュレート
    setIsLoading(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `「${idea.title}」を30日以内に立ち上げるという挑戦的な目標ですね！時間がないので、すぐに分析を始めましょう。まずは、このアイデアの本質は何だと思いますか？どのような価値を提供したいですか？X軸（超抽象化）の視点から考えてみましょう。`,
          timestamp: new Date(),
          axis: "x-axis",
        },
      ])
      setCurrentAxis("x-axis")
      setIsLoading(false)
      setThinkingProcess((prev) => ({
        ...prev,
        xAxis: {
          abstraction: 30,
          concretization: 10,
        },
      }))

      // 行動計画を生成
      const today = new Date()
      setActionPlan([
        {
          task: `${idea.title}の市場調査`,
          dueDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: "pending",
        },
        {
          task: "競合分析",
          dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: "pending",
        },
        {
          task: "MVPの機能要件定義",
          dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: "pending",
        },
        {
          task: "プロトタイプ作成",
          dueDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: "pending",
        },
        {
          task: "初期ユーザーテスト",
          dueDate: new Date(today.getTime() + 25 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          status: "pending",
        },
      ])
    }, 1000)
  }

  // モックアップ生成処理
  const handleGenerateMockup = () => {
    if (mockupDescription.trim() === "") return

    setIsLoading(true)
    setTimeout(() => {
      // モックアップ生成をシミュレート
      setGeneratedMockup(mockupType)
      setIsLoading(false)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${mockupType === "website" ? "Webサイト" : mockupType === "slides" ? "スライド" : "システムUI"}のモックアップを生成しました！「モックアップ」タブで確認できます。これで30日以内の立ち上げに向けて大きく前進しました。次は実際の開発に移りましょう！時間との勝負です！`,
          timestamp: new Date(),
        },
      ])

      // 行動計画を更新
      setActionPlan((prev) =>
        prev.map((item) =>
          item.task.includes("プロトタイプ") || item.task.includes("MVP") ? { ...item, status: "completed" } : item,
        ),
      )
    }, 2000)
  }

  // タスク完了トグル
  const toggleTaskStatus = (index: number) => {
    setActionPlan((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, status: task.status === "pending" ? "completed" : "pending" } : task,
      ),
    )
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <Badge className="px-3 py-1 text-sm bg-red-500 text-white mb-2 animate-pulse">
            <Calendar className="mr-1 h-3 w-3" />
            事業スタートまであと{Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}日
          </Badge>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            TANREN 3D思考メソッド <span className="text-primary">爆速</span>デモ
          </h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            AIとの対話を通じて、30日以内に事業を立ち上げるための思考プロセスを体験しましょう
          </p>
        </motion.div>
      </div>

      {showDeadlineAlert && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>期限が迫っています！</AlertTitle>
            <AlertDescription>
              事業スタートまであと{Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
              日です。今すぐ行動を加速させましょう！
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左側: チャットとモックアップ生成 */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">AIチャット</TabsTrigger>
              <TabsTrigger value="mockup">モックアップ生成</TabsTrigger>
              <TabsTrigger value="action-plan">行動計画</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="space-y-4">
              <Card className="border-2 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    AIアシスタントとの対話
                  </CardTitle>
                  <CardDescription>
                    あなたの事業アイデアについて、TANREN
                    3D思考メソッドに基づいた分析を行い、30日以内の立ち上げを実現します
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            message.role === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <Avatar>
                            <AvatarImage
                              src={
                                message.role === "user"
                                  ? "/placeholder.svg?height=40&width=40&query=user"
                                  : "/abstract-ai-network.png"
                              }
                              alt={message.role === "user" ? "ユーザー" : "AI"}
                            />
                            <AvatarFallback>{message.role === "user" ? "U" : "AI"}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            {message.axis && (
                              <Badge
                                variant="outline"
                                className={`mb-2 ${
                                  message.axis === "x-axis"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    : message.axis === "time-axis"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                }`}
                              >
                                {message.axis === "x-axis"
                                  ? "X軸: 超抽象化・超具体化"
                                  : message.axis === "time-axis"
                                    ? "時間軸: 過去・現在・未来"
                                    : "META軸: オンボーディングレベル"}
                              </Badge>
                            )}
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs opacity-50 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar>
                            <AvatarImage src="/abstract-ai-network.png" alt="AI" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg p-3 bg-muted">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-gray-400 animate-bounce"></div>
                              <div
                                className="w-3 h-3 rounded-full bg-gray-400 animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="w-3 h-3 rounded-full bg-gray-400 animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  {!selectedIdea && (
                    <div className="w-full">
                      <h3 className="text-sm font-medium mb-2">サンプルアイデアから選択：</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {sampleBusinessIdeas.map((idea) => (
                          <Button
                            key={idea.id}
                            variant="outline"
                            onClick={() => handleSelectIdea(idea.id)}
                            className="text-left h-auto border-primary/50 hover:bg-primary/10"
                          >
                            <div>
                              <p className="font-medium">{idea.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                {idea.description}
                              </p>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      placeholder="メッセージを入力..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      disabled={isLoading}
                      className="border-primary/50 focus-visible:ring-primary"
                    />
                    <Button
                      size="icon"
                      onClick={handleSendMessage}
                      disabled={isLoading}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="mockup" className="space-y-4">
              <Card className="border-2 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    MVPモックアップ生成
                  </CardTitle>
                  <CardDescription>アイデアを迅速に可視化するためのモックアップを自動生成します</CardDescription>
                </CardHeader>
                <CardContent>
                  {!generatedMockup ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="mockup-type" className="text-sm font-medium">
                          モックアップタイプ
                        </label>
                        <Select value={mockupType} onValueChange={setMockupType}>
                          <SelectTrigger id="mockup-type" className="border-primary/50 focus:ring-primary">
                            <SelectValue placeholder="モックアップタイプを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="website">Webサイト</SelectItem>
                            <SelectItem value="slides">プレゼンテーションスライド</SelectItem>
                            <SelectItem value="system-ui">システムUI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="mockup-description" className="text-sm font-medium">
                          詳細説明
                        </label>
                        <Textarea
                          id="mockup-description"
                          placeholder="モックアップに含めたい機能や内容を詳しく説明してください..."
                          value={mockupDescription}
                          onChange={(e) => setMockupDescription(e.target.value)}
                          rows={6}
                          className="border-primary/50 focus-visible:ring-primary"
                        />
                      </div>
                      <Button
                        onClick={handleGenerateMockup}
                        disabled={isLoading || mockupDescription.trim() === ""}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            生成中...
                          </>
                        ) : (
                          <>
                            <Rocket className="mr-2 h-4 w-4" />
                            爆速でモックアップを生成
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">
                          {mockupType === "website"
                            ? "Webサイトモックアップ"
                            : mockupType === "slides"
                              ? "プレゼンテーションスライド"
                              : "システムUIモックアップ"}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{mockupDescription}</p>
                      </div>
                      <div className="border rounded-lg overflow-hidden">
                        {mockupType === "website" && (
                          <Image
                            src="/generic-website-mockup.png"
                            alt="Webサイトモックアップ"
                            width={800}
                            height={600}
                            className="w-full"
                          />
                        )}
                        {mockupType === "slides" && (
                          <Image
                            src="/presentation-slides.png"
                            alt="プレゼンテーションスライド"
                            width={800}
                            height={600}
                            className="w-full"
                          />
                        )}
                        {mockupType === "system-ui" && (
                          <Image
                            src="/placeholder.svg?key=gkqxy"
                            alt="システムUIモックアップ"
                            width={800}
                            height={600}
                            className="w-full"
                          />
                        )}
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setGeneratedMockup(null)
                            setMockupDescription("")
                          }}
                          className="border-primary/50 text-primary hover:bg-primary/10"
                        >
                          新しいモックアップを作成
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90">モックアップをダウンロード</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="action-plan" className="space-y-4">
              <Card className="border-2 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    30日行動計画
                  </CardTitle>
                  <CardDescription>事業立ち上げまでの具体的なアクションプランと進捗状況を管理します</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">事業スタート日：</h3>
                      <Badge className="px-3 py-1 text-sm bg-red-500 text-white">{deadline.toLocaleDateString()}</Badge>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">マイルストーン：</h3>
                      {actionPlan.length > 0 ? (
                        <div className="space-y-2">
                          {actionPlan.map((task, index) => (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-3 rounded-lg border ${
                                task.status === "completed"
                                  ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                                  : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className={`h-6 w-6 rounded-full ${
                                    task.status === "completed"
                                      ? "bg-green-500 text-white border-green-500"
                                      : "border-gray-300"
                                  }`}
                                  onClick={() => toggleTaskStatus(index)}
                                >
                                  {task.status === "completed" && <CheckSquare className="h-3 w-3" />}
                                </Button>
                                <span className={task.status === "completed" ? "line-through text-gray-500" : ""}>
                                  {task.task}
                                </span>
                              </div>
                              <Badge
                                variant={
                                  new Date(task.dueDate) < new Date() && task.status !== "completed"
                                    ? "destructive"
                                    : "outline"
                                }
                              >
                                期限: {task.dueDate}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-6 border border-dashed rounded-lg">
                          <p className="text-gray-500">AIとチャットして行動計画を生成しましょう！</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center">
                      <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setActiveTab("chat")}>
                        <Rocket className="mr-2 h-4 w-4" />
                        AIと計画を詳細化する
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* 右側: 思考プロセスの可視化 */}
        <div className="space-y-6">
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                思考プロセスの可視化
              </CardTitle>
              <CardDescription>3つの軸に沿った思考の進捗状況をリアルタイムで表示</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">X軸: 超抽象化・超具体化</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>超抽象化</span>
                    <span>{thinkingProcess.xAxis.abstraction}%</span>
                  </div>
                  <Progress
                    value={thinkingProcess.xAxis.abstraction}
                    className="h-2 bg-red-100"
                    indicatorClassName="bg-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>超具体化</span>
                    <span>{thinkingProcess.xAxis.concretization}%</span>
                  </div>
                  <Progress
                    value={thinkingProcess.xAxis.concretization}
                    className="h-2 bg-red-100"
                    indicatorClassName="bg-red-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">時間軸: 過去・現在・未来</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>過去</span>
                    <span>{thinkingProcess.timeAxis.past}%</span>
                  </div>
                  <Progress
                    value={thinkingProcess.timeAxis.past}
                    className="h-2 bg-blue-100"
                    indicatorClassName="bg-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>現在</span>
                    <span>{thinkingProcess.timeAxis.present}%</span>
                  </div>
                  <Progress
                    value={thinkingProcess.timeAxis.present}
                    className="h-2 bg-blue-100"
                    indicatorClassName="bg-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>未来</span>
                    <span>{thinkingProcess.timeAxis.future}%</span>
                  </div>
                  <Progress
                    value={thinkingProcess.timeAxis.future}
                    className="h-2 bg-blue-100"
                    indicatorClassName="bg-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-semibold">META軸: オンボーディングレベル</h3>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      現在のレベル:{" "}
                      <Badge
                        variant="outline"
                        className={
                          thinkingProcess.metaAxis.level === "beginner"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : thinkingProcess.metaAxis.level === "intermediate"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        }
                      >
                        {thinkingProcess.metaAxis.level === "beginner"
                          ? "初級"
                          : thinkingProcess.metaAxis.level === "intermediate"
                            ? "中級"
                            : "上級"}
                      </Badge>
                    </span>
                    <span className="text-sm">{thinkingProcess.metaAxis.progress}%</span>
                  </div>
                  <Progress
                    value={thinkingProcess.metaAxis.progress}
                    className="h-2 bg-yellow-100"
                    indicatorClassName="bg-yellow-500"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {thinkingProcess.metaAxis.level === "beginner"
                      ? "基本的な概念の理解と小さな成功体験の積み重ねを重視しています。30日という短期間で成果を出すために、シンプルで実行しやすい計画を立てましょう。"
                      : thinkingProcess.metaAxis.level === "intermediate"
                        ? "より専門的な情報と戦略的思考の促進に焦点を当てています。30日という制約の中で、最も効果的なアプローチを選択しましょう。"
                        : "高度な分析と革新的なアプローチの探求を支援しています。30日という短期間でも、あなたの経験を活かして最大の成果を出せるでしょう。"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                インサイトとリソース
              </CardTitle>
              <CardDescription>思考プロセスから得られた洞察と役立つリソース</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <span>主要なインサイト</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full p-1">
                          <Zap className="h-3 w-3" />
                        </span>
                        <span>
                          <strong>30日という制約</strong>は創造性を高める -
                          時間的制約があることで、本質的な価値に集中できる
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full p-1">
                          <Zap className="h-3 w-3" />
                        </span>
                        <span>
                          <strong>MVPの範囲を最小限に</strong>絞り込むことが成功の鍵 - 必要最小限の機能で価値検証を行う
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full p-1">
                          <Zap className="h-3 w-3" />
                        </span>
                        <span>
                          <strong>早期のユーザーフィードバック</strong>が重要 -
                          完璧を目指すよりも、早く市場に出して改善する
                        </span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-500" />
                    <span>市場データ</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <p>関連市場の主要データ:</p>
                      <ul className="space-y-1 list-disc pl-5">
                        <li>市場規模: 2023年時点で約5,000億円</li>
                        <li>年間成長率: 15.7%</li>
                        <li>主要プレイヤー: A社(35%)、B社(22%)、C社(18%)</li>
                        <li>ユーザー獲得コスト: 平均8,500円/人</li>
                        <li>
                          <strong>30日以内の立ち上げ</strong>で先行者利益を獲得できる可能性: 高
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-500" />
                    <span>推奨リソース</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full p-1">
                          <FileText className="h-3 w-3" />
                        </span>
                        <span>
                          「スプリント: 最速で成果を生み出す方法」（著: ジェイク・ナップ）- <strong>5日間</strong>
                          で製品プロトタイプを作る方法
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full p-1">
                          <FileText className="h-3 w-3" />
                        </span>
                        <span>
                          「リーンスタートアップ」（著: エリック・リース）- <strong>最小限の労力</strong>
                          で市場検証する方法
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-primary/10 text-primary rounded-full p-1">
                          <FileText className="h-3 w-3" />
                        </span>
                        <span>
                          「MAKE: <strong>30日</strong>でイノベーションを形にする方法」（著: 佐藤裕介）
                        </span>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-500 bg-red-50 dark:bg-red-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <FlameIcon className="h-5 w-5" />
                緊急アクション
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                <strong>今すぐ行動しなければ、期限内に事業を立ち上げることはできません！</strong>{" "}
                以下のアクションを今日中に完了させましょう：
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-red-200 text-red-700 dark:bg-red-700 dark:text-red-200 rounded-full p-1">
                    <CheckSquare className="h-3 w-3" />
                  </span>
                  <span>MVPの最小機能セットを決定する</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-red-200 text-red-700 dark:bg-red-700 dark:text-red-200 rounded-full p-1">
                    <CheckSquare className="h-3 w-3" />
                  </span>
                  <span>モックアップを生成して初期ユーザーに見せる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-red-200 text-red-700 dark:bg-red-700 dark:text-red-200 rounded-full p-1">
                    <CheckSquare className="h-3 w-3" />
                  </span>
                  <span>開発リソースを確保する</span>
                </li>
              </ul>
              <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white">
                <Rocket className="mr-2 h-4 w-4" />
                今すぐ行動する
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
