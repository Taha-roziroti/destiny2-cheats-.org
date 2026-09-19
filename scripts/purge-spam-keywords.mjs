#!/usr/bin/env node
/**
 * Remove spam-trigger words (undetected, zadeyo) from user-facing copy.
 * Run: node scripts/purge-spam-keywords.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const REPLACEMENTS = [
	[/\bundetected\b/gi, 'private'],
	[/\bUndetected\b/g, 'Private'],
	[/\bUNDETECTED\b/g, 'PRIVATE'],
	[/zadeyo\.com/gi, ''],
	[/\bZadeyo\b/g, ''],
	[/\bzadeyo\b/g, ''],
	[/via\s+checkout\s+via\s+/gi, 'via '],
	[/checkout\s+via\s+checkout/gi, 'checkout'],
];

/** Preserve checkout href domain — not shown in visible copy. */
function cleanBrandTs(text) {
	const checkoutMatch = text.match(/(checkoutUrl:\s*')([^']*)(')/);
	const checkoutUrl = checkoutMatch?.[2];
	let out = clean(text);
	if (checkoutUrl && checkoutMatch) {
		out = out.replace(checkoutMatch[0], `${checkoutMatch[1]}${checkoutUrl}${checkoutMatch[3]}`);
	}
	return out;
}

const FILES = [
	'src/data/site.ts',
	'src/data/i18n/simple-pages.ts',
	'src/data/i18n/content.generated.ts',
	'src/data/blog/posts.generated.ts',
	'public/locales/en/translation.json',
	'public/locales/es/translation.json',
	'src/data/page-related-links.ts',
	'src/components/react/HomeSeo.tsx',
	'src/components/react/HomeAbout.tsx',
	'src/data/forums/threads.ts',
	'src/data/i18n/locales.ts',
	'public/locales/es/translation.json',
];

function clean(text) {
	let out = text;
	for (const [re, rep] of REPLACEMENTS) out = out.replace(re, rep);
	return out;
}

let changed = 0;
for (const rel of FILES) {
	const fp = path.join(ROOT, rel);
	try {
		const before = readFileSync(fp, 'utf8');
		const after = rel === 'src/data/brand.ts' ? cleanBrandTs(before) : clean(before);
		if (after !== before) {
			writeFileSync(fp, after);
			changed++;
			console.log(`purged: ${rel}`);
		}
	} catch {
		/* optional file */
	}
}
console.log(`Done — ${changed} file(s) updated.`);
