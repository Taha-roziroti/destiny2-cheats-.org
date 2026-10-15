/**
 * Visual families — avoid placing same-family shots next to each other in a gallery.
 * Paths are base /images/*.webp assets (no width suffix).
 */
export type ImageFamily =
	| 'hero'
	| 'esp'
	| 'aimbot'
	| 'wallhack'
	| 'radar'
	| 'pve'
	| 'misc';

export type PoolImage = {
	src: string;
	family: ImageFamily;
	alt: string;
};

/** All product screenshots available for heroes and below-fold galleries. */
export const screenshotPool: PoolImage[] = [
	{ src: '/images/destiny-2-hero-poster.webp', family: 'hero', alt: 'Destiny 2 cheats hero — ESP and aimbot overlay' },
	{ src: '/images/destiny-2-hero-ghost.webp', family: 'hero', alt: 'Destiny 2 Guardian ghost with cheat HUD' },
	{ src: '/images/destiny-2-hero-banner.webp', family: 'hero', alt: 'Destiny 2 cheats wide banner art' },
	{ src: '/images/destiny-2-cheats-hero.webp', family: 'hero', alt: 'Destiny 2 cheats package hero still' },
	{ src: '/images/destiny-2-cheats-esp-crucible.webp', family: 'esp', alt: 'Destiny 2 ESP player boxes in Crucible' },
	{ src: '/images/destiny-2-cheats-esp.webp', family: 'esp', alt: 'Destiny 2 ESP loot and player markers' },
	{ src: '/images/destiny-2-esp-player-tags.webp', family: 'esp', alt: 'Destiny 2 ESP player name tags' },
	{ src: '/images/destiny-2-esp-radar.webp', family: 'radar', alt: 'Destiny 2 ESP with radar corner overlay' },
	{ src: '/images/destiny-2-cheats-crucible.webp', family: 'aimbot', alt: 'Destiny 2 aimbot overlay in Crucible' },
	{ src: '/images/destiny-2-cheats-aimbot.webp', family: 'aimbot', alt: 'Destiny 2 aimbot reticle tuning' },
	{ src: '/images/destiny-2-cheats-aimbot-view.webp', family: 'aimbot', alt: 'Destiny 2 aimbot FOV and bone view' },
	{ src: '/images/destiny-2-cheats-aimbot-esp.webp', family: 'aimbot', alt: 'Destiny 2 combined aimbot and ESP HUD' },
	{ src: '/images/destiny-2-aimbot-skeleton.webp', family: 'aimbot', alt: 'Destiny 2 aimbot skeleton priority view' },
	{ src: '/images/destiny-2-aimbot-sniper.webp', family: 'aimbot', alt: 'Destiny 2 sniper aimbot profile' },
	{ src: '/images/destiny-2-cheats-combat.webp', family: 'aimbot', alt: 'Destiny 2 combat aim assist overlay' },
	{ src: '/images/destiny-2-cheats-wallhack-skeleton.webp', family: 'wallhack', alt: 'Destiny 2 wallhack skeleton ESP' },
	{ src: '/images/destiny-2-cheats-wallhack.webp', family: 'wallhack', alt: 'Destiny 2 wallhack outline ESP' },
	{ src: '/images/destiny-2-wallhack-skeleton.webp', family: 'wallhack', alt: 'Destiny 2 wallhack bone ESP' },
	{ src: '/images/destiny-2-cheats-pve.webp', family: 'pve', alt: 'Destiny 2 PvE raid ESP overlay' },
	{ src: '/images/destiny-2-cheats-raid.webp', family: 'pve', alt: 'Destiny 2 raid encounter cheat HUD' },
	{ src: '/images/destiny-2-cheats-radar.webp', family: 'radar', alt: 'Destiny 2 2D radar threat map' },
	{ src: '/images/reviews-banner.webp', family: 'misc', alt: 'Destiny 2 cheats buyer reviews collage' },
];

const poolBySrc = new Map(screenshotPool.map((item) => [item.src, item]));

export function imageFamily(src: string): ImageFamily {
	return poolBySrc.get(src)?.family ?? 'misc';
}

export function poolAlt(src: string, fallback: string): string {
	return poolBySrc.get(src)?.alt ?? fallback;
}
