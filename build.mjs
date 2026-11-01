// Builds the static Nomi website from the JSON files in content/ into _site/.
// Every page is generated in every language (bg, de, en). Texts are edited by
// the client in the CMS (/admin), which commits to content/, and GitHub Actions
// runs this script again on every change.
//
//   node build.mjs                 → build for a site served from the domain root
//   BASE_PATH=/repo node build.mjs → build for https://user.github.io/repo/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import * as art from './src/illustrations.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, '_site');
const BASE = (process.env.BASE_PATH || '').replace(/\/+$/, '');

const LANGS = ['bg', 'de', 'en'];
const DEFAULT_LANG = 'bg';
const LANG_LABEL = { bg: 'БГ', de: 'DE', en: 'EN' };
const LANG_NAME = { bg: 'Български', de: 'Deutsch', en: 'English' };
const OG_LOCALE = { bg: 'bg_BG', de: 'de_DE', en: 'en_GB' };

// Page id → URL slug. Labels come from settings.nav so the client can rename them.
const PAGES = {
  home: '',
  therapists: 'therapists',
  services: 'services',
  prices: 'prices',
  development: 'development',
  materials: 'materials',
  reflection: 'reflection',
  links: 'links',
  gallery: 'gallery',
  friends: 'friends',
  contacts: 'contacts',
};

const NAV = [
  { id: 'home' },
  { group: 'group_about', items: ['therapists', 'gallery', 'friends'] },
  { group: 'group_services', items: ['services', 'prices'] },
  { group: 'group_parents', items: ['development', 'materials', 'reflection', 'links'] },
  { id: 'contacts' },
];

// ---------------------------------------------------------------- helpers

const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));

const isEmpty = (v) => v == null || v === '' || (Array.isArray(v) && v.length === 0);

// Missing or empty translations fall back to the Bulgarian text.
function withFallback(base, own) {
  if (base && typeof base === 'object' && !Array.isArray(base)) {
    const out = { ...base };
    for (const [k, v] of Object.entries(own || {})) out[k] = withFallback(base[k], v);
    return out;
  }
  return isEmpty(own) ? base : own;
}
const localize = (data, lang) => withFallback(data[DEFAULT_LANG] || {}, data[lang] || {});

function loadFolder(dir) {
  return fs
    .readdirSync(path.join(ROOT, dir))
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace(/\.json$/, ''), data: readJson(path.join(dir, f)) }))
    .sort((a, b) => (Number(a.data[DEFAULT_LANG]?.order) || 99) - (Number(b.data[DEFAULT_LANG]?.order) || 99));
}

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const md = (s) => marked.parse(String(s || ''));
const lines = (s) => esc(s).replace(/\n/g, '<br>');

const url = (lang, ...parts) => {
  const p = parts.filter(Boolean).map(encodeURIComponent);
  return `${BASE}/${lang}/${p.length ? p.join('/') + '/' : ''}`;
};
const pageUrl = (lang, id) => url(lang, PAGES[id]);
const asset = (p) => (!p ? '' : /^(https?:)?\/\//.test(p) ? p : BASE + (p.startsWith('/') ? p : '/' + p));
const icon = (id, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const host = (u) => {
  try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return u; }
};
const telHref = (phone) => 'tel:' + String(phone).replace(/[^+\d]/g, '');

function write(rel, html) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// ---------------------------------------------------------------- content

const C = {
  settings: readJson('content/settings.json'),
  home: readJson('content/home.json'),
  therapists: readJson('content/therapists.json'),
  services: readJson('content/services.json'),
  prices: readJson('content/prices.json'),
  materials: readJson('content/materials.json'),
  reflection: readJson('content/reflection.json'),
  development: readJson('content/development.json'),
  links: readJson('content/links.json'),
  gallery: readJson('content/gallery.json'),
  friends: readJson('content/friends.json'),
  contacts: readJson('content/contacts.json'),
};
const STAGES = loadFolder('content/development');
const ARTICLES = loadFolder('content/materials');

// ---------------------------------------------------------------- layout

function header(ctx) {
  const { lang, S, pageId, alternates } = ctx;
  const link = (id) =>
    `<a href="${pageUrl(lang, id)}"${id === pageId ? ' aria-current="page"' : ''}>${esc(S.nav[id])}</a>`;
  const items = NAV.map((n, i) => {
    if (n.id) return `<li class="nav-item">${link(n.id)}</li>`;
    const active = n.items.includes(pageId) ? ' is-active' : '';
    return `<li class="nav-item has-sub${active}">
        <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="sub-${i}">${esc(S.nav[n.group])}${icon('chevron', 'icon chevron')}</button>
        <ul class="sub" id="sub-${i}">${n.items.map((id) => `<li>${link(id)}</li>`).join('')}</ul>
      </li>`;
  }).join('');
  const langs = LANGS.map(
    (l) =>
      `<a href="${alternates[l]}" hreflang="${l}" lang="${l}" data-lang="${l}" title="${LANG_NAME[l]}"${l === lang ? ' aria-current="true"' : ''}>${LANG_LABEL[l]}</a>`
  ).join('');
  return `
<a class="skip-link" href="#main">${esc(S.ui.skip)}</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="${pageUrl(lang, 'home')}">${art.logoMark}<span class="brand-text"><span class="brand-name">${esc(S.site_name)}</span><span class="brand-tag">${esc(S.site_tagline)}</span></span></a>
    <nav class="main-nav" id="main-nav" aria-label="${esc(S.ui.menu)}">
      <ul class="nav-list">${items}</ul>
      <div class="lang-switch" role="group" aria-label="${esc(S.ui.language)}">${langs}</div>
      <a class="btn btn-primary nav-call" href="${telHref(S.phone)}">${icon('phone')}<span>${esc(S.phone_display)}</span></a>
    </nav>
    <button class="nav-toggle" type="button" aria-controls="main-nav" aria-expanded="false" data-label-open="${esc(S.ui.menu)}" data-label-close="${esc(S.ui.close)}">
      <span class="nav-toggle-open">${icon('menu')}</span><span class="nav-toggle-close">${icon('close')}</span><span class="sr-only">${esc(S.ui.menu)}</span>
    </button>
  </div>
</header>`;
}

function footer(ctx) {
  const { lang, S } = ctx;
  const pages = Object.keys(PAGES)
    .map((id) => `<li><a href="${pageUrl(lang, id)}">${esc(S.nav[id])}</a></li>`)
    .join('');
  return `
<footer class="site-footer">
  ${art.footerTop}
  <div class="footer-main">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="brand brand-footer" href="${pageUrl(lang, 'home')}">${art.logoMark}<span class="brand-text"><span class="brand-name">${esc(S.site_name)}</span><span class="brand-tag">${esc(S.site_tagline)}</span></span></a>
        <p>${esc(S.ui.footer_text)}</p>
      </div>
      <div>
        <h2 class="footer-title">${esc(S.nav.contacts)}</h2>
        <ul class="footer-contact">
          <li>${icon('phone')}<a href="${telHref(S.phone)}">${esc(S.phone_display)}</a></li>
          <li>${icon('mail')}<a href="mailto:${esc(S.email)}">${esc(S.email)}</a></li>
          <li>${icon('pin')}<a href="${esc(S.maps_url)}" target="_blank" rel="noopener">${esc(S.address)}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer-title">${esc(S.ui.working_days_label)}</h2>
        <p class="footer-hours">${esc(S.working_days)}</p>
        <p class="footer-hours muted"><strong>${esc(S.ui.days_off_label)}:</strong> ${esc(S.days_off)}</p>
      </div>
      <nav aria-label="${esc(S.ui.menu)}">
        <h2 class="footer-title">${esc(S.ui.menu)}</h2>
        <ul class="footer-links">${pages}</ul>
      </nav>
    </div>
    <div class="container footer-bottom">
      <p>© <span data-year>${new Date().getFullYear()}</span> ${esc(S.site_name)} – ${esc(S.site_tagline)}. ${esc(S.ui.rights)}</p>
    </div>
  </div>
</footer>`;
}

function jsonLd(S, lang) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: `${S.site_name} – ${S.site_tagline}`,
    url: (S.site_url || '') + url(lang),
    telephone: S.phone,
    email: S.email,
    image: (S.site_url || '') + asset('/images/uploads/kabinet-1.jpg'),
    address: { '@type': 'PostalAddress', streetAddress: S.address, addressCountry: 'BG' },
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

function layout(ctx, { title, description, body, bodyClass = '' }) {
  const { lang, S, alternates } = ctx;
  const fullTitle = ctx.pageId === 'home' ? title : `${title} – ${S.site_name}`;
  const siteUrl = (S.site_url || '').replace(/\/+$/, '');
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${siteUrl}${alternates[l]}">`).join('\n  ');
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description || S.seo_description)}">
  <link rel="canonical" href="${siteUrl}${alternates[lang]}">
  ${alt}
  <link rel="alternate" hreflang="x-default" href="${siteUrl}${alternates[DEFAULT_LANG]}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(description || S.seo_description)}">
  <meta property="og:image" content="${siteUrl}${asset('/images/uploads/kabinet-1.jpg')}">
  <meta property="og:locale" content="${OG_LOCALE[lang]}">
  <meta name="theme-color" content="#ffc93c">
  <link rel="icon" href="${asset('/assets/img/favicon.svg')}" type="image/svg+xml">
  <link rel="preload" href="${asset('/assets/fonts/pangolin-cyrillic.woff2')}" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${asset('/assets/fonts/fonts.css')}">
  <link rel="stylesheet" href="${asset('/assets/css/style.css')}">
  ${ctx.pageId === 'home' ? jsonLd(S, lang) : ''}
</head>
<body class="${bodyClass}">
${art.sprite}
${header(ctx)}
<main id="main">
${body}
</main>
${footer(ctx)}
<script src="${asset('/assets/js/main.js')}" defer></script>
</body>
</html>
`;
}

// Sky-and-hills header for every page except home.
function pageHero(ctx, { title, intro, crumbs = [], variant = 0 }) {
  const { lang, S } = ctx;
  const trail = [{ label: S.nav.home, href: pageUrl(lang, 'home') }, ...crumbs]
    .map((c) => `<li><a href="${c.href}">${esc(c.label)}</a></li>`)
    .join('');
  return `
<section class="page-hero">
  <div class="container page-hero-inner">
    <nav class="crumbs" aria-label="breadcrumb"><ol>${trail}<li aria-current="page">${esc(title)}</li></ol></nav>
    <h1>${esc(title)}</h1>
    ${intro ? `<p class="lead">${esc(intro)}</p>` : ''}
  </div>
  ${art.headerDecor(variant)}
  ${art.headerHills}
</section>`;
}

function contactCards(ctx) {
  const { S } = ctx;
  return `
<div class="contact-cards">
  <a class="contact-card c-coral reveal" href="${telHref(S.phone)}">
    <span class="contact-icon">${icon('phone')}</span>
    <span class="contact-label">${esc(S.ui.phone_label)}</span>
    <span class="contact-value">${esc(S.phone_display)}</span>
  </a>
  <a class="contact-card c-sky reveal" href="mailto:${esc(S.email)}">
    <span class="contact-icon">${icon('mail')}</span>
    <span class="contact-label">${esc(S.ui.email_label)}</span>
    <span class="contact-value">${esc(S.email)}</span>
  </a>
  <a class="contact-card c-leaf reveal" href="${esc(S.maps_url)}" target="_blank" rel="noopener">
    <span class="contact-icon">${icon('pin')}</span>
    <span class="contact-label">${esc(S.ui.address_label)}</span>
    <span class="contact-value">${esc(S.address)}</span>
    <span class="contact-more">${esc(S.ui.open_map)} ${icon('external', 'icon icon-sm')}</span>
  </a>
  <div class="contact-card c-sun reveal">
    <span class="contact-icon">${icon('calendar')}</span>
    <span class="contact-label">${esc(S.ui.working_days_label)}</span>
    <span class="contact-value small">${esc(S.working_days)}</span>
    <span class="contact-more">${icon('moon', 'icon icon-sm')} ${esc(S.ui.days_off_label)}: ${esc(S.days_off)}</span>
  </div>
</div>`;
}

function ctaBand(ctx, title, text) {
  const { S } = ctx;
  return `
<section class="cta-band">
  <div class="container cta-inner reveal">
    <svg class="cta-nomes" viewBox="0 0 140 120" aria-hidden="true">
      ${art.nome('nome-elder', 8, 6, 56, '--hat:#e84a3c;--coat:#2fa4d9')}
      ${art.nome('nome-wave', 70, 18, 50, '--hat:#ffc93c;--coat:#4c9a5b', 'nome-waver')}
    </svg>
    <div class="cta-text">
      <h2>${esc(title)}</h2>
      ${text ? `<p>${esc(text)}</p>` : ''}
    </div>
    <div class="cta-actions">
      <a class="btn btn-primary" href="${telHref(S.phone)}">${icon('phone')}<span>${esc(S.ui.cta_call)}</span></a>
      <a class="btn btn-light" href="mailto:${esc(S.email)}">${icon('mail')}<span>${esc(S.ui.cta_email)}</span></a>
    </div>
  </div>
</section>`;
}

const COLORS = ['coral', 'sky', 'leaf', 'sun', 'plum', 'berry'];

function stageCards(ctx) {
  const { lang } = ctx;
  return `<div class="stage-cards">${STAGES.map((s, i) => {
    const d = localize(s.data, lang);
    return `
    <a class="stage-card c-${COLORS[i % COLORS.length]} reveal" href="${url(lang, 'development', s.slug)}">
      <span class="stage-age">${esc(d.age_label)}</span>
      <span class="stage-title">${esc(d.title)}</span>
      <span class="stage-summary">${esc(d.summary)}</span>
    </a>`;
  }).join('')}</div>`;
}

function articleCards(ctx) {
  const { lang, S } = ctx;
  return `<div class="article-cards">${ARTICLES.map((a, i) => {
    const d = localize(a.data, lang);
    return `
    <a class="article-card c-${COLORS[(i + 3) % COLORS.length]} reveal" href="${url(lang, 'materials', a.slug)}">
      ${d.image ? `<img src="${asset(d.image)}" alt="" loading="lazy" width="120" height="120">` : ''}
      <span class="article-text">
        <span class="article-title">${esc(d.title)}</span>
        <span class="article-summary">${esc(d.summary)}</span>
        <span class="link-more">${esc(S.ui.read_more)} ${icon('arrow', 'icon icon-sm')}</span>
      </span>
    </a>`;
  }).join('')}</div>`;
}

function prevNext(ctx, list, index, section) {
  const { lang, S } = ctx;
  const prev = list[index - 1];
  const next = list[index + 1];
  const item = (e, dir) => {
    if (!e) return '<span></span>';
    const d = localize(e.data, lang);
    return `<a class="pager-link pager-${dir}" href="${url(lang, section, e.slug)}">
      <span class="pager-dir">${dir === 'prev' ? icon('arrow-left', 'icon icon-sm') + ' ' + esc(S.ui.prev) : esc(S.ui.next) + ' ' + icon('arrow', 'icon icon-sm')}</span>
      <span class="pager-title">${esc(d.title)}</span></a>`;
  };
  return `<nav class="pager" aria-label="${esc(S.ui.menu)}">${item(prev, 'prev')}${item(next, 'next')}</nav>`;
}

// ---------------------------------------------------------------- pages

function homePage(ctx) {
  const { lang, S } = ctx;
  const H = localize(C.home, lang);
  const SV = localize(C.services, lang);
  const R = localize(C.reflection, lang);
  const G = localize(C.gallery, lang);
  const photos = G.images.filter((im) => /\.jpe?g$/i.test(im.src)).slice(0, 4);
  const bubbleColors = ['c-sky', 'c-sun', 'c-coral', 'c-leaf'];

  const body = `
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-text">
      <p class="kicker">${esc(H.hero_kicker)}</p>
      <h1>${esc(H.hero_title)}</h1>
      <p class="hero-lead">${esc(H.hero_text)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary btn-lg" href="${telHref(S.phone)}">${icon('phone')}<span>${esc(S.ui.cta_call)}</span></a>
        <a class="btn btn-light btn-lg" href="${pageUrl(lang, 'services')}"><span>${esc(S.ui.cta_services)}</span>${icon('arrow')}</a>
      </div>
    </div>
    <div class="hero-art">${art.heroScene(esc(S.site_name))}</div>
  </div>
  ${art.heroHills}
  <svg class="hero-bottom" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 Q360 0 720 30 T1440 24 V80 H0Z" fill="var(--cream)"/></svg>
</section>

<section class="section questions">
  <div class="container">
    <h2 class="section-title center reveal">${esc(H.questions_title)}</h2>
    <ul class="bubbles">
      ${H.questions.map((q, i) => `<li class="bubble ${bubbleColors[i % bubbleColors.length]} reveal" style="--d:${i * 90}ms">${esc(q)}</li>`).join('')}
    </ul>
    ${art.questionNomes}
    <p class="motto reveal"><span>${esc(H.motto)}</span></p>
  </div>
</section>

<section class="section services-teaser">
  <div class="container">
    <div class="section-head reveal">
      <h2 class="section-title">${esc(H.services_title)}</h2>
      <p class="section-lead">${esc(H.services_text)}</p>
    </div>
    <div class="service-cards">
      ${SV.groups.map((g, i) => `
      <article class="service-card c-${i % 2 ? 'sky' : 'coral'} reveal">
        <span class="service-icon">${icon(g.icon || 'star')}</span>
        <h3>${esc(g.title)}</h3>
        <ul class="leaf-list">${g.items.slice(0, 4).map((it) => `<li>${esc(it)}</li>`).join('')}</ul>
        <a class="link-more" href="${pageUrl(lang, 'services')}">${esc(S.ui.read_more)} ${icon('arrow', 'icon icon-sm')}</a>
      </article>`).join('')}
      <article class="service-card c-sun hours-card reveal">
        <span class="service-icon">${icon('calendar')}</span>
        <h3>${esc(S.ui.working_days_label)}</h3>
        <p>${esc(S.working_days)}</p>
        <p class="muted">${esc(S.ui.days_off_label)}: ${esc(S.days_off)}</p>
        <a class="link-more" href="${pageUrl(lang, 'prices')}">${esc(S.nav.prices)} ${icon('arrow', 'icon icon-sm')}</a>
      </article>
    </div>
  </div>
</section>

<section class="section parents">
  <div class="container">
    <div class="section-head reveal">
      <h2 class="section-title">${esc(H.parents_title)}</h2>
      <p class="section-lead">${esc(H.parents_text)}</p>
    </div>
    ${stageCards(ctx)}
    <div class="parents-row">
      ${articleCards(ctx)}
      <a class="quote-teaser reveal" href="${pageUrl(lang, 'reflection')}">
        ${icon('quote', 'quote-mark')}
        <blockquote>${esc(R.quote)}</blockquote>
        <cite>– ${esc(R.quote_author)}</cite>
      </a>
    </div>
  </div>
</section>

<section class="section gallery-teaser">
  <div class="container">
    <div class="section-head reveal">
      <h2 class="section-title">${esc(H.gallery_title)}</h2>
      <p class="section-lead">${esc(H.gallery_text)}</p>
    </div>
    <div class="polaroids">
      ${photos.map((im, i) => `<a class="polaroid reveal" style="--r:${[-3, 2, -1.5, 3][i % 4]}deg" href="${pageUrl(lang, 'gallery')}"><img src="${asset(im.src)}" alt="${esc(im.alt)}" loading="lazy" width="400" height="268"></a>`).join('')}
    </div>
    <p class="center"><a class="btn btn-light" href="${pageUrl(lang, 'gallery')}"><span>${esc(S.nav.gallery)}</span>${icon('arrow')}</a></p>
  </div>
</section>

<section class="section contact-teaser">
  <div class="container">
    <div class="section-head reveal">
      <h2 class="section-title">${esc(H.contact_title)}</h2>
      <p class="section-lead">${esc(H.contact_text)}</p>
    </div>
    ${contactCards(ctx)}
  </div>
</section>`;

  return layout(ctx, { title: H.seo_title, description: H.seo_description, body, bodyClass: 'page-home' });
}

function therapistsPage(ctx) {
  const { lang, S } = ctx;
  const P = localize(C.therapists, lang);
  const body = `
${pageHero(ctx, { title: P.title, intro: P.intro, crumbs: [], variant: 0 })}
<section class="section">
  <div class="container narrow">
    ${P.therapists.map((t) => `
    <article class="profile card reveal">
      <div class="profile-head">
        <div class="avatar">${t.photo ? `<img src="${asset(t.photo)}" alt="${esc(t.name)}" width="160" height="160">` : art.avatarNome()}</div>
        <div>
          <h2>${esc(t.name)}</h2>
          <p class="role">${esc(t.role)}</p>
        </div>
      </div>
      <div class="profile-body">
        <div>
          <h3>${esc(t.education_title)}</h3>
          <ol class="timeline">
            ${(t.education || []).map((e) => `<li><strong>${esc(e.degree)}</strong><span>${esc(e.institution)}</span>${e.note ? `<em>${esc(e.note)}</em>` : ''}</li>`).join('')}
          </ol>
        </div>
        <div>
          <h3>${esc(t.experience_title)}</h3>
          <ul class="leaf-list">${(t.experience || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
      </div>
    </article>`).join('')}
  </div>
</section>
${ctaBand(ctx, localize(C.home, lang).contact_title, localize(C.home, lang).contact_text)}`;
  return layout(ctx, { title: P.title, description: P.seo_description, body });
}

function servicesPage(ctx) {
  const { lang, S } = ctx;
  const P = localize(C.services, lang);
  const body = `
${pageHero(ctx, { title: P.title, intro: P.intro, crumbs: [], variant: 1 })}
<section class="section">
  <div class="container">
    <div class="service-columns">
      ${P.groups.map((g, i) => `
      <article class="service-card big c-${i % 2 ? 'sky' : 'coral'} reveal">
        <span class="service-icon">${icon(g.icon || 'star')}</span>
        <h2>${esc(g.title)}</h2>
        <ul class="leaf-list">${g.items.map((it) => `<li>${esc(it)}</li>`).join('')}</ul>
      </article>`).join('')}
    </div>
    <div class="info-row reveal">
      <div class="info-pill c-sun">${icon('calendar')}<div><strong>${esc(S.ui.working_days_label)}</strong><span>${esc(S.working_days)}</span></div></div>
      <div class="info-pill c-plum">${icon('moon')}<div><strong>${esc(S.ui.days_off_label)}</strong><span>${esc(S.days_off)}</span></div></div>
      <a class="btn btn-light" href="${pageUrl(lang, 'prices')}"><span>${esc(S.nav.prices)}</span>${icon('arrow')}</a>
    </div>
  </div>
</section>
${ctaBand(ctx, localize(C.home, lang).contact_title, localize(C.home, lang).contact_text)}`;
  return layout(ctx, { title: P.title, description: P.seo_description, body });
}

function pricesPage(ctx) {
  const { lang, S } = ctx;
  const P = localize(C.prices, lang);
  const body = `
${pageHero(ctx, { title: P.title, intro: P.intro, crumbs: [], variant: 2 })}
<section class="section">
  <div class="container narrow">
    <ul class="price-list">
      ${P.items.map((it, i) => `
      <li class="price-row reveal" style="--d:${i * 60}ms">
        <span class="price-name">${esc(it.name)}${it.duration ? `<span class="chip">${esc(it.duration)}</span>` : ''}</span>
        <span class="price-tag c-${COLORS[i % COLORS.length]}">${esc(it.price)}</span>
      </li>`).join('')}
    </ul>
    <div class="info-row reveal">
      <div class="info-pill c-sun">${icon('calendar')}<div><strong>${esc(S.ui.working_days_label)}</strong><span>${esc(S.working_days)}</span></div></div>
      <a class="btn btn-light" href="${pageUrl(lang, 'services')}"><span>${esc(S.nav.services)}</span>${icon('arrow')}</a>
    </div>
  </div>
</section>
${ctaBand(ctx, localize(C.home, lang).contact_title, localize(C.home, lang).contact_text)}`;
  return layout(ctx, { title: P.title, description: P.seo_description, body });
}

function materialsPage(ctx) {
  const { lang, S } = ctx;
  const P = localize(C.materials, lang);
  const body = `
${pageHero(ctx, { title: P.title, crumbs: [], variant: 3 })}
<section class="section">
  <div class="container narrow">
    <div class="prose reveal">${md(P.body)}</div>
    <p class="highlight reveal">${icon('heart')}<span>${esc(P.highlight)}</span></p>
    <h2 class="section-title small reveal">${esc(P.articles_title)}</h2>
    ${articleCards(ctx)}
  </div>
</section>`;
  return layout(ctx, { title: P.title, description: P.seo_description, body });
}

function materialArticlePage(ctx, index) {
  const { lang, S } = ctx;
  const a = ARTICLES[index];
  const d = localize(a.data, lang);
  const parent = localize(C.materials, lang);
  const body = `
${pageHero(ctx, { title: d.title, intro: d.summary, crumbs: [{ label: S.nav.materials, href: pageUrl(lang, 'materials') }], variant: index + 1 })}
<section class="section">
  <div class="container narrow">
    <article class="card article-body reveal">
      ${d.image ? `<img class="article-figure" src="${asset(d.image)}" alt="" width="220" height="220">` : ''}
      <div class="prose fun-lists">${md(d.body)}</div>
      ${d.closing ? `<div class="closing-sign">${d.closing.split('\n').filter(Boolean).map((l) => `<p>${esc(l)}</p>`).join('')}</div>` : ''}
    </article>
    ${prevNext(ctx, ARTICLES, index, 'materials')}
    <p class="back-link"><a href="${pageUrl(lang, 'materials')}">${icon('arrow-left', 'icon icon-sm')} ${esc(S.ui.back_to)} „${esc(parent.title)}“</a></p>
  </div>
</section>`;
  return layout(ctx, { title: d.title, description: d.summary, body });
}

function reflectionPage(ctx) {
  const { lang, S } = ctx;
  const P = localize(C.reflection, lang);
  const body = `
${pageHero(ctx, { title: P.title, crumbs: [], variant: 4 })}
<section class="section">
  <div class="container narrow">
    <figure class="big-quote reveal">
      ${icon('quote', 'quote-mark')}
      <blockquote>${esc(P.quote)}</blockquote>
      <figcaption>– ${esc(P.quote_author)}</figcaption>
    </figure>
    <div class="callout reveal">
      <img src="${asset('/assets/img/old/stars.png')}" alt="" width="140" height="148" loading="lazy">
      <div>
        <h2>${esc(P.note_title)}</h2>
        <p>${esc(P.note)}</p>
        <a class="btn btn-primary" href="${pageUrl(lang, 'contacts')}"><span>${esc(S.nav.contacts)}</span>${icon('arrow')}</a>
      </div>
    </div>
  </div>
</section>`;
  return layout(ctx, { title: P.title, description: P.seo_description, body });
}

function developmentPage(ctx) {
  const { lang } = ctx;
  const P = localize(C.development, lang);
  const body = `
${pageHero(ctx, { title: P.title, crumbs: [], variant: 2 })}
<section class="section">
  <div class="container narrow">
    <div class="prose reveal">${md(P.body)}</div>
    <h2 class="section-title small reveal">${esc(P.stages_title)}</h2>
  </div>
  <div class="container">${stageCards(ctx)}</div>
</section>`;
  return layout(ctx, { title: P.title, description: P.seo_description, body });
}

function stagePage(ctx, index) {
  const { lang, S } = ctx;
  const s = STAGES[index];
  const d = localize(s.data, lang);
  const P = localize(C.development, lang);
  const side = STAGES.map((e, i) => {
    const x = localize(e.data, lang);
    return `<li><a class="c-${COLORS[i % COLORS.length]}" href="${url(lang, 'development', e.slug)}"${i === index ? ' aria-current="page"' : ''}><span class="side-age">${esc(x.age_label)}</span><span>${esc(x.title)}</span></a></li>`;
  }).join('');
  const body = `
${pageHero(ctx, { title: d.title, intro: d.summary, crumbs: [{ label: S.nav.development, href: pageUrl(lang, 'development') }], variant: index })}
<section class="section">
  <div class="container with-side">
    <aside class="side-nav">
      <h2>${esc(P.stages_title)}</h2>
      <ul>${side}</ul>
    </aside>
    <div>
      <article class="card article-body timeline-prose reveal"><div class="prose">${md(d.body)}</div></article>
      ${prevNext(ctx, STAGES, index, 'development')}
    </div>
  </div>
</section>`;
  return layout(ctx, { title: d.title, description: d.summary, body });
}

function linksPage(ctx) {
  const { lang } = ctx;
  const P = localize(C.links, lang);
  const body = `
${pageHero(ctx, { title: P.title, intro: P.intro, crumbs: [], variant: 3 })}
<section class="section">
  <div class="container">
    <div class="link-groups">
      ${P.groups.map((g, i) => `
      <article class="link-group c-${COLORS[i % COLORS.length]} reveal">
        <h2>${esc(g.title)}</h2>
        <ul>
          ${g.links.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener"><span class="link-label">${esc(l.label)} ${icon('external', 'icon icon-sm')}</span><span class="link-host">${esc(host(l.url))}</span>${l.note ? `<span class="link-note">${esc(l.note)}</span>` : ''}</a></li>`).join('')}
        </ul>
      </article>`).join('')}
    </div>
  </div>
</section>`;
  return layout(ctx, { title: P.title, description: P.seo_description, body });
}

function galleryPage(ctx) {
  const { lang, S } = ctx;
  const P = localize(C.gallery, lang);
  const body = `
${pageHero(ctx, { title: P.title, intro: P.intro, crumbs: [], variant: 0 })}
<section class="section">
  <div class="container">
    <ul class="gallery-grid">
      ${P.images.map((im, i) => `<li class="reveal" style="--d:${i * 60}ms"><button type="button" class="gallery-item" data-full="${asset(im.src)}" data-alt="${esc(im.alt)}"><img src="${asset(im.src)}" alt="${esc(im.alt)}" loading="lazy"></button></li>`).join('')}
    </ul>
  </div>
  <dialog class="lightbox" aria-label="${esc(P.title)}">
    <button type="button" class="lb-close" data-lb="close" aria-label="${esc(S.ui.close)}">${icon('close')}</button>
    <button type="button" class="lb-prev" data-lb="prev" aria-label="${esc(S.ui.prev)}">${icon('arrow-left')}</button>
    <img alt="">
    <button type="button" class="lb-next" data-lb="next" aria-label="${esc(S.ui.next)}">${icon('arrow')}</button>
  </dialog>
</section>`;
  return layout(ctx, { title: P.title, description: P.seo_description, body });
}

function friendsPage(ctx) {
  const { lang } = ctx;
  const P = localize(C.friends, lang);
  const body = `
${pageHero(ctx, { title: P.title, intro: P.intro, crumbs: [], variant: 4 })}
<section class="section">
  <div class="container narrow">
    ${P.friends.map((f) => `
    <article class="friend card reveal">
      ${f.logo ? `<a class="friend-logo" href="${esc(f.url)}" target="_blank" rel="noopener"><img src="${asset(f.logo)}" alt="${esc(f.name)}" loading="lazy"></a>` : ''}
      <div>
        <h2>${esc(f.name)}</h2>
        <p>${esc(f.text)}</p>
        ${f.url ? `<a class="link-more" href="${esc(f.url)}" target="_blank" rel="noopener">${esc(host(f.url))} ${icon('external', 'icon icon-sm')}</a>` : ''}
      </div>
    </article>`).join('')}
    <img class="friends-balloons" src="${asset('/assets/img/old/balloons.png')}" alt="" width="133" height="118" loading="lazy">
  </div>
</section>`;
  return layout(ctx, { title: P.title, description: P.seo_description, body });
}

function contactsPage(ctx) {
  const { lang } = ctx;
  const P = localize(C.contacts, lang);
  const body = `
${pageHero(ctx, { title: P.title, intro: P.intro, crumbs: [], variant: 1 })}
<section class="section">
  <div class="container">
    <p class="person reveal">${art.logoMark}<span>${esc(P.person)}</span></p>
    ${contactCards(ctx)}
  </div>
</section>`;
  return layout(ctx, { title: P.title, description: P.seo_description, body });
}

// ---------------------------------------------------------------- special files

// Old Joomla addresses → new pages, so links from Google and bookmarks keep working.
const OLD_URLS = {
  bg: 'bg/', de: 'de/',
  specialist: 'therapists', service: 'services', prices: 'prices', documents: 'materials',
  'documents/84-speachrules': 'materials/speaking-rules', 'documents/83-exercises': 'materials/articulation-exercises',
  information: 'reflection', childdev: 'development',
  'childdev/77-0-1': 'development/0-1', 'childdev/78-1-2': 'development/1-2', 'childdev/79-2-5': 'development/2-5',
  'childdev/80-5-7': 'development/5-7', 'childdev/81-important': 'development/important',
  links: 'links', gallery: 'gallery', friends: 'friends', contacts: 'contacts',
  'specialist-2': 'therapists', 'service-2': 'services', 'prices-2': 'prices', 'information-2': 'reflection',
  'documens-2': 'materials', 'documens-2/2012-02-03-19-34-13': 'materials/speaking-rules', 'links-2': 'links',
  'friends-2': 'friends', 'gallery-2': 'gallery', kontakt: 'contacts',
};

function notFoundPage() {
  const S = localize(C.settings, DEFAULT_LANG);
  const texts = Object.fromEntries(LANGS.map((l) => {
    const s = localize(C.settings, l);
    return [l, { title: s.ui.not_found_title, text: s.ui.not_found_text, link: s.ui.not_found_link }];
  }));
  return `<!doctype html>
<html lang="bg">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>404 – ${esc(S.site_name)}</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="${asset('/assets/img/favicon.svg')}" type="image/svg+xml">
  <link rel="stylesheet" href="${asset('/assets/fonts/fonts.css')}">
  <link rel="stylesheet" href="${asset('/assets/css/style.css')}">
  <script>
    (function () {
      var base = ${JSON.stringify(BASE)}, map = ${JSON.stringify(OLD_URLS)};
      var p = location.pathname.slice(base.length);
      var m = p.match(/^\\/index\\.php\\/?(bg\\/|de\\/)?(.*?)\\/?$/);
      if (!m) return;
      var lang = m[1] === 'de/' ? 'de' : 'bg', rest = m[2], hit = map[rest];
      if (rest === '') return location.replace(base + '/' + lang + '/');
      if (hit === undefined) { var key = rest.replace(/^information-2\\//, ''); hit = map[key]; }
      if (hit === undefined) return;
      var target = /\\/$/.test(hit) ? hit : lang + '/' + hit + '/';
      location.replace(base + '/' + target);
    })();
  </script>
</head>
<body class="page-404">
${art.sprite}
<main class="not-found">
  ${art.searchingNome}
  ${LANGS.map((l) => `<section lang="${l}" class="nf-lang"><h1>${esc(texts[l].title)}</h1><p>${esc(texts[l].text)}</p><a class="btn btn-primary" href="${url(l)}">${esc(texts[l].link)}</a></section>`).join('')}
</main>
</body>
</html>
`;
}

function rootRedirect() {
  const S = localize(C.settings, DEFAULT_LANG);
  return `<!doctype html>
<html lang="bg">
<head>
  <meta charset="utf-8">
  <title>${esc(S.site_name)} – ${esc(S.site_tagline)}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="canonical" href="${(S.site_url || '').replace(/\/+$/, '')}${url(DEFAULT_LANG)}">
  <script>
    (function () {
      var langs = ${JSON.stringify(LANGS)}, pick = null;
      try { pick = localStorage.getItem('nomi-lang'); } catch (e) {}
      if (langs.indexOf(pick) < 0) {
        var nav = (navigator.languages || [navigator.language || '']).map(function (l) { return String(l).slice(0, 2).toLowerCase(); });
        pick = nav.filter(function (l) { return langs.indexOf(l) >= 0; })[0] || ${JSON.stringify(DEFAULT_LANG)};
      }
      location.replace(${JSON.stringify(BASE)} + '/' + pick + '/');
    })();
  </script>
  <meta http-equiv="refresh" content="2; url=${url(DEFAULT_LANG)}">
</head>
<body>
  <p><a href="${url('bg')}">Български</a> · <a href="${url('de')}">Deutsch</a> · <a href="${url('en')}">English</a></p>
</body>
</html>
`;
}

function sitemap(paths) {
  const site = (localize(C.settings, DEFAULT_LANG).site_url || '').replace(/\/+$/, '');
  const urls = paths.map((parts) => {
    const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${site}${url(l, ...parts)}"/>`).join('\n');
    return LANGS.map((l) => `  <url>\n    <loc>${site}${url(l, ...parts)}</loc>\n${alts}\n  </url>`).join('\n');
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}

// ---------------------------------------------------------------- build

function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  fs.cpSync(from, to, { recursive: true });
}

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const renderers = {
    home: homePage, therapists: therapistsPage, services: servicesPage, prices: pricesPage,
    development: developmentPage, materials: materialsPage, reflection: reflectionPage,
    links: linksPage, gallery: galleryPage, friends: friendsPage, contacts: contactsPage,
  };
  const allPaths = [];

  const context = (lang, pageId, parts) => ({
    lang,
    pageId,
    S: localize(C.settings, lang),
    alternates: Object.fromEntries(LANGS.map((l) => [l, url(l, ...parts)])),
  });

  for (const [id, slug] of Object.entries(PAGES)) {
    const parts = slug ? [slug] : [];
    allPaths.push(parts);
    for (const lang of LANGS) write(path.join(lang, slug, 'index.html'), renderers[id](context(lang, id, parts)));
  }
  STAGES.forEach((s, i) => {
    const parts = ['development', s.slug];
    allPaths.push(parts);
    for (const lang of LANGS) write(path.join(lang, ...parts, 'index.html'), stagePage(context(lang, 'development', parts), i));
  });
  ARTICLES.forEach((a, i) => {
    const parts = ['materials', a.slug];
    allPaths.push(parts);
    for (const lang of LANGS) write(path.join(lang, ...parts, 'index.html'), materialArticlePage(context(lang, 'materials', parts), i));
  });

  write('index.html', rootRedirect());
  write('404.html', notFoundPage());
  write('sitemap.xml', sitemap(allPaths));
  const site = (localize(C.settings, DEFAULT_LANG).site_url || '').replace(/\/+$/, '');
  write('robots.txt', `User-agent: *\nAllow: /\nDisallow: ${BASE}/admin/\n\nSitemap: ${site}${BASE}/sitemap.xml\n`);
  write('.nojekyll', '');

  copyDir(path.join(ROOT, 'assets'), path.join(OUT, 'assets'));
  copyDir(path.join(ROOT, 'images'), path.join(OUT, 'images'));
  copyDir(path.join(ROOT, 'admin'), path.join(OUT, 'admin'));

  const count = allPaths.length * LANGS.length;
  console.log(`Built ${count} pages (${LANGS.join(', ')}) into _site/${BASE ? ` with base path ${BASE}` : ''}`);
}

build();
