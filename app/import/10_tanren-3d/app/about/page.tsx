import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Clock, Layers } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">TANREN 3D思考メソッドについて</h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            新規事業の立ち上げを多角的に支援する思考フレームワークの全体像
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="philosophy">思想と背景</TabsTrigger>
          <TabsTrigger value="benefits">提供価値</TabsTrigger>
          <TabsTrigger value="team">開発チーム</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="py-6">
          <div className="grid gap-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">TANREN 3D思考メソッドとは</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  TANREN
                  3D思考メソッドは、新規事業の立ち上げという不確実性の高い挑戦を、3つの異なる次元から捉え直すことで、より網羅的で洞察に満ちた事業戦略の構築を支援するフレームワークです。
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  「TANREN」という名前は、思考を鍛え、磨き上げるという意味を込めています。AIがユーザーの思考プロセスを強化し、新規事業の成功確率を高めるパートナーとしての役割を果たします。
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  このメソッドは、アイデアの創出から具体的な実行計画の策定、さらにはMVP（Minimum Viable
                  Product）のモックアップ作成までをシームレスにサポートし、ユーザーの思考を整理・深化させ、事業化へのモチベーションを高め、具体的な行動を促進します。
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=300&width=500&query=3D思考メソッド概念図"
                  alt="3D思考メソッド概念図"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3つの軸による多角的アプローチ</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Layers className="h-8 w-8 text-primary" />
                    <CardTitle className="text-xl">X軸</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                      アイデアの「深さ」と「具体性」を追求する軸。超抽象化による本質の見極めと、超具体化による行動計画への落とし込みを往復します。AIがこのプロセスをブーストし、思考の壁を突破します。
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Clock className="h-8 w-8 text-primary" />
                    <CardTitle className="text-xl">時間軸</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                      アイデアの「文脈」と「発展性」を捉える軸。過去の経緯、現在の市場環境、未来の可能性をストーリーとして紡ぎ出します。感動的なストーリーテリングで自己肯定感を高めます。
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Brain className="h-8 w-8 text-primary" />
                    <CardTitle className="text-xl">META軸</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーの「習熟度」と「成長」を支援する軸。初級・中級・上級のオンボーディングレベルに応じて、AIが提供する情報やガイダンスを最適化します。
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">AIによる支援の特徴</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>思考パートナーとしてのAI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      AIは単なる情報提供者ではなく、ユーザーの思考プロセスに深く関与し、その質を高め、創造性を刺激するパートナーとして機能します。適切な問いかけ、情報提供、思考ツールの提示を通じて、ユーザーの思考を新たな高みへと導きます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>マルチモーダルな表現</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      テキストだけでなく、図表、タイムライン、画像、モックアップなど、多様な表現方法を組み合わせることで、アイデアの理解と共有を促進します。特に視覚的な表現は、複雑な概念の把握や他者への説明に役立ちます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>インタラクティブな共同創作</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      AIは一方的に解答を提示するのではなく、ユーザーとの対話を通じて共に創り上げていくプロセスを重視します。ユーザーの反応や入力に基づいて、提案内容を柔軟に調整し、パーソナライズされた支援を提供します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>実行可能な成果物の生成</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      思考整理の結果を、要件定義書、技術定義書、Todoリスト、MVPモックアップなど、具体的かつ実用的な成果物として出力します。これにより、思考から行動への移行をスムーズにし、事業化のハードルを下げます。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="philosophy" className="py-6">
          <div className="grid gap-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">思想的背景</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  TANREN
                  3D思考メソッドは、複数の思想的背景と理論的枠組みを統合して生まれました。システム思考、デザイン思考、リーンスタートアップ、認知科学、行動経済学などの知見を取り入れ、新規事業創出のための独自のアプローチを構築しています。
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  特に重視しているのは、「思考の多次元性」です。単一の視点や方法論では捉えきれない複雑な事業課題に対して、異なる次元からの視点を組み合わせることで、より豊かな洞察と実行力を生み出すことを目指しています。
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=300&width=500&query=思想的背景と理論的枠組み"
                  alt="思想的背景と理論的枠組み"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">核となる価値観</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>思考と行動の統合</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      抽象的な思考と具体的な行動を切り離さず、常に往復運動として捉えます。深い思考なくして効果的な行動はなく、行動なくして思考の検証はありません。この統合的アプローチにより、理論と実践のバランスを取ります。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>成長マインドセット</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      能力や知性は固定されたものではなく、努力と適切な方法論によって成長させられるという信念を大切にします。失敗を学びの機会と捉え、継続的な改善と挑戦を奨励します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>共創と対話</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      最良のアイデアや解決策は、多様な視点の交わりから生まれると考えます。AIとユーザー、そして将来的にはユーザー同士の対話と共創を通じて、より豊かな思考と創造を促進します。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">開発の経緯</h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  TANREN
                  3D思考メソッドは、新規事業開発の現場で直面する様々な課題に対応するために開発されました。特に、以下の課題に対する解決策として生まれました：
                </p>
                <ul className="space-y-2 list-disc pl-5 text-gray-500 dark:text-gray-400">
                  <li>
                    <strong>思考の偏り</strong>: 単一の視点や方法論に固執することによる視野の狭さや盲点の発生
                  </li>
                  <li>
                    <strong>抽象と具体のギャップ</strong>:
                    優れたビジョンや理念を具体的な行動に落とし込めない、あるいは目の前の実務に追われて大局を見失う
                  </li>
                  <li>
                    <strong>経験格差</strong>: 事業開発の経験や知識レベルの違いによる情報の非対称性や成長機会の不均衡
                  </li>
                  <li>
                    <strong>モチベーション維持</strong>: 長期にわたる事業開発プロセスにおける情熱や使命感の維持の難しさ
                  </li>
                </ul>
                <p className="text-gray-500 dark:text-gray-400 mt-4">
                  これらの課題に対して、多次元的なアプローチと最新のAI技術を組み合わせることで、より効果的で持続可能な事業開発支援の方法論として、TANREN
                  3D思考メソッドが構築されました。
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="py-6">
          <div className="grid gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">ユーザーへの提供価値</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>思考の明確化と深化</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      複雑な事業アイデアが整理され、本質的な課題や機会が明確になります。多角的な視点からの分析により、思考の質が高まり、より深い洞察を得ることができます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>網羅的な視点の獲得</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      一つの側面に偏らず、時間軸、抽象度、ユーザーレベルといった多角的な視点から事業を検討できます。これにより、盲点を減らし、より堅牢な事業計画を立てることができます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>行動計画の質の向上</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      具体的なステップと、その背景にある論理、将来展望が結びついた、実行力の高い計画が策定できます。「なぜそれをするのか」という根拠と「どうやるのか」という方法が明確になります。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>自己肯定感とモチベーションの向上</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      過去の学び、現在の強み、未来への希望がストーリーとして繋がることで、事業への情熱が高まります。困難に直面しても、より大きな文脈の中で意味を見出し、前進する力を得られます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>継続的な成長支援</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      ユーザーのレベルアップに合わせてAIのサポートも進化し、長期的な事業展開を支援します。初心者から専門家まで、それぞれの段階で最適な学びと挑戦を提供します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>時間と労力の節約</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400">
                      AIによる情報収集、分析、ドキュメント作成、モックアップ生成などの支援により、事業開発プロセスが効率化されます。創造的な思考に集中するための時間と余裕が生まれます。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">成功事例</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>事例1: テクノロジースタートアップ</CardTitle>
                    <CardDescription>AIを活用した医療診断支援ツールの開発</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      医療分野のAIスタートアップが、製品コンセプトの明確化と市場戦略の策定に苦戦していました。TANREN
                      3D思考メソッドを活用し、以下の成果を得ました：
                    </p>
                    <ul className="space-y-1 list-disc pl-5 text-gray-500 dark:text-gray-400">
                      <li>
                        <strong>X軸</strong>: 「診断の正確性向上」から「医師の意思決定支援」へと本質的な価値提案を再定義
                      </li>
                      <li>
                        <strong>時間軸</strong>:
                        医療AIの歴史的変遷を分析し、現在の規制環境と将来の技術進化を踏まえたロードマップを策定
                      </li>
                      <li>
                        <strong>META軸</strong>: 医療従事者の技術受容度に応じた段階的な導入戦略を構築
                      </li>
                      <li>
                        <strong>結果</strong>: 製品コンセプトの明確化により、シリーズAで2億円の資金調達に成功
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>事例2: 個人起業家</CardTitle>
                    <CardDescription>サステナブルファッションのEコマース立ち上げ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      サステナブルファッションに情熱を持つ個人起業家が、差別化戦略と実行計画の策定にTANREN
                      3D思考メソッドを活用しました：
                    </p>
                    <ul className="space-y-1 list-disc pl-5 text-gray-500 dark:text-gray-400">
                      <li>
                        <strong>X軸</strong>:
                        「環境に優しい製品」という抽象的なコンセプトから、「素材のトレーサビリティと物語」という具体的な差別化ポイントを特定
                      </li>
                      <li>
                        <strong>時間軸</strong>:
                        ファストファッションの台頭と消費者意識の変化を分析し、将来のトレンドを予測
                      </li>
                      <li>
                        <strong>META軸</strong>: Eコマース初心者としての学習ステップを明確化し、段階的な成長計画を策定
                      </li>
                      <li>
                        <strong>結果</strong>: 6ヶ月でMVPを立ち上げ、初月から黒字化を達成
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">ユーザーの声</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src="/placeholder.svg?height=60&width=60&query=professional woman"
                        alt="ユーザーアバター"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">山田 明子</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">スタートアップ創業者</p>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      「アイデアはあったものの、どう形にしていいか分からず悩んでいました。TANREN
                      3D思考メソッドを使うことで、漠然としていた構想が明確になり、具体的な一歩を踏み出すことができました。特に時間軸での分析が、自分の事業の意義を再確認するのに役立ちました。」
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src="/placeholder.svg?height=60&width=60&query=business man"
                        alt="ユーザーアバター"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">佐藤 健太郎</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">新規事業開発マネージャー</p>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      「社内の新規事業提案で行き詰まっていたところ、このメソッドに出会いました。X軸の超抽象化・超具体化のサイクルを回すことで、提案の本質的な価値が明確になり、経営陣からの承認を得ることができました。AIとの対話を通じて、自分では気づかなかった視点を得られたのが大きかったです。」
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src="/placeholder.svg?height=60&width=60&query=young entrepreneur"
                        alt="ユーザーアバター"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold">鈴木 翔太</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">学生起業家</p>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      「事業経験がほとんどない状態でしたが、META軸のおかげで自分のレベルに合った情報とガイダンスを受けることができました。少しずつレベルアップしていく実感があり、モチベーションを維持しながら学べています。MVPモックアップ生成機能も、アイデアを形にする上で非常に役立ちました。」
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team" className="py-6">
          <div className="grid gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">開発チーム</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                TANREN
                3D思考メソッドは、事業開発、認知科学、AI技術の専門家からなる学際的なチームによって開発されました。多様なバックグラウンドと経験を持つメンバーが協力することで、包括的かつ実用的なフレームワークを構築しています。
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/placeholder.svg?height=200&width=200&query=professional business woman"
                    alt="チームメンバー1"
                    width={200}
                    height={200}
                    className="rounded-full mb-4"
                  />
                  <h3 className="font-bold text-xl">中村 優子</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">プロジェクトリーダー</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    シリアルアントレプレナーとして3社の起業経験を持ち、事業開発と組織構築の専門家。TANREN
                    3D思考メソッドの全体コンセプトと方法論を統括。
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/placeholder.svg?height=200&width=200&query=academic researcher"
                    alt="チームメンバー2"
                    width={200}
                    height={200}
                    className="rounded-full mb-4"
                  />
                  <h3 className="font-bold text-xl">高橋 誠</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">認知科学研究者</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    創造性と意思決定プロセスを専門とする認知科学者。X軸（超抽象化・超具体化サイクル）の理論的基盤を構築し、思考プロセスの最適化を担当。
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/placeholder.svg?height=200&width=200&query=AI engineer"
                    alt="チームメンバー3"
                    width={200}
                    height={200}
                    className="rounded-full mb-4"
                  />
                  <h3 className="font-bold text-xl">伊藤 健太</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">AIエンジニア</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    自然言語処理とヒューマンコンピュータインタラクションの専門家。AIによる思考支援システムの設計と実装を担当し、ユーザー体験の最適化に貢献。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">アドバイザリーボード</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src="/placeholder.svg?height=100&width=100&query=venture capitalist"
                        alt="アドバイザー1"
                        width={100}
                        height={100}
                        className="rounded-full mb-3"
                      />
                      <h3 className="font-semibold">田中 正彦</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">ベンチャーキャピタリスト</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src="/placeholder.svg?height=100&width=100&query=psychology professor"
                        alt="アドバイザー2"
                        width={100}
                        height={100}
                        className="rounded-full mb-3"
                      />
                      <h3 className="font-semibold">佐々木 美智子</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">心理学教授</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src="/placeholder.svg?height=100&width=100&query=tech entrepreneur"
                        alt="アドバイザー3"
                        width={100}
                        height={100}
                        className="rounded-full mb-3"
                      />
                      <h3 className="font-semibold">山本 隆太</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">テック起業家</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Image
                        src="/placeholder.svg?height=100&width=100&query=design thinking expert"
                        alt="アドバイザー4"
                        width={100}
                        height={100}
                        className="rounded-full mb-3"
                      />
                      <h3 className="font-semibold">小林 直子</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">デザイン思考専門家</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">研究と開発の取り組み</h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  TANREN 3D思考メソッドは継続的な研究と改善を行っています。現在進行中の主な取り組みは以下の通りです：
                </p>
                <ul className="space-y-2 list-disc pl-5 text-gray-500 dark:text-gray-400">
                  <li>
                    <strong>効果測定研究</strong>:
                    様々な業種・規模の事業開発プロジェクトにおける本メソッドの効果を定量的・定性的に測定し、その有効性を検証しています。
                  </li>
                  <li>
                    <strong>AIモデルの高度化</strong>:
                    より深い洞察と個別化された支援を提供するため、AIモデルの継続的な改良を行っています。特に、ユーザーの思考パターンの理解と適応的な支援の精度向上に注力しています。
                  </li>
                  <li>
                    <strong>業界別特化モデル</strong>:
                    特定の業界（ヘルスケア、教育、フィンテックなど）に特化した知識ベースとガイダンスを開発し、より専門的な支援を目指しています。
                  </li>
                  <li>
                    <strong>コラボレーション機能</strong>:
                    チームでの利用を想定した共同思考・共創機能の開発を進めています。複数のユーザーが同じプロジェクトに取り組む際の思考の共有と統合を支援します。
                  </li>
                </ul>
                <p className="text-gray-500 dark:text-gray-400 mt-4">
                  これらの取り組みを通じて、TANREN
                  3D思考メソッドはより多くの事業創造者の思考と行動を支援し、イノベーションの促進に貢献することを目指しています。
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
