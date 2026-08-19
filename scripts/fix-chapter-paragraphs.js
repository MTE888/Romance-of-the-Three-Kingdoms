/**
 * Fix Chapter Paragraph Separations
 *
 * This script converts single newlines between paragraphs to double newlines
 * so that the ChapterViewer can properly split and display paragraphs.
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../..', 'ThreeKingdoms_chapters_backup');
const OUTPUT_DIR = path.join(__dirname, '..', 'src');

/**
 * Process a chapter file to add proper paragraph separations
 */
function processChapterFile(content) {
  const lines = content.split('\n');
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Skip empty lines
    if (trimmedLine === '') {
      continue;
    }

    // Add the line
    result.push(line);

    // Add a blank line after each non-empty line (except the last)
    // This creates the double-newline separation between paragraphs
    if (i < lines.length - 1) {
      result.push('');
    }
  }

  return result.join('\n');
}

/**
 * Main function to process all chapter files
 */
function main() {
  console.log('📚 Chapter Paragraph Fix Script');
  console.log('═'.repeat(60));
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log('─'.repeat(60));

  // Check if source directory exists
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
  }

  // Get all chapter files
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => f.endsWith('.txt'))
    .sort((a, b) => {
      const numA = parseInt((a.match(/^(\d+)\./) || ['', '0'])[1]);
      const numB = parseInt((b.match(/^(\d+)\./) || ['', '0'])[1]);
      return numA - numB;
    });

  console.log(`Found ${files.length} chapter files`);
  console.log('─'.repeat(60));

  let processed = 0;
  let errors = 0;

  for (const filename of files) {
    try {
      const sourcePath = path.join(SOURCE_DIR, filename);
      const outputPath = path.join(OUTPUT_DIR, filename);

      // Read the source file
      const content = fs.readFileSync(sourcePath, 'utf-8');

      // Process the content
      const processedContent = processChapterFile(content);

      // Write to output
      fs.writeFileSync(outputPath, processedContent, 'utf-8');

      // Extract chapter number for display
      const chapterNum = (filename.match(/^(\d+)\./) || ['', '?'])[1];
      console.log(`✅ Chapter ${chapterNum}: processed`);
      processed++;
    } catch (error) {
      console.error(`❌ Error processing ${filename}:`, error.message);
      errors++;
    }
  }

  console.log('─'.repeat(60));
  console.log('📊 Summary:');
  console.log(`   ✅ Processed: ${processed}`);
  console.log(`   ❌ Errors:    ${errors}`);
  console.log(`   📚 Total:     ${files.length}`);
  console.log('═'.repeat(60));
  console.log('✨ Done!');
}

main();
