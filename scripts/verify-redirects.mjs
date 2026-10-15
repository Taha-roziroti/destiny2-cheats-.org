#!/usr/bin/env node
/**
 * Ensure Workers middleware and public/_redirects agree on critical 301 paths.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const middlewareSrc = readFileSync(path.join(ROOT, 'functions/_middleware.js'), 'utf8');
const redirectsSrc = readFileSync(path.join(ROOT, 'public/_redirects'), 'utf8');

function readBrandHost() {
	const brand = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const m = brand.match(/url:\s*'([^']+)'/);
	if (!m) throw new Error('brand.ts missing url');
	return new URL(m[1]).hostname;
}

const CANONICAL_HOST = readBrandHost();

const middlewareBlock = middlewareSrc.match(/const PATH_REDIRECTS = \{([\s\S]*?)\n\};/);
if (!middlewareBlock) {
	console.error('Could not parse PATH_REDIRECTS from functions/_middleware.js');
	process.exit(1);
}

const middlewareRedirects = new Map();
for (const line of middlewareBlock[1].split('\n')) {
	const m = line.match(/'([^']+)':\s*'([^']+)'/);
	if (m) middlewareRedirects.set(m[1], m[2]);
}

function redirectsMap() {
	const map = new Map();
	for (const line of redirectsSrc.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const parts = trimmed.split(/\s+/);
		if (parts.length < 2) continue;
		const [from, to, code] = parts;
		if (code && code !== '301') continue;
		map.set(from, to);
	}
	return map;
}

const fileRedirects = redirectsMap();

const mustMatch = [
	'/sitemap-index.xml',
	'/destiny-2-cheats',
	'/destiny-2-cheats/',
	'/best-destiny-2-cheats/',
	'/warzone-esp/',
];

let errors = 0;

if (!middlewareSrc.includes(`'https://${CANONICAL_HOST}'`)) {
	console.error(`Middleware CANONICAL_ORIGIN must use https://${CANONICAL_HOST}`);
	errors++;
}

for (const key of mustMatch) {
	const mw = middlewareRedirects.get(key);
	const file = fileRedirects.get(key);
	if (!mw && !file) {
		console.error(`Missing redirect for ${key} in middleware and _redirects`);
		errors++;
		continue;
	}
	if (mw && file && mw !== file) {
		console.error(`Redirect mismatch for ${key}: middleware → ${mw}, _redirects → ${file}`);
		errors++;
	}
}

const robots = readFileSync(path.join(ROOT, 'public/robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: https://${CANONICAL_HOST}/sitemap.xml`)) {
	console.error('robots.txt missing primary Sitemap line');
	errors++;
}

if (errors) {
	console.error(`\nverify-redirects: ${errors} issue(s)`);
	process.exit(1);
}

console.log('verify-redirects: middleware, _redirects, and robots.txt look aligned.');
