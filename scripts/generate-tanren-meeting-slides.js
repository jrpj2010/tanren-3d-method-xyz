#!/usr/bin/env node

/**
 * TANREN Meeting Minutes to Showa-Meiji Style Slides Generator
 * 
 * This script takes TANREN meeting minutes, intelligently splits them into 5 sections,
 * and generates beautiful Showa-Meiji style SVG slides for each section.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 相対パスを修正して直接ファイルを読み込む
const showaPromptPath = path.join(__dirname, '..', 'app', 'lib', 'api', 'showa-meiji-slide-prompt.ts');
const configPath = path.join(__dirname, '..', 'app', 'lib', 'api', 'config.ts');

// TypeScriptファイルを直接読み込んでパースする
function loadTsExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const exportMatches = {};
  
  // 正規表現でexportされている定数を探す
  const exportRegex = /export\s+const\s+([A-Za-z0-9_]+)\s*=\s*(`[\s\S]*?`|'[\s\S]*?'|"[\s\S]*?"|\{[\s\S]*?\});/g;
  let match;
  
  while ((match = exportRegex.exec(content)) !== null) {
    const name = match[1];
    let value = match[2];
    
    try {
      // オブジェクトリテラルの場合
      if (value.startsWith('{') && value.endsWith('}')) {
        value = eval(`(${value})`);
      } 
      // テンプレートリテラルの場合
      else if (value.startsWith('`') && value.endsWith('`')) {
        value = value.slice(1, -1); // バッククォートを取り除く
      }
      // 通常の文字列の場合
      else if ((value.startsWith('"') && value.endsWith('"')) || 
               (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1); // クォートを取り除く
      }
      
      exportMatches[name] = value;
    } catch (e) {
      console.error(`Error parsing export ${name}:`, e);
    }
  }
  
  return exportMatches;
}

// TypeScriptファイルから必要な変数をロード
const showaExports = loadTsExports(showaPromptPath);
const configExports = loadTsExports(configPath);

// 必要な変数を取得
const SHOWA_MEIJI_USER_PROMPT = showaExports.SHOWA_MEIJI_USER_PROMPT;
const API_CONFIG = configExports.API_CONFIG || {
  CLAUDE_MODEL: 'claude-3-7-sonnet-20250219',
  MAX_TOKENS_TO_SAMPLE: 100000
};

// splitのモジュールをインラインで実装
function processTanrenMeetingMinutes(text) {
  console.log('Applying specialized TANREN meeting minutes processing...');
  
  // Create 5 logical sections based on the meeting content
  const slides = [
    {
      title: "定例会議 要旨とプレゼン甲子園準備状況",
      content: ""
    },
    {
      title: "プレゼン甲子園の実施計画詳細",
      content: ""
    },
    {
      title: "進捗状況とシステムアップデート",
      content: ""
    },
    {
      title: "AI技術動向とTANRENへの応用",
      content: ""
    },
    {
      title: "TANREN Ver9.0 開発計画",
      content: ""
    }
  ];
  
  // First, extract the meeting summary from the top
  const summaryMatch = text.match(/^### 議事の要旨:[\s\S]+?(?=\n## \[|\n$)/);
  if (summaryMatch) {
    slides[0].content += summaryMatch[0] + "\n\n";
  }
  
  // Extract the operations and maintenance section
  const opMaintenanceMatch = text.match(/## \[.*運用・保守問い合わせ.*\][\s\S]+?(?=\n## \[|\n$)/);
  if (opMaintenanceMatch) {
    slides[0].content += opMaintenanceMatch[0] + "\n\n";
  }
  
  // Extract the Presentation Contest section
  const presentationContestMatch = text.match(/## \[.*プレゼン甲子園.*\][\s\S]+?(?=\n### 初期登録ユーザー:|\n## \[|\n$)/);
  if (presentationContestMatch) {
    slides[1].content += presentationContestMatch[0] + "\n\n";
  }
  
  // Extract the User Registration section
  const userRegistrationMatch = text.match(/### 初期登録ユーザー:[\s\S]+?(?=\n### 評価プロセス:|\n## \[|\n$)/);
  if (userRegistrationMatch) {
    slides[1].content += userRegistrationMatch[0] + "\n\n";
  }
  
  // Extract the Evaluation Process section
  const evaluationProcessMatch = text.match(/### 評価プロセス:[\s\S]+?(?=\n### 進捗状況とTODO:|\n## \[|\n$)/);
  if (evaluationProcessMatch) {
    slides[2].content += evaluationProcessMatch[0] + "\n\n";
  }
  
  // Extract the Progress and TODO section
  const progressTodoMatch = text.match(/### 進捗状況とTODO:[\s\S]+?(?=\n### 福井県からのフィードバック連携|\n## \[|\n$)/);
  if (progressTodoMatch) {
    slides[2].content += progressTodoMatch[0] + "\n\n";
  }
  
  // Extract the Fukui Feedback section
  const fukuiFeedbackMatch = text.match(/### 福井県からのフィードバック連携[\s\S]+?(?=\n## \[|\n$)/);
  if (fukuiFeedbackMatch) {
    slides[2].content += fukuiFeedbackMatch[0] + "\n\n";
  }
  
  // Extract the AI Trends section
  const aiTrendsMatch = text.match(/## \[.*AI関連の動向.*\][\s\S]+?(?=\n## \[|\n$)/);
  if (aiTrendsMatch) {
    slides[3].content += aiTrendsMatch[0] + "\n\n";
  }
  
  // Extract the TANREN Ver9.0 Development Plan section
  const developmentPlanMatch = text.match(/## \[.*TANREN Ver8\.1以降.*\][\s\S]+?(?=\n## \[|\n$)/);
  if (developmentPlanMatch) {
    slides[4].content += developmentPlanMatch[0] + "\n\n";
  }
  
  // Extract the Next Meeting section
  const nextMeetingMatch = text.match(/## \[.*次回定例.*\][\s\S]+/);
  if (nextMeetingMatch) {
    slides[4].content += nextMeetingMatch[0];
  }
  
  // Add specialized titles to enrich the content
  slides[0].title = "TANREN定例会議: 要旨とプロジェクト状況";
  slides[1].title = "プレゼン甲子園: エントリー管理とユーザー設定";
  slides[2].title = "システム実装進捗: 評価フローと一括チーム申請";
  slides[3].title = "AI技術動向: Gemini 1.5 Proと動画評価能力";
  slides[4].title = "TANREN Ver9.0: RAG・ビジュアル評価・AIスコア開発計画";
  
  return slides;
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get API key
function getApiKey() {
  // Try to get API key from environment variables
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) {
    return apiKey;
  }
  
  return new Promise((resolve) => {
    rl.question('Please enter your Anthropic API key: ', (answer) => {
      resolve(answer.trim());
    });
  });
}

// Function to get input text from user or file
function getInputText(inputFile = null) {
  return new Promise((resolve) => {
    if (inputFile && fs.existsSync(inputFile)) {
      const text = fs.readFileSync(inputFile, 'utf8');
      resolve(text);
      return;
    }
    
    console.log('請議事録内容を入力してください (Ctrl+D または Ctrl+Z で終了):');
    let inputText = '';
    
    process.stdin.on('data', (chunk) => {
      inputText += chunk;
    });
    
    process.stdin.on('end', () => {
      resolve(inputText.trim());
      // Re-create readline interface as it gets closed when stdin ends
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    });
  });
}

// Function to generate slide using Anthropic API
async function generateSlide(apiKey, inputText, slideNumber, totalSlides, slideTitle) {
  console.log(`スライド ${slideNumber}/${totalSlides} 生成中: "${slideTitle}"...`);
  
  // Prepare the context for this slide
  const slideContext = `
このスライドは${totalSlides}枚構成の${slideNumber}枚目です。
スライドのタイトル: "${slideTitle}"

以下の内容をスライドに変換してください:
`;
  
  // Replace placeholder in system prompt and add context
  const userPrompt = SHOWA_MEIJI_USER_PROMPT.replace('{入力テキスト}', slideContext + inputText);
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: API_CONFIG.CLAUDE_MODEL,
        max_tokens: API_CONFIG.MAX_TOKENS_TO_SAMPLE,
        temperature: 0.7,
        system: "You are an expert at creating beautiful SVG slides in the Meiji-Showa modern style. Follow the user's instructions precisely and output exactly in the requested JSON format with full SVG code.",
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API request failed with status ${response.status}: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error(`Error generating slide ${slideNumber}:`, error);
    throw error;
  }
}

// Function to extract JSON from Claude's response
function extractJsonFromResponse(response) {
  try {
    // Try to extract JSON from code blocks
    const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    
    // If no code blocks, try to parse directly (Claude might return just JSON)
    return JSON.parse(response);
  } catch (error) {
    console.error('Error extracting JSON from response:', error);
    console.log('Response received:', response.substring(0, 500) + '...');
    throw new Error('Failed to extract valid JSON from the API response');
  }
}

// Function to save slide to a file
function saveSlide(slide, outputDir, slideNumber, totalSlides) {
  try {
    // Create file name based on slide number and title
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTitle = slide.title.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
    const fileNameBase = `${timestamp}_${slideNumber.toString().padStart(2, '0')}_of_${totalSlides}_${sanitizedTitle}`;
    
    // Save SVG
    const svgFilePath = path.join(outputDir, `${fileNameBase}.svg`);
    fs.writeFileSync(svgFilePath, slide.svg);
    
    // Save metadata (talk script and image prompts)
    const metadataFilePath = path.join(outputDir, `${fileNameBase}_metadata.json`);
    const metadata = {
      title: slide.title,
      talkScript: slide.talkScript,
      imagePrompts: slide.imagePrompts
    };
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));
    
    return { svgFilePath, metadataFilePath };
  } catch (error) {
    console.error(`Error saving slide ${slideNumber}:`, error);
    throw error;
  }
}

// Function to create output directory
function createOutputDirectory() {
  // Create base directory if it doesn't exist
  const baseDir = path.join(process.cwd(), '昭和明治スライド');
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
  }
  
  // Create today's date directory
  const today = new Date();
  const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  const dateDir = path.join(baseDir, dateStr);
  
  if (!fs.existsSync(dateDir)) {
    fs.mkdirSync(dateDir);
  }
  
  return dateDir;
}

// Main function
async function main() {
  try {
    console.log('TANREN会議議事録 → 明治・昭和モダンテイストスライド生成ツール');
    console.log('-----------------------------------------------------');
    
    // Process command line arguments
    const args = process.argv.slice(2);
    let inputFile = null;
    
    // Check for input file argument
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--input-file' || args[i] === '-f') {
        inputFile = args[i + 1];
        break;
      }
    }
    
    // Get API key
    const apiKey = await getApiKey();
    if (!apiKey) {
      console.error('Error: API key is required');
      process.exit(1);
    }
    
    // Get input text
    const inputText = await getInputText(inputFile);
    if (!inputText) {
      console.error('Error: 議事録内容が入力されていません');
      process.exit(1);
    }
    
    console.log('\n議事録内容を分析して最適な5枚のスライドに分割します...');
    
    // Process the meeting minutes into 5 logical sections
    const sections = processTanrenMeetingMinutes(inputText);
    console.log(`議事録を以下の5つのセクションに分割しました:`);
    for (let i = 0; i < sections.length; i++) {
      console.log(`${i + 1}. ${sections[i].title}`);
    }
    
    // Create output directory
    const outputDir = createOutputDirectory();
    console.log(`\n出力ディレクトリ: ${outputDir}`);
    
    // Generate and save slides
    const results = [];
    for (let i = 0; i < sections.length; i++) {
      const slideNumber = i + 1;
      const section = sections[i];
      
      // Generate slide
      const response = await generateSlide(
        apiKey, 
        section.content, 
        slideNumber, 
        sections.length,
        section.title
      );
      
      // Extract JSON from response
      const slide = extractJsonFromResponse(response);
      
      // Save slide
      const result = saveSlide(slide, outputDir, slideNumber, sections.length);
      results.push(result);
      
      console.log(`\nスライド ${slideNumber}/${sections.length} 生成完了!`);
      console.log(`タイトル: ${slide.title}`);
      console.log(`SVGファイル: ${path.basename(result.svgFilePath)}`);
      console.log(`メタデータ: ${path.basename(result.metadataFilePath)}`);
    }
    
    console.log('\n全スライド生成完了!');
    console.log(`出力ディレクトリ: ${outputDir}`);
    console.log(`生成したスライド数: ${results.length}`);
    
    // Close readline interface
    rl.close();
  } catch (error) {
    console.error('エラーが発生しました:', error.message);
    process.exit(1);
  }
}

// Run the script
main(); 