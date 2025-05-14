"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock, Layers, Rocket, Zap, FlameIcon, Calendar, CheckSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// 3Dモデルを動的インポート（クライアントサイドのみ）
const ThreeDimensionalModel = dynamic(() => import("@/components/three-dimensional-model"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ),
})

export default function Home() {
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  // カウントダウンタイマー
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="px-3 py-1 text-sm bg-red-500 text-white mb-2 animate-pulse">
                  <Calendar className="mr-1 h-3 w-3" />
                  あなたの新規事業スタートまであと{countdown.days}日
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                  TANREN 3D思考メソッド
                </h1>
                <h2 className="text-2xl font-bold text-primary">
                  <span className="inline-block">
                    <Zap className="inline-block mr-2 h-6 w-6" />
                    新規事業を爆速で立ち上げる
                  </span>
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  期限が迫る新規事業の立ち上げを、AIの力で猛烈に加速。X軸・時間軸・META軸の3次元思考で、
                  <span className="font-bold text-primary">アイデアから実行までを圧倒的スピードで実現</span>します。
                </p>
              </div>

              {/* カウントダウンタイマー */}
              <div className="grid grid-cols-4 gap-2 my-4 max-w-[600px]">
                <div className="bg-background border-2 border-primary rounded-lg p-2 text-center">
                  <div className="text-3xl font-bold text-primary">{countdown.days}</div>
                  <div className="text-xs text-gray-500">日</div>
                </div>
                <div className="bg-background border-2 border-primary rounded-lg p-2 text-center">
                  <div className="text-3xl font-bold text-primary">{countdown.hours}</div>
                  <div className="text-xs text-gray-500">時間</div>
                </div>
                <div className="bg-background border-2 border-primary rounded-lg p-2 text-center">
                  <div className="text-3xl font-bold text-primary">{countdown.minutes}</div>
                  <div className="text-xs text-gray-500">分</div>
                </div>
                <div className="bg-background border-2 border-primary rounded-lg p-2 text-center">
                  <div className="text-3xl font-bold text-primary">{countdown.seconds}</div>
                  <div className="text-xs text-gray-500">秒</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/demo">
                  <Button size="lg" className="px-8 bg-red-600 hover:bg-red-700 text-white">
                    今すぐ始める
                    <Rocket className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/manual">
                  <Button variant="outline" size="lg" className="px-8">
                    詳細を確認する
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Suspense
                fallback={
                  <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                }
              >
                <ThreeDimensionalModel />
              </Suspense>
            </div>
          </div>
        </motion.div>

        {/* 装飾的な要素 */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-red-500/20 rounded-full filter blur-3xl"></div>
      </section>

      {/* 5つの強みセクション */}
      <section className="py-12 bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-8"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="text-primary">5つの圧倒的強み</span>で事業化を加速
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                TANREN 3D思考メソッドは、あなたの新規事業を「考える」から「実行する」まで徹底的に後押しします
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full border-2 border-primary/50 overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold">01</div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>期限設定</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-primary">明確な期限</span>
                    を設定し、緊急性を持って事業開発を進めます。期限があるからこそ、行動が生まれます。
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full border-2 border-primary/50 overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold">02</div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <span>猛烈推進</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    AIが<span className="font-bold text-primary">24時間365日</span>
                    あなたの事業化を猛烈に後押し。迷いや停滞を許しません。
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full border-2 border-primary/50 overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold">03</div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-primary" />
                    <span>実行プラン</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-primary">具体的なアクションプラン</span>
                    を自動生成。「何を」「いつまでに」「どうやって」が明確になります。
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full border-2 border-primary/50 overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold">04</div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>MVP生成</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-primary">最小限の製品</span>
                    を自動生成。アイデアを形にし、すぐに検証できる状態にします。
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="h-full border-2 border-primary/50 overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold">05</div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <FlameIcon className="h-5 w-5 text-primary" />
                    <span>実行促進</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-primary">行動を強く促す</span>
                    仕組みで、計画倒れを防止。思考から実行へのギャップを埋めます。
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                3つの軸で思考を<span className="text-primary">爆速深化</span>
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                TANREN
                3D思考メソッドは、X軸（超抽象化・超具体化・超構造化）、Y軸（過去・現在・未来）、Z軸（初級・中級・上級）の3つの次元から事業アイデアを分析し、多角的な視点で事業の可能性を最大化します。
              </p>
            </div>
          </motion.div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-red-500/30 overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">X軸</div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Layers className="h-8 w-8 text-red-500" />
                  <CardTitle className="text-xl">X軸</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400 min-h-[100px]">
                    <span className="font-bold text-red-500">超抽象化・超具体化・超構造化</span>
                    のサイクルを通じて、アイデアの本質を見極め、具体的な実行計画に落とし込み、再現性あるステップバイステップの仕組み作りをAIが自動生成します。
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/manual/x-axis" className="w-full">
                    <Button variant="outline" size="sm" className="w-full border-red-500 text-red-500 hover:bg-red-50">
                      詳細を見る
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-blue-500/30 overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-bold">Y軸</div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Clock className="h-8 w-8 text-blue-500" />
                  <CardTitle className="text-xl">Y軸</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400 min-h-[100px]">
                    <span className="font-bold text-blue-500">過去のファクトチェックから、現代の情報をディープリサーチし、未来に繋げる</span>
                    文章生成を実施してRAG文章にし、成功までのストーリーをAIがストーリー紡ぎます。
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/manual/y-axis" className="w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                      詳細を見る
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-yellow-500/30 overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-xs font-bold">
                  Z軸
                </div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Brain className="h-8 w-8 text-yellow-500" />
                  <CardTitle className="text-xl">Z軸</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400 min-h-[100px]">
                    <span className="font-bold text-yellow-500">初級・中級・上級のオンボーディングレベル</span>
                    を定義して、初期伴走をAIが全自動支援を提供します。あなたの成長に合わせた支援で成功へ導きます。
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/manual/z-axis" className="w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-50"
                    >
                      詳細を見る
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="text-primary">30日で</span>新規事業を立ち上げる
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                TANREN 3D思考メソッドは、AIの力であなたの思考プロセスを強化し、新規事業の成功確率を高めます。
                <span className="font-bold">「考えるだけ」で終わらせない</span>仕組みがここにあります。
              </p>
            </div>
          </motion.div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-start space-y-4"
            >
              <div className="inline-block rounded-lg bg-red-500 px-3 py-1 text-sm text-white">ステップ 1</div>
              <h3 className="text-2xl font-bold">アイデアの入力と期限設定</h3>
              <p className="text-gray-500 dark:text-gray-400">
                あなたの事業アイデアや課題をAIに伝え、<span className="font-bold">明確な期限を設定</span>
                します。漠然としたアイデアでも構いません。AIがヒアリングを通じて具体化をサポートします。
              </p>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">進捗状況</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-start space-y-4"
            >
              <div className="inline-block rounded-lg bg-blue-500 px-3 py-1 text-sm text-white">ステップ 2</div>
              <h3 className="text-2xl font-bold">3D分析と実行プラン生成</h3>
              <p className="text-gray-500 dark:text-gray-400">
                AIがX軸、Y軸、Z軸の3次元でアイデアを分析し、<span className="font-bold">具体的な実行プラン</span>
                を生成します。あなたの経験レベルに合わせた深さで情報を提示し、再現性ある仕組みを構築します。
              </p>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">進捗状況</span>
                  <span className="text-sm font-medium">50%</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-start space-y-4"
            >
              <div className="inline-block rounded-lg bg-yellow-500 px-3 py-1 text-sm text-white">ステップ 3</div>
              <h3 className="text-2xl font-bold">MVPモックアップ自動生成</h3>
              <p className="text-gray-500 dark:text-gray-400">
                アイデアを迅速に可視化するため、AIがWebサイト、スライド、システムUIなどの
                <span className="font-bold">モックアップを自動生成</span>
                。ダミーデータと機能説明マニュアルも同時に提供します。
              </p>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">進捗状況</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-start space-y-4"
            >
              <div className="inline-block rounded-lg bg-green-500 px-3 py-1 text-sm text-white">ステップ 4</div>
              <h3 className="text-2xl font-bold">実行支援と進捗管理</h3>
              <p className="text-gray-500 dark:text-gray-400">
                AIが<span className="font-bold">毎日あなたの行動を促し</span>
                、進捗を管理します。期限に向けて着実に前進できるよう、モチベーションを維持し、障害を乗り越えるサポートを提供します。
              </p>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">進捗状況</span>
                  <span className="text-sm font-medium">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="text-primary">30日</span>で事業を立ち上げた人々の声
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                TANREN 3D思考メソッドを活用して実際に事業を立ち上げた方々からのリアルな声
              </p>
            </div>
          </motion.div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/diverse-avatars.png"
                      alt="アバター"
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-primary"
                    />
                    <div>
                      <CardTitle className="text-lg">田中 健太</CardTitle>
                      <CardDescription>スタートアップ創業者</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    「<span className="font-bold text-primary">わずか3週間</span>
                    でMVPを完成させ、初期ユーザーからフィードバックを得ることができました。AIの煽りがなければ、きっと今も計画段階で立ち止まっていたでしょう。期限設定と実行プランが本当に効果的でした。」
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/diverse-avatars.png"
                      alt="アバター"
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-primary"
                    />
                    <div>
                      <CardTitle className="text-lg">佐藤 美咲</CardTitle>
                      <CardDescription>プロダクトマネージャー</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    「時間軸での分析が特に役立ちました。過去の失敗事例から学び、未来の可能性を具体的にイメージできたことで、チームの方向性が明確になりました。
                    <span className="font-bold text-primary">30日という期限</span>
                    があったからこそ、全員が本気で取り組めました。」
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/diverse-avatars.png"
                      alt="アバター"
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-primary"
                    />
                    <div>
                      <CardTitle className="text-lg">鈴木 大輔</CardTitle>
                      <CardDescription>新規事業開発責任者</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    「正直、最初は半信半疑でした。しかし、
                    <span className="font-bold text-primary">AIの猛烈な後押し</span>
                    と具体的な実行プランのおかげで、予定よりも早く事業をローンチできました。特にMVPモックアップ機能は、開発チームとの認識合わせに非常に役立ちました。」
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-gradient-to-br from-primary/10 to-background">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <Badge className="px-3 py-1 text-sm bg-red-500 text-white mb-2 animate-pulse">
                <Calendar className="mr-1 h-3 w-3" />
                あなたの新規事業スタートまであと{countdown.days}日
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="text-primary">今すぐ行動</span>して、30日後に事業をスタート
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                もう考えるだけで終わらせない。TANREN
                3D思考メソッドを活用して、アイデアを磨き、具体的な行動計画を立て、事業を成功に導きましょう。
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/demo">
                <Button size="lg" className="px-8 bg-red-600 hover:bg-red-700 text-white">
                  今すぐ始める
                  <Rocket className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/manual">
                <Button variant="outline" size="lg" className="px-8">
                  詳細を確認する
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
