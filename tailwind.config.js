const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
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
      sans: ['PTRootUIWebVF', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"'],
      mono: ['"Roboto Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
    },
    // fontSize: {
    //   sm: ['14px', '20px'],
    //   base: ['16px', '24px'],
    //   lg: ['20px', '28px'],
    //   xl: ['24px', '32px'],
    // }
    extend: {
      flex: {
        // golden: '1 0 38.2%',
        golden: '1 0 61.8%',
        full: '0 1 100%',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
