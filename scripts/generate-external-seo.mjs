#!/usr/bin/env node
/**
 * Writes off-site discovery files from brand + seo-external (llms.txt, security.txt).
 * Run via npm run sync:brand
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readBrandBasics() {
	const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const pick = (key) => {
		const m = src.match(new RegExp(`${key}:\\s*'([^']*)'`));
		if (!m) throw new Error(`brand.ts missing ${key}`);
		return m[1];
	};
	return {
		name: pick('name'),
		game: pick('game'),
		url: pick('url').replace(/\/$/, ''),
		supportEmail: pick('supportEmail'),
	};
}

/** Dynamic import of TS would need bundler — mirror buildLlmsTxt paths here. */
function buildLlmsTxt(brand) {
	const paths = [
		'/',
		'/d2-cheats/',
		'/destiny-2-esp/',
		'/destiny-2-aimbot/',
		'/features/',
		'/destiny-2-cheats-price/',
		'/destiny-2-cheats-setup/',
		'/status/',
		'/faq/',
		'/reviews/',
		'/forums/',
		'/destiny-2-cheats-review/',
		'/cloud-dma/',
		'/hwid-spoofer/',
	];
	const lines = [
		`# ${brand.name}`,
		`> ${brand.game} cheat software for Windows PC — features, pricing, setup, and support.`,
		'',
		'## Canonical site',
		brand.url,
		'',
		'## Primary pages',
		...paths.map((p) => `- ${brand.url}${p}`),
		'',
		'## Sitemap',
		`${brand.url}/sitemap.xml`,
		'',
		'## Contact',
		`mailto:${brand.supportEmail}`,
		'',
	];
	return lines.join('\n');
}

function buildSecurityTxt(brand) {
	return [
		`Contact: mailto:${brand.supportEmail}`,
		'Preferred-Languages: en',
		`Canonical: ${brand.url}/.well-known/security.txt`,
		`Policy: ${brand.url}/privacy/`,
	].join('\n');
}

const brand = readBrandBasics();
const llms = buildLlmsTxt(brand);
const security = buildSecurityTxt(brand);

writeFileSync(path.join(ROOT, 'public/llms.txt'), llms, 'utf8');
writeFileSync(path.join(ROOT, 'public/security.txt'), security, 'utf8');

const wellKnown = path.join(ROOT, 'public/.well-known');
mkdirSync(wellKnown, { recursive: true });
writeFileSync(path.join(wellKnown, 'security.txt'), security, 'utf8');

console.log('generate-external-seo: wrote public/llms.txt, security.txt, .well-known/security.txt');
