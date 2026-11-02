# Nomi – website

New website for **Логопедичен и психологичен кабинет Номи** (nomi-bg.com), replacing the old Joomla 1.7 site.
Static site for GitHub Pages, in **Bulgarian, German and English**, with an editing panel at `/admin` so the client can change every text themselves.

- No server and no database: plain HTML generated from JSON files in `content/`.
- Editing: [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (a modern Decap/Netlify CMS replacement). It commits to GitHub, and GitHub Actions rebuilds the site (~1 min).
- Original SVG illustrations in `src/illustrations.mjs`: the nome children, whose face colour shows a feeling (yellow happy, blue-green sad, violet worried, red angry), plus the nome tree and mushrooms. No third-party art licences to worry about.
- Fonts are self-hosted (Nunito + Pangolin, both with Cyrillic). No Google Fonts, no analytics, no cookies → no cookie banner needed.

## Structure

```
content/            ← ALL texts (one JSON per page, each with bg / de / en)
  development/      ← child-development stages (one file per stage)
  materials/        ← exercise materials (speaking rules, articulation exercises)
images/uploads/     ← photos (CMS uploads go here)
assets/             ← css, js, fonts, favicon, clipart from the old site
src/illustrations.mjs ← SVG children, tree, icons
build.mjs           ← generates _site/ from content/
dev.mjs             ← local preview with auto-rebuild
admin/              ← CMS (index.html + config.yml)
.github/workflows/deploy.yml ← build + publish to GitHub Pages
```

Pages (same slugs in every language, e.g. `/bg/services/`, `/de/services/`, `/en/services/`):
home · therapists · services · prices · development (+5 stages) · materials (+2 articles) · reflection · links · gallery · friends · contacts.
The navigation groups them as: **Начало · За нас ▾ · Услуги ▾ · За родители ▾ · Контакти** (all 11 old menu items are kept).

## Local development

```bash
npm install
npm run dev        # http://localhost:8080, rebuilds on every change
```

`npm run build` writes the site to `_site/`.

## Going live (one-time)

1. **Create the GitHub repository** on the account it should belong to, then push this folder (`git init`, commit, push to `main`).
2. In the repo: **Settings → Pages → Source: GitHub Actions**. The workflow publishes on every push.
3. In `admin/config.yml`, replace `repo: OWNER/REPO` with the real `owner/name`, then commit.
4. **Custom domain** (optional, recommended): Settings → Pages → Custom domain `nomi-bg.com`, then at the DNS provider point the domain to GitHub Pages (A records `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` and/or `CNAME www → <user>.github.io`). Tick "Enforce HTTPS".
   Without a custom domain the site works at `https://<user>.github.io/<repo>/`. The workflow passes the right base path automatically.
5. **Access for the client**: create a *fine-grained personal access token* (GitHub → Settings → Developer settings → Fine-grained tokens) limited to **only this repository** with **Contents: Read and write**. The client opens `/admin/`, chooses **"Sign In Using Access Token"** and pastes it once (the browser remembers it).
   *Alternative:* "Sign In with GitHub" also works but needs a small OAuth helper (Sveltia's free Cloudflare Worker `sveltia-cms-auth`).

Old Joomla URLs (`/index.php/service`, `/index.php/de/kontakt`, `/index.php/childdev/77-0-1`, …) are redirected to the new pages by `404.html`, so existing Google results and bookmarks keep working once the domain points here.

## What changed vs. the old site

- All texts moved over; obvious typos fixed (e.g. „коменикативни“, „органичи“, „порявява“, „любобитно“, „отръпване“, „правяне“).
- One outdated phrase in "От 0 до 1 година" (a list of ethnic terms in the babbling paragraph) was rewritten neutrally: „Всички деца по света, където и да са родени, имат еднакъв лепет“.
- **German and English are full translations** of the Bulgarian (the old German site only had German menus; most of its text was still in Bulgarian). Please have a native speaker / the client check them.
- The homepage animation's questions („Разбираме ли света…“, „Общуването е нашият живот“) are now real, editable text.
- "Полезни връзки": dead or hijacked sites removed (az-deteto.com, zadecata.com, manicheta.com, voknel.com, abc-bg.be, zayo.hit.bg, pami.hit.bg, roditeli.bg, bulgarianbaby.hit.bg, tuci.lovelyforum.net, roditeli.info, sensoryworld.org); abc.net.au updated to ABC Kids. The client can add links back in the CMS.
- The email address (igvasileva@mail.bg) was hidden by Joomla's JavaScript; it is now a normal mailto link.
- The old banner photo and the homepage GIF artwork were probably third-party images, so they were replaced by original illustrations. The practice photos, the Miki club logo and the friendly clipart (sun, bees, lips, stars, balloons) are kept.
- Old Google Analytics (Universal Analytics, shut down by Google) removed.
