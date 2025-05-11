import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, RefreshCw, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OnboardingSteps } from "@/components/onboarding-steps"

export default function HomePage() {
  // 実際の実装では、認証状態やユーザー情報をサーバーから取得します
  const isAuthenticated = false
  const amazonConnected = false
  const googleConnected = false
  const hasCompletedSetup = false

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {!isAuthenticated ? (
          <div className="container mx-auto py-10 px-4 md:py-20">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Kindleハイライト同期</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  KindleのハイライトをGoogle DriveにMarkdown形式で自動保存し、AIによる分析に活用できます
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/auth/login">ログイン</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/auth/register">新規登録</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
                <Card>
                  <CardHeader>
                    <CardTitle>簡単セットアップ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>AmazonとGoogleアカウントを連携するだけで、すぐに利用開始できます。</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>自動同期</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>設定した頻度で自動的にハイライトを同期。手動での転記作業が不要になります。</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>AI活用</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>構造化されたMarkdown形式で保存されるため、AIによる分析や要約に最適です。</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : !hasCompletedSetup ? (
          <div className="container mx-auto py-10 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tighter">セットアップを完了しましょう</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Kindleハイライト同期を使い始めるには、以下のステップを完了してください
                </p>
              </div>

              <OnboardingSteps
                amazonConnected={amazonConnected}
                googleConnected={googleConnected}
                hasCompletedSetup={hasCompletedSetup}
              />
            </div>
          </div>
        ) : (
          <div className="container mx-auto py-10 px-4">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tighter">ダッシュボード</h1>
                  <p className="text-gray-500 dark:text-gray-400">Kindleハイライト同期の状況を確認できます</p>
                </div>
                <Button>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  今すぐ同期
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">同期済み書籍</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24冊</div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link href="/books">
                        書籍一覧を見る
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">ハイライト総数</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">358件</div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link href="/highlights">
                        すべてのハイライトを見る
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">最終同期</CardTitle>
                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2時間前</div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link href="/sync-history">
                        同期履歴を見る
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">最近同期された書籍</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="flex p-4">
                        <div className="shrink-0 mr-4">
                          <div className="h-[120px] w-[80px] bg-muted rounded-md"></div>
                        </div>
                        <div className="flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold">サンプル書籍タイトル {i}</h3>
                            <p className="text-sm text-muted-foreground">著者名</p>
                          </div>
                          <div className="text-xs text-muted-foreground">12件のハイライト</div>
                        </div>
                      </div>
                      <CardFooter className="bg-muted/50 p-3">
                        <Button variant="ghost" size="sm" className="w-full" asChild>
                          <Link href={`/books/${i}`}>
                            詳細を見る
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" asChild>
                    <Link href="/books">すべての書籍を見る</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
