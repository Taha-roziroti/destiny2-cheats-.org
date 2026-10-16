/**
 * Responsive image helpers — prefer compressed WebP for LCP and below-fold media.
 */

export interface ResponsiveWidth {
	src: string;
	width: number;
}

/** Build a srcset string from width-tagged image paths. */
export function buildSrcSet(widths: ResponsiveWidth[]): string {
	return widths.map(({ src, width }) => `${src} ${width}w`).join(', ');
}

/** Build srcset for content images that have -480w / -960w variants. */
export function contentSrcSet(baseSrc: string): string | undefined {
	if (baseSrc.endsWith('/destiny-2-hero-poster.webp')) {
		return buildSrcSet(heroResponsive);
	}

	const match = baseSrc.match(/^(.+\/)(.+)\.webp$/i);
	if (!match) return undefined;

	const [, dir, name] = match;
	if (
		name.endsWith('-640w') ||
		name.endsWith('-960w') ||
		name.endsWith('-1400w') ||
		name.endsWith('-1024w') ||
		name.endsWith('-1536w') ||
		name.endsWith('-1920w') ||
		name.endsWith('-2560w') ||
		name.endsWith('-3840w') ||
		name.endsWith('-480w')
	) {
		return undefined;
	}

	return buildSrcSet(
		contentWidths.map((width) => ({
			src: `${dir}${name}-${width}w.webp`,
			width,
		})),
	);
}

/** Homepage hero poster — swap video at /videos/destiny-2-hero.mp4 when ready. */
export const heroResponsive: ResponsiveWidth[] = [
	{ src: '/images/destiny-2-hero-poster-480w.webp', width: 480 },
	{ src: '/images/destiny-2-hero-poster-640w.webp', width: 640 },
	{ src: '/images/destiny-2-hero-poster-720w.webp', width: 720 },
	{ src: '/images/destiny-2-hero-poster-960w.webp', width: 960 },
	{ src: '/images/destiny-2-hero-poster-1024w.webp', width: 1024 },
	{ src: '/images/destiny-2-hero-poster-1280w.webp', width: 1280 },
	{ src: '/images/destiny-2-hero-poster-1536w.webp', width: 1536 },
	{ src: '/images/destiny-2-hero-poster-1920w.webp', width: 1920 },
];

export const heroDesktopResponsive: ResponsiveWidth[] = heroResponsive;

export const heroSrc = '/images/destiny-2-hero-poster.webp';
export const heroSrcSet = buildSrcSet(heroResponsive);
/** Cap mobile slot width so 480w variant wins on Lighthouse / phone viewports. */
export const heroSizes = '(max-width: 900px) 100vw, min(100vw, 1920px)';

/** Lighthouse / phone slot — smallest hero poster (see HeroLcpPicture mobile source). */
export const heroMobileSrcSet =
	'/images/destiny-2-hero-poster-640w.webp 640w, /images/destiny-2-hero-poster-960w.webp 960w';
export const heroMobileSizes = '100vw';
/** Default mobile fallback (960w). */
export const heroMobileSrc = '/images/destiny-2-hero-poster-960w.webp';

/** Default img `src` + mobile fallback. */
export const heroPreloadSrc = '/images/destiny-2-hero-poster-480w.webp';
/** Desktop banner preload (matches HeroLcpPicture srcset pick at ≥901px). */
export const heroDesktopPreloadSrc = '/images/destiny-2-hero-poster-1280w.webp';
export const heroMimeType = 'image/webp';

export const heroWidth = 1920;
export const heroHeight = 610;

/** Only widths we ship for content screenshots — larger tags 404 and break gallery tiles. */
export const contentWidths = [480, 960] as const;

export const galleryFeaturedSizes = '(max-width: 560px) 100vw, (max-width: 900px) 90vw, 640px';
export const galleryTileSizes = '(max-width: 560px) 100vw, (max-width: 900px) 45vw, 320px';
export const productMainSizes = '(max-width: 900px) 100vw, 640px';
export const productThumbSizes = '160px';
