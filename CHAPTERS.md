# Chapter Reading Guide

Complete guide for reading Romance of the Three Kingdoms on the Three Kingdoms Platform.

## Overview

The platform provides access to all **120 chapters** of Romance of the Three Kingdoms (三国演义) with a beautiful, traditional Chinese reading experience.

## Features

### Chapter List (`/chapters`)
- Grid view of all 120 chapters
- Each chapter card displays:
  - Chapter number (第 X 回)
  - Chinese title
  - Summary preview (first paragraph)
- Hover effects for visual feedback
- Information about the work and edition

### Chapter Viewer (`/chapters/:number`)
- **Traditional Chinese Typography**:
  - Noto Serif SC font for authentic feel
  - Proper text justification
  - 8-space paragraph indentation (traditional style)
  - Optimized line spacing (2.0) for readability
  - Letter spacing (0.05em) for clarity

- **Navigation**:
  - Previous/Next chapter buttons
  - Back to chapters list
  - Disabled state for first/last chapters
  - Sticky header showing chapter info

- **Visual Design**:
  - Decorative chapter title with borders
  - Traditional vermillion accents
  - "本回完" end marker
  - Source attribution panel

- **Character Hover Cards** ✨ NEW:
  - Automatic character name detection in chapter text
  - Color-coded character names by kingdom:
    - Wei (魏): Blue
    - Shu (蜀): Red
    - Wu (吴): Green
    - Han (汉): Yellow
  - Hover over character names to see profile preview:
    - Chinese and English names
    - Kingdom badge
    - Life span (birth-death years)
    - Quick summary (first 2 sentences)
    - Key character traits
    - Link to full profile page
  - Smart detection algorithm:
    - Prioritizes longer names to avoid overlap
    - Skips single-character names to reduce false positives
    - Handles multiple occurrences in same paragraph
  - Smooth fade-in animation
  - Intelligent positioning to stay within viewport

## Importing Chapters

### Prerequisites
- PostgreSQL database running
- Database migrated (Prisma schema applied)

### Import Process

```bash
# 1. Ensure database is running
./scripts/docker-dev.sh start

# 2. Run migrations if not done
./scripts/docker-dev.sh db-migrate

# 3. Import all 120 chapters
npm run import:chapters
```

### What Happens During Import

The import script (`scripts/import-chapters.ts`):

1. **Reads chapter files** from `src/` directory
2. **Parses each file**:
   - Extracts chapter number from filename
   - Extracts title from first line
   - Splits content into paragraphs
3. **Creates source record** if doesn't exist:
   - ID: `romance-full`
   - Title: 三国演义 / Romance of the Three Kingdoms
   - Author: 罗贯中 / Luo Guanzhong
   - Type: LITERARY
   - Reliability: fiction
4. **Imports chapters**:
   - Checks for duplicates
   - Inserts chapter with metadata
   - Reports progress

### Import Output

```
📚 Starting chapter import from: /path/to/src
────────────────────────────────────────────────────────────
Found 120 chapter files
✅ Chapter 1: 宴桃园豪杰三结义 斩黄巾英雄首立功
✅ Chapter 2: 张翼德怒鞭督邮 何国舅谋诛宦竖
...
✅ Chapter 120: 荐杜预老将献新谋 降孙皓三分归一统
────────────────────────────────────────────────────────────
📊 Import Summary:
   ✅ Imported: 120
   ⏭️  Skipped:  0
   ❌ Errors:   0
   📚 Total:    120
────────────────────────────────────────────────────────────
✨ Import complete!
```

## GraphQL API

### Queries

#### Get Single Chapter
```graphql
query GetChapter($chapterNumber: Int!) {
  chapter(chapterNumber: $chapterNumber) {
    id
    chapterNumber
    title
    content
    summary
    metadata
    source {
      id
      title
      author
      type
    }
    createdAt
    updatedAt
  }
}
```

**Example**:
```graphql
{
  chapter(chapterNumber: 1) {
    title
    content
  }
}
```

#### Get All Chapters
```graphql
query GetAllChapters {
  chapters {
    id
    chapterNumber
    title
    summary
  }
}
```

#### Get Chapter Count
```graphql
query GetChapterCount {
  chaptersCount
}
```

### Data Structure

**Chapter** type:
```typescript
{
  id: string;              // UUID
  chapterNumber: number;   // 1-120
  title: {
    zh: string;           // Chinese title
    en: string;           // English title (optional)
  };
  content: {
    zh: string;           // Full chapter text
    en?: string;          // English translation (future)
  };
  summary: {
    zh: string;           // Chapter summary
    en?: string;
  };
  metadata: {
    paragraphCount: number;
    characterCount: number;
    filename: string;
  };
  sourceId: string;        // Reference to source
  source: Source;          // Source relationship
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

## File Structure

### Source Files
Location: `src/`

Format:
```
1.宴桃园豪杰三结义 斩黄巾英雄首立功.txt
2.张翼德怒鞭督邮 何国舅谋诛宦竖.txt
...
120.荐杜预老将献新谋 降孙皓三分归一统.txt
```

Each file contains:
```
第一回 宴桃园豪杰三结义 斩黄巾英雄首立功

滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。
　　青山依旧在，几度夕阳红。　　白发渔樵江渚上，惯
　　看秋月春风。一壶浊酒喜相逢。古今多少事，都付
　　笑谈中。
...
```

## Frontend Components

### Chapters.tsx
- Main chapter list page
- Grid layout with chapter cards
- About section
- Responsive design

### ChapterViewer.tsx
- Individual chapter reader
- Traditional typography
- Navigation controls
- Source information

### Styling
All chapters use:
- `font-zh-serif`: Noto Serif SC
- `text-ink-black`: #1A1A1A
- `text-vermillion`: #C73E1D (accents)
- `bg-rice-white`: #F9F7F4 (background)

## Reading Experience

### Desktop
- Centered content (max-width: 4xl)
- Generous margins and padding
- Easy-to-read line length
- Clear navigation buttons

### Mobile
- Responsive typography
- Touch-friendly navigation
- Optimized line length
- Maintains traditional aesthetics

### Traditional Chinese Elements
1. **Chapter Title**:
   - Decorative top/bottom borders
   - "第X回" in large characters
   - Title centered below

2. **Content**:
   - 8-space paragraph indentation
   - Justified text alignment
   - 2.0 line height
   - Proper character spacing

3. **End Marker**:
   - "— 本回完 —" in vermillion
   - Circular border
   - Centered placement

## Future Enhancements

### Phase 2 Additions (Planned)
- **Character Hover Cards**: Hover over character names to see profiles
- **Reading Progress**: Track which chapters you've read
- **Bookmarks**: Save your place in chapters
- **Search**: Find text within chapters
- **Notes**: Add personal notes to chapters

### Phase 3+ Additions
- **English Translation**: Side-by-side with Chinese
- **Audio Narration**: Professional Chinese narration
- **Character Highlighting**: Visual highlighting of character mentions
- **Historical Notes**: Inline annotations explaining historical context
- **Parallel Viewing**: Compare literary vs historical accounts

## Troubleshooting

### Import Fails
**Issue**: Import script errors out

**Solutions**:
1. Check database is running: `./scripts/docker-dev.sh health`
2. Verify migrations ran: `./scripts/docker-dev.sh db-migrate`
3. Check chapter files exist in `src/` directory
4. Ensure DATABASE_URL is set correctly

### Chapters Don't Display
**Issue**: Chapter list or viewer shows errors

**Solutions**:
1. Verify chapters were imported: Check database
2. Check GraphQL API is running: http://localhost:4000/graphql
3. Verify frontend can connect to API
4. Check browser console for errors

### Chinese Characters Don't Display
**Issue**: Characters show as boxes or question marks

**Solutions**:
1. Ensure fonts are loading (check Network tab)
2. Verify UTF-8 encoding in database
3. Check browser supports Chinese fonts
4. Try different browser

### Navigation Buttons Don't Work
**Issue**: Previous/Next buttons don't navigate

**Solutions**:
1. Check React Router is working
2. Verify chapter numbers are valid (1-120)
3. Check browser console for errors
4. Try refreshing the page

## API Examples

### Using cURL

**Get chapter 1**:
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { chapter(chapterNumber: 1) { title content } }"
  }'
```

**Get all chapters**:
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { chapters { chapterNumber title } }"
  }'
```

### Using Apollo Client (React)

```typescript
import { gql, useQuery } from '@apollo/client';

const GET_CHAPTER = gql`
  query GetChapter($chapterNumber: Int!) {
    chapter(chapterNumber: $chapterNumber) {
      id
      title
      content
    }
  }
`;

function ChapterComponent({ number }: { number: number }) {
  const { loading, error, data } = useQuery(GET_CHAPTER, {
    variables: { chapterNumber: number },
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return <div>{data.chapter.content.zh}</div>;
}
```

## Performance Considerations

### Content Size
- Each chapter: ~10-20KB of Chinese text
- 120 chapters total: ~1.5MB total content
- Gzipped transfer: ~500KB

### Optimization Tips
1. **Lazy Load**: Only fetch chapter when needed
2. **Cache**: Apollo Client caches chapter data
3. **Pagination**: Chapter list loads all at once (acceptable for 120 items)
4. **Images**: Minimize use in chapter viewer for fast loading

### Database Indexes
Recommended indexes (already in Prisma schema):
```prisma
@@unique([chapterNumber])
@@index([sourceId])
```

## Accessibility

### Screen Readers
- Semantic HTML (`<article>`, `<nav>`, `<header>`)
- ARIA labels on navigation buttons
- Proper heading hierarchy

### Keyboard Navigation
- Tab through navigation elements
- Enter/Space to click buttons
- Arrow keys for prev/next (future enhancement)

### Visual
- High contrast text (ink black on rice white)
- Readable font sizes (18px base, scales up to 20px)
- Clear focus indicators

## Technical Details

### Database Schema
```prisma
model Chapter {
  id            String   @id @default(uuid())
  chapterNumber Int      @unique
  title         Json
  content       Json
  summary       Json?
  sourceId      String?
  source        Source?  @relation(fields: [sourceId], references: [id])
  metadata      Json?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([sourceId])
}
```

### File Parsing Logic
1. Extract number from filename regex: `/^(\d+)\./`
2. Extract title from first line regex: `/第.+回\s+(.+)/`
3. Split content by double newlines for paragraphs
4. Store in JSONB for multilingual support

---

**Version**: 1.0
**Last Updated**: 2026-01-12
**Chapters Available**: 120/120
**Language Support**: Chinese (zh), English (en) - partial
