/** Build-time helpers for the Work section (never shipped to the client). */
import type { Lang, Localized } from '@/i18n';
import { type IconName, tagIcon } from '@/lib/icons';
import type { Project } from '@/lib/projects';
import type { Category } from './shared';

/** Category labels are identical in the filter pills, the tiles and the rows. */
export const CATEGORY_META: Record<Category, { label: Localized; icon: IconName }> = {
  web: { label: { th: 'เว็บแอป', en: 'Web app' }, icon: 'lucide:globe' },
  interactive: { label: { th: 'อินเทอร์แอคทีฟ', en: 'Interactive' }, icon: 'lucide:mouse-pointer-click' },
  app: { label: { th: 'แอปเดสก์ท็อป', en: 'Desktop app' }, icon: 'lucide:app-window' },
};

export const categoryLabel = (c: Category, lang: Lang): string => CATEGORY_META[c].label[lang];

/**
 * Metrics shown on cards. Automated-audit scores ("0 axe violations") are not a
 * credible headline number (see reviews/ux.md), so they never become a chip.
 */
export const cardMetrics = (p: Project, max: number) =>
  p.data.metrics.filter((m) => !/axe|lighthouse/i.test(m.label.en)).slice(0, max);

/** Tags that have a real logo/glyph (not the generic fallback), one per icon. */
export const iconTags = (p: Project, max: number): { tag: string; icon: IconName }[] => {
  const seen = new Set<string>();
  const out: { tag: string; icon: IconName }[] = [];
  for (const tag of p.data.tags) {
    const icon = tagIcon(tag);
    if (icon === 'lucide:tag' || seen.has(icon)) continue;
    seen.add(icon);
    out.push({ tag, icon });
  }
  return out.slice(0, max);
};
