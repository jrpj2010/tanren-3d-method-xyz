/**
 * Meeting Minutes Splitter Utility for Showa-Meiji Style Slides
 * 
 * This script splits meeting minutes into 5 logical sections optimized for 
 * presentation in the Showa-Meiji slide style. It uses intelligent content
 * analysis to create well-balanced, contextually coherent sections.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { SHOWA_MEIJI_USER_PROMPT } = require('../app/lib/api/showa-meiji-slide-prompt');
const { API_CONFIG } = require('../app/lib/api/config');

/**
 * Intelligently split meeting minutes into 5 logical sections
 * @param {string} text - The full meeting minutes text
 * @returns {Array} - An array of objects with title and content properties
 */
function splitMeetingMinutes(text) {
  // Detect main sections using headers with brackets like ## [Section Name]
  const sectionRegex = /^#+\s+\[(.+?)\]/gm;
  let match;
  const sections = [];
  const sectionMatches = [];
  
  // Find all section headers
  while ((match = sectionRegex.exec(text)) !== null) {
    sectionMatches.push({
      title: match[1].trim(),
      startPos: match.index,
      headerLength: match[0].length
    });
  }
  
  // If we found sections, use them as the basis for splitting
  if (sectionMatches.length > 0) {
    console.log(`Found ${sectionMatches.length} main sections in the minutes`);
    
    // Add end positions to each section
    for (let i = 0; i < sectionMatches.length; i++) {
      if (i < sectionMatches.length - 1) {
        sectionMatches[i].endPos = sectionMatches[i + 1].startPos;
      } else {
        sectionMatches[i].endPos = text.length;
      }
    }
    
    // Extract text for each section
    for (const section of sectionMatches) {
      const sectionText = text.substring(
        section.startPos,
        section.endPos
      );
      
      sections.push({
        title: section.title,
        content: sectionText
      });
    }
  } else {
    // If no clear sections, look for subsections or other patterns
    console.log('No main sections found. Looking for alternative structure...');
    
    // Try to find subsections with ### headers
    const subSectionRegex = /^###\s+(.+?):/gm;
    const subSections = [];
    let subMatch;
    
    while ((subMatch = subSectionRegex.exec(text)) !== null) {
      subSections.push({
        title: subMatch[1].trim(),
        startPos: subMatch.index,
        headerLength: subMatch[0].length
      });
    }
    
    if (subSections.length > 0) {
      console.log(`Found ${subSections.length} subsections`);
      
      // Add end positions to each subsection
      for (let i = 0; i < subSections.length; i++) {
        if (i < subSections.length - 1) {
          subSections[i].endPos = subSections[i + 1].startPos;
        } else {
          subSections[i].endPos = text.length;
        }
      }
      
      // Group subsections into 5 logical groups for our slides
      const groupSize = Math.ceil(subSections.length / 5);
      
      for (let i = 0; i < 5; i++) {
        const startIdx = i * groupSize;
        const endIdx = Math.min(startIdx + groupSize, subSections.length);
        
        if (startIdx < subSections.length) {
          const groupSubsections = subSections.slice(startIdx, endIdx);
          
          // Combine the text from all subsections in this group
          let groupContent = '';
          let mainTitle = '';
          
          // Use the first subsection title as the main title for this group
          mainTitle = groupSubsections[0].title;
          
          // Extract and combine text for all subsections in this group
          for (const subsection of groupSubsections) {
            groupContent += text.substring(
              subsection.startPos,
              subsection.endPos
            );
          }
          
          sections.push({
            title: mainTitle,
            content: groupContent
          });
        }
      }
    } else {
      // If still no clear structure, fall back to paragraph-based splitting
      console.log('No subsections found. Falling back to paragraph-based splitting.');
      
      // Split by paragraphs (multiple newlines)
      const paragraphs = text.split(/\n{2,}/);
      
      if (paragraphs.length > 0) {
        console.log(`Found ${paragraphs.length} paragraphs`);
        
        // Ensure we have exactly 5 sections
        const paragraphsPerSection = Math.ceil(paragraphs.length / 5);
        
        for (let i = 0; i < 5; i++) {
          const startIdx = i * paragraphsPerSection;
          const endIdx = Math.min(startIdx + paragraphsPerSection, paragraphs.length);
          
          if (startIdx < paragraphs.length) {
            const sectionParagraphs = paragraphs.slice(startIdx, endIdx);
            
            // Extract a title from the first paragraph
            let title = sectionParagraphs[0].split('\n')[0].trim();
            if (title.length > 50) {
              title = title.substring(0, 47) + '...';
            }
            
            sections.push({
              title: title,
              content: sectionParagraphs.join('\n\n')
            });
          }
        }
      }
    }
  }
  
  // If we have more than 5 sections, combine some
  if (sections.length > 5) {
    console.log(`Got ${sections.length} sections, combining to create 5 slides`);
    
    const mergedSections = [];
    const sectionsPerSlide = Math.ceil(sections.length / 5);
    
    for (let i = 0; i < 5; i++) {
      const startIdx = i * sectionsPerSlide;
      const endIdx = Math.min(startIdx + sectionsPerSlide, sections.length);
      
      if (startIdx < sections.length) {
        const slideSections = sections.slice(startIdx, endIdx);
        
        // Use first section's title as main title
        const mainTitle = slideSections[0].title;
        
        // Combine content from all sections
        let combinedContent = '';
        for (const section of slideSections) {
          combinedContent += section.content + '\n\n';
        }
        
        mergedSections.push({
          title: mainTitle,
          content: combinedContent
        });
      }
    }
    
    return mergedSections;
  } else if (sections.length < 5) {
    // If we have fewer than 5 sections, pad with empty ones
    console.log(`Only got ${sections.length} sections, adding placeholders to reach 5 slides`);
    
    while (sections.length < 5) {
      sections.push({
        title: `Additional Slide ${sections.length + 1}`,
        content: "No content available for this slide."
      });
    }
  }
  
  // Ensure we're returning exactly 5 sections
  return sections.slice(0, 5);
}

/**
 * Process text specifically for the TANREN meeting minutes
 * This function applies specialized processing for the meeting content
 * @param {string} text - The meeting minutes text
 * @returns {Array} - An array of 5 slide objects with title and content
 */
function processTanrenMeetingMinutes(text) {
  console.log('Applying specialized TANREN meeting minutes processing...');
  
  // This function implements a specific algorithm for TANREN meeting minutes
  // based on their unique structure
  
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

/**
 * Save the processed sections to individual text files
 * @param {Array} sections - Array of section objects with title and content
 * @param {string} outputDir - Directory to save the files
 * @returns {Array} - Array of saved file paths
 */
function saveSectionFiles(sections, outputDir) {
  const filePaths = [];
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const slideNumber = i + 1;
    const fileName = `slide_${slideNumber}_${section.title.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_')}.txt`;
    const filePath = path.join(outputDir, fileName);
    
    fs.writeFileSync(filePath, section.content);
    console.log(`Saved slide ${slideNumber} content to: ${filePath}`);
    
    filePaths.push(filePath);
  }
  
  return filePaths;
}

/**
 * Create output directory for intermediate files
 */
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
  
  // Create temp directory for intermediate files
  const tempDir = path.join(dateDir, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  
  return { dateDir, tempDir };
}

// If this script is run directly (not imported)
if (require.main === module) {
  // Get input from command line arguments or a file
  const args = process.argv.slice(2);
  let inputText = '';
  
  if (args.length > 0) {
    // If a file path is provided, read from the file
    const filePath = args[0];
    if (fs.existsSync(filePath)) {
      inputText = fs.readFileSync(filePath, 'utf8');
      console.log(`Read ${inputText.length} characters from ${filePath}`);
    } else {
      console.error(`Error: File ${filePath} not found`);
      process.exit(1);
    }
  } else {
    // Otherwise, read from stdin
    console.log('No input file provided. Please paste the meeting minutes text:');
    const stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
    inputText = stdinBuffer.toString();
  }
  
  if (!inputText) {
    console.error('Error: No input text provided');
    process.exit(1);
  }
  
  // Create output directories
  const { dateDir, tempDir } = createOutputDirectory();
  
  // Process the TANREN meeting minutes
  const sections = processTanrenMeetingMinutes(inputText);
  
  // Save the sections to files
  const sectionFiles = saveSectionFiles(sections, tempDir);
  
  console.log('\nProcessing complete!');
  console.log(`Created 5 slides from the meeting minutes.`);
  console.log(`Intermediate files saved in: ${tempDir}`);
  console.log(`\nNext steps:`);
  console.log(`1. Run the generate-showa-meiji-slide.js script for each section`);
  console.log(`2. Or use batch-generate-slides.js with the --input-dir option to process all sections`);
}

module.exports = {
  splitMeetingMinutes,
  processTanrenMeetingMinutes,
  saveSectionFiles
}; 