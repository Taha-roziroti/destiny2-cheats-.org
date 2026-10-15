import { useTranslation } from 'react-i18next';
import I18nProvider from './I18nProvider';
import { sitePaths as p } from '../../data/site-paths';
import type { TranslationCatalog } from '../../i18n/build-catalog';

type Props = { locale: string; catalog: TranslationCatalog };

const features = [
	{ key: 'home.featEsp', icon: '◉' },
	{ key: 'home.featAim', icon: '◎' },
	{ key: 'home.featRadar', icon: '◈' },
	{ key: 'home.featStream', icon: '◌' },
] as const;

function HomeAboutInner() {
	const { t } = useTranslation();
	return (
		<section className="home-about shell" aria-labelledby="home-about-title">
			<header className="home-about__head">
				<h2 id="home-about-title" className="home-about__section-title">
					{t('home.aboutEyebrow')}
				</h2>
				<p className="home-about__section-sub">{t('home.aboutTitle')}</p>
				<p className="home-about__lede">{t('home.aboutLede')}</p>
			</header>
			<ul className="home-about__features" aria-label={t('home.featuresAria')}>
				{features.map((item) => (
					<li key={item.key}>
						<span className="home-about__feat-icon" aria-hidden="true">{item.icon}</span>
						<span>{t(item.key)}</span>
					</li>
				))}
			</ul>
			<div className="home-about__actions">
				<a className="home-about__cta" href={p.pricing}>{t('home.ctaPlans')}</a>
				<a className="home-about__cta home-about__cta--ghost" href={p.updates}>
					{t('home.ctaStatus')}
				</a>
			</div>
		</section>
	);
}

export default function HomeAboutApp(props: Props) {
	return (
		<I18nProvider locale={props.locale} catalog={props.catalog}>
			<HomeAboutInner />
		</I18nProvider>
	);
}
