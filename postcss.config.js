const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const PostcssPresetEnv = require('postcss-preset-env');

// prettier-ignore
module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    PostcssPresetEnv({ stage: 1 }),
  ],
}
