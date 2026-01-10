# Source Materials Guide - Three Kingdoms Digital Platform

## Overview

This document maps available Three Kingdoms historical materials to the project's data needs, provides download instructions, and outlines the organization strategy for source materials.

**Related Documents:**
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture and data model
- [PROJECT_PLANNING.md](./PROJECT_PLANNING.md) - Development roadmap and priorities

---

## Source Materials Strategy

### Hybrid Approach: Download + Online Reference

**Download Locally:**
- Primary sources needed for data extraction
- Materials referenced frequently during development
- Content needed for offline processing/analysis
- Sources for the multi-source truth system

**Keep Online (Reference Links):**
- Very large collections (3M+ characters)
- Occasional reference materials
- Academic papers and modern scholarship
- Materials with excellent online search (Chinese Text Project)

---

## Priority Mapping to Project Phases

### Phase 1 Priority: MVP Foundation (Weeks 1-16)

From PROJECT_PLANNING.md, MVP needs:
- ✅ 三国演义 (Romance) - **Already have** (120 chapters in `/src/`)
- 🔽 三国志 (Records of Three Kingdoms) - **Download immediately**
- 🔽 三国志注 (Pei Songzhi's Commentary) - **Download immediately**
- 🔽 后汉书 (Book of Later Han, relevant sections) - **Download selectively**
- 🌐 Historical timeline data - **Extract from above sources**
- 🌐 Top 100 character profiles - **Extract from above sources**

### Phase 2 Priority: Post-MVP (Months 6-12)

- 🔽 English translation of 三国演义 - **Download/license**
- 🌐 Modern scholarly analysis - **Online reference + selective downloads**
- 🌐 Character genealogy charts - **Create from data**
- 🌐 Archaeological findings - **Online reference**

### Phase 3 Priority: Long-term (Year 2+)

- 🔽 资治通鉴 (Zizhi Tongjian, Three Kingdoms sections) - **Download selectively**
- 🌐 晋书 (Book of Jin) - **Online reference**
- 🌐 Multiple English translations - **License as needed**
- 🌐 Academic papers - **Online reference**

---

## Available Sources & Download Instructions

### 1. 三国志 (Records of the Three Kingdoms)

**Type:** Primary historical source
**Author:** Chen Shou (陈寿), 3rd century CE
**Size:** ~360,000 characters, 65 fascicles
**Priority:** 🔴 Critical (MVP Phase 1)

**What It Is:**
- Official historical record of Three Kingdoms period
- Divided into: Book of Wei (30 fascicles), Book of Shu (15), Book of Wu (20)
- Primary source for historical profiles in dual-profile system
- Foundation for "historical account" in your data model

**Download Sources:**

1. **Project Gutenberg** (Recommended for plain text)
   - URL: https://www.gutenberg.org/ebooks/25606
   - Formats: Plain text, HTML, EPUB, Kindle
   - License: Public domain
   - Best for: Data extraction, processing

2. **Chinese Text Project** (Alternative - web scraping)
   - URL: https://ctext.org/wiki.pl?if=en&res=339496&remap=gb
   - Format: Online HTML (can export)
   - Best for: Online reference with search

3. **Internet Archive**
   - URL: https://archive.org/details/recordsofthreeki0000chen
   - Formats: PDF, EPUB, multiple formats
   - Best for: Backup copy

**Recommended Action:**
```bash
# Download from Project Gutenberg
cd data/sources/historical
wget https://www.gutenberg.org/cache/epub/25606/pg25606.txt
mv pg25606.txt sanguozhi_records_of_three_kingdoms.txt
```

---

### 2. 三国志注 (Annotated Records - Pei Songzhi's Commentary)

**Type:** Primary historical source with commentary
**Author:** Pei Songzhi (裴松之), 5th century CE
**Size:** ~720,000 characters (doubles the original)
**Priority:** 🟡 High (MVP Phase 2-3)

**What It Is:**
- Chen Shou's original Records PLUS extensive commentary
- Preserves fragments of lost historical texts
- Provides alternative accounts and source comparisons
- Critical for conflict resolution in your multi-source system

**Download Sources:**

1. **Chinese Text Project** (Primary source)
   - URL: https://ctext.org/wiki.pl?if=en&res=339496&remap=gb
   - Includes both original and commentary
   - May require web scraping or API access

**Recommended Action:**
- Phase 1: Use online for reference
- Phase 2-3: Extract specific sections or full download
- Integrate commentary as separate source type in database

---

### 3. 后汉书 (Book of Later Han)

**Type:** Primary historical source
**Author:** Fan Ye (范晔), 5th century CE
**Covers:** 25-220 AD (ends where Three Kingdoms begins)
**Size:** Very large (entire dynasty)
**Priority:** 🟡 Medium (selectively download)

**What It Is:**
- Background context for the fall of Han Dynasty
- Character backgrounds before Three Kingdoms period
- Events leading up to 220 AD

**Download Sources:**

1. **Chinese Text Project**
   - URL: https://ctext.org/hou-han-shu
   - Full text online with search
   - Can export specific chapters

2. **ChineseNotes.com**
   - URL: https://chinesenotes.com/houhanshu.html
   - Alternative access

**Recommended Action:**
- Download relevant sections only (late Eastern Han: Chapters 54-90)
- Keep full text as online reference
- Priority: Chapters covering 184-220 AD (Yellow Turban Rebellion to end of Han)

---

### 4. 资治通鉴 (Comprehensive Mirror / Zizhi Tongjian)

**Type:** Chronicle/compilation
**Author:** Sima Guang (司马光), 1084 CE
**Covers:** 403 BC - 959 AD
**Size:** ~3 million characters, 294 scrolls
**Priority:** 🟢 Low (Phase 3, selective download)

**What It Is:**
- Comprehensive chronological history
- More readable than official histories
- Covers Three Kingdoms period (volumes for 184-280 AD)
- Useful for timeline construction

**Download Sources:**

1. **Internet Archive**
   - URL: https://archive.org/details/modern-chinese-zizhi-tongjian
   - Multiple formats available
   - Modern Chinese version

2. **Chinese Text Project**
   - URL: https://ctext.org/datawiki.pl?if=en&res=176090
   - Online access with search

**Recommended Action:**
- Download ONLY volumes covering 184-280 AD
- Keep full work as online reference
- Use for cross-referencing timeline events

---

### 5. English Translations

#### Romance of the Three Kingdoms (三国演义)

**Available Translations:**

1. **Moss Roberts Translation** (Recommended)
   - Publisher: University of California Press / Foreign Languages Press
   - Status: Under copyright, requires license
   - Quality: Scholarly, complete, annotated
   - Note: Contact publisher for licensing

2. **C.H. Brewitt-Taylor Translation** (Public Domain)
   - Published: 1925
   - Status: Public domain
   - URL: https://archive.org/details/romanceofthreeki01loku
   - Quality: Dated but usable

3. **Project Gutenberg** (Various)
   - URL: https://www.gutenberg.org/ebooks/search/?query=three+kingdoms
   - Check for public domain versions

**Recommended Action:**
- Phase 1 (MVP): Not critical
- Phase 6 (English localization): License Moss Roberts or similar
- Interim: Use public domain versions for reference

#### Historical Records Translations

**Rafe de Crespigny's Work** (Highly Recommended)
- Translated sections of Hou Han Shu covering Three Kingdoms period
- Works: "A Hundred Years of Han," "Emperor Huan and Emperor Ling," "To Establish Peace"
- Covers: 57-220 AD
- Available: Australian National University (PDF downloads)
- Status: Academic, may require institution access

**Achilles Fang Translation**
- Translated Zizhi Tongjian chapters 70-79 (covering up to 265 AD)
- Published: 1952
- Status: Academic libraries

---

### 6. Academic & Reference Materials

#### Character Databases

**Rafe de Crespigny - Biographical Dictionary**
- Title: "A Biographical Dictionary of Later Han to the Three Kingdoms (23-220 AD)"
- Publisher: Brill, 2007
- Content: 8,000+ biographical entries
- Status: Under copyright, reference only
- Use: Verify character data, cross-reference

#### Archaeological & Inscription Data

**Han, Wei, Liu Chao Stone Inscriptions Database**
- Content: Rubbings from 2,466 inscriptions
- Coverage: Three Kingdoms era
- Use: Verify historical facts through archaeological evidence
- Access: Academic databases (may require institution access)

#### Maps

**Sources Needed:**
1. Historical maps of China (220-280 AD)
   - Territory boundaries by year
   - Major cities and provinces
   - Battle locations

2. Modern GIS data with historical overlays

**Recommended Sources:**
- Chinese History Maps (search academic sources)
- CHGIS (China Historical GIS) - Harvard University
- Ancient China maps from museums (public domain where possible)

---

## Recommended Directory Structure

Integrating with your planned architecture from ARCHITECTURE.md:

```
Romance-of-the-Three-Kingdoms/
├── apps/                           # (Future: web app)
│   ├── web/
│   └── api/
│
├── packages/                       # (Future: shared packages)
│   ├── ui/
│   ├── database/
│   └── types/
│
├── src/                            # ✅ EXISTING: Novel chapters
│   └── [120 chapter files].txt
│
├── data/                           # 🆕 NEW: All source materials & structured data
│   ├── sources/                    # Raw source materials
│   │   ├── novel/
│   │   │   └── sanguo-yanyi/       # Symlink to ../src/ (already have)
│   │   │
│   │   ├── historical/             # Historical records
│   │   │   ├── sanguozhi/
│   │   │   │   ├── README.md       # Source info, attribution
│   │   │   │   ├── full-text.txt   # Complete Chinese text
│   │   │   │   ├── book-of-wei/    # Organized by book
│   │   │   │   ├── book-of-shu/
│   │   │   │   └── book-of-wu/
│   │   │   │
│   │   │   ├── sanguozhi-zhu/      # With commentary
│   │   │   │   └── full-text.txt
│   │   │   │
│   │   │   ├── hou-han-shu/        # Book of Later Han
│   │   │   │   ├── README.md
│   │   │   │   ├── late-han/       # Chapters 54-90 only
│   │   │   │   └── relevant-sections.txt
│   │   │   │
│   │   │   └── zizhi-tongjian/     # Selective sections
│   │   │       ├── README.md
│   │   │       └── three-kingdoms-period/  # Volumes 184-280 AD
│   │   │
│   │   ├── translations/           # English & other languages
│   │   │   ├── english/
│   │   │   │   ├── novel/
│   │   │   │   │   ├── brewitt-taylor/  # Public domain
│   │   │   │   │   └── moss-roberts/    # (Future, licensed)
│   │   │   │   └── historical/
│   │   │   │       └── de-crespigny/    # Academic translations
│   │   │   └── modern-chinese/     # Simplified versions if needed
│   │   │
│   │   ├── analysis/               # Modern scholarship
│   │   │   ├── academic-papers/
│   │   │   ├── annotations/
│   │   │   └── commentaries/
│   │   │
│   │   ├── media/                  # Maps, artwork, diagrams
│   │   │   ├── maps/
│   │   │   │   ├── historical/
│   │   │   │   ├── battles/
│   │   │   │   └── territories/
│   │   │   ├── artwork/
│   │   │   │   ├── character-portraits/
│   │   │   │   └── scenes/
│   │   │   └── diagrams/
│   │   │       ├── family-trees/
│   │   │       └── org-charts/
│   │   │
│   │   └── reference/              # Links and citations
│   │       ├── SOURCES.md          # Master bibliography
│   │       ├── online-resources.md # Curated links
│   │       └── academic-refs.md    # Academic sources
│   │
│   ├── structured/                 # 🆕 Extracted & structured data
│   │   ├── characters/
│   │   │   ├── characters.json     # All character data
│   │   │   ├── relationships.json
│   │   │   └── extraction-scripts/
│   │   │
│   │   ├── events/
│   │   │   ├── events.json
│   │   │   ├── battles.json
│   │   │   └── timeline.json
│   │   │
│   │   ├── locations/
│   │   │   ├── locations.json
│   │   │   └── geography.json
│   │   │
│   │   ├── sources/                # Source metadata
│   │   │   └── sources.json        # For database import
│   │   │
│   │   └── cross-references/
│   │       ├── chapter-to-events.json
│   │       ├── fiction-vs-history.json
│   │       └── source-citations.json
│   │
│   └── scripts/                    # Data processing scripts
│       ├── extraction/             # Extract from raw sources
│       ├── transformation/         # Transform to JSON
│       ├── validation/             # Verify data quality
│       └── import/                 # Import to database
│
├── docs/                           # ✅ EXISTING: Project documentation
│   ├── ARCHITECTURE.md
│   ├── PROJECT_PLANNING.md
│   ├── SKILLS.md
│   └── SOURCE_MATERIALS.md         # 🆕 This file
│
├── .claude/                        # ✅ EXISTING: Claude Code config
└── README.md                       # ✅ EXISTING: Project overview
```

---

## Download Checklist

### Phase 1 (Weeks 1-4): Immediate Downloads

```bash
# Create directory structure
mkdir -p data/sources/{historical,translations,media,reference}
mkdir -p data/structured/{characters,events,locations,sources,cross-references}
mkdir -p data/scripts/{extraction,transformation,validation,import}

# Download critical sources
cd data/sources/historical

# 1. Records of Three Kingdoms (三国志)
mkdir -p sanguozhi
cd sanguozhi
wget https://www.gutenberg.org/cache/epub/25606/pg25606.txt -O sanguozhi-full.txt
echo "Source: Project Gutenberg #25606" > README.md
echo "Author: Chen Shou (陈寿)" >> README.md
echo "Downloaded: $(date)" >> README.md
cd ..

# 2. Create reference document with online sources
cd ../reference
cat > SOURCES.md << 'EOF'
# Source Materials Bibliography

## Primary Historical Sources

### 三国志 (Records of the Three Kingdoms)
- **Author**: Chen Shou (陈寿), 3rd century CE
- **Local Copy**: `data/sources/historical/sanguozhi/`
- **Online**: https://ctext.org/wiki.pl?if=en&res=339496
- **Alternative**: https://www.gutenberg.org/ebooks/25606

### 三国志注 (Annotated Records with Pei Songzhi Commentary)
- **Commentator**: Pei Songzhi (裴松之), 5th century CE
- **Online**: https://ctext.org/wiki.pl?if=en&res=339496 (includes commentary)

### 后汉书 (Book of Later Han)
- **Author**: Fan Ye (范晔), 5th century CE
- **Online**: https://ctext.org/hou-han-shu
- **Alternative**: https://chinesenotes.com/houhanshu.html

### 资治通鉴 (Comprehensive Mirror)
- **Author**: Sima Guang (司马光), 1084 CE
- **Online**: https://ctext.org/datawiki.pl?if=en&res=176090
- **Download**: https://archive.org/details/modern-chinese-zizhi-tongjian

## Novel

### 三国演义 (Romance of the Three Kingdoms)
- **Local Copy**: `src/` (120 chapters)
- **Online**: https://ctext.org/sanguo-yanyi
- **Project Gutenberg**: https://www.gutenberg.org/ebooks/23950

## Academic Resources

### Biographical Dictionary
- Rafe de Crespigny, "A Biographical Dictionary of Later Han to the Three Kingdoms"
- Brill, 2007

### Translations
- Rafe de Crespigny's translations of Hou Han Shu (available via ANU)
- Moss Roberts translation of Romance (requires license)

## Online Tools

- **Chinese Text Project**: https://ctext.org (primary reference)
- **Internet Archive**: https://archive.org (historical texts)
- **Project Gutenberg**: https://www.gutenberg.org (public domain texts)
EOF

```

**Checklist:**
- [ ] Create directory structure as shown above
- [ ] Download 三国志 from Project Gutenberg
- [ ] Create SOURCES.md reference document
- [ ] Document all sources with attribution
- [ ] Add .gitattributes for large files if needed

### Phase 2 (Weeks 5-8): Additional Sources

- [ ] Extract relevant sections of 后汉书 from Chinese Text Project
- [ ] Download public domain English translations (Brewitt-Taylor)
- [ ] Collect historical maps (search academic sources)
- [ ] Set up web scraping scripts for Chinese Text Project (if needed)

### Phase 3 (Weeks 9-16): Comprehensive Collection

- [ ] Download 三国志注 (commentary version)
- [ ] Extract Three Kingdoms sections from 资治通鉴
- [ ] Gather academic papers and analysis
- [ ] Commission/acquire character artwork
- [ ] Create family tree diagrams

---

## Integration with Data Model

From ARCHITECTURE.md, your database has these key entities:

### Sources Table
Every downloaded source should be registered:

```typescript
Source {
  id: uuid
  type: 'history' | 'novel' | 'analysis' | 'artwork' | 'map'
  title: "三国志" (multilingual)
  author: "Chen Shou"
  era: "3rd century"
  language: "Chinese"
  reliability_tier: 'primary'
  description: { zh: "...", en: "..." }
  metadata: {
    file_path: "data/sources/historical/sanguozhi/sanguozhi-full.txt"
    source_url: "https://www.gutenberg.org/ebooks/25606"
    download_date: "2026-01-10"
    format: "plain text"
  }
}
```

### Extraction Workflow

```
Raw Source (txt)
  ↓ [extraction script]
Characters/Events/Facts (JSON)
  ↓ [transformation script]
Database records (via Prisma)
  ↓
API (GraphQL)
  ↓
Frontend (React)
```

---

## Source Attribution Examples

### Example 1: Character Birth Year

**Scenario**: Liu Bei's birth year

```json
{
  "entity_type": "character",
  "entity_id": "liu-bei-uuid",
  "claim_type": "birth_year",
  "claim_value": 161,
  "source_id": "sanguozhi-uuid",
  "source_citation": "Book of Shu, Biography of First Ruler",
  "reliability_score": 0.95,
  "consensus_level": "unanimous"
}
```

### Example 2: Event with Conflicting Accounts

**Scenario**: Battle of Red Cliffs (208 AD)

**Historical Account (三国志)**:
```json
{
  "event_id": "red-cliffs-uuid",
  "account_type": "historical",
  "source_id": "sanguozhi-uuid",
  "description": {
    "zh": "[Historical account from Records]",
    "en": "Allied forces defeated Cao Cao's navy..."
  },
  "participants": ["Zhou Yu", "Zhuge Liang", "Cao Cao"],
  "outcome": "Allied victory"
}
```

**Literary Account (三国演义)**:
```json
{
  "event_id": "red-cliffs-uuid",
  "account_type": "literary",
  "source_id": "romance-uuid",
  "description": {
    "zh": "[Literary account from novel]",
    "en": "Zhuge Liang summoned the east wind..."
  },
  "dramatization_notes": "Supernatural elements added for dramatic effect",
  "divergence": ["Zhuge Liang's role exaggerated", "Wind summoning is fictional"]
}
```

---

## Data Extraction Strategy

### Immediate Extraction (Phase 1)

**From 三国志 (Records):**
1. Character names and basic info
   - Extract all proper names
   - Birth/death dates where mentioned
   - Official positions and titles
   - Kingdom affiliations

2. Major events
   - Battles with dates and locations
   - Political events
   - Significant deaths

3. Relationships
   - Family ties
   - Lord-vassal relationships
   - Alliances

**From 三国演义 (Novel - already have):**
1. Chapter-character mapping
   - Which characters appear in which chapters
   - Character introductions

2. Famous scenes and quotes
   - Extract by keyword/manual curation

3. Literary characterizations
   - Personality traits as portrayed
   - Fictional embellishments

### Tools for Extraction

**Python Scripts** (recommended):
```python
# Example: Extract character names
import re
import json

def extract_characters(text):
    """Extract character mentions from historical text"""
    # Chinese name patterns
    patterns = [
        r'[刘曹孙][备操权][字]?[玄孟仲]?[德德明]?',
        # ... more patterns
    ]
    # Implementation...
    return characters

# Process sanguozhi
with open('data/sources/historical/sanguozhi/sanguozhi-full.txt', 'r') as f:
    text = f.read()
    characters = extract_characters(text)

with open('data/structured/characters/extracted-from-records.json', 'w') as f:
    json.dump(characters, f, ensure_ascii=False, indent=2)
```

**Manual Curation:**
- Some data requires expert human verification
- Use spreadsheets initially, then migrate to database
- Quality over quantity for MVP

---

## Quality & Verification

### Source Verification Checklist

For each source downloaded:
- [ ] Verify it's the correct text
- [ ] Check for completeness
- [ ] Verify public domain status / licensing
- [ ] Document provenance
- [ ] Add to SOURCES.md
- [ ] Register in database (Source table)

### Data Quality Standards

**For character data:**
- Minimum: Name, kingdom, basic dates
- Good: + biography, relationships, events
- Excellent: + dual profiles, sources, images

**For events:**
- Minimum: Date, name, description
- Good: + participants, location, outcomes
- Excellent: + multiple accounts, sources, maps

---

## Legal & Licensing

### Public Domain Materials ✅
- 三国志 (Records) - ancient text, public domain
- 三国演义 (Romance) - pre-1900s, public domain in most jurisdictions
- 后汉书 - ancient text, public domain
- Brewitt-Taylor translation (1925) - public domain

### Copyright Materials ⚠️
- Moss Roberts translation - requires license
- Modern scholarly analysis - varies
- Artwork - varies by artist
- Maps - varies by creator

### Attribution Requirements
- Always cite source in database
- Include in UI where facts are displayed
- Maintain SOURCES.md with full bibliography
- Comply with CC-BY-SA or similar for derivatives

---

## Next Steps

### Immediate (This Week)
1. Create `data/` directory structure
2. Download 三国志 from Project Gutenberg
3. Create SOURCES.md reference document
4. Document existing 120 chapters as a source

### Short-term (Phase 1: Weeks 1-4)
1. Set up extraction scripts
2. Begin character extraction from both sources
3. Create initial structured JSON files
4. Design database import process

### Medium-term (Phase 2-3: Weeks 5-12)
1. Extract all 100+ character profiles
2. Build timeline from events
3. Map chapter-to-event relationships
4. Add commentary and analysis sources

---

## Resources & References

### Online Tools
- **Chinese Text Project**: https://ctext.org - Comprehensive classical Chinese texts
- **Project Gutenberg**: https://www.gutenberg.org - Public domain books
- **Internet Archive**: https://archive.org - Digital library
- **ChineseNotes.com**: https://chinesenotes.com - Classical Chinese reference

### Academic Institutions
- **Australian National University** - Rafe de Crespigny's translations
- **Harvard CHGIS** - China Historical GIS data
- **Brill Academic** - Scholarly references

### Community
- r/ChineseHistory - Reddit community
- Three Kingdoms forums - For verification and discussion
- Academic mailing lists - For scholarly consultation

---

**Document Status**: Active Resource Guide
**Last Updated**: 2026-01-10
**Maintained By**: Project Team
**Next Review**: After Phase 1 completion

**Ready to download sources? Follow the checklist above to begin!** 📚
