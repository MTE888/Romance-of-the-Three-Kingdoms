# Structured Data - JSON Schemas and Samples

This directory contains extracted and structured data from Three Kingdoms sources, organized into JSON files ready for database import.

---

## Directory Contents

```
structured/
├── characters/        # Character profiles and data
├── events/            # Historical events and battles
├── locations/         # Geographic data
├── sources/           # Source metadata and bibliography
└── cross-references/  # Mappings between novel and history
```

---

## File Naming Convention

- **Sample files**: `*-sample.json` - Examples demonstrating schema
- **Production files**: `*.json` or `*-[identifier].json` - Actual data for import
- **Generated files**: `generated/*.json` - Auto-generated from scripts

---

## Sample Files (Schema Examples)

### 1. Sources (`sources/sources-sample.json`)

**Purpose**: Catalog of all source materials

**Schema**:
```json
{
  "sources": [
    {
      "id": "unique-id",
      "type": "history|novel|translation|analysis",
      "title": {"zh": "...", "en": "..."},
      "author": {"zh": "...", "en": "..."},
      "date": "year or range",
      "reliability_tier": "primary|secondary|tertiary|fiction",
      "file_path": "path/to/source",
      "license": "public_domain|copyright|...",
      ...
    }
  ]
}
```

**Key Fields**:
- `id`: Unique identifier (used in other files to reference source)
- `type`: Category of source material
- `reliability_tier`: Indicates trustworthiness for historical facts
- `file_path`: Location of source file in `data/sources/`

### 2. Characters (`characters/character-liu-bei-sample.json`)

**Purpose**: Character profiles with dual historical/literary representation

**Schema Highlights**:
```json
{
  "character": {
    "id": "character-id",
    "canonical_name": {"zh": "...", "en": "...", "pinyin": "..."},
    "dates": {
      "birth": {"year": 161, "source_id": "...", "confidence": "high"},
      "death": {...}
    },
    "profiles": {
      "historical": {
        "source_id": "sanguozhi-records",
        "summary": {...},
        "personality_traits": [...],
        "accomplishments": [...]
      },
      "literary": {
        "source_id": "romance-novel",
        "summary": {...},
        "iconic_scenes": [...],
        "fictional_embellishments": [...]
      },
      "comparison": {
        "divergences": [...],
        "commonalities": [...]
      }
    },
    "relationships": [...],
    "appearances": {...}
  }
}
```

**Key Innovation**: **Dual-Profile System**
- `historical`: Based on Records (三国志)
- `literary`: Based on Romance (三国演义)
- `comparison`: Explicitly shows differences

**Use Cases**:
- Display side-by-side profiles in UI
- Show how literary portrayal differs from history
- Source attribution for every fact

### 3. Events (`events/event-red-cliffs-sample.json`)

**Purpose**: Historical events with multiple account versions

**Schema Highlights**:
```json
{
  "event": {
    "id": "event-id",
    "canonical_name": {"zh": "...", "en": "..."},
    "type": "battle|political|social|...",
    "date": {...},
    "location": {...},
    "participants": {...},
    "accounts": {
      "historical": {
        "source_id": "sanguozhi-records",
        "sequence_of_events": [...],
        "outcome": {...}
      },
      "literary": {
        "source_id": "romance-novel",
        "chapters": [48, 49, 50],
        "dramatic_elements": [...],
        "fictional_additions": [...]
      },
      "comparison": {...}
    },
    "significance": {...}
  }
}
```

**Key Features**:
- Multiple accounts from different sources
- Explicit comparison highlighting fiction vs. fact
- Related events network
- Media attachments (maps, artwork)

### 4. Cross-References (`cross-references/chapter-to-history-sample.json`)

**Purpose**: Map novel chapters to historical events, highlight divergences

**Schema Highlights**:
```json
{
  "mappings": [
    {
      "chapter_number": 1,
      "chapter_title": {...},
      "historical_period": {"year_range": "184 CE", ...},
      "historical_events_covered": [...],
      "fiction_vs_fact": [
        {
          "scene": "Peach Garden Oath",
          "historical_accuracy": "fictional|moderate|high",
          "fact": "...",
          "fiction": "...",
          "why_added": "...",
          "cultural_significance": "..."
        }
      ]
    }
  ]
}
```

**Key Features**:
- Chapter-by-chapter mapping to history
- Explicit fact/fiction markers
- Explains *why* fiction was added
- Historical context and themes

---

## Data Quality Standards

### Required Fields
- `id`: Must be unique and consistent
- `source_id`: Must reference valid source in `sources/`
- Multilingual fields: At minimum `zh` (Chinese), ideally `en` (English)

### Date Format
```json
{
  "year": 208,
  "month": 11,  // optional
  "day": 15,    // optional
  "confidence": "high|moderate|low|uncertain",
  "source_id": "source-reference"
}
```

### Multilingual Strings
```json
{
  "zh": "刘备",
  "en": "Liu Bei",
  "pinyin": "Liú Bèi"  // optional
}
```

### Source Attribution
Every factual claim should include:
```json
{
  "fact": "...",
  "source_id": "sanguozhi-records",
  "source_citation": "Book of Shu, Biography of First Ruler",
  "confidence": "high"
}
```

---

## Accuracy Levels

### Historical Accuracy
- **`high`**: Confirmed by multiple primary sources
- **`moderate`**: Mentioned in historical records but details uncertain
- **`low`**: Minimal historical basis
- **`fictional`**: No historical record, literary invention

### Confidence Levels
- **`high`**: Strong evidence, multiple sources agree
- **`moderate`**: Single source or sources partially agree
- **`low`**: Uncertain, conflicting sources
- **`uncertain`**: Speculation or inference

---

## Usage Examples

### For Frontend Display

**Character Profile Page**:
```javascript
// Load character data
import liuBei from 'data/structured/characters/character-liu-bei-sample.json';

// Display dual profiles
const historicalProfile = liuBei.character.profiles.historical;
const literaryProfile = liuBei.character.profiles.literary;
const comparison = liuBei.character.profiles.comparison;

// Show side-by-side or tabbed view
<TabbedView>
  <Tab title="Historical">
    <Profile data={historicalProfile} />
    <SourceBadge source={historicalProfile.source_id} />
  </Tab>
  <Tab title="Literary">
    <Profile data={literaryProfile} />
    <SourceBadge source={literaryProfile.source_id} />
  </Tab>
  <Tab title="Comparison">
    <Comparison data={comparison} />
  </Tab>
</TabbedView>
```

### For Database Import

**Using Prisma**:
```typescript
import { PrismaClient } from '@prisma/client';
import characterData from 'data/structured/characters/character-liu-bei-sample.json';

const prisma = new PrismaClient();

async function importCharacter() {
  const char = characterData.character;

  await prisma.character.create({
    data: {
      id: char.id,
      canonicalName: char.canonical_name,
      birthYear: char.dates.birth.year,
      deathYear: char.dates.death.year,
      kingdom: char.kingdom_affiliation.primary,

      // Historical profile
      historicalSummary: char.profiles.historical.summary,
      historicalSource: {
        connect: { id: char.profiles.historical.source_id }
      },

      // Literary profile
      literarySummary: char.profiles.literary.summary,
      literarySource: {
        connect: { id: char.profiles.literary.source_id }
      },

      // Relationships
      relationships: {
        create: char.relationships.map(rel => ({
          type: rel.type,
          targetCharacterId: rel.character_id,
          description: rel.description
        }))
      }
    }
  });
}
```

### For Search/Filter

**Example Queries**:
```javascript
// Find all Shu characters
characters.filter(c => c.kingdom_affiliation.primary === 'shu')

// Find characters mentioned in chapter 1
characters.filter(c =>
  c.appearances.romance_chapters.includes(1)
)

// Find events in year 208
events.filter(e => e.date.year === 208)

// Find highly accurate literary scenes
crossRefs[0].fiction_vs_fact.filter(f =>
  f.historical_accuracy === 'high'
)
```

---

## Generating Production Data

### Step 1: Extract from Sources

Use extraction scripts:
```bash
cd data/scripts/extraction

# Extract characters from historical source
python extract_characters.py \
  --source sanguozhi \
  --output ../../structured/characters/from-records.json

# Extract from novel
python extract_characters.py \
  --source romance \
  --output ../../structured/characters/from-romance.json
```

### Step 2: Transform and Merge

Combine historical and literary profiles:
```bash
cd data/scripts/transformation

python merge_character_profiles.py \
  --historical ../../structured/characters/from-records.json \
  --literary ../../structured/characters/from-romance.json \
  --output ../../structured/characters/characters-merged.json
```

### Step 3: Validate

Check data quality:
```bash
cd data/scripts/validation

python validate_json.py \
  --input ../../structured/characters/characters-merged.json \
  --schema character-schema.json
```

### Step 4: Import to Database

```bash
cd apps/api

npx prisma db seed
# Uses import scripts from data/scripts/import/
```

---

## Schema Versioning

Current version: **1.0**

Version is included in every JSON file:
```json
{
  "metadata": {
    "version": "1.0",
    "created_at": "2026-01-10T00:00:00Z"
  }
}
```

### Version History
- **1.0** (2026-01-10): Initial schema design

### Future Enhancements
- **1.1**: Add location coordinates, dynasty timeline
- **1.2**: Add genealogy data, family trees
- **2.0**: Support for multimedia (audio, video references)

---

## File Organization Tips

### For Large Datasets

**Option 1: Individual Files**
```
characters/
├── character-liu-bei.json
├── character-cao-cao.json
├── character-sun-quan.json
└── ... (one file per character)
```

**Option 2: Grouped Files**
```
characters/
├── shu-characters.json       # All Shu characters
├── wei-characters.json       # All Wei characters
├── wu-characters.json        # All Wu characters
└── other-characters.json
```

**Option 3: Combined with Index**
```
characters/
├── all-characters.json       # Complete dataset
└── character-index.json      # Quick lookup index
```

### Recommendation for MVP
- Use **Option 2** (Grouped by kingdom) for initial data
- Switch to **Option 1** (Individual files) as dataset grows beyond 100 characters
- Always maintain an index file for quick lookups

---

## Data Completeness Tracking

Each record includes a `data_completeness` field:
```json
{
  "metadata": {
    "data_completeness": {
      "historical_profile": 0.95,  // 95% complete
      "literary_profile": 0.90,
      "relationships": 0.85,
      "sources": 1.0
    }
  }
}
```

**Interpretation**:
- `1.0` = Fully complete
- `0.8-0.99` = Mostly complete, minor gaps
- `0.5-0.79` = Substantial data, needs expansion
- `< 0.5` = Minimal data, requires work

---

## Best Practices

### DO ✅
- Always include source attribution
- Use consistent IDs across files
- Include both Chinese and English where possible
- Document confidence/accuracy levels
- Keep samples updated with schema changes

### DON'T ❌
- Don't merge conflicting sources - present them separately
- Don't omit source_id - every fact needs attribution
- Don't hardcode English-only - support multilingual from start
- Don't delete old versions - use semantic versioning
- Don't mix generated and manual data in same file

---

## Contributing Data

When adding new structured data:

1. **Follow existing samples** for schema
2. **Validate JSON** before committing
3. **Include sources** for all facts
4. **Mark confidence** levels honestly
5. **Update indexes** if applicable
6. **Test import** to database before final commit

---

## Tools and Utilities

### JSON Validation
```bash
# Check valid JSON
cat character-liu-bei.json | jq empty

# Pretty print
jq . character-liu-bei.json

# Extract specific field
jq '.character.canonical_name' character-liu-bei.json
```

### Quick Stats
```bash
# Count characters
jq '.characters | length' characters-merged.json

# List all character IDs
jq '.characters[].id' characters-merged.json

# Find characters without English names
jq '.characters[] | select(.canonical_name.en == null) | .canonical_name.zh' characters-merged.json
```

---

## Questions and Support

**Schema questions**: See `docs/ARCHITECTURE.md` for database schema
**Data sources**: See `data/sources/reference/SOURCES.md`
**Import process**: See `data/README.md` for workflow

---

**Status**: Sample schemas complete, production data in progress
**Last Updated**: 2026-01-10
**Maintained By**: Project Team
