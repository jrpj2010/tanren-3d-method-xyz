import os
import re

print("DEBUG: sho_.py is starting to execute")

def collect_md_for_single_chapter(current_scan_dir, chapter_root_dir):
    """
    Collects (relative_path_from_chapter_root, raw_content)
    for all .md files within current_scan_dir and its subdirectories.
    These paths are relative to the chapter_root_dir.
    """
    collected_files_data = []
    try:
        entries = sorted(os.listdir(current_scan_dir))
        for entry in entries:
            path = os.path.join(current_scan_dir, entry)
            if os.path.isdir(path):
                collected_files_data.extend(collect_md_for_single_chapter(path, chapter_root_dir))
            elif entry.endswith('.md'):
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        raw_content = f.read()
                    relative_path = os.path.relpath(path, chapter_root_dir)
                    collected_files_data.append((relative_path, raw_content))
                except Exception as e:
                    print(f"エラー (章内収集中): ファイル {path} を読み込めませんでした - {e}")
    except FileNotFoundError:
        print(f"エラー (章内収集中): ディレクトリ {current_scan_dir} が見つかりません。")
    except Exception as e:
        print(f"エラー (章内収集中): ディレクトリ {current_scan_dir} のリスト作成中にエラー - {e}")
    return collected_files_data

def process_book_directory(current_dir, book_root_path, workspace_output_path_for_chapters):
    """
    Recursively processes the book directory.
    - Aggregates content for the main fix.md.
    - Triggers creation of individual [chapter_number].md files.
    Returns a list of strings (markdown content formatted for fix.md).
    """
    all_md_content_for_fix = []
    
    try:
        entries = sorted(os.listdir(current_dir))
    except FileNotFoundError:
        print(f"エラー: ディレクトリ {current_dir} が見つかりません。処理をスキップします。")
        return all_md_content_for_fix
    except Exception as e:
        print(f"エラー: ディレクトリ {current_dir} のリスト作成中にエラー - {e}。処理をスキップします。")
        return all_md_content_for_fix

    for entry in entries:
        path = os.path.join(current_dir, entry)

        if os.path.isdir(path):
            is_direct_child_of_book_root = (os.path.dirname(path) == book_root_path)
            dir_name = os.path.basename(path)
            chapter_match = re.match(r"^(\d+)_.*", dir_name)

            if is_direct_child_of_book_root and chapter_match:
                chapter_number_str = chapter_match.group(1)
                print(f"処理中の章ディレクトリ: {dir_name}")

                chapter_files_data = collect_md_for_single_chapter(path, path)

                if chapter_files_data:
                    chapter_md_filename = f"{chapter_number_str}.md"
                    # workspace_output_path_for_chapters はワークスペースルートを指す
                    chapter_md_filepath = os.path.join(workspace_output_path_for_chapters, chapter_md_filename)
                    try:
                        with open(chapter_md_filepath, 'w', encoding='utf-8') as ch_outfile:
                            ch_outfile.write(f"# {dir_name}\n\n")
                            for rel_path_in_chapter, raw_content in chapter_files_data:
                                ch_outfile.write(f"## {rel_path_in_chapter}\n\n{raw_content}\n\n---\n\n")
                        print(f"章ファイル作成成功: {chapter_md_filepath}")
                    except Exception as e:
                        print(f"エラー: 章ファイル {chapter_md_filepath} に書き込めませんでした - {e}")

                for rel_path_in_chapter, raw_content in chapter_files_data:
                    path_for_fix_header = os.path.join(dir_name, rel_path_in_chapter)
                    all_md_content_for_fix.append(f"# {path_for_fix_header}\n\n{raw_content}\n\n---\n\n")
                    original_file_path = os.path.join(path, rel_path_in_chapter)
                    print(f"読み込み成功 (fix.md用): {original_file_path}")
            
            else:
                all_md_content_for_fix.extend(process_book_directory(path, book_root_path, workspace_output_path_for_chapters))
        
        elif entry.endswith('.md'):
            if current_dir == book_root_path and entry == 'structure.md':
                print(f"除外 (fix.md): {path}")
                continue
            # スクリプトファイル自身を処理対象から除外 (スクリプト名が .md で終わることはないはずだが念のため)
            if current_dir == book_root_path and entry == os.path.basename(__file__):
                 print(f"スクリプトファイル自身を除外: {path}")
                 continue

            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                relative_path_for_fix_header = os.path.relpath(path, book_root_path)
                all_md_content_for_fix.append(f"# {relative_path_for_fix_header}\n\n{content}\n\n---\n\n")
                print(f"読み込み成功 (fix.md用): {path}")
            except Exception as e:
                print(f"エラー: ファイル {path} を読み込めませんでした - {e}")
            
    return all_md_content_for_fix

if __name__ == '__main__':
    # スクリプトが置かれているディレクトリを取得 (これが書籍フォルダのルートになる)
    script_location_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 書籍フォルダのルートパス (target_book_directory)
    # スクリプトはこのフォルダ内にあるので、script_location_dir がそのまま書籍ルート
    target_book_directory = script_location_dir 
    
    # ワークスペースのルートパスを取得 (書籍フォルダの親ディレクトリ)
    workspace_root = os.path.dirname(target_book_directory)
    
    # メインのfix.mdの出力先 (ワークスペースルート)
    output_main_fix_md_file = os.path.join(workspace_root, "fix.md")

    # 章ごとの.mdファイルの出力先 (ワークスペースルート)
    chapters_output_path = workspace_root

    print(f"スクリプトの場所 (書籍ルート): {target_book_directory}")
    print(f"ワークスペースルート (出力先): {workspace_root}")
    print(f"fix.md 出力パス: {output_main_fix_md_file}")
    print(f"章ファイル出力パス: {chapters_output_path}")


    if not os.path.isdir(target_book_directory):
        # このケースはスクリプトが正しく配置されていれば通常発生しない
        print(f"エラー: スクリプトが置かれているはずの書籍ディレクトリが見つかりません - {target_book_directory}")
    else:
        all_contents_for_fix_md = process_book_directory(
            target_book_directory,      # current_dir starts at the book's root
            target_book_directory,      # book_root_path (base for relative paths in fix.md)
            chapters_output_path        # workspace_output_path_for_chapters
        )
        
        try:
            with open(output_main_fix_md_file, 'w', encoding='utf-8') as outfile:
                outfile.write("".join(all_contents_for_fix_md))
            print(f"\nメイン結合ファイル作成成功: {output_main_fix_md_file}")
        except Exception as e:
            print(f"エラー: メイン結合ファイル {output_main_fix_md_file} に書き込めませんでした - {e}")
