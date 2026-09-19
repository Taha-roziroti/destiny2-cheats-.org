#!/usr/bin/env node
/**
 * Remove spam-trigger words (undetected, zadeyo, indetectable) from user-facing copy.
 * Strips words rather than substituting synonyms that read unnaturally.
 * Run: node scripts/purge-spam-keywords.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

/** Strip spam tokens — empty string removes the word. */
const STRIP_PATTERNS = [
	/\bundetected\b/gi,
	/\bindetectables?\b/gi,
	/\bindétectables?\b/gi,
	/\bindetectáveis?\b/gi,
	/\bindetectável\b/gi,
	/\bindetectable\b/gi,
	/\bnedecektiruemye\b/gi,
	/\bnedecektovani\b/gi,
	/\btespit edilemeyen\b/gi,
	/\bniewykrywalne\b/gi,
	/\bunentdeckte\b/gi,
	/zadeyo\.com/gi,
	/\bZadeyo\b/gi,
	/\bzadeyo\b/gi,
];

function postClean(text) {
	return text
		.replace(/via\s+checkout\s+via\s+/gi, 'via ')
		.replace(/checkout\s+via\s+checkout/gi, 'checkout')
		.replace(/ — checkout via \./g, '.')
		.replace(/ — checkout über \./g, '.')
		.replace(/ — checkout przez \./g, '.')
		.replace(/ —  checkout\./g, '.')
		.replace(/ checkout \./g, ' checkout.')
		.replace(/via \./g, '')
		.replace(/über \./g, '')
		.replace(/przez \./g, '')
		.replace(/  +/g, ' ')
		.replace(/ +\n/g, '\n')
		.replace(/ — —/g, ' —')
		.replace(/^ — /gm, '')
		.replace(/ — $/gm, '')
		.trim();
}

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
	'scripts/i18n-data/pages-en.mjs',
	'scripts/i18n-data/pages-i18n.mjs',
	'scripts/i18n-data/ui-strings-part1.mjs',
	'scripts/i18n-data/ui-strings-part2.mjs',
	'scripts/i18n-data/phrases.mjs',
	'scripts/i18n-data/image-alts.mjs',
	'src/data/site.ts',
	'src/data/i18n/simple-pages.ts',
	'src/data/i18n/content.generated.ts',
	'src/data/blog/posts.generated.ts',
	'public/locales/en/translation.json',
	'public/locales/es/translation.json',
	'src/data/page-related-links.ts',
	'src/data/forums/threads.ts',
	'src/data/i18n/locales.ts',
];

function clean(text) {
	let out = text
		.replace(/\bundetected:/g, '__KEY_UNDETECTED__')
		.replace(/\.undetected\b/g, '.maintenance')
		.replace(/\bp\.undetected\b/g, 'p.maintenance');
	for (const re of STRIP_PATTERNS) out = out.replace(re, '');
	out = out.replace(/__KEY_UNDETECTED__/g, 'undetected:');
	return postClean(out);
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
