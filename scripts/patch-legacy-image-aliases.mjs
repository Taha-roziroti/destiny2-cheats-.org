/**
 * Overwrite leftover non-Destiny-2 template files with real D2 screenshots.
 * Keeps old cached HTML / bookmarks from showing broken or wrong-game tiles.
 */
import { copyFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const images = path.join(root, 'public/images');

/** legacy basename (without .webp) → good Destiny 2 source basename */
const aliases = {
	'destiny-2-aimbot-skeleton': 'destiny-2-cheats-aimbot-esp',
	'destiny-2-aimbot-sniper': 'destiny-2-cheats-aimbot',
	'destiny-2-esp-player-tags': 'destiny-2-cheats-esp-crucible',
	'destiny-2-esp-radar': 'destiny-2-cheats-radar',
	'destiny-2-wallhack-skeleton': 'destiny-2-cheats-wallhack-skeleton',
	'destiny-2-cheats-wallhack': 'destiny-2-cheats-wallhack-skeleton',
	'destiny-2-cheats-raid': 'destiny-2-cheats-pve',
	'destiny-2-cheats-hero': 'destiny-2-cheats-pve',
	'destiny-2-cheats-aimbot-view': 'destiny-2-cheats-aimbot',
	'destiny-2-cheats-combat': 'destiny-2-cheats-crucible',
	'destiny-2-hero-banner': 'destiny-2-hero-poster',
	'destiny-2-hero-ghost': 'destiny-2-hero-poster',
	'hero-banner': 'destiny-2-hero-poster',
	'reviews-banner': 'destiny-2-cheats-aimbot',
};

const suffixes = ['', '-480w', '-960w'];

async function exists(file) {
	try {
		await access(file);
		return true;
	} catch {
		return false;
	}
}

for (const [legacy, good] of Object.entries(aliases)) {
	for (const suffix of suffixes) {
		const src = path.join(images, `${good}${suffix}.webp`);
		const dest = path.join(images, `${legacy}${suffix}.webp`);
		if (!(await exists(src))) {
			console.warn('skip missing source', path.basename(src));
			continue;
		}
		await copyFile(src, dest);
		console.log('aliased', path.basename(dest), '←', path.basename(src));
	}
}

console.log('patch-legacy-image-aliases: done');
