import { Upload } from "@/components/upload"
import { Container } from "@/components/ui/container"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">音声話者分離アプリ</h1>
            <p className="mt-3 text-lg text-gray-600">
              音声ファイルをアップロードして、話者ごとに分離された音声ファイルを取得できます
            </p>
          </div>
          <Upload />
        </div>
      </Container>
    </main>
  )
}
