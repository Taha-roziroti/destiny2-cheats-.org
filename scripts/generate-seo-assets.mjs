#!/usr/bin/env node
/**
 * Build 1200×630 JPEG Open Graph images under public/og/.
 * Run after prepare:media or when public/images screenshots exist.
 */
import { access, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OG_DIR = path.join(ROOT, 'public/og');
const IMAGES_DIR = path.join(ROOT, 'public/images');
const W = 1200;
const H = 630;
const BG = { r: 13, g: 10, b: 20, alpha: 1 };

const OG_MAP = [
	{ name: 'home.jpg', prefer: ['destiny-2-hero-poster.webp', 'destiny-2-cheats-esp-crucible.webp'] },
	{ name: 'product.jpg', prefer: ['destiny-2-cheats-esp-crucible.webp'] },
	{ name: 'features.jpg', prefer: ['destiny-2-cheats-wallhack-skeleton.webp'] },
	{ name: 'pricing.jpg', prefer: ['destiny-2-cheats-pve.webp'] },
	{ name: 'reviews.jpg', prefer: ['destiny-2-cheats-crucible.webp'] },
	{ name: 'faq.jpg', prefer: ['destiny-2-cheats-radar.webp'] },
	{ name: 'forums.jpg', prefer: ['destiny-2-cheats-aimbot-esp.webp'] },
];

async function exists(filePath) {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function pickSource(prefer) {
	for (const file of prefer) {
		const full = path.join(IMAGES_DIR, file);
		if (await exists(full)) return full;
	}
	const entries = await readdir(IMAGES_DIR).catch(() => []);
	const webp = entries.find((f) => f.endsWith('.webp'));
	if (webp) return path.join(IMAGES_DIR, webp);
	return null;
}

async function renderOg(outName, sourcePath) {
	const outPath = path.join(OG_DIR, outName);
	if (!sourcePath) {
		await sharp({
			create: { width: W, height: H, channels: 3, background: BG },
		})
			.jpeg({ quality: 88, mozjpeg: true })
			.toFile(outPath);
		console.warn(`Wrote placeholder ${outPath} (no screenshot source)`);
		return;
	}

	await sharp(sourcePath)
		.resize(W, H, { fit: 'cover', position: 'centre' })
		.jpeg({ quality: 88, mozjpeg: true })
		.toFile(outPath);
	console.log(`Wrote ${outPath}`);
}

await mkdir(OG_DIR, { recursive: true });
await mkdir(IMAGES_DIR, { recursive: true });

for (const { name, prefer } of OG_MAP) {
	const source = await pickSource(prefer);
	await renderOg(name, source);
}
