import { localeCodes, type LocaleCode } from '../data/i18n/locales';
import { buildCatalog, type TranslationCatalog } from './build-catalog';

const cache = new Map<LocaleCode, TranslationCatalog>();

export function getTranslationCatalog(locale: LocaleCode): TranslationCatalog {
	let catalog = cache.get(locale);
	if (!catalog) {
		catalog = buildCatalog(locale);
		cache.set(locale, catalog);
	}
	return catalog;
}

export const translationCatalogs = Object.fromEntries(
	localeCodes.map((code) => [code, getTranslationCatalog(code)]),
) as Record<LocaleCode, TranslationCatalog>;
