/**
 * Design Tokens for Three Kingdoms Platform
 *
 * Blend of modern minimalism and traditional Chinese aesthetics
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

    // Kingdom Colors
    kingdoms: {
      wei: '#3A5BA0',             // 魏国蓝 - Wei Kingdom
      shu: '#C73E1D',             // 蜀国红 - Shu Kingdom
      wu: '#2C5F2D',              // 吴国绿 - Wu Kingdom
    },

    // Neutral Grays (Modern)
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
  },

  typography: {
    // Font Families
    fontFamily: {
      zhSerif: "'Noto Serif SC', 'Source Han Serif SC', serif",
      zhSans: "'Noto Sans SC', 'Source Han Sans SC', sans-serif",
      enSerif: "'Crimson Pro', Georgia, serif",
      enSans: "'Inter', 'Helvetica Neue', sans-serif",
    },

    // Font Sizes
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
    },

    // Line Heights
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },

    // Font Weights
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },

  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
} as const;

export type Tokens = typeof tokens;
