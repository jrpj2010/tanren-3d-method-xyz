import fs from 'fs';
import path from 'path';
import { SlideData } from '../api/types';

/**
 * プロジェクトディレクトリを作成する関数
 */
export const createProjectDirectory = async (projectName: string): Promise<string> => {
  try {
    // プロジェクト名を安全なディレクトリ名に変換
    const safeProjectName = projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/g, '');
    const projectDir = path.join(process.cwd(), 'projects', `${safeProjectName}_${timestamp}`);
    
    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }
    
    return projectDir;
  } catch (error) {
    console.error('プロジェクトディレクトリの作成中にエラーが発生しました:', error);
    throw error;
  }
};

/**
 * SVGファイルを保存する関数
 */
export const saveSvgFile = async (
  projectDir: string,
  slideData: SlideData,
  svgContent: string,
  index: number
): Promise<string> => {
  try {
    // スライドのタイトルを安全なファイル名に変換
    const safeTitle = slideData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `slide_${index.toString().padStart(2, '0')}_${safeTitle}.svg`;
    const filePath = path.join(projectDir, fileName);
    
    // ファイルを書き込み
    fs.writeFileSync(filePath, svgContent, 'utf8');
    
    return filePath;
  } catch (error) {
    console.error('SVGファイルの保存中にエラーが発生しました:', error);
    throw error;
  }
};

/**
 * トークスクリプトファイルを保存する関数
 */
export const saveTalkScriptFile = async (
  projectDir: string,
  slidesData: SlideData[]
): Promise<string> => {
  try {
    const fileName = 'talk_scripts.md';
    const filePath = path.join(projectDir, fileName);
    
    // トークスクリプトの内容を生成
    let content = '# プレゼンテーショントークスクリプト\n\n';
    
    slidesData.forEach((slide, index) => {
      content += `## スライド ${index + 1}: ${slide.title}\n\n`;
      content += `${slide.talkScript}\n\n`;
    });
    
    // ファイルを書き込み
    fs.writeFileSync(filePath, content, 'utf8');
    
    return filePath;
  } catch (error) {
    console.error('トークスクリプトファイルの保存中にエラーが発生しました:', error);
    throw error;
  }
};

/**
 * 画像生成プロンプトファイルを保存する関数
 */
export const saveImagePromptsFile = async (
  projectDir: string,
  slidesData: SlideData[]
): Promise<string> => {
  try {
    const fileName = 'image_prompts.md';
    const filePath = path.join(projectDir, fileName);
    
    // 画像生成プロンプトの内容を生成
    let content = '# 画像生成AI用プロンプト\n\n';
    
    slidesData.forEach((slide, index) => {
      content += `## スライド ${index + 1}: ${slide.title}\n\n`;
      
      slide.imagePrompts.forEach((prompt, i) => {
        const position = i === 0 ? '左カラム' : i === 1 ? '中央カラム' : '右カラム';
        content += `### ${position}\n\`\`\`\n${prompt}\n\`\`\`\n\n`;
      });
    });
    
    // ファイルを書き込み
    fs.writeFileSync(filePath, content, 'utf8');
    
    return filePath;
  } catch (error) {
    console.error('画像生成プロンプトファイルの保存中にエラーが発生しました:', error);
    throw error;
  }
};

/**
 * 元の議事録テキストを保存する関数
 */
export const saveOriginalContent = async (
  projectDir: string,
  content: string
): Promise<string> => {
  try {
    const fileName = 'original_content.txt';
    const filePath = path.join(projectDir, fileName);
    
    // ファイルを書き込み
    fs.writeFileSync(filePath, content, 'utf8');
    
    return filePath;
  } catch (error) {
    console.error('元のコンテンツの保存中にエラーが発生しました:', error);
    throw error;
  }
}; 