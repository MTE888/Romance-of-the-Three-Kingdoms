# Design Refresh Research: Chinese Websites & Apps Blending Traditional Aesthetics with Modern UX

**Last Updated**: 2026-01-24
**Session**: Session 13 - Design Refresh Research
**Purpose**: Inform design refresh for the Three Kingdoms Digital Platform

---

## Executive Summary

This research identifies leading Chinese digital platforms that successfully blend traditional Chinese aesthetics with modern user experience design principles. These findings will inform the design refresh for the Three Kingdoms Digital Platform.

### Key Findings

1. **Color Psychology**: Imperial heritage colors (gold, burgundy, vermillion) create cultural authority
2. **Typography**: Chinese text requires 1.6-1.8 line height and 0.5px letter spacing
3. **Layout**: 8px base grid with generous whitespace reflects Eastern aesthetic appreciation
4. **Animation**: Subtle, restrained transitions (300-500ms) with elegant easing curves
5. **Traditional Elements**: Seal stamps, cloud patterns, and scroll metaphors used sparingly

---

## Category 1: Museum & Cultural Heritage Platforms

### 1. 故宫博物院 / Palace Museum (Forbidden City)

- **URL**: https://www.dpm.org.cn
- **Key Design Elements**:
  - Gold accents on neutral gray (#575757) backgrounds — imperial aesthetics with contemporary readability
  - **Seasonal theming**: Dynamic visual transitions (春/夏/秋/冬) embedding cultural calendar awareness
  - "全景故宫" (360° Panoramic Tours) — immersive 3D visualization
  - Typography: Microsoft YaHei balances tradition with screen legibility
  - Symmetry principles from classical architecture preserved in digital layout
- **Why Notable**: Successfully honors classical imperial symmetry while embracing modern interaction patterns

**Design Tokens Inspiration**:
```css
/* Palace Museum palette */
--palace-gold: #D4AF37;
--palace-gray: #575757;
--palace-bg: #F5F3EF;
```

### 2. 中国国家博物馆 / China National Museum

- **URL**: https://www.chnmuseum.cn
- **Key Design Elements**:
  - Deep burgundy/maroon (#a5343c, #7d1e1e) for cultural authority
  - Neutral beige/tan (#efc8a8) for content cards
  - Grid-based galleries with carousel components
  - Symmetrical layouts reflecting classical design principles
- **Why Notable**: Color psychology (burgundy = heritage/importance) while remaining accessible

**Design Tokens Inspiration**:
```css
/* National Museum palette */
--museum-burgundy: #A5343C;
--museum-maroon: #7D1E1E;
--museum-beige: #EFC8A8;
```

### 3. 台北國立故宮博物院 / National Palace Museum (Taiwan)

- **URL**: https://www.npm.gov.tw
- **Key Design Elements**:
  - Multi-language support (Chinese, English, Japanese, Korean)
  - "720° VR走進故宮" — immersive artifact exploration
  - "兒童學藝中心" (Children's Learning Center) — classical art + interactive digital learning
  - Comprehensive accessibility ("無障礙" sections)
- **Why Notable**: Bridges rigid classical collections with engaging modern interactive experiences

---

## Category 2: Reading & Literature Platforms

### 4. 微信读书 / WeChat Reading

- **URL**: https://weread.qq.com
- **App**: WeChat Reading (iOS/Android)
- **Key Design Elements**:
  - Specialized reading interface for Chinese text consumption
  - Optimized line spacing and font sizing for long-form reading
  - Clean, distraction-free layout for immersive experience
  - Social features (bookmarks, notes) integrated without visual clutter
  - Smooth scrolling and page transition animations
- **Why Notable**: Best-in-class model for chapter reader interface and classical Chinese typography

**Design Patterns to Apply**:
- Line height: 1.8-2.0 for chapter reading
- Font size: 18-20px for reading comfort
- Generous margins for scroll-like reading experience
- Progress bar for chapter completion

### 5. 豆瓣 / Douban

- **URL**: https://www.douban.com
- **Key Design Elements**:
  - Information-density with functional simplicity
  - White backgrounds with subtle gray accents
  - Progressive disclosure ("展开"/"收起" expand/collapse)
  - Clear categorical hierarchies (Books, Movies, Music, Groups)
  - Generous whitespace reflecting Eastern aesthetic appreciation
  - "Small Groups" feature — traditional literary circles translated to digital
- **Why Notable**: Expresses cultural values through structure rather than decoration

**Design Patterns to Apply**:
- Progressive disclosure for detailed information
- Multi-source content organization (historical vs literary)
- Community features for scholarly discussions

### 6. 简书 / Jianshu

- **URL**: https://www.jianshu.com
- **Key Design Elements**:
  - Red-orange accent (#D95354) with clean whites
  - Prominent "Write Article" button encouraging UGC
  - Article previews with engagement metrics (social proof)
  - "查看更多" (view more) overlays for progressive disclosure
  - Hot reads section with chronological organization
- **Why Notable**: User-generated content patterns, community engagement features

---

## Category 3: Modern Consumer Apps with Cultural Integration

### 7. 小红书 / Xiaohongshu (Little Red Book)

- **URL**: https://www.xiaohongshu.com
- **App**: Xiaohongshu (iOS/Android)
- **Key Design Elements**:
  - Brand red (#ff2e4d) for CTAs and highlights
  - Comprehensive dark/light mode support
  - Sophisticated component architecture with detailed specifications
  - Glassmorphic effects using backdrop filters
  - Typography: Hierarchical scales with 400-600 weights, 120-140% line heights
  - Spacing: 12px border radius standard, 999px for pills
- **Why Notable**: Modern design system architecture, comprehensive component documentation

**Design System Learnings**:
```css
/* Xiaohongshu spacing */
--border-radius-sm: 8px;
--border-radius-md: 12px;
--border-radius-pill: 999px;

/* Typography */
--line-height-tight: 1.2;
--line-height-normal: 1.4;
```

### 8. 哔哩哔哩 / Bilibili

- **URL**: https://www.bilibili.com
- **Key Design Elements**:
  - Grid-based responsive system (xs, sm, md, lg, xl, xxl breakpoints)
  - Parallax scrolling and sophisticated visual effects
  - Progressive image loading (LQIP)
  - Dynamic accent colors derived from content
  - 40+ content categories emphasizing discoverability
- **Why Notable**: Timeline visualization, category-based organization, responsive design system

**Design Patterns to Apply**:
- Timeline visualization for historical events
- Category-based filtering for characters
- Responsive grid system

### 9. 知乎 / Zhihu

- **URL**: https://www.zhihu.com
- **Key Design Elements**:
  - Primary blue (#1772F6) accent on white (#ffffff)
  - Text hierarchy: Dark gray (#373a40), medium gray (#9196a1)
  - Headlines: 600 weight at 16px; Body: 15px with 14-12px variants
  - Built-in "無障礙模式" (accessible mode)
  - Multiple authentication pathways
- **Why Notable**: Q&A system for scholarly discussions, accessibility-first design

**Design Tokens Inspiration**:
```css
/* Zhihu typography */
--text-primary: #373A40;
--text-secondary: #9196A1;
--accent-blue: #1772F6;
```

---

## Category 4: Art & Knowledge Platforms

### 10. 雅昌艺术网 / Artron

- **URL**: https://www.artron.net
- **Key Design Elements**:
  - Primary green (#329d15) for interactive elements
  - Neutral grays (#262626, #595959) for typography
  - Fixed 1180px centered container for balanced composition
  - Smooth transitions (0.2-0.3s cubic-bezier)
  - Fixed nav with blur backdrop effects
  - Traditional ink landscape exhibitions featured prominently
- **Why Notable**: Minimalist palette feels both professional and culturally grounded

**Design Patterns to Apply**:
- Fixed container width for optimal reading
- Blur backdrop effects for layered UI
- Neutral palette with single accent color

### 11. 果壳网 / Guokr

- **URL**: https://www.guokr.com
- **Key Design Elements**:
  - White backgrounds, dark charcoal (#262626) typography
  - Accent blue (#3355FF) for actions
  - Typography: "PingFang SC, apple-system, BlinkMacSystemFont, Helvetica Neue, Microsoft YaHei"
  - 8px, 16px, 24px spacing increments
  - Hover transitions (0.3s ease-in-out)
- **Why Notable**: Minimalism as culturally appropriate, not just trendy

**Design Patterns to Apply**:
- 8px base spacing system
- Consistent transition timing (0.3s)
- Clean typography hierarchy

### 12. 网易云音乐 / NetEase Cloud Music

- **URL**: https://music.163.com
- **Key Design Elements**:
  - Neutral grays with blue accent links, red error states
  - Multiple authentication pathways (WeChat, QQ, Email)
  - Modular dialog templates
  - Dynamic comment expansion
  - Search suggestions guide discovery
- **Why Notable**: Progressive disclosure patterns, modular dialog systems

---

## Design Systems & Frameworks

### Ant Design (Alibaba)

- **URL**: https://ant.design
- **Philosophy**: Enterprise-grade with cultural integration
- Traditional Chinese grid systems (8-point grid rooted in classical proportions)
- Color palette inspired by classical painting (vermillion, imperial yellow, ink black)
- Comprehensive Chinese typography guidelines

### TDesign (Tencent)

- Cross-platform design system with cultural considerations
- Emphasis on balance and symmetry (yin-yang principles in layout)

### Huawei Design System

- Modern minimalism with traditional spatial harmony
- Extensive Chinese character rendering documentation

---

## Key Design Patterns Identified

### Color Palettes

| Pattern | Colors | Use Case |
|---------|--------|----------|
| Imperial Heritage | Gold + Neutral Grays | Cultural authority |
| Nature/Growth | Green Accents + Whites | Refinement, calm |
| Authority + Warmth | Deep Burgundy + Beige | Museums, formal |
| Modern Clarity | Blue + Grays | Knowledge platforms |

### Typography Best Practices

- **Sans-serif for UI**: Noto Sans SC, PingFang SC, Microsoft YaHei
- **Serif for reading**: Noto Serif SC, Songti SC
- **Line height**: 1.6-1.8 for Chinese (needs more vertical space)
- **Letter spacing**: 0.5px prevents cramped feeling
- **Font weights**: 400 (body), 500-600 (headers), 700 (emphasis)

### Layout Principles

1. **Symmetry & Balance**: Classical compositional principles in grid layouts
2. **Whitespace/Negative Space**: Eastern aesthetic restraint
3. **8px Base Grid**: Classical division (2⁴ = 16 grids)
4. **Progressive Disclosure**: Expand/collapse reduces cognitive load
5. **Card-based Modules**: Content organization

### Animation Guidelines

- **Duration**: 300-500ms for UI, 800-1200ms for narrative
- **Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — elegant deceleration
- **Principle**: Subtle, restrained — avoid jarring/bouncy animations

### Traditional-Modern Fusion Techniques

1. **Seal stamps (印章)**: Red circular/square elements as content dividers
2. **Cloud patterns (云纹)**: Subtle SVG decorative elements
3. **Ink-wash effects**: Background textures via CSS filters
4. **Scroll-like margins**: Generous padding honoring traditional scroll format
5. **Seasonal theming**: Dynamic responses to cultural calendar

---

## Guochao (国潮) & New Chinese Style (新中式) Trends

### Guochao Movement (Chinese Chic/National Tide)

- Revival of classical Chinese cultural elements in contemporary design
- Web application: Hero images with cloud patterns, seal-stamp aesthetics, silk texture overlays

### 新中式 (New Chinese Style) Characteristics

- **Colors**: Traditional + modern muted tones (vermillion + off-white, imperial yellow + soft gray)
- **Typography**: Modern sans-serif + occasional classical serif for emphasis
- **Layout**: Asymmetrical balance inspired by classical ink painting composition
- **Animation**: Subtle, elegant transitions

---

## Recommendations for Three Kingdoms Platform

### Priority Inspirations

1. **微信读书** — Chapter reader interface, typography handling
2. **故宫博物院** — Imperial color palette, immersive features
3. **豆瓣** — Multi-source content organization, community features
4. **小红书** — Design system rigor, component architecture
5. **哔哩哔哩** — Responsive grid, timeline visualizations

### Design System Opportunities

1. **Typography Stack**: Noto Sans SC (UI) + Noto Serif SC (reading) + Crimson Pro (English)
2. **Color System**: Vermillion, imperial yellow, ink black, jade green, rice white + dark mode
3. **Traditional Elements**: Seal stamps, cloud patterns, scroll margins (used sparingly)
4. **Spacing System**: 8px base grid, generous whitespace
5. **Animation**: Subtle, elegant transitions (300-500ms)
6. **Accessibility**: Dark mode, font size controls, WCAG compliance

### Content Presentation Patterns

- **Multi-source displays**: Historical vs. literary facts side-by-side
- **Card-based architecture**: For facts, events, character profiles
- **Progressive disclosure**: Expand/collapse for detailed information
- **Immersive features**: 360° timelines, panoramic chapter experiences

---

## URLs & Apps Summary

| Name | Type | URL/App |
|------|------|---------|
| 故宫博物院 | Museum | https://www.dpm.org.cn |
| 中国国家博物馆 | Museum | https://www.chnmuseum.cn |
| 台北故宮博物院 | Museum | https://www.npm.gov.tw |
| 微信读书 | Reading | https://weread.qq.com |
| 豆瓣 | Community | https://www.douban.com |
| 简书 | Writing | https://www.jianshu.com |
| 小红书 | Social | https://www.xiaohongshu.com |
| 哔哩哔哩 | Video | https://www.bilibili.com |
| 知乎 | Q&A | https://www.zhihu.com |
| 雅昌艺术网 | Art | https://www.artron.net |
| 果壳网 | Knowledge | https://www.guokr.com |
| 网易云音乐 | Music | https://music.163.com |
| Ant Design | Design System | https://ant.design |

---

## Implementation Priority

### Phase 1: Core Design Updates (Immediate)

1. **Update design tokens** with research findings
2. **Enhance Tailwind config** with new patterns
3. **Add traditional CSS utilities** for seal stamps, cloud patterns

### Phase 2: Component Enhancements (Next Sprint)

1. Update chapter reader with WeChat Reading-inspired typography
2. Enhance timeline with Bilibili-inspired visualization
3. Add progressive disclosure to character profiles

### Phase 3: Advanced Features (Future)

1. Implement dark mode with heritage colors
2. Add seasonal theming (Palace Museum style)
3. Create immersive 360° experiences

---

## Design Token Updates (Summary)

### New Colors to Add

```typescript
// Heritage palette (Museum-inspired)
heritage: {
  gold: '#D4AF37',          // Palace Museum gold
  burgundy: '#A5343C',      // National Museum burgundy
  maroon: '#7D1E1E',        // Deep authority
  beige: '#EFC8A8',         // Warm neutral
},

// Extended grays for modern look
neutral: {
  charcoal: '#262626',      // Guokr typography
  slate: '#373A40',         // Zhihu primary text
  silver: '#9196A1',        // Secondary text
}
```

### New Animation Timing

```typescript
animations: {
  // UI interactions
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',

  // Narrative/storytelling
  narrative: '800ms',
  immersive: '1200ms',

  // Easing curves
  easeElegant: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeSmooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
}
```

### Typography Refinements

```typescript
typography: {
  // Chinese text needs more vertical space
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.6,      // Chinese body text
    reading: 1.8,      // Chapter reading
    loose: 2.0,        // Classical text
  },

  // Letter spacing for Chinese
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.5px',     // Chinese readability
    wider: '1px',
  },
}
```

---

*Research compiled: January 2026*
*Session: Session 13 - Design Refresh Research*
