// Original SVG illustrations for the Nomi site: little nomes, the nome tree,
// mushrooms, flowers, sun, clouds and UI icons. Colors of a nome are set per
// instance with CSS custom properties (--hat, --coat, --pants, --beard).

const SKIN = '#f8cfae';
const INK = '#3a2a1f';
const BOOT = '#6b3f22';

// One hidden sprite per page; everything else references it with <use>.
export const sprite = `
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="nome-face" viewBox="0 0 60 110">
      <circle cx="15.5" cy="50" r="4" fill="${SKIN}"/>
      <circle cx="44.5" cy="50" r="4" fill="${SKIN}"/>
      <circle cx="30" cy="48" r="15" fill="${SKIN}"/>
      <circle cx="24.5" cy="48.5" r="2.3" fill="${INK}"/>
      <circle cx="35.5" cy="48.5" r="2.3" fill="${INK}"/>
      <circle cx="25.3" cy="47.6" r=".8" fill="#fff"/>
      <circle cx="36.3" cy="47.6" r=".8" fill="#fff"/>
      <circle cx="20.5" cy="54.5" r="3.2" fill="#ff8a80" opacity=".5"/>
      <circle cx="39.5" cy="54.5" r="3.2" fill="#ff8a80" opacity=".5"/>
      <path d="M25.5 57 Q30 61.5 34.5 57" stroke="${INK}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
      <ellipse cx="30" cy="53" rx="3.4" ry="2.8" fill="#ee9f80"/>
      <path d="M9 42 C 12 30, 22 22, 30 14 C 35 9, 41 4, 47 1 C 43 10, 41 18, 44 28 C 47 33, 50.5 37, 51 42 C 37 37, 23 37, 9 42 Z" fill="var(--hat,#e84a3c)"/>
      <path d="M9 42 C 23 37, 37 37, 51 42 L 51 45.5 C 37 40.5, 23 40.5, 9 45.5 Z" fill="#000" opacity=".14"/>
      <circle cx="47" cy="1.8" r="2.6" fill="var(--pom,#fff6e0)"/>
    </symbol>

    <symbol id="nome" viewBox="0 0 60 110">
      <ellipse cx="21" cy="104" rx="8" ry="4.5" fill="${BOOT}"/>
      <ellipse cx="39" cy="104" rx="8" ry="4.5" fill="${BOOT}"/>
      <rect x="18" y="88" width="7" height="15" rx="3" fill="var(--pants,#6a5440)"/>
      <rect x="35" y="88" width="7" height="15" rx="3" fill="var(--pants,#6a5440)"/>
      <path d="M15 67 Q7 76 10 86" stroke="var(--coat,#4c9a5b)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M45 67 Q53 76 50 86" stroke="var(--coat,#4c9a5b)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <circle cx="10" cy="87" r="3.6" fill="${SKIN}"/>
      <circle cx="50" cy="87" r="3.6" fill="${SKIN}"/>
      <path d="M17 62 Q30 57 43 62 L48 93 Q30 98 12 93 Z" fill="var(--coat,#4c9a5b)"/>
      <rect x="13.5" y="79" width="33" height="5" rx="2.5" fill="${BOOT}"/>
      <rect x="27" y="78" width="6" height="7" rx="1.5" fill="#ffc93c"/>
      <use href="#nome-face" width="60" height="110"/>
    </symbol>

    <symbol id="nome-wave" viewBox="0 0 60 110">
      <ellipse cx="21" cy="104" rx="8" ry="4.5" fill="${BOOT}"/>
      <ellipse cx="39" cy="104" rx="8" ry="4.5" fill="${BOOT}"/>
      <rect x="18" y="88" width="7" height="15" rx="3" fill="var(--pants,#6a5440)"/>
      <rect x="35" y="88" width="7" height="15" rx="3" fill="var(--pants,#6a5440)"/>
      <path d="M15 67 Q7 76 10 86" stroke="var(--coat,#4c9a5b)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <g class="wave-arm">
        <path d="M45 66 Q55 60 55 48" stroke="var(--coat,#4c9a5b)" stroke-width="7" stroke-linecap="round" fill="none"/>
        <circle cx="55" cy="45.5" r="3.8" fill="${SKIN}"/>
      </g>
      <circle cx="10" cy="87" r="3.6" fill="${SKIN}"/>
      <path d="M17 62 Q30 57 43 62 L48 93 Q30 98 12 93 Z" fill="var(--coat,#4c9a5b)"/>
      <rect x="13.5" y="79" width="33" height="5" rx="2.5" fill="${BOOT}"/>
      <rect x="27" y="78" width="6" height="7" rx="1.5" fill="#ffc93c"/>
      <use href="#nome-face" width="60" height="110"/>
    </symbol>

    <symbol id="nome-elder" viewBox="0 0 60 110">
      <use href="#nome" width="60" height="110"/>
      <path d="M16 51 Q16 72 30 77 Q44 72 44 51 Q38 59 30 58.5 Q22 59 16 51 Z" fill="var(--beard,#f6f1e7)"/>
      <path d="M22 56 Q30 60 38 56 Q34 54 30 55 Q26 54 22 56Z" fill="var(--beard,#f6f1e7)"/>
      <ellipse cx="30" cy="53" rx="3.6" ry="3" fill="#ee9f80"/>
    </symbol>

    <symbol id="nome-sit" viewBox="0 0 70 100">
      <path d="M22 84 Q22 96 12 96" stroke="var(--pants,#6a5440)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M40 84 Q40 96 50 96" stroke="var(--pants,#6a5440)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <ellipse cx="9" cy="97" rx="6.5" ry="4" fill="${BOOT}"/>
      <ellipse cx="53" cy="97" rx="6.5" ry="4" fill="${BOOT}"/>
      <path d="M17 62 Q30 57 43 62 L46 86 Q30 90 14 86 Z" fill="var(--coat,#4c9a5b)"/>
      <path d="M16 67 Q10 76 18 82" stroke="var(--coat,#4c9a5b)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M44 67 Q50 76 42 82" stroke="var(--coat,#4c9a5b)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <circle cx="19" cy="83" r="3.6" fill="${SKIN}"/>
      <circle cx="41" cy="83" r="3.6" fill="${SKIN}"/>
      <use href="#nome-face" width="60" height="110" y="0"/>
    </symbol>

    <symbol id="mushroom" viewBox="0 0 80 80">
      <path d="M30 40 Q28 64 24 76 Q40 80 56 76 Q52 64 50 40 Z" fill="#fff4e3"/>
      <path d="M30 40 Q28 64 24 76 Q30 77.5 34 77.8 Q33 60 36 40Z" fill="#000" opacity=".06"/>
      <path d="M4 42 Q6 6 40 4 Q74 6 76 42 Q40 50 4 42 Z" fill="var(--cap,#e84a3c)"/>
      <circle cx="24" cy="22" r="6" fill="#fff"/>
      <circle cx="46" cy="14" r="4.5" fill="#fff"/>
      <circle cx="58" cy="30" r="5.5" fill="#fff"/>
      <circle cx="36" cy="34" r="3.5" fill="#fff"/>
      <circle cx="13" cy="36" r="3" fill="#fff"/>
    </symbol>

    <symbol id="flower" viewBox="0 0 30 50">
      <path d="M15 22 Q13 36 15 50" stroke="#3f9a4b" stroke-width="2.4" fill="none"/>
      <path d="M15 38 Q6 33 5 38 Q10 42 15 40Z" fill="#5bb85c"/>
      <g fill="var(--petal,#ff8fb1)">
        <circle cx="15" cy="8" r="6"/><circle cx="23" cy="14" r="6"/><circle cx="20" cy="23" r="6"/>
        <circle cx="10" cy="23" r="6"/><circle cx="7" cy="14" r="6"/>
      </g>
      <circle cx="15" cy="16" r="4.5" fill="#ffc93c"/>
    </symbol>

    <symbol id="cloud" viewBox="0 0 120 60">
      <path d="M18 52 Q2 52 4 38 Q6 26 20 28 Q22 10 42 10 Q56 2 70 14 Q86 6 96 22 Q116 22 116 38 Q116 52 100 52 Z" fill="#fff"/>
    </symbol>

    <symbol id="bee" viewBox="0 0 40 30">
      <ellipse cx="15" cy="7" rx="7" ry="5" fill="#fff" opacity=".85" transform="rotate(-20 15 7)"/>
      <ellipse cx="25" cy="7" rx="7" ry="5" fill="#fff" opacity=".85" transform="rotate(20 25 7)"/>
      <ellipse cx="20" cy="18" rx="12" ry="9" fill="#ffc93c"/>
      <path d="M16 10 Q14 18 16 26 M23 10 Q25 18 23 26" stroke="${INK}" stroke-width="3" fill="none"/>
      <circle cx="30" cy="16" r="1.6" fill="${INK}"/>
      <path d="M8 18 L3 18" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
    </symbol>

    <symbol id="leaf" viewBox="0 0 24 24">
      <path d="M4 20 C 4 9, 11 4, 21 3 C 20 13, 15 20, 4 20 Z" fill="currentColor"/>
      <path d="M4 20 L14 10" stroke="#fff" stroke-width="1.5" opacity=".6"/>
    </symbol>

    <symbol id="i-speech" viewBox="0 0 24 24"><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 10h8M8 13h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
    <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9-9.2C1.6 7.4 3.8 4 7.2 4c2 0 3.6 1.2 4.8 3 1.2-1.8 2.8-3 4.8-3 3.4 0 5.6 3.4 4.2 6.8C19 15.6 12 20 12 20z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 6.5 12 13l8.5-6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
    <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-external" viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></symbol>
    <symbol id="i-chevron" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></symbol>
    <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 19a2 2 0 0 1 2-2h13v4H6a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol>
    <symbol id="i-star" viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></symbol>
    <symbol id="i-quote" viewBox="0 0 48 40"><path d="M4 38V22C4 10 10 3 20 1l2 5c-6 2-9 6-9 12h8v20zm24 0V22c0-12 6-19 16-21l2 5c-6 2-9 6-9 12h8v20z" fill="currentColor"/></symbol>
  </defs>
</svg>`;

// Every nome hops now and then; the staggered delay keeps them from jumping in sync.
let nomeCount = 0;
const nome = (kind, x, y, w, vars, cls = '') => {
  const delay = ((nomeCount++ * 1.37) % 3.6).toFixed(2);
  return `<use href="#${kind}" x="${x}" y="${y}" width="${w}" height="${(w * (kind === 'nome-sit' ? 100 / 70 : 110 / 60)).toFixed(1)}" style="${vars};animation-delay:-${delay}s" class="nome-anim${cls ? ' ' + cls : ''}"/>`;
};
export { nome };

const flower = (x, y, s, petal) =>
  `<use href="#flower" x="${x}" y="${y}" width="${30 * s}" height="${50 * s}" style="--petal:${petal}"/>`;

// The big scene in the home hero: the nome tree with a little door,
// a sunny sky, a mushroom house and nomes going about their day.
export function heroScene(label) {
  return `
<svg class="hero-scene" viewBox="0 0 640 540" role="img" aria-label="${label}">
  <g class="sun" transform="translate(96 92)">
    <g class="sun-rays" fill="#ffd95a">
      ${Array.from({ length: 12 }, (_, i) => `<rect x="-6" y="-78" width="12" height="26" rx="6" transform="rotate(${i * 30})"/>`).join('')}
    </g>
    <circle r="46" fill="#ffc93c"/>
    <path d="M-20 -6 q6 -7 12 0 M8 -6 q6 -7 12 0" stroke="${INK}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <circle cx="-24" cy="10" r="6" fill="#ff8a65" opacity=".55"/><circle cx="24" cy="10" r="6" fill="#ff8a65" opacity=".55"/>
    <path d="M-13 12 q13 13 26 0" stroke="${INK}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
  </g>
  <use href="#cloud" class="cloud cloud-a" x="190" y="40" width="130" height="65"/>
  <use href="#cloud" class="cloud cloud-b" x="470" y="6" width="96" height="48" opacity=".9"/>

  <path d="M0 420 Q120 360 250 392 T520 380 T640 372 V540 H0Z" fill="#a8dc78"/>
  <path d="M0 462 Q160 420 330 448 T640 436 V540 H0Z" fill="#7cc95f"/>

  <g class="tree">
    <path d="M372 456 C 386 400, 390 330, 384 262 L 444 262 C 438 330, 444 400, 462 456 C 478 462, 494 470, 500 480 L 330 480 C 340 468, 356 460, 372 456 Z" fill="#9a6338"/>
    <path d="M396 300 C 398 360, 396 420, 388 470 L 372 470 C 384 420, 388 360, 386 300Z" fill="#000" opacity=".08"/>
    <path d="M444 300 Q470 262 520 248" stroke="#9a6338" stroke-width="16" stroke-linecap="round" fill="none"/>
    <path d="M388 312 Q356 284 318 284" stroke="#9a6338" stroke-width="13" stroke-linecap="round" fill="none"/>
    <path d="M400 470 V 420 Q 400 396 418 396 Q 436 396 436 420 V 470 Z" fill="#ff6b5b"/>
    <path d="M418 398 V 470" stroke="#000" stroke-opacity=".12" stroke-width="2"/>
    <circle cx="428" cy="436" r="3" fill="#ffc93c"/>
    <circle cx="414" cy="344" r="15" fill="#ffe08a" stroke="#7a4b28" stroke-width="5"/>
    <path d="M414 330 V358 M400 344 H428" stroke="#7a4b28" stroke-width="3"/>
    <g class="canopy">
      <circle cx="414" cy="196" r="112" fill="#3f9e4d"/>
      <circle cx="318" cy="226" r="70" fill="#3f9e4d"/>
      <circle cx="514" cy="222" r="74" fill="#3f9e4d"/>
      <circle cx="356" cy="134" r="72" fill="#4caf50"/>
      <circle cx="470" cy="128" r="76" fill="#4caf50"/>
      <circle cx="414" cy="98" r="64" fill="#5cbf5c"/>
      <circle cx="372" cy="102" r="26" fill="#7dd36f" opacity=".7"/>
      <circle cx="476" cy="96" r="20" fill="#7dd36f" opacity=".6"/>
      <circle cx="300" cy="206" r="18" fill="#7dd36f" opacity=".5"/>
      <g fill="#ff5a5f">
        <circle cx="352" cy="176" r="8"/><circle cx="452" cy="170" r="8"/><circle cx="512" cy="232" r="8"/>
        <circle cx="404" cy="236" r="8"/><circle cx="318" cy="246" r="8"/><circle cx="430" cy="110" r="7"/>
      </g>
      <g fill="#fff" opacity=".7">
        <circle cx="349" cy="173" r="2"/><circle cx="449" cy="167" r="2"/><circle cx="509" cy="229" r="2"/>
        <circle cx="401" cy="233" r="2"/><circle cx="315" cy="243" r="2"/><circle cx="427" cy="107" r="2"/>
      </g>
    </g>
    <path d="M520 248 Q548 242 566 252" stroke="#9a6338" stroke-width="11" stroke-linecap="round" fill="none"/>
    ${nome('nome-sit', 512, 182, 50, '--hat:#2fa4d9;--coat:#ff8f3c;--pants:#5d4a8a')}
    <g stroke="#b07a4a" stroke-width="5" stroke-linecap="round">
      <path d="M352 470 L374 340 M376 470 L398 340"/>
      <path d="M356 446 H380 M360 420 H384 M364 394 H388 M368 368 H392"/>
    </g>
  </g>

  <g class="mushroom-house">
    <use href="#mushroom" x="120" y="382" width="104" height="104" style="--cap:#e84a3c"/>
    <rect x="164" y="452" width="16" height="22" rx="8" fill="#9a6338"/>
    <use href="#mushroom" x="226" y="446" width="40" height="40" style="--cap:#ff8f3c"/>
  </g>

  ${nome('nome-wave', 240, 352, 58, '--hat:#e84a3c;--coat:#4c9a5b', 'nome-waver')}
  ${nome('nome-elder', 474, 380, 52, '--hat:#7b5ea7;--coat:#2fa4d9;--pants:#6a5440')}
  ${nome('nome', 56, 410, 46, '--hat:#ffc93c;--coat:#e2557a;--pants:#4b6a8a')}

  <g fill="#5d8f3a" opacity=".55">
    <ellipse cx="300" cy="500" rx="5" ry="3"/><ellipse cx="318" cy="492" rx="5" ry="3"/>
    <ellipse cx="336" cy="498" rx="5" ry="3"/><ellipse cx="354" cy="488" rx="5" ry="3"/>
  </g>
  ${flower(20, 470, .8, '#ff8fb1')}${flower(104, 486, .7, '#b39ddb')}${flower(286, 446, .7, '#ffffff')}
  ${flower(548, 444, .9, '#ff8fb1')}${flower(590, 470, .7, '#ffc93c')}${flower(520, 486, .6, '#90caf9')}
  <g class="bee-fly"><use href="#bee" x="250" y="250" width="40" height="30"/></g>
  <path class="bee-trail" d="M210 300 q20 -30 40 -24" stroke="${INK}" stroke-width="2" stroke-dasharray="3 6" fill="none" opacity=".35"/>
</svg>`;
}

// Full-width meadow behind the home hero, so the scene's ground continues to the left.
export const heroHills = `
<svg class="hero-hills" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 70 Q260 20 560 60 T1100 52 T1440 48 V160 H0Z" fill="#a8dc78"/>
  <path d="M0 112 Q300 76 640 100 T1440 92 V160 H0Z" fill="#7cc95f"/>
</svg>`;

// Hills for the bottom of the inner page headers (stretched full width).
export const headerHills = `
<svg class="header-hills" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 70 Q240 20 480 56 T960 50 T1440 40 V120 H0Z" fill="#a8dc78"/>
  <path d="M0 96 Q300 60 640 86 T1440 76 V120 H0Z" fill="var(--cream)"/>
</svg>`;

// A small tree with a nome, sitting on the right of inner page headers.
export function headerDecor(variant = 0) {
  const hats = ['#e84a3c', '#2fa4d9', '#7b5ea7', '#ffc93c', '#ff8f3c'];
  const coats = ['#4c9a5b', '#ff8f3c', '#e2557a', '#2fa4d9', '#7b5ea7'];
  const h = hats[variant % hats.length];
  const c = coats[variant % coats.length];
  return `
<svg class="header-decor" viewBox="0 0 260 200" aria-hidden="true">
  <path d="M150 196 C158 170 160 140 156 112 L184 112 C180 140 184 170 194 196Z" fill="#9a6338"/>
  <path d="M162 196 V176 Q162 166 170 166 Q178 166 178 176 V196Z" fill="#ff6b5b"/>
  <circle cx="170" cy="84" r="54" fill="#3f9e4d"/>
  <circle cx="126" cy="100" r="34" fill="#3f9e4d"/>
  <circle cx="214" cy="100" r="34" fill="#3f9e4d"/>
  <circle cx="146" cy="52" r="34" fill="#4caf50"/>
  <circle cx="196" cy="50" r="36" fill="#5cbf5c"/>
  <g fill="#ff5a5f"><circle cx="142" cy="90" r="5"/><circle cx="200" cy="82" r="5"/><circle cx="172" cy="40" r="4.5"/></g>
  ${nome('nome-wave', 70, 104, 48, `--hat:${h};--coat:${c}`, 'nome-waver')}
  <use href="#mushroom" x="20" y="152" width="44" height="44" style="--cap:#e84a3c"/>
  ${flower(232, 166, .6, '#ff8fb1')}
</svg>`;
}

// Grass edge on top of the footer with nomes walking along.
export const footerTop = `
<div class="footer-top" aria-hidden="true">
  <svg class="footer-grass" viewBox="0 0 1440 90" preserveAspectRatio="none">
    <path d="M0 60 Q120 30 240 52 T480 46 T720 54 T960 42 T1200 50 T1440 40 V90 H0Z" fill="#7cc95f"/>
    <path d="M0 74 Q200 54 420 70 T860 64 T1440 60 V90 H0Z" fill="#4e9a45"/>
  </svg>
  <svg class="footer-walkers" viewBox="0 0 340 120">
    ${nome('nome', 20, 18, 46, '--hat:#e84a3c;--coat:#4c9a5b')}
    ${nome('nome-elder', 84, 10, 50, '--hat:#7b5ea7;--coat:#2fa4d9')}
    ${nome('nome-wave', 154, 26, 42, '--hat:#ffc93c;--coat:#e2557a', 'nome-waver')}
    <use href="#mushroom" x="226" y="54" width="56" height="56" style="--cap:#ff8f3c"/>
    ${flower(296, 74, .7, '#ff8fb1')}
  </svg>
</div>`;

// Brand mark: a nome peeking out with its hat.
export const logoMark = `
<svg class="logo-mark" viewBox="6 0 48 64" aria-hidden="true"><use href="#nome-face" width="60" height="110" style="--hat:#e84a3c"/></svg>`;

// Nomes looking up at the question bubbles on the home page.
export const questionNomes = `
<svg class="question-nomes" viewBox="0 0 300 130" aria-hidden="true">
  ${nome('nome', 30, 14, 52, '--hat:#2fa4d9;--coat:#ff8f3c')}
  ${nome('nome-elder', 112, 4, 58, '--hat:#e84a3c;--coat:#4c9a5b')}
  ${nome('nome-wave', 200, 20, 48, '--hat:#7b5ea7;--coat:#ffc93c', 'nome-waver')}
  ${flower(4, 92, .7, '#ff8fb1')}${flower(270, 94, .65, '#90caf9')}
</svg>`;

// A curious nome with a magnifying glass for the 404 page.
export const searchingNome = `
<svg class="searching-nome" viewBox="0 0 220 200" aria-hidden="true">
  <ellipse cx="110" cy="190" rx="90" ry="8" fill="#000" opacity=".06"/>
  ${nome('nome-wave', 70, 44, 80, '--hat:#e84a3c;--coat:#4c9a5b')}
  <circle cx="160" cy="70" r="22" fill="#e3f4ff" fill-opacity=".7" stroke="#9a6338" stroke-width="7"/>
  <path d="M146 86 L134 100" stroke="#9a6338" stroke-width="8" stroke-linecap="round"/>
  <use href="#mushroom" x="10" y="140" width="50" height="50"/>
  ${flower(186, 150, .8, '#ffc93c')}
</svg>`;

// Avatar for a therapist without a photo.
export function avatarNome() {
  return `<svg class="avatar-nome" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="60" fill="#fff1c9"/>${nome('nome', 32, 18, 56, '--hat:#e84a3c;--coat:#4c9a5b')}</svg>`;
}
