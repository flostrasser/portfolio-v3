import netlify from '@astrojs/netlify';
import node from '@astrojs/node';
import { defineConfig, fontProviders } from 'astro/config';
import process from 'node:process';

const isE2E = process.env.E2E === 'true';

// for dynamic robots.txt; switch to the node adapter for playwright tests
// since the netlify adapter doesn't support the preview server
const adapter = isE2E ? node({ mode: 'standalone' }) : netlify();

// https://astro.build/config
export default defineConfig({
  adapter,
  devToolbar: { enabled: !isE2E },
  // Astro's default markdown syntax highlighter uses inline styles that aren't
  // compatible with CSP. No code blocks are rendered here, so disable it.
  markdown: { syntaxHighlight: false },
  security: {
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        // frame-ancestors is set via netlify.toml header — it's ignored in meta-tag CSP
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
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
