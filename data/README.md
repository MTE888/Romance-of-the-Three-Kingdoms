# Data Directory - Three Kingdoms Digital Platform

This directory contains all source materials, structured data, and processing scripts for the Three Kingdoms Digital Platform.

---

## Directory Structure

```
data/
├── sources/              # Raw source materials (texts, maps, media)
│   ├── historical/       # Historical records and chronicles
│   ├── translations/     # English and other language translations
│   ├── media/            # Maps, artwork, diagrams
│   └── reference/        # Bibliography and documentation
│
├── structured/           # Extracted and structured data (JSON)
│   ├── characters/       # Character profiles and data
│   ├── events/           # Historical events and battles
│   ├── locations/        # Geographic data
│   ├── sources/          # Source metadata
│   └── cross-references/ # Links between novel and history
│
└── scripts/              # Data processing and extraction tools
    ├── extraction/       # Extract data from raw texts
    ├── transformation/   # Transform to JSON format
    ├── validation/       # Verify data quality
    └── import/           # Import to database
```

---

## Purpose

### Sources (`sources/`)
**Raw materials** that form the foundation of the project:
- Original Chinese texts
- English translations
- Historical maps
- Artwork and media
- Reference documentation

**Status**: Mostly to be downloaded (see SOURCES.md)

### Structured Data (`structured/`)
**Extracted and processed data** ready for database import:
- JSON files with character profiles
- Event timelines
- Geographic data
- Source citations
- Cross-references between sources

**Status**: To be created via extraction scripts

### Scripts (`scripts/`)
**Tools for processing** raw sources into structured data:
- Parse Chinese text
- Extract character names and info
- Build timelines
- Validate data
- Import to PostgreSQL

**Status**: To be developed in Phase 1-2

---

## Workflow

```
1. Download Sources
   ↓
   data/sources/historical/sanguozhi/sanguozhi-full.txt

2. Extract Data
   ↓ (scripts/extraction/)
   Parse text → Identify characters, events, dates

3. Structure Data
   ↓ (scripts/transformation/)
   Convert to JSON → data/structured/characters/liu-bei.json

4. Validate Data
   ↓ (scripts/validation/)
   Check completeness, verify dates, flag conflicts

5. Import to Database
   ↓ (scripts/import/)
   Prisma → PostgreSQL → API → Frontend
```

---

## Getting Started

### Step 1: Download Sources

See `sources/reference/SOURCES.md` for complete download instructions.

**Critical Phase 1 downloads**:
- 三国志 (Records of Three Kingdoms)
- Already have: 三国演义 (Romance) in `src/`

**Commands** (requires unrestricted internet):
```bash
# From project root
cd data/sources/historical/sanguozhi

# Download Records
curl -L https://www.gutenberg.org/cache/epub/25606/pg25606.txt \
  -o sanguozhi-full.txt

# Verify download
ls -lh sanguozhi-full.txt  # Should be ~1-2 MB
file sanguozhi-full.txt     # Should be UTF-8 text
```

### Step 2: Verify Downloads

Check that files are:
- ✅ Correct encoding (UTF-8)
- ✅ Complete (check file size)
- ✅ Readable (inspect first/last lines)

```bash
# Check encoding
file sanguozhi-full.txt

# Count characters
wc -m sanguozhi-full.txt

# View sample
head -50 sanguozhi-full.txt
tail -50 sanguozhi-full.txt
```

### Step 3: Extract Data (Phase 1-2)

Create extraction scripts to parse sources:

**Example**: Extract character names from 三国志
```python
# scripts/extraction/extract-characters.py
import json
import re

def extract_characters(text):
    """Parse Chinese text to identify character names"""
    # Implementation here
    pass

with open('../../sources/historical/sanguozhi/sanguozhi-full.txt') as f:
    text = f.read()
    characters = extract_characters(text)

with open('../../structured/characters/from-records.json', 'w') as f:
    json.dump(characters, f, ensure_ascii=False, indent=2)
```

### Step 4: Structure Data

**Character JSON schema** (example):
```json
{
  "id": "liu-bei-uuid",
  "canonical_name": {
    "zh": "刘备",
    "en": "Liu Bei"
  },
  "courtesy_name": {
    "zh": "玄德",
    "en": "Xuande"
  },
  "birth_year": 161,
  "death_year": 223,
  "kingdom": "shu",
  "sources": [
    {
      "source_id": "sanguozhi-uuid",
      "citation": "Book of Shu, Biography of First Ruler",
      "reliability": "primary"
    }
  ]
}
```

### Step 5: Import to Database

Use Prisma to import structured JSON:

```typescript
// scripts/import/import-characters.ts
import { PrismaClient } from '@prisma/client';
import characters from '../../structured/characters/from-records.json';

const prisma = new PrismaClient();

async function importCharacters() {
  for (const char of characters) {
    await prisma.character.create({
      data: {
        canonicalName: char.canonical_name,
        courtesyName: char.courtesy_name,
        birthYear: char.birth_year,
        deathYear: char.death_year,
        // ... more fields
      }
    });
  }
}
```

---

## File Naming Conventions

### Source Files
- **Format**: `{source-name}-{version}.{ext}`
- **Example**: `sanguozhi-full.txt`, `rotk-chapter-001.txt`
- **Encoding**: UTF-8 (always)

### Structured Data Files
- **Format**: `{entity-type}-{identifier}.json`
- **Example**: `character-liu-bei.json`, `event-red-cliffs.json`
- **Structure**: Consistent JSON schema

### Scripts
- **Format**: `{verb}-{noun}.{ext}`
- **Example**: `extract-characters.py`, `import-events.ts`
- **Language**: Python or TypeScript

---

## Data Quality Standards

### For Sources
- ✅ Complete text (no missing sections)
- ✅ Correct encoding (UTF-8, no mojibake)
- ✅ Properly attributed (see SOURCES.md)
- ✅ Documented (README.md in each directory)

### For Structured Data
- ✅ Valid JSON
- ✅ Required fields present
- ✅ Source citations included
- ✅ No duplicate IDs
- ✅ Dates verified
- ✅ Chinese characters verified (no garbled text)

### For Scripts
- ✅ Documented with comments
- ✅ Error handling
- ✅ Validation checks
- ✅ Idempotent (safe to re-run)

---

## Version Control

### What to Commit
- ✅ Directory structure
- ✅ README files
- ✅ Small structured data files (< 1 MB)
- ✅ Scripts
- ✅ Documentation

### What NOT to Commit
- ❌ Large source files (> 1 MB) - use Git LFS if needed
- ❌ Generated files (auto-created)
- ❌ Temporary files
- ❌ Downloaded images/media (use Git LFS)

### .gitignore
Add to project `.gitignore`:
```
# Large source files (download separately)
data/sources/**/*.txt
data/sources/**/*.pdf
data/sources/**/*.epub

# Generated data
data/structured/generated/

# Temporary processing
data/temp/
*.tmp

# But keep READMEs
!data/**/README.md
```

---

## Multi-Source Truth System

This data directory supports the project's core innovation: **distinguishing between sources**.

### Example: Liu Bei's Portrayal

**Historical Profile** (from 三国志):
```json
{
  "profile_type": "historical",
  "source_id": "sanguozhi-uuid",
  "summary": "Pragmatic leader who built Shu Han through alliances",
  "traits": ["diplomatic", "persistent", "ambitious"],
  "source_file": "data/sources/historical/sanguozhi/sanguozhi-full.txt"
}
```

**Literary Profile** (from 三国演义):
```json
{
  "profile_type": "literary",
  "source_id": "romance-uuid",
  "summary": "Benevolent ruler embodying Confucian virtues",
  "traits": ["virtuous", "humble", "compassionate"],
  "source_file": "src/1.宴桃园豪杰三结义 斩黄巾英雄首立功.txt"
}
```

Both profiles stored, both displayed, differences highlighted.

---

## Progress Tracking

### Phase 1 (Weeks 1-4)
- [x] Create directory structure
- [x] Document structure and workflow
- [ ] Download 三国志 (Records) - **network blocked, manual download needed**
- [ ] Create first extraction script
- [ ] Extract 10 sample characters

### Phase 2 (Weeks 5-8)
- [ ] Download additional sources
- [ ] Extract top 100 characters
- [ ] Build event timeline (200+ events)
- [ ] Create location data

### Phase 3 (Weeks 9-12)
- [ ] Complete character extraction
- [ ] Cross-reference novel ↔ history
- [ ] Build relationship graph data
- [ ] Import all to database

---

## Resources

### Documentation
- **SOURCES.md**: Complete bibliography and download instructions
- **SOURCE_MATERIALS.md**: Integration with project architecture (in `docs/`)
- **ARCHITECTURE.md**: Database schema and data model (in `docs/`)

### Tools
- **Chinese Text Project**: https://ctext.org - Online reference
- **Project Gutenberg**: https://www.gutenberg.org - Free downloads
- **Prisma**: https://www.prisma.io - ORM for database imports

### Support
For questions about:
- Data structure → See `docs/ARCHITECTURE.md`
- Source materials → See `sources/reference/SOURCES.md`
- Project roadmap → See `docs/PROJECT_PLANNING.md`

---

## Network Restrictions Notice ⚠️

**Current Environment**: External downloads blocked by network proxy

**Workarounds**:
1. **Manual download**: Download sources on unrestricted network, then upload
2. **Alternative sources**: Use mirrors or alternative repositories
3. **Pre-downloaded data**: Obtain from team members who have access

**Documentation**: All sources documented with instructions for manual download

---

## Next Steps

1. **Download sources** (from unrestricted network)
   - Use commands in SOURCES.md
   - Verify downloads
   - Document in metadata files

2. **Create extraction scripts** (Phase 1)
   - Start with character name extraction
   - Build event timeline
   - Cross-reference sources

3. **Structure data** (Phase 1-2)
   - Create JSON schemas
   - Validate data
   - Prepare for database import

4. **Import to database** (Phase 2)
   - Use Prisma migrations
   - Seed database
   - Verify in PostgreSQL

---

**Status**: 📂 Structure ready, awaiting source downloads
**Last Updated**: 2026-01-10
**Maintained By**: Project Team
