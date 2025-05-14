import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function YAxisPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-4">
            <Clock className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Y軸: 過去・現在・未来のストーリーテリング
            </h1>
          </div>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            過去のファクトチェックから、現代情報をディープリサーチし、未来に繋げるRAG文章のストーリー生成
          </p>
        </div>
      </div>

      <div className="grid gap-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Y軸の概要</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                TANREN 3D思考メソッドにおけるY軸は、「過去・現在・未来」という時間の流れに沿って思考を展開し、事業の文脈と発展可能性を捉えるための次元です。過去のファクトチェックに基づく基盤の上に、現代の情報をディープリサーチし、それらを未来へと繋げるRAG（Retrieval Augmented Generation）文章を生成します。
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                AIは、この時間軸に沿った情報収集と分析を強力に支援し、ユーザーが見落としがちな歴史的な文脈や最新のトレンド、そして未来の可能性を統合的に把握できるよう導きます。特に「昔はこれができなかったが、今はここまでできる。そして未来はこの進化の波形で、こういうことまで可能になる」といった物語を自動生成することで、ユーザーの自己肯定感と事業への情熱を高めます。
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Y軸アプローチの効果</h3>
                <ul className="space-y-1 list-disc pl-5 text-gray-500 dark:text-gray-400">
                  <li>正確な歴史認識に基づく堅固な基盤づくり</li>
                  <li>現状の徹底的なリサーチによる精度の高い状況把握</li>
                  <li>説得力ある将来予測と戦略立案</li>
                  <li>感情に訴えかけるストーリーテリングによるモチベーション向上</li>
                  <li>RAG技術を活用した高品質な文書生成</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=300&width=500&query=時間軸図"
                alt="Y軸（時間軸）の概念図"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">過去のファクトチェック: 正確な歴史認識</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?key=past_check"
                alt="過去のファクトチェック"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                過去の正確な把握は、将来への確かな一歩を踏み出すための重要な基盤です。Y軸の始点となる「過去のファクトチェック」では、事業領域や課題に関連する歴史的な事実、先行事例、過去の成功・失敗パターンなどを客観的に検証し、信頼性の高い情報基盤を構築します。
              </p>
              <h3 className="font-semibold mb-2">AIによる過去のファクトチェック支援</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">専門的・学術的情報の検証</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      関連分野の学術論文、専門書、信頼性の高い統計データなどを調査し、事実関係を正確に把握。一次情報と二次情報を区別し、情報の信頼性を評価します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">歴史的文脈の整理</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      事業領域や技術の歴史的発展過程を時系列で整理し、重要な転換点やブレイクスルーを特定。現在の状況がどのような歴史的経緯で形成されてきたかを明確にします。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">先行事例の体系的分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      類似の取り組みや先行事例を収集し、成功要因と失敗要因を分析。どのような条件下でどのような結果が得られたのかを整理し、教訓を抽出します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">神話と現実の区別</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      業界で広く信じられている「通説」や「常識」が実際には証拠に基づいていない場合があります。AIはこれらの「神話」を特定し、実証的な事実と区別して提示します。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">現在のディープリサーチ: 最新状況の徹底分析</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                現在の状況を正確かつ深く理解することは、効果的な戦略立案の鍵です。Y軸の中間点となる「現在のディープリサーチ」では、最新の市場動向、競合状況、技術トレンド、顧客ニーズなどを多角的かつ徹底的に調査し、現状の全体像を綿密に把握します。
              </p>
              <h3 className="font-semibold mb-2">AIによる現在のディープリサーチ支援</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">市場環境の立体的分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      市場規模、成長率、セグメンテーション、主要プレーヤー、収益構造など、市場の様々な側面を網羅的に調査。これらの情報を統合して市場の全体像を構築します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">競合分析マトリクス作成</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      直接的・間接的な競合企業の戦略、強み、弱み、ポジショニング、差別化要因などを詳細に分析し、多次元の比較マトリクスを作成して競争環境を可視化します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">技術トレンドの追跡</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      業界に影響を与える最新技術や新興技術の発展状況、採用率、成熟度などを調査。技術のS字カーブ上での現在位置を特定し、今後の発展可能性を評価します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">消費者インサイト収集</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      顧客レビュー、SNS上の言及、フォーラム投稿などの非構造化データを分析し、表面化していないニーズや不満点、隠れたトレンドを発見します。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?key=present_research"
                alt="現在のディープリサーチ"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">未来へのRAG文章生成: 成功ストーリーの構築</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?key=future_story"
                alt="未来へのストーリーテリング"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                過去と現在の分析に基づき、説得力ある未来像を描くことで、事業の方向性と目的意識を明確にします。Y軸の終点となる「未来へのRAG文章生成」では、Retrieval Augmented Generation技術を活用して、過去と現在の情報を基盤としつつ、論理的かつ感情に訴える成功ストーリーを構築します。
              </p>
              <h3 className="font-semibold mb-2">AIによる未来のストーリーテリング支援</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">トレンド予測と未来シナリオ構築</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      過去と現在のデータに基づく外挿や、S字カーブ分析を通じて、将来のトレンドを予測。複数の可能性を考慮した未来シナリオを構築し、各シナリオの確率や影響度を評価します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">RAG（検索拡張生成）文書作成</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      過去のファクトチェックと現在のリサーチから取得した情報を基に、高品質で信頼性の高い文書を生成。事実に基づきながらも、魅力的で説得力のあるストーリーテリングを実現します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">感情的共鳴を生み出す物語構築</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      「昔はこれができなかったが、今はここまでできる。そして未来はこういうことが可能になる」という発展の物語を構築し、ユーザーの情熱や自己肯定感を高めます。論理だけでなく感情にも訴えかけるストーリーを生成します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">行動指針と戦略ロードマップ提示</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ストーリーを単なる夢物語で終わらせないよう、そのビジョンを実現するための具体的なステップ、マイルストーン、リソース配分などを提案。現実的かつ段階的なロードマップを提示します。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Y軸の実践事例</h2>
          <Card>
            <CardHeader>
              <CardTitle>事例: サブスクリプションサービスの立ち上げ</CardTitle>
              <CardDescription>Y軸アプローチによる時間的視座の活用例</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">初期状況</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      「業界初のサブスクリプションモデルを導入したいが、市場の受け入れに不安がある」
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AIによる問いかけ</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      「この業界でのサブスクリプションモデルの歴史的な試みはありましたか？現在の市場環境は何が変わったのでしょうか？」
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">過去のファクトチェック</h3>
                  <ol className="space-y-2 list-decimal pl-5 text-gray-500 dark:text-gray-400">
                    <li>
                      <strong>先行事例の検証</strong>:
                      「過去10年間に3社が類似のモデルを試みており、全て失敗。主な原因は支払いインフラの未整備とユーザーの習慣形成の難しさ」
                    </li>
                    <li>
                      <strong>失敗パターンの分析</strong>:
                      「最も共通した失敗要因は、価格設定の高さと価値提案の不明確さ。また、解約障壁の高さがユーザーの初期抵抗感を高めていた」
                    </li>
                    <li>
                      <strong>消費者心理の変遷</strong>:
                      「過去のサービスはオーナーシップを重視する時代背景の中で展開されており、所有から利用への価値観シフトはまだ萌芽段階だった」
                    </li>
                  </ol>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">現在のディープリサーチ</h3>
                  <ol className="space-y-2 list-decimal pl-5 text-gray-500 dark:text-gray-400">
                    <li>
                      <strong>市場環境の変化</strong>:
                      「デジタル決済の普及率が過去5年で300%増加。若年層の87%が何らかのサブスクリプションサービスを利用中」
                    </li>
                    <li>
                      <strong>競合分析</strong>:
                      「隣接業界では既に5社がサブスクリプションモデルで成功。年間成長率は平均32%」
                    </li>
                    <li>
                      <strong>消費者インサイト</strong>:
                      「SNS分析から、初期費用の高さへの不満と、柔軟な利用形態への強い需要が判明。特に18-34歳層で顕著」
                    </li>
                    <li>
                      <strong>技術環境</strong>:
                      「クラウドベースの課金システムコストが5年前の1/10に低下。導入障壁が大幅に減少」
                    </li>
                  </ol>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">未来へのRAG文章生成</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-4">
                    「かつて我々の業界では、高額な初期投資がユーザー獲得の大きな障壁となっていました。過去10年間でサブスクリプションモデルを試みた先駆者たちは、時代の一歩先を行きすぎていたのです。しかし今、デジタル決済の普及と消費者の価値観シフトという二つの波が交わり、かつてない機会の窓が開いています。
                    
                    今日の市場では、すでに87%の若年層がサブスクリプションという概念に慣れ親しんでおり、隣接業界では年間32%もの成長を遂げています。テクノロジーのコスト低下は、かつては到底実現できなかったビジネスモデルを可能にしました。
                    
                    3年後には、我々のサービスは業界標準となり、後発企業は我々の作ったレールの上を走ることになるでしょう。5年後には、サブスクリプションモデルを導入していない企業は市場の主流から取り残され、10年後には初期費用モデルは博物館で見る存在になっているかもしれません。
                    
                    先駆者たちの失敗から学び、現在の市場環境を最大限に活かすことで、我々は単なるビジネスモデルの変更ではなく、業界そのものの変革を主導できるのです。」
                  </p>

                  <h4 className="font-semibold">戦略的ロードマップ</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                    <li>第1フェーズ (6ヶ月): 既存顧客向けオプションとしてのサブスクリプションプラン導入</li>
                    <li>第2フェーズ (1年): 初期費用ゼロ&サブスクリプション専用の新規ユーザー向けプラン展開</li>
                    <li>第3フェーズ (2年): プラットフォームビジネスへの拡張と業界エコシステム構築</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">結果</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Y軸アプローチによって、「なぜ過去の試みは失敗したのか」「現在、何が変わったのか」「将来、どのような展開が予測されるか」という時間軸に沿った見通しが明確になりました。ストーリーテリングによって経営陣の共感と支持を獲得し、段階的な移行計画によって実現可能性を高めることができました。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Y軸活用のコツ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>情報源の質と多様性を重視</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  過去のファクトチェックと現在のディープリサーチでは、単一の情報源に依存せず、学術論文、業界レポート、専門家の見解、顧客フィードバックなど、多様かつ信頼性の高い情報源からバランスよく情報を収集しましょう。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>定量データと定性データを併用</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  数値やグラフといった定量データで客観的な傾向を把握しつつ、インタビューやストーリーなどの定性データで文脈や感情的側面を理解する。両方の視点を統合することで、より立体的な時間軸の理解が可能になります。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>複数の時間スケールで思考</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  短期（数か月〜1年）、中期（1〜3年）、長期（3年以上）など、複数の時間スケールで未来を考えましょう。それぞれの時間軸で異なる変化の波が生じるため、多層的な未来シナリオを構築することが重要です。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>ストーリーに感情的要素を織り込む</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  未来のストーリーテリングでは、論理的な予測だけでなく、「希望」「成長」「変革」といった感情的な要素を織り込みましょう。人間は理性より感情に動かされることが多く、心に響くストーリーが行動変容を促します。
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
          <Link href="/manual/z-axis">
            <Button>
              Z軸の詳細を見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}