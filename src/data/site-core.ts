import { brand, fillBrandTokens, seoDescription, seoTitle } from './brand';

/**
 * Title clamp lives here — NOT in brand.ts.
 * Brand Studio rewrites brand.ts on every save; helpers here stay stable.
 */
export function seoPageTitle(template: string): string {
	const text = fillBrandTokens(template).trim();
	/** Google SERP titles typically display ~50–60 chars; clamp at 60. */
	return text.length <= 60 ? text : `${text.slice(0, 57).trim()}…`;
}

export { brand, fillBrandTokens, seoDescription, seoTitle };

const copyDefaults = {
	tagline: '{primaryKeyword} with aimbot, ESP, wallhack, and radar for PC',
	summary:
		'{brand} is a {game} cheat package for Windows PC with aimbot, ESP, wallhack, radar, and stream-safe overlays plus {antiCheat} maintenance.',
	heroLede: 'ESP, aimbot, wallhack, and radar for Crucible, Trials, and raids on Windows PC.',
	blogLabel: 'Forums',
	ctaBuy: 'Buy now',
	ctaBuyShort: 'Buy',
	featuresIntro: 'Everything included in one license for {game} on Windows PC.',
	storeIntro: 'Pick a plan. Same features on both. Instant delivery after payment.',
	statusIntro: 'Check here after a {game} or {antiCheat} patch before you play.',
	previewIntro: 'A quick look at {brand} — ESP, aimbot, radar, and updates after patches.',
	setupIntro: 'Install {brand} on Windows PC after you buy. Follow these short steps.',
	supportIntro: 'Need help with {brand}? Email {email} with your order ID.',
	faqIntro: 'Short answers about delivery, setup, updates, and refunds.',
	reviewsIntro: 'Real feedback from {brand} buyers — ESP, soft aim, radar, and support.',
	chipEsp: 'ESP / wallhack',
	chipAim: 'Soft aim',
	chipRadar: '2D radar',
	chipUpdates: 'Patch updates',
	navPreview: 'Preview',
	navFeatures: 'Features',
	navStore: 'Store',
	navStatus: 'Status',
	navReviews: 'Reviews',
} as const;

const seoDefaults = {
	homeTitle: 'Destiny 2 ESP, Aimbot & Wallhack',
	homeDescription:
		'Destiny 2 cheats with ESP, aimbot, and wallhack for Windows PC. Radar, recoil control, and stream-safe overlays — compare plans and get instant delivery.',
	featuresTitle: '{game} Cheat Features — ESP, Aimbot & Radar',
	featuresDescription:
		'Full feature list for {game} cheats on Windows PC — ESP wallhack, soft aim, 2D radar, recoil control, and stream-safe overlays in one license.',
	storeTitle: '{game} Cheats Pricing — Monthly & Lifetime',
	storeDescription:
		'Monthly and lifetime {game} cheat plans for Windows PC. Same ESP, aimbot, wallhack, and radar on both tiers with instant delivery.',
	statusTitle: '{game} Cheat Status — Live Updates',
	statusDescription:
		'Live status for {brand} after {game} or {antiCheat} patches. Check maintenance notes before Crucible, Trials, or raids.',
	previewTitle: 'Buy {game} Cheats — ESP, Aimbot & Radar',
	previewDescription:
		'Buy {game} cheats for Windows PC — ESP wallhack, soft aim, 2D radar, and patch rebuilds. Monthly and lifetime plans with instant delivery.',
	setupTitle: '{game} Setup | {brand}',
	setupDescription: 'Install and launch {brand} on Windows PC. Short setup steps after you buy.',
	supportTitle: '{game} Support | {brand}',
	supportDescription: 'Get help with {brand}. Email {email} with your order ID.',
	faqTitle: '{game} FAQ | {brand}',
	faqDescription: 'Short answers about {brand} — delivery, setup, updates, and refunds.',
	reviewsTitle: '{brand} Reviews | Buyer Feedback',
	reviewsDescription:
		'Real buyer reviews for {brand} — ESP, soft aim, radar, and patch updates on Windows PC.',
	forumsTitle: '{game} Cheats Forum — ESP & Aimbot',
	forumsDescription:
		'{game} cheats forum with setup threads, aimbot tuning, ESP presets, Crucible tips, and license questions from Windows PC players.',
} as const;

type SeoShape = typeof seoDefaults;
type CopyShape = typeof copyDefaults;

/** Always-safe copy/seo — Brand Studio saves must never crash the site. */
const brandExtra = brand as typeof brand & { seo?: Partial<SeoShape>; copy?: Partial<CopyShape> };
export const brandSeo: SeoShape = { ...seoDefaults, ...brandExtra.seo };
export const brandCopy: CopyShape = { ...copyDefaults, ...brandExtra.copy };

/** Resolved EN home meta */
export function homeSeo() {
	return {
		title: seoPageTitle(brandSeo.homeTitle),
		description: seoDescription(brandSeo.homeDescription),
	};
}

/** Site config derived from brand — import this in layouts/components. */
const brandMedia = brand as typeof brand & {
	heroVideo?: string;
	heroVideoPoster?: string;
};

export const siteConfig = {
	name: brand.name,
	url: brand.url,
	locale: brand.locale,
	market: brand.market,
	supportEmail: brand.supportEmail,
	logo: brand.logo,
	logoRaster: brand.logoRaster,
	logoRasterWidth: brand.logoRasterWidth,
	logoRasterHeight: brand.logoRasterHeight,
	logoAlt: brand.logoAlt,
	checkoutUrl: brand.checkoutUrl,
	defaultOgImage: brand.defaultOgImage,
	heroImage: brand.heroImage,
	heroVideo: brandMedia.heroVideo ?? '',
	heroVideoPoster: brandMedia.heroVideoPoster ?? brand.heroImage,
} as const;

/** Prefer brand.keywords — kept for Layout meta keywords. */
export const seoKeywords = brand.keywords.list;

/** Blog eyebrow / title suffix */
export const blogLabel = fillBrandTokens(brandCopy.blogLabel);

export const productInfo = {
	name: brand.name,
	shortName: brand.game,
	brand: brand.name,
	tagline: fillBrandTokens(brandCopy.tagline),
	summary: fillBrandTokens(brandCopy.summary),
	game: brand.game,
	delivery: 'Digital license delivery after purchase confirmation',
	platforms: [...brand.platforms],
	updateCadence: fillBrandTokens(
		'Updates are published when {game} or {antiCheat} patches need a rebuild',
	),
	supportHours: 'Support requests are reviewed daily',
	plans: brand.plans.map((p) => ({ ...p })),
	currency: brand.currency,
	heroLede: fillBrandTokens(brandCopy.heroLede),
	features: {
		esp: [
			'Guardian and enemy ESP / wallhack',
			'Skeleton ESP, box ESP, and health bars',
			'Distance ESP and loot ESP markers',
			'Player tracker through cover',
			'Crucible, Trials, and PvE visibility',
			'Stream-proof overlay rendering',
		],
		aimbot: [
			'Precision aimbot and aim assist',
			'Triggerbot with configurable delay',
			'No recoil and no spread for perfect shots',
			'Smoothness, FOV, and bone priority',
			'Per-weapon profiles and hotkeys',
		],
		radar: [
			'2D radar and enemy tracker',
			'Adjustable range and flanks outside FOV',
			'Works in Crucible, Trials, raids, and dungeons',
		],
		general: [
			'Movement hack and speed customization',
			'Fully customizable menu and toggles',
			fillBrandTokens('{antiCheat} maintenance after patches'),
			'Digital delivery after checkout',
			'Setup guide and support',
		],
	},
} as const;
