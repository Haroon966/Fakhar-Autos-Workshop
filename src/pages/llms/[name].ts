import type { APIRoute } from 'astro';
import { buildHomeMd, buildFaqMd, buildServicesMd, buildAboutMd, buildContactMd } from '../../utils/llms';

const builders: Record<string, () => string> = {
	'home.md': buildHomeMd,
	'faq.md': buildFaqMd,
	'services.md': buildServicesMd,
	'about.md': buildAboutMd,
	'contact.md': buildContactMd,
};

export const GET: APIRoute = ({ params }) => {
	const name = params.name ?? '';
	const build = builders[name];
	if (!build) {
		return new Response('Not found', { status: 404 });
	}
	return new Response(build(), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
};

export function getStaticPaths() {
	return Object.keys(builders).map((name) => ({ params: { name } }));
}
