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
    command: 'pnpm build && pnpm preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
