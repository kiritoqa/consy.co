/* ==========================================================================
   Consy — landing page prototype v2
   Plain JavaScript, no dependencies.

   1. Placeholder links
   2. Menu
   3. (removed: the page now scrolls freely)
   4. Package choice → booking
   5. Reveal on scroll + word-by-word description
   6. Work (concepts and client work)
   7. The meadow (WebGL): flowers that light up and bloom under the cursor
   ========================================================================== */

(() => {
  'use strict';

  const root = document.documentElement;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = motionQuery.matches;

  const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
  const smoothstep = (a, b, v) => {
    const t = clamp((v - a) / (b - a));
    return t * t * (3 - 2 * t);
  };

  const header = document.querySelector('[data-header]');
  const hero = document.querySelector('[data-hero]');
  const about = document.querySelector('[data-about]');
  const works = document.getElementById('work');

  /* ------------------------------------------------------------------------
     1. Contacts: every email / WhatsApp / Telegram / Instagram link on the page
     is filled from here, so a new number or username is a one-line change.
     Links with an empty value stay inert until it is filled in.
     ------------------------------------------------------------------------ */
  const CONTACTS = {
    email: 'iryna.consy@gmail.com',
    whatsapp: '37367280768',
    telegram: '+37367280768',      // by phone for now; TODO: switch to the username once it is set
    instagram: 'consy.co',
  };
  const contactUrl = (kind, link) => {
    const value = CONTACTS[kind];
    if (!value) return '';
    if (kind === 'email') {
      const q = [];
      if (link.dataset.subject) q.push(`subject=${encodeURIComponent(link.dataset.subject)}`);
      if (link.dataset.body) q.push(`body=${encodeURIComponent(link.dataset.body)}`);
      return `mailto:${value}${q.length ? `?${q.join('&')}` : ''}`;
    }
    if (kind === 'whatsapp') return `https://wa.me/${value}`;
    if (kind === 'telegram') return `https://t.me/${value}`;
    if (kind === 'instagram') return `https://instagram.com/${value}`;
    return '';
  };
  document.querySelectorAll('a[data-contact]').forEach((link) => {
    const url = contactUrl(link.dataset.contact, link);
    if (!url) { link.setAttribute('data-placeholder', ''); link.setAttribute('aria-disabled', 'true'); return; }
    link.href = url;
    if (!url.startsWith('mailto:')) { link.target = '_blank'; link.rel = 'noopener'; }
  });

  // Placeholder links (no real URL yet) do nothing when clicked
  document.querySelectorAll('a[data-placeholder]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });

  const params = new URLSearchParams(window.location.search);
  const dolly = 0; // extra camera push (unused since the page scrolls freely)

  /* ------------------------------------------------------------------------
     2. Contact button on the second screen: a click opens an email (filled in
     above); hovering also shows WhatsApp and Telegram, keyboard focus too (CSS).
     ------------------------------------------------------------------------ */
  const contactPop = document.querySelector('[data-contact-pop]');
  // only where a real pointer hovers; on touch screens a tap simply opens the email
  if (contactPop && window.matchMedia('(hover: hover)').matches) {
    contactPop.addEventListener('mouseenter', () => contactPop.classList.add('is-open'));
    contactPop.addEventListener('mouseleave', () => contactPop.classList.remove('is-open'));
  }

  /* ------------------------------------------------------------------------
     4. Package choice → booking
     The choice is kept in the URL (?package=launch#book), in a hidden input
     and in data-package on the booking block, and announced with a
     "consy:package" event so a Cal.com / Calendly embed can pick it up.
     ------------------------------------------------------------------------ */
  const PACKAGES = { launch: 'Launch', website: 'Website', product: 'Product' };
  const packageInput = document.querySelector('[data-package-input]');
  const booking = document.querySelector('[data-booking]');
  const bookSection = document.getElementById('book');
  const bookTitle = document.getElementById('book-title');

  const setPackage = (key) => {
    const name = PACKAGES[key];
    if (!name) return false;
    packageInput.value = name;
    booking.dataset.package = key;
    document.dispatchEvent(new CustomEvent('consy:package', { detail: { key, name } }));
    return true;
  };

  document.querySelectorAll('[data-pick]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const key = button.dataset.pick;
      if (!setPackage(key)) return;
      event.preventDefault();
      const url = new URL(window.location.href);
      url.searchParams.set('package', key);
      url.hash = 'book';
      history.replaceState(null, '', url);
      bookSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      bookTitle.focus({ preventScroll: true });
    });
  });

  if (params.get('package')) setPackage(params.get('package').toLowerCase());

  /* ------------------------------------------------------------------------
     5. Reveal on scroll (gentle fade-and-rise) + word-by-word description
     ------------------------------------------------------------------------ */
  const wordBlocks = Array.from(document.querySelectorAll('[data-words]'));
  if (!reduceMotion) {
    wordBlocks.forEach((el, line) => {
      const text = el.textContent.trim();
      el.setAttribute('aria-label', text);
      el.textContent = '';
      text.split(/\s+/).forEach((word, i, all) => {
        const span = document.createElement('span');
        span.className = 'w';
        span.setAttribute('aria-hidden', 'true');
        span.style.setProperty('--wi', String(i + line * 10));
        span.textContent = word;
        el.appendChild(span);
        if (i < all.length - 1) el.appendChild(document.createTextNode(' '));
      });
    });
  }

  const revealItems = document.querySelectorAll('[data-reveal]');
  const wordItems = document.querySelectorAll('[data-words], [data-words-follow]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
    wordItems.forEach((el) => el.classList.add('is-in'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(entry.target.matches('[data-reveal]') ? 'is-visible' : 'is-in');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    revealItems.forEach((el) => revealObserver.observe(el));
    wordItems.forEach((el) => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------------
     6. Work: columns of equal tiles drifting up and down in a loop
     Tiles are colour compositions (works/compositions.js): 600×400 sketches
     scaled to the tile. data-col is the desktop column; on narrower screens
     tiles are spread over 3 or 2 columns. Each column is doubled so the drift
     loops seamlessly; neighbouring columns move in opposite directions (CSS).
     ------------------------------------------------------------------------ */
  const gallery = document.querySelector('[data-gallery]');
  if (gallery && window.CONSY_WORKS && window.renderComposition) {
    const tiles = window.CONSY_WORKS.map((work) => {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.dataset.col = String(work.col);
      tile.setAttribute('role', 'img');
      tile.setAttribute('aria-label', `Concept: ${work.name}, ${work.kind}`);
      tile.innerHTML = window.renderComposition(work);
      return tile;
    });
    const SPEEDS = [78, 92, 84, 98]; // seconds per loop, slightly different per column
    let built = 0;

    const fit = () => {
      const tile = gallery.querySelector('.tile');
      if (tile) gallery.style.setProperty('--tile-scale', (tile.getBoundingClientRect().width / 600).toFixed(4));
    };

    const build = () => {
      const cols = Number(getComputedStyle(gallery).getPropertyValue('--cols')) || 4;
      if (cols !== built) {
        built = cols;
        gallery.textContent = '';
        const tracks = [];
        for (let c = 0; c < cols; c++) {
          const col = document.createElement('div');
          col.className = 'gcol';
          const track = document.createElement('div');
          track.className = 'gtrack';
          track.style.setProperty('--dur', `${SPEEDS[c % SPEEDS.length]}s`);
          col.appendChild(track);
          gallery.appendChild(col);
          tracks.push(track);
        }
        tiles.forEach((tile, i) => {
          tracks[cols === 4 ? Number(tile.dataset.col) - 1 : i % cols].appendChild(tile);
        });
        // a column shorter than the visible window repeats its own tiles (whole sets, so the
        // same tile never sits next to itself) until it fills the window
        const rows = Number(getComputedStyle(gallery).getPropertyValue('--rows')) || 3;
        tracks.forEach((track) => {
          const own = Array.from(track.children);
          if (!own.length) return;
          while (track.children.length < rows) {
            own.forEach((tile) => {
              const copy = tile.cloneNode(true);
              copy.setAttribute('aria-hidden', 'true');
              copy.removeAttribute('role');
              copy.removeAttribute('aria-label');
              track.appendChild(copy);
            });
          }
        });
        if (!reduceMotion) {
          tracks.forEach((track) => {
            Array.from(track.children).forEach((tile) => {
              const copy = tile.cloneNode(true);
              copy.setAttribute('aria-hidden', 'true');
              copy.removeAttribute('role');
              copy.removeAttribute('aria-label');
              track.appendChild(copy);
            });
            track.classList.add('is-looping');
          });
        }
      }
      fit();
    };

    build();
    window.addEventListener('resize', () => requestAnimationFrame(build));
  }

  /* ------------------------------------------------------------------------
     7. The meadow
     A night meadow drawn with WebGL point sprites. Every leaf and flower is
     drawn by the fragment shader (no image assets), so it loads instantly.
     The cursor (or a finger) is a soft light: flowers near it brighten and
     open; they close again slowly after the light moves on.
     ------------------------------------------------------------------------ */
  const canvas = document.querySelector('[data-meadow]');
  let meadow = null;
  let rafId = 0;
  let aboutEnd = 0;
  let darkEnd = 0; // the header stays dark over the hero, the description and the dark gallery
  let darkAgain = Infinity; // ...and again from the dark About section down to the black footer
  let heroH = 1;

  const measure = () => {
    heroH = hero.offsetHeight || window.innerHeight;
    aboutEnd = about.offsetTop + about.offsetHeight;
    darkEnd = works ? works.offsetTop + works.offsetHeight : aboutEnd;
    const me = document.getElementById('me');
    darkAgain = me ? me.offsetTop : Infinity;
    if (meadow) meadow.resize();
  };

  const applyHeader = () => {
    const mid = window.scrollY + header.offsetHeight * 0.5;
    const dark = mid < darkEnd || mid >= darkAgain;
    const theme = dark ? 'dark' : 'light';
    if (header.dataset.theme !== theme) header.dataset.theme = theme;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  function tick(now) {
    rafId = 0;
    applyHeader();
    if (!meadow) return;
    const needed = !document.hidden && window.scrollY < aboutEnd;
    canvas.style.visibility = needed ? 'visible' : 'hidden';
    if (!needed) return;
    meadow.frame(now, clamp(window.scrollY / heroH, 0, 1.6), dolly);
    if (!reduceMotion) rafId = requestAnimationFrame(tick);
  }
  function requestTick() {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function createMeadow(el) {
    let gl = null;
    try {
      gl = el.getContext('webgl', {
        alpha: false, antialias: false, depth: false, stencil: false,
        premultipliedAlpha: true, powerPreference: 'high-performance',
      });
    } catch (error) { gl = null; }
    if (!gl) return null;

    /* ---------- shaders ---------- */

    const FLORA_VS = `
      attribute vec3 aPos;
      attribute vec4 aShape;   // size (world units), type, rotation, seed
      attribute vec3 aColor;
      attribute float aBloom;
      uniform mat4 uVP;
      uniform vec2 uRes;
      uniform vec2 uMouse;
      uniform vec2 uMouse2;
      uniform float uLightR;
      uniform float uLight;
      uniform float uLight2;
      uniform float uTime;
      uniform float uScale;
      uniform float uMaxSize;
      uniform float uFocus;
      uniform float uDim;
      varying vec3 vColor;
      varying float vType;
      varying float vRot;
      varying float vSeed;
      varying float vBloom;
      varying float vEdge;
      varying float vLit;
      varying float vAmb;
      void main() {
        vec3 p = aPos;
        float h = max(p.y, 0.0);
        p.x += sin(uTime * 0.6 + aShape.w * 6.2831 + p.z * 0.21) * 0.028 * h;
        p.z += cos(uTime * 0.45 + aShape.w * 4.0) * 0.014 * h;
        vec4 clip = uVP * vec4(p, 1.0);
        gl_Position = clip;
        float dist = max(clip.w, 0.05);
        vec2 ndc = clip.xy / dist;
        vec2 scr = vec2((ndc.x * 0.5 + 0.5) * uRes.x, (0.5 - ndc.y * 0.5) * uRes.y);
        float d = length(scr - uMouse) / uLightR;
        float d2 = length(scr - uMouse2) / uLightR;
        float lit = max(uLight * exp(-d * d), uLight2 * exp(-d2 * d2));
        float blur = clamp(abs(dist - uFocus) / 18.0, 0.0, 1.0) * 0.3 + clamp((2.4 - dist) * 0.24, 0.0, 0.5);
        float size = aShape.x * uScale / dist * (1.0 + blur * 0.5) * (aShape.y > 0.5 ? 1.35 : 1.0);
        gl_PointSize = clamp(size, 1.0, uMaxSize);
        vEdge = blur + 2.0 / max(size, 2.0);
        float fog = exp(-dist * 0.075);
        vAmb = (0.06 + 0.36 * fog) * uDim;
        vLit = lit * mix(0.3, 1.0, fog) * uDim;
        vColor = aColor;
        vType = aShape.y;
        vRot = aShape.z;
        vSeed = aShape.w;
        vBloom = aBloom;
      }`;

    const FLORA_FS = `
      precision mediump float;
      varying vec3 vColor;
      varying float vType;
      varying float vRot;
      varying float vSeed;
      varying float vBloom;
      varying float vEdge;
      varying float vLit;
      varying float vAmb;
      void main() {
        vec2 uv = gl_PointCoord * 2.0 - 1.0;
        uv.y = -uv.y;
        vec2 uv0 = uv;
        float c = cos(vRot);
        float s = sin(vRot);
        uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);
        float r = length(uv);
        vec3 col = vColor;
        float a;
        float halo = 0.0;
        float gain;
        if (vType < 0.5) {
          // a leaf or a fern frond, pointing up
          float y = uv.y * 1.04;
          float w = 0.34 * pow(max(1.0 - y * y, 0.0), 0.75);
          if (vSeed > 0.55) w *= 0.42 + 0.58 * abs(sin(y * 11.0 + vSeed * 20.0));
          a = 1.0 - smoothstep(-vEdge, vEdge, abs(uv.x) - w);
          col *= (0.7 + 0.45 * smoothstep(0.0, 0.2, abs(uv.x))) * (0.8 + 0.35 * (y * 0.5 + 0.5));
          gain = 2.0;
        } else {
          // a flower: petals open with vBloom
          float n = vType < 1.5 ? 5.0 : (vType < 2.5 ? 6.0 : (vType < 3.5 ? 12.0 : 4.0));
          // vBloom stages: 0 hidden → 0.15 bud appears → 0.3–0.45 bud unfolds → 1 fully open
          float b = vBloom;
          float appear = smoothstep(0.0, 0.15, b);
          float unfold = smoothstep(0.3, 0.45, b);
          float bo = smoothstep(0.3, 1.0, b);
          // open flower: petals turn outwards and grow as it opens
          float ang = atan(uv.y, uv.x) + (1.0 - bo) * 1.6 + vSeed * 6.2831;
          float petal = pow(abs(cos(ang * n * 0.5)), mix(2.4, 0.45, bo));
          float open = mix(0.2, 0.8, bo);
          float R = open * (0.45 + 0.55 * petal);
          float aOpen = 1.0 - smoothstep(R - vEdge, R + vEdge, r);
          float core = (1.0 - smoothstep(0.2 * open - vEdge, 0.2 * open + vEdge, r)) * unfold;
          vec3 petalCol = col * (0.58 + 0.55 * smoothstep(0.0, R + 0.001, r));
          petalCol = mix(petalCol, vec3(0.98, 0.9, 0.8), core * 0.85);
          // closed bud: a small upright teardrop, green at the base, petal colour at the tip
          vec2 q = vec2(uv0.x / 0.15, (uv0.y + 0.05) / 0.27) / max(mix(0.3, 1.0, appear), 0.01);
          q.x /= mix(1.0, 0.55, smoothstep(-0.2, 1.0, q.y));
          float aBud = 1.0 - smoothstep(1.0 - vEdge * 5.0, 1.0 + vEdge * 5.0, length(q));
          vec3 budCol = mix(vec3(0.3, 0.43, 0.28), col, smoothstep(-0.7, 0.5, q.y));
          a = mix(aBud, aOpen, unfold) * appear;
          col = mix(budCol, petalCol, unfold);
          col *= mix(0.6, 1.0, b);
          halo = exp(-r * r * 3.0) * (1.0 - smoothstep(0.7, 1.0, r)) * vLit * (0.4 + 0.9 * bo) * appear;
          gain = 2.6 + 2.6 * bo;
        }
        // tone-map the light level, not the colour, so lit flowers keep their hue
        float L = 1.0 - exp(-(vAmb + vLit * gain) * 1.3);
        vec3 rgb = col * L;
        gl_FragColor = vec4(rgb * a + vColor * halo * 0.55 * (1.0 - a), a);
      }`;

    const FLY_VS = `
      attribute vec4 aBase;    // x, y, z, size
      attribute vec4 aSeed;    // seed1, seed2, speed, phase
      uniform mat4 uVP;
      uniform float uTime;
      uniform float uScale;
      uniform float uDim;
      varying float vI;
      void main() {
        float t = uTime * aSeed.z;
        vec3 p = aBase.xyz + vec3(
          sin(t + aSeed.x * 6.2831) * 0.55 + sin(t * 0.37 + aSeed.y * 9.0) * 0.35,
          sin(t * 0.8 + aSeed.y * 6.2831) * 0.16,
          cos(t * 0.6 + aSeed.x * 4.0) * 0.45);
        vec4 clip = uVP * vec4(p, 1.0);
        gl_Position = clip;
        float blink = smoothstep(0.35, 1.0, sin(uTime * (0.45 + aSeed.y * 0.5) + aSeed.w * 30.0) * 0.5 + 0.5);
        float dist = max(clip.w, 0.05);
        vI = (0.25 + 0.95 * blink) * uDim * mix(0.4, 1.0, exp(-dist * 0.06));
        gl_PointSize = clamp(aBase.w * uScale / dist, 5.0, 56.0);
      }`;

    const FLY_FS = `
      precision mediump float;
      varying float vI;
      void main() {
        vec2 uv = gl_PointCoord * 2.0 - 1.0;
        float d = dot(uv, uv);
        float g = exp(-d * 5.0) * 0.55 + exp(-d * 45.0);
        gl_FragColor = vec4(vec3(1.0, 0.88, 0.78) * g * vI, 0.0);
      }`;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
      return sh;
    };
    const program = (vs, fs) => {
      const p = gl.createProgram();
      gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
      gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
      const u = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const name = gl.getActiveUniform(p, i).name;
        u[name] = gl.getUniformLocation(p, name);
      }
      return { p, u };
    };

    let flora;
    let fly;
    try {
      flora = program(FLORA_VS, FLORA_FS);
      fly = program(FLY_VS, FLY_FS);
    } catch (error) {
      return null;
    }

    const maxPoint = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)[1] || 64;

    /* ---------- the scene ---------- */

    // Small seeded random + value noise, so the meadow looks the same on every visit.
    let seed = 20261017;
    const rand = () => {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const hash = (x, y) => {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return s - Math.floor(s);
    };
    const noise = (x, y) => {
      const ix = Math.floor(x); const iy = Math.floor(y);
      const fx = x - ix; const fy = y - iy;
      const ux = fx * fx * (3 - 2 * fx); const uy = fy * fy * (3 - 2 * fy);
      const a = hash(ix, iy); const b = hash(ix + 1, iy);
      const c = hash(ix, iy + 1); const d = hash(ix + 1, iy + 1);
      return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
    };

    // A path winds into the dark; the banks rise on both sides of it.
    const pathX = (z) => Math.sin(z * 0.09) * 1.2 + (Math.sin(z * 0.031 + 1.3) - Math.sin(1.3)) * 1.8;
    const ground = (x, z) => {
      const dp = x - pathX(z);
      return Math.min(0.035 * dp * dp, 1.7);
    };

    // Flower species (petal type + colours). Colours are mixed from the brand
    // palette (Warm Clay, Rainwashed Blue, Mist, Paper), a little richer so they
    // read at night.
    const SPECIES = [
      { type: 1, colors: [[0.88, 0.5, 0.42], [0.94, 0.64, 0.56], [0.8, 0.42, 0.4]] },   // clay cosmos
      { type: 3, colors: [[0.96, 0.9, 0.88], [0.99, 0.96, 0.94], [0.93, 0.8, 0.76]] },   // paper daisies
      { type: 2, colors: [[0.55, 0.72, 0.92], [0.5, 0.6, 0.9], [0.62, 0.76, 0.96]] },  // rain bells
      { type: 1, colors: [[0.7, 0.58, 0.9], [0.8, 0.7, 0.94], [0.62, 0.52, 0.84]] },    // mist lilac
      { type: 4, colors: [[0.98, 0.97, 0.95], [0.93, 0.78, 0.72], [0.82, 0.86, 0.95]] },  // tiny stars
    ];
    const LEAVES = [[0.2, 0.3, 0.22], [0.25, 0.35, 0.23], [0.17, 0.25, 0.2], [0.38, 0.33, 0.21], [0.3, 0.37, 0.23]];
    const pick = (list) => list[Math.floor(rand() * list.length)];

    let count = 0;
    let flowerIdx = null;
    let baseBloom = null;
    let openMax = null;
    let bloom = null;
    let screenSpan = 0;
    let flyCount = 0;
    const buffers = {
      pos: gl.createBuffer(), shape: gl.createBuffer(), color: gl.createBuffer(),
      bloom: gl.createBuffer(), flyBase: gl.createBuffer(), flySeed: gl.createBuffer(),
    };
    let positions = null;

    function build(aspect, area) {
      seed = 20261017;
      const tanH = Math.tan(fovFor(aspect) / 2) * aspect;
      const n = Math.round(clamp(area / 95, 5200, 13000));
      const items = [];
      let guard = 0;
      // tall (portrait) screens look further down, so the field starts closer to the camera
      // there; otherwise the bottom of a phone screen falls on bare, dark ground
      const nearStart = 0.9 - 0.8 * smoothstep(1.0, 0.6, aspect);
      while (items.length < n && guard++ < n * 6) {
        const z = -(nearStart + Math.pow(rand(), 2.2) * 34);
        const halfW = Math.abs(z) * tanH * 1.1 + 1.0;
        const px = pathX(z);
        const x = px + (rand() * 2 - 1) * halfW;
        const dp = Math.abs(x - px);
        // Keep the far field (around the headline) calm and sparse.
        const far = smoothstep(4, 14, Math.abs(z));
        if (rand() < far * 0.6) continue;
        const patch = noise(x * 0.35 + 3.1, z * 0.35);
        const near = 1 - smoothstep(3, 11, Math.abs(z));
        // Fewer flowers: mostly foliage, with flowers in loose patches
        const flower = rand() < 0.08 + 0.08 * near + 0.3 * smoothstep(0.45, 0.8, patch);
        const g = ground(x, z);
        const side = smoothstep(1.2, 4.5, dp);
        if (flower) {
          const sp = rand() < 0.18 ? pick(SPECIES) : SPECIES[Math.floor(noise(x * 0.75 + 10, z * 0.6 - 4) * SPECIES.length * 0.999)];
          const tiny = sp.type === 4;
          items.push([x, g + 0.06 + rand() * 0.34 * (0.6 + 0.7 * side), z,
            tiny ? 0.045 + rand() * 0.03 : 0.07 + rand() * 0.07, sp.type, rand() * 6.283, rand(), pick(sp.colors)]);
        } else if (rand() < 0.16 * side) {
          // leaflets on tall stems at the sides, like the branches framing the view
          items.push([x, g + 0.55 + rand() * 1.15, z, 0.05 + rand() * 0.06, 0, rand() * 6.283, rand(), pick(LEAVES)]);
        } else {
          const blade = rand() < 0.3;
          items.push([x, g + Math.pow(rand(), 1.5) * (0.16 + 0.55 * side), z,
            blade ? 0.08 + rand() * 0.09 : 0.06 + rand() * 0.07, 0, blade ? (rand() - 0.5) * 0.9 : rand() * 6.283, rand(), pick(LEAVES)]);
        }
      }
      items.sort((a, b) => a[2] - b[2]); // far first: painter's order

      count = items.length;
      positions = new Float32Array(count * 3);
      const shape = new Float32Array(count * 4);
      const color = new Float32Array(count * 3);
      bloom = new Float32Array(count);
      baseBloom = new Float32Array(count);
      openMax = new Float32Array(count);
      const fl = [];
      items.forEach((it, i) => {
        positions.set([it[0], it[1], it[2]], i * 3);
        shape.set([it[3], it[4], it[5], it[6]], i * 4);
        color.set(it[7], i * 3);
        if (it[4] > 0) {
          fl.push(i);
          // most flowers are hidden in the dark; a few rest as buds or half-open
          const r0 = rand();
          baseBloom[i] = r0 < 0.62 ? 0 : r0 < 0.8 ? 0.18 + rand() * 0.1 : 0.48 + rand() * 0.12;
          openMax[i] = 0.72 + rand() * 0.28;
          bloom[i] = baseBloom[i];
        }
      });
      flowerIdx = Uint32Array.from(fl);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.pos);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.shape);
      gl.bufferData(gl.ARRAY_BUFFER, shape, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
      gl.bufferData(gl.ARRAY_BUFFER, color, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.bloom);
      gl.bufferData(gl.ARRAY_BUFFER, bloom, gl.DYNAMIC_DRAW);

      // Fireflies drift above the path.
      flyCount = Math.round(clamp(area / 5700, 90, 225));
      const fb = new Float32Array(flyCount * 4);
      const fs = new Float32Array(flyCount * 4);
      for (let i = 0; i < flyCount; i++) {
        const z = -(1.5 + Math.pow(rand(), 1.3) * 24);
        const x = pathX(z) + (rand() * 2 - 1) * (Math.abs(z) * 0.45 + 1.2);
        const high = rand() < 0.2 ? 0.8 + rand() * 1.4 : 0; // a few drift up into the dark sky
        fb.set([x, ground(x, z) + 0.12 + rand() * 1.1 + high, z, 0.024 + rand() * 0.032], i * 4);
        fs.set([rand(), rand(), 0.15 + rand() * 0.3, rand()], i * 4);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.flyBase);
      gl.bufferData(gl.ARRAY_BUFFER, fb, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.flySeed);
      gl.bufferData(gl.ARRAY_BUFFER, fs, gl.STATIC_DRAW);
      screenSpan = aspect;
    }

    /* ---------- camera ---------- */

    function fovFor(aspect) {
      // keep a similar horizontal view on phones (portrait) and desktops
      const v = 2 * Math.atan(Math.tan((22 * Math.PI) / 180) / aspect);
      return clamp(v, (50 * Math.PI) / 180, (74 * Math.PI) / 180);
    }

    const vp = new Float32Array(16);
    function camera(aspect, ex, ey, ez, tx, ty, tz) {
      const f = 1 / Math.tan(fovFor(aspect) / 2);
      const near = 0.1;
      const far = 120;
      // view: lookAt
      let zx = ex - tx; let zy = ey - ty; let zz = ez - tz;
      let l = Math.hypot(zx, zy, zz); zx /= l; zy /= l; zz /= l;
      let xx = zz; let xy = 0; let xz = -zx; // cross(up(0,1,0), z)
      l = Math.hypot(xx, xy, xz); xx /= l; xz /= l;
      const yx = zy * xz - zz * xy; const yy = zz * xx - zx * xz; const yz = zx * xy - zy * xx;
      const view = [
        xx, yx, zx, 0,
        xy, yy, zy, 0,
        xz, yz, zz, 0,
        -(xx * ex + xy * ey + xz * ez), -(yx * ex + yy * ey + yz * ez), -(zx * ex + zy * ey + zz * ez), 1,
      ];
      const nf = 1 / (near - far);
      const proj = [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0];
      for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 4; r++) {
          vp[c * 4 + r] = proj[r] * view[c * 4] + proj[4 + r] * view[c * 4 + 1] + proj[8 + r] * view[c * 4 + 2] + proj[12 + r] * view[c * 4 + 3];
        }
      }
      return f;
    }

    /* ---------- pointer = a soft light ---------- */

    const pointer = { x: 0, y: 0, lastMove: -1e9, inside: false, touch: false };
    // both lights start already on, so flowers begin to open right after the page appears
    const light = { x: 0, y: 0, on: reduceMotion ? 0 : 0.8 };
    const light2 = { x: 0, y: 0, on: reduceMotion ? 0 : 0.7 };
    const touchScreen = window.matchMedia('(hover: none)').matches;
    const cam = { x: 0, y: 0 };
    const onMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.lastMove = performance.now();
      pointer.inside = true;
      pointer.touch = event.pointerType === 'touch';
      if (reduceMotion) requestTick();
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    window.addEventListener('pointerup', (event) => { if (event.pointerType === 'touch') pointer.inside = false; }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { pointer.inside = false; });
    window.addEventListener('blur', () => { pointer.inside = false; });

    /* ---------- size ---------- */

    let W = 0;
    let H = 0;
    let dpr = 1;
    let cssW = 1;
    let cssH = 1;
    let slowFrames = 0;
    let dprCap = 1.5;

    function resize() {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      W = Math.round(cssW * dpr);
      H = Math.round(cssH * dpr);
      if (el.width !== W || el.height !== H) {
        el.width = W;
        el.height = H;
      }
      const aspect = cssW / cssH;
      if (!count || Math.abs(aspect - screenSpan) / screenSpan > 0.18) build(aspect, cssW * cssH);
    }

    /* ---------- draw ---------- */

    let t = 0;
    let last = 0;

    function attr(prog, name, buffer, size) {
      const loc = gl.getAttribLocation(prog, name);
      if (loc < 0) return -1;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      return loc;
    }

    function frame(now, scroll, dollyIn) {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 1 / 60;
      last = now;
      if (!reduceMotion) {
        t += dt;
        // If the device struggles, render at a lower resolution.
        if (dt > 0.03) slowFrames++; else slowFrames = Math.max(0, slowFrames - 1);
        if (slowFrames > 45 && dprCap > 1) { dprCap = 1; slowFrames = 0; resize(); }
      }
      const k = (rate) => (reduceMotion ? 1 : 1 - Math.exp(-dt * rate));

      // Light: follows the pointer; when nobody moves it, it wanders on its own.
      const idle = now - pointer.lastMove > 3500 || (!pointer.inside && now - pointer.lastMove > 900);
      let tx;
      let ty;
      if (!idle) {
        tx = pointer.x;
        ty = pointer.y;
      } else {
        const wt = t * 0.9;
        tx = cssW * (0.5 + 0.34 * Math.sin(wt * 0.13) + 0.08 * Math.sin(wt * 0.41));
        ty = cssH * (0.74 + 0.1 * Math.sin(wt * 0.17 + 1));
      }
      const onTarget = reduceMotion && idle ? 0 : idle ? 0.9 : 1;
      if (!light.x && !light.y) { light.x = tx; light.y = ty; }
      light.x += (tx - light.x) * k(idle ? 1.5 : 7);
      light.y += (ty - light.y) * k(idle ? 1.5 : 7);
      light.on += (onTarget - light.on) * k(2);

      // A second, slower light wanders by itself on touch screens (no hover there)
      // and on desktops when nobody moves the mouse, so the meadow never stands still.
      const wt2 = t * 0.8 + 40;
      const t2x = cssW * (0.5 + 0.38 * Math.sin(wt2 * 0.11 + 2.4) + 0.06 * Math.sin(wt2 * 0.37));
      const t2y = cssH * (0.8 + 0.1 * Math.sin(wt2 * 0.15 + 0.5));
      if (!light2.x && !light2.y) { light2.x = t2x; light2.y = t2y; }
      light2.x += (t2x - light2.x) * k(1.2);
      light2.y += (t2y - light2.y) * k(1.2);
      const on2 = reduceMotion ? 0 : touchScreen ? 0.85 : idle ? 0.7 : 0;
      light2.on += (on2 - light2.on) * k(1.2);

      // Camera: idle drift, a little parallax, and a walk forward into the meadow on scroll.
      const nx = idle ? 0 : (pointer.x / cssW - 0.5) * 2;
      const ny = idle ? 0 : (pointer.y / cssH - 0.5) * 2;
      cam.x += (nx - cam.x) * k(1.6);
      cam.y += (ny - cam.y) * k(1.6);
      const drift = reduceMotion ? 0 : 1;
      const walk = dollyIn + smoothstep(0, 1.5, scroll) * 6.5; // scrolling walks you into the meadow
      const ez = 0.6 - walk;
      const ex = pathX(ez) * 0.6 + cam.x * 0.22 + Math.sin(t * 0.07) * 0.18 * drift;
      // on tall (portrait) screens look a little down, so the meadow sits low under the headline
      const PORTRAIT_TILT = 0.75;
      const portrait = smoothstep(1.1, 0.6, cssW / cssH);
      const ey = 0.95 + portrait * 0.25 - cam.y * 0.08 + Math.sin(t * 0.11) * 0.04 * drift - smoothstep(0, 1.2, scroll) * 0.2;
      const tz = ez - 10;
      const f = camera(cssW / cssH, ex, ey, ez, pathX(tz) * 0.5 + cam.x * 0.4, 0.78 - portrait * PORTRAIT_TILT - cam.y * 0.15, tz);
      const scale = (H / 2) * f;
      // the meadow dims halfway under the description, then goes fully dark before the gallery
      const dim = 1 - 0.5 * smoothstep(0.05, 1.0, scroll) - 0.5 * smoothstep(1.15, 1.6, scroll);

      // Bloom: flowers near the light open quickly and close slowly.
      const lr = Math.min(W, H) * (touchScreen ? 0.22 : 0.17) + 60 * dpr;
      const mx = light.x * dpr;
      const my = light.y * dpr;
      const mx2 = light2.x * dpr;
      const my2 = light2.y * dpr;
      const open = k(1.5);
      const close = k(0.22);
      for (let j = 0; j < flowerIdx.length; j++) {
        const i = flowerIdx[j];
        const x = positions[i * 3]; const y = positions[i * 3 + 1]; const z = positions[i * 3 + 2];
        const cw = vp[3] * x + vp[7] * y + vp[11] * z + vp[15];
        let target = baseBloom[i];
        if (cw > 0.1) {
          const sx = ((vp[0] * x + vp[4] * y + vp[8] * z + vp[12]) / cw * 0.5 + 0.5) * W;
          const sy = (0.5 - (vp[1] * x + vp[5] * y + vp[9] * z + vp[13]) / cw * 0.5) * H;
          const d = Math.hypot(sx - mx, sy - my) / lr;
          const d2 = Math.hypot(sx - mx2, sy - my2) / lr;
          const lit = Math.max(light.on * Math.exp(-d * d), light2.on * Math.exp(-d2 * d2));
          target = Math.max(target, smoothstep(0.12, 0.65, lit) * openMax[i]);
        }
        const b = bloom[i];
        bloom[i] = b + (target - b) * (target > b ? open : close);
      }

      gl.viewport(0, 0, W, H);
      gl.clearColor(0.055, 0.055, 0.067, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      // flora
      gl.useProgram(flora.p);
      const u = flora.u;
      gl.uniformMatrix4fv(u.uVP, false, vp);
      gl.uniform2f(u.uRes, W, H);
      gl.uniform2f(u.uMouse, mx, my);
      gl.uniform2f(u.uMouse2, mx2, my2);
      gl.uniform1f(u.uLight2, light2.on);
      gl.uniform1f(u.uLightR, lr);
      gl.uniform1f(u.uLight, light.on);
      gl.uniform1f(u.uTime, t);
      gl.uniform1f(u.uScale, scale);
      gl.uniform1f(u.uMaxSize, maxPoint);
      gl.uniform1f(u.uFocus, 5.5);
      gl.uniform1f(u.uDim, dim);
      const l1 = attr(flora.p, 'aPos', buffers.pos, 3);
      const l2 = attr(flora.p, 'aShape', buffers.shape, 4);
      const l3 = attr(flora.p, 'aColor', buffers.color, 3);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.bloom);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, bloom);
      const l4 = attr(flora.p, 'aBloom', buffers.bloom, 1);
      gl.drawArrays(gl.POINTS, 0, count);
      [l1, l2, l3, l4].forEach((l) => { if (l >= 0) gl.disableVertexAttribArray(l); });

      // fireflies
      gl.useProgram(fly.p);
      gl.uniformMatrix4fv(fly.u.uVP, false, vp);
      gl.uniform1f(fly.u.uTime, t);
      gl.uniform1f(fly.u.uScale, scale);
      gl.uniform1f(fly.u.uDim, dim);
      const f1 = attr(fly.p, 'aBase', buffers.flyBase, 4);
      const f2 = attr(fly.p, 'aSeed', buffers.flySeed, 4);
      gl.drawArrays(gl.POINTS, 0, flyCount);
      [f1, f2].forEach((l) => { if (l >= 0) gl.disableVertexAttribArray(l); });

      if (!root.classList.contains('meadow-ready')) root.classList.add('meadow-ready');
    }

    el.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      meadow = null;
      root.classList.remove('meadow-ready');
    });

    resize();
    return { frame, resize };
  }

  /* ---------- wiring ---------- */

  measure();
  applyHeader();

  window.addEventListener('scroll', requestTick, { passive: true });
  document.addEventListener('visibilitychange', requestTick);
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { measure(); requestTick(); }, 120);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); requestTick(); });
  if (motionQuery.addEventListener) {
    motionQuery.addEventListener('change', (event) => { reduceMotion = event.matches; requestTick(); });
  }

  // Start the meadow right after the first paint.
  requestAnimationFrame(() => {
    meadow = canvas ? createMeadow(canvas) : null;
    measure();
    requestTick();
  });
})();
