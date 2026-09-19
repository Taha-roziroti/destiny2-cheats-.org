import { siteConfig } from '../site';
import { destinyImages } from '../destiny';
import { forumThreads } from './threads';

export const forumsBasePath = '/forums/';

export function getForumThread(slug: string) {
	return forumThreads.find((t) => t.slug === slug);
}

export function getAllForumThreads() {
	return [...forumThreads].sort((a, b) => b.updated.localeCompare(a.updated));
}

export function getForumThreadPath(slug: string) {
	return `${forumsBasePath}${slug}/`;
}

export function absoluteForumUrl(path: string) {
	return new URL(path, siteConfig.url).href;
}

export function getForumSitemapEntries() {
	return [
		{
			path: forumsBasePath,
			lastmod: forumThreads.reduce((max, t) => (t.updated > max ? t.updated : max), '2026-09-01'),
			changefreq: 'weekly' as const,
			priority: 0.75,
			images: [{ url: new URL(destinyImages.cheatsCombat, siteConfig.url).href, title: 'Destiny 2 cheats forum', caption: 'Community threads about ESP, aimbot, and wallhack' }],
		},
		...forumThreads.map((thread) => ({
			path: getForumThreadPath(thread.slug),
			lastmod: thread.updated,
			changefreq: 'monthly' as const,
			priority: 0.7,
			images: [{ url: new URL(thread.imageSrc, siteConfig.url).href, title: thread.title, caption: thread.imageAlt }],
		})),
	];
}

/** Legacy blog slugs → forum thread slugs */
export const blogToForumRedirects: Record<string, string> = {
	'aimbot-settings': 'aimbot-settings-ban-risk',
	'esp-wallhack': 'destiny-2-esp-wallhack-features',
	'cheats-guide-2026': 'how-to-use-destiny-2-cheats',
	'buyers-guide': 'buying-destiny-2-cheats-license',
	'undetected-battleye': 'patch-day-playbook',
	'patch-notes': 'patch-day-playbook',
	'pve-strategies': 'crucible-esp-radar-tips',
	'weapon-tier-list': 'destiny-2-aimbot-setup-guide',
	'cheats-2026-updates': 'patch-day-playbook',
	'full-stack-vs-esp-only': 'destiny-2-esp-wallhack-features',
	'two-week-cheat-test': 'buying-destiny-2-cheats-license',
	'vs-budget-shops': 'buying-destiny-2-cheats-license',
	'pro-settings': 'recoil-triggerbot-settings',
	'warmup-routine': 'how-to-use-destiny-2-cheats',
	'loot-routes': 'crucible-esp-radar-tips',
	'tournament-meta': 'crucible-esp-radar-tips',
	'skin-leaks': 'stream-proof-overlay-settings',
};
