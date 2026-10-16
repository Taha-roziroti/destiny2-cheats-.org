import type { PageId } from './i18n/content.generated';
import { sitePaths as p } from './site-paths';

export type RelatedPageLink = { href: string; label: string };

/** Curated internal links per page — unique anchor text, hub-and-spoke to live pillar URLs. */
export const pageRelatedLinks: Partial<Record<PageId, RelatedPageLink[]>> = {
	hacks: [
		{ href: p.esp, label: 'ESP & wallhack' },
		{ href: p.aimbot, label: 'Aimbot & soft aim' },
		{ href: p.radar, label: 'Radar hack' },
		{ href: p.features, label: 'Full feature list' },
		{ href: p.pricing, label: 'Store & plans' },
		{ href: p.forums, label: 'Community hub' },
	],
	'destiny-2-esp': [
		{ href: p.cheats, label: 'Cheats package overview' },
		{ href: p.aimbot, label: 'Aimbot guide' },
		{ href: p.radar, label: 'Radar overlay' },
		{ href: p.features, label: 'Included modules' },
		{ href: p.pricing, label: 'License store' },
		{ href: p.forums, label: 'Player forums' },
	],
	'destiny-2-aimbot': [
		{ href: p.cheats, label: 'Main cheats hub' },
		{ href: p.esp, label: 'ESP walkthrough' },
		{ href: p.radar, label: '2D radar' },
		{ href: p.features, label: 'Tool breakdown' },
		{ href: p.pricing, label: 'Buy a license' },
		{ href: p.forums, label: 'Discussion board' },
	],
	radar: [
		{ href: p.cheats, label: 'Product landing' },
		{ href: p.esp, label: 'ESP overlays' },
		{ href: p.aimbot, label: 'Soft aim page' },
		{ href: p.features, label: 'Every feature' },
		{ href: p.forums, label: 'Community' },
	],
	features: [
		{ href: p.cheats, label: 'Preview cheats' },
		{ href: p.esp, label: 'ESP deep dive' },
		{ href: p.aimbot, label: 'Aimbot controls' },
		{ href: p.pricing, label: 'Plan pricing' },
		{ href: p.setup, label: 'Install guide' },
	],
	pricing: [
		{ href: p.cheats, label: 'What you get' },
		{ href: p.features, label: 'Feature inventory' },
		{ href: p.setup, label: 'Setup walkthrough' },
		{ href: p.reviews, label: 'Buyer reviews' },
		{ href: p.faq, label: 'FAQ topics' },
	],
	setup: [
		{ href: p.cheats, label: 'Cheats overview' },
		{ href: p.updates, label: 'Live status' },
		{ href: p.features, label: 'Module list' },
		{ href: p.support, label: 'Help desk' },
		{ href: p.pricing, label: 'License pricing' },
	],
	updates: [
		{ href: p.cheats, label: 'Package home' },
		{ href: p.setup, label: 'Install steps' },
		{ href: p.faq, label: 'FAQ answers' },
		{ href: p.forums, label: 'Forum threads' },
		{ href: p.support, label: 'Contact support' },
	],
	faq: [
		{ href: p.setup, label: 'Install walkthrough' },
		{ href: p.support, label: 'Open a ticket' },
		{ href: p.pricing, label: 'Plans & billing' },
		{ href: p.cheats, label: 'Cheats summary' },
		{ href: p.forums, label: 'Ask the community' },
	],
	support: [
		{ href: p.setup, label: 'Setup guide' },
		{ href: p.updates, label: 'Patch status' },
		{ href: p.cheats, label: 'Product details' },
		{ href: p.pricing, label: 'Renew or upgrade' },
	],
	wallhack: [
		{ href: p.esp, label: 'ESP guide' },
		{ href: p.cheats, label: 'Full bundle' },
		{ href: p.aimbot, label: 'Aim assist page' },
		{ href: p.features, label: 'Feature set' },
	],
	'esp-hack': [
		{ href: p.esp, label: 'ESP product page' },
		{ href: p.cheats, label: 'Cheats storefront' },
		{ href: p.radar, label: 'Radar module' },
	],
	'aimbot-hack': [
		{ href: p.aimbot, label: 'Aimbot landing' },
		{ href: p.cheats, label: 'Complete package' },
		{ href: p.esp, label: 'Wallhack ESP' },
	],
	'aim-assist': [
		{ href: p.aimbot, label: 'Aimbot features' },
		{ href: p.cheats, label: 'Cheats hub' },
		{ href: p.esp, label: 'ESP visibility' },
	],
	private: [
		{ href: p.updates, label: 'Undetected status' },
		{ href: p.cheats, label: 'Private build info' },
		{ href: p.faq, label: 'Safety FAQ' },
	],
	'best-cheats': [
		{ href: p.cheats, label: 'Our cheats page' },
		{ href: p.features, label: 'Compare features' },
		{ href: p.reviews, label: 'Verified reviews' },
	],
	'cheats-2026': [
		{ href: p.cheats, label: '2026 offer' },
		{ href: p.forums, label: 'Latest threads' },
		{ href: p.features, label: 'Current toolkit' },
	],
	'crucible-cheats': [
		{ href: p.cheats, label: 'PvP cheats bundle' },
		{ href: p.esp, label: 'Crucible ESP' },
		{ href: p.aimbot, label: 'Crucible aimbot' },
		{ href: '/forums/crucible-esp-radar-tips/', label: 'Crucible ESP tips' },
	],
	'pve-cheats': [
		{ href: p.cheats, label: 'PvE package' },
		{ href: p.esp, label: 'Raid ESP' },
		{ href: p.forums, label: 'PvE forum' },
		{ href: p.setup, label: 'Raid setup' },
	],
	'cheat-download': [
		{ href: p.setup, label: 'Download & setup' },
		{ href: p.pricing, label: 'Get a license' },
		{ href: p.cheats, label: 'Before you download' },
	],
	anticheat: [
		{ href: p.updates, label: 'Rebuild status' },
		{ href: p.cheats, label: 'Maintained cheats' },
		{ href: p.setup, label: 'Post-patch setup' },
	],
	'cheats-review': [
		{ href: p.pricing, label: 'Plan pricing' },
		{ href: p.setup, label: 'Install walkthrough' },
		{ href: p.esp, label: 'ESP highlights' },
		{ href: p.aimbot, label: 'Aimbot highlights' },
		{ href: p.cloudDma, label: 'Hyper-V Cloud DMA' },
	],
	'cloud-dma': [
		{ href: p.pricing, label: 'Destiny 2 plans' },
		{ href: p.setup, label: 'DMA setup' },
		{ href: p.hwidSpoofer, label: 'HWID Spoofer' },
		{ href: p.cheatsReview, label: 'Product evaluation' },
	],
	'hwid-spoofer': [
		{ href: p.cloudDma, label: 'Hyper-V Cloud DMA' },
		{ href: p.pricing, label: 'Destiny 2 plans' },
		{ href: p.setup, label: 'Spoofer install' },
		{ href: '/', label: 'Storefront home' },
	],
};

export function getRelatedPageLinks(pageId: PageId): RelatedPageLink[] {
	return pageRelatedLinks[pageId] ?? [];
}
