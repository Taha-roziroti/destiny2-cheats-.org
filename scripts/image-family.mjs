/**
 * Visual families for image audits — keep aligned with src/data/image-pool.ts
 */
const FAMILY_BY_SRC = new Map(
	Object.entries({
		'/images/destiny-2-hero-poster.webp': 'hero',
		'/images/destiny-2-cheats-esp-crucible.webp': 'esp',
		'/images/destiny-2-cheats-esp.webp': 'esp',
		'/images/destiny-2-cheats-crucible.webp': 'aimbot',
		'/images/destiny-2-cheats-aimbot.webp': 'aimbot',
		'/images/destiny-2-cheats-aimbot-esp.webp': 'aimbot',
		'/images/destiny-2-cheats-wallhack-skeleton.webp': 'wallhack',
		'/images/destiny-2-cheats-radar.webp': 'radar',
		'/images/destiny-2-cheats-pve.webp': 'pve',
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
