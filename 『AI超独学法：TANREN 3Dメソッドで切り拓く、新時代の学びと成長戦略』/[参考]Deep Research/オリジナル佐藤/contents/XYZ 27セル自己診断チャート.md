はい、承知いたしました。「XYZ 27セル自己診断チャート」のアイデアと、それを実現するためのHTML、CSS、JavaScriptのコード（Chart.jsライブラリを使用）を以下に提案します。

**コンセプト：**

1.  **質問フェーズ:** ユーザーはX軸、Y軸、Z軸それぞれに関連する3つの質問（合計9問）に「はい」か「いいえ」で回答します。
2.  **スコア集計:** 各軸ごとに「はい」の数を集計し、スコア（0～3点）を算出します。このスコアを各軸の「レベル」と見なします（例: 0-1点=レベル1、2点=レベル2、3点=レベル3）。
3.  **結果表示（Chart.jsによるバーチャート）:** 各軸のスコアをChart.jsを使って3本のバーチャートで視覚的に表示します。
4.  **結果表示（27セルマトリクス）:** Z軸の各レベル（1, 2, 3）ごとに、X軸とY軸の3x3マトリクス（合計3つのマトリクス）を表示します。診断結果に該当するセル（例: X軸レベル2、Y軸レベル1、Z軸レベル3の組み合わせセル）をハイライト（色付け）します。
5.  **結果表示（解説）:** 診断された組み合わせセルに応じた簡単な解説文を表示します。

**使用ライブラリ:**

*   **Chart.js:** インタラクティブなバーチャート表示のため (CDN経由で使用)

---

**コードブロック:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XYZ 27セル自己診断チャート</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1, h2, h3 {
            color: #333;
        }
        .question-group {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #eee;
            border-radius: 5px;
        }
        .question {
            margin-bottom: 10px;
        }
        .question label {
            margin-right: 10px;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #0056b3;
        }
        .results {
            margin-top: 30px;
        }
        .chart-container {
            width: 80%;
            max-width: 600px;
            margin: 20px auto;
        }
        .matrix-area {
            margin-top: 20px;
            display: flex;
            flex-wrap: wrap; /* Z軸マトリクスを横に並べるか、縦にするか調整 */
            justify-content: space-around; /* Z軸マトリクス間のスペース */
        }
        .matrix-z-group {
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            min-width: 280px; /* 各Z軸マトリクスの最小幅 */
        }
        .matrix-table {
            border-collapse: collapse;
            margin: 10px auto; /* 中央揃え */
        }
        .matrix-table th, .matrix-table td {
            border: 1px solid #ddd;
            width: 70px; /* セルの幅 */
            height: 50px; /* セルの高さ */
            text-align: center;
            font-size: 12px;
            padding: 5px;
        }
        .matrix-table th {
            background-color: #f0f0f0;
        }
        .highlight {
            background-color: #ffd700 !important; /* 強調色 */
            font-weight: bold;
        }
        #result-text {
            margin-top: 20px;
            padding: 15px;
            background-color: #e9ecef;
            border-radius: 5px;
            border-left: 5px solid #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>XYZ 27セル自己診断チャート</h1>
        <p>以下の質問に「はい」か「いいえ」でお答えください。あなたの現在の思考特性の傾向を診断します。</p>

        <form id="quizForm">
            <div class="question-group">
                <h3>X軸 (思考の深度・整理力)</h3>
                <div class="question" id="q_x1">
                    <p>X1: 複雑な情報から、本質や要点を見つけ出すのが得意だ。</p>
                    <label><input type="radio" name="x1" value="1" required> はい</label>
                    <label><input type="radio" name="x1" value="0"> いいえ</label>
                </div>
                <div class="question" id="q_x2">
                    <p>X2: アイデアや計画を、具体的な行動レベルに落とし込むのが得意だ。</p>
                    <label><input type="radio" name="x2" value="1" required> はい</label>
                    <label><input type="radio" name="x2" value="0"> いいえ</label>
                </div>
                <div class="question" id="q_x3">
                    <p>X3: 考えや情報を、論理的で分かりやすい構成にまとめるのが得意だ。</p>
                    <label><input type="radio" name="x3" value="1" required> はい</label>
                    <label><input type="radio" name="x3" value="0"> いいえ</label>
                </div>
            </div>

            <div class="question-group">
                <h3>Y軸 (時間軸の視点)</h3>
                <div class="question" id="q_y1">
                    <p>Y1: 過去の事例やデータから学び、現在の判断に活かすことを重視している。</p>
                    <label><input type="radio" name="y1" value="1" required> はい</label>
                    <label><input type="radio" name="y1" value="0"> いいえ</label>
                </div>
                <div class="question" id="q_y2">
                    <p>Y2: 最新の動向やリアルタイムな情報を常に把握し、意思決定に役立てている。</p>
                    <label><input type="radio" name="y2" value="1" required> はい</label>
                    <label><input type="radio" name="y2" value="0"> いいえ</label>
                </div>
                <div class="question" id="q_y3">
                    <p>Y3: 数年先を見据えたビジョンや戦略を立て、それに基づいて行動している。</p>
                    <label><input type="radio" name="y3" value="1" required> はい</label>
                    <label><input type="radio" name="y3" value="0"> いいえ</label>
                </div>
            </div>

            <div class="question-group">
                <h3>Z軸 (コミュニケーションの対象者レベルへの配慮)</h3>
                <div class="question" id="q_z1">
                    <p>Z1: 相手の知識レベルや背景に合わせて、話の難易度や内容を調整している。</p>
                    <label><input type="radio" name="z1" value="1" required> はい</label>
                    <label><input type="radio" name="z1" value="0"> いいえ</label>
                </div>
                <div class="question" id="q_z2">
                    <p>Z2: 専門外の人にも理解できるように、専門用語を避けたり、平易な言葉で説明したりすることを心がけている。</p>
                    <label><input type="radio" name="z2" value="1" required> はい</label>
                    <label><input type="radio" name="z2" value="0"> いいえ</label>
                </div>
                <div class="question" id="q_z3">
                    <p>Z3: 相手の関心やニーズを的確に捉え、それに合わせた情報提供や提案ができる。</p>
                    <label><input type="radio" name="z3" value="1" required> はい</label>
                    <label><input type="radio" name="z3" value="0"> いいえ</label>
                </div>
            </div>

            <button type="button" onclick="submitQuiz()">診断する</button>
        </form>

        <div class="results" id="resultsArea" style="display:none;">
            <h2>診断結果</h2>
            <div class="chart-container">
                <canvas id="axisScoresChart"></canvas>
            </div>
            <h3>あなたの現在地 (XYZマトリクス)</h3>
            <div class="matrix-area">
                <!-- Z1 Matrix -->
                <div class="matrix-z-group">
                    <h4>Z軸レベル1 の場合</h4>
                    <table class="matrix-table" id="matrixZ1">
                        <thead>
                            <tr><th>Y＼X</th><th>X1 (抽象)</th><th>X2 (具体)</th><th>X3 (構造)</th></tr>
                        </thead>
                        <tbody>
                            <tr><th>Y3 (未来)</th><td id="X1Y3Z1">X1Y3Z1</td><td id="X2Y3Z1">X2Y3Z1</td><td id="X3Y3Z1">X3Y3Z1</td></tr>
                            <tr><th>Y2 (現在)</th><td id="X1Y2Z1">X1Y2Z1</td><td id="X2Y2Z1">X2Y2Z1</td><td id="X3Y2Z1">X3Y2Z1</td></tr>
                            <tr><th>Y1 (過去)</th><td id="X1Y1Z1">X1Y1Z1</td><td id="X2Y1Z1">X2Y1Z1</td><td id="X3Y1Z1">X3Y1Z1</td></tr>
                        </tbody>
                    </table>
                </div>
                 <!-- Z2 Matrix -->
                <div class="matrix-z-group">
                    <h4>Z軸レベル2 の場合</h4>
                    <table class="matrix-table" id="matrixZ2">
                         <thead>
                            <tr><th>Y＼X</th><th>X1 (抽象)</th><th>X2 (具体)</th><th>X3 (構造)</th></tr>
                        </thead>
                        <tbody>
                            <tr><th>Y3 (未来)</th><td id="X1Y3Z2">X1Y3Z2</td><td id="X2Y3Z2">X2Y3Z2</td><td id="X3Y3Z2">X3Y3Z2</td></tr>
                            <tr><th>Y2 (現在)</th><td id="X1Y2Z2">X1Y2Z2</td><td id="X2Y2Z2">X2Y2Z2</td><td id="X3Y2Z2">X3Y2Z2</td></tr>
                            <tr><th>Y1 (過去)</th><td id="X1Y1Z2">X1Y1Z2</td><td id="X2Y1Z2">X2Y1Z2</td><td id="X3Y1Z2">X3Y1Z2</td></tr>
                        </tbody>
                    </table>
                </div>
                 <!-- Z3 Matrix -->
                 <div class="matrix-z-group">
                    <h4>Z軸レベル3 の場合</h4>
                    <table class="matrix-table" id="matrixZ3">
                         <thead>
                            <tr><th>Y＼X</th><th>X1 (抽象)</th><th>X2 (具体)</th><th>X3 (構造)</th></tr>
                        </thead>
                        <tbody>
                            <tr><th>Y3 (未来)</th><td id="X1Y3Z3">X1Y3Z3</td><td id="X2Y3Z3">X2Y3Z3</td><td id="X3Y3Z3">X3Y3Z3</td></tr>
                            <tr><th>Y2 (現在)</th><td id="X1Y2Z3">X1Y2Z3</td><td id="X2Y2Z3">X2Y2Z3</td><td id="X3Y2Z3">X3Y2Z3</td></tr>
                            <tr><th>Y1 (過去)</th><td id="X1Y1Z3">X1Y1Z3</td><td id="X2Y1Z3">X2Y1Z3</td><td id="X3Y1Z3">X3Y1Z3</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="result-text">
                <p>ここに診断結果の解説が表示されます。</p>
            </div>
        </div>
    </div>

    <script>
        const questions = {
            x: ['x1', 'x2', 'x3'],
            y: ['y1', 'y2', 'y3'],
            z: ['z1', 'z2', 'z3']
        };

        // 各セルの解説 (27パターン) - キーは "X[レベル]Y[レベル]Z[レベル]"
        const resultTexts = {
            "X1Y1Z1": "全体的に思考の基礎力、時間軸のバランス、対人コミュニケーション配慮の向上が期待されます。まずは得意なことを見つけることから始めましょう。",
            "X1Y1Z2": "思考の基礎力と時間軸のバランスに課題がありますが、相手に合わせたコミュニケーションの中級レベルの配慮ができています。思考力を高め、時間軸の視点を広げましょう。",
            "X1Y1Z3": "思考の基礎力と時間軸のバランスに課題がありますが、相手に合わせた高度なコミュニケーション配慮ができています。その強みを活かしつつ、思考の土台を固めましょう。",
            "X1Y2Z1": "思考の基礎力に課題があり、時間軸のバランスは中程度、コミュニケーション配慮は初級です。X軸の強化とZ軸の向上を目指しましょう。",
            "X1Y2Z2": "思考の基礎力は要改善ですが、時間軸とコミュニケーション配慮はバランスが取れています。X軸のスキルアップに集中してみましょう。",
            // ... (中略) ... 他の22パターンの解説を追加してください。以下は例です。
            "X2Y2Z2": "思考の深度・整理力、時間軸の視点、コミュニケーション配慮ともにバランスの取れた中級レベルです。得意な分野をさらに伸ばし、上級を目指しましょう。",
            "X3Y3Z3": "素晴らしい！思考の深度・整理力、時間軸の視点、コミュニケーション配慮すべてにおいて高いレベルにあります。あなたのリーダーシップで周囲を導いてください。",
            // ダミーデータ (不足分を埋める)
            "X1Y1Z1_default": "診断結果を確認中です。あなたの特性に合わせたアドバイスを準備しています。",
        };
        // 27パターンの解説を網羅的に用意するのが望ましいです。
        // 上記は一部の例なので、必要に応じて全ての組み合わせのテキストを作成してください。
        // 簡単のため、ここではX,Y,Zのレベルが1,2,3になるように仮定します。

        let axisScoresChartInstance = null;

        function getScoreLevel(score) {
            if (score <= 1) return 1; // 0点か1点ならレベル1
            if (score === 2) return 2; // 2点ならレベル2
            return 3; // 3点ならレベル3
        }

        function submitQuiz() {
            const form = document.getElementById('quizForm');
            const scores = { x: 0, y: 0, z: 0 };
            let allAnswered = true;

            for (const axis in questions) {
                questions[axis].forEach(qId => {
                    const radioButtons = form.elements[qId];
                    if (radioButtons && radioButtons.value) {
                         if (radioButtons.value === "1") { //「はい」が選択された場合
                            scores[axis]++;
                        }
                    } else {
                        // 特定の質問で回答がない場合（ラジオボタンのグループ全体で見て）
                        // １つでも未回答なら allAnswered = false
                        let answeredForGroup = false;
                        for(let i=0; i < radioButtons.length; i++){
                            if(radioButtons[i].checked){
                                answeredForGroup = true;
                                break;
                            }
                        }
                        if(!answeredForGroup){
                            allAnswered = false;
                            document.getElementById('q_' + qId).style.border = "2px solid red"; //未回答を赤枠で示す
                        } else {
                             document.getElementById('q_' + qId).style.border = "";
                        }
                    }
                });
            }

            if (!allAnswered) {
                alert("すべての質問に回答してください。");
                return;
            }


            const xLevel = getScoreLevel(scores.x);
            const yLevel = getScoreLevel(scores.y);
            const zLevel = getScoreLevel(scores.z);

            document.getElementById('resultsArea').style.display = 'block';

            // Chart.jsでバーチャート表示
            const ctx = document.getElementById('axisScoresChart').getContext('2d');
            if (axisScoresChartInstance) {
                axisScoresChartInstance.destroy(); // 既存のチャートがあれば破棄
            }
            axisScoresChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['X軸 (思考力)', 'Y軸 (時間軸)', 'Z軸 (対人配慮)'],
                    datasets: [{
                        label: 'あなたのスコア (最大3点)',
                        data: [scores.x, scores.y, scores.z],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(75, 192, 192, 0.7)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 3,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: '各軸の診断スコア'
                        }
                    }
                }
            });

            // マトリクスハイライト
            // まず全セルのハイライトを解除
            document.querySelectorAll('.matrix-table td').forEach(cell => {
                cell.classList.remove('highlight');
            });

            // 該当セルIDを生成
            const targetCellId = `X${xLevel}Y${yLevel}Z${zLevel}`;
            const targetCell = document.getElementById(targetCellId);
            if (targetCell) {
                targetCell.classList.add('highlight');
                // ハイライトしたセルが含まれるZ軸マトリクスを分かりやすくする（任意）
                targetCell.closest('.matrix-z-group').style.boxShadow = "0 0 15px rgba(0,123,255,0.5)";
            } else {
                console.warn("Target cell not found for ID:", targetCellId, " - Ensure your HTML cell IDs match the X,Y,Z level mapping (1,2,3 for each axis)");
                 // X,Y,Z軸の質問数が3つなので、スコアは0,1,2,3。レベルは1,2,3。
                 // マトリクスのセルIDは X[1-3]Y[1-3]Z[1-3] となるように調整が必要。
                 // 例えば X1Y1Z1, X2Y1Z1, ..., X3Y3Z3
                 // getScoreLevel() でレベル1,2,3を返しているので、IDはそれでOKなはず。
                 // HTMLのIDとJavaScriptのID生成ロジックを確認
            }


            // 解説文表示
            const resultKey = `X${xLevel}Y${yLevel}Z${zLevel}`;
            const resultDescription = resultTexts[resultKey] || resultTexts["X1Y1Z1_default"]; // 見つからない場合のデフォルト
            document.getElementById('result-text').innerHTML = `<p><strong>あなたの現在地: X${xLevel} Y${yLevel} Z${zLevel}</strong></p><p>${resultDescription}</p>`;

            // 結果表示位置へスクロール
            document.getElementById('resultsArea').scrollIntoView({ behavior: 'smooth' });
        }

        // マトリクスセルのIDを動的に設定（初期化）
        // Z軸レベルごとにXYマトリクスのセルIDを設定
        // レベルは1,2,3で統一
        for (let z = 1; z <= 3; z++) {
            for (let y = 1; y <= 3; y++) {
                for (let x = 1; x <= 3; x++) {
                    // HTMLテーブルの行はYが高位->低位、列はXが低位->高位なので注意
                    // Y3, Y2, Y1 / X1, X2, X3
                    // Y軸のインデックス (0,1,2) -> Yレベル (3,2,1)
                    // X軸のインデックス (0,1,2) -> Xレベル (1,2,3)
                    const yDomLevel = 3 - (y-1); // y=1 -> Y3, y=2 -> Y2, y=3 -> Y1
                    const xDomLevel = x;         // x=1 -> X1, x=2 -> X2, x=3 -> X3
                    const cellId = `X${xDomLevel}Y${yDomLevel}Z${z}`;
                    const cell = document.getElementById(cellId);
                    if (cell) {
                        cell.textContent = `X${xDomLevel}Y${yDomLevel}Z${z}`; // セルにIDを表示（デバッグ用）
                    } else {
                        // console.error(`Cell with ID ${cellId} not found during initialization.`);
                    }
                }
            }
        }


    </script>
</body>
</html>
```

**解説と注意点:**

1.  **HTML構造:**
    *   質問はX, Y, Zの各軸ごとに3問ずつ配置。
    *   結果表示エリアには、Chart.js用の`<canvas>`と、27セルマトリクス表示用の3つのテーブル（Z軸レベル1, 2, 3に対応）を用意。
    *   各マトリクスセルには `X[レベル]Y[レベル]Z[レベル]` という形式のIDを振っています (例: `X1Y3Z1`)。 **JavaScript側でレベルを1,2,3にマッピングし直す**必要があります。現在のコードでは、`getScoreLevel`関数で0-3点のスコアをレベル1,2,3に変換しています。

2.  **CSSスタイリング:**
    *   基本的なレイアウトと、ハイライト表示用の`.highlight`クラスを定義。

3.  **JavaScriptロジック (`<script>`タグ内):**
    *   `questions`: 質問IDを管理。
    *   `resultTexts`: 27パターンの各組み合わせに対応する解説文を格納するオブジェクト。**ここに27通りの示唆に富んだ解説文をしっかりと記述することが、この診断の価値を高めます。** (現在は一部の例とデフォルトのみ)
    *   `getScoreLevel(score)`: 各軸のスコア（「はい」の数、0～3点）をレベル（1, 2, 3）に変換する関数。
        *   0点または1点 -> レベル1 (改善の余地あり)
        *   2点 -> レベル2 (標準的)
        *   3点 -> レベル3 (得意)
    *   `submitQuiz()`:
        *   フォームから回答を収集し、各軸のスコアとレベルを計算。
        *   **未回答チェックを追加しました。**
        *   Chart.jsを使って各軸のスコアをバーチャートで表示。
        *   計算されたXYZのレベルの組み合わせに該当するマトリクスセルを探し、`.highlight`クラスを付与して色付け。
        *   対応する解説文を表示。
        *   結果表示エリアへスクロール。
    *   **マトリクスセルのID初期化:** HTML内のテーブルセルIDが `X1Y3Z1` のように、X,Y,Zの各レベル(1,2,3)の組み合わせになっています。JavaScriptの `getScoreLevel` で得られるレベル (1,2,3) と直接対応するようにしています。テーブルの行と列の順序（Y軸は上がY3、X軸は左がX1）に合わせてIDを振っています。
        *   **重要:** マトリクスの `<td>` 要素のIDは、`X1Y3Z1` (Xレベル1, Yレベル3, Zレベル1) のように設定されています。これはHTMLのテーブル構造 (Y軸が上からY3, Y2, Y1、X軸が左からX1, X2, X3) に合わせたものです。JavaScript側で算出される `xLevel`, `yLevel`, `zLevel` (それぞれ1,2,3) とこのIDが正しくマッピングされるように注意してください。現在のコードではこのマッピングを考慮しています。

4.  **Chart.js:**
    *   CDNから読み込んでいます。
    *   診断結果の各軸のスコア（0～3点）をシンプルなバーチャートで表示します。

**改善・拡張のポイント:**

*   **解説文の充実:** `resultTexts` の内容が診断の質を大きく左右します。27パターンそれぞれに具体的で役立つアドバイスを記述してください。
*   **質問の質:** 診断の精度は質問内容に依存します。XYZの各特性を的確に測れるような質問を吟味してください。
*   **レベル判定ロジックの調整:** `getScoreLevel` 関数のレベル分けの閾値は、必要に応じて調整可能です。
*   **マトリクスの視覚表現:** CSSだけでもハイライトは可能ですが、より高度なSVGやCanvasを使ったインタラクティブなマトリクス描画も検討できます（ただし複雑になります）。
*   **レスポンシブデザイン:** スマートフォンなどでも見やすいように、CSSでレスポンシブ対応を強化すると良いでしょう。
*   **エラーハンドリング:** JavaScriptのコードに、より堅牢なエラーハンドリングを追加することを推奨します。

このコードをベースに、ぜひ魅力的な自己診断ツールを作成してください。
