"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Save, LogOut, Trash2, AlertTriangle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("山田 太郎")
  const [email, setEmail] = useState("example@gmail.com")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSaveProfile = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // プロフィール保存ロジックを実装
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // パスワード変更ロジックを実装
    setTimeout(() => {
      setIsLoading(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tighter">アカウント設定</h1>
          <p className="text-gray-500 dark:text-gray-400">アカウント情報の確認と設定変更</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/diverse-avatars.png" alt="プロフィール画像" />
                    <AvatarFallback>YT</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-center">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
                  <div className="w-full pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/auth/logout">
                        <LogOut className="mr-2 h-4 w-4" />
                        ログアウト
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="profile">プロフィール</TabsTrigger>
                <TabsTrigger value="password">パスワード</TabsTrigger>
                <TabsTrigger value="danger">アカウント削除</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <form onSubmit={handleSaveProfile}>
                    <CardHeader>
                      <CardTitle>プロフィール情報</CardTitle>
                      <CardDescription>アカウント情報を更新します</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">お名前</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">メール通知</Label>
                          <p className="text-xs text-muted-foreground">同期完了時などの通知をメールで受け取ります</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>保存中...</>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            変更を保存
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <form onSubmit={handleChangePassword}>
                    <CardHeader>
                      <CardTitle>パスワード変更</CardTitle>
                      <CardDescription>アカウントのパスワードを変更します</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">現在のパスワード</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">新しいパスワード</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                        <p className="text-xs text-muted-foreground">8文字以上で、英字・数字を含めてください</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">新しいパスワード（確認）</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>変更中...</>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            パスワードを変更
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="danger">
                <Card>
                  <CardHeader>
                    <CardTitle>アカウント削除</CardTitle>
                    <CardDescription>アカウントを完全に削除します。この操作は取り消せません。</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>警告</AlertTitle>
                      <AlertDescription>
                        アカウントを削除すると、すべてのデータが完全に削除され、復元できなくなります。 Google
                        Driveに保存されたMarkdownファイルは削除されません。
                      </AlertDescription>
                    </Alert>

                    <div className="pt-2">
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="mr-2 h-4 w-4" />
                        アカウントを削除
                      </Button>
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
