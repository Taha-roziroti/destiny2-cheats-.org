export type LocaleCode = 'en';

export type LocaleMeta = {
	code: LocaleCode;
	name: string;
	nativeName: string;
	hreflang: string;
	ogLocale: string;
	dir: 'ltr' | 'rtl';
	region: string;
};

/** US English only — site copy and routes. */
export const locales: LocaleMeta[] = [
	{
		code: 'en',
		name: 'English',
		nativeName: 'English',
		hreflang: 'en',
		ogLocale: 'en_US',
		dir: 'ltr',
		region: 'United States',
	},
];

/** Retired locale URL prefixes — worker 301s to English home. */
export const legacyLocaleCodes = [
	'es',
	'fr',
	'de',
	'pt',
	'it',
	'nl',
	'pl',
	'ru',
	'tr',
	'ar',
	'ja',
	'ko',
	'zh',
	'hi',
	'id',
	'th',
	'vi',
	'uk',
	'cs',
	'ro',
	'sv',
] as const;

export type LegacyLocaleCode = (typeof legacyLocaleCodes)[number];

export const defaultLocale: LocaleCode = 'en';

export const localeCodes = locales.map((l) => l.code);

export const localeMap = Object.fromEntries(locales.map((l) => [l.code, l])) as Record<
	LocaleCode,
	LocaleMeta
>;

export function isLocaleCode(value: string): value is LocaleCode {
	return localeCodes.includes(value as LocaleCode);
}

export function isLegacyLocaleCode(value: string): value is LegacyLocaleCode {
	return (legacyLocaleCodes as readonly string[]).includes(value);
}

export function getLocale(code: string): LocaleMeta | undefined {
	return isLocaleCode(code) ? localeMap[code] : undefined;
}

/** @deprecated English-only site — kept for type compatibility in generated catalogs. */
export const blogUi: Record<LocaleCode, { title: string; description: string }> = {
	en: {
		title: 'Destiny 2 Cheats Blog',
		description: 'Guides and updates for Destiny 2 cheats on PC.',
	},
};
