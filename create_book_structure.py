import os
import re

# 目次データ (リスト形式)
toc = [
    {"chapter_num_str": "プロローグ", "chapter_title": "なぜ今、あなたの「学び方」をアップデートする必要があるのか？", "sections": [
        "1. 情報爆発、AI格差…「独学力」が生存戦略となる時代",
        "2. 限界突破の鍵：AIは「最強の学習パートナー」に進化する",
        "3. 本書のナビゲーション：思考OS「TANREN 3Dメソッド」で未来の学びへ"
    ]},
    {"chapter_num_str": "第1章", "chapter_title": "AI超独学を起動するマインドセット：「使う側」から「共創する側」へ", "sections": [
        "1. 「AIと話せる人」はなぜ指数関数的に成長するのか？（翻訳こんにゃくの真実）",
        "2. 「AIを使っているつもり」が陥る、7つの独学の罠",
        "3. 受動的なAI利用を超えて：プロフェッショナルの新定義"
    ]},
    {"chapter_num_str": "第2章", "chapter_title": "【核理論】独学OS「TANREN 3Dメソッド」完全インストール", "sections": [
        "1. 思考OS「TANREN 3Dメソッド」全貌：なぜ\"3D\"でなければならないのか？",
        "2. X軸 前編（思考の深掘り）：表層から本質へ",
        "3. X軸 後編（思考の整理）：カオスから構造へ",
        "4. Y軸（時間軸の視座）：点から線、そして未来へ",
        "5. Z軸（レベル感の把握）：現在地から頂上へ",
        "6. 3Dメソッド統合演習：AIと共に思考OSを身体に刻む"
    ]},
    {"chapter_num_str": "第3章", "chapter_title": "AIとの対話設計術：プロンプトで思考を形にする技術", "sections": [
        "1. プロンプトの本質：AIへの「思考の設計図」",
        "2. 「良いプロンプト」「悪いプロンプト」の分水嶺",
        "3. 【最重要】結果が変わる！AI対話 6つの必須要素",
        "4. 実践テクニック：質問の深掘り、アイデア出し、要約・翻訳 etc.",
        "5. 主要AIプラットフォームの特性と戦略的使い分け（2025年版）",
        "6. 未来の対話：プロンプトは進化し続ける（未来への展望）"
    ]},
    {"chapter_num_str": "第4章", "chapter_title": "AIエージェント活用術：自動化と共創で生産性を飛躍させる", "sections": [
        "1. AIエージェントとは何か？「自律性」がもたらすインパクト",
        "2. レベル別に見るAIエージェントの世界",
        "3. AIエージェント活用の注意点：リスクと倫理"
    ]},
    {"chapter_num_str": "第5章", "chapter_title": "【実践編1】AI共創によるアウトプット革命：企画・文章・資料作成", "sections": [
        "1. 企画立案を「超」加速：AIとの共創プロセス",
        "2. 「あなたらしい」文章作成術：AIパーソナル添削",
        "3. 次世代プレゼン資料作成：AI×SVG/HTMLで「編集」を超える"
    ]},
    {"chapter_num_str": "第6章", "chapter_title": "【実践編2】リアルな仕事の課題をAIと突破する：職種別シナリオ", "sections": [
        "1. 【営業】AIが最強の右腕に：商談アシストから提案書作成まで",
        "2. 【マーケティング】AI分析を超える戦略：差別化の鍵「変数」を極める",
        "3. 【人材育成】心に響くフィードバック：AIと紡ぐ個別最適化",
        "4. 【キャリア開発】AIと描く未来設計図：「シン・ジェネラリスト」への道"
    ]},
    {"chapter_num_str": "第7章", "chapter_title": "学習習慣の「壁」を壊す：AI時代の継続システム構築法", "sections": [
        "1. なぜ「継続」は難しいのか？挫折のメカニズム",
        "2. 解決策①：マイクロラーニングで「無理なく」続ける技術",
        "3. 解決策②：「インプット」を仕組み化する（AIナレッジベース構築の考え方）",
        "4. 解決策③：「アウトプット」を習慣化する（AIとの週次ふり返り対話）",
        "5. 最強のスキル：「学び続ける力」を育むマインドセット"
    ]},
    {"chapter_num_str": "エピローグ", "chapter_title": "AIと共に「進化し続けるあなた」へ", "sections": [
        "1. 羅針盤としての「TANREN 3Dメソッド」再確認",
        "2. 未来は「与えられるもの」ではなく「創り出すもの」",
        "3. さあ、AIと共に、あなた自身の「超独学」を始めよう！"
    ]}
]

def sanitize_filename(name):
    """ファイル名として安全な文字列に変換する"""
    # 先頭の数字とドット（例: "1. ", "2.1. "）を削除
    name = re.sub(r'^\d+(\.\d+)*\s*[\.:：]?\s*', '', name)
    # 全角記号などを半角に（簡易的）
    name = name.replace('：', '_').replace('？', '').replace('！', '')
    name = name.replace('（', '(').replace('）', ')')
    name = name.replace('【', '').replace('】', '')
    name = name.replace('「', '').replace('」', '')
    name = name.replace('『', '').replace('』', '')
    name = name.replace('〜', '-')
    # スラッシュやスペースなどをアンダースコアに置換
    name = re.sub(r'[\\/:*?"<>|\s\t\n\r]+', '_', name)
    # Windowsで使えない末尾のドットやスペースを削除
    name = name.rstrip('._ ')
    # 長すぎるファイル名を短縮（ここでは50文字程度）
    if len(name) > 50:
         # アンダースコアで区切られていれば、最初の数要素を使う
        parts = name.split('_')
        short_name = ""
        char_count = 0
        for part in parts:
            if char_count + len(part) + 1 <= 50:
                short_name += part + "_"
                char_count += len(part) + 1
            else:
                break
        name = short_name.rstrip('_')
        if not name: # 区切りがない長文の場合
             name = name[:50]

    # 念のため空にならないように
    if not name:
        name = "untitled"
    return name

def create_structure(toc_data, base_dir="書籍原稿"):
    """目次データに基づいてフォルダとファイルを作成する"""
    if not os.path.exists(base_dir):
        os.makedirs(base_dir)
        print(f"作成: ルートフォルダ '{base_dir}'")

    chapter_index = 0
    for chapter in toc_data:
        # 章フォルダ名の作成 (例: 00_プロローグ_なぜ今あなたの学び方をアップデートする必要があるのか)
        if chapter["chapter_num_str"] == "プロローグ":
            chapter_folder_name = f"{chapter_index:02d}_{chapter['chapter_num_str']}_{sanitize_filename(chapter['chapter_title'])}"
        elif chapter["chapter_num_str"] == "エピローグ":
             # 章番号を連番で振る
             chapter_folder_name = f"{chapter_index:02d}_{chapter['chapter_num_str']}_{sanitize_filename(chapter['chapter_title'])}"
        else:
            # "第X章" から数字を抽出してゼロ埋め
            match = re.match(r'第(\d+)章', chapter["chapter_num_str"])
            if match:
                 num = int(match.group(1))
                 chapter_folder_name = f"{num:02d}_{chapter['chapter_num_str']}_{sanitize_filename(chapter['chapter_title'])}"
            else: # 念のため
                 chapter_folder_name = f"{chapter_index:02d}_{sanitize_filename(chapter['chapter_num_str'])}_{sanitize_filename(chapter['chapter_title'])}"

        chapter_path = os.path.join(base_dir, chapter_folder_name)
        if not os.path.exists(chapter_path):
            os.makedirs(chapter_path)
            print(f"作成: 章フォルダ '{chapter_folder_name}'")

        # 節ファイルの作成
        section_index = 1
        for section_title in chapter.get("sections", []):
            # 節ファイル名の作成 (例: 01_情報爆発_AI格差.md)
            section_file_name = f"{section_index:02d}_{sanitize_filename(section_title)}.md"
            section_file_path = os.path.join(chapter_path, section_file_name)

            # ファイルを作成（内容は空）
            try:
                with open(section_file_path, 'w', encoding='utf-8') as f:
                    # Markdownの見出しとしてタイトルを書き込む (任意)
                    f.write(f"# {section_title}\n\n")
                print(f"  作成: 節ファイル '{section_file_name}'")
            except OSError as e:
                 print(f"  エラー: ファイル作成失敗 '{section_file_name}' - {e}")

            section_index += 1

        chapter_index = chapter_index + 1 if chapter["chapter_num_str"] != "エピローグ" else chapter_index # プロローグ/エピローグは章番号に含めず連番を継続
        # エピローグ用の章番号調整
        if chapter["chapter_num_str"] == "第7章":
             chapter_index = 8 # エピローグを08にするため


# --- 実行 ---
if __name__ == "__main__":
    # 指定されたパスに '書籍原稿' フォルダが作成されます
    create_structure(toc, base_dir="/Users/jrpj2010/vibe-coding/『AI超独学法：TANREN 3Dメソッドで切り拓く、新時代の学びと成長戦略』/書籍原稿")
    print("\nフォルダとファイルの構造生成が完了しました。") 