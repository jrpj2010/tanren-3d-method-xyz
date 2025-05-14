# [FutureStage]構造化.yamlついて

<aside>
💡

確認事項

</aside>

バベルで可視化するには、内部エンジン[ゾルトラーク]

LP:[https://zoltraak.v0.build/](https://zoltraak.v0.build/) 

に対して

![image.png](%5BFutureStage%5D%E6%A7%8B%E9%80%A0%E5%8C%96%20yaml%E3%81%A4%E3%81%84%E3%81%A6%2012131bbd522c804d809ac0dbd38a178d/image.png)

↓

基本となる[要件定義の基本構造]を理解させる必要があります。

↓

![image.png](%5BFutureStage%5D%E6%A7%8B%E9%80%A0%E5%8C%96%20yaml%E3%81%A4%E3%81%84%E3%81%A6%2012131bbd522c804d809ac0dbd38a178d/image%201.png)

※例）バベルの要件定義を書き出すエンジン（ゾルトラーク）によって書き出されたファイル群

↓　よって

**[FutureStageのソースファイルにおけるディレクトリ構造]を参照させる必要があります。**

いったん、これをテキストファイルで取り込みたいので

恐れ入りますが、当該部署の方に下記のような**[.yaml 形式]**でテキスト文章を頂けるように

依頼は可能でしょうか？

[**FutureStage概要紹介資料 1.pdf**](https://app.box.com/folder/288726805207)

[https://app.box.com/file/1670240572401?s=idlak2yajjtioraux2voo327rc35ldce](https://app.box.com/file/1670240572401?s=idlak2yajjtioraux2voo327rc35ldce)

↓　とりあえずAIで強引に発想させてみます。

まずはコンテンツ一覧図を作りたい・・・

FutureStageの全容ページでトライ

![Google Chrome 2024-10-16 11.12.31.png](%5BFutureStage%5D%E6%A7%8B%E9%80%A0%E5%8C%96%20yaml%E3%81%A4%E3%81%84%E3%81%A6%2012131bbd522c804d809ac0dbd38a178d/Google_Chrome_2024-10-16_11.12.31.png)

↓

```markdown
[Gemini 1.5 pro]
prompt:
構造化された.yaml形式で書き出してください
コメントアウトで、日本語で説明書きを添えてください
```

↓生成

```markdown
```yaml
# パートナーソリューション

# FutureStageと連携する多様なソリューションが貴社の業務課題を解決します
FutureStage連携ソリューション:
  - 経営管理ソリューション
  - IoTソリューション
  - 生産スケジューラーソリューション
  - 品質向上ソリューション
  - 在庫最適化ソリューション
  - 倉庫改革ソリューション
  - スマートデバイス連携ソリューション
  - 企業間連携ソリューション
  - 働き方改革ソリューション
  - IT基盤構築ソリューション

# FutureStageと連携するソリューションの例
経営管理ソリューション:
  - IoTプラットフォーム(Lumada)
  - 簡易MESソリューション（実績判定）
  - DXダッシュボード（MotionBoard）

IoTソリューション:
  - 生産スケジューラー(SynPLA)
  - 生産スケジューラー(JoyScheduler)
  - 生産スケジューラー(Aprova)
  - 生産計画システム（A-PLAN）

生産スケジューラーソリューション:
  - 部品表管理システム(PowerBOM)
  - PLMシステム（Aras Innovator）
  - 組立ナビゲーター
  - 3D訓練

品質向上ソリューション:
  - 在庫可視化(PSI-Visualiser)
  - 需要予測システム(ForeCastPRO)
  - パーツ在庫最適化(SPM)

在庫最適化ソリューション:
  - 組立・加工業向けコンサル（H-SPEED）
  - 現場カイゼンコンサルティング（平山）
  - ロジスティクスソリューション（LSS）

倉庫改革ソリューション:
  # なし

スマートデバイス連携ソリューション:
  # なし

企業間連携ソリューション:
  - 業務アプリクラウドサービス（Kintone）
  - 帳票電子化ソリューション（i-reporter）
  - フィールド作業支援システム

働き方改革ソリューション:
  - BIソリューション（資料Web）
  - 会計システム(SuperStream)
  - 会計システム(等奉行ERP)
  - ネット構築サービス
  - サイバーセキュリティ対策
  - クラウドサービス
  - 旅行顧客システム（Traveler's WAN）
  - 定型業務自動化支援サービス（RPA）
  - HIPLUS業務管理システム
  - EDIサービス TWX21
  - まいくーFAX

# その他
Human・IT

# Copyright
© Hitachi Systems, Ltd. 2023. All rights reserved.

```
```

具体的に、課題別導入パターンを.yaml化してみる

![Google Chrome 2024-10-16 11.17.55.png](%5BFutureStage%5D%E6%A7%8B%E9%80%A0%E5%8C%96%20yaml%E3%81%A4%E3%81%84%E3%81%A6%2012131bbd522c804d809ac0dbd38a178d/Google_Chrome_2024-10-16_11.17.55.png)

```markdown
[Gemini 1.5 pro]
prompt:
添付のシステム開発を想定してください
future Stageというスクラッチ型パッケージ商品です。
フロントエンドと API のセクションを持つ .yaml ファイルを生成してください。
各セクション内には、ページとレイアウトの階層構造でファイル情報を記述してください。
ページにはファイル名 (page.tsx) とその役割を日本語で記述し、レイアウトにはファイル名 (layout.tsx) とその役割を日本語で記述してください。
各セクションとページには、固有の ID を割り当ててください。
```

```markdown
frontend:
  src:
    - app:
      - (auth):
        - login:
          - page.tsx: "ログインページのコンテンツを表示するファイル"
        - register:
          - page.tsx: "ユーザー登録ページのコンテンツを表示するファイル"
      - (master-data):
        - item:
          - layout.tsx: "品目マスタ関連ページの共通レイアウト"
          - page.tsx: "品目マスタ一覧ページ"
          - [id]:
            - page.tsx: "特定の品目マスタの詳細ページ"
        - bom:
          - layout.tsx: "部品構成マスタ関連ページの共通レイアウト"
          - page.tsx: "部品構成マスタ一覧ページ"
          - [id]:
            - page.tsx: "特定の部品構成マスタの詳細ページ"
        - process:
          - layout.tsx: "工程手順マスタ関連ページの共通レイアウト"
          - page.tsx: "工程手順マスタ一覧ページ"
          - [id]:
            - page.tsx: "特定の工程手順マスタの詳細ページ"
        - equipment:
          - layout.tsx: "設備ライン能力マスタ関連ページの共通レイアウト"
          - page.tsx: "設備ライン能力マスタ一覧ページ"
          - [id]:
            - page.tsx: "特定の設備ライン能力マスタの詳細ページ"
        - mold:
          - layout.tsx: "金型マスタ関連ページの共通レイアウト"
          - page.tsx: "金型マスタ一覧ページ"
          - [id]:
            - page.tsx: "特定の金型マスタの詳細ページ"
      - (production-plan):
        - mrp:
          - layout.tsx: "MRP関連ページの共通レイアウト"
          - page.tsx: "MRP試算・生産計画変更ページ"
        - base-plan:
          - layout.tsx: "基準生産計画関連ページの共通レイアウト"
          - page.tsx: "基準生産計画作成ページ"
        - order-plan:
          - layout.tsx: "受注生産計画関連ページの共通レイアウト"
          - page.tsx: "受注生産計画作成ページ"
        - fixed-plan:
          - layout.tsx: "MRP確定ページ"
      - (work-instructions):
        - create:
          - layout.tsx: "作業指示書作成関連ページの共通レイアウト"
          - page.tsx: "作業指示書作成ページ"
        - list:
          - layout.tsx: "作業指示書一覧関連ページの共通レイアウト"
          - page.tsx: "作業指示書一覧ページ"
        - [id]:
          - page.tsx: "特定の作業指示書の詳細ページ"
      - (results):
        - input:
          - layout.tsx: "作業実績入力関連ページの共通レイアウト"
          - page.tsx: "作業実績入力ページ"
        - report:
          - layout.tsx: "作業実績レポート関連ページの共通レイアウト"
          - page.tsx: "作業実績レポート表示ページ"
  - api:
    - auth:
      - '[...nextauth]':
        - route.ts: "NextAuthを使った認証ルートを管理するファイル"
    - master-data:
      - item:
        - [id]:
          - route.ts: "品目マスタAPIエンドポイント"
      - bom:
        - [id]:
          - route.ts: "部品構成マスタAPIエンドポイント"
      - process:
        - [id]:
          - route.ts: "工程手順マスタAPIエンドポイント"
      - equipment:
        - [id]:
          - route.ts: "設備ライン能力マスタAPIエンドポイント"
      - mold:
        - [id]:
          - route.ts: "金型マスタAPIエンドポイント"
    - production-plan:
      - mrp:
        - route.ts: "MRP試算・生産計画変更APIエンドポイント"
      - base-plan:
        - route.ts: "基準生産計画APIエンドポイント"
      - order-plan:
        - route.ts: "受注生産計画APIエンドポイント"
      - fixed-plan:
        - route.ts: "MRP確定APIエンドポイント"
    - work-instructions:
      - create:
        - route.ts: "作業指示書作成APIエンドポイント"
      - list:
        - route.ts: "作業指示書一覧APIエンドポイント"
      - [id]:
        - route.ts: "特定の作業指示書APIエンドポイント"
    - results:
      - input:
        - route.ts: "作業実績入力APIエンドポイント"
      - report:
        - route.ts: "作業実績レポートAPIエンドポイント"
```

同様に・・・

![image.png](%5BFutureStage%5D%E6%A7%8B%E9%80%A0%E5%8C%96%20yaml%E3%81%A4%E3%81%84%E3%81%A6%2012131bbd522c804d809ac0dbd38a178d/image%202.png)

```markdown
[Gemini 1.5 pro]
prompt:
添付のシステム開発を想定してください
future Stageというスクラッチ型パッケージ商品です。
フロントエンドと API のセクションを持つ .yaml ファイルを生成してください。
各セクション内には、ページとレイアウトの階層構造でファイル情報を記述してください。
ページにはファイル名 (page.tsx) とその役割を日本語で記述し、レイアウトにはファイル名 (layout.tsx) とその役割を日本語で記述してください。
各セクションとページには、固有の ID を割り当ててください。
```

```markdown
frontend:
  src:
    - app:
      - (auth):
        - login:
          - page.tsx: "ログインページのコンテンツを表示するファイル"
        - register:
          - page.tsx: "ユーザー登録ページのコンテンツを表示するファイル"
      - (product-info):
        - list:
          - layout.tsx: "製品情報一覧ページの共通レイアウト"
          - page.tsx: "製品情報一覧ページ"
        - [id]:
          - layout.tsx: "製品情報詳細ページの共通レイアウト"
          - page.tsx: "製品情報詳細ページ"
          - bom:
            - page.tsx: "製品構成情報ページ"
          - process:
            - page.tsx: "工程・手順情報ページ"
          - line:
            - page.tsx: "設備ライン情報ページ"
          - mold:
            - page.tsx: "金型・治工具情報ページ"
          - drawing:
            - page.tsx: "図面情報ページ"
      - (sales):
        # 販 売 管 理 に 関 連 す る ペ ー ジ を 記 述
      - (production):
        # 生 産 管 理 に 関 連 す る ペ ー ジ を 記 述
      - (procurement):
        # 購 買 管 理 に 関 連 す る ペ ー ジ を 記 述
      - (inventory):
        # 在 庫 管 理 に 関 連 す る ペ ー ジ を 記 述
      - (cost):
        # 原 価 管 理 に 関 連 す る ペ ー ジ を 記 述
  - api:
    - auth:
      - '[...nextauth]':
        - route.ts: "NextAuthを使った認証ルートを管理するファイル"
    - product-info:
      - list:
        - route.ts: "製品情報一覧APIエンドポイント"
      - [id]:
        - route.ts: "製品情報詳細APIエンドポイント"
        - bom:
          - route.ts: "製品構成情報APIエンドポイント"
        - process:
          - route.ts: "工程・手順情報APIエンドポイント"
        - line:
          - route.ts: "設備ライン情報APIエンドポイント"
        - mold:
          - route.ts: "金型・治工具情報APIエンドポイント"
        - drawing:
          - route.ts: "図面情報APIエンドポイント"
    - sales:
      # 販 売 管 理 に 関 連 す る API エ ン ド ポ イ ン ト を 記 述
    - production:
      # 生 産 管 理 に 関 連 す る API エ ン ド ポ イ ン ト を 記 述
    - procurement:
      # 購 買 管 理 に 関 連 す る API エ ン ド ポ イ ン ト を 記 述
    - inventory:
      # 在 庫 管 理 に 関 連 す る API エ ン ド ポ イ ン ト を 記 述
    - cost:
      # 原 価 管 理 に 関 連 す る API エ ン ド ポ イ ン ト を 記 述
```

同様に・・・

![image.png](%5BFutureStage%5D%E6%A7%8B%E9%80%A0%E5%8C%96%20yaml%E3%81%A4%E3%81%84%E3%81%A6%2012131bbd522c804d809ac0dbd38a178d/image%203.png)

```markdown
[Gemini 1.5 pro]
prompt:
添付のシステム開発を想定してください
future Stageというスクラッチ型パッケージ商品です。
フロントエンドと API のセクションを持つ .yaml ファイルを生成してください。
各セクション内には、ページとレイアウトの階層構造でファイル情報を記述してください。
ページにはファイル名 (page.tsx) とその役割を日本語で記述し、レイアウトにはファイル名 (layout.tsx) とその役割を日本語で記述してください。
各セクションとページには、固有の ID を割り当ててください。
```

```markdown
frontend:
  src:
    - app:
      - (auth):
        - login:
          - page.tsx: "ログインページのコンテンツを表示するファイル"
        - register:
          - page.tsx: "ユーザー登録ページのコンテンツを表示するファイル"
      - (production-plan):
        - base-plan:
          - layout.tsx: "基準生産計画関連ページの共通レイアウト"
          - list:
            - page.tsx: "基準生産計画一覧ページ"
          - create:
            - page.tsx: "基準生産計画作成ページ"
          - [id]:
            - page.tsx: "基準生産計画詳細ページ"
            - edit:
              - page.tsx: "基準生産計画編集ページ"
        - demand-forecast:
          - layout.tsx: "需要予測関連ページの共通レイアウト"
          - list:
            - page.tsx: "需要予測一覧ページ"
          - create:
            - page.tsx: "需要予測作成ページ"
          - [id]:
            - page.tsx: "需要予測詳細ページ"
            - edit:
              - page.tsx: "需要予測編集ページ"
        - order-plan:
          - layout.tsx: "受注生産計画関連ページの共通レイアウト"
          - list:
            - page.tsx: "受注生産計画一覧ページ"
          - create:
            - page.tsx: "受注生産計画作成ページ"
          - [id]:
            - page.tsx: "受注生産計画詳細ページ"
            - edit:
              - page.tsx: "受注生産計画編集ページ"
        - inventory-management:
          - layout.tsx: "在庫管理関連ページの共通レイアウト"
          - list:
            - page.tsx: "在庫一覧ページ"
          - [id]:
            - page.tsx: "在庫詳細ページ"
            - edit:
              - page.tsx: "在庫編集ページ"
  - api:
    - auth:
      - '[...nextauth]':
        - route.ts: "NextAuthを使った認証ルートを管理するファイル"
    - production-plan:
      - base-plan:
        - list:
          - route.ts: "基準生産計画一覧APIエンドポイント"
        - create:
          - route.ts: "基準生産計画作成APIエンドポイント"
        - [id]:
          - route.ts: "基準生産計画詳細APIエンドポイント"
          - edit:
            - route.ts: "基準生産計画編集APIエンドポイント"
      - demand-forecast:
        - list:
          - route.ts: "需要予測一覧APIエンドポイント"
        - create:
          - route.ts: "需要予測作成APIエンドポイント"
        - [id]:
          - route.ts: "需要予測詳細APIエンドポイント"
          - edit:
            - route.ts: "需要予測編集APIエンドポイント"
      - order-plan:
        - list:
          - route.ts: "受注生産計画一覧APIエンドポイント"
        - create:
          - route.ts: "受注生産計画作成APIエンドポイント"
        - [id]:
          - route.ts: "受注生産計画詳細APIエンドポイント"
          - edit:
            - route.ts: "受注生産計画編集APIエンドポイント"
      - inventory-management:
        - list:
          - route.ts: "在庫一覧APIエンドポイント"
        - [id]:
          - route.ts: "在庫詳細APIエンドポイント"
          - edit:
            - route.ts: "在庫編集APIエンドポイント"
```

同様に・・・

![image.png](%5BFutureStage%5D%E6%A7%8B%E9%80%A0%E5%8C%96%20yaml%E3%81%A4%E3%81%84%E3%81%A6%2012131bbd522c804d809ac0dbd38a178d/image%204.png)

```markdown
[Gemini 1.5 pro]
prompt:
添付のシステム開発を想定してください
future Stageというスクラッチ型パッケージ商品です。
フロントエンドと API のセクションを持つ .yaml ファイルを生成してください。
各セクション内には、ページとレイアウトの階層構造でファイル情報を記述してください。
ページにはファイル名 (page.tsx) とその役割を日本語で記述し、レイアウトにはファイル名 (layout.tsx) とその役割を日本語で記述してください。
各セクションとページには、固有の ID を割り当ててください。
```

```markdown
frontend:
  src:
    - app:
      - (auth):
        - login:
          - page.tsx: "ログインページのコンテンツを表示するファイル"
        - register:
          - page.tsx: "ユーザー登録ページのコンテンツを表示するファイル"
      - (order-management):
        - order-list:
          - layout.tsx: "受注一覧ページの共通レイアウト"
          - page.tsx: "受注一覧ページ"
        - order-details:
          - layout.tsx: "受注詳細ページの共通レイアウト"
          - page.tsx: "受注詳細ページ"
          - [id]:
            - page.tsx: "特定の受注の詳細ページ"
      - (production-plan):
        - order-based-plan:
          - layout.tsx: "受注ベース生産計画関連ページの共通レイアウト"
          - list:
            - page.tsx: "受注ベース生産計画一覧ページ"
          - create:
            - page.tsx: "受注ベース生産計画作成ページ"
          - [id]:
            - page.tsx: "受注ベース生産計画詳細ページ"
            - edit:
              - page.tsx: "受注ベース生産計画編集ページ"
        - progress-management:
          - layout.tsx: "進捗管理関連ページの共通レイアウト"
          - list:
            - page.tsx: "進捗状況一覧ページ"
          - [id]:
            - page.tsx: "特定の受注の進捗状況ページ"
            - edit:
              - page.tsx: "進捗状況更新ページ"
  - api:
    - auth:
      - '[...nextauth]':
        - route.ts: "NextAuthを使った認証ルートを管理するファイル"
    - order-management:
      - order-list:
        - route.ts: "受注一覧APIエンドポイント"
      - order-details:
        - [id]:
          - route.ts: "特定の受注の詳細APIエンドポイント"
    - production-plan:
      - order-based-plan:
        - list:
          - route.ts: "受注ベース生産計画一覧APIエンドポイント"
        - create:
          - route.ts: "受注ベース生産計画作成APIエンドポイント"
        - [id]:
          - route.ts: "受注ベース生産計画詳細APIエンドポイント"
          - edit:
            - route.ts: "受注ベース生産計画編集APIエンドポイント"
      - progress-management:
        - list:
          - route.ts: "進捗状況一覧APIエンドポイント"
        - [id]:
          - route.ts: "特定の受注の進捗状況APIエンドポイント"
          - edit:
            - route.ts: "進捗状況更新APIエンドポイント"
```

などなど

デモンストーレションする上で、

- 仮想ペルソナ企業における
- なんのニーズに対して
- どういったシステム設計する

という”**営業シーンのシナリオ**”を用意するため

現状のリアルなネタがほしいです。

可能であれば10/31にむけてご準備願います