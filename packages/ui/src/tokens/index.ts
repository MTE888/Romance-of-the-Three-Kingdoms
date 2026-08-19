/**
 * Design Tokens for Three Kingdoms Platform
 *
 * Blend of modern minimalism and traditional Chinese aesthetics
 *
 * Research References:
 * - Palace Museum (故宫博物院): Imperial aesthetics
 * - WeChat Reading (微信读书): Typography for Chinese reading
 * - Ant Design: 8px base grid system
 * - Guochao (国潮) movement: Traditional-modern fusion
 *
 * @see docs/DESIGN_REFRESH_RESEARCH.md for full research findings
 */

export const tokens = {
  colors: {
    // Primary Traditional Chinese Colors
    primary: {
      vermillion: '#C73E1D',      // 朱红 - Imperial, important elements
      imperialYellow: '#F8D147',  // 明黄 - Highlights, accents
      inkBlack: '#1A1A1A',        // 墨色 - Primary text
      riceWhite: '#F9F7F4',       // 米白 - Backgrounds
    },

    // Secondary Colors
    secondary: {
      jadeGreen: '#2C5F2D',       // 青玉 - Success, nature
      indigoBlue: '#3A4B8A',      // 靛蓝 - Links, info
      bronze: '#8B6914',          // 古铜 - Metadata, secondary
    },

    // Heritage Colors (Museum-inspired, from research)
    heritage: {
      gold: '#D4AF37',            // 金色 - Palace Museum gold, cultural authority
      burgundy: '#A5343C',        // 酒红 - National Museum burgundy
      maroon: '#7D1E1E',          // 栗色 - Deep authority, formal
      beige: '#EFC8A8',           // 米色 - Warm neutral, card backgrounds
      palaceGray: '#575757',      // 宫灰 - Palace Museum interface gray
    },

    // Kingdom Colors
    kingdoms: {
      wei: '#3A5BA0',             // 魏国蓝 - Wei Kingdom (Cao Cao)
      shu: '#C73E1D',             // 蜀国红 - Shu Kingdom (Liu Bei)
      wu: '#2C5F2D',              // 吴国绿 - Wu Kingdom (Sun Quan)
    },

    // Neutral Grays (Modern - inspired by Zhihu, Guokr)
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },

    // Semantic text colors (from Zhihu research)
    text: {
      primary: '#373A40',         // Main text
      secondary: '#9196A1',       // Secondary text
      muted: '#BDBDBD',           // Disabled/muted text
      inverse: '#FFFFFF',         // Text on dark backgrounds
    },

    // Status colors
    status: {
      success: '#329D15',         // Artron green
      warning: '#F8D147',         // Imperial yellow
      error: '#C73E1D',           // Vermillion
      info: '#1772F6',            // Zhihu blue
    },
  },

  typography: {
    // Font Families
    fontFamily: {
      // Chinese fonts - Simplified
      zhSerif: "'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif",
      zhSans: "'Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', sans-serif",
      // Chinese fonts - Traditional
      zhHantSerif: "'Noto Serif TC', 'Source Han Serif TC', serif",
      zhHantSans: "'Noto Sans TC', 'Source Han Sans TC', 'PingFang TC', sans-serif",
      // English fonts
      enSerif: "'Crimson Pro', Georgia, serif",
      enSans: "'Inter', 'Helvetica Neue', sans-serif",
      // System fallback
      system: "apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Microsoft YaHei', sans-serif",
    },

    // Font Sizes (8px base scale)
    fontSize: {
      xs: '12px',       // 1.5 × 8
      sm: '14px',       // ~1.75 × 8
      base: '16px',     // 2 × 8
      lg: '18px',       // ~2.25 × 8
      xl: '20px',       // 2.5 × 8
      '2xl': '24px',    // 3 × 8
      '3xl': '30px',    // ~3.75 × 8
      '4xl': '36px',    // 4.5 × 8
      '5xl': '48px',    // 6 × 8
      '6xl': '60px',    // 7.5 × 8
    },

    // Line Heights (Chinese text needs more vertical space - from WeChat Reading research)
    lineHeight: {
      none: 1,
      tight: 1.25,       // English headings
      snug: 1.375,       // Tight Chinese
      normal: 1.5,       // English body
      relaxed: 1.6,      // Chinese body text (research finding)
      reading: 1.8,      // Chinese chapter reading (WeChat Reading style)
      loose: 2.0,        // Classical text, poetry
    },

    // Letter Spacing (Chinese readability - from research)
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.5px',    // Chinese readability improvement
      widest: '1px',     // Dramatic spacing
    },

    // Font Weights
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // 8px Base Grid Spacing System (Ant Design / Classical grid)
  spacing: {
    px: '1px',
    0: '0',
    0.5: '2px',         // 0.25 × 8
    1: '4px',           // 0.5 × 8
    1.5: '6px',         // 0.75 × 8
    2: '8px',           // 1 × 8 (base unit)
    2.5: '10px',        // 1.25 × 8
    3: '12px',          // 1.5 × 8
    3.5: '14px',        // 1.75 × 8
    4: '16px',          // 2 × 8
    5: '20px',          // 2.5 × 8
    6: '24px',          // 3 × 8
    7: '28px',          // 3.5 × 8
    8: '32px',          // 4 × 8
    9: '36px',          // 4.5 × 8
    10: '40px',         // 5 × 8
    11: '44px',         // 5.5 × 8
    12: '48px',         // 6 × 8
    14: '56px',         // 7 × 8
    16: '64px',         // 8 × 8
    20: '80px',         // 10 × 8
    24: '96px',         // 12 × 8
    28: '112px',        // 14 × 8
    32: '128px',        // 16 × 8
    // Named spacing (legacy)
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },

  // Border Radius (from Xiaohongshu research)
  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',          // Xiaohongshu standard
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',      // Pills
  },

  // Shadows (subtle, modern)
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    // Traditional Chinese paper shadow
    paper: '0 2px 8px rgba(0, 0, 0, 0.08)',
    // Card hover state
    cardHover: '0 8px 24px rgba(0, 0, 0, 0.12)',
    // Seal stamp shadow
    seal: '2px 2px 4px rgba(199, 62, 29, 0.2)',
  },

  // Transitions & Animations (from research - elegant, restrained)
  transitions: {
    // Duration
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      // Narrative/storytelling (Palace Museum style)
      narrative: '800ms',
      immersive: '1200ms',
    },

    // Easing curves (from research)
    easing: {
      // Default smooth
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Elegant deceleration (research finding)
      elegant: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      // Ease out for exits
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      // Ease in for entrances
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // Spring-like (use sparingly)
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },

    // Legacy (backwards compatibility)
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  // Container widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1180px',        // Artron-style fixed width
    '2xl': '1536px',
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    tooltip: 1400,
  },
} as const;

export type Tokens = typeof tokens;

// Helper types for color access
export type ColorToken = keyof typeof tokens.colors;
export type SpacingToken = keyof typeof tokens.spacing;
