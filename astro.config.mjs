import netlify from '@astrojs/netlify';
import node from '@astrojs/node';
import { defineConfig } from 'astro/config';
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
});
