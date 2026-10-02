/**
 * Command palette — native <dialog> + ARIA combobox/listbox.
 * Opens with ⌘K / Ctrl+K, "/" (when not typing) or any [data-cmdk-open] button.
 * Options are rendered at build time; this script only filters, ranks and activates them.
 */
import { tokens } from '@/scripts/search';
import { toggleTheme } from '@/scripts/theme';
import { copyText } from '@/scripts/ui';

const isTyping = (el: EventTarget | null): boolean =>
  el instanceof HTMLElement &&
  (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.closest('[contenteditable]') !== null);

export function initPalette(): void {
  const dialog = document.querySelector<HTMLDialogElement>('dialog[data-cmdk]');
  if (!dialog || dialog.dataset.ready) return;
  dialog.dataset.ready = 'true';

  const input = dialog.querySelector<HTMLInputElement>('[data-cmdk-input]');
  const list = dialog.querySelector<HTMLElement>('[data-cmdk-list]');
  const empty = dialog.querySelector<HTMLElement>('[data-cmdk-empty]');
  const emptyText = dialog.querySelector<HTMLElement>('[data-cmdk-empty-text]');
  const status = dialog.querySelector<HTMLElement>('[data-cmdk-status]');
  if (!input || !list || !empty || !emptyText || !status) return;

  const groups = [...dialog.querySelectorAll<HTMLElement>('[data-cmdk-group]')].map((el) => {
    const container = el.querySelector<HTMLElement>('[data-cmdk-options]') ?? el;
    return { el, container, options: [...container.querySelectorAll<HTMLElement>('[data-cmdk-opt]')] };
  });
  const { copied = '', email = '', countOne = '', countMany = '', empty: emptyTpl = '' } = dialog.dataset;

  let visible: HTMLElement[] = [];
  let active = -1;
  let opener: HTMLElement | null = null;
  let announceTimer: number | undefined;

  const setActive = (index: number, scroll = true) => {
    const prev = visible[active];
    if (prev) prev.setAttribute('aria-selected', 'false');
    active = visible.length ? (index + visible.length) % visible.length : -1;
    const next = visible[active];
    if (next) {
      next.setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', next.id);
      if (scroll) next.scrollIntoView({ block: 'nearest' });
    } else {
      input.setAttribute('aria-activedescendant', '');
    }
  };

  const announce = (count: number) => {
    window.clearTimeout(announceTimer);
    announceTimer = window.setTimeout(() => {
      status.textContent = count === 1 ? countOne : countMany.replace('{n}', String(count));
    }, 350);
  };

  const filter = () => {
    const raw = input.value;
    const words = tokens(raw);
    visible = [];
    for (const group of groups) {
      const scored: { el: HTMLElement; score: number; order: number }[] = [];
      group.options.forEach((el, order) => {
        el.setAttribute('aria-selected', 'false');
        const key = el.dataset.key ?? '';
        const title = el.dataset.titleKey ?? '';
        const match = words.every((w) => key.includes(w));
        el.hidden = !match;
        if (!match) return;
        let score = 0;
        if (words.length) {
          const joined = words.join('');
          if (title.startsWith(joined)) score = 3;
          else if (title.includes(joined)) score = 2;
          else if (words.every((w) => title.includes(w))) score = 1;
        }
        scored.push({ el, score, order });
      });
      scored.sort((a, b) => b.score - a.score || a.order - b.order);
      // Keep DOM order == visual order == arrow-key order.
      for (const { el } of scored) group.container.append(el);
      group.el.hidden = scored.length === 0;
      visible.push(...scored.map((s) => s.el));
    }
    const none = visible.length === 0;
    empty.hidden = !none;
    emptyText.textContent = emptyTpl.replace('{q}', raw.trim());
    input.setAttribute('aria-expanded', String(!none));
    active = -1;
    setActive(0, false);
    list.scrollTop = 0;
    announce(visible.length);
  };

  const open = () => {
    for (const other of document.querySelectorAll<HTMLDialogElement>('dialog[open]')) {
      if (other !== dialog) other.close();
    }
    if (dialog.open) return;
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    input.value = '';
    filter();
    dialog.showModal();
    input.focus();
    requestAnimationFrame(() => input.focus());
  };

  const close = () => {
    if (dialog.open) dialog.close();
  };

  dialog.addEventListener('close', () => {
    window.clearTimeout(announceTimer);
    status.textContent = '';
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  });

  const activate = (el: HTMLElement | undefined) => {
    if (!el) return;
    const { action, href, external, keepHash } = el.dataset;
    close();
    if (action === 'copy') {
      void copyText(email, `${copied}: ${email}`);
    } else if (action === 'theme') {
      toggleTheme();
    } else if (href) {
      if (external) window.open(href, '_blank', 'noopener,noreferrer');
      else location.assign(keepHash && location.hash ? `${href}${location.hash}` : href);
    }
  };

  input.addEventListener('input', filter);
  input.addEventListener('keydown', (event) => {
    if (event.isComposing) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActive(active + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActive(active - 1);
        break;
      case 'Home':
        event.preventDefault();
        setActive(0);
        break;
      case 'End':
        event.preventDefault();
        setActive(visible.length - 1);
        break;
      case 'Enter':
        event.preventDefault();
        activate(visible[active]);
        break;
    }
  });

  list.addEventListener('pointermove', (event) => {
    const el = (event.target as Element).closest<HTMLElement>('[data-cmdk-opt]');
    if (!el) return;
    const index = visible.indexOf(el);
    if (index !== -1 && index !== active) setActive(index, false);
  });
  // Keep focus in the input while clicking options.
  list.addEventListener('mousedown', (event) => event.preventDefault());
  list.addEventListener('click', (event) => {
    const el = (event.target as Element).closest<HTMLElement>('[data-cmdk-opt]');
    if (el) activate(el);
  });

  dialog.querySelector('[data-cmdk-close]')?.addEventListener('click', close);
  // Backdrop click: the panel fills the dialog, so only ::backdrop clicks target it.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest?.('[data-cmdk-open]');
    if (!trigger) return;
    event.preventDefault();
    open();
  });

  document.addEventListener('keydown', (event) => {
    if (event.isComposing || event.defaultPrevented) return;
    if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (dialog.open) close();
      else open();
      return;
    }
    if (
      event.key === '/' &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !isTyping(event.target) &&
      !document.querySelector('dialog[open]')
    ) {
      event.preventDefault();
      open();
    }
  });
}
