/* ==========================================================================
   WONGSATHORN CHAPSEETHONG — Portfolio
   main.js · no dependencies, no build step

   Theme · Lang · Loader · Nav · Drawer · SpyNav · Reveal · BgFX · Marquee
   Projects · Sheet · Lightbox · CmdK · Copy · ToTop · Photo · Toast
   ========================================================================== */
(() => {
  'use strict';

  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => RM.matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const on = (el, ev, fn, o) => el && el.addEventListener(ev, fn, o);
  const raf = requestAnimationFrame.bind(window);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };
  const PROJECTS = window.PF_PROJECTS || [];
  /* file:// throws SecurityError on history.replaceState — never let URL
     bookkeeping take the page down when opened by double-click. */
  const setURL = (u) => { try { history.replaceState(null, '', u); } catch { /* file:// */ } };
  /* some source images are narrower than 480px — optimise.py then emits only
     their native width, so never hard-code a width that may not exist. */
  const wSmall = (g) => (g && g.w && g.w.length ? g.w[0] : 480);
  const wBig = (g) => (g && g.w && g.w.length ? g.w[g.w.length - 1] : 480);

  /* ============================================================== THEME */
  const Theme = (() => {
    const KEY = 'pf.theme';
    const apply = (t) => {
      document.documentElement.setAttribute('data-theme', t);
      const m = $('meta[name="theme-color"]');
      if (m) m.setAttribute('content', t === 'light' ? '#F7F7F5' : '#07080B');
      $$('[data-theme-btn]').forEach((b) => b.setAttribute('aria-label',
        t === 'light' ? 'สลับเป็นโหมดมืด' : 'สลับเป็นโหมดสว่าง'));
    };
    const init = () => {
      const saved = store.get(KEY, null);
      apply(saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
      $$('[data-theme-btn]').forEach((b) => on(b, 'click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        apply(next); store.set(KEY, next);
        document.dispatchEvent(new CustomEvent('pf:theme', { detail: { theme: next } }));
      }));
    };
    return { init };
  })();

  /* =============================================================== LANG */
  const Lang = (() => {
    const KEY = 'pf.lang';
    let cur = store.get(KEY, 'th');
    const swap = (lang) => {
      $$('[data-en]').forEach((el) => {
        if (el.dataset.thCache === undefined) el.dataset.thCache = el.innerHTML;
        el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.thCache;
      });
      $$('[data-en-ph]').forEach((el) => {
        if (el.dataset.thPh === undefined) el.dataset.thPh = el.placeholder || '';
        el.placeholder = lang === 'en' ? el.dataset.enPh : el.dataset.thPh;
      });
      $$('[data-en-aria]').forEach((el) => {
        if (el.dataset.thAria === undefined) el.dataset.thAria = el.getAttribute('aria-label') || '';
        el.setAttribute('aria-label', lang === 'en' ? el.dataset.enAria : el.dataset.thAria);
      });
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('data-lang', lang);
      $$('.langsw button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
      cur = lang; store.set(KEY, lang);
      document.dispatchEvent(new CustomEvent('pf:lang', { detail: { lang } }));
    };
    const init = () => {
      $$('.langsw button').forEach((b) => on(b, 'click', () => swap(b.dataset.lang)));
      if (cur === 'en') swap('en');
      else {
        document.documentElement.setAttribute('data-lang', 'th');
        $$('.langsw button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === 'th')));
      }
    };
    return { init, get cur() { return cur; }, t: (th, en) => (cur === 'en' ? en : th) };
  })();
  const T = (th, en) => Lang.t(th, en);

  /* ============================================================= LOADER */
  const Loader = () => {
    const el = $('.loader');
    if (!el) { document.body.classList.add('ready'); $('.hero')?.classList.add('revealed'); return; }
    const bar = $('.loader__bar i', el);
    let done = false;
    const finish = () => {
      if (done) return; done = true;
      if (bar) bar.style.width = '100%';
      setTimeout(() => {
        el.classList.add('done'); el.setAttribute('aria-hidden', 'true');
        document.body.classList.add('ready');
        $('.hero')?.classList.add('revealed');
      }, reduced() ? 0 : 320);
    };
    if (bar) raf(() => { bar.style.width = '45%'; });
    if (document.readyState === 'complete') finish(); else on(window, 'load', finish);
    setTimeout(finish, 3200);
  };

  /* ================================================================ NAV */
  const Nav = () => {
    const nav = $('.nav');
    let last = scrollY, ticking = false;
    const upd = () => {
      const y = scrollY;
      if (nav) {
        nav.classList.toggle('stuck', y > 16);
        const open = $('.drawer')?.classList.contains('open') || $('.sheet')?.classList.contains('open');
        nav.classList.toggle('hide', y > 500 && y > last && !open);
      }
      const top = $('.totop');
      if (top) {
        top.classList.toggle('show', y > 600);
        const max = document.documentElement.scrollHeight - innerHeight;
        const ring = $('.ring .fg', top);
        if (ring) {
          const len = ring.getTotalLength();
          ring.style.strokeDasharray = len;
          ring.style.strokeDashoffset = len * (1 - (max > 0 ? clamp(y / max, 0, 1) : 0));
        }
      }
      last = y; ticking = false;
    };
    on(window, 'scroll', () => { if (!ticking) { ticking = true; raf(upd); } }, { passive: true });
    upd();
    on($('.totop'), 'click', () => scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' }));
  };

  /* ============================================================== TRAP */
  const trap = (box, onEsc) => (e) => {
    if (e.key === 'Escape') { onEsc(); return; }
    if (e.key !== 'Tab') return;
    const f = $$('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])', box)
      .filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  };

  /* ============================================================= DRAWER */
  const Drawer = () => {
    const btn = $('.burger'), d = $('.drawer');
    if (!btn || !d) return;
    let lastF = null;
    const h = trap(d, () => set(false));
    function set(open) {
      btn.setAttribute('aria-expanded', String(open));
      d.classList.toggle('open', open);
      d.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('is-locked', open);
      if (open) { lastF = document.activeElement; $$('a', d)[0]?.focus(); document.addEventListener('keydown', h); }
      else { document.removeEventListener('keydown', h); lastF?.focus(); }
    }
    on(btn, 'click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    $$('a', d).forEach((a) => on(a, 'click', () => set(false)));
    on(window, 'resize', () => { if (innerWidth > 960 && d.classList.contains('open')) set(false); });
  };

  /* ============================================================ SPY NAV */
  const Spy = () => {
    const links = $$('.nav__link[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    const map = new Map();
    links.forEach((l) => {
      const s = document.querySelector(l.getAttribute('href'));
      if (s) map.set(s, l);
    });
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => l.removeAttribute('aria-current'));
        map.get(e.target)?.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    map.forEach((_l, s) => io.observe(s));
  };

  /* ============================================================= REVEAL */
  const Reveal = () => {
    const t = () => $$('[data-rv], [data-rvg]');
    if (!('IntersectionObserver' in window) || reduced()) {
      t().forEach((x) => x.classList.add('in'));
      $$('[data-count]').forEach((c) => { c.textContent = c.dataset.count + (c.dataset.suffix || ''); });
      $$('.meter__fill').forEach((m) => { m.style.width = (m.dataset.v || 0) + '%'; });
      return;
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    t().forEach((x) => io.observe(x));

    const mio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.style.width = clamp(parseFloat(e.target.dataset.v || 0), 0, 100) + '%';
      mio.unobserve(e.target);
    }), { threshold: .3 });
    $$('.meter__fill').forEach((m) => mio.observe(m));

    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, to = parseFloat(String(el.dataset.count).replace(/,/g, ''));
      const suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1200;
      const fmt = String(el.dataset.count).includes(',');
      const tick = (now) => {
        const p = clamp((now - t0) / dur, 0, 1), k = 1 - Math.pow(1 - p, 3);
        const v = Math.round(to * k);
        el.textContent = (fmt ? v.toLocaleString('en-US') : v) + suf;
        if (p < 1) raf(tick);
      };
      raf(tick); cio.unobserve(el);
    }), { threshold: .4 });
    $$('[data-count]').forEach((c) => cio.observe(c));

    /* sweep — IO can miss nodes on fast scroll */
    let pend = false;
    const sweep = () => {
      const vh = innerHeight;
      t().forEach((el) => { if (!el.classList.contains('in') && el.getBoundingClientRect().top < vh * .95) el.classList.add('in'); });
      pend = false;
    };
    on(window, 'scroll', () => { if (!pend) { pend = true; setTimeout(sweep, 220); } }, { passive: true });
    setTimeout(sweep, 700);
  };

  /* =============================================================== BGFX
     A slow constellation of nodes — reads as a network diagram, not a toy. */
  const BgFX = () => {
    const cv = $('#bgfx');
    if (!cv || reduced() || innerWidth < 720) { cv?.remove(); return; }
    const ctx = cv.getContext('2d', { alpha: true });
    let w = 0, h = 0, dpr = Math.min(devicePixelRatio || 1, 2), run = true, nodes = [];
    const N = () => clamp(Math.round(innerWidth / 26), 26, 62);
    const size = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const seed = () => {
      nodes = Array.from({ length: N() }, (_, i) => ({
        x: Math.random(), y: Math.random(),
        vx: (-.5 + Math.random()) * .00022,
        vy: (-.5 + Math.random()) * .00022,
        r: i % 9 === 0 ? 2.1 : 1.15,
        hot: i % 9 === 0
      }));
    };
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      return {
        line: cs.getPropertyValue('--fg-3').trim() || '#8B95A7',
        hot: cs.getPropertyValue('--accent').trim() || '#FF5C38'
      };
    };
    let C = read();
    document.addEventListener('pf:theme', () => { C = read(); });

    const draw = () => {
      if (!run) return;
      ctx.clearRect(0, 0, w, h);
      const px = nodes.map((n) => [n.x * w, n.y * h]);
      const LIM = Math.min(w, h) * 0.19;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = px[i][0] - px[j][0], dy = px[i][1] - px[j][1];
          const d = Math.hypot(dx, dy);
          if (d > LIM) continue;
          const a = (1 - d / LIM) * .17;
          ctx.strokeStyle = C.line;
          ctx.globalAlpha = a;
          ctx.beginPath(); ctx.moveTo(px[i][0], px[i][1]); ctx.lineTo(px[j][0], px[j][1]); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(px[i][0], px[i][1], n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.hot ? C.hot : C.line;
        ctx.globalAlpha = n.hot ? .55 : .3;
        ctx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < -.03 || n.x > 1.03) n.vx *= -1;
        if (n.y < -.03 || n.y > 1.03) n.vy *= -1;
      });
      ctx.globalAlpha = 1;
      raf(draw);
    };
    size(); seed(); raf(draw);
    on(window, 'resize', () => { size(); seed(); });
    on(document, 'visibilitychange', () => { run = !document.hidden; if (run) raf(draw); });
  };

  /* ============================================================ MARQUEE */
  const Marquee = () => $$('.marquee').forEach((m) => {
    const t = $('.marquee__t', m);
    if (!t) return;
    const c = t.cloneNode(true); c.setAttribute('aria-hidden', 'true'); m.appendChild(c);
  });

  /* ======================================================= CATEGORY & TAGS */
  const getCatMeta = (p) => {
    if (p.cat === 'app' || p.id === 'discord_rpc' || p.id === 'aerocontrol') return { icon: '💻', th: 'เดสก์ท็อป / ซิสเต็มส์', en: 'Desktop / Systems' };
    if (p.id === 'prism64' || p.id === 'khuiai' || p.id === 'face') return { icon: '🤖', th: 'เอไอ & สตรีมมิ่ง', en: 'AI & Streaming' };
    if (p.cat === 'interactive') return { icon: '🎮', th: 'อินเตอร์แอคทีฟ 3D', en: 'Interactive 3D' };
    return { icon: '🌐', th: 'เว็บแอปพลิเคชัน', en: 'Web Application' };
  };

  const TAG_ICONS = {
    'python': '🐍',
    'python 3.12': '🐍',
    'windows': '🪟',
    'windows winrt': '🪟',
    'gsmtc api': '🪟',
    'desktop app': '💻',
    'discord ipc': '💬',
    'next.js': '▲',
    'next.js 14': '▲',
    'next.js 16': '▲',
    'react': '⚛️',
    'react 19': '⚛️',
    'typescript': '🔷',
    'rust': '🦀',
    'webassembly': '⚡',
    'three.js': '📐',
    'maplibre gl': '🗺️',
    'leaflet.js': '🗺️',
    'postgresql': '🐘',
    'mysql': '🐬',
    'sqlite': '🗄️',
    'prisma': '💎',
    'node.js': '🟢',
    'php': '🐘',
    'tailwind': '🎨',
    'tailwind css': '🎨',
    'shadcn/ui': '🖤',
    'gemini mcp': '🤖',
    'openai api': '🤖',
    'pwa': '📱',
    'service worker': '📱',
    'accessibility': '♿',
    'docker': '🐳',
    'firebase': '🔥',
    'multiplayer': '🎮',
    'game engine': '🎮',
    'web audio api': '🎧',
    'pdf.js': '📄',
    'canvas api': '✨',
    'anime.js': '✨',
    'html/css': '🌐',
    'javascript': '🟨',
    'vite': '⚡',
    'angular': '🅰️',
    'pyinstaller': '📦',
    'pystray': '🪟',
    'systems architecture': '🏗️',
    'web scraping': '🕷️',
    'render.com': '☁️'
  };

  const renderTag = (t) => {
    const k = (t || '').trim().toLowerCase();
    const icon = TAG_ICONS[k] || '🏷️';
    return `<span class="tag"><span class="tag__icon" aria-hidden="true">${icon}</span><span>${esc(t)}</span></span>`;
  };

  /* =========================================================== PROJECTS */
  const Projects = (() => {
    const grid = $('[data-pgrid]');
    if (!grid) return { init() {} };
    const countEl = $('[data-pcount]');
    const empty = $('[data-pempty]');
    const search = $('[data-psearch]');
    const pills = $$('[data-pfilter]');
    let cat = 'all', q = '';

    const getMetricPills = (p) => {
      if (!p.metrics || !p.metrics.length) return '';
      const iconMap = ['⚡', '🚀', '🛡️', '🎯'];
      const clsMap = ['pcard__mpill--hot', 'pcard__mpill--cool', 'pcard__mpill--blue', 'pcard__mpill--purple'];
      return `<div class="pcard__metrics">` +
        p.metrics.slice(0, 3).map((m, i) => {
          const ic = iconMap[i % iconMap.length];
          const cls = clsMap[i % clsMap.length];
          return `<span class="pcard__mpill ${cls}"><span>${ic}</span> <strong>${esc(m.v)}</strong> <span>${esc(T(m.th, m.en))}</span></span>`;
        }).join('') +
      `</div>`;
    };

    const card = (p) => {
      const cw = p.coverW && p.coverW.length ? p.coverW : [480];
      const wide = cw.includes(960) ? 960 : cw[cw.length - 1];
      const srcset = [...new Set([cw[0], wide])]
        .map((w) => `${p.cover}-${w}.webp ${w}w`).join(', ');
      const nImg = p.gallery.filter((g) => g.k === 'image').length;
      const nVid = p.gallery.filter((g) => g.k === 'video').length;
      const catMeta = getCatMeta(p);
      return `
      <article class="pcard ticks" data-open="${p.id}" tabindex="0" role="button"
               aria-label="${esc(T(p.th, p.en))} — ${T('เปิดรายละเอียด', 'open details')}">
        <div class="pcard__media">
          <div class="pcard__top">
            <span class="pcard__badge">${p.no} · ${p.year}</span>
            ${p.live ? `<span class="pcard__badge pcard__badge--live"><span class="pcard__live-dot"></span>LIVE</span>` : ''}
          </div>
          <picture>
            <source type="image/webp" srcset="${srcset}" sizes="(max-width:680px) 92vw, (max-width:1100px) 46vw, 32vw">
            <img src="${p.cover}-${wide}.jpg" alt="${esc(T(p.th, p.en))}" loading="lazy" decoding="async">
          </picture>
          <div class="pcard__overlay"></div>
        </div>
        <div class="pcard__body">
          <div class="pcard__header">
            <span class="pcard__cat">${catMeta.icon} ${T(catMeta.th, catMeta.en)}</span>
          </div>
          <h3 class="pcard__t">${esc(T(p.th, p.en))}</h3>
          ${getMetricPills(p)}
          <p class="pcard__d">${esc(T(p.sum_th, p.sum_en))}</p>
          <div class="pcard__tags">
            ${p.tags.slice(0, 3).map(renderTag).join('')}
            ${p.tags.length > 3 ? `<span class="tag tag--more">+${p.tags.length - 3}</span>` : ''}
          </div>
          <div class="pcard__foot">
            <span class="pcard__count mono">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 15l4-4 4 4 3-3 7 6"/></svg>
              ${nImg}${nVid ? ` · ${nVid} ▶` : ''}
            </span>
            <span class="pcard__cta">
              ${T('ดูรายละเอียด', 'View details')}
              <svg class="pcard__arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </article>`;
    };

    const apply = () => {
      const term = q.trim().toLowerCase();
      const list = PROJECTS.filter((p) => {
        if (cat !== 'all' && p.cat !== cat) return false;
        if (!term) return true;
        return (p.th + ' ' + p.en + ' ' + p.sum_th + ' ' + p.sum_en + ' ' + p.tags.join(' ')).toLowerCase().includes(term);
      });
      grid.innerHTML = list.map(card).join('');
      if (countEl) countEl.textContent = list.length;
      if (empty) empty.hidden = list.length > 0;
      const p = new URLSearchParams();
      if (cat !== 'all') p.set('cat', cat);
      if (term) p.set('q', term);
      setURL(p.toString() ? '?' + p + location.hash : location.pathname + location.hash);
    };

    const counts = () => {
      pills.forEach((b) => {
        const c = b.dataset.pfilter;
        const n = c === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c).length;
        const s = $('b', b); if (s) s.textContent = n;
      });
    };

    const init = () => {
      const u = new URLSearchParams(location.search);
      if (u.get('cat')) cat = u.get('cat');
      if (u.get('q')) { q = u.get('q'); if (search) search.value = q; }
      pills.forEach((b) => {
        b.setAttribute('aria-pressed', String(b.dataset.pfilter === cat));
        on(b, 'click', () => {
          cat = b.dataset.pfilter;
          pills.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          apply();
        });
      });
      on(search, 'input', () => { q = search.value; apply(); });
      document.addEventListener('pf:lang', apply);
      counts(); apply();
    };
    return { init, apply };
  })();

  /* ============================================================== SHEET */
  const Sheet = (() => {
    const bd = $('.sheet-bd'), sh = $('.sheet');
    if (!sh) return { init() {}, open() {} };
    const body = $('.sheet__b', sh);
    let lastF = null, current = null;
    const h = trap(sh, () => close());

    const render = (p) => {
      const feats = T(p.feat_th, p.feat_en);
      const catMeta = getCatMeta(p);
      body.innerHTML = `
        <div class="sheet__pad stack u-flow-lg">
          <div>
            <p class="eyebrow">${p.no} — ${catMeta.icon} ${T(catMeta.th, catMeta.en)} · ${p.year}</p>
            <h2 class="t-h2 u-mt-4" id="sheet-title">${esc(T(p.th, p.en))}</h2>
            <p class="label u-mt-3">${esc(T(p.role_th, p.role_en))}</p>
            <p class="body u-mt-5">${esc(T(p.sum_th, p.sum_en))}</p>
          </div>

          <div class="kv">
            ${p.metrics.map((m) => `<div class="kv__i"><p class="kv__v">${esc(m.v)}</p><p class="kv__l">${esc(T(m.th, m.en))}</p></div>`).join('')}
          </div>

          <div class="row">
            ${p.live ? `<a class="btn" href="${p.live}" target="_blank" rel="noopener">${T('เปิดเว็บจริง', 'Live demo')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a>` : ''}
            <a class="btn btn--ghost" href="${p.repo}" target="_blank" rel="noopener">Source code
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a>
          </div>

          <hr class="rule">

          <div>
            <p class="label">${T('ฟีเจอร์เด่น & จุดสำคัญ', 'Key features & highlights')}</p>
            <ul class="feat u-mt-4" role="list">${feats.map((f) => {
              const parts = f.split(': ');
              if (parts.length > 1) {
                return `<li><div><strong style="color:var(--fg);display:block;margin-bottom:2px;font-size:0.95rem">${esc(parts[0])}</strong><span style="color:var(--fg-2)">${esc(parts.slice(1).join(': '))}</span></div></li>`;
              }
              return `<li><span>${esc(f)}</span></li>`;
            }).join('')}</ul>
          </div>

          <div>
            <p class="label">${T('เทคโนโลยีที่ใช้', 'Built with')}</p>
            <div class="row u-mt-4" style="gap:6px;flex-wrap:wrap">${p.tags.map(renderTag).join('')}</div>
          </div>

          <hr class="rule">

          <div>
            <div class="between">
              <p class="label">${T('แกลเลอรี', 'Gallery')}</p>
              <p class="tiny mono">${p.gallery.length} ${T('ไฟล์', 'assets')}</p>
            </div>
            <div class="gal u-mt-4">
              ${p.gallery.map((g, i) => `
                <button type="button" data-lb="${p.id}" data-i="${i}"
                        aria-label="${T('ดูภาพที่', 'Open asset')} ${i + 1}">
                  ${g.k === 'video'
                    ? `<img src="${g.p}-poster.jpg" alt="" loading="lazy"><span class="play" aria-hidden="true">
                         <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>`
                    : `<img src="${g.p}-${wSmall(g)}.jpg" alt="" loading="lazy">`}
                  <span class="n mono" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
                </button>`).join('')}
            </div>
          </div>
        </div>`;
      body.scrollTop = 0;
    };

    function open(id) {
      const p = PROJECTS.find((x) => x.id === id);
      if (!p) return;
      current = p; render(p);
      lastF = document.activeElement;
      sh.classList.add('open'); bd.classList.add('open');
      sh.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      $('.sheet__close', sh)?.focus();
      document.addEventListener('keydown', h);
      setURL('#p-' + id);
    }
    function close() {
      sh.classList.remove('open'); bd.classList.remove('open');
      sh.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', h);
      lastF?.focus();
      if (location.hash.startsWith('#p-')) setURL(location.pathname + location.search);
    }

    const init = () => {
      on(document, 'click', (e) => {
        const c = e.target.closest('[data-open]');
        if (c) { open(c.dataset.open); return; }
        if (e.target.closest('.sheet__close') || e.target.closest('.sheet-bd')) close();
      });
      on(document, 'keydown', (e) => {
        const c = e.target.closest('[data-open]');
        if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(c.dataset.open); }
      });
      document.addEventListener('pf:lang', () => { if (current && sh.classList.contains('open')) render(current); });
      if (location.hash.startsWith('#p-')) setTimeout(() => open(location.hash.slice(3)), 500);
    };
    return { init, open };
  })();

  /* =========================================================== LIGHTBOX */
  const Lightbox = (() => {
    const lb = $('.lb');
    if (!lb) return { init() {} };
    const stage = $('.lb__stage', lb), thumbs = $('.lb__thumbs', lb), cap = $('.lb__cap', lb);
    let items = [], i = 0, lastF = null;
    const h = trap(lb, () => close());

    const show = (n) => {
      i = (n + items.length) % items.length;
      const g = items[i];
      stage.querySelectorAll('img,video').forEach((x) => x.remove());
      if (g.k === 'video') {
        const v = document.createElement('video');
        v.src = g.p + '.mp4'; v.poster = g.p + '-poster.jpg';
        v.controls = true; v.autoplay = !reduced(); v.playsInline = true; v.preload = 'metadata';
        stage.prepend(v);
      } else {
        const im = document.createElement('img');
        const big = wBig(g);
        im.src = `${g.p}-${big}.jpg`; im.alt = g.src || '';
        stage.prepend(im);
      }
      cap.textContent = `${String(i + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}  ·  ${g.src}`;
      $$('button', thumbs).forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
      $$('button', thumbs)[i]?.scrollIntoView({ block: 'nearest', inline: 'center' });
    };

    function open(list, n) {
      items = list; lastF = document.activeElement;
      thumbs.innerHTML = items.map((g, k) => `
        <button type="button" data-t="${k}" aria-label="${T('ภาพที่', 'Asset')} ${k + 1}">
          <img src="${g.k === 'video' ? g.p + '-poster.jpg' : g.p + '-' + wSmall(g) + '.jpg'}" alt="" loading="lazy">
        </button>`).join('');
      show(n);
      lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      $('.lb__close', lb)?.focus();
      document.addEventListener('keydown', h);
      document.addEventListener('keydown', keys);
    }
    function close() {
      lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
      stage.querySelectorAll('video').forEach((v) => v.pause());
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', h);
      document.removeEventListener('keydown', keys);
      lastF?.focus();
    }
    const keys = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
    };

    const init = () => {
      on(document, 'click', (e) => {
        const b = e.target.closest('[data-lb]');
        if (b) {
          const p = PROJECTS.find((x) => x.id === b.dataset.lb);
          if (p) open(p.gallery, parseInt(b.dataset.i, 10) || 0);
          return;
        }
        if (e.target.closest('.lb__close')) close();
        if (e.target.closest('.lb__prev')) show(i - 1);
        if (e.target.closest('.lb__next')) show(i + 1);
        const t = e.target.closest('[data-t]');
        if (t) show(parseInt(t.dataset.t, 10));
        if (e.target.closest('[data-lb-full]')) {
          const el = stage.querySelector('img,video');
          if (el?.requestFullscreen) el.requestFullscreen().catch(() => {});
        }
        if (e.target === lb) close();
      });
    };
    return { init };
  })();

  /* =============================================================== CMDK */
  const CmdK = () => {
    const box = $('.cmdk');
    if (!box) return;
    const input = $('.cmdk__in input', box), list = $('.cmdk__list', box);
    let items = [], sel = 0, lastF = null;
    const h = trap(box, () => close());

    const build = () => {
      const secs = $$('section[id], header[id]').map((s) => ({
        kind: 'sec',
        label: s.dataset.cmdk || s.id,
        hint: T('ไปที่ส่วน', 'Jump to section'),
        go: () => { close(); document.getElementById(s.id).scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' }); }
      }));
      const prj = PROJECTS.map((p) => {
        const catMeta = getCatMeta(p);
        return {
          kind: 'prj',
          label: `${catMeta.icon} ${T(p.th, p.en)}`,
          hint: p.tags.slice(0, 2).join(' · '),
          go: () => { close(); Sheet.open(p.id); }
        };
      });
      return secs.concat(prj);
    };

    const paint = (term) => {
      const t = term.trim().toLowerCase();
      const all = build();
      items = t ? all.filter((x) => (x.label + ' ' + x.hint).toLowerCase().includes(t)) : all;
      sel = 0;
      list.innerHTML = items.length
        ? items.map((x, k) => `<button class="cmdk__item" type="button" data-k="${k}" aria-selected="${k === 0}">
             <span class="mono tiny u-3">${x.kind === 'prj' ? '◆' : '§'}</span>
             <span>${esc(x.label)}</span><span class="k">${esc(x.hint)}</span></button>`).join('')
        : `<p class="cmdk__item u-3">${T('ไม่พบผลลัพธ์', 'No results')}</p>`;
    };
    const move = (d) => {
      if (!items.length) return;
      sel = (sel + d + items.length) % items.length;
      $$('.cmdk__item', list).forEach((b, k) => b.setAttribute('aria-selected', String(k === sel)));
      $$('.cmdk__item', list)[sel]?.scrollIntoView({ block: 'nearest' });
    };
    function open() {
      lastF = document.activeElement;
      box.classList.add('open'); box.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      input.value = ''; paint(''); input.focus();
      document.addEventListener('keydown', h);
    }
    function close() {
      box.classList.remove('open'); box.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', h);
      lastF?.focus();
    }
    on(document, 'keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); box.classList.contains('open') ? close() : open(); }
      if (!box.classList.contains('open')) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      if (e.key === 'Enter') { e.preventDefault(); items[sel]?.go(); }
    });
    on(input, 'input', () => paint(input.value));
    on(list, 'click', (e) => {
      const b = e.target.closest('[data-k]');
      if (b) items[parseInt(b.dataset.k, 10)]?.go();
    });
    on(box, 'click', (e) => { if (e.target === box) close(); });
    $$('[data-cmdk-open]').forEach((b) => on(b, 'click', open));
  };

  /* =============================================================== COPY */
  const Copy = () => {
    on(document, 'click', async (e) => {
      const b = e.target.closest('[data-copy]');
      if (!b) return;
      const v = b.dataset.copy;
      try {
        await navigator.clipboard.writeText(v);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = v; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch { /* ignore */ }
        ta.remove();
      }
      Toast.show(T('คัดลอกแล้ว: ', 'Copied: ') + v);
    });
  };

  /* ============================================================== PHOTO
     Looks for profile.jpg / .png / .webp next to index.html. If none is
     there the designed placeholder stays — nothing breaks. */
  const Photo = () => {
    const slot = $('[data-photo]');
    if (!slot) return;
    const ph = $('.photo__ph', slot);
    const tryList = ['profile.jpg', 'profile.jpeg', 'profile.png', 'profile.webp', 'media/profile.jpg'];
    let k = 0;
    const next = () => {
      if (k >= tryList.length) return;
      const src = tryList[k++];
      const im = new Image();
      im.onload = () => {
        const el = document.createElement('img');
        el.src = src;
        el.alt = 'วงศธร ฉาบสีทอง';
        el.setAttribute('data-en-alt', 'Wongsathorn Chapseethong');
        slot.prepend(el);
        ph?.remove();
      };
      im.onerror = next;
      im.src = src;
    };
    next();
  };

  /* ============================================================== TOAST */
  const Toast = (() => {
    let el = null, t = null;
    return {
      show(msg) {
        if (!el) {
          el = document.createElement('div');
          el.className = 'toast';
          el.setAttribute('role', 'status');
          el.setAttribute('aria-live', 'polite');
          document.body.appendChild(el);
        }
        el.textContent = msg;
        raf(() => el.classList.add('show'));
        clearTimeout(t);
        t = setTimeout(() => el.classList.remove('show'), 2600);
      }
    };
  })();

  /* =============================================================== MISC */
  const Misc = () => {
    $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
    $$('a[href^="#"]').forEach((a) => on(a, 'click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: reduced() ? 'auto' : 'smooth' });
      t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true });
    }));
    $$('a[target="_blank"]').forEach((a) => { if (!a.rel.includes('noopener')) a.rel = (a.rel + ' noopener noreferrer').trim(); });
    /* hero video: only if the file is actually there */
    const hv = $('.hero__video video');
    if (hv) {
      if (reduced() || (navigator.connection && navigator.connection.saveData)) hv.closest('.hero__video').remove();
      else on(hv, 'error', () => hv.closest('.hero__video')?.remove(), true);
    }
    /* line qr popover helper */
    const linePop = $('.line-pop');
    if (linePop) {
      const lineLink = $('.line-link', linePop);
      on(document, 'click', (e) => {
        if (!linePop.contains(e.target)) linePop.classList.remove('is-open');
      });
      if (lineLink) {
        on(lineLink, 'click', (e) => {
          if (e.target.closest('.line-badge')) {
            e.preventDefault();
            linePop.classList.toggle('is-open');
          }
        });
      }
    }
  };

  /* =============================================================== BOOT */
  const boot = () => {
    Theme.init(); Lang.init(); Loader(); Nav(); Drawer(); Spy(); Reveal();
    BgFX(); Marquee(); Projects.init(); Sheet.init(); Lightbox.init();
    CmdK(); Copy(); Photo(); Misc();
  };
  if (document.readyState === 'loading') on(document, 'DOMContentLoaded', boot); else boot();
})();
