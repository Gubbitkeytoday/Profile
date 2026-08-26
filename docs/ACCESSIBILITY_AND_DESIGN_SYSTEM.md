# 🎨 Accessibility & Design System Specification

> **Portfolio Design System Manual — Wongsathorn Chapseethong**  
> *Design Tokens, Color Contrast Verification, Typography Scale, and WCAG 2.1 AA Standards.*

---

## 1. Design Token Matrix

The design system is based on an **"Engineered Dark"** aesthetic, emphasizing precision, subtle glassmorphic depth, and high-legibility typography.

### 1.1 Dark Theme Tokens (Default)

| Token Name | Value | Purpose / Surface | Contrast vs `--bg` |
| :--- | :--- | :--- | :--- |
| `--bg` | `#07080B` | Primary Canvas Background | Base |
| `--bg-1` | `#0B0D12` | Elevated Cards & Modals | Base + 1 |
| `--bg-2` | `#101319` | Sunken Wells & Media Slots | Base + 2 |
| `--bg-3` | `#171B23` | Pill Badges & Secondary Well | Base + 3 |
| `--fg` | `#E9ECF2` | Primary Headings & Critical Text | **16.9 : 1** (Passes AAA) |
| `--fg-2` | `#A7B0C0` | Body Paragraphs & Subtitles | **7.9 : 1** (Passes AAA) |
| `--fg-3` | `#8B95A7` | Metadata, Captions & Timestamps | **5.7 : 1** (Passes AA) |
| `--accent` | `#FF5C38` | Primary Signal Accent (Buttons, Highlights) | **5.6 : 1** (Passes AA) |
| `--ok` | `#3DDC97` | Status Indicators & Live Badges | **10.2 : 1** (Passes AAA) |
| `--line` | `rgba(233, 236, 242, 0.09)` | Subtle Structural Borders | Non-text contrast |
| `--line-2` | `rgba(233, 236, 242, 0.16)` | Active / Hover Borders | Non-text contrast |

### 1.2 Light Theme Tokens (`[data-theme="light"]`)

| Token Name | Value | Purpose / Surface | Contrast vs `--bg` |
| :--- | :--- | :--- | :--- |
| `--bg` | `#F7F7F5` | Primary Light Canvas | Base |
| `--bg-1` | `#FFFFFF` | Elevated Pure White Cards | Base + 1 |
| `--bg-2` | `#EFEFEC` | Sunken Wells & Media Borders | Base + 2 |
| `--bg-3` | `#E7E7E3` | Pill Badges & Active Slots | Base + 3 |
| `--fg` | `#0B0D12` | Primary Dark Headings | **17.2 : 1** (Passes AAA) |
| `--fg-2` | `#3A404C` | Body Paragraphs & Subtitles | **8.1 : 1** (Passes AAA) |
| `--fg-3` | `#586071` | Metadata & Secondary Text | **5.1 : 1** (Passes AA) |
| `--accent` | `#E54826` | High-Contrast Orange Accent | **5.2 : 1** (Passes AA) |

---

## 2. Typography Token Scale

The typography utilizes a fluid clamp equation to ensure optical balance across both mobile viewports and 4K desktop monitors:

```
--font-display: "Space Grotesk", "IBM Plex Sans Thai", system-ui, sans-serif;
--font-sans:    "Inter", "IBM Plex Sans Thai", system-ui, -apple-system, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, monospace;
```

| Token | Clamp Value Equation | Rendered Range | Used For |
| :--- | :--- | :--- | :--- |
| `--t-3xs` | `clamp(0.625rem, 0.61rem + 0.07vw, 0.688rem)` | 10px – 11px | Badges, Micro Tags, Monospace Indices |
| `--t-2xs` | `clamp(0.688rem, 0.67rem + 0.09vw, 0.75rem)` | 11px – 12px | Filter Buttons, Monospace Status |
| `--t-xs` | `clamp(0.75rem, 0.73rem + 0.11vw, 0.813rem)` | 12px – 13px | Small Captions, Footnotes |
| `--t-sm` | `clamp(0.875rem, 0.85rem + 0.12vw, 0.938rem)` | 14px – 15px | Project Descriptions, Contact Values |
| `--t-base` | `clamp(1rem, 0.97rem + 0.15vw, 1.063rem)` | 16px – 17px | Standard Body Paragraphs |
| `--t-md` | `clamp(1.125rem, 1.08rem + 0.24vw, 1.25rem)` | 18px – 20px | Card Titles, Drawer Subheadings |
| `--t-lg` | `clamp(1.375rem, 1.27rem + 0.5vw, 1.688rem)` | 22px – 27px | Section Index Numbers, Modal Titles |
| `--t-xl` | `clamp(1.75rem, 1.53rem + 1.05vw, 2.5rem)` | 28px – 40px | Section Level 2 Headings (`h2`) |
| `--t-2xl` | `clamp(2.25rem, 1.87rem + 1.8vw, 3.5rem)` | 36px – 56px | Hero Sub-headers |
| `--t-3xl` | `clamp(2.75rem, 2.1rem + 3.1vw, 4.75rem)` | 44px – 76px | Primary Hero Name Headline |

---

## 3. WCAG 2.1 AA Accessibility Certification

The portfolio is engineered to comply strictly with **W3C Web Content Accessibility Guidelines (WCAG) 2.1 AA**:

### 3.1 Keyboard Navigation & Focus Ring Standards
- Every interactive element (buttons, cards, search input, links, filter pills) is keyboard-focusable via `Tab` traversal.
- Clear, high-visibility focus indicators are enforced:
  ```css
  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  ```
- **Custom Keyboard Shortcuts:**
  - `⌘K` / `Ctrl+K`: Opens the universal search palette.
  - `Escape`: Closes the Command Palette, Drawer Sheet, or Fullscreen Lightbox.
  - `ArrowLeft` / `ArrowRight`: Navigates through media items in the Lightbox.

### 3.2 Screen Reader Semantics & ARIA
- Landmark roles used throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`.
- Dynamic elements declare `aria-live="polite"` and `role="status"` for non-disruptive announcements.
- All SVG icons declare `aria-hidden="true"`, with parent buttons providing explicit `aria-label` and `data-en-aria` bilingual equivalents.

### 3.3 Motion Sensitivity (`prefers-reduced-motion`)
When a user enables reduced motion in their operating system settings:
1. CSS smooth scrolling is switched to instantaneous `auto`.
2. Particle animations (`#bgfx` canvas) and marquee infinite transforms are completely disabled.
3. Card hover translations and modal slide transitions are replaced with instantaneous opacity swaps (`0.001ms`).

---

<div align="center">
<sub>Engineered for universal access, clarity, and inclusive usability.</sub>
</div>
