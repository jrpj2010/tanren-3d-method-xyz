import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, CheckCircle, Clock, XCircle } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/pagination"

// 実際の実装では、データベースやAPIからデータを取得します
const mockSyncHistory = [
  {
    id: "1",
    startTime: "2023-05-10T10:30:00Z",
    endTime: "2023-05-10T10:32:15Z",
    status: "success",
    booksUpdated: 3,
    highlightsAdded: 12,
    message: "同期が正常に完了しました",
  },
  {
    id: "2",
    startTime: "2023-05-09T15:45:00Z",
    endTime: "2023-05-09T15:47:30Z",
    status: "success",
    booksUpdated: 1,
    highlightsAdded: 5,
    message: "同期が正常に完了しました",
  },
  {
    id: "3",
    startTime: "2023-05-08T09:15:00Z",
    endTime: "2023-05-08T09:15:45Z",
    status: "error",
    booksUpdated: 0,
    highlightsAdded: 0,
    message: "Amazonへの接続中にエラーが発生しました",
  },
  {
    id: "4",
    startTime: "2023-05-07T14:20:00Z",
    endTime: "2023-05-07T14:22:10Z",
    status: "success",
    booksUpdated: 2,
    highlightsAdded: 8,
    message: "同期が正常に完了しました",
  },
  {
    id: "5",
    startTime: "2023-05-06T11:10:00Z",
    endTime: "2023-05-06T11:12:30Z",
    status: "success",
    booksUpdated: 4,
    highlightsAdded: 15,
    message: "同期が正常に完了しました",
  },
]

export default function SyncHistoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter">同期履歴</h1>
            </div>
            <p className="text-muted-foreground">過去の同期処理の履歴と結果を確認できます</p>
          </div>
          <Button>
            今すぐ同期
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>同期概要</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">成功</p>
                  <p className="text-2xl font-bold">24回</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium">失敗</p>
                  <p className  />
                <div>
                  <p className="text-sm font-medium">失敗</p>
                  <p className="text-2xl font-bold">1回</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">平均処理時間</p>
                  <p className="text-2xl font-bold">2分12秒</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {mockSyncHistory.map((sync) => (
            <Card key={sync.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {sync.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-1" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">
                          {sync.status === "success" ? "同期成功" : "同期失敗"}
                        </h3>
                        <Badge variant={sync.status === "success" ? "success" : "destructive"}>
                          {sync.status === "success" ? "成功" : "エラー"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{sync.message}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(sync.startTime).toLocaleString("ja-JP")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(sync.endTime).getTime() - new Date(sync.startTime).getTime() > 0
                              ? `${Math.round(
                                  (new Date(sync.endTime).getTime() - new Date(sync.startTime).getTime()) / 1000
                                )}秒`
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {sync.status === "success" && (
                    <div className="flex gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">更新書籍</p>
                        <p className="font-semibold">{sync.booksUpdated}冊</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">追加ハイライト</p>
                        <p className="font-semibold">{sync.highlightsAdded}件</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination />
        </div>
      </main>
      <Footer />
    </div>
  )
}
