import { brand } from './brand';
import { siteConfig } from './site-core';
import { locales } from './i18n/locales';
import { sitePaths } from './site-paths';
import { organizationSameAs } from './seo-external';

/** Canonical origin — no trailing slash (matches brand.url / Astro site). */
export const SITE_URL = brand.url.replace(/\/$/, '');
export const SITE_HOST = new URL(SITE_URL).hostname;

/** Organization description — single game only. */
export const SITE_PURPOSE = `${brand.game} cheats for Windows PC — ESP, aimbot, wallhack, and radar with ${brand.antiCheat} maintenance.`;

/** Schema.org Organization.knowsAbout — exactly six terms. */
export const SITE_ABOUT = {
	knowsAbout: [
		`${brand.game} cheats`,
		`${brand.game} ESP`,
		`${brand.game} aimbot`,
		`${brand.game} wallhack`,
		brand.antiCheat,
		'Windows PC game cheats',
	],
} as const;

/** Copy intent map — not rendered as keyword lists. */
export const SEO_ROUTE_INTENTS: Readonly<Record<string, readonly string[]>> = {
	'/': ['destiny 2 cheats', 'ESP', 'aimbot', 'availability'],
	[sitePaths.cheats]: ['buy destiny 2 cheats', 'pricing', 'plans'],
	'/d2-cheats/': ['destiny 2 hacks', 'ESP', 'aimbot', 'wallhack'],
	[sitePaths.esp]: ['destiny 2 ESP', 'wallhack', 'Windows PC'],
	[sitePaths.aimbot]: ['destiny 2 aimbot', 'soft aim', 'Crucible'],
	[sitePaths.features]: ['destiny 2 cheat features', 'radar', 'setup'],
	[sitePaths.pricing]: ['destiny 2 cheats price', 'monthly', 'lifetime'],
	[sitePaths.setup]: ['destiny 2 cheats setup guide', 'system requirements', 'install'],
	[sitePaths.cheatsReview]: ['destiny 2 cheats review', 'evaluation', 'trade-offs'],
	[sitePaths.cloudDma]: ['cloud dma software', 'hyper-v', 'pricing'],
	[sitePaths.hwidSpoofer]: ['hwid spoofer', 'hardware ban', 'vanguard'],
	[sitePaths.updates]: ['undetected status', 'BattlEye', 'patch day'],
	[sitePaths.forums]: ['setup', 'ESP', 'aimbot', 'patch day'],
	[sitePaths.reviews]: ['buyer feedback', 'ESP', 'aimbot'],
	[sitePaths.faq]: ['pricing', 'Windows', 'delivery'],
};

export const ROBOTS_INDEX =
	'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export function isBoosterOgImage(path: string): boolean {
	return path.startsWith('/og/') && /\.(jpe?g)$/i.test(path);
}

export function siteIdentityGraph(options: {
	logoURL: string;
	siteDescription: string;
}): Record<string, unknown>[] {
	const schemaLanguages = locales.map((l) => l.ogLocale.replace('_', '-'));
	const worldwidePlace = { '@type': 'Place' as const, name: siteConfig.market };

	return [
		{
			'@type': 'WebSite',
			'@id': `${SITE_URL}/#website`,
			url: SITE_URL,
			name: siteConfig.name,
			description: options.siteDescription,
			inLanguage: schemaLanguages,
			publisher: { '@id': `${SITE_URL}/#organization` },
			logo: {
				'@type': 'ImageObject',
				url: options.logoURL,
				width: siteConfig.logoRasterWidth,
				height: siteConfig.logoRasterHeight,
			},
		},
		{
			'@type': 'Organization',
			'@id': `${SITE_URL}/#organization`,
			name: siteConfig.name,
			url: SITE_URL,
			description: SITE_PURPOSE,
			email: siteConfig.supportEmail,
			areaServed: worldwidePlace,
			knowsAbout: [...SITE_ABOUT.knowsAbout],
			...(organizationSameAs().length > 0 ? { sameAs: organizationSameAs() } : {}),
			logo: {
				'@type': 'ImageObject',
				url: options.logoURL,
				width: siteConfig.logoRasterWidth,
				height: siteConfig.logoRasterHeight,
			},
			image: options.logoURL,
			contactPoint: {
				'@type': 'ContactPoint',
				contactType: 'customer support',
				email: siteConfig.supportEmail,
				areaServed: worldwidePlace,
				availableLanguage: locales.map((l) => l.name),
			},
		},
	];
}
