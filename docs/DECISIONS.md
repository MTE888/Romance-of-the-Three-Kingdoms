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

**Status**: Active

**Session**: claude/setup-project-planning-Nn6XS

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

**Last Updated**: 2026-01-10
**Total Decisions**: 7
**Active Decisions**: 7
