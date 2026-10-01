/**
 * Footer behaviours: live © year, and the back-to-top button.
 * The progress ring is a CSS scroll-driven animation; browsers without
 * `animation-timeline` get a rAF-throttled custom property (reads only scrollY).
 */
import { prefersReducedMotion } from '@/scripts/ui';

function initBackToTop(): void {
  const btn = document.querySelector<HTMLButtonElement>('[data-totop]');
  const sentinel = document.querySelector<HTMLElement>('[data-totop-sentinel]');
  const footer = document.querySelector<HTMLElement>('[data-footer]');
  if (!btn || !sentinel || !('IntersectionObserver' in window)) return;

  let pastFold = false;
  let footerVisible = false;
  const render = () => btn.toggleAttribute('data-show', pastFold && !footerVisible);

  // Visible once the first viewport has scrolled away…
  new IntersectionObserver(([entry]) => {
    if (!entry) return;
    pastFold = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    render();
  }).observe(sentinel);

  // …and hidden while the footer (which has its own "back to top" link) is on screen,
  // so the floating button never covers footer links.
  if (footer) {
    new IntersectionObserver(([entry]) => {
      footerVisible = !!entry?.isIntersecting;
      render();
    }).observe(footer);
  }

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    document.querySelector<HTMLElement>('[data-brand]')?.focus({ preventScroll: true });
  });

  if (!CSS.supports('animation-timeline: scroll()')) {
    let max = 1;
    let ticking = false;
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    const paint = () => {
      ticking = false;
      btn.style.setProperty('--progress', String(Math.min(1, window.scrollY / max)));
    };
    measure();
    new ResizeObserver(measure).observe(document.body);
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(paint);
      },
      { passive: true },
    );
    paint();
  }
}

export function initFooter(): void {
  const footer = document.querySelector<HTMLElement>('[data-footer]');
  if (!footer || footer.dataset.ready) return;
  footer.dataset.ready = 'true';

  const year = String(new Date().getFullYear());
  for (const el of document.querySelectorAll('[data-year]')) el.textContent = year;
  initBackToTop();
}
