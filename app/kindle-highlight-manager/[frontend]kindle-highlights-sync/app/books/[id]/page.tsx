import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

// 実際の実装では、データベースやAPIからデータを取得します
const getBookDetails = (id: string) => {
  return {
    id,
    title: "アトミック・ハビット",
    author: "ジェームズ・クリアー",
    asin: "B07YY2WV6K",
    lastSynced: "2023-05-10T10:30:00Z",
    highlightCount: 42,
    coverUrl: "/abstract-book-cover.png",
    driveUrl: "https://drive.google.com/file/d/example/view",
    highlights: [
      {
        id: "h1",
        text: "習慣は人生の複利である。1％の改善を毎日積み重ねれば、1年後には37倍も良くなる。1％の悪化を毎日積み重ねれば、ほぼゼロになる。習慣は小さな選択の積み重ねであり、究極的には私たちのアイデンティティとなる。",
        location: "位置No. 123-125",
        date: "2023-05-01T09:30:00Z",
        note: "複利効果の重要性。小さな習慣が大きな変化をもたらす。",
        color: "yellow",
      },
      {
        id: "h2",
        text: "目標は結果を設定するものであり、システムはプロセスを設定するものである。目標を達成できるかどうかは、勝つためのシステムをどれだけうまく構築できるかにかかっている。",
        location: "位置No. 245-247",
        date: "2023-05-02T14:15:00Z",
        note: "",
        color: "blue",
      },
      {
        id: "h3",
        text: "習慣を変えるための4つの法則：1. 明確にする、2. 魅力的にする、3. 容易にする、4. 満足のいくものにする。",
        location: "位置No. 356-358",
        date: "2023-05-03T20:45:00Z",
        note: "習慣形成の基本原則。この4つを意識して新しい習慣を作る。",
        color: "yellow",
      },
      {
        id: "h4",
        text: "アイデンティティの変化が最も効果的である。行動を変えるには信念を変える必要がある。あなたがどんな人間になりたいかを決め、そのアイデンティティに基づいて行動する。",
        location: "位置No. 412-414",
        date: "2023-05-04T18:30:00Z",
        note: "アイデンティティベースの習慣形成。「私はランナーだ」と自己認識することで、走ることが自然になる。",
        color: "pink",
      },
      {
        id: "h5",
        text: "環境は行動の強力な手がかりである。同じ場所で同じことを繰り返すと、その場所が特定の習慣と結びつく。",
        location: "位置No. 523-525",
        date: "2023-05-05T10:20:00Z",
        note: "",
        color: "blue",
      },
    ],
  }
}

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

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const book = getBookDetails(params.id)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link href="/books" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter">{book.title}</h1>
            </div>
            <p className="text-muted-foreground">{book.author}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              共有
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              ダウンロード
            </Button>
            <Button size="sm" asChild>
              <a href={book.driveUrl} target="_blank" rel="noopener noreferrer">
                Google Driveで開く
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[250px_1fr]">
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden border">
              <img
                src={book.coverUrl || "/placeholder.svg"}
                alt={`${book.title}の表紙`}
                className="w-full h-auto object-cover"
              />
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">書籍情報</h3>
                  <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-sm">
                    <span className="text-muted-foreground">ASIN:</span>
                    <span>{book.asin}</span>
                    <span className="text-muted-foreground">ハイライト:</span>
                    <span>{book.highlightCount}件</span>
                    <span className="text-muted-foreground">最終同期:</span>
                    <span>{new Date(book.lastSynced).toLocaleString("ja-JP")}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">ハイライト色</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-yellow-50 border-yellow-200">
                      黄色 (3)
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 border-blue-200">
                      青色 (2)
                    </Badge>
                    <Badge variant="outline" className="bg-pink-50 border-pink-200">
                      ピンク (1)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="highlights">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="highlights">ハイライト</TabsTrigger>
                <TabsTrigger value="markdown">Markdown</TabsTrigger>
              </TabsList>

              <TabsContent value="highlights" className="space-y-6 mt-6">
                {book.highlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className={`border-l-4 rounded-r-md p-4 ${getHighlightColorStyle(highlight.color)}`}
                  >
                    <blockquote className="text-lg mb-2">{highlight.text}</blockquote>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
                      <span>{highlight.location}</span>
                      <span>{new Date(highlight.date).toLocaleString("ja-JP")}</span>
                    </div>
                    {highlight.note && (
                      <div className="bg-white bg-opacity-50 p-3 rounded border text-sm mt-2">{highlight.note}</div>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="markdown" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Markdownプレビュー</CardTitle>
                    <CardDescription>Google Driveに保存されているMarkdownファイルの内容</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm whitespace-pre-wrap overflow-auto max-h-[600px]">
                      {`---
title: "アトミック・ハビット"
author: "ジェームズ・クリアー"
asin: "B07YY2WV6K"
last_synced: "2023-05-10T10:30:00Z"
---

## ハイライトとメモ

> 習慣は人生の複利である。1％の改善を毎日積み重ねれば、1年後には37倍も良くなる。1％の悪化を毎日積み重ねれば、ほぼゼロになる。習慣は小さな選択の積み重ねであり、究極的には私たちのアイデンティティとなる。
*日時: 2023-05-01 09:30:00*
*位置: 位置No. 123-125*
*色: 黄色*

複利効果の重要性。小さな習慣が大きな変化をもたらす。

---

> 目標は結果を設定するものであり、システムはプロセスを設定するものである。目標を達成できるかどうかは、勝つためのシステムをどれだけうまく構築できるかにかかっている。
*日時: 2023-05-02 14:15:00*
*位置: 位置No. 245-247*
*色: 青色*

---

> 習慣を変えるための4つの法則：1. 明確にする、2. 魅力的にする、3. 容易にする、4. 満足のいくものにする。
*日時: 2023-05-03 20:45:00*
*位置: 位置No. 356-358*
*色: 黄色*

習慣形成の基本原則。この4つを意識して新しい習慣を作る。

---

> アイデンティティの変化が最も効果的である。行動を変えるには信念を変える必要がある。あなたがどんな人間になりたいかを決め、そのアイデンティティに基づいて行動する。
*日時: 2023-05-04 18:30:00*
*位置: 位置No. 412-414*
*色: ピンク*

アイデンティティベースの習慣形成。「私はランナーだ」と自己認識することで、走ることが自然になる。

---

> 環境は行動の強力な手がかりである。同じ場所で同じことを繰り返すと、その場所が特定の習慣と結びつく。
*日時: 2023-05-05 10:20:00*
*位置: 位置No. 523-525*
*色: 青色*
`}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
