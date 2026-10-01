/**
 * Lighthouse CI — served by LHCI's own static server, which gzips responses the
 * way GitHub Pages does (`astro preview` does not, which skews every byte-based
 * metric). dist/ is exposed under `/Profile/` via a symlinked root folder.
 *
 *   npm run build && npm run lhci
 * Locally without Google Chrome: CHROME_PATH=/opt/pw-browsers/chromium npm run lhci
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '.lhci-root');
fs.rmSync(ROOT, { recursive: true, force: true });
fs.mkdirSync(ROOT, { recursive: true });
fs.symlinkSync(path.join(__dirname, 'dist'), path.join(ROOT, 'Profile'), 'dir');

module.exports = {
  ci: {
    collect: {
      staticDistDir: './.lhci-root',
      url: ['/Profile/', '/Profile/en/', '/Profile/projects/metro3d/'],
      numberOfRuns: 3,
      settings: {
        // Default Lighthouse mobile emulation + simulated throttling (the strictest profile).
        chromeFlags: '--no-sandbox --headless=new',
      },
    },
    assert: {
      assertions: {
        // Regression floor. Measured after the v2 rebuild (simulated Moto G / slow 4G):
        // 0.89–0.99 across TH/EN/project pages, vs 0.78 for v1. LCP target stays visible as a warning.
        'categories:performance': ['error', { minScore: 0.85, aggregationMethod: 'median-run' }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500, aggregationMethod: 'median-run' }],
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
