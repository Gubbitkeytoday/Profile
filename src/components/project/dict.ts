import type { Localized } from '@/i18n';
import type { ProjectCategory } from '@/lib/projects';

/** Strings shared by the project-detail components (server + lightbox client). */
export const dict = {
  th: {
    breadcrumb: 'เส้นทางนำทาง',
    home: 'หน้าแรก',
    work: 'ผลงาน',
    no: 'ผลงานที่',
    role: 'บทบาท',
    live: 'เปิดเว็บไซต์จริง',
    source: 'ดูซอร์สโค้ด',
    newTab: '(เปิดในแท็บใหม่)',
    cover: 'ภาพปกของ',
    metrics: 'ตัวเลขสำคัญ',
    highlights: 'ฟีเจอร์เด่น',
    highlightsLead: 'สิ่งที่โปรเจกต์นี้ทำได้ และโจทย์ทางเทคนิคที่แก้',
    facts: 'ข้อมูลโปรเจกต์',
    stack: 'เทคโนโลยีที่ใช้',
    stackFilter: 'ดูผลงานทั้งหมดที่ใช้',
    year: 'ปี',
    category: 'ประเภท',
    links: 'ลิงก์',
    repo: 'GitHub',
    gallery: 'แกลเลอรี',
    images: 'ภาพ',
    videos: 'วิดีโอ',
    screenshot: 'ภาพหน้าจอที่',
    video: 'วิดีโอสาธิตที่',
    fullPage: 'ภาพเต็มหน้า',
    videoBadge: 'วิดีโอ',
    more: 'ผลงานอื่น',
    prev: 'ผลงานก่อนหน้า',
    next: 'ผลงานถัดไป',
    back: 'กลับไปดูผลงานทั้งหมด',
    // Lightbox UI
    lbClose: 'ปิด (Esc)',
    lbZoom: 'ซูม',
    lbPrev: 'ภาพก่อนหน้า',
    lbNext: 'ภาพถัดไป',
    lbError: 'โหลดภาพไม่สำเร็จ',
    lbDialog: 'ภาพขยาย',
  },
  en: {
    breadcrumb: 'Breadcrumb',
    home: 'Home',
    work: 'Work',
    no: 'No.',
    role: 'Role',
    live: 'Live site',
    source: 'Source code',
    newTab: '(opens in a new tab)',
    cover: 'Cover image of',
    metrics: 'Key numbers',
    highlights: 'Highlights',
    highlightsLead: 'What it does, and the engineering problems it solves',
    facts: 'Project facts',
    stack: 'Built with',
    stackFilter: 'See all projects built with',
    year: 'Year',
    category: 'Category',
    links: 'Links',
    repo: 'GitHub',
    gallery: 'Gallery',
    images: 'images',
    videos: 'video',
    screenshot: 'screenshot',
    video: 'demo video',
    fullPage: 'Full-page capture',
    videoBadge: 'Video',
    more: 'More work',
    prev: 'Previous project',
    next: 'Next project',
    back: 'Back to all projects',
    lbClose: 'Close (Esc)',
    lbZoom: 'Zoom',
    lbPrev: 'Previous image',
    lbNext: 'Next image',
    lbError: 'The image could not be loaded',
    lbDialog: 'Image viewer',
  },
} as const satisfies Localized<Record<string, string>>;

/** Category labels — kept identical to the Work section filters. */
export const CATEGORY: Record<ProjectCategory, Localized> = {
  web: { th: 'เว็บแอปพลิเคชัน', en: 'Web app' },
  interactive: { th: 'อินเตอร์แอคทีฟ', en: 'Interactive' },
  app: { th: 'เดสก์ท็อป & ซิสเต็มส์', en: 'Desktop / Systems' },
};

/**
 * Split the "Label: detail" convention used by many feature strings.
 * Only splits on the first ASCII colon followed by whitespace (so "10:30" stays intact)
 * or a full-width colon, and only when the label is short enough to read as a heading.
 */
export function splitFeature(text: string): { label?: string; detail: string } {
  const m = /^([^:：]{2,80}?)\s*(?::\s+|：\s*)([\s\S]+)$/.exec(text.trim());
  if (!m?.[1] || !m[2]) return { detail: text.trim() };
  return { label: m[1].trim(), detail: m[2].trim() };
}

export const pad2 = (n: number): string => String(n).padStart(2, '0');
