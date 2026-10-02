/**
 * Work section — progressive enhancement over static markup:
 * category pills, tech select / chip, debounced search, URL sync, empty state,
 * and a floating cover preview on desktop hover. Toggles [hidden]; never re-renders.
 */
import { CATEGORIES, type Category, norm, techKey } from './shared';

type Cat = Category | 'all';
interface Item {
  el: HTMLLIElement;
  cat: Category;
  tech: string[];
  q: string;
}

const isCat = (v: string | null | undefined): v is Category => CATEGORIES.includes(v as Category);

function matchQuery(hay: string, raw: string): boolean {
  const whole = norm(raw);
  if (!whole || hay.includes(whole)) return true;
  const terms = raw.split(/\s+/).map(norm).filter(Boolean);
  return terms.length > 1 && terms.every((t) => hay.includes(t));
}

function init(root: HTMLElement): void {
  const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);
  const filters = q<HTMLElement>('[data-work-filters]');
  const select = q<HTMLSelectElement>('[data-tech-select]');
  const input = q<HTMLInputElement>('[data-q-input]');
  const featured = q<HTMLElement>('[data-featured-block]');
  const status = q<HTMLElement>('[data-status]');
  const empty = q<HTMLElement>('[data-empty]');
  const active = q<HTMLElement>('[data-active]');
  const chip = q<HTMLButtonElement>('[data-tech-chip]');
  const chipValue = q<HTMLElement>('[data-tech-chip-value]');
  const list = q<HTMLElement>('[data-list]');
  const indexEl = q<HTMLElement>('#work-index') ?? root;
  if (!filters || !select || !input) return;

  const pills = [...filters.querySelectorAll<HTMLButtonElement>('button[data-cat]')];
  const items: Item[] = [...root.querySelectorAll<HTMLLIElement>('[data-rows] > li')].map((el) => ({
    el,
    cat: (el.dataset.cat ?? 'web') as Category,
    tech: (el.dataset.tech ?? '').split(' '),
    q: el.dataset.q ?? '',
  }));
  const total = items.length;
  const tStatus = root.dataset.tStatus ?? '{x} / {n}';
  const tRemove = root.dataset.tRemove ?? '{t}';
  const tTech = root.dataset.tTech ?? '';

  const state: { cat: Cat; tech: string; q: string } = { cat: 'all', tech: '', q: '' };

  /** Reflect state.tech in the <select>, adding a one-off option for unknown values. */
  function syncSelect(): void {
    if (!select) return;
    for (const o of select.querySelectorAll('option[data-adhoc]')) o.remove();
    if (!state.tech) {
      select.value = '';
      return;
    }
    const key = techKey(state.tech);
    const match = [...select.options].find((o) => o.dataset.key === key);
    if (match) {
      state.tech = match.value;
      select.value = match.value;
      return;
    }
    const o = new Option(`${state.tech} (0)`, state.tech, true, true);
    o.dataset.adhoc = '';
    o.dataset.key = key;
    select.add(o);
  }

  function apply(keepBarInPlace = true): void {
    const key = state.tech ? techKey(state.tech) : '';
    const perCat: Record<Cat, number> = { all: 0, web: 0, interactive: 0, app: 0 };
    let shown = 0;
    for (const it of items) {
      const base = (!key || it.tech.includes(key)) && matchQuery(it.q, state.q);
      if (base) {
        perCat.all++;
        perCat[it.cat]++;
      }
      const ok = base && (state.cat === 'all' || it.cat === state.cat);
      it.el.hidden = !ok;
      if (ok) shown++;
    }

    for (const b of pills) {
      const c = (b.dataset.cat ?? 'all') as Cat;
      b.setAttribute('aria-pressed', String(c === state.cat));
      const n = b.querySelector('[data-count]');
      if (n) n.textContent = String(perCat[c] ?? 0);
    }

    const isActive = state.cat !== 'all' || !!state.tech || !!state.q.trim();

    // Featured bento is a curated overview; while filtering, results come first.
    // Keep the filter bar where the user's eyes (and pointer) are.
    if (featured && featured.hidden !== isActive && filters) {
      const before = filters.getBoundingClientRect().top;
      featured.hidden = isActive;
      const delta = filters.getBoundingClientRect().top - before;
      if (keepBarInPlace && delta && before > 0 && before < innerHeight) {
        window.scrollBy({ top: delta, behavior: 'instant' });
      }
    }

    if (chip && chipValue) {
      chip.hidden = !state.tech;
      chipValue.textContent = state.tech;
      chip.setAttribute('aria-label', tRemove.replace('{t}', `${tTech} ${state.tech}`.trim()));
    }
    if (active) active.hidden = !isActive;
    if (empty) empty.hidden = shown > 0;
    if (list) list.hidden = shown === 0;
    const text = tStatus.replace('{x}', String(shown)).replace('{n}', String(total));
    if (status && status.textContent !== text) status.textContent = text;
  }

  function syncUrl(): void {
    const u = new URL(location.href);
    for (const k of ['cat', 'tech', 'tag', 'q']) u.searchParams.delete(k);
    if (state.cat !== 'all') u.searchParams.set('cat', state.cat);
    if (state.tech) u.searchParams.set('tech', state.tech);
    if (state.q.trim()) u.searchParams.set('q', state.q.trim());
    if (u.search) u.hash = 'work';
    history.replaceState(history.state, '', u);
  }

  const update = () => {
    apply();
    syncUrl();
  };

  function reset(): void {
    state.cat = 'all';
    state.tech = '';
    state.q = '';
    if (input) input.value = '';
    syncSelect();
    update();
    input?.focus({ preventScroll: true });
  }

  for (const b of pills) {
    b.addEventListener('click', () => {
      const c = b.dataset.cat;
      state.cat = isCat(c) ? c : 'all';
      update();
    });
  }
  select.addEventListener('change', () => {
    state.tech = select.value;
    syncSelect();
    update();
  });
  let timer = 0;
  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      state.q = input.value;
      update();
    }, 120);
  });
  chip?.addEventListener('click', () => {
    state.tech = '';
    syncSelect();
    update();
    select.focus();
  });
  for (const b of root.querySelectorAll<HTMLButtonElement>('[data-clear]')) b.addEventListener('click', reset);

  // ---- initial state from the URL (?cat=&tech=&q=; ?tag= accepted as an alias)
  const params = new URLSearchParams(location.search);
  const rawCat = params.get('cat');
  state.cat = isCat(rawCat) ? rawCat : 'all';
  state.tech = (params.get('tech') ?? params.get('tag') ?? '').trim();
  state.q = (params.get('q') ?? '').trim();
  input.value = state.q;
  syncSelect();
  apply(false);
  if ((rawCat && !isCat(rawCat)) || params.has('tag')) syncUrl();
  if (state.tech || state.q) {
    requestAnimationFrame(() => indexEl.scrollIntoView({ block: 'start', behavior: 'instant' }));
  }

  initPreview(root, featured);
}

/** Floating cover that trails the pointer over the index (desktop, fine pointer only). */
function initPreview(root: HTMLElement, featured: HTMLElement | null): void {
  const list = root.querySelector<HTMLElement>('[data-list]');
  const box = root.querySelector<HTMLElement>('[data-preview]');
  if (!list || !box) return;
  const fine = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
  let img: HTMLImageElement | null = null;
  let current: HTMLLIElement | null = null;
  let raf = 0;

  const show = (li: HTMLLIElement, x?: number) => {
    if (!fine.matches) return;
    if (!img) {
      img = new Image();
      img.alt = '';
      img.decoding = 'async';
      img.sizes = '18rem';
      box.append(img);
    }
    if (current !== li) {
      current = li;
      img.srcset = li.dataset.coverSet ?? '';
      img.src = li.dataset.cover ?? '';
    }
    const w = list.clientWidth;
    const pw = box.offsetWidth;
    const px = x === undefined ? w * 0.56 : Math.min(Math.max(x + 32, 0), w - pw - 8);
    const set = () => {
      box.style.setProperty('--px', `${Math.round(px)}px`);
      box.style.setProperty('--py', `${Math.round(li.offsetTop + li.offsetHeight / 2)}px`);
    };
    if (box.dataset.show !== 'true') {
      box.dataset.snap = '';
      set();
      void box.offsetWidth;
      delete box.dataset.snap;
      box.dataset.show = 'true';
    } else set();
  };
  const hide = () => {
    box.dataset.show = 'false';
  };

  list.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const li = (e.target as Element).closest<HTMLLIElement>('li[data-id]');
    if (!li) return hide();
    const x = e.clientX - list.getBoundingClientRect().left;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => show(li, x));
  });
  list.addEventListener('pointerleave', () => {
    cancelAnimationFrame(raf);
    hide();
  });
  list.addEventListener('focusin', (e) => {
    const t = e.target as Element;
    const li = t.closest<HTMLLIElement>('li[data-id]');
    if (li && t.matches(':focus-visible')) show(li);
  });
  list.addEventListener('focusout', hide);

  // Signature move: the visible preview morphs into the project page hero.
  // Skip when the bento tile for the same project is on screen (names must be unique).
  list.addEventListener('click', (e) => {
    const li = (e.target as Element).closest<HTMLLIElement>('li[data-id]');
    if (!img || !li || li !== current || box.dataset.show !== 'true') return;
    if (li.hasAttribute('data-featured') && featured && !featured.hidden) return;
    img.style.viewTransitionName = `project-${li.dataset.id}`;
  });
  window.addEventListener('pageshow', () => {
    if (img) img.style.viewTransitionName = '';
    hide();
  });
}

const root = document.querySelector<HTMLElement>('[data-work]');
if (root && !root.dataset.ready) {
  root.dataset.ready = 'true';
  init(root);
}
