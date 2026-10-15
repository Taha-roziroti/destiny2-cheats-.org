#!/usr/bin/env node
/** One-off: build destiny-2-hero-poster* from a source JPG. */
import { statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2] ?? path.join(ROOT, 'assets/gameplay/hero-arc-staff.jpg');
const images = path.join(ROOT, 'public/images');
const ratio = 3.15;
const position = 'right';
const widths = [480, 640, 720, 960, 1024, 1280, 1536, 1920];

const meta = await sharp(input).metadata();
const masterW = Math.min(meta.width ?? 1920, 3840);
const masterH = Math.round(masterW / ratio);

await sharp(input)
	.resize(masterW, masterH, { fit: 'cover', position })
	.webp({ quality: 85, effort: 6 })
	.toFile(path.join(images, 'destiny-2-hero-poster.webp'));

for (const w of widths) {
	const h = Math.round(w / ratio);
	const out = path.join(images, `destiny-2-hero-poster-${w}w.webp`);
	await sharp(input)
		.resize(w, h, { fit: 'cover', position })
		.webp({ quality: w <= 640 ? 86 : w <= 1024 ? 88 : 90, effort: 6, smartSubsample: false })
		.toFile(out);
	console.log(`Wrote ${path.basename(out)} (${statSync(out).size} bytes)`);
}

await sharp(input)
	.resize(640, Math.round(640 / ratio), { fit: 'cover', position, kernel: sharp.kernel.lanczos3 })
	.webp({ quality: 86, effort: 6, smartSubsample: false })
	.toFile(path.join(images, 'destiny-2-hero-poster-mobile.webp'));

await sharp(input)
	.resize(1920, null, { withoutEnlargement: true })
	.png()
	.toFile(path.join(images, 'destiny-2-hero-source.png'));

console.log(`Hero poster set from ${input}`);
