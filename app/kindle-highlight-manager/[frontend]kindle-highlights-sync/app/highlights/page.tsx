import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Book, Calendar, Search, SortAsc } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Pagination } from "@/components/pagination"
import { Badge } from "@/components/ui/badge"

// 実際の実装では、データベースやAPIからデータを取得します
const mockHighlights = [
  {
    id: "h1",
    text: "習慣は人生の複利である。1％の改善を毎日積み重ねれば、1年後には37倍も良くなる。1％の悪化を毎日積み重ねれば、ほぼゼロになる。習慣は小さな選択の積み重ねであり、究極的には私たちのアイデンティティとなる。",
    location: "位置No. 123-125",
    date: "2023-05-01T09:30:00Z",
    note: "複利効果の重要性。小さな習慣が大きな変化をもたらす。",
    color: "yellow",
    book: {
      id: "1",
      title: "アトミック・ハビット",
      author: "ジェームズ・クリアー",
    },
  },
  {
    id: "h2",
    text: "目標は結果を設定するものであり、システムはプロセスを設定するものである。目標を達成できるかどうかは、勝つためのシステムをどれだけうまく構築できるかにかかっている。",
    location: "位置No. 245-247",
    date: "2023-05-02T14:15:00Z",
    note: "",
    color: "blue",
    book: {
      id: "1",
      title: "アトミック・ハビット",
      author: "ジェームズ・クリアー",
    },
  },
  {
    id: "h3",
    text: "私たちは、世界を「分断」と「対立」で理解しがちだが、実際には多くの国が中間的な発展段階にある。",
    location: "位置No. 356-358",
    date: "2023-05-03T20:45:00Z",
    note: "二項対立的な世界観の危険性について。",
    color: "yellow",
    book: {
      id: "2",
      title: "FACTFULNESS（ファクトフルネス）",
      author: "ハンス・ロスリング",
    },
  },
  {
    id: "h4",
    text: "人を説得するには、まず相手の立場に立って考えることが重要だ。自分の欲求ではなく、相手の欲求を理解し、その視点から話をすることで、相手は耳を傾けるようになる。",
    location: "位置No. 412-414",
    date: "2023-05-04T18:30:00Z",
    note: "相手の視点に立つことの重要性。自分の視点だけでは説得力がない。",
    color: "pink",
    book: {
      id: "3",
      title: "人を動かす",
      author: "デール・カーネギー",
    },
  },
  {
    id: "h5",
    text: "アドラー心理学では、「承認欲求」から解放されることが真の自由への第一歩だと考える。他者からの評価を気にせず、自分の人生を自分で選択する勇気を持つことが重要だ。",
    location: "位置No. 523-525",
    date: "2023-05-05T10:20:00Z",
    note: "",
    color: "blue",
    book: {
      id: "4",
      title: "嫌われる勇気",
      author: "岸見一郎、古賀史健",
    },
  },
]

// ハイライトの色に対応するスタイルを返す関数
const getHighlightColorStyle = (color: string) => {
  switch (color) {
    case "yellow":
      return "border-l-yellow-400 bg-yellow-50"
    case "blue":
      return "border-l-blue-400 bg-blue-50"
    case "pink":
      return "border-l-pink-400 bg-pink-50"
    case "orange":
      return "border-l-orange-400 bg-orange-50"
    default:
      return "border-l-gray-400 bg-gray-50"
  }
}

export default function HighlightsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tighter">すべてのハイライト</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Kindleで保存したすべてのハイライトとメモを一覧で確認できます
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="ハイライトやメモを検索..." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="date">
              <SelectTrigger className="w-[180px]">
                <SortAsc className="mr-2 h-4 w-4" />
                <SelectValue placeholder="並び替え" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">日付（新しい順）</SelectItem>
                <SelectItem value="book">書籍名</SelectItem>
                <SelectItem value="color">ハイライト色</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {mockHighlights.map((highlight) => (
            <Card key={highlight.id}>
              <CardContent className="p-0">
                <div className={`border-l-4 rounded-r-md p-6 ${getHighlightColorStyle(highlight.color)}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-white">
                        {highlight.color === "yellow" && "黄色"}
                        {highlight.color === "blue" && "青色"}
                        {highlight.color === "pink" && "ピンク"}
                        {highlight.color === "orange" && "オレンジ"}
                      </Badge>
                      <Link
                        href={`/books/${highlight.book.id}`}
                        className="flex items-center gap-1 text-sm hover:underline"
                      >
                        <Book className="h-3.5 w-3.5" />
                        {highlight.book.title}
                      </Link>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(highlight.date).toLocaleString("ja-JP")}</span>
                      <span className="mx-1">•</span>
                      <span>{highlight.location}</span>
                    </div>
                  </div>

                  <blockquote className="text-lg mb-3">{highlight.text}</blockquote>

                  {highlight.note && (
                    <div className="bg-white bg-opacity-70 p-3 rounded border text-sm">{highlight.note}</div>
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
