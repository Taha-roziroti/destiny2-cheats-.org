import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { localeCodes, type LocaleCode } from '../data/i18n/locales';
import type { TranslationCatalog } from './build-catalog';

export const supportedLngs: LocaleCode[] = [...localeCodes];

/** Hydrate react-i18next with one locale catalog (passed from Astro — avoids bundling all locales). */
export function hydrateI18n(locale: string, catalog: TranslationCatalog) {
	const lng = locale as LocaleCode;

	if (!i18n.isInitialized) {
		i18n.use(initReactI18next).init({
			resources: { [lng]: { translation: catalog } },
			lng,
			fallbackLng: 'en',
			supportedLngs,
			nonExplicitSupportedLngs: true,
			load: 'languageOnly',
			interpolation: { escapeValue: false },
			react: { useSuspense: false },
		});
		return;
	}

	if (!i18n.hasResourceBundle(lng, 'translation')) {
		i18n.addResourceBundle(lng, 'translation', catalog, true, true);
	}

	if (i18n.language !== lng) {
		i18n.language = lng;
		void i18n.changeLanguage(lng);
	}
}

export default i18n;
