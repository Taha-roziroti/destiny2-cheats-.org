import { siteConfig } from './site';
import { screenshotPool } from './image-pool';

/** Screenshots used across marketing surfaces — Destiny 2 cheat overlays only. */
export const destinyImages = {
	hero: '/images/destiny-2-hero-poster.webp',
	espWallhack: '/images/destiny-2-cheats-wallhack-skeleton.webp',
	aimbotCombat: '/images/destiny-2-cheats-crucible.webp',
	aimbotSkeleton: '/images/destiny-2-cheats-aimbot-esp.webp',
	playerEsp: '/images/destiny-2-cheats-esp-crucible.webp',
	cheatsCombat: '/images/destiny-2-cheats-pve.webp',
	logo: siteConfig.logo,
	cover: '/images/destiny-2-cheats-pve.webp',
	loadoutBuilder: '/images/destiny-2-cheats-radar.webp',
	squadFight: '/images/destiny-2-cheats-aimbot.webp',
	cheatsPackage: '/images/destiny-2-cheats-esp.webp',
	headerArt: '/images/destiny-2-cheats-aimbot.webp',
	battleRoyaleCombat: '/images/destiny-2-cheats-crucible.webp',
	extractFight: '/images/destiny-2-cheats-esp-crucible.webp',
	rebootFight: '/images/destiny-2-cheats-radar.webp',
	scavRunCombat: '/images/destiny-2-cheats-wallhack-skeleton.webp',
	scavRunMode: '/images/destiny-2-cheats-esp.webp',
	battleRoyaleIsland: '/images/destiny-2-hero-poster.webp',
	raidMap: '/images/destiny-2-cheats-pve.webp',
	product: screenshotPool.map((item) => ({ src: item.src, alt: item.alt })),
	gallery: [
		{
			src: '/images/destiny-2-cheats-esp-crucible.webp',
			alt: 'Destiny 2 ESP overlay showing enemy distance',
			featured: true,
		},
		{
			src: '/images/destiny-2-cheats-aimbot.webp',
			alt: 'Destiny 2 aimbot FOV and soft aim',
		},
	],
	sitemap: screenshotPool.map((item) => ({
		src: item.src,
		title: '',
		caption: '',
	})),
} as const;
