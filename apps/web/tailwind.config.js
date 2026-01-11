/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Traditional Chinese colors
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
      },
      fontFamily: {
        'zh-serif': ["'Noto Serif SC'", "'Source Han Serif SC'", 'serif'],
        'zh-sans': ["'Noto Sans SC'", "'Source Han Sans SC'", 'sans-serif'],
        'en-serif': ["'Crimson Pro'", 'Georgia', 'serif'],
        'en-sans': ["'Inter'", "'Helvetica Neue'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
