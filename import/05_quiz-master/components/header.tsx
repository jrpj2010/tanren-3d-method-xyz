"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          クイズマスター
        </Link>

        <div className="flex items-center gap-2">
          <ModeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">メニュー</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>クイズマスター</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-3 mt-6">
                <Link href="/" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="mr-2">🏠</span> ホーム
                  </Button>
                </Link>
                <Link href="/daily-challenge" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="mr-2">🔥</span> デイリーチャレンジ
                  </Button>
                </Link>
                <Link href="/statistics" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="mr-2">📊</span> マイ統計
                  </Button>
                </Link>
                <Link href="/achievements" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="mr-2">🏆</span> アチーブメント
                  </Button>
                </Link>
                <Link href="/settings" passHref>
                  <Button variant="ghost" className="w-full justify-start">
                    <span className="mr-2">⚙️</span> 設定
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
