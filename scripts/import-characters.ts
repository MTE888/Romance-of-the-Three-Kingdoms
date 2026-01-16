#!/usr/bin/env tsx
/**
 * Character Import Script
 *
 * Imports 81 character profiles from JSON files into PostgreSQL database
 * via Prisma ORM. Maps the character JSON structure to the Prisma schema.
 *
 * Usage:
 *   tsx scripts/import-characters.ts [--dry-run] [--limit N]
 *
 * Options:
 *   --dry-run   Show what would be imported without writing to database
 *   --limit N   Only import first N characters (for testing)
 */

import { PrismaClient, Kingdom } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface CharacterJSON {
  name: string;
  courtesyName: string | null;
  pseudonym: string | null;
  aliase: Array<{ name: string; desc: string | null }> | null;
  infantName: string | null;
  gender: number; // 1 = male, 0 = female
  avatar: string | null;
  faction: string;
  birthdate: string | null;
  birthplace: string | null;
  birthplacePresentDay: string | null;
  deathdate: string | null;
  deathplace: string | null;
  deathplacePresentDay: string | null;
  tenure: string | null;
  position: string[] | null;
  peerage: string | null;
  enfeoffment: string | null;
  monarch: string | null;
  posthumousName: string[] | null;
  templeName: string[] | null;
  historicalBriefIIntroduction: string;
  novelisticBriefIIntroduction: string;
  family: {
    father?: { character: Array<{ name: string; desc: string | null }>; desc: string | null };
    mother?: { character: Array<{ name: string; desc: string | null }>; desc: string | null };
    brothers?: { character: Array<{ name: string; desc: string | null }>; desc: string | null };
    sisters?: { character: Array<{ name: string; desc: string | null }>; desc: string | null };
    spouse?: { character: Array<{ name: string; desc: string }>; desc: string | null };
    sons?: { character: Array<{ name: string; desc: string }>; desc: string | null };
    daughters?: { character: Array<{ name: string; desc: string | null }>; desc: string | null };
  };
  historicalEvaluations?: string[];
}

// ============================================================================
// MAPPING FUNCTIONS
// ============================================================================

/**
 * Map faction string to Kingdom enum
 */
function mapFactionToKingdom(faction: string): Kingdom {
  const factionMap: Record<string, Kingdom> = {
    '魏': Kingdom.WEI,
    '魏国': Kingdom.WEI,
    '曹魏': Kingdom.WEI,
    '蜀': Kingdom.SHU,
    '蜀国': Kingdom.SHU,
    '蜀汉': Kingdom.SHU,
    '吴': Kingdom.WU,
    '吴国': Kingdom.WU,
    '东吴': Kingdom.WU,
    '汉': Kingdom.HAN,
    '汉朝': Kingdom.HAN,
    '东汉': Kingdom.HAN,
  };

  return factionMap[faction] || Kingdom.OTHER;
}

/**
 * Extract year from Chinese date string
 * Examples: "161年", "223年6月10日", "公元220年"
 */
function extractYear(dateStr: string | null): number | null {
  if (!dateStr) return null;

  // Match patterns like "161年", "公元220年", "223年6月10日"
  const yearMatch = dateStr.match(/(\d{1,4})年/);
  if (yearMatch) {
    return parseInt(yearMatch[1], 10);
  }

  return null;
}

/**
 * Create multilingual JSON object
 */
function createMultilingualJson(zh: string, en?: string): { zh: string; en?: string } {
  const result: { zh: string; en?: string } = { zh };
  if (en) result.en = en;
  return result;
}

/**
 * Transform character JSON to Prisma format
 */
function transformCharacter(char: CharacterJSON) {
  // Map kingdom
  const kingdom = mapFactionToKingdom(char.faction);

  // Extract years
  const birthYear = extractYear(char.birthdate);
  const deathYear = extractYear(char.deathdate);

  // Create canonical name
  const canonicalName = createMultilingualJson(char.name);

  // Create courtesy name if present
  const courtesyName = char.courtesyName ? createMultilingualJson(char.courtesyName) : null;

  // Create aliases array
  const aliases = char.aliase
    ? char.aliase.map(a => createMultilingualJson(a.name))
    : [];

  // Add other names as aliases
  if (char.pseudonym) {
    aliases.push(createMultilingualJson(char.pseudonym));
  }
  if (char.infantName) {
    aliases.push(createMultilingualJson(char.infantName));
  }

  // Create historical profile (from 三国志)
  const historicalProfile = {
    summary: {
      zh: char.historicalBriefIIntroduction || '',
    },
    birthplace: char.birthplace || null,
    birthplacePresentDay: char.birthplacePresentDay || null,
    deathplace: char.deathplace || null,
    deathplacePresentDay: char.deathplacePresentDay || null,
    positions: char.position || [],
    posthumousName: char.posthumousName || [],
    templeName: char.templeName || [],
    tenure: char.tenure || null,
    sources: ['三国志'], // Historical record source
  };

  // Create literary profile (from 三国演义)
  const literaryProfile = {
    summary: {
      zh: char.novelisticBriefIIntroduction || '',
    },
    sources: ['三国演义'], // Novel source
  };

  // Prepare images array
  const images = char.avatar
    ? [{
        url: char.avatar.replace('./images/', '/avatars/'),
        caption: createMultilingualJson(`${char.name}像`, `Portrait of ${char.name}`),
        source: 'fthux/Characters_of_the_Three_Kingdoms',
      }]
    : [];

  // Prepare quotes array from historical evaluations
  const quotes = char.historicalEvaluations
    ? char.historicalEvaluations.map(evaluation => ({
        text: { zh: evaluation },
        context: createMultilingualJson('历史评价', 'Historical Evaluation'),
        source: '三国志等史书',
      }))
    : [];

  // Extract occupations from positions
  const occupations = char.position || [];

  return {
    canonicalName,
    courtesyName,
    aliases,
    birthYear,
    deathYear,
    birthLocationId: null, // We'll link locations later
    kingdom,
    socialClass: null, // Could infer from positions
    occupations,
    historicalProfile,
    literaryProfile,
    biography: null, // Could create from profiles
    images,
    quotes,
    verified: true, // Data from reputable source
    verificationNotes: 'Imported from fthux/Characters_of_the_Three_Kingdoms repository',
    eventParticipations: [],
  };
}

// ============================================================================
// IMPORT FUNCTIONS
// ============================================================================

/**
 * Read all character JSON files
 */
async function readCharacterFiles(): Promise<CharacterJSON[]> {
  const charactersDir = path.join(
    process.cwd(),
    'data/sources/structured/three-kingdoms-characters/characters'
  );

  const files = await fs.promises.readdir(charactersDir);
  const jsonFiles = files.filter(f => f.endsWith('.json'));

  console.log(`Found ${jsonFiles.length} character JSON files`);

  const characters: CharacterJSON[] = [];

  for (const file of jsonFiles) {
    const filePath = path.join(charactersDir, file);
    const content = await fs.promises.readFile(filePath, 'utf-8');
    const character = JSON.parse(content) as CharacterJSON;
    characters.push(character);
  }

  return characters;
}

/**
 * Import characters to database
 */
async function importCharacters(options: { dryRun: boolean; limit?: number }) {
  console.log('🚀 Starting character import...\n');

  // Read character files
  const characters = await readCharacterFiles();

  // Apply limit if specified
  const charactersToImport = options.limit
    ? characters.slice(0, options.limit)
    : characters;

  console.log(`Importing ${charactersToImport.length} characters...`);

  if (options.dryRun) {
    console.log('\n🔍 DRY RUN MODE - No database changes will be made\n');
  }

  let successCount = 0;
  let errorCount = 0;

  for (const char of charactersToImport) {
    try {
      const transformedChar = transformCharacter(char);

      if (options.dryRun) {
        console.log(`✓ Would import: ${char.name} (${char.faction})`);
        console.log(`  - Kingdom: ${transformedChar.kingdom}`);
        console.log(`  - Birth Year: ${transformedChar.birthYear || 'Unknown'}`);
        console.log(`  - Death Year: ${transformedChar.deathYear || 'Unknown'}`);
        console.log(`  - Positions: ${transformedChar.occupations.join(', ') || 'None'}`);
      } else {
        // Insert into database
        await prisma.character.create({
          data: transformedChar,
        });

        console.log(`✅ Imported: ${char.name} (${char.faction})`);
      }

      successCount++;
    } catch (error) {
      console.error(`❌ Error importing ${char.name}:`, error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Import Summary:');
  console.log(`   Total: ${charactersToImport.length}`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('='.repeat(60) + '\n');
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  const options = {
    dryRun: args.includes('--dry-run'),
    limit: args.includes('--limit')
      ? parseInt(args[args.indexOf('--limit') + 1], 10)
      : undefined,
  };

  try {
    await importCharacters(options);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
