# Contributing

Thanks for helping improve this portfolio. Everyone taking part is expected to follow the
[Code of Conduct](./CODE_OF_CONDUCT.md). To report a security issue, see [SECURITY.md](./SECURITY.md).

---

## Development workflow

1. **Set up** (Node 22, see `.nvmrc`):

   ```bash
   npm ci
   npm run test:install   # first time only: Chromium for Playwright
   npm run dev            # http://localhost:4321/Profile/
   ```

2. **Branch** from `master`:

   ```bash
   git checkout -b feat/short-description
   ```

3. **Make the change.** Keep it small and focused, and see the conventions below.

4. **Verify locally.** This runs the same steps as CI's `verify` job:

   ```bash
   npm run verify   # biome check → astro check → astro build → playwright test
   ```

   For performance-sensitive changes, also run `npm run build && npm run lhci`.

5. **Open a pull request** against `master`. CI must pass (both the verify and Lighthouse jobs). Merging to `master`
   deploys to GitHub Pages automatically.

## Conventions

### Code style

- **Biome** is the linter and formatter (`biome.json`): 2-space indent, 120-column lines, single quotes, trailing
  commas, semicolons. Run `npm run format` to apply fixes. Do not add ESLint or Prettier.
- **TypeScript strict.** `tsconfig.json` extends `astro/tsconfigs/strictest`. Do not use `any` without a
  `biome-ignore` comment that explains why. Import from `src/` through the `@/` alias (`@/i18n`, `@/lib/projects`).
- **Static first.** Render markup at build time in `.astro`. Client scripts should only enhance it by toggling
  `[hidden]`, ARIA state or data attributes. They should not re-render lists or fetch content, and must guard against
  running twice (`if (el.dataset.ready) return;`).
- **No new client dependencies** without a reason. The initial JS budget is 50 KB (Lighthouse CI). Lazy-load heavy
  libraries with `import()`, as `gallery.ts` does for PhotoSwipe.
- **No third-party origins** at runtime (no font or icon CDNs, analytics or embeds). Lighthouse CI fails on any
  third-party request.

### Bilingual strings

- Every visible string exists in Thai and English.
- Strings shared across components go in the `ui` dictionary in `src/i18n/index.ts` (`useUi(lang)`).
- Component-specific strings go in a **co-located dictionary** typed by `makeT`:

  ```astro
  ---
  import { type Lang, makeT } from '@/i18n';
  const { lang } = Astro.props as { lang: Lang };
  const dict = {
    th: { title: 'ผลงาน' },
    en: { title: 'Work' },
  };
  const t = makeT(dict, lang);
  ---
  <h2>{t('title')}</h2>
  ```

- Build internal URLs with `href(lang, path)` and file URLs with `asset(path)`. Never hard-code `/Profile/`.
- Follow the Thai typography rules in
  [docs/ACCESSIBILITY_AND_DESIGN_SYSTEM.md](./docs/ACCESSIBILITY_AND_DESIGN_SYSTEM.md#thai-typography-rules): no mono,
  uppercase or letter-spacing on Thai, and add `lang="en"` on Latin-only fragments inside Thai pages.

### Icons

- Use the `Icon` component. Do not paste SVGs, use emoji, or add icon fonts:

  ```astro
  <Icon name="lucide:arrow-up-right" />
  <Icon name="simple-icons:react" brand />
  <Icon name="lucide:x" label="Close" />   <!-- only when the icon is the sole content -->
  ```

- Tag → icon and project `icon` → glyph mappings live in `src/lib/icons.ts`. Brand colours live in `BRAND_COLORS`.

### Styling

- Use tokens (`bg-bg-1`, `text-fg-2`, `border-line`, `var(--accent)`) and never literal colours, so that both themes
  stay accessible.
- Put component styles in scoped `<style>` blocks. Use only the three motion durations, and make sure every animation
  is disabled under `prefers-reduced-motion`.

### Content

- Project content lives only in `src/data/projects.json`. Follow
  [Content editing in the README](./README.md#content-editing) (field reference, media naming, `npm run media:dims`).
- Copy must be accurate and verifiable. Do not use marketing superlatives or audit scores as claims, and only set
  `live` for a site that is actually deployed.
- When project data changes, update [docs/PROJECTS_CATALOG.md](./docs/PROJECTS_CATALOG.md),
  [PORTFOLIO_DATA.md](./PORTFOLIO_DATA.md) and the table in the README so that counts, titles, links, years and categories match.

## Commit style

Use [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Use for |
| :-- | :-- |
| `feat` | New feature, section or project |
| `fix` | Bug fix (layout, a11y, broken link or asset) |
| `content` / `docs` | Project data or copy / documentation |
| `style` | Visual or token adjustments with no behaviour change |
| `refactor` | Restructuring with no behaviour change |
| `perf` | Performance or media optimization |
| `test` | Playwright specs |
| `ci` / `chore` | Workflows, tooling, dependencies |

Example: `feat(work): sync tech filter to ?tech= query`. Keep the subject in the imperative and under about 72 characters.

## Pull request checklist

- [ ] `npm run verify` passes locally.
- [ ] New UI strings exist in both `th` and `en`, and Thai typography rules are respected.
- [ ] Interactive elements work with a keyboard and have a visible focus state and an accessible name.
- [ ] New images have `width`, `height` and `alt`. New media follows `<path>-<width>.webp|jpg`, and `npm run media:dims` was run.
- [ ] Colours come from tokens, and the change was checked in both dark and light themes.
- [ ] Motion respects `prefers-reduced-motion`.
- [ ] No new third-party requests, and the initial JS stays within budget.
- [ ] If a new page type was added, it is covered in `tests/a11y.spec.ts` and `tests/health.spec.ts`.
- [ ] Docs, catalog and changelog are updated if behaviour or data changed.
