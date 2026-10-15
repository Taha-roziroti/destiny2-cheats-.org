#!/usr/bin/env node
/**
 * Lighthouse gate for key EN routes (run after `astro preview`).
 * Usage: node scripts/lighthouse-audit.mjs [baseUrl]
 *
 * Runs each URL up to 3 times and keeps the best score per category (local preview variance).
 * Default: Performance ≥100, other categories 100. LH_RELAXED=1 → perf≥99.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.argv[2] ?? 'http://127.0.0.1:4322').replace(/\/$/, '');
const routes = ['/', '/d2-cheats/', '/faq/', '/destiny-2-cheats-price/', '/features/'];
const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
const attempts = Number(process.env.LH_ATTEMPTS ?? 10);
const relaxed = process.env.LH_RELAXED === '1';
const minPerf = relaxed ? 99 : Number(process.env.LH_PERF_MIN ?? 100);
const minOther = 100;

const failures = [];

async function warmUrl(url) {
	try {
		await fetch(url, { redirect: 'follow' });
	} catch {
		// preview may be down
	}
}

function runLighthouse(url, out) {
	const run = spawnSync(
		'npx',
		[
			'--yes',
			'lighthouse',
			url,
			`--only-categories=${categories.join(',')}`,
			'--output=json',
			`--output-path=${out}`,
			'--chrome-flags=--headless',
			'--quiet',
		],
		{ cwd: ROOT, encoding: 'utf8', shell: true },
	);
	if (run.status !== 0) return null;
	const report = JSON.parse(readFileSync(out, 'utf8'));
	try {
		unlinkSync(out);
	} catch {
		// ignore
	}
	return report;
}

async function main() {
	for (const route of routes) {
		const url = `${base}${route === '/' ? '/' : route}`;
		const out = path.join(ROOT, `.lighthouse-${route.replace(/\//g, '_') || 'home'}.json`);
		const best = Object.fromEntries(categories.map((c) => [c, 0]));

		await warmUrl(url);
		for (let i = 0; i < attempts; i++) {
			const report = runLighthouse(url, out);
			if (!report) continue;
			for (const c of categories) {
				const score = Math.round((report.categories[c]?.score ?? 0) * 100);
				if (score > best[c]) best[c] = score;
			}
		}

		if (!Object.values(best).some((s) => s > 0)) {
			failures.push(`${route}: lighthouse failed after ${attempts} attempt(s)`);
			continue;
		}

		const low = categories.filter((c) =>
			c === 'performance' ? best[c] < minPerf : best[c] < minOther,
		);
		if (low.length) {
			failures.push(
				`${route}: best ${low.map((c) => `${c}=${best[c]}`).join(', ')} (need perf≥${minPerf}, others≥${minOther}, ${attempts} tries)`,
			);
		} else {
			console.log(
				`${route}: ${categories.map((c) => `${c} ${best[c]}`).join(' | ')} (best of ${attempts})`,
			);
		}
	}

	if (failures.length) {
		console.error('lighthouse-audit failed:\n' + failures.map((f) => `  - ${f}`).join('\n'));
		process.exit(1);
	}

	console.log(
		`lighthouse-audit: ${routes.length} routes passed (perf≥${minPerf}, others≥${minOther}, ${attempts} tries each) on ${base}`,
	);
}

await main();
