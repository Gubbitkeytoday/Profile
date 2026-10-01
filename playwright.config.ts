import { existsSync } from 'node:fs';
import { defineConfig, devices, type ReporterDescription } from '@playwright/test';

const PORT = Number(process.env.PW_PORT ?? 4321);
const HOST = '127.0.0.1';
const isCI = !!process.env.CI;

/**
 * Chromium binary override: `PLAYWRIGHT_CHROMIUM_PATH` wins; otherwise use the
 * preinstalled sandbox browser when present; otherwise Playwright's own download
 * (`npx playwright install --with-deps chromium`).
 */
const LOCAL_CHROMIUM = '/opt/pw-browsers/chromium';
const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_PATH || (!isCI && existsSync(LOCAL_CHROMIUM) ? LOCAL_CHROMIUM : undefined);
const launchOptions = executablePath ? { executablePath } : {};

/** CI builds once in an earlier step; set `PW_SKIP_BUILD=1` to serve the existing `dist/`. */
const build = process.env.PW_SKIP_BUILD ? '' : 'npm run build && ';

const reporter: ReporterDescription[] = isCI
  ? [['github'], ['html', { open: 'never' }], ['list']]
  : [['list'], ['html', { open: 'never' }]];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter,
  timeout: 45_000,
  expect: { timeout: 7_500 },
  use: {
    baseURL: `http://${HOST}:${PORT}/Profile/`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, launchOptions },
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 7'], launchOptions },
    },
  ],
  webServer: {
    command: `${build}npm run preview -- --port ${PORT} --host ${HOST}`,
    url: `http://${HOST}:${PORT}/Profile/`,
    reuseExistingServer: !isCI,
    timeout: 240_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
