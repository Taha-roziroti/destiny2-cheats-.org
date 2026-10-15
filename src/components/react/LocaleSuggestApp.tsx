import I18nProvider from './I18nProvider';
import LocaleSuggest from './LocaleSuggest';
import type { TranslationCatalog } from '../../i18n/build-catalog';

type LocaleMeta = {
	code: string;
	name: string;
	nativeName: string;
	region: string;
};

type Props = {
	locale: string;
	catalog: TranslationCatalog;
	locales: LocaleMeta[];
	pageSlugs: Record<string, string>;
	defaultLocale?: string;
};

export default function LocaleSuggestApp(props: Props) {
	return (
		<I18nProvider locale={props.locale} catalog={props.catalog}>
			<LocaleSuggest
				currentLocale={props.locale}
				locales={props.locales}
				pageSlugs={props.pageSlugs}
				defaultLocale={props.defaultLocale}
			/>
		</I18nProvider>
	);
}
