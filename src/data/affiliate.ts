import { siteConfig } from './site';

/** rel value for outbound affiliate / checkout links (section 6). */
export const affiliateLinkRel = 'sponsored nofollow noopener noreferrer';

export const affiliateDisclosurePath = '/affiliate-disclosure/';

const AFFILIATE_HOST = 'zadeyo.com';

/** True when href points at the configured checkout / affiliate destination. */
export function isAffiliateHref(href: string | undefined | null): boolean {
	if (!href) return false;
	if (href === siteConfig.checkoutUrl) return true;
	try {
		const url = new URL(href, siteConfig.url);
		return url.hostname.toLowerCase().includes(AFFILIATE_HOST);
	} catch {
		return false;
	}
}

/** rel for an arbitrary href — affiliate checkout vs normal internal/external. */
export function linkRelForHref(href: string): string | undefined {
	if (isAffiliateHref(href)) return affiliateLinkRel;
	if (href.startsWith('http')) return 'noopener noreferrer';
	return undefined;
}
