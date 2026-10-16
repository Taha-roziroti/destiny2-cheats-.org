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

async function tricornMarkBuffer(size) {
	const base = await sharp(sourcePath)
		.resize(Math.round(size * 0.72), Math.round(size * 0.72), {
			fit: 'contain',
			background: { r: 255, g: 255, b: 255, alpha: 1 },
		})
		.negate({ alpha: false })
		.png()
		.toBuffer();

	return sharp({
		create: {
			width: size,
			height: size,
			channels: 4,
			background: BG,
		},
	})
		.composite([{ input: base, gravity: 'centre' }])
		.png()
		.toBuffer();
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

async function generateFavicons(logoBuffer) {
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

	await writeFile(path.join(publicDir, 'favicon.ico'), await tricornMarkBuffer(32));
	console.log('Wrote public/favicon.ico (32×32 PNG)');

	const svgBase64 = (await tricornMarkBuffer(512)).toString('base64');
	const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect width="512" height="512" fill="#0d0a14"/><image width="512" height="512" href="data:image/png;base64,${svgBase64}"/></svg>`;
	await writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg);
	console.log('Wrote public/favicon.svg (embedded PNG)');
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
const logoBuffer = await generateSiteLogo();
await generateFavicons(logoBuffer);
await generateWebManifest();
