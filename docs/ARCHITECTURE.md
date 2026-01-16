# Three Kingdoms Digital Platform - Architecture & Planning

## Project Vision

A comprehensive, design-focused web application that serves as the definitive resource for exploring the Three Kingdoms period - blending literature, history, analysis, and cultural artifacts into an elegant, accessible experience.

### Core Differentiation
- **Design Excellence**: Perfect blend of modern minimalism and traditional Chinese aesthetics
- **Historical Completeness**: Multiple sources with proper attribution and conflict resolution
- **Depth & Accuracy**: Distinguished presentation of literary vs historical facts
- **Evolving Scope**: Built for continuous expansion with new sources and insights

---

## Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite (fast, modern, excellent DX)
- **Styling**:
  - Tailwind CSS (utility-first, customizable)
  - CSS Modules for component-specific styles
  - Design tokens for theming (modern + traditional aesthetics)
- **State Management**:
  - Zustand (lightweight, simple) or Redux Toolkit
  - React Query for server state
- **Routing**: React Router v6
- **UI Components**:
  - Headless UI (Radix UI or similar) for accessibility
  - Custom components with traditional Chinese design patterns
- **Visualization**:
  - D3.js for timeline and custom visualizations
  - React Flow or Cytoscape.js for relationship graphs
  - Leaflet or Mapbox for historical maps
- **i18n**: react-i18next (multilingual support)

### Backend
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**:
  - **Option A**: Express.js (mature, flexible)
  - **Option B**: Fastify (faster, modern)
  - **Recommendation**: Fastify for performance + modern patterns
- **API Design**:
  - RESTful APIs for simple operations
  - GraphQL (Apollo Server) for complex queries (recommended for relationship-heavy data)
- **Authentication**:
  - Azure AD B2C integration (future)
  - JWT tokens
- **File Storage**: Azure Blob Storage (images, maps, documents)
- **Search**:
  - Elasticsearch or Azure Cognitive Search
  - Full-text search in Chinese (critical)
- **Cache**: Redis (Azure Cache for Redis)

### Database Architecture (CRITICAL)

**Hybrid Approach - Best for this project:**

1. **PostgreSQL** (Primary Database)
   - Structured data: characters, events, chapters, sources
   - JSONB columns for flexible metadata
   - Full-text search capabilities (pg_trgm, zhparser for Chinese)
   - Excellent for complex queries and relationships
   - Azure Database for PostgreSQL

2. **Graph Database Layer** (Optional, Phase 2)
   - Neo4j for complex relationship queries
   - Character relationships, factional affiliations
   - "Six degrees of separation" style queries
   - Can be added later without restructuring

**Why PostgreSQL Primary:**
- Handles relationships well with proper foreign keys
- JSONB for flexible source attribution
- Mature, reliable, Azure-native
- Can evolve to hybrid with graph DB later
- Excellent TypeScript tooling (Prisma, TypeORM, Drizzle)

### Infrastructure (Azure)
- **Hosting**: Azure App Service or Azure Container Apps
- **Database**: Azure Database for PostgreSQL (Flexible Server)
- **Storage**: Azure Blob Storage
- **CDN**: Azure CDN (static assets, images)
- **Search**: Azure Cognitive Search (Chinese language support)
- **Cache**: Azure Cache for Redis
- **CI/CD**: GitHub Actions → Azure DevOps
- **Monitoring**: Azure Application Insights

### Development Tools
- **ORM**: Prisma (TypeScript-first, excellent DX, migrations)
- **API Documentation**: OpenAPI/Swagger
- **Testing**:
  - Vitest (unit tests)
  - Playwright (E2E tests)
  - React Testing Library
- **Code Quality**:
  - ESLint + Prettier
  - Husky (pre-commit hooks)
  - TypeScript strict mode
- **Monorepo** (optional): Turborepo or Nx

---

## Data Model Design

### Core Principles
1. **Source Attribution**: Every fact tied to source(s)
2. **Multi-Version Support**: Literary vs historical representations
3. **Conflict Resolution**: Explicit handling of contradictions
4. **Extensibility**: Easy to add new sources
5. **Provenance Tracking**: Who added/verified data, when

### Entity Relationship Overview

```
Sources (books, records, analysis)
  ↓
Facts (atomic pieces of information)
  ↓
Characters, Events, Locations, Relationships
  ↓
Narratives (chapter readings, timelines)
```

### Key Entities (PostgreSQL Schema)

#### 1. Sources
```typescript
Source {
  id: uuid
  type: enum('novel', 'history', 'analysis', 'artwork', 'map')
  title: string
  author: string
  era: string (e.g., "14th century", "Ming Dynasty")
  language: string
  reliability_tier: enum('primary', 'secondary', 'tertiary', 'fiction')
  description: jsonb (multilingual)
  metadata: jsonb
  created_at: timestamp
  updated_at: timestamp
}
```

#### 2. Characters
```typescript
Character {
  id: uuid
  // Identity
  canonical_name: jsonb { zh: "刘备", en: "Liu Bei" }
  courtesy_name: jsonb { zh: "玄德" }
  aliases: jsonb[] (all known names)

  // Core Info
  birth_year: int (can be null, can be approximate)
  death_year: int
  birth_location_id: uuid

  // Categorization
  kingdom: enum('Wei', 'Shu', 'Wu', 'Han', 'Other')
  social_class: string
  occupations: string[]

  // Multi-source representation
  historical_profile: jsonb {
    summary: { zh: "...", en: "..." }
    personality_traits: string[]
    achievements: string[]
    sources: uuid[] (reference to Sources)
  }

  literary_profile: jsonb {
    summary: { zh: "...", en: "..." }
    personality_traits: string[]
    famous_scenes: string[]
    sources: uuid[]
  }

  // Rich Content
  biography: jsonb (multilingual, markdown)
  images: jsonb[] (portraits, artwork)
  quotes: jsonb[]

  // Meta
  created_at: timestamp
  updated_at: timestamp
  verified: boolean
  verification_notes: text
}
```

#### 3. Relationships
```typescript
CharacterRelationship {
  id: uuid
  character_a_id: uuid
  character_b_id: uuid
  relationship_type: enum(
    'sworn_brother', 'family', 'spouse', 'parent_child',
    'lord_vassal', 'friend', 'rival', 'enemy', 'mentor_student'
  )

  // Source-aware
  relationship_source: enum('historical', 'literary', 'both')
  sources: uuid[]

  // Context
  start_year: int
  end_year: int (null = ongoing)
  description: jsonb (multilingual)
  strength: int (1-10, for graph visualization)

  // Directional (if needed)
  is_reciprocal: boolean

  created_at: timestamp
}
```

#### 4. Events
```typescript
Event {
  id: uuid

  // Identity
  name: jsonb { zh: "赤壁之战", en: "Battle of Red Cliffs" }
  type: enum('battle', 'political', 'personal', 'natural', 'cultural')

  // Temporal
  date_year: int
  date_month: int (nullable)
  date_day: int (nullable)
  date_precision: enum('exact', 'approximate', 'era')
  duration_days: int (nullable)

  // Spatial
  location_id: uuid

  // Content
  description: jsonb (multilingual, markdown)
  significance: jsonb (why it matters)

  // Multi-source handling
  historical_account: jsonb {
    summary: text
    sources: uuid[]
  }
  literary_account: jsonb {
    summary: text
    sources: uuid[]
    dramatization_notes: text
  }

  // Participants
  participants: jsonb[] {
    character_id: uuid
    role: string (e.g., "commander", "strategist")
  }

  // Consequences
  outcomes: jsonb[]
  leads_to_event_ids: uuid[] (causal chain)

  created_at: timestamp
  updated_at: timestamp
}
```

#### 5. Locations
```typescript
Location {
  id: uuid
  name: jsonb { zh: "长安", en: "Chang'an" }
  modern_name: jsonb
  type: enum('city', 'province', 'battlefield', 'landmark')

  // Geography
  coordinates: point (latitude, longitude)
  region: string

  // Historical context
  controlling_kingdom: string (changes over time)
  historical_significance: jsonb

  // Rich content
  description: jsonb (multilingual)
  images: jsonb[] (maps, photos, artwork)

  created_at: timestamp
}
```

#### 6. Chapters (Novel)
```typescript
Chapter {
  id: uuid
  number: int (1-120)
  title: jsonb { zh: "宴桃园豪杰三结义 斩黄巾英雄首立功" }

  // Content
  content: text (Chinese text)
  content_en: text (English translation, nullable)
  summary: jsonb (multilingual)

  // Structure
  scenes: jsonb[] {
    title: string
    content: text
    start_position: int
    end_position: int
  }

  // Annotations
  annotations: jsonb[] {
    position: int
    type: enum('historical_note', 'character_intro', 'event_reference')
    content: jsonb
    references: uuid[] (to characters, events, etc.)
  }

  // Analysis
  key_characters: uuid[]
  key_events: uuid[]
  themes: string[]

  created_at: timestamp
  updated_at: timestamp
}
```

#### 7. Facts (Source Attribution System)
```typescript
Fact {
  id: uuid
  entity_type: enum('character', 'event', 'relationship', 'location')
  entity_id: uuid

  // The claim
  claim_type: string (e.g., "birth_year", "personality_trait", "battle_outcome")
  claim_value: jsonb (flexible value storage)

  // Attribution
  source_id: uuid
  source_citation: string (specific page, chapter, etc.)
  reliability_score: float (0-1, computed or manual)

  // Conflict resolution
  conflicts_with: uuid[] (other fact IDs)
  consensus_level: enum('unanimous', 'majority', 'disputed', 'unique')

  // Verification
  verified_by: string (user/admin ID)
  verification_date: timestamp
  verification_notes: text

  created_at: timestamp
}
```

#### 8. Timeline Entries
```typescript
TimelineEntry {
  id: uuid
  year: int
  month: int (nullable)
  day: int (nullable)

  // Reference
  event_id: uuid (nullable)
  character_id: uuid (nullable - for birth/death)
  description: jsonb (if not tied to event)

  // Display
  importance: int (1-10, for filtering)
  category: string

  created_at: timestamp
}
```

### Advanced Features Data Model

#### Search Index Structure
```typescript
SearchIndex {
  id: uuid
  entity_type: enum('character', 'event', 'location', 'chapter')
  entity_id: uuid

  // Searchable content
  search_text_zh: text (Chinese content)
  search_text_en: text (English content)
  keywords: string[]

  // Metadata for ranking
  importance_score: float
  view_count: int

  // Full-text search vector
  search_vector: tsvector
}
```

#### User Interaction (Future)
```typescript
UserNote {
  id: uuid
  user_id: uuid
  entity_type: enum('character', 'event', 'chapter')
  entity_id: uuid
  note_content: text
  is_public: boolean
  created_at: timestamp
}

UserHighlight {
  id: uuid
  user_id: uuid
  chapter_id: uuid
  start_position: int
  end_position: int
  highlight_color: string
  note: text (nullable)
  created_at: timestamp
}
```

---

## Handling Multi-Source Truth

### Strategy: Layered Presentation

#### 1. Default View (Consensus)
- Show information with broad agreement
- Indicate when sources disagree
- Visual cues for reliability tiers

#### 2. Source Comparison View
```
Character: 刘备 (Liu Bei)

┌─────────────────────────────────────┐
│ Literary Portrait (Romance Novel)   │
│ • Virtuous, humble, kind ruler      │
│ • Tears easily, deeply emotional    │
│ • "Heroic but indecisive"           │
│ Source: Romance of Three Kingdoms   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Historical Record (Records)         │
│ • Pragmatic military leader         │
│ • Skilled at gaining loyalty        │
│ • "Ambitious and calculating"       │
│ Source: Records of Three Kingdoms   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Modern Analysis                     │
│ • Balanced view of both portrayals  │
│ • Context of era's values           │
│ Source: [Historian name, date]      │
└─────────────────────────────────────┘
```

#### 3. Source Attribution UI
Every claim shows:
- 📚 Source type icon
- 🔍 Click to see full citation
- ⚖️ Reliability indicator
- 🔄 Alternative views available

#### 4. Conflict Resolution System
```typescript
// UI Component concept
<FactPresentation>
  <PrimaryFact reliability="high">
    Liu Bei born in 161 AD
    <Sources>
      <Source type="historical" />
      <Source type="analysis" count={3} />
    </Sources>
  </PrimaryFact>

  <AlternativeFacts>
    <Fact reliability="medium">
      Some sources suggest 160 AD
      <Sources>
        <Source type="secondary" count={1} />
      </Sources>
    </Fact>
  </AlternativeFacts>

  <UserAction>
    <Button>See detailed comparison</Button>
    <Button>Report issue</Button>
  </UserAction>
</FactPresentation>
```

---

## Design System Foundation

### Visual Language

#### Color Palette (Traditional Chinese + Modern)
```scss
// Primary Colors (inspired by traditional Chinese colors)
$vermillion: #C73E1D;      // 朱红 (imperial, important elements)
$imperial-yellow: #F8D147; // 明黄 (highlights, accents)
$ink-black: #1A1A1A;       // 墨色 (primary text)
$rice-white: #F9F7F4;      // 米白 (backgrounds)

// Secondary Colors
$jade-green: #2C5F2D;      // 青玉 (success, nature)
$indigo-blue: #3A4B8A;     // 靛蓝 (links, info)
$bronze: #8B6914;          // 古铜 (metadata, secondary)

// Kingdom Colors
$wei-blue: #3A5BA0;        // 魏国蓝
$shu-red: #C73E1D;         // 蜀国红
$wu-green: #2C5F2D;        // 吴国绿

// Neutral Grays (modern)
$gray-50: #FAFAFA;
$gray-100: #F5F5F5;
// ... through to gray-900
```

#### Typography
```scss
// Chinese Fonts
font-family-zh-serif: 'Noto Serif SC', 'Source Han Serif SC', serif;
font-family-zh-sans: 'Noto Sans SC', 'Source Han Sans SC', sans-serif;

// English Fonts
font-family-en-serif: 'Crimson Pro', 'Georgia', serif;
font-family-en-sans: 'Inter', 'Helvetica Neue', sans-serif;

// Hierarchy
heading-1: 48px / 60px (traditional titles)
heading-2: 36px / 48px (section headers)
heading-3: 24px / 32px (subsections)
body: 16px / 28px (reading comfort)
caption: 14px / 20px (metadata)
```

#### Layout Principles
1. **Vertical Rhythm**: Traditional Chinese reading flow (top to bottom, right to left) as optional mode
2. **White Space**: Generous spacing (breath/呼吸感)
3. **Grid System**: 12-column, responsive
4. **Breakpoints**: Mobile-first (320px, 768px, 1024px, 1440px, 1920px)

#### Design Elements
- **Borders**: Inspired by traditional Chinese painting frames
- **Patterns**: Subtle cloud patterns (云纹), wave patterns (海水纹) as backgrounds
- **Icons**: Custom icon set blending modern and traditional
- **Seals/Stamps**: 印章 style elements for emphasis
- **Scroll Metaphor**: Chapter reading UI as unrolling scroll

### Component Architecture

#### Design Tokens (design-tokens.ts)
```typescript
export const tokens = {
  colors: {
    primary: { /* ... */ },
    kingdoms: { wei: '...', shu: '...', wu: '...' }
  },
  typography: { /* ... */ },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  shadows: { /* soft shadows for depth */ },
  transitions: { fast: '150ms', normal: '300ms', slow: '500ms' },
  borders: {
    traditional: '2px solid with decorative corners',
    modern: '1px solid with rounded corners'
  }
}
```

#### Component Library Structure
```
/components
  /primitives      (Button, Input, Card)
  /layout          (Container, Grid, Stack)
  /navigation      (Navbar, Sidebar, Breadcrumbs)
  /data-display    (Timeline, RelationshipGraph, CharacterCard)
  /chinese-elements (Seal, Scroll, Pattern)
  /features        (ChapterReader, CharacterProfile, EventTimeline)
```

---

## Application Architecture

### Frontend Architecture

```
/apps
  /web               (main web application)
    /src
      /assets        (images, fonts, icons)
      /components    (React components)
      /features      (feature-based modules)
        /characters
          /components
          /hooks
          /services
          /types
        /events
        /timeline
        /chapters
        /relationships
      /hooks         (shared hooks)
      /lib           (utilities, helpers)
      /services      (API clients)
      /store         (state management)
      /styles        (global styles, theme)
      /types         (TypeScript types)
      /i18n          (translations)
      App.tsx
      main.tsx

/packages
  /ui               (shared component library)
  /types            (shared TypeScript types)
  /utils            (shared utilities)
```

### Backend Architecture

```
/apps
  /api
    /src
      /modules
        /characters
          character.controller.ts
          character.service.ts
          character.repository.ts
          character.schema.ts
          character.routes.ts
        /events
        /sources
        /search
        /timeline
      /common
        /middleware
        /guards
        /decorators
        /filters
      /config
      /database
        /migrations
        /seeds
      app.ts
      server.ts

/packages
  /database         (Prisma schema, migrations)
  /types            (shared types)
```

### API Design (GraphQL Schema Example)

```graphql
type Character {
  id: ID!
  canonicalName: MultilingualString!
  courtesyName: MultilingualString
  aliases: [MultilingualString!]!

  birthYear: Int
  deathYear: Int
  birthLocation: Location

  kingdom: Kingdom!

  # Multi-source profiles
  historicalProfile: Profile!
  literaryProfile: Profile!

  # Relationships
  relationships: [CharacterRelationship!]!

  # Events
  participatedEvents: [Event!]!

  # Content
  biography: MultilingualMarkdown!
  images: [Image!]!
  quotes: [Quote!]!

  # Metadata
  sources: [Source!]!
  verified: Boolean!
}

type Profile {
  summary: MultilingualString!
  personalityTraits: [String!]!
  achievements: [String!]!
  sources: [Source!]!

  # Differences from other profile
  divergenceNotes: MultilingualString
}

type MultilingualString {
  zh: String!
  en: String
}

type Query {
  # Characters
  character(id: ID!): Character
  characters(
    kingdom: Kingdom
    era: String
    search: String
    limit: Int
    offset: Int
  ): CharacterConnection!

  # Comparison queries
  compareCharacterProfiles(characterId: ID!): ProfileComparison!

  # Timeline
  timeline(
    startYear: Int
    endYear: Int
    importance: Int
  ): [TimelineEntry!]!

  # Relationships
  relationshipGraph(
    characterId: ID!
    depth: Int
  ): RelationshipGraph!

  # Search
  search(
    query: String!
    type: [SearchableType!]
    language: Language!
  ): SearchResults!
}
```

---

## MVP Phase Breakdown

### Phase 1: Foundation (Weeks 1-4)
**Goal**: Project setup + core data model

**Deliverables**:
1. Monorepo setup (Turborepo)
2. Database schema (Prisma)
3. Basic API structure (Fastify + GraphQL)
4. React app boilerplate (Vite + TypeScript)
5. Design system foundation (tokens, primitives)
6. Azure infrastructure setup

**Data**:
- Import all 120 chapters with basic metadata
- Create initial character seed (top 50 characters)
- Basic source records

### Phase 2: Core Features (Weeks 5-8)
**Goal**: Essential reading experience

**Features**:
1. **Chapter Reader**
   - Clean reading interface
   - Scroll animation
   - Character highlighting (hover to see info)
   - Bookmarking
   - Progress tracking

2. **Character Encyclopedia**
   - Character list/grid view
   - Individual character pages
   - Basic profile info
   - Image gallery

3. **Search**
   - Full-text search (Chinese)
   - Filters (character, event, chapter)
   - Search results page

**Design**:
- Implement design system
- Mobile responsive
- Dark/light mode

### Phase 3: Relationships & Timeline (Weeks 9-12)
**Goal**: Interconnected experience

**Features**:
1. **Relationship Graph**
   - Interactive network visualization
   - Filter by relationship type
   - Zoom/pan controls
   - Click to navigate

2. **Timeline Viewer**
   - Chronological view
   - Filter by importance/category
   - Linked to events and characters
   - Visual representation of eras

3. **Event Pages**
   - Event details
   - Participants
   - Historical vs literary accounts
   - Location map

### Phase 4: Multi-Source System (Weeks 13-16)
**Goal**: Handle conflicting information

**Features**:
1. **Source Attribution UI**
   - Source badges on facts
   - Source comparison views
   - Reliability indicators

2. **Dual Profile System**
   - Historical vs Literary tabs
   - Side-by-side comparison
   - Divergence highlighting

3. **Fact Verification System**
   - Admin interface for fact management
   - Conflict flagging
   - Source citation management

### Phase 5: Rich Content (Weeks 17-20)
**Goal**: Enhanced experience

**Features**:
1. **Maps**
   - Interactive historical map
   - Territory changes over time
   - Battle locations
   - Character movement tracking

2. **Multimedia**
   - Character portraits (artwork)
   - Battle diagrams
   - Family trees
   - Video/audio integration (future)

3. **Annotations System**
   - Chapter annotations
   - Historical context notes
   - Translation notes
   - User annotations (future)

---

## Long-Term Roadmap

### Phase 6: English Translation (Months 6-9)
- Full interface translation
- Chapter translations
- Bilingual mode

### Phase 7: Community Features (Months 9-12)
- User accounts
- Personal notes/highlights
- Discussion forums
- Contribution system

### Phase 8: Advanced Features (Year 2)
- AI-powered Q&A
- Character personality analysis
- Strategic battle analysis
- Educational curriculum mode

### Phase 9: Mobile Apps (Year 2-3)
- React Native apps
- Offline reading
- Audio narration

---

## Data Collection Strategy

### Immediate Sources to Gather
1. **三国志 (Records of the Three Kingdoms)** - 65 volumes
2. **后汉书 (Book of Later Han)** - background context
3. English translations of 三国演义 (multiple versions for comparison)
4. Historical maps of the Three Kingdoms period
5. Character genealogy charts
6. Timeline of major events (169-280 AD)

### Source Integration Pipeline
```
New Source → Extraction → Structuring → Attribution → Verification → Integration
```

### Tools for Source Management
- **Spreadsheets** (initial data gathering)
- **Admin Interface** (for structured entry)
- **Import Scripts** (for bulk processing)
- **Verification Queue** (review before publishing)

---

## Development Workflow

### Git Strategy
```
main (production)
  ↓
develop (integration)
  ↓
feature/xyz (development)
```

### Branch Naming
- `feature/character-encyclopedia`
- `feature/timeline-viewer`
- `fix/search-chinese-characters`
- `design/chapter-reader-scroll`

### Commit Convention
```
feat: add character relationship graph
fix: correct timeline date filtering
design: implement scroll animation for chapter reader
data: import 50 character profiles
docs: update API documentation
```

---

## Success Metrics

### MVP Success Criteria
- [ ] 120 chapters readable with clean UI
- [ ] 100+ characters with complete profiles
- [ ] Relationship graph with 500+ connections
- [ ] Timeline with 200+ major events
- [ ] Search working for Chinese text
- [ ] Mobile responsive
- [ ] Load time < 2s

### Long-term Metrics
- User engagement (time on site, pages per session)
- Content completeness (% of characters/events documented)
- Source diversity (number of different sources integrated)
- User contributions (if community features added)
- International reach (language distribution)

---

## Next Steps

1. ✅ Review this architecture
2. ⏭️ Set up project structure
3. ⏭️ Design database schema (Prisma)
4. ⏭️ Create design system foundations
5. ⏭️ Begin data extraction from chapters
6. ⏭️ Build Phase 1 deliverables

---

**Document Status**: Draft v1.0
**Last Updated**: 2026-01-10
**Next Review**: After initial feedback
