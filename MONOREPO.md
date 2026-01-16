# Three Kingdoms Platform - Monorepo Structure

This is a Turborepo monorepo containing all packages and applications for the Three Kingdoms Digital Platform.

## 📁 Structure

```
Romance-of-the-Three-Kingdoms/
├── apps/
│   ├── web/              # React frontend (Vite + TypeScript)
│   └── api/              # Node.js backend (Fastify + GraphQL)
├── packages/
│   ├── ui/               # Shared UI component library
│   ├── database/         # Prisma schema and database client
│   └── types/            # Shared TypeScript types
├── src/                  # Original text source (120 chapters)
├── docs/                 # Documentation
├── package.json          # Root package configuration
├── turbo.json            # Turborepo pipeline configuration
└── tsconfig.json         # Base TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+ (Package manager)

### Installation

```bash
# Install pnpm if you haven't
npm install -g pnpm

# Install all dependencies
pnpm install
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm dev:web      # Frontend only
pnpm dev:api      # Backend only
```

### Build

```bash
# Build all apps and packages
pnpm build

# Build specific app
pnpm build:web
pnpm build:api
```

### Other Commands

```bash
pnpm lint         # Lint all packages
pnpm typecheck    # Type check all packages
pnpm test         # Run all tests
pnpm test:unit    # Run unit tests only
pnpm test:e2e     # Run E2E tests
pnpm format       # Format code with Prettier
pnpm clean        # Clean all build artifacts
```

## 📦 Packages

### apps/web

React 18 frontend application built with:
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Apollo Client** - GraphQL client
- **React Query** - Server state management
- **Zustand** - Client state management

### apps/api

Node.js backend API built with:
- **Fastify** - Web framework
- **Apollo Server** - GraphQL server
- **Prisma** - ORM and database client
- **TypeScript** - Type safety

### packages/ui

Shared UI component library with:
- Design tokens (colors, typography, spacing)
- Primitive components (Button, Input, Card, etc.)
- Layout components (Container, Grid, Stack, etc.)
- Traditional Chinese design elements

### packages/database

Database package with:
- Prisma schema
- Database migrations
- Seed scripts
- Database client exports

### packages/types

Shared TypeScript types used across the entire application:
- Entity interfaces
- Enums (Kingdom, SourceReliability, etc.)
- Multilingual string types
- GraphQL types (generated)

## 🔧 How It Works

### Turborepo

This monorepo uses [Turborepo](https://turbo.build/) for:
- **Fast builds** - Intelligent caching and parallel execution
- **Task pipelines** - Dependencies between tasks across packages
- **Remote caching** - Share build cache across team (future)

### Workspaces

We use pnpm workspaces to:
- Share dependencies across packages
- Link packages together automatically
- Optimize dependency installation

### TypeScript Project References

Packages reference each other using TypeScript's [project references](https://www.typescriptlang.org/docs/handbook/project-references.html):
- Type-safe imports between packages
- Incremental builds
- Better IDE experience

Example: `apps/web` can import from `packages/ui`:
```typescript
import { Button } from '@three-kingdoms/ui';
import { Kingdom } from '@three-kingdoms/types';
```

## 🎯 Development Workflow

### Adding a New Package

1. Create directory in `apps/` or `packages/`
2. Add `package.json` with appropriate configuration
3. Add `tsconfig.json` extending root config
4. Update dependencies in packages that use it

### Adding a New Dependency

```bash
# Add to root (dev dependency for all)
pnpm add -D <package> -w

# Add to specific package
pnpm add <package> --filter <package-name>

# Examples:
pnpm add react --filter web
pnpm add fastify --filter api
```

### Running Tasks

Turborepo executes tasks based on the `turbo.json` pipeline:

```bash
# Run dev in all packages (parallel where possible)
pnpm dev

# Run build in all packages (respects dependencies)
pnpm build

# Run lint in specific package
pnpm --filter web lint
```

## 🔗 Package Dependencies

```
packages/types (base - no dependencies)
    ↓
packages/ui (depends on types)
    ↓
packages/database (depends on types)
    ↓
apps/web (depends on ui, types)
apps/api (depends on database, types)
```

## 📝 Best Practices

### Imports

Use workspace aliases for imports:

```typescript
// Good ✅
import { Button } from '@three-kingdoms/ui';
import { Kingdom } from '@three-kingdoms/types';

// Bad ❌
import { Button } from '../../packages/ui/src';
```

### Types

Define shared types in `packages/types`:

```typescript
// packages/types/src/index.ts
export interface Character {
  id: string;
  name: MultilingualString;
  kingdom: Kingdom;
}
```

### Components

Create reusable components in `packages/ui`:

```typescript
// packages/ui/src/components/Button.tsx
export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
```

### Committing

Follow conventional commits:

```bash
git commit -m "feat(web): add character list page"
git commit -m "fix(api): correct GraphQL schema"
git commit -m "docs: update README with new scripts"
```

## 🐛 Troubleshooting

### "Cannot find module '@three-kingdoms/...'"

```bash
# Rebuild all packages
pnpm build

# Or clean and reinstall
pnpm clean
pnpm install
```

### Type errors after changes

```bash
# Rebuild TypeScript projects
pnpm build

# Or run type check
pnpm typecheck
```

### Dependency issues

```bash
# Clear pnpm cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📚 Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [Project Architecture](docs/ARCHITECTURE.md)
- [Development Guidelines](CLAUDE.md)

---

**Last Updated**: 2026-01-11
**Monorepo Version**: 0.1.0
**Node Version**: >= 20.0.0
**Package Manager**: pnpm >= 8.0.0
