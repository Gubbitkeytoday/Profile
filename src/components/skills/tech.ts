import { techKey } from '@/components/work/shared';
import type { Localized } from '@/i18n';
import type { IconName } from '@/lib/icons';
import type { Project } from '@/lib/projects';

/**
 * Counts use the Work section's own `techKey` (tech family: "Next.js 14" → "nextjs",
 * "Tailwind CSS" → "tailwind"), so a skill's number always equals what
 * `/?tech=<tag>#work` filters to.
 */
export const projectsUsing = (projects: readonly Project[], tech: string): Project[] => {
  const key = techKey(tech);
  return projects.filter((p) => p.data.tags.some((tag) => techKey(tag) === key));
};

export interface Skill {
  name: string | Localized;
  icon: IconName;
  /** Exact tag string from projects.json used as the `?tech=` value. Omit when no project carries it. */
  tech?: string;
}

export interface Domain {
  id: string;
  icon: IconName;
  size: 'lg' | 'sm';
  title: Localized;
  proof: Localized;
  /** Extra plain-text competencies without a project tag (e.g. IT support). */
  also?: Localized;
  skills: Skill[];
}

/** Core stack for the hero marquee (only tech that appears in project tags or legacy skills). */
export const MARQUEE: { name: string; icon: IconName }[] = [
  { name: 'Next.js', icon: 'simple-icons:nextdotjs' },
  { name: 'React', icon: 'simple-icons:react' },
  { name: 'TypeScript', icon: 'simple-icons:typescript' },
  { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
  { name: 'Three.js', icon: 'simple-icons:threedotjs' },
  { name: 'Rust', icon: 'simple-icons:rust' },
  { name: 'WebAssembly', icon: 'simple-icons:webassembly' },
  { name: 'Python', icon: 'simple-icons:python' },
  { name: 'FastAPI', icon: 'simple-icons:fastapi' },
  { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
  { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
  { name: 'Prisma', icon: 'simple-icons:prisma' },
  { name: 'SQLite', icon: 'simple-icons:sqlite' },
  { name: 'Docker', icon: 'simple-icons:docker' },
  { name: 'Linux', icon: 'simple-icons:linux' },
  { name: 'Git', icon: 'simple-icons:git' },
  { name: 'MCP', icon: 'simple-icons:modelcontextprotocol' },
];

export const DOMAINS: Domain[] = [
  {
    id: 'frontend',
    icon: 'lucide:monitor-smartphone',
    size: 'lg',
    title: { th: 'Frontend & 3D', en: 'Frontend & 3D' },
    proof: {
      th: 'ตั้งแต่เครือข่ายรถไฟ 3 มิติที่ลื่น 60 FPS ไปจนถึงหน้าร้านออนไลน์ที่ใช้คีย์บอร์ดได้ครบ',
      en: 'From a 60 FPS 3D rail network to storefronts you can use end to end with a keyboard.',
    },
    skills: [
      { name: 'Next.js', icon: 'simple-icons:nextdotjs', tech: 'Next.js' },
      { name: 'React', icon: 'simple-icons:react', tech: 'React' },
      { name: 'TypeScript', icon: 'simple-icons:typescript', tech: 'TypeScript' },
      { name: 'JavaScript', icon: 'simple-icons:javascript', tech: 'JavaScript' },
      { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss', tech: 'Tailwind' },
      { name: 'Three.js', icon: 'simple-icons:threedotjs', tech: 'Three.js' },
      { name: 'Angular', icon: 'simple-icons:angular', tech: 'Angular' },
      { name: 'shadcn/ui', icon: 'simple-icons:shadcnui', tech: 'shadcn/ui' },
      { name: 'MapLibre GL', icon: 'simple-icons:maplibre', tech: 'MapLibre GL' },
      { name: 'Leaflet', icon: 'simple-icons:leaflet', tech: 'Leaflet.js' },
      { name: 'PWA', icon: 'simple-icons:pwa', tech: 'PWA' },
      { name: { th: 'Accessibility', en: 'Accessibility' }, icon: 'lucide:accessibility', tech: 'Accessibility' },
    ],
  },
  {
    id: 'ai',
    icon: 'lucide:sparkles',
    size: 'sm',
    title: { th: 'AI & การเชื่อมต่อระบบ', en: 'AI & integrations' },
    proof: {
      th: 'ต่อระบบเข้ากับผู้ช่วย AI และ API ระดับเนทีฟ — MCP เซิร์ฟเวอร์ แชทสตรีมมิ่ง และสถานะสื่อบน Windows',
      en: 'Wiring systems into AI assistants and native APIs — MCP servers, streaming chat, Windows media sessions.',
    },
    skills: [
      { name: 'MCP', icon: 'simple-icons:modelcontextprotocol', tech: 'Gemini MCP' },
      { name: 'OpenAI API', icon: 'simple-icons:openai', tech: 'OpenAI API' },
      { name: 'Windows WinRT', icon: 'simple-icons:windows', tech: 'Windows WinRT' },
      { name: 'Discord IPC', icon: 'simple-icons:discord', tech: 'Discord IPC' },
      { name: 'GTFS', icon: 'lucide:bus', tech: 'GTFS' },
      { name: { th: 'Web Scraping', en: 'Web scraping' }, icon: 'simple-icons:puppeteer', tech: 'Web Scraping' },
      { name: 'PDF.js', icon: 'lucide:file-text', tech: 'PDF.js' },
      { name: 'Web Audio API', icon: 'lucide:headphones', tech: 'Web Audio API' },
    ],
  },
  {
    id: 'systems',
    icon: 'lucide:terminal',
    size: 'sm',
    title: { th: 'Systems, DevOps & IT', en: 'Systems, DevOps & IT' },
    proof: {
      th: 'ย้ายงานคำนวณหนักไป Rust/WebAssembly และดูแล Linux, Docker ให้ระบบรันต่อได้หลังส่งมอบ',
      en: 'Heavy compute moved to Rust/WebAssembly; Linux and Docker to keep things running after launch.',
    },
    also: {
      th: 'ซัพพอร์ต IT · แก้ปัญหาฮาร์ดแวร์/ซอฟต์แวร์ · ดูแล Windows · ระบบเครือข่าย',
      en: 'IT support · Hardware & software troubleshooting · Windows administration · Networking',
    },
    skills: [
      { name: 'Rust', icon: 'simple-icons:rust', tech: 'Rust' },
      { name: 'WebAssembly', icon: 'simple-icons:webassembly', tech: 'WebAssembly' },
      { name: 'Docker', icon: 'simple-icons:docker', tech: 'Docker' },
      { name: 'Linux', icon: 'simple-icons:linux' },
      { name: 'Git & GitHub', icon: 'simple-icons:git' },
      { name: 'GitHub Actions', icon: 'simple-icons:githubactions' },
      { name: 'Bash', icon: 'simple-icons:gnubash' },
      { name: 'Nginx', icon: 'simple-icons:nginx' },
    ],
  },
  {
    id: 'backend',
    icon: 'lucide:database',
    size: 'lg',
    title: { th: 'Backend & ข้อมูล', en: 'Backend & data' },
    proof: {
      th: 'ออกแบบสคีมา วาง REST / SSE API และเอนจินค้นหาเส้นทางที่ตอบคิวรี GTFS ภายใน 10 ms',
      en: 'Schemas, REST / SSE APIs and a routing engine that answers GTFS queries in under 10 ms.',
    },
    skills: [
      { name: 'Python', icon: 'simple-icons:python', tech: 'Python' },
      { name: 'FastAPI', icon: 'simple-icons:fastapi', tech: 'FastAPI' },
      { name: 'Node.js', icon: 'simple-icons:nodedotjs', tech: 'Node.js' },
      { name: 'Express', icon: 'simple-icons:express' },
      { name: 'PHP', icon: 'simple-icons:php', tech: 'PHP' },
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql', tech: 'PostgreSQL' },
      { name: 'MySQL', icon: 'simple-icons:mysql', tech: 'MySQL' },
      { name: 'SQLite', icon: 'simple-icons:sqlite', tech: 'SQLite' },
      { name: 'Prisma', icon: 'simple-icons:prisma', tech: 'Prisma' },
      { name: 'Firebase', icon: 'simple-icons:firebase', tech: 'Firebase' },
      { name: 'SSE & WebSocket', icon: 'lucide:radio' },
      { name: 'JWT & sessions', icon: 'simple-icons:jsonwebtokens' },
    ],
  },
];
