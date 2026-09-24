import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import I18nProvider from './I18nProvider';
import LanguageSwitcher, { type LocaleMeta } from './LanguageSwitcher';
import { affiliateLinkRel } from '../../data/affiliate';

type NavLink = {
	id: string;
	labelKey: string;
	edit?: string;
	href: string;
};

type Props = {
	locale: string;
	siteName?: string;
	checkoutUrl: string;
	currentPath: string;
	homeHref: string;
	reviewsBasePath: string;
	locales: LocaleMeta[];
	hrefForLocale: Record<string, string>;
	links: NavLink[];
	affiliateShortLabel: string;
};

function NavbarInner({
	locale,
	siteName,
	checkoutUrl,
	currentPath,
	homeHref,
	reviewsBasePath,
	locales,
	hrefForLocale,
	links,
	affiliateShortLabel,
}: Props) {
	const { t } = useTranslation();
	const [scrolled, setScrolled] = useState(false);

	const isActive = (href: string) => {
		if (href === '/') return currentPath === '/' || currentPath === `/${locale}/`;
		if (href === reviewsBasePath) return currentPath === href || currentPath.startsWith(href);
		return currentPath === href || currentPath.startsWith(href);
	};

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const navLinks = useMemo(
		() =>
			links.map((item) => ({
				...item,
				label: t(item.labelKey),
				active: isActive(item.href),
			})),
		[links, t, currentPath, locale, reviewsBasePath],
	);

	const renderNavLink = (item: (typeof navLinks)[number]) => (
		<a
			key={item.id}
			href={item.href}
			className={item.active ? 'is-active' : undefined}
			aria-current={item.active ? 'page' : undefined}
		>
			<span data-edit={item.edit}>{item.label}</span>
		</a>
	);

	return (
		<header className={`site-header${scrolled ? ' is-scrolled' : ''}`} data-nav>
			<div className="shell site-header__bar">
				<a href={homeHref} className="site-header__brand">
					{siteName ?? 'Home'}
				</a>

				<nav className="site-nav site-nav--desktop" aria-label={t('nav.primaryAria')}>
					{navLinks.map((item) => renderNavLink(item))}
				</nav>

				<div className="site-tools">
					<div className="site-tools__lang">
						<LanguageSwitcher
							currentLocale={locale}
							locales={locales}
							hrefForLocale={hrefForLocale}
						/>
					</div>
					<a
						href={checkoutUrl}
						className="site-tools__buy"
						rel={affiliateLinkRel}
						aria-label={`${t('cta.buyShort')} (${affiliateShortLabel})`}
					>
						<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M4.5 6.5h2.1l1.2 9.2h9.4l1.8-6.6H8.1M9.2 19.2a.9.9 0 100-1.8.9.9 0 000 1.8zm7.4 0a.9.9 0 100-1.8.9.9 0 000 1.8z"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span data-edit="ctaBuyShort">{t('cta.buyShort')}</span>
					</a>
					<button
						type="button"
						className="site-nav-toggle"
						aria-expanded={false}
						aria-controls="site-mobile-nav"
						aria-label={t('nav.openMenu')}
						data-open-label={t('nav.openMenu')}
						data-close-label={t('nav.closeMenu')}
					>
						<svg className="site-nav-toggle__menu" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
						</svg>
						<svg className="site-nav-toggle__close" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M6 6l12 12M18 6L6 18"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</div>
			</div>

			<button
				type="button"
				className="site-nav-backdrop"
				tabIndex={-1}
				aria-label={t('nav.closeMenu')}
			/>

			<nav
				id="site-mobile-nav"
				className="site-nav site-nav--mobile"
				aria-label={t('nav.mobileAria')}
				aria-hidden={true}
				inert=""
			>
				{navLinks.map((item) => renderNavLink(item))}
				<div className="site-nav--mobile__tools">
					<LanguageSwitcher
						currentLocale={locale}
						locales={locales}
						hrefForLocale={hrefForLocale}
					/>
					<a
						href={checkoutUrl}
						className="site-nav--mobile__buy"
						rel={affiliateLinkRel}
						aria-label={`${t('cta.buyShort')} (${affiliateShortLabel})`}
					>
						{t('cta.buyShort')}
					</a>
				</div>
			</nav>
		</header>
	);
}

export default function NavbarApp(props: Props) {
	return (
		<I18nProvider locale={props.locale}>
			<NavbarInner {...props} />
		</I18nProvider>
	);
}
