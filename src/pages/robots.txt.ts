import type { APIRoute } from 'astro';
import { pageUrl } from '../utils/paths';

export const GET: APIRoute = () => {
	const sitemap = pageUrl('sitemap-index.xml');
	const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
