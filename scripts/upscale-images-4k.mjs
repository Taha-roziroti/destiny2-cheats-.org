#!/usr/bin/env node
/**
 * AI upscale site images to 4K (max width 3840) using RealSR ncnn Vulkan (CVPR NTIRE winner).
 * Free, open-source, runs locally — no paid API. First run downloads the Windows binary + models (~64 MB).
 *
 * Usage: node scripts/upscale-images-4k.mjs [--dry-run] [--force]
 */
import { spawn } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import {
	access,
	mkdir,
	readdir,
	rm,
	unlink,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES_DIR = path.join(ROOT, 'public/images');
const TOOLS_ROOT = path.join(ROOT, 'tools');
const REALSR_ZIP = path.join(TOOLS_ROOT, 'realsr-ncnn-vulkan-windows.zip');
const REALSR_DIR = path.join(TOOLS_ROOT, 'realsr-ncnn-extract/realsr-ncnn-vulkan-20220728-windows');
const TMP_DIR = path.join(ROOT, '.tmp-upscale');

const TARGET_WIDTH = 3840;
const REALSR_RELEASE =
	'https://github.com/nihui/realsr-ncnn-vulkan/releases/download/20220728/realsr-ncnn-vulkan-20220728-windows.zip';

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const FORCE = args.has('--force');

const SKIP_NAME = [
	/-\d+w\.webp$/i,
	/^favicon/i,
	/^apple-touch-icon/i,
	/^zadeyo-logo/i,
	/^destiny-2-cheats-logo/i,
];

async function exists(p) {
	try {
		await access(p);
		return true;
	} catch {
		return false;
	}
}

function realsrExe() {
	return path.join(REALSR_DIR, 'realsr-ncnn-vulkan.exe');
}

function realsrModelDir() {
	return path.join(REALSR_DIR, 'models-DF2K_JPEG');
}

async function ensureRealSr() {
	const envBin = process.env.REALSR_BIN?.trim();
	if (envBin && (await exists(envBin))) return { bin: envBin, model: process.env.REALSR_MODEL?.trim() || realsrModelDir() };

	if (!(await exists(realsrExe()))) {
		if (process.platform !== 'win32') {
			throw new Error('Auto-download supports Windows only. Set REALSR_BIN to your realsr-ncnn-vulkan binary.');
		}
		await mkdir(TOOLS_ROOT, { recursive: true });
		if (!(await exists(REALSR_ZIP))) {
			console.log('Downloading RealSR ncnn Vulkan + models (free, ~64 MB)...');
			const res = await fetch(REALSR_RELEASE);
			if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText}`);
			await pipeline(res.body, createWriteStream(REALSR_ZIP));
		}
		const { execFile } = await import('node:child_process');
		const { promisify } = await import('node:util');
		await promisify(execFile)(
			'powershell',
			[
				'-NoProfile',
				'-Command',
				`Expand-Archive -Path '${REALSR_ZIP.replace(/'/g, "''")}' -DestinationPath '${path.join(TOOLS_ROOT, 'realsr-ncnn-extract').replace(/'/g, "''")}' -Force`,
			],
			{ cwd: ROOT },
		);
	}

	if (!(await exists(realsrExe()))) {
		throw new Error('RealSR binary not found after extract. Check tools/realsr-ncnn-extract/');
	}
	console.log(`RealSR ready: ${realsrExe()}`);
	return { bin: realsrExe(), model: realsrModelDir() };
}

/** RealSR ncnn only supports 4×; we downscale with sharp when output exceeds TARGET_WIDTH. */
function pickScale(width) {
	if (width >= TARGET_WIDTH) return 0;
	return 4;
}

function runRealSr(bin, modelDir, inputPng, outputPng, scale) {
	return new Promise((resolve, reject) => {
		const child = spawn(
			bin,
			['-i', inputPng, '-o', outputPng, '-s', String(scale), '-m', modelDir],
			{ cwd: REALSR_DIR, windowsHide: true },
		);
		let err = '';
		child.stderr.on('data', (d) => {
			err += d.toString();
		});
		child.on('error', reject);
		child.on('close', (code) => {
			if (code === 0) resolve();
			else reject(new Error(`realsr exited ${code}: ${err.slice(-500)}`));
		});
	});
}

async function collectImageFiles() {
	const entries = await readdir(IMAGES_DIR, { withFileTypes: true });
	const out = [];
	for (const ent of entries) {
		if (!ent.isFile()) continue;
		const lower = ent.name.toLowerCase();
		if (!/\.(webp|png|jpe?g)$/i.test(lower)) continue;
		if (SKIP_NAME.some((re) => re.test(ent.name))) continue;
		out.push(path.join(IMAGES_DIR, ent.name));
	}
	return out.sort();
}

async function upscaleOne(engine, filePath) {
	const { bin, model } = engine;
	const meta = await sharp(filePath).metadata();
	const width = meta.width ?? 0;
	if (!width) return { filePath, status: 'skip', reason: 'no width' };
	if (!FORCE && width >= TARGET_WIDTH) {
		return { filePath, status: 'skip', reason: 'already >= 4K width' };
	}

	const scale = pickScale(width);
	if (scale === 0) {
		return { filePath, status: 'skip', reason: 'at target' };
	}

	if (DRY_RUN) {
		return { filePath, status: 'dry-run', scale, width };
	}

	await mkdir(TMP_DIR, { recursive: true });
	const base = path.basename(filePath, path.extname(filePath));
	const tmpIn = path.join(TMP_DIR, `${base}-in.png`);
	const tmpOut = path.join(TMP_DIR, `${base}-out.png`);

	await sharp(filePath).png().toFile(tmpIn);
	await runRealSr(bin, model, tmpIn, tmpOut, scale);

	const ext = path.extname(filePath).toLowerCase();
	const tmpFinal = path.join(TMP_DIR, `${base}-final${ext}`);
	const outPipe = sharp(tmpOut).resize({
		width: TARGET_WIDTH,
		withoutEnlargement: true,
	});

	if (ext === '.webp') {
		await outPipe.webp({ quality: 85, effort: 6 }).toFile(tmpFinal);
	} else if (ext === '.png') {
		await outPipe.png({ compressionLevel: 9 }).toFile(tmpFinal);
	} else {
		await outPipe.jpeg({ quality: 90, mozjpeg: true }).toFile(tmpFinal);
	}

	const { copyFile, unlink: unlinkFile } = await import('node:fs/promises');
	await unlinkFile(filePath).catch(() => {});
	await copyFile(tmpFinal, filePath);
	await unlinkFile(tmpFinal).catch(() => {});

	const after = await sharp(filePath).metadata();
	await unlink(tmpIn).catch(() => {});
	await unlink(tmpOut).catch(() => {});

	return {
		filePath,
		status: 'ok',
		scale,
		before: width,
		after: after.width,
	};
}

async function removeResponsiveVariants() {
	const files = await readdir(IMAGES_DIR);
	for (const file of files) {
		if (/-\d+w\.webp$/i.test(file)) {
			await unlink(path.join(IMAGES_DIR, file));
		}
	}
}

async function regenerateHeroPoster() {
	const source = path.join(IMAGES_DIR, 'destiny-2-cheats-crucible.webp');
	if (!(await exists(source))) return;

	const meta = await sharp(source).metadata();
	const posterW = Math.min(TARGET_WIDTH, meta.width ?? TARGET_WIDTH);
	const posterH = Math.round(posterW / 3.15);

	await sharp(source)
		.resize(posterW, posterH, { fit: 'cover', position: 'centre' })
		.webp({ quality: 85, effort: 6 })
		.toFile(path.join(IMAGES_DIR, 'destiny-2-hero-poster.webp'));

	const widths = [640, 1024, 1536, 1920, 2560, 3840];
	for (const w of widths) {
		if (meta.width && w > meta.width) continue;
		await sharp(source)
			.resize(w, Math.round(w / 3.15), { fit: 'cover', position: 'centre' })
			.webp({ quality: w >= 1920 ? 82 : 78, effort: 6 })
			.toFile(path.join(IMAGES_DIR, `destiny-2-hero-poster-${w}w.webp`));
	}
	console.log('Regenerated hero poster variants from upscaled crucible source.');
}

async function main() {
	const engine = await ensureRealSr();
	const files = await collectImageFiles();
	console.log(`Found ${files.length} master images to process (AI upscale, max width ${TARGET_WIDTH}).`);

	const results = [];
	let ok = 0;
	for (const file of files) {
		try {
			const r = await upscaleOne(engine, file);
			results.push(r);
			if (r.status === 'ok') ok++;
			const rel = path.relative(ROOT, file);
			if (r.status === 'ok') {
				console.log(`ok: ${rel} ${r.before}px → ${r.after}px (${r.scale}x)`);
			} else {
				console.log(`${r.status}: ${rel}${r.scale ? ` (${r.scale}x)` : ''}`);
			}
		} catch (err) {
			console.error(`FAIL ${file}:`, err.message);
			results.push({ filePath: file, status: 'error', error: err.message });
		}
	}

	if (!DRY_RUN && ok > 0) {
		await removeResponsiveVariants();
		await regenerateHeroPoster();
		const { execFile } = await import('node:child_process');
		const { promisify } = await import('node:util');
		await promisify(execFile)('node', ['scripts/optimize-responsive-images.mjs'], { cwd: ROOT });
		await promisify(execFile)('node', ['scripts/generate-seo-assets.mjs'], { cwd: ROOT });
		if (results.every((r) => r.status !== 'error')) {
			await rm(TMP_DIR, { recursive: true, force: true }).catch(() => {});
		} else {
			console.warn('Some files failed — left .tmp-upscale/ for inspection.');
		}
	} else if (!DRY_RUN && ok === 0) {
		console.error('No images were upscaled — skipping variant regeneration.');
		process.exit(1);
	}

	const skipped = results.filter((r) => r.status === 'skip').length;
	console.log(`\nDone: ${ok} upscaled, ${skipped} skipped, ${results.length} total.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
