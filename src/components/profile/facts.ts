/**
 * Biographical facts shared by Journey, About, Contact and the CV page.
 * Everything here is taken from the legacy site (index.html #about / #journey / #skills,
 * PORTFOLIO_DATA.md) — no new dates, no new claims.
 */
import type { Lang, Localized } from '@/i18n';
import type { Project } from '@/lib/projects';

/** The IT degree started in 2023 (legacy Journey + PORTFOLIO_DATA). */
export const START_YEAR = 2023;

/** Whole years building since START_YEAR, shown as "N+" (legacy stat said "3+"). */
export const yearsBuilding = (now = new Date()): number => Math.max(1, now.getFullYear() - START_YEAR);

export type JourneyKind = 'education' | 'projects' | 'now';

export interface JourneyEntry {
  year: number;
  kind: JourneyKind;
  title: Localized;
  body: Localized;
  /** Topics studied (education) — plain chips. */
  topics?: string[];
  /** Project ids built that year — rendered as links to their case studies. */
  projects?: string[];
}

export const JOURNEY: JourneyEntry[] = [
  {
    year: 2023,
    kind: 'education',
    title: {
      th: 'เข้าศึกษาปริญญาตรี สาขาเทคโนโลยีสารสนเทศ',
      en: 'Started the IT degree',
    },
    body: {
      th: 'วิศวกรรมซอฟต์แวร์ การออกแบบฐานข้อมูลเชิงสัมพันธ์ เครือข่ายคอมพิวเตอร์และการสื่อสารข้อมูล ระบบปฏิบัติการและระบบเสมือน',
      en: 'Software engineering fundamentals, relational database design, computer networks and data communication, operating systems and virtualization.',
    },
    topics: ['Software Engineering', 'Databases', 'Networking', 'OS'],
  },
  {
    year: 2024,
    kind: 'projects',
    title: { th: 'ระบบจริงชุดแรก', en: 'First real systems' },
    body: {
      th: 'ระบบ POS เว็บช้อปปิ้ง ระบบจองตั๋วโรงหนังพร้อมผังที่นั่ง และเว็บส่งเสริมการท่องเที่ยวชุมชน ควบคู่กับการเรียนเรื่อง Normalization, Indexing และโครงสร้างเซิร์ฟเวอร์',
      en: 'A POS system, a webshop clone, a cinema booking flow with a seat map and a community tourism site — alongside database normalization, indexing and server architecture in class.',
    },
    projects: ['pos', 'webshop', 'cinema', 'beach'],
  },
  {
    year: 2025,
    kind: 'projects',
    title: { th: 'ขึ้นชั้นปีที่ 3 — 3D, Wasm และเรียลไทม์', en: 'Third year — 3D, Wasm, real-time' },
    body: {
      th: 'งาน 3 มิติด้วย Three.js และ Metro Mini 3D ที่ย้ายแกนคำนวณตำแหน่งขบวนไปเขียนด้วย Rust แล้วคอมไพล์เป็น WebAssembly',
      en: 'Three.js scenes, and the Metro Mini 3D rail simulation with its train-position core written in Rust and compiled to WebAssembly.',
    },
    projects: ['metro3d', 'hbd', 'mangaverses'],
  },
  {
    year: 2026,
    kind: 'now',
    title: { th: 'AI, ซิสเต็มส์ และอีคอมเมิร์ซ — พร้อมรับงาน', en: 'AI, systems & commerce — open to work' },
    body: {
      th: 'BKK Transit, PRISM64 MCP, Discord Rich Presence Pro (Windows GSMTC), Khui AI ที่สตรีมคำตอบด้วย SSE, ฤดู · RUEDU และ ARÓM — ตอนนี้กำลังมองหาที่ฝึกงาน สหกิจ หรืองานประจำสาย Full-Stack / IT Support',
      en: 'BKK Transit, PRISM64 MCP, Discord Rich Presence Pro (Windows GSMTC), Khui AI with SSE streaming, RUEDU and ARÓM. Now looking for an internship, co-op placement or full-time role in full-stack or IT support.',
    },
    projects: ['bkk-transit', 'prism64', 'discord-rpc', 'khuiai', 'ruedu', 'arom-coffee'],
  },
];

export const KIND_LABEL: Record<JourneyKind, Localized> = {
  education: { th: 'การศึกษา', en: 'Education' },
  projects: { th: 'ผลงาน', en: 'Projects' },
  now: { th: 'ปัจจุบัน', en: 'Now' },
};

/** Education block (CV). */
export const EDUCATION = {
  degree: {
    th: 'ปริญญาตรี สาขาเทคโนโลยีสารสนเทศ (IT)',
    en: "Bachelor's degree, Information Technology",
  },
  period: { th: '2023 – ปัจจุบัน · ชั้นปีที่ 3', en: '2023 – present · 3rd year' },
  topics: {
    th: 'วิศวกรรมซอฟต์แวร์ · ฐานข้อมูลเชิงสัมพันธ์ (Normalization & Indexing) · เครือข่ายคอมพิวเตอร์และการสื่อสารข้อมูล · ระบบปฏิบัติการและระบบเสมือน',
    en: 'Software engineering · relational databases (normalization & indexing) · computer networks & data communication · operating systems & virtualization',
  },
} as const;

/** "How I work" — trimmed from the legacy four pillars, inflated claims removed. */
export const PRINCIPLES: { title: Localized; body: Localized }[] = [
  {
    title: { th: 'ครบทั้งระบบ', en: 'End to end' },
    body: {
      th: 'ออกแบบสคีมาฐานข้อมูล วาง REST / SSE API เขียนตรรกะฝั่งเซิร์ฟเวอร์ ต่อจนถึง UI — คนเดียว ระบบเดียว ต่อกันติด',
      en: 'Database schema, REST / SSE API design, server logic, then responsive UI — one person, one coherent system.',
    },
  },
  {
    title: { th: 'ประสิทธิภาพมาก่อน', en: 'Performance first' },
    body: {
      th: 'งานคำนวณหนักย้ายไป Rust คอมไพล์เป็น WebAssembly บน Web Worker — Metro Mini 3D รันได้ 60 FPS พร้อมเที่ยวรถ 8,193 เที่ยวต่อวัน',
      en: 'Heavy work moves to Rust compiled to WebAssembly on a Web Worker — Metro Mini 3D holds 60 FPS with 8,193 daily trips on screen.',
    },
  },
  {
    title: { th: 'ใช้ได้จริง ดูแลต่อได้', en: 'Usable, then maintainable' },
    body: {
      th: 'ใช้คีย์บอร์ดได้ครบ เคารพ prefers-reduced-motion ตามแนวทาง WCAG 2.1 AA — และด้วยพื้นฐาน Linux, Docker และเครือข่าย ส่งมอบแล้วผมดูแลให้รันต่อได้',
      en: 'Full keyboard paths and reduced-motion support, following WCAG 2.1 AA — and with Linux, Docker and networking, I keep it running after it ships.',
    },
  },
];

/** Skill groups for the CV (legacy #skills, without % meters or audit-score claims). */
export const SKILL_GROUPS: { name: Localized; items: string[] }[] = [
  {
    name: { th: 'Frontend', en: 'Frontend' },
    items: [
      'Next.js (App Router 14/16)',
      'React 19',
      'Angular',
      'Vite',
      'TypeScript',
      'JavaScript',
      'HTML5 / CSS',
      'Tailwind CSS',
      'shadcn/ui',
      'Three.js / WebGL',
      'MapLibre',
      'Rust → WebAssembly',
      'Web Workers',
      'PWA / Service Worker',
      'Web Audio API',
      'PDF.js',
      'WCAG 2.1 AA',
    ],
  },
  {
    name: { th: 'Backend และระบบ', en: 'Backend & systems' },
    items: [
      'Node.js / Express',
      'Python 3.12 / FastAPI',
      'PHP',
      'REST APIs',
      'Server-Sent Events',
      'WebSockets / WebRTC',
      'Model Context Protocol',
      'Windows WinRT · GSMTC',
      'Discord IPC',
      'Auth · JWT · sessions',
    ],
  },
  {
    name: { th: 'ฐานข้อมูล', en: 'Databases' },
    items: [
      'PostgreSQL',
      'MySQL / MariaDB',
      'SQLite',
      'Prisma',
      'Sequelize · PDO',
      'Redis',
      'Firebase',
      'Normalization & indexing',
      'Migrations & seeding',
    ],
  },
  {
    name: { th: 'DevOps และไอที', en: 'DevOps & IT' },
    items: [
      'Docker',
      'Git / GitHub',
      'GitHub Actions',
      'Linux (Ubuntu / Debian)',
      'Windows administration',
      'Bash / PowerShell',
      'Nginx · Cloudflare',
      'Networking & IT support',
      'Puppeteer',
    ],
  },
];

/** Tags that describe an approach rather than a technology. */
const NON_TECH = new Set([
  'systems architecture',
  'accessibility',
  'multiplayer',
  'game engine',
  'desktop app',
  'web scraping',
]);
const ALIAS: Record<string, string> = { 'tailwind css': 'tailwind' };

/** Distinct technologies across all project tags (versions merged, concepts dropped). */
export function countTechnologies(projects: Project[]): number {
  const set = new Set<string>();
  for (const p of projects) {
    for (const raw of p.data.tags) {
      const tag = raw
        .trim()
        .toLowerCase()
        .replace(/\s+\d+(\.\d+)*$/, '');
      if (NON_TECH.has(tag)) continue;
      set.add(ALIAS[tag] ?? tag);
    }
  }
  return set.size;
}

/** Short display name: "BKK Transit — Bangkok Open…" → "BKK Transit". */
export const shortTitle = (p: Project, lang: Lang): string => p.data.title[lang].split(' — ')[0]?.trim() ?? '';

/** Strip the few marketing adjectives the UX review flagged, wherever they still appear in data. */
export const tidy = (s: string): string =>
  s
    .replace(/\b[Aa]n enterprise-grade\b/g, 'A')
    .replace(/\benterprise-grade\s*/gi, '')
    .replace(/Windows Kernel\s*/g, 'Windows ')
    .replace(/\s{2,}/g, ' ');

/** Mailto subject (localized). */
export const MAIL_SUBJECT: Localized = {
  th: 'สนใจร่วมงานกับคุณวงศธร',
  en: 'Working together — from your portfolio',
};
