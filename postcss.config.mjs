import PostcssPresetEnv from 'postcss-preset-env';

// prettier-ignore
export default {
  plugins: [
    // Tailwind is handled by @tailwindcss/vite in astro.config.mjs
    PostcssPresetEnv({ stage: 2 }),
  ],
}
