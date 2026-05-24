import tailwindcss from '@tailwindcss/postcss';
import PostcssPresetEnv from 'postcss-preset-env';

// prettier-ignore
export default {
  plugins: [
    tailwindcss,
    PostcssPresetEnv({ stage: 2 }),
  ],
}
