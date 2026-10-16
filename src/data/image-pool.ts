/**
 * Visual families — avoid placing same-family shots next to each other in a gallery.
 * Paths are base /images/*.webp assets (no width suffix).
 * Pool is Destiny 2 gameplay / cheat overlays only — no template leftovers from other games.
 */
export type ImageFamily =
	| 'hero'
	| 'esp'
	| 'aimbot'
	| 'wallhack'
	| 'radar'
	| 'pve';

export type PoolImage = {
	src: string;
	family: ImageFamily;
	alt: string;
};

/** Verified Destiny 2 screenshots only (cheat overlays + authentic D2 HUD). */
export const screenshotPool: PoolImage[] = [
	{
		src: '/images/destiny-2-hero-poster.webp',
		family: 'hero',
		alt: 'Destiny 2 Arcstrider Guardian — Destiny 2 Cheats hero',
	},
	{
		src: '/images/destiny-2-cheats-esp-crucible.webp',
		family: 'esp',
		alt: 'Destiny 2 ESP player boxes through cover in Crucible',
	},
	{
		src: '/images/destiny-2-cheats-esp.webp',
		family: 'esp',
		alt: 'Destiny 2 ESP wallhack through a sniper scope',
	},
	{
		src: '/images/destiny-2-cheats-aimbot.webp',
		family: 'aimbot',
		alt: 'Destiny 2 aimbot FOV circle and soft aim in Crucible',
	},
	{
		src: '/images/destiny-2-cheats-crucible.webp',
		family: 'aimbot',
		alt: 'Destiny 2 aimbot overlay during a Crucible fight',
	},
	{
		src: '/images/destiny-2-cheats-aimbot-esp.webp',
		family: 'aimbot',
		alt: 'Destiny 2 combined aimbot and ESP HUD',
	},
	{
		src: '/images/destiny-2-cheats-wallhack-skeleton.webp',
		family: 'wallhack',
		alt: 'Destiny 2 wallhack skeleton ESP through geometry',
	},
	{
		src: '/images/destiny-2-cheats-radar.webp',
		family: 'radar',
		alt: 'Destiny 2 radar and aim assist overlay in Crucible',
	},
	{
		src: '/images/destiny-2-cheats-pve.webp',
		family: 'pve',
		alt: 'Destiny 2 PvE raid cheat HUD against Crota',
	},
];

const poolBySrc = new Map(screenshotPool.map((item) => [item.src, item]));

export function imageFamily(src: string): ImageFamily {
	return poolBySrc.get(src)?.family ?? 'hero';
}

export function poolAlt(src: string, fallback: string): string {
	return poolBySrc.get(src)?.alt ?? fallback;
}
