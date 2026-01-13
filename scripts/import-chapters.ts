import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface ChapterData {
  number: number;
  title: string;
  content: string;
  paragraphs: string[];
}

/**
 * Parse chapter file and extract metadata
 */
function parseChapterFile(filename: string, content: string): ChapterData {
  // Extract chapter number from filename (e.g., "1.宴桃园豪杰三结义 斩黄巾英雄首立功.txt")
  const numberMatch = filename.match(/^(\d+)\./);
  const chapterNumber = numberMatch ? parseInt(numberMatch[1]) : 0;

  // Extract title from first line (e.g., "第一回 宴桃园豪杰三结义 斩黄巾英雄首立功")
  const lines = content.split('\n').filter(line => line.trim());
  const firstLine = lines[0] || '';
  const titleMatch = firstLine.match(/第.+回\s+(.+)/);
  const title = titleMatch ? titleMatch[1].trim() : firstLine;

  // Remove first line (title) and split into paragraphs
  const contentLines = lines.slice(1);
  const fullContent = contentLines.join('\n');

  // Split into paragraphs (separated by empty lines or indentation)
  const paragraphs = contentLines
    .join('\n')
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
 * Import all chapters from source directory
 */
async function importChapters() {
  const sourceDir = path.join(__dirname, '../src');

  console.log('📚 Starting chapter import from:', sourceDir);
  console.log('─'.repeat(60));

  // Read all chapter files
  const files = fs.readdirSync(sourceDir)
    .filter(f => f.endsWith('.txt'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/^(\d+)\./)?.[1] || '0');
      const numB = parseInt(b.match(/^(\d+)\./)?.[1] || '0');
      return numA - numB;
    });

  console.log(`Found ${files.length} chapter files`);

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const filename of files) {
    try {
      const filePath = path.join(sourceDir, filename);
      const content = fs.readFileSync(filePath, 'utf-8');
      const chapterData = parseChapterFile(filename, content);

      // Check if chapter already exists
      const existing = await prisma.chapter.findUnique({
        where: { chapterNumber: chapterData.number },
      });

      if (existing) {
        console.log(`⏭️  Chapter ${chapterData.number}: Already exists, skipping`);
        skipped++;
        continue;
      }

      // Create chapter
      await prisma.chapter.create({
        data: {
          chapterNumber: chapterData.number,
          title: {
            zh: chapterData.title,
            en: `Chapter ${chapterData.number}`, // English translation would be added later
          },
          content: {
            zh: chapterData.content,
          },
          summary: {
            zh: chapterData.paragraphs[0]?.substring(0, 200) || '', // First paragraph as summary
          },
          sourceId: 'romance-full', // Assuming this source exists
          metadata: {
            paragraphCount: chapterData.paragraphs.length,
            characterCount: chapterData.content.length,
            filename: filename,
          },
        },
      });

      console.log(`✅ Chapter ${chapterData.number}: ${chapterData.title}`);
      imported++;
    } catch (error) {
      console.error(`❌ Error importing ${filename}:`, error);
      errors++;
    }
  }

  console.log('─'.repeat(60));
  console.log('📊 Import Summary:');
  console.log(`   ✅ Imported: ${imported}`);
  console.log(`   ⏭️  Skipped:  ${skipped}`);
  console.log(`   ❌ Errors:   ${errors}`);
  console.log(`   📚 Total:    ${files.length}`);
  console.log('─'.repeat(60));
}

/**
 * Create Romance source if it doesn't exist
 */
async function ensureRomanceSource() {
  const existing = await prisma.source.findUnique({
    where: { id: 'romance-full' },
  });

  if (!existing) {
    console.log('📖 Creating Romance of Three Kingdoms source...');
    await prisma.source.create({
      data: {
        id: 'romance-full',
        title: {
          zh: '三国演义',
          en: 'Romance of the Three Kingdoms',
        },
        author: {
          zh: '罗贯中',
          en: 'Luo Guanzhong',
        },
        type: 'LITERARY',
        publicationYear: 1522,
        reliability: 'fiction',
        language: 'zh',
        metadata: {
          dynasty: 'Ming',
          genre: 'Historical Fiction',
          chapterCount: 120,
        },
      },
    });
    console.log('✅ Romance source created');
  }
}

/**
 * Main import function
 */
async function main() {
  try {
    console.log('🚀 Three Kingdoms Chapter Import');
    console.log('═'.repeat(60));

    // Ensure source exists
    await ensureRomanceSource();

    // Import chapters
    await importChapters();

    console.log('═'.repeat(60));
    console.log('✨ Import complete!');
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run import
main();
