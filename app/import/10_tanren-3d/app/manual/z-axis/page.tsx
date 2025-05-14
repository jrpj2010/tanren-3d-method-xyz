import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ZAxisPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-4">
            <Brain className="h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Z軸: オンボーディングレベル定義
            </h1>
          </div>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            レベルを定義して、初期伴走をAIが全自動支援を提供する成長支援システム
          </p>
        </div>
      </div>

      <div className="grid gap-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Z軸の概要</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                TANREN 3D思考メソッドにおけるZ軸は、ユーザーの経験や知識レベルに応じて適切なサポートを提供するための次元です。「初級・中級・上級」といったオンボーディングレベルを明確に定義し、各レベルに合わせた伴走支援を全自動で展開するシステムです。
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                AIは、ユーザーとの対話や行動パターンからユーザーのレベルを自動判定し、それぞれの成長段階に最適化された情報提供、ガイダンス、課題解決支援を行います。「問題のレベルが高いところをどうやってビルドしていけばいいか」といった具体的な道筋を示すことで、ユーザーが着実にスキルアップし、より複雑な課題にも取り組めるよう導きます。
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Z軸アプローチの効果</h3>
                <ul className="space-y-1 list-disc pl-5 text-gray-500 dark:text-gray-400">
                  <li>個々のレベルに合わせたパーソナライズド学習</li>
                  <li>挫折リスクの低減と継続的な成長の促進</li>
                  <li>複雑な課題への段階的なアプローチ支援</li>
                  <li>自動適応型のサポートシステム構築</li>
                  <li>ユーザーの自己効力感の向上</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=300&width=500&query=メタ軸図"
                alt="Z軸（オンボーディングレベル）の概念図"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">レベル定義機能: 成長段階の可視化</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?key=level_definition"
                alt="レベル定義機能"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                効果的な成長支援のためには、まず「現在地」と「目的地」を明確にする必要があります。Z軸の第一の機能である「レベル定義機能」では、事業開発やプロジェクト遂行における熟練度を明確な基準で定義し、各レベルに応じた知識・スキル・課題への対応能力を可視化します。
              </p>
              <h3 className="font-semibold mb-2">AIによるレベル定義支援</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">レベル診断と自動判定</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーとの対話や取り組み状況の分析を通じて、現在のスキルレベルや知識レベルを自動的に診断します。診断結果は細かな評価ポイントとともに提示され、現在の強みと改善ポイントが明確になります。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">3段階レベル基準の明確化</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      初級・中級・上級それぞれの明確な定義と、各レベルで習得すべき知識・スキル、典型的な課題、ケーススタディなどを体系的に整理します。「次のレベルに上がるには何ができるようになればよいか」が明確になります。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">学習パスのデザイン</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      現在のレベルから次のレベルへ効率的に成長するための最適な学習パスを設計します。段階的な小目標、推奨教材・演習、重点的に取り組むべき領域などを、個人の状況に合わせて提案します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">成長の見える化</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      成長過程を可視化し、進捗を定量的・定性的に表現します。達成したマイルストーン、習得したスキル、解決した課題などを記録し、成長の軌跡を振り返ることで自己効力感を高めます。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">初期伴走全自動支援: 成長を加速する伴走者</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                レベルが定義されたら、次は実際の成長をサポートするフェーズです。Z軸の第二の機能である「初期伴走全自動支援」では、AIが24時間365日稼働する成長パートナーとして、ユーザーの取り組みを継続的に支援します。各レベルで直面しやすい課題や障壁を事前に予測し、適切なタイミングで最適な支援を提供します。
              </p>
              <h3 className="font-semibold mb-2">AIによる初期伴走支援</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">常時アクセス可能なAIメンター</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      AIが24時間365日いつでも質問や相談に応じられるメンターとして機能します。特定の課題や疑問に対して、ユーザーのレベルに合わせた説明や解決策を提供するだけでなく、思考プロセスも共有することで学びを深めます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">プロアクティブなアラートとリマインダー</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーのアクションを分析し、見落としがちなリスクや重要なタイミングを自動検知して通知します。「この段階ではこの点に注意すべき」「次のステップに進む前にこの確認が必要」といった先回りの助言を提供します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">適応型フィードバックシステム</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーの取り組みや成果物に対して、レベルに応じたフィードバックを提供します。初級者には基本的な改善点と具体的な修正例を、中級者には複数の選択肢と各アプローチの利点・欠点を、上級者には創造的な拡張可能性や業界最先端の事例との比較などを提示します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">マイクロラーニングの自動提供</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      取り組み中のタスクや直面している課題に関連する、短時間で消化できるマイクロラーニングコンテンツを適切なタイミングで提供します。「いま必要な知識」を小さな単位で効率的に学習できます。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?key=ai_mentor"
                alt="初期伴走全自動支援"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">レベル別課題解決支援: 段階的な成長促進</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?key=level_support"
                alt="レベル別課題解決支援"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Z軸の第三の機能である「レベル別課題解決支援」では、各成長段階で直面する典型的な課題に対して、そのレベルに最適化された解決アプローチを提供します。「問題のレベルが高いところをどうやってビルドしていけばいいか」という課題に対して、現在の能力からスタートして段階的に取り組める具体的な手順を示します。
              </p>
              <h3 className="font-semibold mb-2">AIによるレベル別課題解決支援</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">初級者向け：スキャフォールディング</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      「足場かけ」と呼ばれる支援方法で、初級者が自力では難しい課題に取り組めるよう、一時的な支援構造を提供します。手順の詳細なガイド、テンプレートの提供、典型例の解説などを通じて、「できた」体験を積み重ね、徐々に自立的な問題解決へと導きます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">中級者向け：コーチングアプローチ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ある程度の基礎力がある中級者には、直接的な解答よりも思考を引き出す質問を中心としたコーチングアプローチを採用。「この状況をどう分析しますか？」「他にどのような選択肢が考えられますか？」といった問いかけを通じて、自らの力で解決策を見つけ出す力を育みます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">上級者向け：ブレインストーミングパートナー</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      既に高い問題解決能力を持つ上級者には、新たな視点や創造的なアイデアを提供するブレインストーミングパートナーとして機能。異分野からのアナロジー、最新研究の応用可能性、複数領域の知見の統合など、思考の幅と深さを広げる支援を行います。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">課題のモジュール分解</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      複雑で高度な課題を、より小さく管理可能なモジュールに分解します。各モジュールは現在のレベルから少し挑戦的な難易度に設定され、一つずつ達成していくことで、全体として高レベルの課題を解決できるよう導きます。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">適応型コンテンツ配信: パーソナライズされた学習体験</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Z軸の第四の機能である「適応型コンテンツ配信」では、ユーザーの現在のレベル、学習の進捗状況、興味関心、学習スタイルなどを総合的に分析し、一人ひとりに最適化された学習コンテンツを自動的に提供します。情報過多や情報不足を防ぎ、常に「ちょうど良い」挑戦レベルの学習体験を実現します。
              </p>
              <h3 className="font-semibold mb-2">AIによる適応型コンテンツ配信</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">動的難易度調整</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーの理解度や進捗に応じて、コンテンツの難易度を動的に調整します。理解が速い領域ではより高度な内容にスキップし、苦手な領域ではより基礎的な補足情報を提供するなど、学習の効率性と効果を最大化します。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">マルチモーダル学習支援</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーの学習スタイルや状況に応じて、テキスト、画像、図表、動画、インタラクティブな演習など、様々な形式のコンテンツを提供します。同じ内容でも、複数の表現方法を通じて理解を深めることができます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">コンテキスト認識型情報提供</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ユーザーが現在取り組んでいるタスクや直面している課題の文脈を理解し、その状況に直接関連する情報だけを優先的に提供します。情報過多による認知負荷を減らし、学習の焦点を明確に保ちます。
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">スパイラル学習設計</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      重要なコンセプトや知識を、時間の経過とともに少しずつ深く、広く学んでいく「スパイラル型」の学習設計を実現します。初回は基本的な理解を目指し、繰り返し触れるたびに新しい視点や応用を加えることで、立体的な理解を構築します。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?key=adaptive_content"
                alt="適応型コンテンツ配信"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Z軸の実践事例</h2>
          <Card>
            <CardHeader>
              <CardTitle>事例: 初めてのAIプロダクト開発</CardTitle>
              <CardDescription>Z軸アプローチによるオンボーディングレベル別支援の活用例</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">初期状況</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      「AIを活用した新規プロダクトを開発したいが、チームはAI技術の経験が浅く、どこから手をつけて良いか明確でない」
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AIによる問いかけ</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      「チームの現在のAIに関する知識レベルを教えてください。また、どのような課題や懸念がありますか？」
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">レベル定義と診断</h3>
                  <h4 className="font-medium text-sm mb-1">チームの診断結果</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <li>AI基礎知識: 初級（APIは使えるが仕組みや限界の理解が浅い）</li>
                    <li>プロダクト設計: 中級（一般的なプロダクト開発経験はあるがAI特有の考慮点が不明）</li>
                    <li>プロンプトエンジニアリング: 初級（基本的な使用経験はあるが体系的理解はない）</li>
                    <li>データ管理: 中級（データベース設計経験はあるがAI学習データの扱いに不慣れ）</li>
                  </ul>
                  
                  <h4 className="font-medium text-sm mb-1">各レベルの定義</h4>
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="font-semibold">初級レベル:</p>
                      <ul className="list-disc pl-4 text-gray-500 dark:text-gray-400">
                        <li>API呼び出しでAIを利用できる</li>
                        <li>基本的なプロンプト作成ができる</li>
                        <li>AIの主要概念を理解している</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold">中級レベル:</p>
                      <ul className="list-disc pl-4 text-gray-500 dark:text-gray-400">
                        <li>AIの強みと限界を理解している</li>
                        <li>複雑なプロンプト設計ができる</li>
                        <li>AIモデルの評価と調整ができる</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold">上級レベル:</p>
                      <ul className="list-disc pl-4 text-gray-500 dark:text-gray-400">
                        <li>AIシステムのアーキテクチャ設計</li>
                        <li>大規模データパイプラインの構築</li>
                        <li>複雑なAIワークフローの最適化</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">初期伴走全自動支援</h3>
                  <h4 className="font-medium text-sm mb-1">プロアクティブなナビゲーション</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    AIは、診断結果に基づいて初級から中級レベルへのステップアップを支援する伴走計画を自動生成し、以下の自動サポートを提供しました：
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <li>AI基礎概念の日次マイクロラーニング配信（1回10分、12日間シリーズ）</li>
                    <li>チームが作成したドキュメントの自動レビューと改善提案</li>
                    <li>典型的な初心者の落とし穴に関するアラート（例: トークン制限、バイアス問題、ハルシネーション）</li>
                    <li>類似プロジェクト事例からの学びと警告ポイントの共有</li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">レベル別課題解決支援</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">初級レベルの課題：適切なAIモデル選定</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        AIは詳細な比較表と選定フローチャートを提供し、各選択肢のメリット・デメリットを初心者でも理解しやすい言葉で説明。さらに、モデル選定の練習問題を提示し、実践的に学べるようサポートしました。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">中級レベルの課題：プロンプトエンジニアリング最適化</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        AIはチームが作成したプロンプトに対して、問いかけ形式のフィードバックを提供。「このプロンプトのどの部分が曖昧さを生んでいると思いますか？」「どのようにコンテキスト情報を追加できるでしょうか？」など、自ら考えて改善する力を育てる質問を投げかけました。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">高度な課題のモジュール分解</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        「AIシステムのパフォーマンス最適化」という上級レベルの課題を、「レスポンス時間の測定」「ボトルネックの特定」「キャッシュ戦略の実装」など、中級チームでも取り組める小さなタスクに分解し、段階的に解決できるロードマップを提供しました。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">適応型コンテンツ配信</h3>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      チームの学習進捗と直面している課題に応じて、コンテンツの難易度と形式が自動調整されました：
                    </p>
                    <ul className="list-disc pl-5 text-sm text-gray-500 dark:text-gray-400">
                      <li>AIアーキテクチャに関する情報は、最初はインフォグラフィック中心で提供し、理解が進むにつれて技術文書へと徐々に移行</li>
                      <li>プロンプトエンジニアリングでつまずいていることを検知し、ハンズオン形式のガイド資料を追加提供</li>
                      <li>データ管理チームの学習速度が速いことを認識し、上級レベルの内容を早期に提供</li>
                      <li>チーム全体の「モーニングコーヒーラーニング」習慣を検知し、朝一の10分で学べるマイクロコンテンツを作成</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">結果</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Z軸アプローチによって、チームは8週間で初級から中級レベルへと効果的にステップアップし、当初予定より4週間早くMVPを完成させることができました。特に、レベルに応じた支援により、AIに対する不安や抵抗感が減少し、チーム全体の自信と意欲が向上。結果として、高品質なAI機能を備えた革新的なプロダクトの開発に成功しました。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Z軸活用のコツ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>自己評価と客観評価を併用する</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  自分自身のレベルを把握する際は、自己評価と客観的な基準（例：具体的なタスクの達成状況、外部評価など）を組み合わせましょう。自己評価だけでは「ダニング＝クルーガー効果」により熟練度を誤認する可能性があります。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>「ちょうど良い難しさ」を意識する</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  効果的な学習は「ちょうど良い難しさ」（適度な挑戦レベル）で起こります。現在のレベルからやや難しいが、サポートがあれば達成可能なタスクに取り組むことで、モチベーションを維持しながら成長できます。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>マイルストーンを細かく設定する</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  大きな成長目標を、達成可能な小さなマイルストーンに分解しましょう。小さな成功体験を積み重ねることで、自己効力感が高まり、持続的な成長が促進されます。各マイルストーン達成時には自分を褒めることも重要です。
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>多様な学習形態を取り入れる</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">
                  読書、実践、教え合い、振り返りなど、多様な学習形態を取り入れることで、多角的な理解が深まります。特に「学んだことを誰かに教える」という行為は、知識の定着に非常に効果的です。AIに説明してみるのも良い方法です。
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
        </div>
      </div>
    </div>
  )
}