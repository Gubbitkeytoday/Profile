# Accessibility and Design System

The design language is a "blueprint editorial" look: a dark canvas with a surface ladder, a 64 px grid, one ember
accent per view, and cyan reserved for data. This document covers the tokens, typography (including Thai rules),
component patterns, and the accessibility checks that CI enforces.

Source of truth: `src/styles/global.css`. Hex values below are the reference comments next to the OKLCH source values
and are approximate.

---

## 1. Colour tokens

Runtime tokens are plain custom properties that switch on `[data-theme]` (default: dark). `@theme inline` exposes them
as Tailwind utilities, for example `bg-bg-1`, `text-fg-3`, `border-line-2`, `text-accent`, `shadow-elev-2`.

| Token | Role | Dark (OKLCH · hex) | Light (OKLCH · hex) |
| :-- | :-- | :-- | :-- |
| `--bg` | Canvas | `oklch(14.5% 0.006 265)` · `#0b0c10` | `oklch(98.5% 0.003 95)` · `#fafaf8` |
| `--bg-1` | Surface | `oklch(18.5% 0.008 265)` · `#13151a` | `oklch(100% 0 0)` · `#ffffff` |
| `--bg-2` | Raised | `oklch(23% 0.01 265)` · `#1c1f25` | `oklch(95.5% 0.004 95)` · `#f1f1ee` |
| `--bg-3` | Hover | `oklch(27% 0.012 265)` · `#25282f` | `oklch(92.5% 0.005 95)` · `#e8e8e4` |
| `--fg` | Primary text | `oklch(95% 0.005 265)` · `#eef0f4` | `oklch(18% 0.01 265)` · `#15171c` |
| `--fg-2` | Body text | `oklch(80% 0.012 265)` · `#c0c5cf` | `oklch(36% 0.014 265)` · `#3e434d` |
| `--fg-3` | Meta text | `oklch(72% 0.015 265)` · `#a3a9b6` (7.6:1 on canvas) | `oklch(46% 0.015 265)` · `#5b606b` (6.3:1 on canvas) |
| `--accent` | Ember: the one accent | `oklch(68% 0.2 36)` · `#ff5c38` | `oklch(51% 0.17 36)` · `#b8401a` |
| `--accent-2` | Data cyan (metrics only) | `oklch(80% 0.12 220)` · `#4cc9f0` | `oklch(50% 0.1 225)` · `#0b6e8e` |
| `--ok` | Success / live | `oklch(80% 0.15 160)` · `#3ddc97` | `oklch(50% 0.11 160)` · `#1e7f52` |
| `--warn` | Warning | `oklch(80% 0.16 75)` · `#ffb020` | `oklch(52% 0.11 75)` · `#8a5a00` |
| `--violet` | Secondary category hue | `oklch(76% 0.13 300)` · `#c39bf5` | `oklch(50% 0.17 300)` · `#7a3fbf` |
| `--on-accent` | Text on accent fills | `oklch(14.5% 0.006 265)` | `oklch(100% 0 0)` |
| `--line` / `--line-2` | Hairline / strong border | white at 8% / 15% | black at 9% / 18% |
| `--grid` | Blueprint grid lines | white at 3.5% | black at 4.5% |
| `--glass` | Translucent header | canvas at 72% | canvas at 80% |
| `--elev-1` / `--elev-2` | Elevation | inset highlight / + deep drop shadow | 1 px shadow / + soft drop shadow |

Rules:

- Use tokens, never literal colours, in components. Every token has a light value, so contrast holds in both themes.
- Use one accent per view. Cyan is for data and metrics, never a second call-to-action colour.
- The light accent is darker (`#b8401a`) so that accent text keeps AA contrast on white.
- Very dark brand marks (Next.js, Rust, three.js, GitHub, …) switch to `--fg` in dark mode so they stay visible.

The OG images (`src/pages/og/`) use a fixed dark palette that mirrors these tokens, because satori cannot read CSS variables.

## 2. Typography

### Families (self-hosted with Fontsource)

| Token | Stack | Use |
| :-- | :-- | :-- |
| `--font-sans` | Inter Variable → IBM Plex Sans Thai → system | Body, UI |
| `--font-display` | Space Grotesk Variable → **Anuphan Variable** → IBM Plex Sans Thai | Headings (`h1`–`h4`) |
| `--font-mono` | JetBrains Mono Variable → IBM Plex Sans Thai → system mono | Latin labels, numerals, code |

Latin glyphs come first in each stack, and Thai falls through to a paired Thai face, never to a system font. Thai
display text is set in Anuphan and Thai body text in IBM Plex Sans Thai.

### Fluid type scale

| Token | Value |
| :-- | :-- |
| `--text-3xs` | `clamp(0.625rem, 0.61rem + 0.07vw, 0.688rem)` |
| `--text-2xs` | `clamp(0.688rem, 0.67rem + 0.09vw, 0.75rem)` |
| `--text-display-sm` | `clamp(1.75rem, 1.53rem + 1.05vw, 2.5rem)` |
| `--text-display` | `clamp(2.25rem, 1.87rem + 1.8vw, 3.5rem)` |
| `--text-display-lg` | `clamp(2.75rem, 2.1rem + 3.1vw, 4.75rem)` |
| `--text-hero` | `clamp(3rem, 2rem + 4.9vw, 6.5rem)` |

Tailwind's default `text-xs` … `text-xl` cover body sizes. Tracking tokens: `--tracking-label: 0.16em`,
`--tracking-tightest: -0.035em`.

### Thai typography rules

These are built into the base and component layers. Follow them in any new component.

1. **Never set Thai in the mono face.** JetBrains Mono has no Thai glyphs.
2. **Never uppercase or letter-space Thai.** Thai has no case, and tracking breaks the stacked vowel and tone marks.
   `.label` (mono, uppercase, `0.16em` tracking) switches under `:lang(th)` to `--font-sans`, `letter-spacing: 0`,
   `text-transform: none`.
3. **Give Thai more line height.** Body text uses `1.75` under `:lang(th)` (versus `1.65`). Headings use `1.3` with
   `letter-spacing: 0` (versus `1.1` with `-0.018em`).
4. **Anuphan for Thai display** (headings, OG titles). IBM Plex Sans Thai is for running text.
5. **Mark language switches.** Latin-only strings inside Thai pages (tech tags, product names) get `lang="en"`. The
   404 page does the same for its English copy.
6. **Wrap Thai correctly.** In the OG images, Thai is segmented with `Intl.Segmenter('th')` and zero-width spaces are
   inserted, because satori cannot find Thai word breaks on its own.

Utility pattern for mixed content:
`font-mono tracking-[0.08em] [:lang(th)_&]:font-sans [:lang(th)_&]:tracking-normal`.

## 3. Shape, motion and layout tokens

| Group | Tokens |
| :-- | :-- |
| Radii | `--radius-sm: 6px` (chips) · `--radius-md: 10px` (inputs, buttons) · `--radius-lg: 16px` (cards) · `--radius-xl: 24px` (bento tiles) |
| Easing | `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` · `--ease-spring: cubic-bezier(0.34, 1.42, 0.64, 1)` |
| Durations (three only) | `--duration-fast: 120ms` · `--duration-base: 240ms` · `--duration-slow: 480ms` |
| Layout | `--container-shell: 84rem` · `--spacing-gutter: clamp(1.15rem, 4vw, 4.5rem)` · `--spacing-section: clamp(4rem, 9vw, 9rem)` · `--spacing-nav: 66px` |

`.shell` is the page container (max width plus gutter). `scroll-padding-top` accounts for the sticky nav, so anchor
jumps do not hide headings.

## 4. Component patterns

### Dialogs

- **Mobile drawer** (`Nav.astro`) and **command palette** (`CommandPalette.astro`) are native `<dialog>` elements
  opened with `showModal()`, so the browser provides the top layer, `inert` background and `Esc` to close.
- The trigger buttons have `aria-haspopup="dialog"`, and the drawer trigger also has `aria-controls` and an
  `aria-expanded` state that is kept in sync.
- Clicking the backdrop closes the dialog. Focus returns to the element that opened it. The drawer keeps `Tab` cycling
  inside the panel. Opening the palette closes any other open dialog.
- Entry animation uses `@starting-style`. It is reduced to near-zero under reduced motion.
- **LINE QR** (`Contact.astro`) uses the native `popover` attribute (`popovertarget` button, `role="dialog"` with a
  label). On hover-capable pointers it also opens on hover and focus.

### Combobox palette

- `<input role="combobox" aria-controls="cmdk-list" aria-autocomplete="list" aria-expanded aria-activedescendant>`.
- `role="listbox"` that contains `role="group"` sections labelled by their heading, and `role="option"` items with
  `aria-selected`.
- Focus stays in the input. Arrow keys, Home, End and Enter move the active descendant. Pointer hover syncs the active
  option. DOM order is kept equal to visual order after ranking.
- The result count is announced through a `role="status"` region, debounced by 350 ms. The empty state echoes the query.
- The shortcuts (`⌘K` / `Ctrl K` and `/`) are declared with `aria-keyshortcuts` on the trigger. `/` is ignored while
  the user is typing in a field.

### Filters

- Category pills are `<button aria-pressed>` inside a labelled `role="group"`, each showing a live count.
- The tech filter is a native `<select>` with a visually hidden `<label>`. The active-tech chip is a button whose
  `aria-label` says what it removes.
- The search input is debounced (120 ms). The results line (`role="status"`) reads "x / n" after each change.
- Filtering only toggles `[hidden]`, so focus and scroll position are never lost. The filter bar is held in place when
  the featured bento hides.
- Without JS, the filter bar is hidden (`<noscript>` style) and every project stays visible.

### Cards and links

- **Stretched-link cards:** a bento tile is one link. The title `<a>` carries a `::after` that covers the card, which
  avoids `role="button"`, nested interactive elements and duplicate links. Index rows are plain links.
- Visible link text is unique enough to stand alone (project titles). External links open in a new tab and show an
  arrow-up-right glyph.

### Icons

- Use `<Icon name="lucide:…" />` or `<Icon name="simple-icons:…" brand />` from `src/components/ui/Icon.astro`.
- Icons are decorative by default (`aria-hidden="true"`, `focusable="false"`). Pass `label` only when the icon is the
  sole content of a control, which produces `role="img"`, `aria-label` and `<title>`. Icon-only buttons put the
  accessible name on the button (`aria-label`).

### Motion components

- **Marquee:** the accessible list is the first track and the duplicate is `aria-hidden`. A pause button
  (`aria-pressed`) is added by JS (WCAG 2.2.2). The marquee also pauses on hover and `:focus-within`, and becomes a
  static wrapped list under reduced motion.
- **Count-up stats:** the real number is in the HTML. The animation runs only off-screen and only when motion is allowed.
- **Gallery video:** a muted preview only, with controls always visible. Videos never autoplay with sound, and do not
  preview at all under reduced motion.

### Feedback

- `toast()` writes to a single `role="status" aria-live="polite"` element (copy email, copy phone).
- Copy buttons show a temporary "done" state.

## 5. Accessibility checklist (as enforced)

**Automated in CI** (`tests/a11y.spec.ts`, `tests/health.spec.ts`, `tests/seo.spec.ts`, Lighthouse CI):

- [x] axe-core with tags `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa` reports **0 violations** on home TH and EN × dark
      and light, and on a project page × dark and light, at desktop (1440 × 900) and mobile (Pixel 7) sizes.
- [x] The skip link is the first tab stop, is visible on focus, and moves focus to `#main` (`tabindex="-1"`).
- [x] `<html lang>` matches the route (`th` / `en`). Each page has exactly one `h1`.
- [x] Every `<img>` has numeric `width`/`height` and an `alt` attribute (empty for decorative images).
- [x] No console errors, failed requests or 4xx/5xx responses on tested pages.
- [x] Lighthouse accessibility score = 1.00 and SEO = 1.00 on `/`, `/en/` and `/projects/metro3d/`.

**By construction** (reviewed, not separately tested):

- [x] A visible focus ring on every interactive element: `:focus-visible` uses a 2 px accent outline with a 3 px offset.
- [x] Colour tokens defined for both themes. The theme is applied before first paint, so there is no flash of the wrong theme.
- [x] Full keyboard support for nav, drawer, palette, filters, gallery (PhotoSwipe) and CV print.
- [x] `prefers-reduced-motion` disables view transitions, scroll-driven reveals, marquee motion, count-ups and video previews.
- [x] Landmarks: `header` / `nav` (labelled), `main#main`, `footer`. Sections use `aria-labelledby` pointing at their `h2`.
- [x] Scroll-spy marks the current section link with `aria-current`, and the language switcher marks the current locale.
- [x] Thai typography rules (§2) for legibility.
- [x] Touch targets of about 44 px minimum on primary controls.

**When adding UI:** run `npm run verify`. If you add a new page type, add it to the `cases` list in
`tests/a11y.spec.ts` and to the `PAGES` list in `tests/health.spec.ts`.
