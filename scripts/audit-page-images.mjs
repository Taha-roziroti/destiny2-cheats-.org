#!/usr/bin/env node
/**
 * Audits built HTML for duplicate images per page and adjacent similar families in galleries.
 * Run after build: node scripts/audit-page-images.mjs
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { familiesTooSimilar } from './image-family.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

async function walkHtml(dir, rel = '') {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const e of entries) {
		const r = rel ? `${rel}/${e.name}` : e.name;
		if (e.isDirectory()) files.push(...(await walkHtml(path.join(dir, e.name), r)));
		else if (e.name.endsWith('.html')) files.push({ abs: path.join(dir, e.name), rel: r });
	}
	return files;
}

function extractMainImages(html) {
	const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? html;
	const srcs = [];
	for (const m of main.matchAll(/\bsrc\s*=\s*(["'])(\/images\/[^"']+)\1/gi)) {
		srcs.push(m[2].split('?')[0]);
	}
	return srcs;
}

async function main() {
	const files = await walkHtml(DIST);
	const issues = [];

	for (const { abs, rel } of files) {
		const html = await readFile(abs, 'utf8');
		const srcs = extractMainImages(html);
		if (srcs.length === 0) continue;

		const counts = new Map();
		for (const s of srcs) counts.set(s, (counts.get(s) ?? 0) + 1);
		const dupes = [...counts.entries()].filter(([, c]) => c > 1);
		if (dupes.length) {
			issues.push({ rel, type: 'duplicate-src', dupes });
		}

		// Gallery block: exactly 2 tiles, no adjacent same family
		const galleryIdx = html.indexOf('id="page-gallery-title"');
		const galleryBlock =
			galleryIdx >= 0 ? html.slice(galleryIdx, galleryIdx + 5000).match(/[\s\S]*?<\/section>/i)?.[0] ?? '' : '';
		if (galleryBlock) {
			const gallerySrcs = [];
			for (const m of galleryBlock.matchAll(/\bsrc\s*=\s*(["'])(\/images\/[^"']+)\1/gi)) {
				gallerySrcs.push(m[2]);
			}
			if (gallerySrcs.length !== 2) {
				issues.push({ rel, type: 'gallery-count', count: gallerySrcs.length });
			}
			for (let i = 1; i < gallerySrcs.length; i += 1) {
				if (familiesTooSimilar(gallerySrcs[i - 1], gallerySrcs[i])) {
					issues.push({
						rel,
						type: 'adjacent-similar',
						pair: [gallerySrcs[i - 1], gallerySrcs[i]],
					});
				}
			}
			// Product pages: gallery is the only screenshots (no third hero photo)
			if (html.includes('hero__media') && gallerySrcs.length > 0) {
				issues.push({ rel, type: 'hero-plus-gallery', note: 'expected text banner when gallery is present' });
			}
		}
	}

	if (issues.length === 0) {
		console.log(`audit-page-images: OK (${files.length} HTML files).`);
		process.exit(0);
	}

	console.log(`audit-page-images: ${issues.length} issue(s)\n`);
	for (const item of issues.slice(0, 40)) {
		console.log(item.rel, item.type, item.dupes ?? item.pair);
	}
	if (issues.length > 40) console.log(`… and ${issues.length - 40} more`);
	process.exit(1);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
