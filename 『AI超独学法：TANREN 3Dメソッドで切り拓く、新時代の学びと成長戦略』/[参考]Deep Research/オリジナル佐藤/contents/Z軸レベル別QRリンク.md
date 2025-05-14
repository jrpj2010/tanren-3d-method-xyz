はい、承知いたしました。「Z軸レベル別QRリンク」のアイデアと、それを実現するためのHTML、CSS、JavaScriptのコードを提案します。この機能は、前の自己診断チャートの結果（特にZ軸のレベル）に基づいて、ユーザーに最適な次のステップ（NotionテンプレートやGitHub Copilot設定例など）へ誘導することを目的とします。

**コンセプト：**

1.  **Z軸レベルの取得:** 前の自己診断の結果（特にZ軸のスコアまたはレベル）を何らかの方法でこのコンポーネントに引き継ぐか、再度簡易的に診断させます。（ここでは、前の診断結果をローカルストレージから読み込む想定とします。）
2.  **レベル別コンテンツ表示:** Z軸のレベル（例: 初級、中級、上級）に応じて、異なるQRコードと説明文を表示します。
3.  **QRコード生成:** JavaScriptのライブラリ（例: `qrcode.js`）を使って、指定されたURLから動的にQRコードを生成して表示します。
4.  **具体的な誘導先:**
    *   **Z軸 初級者向け:**
        *   Notionテンプレート: コミュニケーションの基本を整理するシンプルなテンプレート（例: 会議アジェンダテンプレート、顧客情報メモテンプレート）
        *   ツール設定例: Slackの通知設定の基本、シンプルなメール署名設定など
    *   **Z軸 中級者向け:**
        *   Notionテンプレート: より高度な情報共有やタスク管理のためのテンプレート（例: プロジェクト管理ボード、FAQデータベース）
        *   GitHub Copilot設定例: 特定の言語やフレームワークでの基本的なコード補完を促すコメント例や簡単な設定例
    *   **Z軸 上級者向け:**
        *   Notionテンプレート: 戦略立案やチームマネジメントに役立つ高度なテンプレート（例: OKR管理、チーム憲章）
        *   GitHub Copilot設定例: より複雑なロジック生成を助ける高度なプロンプトエンジニアリング例、カスタムスニペットの活用法など

**使用ライブラリ:**

*   **qrcode.js:** QRコードを生成するため (CDN経由で使用) - Davidshimjs/qrcodejs

---

**コードブロック:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Z軸レベル別 おすすめリソース</title>
    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f0f2f5;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: flex-start; /* 上寄せ */
            min-height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            max-width: 600px;
            width: 100%;
            text-align: center;
        }
        h1 {
            color: #1a2533;
            margin-bottom: 10px;
            font-size: 26px;
        }
        .level-info {
            font-size: 18px;
            color: #555;
            margin-bottom: 25px;
        }
        .resource-section {
            display: none; /* 初期状態では非表示 */
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
            background-color: #f9f9f9;
        }
        .resource-section h2 {
            color: #007bff;
            margin-top: 0;
            font-size: 20px;
        }
        .resource-section p {
            font-size: 16px;
            margin-bottom: 15px;
        }
        .qr-code-container {
            margin: 20px auto;
            width: 180px; /* QRコードの表示サイズ */
            height: 180px;
            padding: 10px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        #qrcodeDisplay { /* QRコードが描画されるdiv */
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
        .resource-link {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .resource-link:hover {
            background-color: #0056b3;
        }
        .no-result {
            color: #777;
            font-style: italic;
        }
        /* 診断を促すボタン（オプション） */
        .diagnose-button-container {
            margin-bottom: 20px;
        }
        .diagnose-button {
            padding: 12px 25px;
            font-size: 16px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .diagnose-button:hover {
            background-color: #218838;
        }

    </style>
</head>
<body>
    <div class="container">
        <h1>あなたのZ軸レベルに合わせたおすすめリソース</h1>
        <div id="currentLevelDisplay" class="level-info">
            あなたのZ軸レベル: <span id="zLevelText" class="no-result">未診断 (または診断結果を読み込み中...)</span>
        </div>

        <!-- (オプション) 自己診断チャートへのリンクや、簡易診断トリガー -->
        <div class="diagnose-button-container">
            <p>XYZ自己診断チャートをまだ実施していない場合は、先に診断を行ってください。</p>
            <!-- <a href="[自己診断チャートのURL]" class="diagnose-button">自己診断チャートへ</a> -->
             <button onclick="loadZLevelAndShowResources()" class="diagnose-button">診断結果からおすすめを表示</button>
        </div>


        <div id="resourceLevel1" class="resource-section">
            <h2>Z軸レベル1 (初級者) のあなたへ</h2>
            <p>コミュニケーションの基本を固め、相手への配慮を意識することから始めましょう。以下のテンプレートや設定例が役立ちます。</p>
            <div class="qr-code-container" id="qrLevel1"></div>
            <a href="#" id="linkLevel1" class="resource-link" target="_blank">Notion: 会議アジェンダテンプレート</a>
            <p style="font-size:14px; color:#666; margin-top:10px;">(例: 議事録の取り方や、参加者への事前共有のポイントを学べます)</p>
        </div>

        <div id="resourceLevel2" class="resource-section">
            <h2>Z軸レベル2 (中級者) のあなたへ</h2>
            <p>より効果的な情報共有や、チーム内での円滑なコミュニケーションを目指しましょう。AIツールの活用も視野に入れてみてください。</p>
            <div class="qr-code-container" id="qrLevel2"></div>
            <a href="#" id="linkLevel2" class="resource-link" target="_blank">GitHub: Copilot基本設定例</a>
            <p style="font-size:14px; color:#666; margin-top:10px;">(例: コメントからのコード生成や、よく使うパターンの補完設定のヒント)</p>
        </div>

        <div id="resourceLevel3" class="resource-section">
            <h2>Z軸レベル3 (上級者) のあなたへ</h2>
            <p>あなたの高度なコミュニケーション能力を、チーム全体の生産性向上や戦略的な意思決定に活かしましょう。より高度なツール活用やフレームワークが助けになります。</p>
            <div class="qr-code-container" id="qrLevel3"></div>
            <a href="#" id="linkLevel3" class="resource-link" target="_blank">Notion: OKR管理テンプレート</a>
            <p style="font-size:14px; color:#666; margin-top:10px;">(例: チームの目標設定と進捗管理を透明化し、エンゲージメントを高める)</p>
        </div>

    </div>

    <script>
        // 自己診断チャートのローカルストレージキー (診断チャート側と合わせる)
        const quizChapterKey = 'chapter1'; // XYZ自己診断チャートで使用したキー

        const zLevelTextElement = document.getElementById('zLevelText');
        const resourceSections = {
            1: document.getElementById('resourceLevel1'),
            2: document.getElementById('resourceLevel2'),
            3: document.getElementById('resourceLevel3')
        };
        const qrElements = {
            1: document.getElementById('qrLevel1'),
            2: document.getElementById('qrLevel2'),
            3: document.getElementById('qrLevel3')
        };
        const linkElements = {
            1: document.getElementById('linkLevel1'),
            2: document.getElementById('linkLevel2'),
            3: document.getElementById('linkLevel3')
        };

        // 各レベルに対応するリソース情報
        const resourcesByLevel = {
            1: {
                title: "Notion: 会議アジェンダテンプレート",
                url: "https://www.notion.so/templates/meeting-notes-and-agenda", // ダミーURL。実際のテンプレートURLに置き換えてください。
                description: "(例: 議事録の取り方や、参加者への事前共有のポイントを学べます)"
            },
            2: {
                title: "GitHub: Copilot基本設定例",
                url: "https://docs.github.com/ja/copilot/getting-started-with-github-copilot", // ダミーURL。実際のドキュメントや記事のURLに。
                description: "(例: コメントからのコード生成や、よく使うパターンの補完設定のヒント)"
            },
            3: {
                title: "Notion: OKR管理テンプレート",
                url: "https://www.notion.so/templates/okr-goal-setting", // ダミーURL。
                description: "(例: チームの目標設定と進捗管理を透明化し、エンゲージメントを高める)"
            }
        };

        // QRコード生成関数 (特定のdiv要素内に描画)
        function generateQRCode(elementId, text) {
            const qrElement = document.getElementById(elementId);
            qrElement.innerHTML = ''; // 既存のQRコードがあればクリア
            new QRCode(qrElement, {
                text: text,
                width: 160, // QRコードのコンテナサイズに合わせて調整
                height: 160,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        }

        // Z軸のスコアからレベルを判定する関数 (自己診断チャートとロジックを合わせる)
        function getZLevelFromScore(score) {
            if (score === null || score === undefined) return null;
            if (score <= 1) return 1; // 0点か1点ならレベル1
            if (score === 2) return 2; // 2点ならレベル2
            return 3; // 3点ならレベル3
        }

        function loadZLevelAndShowResources() {
            let zScore = null;
            try {
                const savedQuizData = localStorage.getItem(quizChapterKey);
                if (savedQuizData) {
                    const parsedQuizData = JSON.parse(savedQuizData);
                    // Z軸の質問ID (自己診断チャートのJSと合わせる)
                    const zQuestions = ['z1', 'z2', 'z3'];
                    let currentZScore = 0;
                    let zAnswered = 0;
                    zQuestions.forEach(qId => {
                        // 'cb1'のようなチェックボックスIDではなく、質問ごとの値'z1'などを参照
                        // 自己診断チャート側がスコアを保存していればそれを使う
                        // ここでは仮に、チェックボックスIDからスコアを再計算する
                        // (理想は診断チャートがZ軸スコアを直接保存すること)
                        if (parsedQuizData['cb'+qId.substring(1)] === true) { // cbz1, cbz2... のようなIDを想定
                           currentZScore++;
                        }
                        if (parsedQuizData['cb'+qId.substring(1)] !== undefined) {
                            zAnswered++;
                        }
                    });
                    if (zAnswered === zQuestions.length) { // 全てのZ軸質問に回答記録があれば
                        zScore = currentZScore;
                    }
                }
            } catch (e) {
                console.error("診断結果の読み込みに失敗しました:", e);
            }

            const zLevel = getZLevelFromScore(zScore);

            // 全てのリソースセクションを一旦非表示に
            Object.values(resourceSections).forEach(section => section.style.display = 'none');

            if (zLevel !== null && resourcesByLevel[zLevel]) {
                zLevelTextElement.textContent = `レベル${zLevel} (${zLevel === 1 ? '初級' : zLevel === 2 ? '中級' : '上級'})`;
                zLevelTextElement.classList.remove('no-result');

                const targetSection = resourceSections[zLevel];
                const targetQrElementId = qrElements[zLevel].id;
                const targetLinkElement = linkElements[zLevel];
                const resourceInfo = resourcesByLevel[zLevel];

                targetSection.style.display = 'block';
                targetLinkElement.href = resourceInfo.url;
                targetLinkElement.textContent = resourceInfo.title;
                // 説明文も動的に設定する場合 (HTMLに既にあるので上書きするなら)
                // targetSection.querySelector('p:not([style])').textContent = "新しい説明文...";
                // targetSection.querySelector('p[style]').textContent = resourceInfo.description;


                generateQRCode(targetQrElementId, resourceInfo.url);
            } else {
                zLevelTextElement.textContent = "未診断 (またはZ軸の診断結果が不十分です)";
                zLevelTextElement.classList.add('no-result');
                // (オプション) 何も表示しないか、デフォルトメッセージを表示
                // resourceSections[1].style.display = 'block'; // 例えばデフォルトでレベル1を表示
                // generateQRCode(qrElements[1].id, resourcesByLevel[1].url);
                // linkElements[1].href = resourcesByLevel[1].url;
                // linkElements[1].textContent = resourcesByLevel[1].title;
                alert("XYZ自己診断チャートの結果を読み込めませんでした。先に診断を行ってください。");
            }
        }

        // ページ読み込み時、またはボタンクリックで診断結果を読み込み表示
        // window.addEventListener('load', loadZLevelAndShowResources);
        // ボタンクリックで実行するように変更
    </script>
</body>
</html>
```

**解説と注意点:**

1.  **HTML構造:**
    *   現在のZ軸レベルを表示するエリア (`#currentLevelDisplay`)。
    *   各Z軸レベル（1, 2, 3）に対応するリソース表示セクション (`.resource-section`) を用意。これらは初期状態では非表示(`display: none;`)。
    *   各リソースセクション内に、QRコードを表示するための `div` (`.qr-code-container`) と、リソースへの直接リンク (`<a>`) を配置。
    *   「診断結果からおすすめを表示」ボタンを追加し、これをクリックすることで診断結果の読み込みと表示が行われるようにしました。

2.  **CSSスタイリング:**
    *   シンプルでクリーンなデザイン。QRコードコンテナのスタイルも調整。

3.  **JavaScriptロジック:**
    *   `quizChapterKey`: **前の自己診断チャートで使用したローカルストレージのキーと同じものを指定してください。** これにより、診断結果を引き継げます。
    *   `resourcesByLevel`: 各Z軸レベルに対応するリソースのタイトル、URL、簡単な説明を格納するオブジェクト。**ここのURLは実際のNotionテンプレートやGitHub Copilot設定例などの有効なURLに置き換えてください。**
    *   `generateQRCode(elementId, text)`: 指定された`div`要素のIDとURL（テキスト）を受け取り、`qrcode.js`を使ってQRコードを生成・表示します。
    *   `getZLevelFromScore(score)`: 自己診断チャート側と同じロジックで、Z軸のスコアからレベル（1, 2, 3）を判定します。
    *   `loadZLevelAndShowResources()`:
        *   ローカルストレージから `quizChapterKey` を使って自己診断の保存データを読み込みます。
        *   保存データの中からZ軸の回答状況を抽出し、Z軸スコアを計算します。（**注意:** この部分は自己診断チャート側がどのようにデータを保存しているかに依存します。現在のコードでは、Z軸の質問IDが `z1, z2, z3` で、対応するチェックボックスのIDが `cbz1, cbz2, cbz3` のような形式で保存されていると仮定してスコアを再計算しています。最も良いのは、自己診断チャート側がZ軸の合計スコアを直接ローカルストレージに保存することです。）
        *   Z軸スコアからZ軸レベルを判定します。
        *   判定されたレベルに応じて、対応するリソースセクションを表示し、QRコードとリンクを設定します。
        *   Z軸レベルが不明な場合や、該当するリソースがない場合は、その旨をユーザーに伝えます。
    *   **イベントリスナー:** `load`イベントではなく、ボタンクリックで`loadZLevelAndShowResources`が実行されるように変更しました。これにより、ユーザーが能動的に結果表示を要求する形になります。

4.  **qrcode.js:**
    *   CDNから読み込んでいます。
    *   非常にシンプルにQRコードをHTML要素内に描画できます。

**重要な考慮事項:**

*   **Z軸レベルの引き継ぎ:**
    *   **最重要:** この「レベル別QRリンク」ページが、自己診断チャートページとは別のHTMLファイルである場合、Z軸の診断結果をローカルストレージ経由で正確に引き継ぐ必要があります。
    *   自己診断チャートのJavaScriptで、Z軸の合計スコア（または計算されたZ軸レベル）を `localStorage.setItem('zAxisScore', zScoreValue);` のように保存します。
    *   このQRリンクページのJavaScriptで `localStorage.getItem('zAxisScore');` を使ってその値を取得します。
    *   現在のコードでは、自己診断チャートが各チェックボックスの状態を保存していると仮定し、そこからZ軸スコアを再計算しようとしていますが、これは少し複雑でエラーが起きやすいです。**自己診断チャート側でZ軸の集計結果（スコアまたはレベル）を直接ローカルストレージに保存する方式を強く推奨します。**
*   **リソースURLの準備:** `resourcesByLevel` オブジェクト内のURLは、実際にユーザーを誘導したいNotionテンプレート、GitHubリポジトリ、解説記事などの有効なURLに必ず置き換えてください。
*   **QRコードのサイズと読み取りやすさ:** `qrcode.js` の `width` と `height` パラメータや、CSSの `.qr-code-container` のサイズを調整して、QRコードが適切な大きさで鮮明に表示されるようにしてください。
*   **ユーザーエクスペリエンス:**
    *   もしZ軸の診断結果がローカルストレージに見つからない場合、ユーザーに自己診断チャートへ戻るよう促すメッセージを明確に表示することが親切です。
    *   QRコードだけでなく、直接クリックできるリンクも併せて提供することで、PCユーザーにも配慮できます。

このコンポーネントを実装することで、ユーザーは自分のコミュニケーションレベル（Z軸）に合わせた具体的な次のアクションへスムーズに進むことができ、書籍から得た知識をより実践的に活用する手助けとなるでしょう。
