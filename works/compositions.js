/* ==========================================================================
   Consy — colour compositions for the work gallery.
   One master palette, sixteen tile palettes. Each tile is a 600×400 sketch of a
   screen (site, app, brand, social, dashboard) that shows the colour balance,
   not a finished design. Used by index.html (gallery) and works/palettes.html (guide).
   Photos are hot-linked from the Unsplash CDN (images.unsplash.com).
   ========================================================================== */

(function () {
  'use strict';

  /* Master palette — every tile palette is built only from these. */
  const MASTER = {
    night: '#0E0E11', ink: '#2C2C31', pine: '#1F3A33', moss: '#3D5A47', sage: '#A7B8A0',
    mist: '#E2E0E5', paper: '#FAFAF9', cream: '#F2ECE2', sand: '#E3D3BD',
    clay: '#D08C77', terracotta: '#B5603F', rain: '#ABC9E1', dusk: '#3E5674',
    lilac: '#BDB0D9', plum: '#3B2E45', butter: '#EBD49A',
  };

  /* Tile palettes.
     b = base (≈60%), s = second (≈25%), a = accent (≈10%), i = text on base,
     t = text on second, c = card surface (optional), ratio = [base, second, accent, text/photo]
     mode = light | mid | dark (the wall alternates them), col = desktop column. */
  const M = MASTER;
  const WORKS = [
    // column 1
    { id: 'sunday', col: 1, mode: 'light', layout: 'site', font: 'ser', name: 'SUNDAY', kind: 'Wellness platform website',
      b: M.cream, s: M.rain, a: M.terracotta, i: M.terracotta, t: M.ink, ratio: [45, 25, 10, 20],
      head: 'Rest is not optimization', photo: 'photo-1603565656461-65e71ddc02ef', mood: 'warm morning light, linen, water',
      // final mock-up; in-site motion: light rippling over the water panel
      image: 'sunday', fx: { kind: 'water', x: 209, y: 284, w: 391, h: 116, clip: 'polygon(0 0, 341px 0, 341px 25px, 100% 25px, 100% 100%, 0 100%)' } },
    { id: 'loop', col: 1, mode: 'light', layout: 'site', font: 'ser', name: 'LOOP', kind: 'Creator community website',
      b: M.paper, s: M.mist, a: M.terracotta, i: M.ink, t: M.ink, ratio: [65, 20, 5, 10],
      head: 'A community for creators who build a kinder future', photo: '', mood: 'people seen from above on a bright floor, long shadows',
      // final mock-up, static
      image: 'loop' },
    { id: 'north', col: 1, mode: 'light', layout: 'dash', font: 'gro', name: 'NORTH', kind: 'AI research platform',
      b: M.paper, s: M.mist, a: '#2346F5', i: M.ink, t: M.ink, ratio: [60, 20, 8, 12],
      head: 'See connections others miss', photo: '', mood: '',
      // final mock-up, animated as a 7 s product story (see .scene--north in compositions.css)
      image: 'north', scene: 'north' },
    // column 2
    { id: 'form24', col: 2, mode: 'light', layout: 'editorial', font: 'gro', name: 'FORM / 24', kind: 'Architecture studio website',
      b: M.cream, s: M.sand, a: M.moss, i: M.ink, t: M.ink, ratio: [40, 35, 5, 20],
      head: 'Architecture for a slower, fuller tomorrow', photo: 'photo-1549791084-5f78368b208b', mood: 'concrete house over the sea at golden hour',
      // final mock-up; in-site motion: the hero is a slider, each slide brings a new house and shifts the site's tone
      image: 'form24', scene: 'form24',
      slides: [
        { photo: 'photo-1608619769165-25647672335f', pos: '70% 60%', scrim: '240, 224, 216', tint: '#C9A2A0' }, // dusk villa · rose
        { photo: 'photo-1790198576345-f1f1af9d458b', pos: '60% 55%', scrim: '228, 229, 230', tint: '#8E9AA6' }, // cantilever house · cool stone
        { photo: 'photo-1785024773232-aa575a4f5dbf', pos: '55% 60%', scrim: '238, 230, 210', tint: '#9AA07A', veil: true }, // low house by the mountains · olive
      ] },
    { id: 'miso', col: 2, mode: 'mid', layout: 'site', font: 'ser', name: 'MISO', kind: 'Fermented food shop website',
      b: M.cream, s: M.clay, a: M.terracotta, i: M.ink, t: M.ink, ratio: [45, 35, 10, 10],
      head: 'Хорошие бактерии. Яркие дни.', photo: '', mood: 'vegetables and bubbles under water, warm light',
      // final mock-up, static
      image: 'miso', v: 2 }, // v busts the browser cache after the image was replaced
    { id: 'kin', col: 2, mode: 'light', layout: 'portrait', font: 'ser', name: 'KIN', kind: 'Strategy for creative people',
      b: M.paper, s: M.butter, a: M.lilac, i: M.ink, t: M.ink, ratio: [60, 20, 8, 12],
      head: 'Your experience is the product', photo: '', mood: 'portrait in soft daylight, warm neutral interior',
      // final mock-up (client logos replaced with fictional ones), static
      image: 'kin' },
    // column 3
    { id: 'mora', col: 3, mode: 'mid', layout: 'brand', font: 'ser', name: 'MORA', kind: 'Handmade ceramics shop',
      b: M.sand, s: M.cream, a: M.terracotta, i: M.ink, t: M.ink, ratio: [50, 25, 10, 15],
      head: 'Objects for everyday rituals', photo: 'photo-1604095616439-216735abec0c', mood: 'stoneware bowl in raking sunlight',
      // final mock-up as a silent 5 s video loop (moving light and shadows); mora.webp is its first frame
      image: 'mora', video: 'mora' },
    { id: 'orbit', col: 3, mode: 'light', layout: 'portrait', font: 'gro', name: 'ORBIT', kind: 'Team clarity platform',
      b: M.cream, s: M.mist, a: '#1F4CF0', i: M.ink, t: M.ink, ratio: [60, 20, 8, 12],
      head: 'Turn complexity into clarity', photo: '', mood: '',
      // final mock-up, animated as a 6 s product loop (see .scene--orbit in compositions.css)
      image: 'orbit', scene: 'orbit' },
    // column 4
    { id: 'fieldnotes', col: 4, mode: 'light', layout: 'editorial', font: 'gro', name: 'FIELD NOTES', kind: 'Digital magazine',
      b: M.paper, s: M.mist, a: '#1F4CF0', i: M.ink, t: M.ink, ratio: [60, 10, 25, 5],
      head: 'Things worth paying attention to', photo: '', mood: '',
      image: 'fieldnotes' }, // final mock-up, static
    { id: 'atlas', col: 4, mode: 'mid', layout: 'site', font: 'ser', name: 'ATLAS', kind: 'Travel product website',
      b: M.butter, s: M.terracotta, a: M.plum, i: M.plum, t: M.plum, ratio: [45, 35, 8, 12],
      head: 'Find places that do something to you', photo: '', mood: 'traveller above a sea coast at golden hour',
      // final mock-up; in-site motion: sun glints twinkling on the sea, like a hero video
      image: 'atlas', fx: { kind: 'glint', x: 400, y: 116, w: 142, h: 62 } },
  ];

  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const photo = (id, w, cls = 'ph', pos = 'center') =>
    id ? `<img class="${cls}" src="https://images.unsplash.com/${id}?w=${w}&q=70&auto=format&fit=crop" alt="" loading="eager" decoding="async" onerror="this.style.visibility='hidden'" style="object-position:${pos}">` : '';
  const bars = (n, widths) => widths.slice(0, n).map((w) => `<i style="width:${w}px"></i>`).join('');

  const LAYOUTS = {
    site: (p) => `
      <div class="nav"><b class="logo">${esc(p.name)}</b><span class="links">${bars(3, [30, 38, 26])}</span><span class="pill pill--a">Book</span></div>
      <h3 class="h1">${esc(p.head)}</h3>
      <div class="lines">${bars(3, [210, 190, 130])}</div>
      <div class="cta"><span class="pill pill--i">Get started</span><span class="pill pill--o">Learn more</span></div>
      <div class="hero-ph">${photo(p.photo, 600)}</div>
      <div class="float"><b>Next session</b><span>${bars(2, [90, 60])}</span><em></em></div>
      <div class="strip">${['', '', ''].map(() => `<div><i></i><i></i></div>`).join('')}</div>`,

    editorial: (p) => `
      <div class="ed-ph">${photo(p.photo, 500)}</div>
      <div class="ed-nav"><b>${esc(p.name)}</b>${bars(3, [26, 30, 22])}</div>
      <h3 class="ed-h">${esc(p.head)}</h3>
      <div class="ed-cols"><div>${bars(4, [96, 90, 96, 60])}</div><div>${bars(4, [96, 80, 92, 70])}</div></div>
      <span class="ed-sq"></span><span class="ed-no">01 / 12</span>`,

    portrait: (p) => `
      <div class="nav"><b class="logo">${esc(p.name)}</b><span class="links">${bars(3, [30, 34, 26])}</span><span class="pill pill--i">Talk to me</span></div>
      <h3 class="pt-h">${esc(p.head)}</h3>
      <div class="pt-ph">${photo(p.photo, 500, 'ph', 'center 25%')}</div>
      <span class="pill pill--a pt-cta">Book a call</span>
      <div class="band"><div><b>12</b><span>years</span></div><div><b>300+</b><span>leaders</span></div><div><b>4.9</b><span>rating</span></div></div>`,

    app: (p) => `
      <div class="phone ph1"><div class="scr">
        <div class="app-ph">${photo(p.photo, 400)}</div>
        <b class="app-h">${esc(p.head)}</b>
        <div class="app-row"><i></i><i></i></div><div class="app-row"><i></i><i></i></div>
        <span class="app-btn"></span>
      </div></div>
      <div class="phone ph2"><div class="scr scr--s">
        <div class="ring"><span></span></div>
        <div class="app-card"><i></i><i></i></div><div class="app-card"><i></i><i></i></div>
      </div></div>
      <b class="app-logo">${esc(p.name)}</b>`,

    brand: (p) => `
      <div class="br-mark"><span></span></div>
      <b class="br-word">${esc(p.head)}</b>
      <div class="br-swatch">${['b', 's', 'a', 'i'].map((k, n) => `<span style="flex:${p.ratio[n]};background:var(--${k})"></span>`).join('')}</div>
      <div class="br-ph">${photo(p.photo, 400)}</div>
      <div class="br-card"><b>${esc(p.name)}</b>${bars(2, [80, 56])}</div>`,

    social: (p) => `
      <div class="so-grid">
        <div class="so so--ph">${photo(p.photo, 300)}</div>
        <div class="so so--s"><small>Tip</small><b>${esc(p.head)}</b></div>
        <div class="so so--a"><b>3</b><small>ways to start</small></div>
        <div class="so so--b"><small>Quote</small><b>“Small steps, every day.”</b></div>
        <div class="so so--ph">${photo(p.photo, 300, 'ph', '70% 60%')}</div>
        <div class="so so--s2"><small>Live</small><b>Thursday 19:00</b></div>
      </div>`,

    dash: (p) => `
      <div class="ds-side"><b>${esc(p.name)}</b>${bars(5, [70, 60, 66, 54, 62])}<div class="ds-me">${photo(p.photo, 120, 'av')}<i></i></div></div>
      <div class="ds-main">
        <b class="ds-h">${esc(p.head)}</b>
        <div class="ds-kpis"><div><small>Net worth</small><b>€248k</b></div><div><small>Saved</small><b>€41k</b></div><div><small>Goal</small><b>71%</b></div></div>
        <div class="ds-chart"><svg viewBox="0 0 360 120" preserveAspectRatio="none"><path d="M0 100 C60 92 90 80 140 70 S230 52 280 36 S340 20 360 14" fill="none" stroke="var(--a)" stroke-width="4" stroke-linecap="round"/><path d="M0 100 C60 92 90 80 140 70 S230 52 280 36 S340 20 360 14 L360 120 L0 120Z" fill="var(--a)" opacity=".22"/></svg></div>
      </div>`,

    poster: (p) => `
      <div class="po-ph">${photo(p.photo, 500)}</div>
      <small class="po-k">Talk · 14 May · 19:00</small>
      <h3 class="po-h">${esc(p.head)}</h3>
      <span class="po-tag">Free · online</span><span class="po-dot"></span>`,

    cards: (p) => `
      <div class="cd cd--back"><span class="cd-mark"></span></div>
      <div class="cd cd--front"><b class="cd-logo"><span class="cd-mark"></span>${esc(p.name)}</b><b class="cd-name">${esc(p.head)}</b><small>Independent financial advisor</small><i></i></div>`,
  };

  /* Animated scenes: the finished image is cut into layers that appear in sequence.
     Coordinates are on the 600×400 canvas. */
  const piece = (p, cls, x, y, w, h) =>
    `<span class="pc ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background-image:url(${ASSETS}${p.image}.webp);background-position:-${x}px -${y}px"></span>`;
  const SCENES = {
    // NORTH: 0–1 s nav · 1–2 s headline · 2–4 s graph grows from the hub · 4–5 s one link lights up, card appears ·
    // 5–6 s the chart draws itself · 6–7 s everything fades back to an empty screen.
    north: (p) => `<div class="comp scene scene--north">
      ${piece(p, 'nt-nav', 0, 0, 600, 40)}
      ${piece(p, 'nt-hero', 30, 52, 220, 206)}
      ${piece(p, 'nt-hero nt-side', 16, 240, 40, 120)}
      ${piece(p, 'nt-graph', 250, 40, 350, 222)}
      <span class="nt-cover" style="left:464px;top:129px;width:128px;height:70px"></span>
      <svg class="nt-link" viewBox="0 0 600 400" aria-hidden="true"><line x1="398" y1="150" x2="473" y2="125" pathLength="1"/><circle cx="473" cy="125" r="7"/></svg>
      ${piece(p, 'nt-card', 466, 131, 122, 66)}
      ${piece(p, 'nt-panel', 101, 263, 477, 137)}
      <span class="nt-chart" style="left:368px;top:343px;width:101px;height:38px"></span>
    </div>`,
    // ORBIT: the sphere glows, the Purpose node sends a signal, the clarity chart draws and the alignment bars grow.
    orbit: (p) => `<div class="comp scene scene--orbit">
      <img src="${ASSETS}${p.image}.webp" width="600" height="400" alt="" decoding="async">
      <span class="ob-glow" style="left:338px;top:93px;width:88px;height:88px"></span>
      <span class="ob-ping" style="left:306px;top:325px;width:15px;height:15px"></span>
      <span class="ob-cover ob-line" style="left:523px;top:296px;width:65px;height:28px"></span>
      <span class="ob-cover ob-bars" style="left:523px;top:352px;width:65px;height:31px"></span>
    </div>`,
    // FORM / 24: slide 1 is the original screen; slides 2–4 bring new architecture photos with the hero UI redrawn on top,
    // a scrim and a strip tint in each slide's tone. 16 s loop, 4 s per slide. The tints sit outside the faded layer
    // so their soft-light blend reaches the base screenshot; the UI switches on fast so it never ghosts over the baked text.
    form24: (p) => {
      const slides = p.slides.map((sl, n) => `
        <span class="f24-slide f24-s${n + 1}">
          <img src="https://images.unsplash.com/${sl.photo}?w=900&q=72&auto=format&fit=crop" alt="" decoding="async" style="object-position:${sl.pos}" onerror="this.closest('.scene').classList.add('is-static')">
          <i style="background:linear-gradient(90deg, rgba(${sl.scrim}, ${sl.veil ? .92 : .82}) 0%, rgba(${sl.scrim}, ${sl.veil ? .8 : .55}) 38%, rgba(${sl.scrim}, 0) ${sl.veil ? 72 : 62}%), linear-gradient(180deg, rgba(${sl.scrim}, .5) 0%, rgba(${sl.scrim}, 0) 16%)"></i>
        </span>`).join('');
      const tints = p.slides.map((sl, n) => `<span class="f24-tint f24-s${n + 1}" style="background:${sl.tint}"></span>`).join('');
      return `<div class="comp scene scene--form24">
      <img class="f24-base" src="${ASSETS}${p.image}.webp" width="600" height="400" alt="" decoding="async">
      <div class="f24-layer">${slides}</div>
      ${tints}
      <div class="f24-ui">
          <svg class="f24-mark" viewBox="0 0 14 16"><path d="M1 1h12M1 1v14M1 7.5h9l-4.2 7.5h6.2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
          <b class="f24-word">FORM / 24</b>
          <span class="f24-nav" style="left:210.9px">Work</span><span class="f24-nav" style="left:244.9px">Approach</span><span class="f24-nav" style="left:290.6px">Journal</span><span class="f24-nav" style="left:330.9px">About</span>
          <span class="f24-btn">Get in touch <em>→</em></span>
          <span class="f24-eyebrow">SPACES FOR A<br>MORE HUMAN LIFE</span>
          <span class="f24-h" style="top:100.1px">Architecture</span><span class="f24-h" style="top:130.1px">for a slower,</span><span class="f24-h" style="top:160.1px">fuller tomorrow.</span>
          <span class="f24-circle">→</span><span class="f24-explore">Explore our work</span>
          <span class="f24-num" style="top:126.6px">01</span><span class="f24-num" style="top:137.2px">02</span><span class="f24-num" style="top:147.8px">03</span><span class="f24-num" style="top:158.4px">04</span>
          <span class="f24-num f24-on f24-s1" style="top:137.2px">02</span><span class="f24-num f24-on f24-s2" style="top:147.8px">03</span><span class="f24-num f24-on f24-s3" style="top:158.4px">04</span>
          <span class="f24-bar"></span>
          <span class="f24-labels">PEOPLE<br>PLACES<br>MATERIALS<br>PERSPECTIVES</span>
      </div>
    </div>`;
    },
  };

  // Finished mock-ups replace the sketch. Path is relative to the page (works/palettes.html sets its own base).
  const ASSETS = window.CONSY_ASSET_BASE || 'assets/works/';

  // Sun sparkles for the glint fx: a fixed pseudo-random scatter, denser and finer towards the horizon and the sun (top right).
  function glints(f) {
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    let out = '';
    for (let n = 0, made = 0; made < 64 && n < 400; n++) {
      const depth = Math.pow(rnd(), 1.9);                  // 0 = horizon, 1 = near shore
      const x = f.w * (1 - Math.pow(rnd(), 1.3) * (0.5 + depth * 0.5));
      const y = depth * f.h;
      if (x < 18 + y * 1.1) continue;                      // keep off the headland at the bottom left
      const w = 1.1 + depth * 2.6 + rnd() * 1.2;
      made++;
      out += `<i style="left:${(x - w).toFixed(1)}px;top:${y.toFixed(1)}px;width:${w.toFixed(1)}px;--o:${(0.4 + (1 - depth) * 0.3 + rnd() * 0.3).toFixed(2)};--d:${(1.6 + rnd() * 2.4).toFixed(2)}s;--dl:-${(rnd() * 4).toFixed(2)}s"></i>`;
    }
    return out;
  }

  const STILL = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render(p) {
    if (p.scene) return SCENES[p.scene](p);
    if (p.video) {
      // muted + playsinline so it autoplays everywhere; with reduced motion only the poster frame shows
      return `<div class="comp comp--image"><video src="${ASSETS}${p.video}.mp4" poster="${ASSETS}${p.image}.webp" width="600" height="400" muted loop playsinline preload="auto"${STILL ? '' : ' autoplay'} disablepictureinpicture aria-hidden="true"></video></div>`;
    }
    if (p.image) {
      const fx = p.fx
        ? `<span class="fx fx--${p.fx.kind}" style="left:${p.fx.x}px;top:${p.fx.y}px;width:${p.fx.w}px;height:${p.fx.h}px;${p.fx.clip ? `clip-path:${p.fx.clip}` : ''}"></span>`
        : '';
      return `<div class="comp comp--image"><img src="${ASSETS}${p.image}.webp${p.v ? `?v=${p.v}` : ''}" width="600" height="400" alt="" decoding="async">${fx.replace('></span>', `>${p.fx && p.fx.kind === 'glint' ? glints(p.fx) : ''}</span>`)}</div>`;
    }
    const vars = ['b', 's', 'a', 'i', 't', 'c'].filter((k) => p[k]).map((k) => `--${k}:${p[k]}`).join(';');
    return `<div class="comp comp--${p.layout} f-${p.font}" style="${vars}">${LAYOUTS[p.layout](p)}</div>`;
  }

  window.CONSY_MASTER = MASTER;
  window.CONSY_WORKS = WORKS;
  window.renderComposition = render;
})();
