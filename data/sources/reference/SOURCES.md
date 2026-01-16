# Source Materials Bibliography

**Project**: Three Kingdoms Digital Platform
**Last Updated**: 2026-01-10

This document catalogs all source materials for the project, providing download instructions, citations, and metadata.

---

## Primary Historical Sources

### 1. 三国志 (Records of the Three Kingdoms)

**Author**: Chen Shou (陈寿), 233-297 CE
**Dynasty**: Western Jin
**Date**: c. 289 CE
**Size**: ~360,000 characters, 65 fascicles
**Language**: Classical Chinese

**Structure**:
- Book of Wei (魏书): 30 fascicles
- Book of Shu (蜀书): 15 fascicles
- Book of Wu (吴书): 20 fascicles

**Download Sources**:
- **Project Gutenberg**: https://www.gutenberg.org/ebooks/25606
  - Format: Plain text UTF-8
  - License: Public domain
  - Direct link: https://www.gutenberg.org/cache/epub/25606/pg25606.txt

- **Chinese Text Project**: https://ctext.org/wiki.pl?if=en&res=339496
  - Format: Online HTML with search
  - Features: Full text with navigation

- **Internet Archive**: https://archive.org/details/recordsofthreeki0000chen
  - Formats: PDF, EPUB, Kindle, Full Text

**Local Path**: `data/sources/historical/sanguozhi/sanguozhi-full.txt`

**Citation**:
```
Chen Shou (陈寿). Sanguozhi (三国志) [Records of the Three Kingdoms].
Western Jin Dynasty, c. 289 CE.
```

**Status**: ⏳ To download
**Priority**: 🔴 Critical (MVP Phase 1)
**Reliability**: Primary historical source

---

### 2. 三国志注 (Annotated Records with Pei Songzhi's Commentary)

**Original Author**: Chen Shou (陈寿)
**Commentator**: Pei Songzhi (裴松之), 372-451 CE
**Dynasty**: Liu Song
**Date**: 429-431 CE
**Size**: ~720,000 characters (doubles the original)
**Language**: Classical Chinese

**About**:
Pei Songzhi's extensive annotations and commentary on Chen Shou's original text. Includes:
- Alternative accounts from lost histories
- Additional source materials
- Clarifications and corrections
- Critical analysis

**Download Sources**:
- **Chinese Text Project**: https://ctext.org/wiki.pl?if=en&res=339496
  - Includes both original text and commentary marked
  - Can toggle commentary on/off

**Local Path**: `data/sources/historical/sanguozhi-zhu/`

**Citation**:
```
Chen Shou (陈寿). Sanguozhi (三国志), with commentary by Pei Songzhi (裴松之).
Liu Song Dynasty, 429-431 CE.
```

**Status**: ⏳ To download
**Priority**: 🟡 High (MVP Phase 2-3)
**Reliability**: Primary historical source with scholarly commentary

---

### 3. 后汉书 (Book of Later Han / Hou Han Shu)

**Author**: Fan Ye (范晔), 398-445 CE
**Dynasty**: Liu Song
**Date**: c. 445 CE
**Coverage**: 25-220 CE (Eastern Han Dynasty)
**Size**: Very large (entire dynasty)
**Language**: Classical Chinese

**About**:
Official history of the Eastern Han Dynasty. Provides essential background for understanding the Three Kingdoms period, especially the fall of the Han Dynasty.

**Relevant Sections** (for this project):
- Chapters 54-90: Late Eastern Han period
- Focus: 184-220 CE (Yellow Turban Rebellion to end of Han)

**Download Sources**:
- **Chinese Text Project**: https://ctext.org/hou-han-shu
  - Full text online
  - Can export specific chapters

- **ChineseNotes.com**: https://chinesenotes.com/houhanshu.html
  - Alternative online access

**Local Path**: `data/sources/historical/hou-han-shu/late-han/`

**Citation**:
```
Fan Ye (范晔). Hou Han Shu (后汉书) [Book of Later Han].
Liu Song Dynasty, c. 445 CE.
```

**Status**: ⏳ To download (selective sections)
**Priority**: 🟡 Medium (MVP Phase 1-2)
**Reliability**: Primary historical source

---

### 4. 资治通鉴 (Comprehensive Mirror in Aid of Governance / Zizhi Tongjian)

**Author**: Sima Guang (司马光), 1019-1086 CE
**Dynasty**: Northern Song
**Date**: 1084 CE
**Coverage**: 403 BCE - 959 CE
**Size**: ~3 million characters, 294 scrolls
**Language**: Classical Chinese

**About**:
Comprehensive chronological history compiled by Sima Guang. More readable than the official histories, provides narrative flow of events.

**Relevant Sections** (for this project):
- Volumes covering 184-280 CE (Three Kingdoms period)
- Approximately scrolls 58-85

**Download Sources**:
- **Internet Archive**: https://archive.org/details/modern-chinese-zizhi-tongjian
  - Modern Chinese version
  - Multiple formats

- **Chinese Text Project**: https://ctext.org/datawiki.pl?if=en&res=176090
  - Classical Chinese online
  - Full text with search

**Local Path**: `data/sources/historical/zizhi-tongjian/three-kingdoms-period/`

**Citation**:
```
Sima Guang (司马光). Zizhi Tongjian (资治通鉴)
[Comprehensive Mirror in Aid of Governance].
Northern Song Dynasty, 1084 CE.
```

**Status**: ⏳ To download (selective sections)
**Priority**: 🟢 Lower (Phase 3)
**Reliability**: Secondary historical source (compilation)

---

## Literary Sources

### 5. 三国演义 (Romance of the Three Kingdoms)

**Author**: Luo Guanzhong (罗贯中), c. 1330-1400 CE
**Dynasty**: Yuan/Ming
**Date**: 14th century (various editions)
**Size**: 120 chapters
**Language**: Vernacular Chinese

**About**:
Historical novel that dramatizes the Three Kingdoms period. Blends historical events with fiction, legend, and creative embellishment.

**Local Copy**: ✅ **Already in repository**
- Path: `src/` (120 .txt files, one per chapter)
- Status: Complete Chinese text

**Online Sources**:
- **Chinese Text Project**: https://ctext.org/sanguo-yanyi
- **Project Gutenberg**: https://www.gutenberg.org/ebooks/23950

**Citation**:
```
Luo Guanzhong (罗贯中). Sanguo Yanyi (三国演义)
[Romance of the Three Kingdoms].
Ming Dynasty, 14th century.
```

**Status**: ✅ Complete
**Priority**: ✅ Already have
**Reliability**: Literary fiction (based on history)

---

## English Translations

### 6. Romance of the Three Kingdoms - Moss Roberts Translation

**Translator**: Moss Roberts
**Publisher**: University of California Press / Foreign Languages Press
**Date**: 1991, revised 1999
**Language**: English
**Status**: Under copyright

**About**:
Scholarly complete translation with annotations. Generally considered the best English translation.

**Acquisition**:
- Purchase: University of California Press
- License: Required for reproduction
- Alternative: License for digital display

**Local Path**: `data/sources/translations/english/novel/moss-roberts/` (future)

**Status**: ⏳ To license
**Priority**: 🟡 Phase 6 (English localization)

---

### 7. Romance of the Three Kingdoms - Brewitt-Taylor Translation

**Translator**: C.H. Brewitt-Taylor
**Publisher**: Kelly & Walsh
**Date**: 1925
**Language**: English
**Status**: **Public domain** (published before 1928)

**About**:
Early complete English translation. Language is somewhat dated but serviceable.

**Download Sources**:
- **Internet Archive**: https://archive.org/details/romanceofthreeki01loku
- **Project Gutenberg**: Various editions available

**Local Path**: `data/sources/translations/english/novel/brewitt-taylor/`

**Status**: ⏳ To download
**Priority**: 🟢 Phase 6 or earlier for reference

---

### 8. Historical Records Translations - Rafe de Crespigny

**Translator**: Rafe de Crespigny
**Works**:
- "A Biographical Dictionary of Later Han to the Three Kingdoms (23-220 AD)" (2007)
- "To Establish Peace" (1996) - Hou Han Shu chapters covering Three Kingdoms
- "Emperor Huan and Emperor Ling" (1989)

**Publisher**: Brill Academic / Australian National University
**Language**: English
**Coverage**: 57-220 CE

**Download Sources**:
- Australian National University digital repository
- May require academic institution access

**Status**: ⏳ To acquire
**Priority**: 🟡 Phase 2-3 (for scholarly reference)

---

## Maps and Geographic Data

### 9. Historical Maps

**Needed**:
- China political map (220-280 CE)
- Kingdom boundaries by year (Wei, Shu, Wu)
- Major cities and capitals
- Battle locations
- Trade routes and geography

**Potential Sources**:
- CHGIS (China Historical GIS) - Harvard University
- Academic publications (public domain where possible)
- Museums and historical atlases
- Commission custom maps

**Local Path**: `data/sources/media/maps/`

**Status**: ⏳ To acquire/commission
**Priority**: 🟡 Phase 2-3

---

## Academic and Scholarly Sources

### 10. Modern Scholarship

**Types Needed**:
- Character biographies and analysis
- Battle analysis and strategy
- Cultural and social context
- Archaeological findings
- Textual criticism

**Sources**:
- Academic journals
- Monographs and dissertations
- Museum publications
- Conference proceedings

**Local Path**: `data/sources/analysis/academic-papers/`

**Status**: ⏳ Ongoing collection
**Priority**: 🟢 Phase 3+

---

## Artwork and Visual Media

### 11. Character Portraits

**Needed**:
- Traditional painting style portraits for major characters
- Historically appropriate clothing and aesthetics
- High resolution for web display

**Acquisition Strategy**:
- Commission original artwork
- License from artists
- Use public domain historical paintings

**Local Path**: `data/sources/media/artwork/character-portraits/`

**Status**: ⏳ To commission/acquire
**Priority**: 🟡 Phase 5

---

### 12. Battle Diagrams and Charts

**Needed**:
- Battle formation diagrams
- Family tree visualizations
- Kingdom organizational charts
- Timeline visualizations

**Creation Strategy**:
- Create original diagrams
- Design custom visualizations
- Commission illustrations

**Local Path**: `data/sources/media/diagrams/`

**Status**: ⏳ To create
**Priority**: 🟡 Phase 3-5

---

## Download Priority Summary

### Phase 1 (Weeks 1-4) - Critical
- [x] 三国演义 (Romance) - Already have
- [ ] 三国志 (Records) - Download from Project Gutenberg
- [ ] Create directory structure

### Phase 2 (Weeks 5-8) - High Priority
- [ ] 三国志注 (Annotated Records)
- [ ] 后汉书 (Late Han sections)
- [ ] Brewitt-Taylor translation (reference)

### Phase 3 (Weeks 9-16) - Medium Priority
- [ ] 资治通鉴 (Three Kingdoms sections)
- [ ] Historical maps
- [ ] De Crespigny translations (if accessible)

### Phase 6+ (Long-term)
- [ ] License Moss Roberts translation
- [ ] Academic papers and analysis
- [ ] Commission artwork
- [ ] Create original diagrams

---

## Quick Download Commands

For users with unrestricted internet access:

```bash
# Navigate to project root
cd Romance-of-the-Three-Kingdoms

# Download 三国志 (Records)
curl -L https://www.gutenberg.org/cache/epub/25606/pg25606.txt \
  -o data/sources/historical/sanguozhi/sanguozhi-full.txt

# Download 三国演义 (Romance, if needed)
# Already in src/ directory

# Download Brewitt-Taylor English translation
curl -L https://www.gutenberg.org/files/10610/10610-0.txt \
  -o data/sources/translations/english/novel/brewitt-taylor/rotk-english.txt
```

---

## License Summary

| Source | Status | Use Case |
|--------|--------|----------|
| 三国志 | Public domain | Unrestricted |
| 三国演义 | Public domain | Unrestricted |
| 后汉书 | Public domain | Unrestricted |
| 资治通鉴 | Public domain (classical text) | Unrestricted |
| Brewitt-Taylor translation | Public domain (1925) | Unrestricted |
| Moss Roberts translation | Copyright | Requires license |
| Modern scholarship | Copyright (varies) | Citation required |
| Commissioned artwork | Owned | Full rights |

---

## Attribution Requirements

All sources must be properly attributed in:
1. Database (`sources` table)
2. UI (source badges on facts)
3. API responses (source metadata)
4. Documentation

**Standard citation format**:
```json
{
  "source_id": "uuid",
  "title": {"zh": "三国志", "en": "Records of the Three Kingdoms"},
  "author": {"zh": "陈寿", "en": "Chen Shou"},
  "date": "289 CE",
  "type": "history",
  "reliability": "primary",
  "license": "public_domain",
  "url": "https://www.gutenberg.org/ebooks/25606"
}
```

---

## Next Steps

1. **Download Phase 1 sources** (from unrestricted network)
2. **Verify downloads** (encoding, completeness)
3. **Document metadata** (create source records)
4. **Begin extraction** (parse character names, events)
5. **Import to database** (via Prisma)

---

**Document Status**: Active Reference
**Maintained By**: Project Team
**Update Frequency**: As new sources are added

---

## Useful Links

- **Chinese Text Project**: https://ctext.org
- **Project Gutenberg**: https://www.gutenberg.org
- **Internet Archive**: https://archive.org
- **CHGIS (Maps)**: https://chgis.fas.harvard.edu
- **Brill Academic**: https://brill.com
