"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, LogIn } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AmazonAuthPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async () => {
    setIsLoading(true)

    // Amazon認証ロジックを実装
    // 実際の実装では、サーバーサイドでOAuth認証フローを開始する

    setTimeout(() => {
      setIsLoading(false)
      // 認証成功後のリダイレクト
      // window.location.href = "/"
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Amazon連携</CardTitle>
            <CardDescription>Kindleのハイライトとメモを取得するためにAmazonアカウントと連携します</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>安全な認証</AlertTitle>
              <AlertDescription>
                認証情報は安全に処理され、当サービスがパスワードを保存することはありません。
                Amazon公式の認証画面に遷移します。
              </AlertDescription>
            </Alert>

            <div className="rounded-md bg-muted p-4">
              <p className="text-sm">連携すると、以下の情報にアクセスできるようになります：</p>
              <ul className="mt-2 list-disc pl-5 text-sm">
                <li>Kindleの書籍一覧</li>
                <li>ハイライトとメモの内容</li>
                <li>書籍のメタデータ（タイトル、著者など）</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                戻る
              </Link>
            </Button>
            <Button onClick={handleAuth} disabled={isLoading}>
              {isLoading ? (
                <>処理中...</>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Amazonで連携する
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
