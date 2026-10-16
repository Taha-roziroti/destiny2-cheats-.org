import { siteConfig } from './site';
import { pageIds, type PageId } from './i18n/routing';
import { pageSitemapImageLabels } from './brand-sitemap';

/** Rotating Destiny 2 product screenshots for FAQ answers, reviews, etc. */
export const crawlPhotoPool = [
	'/images/destiny-2-cheats-radar.webp',
	'/images/destiny-2-cheats-pve.webp',
	'/images/destiny-2-cheats-esp-crucible.webp',
	'/images/destiny-2-cheats-aimbot.webp',
	'/images/destiny-2-cheats-crucible.webp',
	'/images/destiny-2-cheats-wallhack-skeleton.webp',
] as const;

/**
 * One primary hero / banner image per product page — Destiny 2 only.
 */
export const pageImageSrcById: Record<PageId, string> = {
	home: '/images/destiny-2-hero-poster.webp',
	'destiny-2-esp': '/images/destiny-2-cheats-esp-crucible.webp',
	'destiny-2-aimbot': '/images/destiny-2-cheats-aimbot.webp',
	features: '/images/destiny-2-cheats-aimbot-esp.webp',
	pricing: '/images/destiny-2-cheats-pve.webp',
	setup: '/images/destiny-2-cheats-wallhack-skeleton.webp',
	updates: '/images/destiny-2-cheats-aimbot-esp.webp',
	faq: '/images/destiny-2-cheats-esp.webp',
	support: '/images/destiny-2-hero-poster.webp',
	undetected: '/images/destiny-2-cheats-wallhack-skeleton.webp',
	wallhack: '/images/destiny-2-cheats-wallhack-skeleton.webp',
	radar: '/images/destiny-2-cheats-radar.webp',
	anticheat: '/images/destiny-2-cheats-crucible.webp',
	'cheats-2026': '/images/destiny-2-hero-poster.webp',
	hacks: '/images/destiny-2-cheats-pve.webp',
	'cheat-download': '/images/destiny-2-cheats-esp.webp',
	'crucible-cheats': '/images/destiny-2-cheats-crucible.webp',
	'aim-assist': '/images/destiny-2-cheats-aimbot.webp',
	'best-cheats': '/images/destiny-2-cheats-aimbot-esp.webp',
	'aimbot-hack': '/images/destiny-2-cheats-aimbot.webp',
	'esp-hack': '/images/destiny-2-cheats-esp-crucible.webp',
	'pve-cheats': '/images/destiny-2-cheats-pve.webp',
	privacy: '/images/destiny-2-hero-poster.webp',
	refund: '/images/destiny-2-cheats-crucible.webp',
	terms: '/images/destiny-2-cheats-pve.webp',
	'cheats-review': '/images/destiny-2-cheats-esp.webp',
	'cloud-dma': '/images/destiny-2-cheats-aimbot.webp',
	'hwid-spoofer': '/images/destiny-2-hero-poster.webp',
};

for (const pageId of pageIds) {
	if (!pageImageSrcById[pageId]) {
		throw new Error(`[page-images] No image path configured for pageId: ${pageId}`);
	}
}

export function absoluteImageUrl(path: string): string {
	return new URL(path, siteConfig.url).href;
}

export function getPageImageSrc(pageId: PageId): string {
	return pageImageSrcById[pageId];
}

export function getPageCrawlImage(pageId: PageId): {
	src: string;
	url: string;
	title: string;
	caption: string;
} {
	const src = pageImageSrcById[pageId];
	const labels = pageSitemapImageLabels(pageId);
	return {
		src,
		url: absoluteImageUrl(src),
		title: labels.title,
		caption: labels.caption,
	};
}

/** Stable pick from the photo pool (FAQ answers, reviews, etc.). */
export function pickCrawlPhoto(seed: string): string {
	let hash = 0;
	for (let i = 0; i < seed.length; i += 1) {
		hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
	}
	return crawlPhotoPool[hash % crawlPhotoPool.length];
}

export function crawlPhotoMeta(
	seed: string,
	title: string,
	caption: string,
): { src: string; url: string; title: string; caption: string } {
	const src = pickCrawlPhoto(seed);
	return {
		src,
		url: absoluteImageUrl(src),
		title,
		caption,
	};
}

/** Default large social / SERP image when a page has no specific asset. */
export const defaultCrawlImageSrc = pageImageSrcById.home;
