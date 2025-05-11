import os

def combine_markdown_files(root_dir, output_file, initial_root_dir):
    """
    指定されたディレクトリ内のすべての .md ファイルを再帰的に検索し、
    それらの内容を一つの出力ファイルに結合します。
    ルート直下の 'structure.md' は除外します。

    Args:
        root_dir (str): 現在処理中のディレクトリのパス。
        output_file (str): 結合された内容を書き込むファイルのパス。
        initial_root_dir (str): 最初に指定されたルートディレクトリのパス。
    """
    combined_content = []
    # ディレクトリ名でソートするために、まずディレクトリのリストを取得
    # 00_, 01_, ... のような命名規則を考慮してソートする
    entries = sorted(os.listdir(root_dir))

    for entry in entries:
        path = os.path.join(root_dir, entry)
        if os.path.isdir(path):
            # サブディレクトリを再帰的に処理
            # サブディレクトリ内の内容はそのまま追加
            combined_content.extend(combine_markdown_files(path, output_file, initial_root_dir))
        elif entry.endswith('.md'):
            # ルート直下の structure.md を除外
            if root_dir == initial_root_dir and entry == 'structure.md':
                print(f"除外: {path}")
                continue

            file_path = path
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # ファイルの相対パスをヘッダーとして使用
                    relative_path = os.path.relpath(file_path, initial_root_dir)
                    combined_content.append(f"# {relative_path}\n\n{content}\n\n---\n\n")
                print(f"読み込み成功: {file_path}")
            except Exception as e:
                print(f"エラー: {file_path} を読み込めませんでした - {e}")
    
    return combined_content

if __name__ == '__main__':
    # ユーザーのワークスペースパスと指定されたフォルダ名に基づいてパスを構築
    # このスクリプトはワークスペースのルートで実行されることを想定
    workspace_root = os.getcwd()
    target_directory = os.path.join(workspace_root, "『AI超独学法：TANREN 3Dメソッドで切り拓く、新時代の学びと成長戦略』")
    output_markdown_file = os.path.join(workspace_root, "fix.md")

    if not os.path.isdir(target_directory):
        print(f"エラー: 指定されたディレクトリが見つかりません - {target_directory}")
    else:
        # 初回呼び出し時に initial_root_dir を渡す
        all_contents = combine_markdown_files(target_directory, output_markdown_file, target_directory)
        
        try:
            with open(output_markdown_file, 'w', encoding='utf-8') as outfile:
                outfile.write("".join(all_contents))
            print(f"\n正常に処理が完了しました。出力ファイル: {output_markdown_file}")
        except Exception as e:
            print(f"エラー: {output_markdown_file} に書き込めませんでした - {e}")