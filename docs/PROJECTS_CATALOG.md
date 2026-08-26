# 📦 Shipped Projects & Systems Catalog (15 Production Builds)

> **Official Systems Showcase of Wongsathorn Chapseethong (วงศธร ฉาบสีทอง)**  
> *Technical specifications, architecture breakdown, metrics, and repositories for all 15 shipped systems.*

---

## 📑 Catalog Index

1. [Greater Bangkok Metro Mini 3D](#01-greater-bangkok-metro-mini-3d) (`Interactive 3D`)
2. [Khui AI (คุย AI) Platform](#02-khui-ai-คุย-ai-platform) (`Web Application`)
3. [MangaVerses Web Platform](#03-mangaverses-web-platform) (`Web Application`)
4. [SmartPOS Enterprise POS System](#04-smartpos-enterprise-pos-system) (`Web Application`)
5. [RUEDU (ฤดู) Flower Atelier](#05-ruedu-ฤดู-flower-atelier) (`Web Application`)
6. [ARÓM Specialty Coffee Roastery](#06-aróm-specialty-coffee-roastery) (`Web Application`)
7. [AeroControl Remote Desktop Engine](#07-aerocontrol-remote-desktop-engine) (`Distributed System`)
8. [Syntech CRM & Membership Portal](#08-syntech-crm--membership-portal) (`Web Application`)
9. [HBD 3D Craft Birthday Platform](#09-hbd-3d-craft-birthday-platform) (`Interactive 3D`)
10. [Multiplayer Tank Arena 2D](#10-multiplayer-tank-arena-2d) (`Interactive 2D`)
11. [Face-Recognition Attendance System](#11-face-recognition-attendance-system) (`AI / Computer Vision`)
12. [Cinema Multi-Screen Booking Engine](#12-cinema-multi-screen-booking-engine) (`Web Application`)
13. [Interactive Digital PDF Editor](#13-interactive-digital-pdf-editor) (`Web Application`)
14. [Smart WebShop E-Commerce Engine](#14-smart-webshop-e-commerce-engine) (`Web Application`)
15. [Community Agro-Tourism Regional Portal](#15-community-agro-tourism-regional-portal) (`Web Application`)

---

## 01. Greater Bangkok Metro Mini 3D
- **Category:** `Interactive 3D` / Urban Transportation Simulation
- **Core Tech Stack:** `React 19`, `TypeScript`, `Three.js`, `MapLibre GL`, `Rust`, `WebAssembly`
- **Key Metrics:** **10 Lines** · **193 Stations** · **8,193 Trips / Day** · **60 FPS Sustained**
- **Live Demo:** [metro.itstom.me](https://metro.itstom.me)
- **Source Code:** [github.com/Gubbitkeytoday/tha-metro-mini-3d](https://github.com/Gubbitkeytoday/tha-metro-mini-3d)
- **Architectural Highlights:**
  - Track geometry accurately extracted and normalized from OpenStreetMap geospatial vector data.
  - Multi-tier elevation separation: Underground (MRT Blue/Orange), At-Grade, and Elevated Viaducts (BTS Green/Gold, MRT Yellow/Pink).
  - Train position calculation engine written in **Rust**, compiled to **WebAssembly (Wasm)**, executing in a dedicated **Web Worker** thread to prevent main-thread UI jank.
  - Interactive Journey Planner calculating optimal station interchanges and transfer times based on official GTFS schedules.
  - 9-language localization matrix and dynamic day/night atmospheric lighting shaders.

---

## 02. Khui AI (คุย AI) Platform
- **Category:** `Web Application` / GenAI Social Ecosystem
- **Core Tech Stack:** `Next.js 14 (App Router)`, `TypeScript`, `Prisma ORM`, `SQLite`, `Server-Sent Events (SSE)`
- **Key Metrics:** **10 Language Matrix** · **Real-Time Streaming** · **15 Content Safety Filters**
- **Source Code:** [github.com/Gubbitkeytoday/khuiai-fullstack](https://github.com/Gubbitkeytoday/khuiai-fullstack)
- **Architectural Highlights:**
  - **Creator Studio:** Full-featured character creation portal with personality prompts, greeting behaviors, scenario presets, and voice-tag configurations.
  - **Real-Time SSE Streaming:** Sub-second latency streaming chat engine with automatic model fallback failover mechanisms.
  - **Gamified Economy & Social Layer:** Daily check-in rewards, virtual coin transactions, gift sending, user comments, and dynamic trending leaderboards.
  - Daily Horoscope engine for 12 zodiac signs and automated content moderation.

---

## 03. MangaVerses Web Platform
- **Category:** `Web Application` / High-Throughput Media Platform
- **Core Tech Stack:** `Next.js 16`, `TypeScript`, `Tailwind CSS`, `Lucide Icons`
- **Key Metrics:** **Instant Page Swapping** · **Zero Layout Shifts** · **Multi-Role Admin**
- **Live Demo:** [gubbitkeytoday.github.io/MangaVerses/](https://gubbitkeytoday.github.io/MangaVerses/)
- **Source Code:** [github.com/Gubbitkeytoday/MangaVerses](https://github.com/Gubbitkeytoday/MangaVerses)
- **Architectural Highlights:**
  - High-performance manga reader supporting horizontal, vertical, and continuous webtoon scroll modes with client-side image prefetching.
  - Comprehensive Content Management System (CMS) for managing series, chapters, localized metadata, and advertisement slot placements.
  - Responsive dark-mode UI with customizable reading margins and keyboard navigation bindings.

---

## 04. SmartPOS Enterprise POS System
- **Category:** `Web Application` / Retail & Point-of-Sale Architecture
- **Core Tech Stack:** `Next.js 14`, `TypeScript`, `Tailwind CSS`, `LocalStorage / IndexedDB Sync`
- **Key Metrics:** **Multi-Category Order Grid** · **Real-Time Tax Calculation** · **Hardware Receipt Support**
- **Source Code:** [github.com/Gubbitkeytoday/synhub-membership-system](https://github.com/Gubbitkeytoday/synhub-membership-system)
- **Architectural Highlights:**
  - High-speed cashier interface with category filtering, real-time bill calculations (7% VAT, service charge, discount vouchers), and quick change calculator.
  - Multi-method payment processing: Cash, PromptPay dynamic QR, Credit/Debit cards, and Member Points.
  - Cash drawer shift reconciliation (Open/Close shift auditing with variance reporting).
  - Thermal receipt printing generation compatible with standard 58mm/80mm ESC/POS hardware.

---

## 05. RUEDU (ฤดู) Flower Atelier
- **Category:** `Web Application` / Luxury E-Commerce & PWA
- **Core Tech Stack:** `HTML5`, `Vanilla CSS (No Tailwind)`, `Modern ES6+ JS`, `Service Worker`
- **Key Metrics:** **13 Complete Pages** · **0 axe-core Violations** · **Offline PWA Support**
- **Live Demo:** [gubbitkeytoday.github.io/ruedu-flower-atelier/](https://gubbitkeytoday.github.io/ruedu-flower-atelier/)
- **Source Code:** [github.com/Gubbitkeytoday/ruedu-flower-atelier](https://github.com/Gubbitkeytoday/ruedu-flower-atelier)
- **Architectural Highlights:**
  - 13 bilingual pages (TH/EN) built entirely without framework runtimes.
  - **Interactive Bouquet Builder:** Custom floral arrangement tool with real-time price compilation based on selected flower species, wrap materials, and ribbon styles.
  - Full-lifecycle shopping cart persisted to localStorage, 3-step checkout with Thai address autocomplete.
  - Service Worker offline caching strategy achieving full PWA installation and offline browsing.

---

## 06. ARÓM Specialty Coffee Roastery
- **Category:** `Web Application` / Specialty Coffee Commerce & Brewing
- **Core Tech Stack:** `HTML5`, `Vanilla CSS`, `Modern JS`, `Web Audio API`
- **Key Metrics:** **8 Pages** · **36-Item Filter Matrix** · **0 axe-core Violations** · **11 JSON-LD Schemas**
- **Live Demo:** [gubbitkeytoday.github.io/arom-specialty-coffee/](https://gubbitkeytoday.github.io/arom-specialty-coffee/)
- **Source Code:** [github.com/Gubbitkeytoday/arom-specialty-coffee](https://github.com/Gubbitkeytoday/arom-specialty-coffee)
- **Architectural Highlights:**
  - **Interactive V60 Drip Brew Timer:** Multi-step guided extraction assistant with visual pour intervals, audio chime alerts via Web Audio API, and yield calculator.
  - Real-time roastery opening status calculator with timezone awareness.
  - Rich JSON-LD Microdata schemas (LocalBusiness, CafeOrCoffeeShop, Menu, Product, FAQPage) optimized for Google Rich Snippets and AI search engines.

---

## 07. AeroControl Remote Desktop Engine
- **Category:** `Distributed System` / Low-Latency Video Streaming
- **Core Tech Stack:** `Next.js 16.3`, `TypeScript`, `WebRTC`, `Python`, `NVIDIA NVENC`, `CustomTkinter`
- **Key Metrics:** **Sub-40ms Glass-to-Glass Latency** · **Hardware GPU NVENC** · **Peer-to-Peer WebRTC**
- **Source Code:** [github.com/Gubbitkeytoday/aerocontrol](https://github.com/Gubbitkeytoday/aerocontrol)
- **Architectural Highlights:**
  - Low-latency remote desktop streaming client utilizing WebRTC DataChannels for input transmission and MediaStreams for video delivery.
  - Host capture engine utilizing NVIDIA NVENC hardware H.264/HEVC encoding for 60 FPS video capture with minimal host CPU overhead.
  - Python desktop GUI built with CustomTkinter for host configuration, peer discovery, and encryption key exchange.

---

## 08. Syntech CRM & Membership Portal
- **Category:** `Web Application` / Enterprise CRM & Customer Loyalty
- **Core Tech Stack:** `Next.js 14`, `TypeScript`, `Tailwind CSS`, `RESTful API`
- **Key Metrics:** **Tiered Loyalty Engine** · **Point Ledger** · **Audit Telemetry**
- **Source Code:** [github.com/Gubbitkeytoday/syntech_crm_draft](https://github.com/Gubbitkeytoday/syntech_crm_draft)
- **Architectural Highlights:**
  - Multi-tier customer membership tracking (Silver, Gold, Platinum) with dynamic point expiration rules and reward redemption.
  - Transaction history ledger with comprehensive filtering, receipt lookups, and customer lifetime value (CLV) analytics.

---

## 09. HBD 3D Craft Birthday Platform
- **Category:** `Interactive 3D` / WebGL Creative Tool
- **Core Tech Stack:** `Three.js`, `WebGL`, `Web Audio API`, `Anime.js`
- **Key Metrics:** **Procedural Mesh Generation** · **Dynamic Lighting** · **Interactive Audio**
- **Live Demo:** [hbd-3d-craft.pages.dev](https://hbd-3d-craft.pages.dev)
- **Source Code:** [github.com/Gubbitkeytoday/hbd-3d-craft](https://github.com/Gubbitkeytoday/hbd-3d-craft)
- **Architectural Highlights:**
  - Procedural 3D cake builder allowing real-time customization of cake layers, cream piping, candle flames (particle shaders), and fruit toppings.
  - Interactive celebration animation triggering spatial audio effects and physics-based confetti bursts.

---

## 10. Multiplayer Tank Arena 2D
- **Category:** `Interactive 2D` / Real-Time Game Engine
- **Core Tech Stack:** `Node.js`, `Express`, `WebSocket (ws)`, `HTML5 Canvas API`
- **Key Metrics:** **60-Tick Server Loop** · **Client-Side Interpolation** · **Binary Packet Serialization**
- **Source Code:** [github.com/GitBababoo](https://github.com/GitBababoo)
- **Architectural Highlights:**
  - Authoritative game server loop running at fixed 60 Hz tick rate with collision detection math (Circle-AABB & Raycasting).
  - Client-side input prediction and entity interpolation (lerp) to deliver lag-free gameplay under network jitter.

---

## 11. Face-Recognition Attendance System
- **Category:** `AI / Computer Vision` / Biometrics & HR
- **Core Tech Stack:** `Python 3`, `OpenCV`, `Face_Recognition (dlib)`, `Flask`, `SQLite`
- **Key Metrics:** **<500ms Recognition Time** · **Anti-Spoofing Check** · **Automated CSV/Excel Export**
- **Source Code:** [github.com/GitBababoo](https://github.com/GitBababoo)
- **Architectural Highlights:**
  - 128-dimensional facial embedding vector extraction and cosine similarity matching for multi-employee identification.
  - Real-time video stream processing with blink/liveness detection to mitigate static photo spoofing.
  - Automated timestamped attendance logs with shift calculation, late penalties, and admin reporting dashboards.

---

## 12. Cinema Multi-Screen Booking Engine
- **Category:** `Web Application` / Ticketing & Inventory
- **Core Tech Stack:** `PHP 8`, `MySQL`, `JavaScript (ES6)`, `Bootstrap 5`
- **Key Metrics:** **Interactive Seat Map** · **Dynamic Pricing** · **Automated PDF Tickets**
- **Source Code:** [github.com/GitBababoo](https://github.com/GitBababoo)
- **Architectural Highlights:**
  - Interactive theater seating layout with real-time seat lock state management to prevent double-booking collisions.
  - Dynamic pricing rules based on showtime (Matinee/Evening), seating tier (Deluxe/Premium/VIP), and day of week.
  - Automated booking confirmation email dispatch with QR-coded PDF boarding passes.

---

## 13. Interactive Digital PDF Editor
- **Category:** `Web Application` / Document Productivity
- **Core Tech Stack:** `TypeScript`, `PDF.js`, `HTML5 Canvas API`, `CSS Grid`
- **Key Metrics:** **Zero Server Uploads (100% Client-Side Privacy)** · **Digital Signatures**
- **Source Code:** [github.com/GitBababoo](https://github.com/GitBababoo)
- **Architectural Highlights:**
  - In-browser PDF rendering and annotation tool allowing text insertion, highlight drawing, digital signature stamping, and image watermarking.
  - Client-side PDF page reordering, rotation, page extraction, and PDF merging with zero server-side telemetry.

---

## 14. Smart WebShop E-Commerce Engine
- **Category:** `Web Application` / Retail E-Commerce
- **Core Tech Stack:** `PHP 8`, `MySQL (PDO)`, `AJAX`, `Tailwind CSS`
- **Key Metrics:** **Multi-Tier Product Variants** · **Inventory Webhooks** · **Coupon Rule Engine**
- **Source Code:** [github.com/GitBababoo](https://github.com/GitBababoo)
- **Architectural Highlights:**
  - Full-lifecycle online shop with product variant matrices (size, color, SKU-level inventory), wishlists, and cart management.
  - Comprehensive admin dashboard for tracking revenue metrics, processing fulfillment statuses, and configuring promotional discount codes.

---

## 15. Community Agro-Tourism Regional Portal
- **Category:** `Web Application` / Regional Tourism & GIS
- **Core Tech Stack:** `HTML5`, `Modern JavaScript`, `CSS Grid`, `Responsive Design`
- **Key Metrics:** **Interactive Farm Mapping** · **Seasonal Harvest Calendar** · **Community Store**
- **Source Code:** [github.com/GitBababoo](https://github.com/GitBababoo)
- **Architectural Highlights:**
  - Regional platform designed to promote local agricultural communities and eco-tourism initiatives.
  - Interactive farm attraction map, seasonal harvest availability tracker, and direct-to-farmer marketplace catalog.

---

<div align="center">
<sub>All systems architected, developed, and maintained by <strong>Wongsathorn Chapseethong</strong>.</sub>
</div>
