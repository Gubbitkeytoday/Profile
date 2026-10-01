# Projects Catalog

All **18** projects in the portfolio, in the order the site lists them (highest `order` first).

> **Source of truth:** [`src/data/projects.json`](../src/data/projects.json). This catalog is generated from it.
> When the data changes, update this file and [`PORTFOLIO_DATA.md`](../PORTFOLIO_DATA.md) so that titles, links,
> years and categories stay identical. Metrics and features are quoted from the data as written; they describe each
> project's own repository and have not been re-measured here.

**Summary:** 18 projects · 12 web apps · 4 interactive · 2 desktop apps · 2024: 8 · 2025: 4 · 2026: 6 ·
every project links to a repository · 4 link to a live deployment (PRISM64, ARÓM, HBD 3D Craft, Metro Mini 3D).

Each project has a case-study page in both languages: `https://gubbitkeytoday.github.io/Profile/projects/<id>/` (TH)
and `https://gubbitkeytoday.github.io/Profile/en/projects/<id>/` (EN).

## Index

| # | id | Title (EN) | Category | Year | Live | Gallery |
| --: | :-- | :-- | :-- | :-: | :-: | :-: |
| 01 | `bkk-transit` | [BKK Transit](#01-bkk-transit) | Web app | 2026 | — | 8 img |
| 02 | `discord-rpc` | [Discord Rich Presence Pro](#02-discord-rpc) | Desktop app | 2026 | — | 6 img |
| 03 | `prism64` | [PRISM64](#03-prism64) | Web app | 2026 | Yes | 5 img + 1 video |
| 04 | `ruedu` | [ฤดู · RUEDU](#04-ruedu) | Web app | 2026 | — | 77 img |
| 05 | `arom-coffee` | [ARÓM](#05-arom-coffee) | Web app | 2026 | Yes | 57 img |
| 06 | `beach` | [Hat Sai Noi Community Tourism](#06-beach) | Web app | 2024 | — | 8 img |
| 07 | `cinema` | [Astra Cinema Booking](#07-cinema) | Web app | 2024 | — | 16 img |
| 08 | `nike` | [Nike SNKRS Tracker](#08-nike) | Interactive | 2024 | — | 5 img |
| 09 | `tank` | [Tank.io](#09-tank) | Interactive | 2024 | — | 5 img |
| 10 | `webshop` | [Shopee TH Clone (Webshop)](#10-webshop) | Web app | 2024 | — | 7 img |
| 11 | `pdf-editer` | [Web PDF Editor](#11-pdf-editer) | Web app | 2025 | — | 3 img + 1 video |
| 12 | `pos-python` | [POS Python Offline](#12-pos-python) | Desktop app | 2024 | — | 18 img |
| 13 | `hbd` | [HBD 3D Craft](#13-hbd) | Interactive | 2025 | Yes | 4 img + 1 video |
| 14 | `facescan` | [Enterprise Face Scan Attendance](#14-facescan) | Web app | 2024 | — | 8 img |
| 15 | `pos` | [SmartPOS Enterprise](#15-pos) | Web app | 2024 | — | 14 img |
| 16 | `mangaverses` | [MangaVerses](#16-mangaverses) | Web app | 2025 | — | 13 img |
| 17 | `khuiai` | [Khui AI](#17-khuiai) | Web app | 2026 | — | 24 img + 1 video |
| 18 | `metro3d` | [Greater Bangkok Metro Mini 3D](#18-metro3d) | Interactive | 2025 | Yes | 11 img + 1 video |

---

## 01-bkk-transit

### BKK Transit — Bangkok Open Transit Platform & Routing Engine

*BKK Transit — แพลตฟอร์มข้อมูลเปิดขนส่งมวลชนกรุงเทพฯ & ระบบคำนวณเส้นทาง*

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2026 |
| Role | Systems Architecture · GTFS Pipeline · FastAPI Backend · Leaflet.js · Model Context Protocol (MCP) |
| Stack | Python 3.12, FastAPI, SQLite, Leaflet.js, GTFS, Gemini MCP, Docker |
| Metrics | **GTFS** Official GTFS · **<10ms** Query Latency · **500m** GPS Radius · **MCP** AI Protocol |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/bkk-transit/) · [Repo](https://github.com/Gubbitkeytoday/bkk-transit) |
| Media | `media/bkk_transit/01-bkk-transit-overview` (cover) · 8 images |

Open transit data platform and routing engine for Greater Bangkok — Ingests official GTFS data (Namtang), GPS radar nearby stops, live departure boards, and Model Context Protocol (MCP) for AI assistants.

**Key features**

- Official GTFS Data Ingestion: Chunk-based streaming ingestion of official GTFS Static feeds with integrity validation and automated reporting.
- GPS Radar & Nearby Stops: W3C Geolocation GPS radar with accuracy ring, automatically discovering and ranking transit stops within 500 meters.
- Live Departures Board: Real-time headway-based arrival estimations from schedule frequencies with a hot-pluggable GTFS-RT engine.
- Intelligent Trip Planner: Routing engine computing direct routes and single-transfer journeys with colorful interactive map polylines.
- Model Context Protocol (MCP Server): JSON-RPC 2.0 MCP server enabling Claude, ChatGPT, and Gemini to perform agentic transit routing.
- High Resilience & Fault Tolerance: Circuit breaker that keeps the service answering from cached schedules when the realtime upstream fails.

---

## 02-discord-rpc

### Discord Rich Presence Pro — Windows Media Presence Engine

*Discord Rich Presence Pro — ซิงค์สถานะสื่อบน Windows*

| Field | Value |
| :-- | :-- |
| Category · year | Desktop app · 2026 |
| Role | Systems programming · Windows GSMTC · Discord Local IPC |
| Stack | Python 3.12, Windows WinRT, GSMTC API, Discord IPC, Pystray, PyInstaller, Systems Architecture |
| Metrics | **<40MB** Memory footprint · **~0%** CPU overhead · **GSMTC** Native WinRT API · **Zero-Lag** Anchor timeline |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/discord-rpc/) · [Repo](https://github.com/Gubbitkeytoday/discord-rich-presence-pro) |
| Media | `media/discord_rpc/01-discord-full-profile` (cover) · 6 images |

A lightweight Windows background engine streaming real-time media presence (YouTube, Spotify, etc.) to Discord via native GSMTC WinRT & Local IPC with DirectX game auto-pause.

**Key features**

- Native Windows GSMTC Integration: Reads Windows' WinRT media controls (GSMTC) for track titles, artists, thumbnails, playback state, and duration.
- Universal Browser & Player Support: Seamlessly tracks Chrome, Edge, Brave, Opera, Spotify, Tidal, and Apple Music without browser extensions.
- DirectX & Vulkan Game Detection: Auto-detects active fullscreen gaming sessions and suppresses presence updates to maximize frame rates.
- Sub-Second Timeline Anchoring: Accurately synchronizes elapsed and remaining playback times using precise anchor timestamps without drift.
- System Tray Controller & Hot Reload: Background taskbar tray controls with instant Pause/Resume toggle, live logs, and zero-restart JSON hot-reloading.

---

## 03-prism64

### PRISM64 — 64-Shade Personality Intelligence & MCP

*PRISM64 — เครื่องมือวิเคราะห์ 64 เฉดสีบุคลิกภาพ & Gemini MCP*

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2026 |
| Role | Full-stack architecture · HEXACO engine · AI MCP server |
| Stack | Python, JavaScript, Tailwind CSS, Canvas API, Leaflet.js, Gemini MCP, Render.com |
| Metrics | **64** personality shades · **6** behavior dimensions · **9:16** Story Studio · **MCP** JSON-RPC AI |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/prism64/) · [Repo](https://github.com/Gubbitkeytoday/prism64) · [Live](https://prism64.onrender.com) |
| Media | `media/prism64/01-landing-hero-showcase` (cover) · 5 images + 1 video |

A 6-dimension, 64-shade personality analysis web app with 9:16 Story Card Studio, real-time Leaflet geo telemetry, and a Gemini Spark MCP server.

**Key features**

- HEXACO 6-Dimension Psychological Matrix yielding 64 granular personality shades (16 Archetypes × 4 Sub-Variants)
- Dual Assessment Engine: 1.5-min Quick (18 Questions) & 3.0-min Deep (36 Questions) with instant scoring
- 9:16 Social Story Card Studio: Instant canvas export for Instagram & TikTok (Light Pearl & Midnight Dark)
- Gemini Spark MCP Server: Full Model Context Protocol (JSON-RPC 2.0) integration for AI agent querying
- Stealth Admin Dashboard & Live Geo Map: Real-time visitor & submission telemetry powered by dark Leaflet.js

---

## 04-ruedu

### ฤดู · RUEDU — Flower Atelier

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2026 |
| Role | Brand design · e-commerce · a11y |
| Stack | JavaScript, HTML/CSS, PWA, Service Worker, Accessibility |
| Metrics | **0** axe violations · **13** pages · **16** products · **3** checkout steps |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/ruedu/) · [Repo](https://github.com/Gubbitkeytoday/ruedu-flower-atelier) |
| Media | `media/ruedu/01-homepage-00-full-page` (cover) · 77 images |

A 13-page bilingual luxury florist e-commerce front end with a live-priced bouquet builder, a persistent basket and a three-step checkout.

**Key features**

- A bouquet builder — size, palette, wrap, vase, card — repriced on every change
- Multi-facet product filtering synced to the URL, so a filtered view is shareable
- Basket in localStorage, keyed by product plus its options
- Three-step checkout validated per step with bilingual inline errors
- Service worker for offline use, and 0 axe-core violations at WCAG 2.1 AA

---

## 05-arom-coffee

### ARÓM — Specialty Coffee Roasters

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2026 |
| Role | Brand design · frontend · a11y |
| Stack | JavaScript, HTML/CSS, Python, PWA, Accessibility |
| Metrics | **0** axe violations · **8** pages · **36** menu items · **11** JSON-LD types |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/arom-coffee/) · [Repo](https://github.com/Gubbitkeytoday/arom-specialty-coffee) · [Live](https://gubbitkeytoday.github.io/arom-specialty-coffee/) |
| Media | `media/arom-coffee/01-home-index-00-full-page` (cover) · 57 images |

An eight-page bilingual specialty-coffee brand site that reads completely with JavaScript off, with a working V60 brew timer and 0 axe-core violations.

**Key features**

- An interactive V60 brew timer with phased steps
- Filter and search across 36 menu items
- Opening status computed from the clock, per branch and per weekday
- 11 JSON-LD schema types and PWA support
- WCAG 2.1 AA — 0 axe-core violations across all 8 pages

---

## 06-beach

### Hat Sai Noi Community Tourism

*เว็บไซต์ท่องเที่ยวหาดทรายน้อย*

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2024 |
| Role | Full-stack PHP · community project |
| Stack | PHP, MySQL, HTML/CSS |
| Metrics | **Community** project · **Directory** local business · **CMS** content · **PHP** MySQL |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/beach/) · [Repo](https://github.com/GitBababoo/Beach_2024-5-11) |
| Media | `media/beach/home` (cover) · 8 images |

A community tourism site for Hat Sai Noi, with a local business directory built to bring trade into the area.

**Key features**

- Destinations, atmosphere and local activities
- A directory of community businesses and shops
- Content, article and contact management for administrators

---

## 07-cinema

### Astra Cinema Booking

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2024 |
| Role | Full-stack · PostgreSQL |
| Stack | React, Node.js, PostgreSQL, Tailwind |
| Metrics | **Seat** map · **Member** pricing · **Ticket** issuing · **Admin** backoffice |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/cinema/) · [Repo](https://github.com/GitBababoo/cinema-booking) |
| Media | `media/cinema/01-home` (cover) · 16 images |

A full-stack cinema booking system — showtimes, interactive seat map, ticketing and admin.

**Key features**

- Film search, detail pages and showtimes by cinema
- Interactive seat map with member pricing
- Payment and booking confirmation
- Admin management of films, showtimes and bookings

---

## 08-nike

### Nike SNKRS Tracker

| Field | Value |
| :-- | :-- |
| Category · year | Interactive · 2024 |
| Role | Web scraping · automation |
| Stack | React, Node.js, Web Scraping |
| Metrics | **Real-time** tracking · **Alert** alerts · **Bot** size picker · **Scrape** scraping |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/nike/) · [Repo](https://github.com/GitBababoo/nike-snkrs-tracker) |
| Media | `media/nike/nike-instock` (cover) · 5 images |

Real-time stock tracking for limited Nike SNKRS releases, with alerts and a size-picking bot.

**Key features**

- Live tracking of new and upcoming releases
- Alerts the moment stock appears
- A bot that helps pick a size and speeds up checkout

---

## 09-tank

### Tank.io

| Field | Value |
| :-- | :-- |
| Category · year | Interactive · 2024 |
| Role | 2D game engine · multiplayer |
| Stack | TypeScript, Canvas API, Game Engine, Multiplayer |
| Metrics | **Custom** engine · **Real-time** multiplayer · **Boss** events · **Class** evolution |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/tank/) · [Repo](https://github.com/GitBababoo/Tank.io) |
| Media | `media/tank/gameplay` (cover) · 5 images |

A real-time multiplayer tank battler on a 2D game engine written from scratch on the Canvas API.

**Key features**

- A 2D game engine built from scratch on Canvas API and TypeScript
- Tank class evolution and ability upgrades
- Lobby, boss events and a leaderboard

---

## 10-webshop

### Shopee TH Clone (Webshop)

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2024 |
| Role | Full-stack PHP · MySQL |
| Stack | PHP, MySQL, JavaScript |
| Metrics | **Cart** cart · **Wishlist** wishlist · **Admin** backoffice · **MySQL** database |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/webshop/) · [Repo](https://github.com/GitBababoo/webshop) |
| Media | `media/webshop/ws-homepage` (cover) · 7 images |

A complete online store on a PHP and MySQL stack, storefront through to admin dashboard.

**Key features**

- Catalogue with search and category filtering
- Shopping cart and checkout flow
- Wishlist and order history
- Admin dashboard for products, categories and shipping status

---

## 11-pdf-editer

### Web PDF Editor

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2025 |
| Role | Frontend · PDF.js |
| Stack | React, TypeScript, PDF.js, Tailwind |
| Metrics | **PDF.js** renderer · **E-Sign** signature · **Client** side only · **Export** new file |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/pdf-editer/) · [Repo](https://github.com/GitBababoo/PDF-Editer) |
| Media | `media/pdf-editer/693fbfc7-b89f-442f-abab-f2018f0bc8e1` (cover) · 3 images + 1 video |

Edit and sign PDFs directly in the browser — the file never leaves the device.

**Key features**

- Fast rendering of large PDFs with PDF.js
- Text, highlights and annotations
- Electronic signature, then export as a new file

---

## 12-pos-python

### POS Python Offline

| Field | Value |
| :-- | :-- |
| Category · year | Desktop app · 2024 |
| Role | Desktop app · SQLite · RBAC |
| Stack | Python, SQLite, Tkinter, Desktop App |
| Metrics | **100%** offline · **RBAC** permissions · **Audit** log · **Multi** branch |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/pos-python/) · [Repo](https://github.com/GitBababoo/POS-Python) |
| Media | `media/pos-python/pos-sales-main` (cover) · 18 images |

A Windows point-of-sale that runs fully offline, with role permissions, an audit log and multi-branch management.

**Key features**

- Front-of-house sales, queueing, receipts and VAT
- Role-based access control and a full audit log
- Multi-branch management
- Inventory and sales reporting on a local SQLite database

---

## 13-hbd

### HBD 3D Craft

| Field | Value |
| :-- | :-- |
| Category · year | Interactive · 2025 |
| Role | 3D · Web Audio · full design |
| Stack | Three.js, Anime.js, Vite, Web Audio API |
| Metrics | **3D** Three.js · **Mic** blow out · **0** databases · **Base64** URL state |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/hbd/) · [Repo](https://github.com/GitBababoo/Happy-Birthday) · [Live](https://hbd-3d-craft.pages.dev) |
| Media | `media/hbd/1-creator-dashboard` (cover) · 4 images + 1 video |

A 3D birthday card you blow out with your actual microphone, shareable as a single link with no database at all.

**Key features**

- Customise the 3D cake, the number of candles and the message
- Web Audio API reads real breath from the microphone to blow the 3D flames out
- Card state encoded into the URL as Base64 — shareable instantly, no database

---

## 14-facescan

### Enterprise Face Scan Attendance

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2024 |
| Role | Angular frontend · Firebase serverless |
| Stack | Angular, Firebase, Tailwind, TypeScript |
| Metrics | **Kiosk** live scan · **Google** Auth · **Serverless** Firebase · **Leave** approvals |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/facescan/) · [Repo](https://github.com/GitBababoo/enterprise-face-scan-attendance) |
| Media | `media/facescan/admin-overview` (cover) · 8 images |

Face-recognition attendance on a serverless cloud stack, with an admin dashboard.

**Key features**

- Kiosk screen with real-time face verification and clear success/error states
- New-employee face registration
- Secure sign-in with Google Authentication
- Admin dashboard for attendance, leave approval and hour summaries

---

## 15-pos

### SmartPOS Enterprise

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2024 |
| Role | Full-stack · schema design |
| Stack | Next.js, TypeScript, Tailwind, Prisma, PostgreSQL |
| Metrics | **QR** PromptPay · **Stock** alerts · **Table** management · **Loyalty** points |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/pos/) · [Repo](https://github.com/GitBababoo/POS) |
| Media | `media/pos/02-pos-terminal` (cover) · 14 images |

An all-in-one enterprise point-of-sale and store management system, from the till to the management dashboard.

**Key features**

- POS terminal with discounts, tax and promotions
- Table and order management
- Cash and dynamic PromptPay QR payment
- Inventory with low-stock alerts
- Loyalty points, expense reports and a sales dashboard

---

## 16-mangaverses

### MangaVerses

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2025 |
| Role | Full-stack · backoffice |
| Stack | Next.js 16, TypeScript, Tailwind, shadcn/ui, Prisma, SQLite |
| Metrics | **Lazy** image loading · **2** reader modes · **Admin** backoffice · **16** Next.js |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/mangaverses/) · [Repo](https://github.com/Gubbitkeytoday/MangaVerses) |
| Media | `media/mangaverses/01-home-desktop` (cover) · 13 images |

A high-performance Thai manga reader with an admin backoffice for titles, chapters and ad slots.

**Key features**

- Search and categories with weekly and monthly popularity rankings
- Personal library and bookmarks
- Lazy-loading reader with switchable reading modes
- Backoffice for titles, chapters and ad placement

---

## 17-khuiai

### Khui AI

*Khui AI (คุย AI)*

| Field | Value |
| :-- | :-- |
| Category · year | Web app · 2026 |
| Role | Full-stack · schema design · SSE streaming |
| Stack | Next.js 14, TypeScript, Prisma, SQLite, OpenAI API, Tailwind |
| Metrics | **SSE** streaming · **10** languages · **15** report types · **12** horoscopes |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/khuiai/) · [Repo](https://github.com/Gubbitkeytoday/khuiai-fullstack) |
| Media | `media/khuiai/12-chat-reply` (cover) · 24 images + 1 video |

A full-stack Thai AI-character chat platform with a creator studio, an in-app economy and community features.

**Key features**

- Creator Studio for AI characters — personality, tone and scenario
- Real-time streamed replies over Server-Sent Events with automatic model fallback
- In-app economy: coins, daily check-in, quests and gifts
- Community: comments, leaderboard and a 15-category reporting flow
- Daily horoscopes and i18n across 10 languages

---

## 18-metro3d

### Greater Bangkok Metro Mini 3D

| Field | Value |
| :-- | :-- |
| Category · year | Interactive · 2025 |
| Role | System design · 3D frontend · Rust/Wasm |
| Stack | React 19, TypeScript, Three.js, MapLibre GL, Rust, WebAssembly |
| Metrics | **10** lines · **193** stations · **8,193** trips/day · **60** FPS |
| Links | [Case study](https://gubbitkeytoday.github.io/Profile/en/projects/metro3d/) · [Repo](https://github.com/Gubbitkeytoday/tha-metro-mini-3d) · [Live](https://metro.itstom.me) |
| Media | `media/metro3d/01-network-overview` (cover) · 11 images + 1 video |

A 3D simulation of the Greater Bangkok rail network, track geometry from real OpenStreetMap coordinates, separated by elevation, running real GTFS timetables.

**Key features**

- Real GTFS schedules — 10 lines, 193 stations, 8,193 trips a day
- Time acceleration and rewind, with a camera that follows any train
- Journey planner with interchanges and travel time
- Train position core written in Rust, compiled to WebAssembly, run on a Web Worker
- Nine languages
