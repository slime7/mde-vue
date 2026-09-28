import { fileURLToPath } from 'node:url';
import { defineConfig } from '@playwright/test';

const e2eDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  testDir: './specs',
  fullyParallel: true,
  timeout: 30000,
  expect: { timeout: 5000 },
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  outputDir: './test-results',
  use: {
    baseURL: 'http://127.0.0.1:4561/',
    viewport: { width: 1280, height: 800 },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node start-fixture.mjs',
    cwd: e2eDir,
    url: 'http://127.0.0.1:4561/',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
