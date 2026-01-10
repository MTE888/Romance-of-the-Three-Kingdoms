# Three Kingdoms Digital Platform

## What: Project Overview

A comprehensive **web application** for exploring the Three Kingdoms period (169-280 AD) - blending historical records, literary interpretation, and modern design to create the definitive digital resource for this pivotal era in Chinese history.

### Tech Stack
- **Frontend**: React 18+ with TypeScript, Vite
- **Backend**: Node.js with Fastify, GraphQL (Apollo Server)
- **Database**: PostgreSQL (Azure Database for PostgreSQL)
- **Hosting**: Azure (App Service, Blob Storage, CDN, Cognitive Search)
- **Tools**: Prisma ORM, React Query, Tailwind CSS, D3.js
- **Source**: 120 chapters of 三国演义 (Romance of the Three Kingdoms)

### Repository Structure
```
Romance-of-the-Three-Kingdoms/
├── apps/
│   ├── web/                # React frontend application
│   └── api/                # Node.js backend API
├── packages/
│   ├── ui/                 # Shared component library
│   ├── database/           # Prisma schema and migrations
│   └── types/              # Shared TypeScript types
├── src/                    # Original text source (120 chapters)
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md     # Technical architecture
│   ├── PROJECT_PLANNING.md # Roadmap and planning
│   └── SKILLS.md          # Claude Code skills guide
├── .claude/               # Claude Code configuration
│   └── commands/          # Custom slash commands
├── CLAUDE.md              # This file - project context
└── README.md              # Project introduction
```

## Why: Project Purpose

This platform serves multiple audiences:

1. **Scholars & Researchers** - Multi-source attribution, historical accuracy
2. **Students** - Educational resource with clear explanations
3. **Enthusiasts** - Immersive reading and exploration experience
4. **General Public** - Accessible introduction to Three Kingdoms period

### Core Innovation
**Multi-Source Truth System**: Explicitly distinguishes between:
- Historical records (三国志 - Records of the Three Kingdoms)
- Literary interpretation (三国演义 - Romance of the Three Kingdoms)
- Modern scholarly analysis

All facts attributed to sources with clear reliability indicators.

## How: Development Guidelines

### Project Principles

#### 1. Design-First Approach
- **Design is our differentiator** - every decision should honor this
- Blend modern minimalism with traditional Chinese aesthetics
- Reference: Cloud patterns (云纹), seal stamps (印章), traditional borders
- Color palette: Vermillion, imperial yellow, ink black, rice white, jade green
- Typography: Noto Serif SC for Chinese, Crimson Pro for English

#### 2. Long-Term Evolution
- **Built for change** - scope will evolve as sources are integrated
- Flexible data model using JSONB for extensibility
- Source attribution system supports adding new materials
- Versioned API to support breaking changes gracefully

#### 3. Multi-Source Integrity
- **Never merge conflicting sources** - present them side-by-side
- Every fact links to source(s)
- Clear reliability tiers: primary, secondary, tertiary, fiction
- Dual profile system for characters (historical vs literary)

#### 4. Technical Excellence
- **Performance**: Page load < 2s, search < 500ms
- **Scalability**: Built for growth (100+ characters → 1000+)
- **Accessibility**: WCAG 2.1 AA compliance
- **Security**: Input sanitization, SQL injection prevention, CORS, CSP

### Development Workflow

#### Branch Strategy
```
main (production-ready)
  ↓
develop (integration branch)
  ↓
feature/xyz (feature branches)
```

**Branch Naming**:
- `feature/character-relationship-graph`
- `feature/timeline-viewer`
- `fix/search-chinese-tokenization`
- `design/scroll-animation`
- `data/import-character-profiles`

#### Commit Messages
```
feat(frontend): add character relationship graph visualization
fix(api): correct date filtering in timeline query
design(ui): implement scroll animation for chapter reader
data: import top 50 character profiles with sources
docs: update API documentation for GraphQL schema
perf(db): add indexes for character name searches
```

### Code Quality Standards

#### TypeScript
- **Strict mode** enabled
- No `any` types (use `unknown` if necessary)
- Proper type definitions for all entities
- Shared types in `/packages/types`

#### Components (React)
```typescript
// Good: Functional component with TypeScript
interface CharacterCardProps {
  character: Character;
  onSelect: (id: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSelect
}) => {
  // Implementation
};
```

#### Database Queries (Prisma)
```typescript
// Good: Typed query with proper relations
const character = await prisma.character.findUnique({
  where: { id },
  include: {
    relationships: true,
    events: true,
    sources: true
  }
});
```

#### GraphQL (Apollo)
```graphql
# Good: Well-documented schema
"""
Represents a character from the Three Kingdoms period.
Includes both historical and literary representations.
"""
type Character {
  id: ID!
  canonicalName: MultilingualString!
  "Historical profile based on Records of Three Kingdoms"
  historicalProfile: Profile!
  "Literary profile based on Romance of Three Kingdoms"
  literaryProfile: Profile!
}
```

### Working with Multi-Source Data

#### Source Attribution Pattern
```typescript
// Every fact must link to sources
interface Fact {
  id: string;
  claim: string;
  value: any;
  sourceId: string;  // Required!
  reliability: 'primary' | 'secondary' | 'tertiary' | 'fiction';
  conflictsWith?: string[];  // IDs of conflicting facts
}
```

#### Dual Profile System
```typescript
// Character profiles separate historical vs literary
interface Character {
  id: string;
  canonicalName: MultilingualString;

  // Two distinct profiles
  historicalProfile: {
    summary: string;
    traits: string[];
    achievements: string[];
    sources: Source[];  // Must cite historical records
  };

  literaryProfile: {
    summary: string;
    traits: string[];
    famousScenes: string[];
    sources: Source[];  // Must cite Romance novel
  };
}
```

### Testing Standards

#### Unit Tests
```typescript
// Test all business logic
describe('CharacterService', () => {
  it('should merge profiles from multiple sources', () => {
    // Test multi-source handling
  });

  it('should flag conflicting facts', () => {
    // Test conflict detection
  });
});
```

#### Integration Tests
```typescript
// Test API endpoints
describe('GET /api/characters/:id', () => {
  it('should return character with both profiles', async () => {
    const response = await request(app)
      .get('/api/characters/liu-bei');

    expect(response.body).toHaveProperty('historicalProfile');
    expect(response.body).toHaveProperty('literaryProfile');
  });
});
```

#### E2E Tests (Playwright)
```typescript
// Test critical user flows
test('user can read chapter and view character profile', async ({ page }) => {
  await page.goto('/chapters/1');
  await page.click('text=刘备');
  await expect(page).toHaveURL('/characters/liu-bei');
  await expect(page.locator('h1')).toContainText('刘备');
});
```

### Design System Usage

#### Design Tokens
```typescript
import { tokens } from '@three-kingdoms/ui/tokens';

// Use tokens, not hardcoded values
const styles = {
  color: tokens.colors.kingdoms.shu,  // Not: '#C73E1D'
  spacing: tokens.spacing.lg,         // Not: '24px'
  fontSize: tokens.typography.body,   // Not: '16px'
};
```

#### Component Composition
```tsx
// Compose with layout primitives
<Container>
  <Stack spacing="lg">
    <Heading level={1}>Character Name</Heading>
    <Grid columns={2}>
      <Card>Historical Profile</Card>
      <Card>Literary Profile</Card>
    </Grid>
  </Stack>
</Container>
```

### Database Guidelines

#### Schema Design
- Use `uuid` for IDs (not auto-increment integers)
- All user-facing text in JSONB with `{ zh: "...", en: "..." }`
- Timestamps: `created_at`, `updated_at` (automatic via Prisma)
- Soft deletes: `deleted_at` (nullable)

#### Migrations
```bash
# Always create migration for schema changes
npx prisma migrate dev --name add_character_relationships

# Never edit existing migrations
# Create new migration to modify
```

#### Seeding
```typescript
// Seed data for development
async function seed() {
  // Import from src/ text files
  await importChapters();

  // Create initial characters
  await createCharacters();

  // Add sources
  await addSources();
}
```

### Performance Guidelines

#### Database
- Index foreign keys
- Index search fields (character names, chapter titles)
- Use materialized views for complex queries
- Redis cache for frequently accessed data

#### Frontend
- Code splitting per route
- Lazy load components
- Optimize images (WebP, proper sizing)
- Use React Query for caching
- Virtualize long lists

#### API
- GraphQL DataLoader for N+1 prevention
- Rate limiting
- Response compression
- CDN for static assets

### Security Checklist

- [ ] Input validation (all user inputs)
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (React escapes by default, but check dangerouslySetInnerHTML)
- [ ] CORS properly configured
- [ ] CSP headers set
- [ ] Authentication (future: Azure AD B2C)
- [ ] Rate limiting on API
- [ ] Environment variables for secrets (never commit!)

### Internationalization (i18n)

#### Translation Keys
```typescript
// Use namespaced keys
t('characters:profile.historical');  // "Historical Profile"
t('chapters:reader.bookmark');       // "Bookmark"
t('common:search.placeholder');      // "Search..."
```

#### Content Translation
```typescript
// Store multilingual content in database
interface MultilingualString {
  zh: string;      // Chinese (required)
  en?: string;     // English (optional, for now)
  // Future: ja, ko, etc.
}
```

### Accessibility Guidelines

- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Screen Readers**: Proper ARIA labels, semantic HTML
- **Color Contrast**: Minimum 4.5:1 for text
- **Focus Indicators**: Visible focus states
- **Alt Text**: All images have descriptive alt text
- **Headings**: Proper hierarchy (h1 → h2 → h3)

### When to Ask Questions

**Always ask before**:
- Changing database schema (migrations are permanent)
- Modifying original chapter text files
- Adding new dependencies (consider bundle size)
- Implementing features not in roadmap
- Making breaking API changes

**Don't ask, just do**:
- Bug fixes
- Performance improvements
- Adding tests
- Documentation updates
- Code refactoring (without behavior change)

### Common Commands

```bash
# Development
npm run dev              # Start all apps in dev mode
npm run dev:web         # Frontend only
npm run dev:api         # Backend only

# Database
npx prisma studio       # Visual database editor
npx prisma generate     # Generate Prisma client
npx prisma migrate dev  # Create and apply migration
npx prisma db seed      # Seed database

# Testing
npm run test            # All tests
npm run test:unit       # Unit tests only
npm run test:e2e        # E2E tests
npm run test:coverage   # Coverage report

# Build
npm run build           # Build all apps
npm run build:web       # Frontend build
npm run build:api       # Backend build

# Deployment
npm run deploy:staging  # Deploy to Azure staging
npm run deploy:prod     # Deploy to Azure production

# Code Quality
npm run lint            # ESLint
npm run format          # Prettier
npm run typecheck       # TypeScript check
```

### Project-Specific Warnings

⚠️ **CRITICAL**:
- Original chapter files in `src/` are **read-only source material** - never modify
- All database changes require **migration** - no manual SQL edits
- Every fact must have **source attribution** - no unsourced claims
- Chinese text handling requires **UTF-8** - verify encoding
- Design system tokens are **mandatory** - no hardcoded styles

⚠️ **IMPORTANT**:
- Long-term project - code for **maintainability** over cleverness
- Multi-source conflicts are **features, not bugs** - present them, don't hide them
- Performance matters - **test on slow connections**
- Accessibility is **non-negotiable** - build it in from start

### File Organization

```
/apps/web/src/
  /features/           # Feature-based organization
    /characters/
      /components/     # Character-specific components
      /hooks/          # Character-specific hooks
      /services/       # API calls
      /types/          # TypeScript types
    /events/
    /timeline/
    /chapters/
  /components/         # Shared components
  /hooks/              # Shared hooks
  /lib/                # Utilities
  /styles/             # Global styles

/apps/api/src/
  /modules/            # Feature modules
    /characters/
      character.controller.ts
      character.service.ts
      character.repository.ts
      character.schema.ts   # GraphQL schema
      character.routes.ts
  /common/             # Shared code
    /middleware/
    /guards/
    /utils/
```

### Resources

**Essential Reading**:
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - Complete technical architecture
- [PROJECT_PLANNING.md](docs/PROJECT_PLANNING.md) - Roadmap and phases
- [SKILLS.md](docs/SKILLS.md) - Claude Code skills guide

**External References**:
- [Prisma Docs](https://www.prisma.io/docs)
- [React Docs](https://react.dev)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [Azure Docs](https://docs.microsoft.com/azure)

---

**Last Updated**: 2026-01-10
**Project Phase**: Planning → Foundation
**Team**: Designer + Claude
