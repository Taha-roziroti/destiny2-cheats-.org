import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const imagesDir = path.join(publicDir, 'images');
const sourcePath =
	process.argv[2] ?? path.join(root, 'assets/destiny-tricorn-favicon.png');

/** Brand canvas — matches theme-color / manifest. */
const BG = { r: 13, g: 10, b: 20, alpha: 1 };

/** Lightweight vector favicon (no embedded raster — reliable in browser tabs). */
const TRICORN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Destiny tricorn">
  <rect width="32" height="32" fill="#0d0a14"/>
  <g fill="none" stroke="#f5f3ff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 6.5c-2.8 3.2-5.2 6.8-6.8 11.2 2.4 1.2 5 1.8 7.8 1.8s5.4-.6 7.8-1.8C23.2 13.3 20.8 9.7 18 6.5"/>
    <path d="M16 6.5v19.5"/>
    <ellipse cx="16" cy="9.2" rx="1.35" ry="2.6"/>
  </g>
</svg>
`;

async function tricornMarkBuffer(size) {
	const markSize = Math.round(size * 0.7);
	const mark = await sharp(sourcePath)
		.resize(markSize, markSize, {
			fit: 'contain',
			background: { r: 255, g: 255, b: 255, alpha: 1 },
		})
		.negate({ alpha: false })
		.png()
		.toBuffer();

	let pipeline = sharp({
		create: {
			width: size,
			height: size,
			channels: 4,
			background: BG,
		},
	}).composite([{ input: mark, gravity: 'centre' }]);

	if (size <= 32) {
		pipeline = pipeline.sharpen({ sigma: 0.6 });
	}

	return pipeline.png().toBuffer();
}

async function generateSiteLogo() {
	const logoPng = await tricornMarkBuffer(512);
	await writeFile(path.join(imagesDir, 'destiny-2-cheats-logo.png'), logoPng);
	console.log('Wrote public/images/destiny-2-cheats-logo.png (512×512)');

	const logoWebp = await sharp(logoPng).webp({ quality: 90, effort: 6 }).toBuffer();
	await writeFile(path.join(imagesDir, 'destiny-2-cheats-logo.webp'), logoWebp);
	console.log('Wrote public/images/destiny-2-cheats-logo.webp');
	return logoPng;
}

async function generateFavicons() {
	const sizes = [
		{ name: 'favicon-16x16.png', size: 16 },
		{ name: 'favicon-32x32.png', size: 32 },
		{ name: 'apple-touch-icon.png', size: 180 },
		{ name: 'favicon.png', size: 192 },
	];

	for (const { name, size } of sizes) {
		const buf = await tricornMarkBuffer(size);
		await writeFile(path.join(publicDir, name), buf);
		console.log(`Wrote public/${name}`);
	}

	const ico = await tricornMarkBuffer(32);
	await writeFile(path.join(publicDir, 'favicon.ico'), ico);
	console.log('Wrote public/favicon.ico');

	await writeFile(path.join(publicDir, 'favicon.svg'), TRICORN_SVG);
	console.log('Wrote public/favicon.svg (vector)');
}

async function generateWebManifest() {
	const manifest = {
		name: 'Destiny 2 Cheats',
		short_name: 'D2 Cheats',
		description: 'Undetected Destiny 2 cheats — ESP, aimbot, radar for Windows PC',
		start_url: '/',
		display: 'standalone',
		background_color: '#0d0a14',
		theme_color: '#0d0a14',
		icons: [
			{ src: '/favicon.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
			{ src: '/favicon.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
			{ src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
	};
	await writeFile(path.join(publicDir, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);
	console.log('Wrote public/site.webmanifest');
}

await mkdir(imagesDir, { recursive: true });
await generateSiteLogo();
await generateFavicons();
await generateWebManifest();
