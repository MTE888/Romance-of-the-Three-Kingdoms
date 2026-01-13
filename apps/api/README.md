# @three-kingdoms/api

GraphQL API server for the Three Kingdoms Digital Platform.

## Overview

Fastify-based Node.js server with GraphQL (Apollo Server) that provides access to the Three Kingdoms database with multi-source truth system.

## Features

- **GraphQL API** - Type-safe queries with Apollo Server
- **Fastify Framework** - Fast, low-overhead web framework
- **Prisma Integration** - Type-safe database queries
- **Multi-Source Data** - Handles historical vs literary representations
- **CORS Support** - Configured for frontend integration
- **Logging** - Structured logging with Pino
- **Error Handling** - Comprehensive error handling and formatting
- **TypeScript** - Full type safety

## Quick Start

### 1. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your configuration:

```env
PORT=4000
DATABASE_URL="postgresql://postgres:password@localhost:5432/three_kingdoms"
```

### 2. Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### 3. Generate Prisma Client

```bash
cd packages/database
pnpm db:generate
```

### 4. Start Development Server

```bash
# From monorepo root
pnpm dev:api

# Or from this directory
pnpm dev
```

The server will start at `http://localhost:4000`

- GraphQL endpoint: `http://localhost:4000/graphql`
- Health check: `http://localhost:4000/health`

## GraphQL API

### Accessing GraphQL Playground

In development mode, navigate to `http://localhost:4000/graphql` in your browser to access the GraphQL playground with introspection.

### Example Queries

#### Get All Characters

```graphql
query GetCharacters {
  characters(pagination: { limit: 10, offset: 0 }) {
    id
    canonicalName
    courtesyName
    kingdom
    birthYear
    deathYear
    historicalProfile
    literaryProfile
  }
}
```

#### Get Character by ID

```graphql
query GetCharacter {
  character(id: "some-uuid") {
    id
    canonicalName
    courtesyName
    kingdom
    historicalProfile
    literaryProfile
    birthLocation {
      id
      name
      modernName
    }
    relationships {
      id
      relationshipType
      relationshipSource
      characterA {
        canonicalName
      }
      characterB {
        canonicalName
      }
    }
  }
}
```

#### Filter Characters by Kingdom

```graphql
query GetShuCharacters {
  characters(
    filter: { kingdom: SHU }
    pagination: { limit: 20 }
  ) {
    id
    canonicalName
    kingdom
  }
}
```

#### Search Across Entities

```graphql
query Search {
  search(query: "刘备", limit: 5) {
    characters {
      id
      canonicalName
    }
    events {
      id
      name
    }
    locations {
      id
      name
    }
  }
}
```

#### Get Timeline

```graphql
query GetTimeline {
  timeline(
    filter: {
      startYear: 180
      endYear: 220
      minImportance: 7
    }
  ) {
    id
    year
    month
    day
    importance
    description
    event {
      name
      type
    }
    character {
      canonicalName
    }
  }
}
```

#### Get Events

```graphql
query GetBattles {
  events(
    type: BATTLE
    startYear: 200
    endYear: 250
    pagination: { limit: 10 }
  ) {
    id
    name
    type
    dateYear
    datePrecision
    historicalAccount
    literaryAccount
    location {
      name
      coordinates
    }
  }
}
```

## API Schema

### Core Types

- **Character** - Characters with dual profiles (historical & literary)
- **Event** - Historical/literary events with multi-source accounts
- **Location** - Geographic locations
- **Source** - Information sources (三国志, 三国演义, etc.)
- **CharacterRelationship** - Relationships between characters
- **TimelineEntry** - Timeline visualization data

### Enums

- **Kingdom**: WEI, SHU, WU, HAN, OTHER
- **SourceType**: NOVEL, HISTORY, ANALYSIS, ARTWORK, MAP
- **ReliabilityTier**: PRIMARY, SECONDARY, TERTIARY, FICTION
- **EventType**: BATTLE, POLITICAL, PERSONAL, NATURAL, CULTURAL
- **RelationshipType**: SWORN_BROTHER, FAMILY, SPOUSE, PARENT_CHILD, LORD_VASSAL, FRIEND, RIVAL, ENEMY, MENTOR_STUDENT

### Custom Scalars

- **DateTime** - ISO 8601 date-time string
- **JSON** - Flexible JSON objects for multilingual content and metadata

## Architecture

### Directory Structure

```
apps/api/src/
├── config/
│   └── env.ts              # Environment configuration
├── graphql/
│   ├── schema.ts           # GraphQL type definitions
│   ├── index.ts            # Apollo Server setup
│   └── resolvers/
│       ├── index.ts        # Combined resolvers
│       ├── character.ts    # Character resolvers
│       └── event.ts        # Event resolvers
├── middleware/             # Custom middleware (future)
├── utils/                  # Utility functions (future)
├── app.ts                  # Fastify app configuration
└── server.ts               # Server entry point
```

### Key Components

**Configuration** (`config/env.ts`)
- Centralized environment variable management
- Type-safe configuration with validation

**Fastify App** (`app.ts`)
- Server initialization with plugins
- CORS configuration
- Health check endpoint
- Logging setup

**GraphQL Server** (`graphql/index.ts`)
- Apollo Server configuration
- Error formatting
- Context creation

**Resolvers** (`graphql/resolvers/`)
- Type-safe database queries using Prisma
- Pagination support
- Filtering and sorting
- Multi-source data handling

## Development

### Running Tests

```bash
pnpm test          # Run all tests
pnpm test:unit     # Run unit tests only
```

### Type Checking

```bash
pnpm typecheck
```

### Linting

```bash
pnpm lint
```

### Building for Production

```bash
pnpm build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### Starting Production Server

```bash
pnpm start
```

## Multi-Source Data Handling

The API automatically handles data from multiple sources (historical records vs literary fiction):

### Character Profiles

Characters have separate `historicalProfile` and `literaryProfile` fields:

```graphql
{
  character(id: "liu-bei") {
    canonicalName  # { zh: "刘备", en: "Liu Bei" }

    historicalProfile  # From 三国志
    # {
    #   summary: { zh: "...", en: "..." },
    #   personalityTraits: ["benevolent", "persistent"],
    #   achievements: [...],
    #   sources: [source_ids]
    # }

    literaryProfile  # From 三国演义
    # {
    #   summary: { zh: "...", en: "..." },
    #   personalityTraits: ["humble", "emotional"],
    #   famousScenes: [...],
    #   sources: [source_ids]
    # }
  }
}
```

### Event Accounts

Events have both `historicalAccount` and `literaryAccount`:

```graphql
{
  event(id: "battle-of-red-cliffs") {
    name
    historicalAccount  # What actually happened (from records)
    literaryAccount    # Literary dramatization (from novel)
  }
}
```

### Relationship Sources

Relationships are tagged as HISTORICAL, LITERARY, or BOTH:

```graphql
{
  character(id: "liu-bei") {
    relationships {
      relationshipType  # SWORN_BROTHER
      relationshipSource  # LITERARY (Peach Garden Oath is from novel)
      characterB {
        canonicalName
      }
    }
  }
}
```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `4000` | No |
| `HOST` | Server host | `0.0.0.0` | No |
| `NODE_ENV` | Environment | `development` | No |
| `DATABASE_URL` | PostgreSQL connection string | - | Yes |
| `CORS_ORIGIN` | Allowed origins (comma-separated) | `http://localhost:3000,http://localhost:5173` | No |
| `LOG_LEVEL` | Logging level | `info` | No |

## Deployment

### Azure App Service

1. **Build the application**:
   ```bash
   pnpm build
   ```

2. **Set environment variables** in Azure Portal:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: Your frontend domain

3. **Deploy**:
   ```bash
   # Using Azure CLI
   az webapp up --name your-app-name --resource-group your-rg
   ```

### Docker (Future)

Dockerfile will be added in later phase.

## Troubleshooting

### GraphQL endpoint returns 404

Ensure you're sending requests to `/graphql`, not `/` or `/api/graphql`.

### CORS errors

Check your `CORS_ORIGIN` environment variable includes the frontend domain.

### Database connection errors

1. Verify `DATABASE_URL` is correct
2. Ensure database is running
3. Check Prisma client is generated: `pnpm db:generate`

### TypeScript errors

```bash
# Clean build and regenerate
rm -rf dist/
pnpm typecheck
```

## Performance

### Query Optimization

- Use field selection to request only needed data
- Leverage pagination for large result sets
- Consider implementing DataLoader for N+1 query prevention (Phase 2)

### Caching (Future - Phase 3)

- Redis caching for frequently accessed data
- GraphQL response caching
- CDN for static responses

## Security

### Current Measures

- Input validation via GraphQL schema
- SQL injection prevention via Prisma
- CORS configured
- Error messages sanitized in production

### Future Enhancements (Phase 4+)

- Authentication & authorization
- Rate limiting
- Request throttling
- API keys

## Contributing

See monorepo root [CLAUDE.md](../../CLAUDE.md) for development guidelines.

## Resources

- [Fastify Documentation](https://www.fastify.io/docs)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Architecture Documentation](../../docs/ARCHITECTURE.md)

## License

Part of the Three Kingdoms Digital Platform project.
