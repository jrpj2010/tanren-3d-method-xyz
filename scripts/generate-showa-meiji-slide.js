const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { SHOWA_MEIJI_USER_PROMPT } = require('../app/lib/api/showa-meiji-slide-prompt');
const { API_CONFIG } = require('../app/lib/api/config');

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

// Function to get input text from user
function getInputText() {
  return new Promise((resolve) => {
    rl.question('Please enter or paste the text you want to convert to a slide (press Enter followed by Ctrl+D to finish):\n', () => {
      console.log('Type your input text (press Ctrl+D or Ctrl+Z on Windows to finish):');
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
  });
}

// Function to generate slide using Anthropic API
async function generateSlide(apiKey, inputText) {
  console.log('Generating slide...');
  
  // Replace placeholder in system prompt
  const userPrompt = SHOWA_MEIJI_USER_PROMPT.replace('{入力テキスト}', inputText);
  
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
    console.error('Error generating slide:', error);
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
    console.log('Response received:', response);
    throw new Error('Failed to extract valid JSON from the API response');
  }
}

// Function to save slide to a file
function saveSlide(slide, outputDir) {
  try {
    // Create file name based on title and timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedTitle = slide.title.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
    const fileNameBase = `${timestamp}_${sanitizedTitle}`;
    
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
    console.error('Error saving slide:', error);
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
    console.log('明治・昭和モダンテイストスライド生成ツール');
    console.log('----------------------------------------');
    
    // Get API key
    const apiKey = await getApiKey();
    if (!apiKey) {
      console.error('Error: API key is required');
      process.exit(1);
    }
    
    // Get input text
    console.log('\n入力テキストを入力してください:');
    const inputText = await getInputText();
    if (!inputText) {
      console.error('Error: Input text is required');
      process.exit(1);
    }
    
    // Create output directory
    const outputDir = createOutputDirectory();
    
    // Generate slide
    const response = await generateSlide(apiKey, inputText);
    
    // Extract JSON from response
    const slide = extractJsonFromResponse(response);
    
    // Save slide
    const { svgFilePath, metadataFilePath } = saveSlide(slide, outputDir);
    
    console.log('\nスライド生成完了!');
    console.log('SVGファイル:', svgFilePath);
    console.log('メタデータファイル:', metadataFilePath);
    
    // Close readline interface
    rl.close();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main(); 