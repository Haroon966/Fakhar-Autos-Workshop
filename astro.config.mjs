// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = process.env.ASTRO_SITE ?? 'https://fakharautoworkshop.com';
const basePath = process.env.ASTRO_BASE_PATH ?? '/';

function pagePriority(pathname) {
	if (pathname === '/' || pathname === '') return 1.0;
	if (pathname.startsWith('/services/')) return 0.9;
	if (pathname === '/faq/' || pathname === '/services/') return 0.85;
	if (pathname.startsWith('/guides/')) return 0.75;
	return 0.7;
}

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	...(basePath !== '/' && { base: basePath }),
	integrations: [
		sitemap({
			serialize(item) {
				const path = new URL(item.url).pathname;
				item.priority = pagePriority(path);
				item.changefreq = path === '/' ? 'weekly' : 'monthly';
				return item;
			},
		}),
	],
	build: { trailingSlash: 'always' },
});
