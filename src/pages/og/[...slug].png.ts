/**
 * Build-time Open Graph images (1200×630 PNG) rendered with satori → sharp.
 *
 * Emits `og/home-{th,en}.png` and `og/<projectId>-{th,en}.png`, matching the
 * `og/${ogImage}-${lang}.png` URL that src/layouts/Base.astro links.
 *
 * Satori cannot read WOFF2, so the static `@fontsource/*` packages (which also
 * ship WOFF) are used here instead of the variable ones the site loads.
 */
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { LANGS, type Lang } from '@/i18n';
import { PROFILE } from '@/lib/profile';
import { getProjects, type Project } from '@/lib/projects';

const W = 1200;
const H = 630;
const C = {
  bg: '#0b0c10',
  panel: '#12141a',
  fg: '#f2f3f5',
  fg2: '#b4b8c2',
  fg3: '#7d828e',
  line: 'rgba(255,255,255,0.10)',
  grid: 'rgba(255,255,255,0.045)',
  accent: '#ff5c38',
};
const URL_LABEL = 'gubbitkeytoday.github.io/Profile';

// ── tiny hyperscript for satori's React-element-shaped input ────────────────
type Style = Record<string, string | number>;
type Child = Node | string | null | false | undefined;
interface Node {
  type: string;
  key: null;
  props: { style?: Style; children?: Child | Child[]; src?: string; width?: number; height?: number };
}
const h = (type: string, style: Style, ...children: Child[]): Node => {
  const kids = children.filter(Boolean);
  return { type, key: null, props: { style, children: kids.length > 1 ? kids : kids[0] } };
};
const img = (src: string, width: number, height: number, style: Style = {}): Node => ({
  type: 'img',
  key: null,
  props: { src, width, height, style: { width, height, ...style } },
});

// ── fonts (loaded once per build) ───────────────────────────────────────────
const require = createRequire(import.meta.url);
const fontFile = (pkg: string, file: string) => readFile(require.resolve(`${pkg}/files/${file}`));

type FontWeight = 500 | 700;
let fontsPromise: Promise<{ name: string; data: Buffer; weight: FontWeight; style: 'normal' }[]> | undefined;
const loadFonts = () => {
  fontsPromise ??= Promise.all(
    (
      [
        ['Space Grotesk', '@fontsource/space-grotesk', 'space-grotesk-latin-500-normal.woff', 500],
        ['Space Grotesk', '@fontsource/space-grotesk', 'space-grotesk-latin-700-normal.woff', 700],
        ['Anuphan', '@fontsource/anuphan', 'anuphan-thai-500-normal.woff', 500],
        ['Anuphan', '@fontsource/anuphan', 'anuphan-thai-700-normal.woff', 700],
        ['Anuphan', '@fontsource/anuphan', 'anuphan-latin-500-normal.woff', 500],
        ['Anuphan', '@fontsource/anuphan', 'anuphan-latin-700-normal.woff', 700],
      ] as const
    ).map(async ([name, pkg, file, weight]) => ({
      name,
      data: await fontFile(pkg, file),
      weight,
      style: 'normal' as const,
    })),
  );
  return fontsPromise;
};

// ── cover image → cropped JPEG data URL ─────────────────────────────────────
const PUBLIC = fileURLToPath(new URL('../../../public/', import.meta.url));
const COVER_W = 440;
const COVER_H = 420;

async function coverDataUrl(p: Project): Promise<string | null> {
  const { path, widths } = p.data.cover;
  const w = widths.includes(960) ? 960 : Math.max(...widths);
  try {
    const buf = await sharp(`${PUBLIC}${path}-${w}.webp`)
      .resize(COVER_W, COVER_H, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    return `data:image/jpeg;base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
}

// ── shared pieces ───────────────────────────────────────────────────────────
const THAI = /\p{Script=Thai}/u;
const isThai = (s: string) => THAI.test(s);
const family = (s: string) => (isThai(s) ? 'Anuphan' : 'Space Grotesk, Anuphan');

/** Thai has no spaces between words: insert zero-width spaces at word boundaries so satori can wrap lines. */
const ZWSP = String.fromCharCode(0x200b);
const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
const wrapThai = (s: string) =>
  isThai(s) ? Array.from(segmenter.segment(s), ({ segment }) => segment).join(ZWSP) : s;

/** A text block: picks the right font for the script and makes Thai wrappable. */
const text = (value: string, style: Style = {}) =>
  h('div', { display: 'flex', fontFamily: family(value), ...style }, wrapThai(value));

const GLOW = `data:image/svg+xml;base64,${Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900"><defs><radialGradient id="g">' +
    '<stop offset="0" stop-color="#ff5c38" stop-opacity=".30"/><stop offset=".5" stop-color="#ff5c38" stop-opacity=".08"/>' +
    '<stop offset="1" stop-color="#ff5c38" stop-opacity="0"/></radialGradient></defs><rect width="900" height="900" fill="url(#g)"/></svg>',
).toString('base64')}`;

const frame = (...children: Child[]) =>
  h(
    'div',
    {
      width: W,
      height: H,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: C.bg,
      backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
      color: C.fg,
      fontFamily: 'Space Grotesk, Anuphan',
      padding: '60px 64px 48px 72px',
    },
    // ember glow (an SVG radial gradient: satori's CSS radial-gradient sizing is limited)
    img(GLOW, 900, 900, { position: 'absolute', top: -420, right: -320 }),
    // accent rail
    h('div', { position: 'absolute', left: 0, top: 0, width: 8, height: H, backgroundColor: C.accent }),
    ...children,
  );

const eyebrow = (value: string) =>
  h(
    'div',
    { display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 500, color: C.accent },
    h('div', { width: 36, height: 3, backgroundColor: C.accent }),
    text(value),
  );

const chip = (value: string, label: string) =>
  h(
    'div',
    {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      padding: '9px 18px',
      borderRadius: 999,
      border: `1px solid ${C.line}`,
      backgroundColor: 'rgba(255,255,255,0.04)',
      fontSize: 21,
    },
    value ? text(value, { fontWeight: 700, color: C.fg }) : null,
    text(label, { fontWeight: 500, color: C.fg2 }),
  );

const footer = (lang: Lang) =>
  h(
    'div',
    {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
      paddingTop: 22,
      borderTop: `1px solid ${C.line}`,
      fontSize: 22,
      color: C.fg3,
    },
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 12 },
      h('div', { width: 12, height: 12, borderRadius: 12, backgroundColor: C.accent }),
      text(PROFILE.name[lang]),
    ),
    text(URL_LABEL, { fontWeight: 500, color: C.fg2 }),
  );

/** Scale long titles down so they fit in ≤3 lines of the text column. */
const titleSize = (s: string) => {
  const n = s.length;
  if (n <= 16) return 72;
  if (n <= 26) return 60;
  if (n <= 40) return 50;
  return 42;
};

// ── templates ───────────────────────────────────────────────────────────────
const homeCopy = {
  th: {
    eyebrow: 'พอร์ตโฟลิโอ · Full-Stack Developer',
    lead: 'สร้างเว็บและระบบที่ใช้งานได้จริง ตั้งแต่ฐานข้อมูลจนถึงหน้าจอ',
    projects: 'โปรเจกต์',
    location: PROFILE.location.th,
  },
  en: {
    eyebrow: 'Portfolio · Full-Stack Developer',
    lead: 'Shipping real products end to end — from database to pixels.',
    projects: 'projects',
    location: PROFILE.location.en,
  },
} as const;

function homeCard(lang: Lang, count: number) {
  const t = homeCopy[lang];
  const th = lang === 'th';
  return frame(
    eyebrow(t.eyebrow),
    text(PROFILE.name[lang], {
      marginTop: 36,
      fontSize: th ? 104 : 92,
      fontWeight: 700,
      lineHeight: th ? 1.25 : 1.02,
      letterSpacing: th ? 0 : -2,
      maxWidth: 1000,
    }),
    text(t.lead, { marginTop: 20, fontSize: 32, fontWeight: 500, color: C.fg2, maxWidth: 900, lineHeight: 1.4 }),
    h(
      'div',
      { display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' },
      chip(String(count), t.projects),
      chip('Next.js', 'React · TS'),
      chip('Rust', 'Wasm'),
      chip('3D', 'Three.js'),
      chip('', t.location),
    ),
    footer(lang),
  );
}

const CATEGORY: Record<Project['data']['category'], Record<Lang, string>> = {
  web: { th: 'เว็บแอป', en: 'Web' },
  interactive: { th: 'อินเทอร์แอกทีฟ', en: 'Interactive' },
  app: { th: 'แอปพลิเคชัน', en: 'App' },
};

function projectCard(p: Project, lang: Lang, cover: string | null) {
  const d = p.data;
  const title = d.title[lang];
  const thaiTitle = isThai(title);
  const kicker = `${lang === 'th' ? 'ผลงาน' : 'Project'} · ${CATEGORY[d.category][lang]} · ${d.year}`;
  return frame(
    h(
      'div',
      { display: 'flex', flexGrow: 1, gap: 40, paddingBottom: 28 },
      h(
        'div',
        { display: 'flex', flexDirection: 'column', flexGrow: 1, flexShrink: 1, width: cover ? 584 : 1064 },
        eyebrow(kicker),
        text(title, {
          marginTop: 26,
          fontSize: titleSize(title),
          fontWeight: 700,
          lineHeight: thaiTitle ? 1.28 : 1.06,
          letterSpacing: thaiTitle ? 0 : -1.5,
          lineClamp: 3,
        }),
        text(d.role[lang], { marginTop: 16, fontSize: 22, fontWeight: 500, color: C.fg2, lineHeight: 1.45, lineClamp: 2 }),
        h(
          'div',
          { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 'auto', paddingTop: 20 },
          ...d.metrics.slice(0, 3).map((m) => chip(m.value, m.label[lang])),
        ),
      ),
      cover
        ? h(
            'div',
            {
              display: 'flex',
              flexShrink: 0,
              width: COVER_W,
              height: COVER_H,
              borderRadius: 20,
              border: `1px solid ${C.line}`,
              overflow: 'hidden',
              backgroundColor: C.panel,
              boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
            },
            img(cover, COVER_W, COVER_H),
          )
        : null,
    ),
    footer(lang),
  );
}

// ── route ───────────────────────────────────────────────────────────────────
interface Props {
  lang: Lang;
  project?: Project;
}

export const getStaticPaths = (async () => {
  const projects = await getProjects();
  return LANGS.flatMap((lang) => [
    { params: { slug: `home-${lang}` }, props: { lang } },
    ...projects.map((project) => ({ params: { slug: `${project.id}-${lang}` }, props: { lang, project } })),
  ]);
}) satisfies GetStaticPaths;

export const GET: APIRoute<Props> = async ({ props }) => {
  const { lang, project } = props;
  const fonts = await loadFonts();
  const tree = project
    ? projectCard(project, lang, await coverDataUrl(project))
    : homeCard(lang, (await getProjects()).length);
  // biome-ignore lint/suspicious/noExplicitAny: satori expects a ReactNode; our plain object tree is structurally identical.
  const svg = await satori(tree as any, { width: W, height: H, fonts });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: false }).toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
