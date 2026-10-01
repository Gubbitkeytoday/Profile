# 🔍 รีวิว UI/UX & แผนยกเครื่องเว็บไซต์ (v1 → v2)

> ตรวจเว็บเวอร์ชันเดิม (commit `590dbd9`) โดยแบ่งทีมรีวิวเป็น 4 ด้าน ได้แก่ Visual Design, UX/IA, Accessibility และ Performance/SEO/Code
> ทุกข้อวัดจากของจริง: ถ่ายภาพหน้าจอด้วย Playwright (เดสก์ท็อป 1440 / มือถือ 390, ธีมมืด/สว่าง, TH/EN), รัน axe-core, Lighthouse 12 และเปิด DevTools Performance

---

## 1. สรุปคะแนน (เว็บเดิม)

| ด้าน | คะแนน | สรุปสั้นๆ |
| :--- | :---: | :--- |
| Visual Design | **6/10** | ระบบ token สีกับตัวอักษรทำไว้ดี แต่หน้าตาโดยรวมยังเป็น "เทมเพลตพอร์ตยุค 2021": กล่องซ้อนกล่อง ชิปสีรุ้ง และฟอนต์ mono ที่ไม่มีอักษรไทย |
| UX / IA | **6/10** | สวยและฟีเจอร์เยอะ แต่ออกแบบเพื่อโชว์ ไม่ได้ออกแบบเพื่อให้คนอยากจ้าง: ไม่มี CV, ผลงานอยู่ลึกถึง Section ที่ 4 และมี claim เกินจริง |
| Accessibility | ⚠️ | README บอก "0 axe violations" แต่ตรวจจริงเจอ **ธีมสว่าง 74 จุด** (contrast) + `aria-allowed-role` ×18 + `region` ×99 |
| Performance | **78** (มือถือ) / 96 (เดสก์ท็อป) | LCP บนมือถือ 3.8s, CLS บนเดสก์ท็อป 0.10–0.12, มี request ที่ได้ 404 ถึง 9 รายการ และแคนวาสอนุภาคกิน main thread 26–75% |
| SEO | ⚠️ | ภาษา EN ซ่อนอยู่ใน `data-en` (crawler มองไม่เห็น) และขาด og:image, canonical, hreflang, sitemap, robots, manifest, 404 |

---

## 2. ปัญหาสำคัญที่เจอ (เรียงตามความรุนแรง)

### 🔴 P0 — ต้องแก้ทันที
1. **ธีมสว่างพัง**: ป้าย metric (`.pcard__mpill--cool/--blue/--purple`) ฮาร์ดโค้ดสีของธีมมืด พอเป็นพื้นขาว contrast เหลือแค่ 1.6–2.6:1 จนอ่านไม่ออก
2. **ไอคอนพัง (404)**: `images/icons/windows11.svg` และ `powershell.svg` ถูก `.gitignore` ไว้ เลยขึ้นเป็นสี่เหลี่ยมขาวบนเว็บจริง ส่วน `lu-bus` กับ `openai` ไม่ได้นิยามไว้ใน `icons.css`
3. **ข้อความสำหรับนักพัฒนาหลุดไปถึงผู้ชม**: ช่องรูปโปรไฟล์แสดงข้อความ "วางไฟล์ profile.jpg…" และยิง request ที่ได้ 404 อีก 5 ครั้ง
4. **ฟอนต์ไทยผิด**: ปุ่ม เมนู และป้ายต่างๆ ใช้ JetBrains Mono ซึ่งไม่มีอักษรไทย จึง fallback ไปฟอนต์ระบบ แล้วยังโดน `letter-spacing` กับ `uppercase` จนรูปคำไทยเพี้ยน
5. **ไม่มี CV ให้ดาวน์โหลด**: ทั้งที่กลุ่มเป้าหมายคือ HR และคนสัมภาษณ์งาน
6. **ความน่าเชื่อถือ**: claim "0 axe violations", "Lighthouse 100", "Windows Kernel" (จริงๆ GSMTC เป็น WinRT แบบ user-mode), "100% uptime" และแถบทักษะแบบ 92% ไม่มีหลักฐานรองรับ
7. **Ctrl+K ใช้กับคีย์บอร์ดไม่ได้**: สั่ง `focus()` ตอนที่กล่องยังเป็น `visibility:hidden` อยู่ โฟกัสเลยค้าง พิมพ์อะไรก็ไม่ขึ้น
8. **SEO สองภาษาใช้ URL เดียว**: Google เห็นแค่ภาษาไทย

### 🟠 P1
- **ผลงานจมอยู่ลึก**: ต้องเลื่อนลงไป 4,474px (มือถือประมาณ 11 หน้าจอ) ส่วนโปรเจกต์เด่นอย่าง BKK Transit กลับอยู่ใบสุดท้าย
- **การ์ดผลงาน 18 ใบหน้าตาเหมือนกันหมด**: แต่ละใบมีข้อมูลซ้อนกันประมาณ 7 ชั้น ทำให้ Section ผลงานบนมือถือสูงถึง 10,282px
- **Hero**: ชื่อกินพื้นที่ 40% ด้านซ้าย อีก 60% ว่างเปล่า และพื้นหลังซ้อนกัน 4 ชั้นจนหม่น
- **ปุ่ม Back ทำงานผิด**: เปิดรายละเอียดโปรเจกต์แล้วกด Back กลายเป็นออกจากเว็บ (ใช้ `replaceState`) และกด Esc ครั้งเดียวปิดทั้ง lightbox และ sheet
- **ป้าย LIVE ผิด**: discord_rpc กับ bkk_transit ลิงก์ "Live" ไปที่ GitHub repo
- **วิดีโอ hero ขนาด 918KB โหลดทุกครั้ง**: `autoplay` ทำให้ `preload="none"` ไม่มีผล
- **แคนวาสอนุภาค (plexus)**: กิน main thread 75% เมื่อ CPU ถูก throttle 4× และยังทำงานต่อแม้เลื่อนผ่านไปแล้ว
- **render grid ด้วย innerHTML ทั้งก้อน**: เกิด long task ประมาณ 1 วินาทีบนมือถือ และ scroll handler บังคับ reflow ทุกเฟรม
- **ไฟล์ WebP 684 ไฟล์ (26MB) ไม่เคยถูกใช้**: gallery โหลดเฉพาะ JPG และมีภาพหนึ่งที่ไม่มี WebP เลย (ภาพยาวเกินลิมิต 16,383px ของ WebP)

### 🟡 P2
- ยังมีข้อความภาษาไทยค้างในโหมด EN (aria-label, title, footer) และมี "18 PROJECTS SHIPPED" เป็นภาษาอังกฤษค้างในโหมด TH
- ใช้ emoji เป็น bullet ของฟีเจอร์ (🛡️ ไปโผล่หน้า "Journey Planner")
- คำว่า WONGSATHORN ใน footer ถูกตัดขาด และปุ่ม back-to-top บังลิงก์
- `icons.css` หนัก 191KB เพราะเก็บ data-URI ไว้ซ้ำ 2 ชุด (`-webkit-` กับแบบปกติ)
- เอกสารไม่ตรงกับของจริง (บางที่บอก 16 โปรเจกต์, 78.5MB และอ้างถึงสคริปต์ที่ไม่มีอยู่)

---

## 3. สิ่งที่เก็บไว้ (Design DNA)

- **บันไดพื้นผิว** bg → bg-1 → bg-2 → bg-3 และ **สี accent เดียว** (ember `#FF5C38` / ธีมสว่าง `#B8401A`)
- **ลายเส้น blueprint**: grid 64px ที่ค่อยๆ จางเป็นวงกลม, มุม `ticks` และหัว Section แบบ "01 —"
- สเกลตัวอักษรแบบ fluid ด้วย `clamp()` และ easing `cubic-bezier(.16,1,.3,1)`
- ส่วนติดต่อแบบแถว label/value และไทล์ตัวเลขสถิติ

---

## 4. สิ่งที่ทำใน v2

### สถาปัตยกรรมใหม่
| เดิม | ใหม่ |
| :--- | :--- |
| `index.html` 58KB + JS render ทั้งหน้า | **Astro 7**: static HTML ทุกหน้า, ส่ง JS เฉพาะส่วนที่ต้องโต้ตอบ |
| `projects.js` (ไม่มี type) | **Content Collections + Zod**: ตรวจ schema ตอน build มีทั้งขนาดภาพจริงและ format |
| CSS เขียนมือ 53KB + icons.css 191KB | **Tailwind CSS v4** (`@theme` tokens, OKLCH) + **Iconify** inline เฉพาะไอคอนที่ใช้จริงตอน build |
| สลับภาษาด้วย JS ใน URL เดียว | **i18n routing**: `/` (TH) กับ `/en/` (EN) พร้อม hreflang, canonical และ og:locale |
| sheet/modal แบบ hash | **หน้าแยกต่อโปรเจกต์** `/projects/[slug]/` (36 หน้า) + View Transitions แบบ native |
| Google Fonts CDN | **Fontsource** self-host: Inter, Space Grotesk, **Anuphan** (หัวเรื่องไทย), IBM Plex Sans Thai, JetBrains Mono |
| lightbox เขียนเอง | **PhotoSwipe 5**: swipe, zoom, คีย์บอร์ด และรองรับวิดีโอ |
| ไม่มี CI | **GitHub Actions**: Biome lint → astro check → build → Playwright + axe → Lighthouse CI → deploy Pages |
| ไม่มี og:image | **OG image อัตโนมัติ** (satori) ทุกหน้า ทุกภาษา |

### UX ใหม่
- ลำดับ Section ใหม่: **Hero → ผลงาน → ทักษะ → เส้นทาง → เกี่ยวกับ → ติดต่อ**
- Hero บอกให้ชัดใน 5 วินาทีว่า "เป็นใคร และทำไมต้องจ้าง" พร้อมภาพผลงานเด่นจริง (แทนแคนวาส)
- ผลงานจัดเป็น **Bento** (โปรเจกต์เด่น) และ **รายการแบบ editorial** มีตัวกรองตามหมวด, ตามเทคโนโลยี (`?tech=`) และค้นหา (ซิงก์กับ URL)
- ทักษะเลิกใช้แถบ % แล้วแสดง "ใช้ใน N โปรเจกต์" ซึ่งคลิกไปกรองผลงานได้เลย
- **หน้า CV** (`/cv/`, `/en/cv/`) สั่ง Print/บันทึกเป็น PDF ได้ทันที
- Command Palette (⌘K / Ctrl K) สร้างบน `<dialog>` ค้นหาแบบไม่สนจุดและช่องว่าง ("nextjs" เจอ "Next.js") และมีคำสั่งลัด เช่น คัดลอกอีเมล สลับธีม สลับภาษา
- ปรับข้อความให้ตรงไปตรงมา ตัด claim ที่พิสูจน์ไม่ได้ออก

### มาตรฐานที่ CI บังคับไว้ (ต่อไปจะไม่มี claim ลอยๆ อีก)
- axe-core (WCAG 2.2 AA) ต้องเป็น **0 violations** ทั้งธีมมืด/สว่าง และ TH/EN
- Lighthouse budgets: Accessibility = 100, SEO = 100, Performance ≥ 90, CLS < 0.05, LCP < 2.5s
- ไม่มี request ที่ได้ 4xx/5xx และไม่มี console error

---

## 5. ข้อเสนอแนะต่อไป (ต้องให้เจ้าของเว็บทำเอง)
1. **ตั้งค่า GitHub Pages**: Settings → Pages → Source เลือก **"GitHub Actions"** (ต้องทำก่อน merge ไม่อย่างนั้นเว็บจะไม่ deploy)
2. **รูปโปรไฟล์จริง**: ถ้ามีรูป ใส่เพิ่มใน About ได้ (เวอร์ชันนี้ตัดช่องว่างออกไปแล้ว)
3. **ไฟล์ CV ฉบับทางการ**: ถ้ามีไฟล์ PDF ของตัวเอง วางไว้ที่ `public/cv.pdf` แล้วเปลี่ยนลิงก์ได้
4. **ขนาด repo**: media ยังหนักประมาณ 92MB ถ้าอยากให้ clone ได้เร็ว ควรย้ายไฟล์ต้นฉบับออกจาก git (เช่น Releases/R2) แล้วล้างประวัติด้วย `git filter-repo`
