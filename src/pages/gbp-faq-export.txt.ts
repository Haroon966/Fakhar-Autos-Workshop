import type { APIRoute } from 'astro';
import { buildGbpFaqExport } from '../utils/llms';

/** Export FAQ text for manual Google Business Profile Q&A sync. */
export const GET: APIRoute = () =>
	new Response(buildGbpFaqExport(), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
