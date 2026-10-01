# ข้อมูลพอร์ตโฟลิโอ (Portfolio Data)

## วงศธร ฉาบสีทอง (Wongsathorn Chapseethong) — Full-Stack Developer · IT Support

> เอกสารนี้รวมข้อมูลส่วนตัว ทักษะ เส้นทางการเรียน และรายละเอียดผลงานทั้ง **18 โปรเจกต์** ไว้ในที่เดียว เพื่อให้อ่านได้ง่าย
>
> **แหล่งข้อมูลจริง (single source of truth)**
>
> - ผลงานทั้งหมดดึงมาจาก [`src/data/projects.json`](./src/data/projects.json)
> - ข้อมูลติดต่ออยู่ใน [`src/lib/profile.ts`](./src/lib/profile.ts)
> - เส้นทางการเรียน การศึกษา และกลุ่มทักษะใน CV อยู่ใน [`src/components/profile/facts.ts`](./src/components/profile/facts.ts)
>
> เมื่อแก้ไฟล์เหล่านั้นแล้ว ต้องอัปเดตเอกสารนี้ตามด้วย ตัวเลขและฟีเจอร์ของแต่ละโปรเจกต์ยกมาจากข้อมูลตามที่เขียนไว้ ซึ่งอธิบายตัวโปรเจกต์นั้นๆ เอง ไม่ใช่ผลการวัดเว็บพอร์ตโฟลิโอนี้

---

## 1. ข้อมูลส่วนตัวและการติดต่อ

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| ชื่อ-นามสกุล | วงศธร ฉาบสีทอง (Wongsathorn Chapseethong) |
| ชื่อเล่น | ดรีม (Dream) |
| สายงาน | Full-Stack Developer · IT Support |
| สถานะ | นักศึกษาปริญญาตรีชั้นปีที่ 3 สาขาเทคโนโลยีสารสนเทศ (เริ่มเรียนปี 2023) กำลังหาที่ฝึกงาน สหกิจ หรืองานประจำ |
| ที่อยู่ | หัวหิน · ประจวบคีรีขันธ์ |
| อีเมล | [pushilkun@gmail.com](mailto:pushilkun@gmail.com) |
| โทรศัพท์ | [095-846-2520](tel:+66958462520) |
| LINE | [line.me/ti/p/UzaC-aQ75C](https://line.me/ti/p/UzaC-aQ75C) (บนเว็บมี QR ให้สแกนที่ส่วนติดต่อ) |
| GitHub หลัก | [github.com/GitBababoo](https://github.com/GitBababoo) |
| GitHub รอง | [github.com/Gubbitkeytoday](https://github.com/Gubbitkeytoday) |
| Facebook | [wongsathorn.ggv](https://web.facebook.com/wongsathorn.ggv) |
| เว็บพอร์ตโฟลิโอ | [gubbitkeytoday.github.io/Profile](https://gubbitkeytoday.github.io/Profile/) · [EN](https://gubbitkeytoday.github.io/Profile/en/) · [CV](https://gubbitkeytoday.github.io/Profile/cv/) |

---

## 2. แนวทางการทำงาน

ข้อความนี้ตรงกับ `PRINCIPLES` ใน `facts.ts` และตัด claim ที่พิสูจน์ไม่ได้ออกไปแล้ว

- **ครบทั้งระบบ:** ออกแบบสคีมาฐานข้อมูล วาง REST / SSE API เขียนตรรกะฝั่งเซิร์ฟเวอร์ แล้วทำต่อจนถึง UI คนเดียวทำได้ทั้งระบบและต่อกันติด
- **ประสิทธิภาพมาก่อน:** งานคำนวณหนักย้ายไปเขียนด้วย Rust แล้วคอมไพล์เป็น WebAssembly รันบน Web Worker เช่น Metro Mini 3D รันได้ 60 FPS พร้อมเที่ยวรถ 8,193 เที่ยวต่อวัน
- **ใช้ได้จริง ดูแลต่อได้:** ใช้คีย์บอร์ดได้ครบ เคารพ `prefers-reduced-motion` ตามแนวทาง WCAG 2.1 AA และมีพื้นฐาน Linux, Docker และเครือข่าย จึงดูแลระบบให้รันต่อได้หลังส่งมอบ

---

## 3. ทักษะ

กลุ่มทักษะตามที่แสดงในหน้า CV (`SKILL_GROUPS`) ส่วนตัวเลข "ใช้ใน N โปรเจกต์" ในส่วนทักษะบนหน้าเว็บนับจากแท็กใน `projects.json` โดยตรง

| กลุ่ม | ทักษะ |
| :-- | :-- |
| Frontend | Next.js (App Router 14/16), React 19, Angular, Vite, TypeScript, JavaScript, HTML5 / CSS, Tailwind CSS, shadcn/ui, Three.js / WebGL, MapLibre, Rust → WebAssembly, Web Workers, PWA / Service Worker, Web Audio API, PDF.js, WCAG 2.1 AA |
| Backend และระบบ | Node.js / Express, Python 3.12 / FastAPI, PHP, REST APIs, Server-Sent Events, WebSockets / WebRTC, Model Context Protocol, Windows WinRT · GSMTC, Discord IPC, Auth · JWT · sessions |
| ฐานข้อมูล | PostgreSQL, MySQL / MariaDB, SQLite, Prisma, Sequelize · PDO, Redis, Firebase, Normalization & indexing, Migrations & seeding |
| DevOps และไอที | Docker, Git / GitHub, GitHub Actions, Linux (Ubuntu / Debian), Windows administration, Bash / PowerShell, Nginx · Cloudflare, Networking & IT support, Puppeteer |

---

## 4. เส้นทางการเรียนและการพัฒนา

ข้อมูลตรงกับ `JOURNEY` ใน `facts.ts`

| ปี | ประเภท | เรื่อง | โปรเจกต์ |
| :-: | :-- | :-- | :-- |
| 2023 | การศึกษา | เข้าศึกษาปริญญาตรี สาขาเทคโนโลยีสารสนเทศ: วิศวกรรมซอฟต์แวร์ การออกแบบฐานข้อมูลเชิงสัมพันธ์ เครือข่ายคอมพิวเตอร์และการสื่อสารข้อมูล ระบบปฏิบัติการและระบบเสมือน | — |
| 2024 | ผลงาน | ระบบจริงชุดแรก ได้แก่ POS เว็บช้อปปิ้ง ระบบจองตั๋วโรงหนังพร้อมผังที่นั่ง และเว็บท่องเที่ยวชุมชน ควบคู่กับการเรียนเรื่อง Normalization, Indexing และโครงสร้างเซิร์ฟเวอร์ | `pos`, `webshop`, `cinema`, `beach` |
| 2025 | ผลงาน | ขึ้นชั้นปีที่ 3 ทำงาน 3D, Wasm และเรียลไทม์ เช่น งาน Three.js และ Metro Mini 3D ที่แกนคำนวณเขียนด้วย Rust แล้วคอมไพล์เป็น WebAssembly | `metro3d`, `hbd`, `mangaverses` |
| 2026 | ปัจจุบัน | งาน AI ซิสเต็มส์ และอีคอมเมิร์ซ และพร้อมรับงาน | `bkk-transit`, `prism64`, `discord-rpc`, `khuiai`, `ruedu`, `arom-coffee` |

---

## 5. ผลงานทั้งหมด 18 โปรเจกต์

เรียงตามลำดับเดียวกับบนเว็บ (`order` มากไปน้อย)

**สรุป:** เว็บแอป 12 · อินเทอร์แอคทีฟ 4 · แอปเดสก์ท็อป 2 · ปี 2024: 8 · ปี 2025: 4 · ปี 2026: 6 · ทุกโปรเจกต์มีลิงก์ซอร์สโค้ด · มีเว็บจริงที่เปิดใช้งาน 4 โปรเจกต์

| # | โปรเจกต์ | หมวด | ปี | ซอร์สโค้ด | เว็บจริง |
| --: | :-- | :-- | :-: | :-: | :-: |
| 01 | BKK Transit | เว็บแอป | 2026 | [repo](https://github.com/Gubbitkeytoday/bkk-transit) | — |
| 02 | Discord Rich Presence Pro | แอปเดสก์ท็อป | 2026 | [repo](https://github.com/Gubbitkeytoday/discord-rich-presence-pro) | — |
| 03 | PRISM64 | เว็บแอป | 2026 | [repo](https://github.com/Gubbitkeytoday/prism64) | [live](https://prism64.onrender.com) |
| 04 | ฤดู · RUEDU | เว็บแอป | 2026 | [repo](https://github.com/Gubbitkeytoday/ruedu-flower-atelier) | — |
| 05 | ARÓM | เว็บแอป | 2026 | [repo](https://github.com/Gubbitkeytoday/arom-specialty-coffee) | [live](https://gubbitkeytoday.github.io/arom-specialty-coffee/) |
| 06 | เว็บไซต์ท่องเที่ยวหาดทรายน้อย | เว็บแอป | 2024 | [repo](https://github.com/GitBababoo/Beach_2024-5-11) | — |
| 07 | Astra Cinema Booking | เว็บแอป | 2024 | [repo](https://github.com/GitBababoo/cinema-booking) | — |
| 08 | Nike SNKRS Tracker | อินเทอร์แอคทีฟ | 2024 | [repo](https://github.com/GitBababoo/nike-snkrs-tracker) | — |
| 09 | Tank.io | อินเทอร์แอคทีฟ | 2024 | [repo](https://github.com/GitBababoo/Tank.io) | — |
| 10 | Shopee TH Clone (Webshop) | เว็บแอป | 2024 | [repo](https://github.com/GitBababoo/webshop) | — |
| 11 | Web PDF Editor | เว็บแอป | 2025 | [repo](https://github.com/GitBababoo/PDF-Editer) | — |
| 12 | POS Python Offline | แอปเดสก์ท็อป | 2024 | [repo](https://github.com/GitBababoo/POS-Python) | — |
| 13 | HBD 3D Craft | อินเทอร์แอคทีฟ | 2025 | [repo](https://github.com/GitBababoo/Happy-Birthday) | [live](https://hbd-3d-craft.pages.dev) |
| 14 | Enterprise Face Scan Attendance | เว็บแอป | 2024 | [repo](https://github.com/GitBababoo/enterprise-face-scan-attendance) | — |
| 15 | SmartPOS Enterprise | เว็บแอป | 2024 | [repo](https://github.com/GitBababoo/POS) | — |
| 16 | MangaVerses | เว็บแอป | 2025 | [repo](https://github.com/Gubbitkeytoday/MangaVerses) | — |
| 17 | Khui AI (คุย AI) | เว็บแอป | 2026 | [repo](https://github.com/Gubbitkeytoday/khuiai-fullstack) | — |
| 18 | Greater Bangkok Metro Mini 3D | อินเทอร์แอคทีฟ | 2025 | [repo](https://github.com/Gubbitkeytoday/tha-metro-mini-3d) | [live](https://metro.itstom.me) |

### 01. BKK Transit — แพลตฟอร์มข้อมูลเปิดขนส่งมวลชนกรุงเทพฯ & ระบบคำนวณเส้นทาง / BKK Transit — Bangkok Open Transit Platform & Routing Engine

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `bkk-transit` · 18 |
| หมวด · ปี | เว็บแอป (`web`) · 2026 |
| บทบาท | สถาปัตยกรรมระบบ · GTFS Pipeline · FastAPI Backend · Leaflet.js · Model Context Protocol (MCP) |
| เทคโนโลยี | Python 3.12, FastAPI, SQLite, Leaflet.js, GTFS, Gemini MCP, Docker |
| ตัวเลขสำคัญ | **GTFS** มาตรฐานสากล สนข. · **<10ms** Query Latency · **500m** รัศมี GPS เรดาร์ · **MCP** JSON-RPC 2.0 |
| ซอร์สโค้ด | [github.com/Gubbitkeytoday/bkk-transit](https://github.com/Gubbitkeytoday/bkk-transit) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/bkk-transit/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/bkk-transit/) |
| สื่อ | ภาพปก `media/bkk_transit/01-bkk-transit-overview` · แกลเลอรี 8 ภาพ |

แพลตฟอร์มโครงสร้างพื้นฐานข้อมูลเปิดขนส่งมวลชนกรุงเทพฯ และปริมณฑล นำเข้า GTFS ทางการจาก สนข. (นำทาง) รองรับเรดาร์ GPS ค้นหาป้ายใกล้ฉัน ตารางเวลารถออกถัดไป และ Model Context Protocol (MCP) เชื่อมต่อ AI Assistants

**ฟีเจอร์หลัก**

- Official GTFS Data Ingestion: สตรีมมิ่งนำเข้าไฟล์ข้อมูล GTFS Static ทางการแบบ Chunk-based ตรวจสอบ Referential Integrity และสร้าง ValidationReport วิเคราะห์คุณภาพข้อมูล
- GPS Radar & Nearby Stops: ระบุพิกัดตำแหน่งผู้ใช้ (W3C Geolocation) ด้วยหมุดเรดาร์สีฟ้าและวงแหวนความแม่นยำ พร้อมค้นหาป้ายในระยะ 500 เมตรอัตโนมัติ
- Live Departures Board: แสดงตารางเวลารถและเรือเข้าป้ายถัดไป โดยคำนวณจากความถี่เดินรถ (frequencies.txt) และตารางเวลา พร้อมจุดเสียบ GTFS-RT แบบ Hot-Plug
- Intelligent Trip Planner: ระบบคำนวณและวางแผนการเดินทางระหว่างสถานี ทั้งสายตรงและจุดต่อรถ 1 ครั้ง พร้อมวาดแนวเส้นทาง Polyline สีสดบนแผนที่
- Model Context Protocol (MCP Server): เซิร์ฟเวอร์ MCP มาตรฐาน JSON-RPC 2.0 สำหรับเชื่อมต่อ Claude, ChatGPT, และ Gemini ให้เรียกค้นสาย ป้าย และคำนวณเส้นทางแบบ Agentic
- High Resilience & Fault Tolerance: ออกแบบด้วย Circuit Breaker ป้องกันระบบล่ม เมื่อต้นทาง Realtime ขัดข้อง ระบบจะตัดวงจรและทำงานต่อด้วยข้อมูลตารางเดินรถที่แคชไว้

---

### 02. Discord Rich Presence Pro — ซิงค์สถานะสื่อบน Windows / Discord Rich Presence Pro — Windows Media Presence Engine

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `discord-rpc` · 17 |
| หมวด · ปี | แอปเดสก์ท็อป (`app`) · 2026 |
| บทบาท | Systems Programming · Windows GSMTC API · Discord IPC |
| เทคโนโลยี | Python 3.12, Windows WinRT, GSMTC API, Discord IPC, Pystray, PyInstaller, Systems Architecture |
| ตัวเลขสำคัญ | **<40MB** Memory Footprint · **~0%** CPU Overhead · **GSMTC** Native WinRT API · **Zero-Lag** Anchor Timeline |
| ซอร์สโค้ด | [github.com/Gubbitkeytoday/discord-rich-presence-pro](https://github.com/Gubbitkeytoday/discord-rich-presence-pro) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/discord-rpc/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/discord-rpc/) |
| สื่อ | ภาพปก `media/discord_rpc/01-discord-full-profile` · แกลเลอรี 6 ภาพ |

เอ็นจินซิงค์สถานะการเล่นสื่อ (YouTube, Spotify, Apple Music, Netflix) ขึ้นโปรไฟล์ Discord ระดับเนทีฟผ่าน Windows GSMTC WinRT & Local IPC พร้อมระบบตรวจจับเกม DirectX/Vulkan ซ่อนอัตโนมัติ และ System Tray Controls

**ฟีเจอร์หลัก**

- Native Windows GSMTC Integration: เชื่อมต่อ WinRT Media Controls (GSMTC) ของ Windows อ่านชื่อเพลง, ศิลปิน, รูปปก, สถานะ Play/Pause และไทม์ไลน์โดยตรง
- Universal Browser & Player Support: รองรับทั้ง Chrome, Edge, Brave, Opera, Spotify, Tidal, Apple Music โดยไม่ต้องลง Extension เสริมในเบราว์เซอร์
- DirectX & Vulkan Game Detection: ตรวจจับหน้าต่างเกมแบบเต็มจออัตโนมัติ และหยุดส่งสถานะชั่วคราวเพื่อประหยัดทรัพยากรและไม่รบกวนเฟรมเรต
- Sub-Second Timeline Anchoring: คำนวณความคืบหน้าของเพลงด้วย Timestamp Anchor แม่นยำ ไม่สะดุด และไม่เกิดปัญหาแถบเวลารีเซ็ตวนซ้ำ
- System Tray Controller & Hot Reload: ควบคุมการทำงานจากไอคอนมุมขวาล่าง, สลับ Pause/Resume, ดู Log สด, และปรับแต่ง config.json โดยไม่ต้องรีสตาร์ท

---

### 03. PRISM64 — เครื่องมือวิเคราะห์ 64 เฉดสีบุคลิกภาพ & Gemini MCP / PRISM64 — 64-Shade Personality Intelligence & MCP

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `prism64` · 16 |
| หมวด · ปี | เว็บแอป (`web`) · 2026 |
| บทบาท | Full-Stack Architecture · จิตวิทยา HEXACO · AI MCP Server |
| เทคโนโลยี | Python, JavaScript, Tailwind CSS, Canvas API, Leaflet.js, Gemini MCP, Render.com |
| ตัวเลขสำคัญ | **64** เฉดสีบุคลิกภาพ · **6** มิติพฤติกรรม · **9:16** Story Studio · **MCP** JSON-RPC AI |
| ซอร์สโค้ด | [github.com/Gubbitkeytoday/prism64](https://github.com/Gubbitkeytoday/prism64) |
| เว็บจริง | [prism64.onrender.com](https://prism64.onrender.com) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/prism64/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/prism64/) |
| สื่อ | ภาพปก `media/prism64/01-landing-hero-showcase` · แกลเลอรี 5 ภาพ + วิดีโอ 1 |

เว็บแอปพลิเคชันวิเคราะห์บุคลิกภาพเชิงลึก 6 มิติ 64 เฉดสี พร้อม Canvas 9:16 Social Story Studio, ระบบ Real-time Geo Telemetry และ Gemini Spark Model Context Protocol (MCP) Server รองรับ AI Agent

**ฟีเจอร์หลัก**

- โมเดลจิตวิทยา HEXACO 6 มิติ (Energy, Info, Decision, Action, Identity, Relating) แตกแขนง 64 เฉดสี (16 Archetypes × 4 Sub-Variants)
- Dual Assessment Engine: โหมดด่วน 18 ข้อ (1.5 นาที) และโหมดเจาะลึก 36 ข้อ (3 นาที) คำนวณแบบ Real-time
- Social Story Card Studio (9:16): Export รูปแบบ Light Pearl & Midnight Dark สำหรับ IG / TikTok Story ได้ทันที
- Gemini Spark MCP Server: รองรับมาตรฐาน Model Context Protocol (JSON-RPC 2.0) เชื่อมต่อ AI Agent เพื่อดึงข้อมูลบุคลิกภาพ
- Stealth Admin Dashboard: แผนที่ Geo Telemetry สดด้วย Leaflet.js ติดตามผู้เข้าชมและผลการประเมินแบบ Real-time

---

### 04. ฤดู · RUEDU — Flower Atelier

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `ruedu` · 15 |
| หมวด · ปี | เว็บแอป (`web`) · 2026 |
| บทบาท | ออกแบบแบรนด์ · E-commerce · A11y |
| เทคโนโลยี | JavaScript, HTML/CSS, PWA, Service Worker, Accessibility |
| ตัวเลขสำคัญ | **0** axe violations · **13** หน้า · **16** สินค้า · **3** ขั้น checkout |
| ซอร์สโค้ด | [github.com/Gubbitkeytoday/ruedu-flower-atelier](https://github.com/Gubbitkeytoday/ruedu-flower-atelier) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/ruedu/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/ruedu/) |
| สื่อ | ภาพปก `media/ruedu/01-homepage-00-full-page` · แกลเลอรี 77 ภาพ |

ระบบอีคอมเมิร์ซร้านดอกไม้ระดับ Luxury 13 หน้า สองภาษา พร้อม Bouquet Builder คำนวณราคาสด ตะกร้าใน localStorage และ Checkout 3 ขั้น

**ฟีเจอร์หลัก**

- Bouquet Builder เลือกขนาด โทนสี การห่อ แจกัน และการ์ด คำนวณราคาสดทุกการเปลี่ยน
- ตัวกรองสินค้าหลายมิติที่ sync เข้ากับ URL แชร์หน้าที่กรองไว้ได้
- ตะกร้าเก็บใน localStorage แยก line ตามสินค้า + ตัวเลือก
- Checkout 3 ขั้น ตรวจข้อมูลแยกขั้น พร้อมข้อความ error สองภาษา
- Service Worker ใช้งานออฟไลน์ได้ และผ่าน WCAG 2.1 AA 0 violations

---

### 05. ARÓM — Specialty Coffee Roasters

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `arom-coffee` · 14 |
| หมวด · ปี | เว็บแอป (`web`) · 2026 |
| บทบาท | ออกแบบแบรนด์ · Frontend · A11y |
| เทคโนโลยี | JavaScript, HTML/CSS, Python, PWA, Accessibility |
| ตัวเลขสำคัญ | **0** axe violations · **8** หน้า · **36** เมนู · **11** JSON-LD |
| ซอร์สโค้ด | [github.com/Gubbitkeytoday/arom-specialty-coffee](https://github.com/Gubbitkeytoday/arom-specialty-coffee) |
| เว็บจริง | [gubbitkeytoday.github.io/arom-specialty-coffee/](https://gubbitkeytoday.github.io/arom-specialty-coffee/) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/arom-coffee/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/arom-coffee/) |
| สื่อ | ภาพปก `media/arom-coffee/01-home-index-00-full-page` · แกลเลอรี 57 ภาพ |

เว็บแบรนด์กาแฟพิเศษ 8 หน้า สองภาษา (TH/EN) ที่อ่านได้ครบแม้ปิด JavaScript พร้อมตัวจับเวลาชง V60 และผ่าน WCAG 2.1 AA แบบ 0 violations

**ฟีเจอร์หลัก**

- ตัวจับเวลาชงกาแฟดริป V60 แบบ Interactive พร้อมขั้นตอนทีละสเต็ป
- ตัวกรองและค้นหาเมนู 36 รายการ
- คำนวณสถานะเปิด–ปิดร้านจากเวลาจริง แยกตามสาขาและวัน
- SEO ด้วย JSON-LD 11 ประเภท และรองรับ PWA
- ผ่าน WCAG 2.1 AA — 0 axe-core violations ทั้ง 8 หน้า

---

### 06. เว็บไซต์ท่องเที่ยวหาดทรายน้อย / Hat Sai Noi Community Tourism

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `beach` · 13 |
| หมวด · ปี | เว็บแอป (`web`) · 2024 |
| บทบาท | Full-Stack PHP · งานชุมชน |
| เทคโนโลยี | PHP, MySQL, HTML/CSS |
| ตัวเลขสำคัญ | **Community** งานชุมชน · **Directory** ธุรกิจท้องถิ่น · **CMS** จัดการเนื้อหา · **PHP** MySQL |
| ซอร์สโค้ด | [github.com/GitBababoo/Beach_2024-5-11](https://github.com/GitBababoo/Beach_2024-5-11) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/beach/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/beach/) |
| สื่อ | ภาพปก `media/beach/home` · แกลเลอรี 8 ภาพ |

เว็บประชาสัมพันธ์และส่งเสริมการท่องเที่ยวชุมชนหาดทรายน้อย พร้อมฐานข้อมูลธุรกิจท้องถิ่นเพื่อกระตุ้นเศรษฐกิจในพื้นที่

**ฟีเจอร์หลัก**

- นำเสนอแหล่งท่องเที่ยว บรรยากาศ และกิจกรรมในพื้นที่
- ฐานข้อมูลธุรกิจและร้านค้าในชุมชน
- ระบบจัดการเนื้อหา บทความ และข้อมูลติดต่อสำหรับผู้ดูแล

---

### 07. Astra Cinema Booking

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `cinema` · 12 |
| หมวด · ปี | เว็บแอป (`web`) · 2024 |
| บทบาท | Full-Stack · PostgreSQL |
| เทคโนโลยี | React, Node.js, PostgreSQL, Tailwind |
| ตัวเลขสำคัญ | **Seat** ผังที่นั่ง · **Member** ราคาสมาชิก · **Ticket** ออกตั๋ว · **Admin** หลังบ้าน |
| ซอร์สโค้ด | [github.com/GitBababoo/cinema-booking](https://github.com/GitBababoo/cinema-booking) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/cinema/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/cinema/) |
| สื่อ | ภาพปก `media/cinema/01-home` · แกลเลอรี 16 ภาพ |

ระบบจองตั๋วภาพยนตร์ออนไลน์ครบวงจร ตั้งแต่เลือกรอบฉาย ผังที่นั่ง ไปจนถึงการออกตั๋วและหลังบ้าน

**ฟีเจอร์หลัก**

- ค้นหาภาพยนตร์ ดูรายละเอียด และเลือกรอบฉายตามโรง
- แผนผังเลือกที่นั่งแบบ Interactive และคำนวณราคาสมาชิก
- ชำระเงินและออกหลักฐานการจอง (Confirmation)
- จัดการภาพยนตร์ รอบฉาย และการจองสำหรับผู้ดูแล

---

### 08. Nike SNKRS Tracker

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `nike` · 11 |
| หมวด · ปี | อินเทอร์แอคทีฟ (`interactive`) · 2024 |
| บทบาท | Web Scraping · Automation |
| เทคโนโลยี | React, Node.js, Web Scraping |
| ตัวเลขสำคัญ | **Real-time** ติดตาม · **Alert** แจ้งเตือน · **Bot** เลือกไซส์ · **Scrape** ดึงข้อมูล |
| ซอร์สโค้ด | [github.com/GitBababoo/nike-snkrs-tracker](https://github.com/GitBababoo/nike-snkrs-tracker) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/nike/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/nike/) |
| สื่อ | ภาพปก `media/nike/nike-instock` · แกลเลอรี 5 ภาพ |

ระบบติดตามสต็อกรองเท้าลิมิเต็ดของ Nike SNKRS แบบเรียลไทม์ พร้อมระบบแจ้งเตือนและบอทช่วยเลือกไซส์

**ฟีเจอร์หลัก**

- ติดตามสินค้าเข้าใหม่และรุ่นที่กำลังจะวางจำหน่ายแบบเรียลไทม์
- แจ้งเตือนเมื่อมีสต็อกเข้าระบบ
- บอทช่วยเลือกไซส์และอำนวยความสะดวกในการกดซื้อ

---

### 09. Tank.io

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `tank` · 10 |
| หมวด · ปี | อินเทอร์แอคทีฟ (`interactive`) · 2024 |
| บทบาท | Game Engine 2D · Multiplayer |
| เทคโนโลยี | TypeScript, Canvas API, Game Engine, Multiplayer |
| ตัวเลขสำคัญ | **Custom** Engine · **Real-time** Multiplayer · **Boss** อีเวนต์ · **Class** สายรถถัง |
| ซอร์สโค้ด | [github.com/GitBababoo/Tank.io](https://github.com/GitBababoo/Tank.io) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/tank/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/tank/) |
| สื่อ | ภาพปก `media/tank/gameplay` · แกลเลอรี 5 ภาพ |

เกมต่อสู้รถถังออนไลน์แบบ Real-time Multiplayer ที่เขียน Game Engine 2D ขึ้นมาเองด้วย Canvas API

**ฟีเจอร์หลัก**

- พัฒนา Game Engine 2D เองด้วย Canvas API และ TypeScript
- ระบบสายรถถัง (Class Evolution) และการอัปเกรดความสามารถ
- ห้องล็อบบี้ การต่อสู้กับบอส และตารางจัดอันดับ

---

### 10. Shopee TH Clone (Webshop)

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `webshop` · 9 |
| หมวด · ปี | เว็บแอป (`web`) · 2024 |
| บทบาท | Full-Stack PHP · MySQL |
| เทคโนโลยี | PHP, MySQL, JavaScript |
| ตัวเลขสำคัญ | **Cart** ตะกร้า · **Wishlist** รายการโปรด · **Admin** หลังบ้าน · **MySQL** ฐานข้อมูล |
| ซอร์สโค้ด | [github.com/GitBababoo/webshop](https://github.com/GitBababoo/webshop) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/webshop/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/webshop/) |
| สื่อ | ภาพปก `media/webshop/ws-homepage` · แกลเลอรี 7 ภาพ |

ระบบร้านค้าออนไลน์ครบวงจรบนสถาปัตยกรรม PHP และ MySQL ตั้งแต่หน้าร้านถึงแดชบอร์ดแอดมิน

**ฟีเจอร์หลัก**

- หน้ารวมสินค้า ค้นหา และกรองตามหมวดหมู่
- ตะกร้าสินค้าและขั้นตอนการสั่งซื้อ (Checkout Flow)
- รายการโปรด (Wishlist) และประวัติคำสั่งซื้อ
- แดชบอร์ดแอดมินจัดการสินค้า หมวดหมู่ และสถานะจัดส่ง

---

### 11. Web PDF Editor

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `pdf-editer` · 8 |
| หมวด · ปี | เว็บแอป (`web`) · 2025 |
| บทบาท | Frontend · PDF.js |
| เทคโนโลยี | React, TypeScript, PDF.js, Tailwind |
| ตัวเลขสำคัญ | **PDF.js** เรนเดอร์ · **E-Sign** ลายเซ็น · **Client** ประมวลผล · **Export** ไฟล์ใหม่ |
| ซอร์สโค้ด | [github.com/GitBababoo/PDF-Editer](https://github.com/GitBababoo/PDF-Editer) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/pdf-editer/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/pdf-editer/) |
| สื่อ | ภาพปก `media/pdf-editer/693fbfc7-b89f-442f-abab-f2018f0bc8e1` · แกลเลอรี 3 ภาพ + วิดีโอ 1 |

เว็บแก้ไขและเซ็นเอกสาร PDF บนเบราว์เซอร์โดยตรง ไม่ต้องอัปโหลดไฟล์ขึ้นเซิร์ฟเวอร์

**ฟีเจอร์หลัก**

- เปิดอ่านไฟล์ PDF ขนาดใหญ่ได้รวดเร็วด้วย PDF.js
- เขียนข้อความ ไฮไลท์ และแนบคำอธิบาย (Annotations)
- เพิ่มลายเซ็นอิเล็กทรอนิกส์ แล้ว Export เป็นไฟล์ใหม่ได้ทันที

---

### 12. POS Python Offline

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `pos-python` · 7 |
| หมวด · ปี | แอปเดสก์ท็อป (`app`) · 2024 |
| บทบาท | Desktop App · SQLite · RBAC |
| เทคโนโลยี | Python, SQLite, Tkinter, Desktop App |
| ตัวเลขสำคัญ | **100%** ออฟไลน์ · **RBAC** สิทธิ์ · **Audit** บันทึก · **Multi** สาขา |
| ซอร์สโค้ด | [github.com/GitBababoo/POS-Python](https://github.com/GitBababoo/POS-Python) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/pos-python/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/pos-python/) |
| สื่อ | ภาพปก `media/pos-python/pos-sales-main` · แกลเลอรี 18 ภาพ |

โปรแกรมจุดขายบน Windows ทำงานออฟไลน์ 100% พร้อมระบบสิทธิ์ Audit Log และการจัดการหลายสาขา

**ฟีเจอร์หลัก**

- ขายหน้าร้าน จัดการคิว ออกใบเสร็จ และคำนวณภาษีมูลค่าเพิ่ม
- จัดการสิทธิ์พนักงาน (RBAC) และบันทึกประวัติการทำงาน (Audit Log)
- บริหารหลายสาขา (Branch Management)
- คลังสินค้าและรายงานยอดขาย เก็บบน SQLite ฝั่งเครื่อง

---

### 13. HBD 3D Craft

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `hbd` · 6 |
| หมวด · ปี | อินเทอร์แอคทีฟ (`interactive`) · 2025 |
| บทบาท | 3D · Web Audio · ออกแบบทั้งหมด |
| เทคโนโลยี | Three.js, Anime.js, Vite, Web Audio API |
| ตัวเลขสำคัญ | **3D** Three.js · **Mic** เป่าเทียน · **0** ฐานข้อมูล · **Base64** URL state |
| ซอร์สโค้ด | [github.com/GitBababoo/Happy-Birthday](https://github.com/GitBababoo/Happy-Birthday) |
| เว็บจริง | [hbd-3d-craft.pages.dev](https://hbd-3d-craft.pages.dev) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/hbd/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/hbd/) |
| สื่อ | ภาพปก `media/hbd/1-creator-dashboard` · แกลเลอรี 4 ภาพ + วิดีโอ 1 |

เว็บสร้างการ์ดวันเกิด 3 มิติ ที่เป่าเทียนด้วยไมโครโฟนจริงได้ และส่งต่อได้ด้วยลิงก์เดียวโดยไม่ต้องมีฐานข้อมูล

**ฟีเจอร์หลัก**

- ปรับแต่งเค้ก 3D จำนวนเทียน และข้อความอวยพร
- ตรวจจับแรงลมผ่านไมโครโฟนด้วย Web Audio API เพื่อดับเปลวเทียน 3D
- เข้ารหัสข้อมูลการ์ดลงใน URL แบบ Base64 ส่งต่อได้ทันทีโดยไม่ต้องมีฐานข้อมูล

---

### 14. Enterprise Face Scan Attendance

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `facescan` · 5 |
| หมวด · ปี | เว็บแอป (`web`) · 2024 |
| บทบาท | Frontend Angular · Firebase Serverless |
| เทคโนโลยี | Angular, Firebase, Tailwind, TypeScript |
| ตัวเลขสำคัญ | **Kiosk** สแกนสด · **Google** Auth · **Serverless** Firebase · **Leave** อนุมัติลา |
| ซอร์สโค้ด | [github.com/GitBababoo/enterprise-face-scan-attendance](https://github.com/GitBababoo/enterprise-face-scan-attendance) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/facescan/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/facescan/) |
| สื่อ | ภาพปก `media/facescan/admin-overview` · แกลเลอรี 8 ภาพ |

ระบบบันทึกเวลาเข้า-ออกงานด้วยการจดจำใบหน้า บนโครงสร้าง Serverless Cloud พร้อมแดชบอร์ดผู้ดูแล

**ฟีเจอร์หลัก**

- หน้าจอ Kiosk สแกนใบหน้ายืนยันตัวตนแบบ Real-time พร้อมสถานะสำเร็จ/ผิดพลาด
- ลงทะเบียนใบหน้าพนักงานใหม่ (Face Registration)
- ล็อกอินปลอดภัยด้วย Google Authentication
- แดชบอร์ดตรวจเวลาเข้างาน อนุมัติการลา และสรุปเวลาทำงาน

---

### 15. SmartPOS Enterprise

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `pos` · 4 |
| หมวด · ปี | เว็บแอป (`web`) · 2024 |
| บทบาท | Full-Stack · ออกแบบฐานข้อมูล |
| เทคโนโลยี | Next.js, TypeScript, Tailwind, Prisma, PostgreSQL |
| ตัวเลขสำคัญ | **QR** PromptPay · **Stock** แจ้งเตือน · **Table** จัดโต๊ะ · **Loyalty** สะสมแต้ม |
| ซอร์สโค้ด | [github.com/GitBababoo/POS](https://github.com/GitBababoo/POS) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/pos/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/pos/) |
| สื่อ | ภาพปก `media/pos/02-pos-terminal` · แกลเลอรี 14 ภาพ |

ระบบบริหารร้านค้าและจุดขายหน้าร้านระดับองค์กรแบบ All-in-One ตั้งแต่คิดเงินหน้าร้านถึงแดชบอร์ดผู้บริหาร

**ฟีเจอร์หลัก**

- POS Terminal พร้อมส่วนลด ภาษี และโปรโมชัน
- จัดการโต๊ะอาหารและออเดอร์ (Table Management)
- ชำระเงินเงินสดและ Dynamic QR PromptPay
- คลังสินค้า สต็อกคงเหลือ และแจ้งเตือนสินค้าใกล้หมด
- สมาชิกสะสมแต้ม รายงานค่าใช้จ่าย และแดชบอร์ดยอดขาย

---

### 16. MangaVerses

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `mangaverses` · 3 |
| หมวด · ปี | เว็บแอป (`web`) · 2025 |
| บทบาท | Full-Stack · Backoffice |
| เทคโนโลยี | Next.js 16, TypeScript, Tailwind, shadcn/ui, Prisma, SQLite |
| ตัวเลขสำคัญ | **Lazy** โหลดภาพ · **2** โหมดอ่าน · **Admin** หลังบ้าน · **16** Next.js |
| ซอร์สโค้ด | [github.com/Gubbitkeytoday/MangaVerses](https://github.com/Gubbitkeytoday/MangaVerses) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/mangaverses/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/mangaverses/) |
| สื่อ | ภาพปก `media/mangaverses/01-home-desktop` · แกลเลอรี 13 ภาพ |

เว็บอ่านมังงะแปลไทยประสิทธิภาพสูง พร้อมแผงผู้ดูแลระบบจัดการเรื่อง ตอน และตำแหน่งโฆษณา

**ฟีเจอร์หลัก**

- ค้นหาและจัดหมวดหมู่ พร้อมอันดับความนิยมรายสัปดาห์/รายเดือน
- ชั้นหนังสือส่วนตัวและระบบบุ๊กมาร์ก
- หน้าอ่านโหลดภาพแบบ Lazy-load ปรับโหมดการอ่านได้
- Backoffice จัดการรายชื่อ เพิ่มตอน และจัดการตำแหน่งโฆษณา

---

### 17. Khui AI (คุย AI) / Khui AI

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `khuiai` · 2 |
| หมวด · ปี | เว็บแอป (`web`) · 2026 |
| บทบาท | Full-Stack · ออกแบบฐานข้อมูล · SSE Streaming |
| เทคโนโลยี | Next.js 14, TypeScript, Prisma, SQLite, OpenAI API, Tailwind |
| ตัวเลขสำคัญ | **SSE** สตรีมมิ่ง · **10** ภาษา · **15** หมวดรายงาน · **12** ราศี |
| ซอร์สโค้ด | [github.com/Gubbitkeytoday/khuiai-fullstack](https://github.com/Gubbitkeytoday/khuiai-fullstack) |
| เว็บจริง | — (ไม่มีเว็บที่เปิดใช้งาน) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/khuiai/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/khuiai/) |
| สื่อ | ภาพปก `media/khuiai/12-chat-reply` · แกลเลอรี 24 ภาพ + วิดีโอ 1 |

แพลตฟอร์มสนทนากับตัวละคร AI ภาษาไทยแบบครบวงจร มีทั้ง Creator Studio, ระบบเศรษฐกิจในแอป และระบบชุมชน

**ฟีเจอร์หลัก**

- Creator Studio สร้างตัวละคร AI กำหนดนิสัย บุคลิก และสถานการณ์จำลอง
- แชทตอบกลับแบบ Real-time ด้วย Server-Sent Events พร้อม Fallback สลับโมเดลเมื่อ error
- ระบบเศรษฐกิจ: เหรียญ เช็คอินรายวัน เควส และของขวัญ
- ระบบชุมชน: คอมเมนต์ Leaderboard และการรายงานเนื้อหา 15 หมวด
- ดูดวง 12 ราศี และ i18n 10 ภาษา

---

### 18. Greater Bangkok Metro Mini 3D

| หัวข้อ | รายละเอียด |
| :-- | :-- |
| id · order | `metro3d` · 1 |
| หมวด · ปี | อินเทอร์แอคทีฟ (`interactive`) · 2025 |
| บทบาท | ออกแบบระบบ · Frontend 3D · Rust/Wasm |
| เทคโนโลยี | React 19, TypeScript, Three.js, MapLibre GL, Rust, WebAssembly |
| ตัวเลขสำคัญ | **10** สาย · **193** สถานี · **8,193** เที่ยว/วัน · **60** FPS |
| ซอร์สโค้ด | [github.com/Gubbitkeytoday/tha-metro-mini-3d](https://github.com/Gubbitkeytoday/tha-metro-mini-3d) |
| เว็บจริง | [metro.itstom.me](https://metro.itstom.me) |
| หน้ารายละเอียด | [TH](https://gubbitkeytoday.github.io/Profile/projects/metro3d/) · [EN](https://gubbitkeytoday.github.io/Profile/en/projects/metro3d/) |
| สื่อ | ภาพปก `media/metro3d/01-network-overview` · แกลเลอรี 11 ภาพ + วิดีโอ 1 |

เว็บจำลองโครงข่ายรถไฟฟ้ากรุงเทพฯ–ปริมณฑลแบบ 3 มิติ วางแนวรางตามพิกัดจริงจาก OpenStreetMap แยกระดับยกระดับ/ระดับดิน/ใต้ดิน และวิ่งขบวนตามตารางเวลาจริง GTFS

**ฟีเจอร์หลัก**

- วิ่งขบวนตามตาราง GTFS จริง 10 สาย 193 สถานี 8,193 เที่ยวต่อวัน
- เร่งเวลา / ย้อนเวลาได้ตามใจ พร้อมกล้องติดตามขบวน (Train Tracking)
- Journey Planner วางแผนเส้นทาง บอกจุดเปลี่ยนสายและเวลาที่ใช้
- แกนคำนวณตำแหน่งขบวนเขียนด้วย Rust คอมไพล์เป็น WebAssembly รันบน Web Worker
- รองรับ 9 ภาษา

---

## 6. ระบบของเว็บพอร์ตโฟลิโอ (v2)

- **สร้างด้วย:** Astro 7, TypeScript (strict) และ Tailwind CSS v4 build เป็น HTML แบบ static ทั้งหมด แล้ว deploy ขึ้น GitHub Pages ด้วย GitHub Actions
- **สองภาษาแยก URL:** ภาษาไทยอยู่ที่ `/` ภาษาอังกฤษอยู่ที่ `/en/` มี canonical, hreflang, OG image แยกตามภาษา และ sitemap
- **หน้ารายละเอียดโปรเจกต์:** `/projects/<id>/` มีแกลเลอรี PhotoSwipe (ภาพและวิดีโอ) และปุ่มไปโปรเจกต์ก่อนหน้าหรือถัดไป
- **ส่วนผลงาน:** กรองตามหมวด ตามเทคโนโลยี (`?tech=`) และค้นหาได้ ค่าตัวกรองซิงก์กับ URL
- **Command Palette:** เปิดด้วย ⌘K / Ctrl K หรือ `/` ค้นหาหน้า โปรเจกต์ และคำสั่ง เช่น คัดลอกอีเมล เปิด CV สลับธีม สลับภาษา
- **หน้า CV:** `/cv/` สั่งพิมพ์หรือบันทึกเป็น PDF ได้
- **ธีม:** มืดและสว่าง จำค่าที่เลือกไว้ใน `localStorage` ถ้ายังไม่เคยเลือกจะตามการตั้งค่าของระบบ
- **คุณภาพที่ CI ตรวจ:** axe-core (WCAG 2.2 AA) ต้องได้ 0 violations และต้องผ่านเกณฑ์ Lighthouse CI ตาม `lighthouserc.cjs` รายละเอียดอยู่ใน [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)
