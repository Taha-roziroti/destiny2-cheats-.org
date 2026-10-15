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

function familiesDifferEnough(a: ImageFamily, b: ImageFamily): boolean {
	return a !== b;
}

/**
 * Build a 3-image gallery: hero/banner shot + two supplements from different visual families.
 * Never repeats the primary src; avoids placing similar families back-to-back.
 */
export function buildPageGallery(
	pageId: PageId,
	primarySrc: string,
	primaryAlt: string,
	count = 3,
): GalleryImage[] {
	const primary: GalleryImage = { src: primarySrc, alt: primaryAlt };
	if (count <= 1) return [primary];

	const used = new Set<string>([primarySrc]);
	const primaryFam = imageFamily(primarySrc);
	const picked: GalleryImage[] = [primary];
	let lastFam = primaryFam;

	const start = hashPage(pageId) % screenshotPool.length;
	const rotated = [...screenshotPool.slice(start), ...screenshotPool.slice(0, start)];

	for (const item of rotated) {
		if (picked.length >= count) break;
		if (used.has(item.src)) continue;
		if (!familiesDifferEnough(item.family, lastFam)) continue;
		picked.push({ src: item.src, alt: item.alt });
		used.add(item.src);
		lastFam = item.family;
	}

	// Fill remaining slots — still avoid duplicates and back-to-back same family.
	if (picked.length < count) {
		for (const item of screenshotPool) {
			if (picked.length >= count) break;
			if (used.has(item.src)) continue;
			if (!familiesDifferEnough(item.family, lastFam)) continue;
			picked.push({ src: item.src, alt: item.alt });
			used.add(item.src);
			lastFam = item.family;
		}
	}

	// Last resort: any unused shot (rare with our pool size).
	if (picked.length < count) {
		for (const item of screenshotPool) {
			if (picked.length >= count) break;
			if (used.has(item.src)) continue;
			picked.push({ src: item.src, alt: item.alt });
			used.add(item.src);
		}
	}

	return picked;
}

export function galleryAltForSrc(src: string, pageAlt: string): string {
	return poolAlt(src, pageAlt);
}
