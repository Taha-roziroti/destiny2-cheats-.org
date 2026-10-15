/**
 * Visual families for image audits — keep aligned with src/data/image-pool.ts
 */
const FAMILY_BY_SRC = new Map(
	Object.entries({
		'/images/destiny-2-hero-poster.webp': 'hero',
		'/images/destiny-2-hero-ghost.webp': 'hero',
		'/images/destiny-2-hero-banner.webp': 'hero',
		'/images/destiny-2-cheats-hero.webp': 'hero',
		'/images/destiny-2-cheats-esp-crucible.webp': 'esp',
		'/images/destiny-2-cheats-esp.webp': 'esp',
		'/images/destiny-2-esp-player-tags.webp': 'esp',
		'/images/destiny-2-esp-radar.webp': 'radar',
		'/images/destiny-2-cheats-crucible.webp': 'aimbot',
		'/images/destiny-2-cheats-aimbot.webp': 'aimbot',
		'/images/destiny-2-cheats-aimbot-view.webp': 'aimbot',
		'/images/destiny-2-cheats-aimbot-esp.webp': 'aimbot',
		'/images/destiny-2-aimbot-skeleton.webp': 'aimbot',
		'/images/destiny-2-aimbot-sniper.webp': 'aimbot',
		'/images/destiny-2-cheats-combat.webp': 'aimbot',
		'/images/destiny-2-cheats-wallhack-skeleton.webp': 'wallhack',
		'/images/destiny-2-cheats-wallhack.webp': 'wallhack',
		'/images/destiny-2-wallhack-skeleton.webp': 'wallhack',
		'/images/destiny-2-cheats-pve.webp': 'pve',
		'/images/destiny-2-cheats-raid.webp': 'pve',
		'/images/destiny-2-cheats-radar.webp': 'radar',
		'/images/reviews-banner.webp': 'misc',
		'/images/hero-banner.webp': 'hero',
	}),
);

/** @param {string} src */
export function imageFamily(src) {
	const base = src.split('?')[0];
	return FAMILY_BY_SRC.get(base) ?? 'other';
}

/** @param {string} a @param {string} b */
export function familiesTooSimilar(a, b) {
	return imageFamily(a) === imageFamily(b);
}
