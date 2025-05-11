#!/bin/zsh

# 基礎パス (必要に応じて変更してください)
BASE_PATH="/Users/jrpj2010/vibe-coding/[超独学]最新スキル図鑑　ーAI×○○で最短・最速で成果を得る超効率勉強法ー"

# 第0章
CHAP0_DIR="${BASE_PATH}/第0章 はじめに・・・"
mkdir -p "${CHAP0_DIR}"
touch "${CHAP0_DIR}/1. はじめに・・・.md"

# 第1章
CHAP1_DIR="${BASE_PATH}/第1章 AI時代の独学法とは？--まずは「考え方」をアップデートしよう・リスキリングが必要とされる3つの背景とは？"
mkdir -p "${CHAP1_DIR}"
touch "${CHAP1_DIR}/1. 「AIと話せる人」が学び続ける時代へ.md"
touch "${CHAP1_DIR}/2. 独学に失敗する人の共通点と、本書の使い方.md"
touch "${CHAP1_DIR}/3. TANREN3Dメソッドとは！？--(3D概念図)を学ぶ.md"

# 第2章
CHAP2_DIR="${BASE_PATH}/第2章 思考力を鍛える(X軸) 3つの技法--AIで「考え方の型」を身につける"
mkdir -p "${CHAP2_DIR}"
touch "${CHAP2_DIR}/1. (超抽象化)どんな話題も「上位概念」に置き換えて整理する方法.md"
touch "${CHAP2_DIR}/2. (超具体化)AIに「どう行動すべきか」を聞き出すコツ.md"
touch "${CHAP2_DIR}/3. (超構造化)考えをロジカルにまとめるテンプレート活用術.md"
touch "${CHAP2_DIR}/4. AIに添削してもらう「思考トレーニング」の実践例.md"

# 第3章
CHAP3_DIR="${BASE_PATH}/第3章 AIが喜ぶ(Y軸)「正しい時系列での会話のしかた」を学ぶ--プロンプト入力の基本スキル"
mkdir -p "${CHAP3_DIR}"
touch "${CHAP3_DIR}/1. (過去) 悪いプロンプト vs 良いプロンプト--NG例から学ぶ.md"
touch "${CHAP3_DIR}/2. (現代) AIとの会話を改善する3つのチェックポイント(構造・目的・出力).md"
touch "${CHAP3_DIR}/3. (未来) ChatGPT_Gemini_Claude など主要AIの違いと使い分け方.md"

# 第4章
CHAP4_DIR="${BASE_PATH}/第4章 情報収集・整理に強くなる(Z軸)レベルの考え方定義する--AIエージェント活用して知識を一元管理する"
mkdir -p "${CHAP4_DIR}"
touch "${CHAP4_DIR}/1. (Lv0.5 入門編)GPTsをベースにした、一撃で目的に合った回答を得る.md"
touch "${CHAP4_DIR}/2. (Lv1 初級編)Deep Research -- ネット情報を見極めるAI質問法(ファクトチェックのすすめ).md"
touch "${CHAP4_DIR}/3. (Lv2 中級編)自律型AIエージェント -- メモ・議事録・ニュースを要点整理しレポート化.md"
touch "${CHAP4_DIR}/4. (Lv3 上級編)完全オーケストレートモデル -- あなたの才能を解き放つ「知性の指揮者」と「第二の脳」.md"

# 第5章
CHAP5_DIR="${BASE_PATH}/第5章 (TANREN 3D メソッドを単体で利用して攻略) 企画・文章・資料づくりにも強くなる--AIを使ったアウトプット習慣 アイデア出しを拡げるブレインストーミングの質問例"
mkdir -p "${CHAP5_DIR}"
touch "${CHAP5_DIR}/1. (X軸で攻略) 企画書を「たたき台」から完成までAIと共創する手順.md"
touch "${CHAP5_DIR}/2. (Y軸で攻略) ビジネスメールや報告書を洗練させる添削プロンプト.md"
touch "${CHAP5_DIR}/3. (Z軸 で攻略) 説得力ある資料に仕上げる次世代プレゼンテーション(SVG_HTML).md"

# 第6章
CHAP6_DIR="${BASE_PATH}/第6章 (TANREN 3D メソッドを応用して攻略) 仕事に活かすAI×独学の実践シナリオ集"
mkdir -p "${CHAP6_DIR}"
touch "${CHAP6_DIR}/1. (超具体化・現代・初級)(営業)ヒアリング内容から即・提案書を作成する方法(AIエージェントのリアルタイムアシスト).md"
touch "${CHAP6_DIR}/2. (超抽象化・過去・初級)(マーケティング)競合調査と差別化分析をAIに任せる(変数を極める).md"
touch "${CHAP6_DIR}/3. (超構造化・未来・入門) (人材育成)部下への1on1フィードバック文をAIでブラッシュアップ(ペルソナ・シナリオ).md"
touch "${CHAP6_DIR}/4. (超具体化・未来・上級) (副業準備)スキル棚卸しとキャリア戦略をAIと考える(パラレルキャリア_シン・ジェネラリスト).md"

# 第7章
CHAP7_DIR="${BASE_PATH}/第7章 毎日の学びを「習慣化」する--継続する人の仕組みづくり 学習テーマを「1日5分」単位に細分化する方法"
mkdir -p "${CHAP7_DIR}"
touch "${CHAP7_DIR}/1. (for Input)日報・思考メモをAIにフィードバックさせる習慣術(メディアライブラリ機能).md"
touch "${CHAP7_DIR}/2. (for Output)挫折しないための「週1回のふり返り対話」テンプレート(AIフィードバック機能).md"
touch "${CHAP7_DIR}/3. (次世代 Ver9)あなたの行動を応援する「AI相棒」の育て方(AI著名人機能).md"

# 第8章
CHAP8_DIR="${BASE_PATH}/第8章 おわりに・・・"
mkdir -p "${CHAP8_DIR}"
touch "${CHAP8_DIR}/1. おわりに・・・.md"

echo "ディレクトリ構造とMarkdownファイルの作成が試行されました。" 