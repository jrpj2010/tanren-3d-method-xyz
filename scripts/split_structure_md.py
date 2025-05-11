import os
import re

def sanitize_filename(name: str) -> str:
    # ファイル名に使えない文字を置換
    return re.sub(r'[\\/:"*?<>|]', '_', name)

def main():
    base_dir = "[超独学]最新スキル図鑑　ーAI×○○で最短・最速で成果を得る超効率勉強法ー"
    structure_md_path = os.path.join(base_dir, "structure.md")

    with open(structure_md_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # 章タイトルの正規表現パターン（例: ## 第1章 ... または # 第1章 ...）
    chapter_pattern = re.compile(r"^#{1,2}\s*(第\d+章[^\n]*)")
    # 節タイトルの正規表現パターン（例: ### 節タイトル）
    section_pattern = re.compile(r"^#{3,4}\s*(.+)")

    chapters = []
    for i, line in enumerate(lines):
        m = chapter_pattern.match(line)
        if m:
            chapters.append((i, m.group(1).strip()))

    # 最後の章の終わりはファイルの終わり
    chapters.append((len(lines), None))

    for idx in range(len(chapters) - 1):
        start_line = chapters[idx][0]
        end_line = chapters[idx + 1][0]
        chapter_title = chapters[idx][1]

        folder_name = sanitize_filename(chapter_title)
        folder_path = os.path.join(base_dir, folder_name)
        os.makedirs(folder_path, exist_ok=True)

        # 章内の行を取得
        chapter_lines = lines[start_line:end_line]

        # 節の開始行とタイトルを取得
        sections = []
        for i, line in enumerate(chapter_lines):
            m = section_pattern.match(line)
            if m:
                sections.append((i, m.group(1).strip()))
        # 節がなければ章全体をindex.mdに書く
        if not sections:
            md_path = os.path.join(folder_path, "index.md")
            with open(md_path, "w", encoding="utf-8") as f:
                f.writelines(chapter_lines)
            print(f"Created {md_path}")
            continue

        # 節の終わりは章の終わり
        sections.append((len(chapter_lines), None))

        for sidx in range(len(sections) - 1):
            s_start = sections[sidx][0]
            s_end = sections[sidx + 1][0]
            section_title = sections[sidx][1]

            section_filename = sanitize_filename(section_title) + ".md"
            section_path = os.path.join(folder_path, section_filename)

            section_lines = chapter_lines[s_start:s_end]

            with open(section_path, "w", encoding="utf-8") as f:
                f.writelines(section_lines)

            print(f"Created {section_path}")

if __name__ == "__main__":
    main()