import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { assetUrl } from '../utils/paths';

export const GET: APIRoute = () => {
	const manifest = {
		name: SITE.name,
		short_name: 'Fakhar Auto',
		description: SITE.description,
		start_url: assetUrl(''),
		scope: assetUrl(''),
		display: 'standalone',
		background_color: '#f8fafc',
		theme_color: '#f8fafc',
		lang: 'en',
		icons: [
			{
				src: assetUrl('/logo-icon.jpg'),
				sizes: '500x500',
				type: 'image/jpeg',
				purpose: 'any',
			},
		],
	};
	return new Response(JSON.stringify(manifest), {
		headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
	});
};
