"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Save, RefreshCw, Trash2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [syncFrequency, setSyncFrequency] = useState("daily")
  const [folderName, setFolderName] = useState("KindleHighlights")
  const [autoCreateFolder, setAutoCreateFolder] = useState(true)
  const [notifyOnSync, setNotifyOnSync] = useState(true)
  const [markdownTemplate, setMarkdownTemplate] = useState(
    `---
title: "{title}"
author: "{author}"
asin: "{asin}"
last_synced: "{date}"
---

## ハイライトとメモ

{highlights}
`,
  )

  const handleSaveSettings = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // 設定保存ロジックを実装
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tighter">設定</h1>
          <p className="text-gray-500 dark:text-gray-400">Kindleハイライト同期の動作をカスタマイズします</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="general">一般設定</TabsTrigger>
            <TabsTrigger value="accounts">アカウント連携</TabsTrigger>
            <TabsTrigger value="advanced">詳細設定</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <form onSubmit={handleSaveSettings}>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>同期設定</CardTitle>
                    <CardDescription>ハイライトの同期頻度と方法を設定します</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">同期頻度</Label>
                      <Select value={syncFrequency} onValueChange={setSyncFrequency}>
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="同期頻度を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">1時間ごと</SelectItem>
                          <SelectItem value="daily">1日1回</SelectItem>
                          <SelectItem value="weekly">週1回</SelectItem>
                          <SelectItem value="manual">手動のみ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify">同期完了通知</Label>
                        <p className="text-xs text-muted-foreground">同期が完了したときに通知を表示します</p>
                      </div>
                      <Switch id="notify" checked={notifyOnSync} onCheckedChange={setNotifyOnSync} />
                    </div>

                    <div className="pt-2">
                      <Button type="button" variant="outline" className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        今すぐ同期
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Google Drive設定</CardTitle>
                    <CardDescription>ハイライトの保存先を設定します</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="folder">保存先フォルダ名</Label>
                      <Input
                        id="folder"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder="KindleHighlights"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-create">フォルダ自動作成</Label>
                        <p className="text-xs text-muted-foreground">
                          指定したフォルダが存在しない場合に自動作成します
                        </p>
                      </div>
                      <Switch id="auto-create" checked={autoCreateFolder} onCheckedChange={setAutoCreateFolder} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end mt-6">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>保存中...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      設定を保存
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="accounts">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Amazon連携</CardTitle>
                  <CardDescription>Kindleのハイライトとメモを取得するための連携設定</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">連携状態</p>
                        <p className="text-xs text-muted-foreground">example@amazon.co.jp</p>
                      </div>
                      <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        連携済み
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      再連携
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      連携解除
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Google連携</CardTitle>
                  <CardDescription>Google Driveにファイルを保存するための連携設定</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">連携状態</p>
                        <p className="text-xs text-muted-foreground">example@gmail.com</p>
                      </div>
                      <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        連携済み
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      再連携
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      連携解除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Markdownテンプレート</CardTitle>
                <CardDescription>ハイライトの保存形式をカスタマイズします</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template">テンプレート</Label>
                  <Textarea
                    id="template"
                    value={markdownTemplate}
                    onChange={(e) => setMarkdownTemplate(e.target.value)}
                    className="font-mono text-sm h-[300px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    利用可能な変数: {"{title}"}, {"{author}"}, {"{asin}"}, {"{date}"}, {"{highlights}"}
                  </p>
                </div>

                <div className="pt-2">
                  <Button type="button" variant="outline" className="w-full">
                    デフォルトに戻す
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button type="button">
                <Save className="mr-2 h-4 w-4" />
                詳細設定を保存
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
