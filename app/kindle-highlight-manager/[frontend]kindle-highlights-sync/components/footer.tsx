import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6" />
              <span className="text-xl font-bold">Kindle同期</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              KindleのハイライトをGoogle DriveにMarkdown形式で自動保存し、AIによる分析に活用できるサービスです。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">リンク</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/books" className="text-muted-foreground hover:text-foreground">
                  書籍一覧
                </Link>
              </li>
              <li>
                <Link href="/highlights" className="text-muted-foreground hover:text-foreground">
                  ハイライト
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-muted-foreground hover:text-foreground">
                  設定
                </Link>
              </li>
              <li>
                <Link href="/sync-history" className="text-muted-foreground hover:text-foreground">
                  同期履歴
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">サポート</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  ヘルプセンター
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Kindle同期. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
