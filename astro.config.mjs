// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://fakharautoworkshop.com',
	integrations: [sitemap()],
	build: { trailingSlash: 'always' },
});
