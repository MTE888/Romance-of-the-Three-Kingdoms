## Testing Guide - Three Kingdoms Platform

Comprehensive testing infrastructure with unit tests, integration tests, and E2E tests.

## Overview

This project uses a multi-layered testing approach:

- **Unit Tests**: Test individual components and functions in isolation
- **Integration Tests**: Test GraphQL resolvers and API endpoints
- **E2E Tests**: Test complete user flows across the entire application
- **CI/CD**: Automated testing on every push and pull request

## Tech Stack

- **Vitest**: Fast unit test runner for API and Web (replaces Jest)
- **React Testing Library**: Component testing for React
- **Playwright**: Cross-browser E2E testing
- **GitHub Actions**: CI/CD pipeline

## Quick Start

```bash
# Run all tests
pnpm test

# Run unit tests only
pnpm test:unit

# Run E2E tests
pnpm test:e2e

# Watch mode (useful during development)
pnpm --filter web test:watch
pnpm --filter api test:watch

# Generate coverage reports
pnpm --filter api test:coverage
pnpm --filter web test:coverage
```

## Unit Testing

### API Tests (Vitest)

Located in `apps/api/src/**/*.test.ts`

**Configuration**: `apps/api/vitest.config.ts`

**Running tests**:
```bash
# All API tests
pnpm --filter api test

# Watch mode
pnpm --filter api test:watch

# Coverage
pnpm --filter api test:coverage
```

**Writing tests**:
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockPrismaClient, resetPrismaMocks } from '../../test/mocks/prisma';

// Mock dependencies
vi.mock('@three-kingdoms/database', () => ({
  db: mockPrismaClient,
}));

describe('Character Resolver', () => {
  beforeEach(() => {
    resetPrismaMocks();
  });

  it('should fetch a character by ID', async () => {
    // Setup mock
    mockPrismaClient.character.findUnique.mockResolvedValue({
      id: 'liu-bei',
      canonicalName: { zh: '刘备', en: 'Liu Bei' },
      // ... other fields
    });

    // Call resolver
    const result = await characterResolvers.Query.character(
      null,
      { id: 'liu-bei' },
      {} as any,
      {} as any
    );

    // Assert
    expect(result).toEqual(expect.objectContaining({
      id: 'liu-bei',
    }));
  });
});
```

**Test utilities**:
- `apps/api/src/test/fixtures.ts`: Sample data for tests
- `apps/api/src/test/mocks/prisma.ts`: Mocked Prisma client
- `apps/api/src/test/setup.ts`: Global test setup

### Web Tests (Vitest + React Testing Library)

Located in `apps/web/src/**/*.test.tsx`

**Configuration**: `apps/web/vitest.config.ts`

**Running tests**:
```bash
# All Web tests
pnpm --filter web test

# Watch mode
pnpm --filter web test:watch

# Coverage
pnpm --filter web test:coverage

# UI mode (interactive)
pnpm --filter web test:ui
```

**Writing tests**:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, renderWithProviders } from '@/test/utils';
import { KingdomBadge } from './KingdomBadge';

describe('KingdomBadge', () => {
  it('should render Wei kingdom badge', () => {
    render(<KingdomBadge kingdom="WEI" />);

    const badge = screen.getByText('魏');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-wei');
  });
});

// Testing components with Apollo Client
import { mockGraphQLResponses } from '@/test/mocks';

describe('CharacterList', () => {
  it('should display characters from API', async () => {
    const mocks = [mockGraphQLResponses.getCharacters];

    renderWithProviders(<CharacterList />, { mocks });

    // Wait for data to load
    await screen.findByText('刘备');

    expect(screen.getByText('Liu Bei')).toBeInTheDocument();
  });
});
```

**Test utilities**:
- `apps/web/src/test/utils.tsx`: Custom render functions with providers
- `apps/web/src/test/mocks.ts`: Mock GraphQL responses
- `apps/web/src/test/setup.ts`: Global test setup

## E2E Testing

### Playwright

Located in `e2e/**/*.spec.ts`

**Configuration**: `playwright.config.ts`

**Running tests**:
```bash
# Run all E2E tests
pnpm test:e2e

# Run with UI (interactive mode)
pnpm test:e2e:ui

# Run in debug mode
pnpm test:e2e:debug

# Run specific test file
npx playwright test e2e/home.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run only on chromium
npx playwright test --project=chromium
```

**Writing tests**:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Three Kingdoms/);

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });
});
```

**Best practices**:
- Use `data-testid` attributes for stable selectors
- Prefer semantic selectors (`getByRole`, `getByLabel`)
- Test user flows, not implementation details
- Use `page.waitForLoadState('networkidle')` for dynamic content

### Test Coverage

**Browsers tested**:
- Chromium (Desktop)
- Firefox (Desktop)
- WebKit/Safari (Desktop)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

**Coverage areas**:
- ✅ Home page and navigation
- ✅ Character browsing and filtering
- ✅ Character detail pages
- ✅ Timeline visualization
- ✅ Responsive design (mobile/desktop)
- ✅ Error handling
- ✅ Loading states

## CI/CD Pipeline

**GitHub Actions** (`.github/workflows/test.yml`)

Runs on:
- Every push to `main`, `develop`, or `claude/**` branches
- Every pull request to `main` or `develop`

**Jobs**:
1. **Lint**: ESLint and TypeScript type checking
2. **API Tests**: Unit tests for GraphQL resolvers
3. **Web Tests**: Unit tests for React components
4. **E2E Tests**: Playwright tests with real database
5. **Build**: Verify production builds work
6. **Docker Build**: Test Docker image builds

**Services** (for E2E tests):
- PostgreSQL 16 (test database)
- Redis 7 (test cache)

**Artifacts**:
- Test coverage reports (uploaded to Codecov)
- Playwright HTML reports (available for 30 days)

## Test Data

### Fixtures

**API Fixtures** (`apps/api/src/test/fixtures.ts`):
- Mock characters (Liu Bei, Cao Cao, Sun Quan)
- Mock events (Battle of Red Cliffs)
- Mock sources (Romance, Sanguozhi)
- Mock timeline entries

**Web Mocks** (`apps/web/src/test/mocks.ts`):
- GraphQL query responses
- Character data
- Event data
- Timeline data

### Database Seeding

For E2E tests, use real seed data:

```bash
# Seed test database
cd packages/database
pnpm exec prisma db seed
```

Seed script: `packages/database/prisma/seed.ts`

## Coverage Thresholds

**Minimum coverage** (enforced in CI):
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

**Excluded from coverage**:
- Configuration files (`*.config.ts`)
- Test files (`*.test.ts`, `*.spec.ts`)
- Entry points (`server.ts`, `main.tsx`)
- Type definitions (`*.d.ts`)
- Test utilities (`src/test/**`)

## Debugging Tests

### Vitest

```bash
# Run tests in watch mode
pnpm --filter api test:watch

# Run specific test file
pnpm --filter api test src/graphql/resolvers/character.test.ts

# Run tests matching pattern
pnpm --filter api test -t "should fetch character"

# Update snapshots
pnpm --filter api test -u
```

### Playwright

```bash
# Debug mode (opens browser with inspector)
pnpm test:e2e:debug

# Run with UI (interactive)
pnpm test:e2e:ui

# Run specific test
npx playwright test e2e/characters.spec.ts -g "should display character list"

# Show trace viewer
npx playwright show-trace trace.zip
```

### VS Code Integration

Install extensions:
- **Vitest**: `ZixuanChen.vitest-explorer`
- **Playwright Test for VSCode**: `ms-playwright.playwright`

Features:
- Run tests from editor
- Set breakpoints
- View test results inline
- Generate tests automatically

## Test Organization

```
apps/api/
  src/
    graphql/
      resolvers/
        character.ts          # Resolver implementation
        character.test.ts     # Resolver tests
    test/
      setup.ts               # Global setup
      fixtures.ts            # Sample data
      mocks/
        prisma.ts            # Mocked Prisma client

apps/web/
  src/
    components/
      ui/
        KingdomBadge.tsx
        KingdomBadge.test.tsx  # Component tests
    test/
      setup.ts               # Global setup
      utils.tsx              # Test utilities
      mocks.ts               # Mock responses

e2e/
  home.spec.ts             # Home page tests
  characters.spec.ts       # Character flow tests
  timeline.spec.ts         # Timeline tests
```

## Best Practices

### General
- Write tests alongside code (same directory)
- Test behavior, not implementation
- Keep tests simple and focused
- Use descriptive test names
- Arrange-Act-Assert pattern

### Unit Tests
- Mock external dependencies
- Test edge cases and errors
- Verify both success and failure paths
- Use fixtures for consistent test data

### Component Tests
- Test user interactions
- Verify accessibility
- Test responsive behavior
- Mock GraphQL responses

### E2E Tests
- Test critical user journeys
- Use Page Object pattern for complex flows
- Avoid hard-coded waits (use `waitFor*`)
- Test on multiple browsers
- Keep tests independent

## Continuous Integration

**On Push**:
- Linting
- Type checking
- Unit tests
- Build verification
- Docker build test

**On Pull Request**:
- All tests from push
- E2E tests with real database
- Coverage reports
- Build artifact verification

**Passing Requirements**:
- All lint checks pass
- All type checks pass
- All unit tests pass (70%+ coverage)
- All E2E tests pass
- Build succeeds
- Docker images build successfully

## Troubleshooting

### Tests fail locally but pass in CI
- Check Node.js version matches (20.x)
- Clear node_modules and reinstall
- Check for environment-specific code

### Tests pass locally but fail in CI
- Check for timing issues (add proper waits)
- Verify test database is seeded correctly
- Check for hardcoded localhost URLs

### Flaky E2E tests
- Add explicit waits for network requests
- Use `waitForLoadState('networkidle')`
- Increase timeout for slow operations
- Check for race conditions

### Coverage not meeting threshold
- Add tests for uncovered branches
- Test error paths
- Test edge cases
- Remove unnecessary code

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Contributing

When adding new features:

1. **Write tests first** (TDD approach)
2. **Add unit tests** for new functions/components
3. **Add E2E tests** for new user flows
4. **Run tests locally** before pushing
5. **Check coverage** meets thresholds
6. **Update this guide** if adding new patterns

---

**Last Updated**: 2026-01-11
**Maintained By**: Three Kingdoms Platform Team
