import globals from 'globals';
import eslintPluginJs from '@eslint/js';
import eslintPluginTs from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  {
    files: ['**/*.{astro,js,mjs,ts}'],
    languageOptions: { globals: globals.browser },
  },
  eslintPluginJs.configs.recommended,
  ...eslintPluginTs.configs.strict,
  ...eslintPluginAstro.configs['flat/jsx-a11y-strict'],
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
  {
    // the ignores property needs to be in a standalone object
    ignores: ['.astro/', 'dist/', '**/env.d.ts'],
  },
];
