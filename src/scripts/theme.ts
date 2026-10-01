/**
 * Theme controls shared by the nav, the drawer and the command palette.
 *   <button data-theme-toggle data-to-light="…" data-to-dark="…">
 *     [<span data-theme-label></span>]   ← optional visible label
 *   </button>
 * Icon-only buttons get their aria-label swapped; buttons with a visible
 * [data-theme-label] get its text swapped (accessible name follows).
 */
import { currentTheme, setTheme } from '@/scripts/ui';

const THEME_COLOR = { dark: '#0b0c10', light: '#fafaf8' } as const;

export function toggleTheme(): void {
  setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

function sync(): void {
  const theme = currentTheme();
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    meta.content = THEME_COLOR[theme];
  }
  for (const btn of document.querySelectorAll<HTMLElement>('[data-theme-toggle]')) {
    const label = (theme === 'dark' ? btn.dataset.toLight : btn.dataset.toDark) ?? '';
    const visible = btn.querySelector<HTMLElement>('[data-theme-label]');
    if (visible) visible.textContent = label;
    else btn.setAttribute('aria-label', label);
    btn.title = label;
  }
}

let ready = false;

export function initTheme(): void {
  if (ready) return;
  ready = true;
  sync();
  document.addEventListener('themechange', sync);
  document.addEventListener('click', (event) => {
    const btn = (event.target as Element | null)?.closest?.('button[data-theme-toggle]');
    if (btn) toggleTheme();
  });
  // Follow the OS while the visitor has not made an explicit choice.
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('theme');
    } catch {}
    if (stored) return;
    document.documentElement.dataset.theme = event.matches ? 'light' : 'dark';
    sync();
  });
}
