export const LANGS = ['th', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'th';

export type Localized<T = string> = Record<Lang, T>;

export const HTML_LANG: Record<Lang, string> = { th: 'th', en: 'en' };
export const OG_LOCALE: Record<Lang, string> = { th: 'th_TH', en: 'en_US' };

/** Pick the value for `lang` from a `{ th, en }` record. */
export const pick = <T>(value: Localized<T>, lang: Lang): T => value[lang];

/** Create a typed translator from a co-located `{ th: {...}, en: {...} }` dictionary. */
export function makeT<K extends string>(dict: Localized<Readonly<Record<K, string>>>, lang: Lang) {
  return (key: K): string => dict[lang][key] ?? dict[DEFAULT_LANG][key] ?? key;
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Build a site-internal URL for `lang`, honouring the GitHub Pages base path.
 * `path` is locale-agnostic, e.g. `/`, `/projects/metro3d/`, `#work`.
 */
export function href(lang: Lang, path = '/'): string {
  if (path.startsWith('#')) return `${href(lang, '/')}${path}`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  return `${base}${prefix}${clean}`;
}

/** URL for a file in /public (media, icons…). */
export const asset = (path: string): string => `${base}/${path.replace(/^\//, '')}`;

/** Strip base + locale prefix from a pathname, giving the locale-agnostic path. */
export function stripLocale(pathname: string): string {
  let p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  for (const l of LANGS) {
    if (l === DEFAULT_LANG) continue;
    if (p === `/${l}` || p.startsWith(`/${l}/`)) p = p.slice(l.length + 1);
  }
  return p || '/';
}

/** Section order on the home page (also the nav order). */
export const SECTIONS = ['work', 'skills', 'journey', 'about', 'contact'] as const;
export type SectionId = (typeof SECTIONS)[number];

/** Shared UI strings used by more than one component. */
export const ui = {
  th: {
    siteName: 'วงศธร ฉาบสีทอง',
    shortName: 'วงศธร ฉ.',
    role: 'Full-Stack Developer',
    skip: 'ข้ามไปยังเนื้อหา',
    navLabel: 'เมนูหลัก',
    about: 'เกี่ยวกับ',
    skills: 'ทักษะ',
    journey: 'เส้นทาง',
    work: 'ผลงาน',
    contact: 'ติดต่อ',
    home: 'หน้าแรก',
    search: 'ค้นหาเร็ว',
    themeToLight: 'สลับเป็นโหมดสว่าง',
    themeToDark: 'สลับเป็นโหมดมืด',
    language: 'เลือกภาษา',
    openMenu: 'เปิดเมนู',
    closeMenu: 'ปิดเมนู',
    close: 'ปิด',
    backToTop: 'กลับขึ้นด้านบน',
    viewProject: 'ดูรายละเอียด',
    sourceCode: 'ซอร์สโค้ด',
    liveDemo: 'เว็บไซต์จริง',
    allProjects: 'ผลงานทั้งหมด',
    cv: 'ดาวน์โหลด CV',
    cvLong: 'ดาวน์โหลด CV (PDF)',
  },
  en: {
    siteName: 'Wongsathorn Chapseethong',
    shortName: 'Wongsathorn C.',
    role: 'Full-Stack Developer',
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    about: 'About',
    skills: 'Skills',
    journey: 'Journey',
    work: 'Work',
    contact: 'Contact',
    home: 'Home',
    search: 'Quick search',
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    close: 'Close',
    backToTop: 'Back to top',
    viewProject: 'View details',
    sourceCode: 'Source code',
    liveDemo: 'Live site',
    allProjects: 'All projects',
    cv: 'Download CV',
    cvLong: 'Download CV (PDF)',
  },
} as const satisfies Localized<Record<string, string>>;

export const useUi = (lang: Lang) => makeT(ui, lang);
