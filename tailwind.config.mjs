import colors from 'tailwindcss/colors.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md,mdx,ts,svg}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      purple: {
        DEFAULT: '#6e7eff',
        dark: '#101326',
      },
      blue: '#4DE5FF',
      tangerine: '#FF8D81',
      pink: '#DB69FB',
      yellow: '#FFD840',
      turquoise: '#0DE3CA',
      green: '#76F266',
      miru: 'hsl(187deg 40% 30%)',
      mybay: 'hsl(192deg 100% 18%)',
      qhliving: 'hsl(20deg 49% 38%)',
      teleclap: 'hsl(0deg 44% 45%)',
      flexgallery: 'hsl(261deg 27% 26%)',
      threeyourmind: 'hsl(217deg 63% 29%)',
    },
    fontFamily: {
      // prettier-ignore
      sans: ['PTRootUIWebVF', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"'],
      // prettier-ignore
      mono: ['"Roboto Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    extend: {
      flex: {
        golden: '1 0 61.8%',
      },
    },
  },
  plugins: [],
};
