import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translationCatalogs } from './src/i18n/catalogs.ts';

export const supportedLngs = Object.keys(translationCatalogs);

const resources = Object.fromEntries(
	Object.entries(translationCatalogs).map(([lng, translation]) => [lng, { translation }]),
);

if (!i18n.isInitialized) {
	i18n.use(initReactI18next).init({
		resources,
		lng: 'en',
		fallbackLng: 'en',
		supportedLngs,
		nonExplicitSupportedLngs: true,
		load: 'languageOnly',
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false,
		},
	});
}

export default i18n;
