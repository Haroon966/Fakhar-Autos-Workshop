# Fakhar Auto Workshop – Website

SEO-first static website for Fakhar Auto Workshop (Islamabad). Built with Astro for fast load times, mobile-friendly UX, and sitelink-friendly structure.

## Commands

| Command           | Action                              |
| ----------------- | ------------------------------------ |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build static site to `./dist/`       |
| `npm run preview` | Preview production build locally     |

## Deploy (static hosting)

Upload the contents of `dist/` to your web host. The site is fully static (HTML, CSS, JS). Ensure:

- Your host serves the site over **HTTPS**.
- The domain is set to `https://fakharautoworkshop.com` (or update `site` in `astro.config.mjs` and rebuild).

## Contact form

The contact form posts to [Formspree](https://formspree.io). Replace the form action in `src/components/ContactForm.astro` with your own Formspree form endpoint (e.g. `https://formspree.io/f/your-form-id`) so submissions go to your email.

## Project structure

- `src/pages/` – All routes (home, services, about, contact).
- `src/layouts/Layout.astro` – Shared layout, meta, canonical, schema.
- `src/components/` – Header (mobile nav + desktop nav), Footer, ServiceCard, ContactForm, ServicePageLayout.
- `src/data/site.ts` – Business info (name, phone, address, hours).
- `src/data/schema.ts` – JSON-LD helpers (AutoRepair, Service, BreadcrumbList).
- `public/robots.txt` – Crawler rules; sitemap is generated at build (`dist/sitemap-index.xml`).
