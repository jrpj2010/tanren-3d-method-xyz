import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ChevronRight, Circle } from "lucide-react"
import Link from "next/link"

interface OnboardingStepsProps {
  amazonConnected: boolean
  googleConnected: boolean
  hasCompletedSetup: boolean
}

export function OnboardingSteps({ amazonConnected, googleConnected, hasCompletedSetup }: OnboardingStepsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            {amazonConnected ? (
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )}
            <div>
              <CardTitle>ステップ1: Amazon連携</CardTitle>
              <CardDescription>Kindleのハイライトとメモを取得するためにAmazonアカウントと連携します</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Amazonアカウントと連携することで、Kindleで保存したハイライトとメモを自動的に取得できるようになります。
            連携情報は安全に保管され、パスワードが保存されることはありません。
          </p>
        </CardContent>
        <CardFooter>
          {amazonConnected ? (
            <Button variant="outline" disabled>
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              連携済み
            </Button>
          ) : (
            <Button asChild>
              <Link href="/auth/amazon">
                Amazon連携を設定する
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            {googleConnected ? (
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )}
            <div>
              <CardTitle>ステップ2: Google連携</CardTitle>
              <CardDescription>ハイライトをGoogle Driveに保存するためにGoogleアカウントと連携します</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Googleアカウントと連携することで、ハイライトとメモをGoogle DriveにMarkdown形式で保存できるようになります。
            保存先フォルダは後から設定画面で変更できます。
          </p>
        </CardContent>
        <CardFooter>
          {googleConnected ? (
            <Button variant="outline" disabled>
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              連携済み
            </Button>
          ) : (
            <Button asChild disabled={!amazonConnected}>
              <Link href="/auth/google">
                Google連携を設定する
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            {hasCompletedSetup ? (
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )}
            <div>
              <CardTitle>ステップ3: 同期設定</CardTitle>
              <CardDescription>同期頻度やGoogle Driveの保存先フォルダを設定します</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            ハイライトの同期頻度や保存先フォルダなどの基本設定を行います。 これらの設定は後からいつでも変更できます。
          </p>
        </CardContent>
        <CardFooter>
          {hasCompletedSetup ? (
            <Button variant="outline" disabled>
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              設定済み
            </Button>
          ) : (
            <Button asChild disabled={!amazonConnected || !googleConnected}>
              <Link href="/settings">
                同期設定を行う
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
