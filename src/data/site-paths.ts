import { englishPaths } from './i18n/routing';

/** Keep in sync with reviews.ts / faq.ts / forums/helpers base paths (no import — avoids site.ts cycle). */
const reviewsBasePath = '/reviews/';
const faqBasePath = '/faq/';
const forumsBasePath = '/forums/';

/** Canonical EN paths for internal linking — keep in sync with englishPaths + module base paths. */
export const sitePaths = {
	features: englishPaths.features,
	pricing: englishPaths.pricing,
	setup: englishPaths.setup,
	updates: englishPaths.updates,
	faq: englishPaths.faq,
	faqIndex: faqBasePath,
	support: englishPaths.support,
	cheats: englishPaths.hacks,
	esp: englishPaths['destiny-2-esp'],
	aimbot: englishPaths['destiny-2-aimbot'],
	radar: englishPaths.radar,
	reviews: reviewsBasePath,
	forums: forumsBasePath,
	/** /guides/ 301s to forums — use forums in nav/links */
	guides: forumsBasePath,
	privacy: englishPaths.privacy,
	refund: englishPaths.refund,
	terms: englishPaths.terms,
	cheatsReview: englishPaths['cheats-review'],
	cloudDma: englishPaths['cloud-dma'],
	hwidSpoofer: englishPaths['hwid-spoofer'],
} as const;
