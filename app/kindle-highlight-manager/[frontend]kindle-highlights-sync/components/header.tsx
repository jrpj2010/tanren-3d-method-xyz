"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Menu, Settings, User, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  // 実際の実装では、認証状態やユーザー情報をサーバーから取得します
  const isAuthenticated = true
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">Kindle同期</span>
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/books" className="text-sm font-medium hover:text-primary">
                書籍一覧
              </Link>
              <Link href="/highlights" className="text-sm font-medium hover:text-primary">
                ハイライト
              </Link>
              <Link href="/sync-history" className="text-sm font-medium hover:text-primary">
                同期履歴
              </Link>
              <Link href="/settings" className="text-sm font-medium hover:text-primary">
                設定
              </Link>
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/diverse-avatars.png" alt="プロフィール画像" />
                    <AvatarFallback>YT</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">山田 太郎</p>
                    <p className="text-xs leading-none text-muted-foreground">example@gmail.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>プロフィール</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>設定</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth/logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>ログアウト</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">メニューを開く</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/books"
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    書籍一覧
                  </Link>
                  <Link
                    href="/highlights"
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ハイライト
                  </Link>
                  <Link
                    href="/sync-history"
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    同期履歴
                  </Link>
                  <Link
                    href="/settings"
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    設定
                  </Link>
                  <Link
                    href="/profile"
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    プロフィール
                  </Link>
                  <div className="h-px bg-border my-2" />
                  <Link
                    href="/auth/logout"
                    className="text-lg font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ログアウト
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">ログイン</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">新規登録</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
