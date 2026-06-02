# Fakhar Auto Workshop – Website

SEO-first static website for Fakhar Auto Workshop (Islamabad). Built with Astro for fast load times, mobile-friendly UX, and sitelink-friendly structure.

## Commands

| Command           | Action                              |
| ----------------- | ------------------------------------ |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build static site to `./dist/`       |
| `npm run preview` | Preview production build locally     |

## Deploy to Hostinger

This site is **static** — sync the `dist/` folder to `public_html` on Hostinger.

### Option A — SSH + rsync (recommended)

1. **hPanel** → **Advanced** → **SSH Access** → enable SSH.
2. Copy your public key (`cat ~/.ssh/id_ed25519.pub`) into **SSH keys** in hPanel.
3. Note **hostname**, **username**, and **port** (Hostinger often uses **65002**, not 22).
4. Confirm the site path (usually `domains/fakharautoworkshop.com/public_html`).
5. Copy `.env.example` to `.env` and set `SSH_HOST`, `SSH_USER`, `SSH_PORT`, `SSH_REMOTE_PATH`.
6. Deploy:

```bash
npm install
npm run deploy:hostinger
```

Dry run (lists changes without uploading): `node --env-file=.env scripts/deploy-hostinger.mjs --dry-run`

### Option B — FTP

Set `FTP_*` in `.env`, then: `npm run deploy:hostinger:ftp`

### Option C — File Manager (no SSH/FTP)

```bash
npm run package:hostinger
```

Upload `hostinger-upload.zip` in **hPanel** → **Files** → `public_html` → **Upload**, then **Extract**. Delete the zip after extracting.

### After upload

1. **hPanel** → **Domains** → point `fakharautoworkshop.com` to this hosting (if not already).
2. Enable **SSL** (hPanel → **Security** → **SSL** — free Let’s Encrypt).
3. Open `https://fakharautoworkshop.com/` and test `/services/`, `/contact/`.
4. In [Google Search Console](https://search.google.com/search-console), add the property and submit `https://fakharautoworkshop.com/sitemap-index.xml`.

`public/.htaccess` is copied into `dist/` on build (HTTPS redirect, 404 page, caching).

## Deploy to GitHub Pages

The site deploys automatically on every push to `main` via [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml).

**Live URL:** https://haroon966.github.io/Fakhar-Autos-Workshop/

### One-time GitHub setup

1. Open **Settings → Pages** on [Haroon966/Fakhar-Autos-Workshop](https://github.com/Haroon966/Fakhar-Autos-Workshop).
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main` (or run the workflow manually under **Actions**).

### Local preview (GitHub Pages paths)

```bash
npm run build:gh-pages
npm run preview
```

Open the URL shown in the terminal (paths include `/Fakhar-Autos-Workshop/`).

### Production domain (Hostinger)

Default `npm run build` uses `https://fakharautoworkshop.com` with no base path — use that for Hostinger uploads.

## Deploy (other static hosts)

Upload the contents of `dist/` to your web host. Ensure HTTPS and that `site` in `astro.config.mjs` matches your domain.

## Contact form

The contact form posts to [Formspree](https://formspree.io). Replace the form action in `src/components/ContactForm.astro` with your own Formspree form endpoint (e.g. `https://formspree.io/f/your-form-id`) so submissions go to your email.

## Project structure

- `src/pages/` – All routes (home, services, about, contact).
- `src/layouts/Layout.astro` – Shared layout, meta, canonical, schema.
- `src/components/` – Header (mobile nav + desktop nav), Footer, ServiceCard, ContactForm, ServicePageLayout.
- `src/data/site.ts` – Business info (name, phone, address, hours).
- `src/data/schema.ts` – JSON-LD helpers (AutoRepair, Service, BreadcrumbList).
- `public/robots.txt` – Crawler rules; sitemap is generated at build (`dist/sitemap-index.xml`).
