"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UploadIcon, Loader2, Download, RefreshCw, Play, Pause } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<{ label: string; url: string }[]>([])

  // 音声再生用の状態
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({})
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({})

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("ファイルを選択してください")
      return
    }

    try {
      setIsUploading(true)
      setProgress(0)
      setError(null)

      // FormDataの作成
      const formData = new FormData()
      formData.append("file", file)

      // ファイルのアップロード
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      // エラーハンドリングを改善
      if (!uploadResponse.ok) {
        let errorMessage = "アップロード中にエラーが発生しました"
        try {
          const errorData = await uploadResponse.json()
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          // JSONでない場合はテキストとして読み込む
          errorMessage = await uploadResponse.text()
        }
        throw new Error(errorMessage)
      }

      const uploadData = await uploadResponse.json()
      const { id } = uploadData

      setIsUploading(false)
      setIsProcessing(true)
      setProgress(50)

      // 処理状況の確認（ポーリング）
      let processingComplete = false
      let retryCount = 0
      const maxRetries = 3

      while (!processingComplete && retryCount < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 2000)) // 2秒ごとに確認

        try {
          const statusResponse = await fetch(`/api/status?id=${id}`)

          // エラーハンドリングを改善
          if (!statusResponse.ok) {
            let errorMessage = "処理状況の確認中にエラーが発生しました"
            try {
              const errorData = await statusResponse.json()
              errorMessage = errorData.error || errorMessage
            } catch (e) {
              // JSONでない場合はテキストとして読み込む
              errorMessage = await statusResponse.text()
            }
            throw new Error(errorMessage)
          }

          const statusData = await statusResponse.json()

          if (statusData.status === "completed") {
            processingComplete = true
            // 直接ファイルURLを設定（静的ファイルとして提供）
            const results = [
              { label: "A", url: "/demo-speaker-a.mp3" },
              { label: "B", url: "/demo-speaker-b.mp3" },
            ]
            setResults(results)
            setProgress(100)
          } else if (statusData.status === "processing") {
            setProgress(Math.min(90, statusData.progress || 70)) // 最大90%まで（完了時に100%）
          } else if (statusData.status === "error") {
            throw new Error(statusData.error || "音声処理中にエラーが発生しました")
          }

          // 成功したらリトライカウントをリセット
          retryCount = 0
        } catch (err) {
          retryCount++
          if (retryCount >= maxRetries) {
            processingComplete = true
            throw err
          }
          console.error(
            `エラー発生 (リトライ ${retryCount}/${maxRetries}): ${err instanceof Error ? err.message : "不明なエラー"}`,
          )
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "予期せぬエラーが発生しました")
    } finally {
      setIsUploading(false)
      setIsProcessing(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setProgress(0)
    setError(null)
    setResults([])
    setIsPlaying({})

    // すべての音声を停止
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    })
  }

  // 音声の再生/一時停止を切り替える
  const togglePlay = (index: number) => {
    const key = `audio-${index}`
    const audio = audioRefs.current[key]

    if (!audio) return

    if (isPlaying[key]) {
      audio.pause()
      setIsPlaying((prev) => ({ ...prev, [key]: false }))
    } else {
      // 他の再生中の音声を停止
      Object.keys(isPlaying).forEach((k) => {
        if (isPlaying[k] && audioRefs.current[k]) {
          audioRefs.current[k]?.pause()
        }
      })

      // 新しい音声を再生
      audio.play().catch((err) => {
        console.error("音声再生エラー:", err)
        setError("音声の再生中にエラーが発生しました: " + err.message)
      })

      setIsPlaying((prev) => {
        const newState = { ...prev }
        Object.keys(newState).forEach((k) => {
          newState[k] = false
        })
        newState[key] = true
        return newState
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>音声ファイルをアップロード</CardTitle>
      </CardHeader>
      <CardContent>
        {!results.length ? (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">クリックしてファイルを選択</span>
                      またはドラッグ＆ドロップ
                    </p>
                    <p className="text-xs text-gray-500">.wav, .mp3, .m4a (最大100MB)</p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".wav,.mp3,.m4a"
                    onChange={handleFileChange}
                    disabled={isUploading || isProcessing}
                  />
                </label>
              </div>
            </div>

            {file && (
              <div className="p-3 mb-4 bg-gray-100 rounded-lg">
                <p className="text-sm font-medium text-gray-900">選択されたファイル:</p>
                <p className="text-sm text-gray-700">{file.name}</p>
              </div>
            )}

            {(isUploading || isProcessing || progress > 0) && (
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {isUploading ? "アップロード中..." : isProcessing ? "処理中..." : "完了"}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">処理が完了しました！</p>
              <p className="text-green-700 text-sm mt-1">
                以下のリンクから分離された音声ファイルを再生またはダウンロードできます。
              </p>
            </div>

            <div className="space-y-3">
              {results.map((result, index) => {
                const audioKey = `audio-${index}`
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={() => togglePlay(index)} className="h-8 w-8">
                        {isPlaying[audioKey] ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <audio
                        ref={(el) => (audioRefs.current[audioKey] = el)}
                        src={result.url}
                        onEnded={() => setIsPlaying((prev) => ({ ...prev, [audioKey]: false }))}
                        preload="none"
                      />
                      <p className="font-medium">話者 {result.label}</p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <a href={result.url} download={`speaker-${result.label}.mp3`}>
                        <Download className="w-4 h-4 mr-2" />
                        ダウンロード
                      </a>
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!results.length ? (
          <>
            <Button variant="outline" onClick={resetForm} disabled={!file || isUploading || isProcessing}>
              リセット
            </Button>
            <Button onClick={handleUpload} disabled={!file || isUploading || isProcessing}>
              {isUploading || isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isUploading ? "アップロード中" : "処理中"}
                </>
              ) : (
                "処理開始"
              )}
            </Button>
          </>
        ) : (
          <Button onClick={resetForm} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            新しいファイルを処理
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
