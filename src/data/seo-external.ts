import { brand } from './brand';
import type { PageId } from './i18n/content.generated';
import { SITE_URL, SEO_ROUTE_INTENTS } from './seo-booster';
import { sitePaths } from './site-paths';

/** First-party 1200×630 JPEGs for social crawlers (not page hero WebPs). */
export const BOOSTER_OG_ASSETS = {
	home: '/og/home.jpg',
	product: '/og/product.jpg',
	features: '/og/features.jpg',
	pricing: '/og/pricing.jpg',
	reviews: '/og/reviews.jpg',
	faq: '/og/faq.jpg',
	forums: '/og/forums.jpg',
} as const;

/** Money pages → booster OG asset (falls back to hero when unmapped). */
const PAGE_SOCIAL_PREVIEW: Partial<Record<PageId, string>> = {
	home: BOOSTER_OG_ASSETS.home,
	hacks: BOOSTER_OG_ASSETS.product,
	features: BOOSTER_OG_ASSETS.features,
	pricing: BOOSTER_OG_ASSETS.pricing,
	faq: BOOSTER_OG_ASSETS.faq,
	setup: BOOSTER_OG_ASSETS.features,
	updates: BOOSTER_OG_ASSETS.features,
	support: BOOSTER_OG_ASSETS.faq,
	undetected: BOOSTER_OG_ASSETS.features,
	'destiny-2-esp': BOOSTER_OG_ASSETS.product,
	'destiny-2-aimbot': BOOSTER_OG_ASSETS.product,
	wallhack: BOOSTER_OG_ASSETS.features,
	radar: BOOSTER_OG_ASSETS.features,
	anticheat: BOOSTER_OG_ASSETS.features,
	'cheats-2026': BOOSTER_OG_ASSETS.product,
	'cheat-download': BOOSTER_OG_ASSETS.product,
	'crucible-cheats': BOOSTER_OG_ASSETS.product,
	'aim-assist': BOOSTER_OG_ASSETS.product,
	'best-cheats': BOOSTER_OG_ASSETS.product,
	'aimbot-hack': BOOSTER_OG_ASSETS.product,
	'esp-hack': BOOSTER_OG_ASSETS.product,
	'pve-cheats': BOOSTER_OG_ASSETS.product,
	'cheats-review': BOOSTER_OG_ASSETS.reviews,
	'cloud-dma': BOOSTER_OG_ASSETS.pricing,
	'hwid-spoofer': BOOSTER_OG_ASSETS.pricing,
	privacy: BOOSTER_OG_ASSETS.home,
	refund: BOOSTER_OG_ASSETS.home,
	terms: BOOSTER_OG_ASSETS.home,
};

export function socialPreviewImageForPage(
	pageId?: PageId,
	heroOrPageFallback?: string,
): string {
	if (pageId && PAGE_SOCIAL_PREVIEW[pageId]) {
		return PAGE_SOCIAL_PREVIEW[pageId]!;
	}
	return heroOrPageFallback ?? brand.defaultOgImage;
}

/** Organization.sameAs — add real profile URLs in brand.ts when available. */
export function organizationSameAs(): string[] {
	const urls = brand.sameAs ?? [];
	return urls.map((u) => u.trim()).filter(Boolean);
}

const LLMS_PRIORITY_PATHS = [
	'/',
	sitePaths.cheats,
	sitePaths.esp,
	sitePaths.aimbot,
	sitePaths.features,
	sitePaths.pricing,
	sitePaths.setup,
	sitePaths.updates,
	sitePaths.faq,
	sitePaths.reviews,
	sitePaths.forums,
	sitePaths.cheatsReview,
	sitePaths.cloudDma,
	sitePaths.hwidSpoofer,
] as const;

/** Plain-text discovery file for crawlers and assistants (public/llms.txt). */
export function buildLlmsTxt(): string {
	const lines = [
		`# ${brand.name}`,
		`> ${brand.game} cheat software for Windows PC — features, pricing, setup, and support at ${SITE_URL}.`,
		'',
		'## Canonical site',
		SITE_URL,
		'',
		'## Primary pages',
		...LLMS_PRIORITY_PATHS.map((p) => `- ${SITE_URL}${p === '/' ? '/' : p}`),
		'',
		'## Sitemap',
		`${SITE_URL}/sitemap.xml`,
		'',
		'## Contact',
		`mailto:${brand.supportEmail}`,
		'',
		'## Topic map (for editors — not keywords on-page)',
	];

	for (const [route, intents] of Object.entries(SEO_ROUTE_INTENTS)) {
		const path = route.startsWith('/') ? route : `/${route}`;
		lines.push(`- ${SITE_URL}${path}: ${intents.join(', ')}`);
	}

	lines.push('');
	return lines.join('\n');
}

export function buildSecurityTxt(): string {
	return [
		`Contact: mailto:${brand.supportEmail}`,
		`Preferred-Languages: en`,
		`Canonical: ${SITE_URL}/.well-known/security.txt`,
		`Policy: ${SITE_URL}/privacy/`,
	].join('\n');
}
