/**
 * Project gallery lightbox — PhotoSwipe 5, progressively enhancing plain links.
 * Without JS every thumbnail is a link to its largest file.
 */
import 'photoswipe/style.css';
import './lightbox.css';
import type { SlideData } from 'photoswipe';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

interface Strings {
  close: string;
  zoom: string;
  prev: string;
  next: string;
  error: string;
}

const reducedMotion = (): boolean => matchMedia('(prefers-reduced-motion: reduce)').matches;

const videoOf = (el: HTMLElement | null | undefined): HTMLVideoElement | null => el?.querySelector('video') ?? null;

export function initGallery(root: HTMLElement): void {
  if (root.dataset.lightbox === 'ready') return;
  root.dataset.lightbox = 'ready';

  const s: Strings = {
    close: 'Close',
    zoom: 'Zoom',
    prev: 'Previous',
    next: 'Next',
    error: 'The image cannot be loaded',
  };
  try {
    Object.assign(s, JSON.parse(root.dataset.strings ?? '{}') as Partial<Strings>);
  } catch {
    /* keep the English defaults */
  }

  const lightbox = new PhotoSwipeLightbox({
    gallery: root,
    children: 'a[data-pswp-width]',
    pswpModule: () => import('photoswipe'),
    showHideAnimationType: reducedMotion() ? 'none' : 'zoom',
    bgOpacity: 1,
    wheelToZoom: false,
    closeTitle: s.close,
    zoomTitle: s.zoom,
    arrowPrevTitle: s.prev,
    arrowNextTitle: s.next,
    errorMsg: s.error,
    indexIndicatorSep: ' / ',
    paddingFn: (viewport) =>
      viewport.x < 640 ? { top: 56, bottom: 64, left: 0, right: 0 } : { top: 64, bottom: 80, left: 72, right: 72 },
    // Full-page captures open at "fit width" (readable) and pan vertically; a click shows the whole page.
    initialZoomLevel: (zl) =>
      zl.itemData.tall && zl.panAreaSize && zl.elementSize ? Math.min(1, zl.panAreaSize.x / zl.elementSize.x) : zl.fit,
    secondaryZoomLevel: (zl) => (zl.itemData.tall ? zl.fit : 0),
    maxZoomLevel: (zl) => (zl.itemData.tall ? Math.max(1, zl.fit * 4) : 0),
  });

  // Extra per-item data carried on the link.
  lightbox.addFilter('domItemData', (data: SlideData, _el: HTMLElement, link: HTMLAnchorElement) => {
    data.caption = link.dataset.caption ?? '';
    data.tall = link.dataset.tall === '1';
    data.poster = link.dataset.poster;
    return data;
  });

  // Start full-page captures at the top of the page, not the middle.
  lightbox.on('initialZoomPan', ({ slide }) => {
    // PhotoSwipe names the top-aligned position `min` (pan.y grows downwards).
    if (slide.data.tall && slide.bounds) slide.pan.y = slide.bounds.min.y;
  });

  // Custom content type: native <video controls playsinline poster>.
  lightbox.on('contentLoad', (e) => {
    const { content } = e;
    if (content.type !== 'video') return;
    e.preventDefault();
    const wrap = document.createElement('div');
    wrap.className = 'pswp__video';
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = content.data.src ?? '';
    const poster = content.data.poster ?? content.data.msrc;
    if (poster) video.poster = poster;
    video.setAttribute('aria-label', content.data.alt ?? '');
    // Let the native controls receive taps/drags instead of PhotoSwipe's gestures.
    video.addEventListener('pointerdown', (ev) => ev.stopPropagation());
    wrap.append(video);
    content.element = wrap;
  });

  const pauseInactive = (): void => {
    const pswp = lightbox.pswp;
    if (!pswp) return;
    const current = pswp.currSlide?.container;
    for (const v of pswp.element?.querySelectorAll('video') ?? []) {
      if (!current?.contains(v)) v.pause();
    }
  };

  lightbox.on('change', pauseInactive);
  lightbox.on('contentDeactivate', ({ content }) => videoOf(content.element)?.pause());
  // Muted preview only (never autoplay with sound); controls are always visible. Off for reduced motion.
  lightbox.on('contentActivate', ({ content }) => {
    const video = videoOf(content.element);
    if (content.type !== 'video' || !video || reducedMotion() || video.dataset.started) return;
    video.dataset.started = '1';
    video.muted = true;
    video.play().catch(() => {
      /* autoplay refused — controls remain */
    });
  });
  lightbox.on('close', () => {
    for (const v of lightbox.pswp?.element?.querySelectorAll('video') ?? []) v.pause();
  });

  // Arrow keys on a focused <video> seek it rather than changing slides.
  lightbox.on('keydown', (e) => {
    const { originalEvent } = e;
    if (
      originalEvent.target instanceof HTMLVideoElement &&
      (originalEvent.key === 'ArrowLeft' || originalEvent.key === 'ArrowRight')
    ) {
      e.preventDefault();
    }
  });

  // Caption: "<title> — n/total" (never a filename).
  lightbox.on('uiRegister', () => {
    lightbox.pswp?.ui?.registerElement({
      name: 'caption',
      className: 'pswp__caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      html: '',
      onInit: (el, pswp) => {
        el.setAttribute('aria-live', 'polite');
        pswp.on('change', () => {
          el.textContent = String(pswp.currSlide?.data.caption ?? '');
        });
      },
    });
  });

  // PhotoSwipe's root is role="dialog" but unnamed and not modal by default.
  lightbox.on('afterInit', () => {
    const el = lightbox.pswp?.element;
    if (!el) return;
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', root.dataset.galleryLabel || document.title);
  });

  lightbox.init();
}

const boot = (): void => {
  for (const el of document.querySelectorAll<HTMLElement>('[data-gallery]')) initGallery(el);
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
