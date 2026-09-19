import { defaultLocale, isLocaleCode, type LocaleCode } from '../data/i18n/locales';
import { getTranslationCatalog } from './catalogs';

function lookup(obj: unknown, path: string): string | undefined {
	const parts = path.split('.');
	let cur: unknown = obj;
	for (const part of parts) {
		if (!cur || typeof cur !== 'object') return undefined;
		cur = (cur as Record<string, unknown>)[part];
	}
	return typeof cur === 'string' ? cur : undefined;
}

/** Sync translator for Astro frontmatter (SSR). React islands use useTranslation(). */
export function getT(locale: string) {
	const code: LocaleCode = isLocaleCode(locale) ? locale : defaultLocale;
	const catalog = getTranslationCatalog(code);
	const fallback = getTranslationCatalog(defaultLocale);

	return (key: string, vars?: Record<string, string | number>) => {
		let value = lookup(catalog, key) ?? lookup(fallback, key) ?? key;
		if (vars) {
			for (const [k, v] of Object.entries(vars)) {
				value = value.replaceAll(`{{${k}}}`, String(v));
			}
		}
		return value;
	};
}
