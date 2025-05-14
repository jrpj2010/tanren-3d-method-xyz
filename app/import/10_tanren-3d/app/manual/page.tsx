import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Clock, Layers } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ManualPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            TANREN 3D思考メソッド マニュアル
          </h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            新規事業支援AIアプリケーションの使い方と各機能の詳細解説
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="x-axis">X軸</TabsTrigger>
          <TabsTrigger value="y-axis">Y軸</TabsTrigger>
          <TabsTrigger value="z-axis">Z軸</TabsTrigger>
          <TabsTrigger value="mockup">モックアップ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="py-6">
          <Card>
            <CardHeader>
              <CardTitle>TANREN 3D思考メソッドとは</CardTitle>
              <CardDescription>新規事業の立ち上げを多角的に支援する思考フレームワーク</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">3つの軸による思考の深化</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    TANREN
                    3D思考メソッドは、新規事業の立ち上げという不確実性の高い挑戦を、3つの異なる次元から捉え直すことで、より網羅的で洞察に満ちた事業戦略の構築を支援します。
                  </p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>X軸</strong>: 超抽象化・超具体化・超構造化で「深さ」「具体性」「再現性」を追求
                    </li>
                    <li>
                      <strong>Y軸</strong>: 過去・現在・未来の時間軸でRAG文章生成とストーリーテリング
                    </li>
                    <li>
                      <strong>Z軸</strong>: ユーザーの「習熟度」「成長」「伴走」を全自動支援
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?key=nf2lz"
                    alt="TANREN 3D思考メソッド概念図"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">AIによる支援の特徴</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">思考の明確化と深化</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        複雑な事業アイデアが整理され、本質的な課題や機会が明確になります。AIが適切な問いかけを行い、思考を促進します。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">網羅的な視点の獲得</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        一つの側面に偏らず、時間軸、ユーザーレベルといった多角的な視点から事業を検討できます。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">行動計画の質の向上</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        具体的なステップと、その背景にある論理、将来展望が結びついた、実行力の高い計画が策定できます。
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Link href="/manual/x-axis">
                  <Button>
                    X軸の詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="x-axis" className="py-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Layers className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>X軸: 超抽象化・超具体化サイクル</CardTitle>
                  <CardDescription>アイデアの本質を見極め、実行可能な計画へと落とし込むサイクル</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">超抽象化とは</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    超抽象化とは、個別の事象やアイデアから具体的な要素を削ぎ落とし、その根底にある本質、普遍的な構造、あるいはより高次の概念へと思考を引き上げるプロセスです。
                  </p>
                  <h4 className="font-semibold mb-2">AIによる超抽象化支援</h4>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>概念階層の提示</strong>: 関連する上位概念、類似概念、対比概念などを提示
                    </li>
                    <li>
                      <strong>パターン認識と抽出</strong>: 類似事例から共通するパターンや構造を抽出
                    </li>
                    <li>
                      <strong>「なぜ？」の深掘り支援</strong>: 本質的な価値や目的を問いかけ
                    </li>
                    <li>
                      <strong>メタファーやアナロジーの生成</strong>: 新たな視点を提供
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?key=rd662"
                    alt="超抽象化プロセス図"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?key=k3rjz"
                    alt="超具体化プロセス図"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">超具体化とは</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    超具体化とは、抽象化によって見出された本質やコンセプトを、現実世界で実行可能な具体的なステップ、製品仕様、サービス設計、市場戦略などに落とし込むプロセスです。
                  </p>
                  <h4 className="font-semibold mb-2">AIによる超具体化支援</h4>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>ディープリサーチ</strong>: 関連する具体的な情報を収集・分析・整理
                    </li>
                    <li>
                      <strong>行動計画テンプレート生成</strong>: 具体的なタスク、マイルストーン、リソース計画
                    </li>
                    <li>
                      <strong>「カチャッとはまる」ソリューション提案</strong>: 複数の具体的な解決策を提示
                    </li>
                    <li>
                      <strong>MVP仕様案作成支援</strong>: 最小限の製品・サービスの仕様案を提案
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">超抽象化・超具体化サイクルの実践例</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h4 className="font-semibold mb-2">事例: オンライン教育サービスの開発</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-medium mb-2">超抽象化フェーズ</p>
                      <ol className="space-y-2 list-decimal pl-5">
                        <li>初期アイデア: 「プログラミング学習アプリを作りたい」</li>
                        <li>AIの問いかけ: 「なぜプログラミング学習が重要なのか？」</li>
                        <li>本質の探求: 「技術的自立を促し、創造力を解放する」</li>
                        <li>メタファー提示: 「言語習得と同様、表現手段の獲得である」</li>
                        <li>抽象化された本質: 「人々が自分のアイデアを形にする力を与える」</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-medium mb-2">超具体化フェーズ</p>
                      <ol className="space-y-2 list-decimal pl-5">
                        <li>ディープリサーチ: 既存の学習プラットフォームの分析、ユーザーニーズ調査</li>
                        <li>ソリューション提案: 「プロジェクトベースの学習」「メンターシップ」「コミュニティ機能」</li>
                        <li>MVP仕様: 3つの主要機能、ユーザーフロー、画面設計</li>
                        <li>行動計画: 2週間ごとのマイルストーン、必要なリソース、リスク対策</li>
                        <li>検証計画: ベータユーザー募集方法、フィードバック収集の仕組み</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Link href="/manual/y-axis">
                  <Button>
                    Y軸の詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="y-axis" className="py-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Y軸: 過去・現在・未来のストーリーテリング</CardTitle>
                  <CardDescription>過去のファクトチェックから、現代情報をディープリサーチし、未来に繋げるRAG文章のストーリー生成</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Y軸ストーリーテリングの目的</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  時間軸に沿ったストーリーテリングは、単なる情報提供を超え、ユーザーの感情に訴えかけることで、事業への意義と使命感を醸成し、自己肯定感を高め、未来への希望とビジョンを明確化します。
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">事業への意義と使命感</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        アイデアが歴史的な必然性や社会的な要請の中でどのような意味を持つのかを物語ることで、使命感を喚起します。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">自己肯定感の向上</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        過去の困難を乗り越えてきた人類の進歩や、現在の自身の強みと機会を認識することで、「自分ならできる」という自己効力感を高めます。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">未来への希望とビジョン</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        事業が成功した暁に実現される素晴らしい未来像を具体的に描くことで、困難を乗り越えるための強い動機付けとなります。
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">「過去」の物語</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    すべてのアイデアには、その背景となる歴史や先人たちの試行錯誤が存在します。AIは、ユーザーの事業アイデアのルーツを探り、過去からの学びを物語として提示します。
                  </p>
                  <h4 className="font-semibold mb-2">AIによる支援</h4>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>関連分野の歴史的変遷の提示</li>
                    <li>先駆者たちの挑戦と失敗からの学習</li>
                    <li>ユーザー自身の原体験との接続</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">「現在」の物語</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    現在の市場環境、技術動向、そしてユーザー自身の持つリソースや強みを客観的に把握し、事業機会を明確に捉える物語を紡ぎます。
                  </p>
                  <h4 className="font-semibold mb-2">AIによる支援</h4>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>市場環境と顧客ニーズの描写</li>
                    <li>利用可能な技術とリソースの棚卸し</li>
                    <li>ユーザーの強みと情熱の再確認</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">「未来」の物語</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    事業が成功した場合に実現される、より良い未来の姿を具体的に描き出し、ユーザーの想像力を刺激し、強い希望を抱かせる物語を創造します。
                  </p>
                  <h4 className="font-semibold mb-2">AIによる支援</h4>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>進化の波形と未来予測</li>
                    <li>問題解決後の世界と受益者の喜び</li>
                    <li>ユーザー自身の成長と達成感の描写</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Y軸ストーリーテリングの実践例</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h4 className="font-semibold mb-2">事例: 持続可能な食品配送サービス</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="font-medium mb-2">過去の物語</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        「食品配送の歴史は、便利さと環境負荷のジレンマの歴史でした。1950年代のミルクマン配達システムは環境に優しいリユースモデルでしたが、使い捨て文化の台頭で衰退。しかし、その知恵は失われず、今、環境意識の高まりとともに再評価されています。あなたのアイデアは、この歴史的な知恵と現代技術の融合点に位置しています。」
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">現在の物語</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        「現在、食品配送市場は年間20%成長していますが、同時に環境への懸念も高まっています。消費者の68%が環境に配慮したサービスに追加料金を払う意思があるというデータもあります。あなたは物流の専門知識と環境活動の経験を持ち、この課題に取り組む独自の視点を持っています。今こそ、この市場の転換点で行動するチャンスです。」
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">未来の物語</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        「5年後、あなたのサービスは都市部の食品配送の標準モデルとなり、年間数千トンのプラスチック廃棄物を削減しています。利用者は便利さを犠牲にすることなく環境保護に貢献できる喜びを感じ、コミュニティ意識も高まっています。あなた自身も業界のリーダーとして認められ、より大きな環境問題にも影響力を持つようになっているでしょう。」
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Link href="/manual/z-axis">
                  <Button>
                    Z軸の詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="z-axis" className="py-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Brain className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Z軸: オンボーディングレベルの適応的支援</CardTitle>
                  <CardDescription>レベルを定義して、初期伴走をAIが全自動支援を提供する成長支援システム</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Z軸の目的と意義</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Z軸は、ユーザー自身のスキルや経験レベルに合わせて、AIのサポート内容や情報提供の深度を調整するための軸です。オンボーディングレベルを明確に定義し、各レベルに合わせた伴走支援を全自動で展開することで、ユーザーは常に最適なレベルの挑戦と支援を受けながら、効果的に学習し成長することができます。
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-2">Z軸の特徴</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>
                        <strong>適応的な支援</strong>: ユーザーの知識・経験レベルに合わせた情報提供
                      </li>
                      <li>
                        <strong>成長支援</strong>: 段階的な難易度調整でスキルアップを促進
                      </li>
                      <li>
                        <strong>自己効力感の向上</strong>: 適切な難易度の課題で成功体験を積み重ね
                      </li>
                      <li>
                        <strong>挫折防止</strong>: 「問題のレベルが高すぎる」状況を回避
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?key=0wr8z"
                      alt="Z軸概念図"
                      width={400}
                      height={250}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>初級レベル (Beginner)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">対象ユーザー像</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        新規事業立ち上げの経験がほとんどない、または特定の事業ドメインに関する知識が浅いユーザー。アイデアは漠然としているか、具体的な進め方に不安を感じている状態。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">学習目標</h4>
                      <ul className="space-y-1 list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                        <li>基本的なプロセス、用語、考え方の理解</li>
                        <li>アイデアを具体化する第一歩を踏み出す</li>
                        <li>小さな成功体験を積み、自信を持つ</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">AIの支援方針</h4>
                      <ul className="space-y-1 list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                        <li>基礎的な情報提供、専門用語の平易な解説</li>
                        <li>具体的な手順のステップバイステップでの提示</li>
                        <li>シンプルなテンプレートの提供</li>
                        <li>励ましとポジティブなフィードバック</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>中級レベル (Intermediate)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">対象ユーザー像</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        何らかの事業経験がある、または関連分野の知識をある程度有しており、基本的なビジネスプランの作成や市場調査の経験があるユーザー。アイデアは具体的だが、戦略のブラッシュアップや実行計画の精度向上に課題を感じている状態。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">学習目標</h4>
                      <ul className="space-y-1 list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                        <li>より高度な分析手法や戦略的思考を身につける</li>
                        <li>事業計画の網羅性と実現可能性を高める</li>
                        <li>潜在的なリスクを特定し、対策を講じる</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">AIの支援方針</h4>
                      <ul className="space-y-1 list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                        <li>より専門的かつ詳細な情報提供</li>
                        <li>複数の選択肢の提示とそれぞれのメリット・デメリット分析</li>
                        <li>ケーススタディの紹介、仮説検証のサポート</li>
                        <li>建設的な批判や異なる視点の提供</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>上級レベル (Advanced)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">対象ユーザー像</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        豊富な事業立ち上げ経験を持つ、または特定分野で高度な専門知識を有するユーザー。独自のビジネスモデルや革新的な技術を追求しており、さらなるスケールアップやニッチ市場の開拓を目指している状態。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">学習目標</h4>
                      <ul className="space-y-1 list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                        <li>既存の枠組みを超える新たな洞察を得る</li>
                        <li>複雑な意思決定を行うための高度な分析能力を磨く</li>
                        <li>業界のオピニオンリーダーやイノベーターとしての地位を確立する</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">AIの支援方針</h4>
                      <ul className="space-y-1 list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                        <li>最新の研究論文やニッチな市場データの提供</li>
                        <li>高度なシミュレーションツールの紹介</li>
                        <li>専門家レベルのディスカッションパートナーとしての壁打ち</li>
                        <li>ユーザーの思考を刺激する挑戦的な問いかけ</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">AIによるレベル判定と調整</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      AIは、ユーザーに最適な支援を提供するために、以下の方法を組み合わせてユーザーのオンボーディングレベルを推定し、必要に応じて調整します。
                    </p>
                    <ul className="space-y-2 list-disc pl-5 text-gray-500 dark:text-gray-400">
                      <li>
                        <strong>初期アセスメント</strong>: 簡単な質問に答えてもらうことで、初期レベルを設定
                      </li>
                      <li>
                        <strong>対話内容の分析</strong>: 使用する語彙、質問の専門性、アイデアの具体性などを分析
                      </li>
                      <li>
                        <strong>タスク遂行状況の評価</strong>: 提示した課題やタスクに対する成果物の質や完成度を評価
                      </li>
                      <li>
                        <strong>ユーザーによる自己申告</strong>:
                        ユーザー自身がレベル感やAIからの支援内容の難易度についてフィードバック
                      </li>
                      <li>
                        <strong>進捗に応じた自動調整</strong>:
                        特定の知識領域を習得したり、成果を上げたりした場合に次のレベルへ移行
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?key=carjc"
                      alt="レベル判定と調整プロセス図"
                      width={400}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Link href="/manual/mockup">
                  <Button>
                    モックアップ機能の詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mockup" className="py-6">
          <Card>
            <CardHeader>
              <CardTitle>MVPモックアップ自動生成機能</CardTitle>
              <CardDescription>アイデアを迅速に可視化し、検証を容易にするモックアップ生成</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">モックアップ生成の目的</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    MVPモックアップ自動生成機能は、ユーザーのアイデアを迅速に可視化し、検証を容易にするためのものです。実際の開発前に、アイデアの形を見ることで、改善点の発見や関係者との共有がスムーズになります。
                  </p>
                  <h4 className="font-semibold mb-2">モックアップ生成の特徴</h4>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <strong>多様なタイプに対応</strong>: Webサイト、スライド、システムUIなど
                    </li>
                    <li>
                      <strong>ダミーデータの自動挿入</strong>: 具体的なイメージを掴むための実例データ
                    </li>
                    <li>
                      <strong>機能説明マニュアルの自動生成</strong>: 各機能の目的と使い方を解説
                    </li>
                    <li>
                      <strong>洗練されたデザイン</strong>: 美しく、使いやすいUIを提供
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=400&query=モックアップ生成プロセス図"
                    alt="モックアップ生成プロセス図"
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">対応するモックアップタイプ</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Webサイト</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Image
                        src="/placeholder.svg?height=200&width=300&query=Webサイトモックアップ例"
                        alt="Webサイトモックアップ例"
                        width={300}
                        height={200}
                        className="rounded-lg w-full"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ランディングページ、サービス紹介サイト、Eコマースサイトなど、様々なタイプのWebサイトモックアップを生成します。レスポンシブデザインにも対応し、PC・タブレット・スマートフォンでの表示を確認できます。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">スライド</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Image
                        src="/placeholder.svg?height=200&width=300&query=プレゼンテーションスライドモックアップ例"
                        alt="プレゼンテーションスライドモックアップ例"
                        width={300}
                        height={200}
                        className="rounded-lg w-full"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        投資家向けピッチデッキ、サービス説明資料、マーケティング資料など、目的に応じたプレゼンテーションスライドを自動生成します。説得力のあるストーリー構成と視覚的に魅力的なデザインを提供します。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">システムUI</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Image
                        src="/placeholder.svg?height=200&width=300&query=アプリケーションUIモックアップ例"
                        alt="アプリケーションUIモックアップ例"
                        width={300}
                        height={200}
                        className="rounded-lg w-full"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Webアプリケーション、モバイルアプリ、管理画面など、実際のシステムUIを模したモックアップを生成します。ユーザーフローや主要機能の操作感を確認できます。
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">モックアップ生成プロセス</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <ol className="space-y-4 list-decimal pl-5">
                    <li>
                      <p className="font-medium">要件ヒアリング</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        AIがモックアップに必要な情報（目的、ターゲットユーザー、主要機能、デザイン方針など）をヒアリングします。
                      </p>
                    </li>
                    <li>
                      <p className="font-medium">構造設計</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ヒアリング内容に基づき、モックアップの全体構造（サイトマップ、画面遷移、情報アーキテクチャなど）を設計します。
                      </p>
                    </li>
                    <li>
                      <p className="font-medium">コンテンツ生成</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        各ページ・画面に必要なテキスト、画像プレースホルダー、ダミーデータを生成します。
                      </p>
                    </li>
                    <li>
                      <p className="font-medium">デザイン適用</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        事前に用意されたデザインテンプレートを適用し、ブランドカラーやフォントなどをカスタマイズします。
                      </p>
                    </li>
                    <li>
                      <p className="font-medium">マニュアル生成</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        モックアップと同時に、各機能の目的や使い方を説明するマニュアルサイト（またはヘルプ機能）を生成します。
                      </p>
                    </li>
                    <li>
                      <p className="font-medium">プレビューと調整</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        生成されたモックアップをユーザーが確認し、フィードバックに基づいて調整を行います。
                      </p>
                    </li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">モックアップ活用のベストプラクティス</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">ステークホルダーとの共有</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        生成されたモックアップを投資家、チームメンバー、潜在顧客などと共有し、早期フィードバックを収集しましょう。視覚的な資料があることで、アイデアの伝達がスムーズになります。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">ユーザーテスト</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        モックアップを使って簡易的なユーザーテストを実施し、UI/UXの問題点や改善点を発見しましょう。実際の開発前に多くの問題を特定できます。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">開発指針としての活用</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        モックアップとマニュアルを開発チームの指針として活用しましょう。視覚的な目標があることで、開発の方向性が明確になります。
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">反復的な改善</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        フィードバックに基づいてモックアップを繰り返し改善し、アイデアを洗練させましょう。モックアップの修正は実際の開発よりもコストが低いため、この段階で多くの実験を行うことが重要です。
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Link href="/demo">
                  <Button>
                    デモを試してみる
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
