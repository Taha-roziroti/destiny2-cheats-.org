/** Cache-Control for static assets served via the Worker (hashed build assets = immutable). */

const IMMUTABLE = 'public, max-age=31536000, immutable';
const HTML = 'public, max-age=0, must-revalidate';
const SHORT = 'public, max-age=3600';

export function cacheControlForPath(pathname: string): string | null {
	if (pathname.startsWith('/_astro/')) return IMMUTABLE;
	if (pathname.startsWith('/fonts/')) return IMMUTABLE;
	if (pathname.startsWith('/images/')) return IMMUTABLE;
	if (pathname.startsWith('/og/')) return IMMUTABLE;
	if (pathname.startsWith('/videos/')) return SHORT;
	if (pathname.endsWith('.webmanifest') || pathname.endsWith('/site.webmanifest')) return SHORT;
	if (pathname === '/llms.txt' || pathname.endsWith('/security.txt')) return SHORT;
	if (pathname.endsWith('.ico') || pathname.match(/\/favicon[^/]*\.(png|ico)$/)) return IMMUTABLE;
	if (pathname.endsWith('.xml') && pathname.includes('sitemap')) return SHORT;
	if (pathname.endsWith('.html') || pathname.endsWith('/')) return HTML;
	return null;
}

const LCP_POSTER_PRELOAD =
	'</images/destiny-2-hero-poster-mobile.webp>; rel=preload; as=image; type=image/webp; fetchpriority=high';

function isHtmlDocument(pathname: string, response: Response): boolean {
	const type = response.headers.get('content-type') || '';
	if (type.includes('text/html')) return true;
	if (!type && (pathname.endsWith('/') || pathname.endsWith('.html'))) return true;
	return false;
}

export function withCacheHeaders(response: Response, pathname: string): Response {
	const policy = cacheControlForPath(pathname);
	const headers = new Headers(response.headers);
	let changed = false;

	if (policy && !headers.has('Cache-Control')) {
		headers.set('Cache-Control', policy);
		changed = true;
	}

	if (isHtmlDocument(pathname, response) && response.ok && !headers.has('Link')) {
		headers.set('Link', LCP_POSTER_PRELOAD);
		changed = true;
	}

	if (!changed) return response;

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}
