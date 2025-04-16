import PyPDF2
import os
import sys

def extract_text_from_pdf(pdf_path, output_path=None):
    """
    PDFからテキストを抽出し、指定されたファイルに保存する
    """
    # PDFファイルが存在するか確認
    if not os.path.exists(pdf_path):
        print(f"Error: ファイル '{pdf_path}' が見つかりません。")
        return

    try:
        # PDFファイルを開く
        with open(pdf_path, 'rb') as file:
            # PyPDF2のPdfReaderオブジェクトを作成
            pdf_reader = PyPDF2.PdfReader(file)
            
            # ページ数を取得
            num_pages = len(pdf_reader.pages)
            print(f"PDFのページ数: {num_pages}")
            
            # 全ページからテキストを抽出
            text = ""
            for page_num in range(num_pages):
                page = pdf_reader.pages[page_num]
                text += page.extract_text() + "\n\n"
            
            # 出力先が指定されていない場合は、PDFと同じ名前でテキストファイルを作成
            if output_path is None:
                base_name = os.path.splitext(pdf_path)[0]
                output_path = f"{base_name}.txt"
            
            # テキストをファイルに書き込む
            with open(output_path, 'w', encoding='utf-8') as output_file:
                output_file.write(text)
            
            print(f"テキスト抽出が完了しました。出力ファイル: {output_path}")
            return text
    
    except Exception as e:
        print(f"エラーが発生しました: {e}")

if __name__ == "__main__":
    # コマンドライン引数からPDFのパスを取得
    if len(sys.argv) > 1:
        pdf_path = sys.argv[1]
        output_path = sys.argv[2] if len(sys.argv) > 2 else None
        extract_text_from_pdf(pdf_path, output_path)
    else:
        print("使用方法: python extract_pdf.py <PDFファイルのパス> [出力テキストファイルのパス]") 