function basePrefix(): string {
	const base = import.meta.env.BASE_URL;
	return base.endsWith('/') ? base : `${base}/`;
}

/** Absolute page URL (canonical, JSON-LD) with correct `base` on GitHub Pages. */
export function pageUrl(path = ''): string {
	const normalized = path.replace(/^\//, '');
	return new URL(`${basePrefix()}${normalized}`, import.meta.env.SITE).href;
}

/** Path with deploy `base` — use for internal links and public assets. */
export function withBase(path: string): string {
	const normalized = path.replace(/^\//, '');
	return `${basePrefix()}${normalized}`;
}

/** @alias withBase */
export const assetUrl = withBase;

/** @alias withBase */
export const routeUrl = withBase;

/** Strip deploy base from pathname so nav active states work on GitHub Pages. */
export function stripBasePath(pathname: string): string {
	const base = import.meta.env.BASE_URL;
	if (base === '/') return pathname;
	const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
	if (pathname === prefix || pathname === `${prefix}/`) return '/';
	if (pathname.startsWith(`${prefix}/`)) {
		return pathname.slice(prefix.length) || '/';
	}
	return pathname;
}
