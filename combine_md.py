import os
import glob
import sys

# 対象ディレクトリと出力ファイル名
target_dir = 'AI森本千賀子/05_リンク集/'
output_file = 'AI森本千賀子/05_リンク集/fix01.md'

# 出力ファイル自身のパス (結合対象から除外するため)
output_file_abs_path = os.path.abspath(output_file)

# 対象ディレクトリ内の .md ファイルをリストアップ (出力ファイル自身は除外)
md_files = sorted([f for f in glob.glob(os.path.join(target_dir, '*.md')) if os.path.abspath(f) != output_file_abs_path])

if not md_files:
    print(f"No .md files found in {target_dir} (excluding the output file itself).")
    sys.exit(0)

print(f"Found {len(md_files)} markdown files to combine:")
for f in md_files:
    print(f"- {os.path.basename(f)}")

# 出力ファイルを開く (書き込みモード、UTF-8エンコーディング)
try:
    with open(output_file, 'w', encoding='utf-8') as outfile:
        # 各 .md ファイルを処理
        for i, filename in enumerate(md_files):
            # ファイル名を出力ファイルに書き込む (区切りとして)
            # 最初のファイル以外は前に改行と区切り線を入れる
            if i > 0:
                outfile.write(f"\n\n---\n\n")
            outfile.write(f"# Source: {os.path.basename(filename)}\n\n")
            # .md ファイルを開いて内容を読み込み、出力ファイルに追記
            try:
                with open(filename, 'r', encoding='utf-8') as infile:
                    outfile.write(infile.read())
            except Exception as e:
                print(f"Error reading file {filename}: {e}", file=sys.stderr)
                outfile.write(f"\n\n[Error reading file: {os.path.basename(filename)} - {e}]\n\n") # エラー情報をファイルにも記録

    print(f"\nSuccessfully combined {len(md_files)} files into {output_file}")

except Exception as e:
    print(f"Error writing to output file {output_file}: {e}", file=sys.stderr)
    sys.exit(1)