# @three-kingdoms/database

Database schema and Prisma client for the Three Kingdoms Digital Platform.

## Overview

This package contains:
- **Prisma schema** - Complete database model with multi-source truth system
- **Prisma client** - Type-safe database client
- **Seed data** - Initial data for development
- **Migrations** - Database schema versioning

## Schema Design

The database implements a multi-source truth system to handle conflicting information from different sources (historical records vs literary fiction).

### Key Entities

- **Source** - Different sources of information (三国志, 三国演义, etc.)
- **Character** - Characters with dual profiles (historical & literary)
- **CharacterRelationship** - Relationships between characters
- **Event** - Historical and literary events with multi-source accounts
- **Location** - Geographic locations with historical context
- **Chapter** - 120 chapters of Romance of the Three Kingdoms novel
- **Fact** - Source attribution system for fact checking
- **TimelineEntry** - Timeline visualization data

### Multi-Source Data Model

Each character has two distinct profiles:

```typescript
{
  historicalProfile: {
    summary: { zh: "...", en: "..." },
    personalityTraits: [...],
    achievements: [...],
    sources: [source_ids] // References to 三国志
  },
  literaryProfile: {
    summary: { zh: "...", en: "..." },
    personalityTraits: [...],
    famousScenes: [...],
    sources: [source_ids] // References to 三国演义
  }
}
```

Events similarly have both `historicalAccount` and `literaryAccount` fields.

## Setup

### 1. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Update `DATABASE_URL` with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/three_kingdoms?schema=public"
```

### 2. Generate Prisma Client

```bash
pnpm db:generate
```

This generates the Prisma client from the schema into `src/generated/`.

### 3. Database Migration

For development (creates migration + applies):

```bash
pnpm db:migrate
```

For production (applies existing migrations):

```bash
pnpm db:migrate:deploy
```

### 4. Seed Database

Populate database with initial data:

```bash
pnpm db:seed
```

This seeds:
- Primary sources (三国志, 三国演义)
- Initial locations (洛阳, 成都, 建业)
- Top characters (刘备, 关羽, 张飞)
- Key relationships (Peach Garden Oath)
- Major events (Yellow Turban Rebellion)
- Timeline entries

## Usage

### Import Database Client

```typescript
import { db } from '@three-kingdoms/database';

// Query characters
const characters = await db.character.findMany({
  where: { kingdom: 'SHU' },
  include: {
    relationshipsAsA: true,
    birthLocation: true,
  },
});
```

### Import Types

```typescript
import type { Character, Kingdom, SourceType } from '@three-kingdoms/database';
```

### Working with Multilingual Content

All user-facing text is stored as JSON objects with language codes:

```typescript
const character = await db.character.findUnique({
  where: { id: 'some-uuid' },
});

// Access multilingual name
const nameZh = (character.canonicalName as any).zh; // "刘备"
const nameEn = (character.canonicalName as any).en; // "Liu Bei"
```

### Querying Multi-Source Profiles

```typescript
// Get character with both profiles
const liuBei = await db.character.findFirst({
  where: {
    canonicalName: {
      path: ['zh'],
      equals: '刘备',
    },
  },
});

// Access historical profile
const historicalTraits = (liuBei.historicalProfile as any).personalityTraits;
// ["benevolent", "persistent", "charismatic"]

// Access literary profile
const literaryTraits = (liuBei.literaryProfile as any).personalityTraits;
// ["humble", "emotional", "virtuous", "tearful"]
```

## Database Scripts

| Command | Description |
|---------|-------------|
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:push` | Push schema to database (development only) |
| `pnpm db:migrate` | Create and apply migration |
| `pnpm db:migrate:deploy` | Apply migrations (production) |
| `pnpm db:seed` | Seed database with initial data |
| `pnpm db:studio` | Open Prisma Studio (visual database editor) |

## Prisma Studio

Launch visual database editor:

```bash
pnpm db:studio
```

Opens at `http://localhost:5555` - great for exploring data during development.

## Schema Updates

When modifying `prisma/schema.prisma`:

1. Create migration:
   ```bash
   pnpm db:migrate dev --name describe_your_change
   ```

2. Regenerate client:
   ```bash
   pnpm db:generate
   ```

3. Update seed data if needed:
   ```bash
   # Edit prisma/seed.ts
   pnpm db:seed
   ```

## JSONB Fields

The schema uses JSONB extensively for flexibility:

- **Multilingual content**: `{ zh: "中文", en: "English" }`
- **Complex profiles**: Historical vs literary data
- **Flexible metadata**: Source-specific information
- **Arrays**: Images, quotes, participants

### Querying JSONB

Prisma supports JSONB operations:

```typescript
// Find character by Chinese name
const character = await db.character.findFirst({
  where: {
    canonicalName: {
      path: ['zh'],
      equals: '刘备',
    },
  },
});

// Search in arrays
const characters = await db.character.findMany({
  where: {
    occupations: {
      has: 'emperor',
    },
  },
});
```

## Performance Considerations

### Indexes

Key indexes are defined on:
- Character/event relationships
- Timeline year/importance
- Search entity types
- Fact entity references

### Optimization Tips

1. **Select only needed fields**:
   ```typescript
   const characters = await db.character.findMany({
     select: {
       id: true,
       canonicalName: true,
       kingdom: true,
     },
   });
   ```

2. **Use pagination**:
   ```typescript
   const page = await db.character.findMany({
     skip: (pageNum - 1) * pageSize,
     take: pageSize,
   });
   ```

3. **Batch queries**:
   ```typescript
   const [characters, count] = await Promise.all([
     db.character.findMany(),
     db.character.count(),
   ]);
   ```

## Deployment

### Azure PostgreSQL Setup

1. Create Azure Database for PostgreSQL Flexible Server
2. Configure firewall rules
3. Set connection string:
   ```env
   DATABASE_URL="postgresql://admin@server:password@server.postgres.database.azure.com:5432/three_kingdoms?sslmode=require"
   ```
4. Run migrations:
   ```bash
   pnpm db:migrate:deploy
   ```

### Production Checklist

- [ ] Database backups configured
- [ ] Connection pooling enabled
- [ ] SSL/TLS enforced
- [ ] Environment variables secured
- [ ] Migrations tested
- [ ] Seed data reviewed

## Troubleshooting

### Client Generation Fails

```bash
# Clean generated files
rm -rf src/generated
# Regenerate
pnpm db:generate
```

### Migration Conflicts

```bash
# Reset database (DESTRUCTIVE - development only)
pnpm prisma migrate reset
```

### Connection Issues

Check your `DATABASE_URL` format:
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

Ensure PostgreSQL is running:
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL JSONB](https://www.postgresql.org/docs/current/datatype-json.html)
- [Architecture Documentation](../../docs/ARCHITECTURE.md)
- [Database Design Decisions](../../docs/DECISIONS.md)

## License

Part of the Three Kingdoms Digital Platform project.
