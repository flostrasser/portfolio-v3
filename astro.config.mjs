import netlify from '@astrojs/netlify';
import node from '@astrojs/node';
import { defineConfig, fontProviders } from 'astro/config';
import process from 'node:process';

// for dynamic robots.txt
let adapter = netlify();

// for playwright tests, as netlify adapter doesn't support the preview server
if (process.env.ASTRO_ADAPTER === 'node') {
  adapter = node({
    mode: 'standalone',
  });
}

// https://astro.build/config
export default defineConfig({
  adapter,
  fonts: [
    {
      name: 'PT Root UI',
      cssVariable: '--font-pt-root-ui',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: [
              './src/assets/fonts/PT-Root-UI_VF.woff2',
              './src/assets/fonts/PT-Root-UI_VF.woff',
            ],
            weight: '400',
            style: 'normal',
          },
        ],
      },
    },
    {
      name: 'Roboto Mono',
      cssVariable: '--font-roboto-mono',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: [
              './src/assets/fonts/roboto-mono-v13-latin-regular.woff2',
              './src/assets/fonts/roboto-mono-v13-latin-regular.woff',
            ],
            weight: '400',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
