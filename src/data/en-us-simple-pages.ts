import type { SimplePageCopy } from './i18n/simple-pages';
import { brandCopy, brandSeo, seoPageTitle } from './site-core';
import { seoDescription } from './brand';
import { fillBrandTokens } from './brand';
import { sitePaths as p } from './site-paths';
import { siteConfig } from './site';

function page(copy: SimplePageCopy): SimplePageCopy {
	return {
		...copy,
		title: seoPageTitle(copy.title),
		description: seoDescription(copy.description),
		intro: fillBrandTokens(copy.intro),
		sections: copy.sections.map((section) => ({
			...section,
			h2: fillBrandTokens(section.h2),
			paragraphs: section.paragraphs.map(fillBrandTokens),
			list: section.list?.map(fillBrandTokens),
		})),
	};
}

/** US en-US SEO copy for canonical money pages (see project SEO brief). */
export const enUsSimplePages = {
	pricing: page({
		title: brandSeo.storeTitle,
		description: brandSeo.storeDescription,
		h1: 'Destiny 2 Cheats Price and Available Plans',
		intro:
			'Compare Destiny 2 cheat access plans sold through our checkout partner. Prices below were last verified October 15, 2026 — confirm the live listing before you pay.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Main listing',
		ctaSecondaryHref: '/',
		galleryTitle: 'Plan comparison',
		sections: [
			{
				h2: 'Current Destiny 2 Cheat Pricing',
				paragraphs: [
					'Licenses are sold in USD through the merchant checkout linked on this site. Monthly and lifetime tiers include the same feature set listed on the main product page.',
				],
				list: [
					'Monthly — $35 (30-day access)',
					'Lifetime — $150 (one-time payment)',
					'Digital delivery after payment confirmation',
				],
			},
			{
				h2: 'Monthly Access vs. Lifetime Access',
				paragraphs: [
					'Monthly renews every 30 days unless the merchant states otherwise at checkout. Lifetime is a single purchase for long-term access while the product remains supported.',
					'Neither plan removes account risk from using third-party software with Destiny 2.',
				],
			},
			{
				h2: 'What Is Included With Each Available Plan?',
				paragraphs: [
					'Both plans unlock the same modules described on the main listing — ESP, aimbot, radar, and related tools — subject to what the merchant currently ships.',
				],
				list: [
					'ESP / wallhack overlays',
					'Configurable aimbot and recoil tools',
					'2D radar and stream-safe rendering options',
					'Maintenance notes after major {antiCheat} patches (while your plan is active)',
				],
			},
			{
				h2: 'Additional Requirements and Potential Costs',
				paragraphs: [
					'Windows 10 or 11 is required. Some buyers use separate virtualization or loader products — check <a href="/cloud-dma/">Cloud DMA</a> only if your merchant bundle lists it as a dependency.',
				],
			},
			{
				h2: 'Questions About Billing, Renewals, and Access',
				paragraphs: [
					'Billing policies are set by the merchant. Email {email} with your order ID for help, or read <a href="/refund/">refund policy</a> and the <a href="/faq/">billing FAQ</a>.',
				],
			},
		],
	}),
	setup: page({
		title: brandSeo.setupTitle,
		description: brandSeo.setupDescription,
		h1: 'Destiny 2 Cheat Setup Guide and System Requirements',
		intro:
			'Use this guide to confirm Windows compatibility and find official setup resources before you buy. Last reviewed October 15, 2026.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Cloud DMA requirements',
		ctaSecondaryHref: p.cloudDma,
		galleryTitle: 'Setup documentation',
		sections: [
			{
				h2: 'Check Product and Windows Compatibility First',
				paragraphs: [
					'Requirements apply to the cheat package sold through our checkout partner, not to Destiny 2 alone. Read the merchant listing and <a href="/">main product page</a> before installing anything.',
				],
			},
			{
				h2: 'System Requirements Listed by the Provider',
				paragraphs: ['Published expectations for this product include:'],
				list: [
					'Windows 10 or Windows 11 (64-bit)',
					'Destiny 2 installed and updated through official channels',
					'Administrator rights to run the loader when the merchant requires it',
					'Enough free disk space for the loader and overlays',
				],
			},
			{
				h2: 'Installation Documentation and Support Resources',
				paragraphs: [
					'Follow the delivery email and merchant instructions after purchase. Do not rely on unofficial download mirrors.',
					'For license issues contact {email} with your order ID.',
				],
				list: [
					'<a href="/status/">Check status after patches</a>',
					'<a href="/faq/">Setup FAQ</a>',
					'<a href="/support/">Email support</a>',
				],
			},
			{
				h2: 'Common Setup and Activation Questions',
				paragraphs: [
					'Activation timing varies by payment method. If Windows Defender or another security tool blocks the loader, pause and contact support rather than disabling protections blindly.',
				],
			},
			{
				h2: 'Compatibility Limitations and Account Risks',
				paragraphs: [
					'Using third-party cheat software can violate Bungie terms and may lead to restrictions. No setup step guarantees safety or undetected play.',
				],
			},
		],
	}),
	'destiny-2-aimbot': page({
		title: 'Destiny 2 Aimbot Features & Details',
		description:
			'Explore listed Destiny 2 aimbot features, customization options, requirements, and available plans. Review the product details before choosing.',
		h1: 'Destiny 2 Aimbot: Features and Options',
		intro:
			'This page summarizes aimbot-related controls described in the current merchant listing for Destiny 2 on Windows PC. Verify the live product page before you buy.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Compare plans',
		ctaSecondaryHref: p.pricing,
		galleryTitle: 'Aimbot interface',
		sections: [
			{
				h2: 'What the Listed Destiny 2 Aimbot Includes',
				paragraphs: [
					'The package describes precision aim assist, triggerbot, and recoil-related tools bundled with ESP and radar — not sold as a standalone aim-only license unless the merchant states otherwise.',
				],
				list: ['Soft aim / aim assist tuning', 'FOV and smoothness controls', 'Triggerbot with delay options', 'No recoil and no spread helpers'],
			},
			{
				h2: 'Sensitivity and Target-Selection Options',
				paragraphs: [
					'Documented controls include field-of-view limits, smoothness, and bone or target priority where the seller lists them. Adjust conservatively — aggressive settings increase visibility to other players and anti-cheat systems.',
				],
			},
			{
				h2: 'Aimbot Features Compared With Other Tools',
				paragraphs: [
					'Aimbot addresses aim and fire control. <a href="/destiny-2-esp/">ESP</a> covers visibility through walls. Radar highlights threats outside your view. All are modules within one license on the <a href="/">main listing</a>.',
				],
			},
			{
				h2: 'Pricing, Access, and System Requirements',
				paragraphs: [
					'See <a href="/destiny-2-cheats-price/">Destiny 2 cheats price</a> for monthly ($35) and lifetime ($150) tiers verified October 15, 2026. Windows 10/11 required.',
				],
			},
			{
				h2: 'Common Aimbot Product Questions',
				paragraphs: [
					'Read the <a href="/destiny-2-cheats-review/">product evaluation</a> for trade-offs. Check <a href="/status/">status</a> after {antiCheat} patches before you queue.',
				],
			},
		],
	}),
	'destiny-2-esp': page({
		title: 'Destiny 2 ESP & Wallhack Features',
		description:
			'Explore listed Destiny 2 ESP and wallhack features, visual options, and compatibility details. Review the available product information before choosing.',
		h1: 'Destiny 2 ESP and Wallhack Features',
		intro:
			'ESP (extra sensory perception) and wallhack refer to the same visibility overlays in this product — player boxes, skeletons, and related HUD cues for Destiny 2 on Windows PC.',
		ctaPrimary: brandCopy.ctaBuy,
		ctaSecondary: 'Aimbot features',
		ctaSecondaryHref: p.aimbot,
		galleryTitle: 'ESP interface',
		sections: [
			{
				h2: 'How the Listed Destiny 2 ESP Features Are Presented',
				paragraphs: [
					'Overlays are designed for readability in PvP and PvE. Confirm which categories the merchant currently ships before describing them as available.',
				],
			},
			{
				h2: 'Player Boxes, Skeletons, and Visual Indicators',
				paragraphs: [
					'Interface previews may show boxes, skeleton lines, glow, and team-check coloring. Match any screenshot on this site to the live listing — features can change after updates.',
				],
				list: ['Box ESP', 'Skeleton ESP', 'Distance readouts', 'Team / enemy filters'],
			},
			{
				h2: 'Health, Armor, Distance, and Team Information',
				paragraphs: [
					'When listed by the seller, health and armor bars help judge engagements. Distance text supports spacing decisions in Crucible and raids.',
				],
			},
			{
				h2: 'Customization and Display Options',
				paragraphs: [
					'Toggle categories to reduce clutter. Pair ESP with <a href="/destiny-2-aimbot/">aimbot</a> only if you accept the combined risk profile.',
				],
			},
			{
				h2: 'Product Requirements and Frequently Asked Questions',
				paragraphs: [
					'Windows PC required. See <a href="/destiny-2-cheats-setup/">setup guide</a> and <a href="/destiny-2-cheats-price/">pricing</a>. Using ESP does not guarantee undetected status.',
				],
			},
		],
	}),
	'cheats-review': page({
		title: 'Destiny 2 Cheats Review: Features & Trade-Offs',
		description:
			'Review Destiny 2 cheat features, requirements, pricing, and limitations before choosing software. Read the product assessment and comparison.',
		h1: 'Destiny 2 Cheats Review: Features, Requirements, and Trade-Offs',
		intro:
			'Independent overview based on the merchant listing, site documentation, and editor notes. Last checked October 15, 2026 — verify live details before purchase.',
		ctaPrimary: 'View plan pricing',
		ctaSecondary: 'Main listing',
		ctaSecondaryHref: '/',
		galleryTitle: 'Product assessment',
		sections: [
			{
				h2: 'What the Current Product Listing Offers',
				paragraphs: [
					'The listing advertises a single Windows package with ESP, aimbot, radar, recoil tools, and post-patch maintenance notes. This is editorial summary, not a guarantee of performance.',
				],
			},
			{
				h2: 'Feature Overview: Aimbot, ESP, and Other Modules',
				paragraphs: [
					'See dedicated pages for <a href="/destiny-2-aimbot/">aimbot</a> and <a href="/destiny-2-esp/">ESP</a>. Buyer-written notes live on <a href="/reviews/">reviews</a> — we do not invent ratings here.',
				],
			},
			{
				h2: 'Setup Requirements and Compatibility Considerations',
				paragraphs: [
					'Windows 10/11 and an active Destiny 2 install are baseline expectations. Some users may need extra virtualization products — compare the <a href="/cloud-dma/">Hyper-V stack listing</a> only if your bundle requires it.',
				],
			},
			{
				h2: 'Pricing, Access Durations, and Limitations',
				paragraphs: [
					'Monthly ($35) and lifetime ($150) were verified October 15, 2026 on <a href="/destiny-2-cheats-price/">pricing</a>. Third-party cheats can violate Bungie terms; account penalties are possible.',
				],
			},
			{
				h2: 'What to Check Before Making a Decision',
				paragraphs: [
					'Read merchant terms, refund policy, and <a href="/status/">status</a> after patches. Do not trust ban-proof marketing from any seller.',
				],
			},
		],
	}),
	'cloud-dma': page({
		title: 'Cloud DMA Software: Features & Pricing',
		description:
			'Review Cloud DMA single-PC Hyper-V setup, lifetime pricing ($50), requirements, and what is not included. Check the listing before you buy.',
		h1: 'Cloud DMA Software: Features, Setup, and Requirements',
		intro:
			'Cloud DMA is sold separately from Destiny 2 cheat licenses. The merchant describes a single-PC Hyper-V stack with encrypted activation — not a second tower or external DMA box. Pricing checked October 15, 2026.',
		ctaPrimary: 'Buy Cloud DMA — $50 lifetime',
		ctaPrimaryHref: siteConfig.cloudDmaCheckoutUrl,
		ctaSecondary: 'Game license pricing',
		ctaSecondaryHref: p.pricing,
		galleryTitle: 'Cloud DMA',
		sections: [
			{
				h2: 'What the Listed Cloud DMA Product Provides',
				paragraphs: [
					'The listing positions Cloud DMA as the infrastructure layer for the merchant catalog on one Windows gaming PC. An installer provisions Hyper-V on that machine and finishes activation over an encrypted service link.',
					'You are not buying a USB DMA bridge, PCIe card, or second physical computer — the documented flow is built around one PC.',
				],
			},
			{
				h2: 'Single-PC Setup and Hyper-V Requirements',
				paragraphs: [
					'Expect CPU virtualization (Intel VT-x or AMD-V) enabled in firmware, permission to enable the Hyper-V role during guided setup, and a stable broadband connection for activation.',
					'Windows Pro, Enterprise, or Education is recommended when Hyper-V is required; follow the installer notes for your edition.',
				],
			},
			{
				h2: 'Included Services, Separate Purchases, and Access Duration',
				paragraphs: [
					'The merchant states that GREENWARD, the Static Server (sometimes labeled AWS on invoices), and related setup pieces are separate purchases — not included in the Cloud DMA checkout on this listing.',
					'Lifetime access is listed at $50 USD (one-time, unlimited duration per merchant terms). Catalog game modules such as Destiny 2 are not bundled into that price.',
				],
				list: [
					'Lifetime tier — $50 (listed October 15, 2026)',
					'Separate loader / server products may be required',
					'Keys are personal — sharing violates the license',
				],
			},
			{
				h2: 'Windows Compatibility and Hardware Requirements',
				paragraphs: [
					'Published requirements include Windows 10 or 11 (64-bit), minimum 8 GB RAM (16 GB recommended), and firmware settings commonly shown on the product page (HVCI, core isolation, TPM, Secure Boot).',
					'Confirm every requirement on the live checkout page before purchase — builds and policies change.',
				],
			},
			{
				h2: 'Pricing and Questions to Check Before Buying',
				paragraphs: [
					'Compare <a href="/destiny-2-cheats-price/">main game pricing</a> if you only need the game package. Cloud DMA does not guarantee undetected play or ban protection.',
					'Open a support ticket with the merchant if you are unsure whether your Windows edition supports Hyper-V before you pay.',
				],
			},
		],
	}),
	'hwid-spoofer': page({
		title: 'HWID Spoofer: Features & Pricing',
		description:
			'Review HWID spoofer features, supported anti-cheat families, monthly and lifetime pricing, and Windows requirements before checkout.',
		h1: 'HWID Spoofer: Features, Requirements, and Pricing',
		intro:
			'This page summarizes the HWID Spoofer sold on our affiliate partner’s store. It is a separate product from Destiny 2 cheats — used for hardware-ID reset workflows the merchant documents for Valorant/Vanguard and other anti-cheats. Pricing checked October 15, 2026.',
		ctaPrimary: 'Buy HWID Spoofer — from $50',
		ctaPrimaryHref: siteConfig.hwidSpooferCheckoutUrl,
		ctaSecondary: 'Game license pricing',
		ctaSecondaryHref: p.pricing,
		galleryTitle: 'HWID Spoofer',
		sections: [
			{
				h2: 'What the Listed HWID Spoofer Provides',
				paragraphs: [
					'The merchant describes hardware spoofer tooling with a cleaner included. It targets HWID (hardware ID) bans by changing documented identifiers such as disk serials, MAC addresses, and GPU-related IDs so you can attempt a fresh hardware fingerprint.',
					'Use only for scenarios covered by the merchant guide — spoofing violates game terms and can carry account or legal risk.',
				],
			},
			{
				h2: 'Supported Anti-Cheat Families (Summary)',
				paragraphs: [
					'The live product page groups support by anti-cheat rather than listing every title here. As of the October 15, 2026 listing review, categories include:',
				],
				list: [
					'Riot Vanguard — Valorant',
					'Easy Anti-Cheat — titles such as Rust, Fortnite, Apex Legends, and others on the merchant page',
					'BattlEye — titles such as Escape from Tarkov, Rainbow Six Siege, and PUBG on the merchant page',
					'Ricochet — Call of Duty titles listed on the merchant page',
					'Additional anti-cheats (Delta Force, Arena Breakout, Battlefield, FiveGuard, etc.) as shown at checkout',
				],
			},
			{
				h2: 'Pricing and Access Durations',
				paragraphs: [
					'Monthly access is listed at $50 USD for 31 days. Lifetime access is listed at $150 USD with unlimited duration per merchant terms.',
					'Confirm the exact total, tax, and renewal rules on the checkout page before you pay.',
				],
			},
			{
				h2: 'System Requirements and Setup Notes',
				paragraphs: [
					'The listing calls for Windows 10 or 11 (64-bit), administrator rights for spoof and cleanup steps, and stable internet for activation and updates.',
					'The merchant page highlights HVCI, core isolation, TPM, and Secure Boot as part of the documented environment — verify on the live product page.',
					'Run spoof and cleanup in the order described in the merchant guide before launching a protected game.',
				],
			},
			{
				h2: 'Relationship to Destiny 2 Cheats',
				paragraphs: [
					'Destiny 2 on PC uses BattlEye; this HWID product is marketed across many anti-cheats, not only Destiny 2. Our main <a href="/">Destiny 2 cheat listing</a> uses the standard affiliate checkout.',
					'Need Cloud DMA instead? See the <a href="/cloud-dma/">Hyper-V product summary</a> for the single-PC stack.',
				],
			},
		],
	}),
} satisfies Partial<Record<string, SimplePageCopy>>;
