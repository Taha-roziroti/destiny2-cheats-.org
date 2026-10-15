import { useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { hydrateI18n } from '../../i18n.js';
import type { TranslationCatalog } from '../../i18n/build-catalog';

type Props = {
	locale: string;
	catalog: TranslationCatalog;
	children: ReactNode;
};

/** Syncs react-i18next with the Astro page locale (URL is source of truth for SEO). */
export default function I18nProvider({ locale, catalog, children }: Props) {
	hydrateI18n(locale, catalog);

	useEffect(() => {
		hydrateI18n(locale, catalog);
	}, [locale, catalog]);

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
