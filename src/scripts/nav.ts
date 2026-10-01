/**
 * Site navigation: glass-on-scroll + hide-on-scroll-down header, scroll-spy,
 * mobile drawer (<dialog>), language links that keep the current #hash,
 * and the platform-aware ⌘K / Ctrl K hint.
 */
import { initTheme } from '@/scripts/theme';

const SCROLLED_AT = 8;
const HIDE_AFTER = 160;
const DELTA = 6;

function initHeader(header: HTMLElement): void {
  let lastY = window.scrollY;
  let ticking = false;
  let scrolled = false;
  let hidden = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const nextScrolled = y > SCROLLED_AT;
    if (nextScrolled !== scrolled) {
      scrolled = nextScrolled;
      header.toggleAttribute('data-scrolled', scrolled);
    }
    const delta = y - lastY;
    if (Math.abs(delta) < DELTA) return;
    const nextHidden = delta > 0 && y > HIDE_AFTER && !document.querySelector('dialog[open]');
    if (nextHidden !== hidden) {
      hidden = nextHidden;
      header.toggleAttribute('data-hidden', hidden);
    }
    lastY = y;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}

function initScrollSpy(): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-spy-link]')];
  const ids = [...new Set(links.map((a) => a.dataset.spyLink ?? ''))];
  const targets = ['home', ...ids].map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
  // Only on pages that actually contain the sections (i.e. the home page).
  if (!targets.some((el) => ids.includes(el.id)) || !('IntersectionObserver' in window)) return;

  const setActive = (id: string | null) => {
    for (const a of links) {
      if (a.dataset.spyLink === id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    }
  };

  // A thin band ~40% down the viewport: whichever section crosses it is "current".
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(ids.includes(entry.target.id) ? entry.target.id : null);
      }
    },
    { rootMargin: '-40% 0px -59% 0px' },
  );
  for (const el of targets) io.observe(el);
}

function initDrawer(): void {
  const drawer = document.querySelector<HTMLDialogElement>('dialog[data-drawer]');
  const opener = document.querySelector<HTMLButtonElement>('[data-drawer-open]');
  if (!drawer || !opener) return;

  const open = () => {
    if (drawer.open) return;
    drawer.showModal();
    opener.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    if (drawer.open) drawer.close();
  };

  opener.addEventListener('click', open);
  drawer.querySelector('[data-drawer-close]')?.addEventListener('click', close);

  drawer.addEventListener('close', () => {
    opener.setAttribute('aria-expanded', 'false');
    if (!drawer.dataset.navigating) opener.focus({ preventScroll: true });
    delete drawer.dataset.navigating;
  });

  drawer.addEventListener('click', (event) => {
    // Clicks on the ::backdrop target the <dialog> itself (the panel fills it).
    if (event.target === drawer) {
      close();
      return;
    }
    const link = (event.target as Element).closest('a[href]');
    if (link) {
      drawer.dataset.navigating = 'true';
      close();
    }
  });

  // Keep Tab / Shift+Tab cycling inside the open drawer.
  drawer.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusables = [...drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(
      (el) => el.offsetParent !== null,
    );
    const first = focusables[0];
    const last = focusables.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // Desktop layout has no burger: close the drawer if the viewport grows.
  matchMedia('(min-width: 64rem)').addEventListener('change', (event) => {
    if (event.matches) close();
  });
}

/** Language links keep the section the visitor is looking at. */
function initLangLinks(): void {
  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[data-lang-link]');
    if (!link || !location.hash) return;
    const url = new URL(link.href);
    url.hash = location.hash;
    link.href = url.href;
  });
}

export const isMac = (): boolean => {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  return /mac|iphone|ipad|ipod/i.test(nav.userAgentData?.platform ?? navigator.platform ?? '');
};

export function initNav(): void {
  const header = document.querySelector<HTMLElement>('[data-nav]');
  if (!header || header.dataset.ready) return;
  header.dataset.ready = 'true';

  initTheme();
  initHeader(header);
  initScrollSpy();
  initDrawer();
  initLangLinks();
  if (isMac()) for (const el of document.querySelectorAll('[data-kbd-mod]')) el.textContent = '⌘';
}
