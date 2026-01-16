# Import Scripts

Data import scripts for the Three Kingdoms Digital Platform.

## Available Scripts

### import-characters.ts

Imports 81 character profiles from structured JSON files into PostgreSQL.

**Features:**
- ✅ Dual profile import (historical 三国志 + literary 三国演义)
- ✅ Multilingual field transformation (`{ zh: "...", en: "..." }`)
- ✅ Smart faction → Kingdom enum mapping
- ✅ Chinese date parsing ("223年6月10日" → year: 223)
- ✅ Image and quote import
- ✅ Dry run mode for testing

**Usage:**
```bash
# Preview import (no database changes)
npm run import:characters:dry-run

# Preview first 5 characters
npm run import:characters:test

# Full import (requires database connection)
npm run import:characters

# Custom limit
npx tsx scripts/import-characters.ts --dry-run --limit 10
```

**Data Source:**
- Location: `data/sources/structured/three-kingdoms-characters/characters/*.json`
- Count: 81 characters
- Source: [fthux/Characters_of_the_Three_Kingdoms](https://github.com/fthux/Characters_of_the_Three_Kingdoms)

**Requirements:**
- PostgreSQL database running
- Prisma client generated (`cd packages/database && npm run db:generate`)
- DATABASE_URL configured in `.env`

**Mapping Examples:**
```typescript
// Faction mapping
"蜀汉" → Kingdom.SHU
"曹魏" → Kingdom.WEI
"东吴" → Kingdom.WU

// Date extraction
"223年6月10日" → birthYear: 223

// Multilingual fields
{ name: "刘备" } → { canonicalName: { zh: "刘备" } }

// Dual profiles
historicalBriefIIntroduction → historicalProfile.summary.zh
novelisticBriefIIntroduction → literaryProfile.summary.zh
```

### import-chapters.ts

Imports 120 chapter text files from Romance of the Three Kingdoms.

**Usage:**
```bash
npm run import:chapters
```

**Data Source:**
- Location: `src/*.txt`
- Count: 120 chapters

## Prerequisites

### 1. Install Dependencies

```bash
# From repository root
npm install

# Generate Prisma client
cd packages/database
npm install
npm run db:generate
```

### 2. Database Setup

```bash
# Option 1: Using Docker (recommended for development)
npm run docker:start
npm run docker:migrate

# Option 2: Local PostgreSQL
# Ensure PostgreSQL is installed and running
# Configure DATABASE_URL in .env
cd packages/database
npx prisma migrate deploy
```

### 3. Environment Configuration

Create `.env` file in `packages/database/`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/three_kingdoms"
```

## Common Issues

### "tsx: command not found"

Solution: Use `npx tsx` or install globally:
```bash
npm install -g tsx
```

### "Cannot find module '@prisma/client'"

Solution: Generate Prisma client:
```bash
cd packages/database
npm run db:generate
```

### "Failed to fetch Prisma engine - 403 Forbidden"

This occurs in restricted network environments. The import script is complete and ready to use - it just requires running from an environment with unrestricted network access to download the Prisma engine binaries.

**Workaround for offline environments:**
1. Generate Prisma client on a machine with internet access
2. Copy `packages/database/src/generated/` to the offline environment
3. Run import scripts

### "PrismaClientInitializationError: Can't reach database"

Solution: Ensure PostgreSQL is running and DATABASE_URL is correct:
```bash
# Check PostgreSQL status
systemctl status postgresql  # Linux
brew services list           # macOS

# Test database connection
cd packages/database
npx prisma db push
```

## Data Import Workflow

Recommended order for importing all data:

```bash
# 1. Characters (81 profiles)
npm run import:characters

# 2. Chapters (120 chapters)
npm run import:chapters

# 3. Locations (future script)
# npm run import:locations

# 4. Timeline Events (future script)
# npm run import:timeline

# 5. Character Relationships (future script)
# npm run import:relationships
```

## Output Examples

### Successful Import

```
🚀 Starting character import...

Found 81 character JSON files
Importing 81 characters...

✅ Imported: 刘备 (蜀汉)
✅ Imported: 曹操 (曹魏)
✅ Imported: 孙权 (东吴)
✅ Imported: 关羽 (蜀汉)
✅ Imported: 张飞 (蜀汉)
...

============================================================
📊 Import Summary:
   Total: 81
   ✅ Success: 81
   ❌ Errors: 0
============================================================
```

### Dry Run

```
🚀 Starting character import...

Found 81 character JSON files
Importing 5 characters...

🔍 DRY RUN MODE - No database changes will be made

✓ Would import: 刘备 (蜀汉)
  - Kingdom: SHU
  - Birth Year: 161
  - Death Year: 223
  - Positions: 蜀国皇帝

✓ Would import: 曹操 (曹魏)
  - Kingdom: WEI
  - Birth Year: 155
  - Death Year: 220
  - Positions: 魏武帝
...

============================================================
📊 Import Summary:
   Total: 5
   ✅ Success: 5
   ❌ Errors: 0
============================================================
```

## Future Scripts (TODO)

### import-locations.ts
Import 122 locations (61 cities + 61 regions) from GeoJSON files
- Source: `data/sources/geographic/*.geojson`
- Creates Location records with coordinates
- Links to modern place names

### import-timeline.ts
Import 88 historical events from CSV files
- Source: `data/sources/timeline/events-*.csv`
- Creates Event and TimelineEntry records
- Links to characters and locations

### import-relationships.ts
Import character relationships from family data in character JSON files
- Extracts family relationships (father, mother, spouse, children)
- Creates CharacterRelationship records
- Supports both historical and literary relationship types

### import-sources.ts
Import source bibliography records
- Creates Source records for 三国志, 三国演义, scholarly works
- Sets up source attribution system for fact checking

## Verification

After importing, verify data using Prisma Studio:

```bash
cd packages/database
npm run db:studio
```

Or query directly:

```bash
npx prisma db execute --stdin <<EOF
SELECT
  "canonical_name"->>'zh' as name,
  kingdom,
  "birth_year",
  "death_year"
FROM characters
ORDER BY "birth_year"
LIMIT 10;
EOF
```

## Development

### Testing Import Script Changes

```bash
# Always test with dry run and limit first
npx tsx scripts/import-characters.ts --dry-run --limit 1

# Check transformation output
# Then try with 5 characters
npx tsx scripts/import-characters.ts --dry-run --limit 5

# Finally run full import
npm run import:characters
```

### Adding New Import Scripts

1. Create script in `scripts/` directory
2. Add npm script to root `package.json`
3. Follow existing patterns (import from @prisma/client, use fs.promises)
4. Include dry-run mode
5. Add comprehensive error handling
6. Document in this README

---

**Last Updated**: 2026-01-16
**Scripts Version**: 1.0.0
**Status**: Character import ready (blocked by network restrictions for testing)
