#!/usr/bin/env node
/**
 * Post-build SEO super-booster checks (dist HTML + public assets).
 */
import { readFileSync } from 'node:fs';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readBrand() {
	const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const url = src.match(/url:\s*'([^']+)'/)?.[1]?.replace(/\/$/, '');
	const name = src.match(/name:\s*'([^']+)'/)?.[1];
	if (!url || !name) throw new Error('Could not parse brand url/name');
	return { url, name };
}

const { url: SITE_URL, name: SITE_NAME } = readBrand();
const ROBOTS_INDEX =
	'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

async function resolveDistRoot() {
	for (const dir of [path.join(ROOT, 'dist'), path.join(ROOT, 'dist/client')]) {
		try {
			await access(path.join(dir, 'index.html'));
			return dir;
		} catch {
			// try next
		}
	}
	throw new Error('Run astro build before verify-seo.mjs');
}

function strip(html) {
	return html.replace(/\s+/g, ' ').trim();
}

function countMatches(html, re) {
	return [...html.matchAll(re)].length;
}

async function loadHtml(dist, route) {
	const file = route === '/' ? 'index.html' : path.join(route.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
	return readFile(path.join(dist, file), 'utf8');
}

function assertPage(label, html, canonicalPath, errors) {
	const canonical = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
	const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
	const desc =
		html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ??
		html.match(/<meta content="([^"]*)" name="description"/i)?.[1] ??
		'';
	const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/i)?.[1] ?? '';
	const ogDesc = html.match(/<meta property="og:description" content="([^"]*)"/i)?.[1] ?? '';
	const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] ?? '';
	const canon = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] ?? '';

	if (canon !== canonical) {
		errors.push(`${label}: canonical expected ${canonical}, got ${canon}`);
	}
	if (!html.includes('hreflang="en"') || !html.includes('hreflang="x-default"')) {
		errors.push(`${label}: missing hreflang=en or x-default`);
	}
	if (robots !== ROBOTS_INDEX) {
		errors.push(`${label}: robots meta "${robots}" !== booster string`);
	}
	if (title !== ogTitle) {
		errors.push(`${label}: og:title does not match <title>`);
	}
	if (desc !== ogDesc) {
		errors.push(`${label}: og:description does not match meta description`);
	}
	if (!html.includes('rel="image_src"')) {
		errors.push(`${label}: missing rel=image_src`);
	}
	if (html.includes('name="keywords"')) {
		errors.push(`${label}: meta keywords present`);
	}
	if (/SearchAction/.test(html)) {
		errors.push(`${label}: SearchAction JSON-LD present`);
	}
	const h1 = countMatches(html, /<h1\b/gi);
	if (h1 !== 1) {
		errors.push(`${label}: expected 1 <h1>, found ${h1}`);
	}
	if (!html.includes(`${SITE_URL}/#organization`)) {
		errors.push(`${label}: missing Organization @id`);
	}

	// Seobility-style on-page checks (title, description, charset, images).
	if (title.length < 25 || title.length > 70) {
		errors.push(`${label}: title length ${title.length} (target ~50–60, hard cap 70)`);
	}
	if (desc.length < 110 || desc.length > 170) {
		errors.push(`${label}: meta description length ${desc.length} (target ~140–160)`);
	}
	const charsetIdx = html.slice(0, 1024).search(/charset\s*=/i);
	if (charsetIdx === -1) {
		errors.push(`${label}: charset not in first 1024 bytes`);
	}
	for (const m of html.matchAll(/<img\b([^>]*)>/gi)) {
		if (!/\balt\s*=/i.test(m[1])) {
			errors.push(`${label}: <img> missing alt attribute`);
			break;
		}
	}
}

async function main() {
	const dist = await resolveDistRoot();
	const errors = [];

	const pages = [
		['home', '/', '/'],
		['product', '/d2-cheats/', '/d2-cheats/'],
		['faq', '/faq/', '/faq/'],
		['reviews', '/reviews/', '/reviews/'],
		['forums', '/forums/', '/forums/'],
	];

	for (const [label, route, canonical] of pages) {
		const html = await loadHtml(dist, route);
		assertPage(label, html, canonical, errors);
	}

	const productHtml = await loadHtml(dist, '/d2-cheats/');
	if (!productHtml.includes(`${SITE_URL}/#product`)) {
		errors.push('product page (/d2-cheats/): missing shared Product @id');
	}

	const faqHtml = await loadHtml(dist, '/faq/');
	const faqPageCount = countMatches(faqHtml, /"@type":"FAQPage"/g);
	if (faqPageCount !== 1) {
		errors.push(`faq index: expected 1 FAQPage node, found ${faqPageCount}`);
	}

	const faqSlugHtml = await loadHtml(dist, '/faq/what-are-d2-cheats/');
	if (faqSlugHtml.includes('"@type":"FAQPage"')) {
		errors.push('faq slug: FAQPage should not appear on detail pages');
	}

	const reviewsHtml = await loadHtml(dist, '/reviews/');
	const reviewNodes = countMatches(reviewsHtml, /"@type":"Review"/g);
	if (reviewNodes < 8) {
		errors.push(`reviews index: expected ≥8 Review nodes, found ${reviewNodes}`);
	}
	if (!reviewsHtml.includes('"ratingValue":"4.6"')) {
		errors.push('reviews index: expected AggregateRating 4.6');
	}

	const ogHome = path.join(ROOT, 'public/og/home.jpg');
	try {
		await access(ogHome);
	} catch {
		errors.push('public/og/home.jpg missing — run npm run generate:seo-assets');
	}

	const boosterSrc = await readFile(path.join(ROOT, 'src/data/seo-booster.ts'), 'utf8');
	const aboutBlock = boosterSrc.match(
		/export const SITE_ABOUT = \{[\s\S]*?knowsAbout:\s*\[([\s\S]*?)\]\s*,?\s*\}/,
	)?.[1];
	const termCount = aboutBlock
		? aboutBlock
				.split('\n')
				.map((l) => l.trim())
				.filter((l) => l && l !== '[' && !l.startsWith('//')).length
		: 0;
	if (termCount !== 6) {
		errors.push(`SITE_ABOUT.knowsAbout must have 6 terms (found ${termCount})`);
	}

	if (!boosterSrc.includes('Destiny 2 only') && !boosterSrc.includes('brand.game')) {
		// SITE_PURPOSE uses brand.game — OK
	}

	const titles = new Set();
	const descriptions = new Set();
	for (const [, route] of pages) {
		const html = await loadHtml(dist, route);
		const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
		const desc = html.match(/<meta name="description" content="([^"]*)"/i)?.[1];
		if (title) {
			if (titles.has(title)) errors.push(`duplicate <title>: ${title}`);
			titles.add(title);
		}
		if (desc) {
			if (descriptions.has(desc)) errors.push(`duplicate meta description on ${route}`);
			descriptions.add(desc);
		}
	}

	const mediaSrc = await readFile(path.join(ROOT, 'src/data/media.ts'), 'utf8');
	const alts = [...mediaSrc.matchAll(/alt:\s*'([^']+)'/g)].map((m) => m[1]);
	if (new Set(alts).size !== alts.length) {
		errors.push('PRODUCT_PREVIEW_GALLERY alts must be unique');
	}

	const llmsPath = path.join(ROOT, 'public/llms.txt');
	try {
		await access(llmsPath);
		const llms = await readFile(llmsPath, 'utf8');
		if (!llms.includes(SITE_URL)) {
			errors.push('public/llms.txt must include canonical SITE_URL — run npm run sync:brand');
		}
	} catch {
		errors.push('public/llms.txt missing — run npm run sync:brand');
	}

	try {
		await access(path.join(ROOT, 'public/.well-known/security.txt'));
	} catch {
		errors.push('public/.well-known/security.txt missing — run npm run sync:brand');
	}

	const homeHtml = await loadHtml(dist, '/');
	if (!homeHtml.includes('og:image:width" content="1200"')) {
		errors.push('home: booster OG width 1200 missing (use /og/home.jpg for social preview)');
	}
	if (!homeHtml.includes('rel="help" href="/llms.txt"')) {
		errors.push('home: missing link rel=help → /llms.txt');
	}
	if (!homeHtml.includes('bungie.net') || !homeHtml.includes('noopener noreferrer')) {
		errors.push('home: footer should link to bungie.net with rel=noopener noreferrer');
	}
	if (!homeHtml.includes('battleye.com')) {
		errors.push('home: footer should include BattlEye authoritative outbound link');
	}

	const externalLinkIssues = await auditExternalAnchors(dist);
	if (externalLinkIssues > 0) {
		errors.push(`external links: ${externalLinkIssues} target=_blank anchor(s) missing noopener`);
	}

	if (errors.length) {
		console.error('verify-seo failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
		process.exit(1);
	}

	console.log(`verify-seo: ${SITE_NAME} (${SITE_URL}) passed super-booster checks.`);
}

async function auditExternalAnchors(dist) {
	const { readdir } = await import('node:fs/promises');
	let issues = 0;
	async function walk(dir) {
		const entries = await readdir(dir, { withFileTypes: true });
		for (const e of entries) {
			const full = path.join(dir, e.name);
			if (e.isDirectory()) await walk(full);
			else if (e.name.endsWith('.html')) {
				const html = await readFile(full, 'utf8');
				for (const m of html.matchAll(/<a\b([^>]*)>/gi)) {
					const attrs = m[1];
					if (!/\btarget\s*=\s*["']_blank["']/i.test(attrs)) continue;
					if (!/\brel\s*=\s*["'][^"']*noopener/i.test(attrs)) issues += 1;
				}
			}
		}
	}
	await walk(dist);
	return issues;
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
