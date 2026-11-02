// Original SVG illustrations for the Nomi site: little nome children whose face
// colour shows how they feel, the nome tree, mushrooms, flowers, sun, clouds and
// UI icons. Colours of a child are set per instance with CSS custom properties
// (--skin, --hair, --shirt, --pants).

const INK = '#3a2a1f';
const SHOE = '#6b3f22';

// Face colour = feeling. Each feeling also has its own small movement (see style.css).
const MOODS = {
  happy: { skin: '#ffd66e' },
  sad: { skin: '#7fd0c6' },
  worried: { skin: '#bba2e8' },
  angry: { skin: '#f47c6c' },
};

const LEGS = `
      <rect x="21" y="74" width="7" height="18" rx="3.5" fill="var(--skin)"/>
      <rect x="32" y="74" width="7" height="18" rx="3.5" fill="var(--skin)"/>
      <ellipse cx="24" cy="94" rx="7" ry="4" fill="${SHOE}"/>
      <ellipse cx="36" cy="94" rx="7" ry="4" fill="${SHOE}"/>
      <path d="M18 62 L42 62 L44 80 L33 80 L30 73 L27 80 L16 80 Z" fill="var(--pants)"/>`;
const SHIRT = `<path d="M18 48 Q30 43 42 48 L44 66 Q30 70 16 66 Z" fill="var(--shirt)"/>`;
const arm = (d, hx, hy) =>
  `<path d="${d}" stroke="var(--skin)" stroke-width="6" stroke-linecap="round" fill="none"/><circle cx="${hx}" cy="${hy}" r="3.6" fill="var(--skin)"/>`;

// One hidden sprite per page; everything else references it with <use>.
export const sprite = `
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="kid-stand" viewBox="0 0 60 100">${LEGS}
      ${arm('M19 53 Q11 61 13 71', 13, 72)}${arm('M41 53 Q49 61 47 71', 47, 72)}${SHIRT}
    </symbol>
    <symbol id="kid-wave" viewBox="0 0 60 100" style="overflow:visible">${LEGS}
      ${arm('M41 53 Q58 50 63 36', 63, 33)}${arm('M19 53 Q11 61 13 71', 13, 72)}${SHIRT}
    </symbol>
    <symbol id="kid-fists" viewBox="0 0 60 100">${LEGS}
      ${arm('M19 53 Q7 59 15 67', 16, 68)}${arm('M41 53 Q53 59 45 67', 44, 68)}${SHIRT}
    </symbol>
    <symbol id="kid-sit" viewBox="0 0 60 100">
      <path d="M23 68 Q22 82 18 90" stroke="var(--skin)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <path d="M37 68 Q38 82 42 90" stroke="var(--skin)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <ellipse cx="16" cy="93" rx="7" ry="4" fill="${SHOE}"/>
      <ellipse cx="44" cy="93" rx="7" ry="4" fill="${SHOE}"/>
      <path d="M17 62 L43 62 L46 74 Q30 79 14 74 Z" fill="var(--pants)"/>
      ${arm('M19 53 Q12 62 19 69', 20, 70)}${arm('M41 53 Q48 62 41 69', 40, 70)}${SHIRT}
    </symbol>

    <symbol id="kid-head" viewBox="0 0 60 100">
      <circle cx="9.5" cy="30" r="4.5" fill="var(--skin)"/>
      <circle cx="50.5" cy="30" r="4.5" fill="var(--skin)"/>
      <circle cx="30" cy="28" r="21" fill="var(--skin)"/>
    </symbol>

    <symbol id="face-happy" viewBox="0 0 60 100">
      <circle cx="22" cy="27" r="3" fill="${INK}"/><circle cx="38" cy="27" r="3" fill="${INK}"/>
      <circle cx="23" cy="26" r="1" fill="#fff"/><circle cx="39" cy="26" r="1" fill="#fff"/>
      <circle cx="15.5" cy="34" r="4" fill="#ff8a65" opacity=".55"/><circle cx="44.5" cy="34" r="4" fill="#ff8a65" opacity=".55"/>
      <path d="M21 35 Q30 37 39 35 Q37 45 30 45 Q23 45 21 35 Z" fill="#8c2f39"/>
      <path d="M24 41 Q30 38 36 41 Q33 45 30 45 Q27 45 24 41 Z" fill="#ff8fa3"/>
    </symbol>
    <symbol id="face-sad" viewBox="0 0 60 100">
      <path d="M16 24 L26 19 M44 24 L34 19" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="22" cy="29" r="3" fill="${INK}"/><circle cx="38" cy="29" r="3" fill="${INK}"/>
      <circle cx="23" cy="28" r="1" fill="#fff"/><circle cx="39" cy="28" r="1" fill="#fff"/>
      <path d="M23 42 Q30 35 37 42" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M41 33 Q36.5 39 41 42.5 Q45.5 39 41 33 Z" fill="#2f8fd6"/>
    </symbol>
    <symbol id="face-angry" viewBox="0 0 60 100">
      <path d="M16 22 L26 25 M44 22 L34 25" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>
      <circle cx="22" cy="30" r="2.8" fill="${INK}"/><circle cx="38" cy="30" r="2.8" fill="${INK}"/>
      <circle cx="23" cy="29" r=".9" fill="#fff"/><circle cx="39" cy="29" r=".9" fill="#fff"/>
      <circle cx="15" cy="36" r="3.6" fill="#c9443a" opacity=".45"/><circle cx="45" cy="36" r="3.6" fill="#c9443a" opacity=".45"/>
      <path d="M24 42 Q30 37.5 36 42" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </symbol>
    <symbol id="face-worried" viewBox="0 0 60 100">
      <path d="M16 20 Q20 15 26 18 M44 20 Q40 15 34 18" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <circle cx="22" cy="28" r="5" fill="#fff"/><circle cx="38" cy="28" r="5" fill="#fff"/>
      <circle cx="22" cy="29" r="2.5" fill="${INK}"/><circle cx="38" cy="29" r="2.5" fill="${INK}"/>
      <path d="M22 41 q4 -4 8 0 t8 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </symbol>

    <symbol id="hair-tuft" viewBox="0 0 60 100">
      <path d="M11 22 Q13 6 30 6 Q47 6 49 22 Q43 13 36 15 Q30 10 24 15 Q17 13 11 22 Z" fill="var(--hair)"/>
      <path d="M25 8 Q26 0 33 2 Q30 5 34 9 Z" fill="var(--hair)"/>
    </symbol>
    <symbol id="hair-pigtails" viewBox="0 0 60 100">
      <circle cx="7.5" cy="20" r="6.5" fill="var(--hair)"/><circle cx="52.5" cy="20" r="6.5" fill="var(--hair)"/>
      <circle cx="12" cy="20" r="2.2" fill="#ff5a7a"/><circle cx="48" cy="20" r="2.2" fill="#ff5a7a"/>
      <path d="M10 24 Q10 6 30 6 Q50 6 50 24 Q44 14 30 15 Q16 14 10 24 Z" fill="var(--hair)"/>
    </symbol>
    <symbol id="hair-curly" viewBox="0 0 60 100">
      <g fill="var(--hair)">
        <circle cx="13" cy="21" r="6.5"/><circle cx="21" cy="12" r="7.5"/><circle cx="32" cy="9" r="8"/>
        <circle cx="43" cy="13" r="7.5"/><circle cx="48" cy="22" r="6"/>
      </g>
    </symbol>
    <symbol id="hair-bob" viewBox="0 0 60 100">
      <path d="M8 36 Q5 6 30 6 Q55 6 52 36 Q50 30 48 22 Q39 15 30 16 Q21 15 12 22 Q10 30 8 36 Z" fill="var(--hair)"/>
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

// Draws one child. The outer <g> places it; the inner <g> is free for the CSS animation,
// because a CSS transform would otherwise replace the positioning transform.
let kidCount = 0;
export function kid(x, y, w, { mood = 'happy', pose = 'stand', hair = 'tuft', hairColor = '#5b3a21', shirt = '#4c9a5b', pants = '#4b6a8a' } = {}) {
  const delay = ((kidCount++ * 1.37) % 3.6).toFixed(2);
  const vars = `--skin:${MOODS[mood].skin};--hair:${hairColor};--shirt:${shirt};--pants:${pants};animation-delay:-${delay}s`;
  const part = (id) => `<use href="#${id}" width="60" height="100"/>`;
  return `<g transform="translate(${x} ${y}) scale(${(w / 60).toFixed(3)})"><g class="kid mood-${mood}" style="${vars}">${part(`kid-${pose}`)}${part('kid-head')}${part(`face-${mood}`)}${part(`hair-${hair}`)}</g></g>`;
}

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
    <path d="M520 248 Q560 240 604 252" stroke="#9a6338" stroke-width="11" stroke-linecap="round" fill="none"/>
    ${kid(532, 170, 68, { mood: 'sad', pose: 'sit', hair: 'bob', hairColor: '#2f4858', shirt: '#ff8f3c', pants: '#5d4a8a' })}
    <g stroke="#b07a4a" stroke-width="5" stroke-linecap="round">
      <path d="M352 470 L374 340 M376 470 L398 340"/>
      <path d="M356 446 H380 M360 420 H384 M364 394 H388 M368 368 H392"/>
    </g>
  </g>

  <g class="mushroom-house">
    <use href="#mushroom" x="120" y="382" width="104" height="104" style="--cap:#e84a3c"/>
    <rect x="164" y="452" width="16" height="22" rx="8" fill="#9a6338"/>
    <use href="#mushroom" x="306" y="450" width="38" height="38" style="--cap:#ff8f3c"/>
  </g>

  ${kid(222, 338, 86, { mood: 'happy', pose: 'wave', hair: 'pigtails', hairColor: '#8a4b23', shirt: '#2fa4d9', pants: '#e2557a' })}
  ${kid(474, 348, 82, { mood: 'angry', pose: 'fists', hair: 'tuft', hairColor: '#4a2c17', shirt: '#2fa4d9', pants: '#6a5440' })}
  ${kid(32, 354, 80, { mood: 'worried', pose: 'stand', hair: 'curly', hairColor: '#3f2a63', shirt: '#ffc93c', pants: '#4b6a8a' })}

  <g fill="#5d8f3a" opacity=".55">
    <ellipse cx="300" cy="500" rx="5" ry="3"/><ellipse cx="318" cy="492" rx="5" ry="3"/>
    <ellipse cx="336" cy="498" rx="5" ry="3"/><ellipse cx="354" cy="488" rx="5" ry="3"/>
  </g>
  ${flower(8, 462, .8, '#ff8fb1')}${flower(106, 470, .7, '#b39ddb')}
  ${flower(566, 446, .9, '#ff8fb1')}${flower(604, 466, .7, '#ffc93c')}
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
  const kids = [
    { mood: 'happy', pose: 'wave', hair: 'pigtails', hairColor: '#8a4b23', shirt: '#2fa4d9', pants: '#e2557a' },
    { mood: 'sad', pose: 'stand', hair: 'bob', hairColor: '#2f4858', shirt: '#ff8f3c', pants: '#5d4a8a' },
    { mood: 'worried', pose: 'stand', hair: 'curly', hairColor: '#3f2a63', shirt: '#ffc93c', pants: '#4b6a8a' },
    { mood: 'angry', pose: 'fists', hair: 'tuft', hairColor: '#4a2c17', shirt: '#2fa4d9', pants: '#6a5440' },
    { mood: 'happy', pose: 'wave', hair: 'tuft', hairColor: '#5b3a21', shirt: '#e2557a', pants: '#4c9a5b' },
  ];
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
  ${kid(58, 94, 63, kids[variant % kids.length])}
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
    ${kid(16, 24, 52, { mood: 'sad', pose: 'stand', hair: 'bob', hairColor: '#2f4858', shirt: '#ff8f3c', pants: '#5d4a8a' })}
    ${kid(84, 18, 56, { mood: 'happy', pose: 'wave', hair: 'pigtails', hairColor: '#8a4b23', shirt: '#2fa4d9', pants: '#e2557a' })}
    ${kid(156, 28, 50, { mood: 'angry', pose: 'fists', hair: 'tuft', hairColor: '#4a2c17', shirt: '#ffc93c', pants: '#6a5440' })}
    <use href="#mushroom" x="226" y="54" width="56" height="56" style="--cap:#ff8f3c"/>
    ${flower(296, 74, .7, '#ff8fb1')}
  </svg>
</div>`;

// Brand mark: the head of a happy nome child.
export const logoMark = `
<svg class="logo-mark" viewBox="2 0 56 54" aria-hidden="true" style="--skin:#ffd66e;--hair:#8a4b23"><use href="#kid-head" width="60" height="100"/><use href="#face-happy" width="60" height="100"/><use href="#hair-tuft" width="60" height="100"/></svg>`;

// One child of each feeling, under the question bubbles on the home page.
export const questionNomes = `
<svg class="question-nomes" viewBox="0 0 340 130" aria-hidden="true">
  ${kid(26, 26, 58, { mood: 'sad', pose: 'stand', hair: 'bob', hairColor: '#2f4858', shirt: '#ff8f3c', pants: '#5d4a8a' })}
  ${kid(100, 22, 60, { mood: 'happy', pose: 'wave', hair: 'pigtails', hairColor: '#8a4b23', shirt: '#2fa4d9', pants: '#e2557a' })}
  ${kid(178, 28, 56, { mood: 'angry', pose: 'fists', hair: 'tuft', hairColor: '#4a2c17', shirt: '#4c9a5b', pants: '#6a5440' })}
  ${kid(250, 28, 56, { mood: 'worried', pose: 'stand', hair: 'curly', hairColor: '#3f2a63', shirt: '#ffc93c', pants: '#4b6a8a' })}
  ${flower(4, 92, .7, '#ff8fb1')}${flower(314, 94, .65, '#90caf9')}
</svg>`;

// A puzzled nome child with a magnifying glass for the 404 page.
export const searchingNome = `
<svg class="searching-nome" viewBox="0 0 220 200" aria-hidden="true">
  <ellipse cx="110" cy="190" rx="90" ry="8" fill="#000" opacity=".06"/>
  ${kid(66, 56, 80, { mood: 'worried', pose: 'wave', hair: 'curly', hairColor: '#3f2a63', shirt: '#ffc93c', pants: '#4b6a8a' })}
  <circle cx="160" cy="70" r="22" fill="#e3f4ff" fill-opacity=".7" stroke="#9a6338" stroke-width="7"/>
  <path d="M146 86 L134 100" stroke="#9a6338" stroke-width="8" stroke-linecap="round"/>
  <use href="#mushroom" x="10" y="140" width="50" height="50"/>
  ${flower(186, 150, .8, '#ffc93c')}
</svg>`;
