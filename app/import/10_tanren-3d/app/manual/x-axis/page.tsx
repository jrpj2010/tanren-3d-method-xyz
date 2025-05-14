import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Layers } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function XAxisPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-4">
            <Layers className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              X軸: 超抽象化・超具体化・超構造化サイクル
            </h1>
          </div>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            アイデアの本質を見極め、実行可能な計画に落とし込み、再現性ある仕組みを構築する思考サイクル
          </p>
        </div>
      </div>

      <div className="grid gap-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">X軸の概要</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                TANREN
                3D思考メソッドにおけるX軸は、「超抽象化」「超具体化」「超構造化」という三つのベクトルを往復する思考の動きを指します。このダイナミックなサイクルを通じて、アイデアは磨かれ、本質が抽出され、具体的な実行計画に落とし込まれ、再現性のある仕組みとして構造化されます。
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                AIは、このサイクルを強力にブーストし、ユーザーの思考を加速・深化させます。ユーザー単独では到達しにくいレベルの抽象度へと思考をジャンプさせ、革新的な洞察を得るきっかけを提供します。また、膨大な情報を収集・分析し、具体的な行動計画への落とし込み、さらには再現性ある仕組みとしての自動生成までを支援します。
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">X軸サイクルの効果</h3>
                <ul className="space-y-1 list-disc pl-5 text-gray-500 dark:text-gray-400">
                  <li>アイデアの質の向上</li>
                  <li>意思決定の迅速化と精度向上</li>
                  <li>実行力の強化</li>
                  <li>再現性ある仕組みの自動構築</li>
                  <li>イノベーションの促進</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=300&width=500&query=超抽象化・超具体化サイクル図"
                alt="超抽象化・超具体化サイクル図"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">超抽象化: 本質の探求</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?key=s56mj"
                alt="超抽象化プロセス図"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                超抽象化とは、個別の事象やアイデアから具体的な要素を削ぎ落とし、その根底にある本質、普遍的な構造、あるいはより高次の概念へと思考を引き上げるプロセスです。これにより、ユーザーは目先の課題や制約に囚われず、より広い視野で事業の可能性を探求できます。
              </p>
              <h3 className="font-semibold mb-2">AIによる超抽象化支援</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">概念階層の提示</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーが入力したキーワードやアイデアに対し、関連する上位概念、類似概念、対比概念などを提示し、思考のスコープを広げます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">パターン認識と抽出</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーが抱える課題やアイデアと類似する過去の事例や異なるドメインの事象を大量のデータから検索し、共通するパターンや構造を抽出して提示します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">「なぜ？」の深掘り支援</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーのアイデアや目的について、AIが「それはなぜ重要なのか？」「それによって本質的に何が解決されるのか？」といった問いを投げかけることで、より深いレベルでの自己対話を促します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">メタファーやアナロジーの生成</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      複雑な概念や新しいアイデアを、ユーザーが理解しやすい別の事象や物語に置き換えて提示することで、直感的な理解を促し、新たな視点を提供します。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">超具体化: 行動計画への落とし込み</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                超具体化とは、抽象化によって見出された本質やコンセプトを、現実世界で実行可能な具体的なステップ、製品仕様、サービス設計、市場戦略などに落とし込むプロセスです。アイデアがどんなに素晴らしくても、具体的な形にならなければ価値を生みません。
              </p>
              <h3 className="font-semibold mb-2">AIによる超具体化支援</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">ディープリサーチ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーのアイデアや抽象的なコンセプトに関連する具体的な情報（市場データ、競合情報、技術トレンド、関連法規、成功事例、失敗事例など）を収集・分析し、整理して提供します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">行動計画テンプレート生成</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      抽象的な目標を達成するための具体的なタスク、マイルストーン、必要なリソース、想定されるリスクなどを構造化した行動計画のテンプレートを生成します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">「カチャッとはまる」ソリューション提案</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーが抱える課題や実現したいアイデアに対して、過去の膨大な事例やノウハウを基に、複数の具体的な解決策や実現方法を提案します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">MVP仕様案作成支援</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      アイデアを検証するための最小限の製品・サービスの仕様案（機能リスト、画面イメージ、ユーザーストーリーなど）を提案し、迅速なプロトタイピングを支援します。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?key=t4tnu"
                alt="超具体化プロセス図"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">X軸サイクルの実践例</h2>
          <Card>
            <CardHeader>
              <CardTitle>事例: 健康管理アプリの開発</CardTitle>
              <CardDescription>超抽象化・超具体化サイクルを通じたアイデアの発展プロセス</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">初期アイデア</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      「日々の運動や食事を記録できる健康管理アプリを開発したい」
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AIによる問いかけ</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      「なぜ人々は健康管理アプリを使うのでしょうか？健康管理の本質的な課題は何だと思いますか？」
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">超抽象化フェーズ</h3>
                  <ol className="space-y-2 list-decimal pl-5 text-gray-500 dark:text-gray-400">
                    <li>
                      <strong>本質の探求</strong>:
                      「健康管理の本質は、データ記録ではなく、持続可能な行動変容と習慣形成にある」
                    </li>
                    <li>
                      <strong>パターン認識</strong>:
                      AIが「習慣形成の心理学」「行動経済学のナッジ理論」「ゲーミフィケーション」などの関連概念を提示
                    </li>
                    <li>
                      <strong>メタファー生成</strong>:
                      「健康管理は庭園の手入れのようなもの。毎日の小さなケアが長期的な美しさを生む」
                    </li>
                    <li>
                      <strong>抽象化された本質</strong>:
                      「人々が無理なく継続できる、喜びを感じる健康習慣の形成を支援する」
                    </li>
                  </ol>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">超具体化フェーズ</h3>
                  <ol className="space-y-2 list-decimal pl-5 text-gray-500 dark:text-gray-400">
                    <li>
                      <strong>ディープリサーチ</strong>:
                      AIが習慣形成アプリの市場調査、成功事例、ユーザーレビュー分析を提供
                    </li>
                    <li>
                      <strong>ソリューション提案</strong>:
                      <ul className="list-disc pl-5 mt-1">
                        <li>マイクロハビット（極小の習慣）から始める段階的アプローチ</li>
                        <li>社会的サポートとアカウンタビリティ機能</li>
                        <li>パーソナライズされた適応型リマインダー</li>
                        <li>ポジティブ強化に基づく報酬システム</li>
                      </ul>
                    </li>
                    <li>
                      <strong>MVP仕様</strong>: コア機能3つに絞ったプロトタイプ設計、ユーザーフロー、画面遷移図
                    </li>
                    <li>
                      <strong>行動計画</strong>: 3ヶ月のロードマップ、必要なリソース、主要マイルストーン、リスク対策
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">結果</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    単なる記録アプリから、行動科学に基づく習慣形成支援アプリへと、アイデアが本質的に進化。ユーザーの長期的な行動変容を促す独自の価値提案が明確になり、差別化された製品コンセプトが完成しました。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">X軸活用のコツ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>バランスを意識する</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  超抽象化と超具体化のバランスを取りましょう。抽象化だけでは実行に移せず、具体化だけでは視野が狭くなります。両方のモードを意識的に切り替えることで、思考の質が高まります。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>繰り返しサイクルを回す</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  一度のサイクルで完璧を目指さず、何度もサイクルを回しましょう。具体化した後に新たな課題が見つかれば、再度抽象化して本質を見直し、また具体化するという螺旋状の発展を目指します。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AIの問いかけを活用する</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  AIからの「なぜ？」「もし〇〇だとしたら？」といった問いかけを、思考の壁を突破するきっかけとして積極的に活用しましょう。質問に答えることで、自分でも気づかなかった視点が開けることがあります。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>思考を可視化する</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  抽象化と具体化のプロセスをマインドマップやノートに記録し、可視化しましょう。思考の軌跡を残すことで、後から振り返った際に新たな気づきが得られることがあります。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="flex justify-between mt-6">
          <Link href="/manual">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              マニュアルトップに戻る
            </Button>
          </Link>
          <Link href="/manual/y-axis">
            <Button>
              Y軸の詳細を見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
