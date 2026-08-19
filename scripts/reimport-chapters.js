/**
 * Re-import chapters with paragraph separations
 * This script updates existing chapters in the database
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

/**
 * Parse chapter file and extract metadata
 */
function parseChapterFile(filename, content) {
  // Extract chapter number from filename
  const numberMatch = filename.match(/^(\d+)\./);
  const chapterNumber = numberMatch ? parseInt(numberMatch[1]) : 0;

  // Extract title from first line
  const lines = content.split('\n').filter(line => line.trim());
  const firstLine = lines[0] || '';

  // Handle both "第X回" and "正文 第X回" formats
  let titleMatch = firstLine.match(/第.+回\s+(.+)/);
  if (!titleMatch) {
    titleMatch = firstLine.match(/正文\s+第.+回\s+(.+)/);
  }
  const title = titleMatch ? titleMatch[1].trim() : firstLine;

  // Remove first line (title) and join content
  const contentLines = lines.slice(1);
  const fullContent = contentLines.join('\n');

  // Split into paragraphs (separated by empty lines)
  const paragraphs = fullContent
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return {
    number: chapterNumber,
    title,
    content: fullContent,
    paragraphs,
  };
}

/**
 * Import/Update all chapters
 */
async function importChapters() {
  const sourceDir = path.join(__dirname, '../src');

  console.log('📚 Starting chapter import from:', sourceDir);
  console.log('─'.repeat(60));

  // Check source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.error('❌ Source directory not found:', sourceDir);
    process.exit(1);
  }

  // Get all chapter files
  const files = fs.readdirSync(sourceDir)
    .filter(f => f.endsWith('.txt'))
    .sort((a, b) => {
      const numA = parseInt((a.match(/^(\d+)\./) || ['', '0'])[1]);
      const numB = parseInt((b.match(/^(\d+)\./) || ['', '0'])[1]);
      return numA - numB;
    });

  console.log(`Found ${files.length} chapter files`);

  let updated = 0;
  let created = 0;
  let errors = 0;

  for (const filename of files) {
    try {
      const filePath = path.join(sourceDir, filename);
      const content = fs.readFileSync(filePath, 'utf-8');
      const chapterData = parseChapterFile(filename, content);

      // Check if chapter exists
      const existing = await prisma.chapter.findUnique({
        where: { chapterNumber: chapterData.number },
      });

      if (existing) {
        // Update existing
        await prisma.chapter.update({
          where: { chapterNumber: chapterData.number },
          data: {
            title: {
              zh: chapterData.title,
              en: `Chapter ${chapterData.number}`,
            },
            content: {
              zh: chapterData.content,
            },
            summary: {
              zh: (chapterData.paragraphs[0] || '').substring(0, 200),
            },
            metadata: {
              paragraphCount: chapterData.paragraphs.length,
              characterCount: chapterData.content.length,
              filename: filename,
            },
          },
        });
        console.log(`🔄 Chapter ${chapterData.number}: Updated`);
        updated++;
      } else {
        // Create new
        await prisma.chapter.create({
          data: {
            chapterNumber: chapterData.number,
            title: {
              zh: chapterData.title,
              en: `Chapter ${chapterData.number}`,
            },
            content: {
              zh: chapterData.content,
            },
            summary: {
              zh: (chapterData.paragraphs[0] || '').substring(0, 200),
            },
            sourceId: 'romance-full',
            metadata: {
              paragraphCount: chapterData.paragraphs.length,
              characterCount: chapterData.content.length,
              filename: filename,
            },
          },
        });
        console.log(`✅ Chapter ${chapterData.number}: Created`);
        created++;
      }
    } catch (error) {
      console.error(`❌ Error with ${filename}:`, error.message);
      errors++;
    }
  }

  console.log('─'.repeat(60));
  console.log('📊 Summary:');
  console.log(`   🔄 Updated: ${updated}`);
  console.log(`   ✅ Created: ${created}`);
  console.log(`   ❌ Errors:  ${errors}`);
  console.log(`   📚 Total:   ${files.length}`);
  console.log('─'.repeat(60));
}

/**
 * Main
 */
async function main() {
  try {
    console.log('🚀 Three Kingdoms Chapter Re-Import');
    console.log('═'.repeat(60));

    await importChapters();

    console.log('═'.repeat(60));
    console.log('✨ Done!');
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
