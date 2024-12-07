import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import PostcssPresetEnv from 'postcss-preset-env';

// prettier-ignore
export default {
  plugins: [
    tailwindcss,
    autoprefixer,
    PostcssPresetEnv({ stage: 2 }),
  ],
}
