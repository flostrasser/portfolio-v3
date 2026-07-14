import netlify from '@astrojs/netlify';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import process from 'node:process';

const isE2E = process.env.E2E === 'true';

// for dynamic robots.txt; switch to the node adapter for playwright tests
// since the netlify adapter doesn't support the preview server
const adapter = isE2E ? node({ mode: 'standalone' }) : netlify();

// https://astro.build/config
export default defineConfig({
  adapter,
  vite: { plugins: [tailwindcss()] },
  compressHTML: 'jsx',
  // Inline the (small) CSS bundle into a <style> tag to remove the
  // render-blocking stylesheet request. Astro's CSP hashes the inline
  // <style> automatically, so this stays CSP-compliant.
  build: { inlineStylesheets: 'always' },
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
        "object-src 'none'",
        // frame-ancestors is set via netlify.toml header — it's ignored in meta-tag CSP
        "base-uri 'self'",
        "form-action 'self'",
        // Trusted Types: route DOM XSS sinks through a policy. The only client
        // scripts here use safe DOM APIs (addEventListener/setAttribute), so no
        // policy is created and none needs to be allowed.
        "require-trusted-types-for 'script'",
      ],
      // 'unsafe-inline' is a no-op fallback for legacy browsers that don't
      // support hashes; modern browsers ignore it whenever a hash is present.
      // 'self' must be repeated here since `resources` overrides Astro's
      // defaults. Astro appends the per-page script hashes after these.
      scriptDirective: {
        resources: ["'self'", "'unsafe-inline'"],
      },
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
