import { destinyImages } from './destiny';

/** Product preview carousel — unique alts for image SEO (verify-seo checks count). */
export const PRODUCT_PREVIEW_GALLERY = destinyImages.product.map((item) => ({
	src: item.src,
	alt: item.alt,
}));
