# 🏛️ System Architecture & Engineering Design

> **Portfolio of Wongsathorn Chapseethong (วงศธร ฉาบสีทอง)**  
> *Technical Deep-Dive into the Zero-Framework Native DOM Engine, State Lifecycle, and Rendering Pipelines.*

---

## 1. Architectural Philosophy & Design Principles

The design goal of this portfolio is **engineering purity and raw performance**. While modern enterprise applications often require heavyweight component frameworks (React, Next.js, Vue), a software engineer's primary portfolio should exemplify mastery of the underlying web platform.

### Core Tenets:
1. **Zero Runtime Overhead:** 0 external JavaScript libraries, 0 framework runtimes, 0 client-side build steps.
2. **Native Web Standards First:** Leveraging HTML5 Semantic Elements, CSS Custom Properties (Level 4), CSS Grid / Flexbox, ES2022 JavaScript, and the Web Animation API.
3. **Sub-Millisecond Interactions:** Immediate response times (<16ms frame budget), 60 FPS animations, zero Cumulative Layout Shift (CLS = 0.000).
4. **Resilient Offline First (PWA Compatible):** Structured asset paths, deterministic caching, and graceful degradation for `prefers-reduced-motion` and `save-data` user preferences.
5. **Certified Accessibility (WCAG 2.1 AA):** Zero `axe-core` rule violations across all themes, full keyboard traversal paths, ARIA roles, and high-contrast color token scales (>= 4.5:1 / 7:1).

---

## 2. High-Level System Architecture Diagram

```mermaid
graph TD
    subgraph Browser Engine
        DOM[DOM Tree - index.html]
        CSSOM[CSSOM - main.css]
    end

    subgraph State Management & Event Bus
        AppInit([DOMContentLoaded / boot]) --> MainJS[assets/js/main.js]
        DataStore[(assets/js/projects.js - PF_PROJECTS)] --> ProjectsModule[Projects Module]
        
        MainJS --> ThemeModule[Theme Engine]
        MainJS --> LangModule[Bilingual Engine]
        MainJS --> ProjectsModule
        MainJS --> SheetModule[Sheet / Drawer Engine]
        MainJS --> LightboxModule[Lightbox Engine]
        MainJS --> CanvasModule[Canvas FX Engine]
        MainJS --> LineQRModule[LINE QR Popover]
        MainJS --> CmdKModule[Command Palette Engine]
    end

    subgraph User Interactions & Lifecycle
        ThemeModule <-->|Read / Write| LocalStorage[(localStorage: 'pf:theme')]
        LangModule <-->|Read / Write| LocalStorageLang[(localStorage: 'pf:lang')]
        LangModule -.->|Emits 'pf:lang' Event| ProjectsModule
        
        ProjectsModule <-->|Syncs 'cat' and 'q'| URLParams[Browser URL Query String]
        ProjectsModule -->|Generates Article Nodes| DOM
        
        DOM -->|Clicks [data-open]| SheetModule
        SheetModule -->|Clicks Media Thumbs| LightboxModule
        
        DOM -->|Hover / Focus / Tap| LineQRModule
        DOM -->|Global Keydown ⌘K| CmdKModule
    end
```

---

## 3. Module Breakdown & Internal Lifecycles

### 3.1 Theme Engine (`Theme`)
- **Mechanism:** Manages the `data-theme="dark|light"` attribute on the `<html>` root element.
- **Persistence:** Synchronizes with `localStorage.getItem('pf:theme')`. Falls back to the operating system's hardware setting via `window.matchMedia('(prefers-color-scheme: dark)')`.
- **CSS Token Switch:** Updates CSS variables (`--bg`, `--bg-1`, `--fg`, `--accent`, `--line`, etc.) globally with zero layout repaints.

### 3.2 Bilingual Engine (`Lang`)
- **Mechanism:** Manages bilingual text across the entire DOM tree without page reloads.
- **Translation Strategy:**
  1. For static markup, elements declare `data-en="English Translation"`, `data-en-aria="..."`, or `data-en-ph="..."` (placeholders).
  2. For dynamic components (project cards, drawer, search results), `T(th, en)` evaluates the active language flag and renders the corresponding string.
- **Event Dispatching:** When the language changes, `Lang.toggle()` dispatches a custom `pf:lang` event, causing reactive components to re-render instantly.

### 3.3 Projects & Reactive Filter Engine (`Projects`)
- **Data Source:** Reads an immutable, pre-indexed array of 16 project objects from `window.PF_PROJECTS` (in `assets/js/projects.js`).
- **Responsive 3-Column Grid:** Renders cards inside `.pgrid` using a balanced CSS Grid (`grid-template-columns: repeat(3, minmax(0, 1fr))`).
- **Reactive URL Synchronization:** Search queries (`q`) and category filters (`cat`) automatically serialize to `window.location.search` (`?cat=web&q=pos`) via `history.replaceState()`, making filtered states shareable and bookmarkable.
- **Card Micro-Architecture:**
  - `pcard__media`: 16:10 aspect ratio with multi-resolution `picture` WebP sources (`480w`, `960w`, `1600w`).
  - `pcard__badge`: Year indicator and real-time pulsing `LIVE` status dot.
  - `pcard__tags`: High-contrast pill badges with overflow `+N` count.
  - `pcard__foot`: Media asset counters and interactive sliding CTA arrow.

### 3.4 Detail Drawer Engine (`Sheet`)
- **Slide-Over Modal:** Clicking any project card triggers `Sheet.open(projectId)`.
- **DOM Construction:** Dynamically compiles the project's hero metrics, feature list, role definition, external demo/repo links, and gallery thumbnails.
- **Accessibility & Focus Trapping:** Sets `aria-hidden="false"`, `role="dialog"`, `aria-modal="true"`, locks background scroll, and traps keyboard focus onto the close button.
- **Deep Linking:** Supports direct URL hashing (`#p-metro3d`), immediately opening the corresponding case study on page load.

### 3.5 Lightbox Engine (`Lightbox`)
- **High-Performance Fullscreen Stage:** Displays both high-definition images and HTML5 videos (`.mp4`).
- **Keyboard Navigation:** Full support for `ArrowLeft` (previous), `ArrowRight` (next), and `Escape` (exit).
- **Responsive Thumbnails:** Synchronized bottom thumbnail strip with active indicator and viewport auto-scrolling.

### 3.6 Canvas FX Particle Engine (`BgFX`)
- **Constellation Simulation:** Renders an animated particle field simulating data networks.
- **Performance Constraints:**
  - Automatically skipped if `prefers-reduced-motion: reduce` is enabled.
  - Paused when the browser tab loses focus (`visibilitychange` API) to conserve GPU and battery life.
  - Dynamically calculates particle velocity, distance connection threshold, and DPI pixel ratio scaling (`window.devicePixelRatio`).

### 3.7 LINE Contact & QR Popover Engine (`LinePop`)
- **Hover & Focus Interaction:** Displays a floating QR code popover above the LINE contact link when hovered on desktop or focused via keyboard navigation.
- **Touch Device Optimization:** On mobile/tablet screens, tapping the green `QR` badge toggles the popover open/closed, while tapping the main text navigates directly to the official LINE URL (`https://line.me/ti/p/UzaC-aQ75C`).
- **Click-Outside Dismissal:** Document-level event listener automatically dismisses the popover when the user clicks elsewhere.

---

## 4. Performance & Memory Management Standards

| Strategy | Implementation Details |
| :--- | :--- |
| **Event Delegation** | Handlers for cards (`[data-open]`), copy buttons (`[data-copy]`), and links are attached to `document` or parent containers rather than individual elements, preventing memory leaks during DOM re-renders. |
| **Responsive Images** | `<picture>` elements use `srcset` with WebP compression (`480w`, `960w`, `1600w`) and `sizes` attributes, reducing mobile image payload by over 75%. |
| **CSS Transforms** | Animations use hardware-accelerated properties (`transform`, `opacity`) with `will-change` hints on critical hero elements. |
| **Asynchronous Decoding** | All project media assets declare `loading="lazy"` and `decoding="async"`, preventing main thread blocking during scroll. |

---

## 5. Security & Browser Hardening

- **Content Security:** Strict absence of `eval()`, `Function()`, or unescaped innerHTML injections. User-facing strings pass through an HTML entity sanitizer (`esc()`).
- **Tab Sniffing Protection:** All external links (`target="_blank"`) automatically receive `rel="noopener noreferrer"`.
- **CSP Compatible:** Self-contained CSS and JavaScript assets compatible with strict Content Security Policy directives (`script-src 'self'`).

---

<div align="center">
<sub>Designed and engineered for longevity, accessibility, and speed.</sub>
</div>
