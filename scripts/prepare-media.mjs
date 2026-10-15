#!/usr/bin/env node
/**
 * Normalize gameplay sources in assets/gameplay/ → public/images + public/media.
 * Optional: drop images_1.png … images_11.png before running.
 */
import { access, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GAMEPLAY = path.join(ROOT, 'assets/gameplay');
const IMAGES = path.join(ROOT, 'public/images');
const MEDIA = path.join(ROOT, 'public/media');

const THEME_BG = { r: 12, g: 10, b: 18, alpha: 1 };

async function hasDir(dir) {
	try {
		await access(dir);
		return true;
	} catch {
		return false;
	}
}

async function fromGameplay() {
	if (!(await hasDir(GAMEPLAY))) {
		console.log('No assets/gameplay/ — skipping gameplay import.');
		return false;
	}

	const files = (await readdir(GAMEPLAY))
		.filter((f) => /^images_\d+\.png$/i.test(f))
		.sort((a, b) => {
			const na = Number(a.match(/\d+/)?.[0] ?? 0);
			const nb = Number(b.match(/\d+/)?.[0] ?? 0);
			return na - nb;
		});

	if (files.length === 0) {
		console.log('No images_N.png in assets/gameplay/.');
		return false;
	}

	await mkdir(IMAGES, { recursive: true });
	await mkdir(MEDIA, { recursive: true });

	const targets = [
		'destiny-2-cheats-esp-crucible.webp',
		'destiny-2-cheats-wallhack-skeleton.webp',
		'destiny-2-cheats-crucible.webp',
		'destiny-2-cheats-aimbot-esp.webp',
		'destiny-2-cheats-pve.webp',
		'destiny-2-cheats-radar.webp',
	];

	for (let i = 0; i < Math.min(files.length, targets.length); i++) {
		const input = path.join(GAMEPLAY, files[i]);
		const out = path.join(IMAGES, targets[i]);
		await sharp(input)
			.resize({ width: 1920, withoutEnlargement: true })
			.webp({ quality: 82, effort: 6 })
			.toFile(out);
		console.log(`Wrote ${out}`);
	}

	for (let i = 0; i < Math.min(files.length, 9); i++) {
		const input = path.join(GAMEPLAY, files[i]);
		const out = path.join(MEDIA, `d2-screenshot-${i + 1}.webp`);
		await sharp(input)
			.resize({ width: 1600, withoutEnlargement: true })
			.webp({ quality: 82, effort: 6 })
			.toFile(out);
		console.log(`Wrote ${out}`);
	}

	if (files[0]) {
		const hero = path.join(IMAGES, 'destiny-2-hero-poster.webp');
		await sharp(path.join(GAMEPLAY, files[0]))
			.resize(1920, 1080, { fit: 'cover', background: THEME_BG })
			.webp({ quality: 85, effort: 6 })
			.toFile(hero);
		console.log(`Wrote ${hero}`);
	}

	return true;
}

await fromGameplay();

const hero480 = path.join(IMAGES, 'destiny-2-hero-poster-480w.webp');
try {
	await access(hero480);
	const mobile = path.join(IMAGES, 'destiny-2-hero-poster-mobile.webp');
	await sharp(hero480)
		.resize(360, null, { withoutEnlargement: true })
		.webp({ quality: 52, effort: 6 })
		.toFile(mobile);
	console.log(`Wrote ${mobile}`);
} catch {
	// optional — run optimize/upscale hero variants first
}

console.log('prepare:media done. Run npm run generate:seo-assets next.');
