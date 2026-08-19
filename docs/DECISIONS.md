# Architecture Decision Records (ADR)

This document tracks all significant technical and architectural decisions made during the project. Each decision includes context, rationale, and implications.

**Format**:
- **Date**: When the decision was made
- **Decision**: What was decided
- **Context**: Why the decision was needed
- **Rationale**: Why this option was chosen
- **Alternatives Considered**: Other options explored
- **Consequences**: Impact on the project
- **Status**: Active, Deprecated, Superseded
- **Session**: Which session made the decision

---

## 2026-01-10: Web Application Architecture

**Decision**: Build a comprehensive web application platform instead of a simple text archive

**Context**:
- Initial vision was for a text repository of the 120 chapters
- User clarified the true vision: a full-featured platform for exploring Three Kingdoms period
- Need to serve scholars, students, and enthusiasts with different needs

**Rationale**:
- Static text archive doesn't leverage the richness of the source material
- Multi-source comparison (historical vs literary) requires sophisticated UI
- Interactive features (timeline, maps, relationships) create unique value
- Web platform allows continuous evolution and community contributions

**Alternatives Considered**:
1. **Static Site Generator** (Hugo, Jekyll)
   - Pros: Simple, fast, cheap hosting
   - Cons: Limited interactivity, hard to manage complex data relationships

2. **WordPress/CMS**
   - Pros: Easy content management, plugins available
   - Cons: Not designed for multi-source truth, limited customization for complex data model

3. **Full Web Application** ✅ SELECTED
   - Pros: Complete control, scalable, supports complex features
   - Cons: More complex, higher development effort

**Consequences**:
- Need to build frontend, backend, database, and infrastructure
- Longer development timeline (20 weeks for MVP vs weeks for static site)
- Higher technical complexity but much more capable end product
- Can evolve with new features over time

**Status**: Active

**Session**: claude/setup-project-planning-Nn6XS

---

## 2026-01-10: Technology Stack Selection

### Frontend: React 18+ with TypeScript

**Decision**: Use React 18+ with TypeScript, built with Vite

**Context**: Need modern, performant frontend framework with strong TypeScript support

**Rationale**:
- React: Industry standard, large ecosystem, excellent for complex UIs
- TypeScript: Type safety critical for multi-source data model
- Vite: Faster than webpack, better DX, modern tooling

**Alternatives Considered**:
- Vue 3: Good, but smaller ecosystem
- Svelte: Excellent performance, but smaller community
- Next.js: Server-side rendering, but adds complexity we don't need for MVP

**Consequences**:
- Large bundle size (mitigated with code splitting)
- Need React expertise
- Excellent TypeScript integration

**Status**: Active

**Session**: claude/setup-project-planning-Nn6XS

---

### Backend: Node.js with Fastify

**Decision**: Use Node.js with Fastify framework and GraphQL (Apollo Server)

**Context**: Need fast, scalable backend for API

**Rationale**:
- Node.js: JavaScript/TypeScript across stack, large ecosystem
- Fastify: Faster than Express, modern plugin system
- GraphQL: Perfect for complex data relationships and flexible queries

**Alternatives Considered**:
- Express.js: More mature, but slower than Fastify
- Python/Django: Different language, slower for real-time features
- Go: Very fast, but different language increases complexity

**Consequences**:
- JavaScript fatigue (mitigated by TypeScript)
- GraphQL learning curve
- Excellent performance and flexibility

**Status**: Active

**Session**: claude/setup-project-planning-Nn6XS

---

### Database: PostgreSQL

**Decision**: Use PostgreSQL as primary database

**Context**: Need robust database for complex relationships and multilingual content

**Rationale**:
- JSONB support for flexible multilingual content
- Excellent for complex queries and relationships
- Full-text search capabilities (with extensions)
- Mature, reliable, Azure-native support
- Can add graph database layer later if needed

**Alternatives Considered**:
- MongoDB: Flexible schema, but weaker for complex relationships
- Neo4j (graph DB): Excellent for relationships, but adds complexity
- MySQL: Solid, but JSONB support not as good

**Consequences**:
- Need to design schema carefully
- JSONB provides flexibility for evolving data model
- May need to add graph database in Phase 2 for advanced relationship queries

**Status**: Active

**Session**: claude/setup-project-planning-Nn6XS

---

### ORM: Prisma

**Decision**: Use Prisma as ORM

**Context**: Need type-safe database access with migrations

**Rationale**:
- TypeScript-first design
- Excellent DX with Prisma Studio
- Auto-generated types
- Migration system
- Good Azure PostgreSQL support

**Alternatives Considered**:
- TypeORM: More features, but more complex
- Drizzle: New, fast, but less mature
- Raw SQL: Maximum control, but no type safety

**Consequences**:
- Schema-first approach
- Migrations must be managed carefully
- Excellent type safety throughout stack

**Status**: Active

**Session**: claude/setup-project-planning-Nn6XS

---

### Infrastructure: Azure

**Decision**: Host on Azure (App Service, Database, Blob Storage, CDN)

**Context**: User specified Azure as hosting platform

**Rationale**:
- User preference
- Complete platform (compute, storage, database, CDN, search)
- Good PostgreSQL support
- Azure Cognitive Search for Chinese text
- GitHub Actions integration

**Consequences**:
- Azure-specific configurations
- Costs for services
- Vendor lock-in (mitigated by containerization)

**Status**: Active

**Session**: claude/setup-project-planning-Nn6XS

---

## 2026-01-10: Multi-Source Truth System

**Decision**: Implement dual-profile system for characters (historical vs literary)

**Context**: Core differentiator of the platform - presenting multiple perspectives on same people/events

**Rationale**:
- Three Kingdoms has both historical records and literary interpretation
- These often conflict or diverge
- Users need to understand the difference
- Merging sources loses valuable context

**Data Model**:
```typescript
Character {
  historicalProfile: {
    summary, traits, achievements
    sources: [Source]
  }
  literaryProfile: {
    summary, traits, famousScenes
    sources: [Source]
  }
}
```

**Alternatives Considered**:
1. **Single merged profile**: Simpler, but loses nuance
2. **Multiple profiles without distinction**: Confusing to users
3. **Dual profile with comparison** ✅ SELECTED

**Consequences**:
- More complex data entry
- More complex UI (tabs, comparison views)
- Unique value proposition
- Scholarly rigor maintained

**Status**: Active

**Session**: claude/setup-project-planning-Nn6XS

---

## 2026-01-10: Design Philosophy

**Decision**: Blend modern minimalism with traditional Chinese aesthetics

**Context**: Design is key differentiator for this project

**Rationale**:
- Modern: Clean, accessible, fast, responsive
- Traditional: Honors subject matter, culturally appropriate, distinctive
- Blend: Best of both worlds, appealing to international and Chinese audiences

**Specific Choices**:
- Color palette: Traditional Chinese colors (vermillion, imperial yellow, ink black)
- Typography: Noto Serif SC (Chinese), Crimson Pro (English)
- Patterns: Cloud patterns (云纹), seal stamps (印章), scroll metaphors
- Layout: Modern grid system with generous white space

**Consequences**:
- Need custom design work (can't just use template)
- Higher design effort
- Unique, memorable experience
- Risk: Traditional elements could feel dated (mitigate with modern execution)

**Status**: Active

**Session**: claude/setup-project-planning-Nn6XS

---

## 2026-01-10: Monorepo Structure

**Decision**: Use Turborepo for monorepo management

**Context**: Need to share code between frontend, backend, and packages

**Rationale**:
- Single repo for all code (easier coordination)
- Shared packages (types, UI components, database)
- Faster builds with caching
- Simpler deployment pipeline

**Structure**:
```
apps/
  web/      - React frontend
  api/      - Node.js backend
packages/
  ui/       - Shared components
  database/ - Prisma schema
  types/    - Shared TypeScript types
```

**Alternatives Considered**:
- Separate repos: More complex coordination
- Nx: More features, but more complex
- Lerna: Older, less active

**Consequences**:
- All code in one repo
- Need to manage workspace dependencies
- Faster iteration
- Simpler for small team

**Status**: Active

**Session**: claude/setup-project-planning-Nn6XS

---

## 2026-01-10: Internationalization Strategy

**Decision**: Chinese-first, with English coming in Phase 6 (Months 6-9)

**Context**: Multilingual platform, but need to prioritize

**Rationale**:
- Content is Chinese
- Primary audience likely Chinese-speaking
- English expands reach but can come later
- Build i18n infrastructure from start for easier addition later

**Data Model**:
```typescript
interface MultilingualString {
  zh: string;    // Required
  en?: string;   // Optional, add in Phase 6
  // Future: ja, ko, etc.
}
```

**Consequences**:
- All text in database as multilingual from day 1
- UI in Chinese initially
- English can be added without data model changes
- Slightly more complex even for single language

**Status**: Superseded by 2026-01-24 decision

**Session**: claude/setup-project-planning-Nn6XS

---

## 2026-01-24: Full i18n Implementation

**Decision**: Implement full internationalization supporting English, Simplified Chinese (zh-Hans), and Traditional Chinese (zh-Hant)

**Context**: Platform needed to support international users while maintaining Chinese content integrity

**Rationale**:
- Full i18n from the start allows global reach
- Runtime Traditional Chinese conversion (OpenCC) eliminates duplicate translation files
- Character names always show both Chinese + English romanization for cultural context
- Chapter content stays Chinese regardless of UI locale (source material integrity)

**Implementation Details**:
- **i18next**: Core translation framework with HTTP backend
- **OpenCC**: Runtime Simplified ↔ Traditional Chinese conversion
- **Language Detection**: localStorage → browser preferences → fallback to English
- **Translation Namespaces**: common, layout, home, characters, chapters, timeline, relationships, errors

**Key Design Decisions**:
1. **zh-Hant Strategy**: Runtime conversion from zh-Hans using OpenCC (not separate files)
2. **Character Names**: Always display both Chinese + English romanization
3. **URL Strategy**: Language stored in localStorage (clean URLs without /en/, /zh/)
4. **Chapter Content**: Always Chinese with lang="zh" attribute (never translated)

**Alternatives Considered**:
1. **Separate translation files for Traditional Chinese**: More work, harder to maintain
2. **URL-based language switching**: SEO benefits, but more complex routing
3. **Machine translation for content**: Poor quality for classical Chinese

**Consequences**:
- 3-language support from day 1
- Simple workflow: translate to zh-Hans only, Traditional generated automatically
- Character profiles work naturally in all languages
- Slightly larger bundle (OpenCC library ~50KB gzipped)

**Status**: Active

**Session**: Session 12 (i18n implementation)

---

## 2026-01-24: Design Refresh - Guochao (国潮) Design System

**Decision**: Implement design system based on research of 12+ leading Chinese digital platforms, incorporating Guochao (国潮) and 新中式 (New Chinese Style) principles

**Context**: Platform needed a design refresh that honors traditional Chinese aesthetics while maintaining modern UX standards. Research was conducted on museums (Palace Museum, National Museum), reading platforms (WeChat Reading, Douban), modern apps (Xiaohongshu, Bilibili, Zhihu), and design systems (Ant Design).

**Rationale**:
- Traditional Chinese colors and patterns create cultural authority and authenticity
- Modern UX patterns ensure accessibility and usability
- Guochao movement represents contemporary appreciation of Chinese heritage
- WeChat Reading provides best-in-class model for Chinese text reading experience
- 8px base grid aligns with Ant Design and classical Chinese proportions

**Implementation Details**:

1. **Color System Expansion**:
   - Heritage colors: Gold (#D4AF37), Burgundy (#A5343C), Beige (#EFC8A8) from museums
   - Semantic text colors from Zhihu: Primary (#373A40), Secondary (#9196A1)
   - Status colors with cultural significance

2. **Typography Refinements**:
   - Chinese line height: 1.6-1.8 (vs 1.5 for English)
   - Letter spacing: 0.5px for improved Chinese readability
   - Font fallback chains include PingFang SC, Songti SC

3. **Animation Guidelines**:
   - Duration: 300-500ms for UI, 800-1200ms for narrative
   - Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for elegant deceleration
   - Principle: Subtle, restrained animations

4. **Traditional Design Elements**:
   - Seal stamps (印章): `.seal-stamp` class for decorative accents
   - Cloud patterns (云纹): `.bg-cloud-pattern` for subtle backgrounds
   - Scroll margins: `.scroll-margin` for traditional reading experience
   - Ink-wash effects: `.bg-ink-wash` for subtle gradients

5. **Modern Patterns**:
   - Glassmorphic effects (Xiaohongshu): `.glass` class
   - 8px base grid spacing system
   - Card hover shadows and transitions

**Files Modified**:
- `packages/ui/src/tokens/index.ts` - Comprehensive design tokens
- `apps/web/tailwind.config.js` - Extended Tailwind configuration
- `apps/web/src/styles/globals.css` - Traditional Chinese CSS utilities

**Research Documentation**: `docs/DESIGN_REFRESH_RESEARCH.md`

**Alternatives Considered**:
1. **Material Design**: Too generic, lacks cultural character
2. **Pure traditional Chinese design**: May feel dated, accessibility concerns
3. **Guochao + Modern UX blend** ✅ SELECTED: Best of both worlds

**Consequences**:
- Design system now has unique cultural identity
- CSS utilities available for traditional Chinese design patterns
- Improved Chinese text readability
- Animation timing standardized for elegant user experience
- May need performance testing for complex animations on mobile

**Status**: Active

**Session**: Session 13 (Design Refresh Research)

---

## Template for Future Decisions

```markdown
## YYYY-MM-DD: Decision Title

**Decision**: What was decided

**Context**: Why the decision was needed

**Rationale**: Why this option was chosen

**Alternatives Considered**:
1. Option A: Pros/Cons
2. Option B: Pros/Cons
3. Selected Option ✅

**Consequences**: Impact on the project

**Status**: Active / Deprecated / Superseded

**Session**: Branch/session identifier
```

---

## Decision Status

- **Active**: Currently in effect
- **Deprecated**: No longer recommended, but not removed
- **Superseded**: Replaced by a newer decision (reference the new one)

---

**Last Updated**: 2026-01-24
**Total Decisions**: 9
**Active Decisions**: 8
**Superseded Decisions**: 1
