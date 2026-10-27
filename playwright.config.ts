import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/tests',
  snapshotDir: './playwright/tests/snapshots',
  updateSnapshots: 'missing',
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-android',
      use: { ...devices['Pixel 7'] },
    },
  ],
  webServer: {
    // `astro preview` in Astro >=7.4 daemonises and returns exit code 0 immediately,
    // which Playwright mistakes for an early exit. Run the node standalone server
    // directly so the process stays alive for the duration of the test run.
    command: 'pnpm build && node dist/server/entry.mjs',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
