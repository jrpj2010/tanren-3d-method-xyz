import Link from "next/link"
import { Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
          <Link href="/" className="font-bold text-xl">
            TANREN 3D
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            新規事業支援AIアプリケーション - 30日で事業を立ち上げる三次元思考メソッド
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-6">
          <Link href="/manual" className="text-sm hover:underline underline-offset-4">
            マニュアル
          </Link>
          <Link href="/demo" className="text-sm hover:underline underline-offset-4">
            デモ
          </Link>
          <Link href="/about" className="text-sm hover:underline underline-offset-4">
            概要
          </Link>
          <Link href="/privacy" className="text-sm hover:underline underline-offset-4">
            プライバシーポリシー
          </Link>
          <Link href="/terms" className="text-sm hover:underline underline-offset-4">
            利用規約
          </Link>
        </div>
      </div>
      <div className="border-t py-6 bg-gray-50 dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
            &copy; {new Date().getFullYear()} TANREN 3D思考メソッド. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            <Link href="/demo">
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Rocket className="mr-2 h-3 w-3" />
                30日で事業を立ち上げる
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
