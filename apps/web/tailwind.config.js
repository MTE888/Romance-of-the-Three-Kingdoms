/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Traditional Chinese colors
        vermillion: '#C73E1D',
        'imperial-yellow': '#F8D147',
        'ink-black': '#1A1A1A',
        'rice-white': '#F9F7F4',

        // Secondary colors
        'jade-green': '#2C5F2D',
        'indigo-blue': '#3A4B8A',
        bronze: '#8B6914',

        // Kingdom colors
        wei: '#3A5BA0',
        shu: '#C73E1D',
        wu: '#2C5F2D',

        // Heritage colors (Museum-inspired, from research)
        'heritage-gold': '#D4AF37',
        'heritage-burgundy': '#A5343C',
        'heritage-maroon': '#7D1E1E',
        'heritage-beige': '#EFC8A8',
        'palace-gray': '#575757',

        // Semantic text colors (from Zhihu research)
        'text-primary': '#373A40',
        'text-secondary': '#9196A1',
        'text-muted': '#BDBDBD',

        // Status colors
        success: '#329D15',
        warning: '#F8D147',
        error: '#C73E1D',
        info: '#1772F6',
      },

      fontFamily: {
        // Chinese fonts - Simplified Chinese
        'zh-serif': ["'Noto Serif SC'", "'Source Han Serif SC'", "'Songti SC'", 'serif'],
        'zh-sans': ["'Noto Sans SC'", "'Source Han Sans SC'", "'PingFang SC'", 'sans-serif'],
        // Chinese fonts - Traditional Chinese
        'zh-hant-serif': ["'Noto Serif TC'", "'Source Han Serif TC'", 'serif'],
        'zh-hant-sans': ["'Noto Sans TC'", "'Source Han Sans TC'", "'PingFang TC'", 'sans-serif'],
        // English fonts
        'en-serif': ["'Crimson Pro'", 'Georgia', 'serif'],
        'en-sans': ["'Inter'", "'Helvetica Neue'", 'sans-serif'],
        // System fallback
        system: [
          'apple-system',
          'BlinkMacSystemFont',
          "'Helvetica Neue'",
          "'Microsoft YaHei'",
          'sans-serif',
        ],
      },

      // Line Heights (Chinese text needs more vertical space - from WeChat Reading research)
      lineHeight: {
        none: '1',
        tight: '1.25', // English headings
        snug: '1.375', // Tight Chinese
        normal: '1.5', // English body
        relaxed: '1.6', // Chinese body text (research finding)
        reading: '1.8', // Chinese chapter reading (WeChat Reading style)
        loose: '2', // Classical text, poetry
      },

      // Letter Spacing (Chinese readability - from research)
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.5px', // Chinese readability improvement
        widest: '1px', // Dramatic spacing
      },

      // Border Radius (from Xiaohongshu research)
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
        lg: '8px',
        xl: '12px', // Xiaohongshu standard
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },

      // Box Shadows (enhanced with research findings)
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        // Traditional Chinese paper shadow
        paper: '0 2px 8px rgba(0, 0, 0, 0.08)',
        // Card hover state
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        // Seal stamp shadow
        seal: '2px 2px 4px rgba(199, 62, 29, 0.2)',
        // Inner shadow for inset effects
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },

      // Transition timing functions (from research - elegant, restrained)
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        // Elegant deceleration (research finding)
        elegant: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        // Spring-like (use sparingly)
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },

      // Transition durations (from research)
      transitionDuration: {
        75: '75ms',
        100: '100ms',
        150: '150ms', // Fast
        200: '200ms',
        300: '300ms', // Normal
        500: '500ms', // Slow
        700: '700ms',
        800: '800ms', // Narrative
        1000: '1000ms',
        1200: '1200ms', // Immersive
      },

      // Animation (elegant, restrained)
      animation: {
        // Fade animations
        'fade-in': 'fadeIn 0.3s ease-elegant',
        'fade-in-slow': 'fadeIn 0.5s ease-elegant',
        'fade-out': 'fadeOut 0.3s ease-elegant',
        // Slide animations
        'slide-up': 'slideUp 0.3s ease-elegant',
        'slide-down': 'slideDown 0.3s ease-elegant',
        'slide-left': 'slideLeft 0.3s ease-elegant',
        'slide-right': 'slideRight 0.3s ease-elegant',
        // Scale animations
        'scale-in': 'scaleIn 0.2s ease-elegant',
        'scale-out': 'scaleOut 0.2s ease-elegant',
        // Pulse (subtle)
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        // Spin (loading)
        spin: 'spin 1s linear infinite',
        // Bounce (use sparingly)
        bounce: 'bounce 1s ease-spring infinite',
      },

      // Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },

      // Container max-widths
      maxWidth: {
        container: '1180px', // Artron-style fixed width
      },

      // Z-index scale
      zIndex: {
        dropdown: '1000',
        sticky: '1100',
        modal: '1200',
        popover: '1300',
        tooltip: '1400',
      },

      // Backdrop blur (for glassmorphic effects from Xiaohongshu)
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [],
};
