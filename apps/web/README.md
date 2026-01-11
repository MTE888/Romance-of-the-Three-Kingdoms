# @three-kingdoms/web

React frontend application for the Three Kingdoms Digital Platform.

## Overview

Modern, responsive web application built with React, TypeScript, and Tailwind CSS that provides an immersive experience for exploring the Three Kingdoms period.

## Features

- **Character Encyclopedia** - Browse and search characters with filtering
- **Character Profiles** - Detailed dual profiles (historical vs literary)
- **Timeline Visualization** - Chronological view of events (160-280 AD)
- **Multi-Source Display** - Clear distinction between historical and literary sources
- **Responsive Design** - Mobile-first, works on all devices
- **Traditional Aesthetics** - Blend of modern UI and traditional Chinese design

## Quick Start

### 1. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env`:

```env
VITE_API_URL=http://localhost:4000
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

### 2. Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### 3. Start Development Server

```bash
# From monorepo root
pnpm dev:web

# Or from this directory
pnpm dev
```

The app will start at `http://localhost:5173`

## Tech Stack

### Core Technologies
- **React 18.2** - UI library
- **TypeScript 5.3** - Type safety
- **Vite 5.0** - Build tool and dev server

### Data & State
- **Apollo Client 3.8** - GraphQL client
- **React Router 6.20** - Routing
- **Zustand 4.4** - Global state management (minimal usage)

### Styling
- **Tailwind CSS 3.3** - Utility-first CSS
- **PostCSS** - CSS processing
- **Custom Design Tokens** - Traditional Chinese color palette

### UI Components
- **Headless UI** - Accessible component primitives
- **Custom Components** - Built with design system tokens

## Design System

### Color Palette

The app uses a traditional Chinese color palette:

```typescript
// Primary Colors
vermillion: #C73E1D      // 朱红 (imperial)
imperial-yellow: #F8D147 // 明黄 (highlights)
ink-black: #1A1A1A       // 墨色 (text)
rice-white: #F9F7F4      // 米白 (background)

// Kingdom Colors
wei: #3A5BA0             // 魏国蓝
shu: #C73E1D             // 蜀国红
wu: #2C5F2D              // 吴国绿
```

### Typography

- **Chinese**: Noto Serif SC (serif), Noto Sans SC (sans-serif)
- **English**: Crimson Pro (serif), Inter (sans-serif)

### Components

Custom components following the design system:

- `<KingdomBadge>` - Color-coded kingdom indicators
- `<Loading>` - Loading spinner with message
- `<ErrorMessage>` - Styled error display
- `<Layout>` - Page layout with header/footer

## Project Structure

```
apps/web/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   ├── Footer.tsx       # Site footer
│   │   │   └── Layout.tsx       # Page wrapper
│   │   └── ui/
│   │       ├── Loading.tsx      # Loading spinner
│   │       ├── ErrorMessage.tsx # Error display
│   │       └── KingdomBadge.tsx # Kingdom indicator
│   ├── lib/
│   │   └── apollo.ts            # Apollo Client setup
│   ├── pages/
│   │   ├── Home.tsx             # Landing page
│   │   ├── CharacterList.tsx   # Character browsing
│   │   ├── CharacterDetail.tsx # Character profile
│   │   └── Timeline.tsx         # Timeline viewer
│   ├── styles/
│   │   └── globals.css          # Global styles + Tailwind
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── index.html                   # HTML template
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Pages

### Home (`/`)
Landing page with hero section and feature overview.

### Character List (`/characters`)
- Browse all characters
- Filter by kingdom (WEI, SHU, WU, HAN)
- Card-based grid layout
- Shows name (Chinese + English), kingdom badge, lifespan

### Character Detail (`/characters/:id`)
- Complete character profile
- **Dual Profiles**: Historical vs Literary side-by-side
- Personality traits (color-coded by source)
- Achievements / Famous scenes
- Relationships with other characters
- Birthplace and biographical data

### Timeline (`/timeline`)
- Chronological event timeline (160-280 AD)
- Importance filter (1-10 scale)
- Visual timeline with color-coded importance
- Event cards with year, description, category

### About (`/about`)
Information about the platform and multi-source truth system.

## GraphQL Queries

### Get Characters

```graphql
query GetCharacters($filter: CharacterFilter) {
  characters(filter: $filter) {
    id
    canonicalName
    courtesyName
    kingdom
    birthYear
    deathYear
  }
}
```

### Get Character Detail

```graphql
query GetCharacter($id: ID!) {
  character(id: $id) {
    id
    canonicalName
    courtesyName
    kingdom
    historicalProfile
    literaryProfile
    birthLocation {
      name
    }
    relationships {
      relationshipType
      characterA { canonicalName }
      characterB { canonicalName }
    }
  }
}
```

### Get Timeline

```graphql
query GetTimeline($filter: TimelineFilter) {
  timeline(filter: $filter) {
    year
    description
    importance
    event {
      name
      type
    }
  }
}
```

## Development

### Running Tests

```bash
pnpm test          # Run tests in watch mode
pnpm test:unit     # Run unit tests once
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

Output goes to `dist/` directory.

### Preview Production Build

```bash
pnpm preview
```

## Multi-Source Data Display

The app displays data from multiple sources clearly:

### Dual Profile System

Characters show **two separate profiles**:

1. **Historical Profile** (blue accent)
   - From 三国志 (Records)
   - Based on historical records
   - More realistic portrayal

2. **Literary Profile** (red accent)
   - From 三国演义 (Romance)
   - Artistic interpretation
   - Dramatized version

### Source Attribution

- Relationships tagged as HISTORICAL, LITERARY, or BOTH
- Visual color coding throughout
- Clear labels indicating source

## Responsive Design

The app is fully responsive:

- **Mobile** (320px+): Single column, touch-friendly
- **Tablet** (768px+): Two columns, larger cards
- **Desktop** (1024px+): Three columns, full features
- **Large** (1440px+): Optimized spacing

## Performance

### Optimizations

- Code splitting by route
- GraphQL query caching (Apollo Client)
- Image lazy loading (future)
- Virtualized lists for large datasets (future)

### Bundle Size

Target metrics:
- Initial JS: < 200KB gzipped
- Total page weight: < 500KB
- First contentful paint: < 1.5s

## Deployment

### Azure Static Web Apps

Recommended deployment target:

```bash
# Build the app
pnpm build

# Deploy to Azure
az staticwebapp create \
  --name three-kingdoms-web \
  --resource-group your-rg \
  --source dist/ \
  --location eastus
```

### Environment Variables (Production)

Set these in Azure Portal:

```env
VITE_API_URL=https://your-api.azurewebsites.net
VITE_GRAPHQL_ENDPOINT=https://your-api.azurewebsites.net/graphql
VITE_APP_ENV=production
```

### CDN Setup

Static assets should be served via Azure CDN:
- Images, fonts
- JavaScript bundles
- CSS files

## Accessibility

### WCAG 2.1 AA Compliance

- Semantic HTML throughout
- Keyboard navigation support
- ARIA labels where needed
- Color contrast > 4.5:1 for text
- Focus indicators visible
- Screen reader friendly

### Keyboard Shortcuts (Future)

- `/` - Focus search
- `Esc` - Close modals
- Arrow keys - Navigate lists

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Android (last 2 versions)

## Future Enhancements

### Phase 2
- [ ] Events page implementation
- [ ] Advanced search with filters
- [ ] Character comparison tool
- [ ] Relationship graph visualization

### Phase 3
- [ ] Reading interface for novel chapters
- [ ] Bookmarking and favorites
- [ ] User notes (with authentication)
- [ ] Share functionality

### Phase 4
- [ ] Dark mode
- [ ] Language toggle (Chinese/English)
- [ ] Accessibility improvements
- [ ] Performance optimizations

## Troubleshooting

### GraphQL Errors

If you see GraphQL errors, check:
1. API server is running (`pnpm dev:api`)
2. `VITE_GRAPHQL_ENDPOINT` is correct
3. Network tab in browser DevTools

### Build Errors

```bash
# Clean build artifacts
rm -rf dist/ node_modules/.vite

# Reinstall dependencies
pnpm install

# Rebuild
pnpm build
```

### Styles Not Loading

Ensure PostCSS and Tailwind are configured:
```bash
# Check Tailwind config exists
ls tailwind.config.js

# Verify globals.css imports Tailwind
grep "@tailwind" src/styles/globals.css
```

## Contributing

See monorepo root [CLAUDE.md](../../CLAUDE.md) for development guidelines.

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [React Router](https://reactrouter.com)
- [Architecture Documentation](../../docs/ARCHITECTURE.md)

## License

Part of the Three Kingdoms Digital Platform project.
