/**
 * Lighthouse CI — run against `astro preview`, which serves dist/ under the
 * `/Profile/` base exactly like GitHub Pages does (a bare static server would
 * need dist copied into a Profile/ sub-folder).
 *
 *   npm run build && npm run lhci
 * Locally without Google Chrome: CHROME_PATH=/opt/pw-browsers/chromium npm run lhci
 */
const PORT = 4322;
const origin = `http://127.0.0.1:${PORT}/Profile`;

module.exports = {
  ci: {
    collect: {
      startServerCommand: `npm run preview -- --port ${PORT} --host 127.0.0.1`,
      startServerReadyPattern: 'ready|Local',
      startServerReadyTimeout: 60000,
      url: [`${origin}/`, `${origin}/en/`, `${origin}/projects/metro3d/`],
      numberOfRuns: 3,
      settings: {
        // Default Lighthouse mobile emulation + simulated throttling (the strictest profile).
        chromeFlags: '--no-sandbox --headless=new',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9, aggregationMethod: 'median-run' }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500, aggregationMethod: 'median-run' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05, aggregationMethod: 'median-run' }],
        'total-blocking-time': ['warn', { maxNumericValue: 200, aggregationMethod: 'median-run' }],
        // Budgets (transfer bytes): ≤ 50 KB of JavaScript, ≤ 1.6 MB total page weight.
        'resource-summary:script:size': ['error', { maxNumericValue: 51200 }],
        'resource-summary:third-party:count': ['error', { maxNumericValue: 0 }],
        'total-byte-weight': ['warn', { maxNumericValue: 1600000 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci/reports',
    },
  },
};
