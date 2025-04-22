import os
import glob

# 対象ディレクトリとファイルの設定
target_dir = '/Users/jrpj2010/Downloads/AI伊藤羊一'
output_file = os.path.join(target_dir, 'youtube_fix.md')

# 入力ファイルパターンに一致するファイルの取得
input_files_pattern = os.path.join(target_dir, 'fix*.md')
input_files = sorted(glob.glob(input_files_pattern))

# fix001からfix024までのファイルをフィルタリング
filtered_files = []
for file in input_files:
    basename = os.path.basename(file)
    if basename.startswith('fix'):
        try:
            num = int(basename[3:6])
            if 1 <= num <= 24:
                filtered_files.append(file)
        except ValueError:
            continue

# ファイル番号でソート
filtered_files.sort(key=lambda x: int(os.path.basename(x)[3:6]))

# 結合処理
with open(output_file, 'w', encoding='utf-8') as outfile:
    for infile_path in filtered_files:
        infile_name = os.path.basename(infile_path)
        # コードブロック内にファイル名を追加
        outfile.write(f'```\n{infile_name}\n```\n')
        
        # ファイル内容の読み込みと書き込み
        try:
            with open(infile_path, 'r', encoding='utf-8') as infile:
                content = infile.read()
                outfile.write(content)
                outfile.write('\n')
        except Exception as e:
            print(f'Error reading file {infile_path}: {e}')

print(f'Successfully combined files into {output_file}') 