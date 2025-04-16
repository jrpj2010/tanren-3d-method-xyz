const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import the system prompt directly
const { SHOWA_MEIJI_SYSTEM_PROMPT } = require('../app/lib/api/showa-meiji-slide-prompt');

async function registerSystemPrompt() {
  console.log('Registering Showa-Meiji slide system prompt...');
  
  try {
    // Prepare the request data
    const promptData = {
      name: "明治・昭和モダンテイスト 3カラムスライドテンプレート",
      content: SHOWA_MEIJI_SYSTEM_PROMPT,
      isDefault: false
    };
    
    // Send the request to create the system prompt
    const response = await fetch('http://localhost:3000/api/system-prompts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promptData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to register prompt: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    console.log('Prompt registered successfully!');
    console.log('Prompt ID:', result.id);
    console.log('Prompt Name:', result.name);
    
    return result;
  } catch (error) {
    console.error('Error registering prompt:', error.message);
    // Special handling for conflict (prompt already exists)
    if (error.message.includes('同じ名前のプロンプトが既に存在します')) {
      console.log('Prompt with this name already exists. Proceeding with existing prompt.');
      return null;
    }
    throw error;
  }
}

// Create directory structure for slide outputs
function createDirectoryStructure() {
  console.log('Setting up directory structure for slide outputs...');
  
  // Create base directory if it doesn't exist
  const baseDir = path.join(process.cwd(), '昭和明治スライド');
  if (!fs.existsSync(baseDir)) {
    console.log('Creating base directory:', baseDir);
    fs.mkdirSync(baseDir);
  }
  
  // Create today's date directory
  const today = new Date();
  const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  const dateDir = path.join(baseDir, dateStr);
  
  if (!fs.existsSync(dateDir)) {
    console.log('Creating date directory:', dateDir);
    fs.mkdirSync(dateDir);
  } else {
    console.log('Date directory already exists:', dateDir);
  }
  
  return dateDir;
}

async function main() {
  try {
    // Register the system prompt
    const promptResult = await registerSystemPrompt();
    
    // Create directory structure
    const outputDir = createDirectoryStructure();
    
    console.log('\nSetup completed successfully!');
    console.log('Prompt is now registered and ready to use.');
    console.log('Output directory for slides:', outputDir);
    console.log('\nYou can now use this system prompt to generate slides.');
    
  } catch (error) {
    console.error('Error during setup:', error);
    process.exit(1);
  }
}

// Run the script
main(); 