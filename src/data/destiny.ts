import { siteConfig } from './site';
import { screenshotPool } from './image-pool';

/** Screenshots used across marketing surfaces — one entry per file, mixed families. */
export const destinyImages = {
	hero: '/images/destiny-2-hero-poster.webp',
	espWallhack: '/images/destiny-2-cheats-wallhack-skeleton.webp',
	aimbotCombat: '/images/destiny-2-cheats-crucible.webp',
	aimbotSkeleton: '/images/destiny-2-cheats-aimbot-esp.webp',
	playerEsp: '/images/destiny-2-cheats-esp-crucible.webp',
	cheatsCombat: '/images/destiny-2-cheats-pve.webp',
	logo: siteConfig.logo,
	cover: '/images/destiny-2-cheats-raid.webp',
	loadoutBuilder: '/images/destiny-2-cheats-radar.webp',
	squadFight: '/images/destiny-2-cheats-combat.webp',
	cheatsPackage: '/images/destiny-2-cheats-hero.webp',
	headerArt: '/images/destiny-2-cheats-aimbot-view.webp',
	battleRoyaleCombat: '/images/destiny-2-aimbot-sniper.webp',
	extractFight: '/images/destiny-2-esp-player-tags.webp',
	rebootFight: '/images/destiny-2-esp-radar.webp',
	scavRunCombat: '/images/destiny-2-cheats-wallhack.webp',
	scavRunMode: '/images/destiny-2-cheats-esp.webp',
	battleRoyaleIsland: '/images/destiny-2-hero-ghost.webp',
	raidMap: '/images/destiny-2-cheats-raid.webp',
	product: screenshotPool.map((item) => ({ src: item.src, alt: item.alt })),
	gallery: [
		{ src: '/images/destiny-2-cheats-esp-crucible.webp', alt: 'Destiny 2 ESP overlay showing enemy distance', featured: true },
		{ src: '/images/destiny-2-cheats-radar.webp', alt: 'Destiny 2 radar threat overlay' },
		{ src: '/images/destiny-2-cheats-wallhack-skeleton.webp', alt: 'Destiny 2 wallhack skeleton through cover' },
		{ src: '/images/destiny-2-cheats-raid.webp', alt: 'Destiny 2 PvE raid ESP overlay' },
		{ src: '/images/destiny-2-cheats-aimbot-view.webp', alt: 'Destiny 2 aimbot FOV and bone view' },
	],
	sitemap: screenshotPool.map((item) => ({
		src: item.src,
		title: '',
		caption: '',
	})),
} as const;
