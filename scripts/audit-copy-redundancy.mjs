#!/usr/bin/env node
/**
 * Flags duplicate heading text and duplicate link anchor text per HTML page.
 * Run after build: node scripts/audit-copy-redundancy.mjs
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const H_RE = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
const A_RE = /<a\b[^>]*\bhref\s*=\s*(["'])([^"'#][^"']*)\1[^>]*>([\s\S]*?)<\/a>/gi;

function stripHtml(s) {
	return s
		.replace(/<[^>]+>/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

function norm(s) {
	return stripHtml(s).toLowerCase();
}

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

function auditPage(html, scope) {
	const slice =
		scope === 'main'
			? (html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0] ?? html)
			: html;

	const headings = [];
	for (const m of slice.matchAll(H_RE)) {
		const text = stripHtml(m[2]);
		if (text) headings.push({ level: Number(m[1]), text });
	}

	const anchors = [];
	for (const m of slice.matchAll(A_RE)) {
		const text = stripHtml(m[3]);
		const href = m[2].trim();
		if (text && !href.startsWith('mailto:')) anchors.push({ href, text });
	}

	const dupHead = new Map();
	for (const h of headings) {
		const k = norm(h.text);
		if (!k) continue;
		dupHead.set(k, (dupHead.get(k) ?? 0) + 1);
	}

	const dupAnchor = new Map();
	for (const a of anchors) {
		const k = norm(a.text);
		if (!k) continue;
		dupAnchor.set(k, (dupAnchor.get(k) ?? 0) + 1);
	}

	return {
		dupHead: [...dupHead.entries()].filter(([, c]) => c > 1),
		dupAnchor: [...dupAnchor.entries()].filter(([, c]) => c > 1),
	};
}

async function main() {
	const scope = process.argv.includes('--full') ? 'full' : 'main';
	const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
	const files = (await walkHtml(DIST)).filter((f) => !only || f.rel === only);
	const issues = [];

	for (const { abs, rel } of files) {
		const html = await readFile(abs, 'utf8');
		const { dupHead, dupAnchor } = auditPage(html, scope);
		if (dupHead.length || dupAnchor.length) {
			issues.push({ rel, dupHead, dupAnchor });
		}
	}

	if (issues.length === 0) {
		console.log(`audit-copy-redundancy: no duplicate headings or anchors (${scope} scope, ${files.length} pages).`);
		process.exit(0);
	}

	console.log(`audit-copy-redundancy: ${issues.length} page(s) with duplicates (${scope} scope)\n`);
	for (const { rel, dupHead, dupAnchor } of issues.slice(0, 40)) {
		console.log(rel);
		for (const [text, count] of dupHead) console.log(`  heading x${count}: ${text}`);
		for (const [text, count] of dupAnchor) console.log(`  anchor x${count}: ${text}`);
	}
	if (issues.length > 40) console.log(`… and ${issues.length - 40} more pages`);

	process.exit(1);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
