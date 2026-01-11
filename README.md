# 三国 / Three Kingdoms Digital Platform

<div align="center">

**The definitive digital platform for exploring the Three Kingdoms period**

*Blending historical accuracy with literary artistry through exceptional design*

[About](#-about) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Roadmap](#️-roadmap) • [Contributing](#-contributing)

</div>

---

## 🎯 About

The Three Kingdoms period (169-280 AD) stands as one of the most fascinating eras in Chinese history - a time of legendary heroes, brilliant strategists, and epic conflicts that shaped a civilization. This platform brings that history to life through a sophisticated web application that serves scholars, students, and enthusiasts alike.

### What Makes This Different

This isn't just another wiki or text archive. We're building something unique:

**🔍 Multi-Source Truth**
- Clear distinction between historical records and literary interpretation
- Every fact attributed to its source with reliability indicators
- Side-by-side comparison of conflicting accounts
- Dual profiles for characters (historical vs literary)

**🎨 Design Excellence**
- Perfect blend of modern minimalism and traditional Chinese aesthetics
- Inspired by cloud patterns (云纹), seal stamps (印章), and classical art
- Responsive, accessible, delightful on every device

**📚 Comprehensive Content**
- Complete text of Romance of the Three Kingdoms (三国演义) - 120 chapters
- Historical records from Records of the Three Kingdoms (三国志)
- Modern scholarly analysis
- Maps, timelines, relationship graphs
- Multilingual support (Chinese + English + more)

**🌱 Built for Evolution**
- Designed to grow with new sources and insights
- Community contributions welcomed
- Long-term vision for continuous improvement

---

## ✨ Features

### 📖 Immersive Reading
- Beautiful chapter reader with scroll animation metaphor
- Character highlighting and quick previews
- Progress tracking and bookmarks
- Annotations and historical context
- Dark/light mode

### 👥 Character Encyclopedia
- 100+ detailed character profiles
- Dual presentation: historical records vs literary portrayal
- Relationship graphs showing alliances, rivalries, family ties
- Event timeline for each character
- Image galleries with traditional artwork

### ⏱️ Interactive Timeline
- Navigate 111 years of history (169-280 AD)
- Filter by importance, category, kingdom
- Linked to characters, events, and chapters
- Zoom from decade to day level
- Territory changes visualized

### 🗺️ Historical Maps
- Interactive map of Three Kingdoms China
- Territory control over time
- Battle locations and movements
- City and landmark information
- Modern equivalents

### 🔍 Powerful Search
- Full-text search in Chinese and English
- Filter by character, event, location, chapter
- Source-aware results
- Fast, relevant results

### 📊 Relationship Visualization
- Interactive character relationship graph
- Filter by relationship type
- Color-coded by kingdom and faction
- Explore connections and alliances
- "Six degrees of separation" queries

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Design Tokens
- **Visualization**: D3.js, React Flow
- **State Management**: Zustand + React Query
- **i18n**: react-i18next

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Fastify
- **API**: GraphQL (Apollo Server)
- **ORM**: Prisma
- **Search**: Elasticsearch / Azure Cognitive Search
- **Cache**: Redis

### Database & Infrastructure
- **Database**: PostgreSQL (Azure Database)
- **Storage**: Azure Blob Storage
- **CDN**: Azure CDN
- **Hosting**: Azure App Service
- **CI/CD**: GitHub Actions

### Tooling
- **Monorepo**: Turborepo
- **Testing**: Vitest, Playwright, React Testing Library
- **Code Quality**: ESLint, Prettier, TypeScript strict
- **Documentation**: Storybook (component library)

---

## 📂 Project Structure

```
Romance-of-the-Three-Kingdoms/
├── apps/
│   ├── web/                # React frontend
│   └── api/                # Node.js backend
├── packages/
│   ├── ui/                 # Shared component library
│   ├── database/           # Prisma schema & migrations
│   └── types/              # Shared TypeScript types
├── src/                    # Source materials (120 chapters)
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md     # Technical architecture
│   ├── PROJECT_PLANNING.md # Detailed roadmap
│   └── SKILLS.md          # Claude Code skills
├── .claude/               # Claude Code configuration
├── CLAUDE.md              # Development guidelines
└── README.md              # This file
```

---

## 🗺️ Roadmap

### ✅ Phase 0: Planning (Current)
- [x] Architecture design
- [x] Tech stack selection
- [x] Data model design
- [x] Comprehensive documentation

### 🔜 Phase 1: Foundation (Weeks 1-4)
- [ ] Monorepo setup (Turborepo)
- [ ] Database schema (Prisma)
- [ ] Design system foundations
- [ ] Basic API structure
- [ ] Frontend boilerplate
- [ ] Azure infrastructure
- [ ] Deploy "Hello Three Kingdoms"

### 📅 Phase 2: Core Reading (Weeks 5-8)
- [ ] Chapter reader with scroll animation
- [ ] Character encyclopedia (50 characters)
- [ ] Full-text search (Chinese)
- [ ] Responsive design implementation
- [ ] Dark/light mode

### 📅 Phase 3: Relationships & Timeline (Weeks 9-12)
- [ ] Relationship graph visualization
- [ ] Interactive timeline (200+ events)
- [ ] Historical maps
- [ ] Event pages
- [ ] Location database

### 📅 Phase 4: Multi-Source System (Weeks 13-16)
- [ ] Source attribution UI
- [ ] Dual profile system (historical vs literary)
- [ ] Conflict resolution interface
- [ ] Admin panel for fact management

### 📅 Phase 5: Polish & Launch (Weeks 17-20)
- [ ] Character portraits and artwork
- [ ] Advanced annotations
- [ ] Performance optimization
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] User testing
- [ ] **MVP Public Launch**

### 🔮 Post-MVP
- **Months 6-9**: English localization
- **Months 9-12**: Community features (accounts, notes, discussions)
- **Year 2**: Advanced analytics, AI integration
- **Year 2-3**: Mobile apps (iOS, Android)

See [PROJECT_PLANNING.md](docs/PROJECT_PLANNING.md) for detailed roadmap.

---

## 🎨 Design Philosophy

### Visual Language

**Traditional Chinese Elements**
- Cloud patterns (云纹) for backgrounds
- Seal stamps (印章) for emphasis
- Classical borders and frames
- Scroll metaphor for reading

**Modern Minimalism**
- Clean, generous white space
- Clear typography hierarchy
- Subtle animations
- Responsive grid system

**Color Palette**
- 朱红 (Vermillion) - Imperial, important elements
- 明黄 (Imperial Yellow) - Highlights, accents
- 墨色 (Ink Black) - Primary text
- 米白 (Rice White) - Backgrounds
- 青玉 (Jade Green), 靛蓝 (Indigo), 古铜 (Bronze)

**Kingdom Colors**
- 魏 (Wei) - Blue
- 蜀 (Shu) - Red
- 吴 (Wu) - Green

---

## 🏛️ Historical Context

### The Three Kingdoms Period (220-280 AD)

After the collapse of the Han Dynasty, China fragmented into three rival kingdoms:

**魏 (Wei)** - Northern China
- Founded by Cao Cao, then Cao Pi
- Most powerful economically and militarily
- Capital: Luoyang

**蜀 (Shu Han)** - Sichuan region
- Founded by Liu Bei
- Claimed legitimacy as Han successor
- Famous for Zhuge Liang's strategies
- Capital: Chengdu

**吴 (Wu)** - Southeast China
- Founded by Sun Quan
- Naval superiority
- Economic prosperity
- Capital: Nanjing (Jianye)

### Key Figures

- **刘备 (Liu Bei)** - Shu founder, portrayed as virtuous ruler
- **曹操 (Cao Cao)** - Wei founder, brilliant but controversial
- **孙权 (Sun Quan)** - Wu founder, skilled administrator
- **诸葛亮 (Zhuge Liang)** - Legendary strategist
- **关羽 (Guan Yu)** - Symbol of loyalty
- **张飞 (Zhang Fei)** - Fierce warrior

### Cultural Impact

The Three Kingdoms era has profoundly influenced:
- Chinese values and philosophy
- Military strategy and tactics
- Literature and storytelling
- Games, movies, and popular culture worldwide

---

## 🤝 Contributing

We welcome contributions from:

**Developers**
- Feature implementation
- Bug fixes
- Performance optimization
- Testing

**Historians & Scholars**
- Source verification
- Content accuracy
- Historical context
- Scholarly annotations

**Designers**
- UI/UX improvements
- Illustrations and artwork
- Animation design
- Accessibility

**Translators**
- English translations
- Content summaries
- Glossary entries
- Localization

### How to Contribute

1. Read [CLAUDE.md](CLAUDE.md) for development guidelines
2. Check [PROJECT_PLANNING.md](docs/PROJECT_PLANNING.md) for roadmap
3. Look for open issues or propose new features
4. Fork the repository
5. Create a feature branch
6. Make your changes
7. Submit a pull request

**Important**: Source materials in `src/` are read-only. Never modify original text.

---

## 📚 Sources

### Primary Sources
- **三国演义 (Romance of the Three Kingdoms)** - Luo Guanzhong (14th century)
- **三国志 (Records of the Three Kingdoms)** - Chen Shou (3rd century)
- **后汉书 (Book of Later Han)** - Fan Ye (5th century)

### Modern Scholarship
- Academic analyses and interpretations
- Archaeological findings
- Historical research papers

### Media & Artwork
- Traditional paintings and illustrations
- Historical maps and diagrams
- Museum collections

All sources properly attributed with clear reliability indicators.

---

## 📄 License

*To be determined*

Options under consideration:
- Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)
- MIT License (for code)
- Open Database License (for data)

---

## 🙏 Acknowledgments

- **Original Authors**: Luo Guanzhong (罗贯中), Chen Shou (陈寿)
- **Historical Figure**: Thousands who lived through this pivotal era
- **Modern Scholars**: For preserving and analyzing this history
- **Open Source Community**: For the amazing tools we build upon

---

## 📧 Contact

- **Issues**: [GitHub Issues](https://github.com/MTE888/Romance-of-the-Three-Kingdoms/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MTE888/Romance-of-the-Three-Kingdoms/discussions)
- **Project Planning**: See [docs/PROJECT_PLANNING.md](docs/PROJECT_PLANNING.md)

---

## 🌟 Status

**Current Phase**: Planning & Architecture ✅
**Next Phase**: Foundation (Ready to start)
**Target MVP**: ~20 weeks from start
**Vision**: Long-term platform for exploration and learning

---

<div align="center">

**Built with ❤️ for history, literature, and timeless stories**

*"The empire, long divided, must unite; long united, must divide."*
— Opening line of Romance of the Three Kingdoms

</div>
