import enBase from '../../public/locales/en/translation.json';
import { getUi } from '../data/i18n';
import { galleryUi } from '../data/i18n/gallery-ui';
import type { LocaleCode } from '../data/i18n/locales';
import {
	a11yChrome,
	commonChrome,
	getChipLabels,
	navChrome,
	reviewChrome,
} from './locale-chrome';

export type TranslationCatalog = typeof enBase & {
	a11y: (typeof a11yChrome)['en'];
};

function cleanTagline(tagline: string): string {
	return tagline
		.replace(/Zadeyo\.?/gi, '')
		.replace(/via\s+checkout\s*/gi, '')
		.replace(/\bundetected\b/gi, '')
		.replace(/\bprivate\b/gi, '')
		.replace(/\s{2,}/g, ' ')
		.trim();
}

/** Build a full react-i18next / getT catalog for one locale. */
export function buildCatalog(locale: LocaleCode): TranslationCatalog {
	const ui = getUi(locale);
	const navX = navChrome[locale];
	const commonX = commonChrome[locale];
	const reviewX = reviewChrome[locale];
	const a11yX = a11yChrome[locale];
	const chips = getChipLabels(locale);
	const g = galleryUi[locale];
	const catalog = structuredClone(enBase) as TranslationCatalog;

	catalog.nav = {
		...catalog.nav,
		home: ui.nav.home,
		hacks: ui.nav.hacks,
		aimbot: ui.nav.aimbot,
		esp: ui.nav.esp,
		features: ui.nav.features,
		pricing: ui.nav.pricing,
		setup: ui.nav.setup,
		updates: ui.nav.updates,
		faq: ui.nav.faq,
		buyNow: ui.nav.buyNow,
		...navX,
	};

	catalog.hero = {
		...catalog.hero,
		accent: ui.hero.accent.replace(/\bundetected\b/gi, '').replace(/\s{2,}/g, ' ').trim(),
		accentShort: ui.hero.accentShort.replace(/\bundetected\b/gi, '').trim(),
		subtitle: ui.hero.subtitle,
		subtitleShort: ui.hero.subtitleShort,
		buyNow: ui.hero.buyNow,
		seeFeatures: ui.hero.seeFeatures,
		title: ui.product.title,
		...chips,
	};

	catalog.cta = { buy: ui.hero.buyNow, buyShort: ui.nav.buyNow.split(' ')[0] ?? ui.nav.buyNow };
	catalog.trust = { ...ui.trust, statusNote: ui.trust.statusNote.replace(/\bundetected\b/gi, '').trim() };
	catalog.product = {
		...catalog.product,
		...ui.product,
		statusBadge: ui.product.statusBadge.replace(/\bundetected\b/gi, '').trim(),
	};

	catalog.reviews = {
		...catalog.reviews,
		title: ui.reviews.title,
		subtitle: ui.reviews.subtitle,
		outOf: ui.reviews.outOf,
		countLabel: ui.reviews.countLabel,
		eyebrow: navX.reviews,
		homeTitle: ui.reviews.title,
		...reviewX,
	};

	catalog.common = {
		...catalog.common,
		buyNow: ui.common.buyNow,
		readGuide: ui.common.readGuide,
		language: ui.common.language,
		officialLanguageNote: ui.common.officialLanguageNote,
		relatedPages: ui.common.relatedPages,
		...commonX,
	};

	catalog.footer = {
		explore: ui.footer.explore,
		help: ui.footer.help,
		tagline: cleanTagline(ui.footer.tagline),
	};

	catalog.images = { ...ui.images };

	catalog.home = {
		aboutEyebrow: commonX.browse,
		aboutTitle: catalog.hero.accent,
		aboutLede: ui.hero.subtitle,
		featuresAria: catalog.home.featuresAria,
		featEsp: chips.chipEsp,
		featAim: chips.chipAim,
		featRadar: chips.chipRadar,
		featStream: chips.chipUpdates,
		ctaPlans: ui.nav.pricing,
		ctaStatus: ui.nav.updates,
		guidesLabel: commonX.browse,
		linkCheats: ui.nav.hacks,
		linkEsp: ui.nav.esp,
		linkAimbot: ui.nav.aimbot,
		linkFeatures: ui.nav.features,
	};

	catalog.homeSeo = {
		...catalog.homeSeo,
		eyebrow: commonX.browse,
		linkEsp: ui.nav.esp,
		linkAimbot: ui.nav.aimbot,
		linkLiveStatus: ui.trust.status,
		linkCheats: ui.nav.hacks,
		linkSetup: ui.nav.setup,
		linkPlans: ui.nav.pricing,
		linkReviews: navX.reviews,
		linkDestiny2Cheats: ui.nav.hacks,
		linkFaq: ui.nav.faq,
		linkSupport: commonX.support,
		linkSetupGuide: ui.nav.setup,
		linkForums: navX.forums,
		linkBlog: navX.forums,
		faqEyebrow: ui.nav.faq,
	};

	catalog.deals = {
		pricing: ui.nav.pricing,
		chooseLicense: ui.nav.pricing,
		features: ui.nav.features,
		featEsp: chips.chipEsp,
		featAim: chips.chipAim,
		featRadar: chips.chipRadar,
		featUpdates: chips.chipUpdates,
	};

	catalog.trustStrip = {
		instantDelivery: ui.trust.delivery,
		secureCheckout: ui.trust.delivery,
		support247: commonX.support,
	};

	catalog.categoryRow = {
		hacks: ui.nav.hacks,
		esp: ui.nav.esp,
		aimbot: ui.nav.aimbot,
		radar: chips.chipRadar,
		wallhack: chips.chipEsp,
		pricing: ui.nav.pricing,
		setup: ui.nav.setup,
		blog: navX.forums,
		forums: navX.forums,
	};

	catalog.gallery = {
		eyebrow: g.eyebrow,
		title: g.title,
		subtitle: g.subtitle,
		lead: g.lead,
		highlightEspTitle: g.highlights[0]?.title ?? '',
		highlightEspCopy: g.highlights[0]?.copy ?? '',
		highlightRadarTitle: g.highlights[1]?.title ?? '',
		highlightRadarCopy: g.highlights[1]?.copy ?? '',
		highlightAimbotTitle: g.highlights[2]?.title ?? '',
		highlightAimbotCopy: g.highlights[2]?.copy ?? '',
		updatesLabel: g.updatesLabel,
		updatesShort: g.updatesShort,
	};

	catalog.a11y = a11yX;

	return catalog;
}
