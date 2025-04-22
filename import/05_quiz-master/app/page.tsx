import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import GenreCard from "@/components/genre-card"
import DailyChallenge from "@/components/daily-challenge"
import RecentScore from "@/components/recent-score"
import { genres } from "@/lib/quiz-data"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">クイズマスター</h1>

      <DailyChallenge />

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">ジャンルを選択</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <RecentScore />

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">クイックアクセス</h2>
            <div className="flex flex-col gap-3">
              <Link href="/statistics" passHref>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">📊</span> マイ統計
                </Button>
              </Link>
              <Link href="/achievements" passHref>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">🏆</span> アチーブメント
                </Button>
              </Link>
              <Link href="/settings" passHref>
                <Button variant="outline" className="w-full justify-start">
                  <span className="mr-2">⚙️</span> 設定
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
