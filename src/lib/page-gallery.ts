import type { PageId } from '../data/i18n/routing';
import { imageFamily, poolAlt, screenshotPool, type ImageFamily } from '../data/image-pool';

export type GalleryImage = { src: string; alt: string };

function hashPage(pageId: string): number {
	let h = 0;
	for (let i = 0; i < pageId.length; i += 1) {
		h = (h * 33 + pageId.charCodeAt(i)) >>> 0;
	}
	return h;
}

/**
 * Build a 2-image gallery from Destiny 2 shots.
 * Prefers images that are not the page banner; never places the same family back-to-back.
 */
export function buildPageGallery(
	pageId: PageId,
	primarySrc: string,
	primaryAlt: string,
	count = 2,
): GalleryImage[] {
	if (count <= 0) return [];

	const used = new Set<string>();
	const picked: GalleryImage[] = [];
	let lastFam: ImageFamily | null = null;

	const start = hashPage(pageId) % screenshotPool.length;
	const rotated = [...screenshotPool.slice(start), ...screenshotPool.slice(0, start)];

	// Prefer supplements that are not the banner image.
	const preferNonPrimary = rotated.filter((item) => item.src !== primarySrc);
	const candidates = [...preferNonPrimary, ...rotated.filter((item) => item.src === primarySrc)];

	for (const item of candidates) {
		if (picked.length >= count) break;
		if (used.has(item.src)) continue;
		if (lastFam && item.family === lastFam) continue;
		picked.push({
			src: item.src,
			alt: item.src === primarySrc ? primaryAlt : item.alt,
		});
		used.add(item.src);
		lastFam = item.family;
	}

	if (picked.length < count) {
		for (const item of screenshotPool) {
			if (picked.length >= count) break;
			if (used.has(item.src)) continue;
			picked.push({ src: item.src, alt: item.alt });
			used.add(item.src);
		}
	}

	// Absolute fallback if pool were empty.
	if (picked.length === 0) {
		return [{ src: primarySrc, alt: primaryAlt }];
	}

	return picked;
}

export function galleryAltForSrc(src: string, pageAlt: string): string {
	return poolAlt(src, pageAlt);
}
