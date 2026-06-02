// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = process.env.ASTRO_SITE ?? 'https://fakharautoworkshop.com';
const basePath = process.env.ASTRO_BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	// Project site: https://haroon966.github.io/Fakhar-Autos-Workshop/
	...(basePath !== '/' && { base: basePath }),
	integrations: [sitemap()],
	build: { trailingSlash: 'always' },
});
