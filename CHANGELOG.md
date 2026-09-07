# 📝 Changelog

All notable changes to the **Wongsathorn Chapseethong Engineering Portfolio** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.5] - 2026-09-07

### Added
- **18th Shipped System — BKK Transit (Bangkok Open Transit Platform & Routing Engine):** Integrated full-stack Bangkok mass-transit routing platform into catalog, showcase gallery, and project inspection drawer.
- **Multi-Resolution Asset Pipeline for BKK Transit:** Generated and optimized 48 responsive WebP and progressive JPEG assets (`480w`, `960w`, `1600w`) in `media/bkk_transit/` covering network overview, GPS radar, live departure boards, trip planner, and interactive API references.
- **FastAPI & GTFS System Tags:** Added brand marks and metadata for `FastAPI` and `GTFS` transit engine chips in `assets/js/main.js`.
- **System Metrics:** Highlighted sub-10ms routing latency, 500m GPS nearby radar, GTFS stream ingestion, and Model Context Protocol (MCP) JSON-RPC 2.0 AI agent support.

### Changed
- Updated global shipped projects count from 17 to 18 across all hero counters, filter toolbars, meta tags, and documentation catalogs.

---

## [1.0.4] - 2026-09-07

### Changed
- **Site-wide emoji → real marks (0 emoji left in index.html / main.js):** tech marquee (18 items), the 4 philosophy cards (labels + metric pills), timeline tags (16), project-card category badge, metric pills, tech tags (48 tag names mapped), and the project detail sheet eyebrow. New `ICO(slug)` helper in `main.js` with the official brand hex table; unknown tags fall back to a Lucide tag glyph instead of 🏷️. Command palette (⌘K) labels are now plain text (no emoji prefix).
- **Skills section — real brand marks:** Replaced all emoji glyphs in the 4 skill cards (Frontend / Backend & Systems / Database & Data / DevOps & IT Infra) with 70 official vector logos downloaded from source: Simple Icons (46 brand SVGs, tinted with each brand's official hex via CSS mask), Devicon (Windows, PowerShell — full-colour), Lucide (22 UI glyphs for concept rows with no brand: SSE, WCAG, ACID, Backup, Networking, etc.). Multi-brand rows now show every logo (e.g. React · Angular · Vite, Linux · Ubuntu · Debian).
- Black-mark brands (Next.js, Rust, Express, GitHub, MCP, JWT, SQLite, MariaDB, Prisma, WebRTC, shadcn/ui) follow the theme foreground so they stay visible in dark and light mode.
- Icons stored locally in `images/icons/` (no CDN at runtime); `aria-hidden` + `title` tooltips; language toggle (TH/EN) preserved.

### Fixed
- Brand masks were blank when opening `index.html` directly via `file://` (Chrome treats `mask-image: url(file)` as cross-origin and blocks it). Masks now ship as data-URIs in a new `assets/css/icons.css` (`.i-<slug>` classes), which are origin-free — renders from `file://`, GitHub Pages or any sub-path. Markup shrank back to ~47 KB.

---

## [1.0.3] - 2026-09-07

### Added
- **17th Shipped System — Discord Rich Presence Pro:** Added native Windows GSMTC Media Sync & Discord Local IPC background daemon to portfolio catalog, showcase gallery, and documentation.
- **Optimized Media Assets:** Converted and generated high-performance multi-resolution WebP (`480w`, `960w`, `1600w`) and progressive JPEG screenshots in `media/discord_rpc/`.
- **Repository Integration:** Integrated direct repository link and live preview showcase to [github.com/Gubbitkeytoday/discord-rich-presence-pro](https://github.com/Gubbitkeytoday/discord-rich-presence-pro).

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
- **Enterprise Documentation Suite:** Added comprehensive architecture guide (`docs/ARCHITECTURE.md`), systems catalog (`docs/PROJECTS_CATALOG.md`), design system manual (`docs/ACCESSIBILITY_AND_DESIGN_SYSTEM.md`), and deployment runbook (`docs/DEPLOYMENT.md`).
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
