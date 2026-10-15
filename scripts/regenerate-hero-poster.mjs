#!/usr/bin/env node
/**
 * AI-upscale hero source (RealSR ncnn, free/local) and rebuild poster WebP set.
 * Usage: node scripts/regenerate-hero-poster.mjs [source.jpg]
 */
import { spawn } from 'node:child_process';
import { access, mkdir, unlink } from 'node:fs/promises';
import { statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2] ?? path.join(ROOT, 'assets/gameplay/hero-arc-staff.jpg');
const images = path.join(ROOT, 'public/images');
const tmpDir = path.join(ROOT, '.tmp-hero-upscale');
const REALSR_DIR = path.join(ROOT, 'tools/realsr-ncnn-extract/realsr-ncnn-vulkan-20220728-windows');
const REALSR_BIN = path.join(REALSR_DIR, 'realsr-ncnn-vulkan.exe');
const REALSR_MODEL = path.join(REALSR_DIR, 'models-DF2K_JPEG');

const ratio = 3.15;
const position = 'right';
const widths = [480, 640, 720, 960, 1024, 1280, 1536, 1920];

async function exists(p) {
	try {
		await access(p);
		return true;
	} catch {
		return false;
	}
}

function runRealSr(inPng, outPng) {
	return new Promise((resolve, reject) => {
		const child = spawn(
			REALSR_BIN,
			['-i', inPng, '-o', outPng, '-s', '4', '-m', REALSR_MODEL],
			{ cwd: REALSR_DIR, windowsHide: true },
		);
		let err = '';
		child.stderr.on('data', (d) => {
			err += d.toString();
		});
		child.on('error', reject);
		child.on('close', (code) => {
			if (code === 0) resolve();
			else reject(new Error(`realsr exited ${code}: ${err.slice(-400)}`));
		});
	});
}

async function upscaleSource() {
	const meta = await sharp(input).metadata();
	const w = meta.width ?? 0;
	if (w >= 3000) {
		console.log(`Source already ${w}px wide — skipping RealSR`);
		return input;
	}
	if (!(await exists(REALSR_BIN))) {
		console.warn('RealSR not found — using Lanczos upscale (install via scripts/upscale-images-4k.mjs)');
		const fallback = path.join(tmpDir, 'hero-lanczos.png');
		await mkdir(tmpDir, { recursive: true });
		await sharp(input)
			.resize(w * 4, null, { kernel: sharp.kernel.lanczos3 })
			.png()
			.toFile(fallback);
		return fallback;
	}

	await mkdir(tmpDir, { recursive: true });
	const inPng = path.join(tmpDir, 'hero-in.png');
	const outPng = path.join(tmpDir, 'hero-4x.png');
	await sharp(input).png().toFile(inPng);
	console.log('RealSR 4× upscale (free local AI)...');
	await runRealSr(inPng, outPng);
	const outMeta = await sharp(outPng).metadata();
	console.log(`Upscaled to ${outMeta.width}×${outMeta.height}`);
	return outPng;
}

function webpQuality(width) {
	if (width <= 640) return 86;
	if (width <= 1024) return 88;
	return 90;
}

const masterPath = await upscaleSource();
const masterMeta = await sharp(masterPath).metadata();
const masterW = Math.min(masterMeta.width ?? 1920, 3840);
const masterH = Math.round(masterW / ratio);

const resizeOpts = { fit: 'cover', position, kernel: sharp.kernel.lanczos3 };

await sharp(masterPath)
	.resize(masterW, masterH, resizeOpts)
	.webp({ quality: 90, effort: 6, smartSubsample: false })
	.toFile(path.join(images, 'destiny-2-hero-poster.webp'));

for (const w of widths) {
	if (w > masterW) continue;
	const h = Math.round(w / ratio);
	const out = path.join(images, `destiny-2-hero-poster-${w}w.webp`);
	await sharp(masterPath)
		.resize(w, h, resizeOpts)
		.webp({ quality: webpQuality(w), effort: 6, smartSubsample: false })
		.toFile(out);
	console.log(`Wrote ${path.basename(out)} (${statSync(out).size} bytes, ${w}×${h})`);
}

await sharp(masterPath)
	.resize(640, Math.round(640 / ratio), resizeOpts)
	.webp({ quality: 86, effort: 6, smartSubsample: false })
	.toFile(path.join(images, 'destiny-2-hero-poster-mobile.webp'));

await sharp(masterPath)
	.resize(1920, null, { ...resizeOpts, fit: 'inside', withoutEnlargement: true })
	.png({ compressionLevel: 9 })
	.toFile(path.join(images, 'destiny-2-hero-source.png'));

console.log(`Hero poster set from ${input} (master ${masterW}px)`);
