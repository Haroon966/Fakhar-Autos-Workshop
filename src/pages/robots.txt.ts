import type { APIRoute } from 'astro';
import { pageUrl } from '../utils/paths';

export const GET: APIRoute = () => {
	const sitemap = pageUrl('sitemap-index.xml');
	const body = `User-agent: *
Allow: /

# LLM-friendly content
# llms.txt: ${pageUrl('llms.txt')}
# llms-full.txt: ${pageUrl('llms-full.txt')}

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${sitemap}
`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
