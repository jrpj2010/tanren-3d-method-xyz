import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Calendar, FileText, Search, SortAsc } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Pagination } from "@/components/pagination"

// 実際の実装では、データベースやAPIからデータを取得します
const mockBooks = [
  {
    id: "1",
    title: "アトミック・ハビット",
    author: "ジェームズ・クリアー",
    asin: "B07YY2WV6K",
    lastSynced: "2023-05-10T10:30:00Z",
    highlightCount: 42,
    coverUrl: "/abstract-book-cover.png",
  },
  {
    id: "2",
    title: "FACTFULNESS（ファクトフルネス）",
    author: "ハンス・ロスリング",
    asin: "B07LG7TG5N",
    lastSynced: "2023-05-09T15:45:00Z",
    highlightCount: 28,
    coverUrl: "/abstract-book-cover.png",
  },
  {
    id: "3",
    title: "人を動かす",
    author: "デール・カーネギー",
    asin: "B01MEEGHGV",
    lastSynced: "2023-05-08T09:15:00Z",
    highlightCount: 35,
    coverUrl: "/abstract-book-cover.png",
  },
  {
    id: "4",
    title: "嫌われる勇気",
    author: "岸見一郎、古賀史健",
    asin: "B00H7RACY8",
    lastSynced: "2023-05-07T14:20:00Z",
    highlightCount: 31,
    coverUrl: "/abstract-book-cover.png",
  },
  {
    id: "5",
    title: "サピエンス全史",
    author: "ユヴァル・ノア・ハラリ",
    asin: "B01LW7JZLC",
    lastSynced: "2023-05-06T11:10:00Z",
    highlightCount: 54,
    coverUrl: "/abstract-book-cover.png",
  },
  {
    id: "6",
    title: "SHOE DOG（シュードッグ）",
    author: "フィル・ナイト",
    asin: "B01N0H1IGO",
    lastSynced: "2023-05-05T16:35:00Z",
    highlightCount: 22,
    coverUrl: "/abstract-book-cover.png",
  },
]

export default function BooksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tighter">書籍一覧</h1>
          <p className="text-gray-500 dark:text-gray-400">同期されたKindleの書籍とハイライトを確認できます</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="書籍やハイライトを検索..." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="date">
              <SelectTrigger className="w-[180px]">
                <SortAsc className="mr-2 h-4 w-4" />
                <SelectValue placeholder="並び替え" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">同期日（新しい順）</SelectItem>
                <SelectItem value="title">タイトル（昇順）</SelectItem>
                <SelectItem value="highlights">ハイライト数（多い順）</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          {mockBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="shrink-0 sm:w-[120px] h-[180px] sm:h-auto bg-muted flex items-center justify-center">
                    <img
                      src={book.coverUrl || "/placeholder.svg"}
                      alt={`${book.title}の表紙`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-6 flex-1">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{book.title}</h3>
                      <p className="text-muted-foreground">{book.author}</p>
                      <div className="flex flex-wrap gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span>ASIN: {book.asin}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>ハイライト: {book.highlightCount}件</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>最終同期: {new Date(book.lastSynced).toLocaleString("ja-JP")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button asChild>
                        <Link href={`/books/${book.id}`}>詳細を見る</Link>
                      </Button>
                      <Button variant="outline">Google Driveで開く</Button>
                    </div>
                  </div>
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
