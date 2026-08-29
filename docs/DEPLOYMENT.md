# 🚢 Production Deployment & Operations Runbook

> **Portfolio Deployment & Infrastructure Guide**  
> *Hosting, Edge CDN Caching, Media Optimization Pipelines, and Release Checklists.*

---

## 1. Hosting Architecture Overview

The portfolio is hosted on **GitHub Pages** with global edge CDN distribution and enforced HTTPS encryption:

- **Production URL:** `https://gubbitkeytoday.github.io/Profile/`
- **Target Branch:** `master` (Root directory `/`)
- **Build Engine:** Static Assets (Zero compilation dependencies required)

---

## 2. Media Optimization Protocol

To maintain maximum performance and keep the total bundle under **80 MB**, all media files must adhere to the following compression standards before committing:

| Media Type | Target Formats | Resolution Tiers | Target Compression Quality |
| :--- | :--- | :--- | :--- |
| **Project UI Screenshots** | `.webp` + `.jpg` (fallback) | `480w`, `960w`, `1600w` | WebP Quality: `82%`, JPG Quality: `80%` |
| **Video Demos** | `.mp4` (H.264 / AAC) | `1080p` / `720p` | CRF: `24`, Bitrate: `<1.5 Mbps`, Audio: `128 kbps` |
| **Icons & Brand Marks** | `.svg` | Vector | Minified with `svgo` |
| **Contact QR Code** | `.png` | `360x360` High-DPI | Lossless PNG with white border padding |

### Image Optimization Command:
```bash
# Example batch conversion to WebP using cwebp:
cwebp -q 82 input.png -o output-1600.webp
cwebp -q 82 -resize 960 0 input.png -o output-960.webp
cwebp -q 82 -resize 480 0 input.png -o output-480.webp
```

---

## 3. Cache-Busting & Asset Versioning Strategy

GitHub Pages edge servers cache static `.css` and `.js` bundles aggressively. To ensure instant updates for end users upon release, all primary assets in `index.html` utilize fingerprinted query parameters:

```html
<link rel="stylesheet" href="assets/css/main.css?v=1.0.1">
...
<script src="assets/js/projects.js?v=1.0.1"></script>
<script src="assets/js/main.js?v=1.0.1"></script>
```

When shipping CSS or JavaScript changes, increment the version string (`?v=1.0.2`).

---

## 4. Pre-Deployment Release Checklist

Before pushing commits to `master`, execute the following verification steps:

- [ ] **1. JavaScript Syntax Validation:**
  ```bash
  node -c assets/js/main.js
  node -c assets/js/projects.js
  ```
- [ ] **2. Verify Project Counts & Badges:**
  Confirm that `assets/js/projects.js` array count matches the badges in `index.html` (`16` Total, `11` Web, `5` Interactive).
- [ ] **3. Audit Zero axe-core Violations:**
  Test in browser with Chrome DevTools Lighthouse / axe DevTools extension.
- [ ] **4. Responsive Grid & Overflow Check:**
  Verify at 360px (mobile), 768px (tablet), 1280px (laptop), and 1920px (desktop).
- [ ] **5. Commit & Push:**
  ```bash
  git add .
  git commit -m "feat: release description"
  git push origin master
  ```

---

## 5. Post-Deployment Verification

After pushing to `master`:
1. Check GitHub Pages build status:
   ```bash
   gh api /repos/Gubbitkeytoday/Profile/pages/builds/latest
   ```
2. Verify live site responsiveness and network cache status at:  
   **[https://gubbitkeytoday.github.io/Profile/](https://gubbitkeytoday.github.io/Profile/)**

---

<div align="center">
<sub>Reliable, deterministic deployments for high-availability static web systems.</sub>
</div>
