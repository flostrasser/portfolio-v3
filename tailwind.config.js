const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.html'],
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
      miru: '#2E656C',
      mybay: '#004A5C',
      qhliving: '#BD6A40',
      teleclap: '#BD4E4E',
      flexgallery: '#3C3053',
      threeyourmind: '#1B3E78',
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
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
