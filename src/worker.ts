import { withCacheHeaders } from './lib/asset-cache';
import { isLegacyLocaleCode } from './data/i18n/locales';

/**
 * Cloudflare Worker — host canonicalization before static assets.
 * Canonical site: https://destiny2cheats.org (matches brand.url)
 *
 * Requires DNS: CNAME `www` → `destiny2cheats.org` (proxied) AND
 * Workers custom domain `www.destiny2cheats.org` attached — otherwise
 * www is NXDOMAIN and Seobility fails the www/non-www check.
 */
export interface Env {
	ASSETS: Fetcher;
}

const CANONICAL_HOST = 'destiny2cheats.org';

/** Old apex still 301 → current canonical. */
const LEGACY_HOSTS = new Set(['bestdestiny-2cheats.com', 'www.bestdestiny-2cheats.com']);

function canonicalUrl(request: Request): URL | null {
	const url = new URL(request.url);
	const host = (request.headers.get('host') || url.hostname).split(':')[0].toLowerCase();
	let changed = false;

	if (url.protocol === 'http:') {
		url.protocol = 'https:';
		changed = true;
	}

	if (
		host === `www.${CANONICAL_HOST}` ||
		url.hostname === `www.${CANONICAL_HOST}` ||
		LEGACY_HOSTS.has(host)
	) {
		url.hostname = CANONICAL_HOST;
		changed = true;
	}

	return changed ? url : null;
}

/** Retired /{locale}/… URLs → English homepage. */
function retiredLocaleRedirect(request: Request): URL | null {
	const url = new URL(request.url);
	const segment = url.pathname.split('/').filter(Boolean)[0]?.toLowerCase();
	if (!segment || !isLegacyLocaleCode(segment)) return null;
	const target = new URL(request.url);
	target.pathname = '/';
	return target;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const target = canonicalUrl(request);
		if (target) {
			return Response.redirect(target.toString(), 301);
		}

		const localeTarget = retiredLocaleRedirect(request);
		if (localeTarget) {
			return Response.redirect(localeTarget.toString(), 301);
		}

		const url = new URL(request.url);
		const response = await env.ASSETS.fetch(request);
		return withCacheHeaders(response, url.pathname);
	},
};
