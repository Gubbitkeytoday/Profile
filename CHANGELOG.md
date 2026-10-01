# Changelog

All notable changes to this portfolio are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **Note on 1.x entries:** the 1.x releases were a hand-written HTML/CSS/JS site. Some claims made in those entries
> (and in the 1.x README) were never verified and turned out to be wrong. They are kept below for history, with a
> **Correction** note added where needed. From 2.0.0 on, quality claims are limited to what CI enforces.

---

## [2.0.0] — 2026-10-01

A full rebuild from the vanilla v1 site to Astro, guided by the review in
[docs/UI_UX_REVIEW.md](./docs/UI_UX_REVIEW.md).

### Added

- **Astro 7 + TypeScript (strictest) + Tailwind CSS v4** static site, with OKLCH design tokens for the dark and light
  themes in `src/styles/global.css`.
- **Content collection** (`src/content.config.ts`) with a Zod schema over `src/data/projects.json`, the single source
  of truth for all 18 projects, including real image dimensions and an optional `format: "jpg"` per gallery image.
- **i18n routing:** Thai at `/`, English at `/en/`, with canonical, `hreflang` (`th`, `en`, `x-default`), `og:locale`
  and a localized sitemap.
- **Per-project case-study pages** at `/projects/<id>/` and `/en/projects/<id>/` (36 pages), with prev/next links and
  `BreadcrumbList` + `SoftwareSourceCode` JSON-LD.
- **Printable CV** at `/cv/` and `/en/cv/` (A4 print styles, print / save-as-PDF button).
- **Work section:** a curated featured bento plus a filterable editorial index (category pills with `aria-pressed`,
  a tech select, search, URL sync via `?cat=`, `?tech=`, `?q=`, and a live status line).
- **Skills section:** counts are derived from project tags and link to the matching `?tech=` filter (this replaces the
  old % bars).
- **Command palette** on a native `<dialog>` with an ARIA combobox and listbox (`⌘K` / `Ctrl K` / `/`), separator-
  insensitive search, and actions for copy email, open CV, toggle theme, switch language, GitHub and LINE.
- **PhotoSwipe 5** gallery with native video slides and fit-width panning for full-page captures. The core is loaded
  on demand.
- **Native cross-document view transitions** (cover → project hero) and CSS scroll-driven reveals, all disabled under
  `prefers-reduced-motion`.
- **Build-time Iconify icons** (`src/components/ui/Icon.astro`, Lucide + Simple Icons). Only the icons that are used
  are inlined.
- **Self-hosted Fontsource fonts:** Inter, Space Grotesk, Anuphan (Thai display), IBM Plex Sans Thai, JetBrains Mono.
- **Performance work:** per-page SVG icon sprite (`<symbol>` once, `<use>` after), inlined CSS, `content-visibility`
  on below-the-fold sections, 720w cover variants for phones, Lighthouse CI served with gzip like Pages.
- **Generated Open Graph images** (satori + sharp, 1200 × 630) for the home page and each project, in both languages.
- `sitemap-index.xml`, `robots.txt`, `manifest.webmanifest`, and a bilingual `noindex` 404 page.
- **Quality tooling:** Biome lint/format; `astro check`; Playwright with `@axe-core/playwright` (WCAG 2.2 AA must be
  zero violations, plus health, SEO and per-project tests); Lighthouse CI budgets (`lighthouserc.cjs`).
- **GitHub Actions:** `ci.yml` (lint → typecheck → build → e2e → Lighthouse) and `deploy.yml` (build → GitHub Pages).
- `scripts/sync-media-dimensions.mjs` (`npm run media:dims`) writes intrinsic image sizes back into the data.

### Changed

- **Section order** is now Hero → Work → Skills → Journey → About → Contact. The hero shows a real flagship project
  (BKK Transit) instead of a particle canvas.
- **Copy rewritten to be accurate.** Unverifiable or inflated phrases were removed ("enterprise-grade", "Windows
  Kernel", "100% uptime", skill percentages, "0 axe violations" as a headline). Audit scores are never shown as
  project metric chips.
- **Thai typography:** Thai is never set in the mono face, never uppercased or letter-spaced, and display text uses
  Anuphan. Thai text also gets more line height.
- **Light theme** contrast was rebuilt from tokens (v1 had metric pills with hard-coded dark-theme colours).
- **Project data fixes:**
  - `pos-python` category changed from `interactive` to `app` (it is a desktop Tkinter application).
  - Khui AI cover changed to the chat-reply screenshot (`media/khuiai/12-chat-reply`).
  - Project ids are now URL slugs (`discord_rpc` → `discord-rpc`, `bkk_transit` → `bkk-transit`).
- **Documentation rewritten** (README, ARCHITECTURE, DEPLOYMENT, ACCESSIBILITY_AND_DESIGN_SYSTEM, PROJECTS_CATALOG,
  PORTFOLIO_DATA, CONTRIBUTING) to match the code. Catalog counts are generated from `projects.json`.

### Fixed

- **False "Live" links removed** for Discord Rich Presence Pro and BKK Transit (both pointed at their GitHub repos).
- **Missing WebP variants generated**, so every gallery image is now served as WebP with `srcset`. The exception is
  one full-page capture taller than WebP's 16383 px limit, which ships as JPEG with `format: "jpg"`.
- Broken icons (404s from git-ignored `images/icons/*.svg` and undefined icon classes) and the leaked
  "profile.jpg" placeholder text with its 404 requests.
- `Ctrl K` palette focus: the input is focused after `showModal()`, so typing works immediately.
- Back-button behaviour: projects are real pages now, not a `replaceState` sheet, so Back returns to the list.
- English mode no longer contains leftover Thai `aria-label`s and footer strings, and Thai mode no longer contains
  English counters.
- Every image has explicit `width`/`height` (no layout shift), which a test now enforces.

### Removed

- The vanilla `index.html`, `assets/js/main.js`, `assets/js/projects.js`, `assets/css/main.css` and the 191 KB
  `assets/css/icons.css`.
- The particle canvas background, the autoplaying hero video (`public/media/hero/`, 918 KB) and the unused v1
  `public/media/manifest.json`, emoji bullets, and `?v=` cache-busting query strings (Astro's hashed `/_astro/` assets replace them).
- Unverified badges and claims from the docs: "Lighthouse 100/100", a static "0 axe-core violations" badge,
  "Zero-framework", stale counts ("16 projects", "78.5 MB"), and references to scripts and folders that do not exist
  (`src/gen_projects.py`, `images/icons`).

---

## [1.0.5] - 2026-09-07

### Added
- **18th Shipped System — BKK Transit (Bangkok Open Transit Platform & Routing Engine):** Integrated full-stack Bangkok mass-transit routing platform into catalog, showcase gallery, and project inspection drawer.
- **Multi-Resolution Asset Pipeline for BKK Transit:** Generated and optimized 48 responsive WebP and progressive JPEG assets (`480w`, `960w`, `1600w`) in `media/bkk_transit/` covering network overview, GPS radar, live departure boards, trip planner, and interactive API references.
- **FastAPI & GTFS System Tags:** Added brand marks and metadata for `FastAPI` and `GTFS` transit engine chips in `assets/js/main.js`.
- **System Metrics:** Highlighted sub-10ms routing latency, 500m GPS nearby radar, GTFS stream ingestion, and Model Context Protocol (MCP) JSON-RPC 2.0 AI agent support.

### Changed
- Updated global shipped projects count from 17 to 18 across all hero counters, filter toolbars, meta tags, and documentation catalogs.

### Correction (2.0.0)
- BKK Transit's "Live" link pointed at its GitHub repository; there is no live deployment. Removed in 2.0.0.

---

## [1.0.4] - 2026-09-07

### Changed
- **Site-wide emoji → real marks (0 emoji left in index.html / main.js):** tech marquee (18 items), the 4 philosophy cards (labels + metric pills), timeline tags (16), project-card category badge, metric pills, tech tags (48 tag names mapped), and the project detail sheet eyebrow. New `ICO(slug)` helper in `main.js` with the official brand hex table; unknown tags fall back to a Lucide tag glyph instead of 🏷️. Command palette (⌘K) labels are now plain text (no emoji prefix).
- **Skills section — real brand marks:** Replaced all emoji glyphs in the 4 skill cards (Frontend / Backend & Systems / Database & Data / DevOps & IT Infra) with 70 official vector logos downloaded from source: Simple Icons (46 brand SVGs, tinted with each brand's official hex via CSS mask), Devicon (Windows, PowerShell — full-colour), Lucide (22 UI glyphs for concept rows with no brand: SSE, WCAG, ACID, Backup, Networking, etc.). Multi-brand rows now show every logo (e.g. React · Angular · Vite, Linux · Ubuntu · Debian).
- Black-mark brands (Next.js, Rust, Express, GitHub, MCP, JWT, SQLite, MariaDB, Prisma, WebRTC, shadcn/ui) follow the theme foreground so they stay visible in dark and light mode.
- Icons stored locally in `images/icons/` (no CDN at runtime); `aria-hidden` + `title` tooltips; language toggle (TH/EN) preserved.
  - **Correction (2.0.0):** `windows11.svg` and `powershell.svg` were git-ignored and 404ed in production, and `lu-bus` / `openai` had no class. Replaced by build-time Iconify icons in 2.0.0.

### Fixed
- Brand masks were blank when opening `index.html` directly via `file://` (Chrome treats `mask-image: url(file)` as cross-origin and blocks it). Masks now ship as data-URIs in a new `assets/css/icons.css` (`.i-<slug>` classes), which are origin-free — renders from `file://`, GitHub Pages or any sub-path. Markup shrank back to ~47 KB.

---

## [1.0.3] - 2026-09-07

### Added
- **17th Shipped System — Discord Rich Presence Pro:** Added native Windows GSMTC Media Sync & Discord Local IPC background daemon to portfolio catalog, showcase gallery, and documentation.
- **Optimized Media Assets:** Converted and generated high-performance multi-resolution WebP (`480w`, `960w`, `1600w`) and progressive JPEG screenshots in `media/discord_rpc/`.
- **Repository Integration:** Integrated direct repository link and live preview showcase to [github.com/Gubbitkeytoday/discord-rich-presence-pro](https://github.com/Gubbitkeytoday/discord-rich-presence-pro).
  - **Correction (2.0.0):** the "live" link pointed at the repository; there is no live deployment. Removed in 2.0.0.

### Changed
- Incremented all portfolio counters to 17 total shipped production systems across web applications, interactive 3D/2D, and native OS desktop utilities.

---

## [1.0.2] - 2026-08-29

### Added
- **16th Shipped System — PRISM64:** Added PRISM64 Personality Intelligence Engine & Gemini Spark Model Context Protocol (MCP) Server to portfolio catalog, showcase gallery, and documentation.
- **Optimized Media Assets:** Converted and generated high-performance multi-resolution WebP (`480w`, `960w`, `1600w`), progressive JPEG, and H.264 MP4 motion video in `media/prism64/`.
- **Live Demo & Repository Links:** Integrated direct links to [prism64.onrender.com](https://prism64.onrender.com/) and [github.com/Gubbitkeytoday/prism64](https://github.com/Gubbitkeytoday/prism64).

### Changed
- Incremented all portfolio counters to 16 total shipped production systems (11 Web Applications, 5 Interactive).

---

## [1.0.1] - 2026-08-26

### Added
- **Interactive LINE QR Popover:** Floating high-density QR code card with smooth hover/focus transitions, mobile tap toggle, and direct link actions.
- **Documentation Suite:** Added comprehensive architecture guide (`docs/ARCHITECTURE.md`), systems catalog (`docs/PROJECTS_CATALOG.md`), design system manual (`docs/ACCESSIBILITY_AND_DESIGN_SYSTEM.md`), and deployment runbook (`docs/DEPLOYMENT.md`).
- **Standard Community Files:** Added `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, and `CHANGELOG.md`.

### Changed
- **Balanced 3-Column Responsive Grid:** Replaced irregular multi-span card layout with a cohesive 3-column CSS Grid on desktop (2-col on tablet, 1-col on mobile), drastically improving visual scanning.
- **Card Hierarchy Modernization:** Refined 16:10 thumbnail aspect ratio, subtle dark gradient overlays, pulsing live status dots, and clamped text heights.
- **Cache Busting Strategy:** Added fingerprinted version queries (`?v=1.0.1`) to assets in `index.html`.

### Fixed
- Resolved syntax error in `assets/js/main.js` helper block.
- Removed legacy initial loading overlay screen.

---

## [1.0.0] - 2026-08-25

### Initial Release
- Complete static single-page portfolio with 15 production projects.
- Bilingual (TH/EN) text switching without page reloads.
- Engineered dark and light theme switcher with localStorage persistence.
- Interactive slide-over case study drawer and fullscreen media lightbox.
- HTML5 Canvas background constellation particle effect.
- Certified WCAG 2.1 AA accessibility with 0 axe-core violations.
  - **Correction (2.0.0):** this was never verified. An axe-core run on v1 found colour-contrast failures in the light theme (74 nodes) plus `aria-allowed-role` and `region` violations (see docs/UI_UX_REVIEW.md). Since 2.0.0, zero WCAG 2.2 AA violations is enforced by CI instead.
