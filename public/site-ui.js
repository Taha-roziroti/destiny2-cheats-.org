/**
 * Site UI bootstrap: mobile nav + header scroll + locale cookie (CSP: script-src 'self').
 */
(function () {
	if (window.__siteUiBound) return;
	window.__siteUiBound = true;

	/* --- locale cookie on language switch --- */
	document.addEventListener(
		'click',
		function (event) {
			var target = event.target;
			if (!target || !target.closest) return;
			var link = target.closest('.lang-switcher__link[data-locale]');
			if (!link) return;
			var code = link.getAttribute('data-locale');
			if (code) {
				document.cookie = 'fc_locale=' + code + ';path=/;max-age=31536000;SameSite=Lax';
			}
		},
		true,
	);

	/* --- desktop header scroll state --- */
	function bindScroll() {
		if (window.matchMedia('(max-width: 900px)').matches) return;
		document.querySelectorAll('[data-nav]').forEach(function (header) {
			if (header.dataset.scrollBound === '1') return;
			header.dataset.scrollBound = '1';
			var ticking = false;
			var onScroll = function () {
				if (ticking) return;
				ticking = true;
				window.requestAnimationFrame(function () {
					header.classList.toggle('is-scrolled', window.scrollY > 8);
					ticking = false;
				});
			};
			window.addEventListener('scroll', onScroll, { passive: true });
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', bindScroll);
	} else {
		bindScroll();
	}

	/* --- mobile nav --- */
	var bodyOverflow = '';

	function getParts(header) {
		return {
			toggle: header.querySelector('.site-nav-toggle'),
			backdrop: header.querySelector('.site-nav-backdrop'),
			mobileNav: header.querySelector('#site-mobile-nav'),
		};
	}

	function isOpen(toggle) {
		return toggle.getAttribute('aria-expanded') === 'true';
	}

	function setOpen(header, open) {
		var parts = getParts(header);
		var toggle = parts.toggle;
		var backdrop = parts.backdrop;
		var mobileNav = parts.mobileNav;
		if (!toggle || !backdrop || !mobileNav) return;

		var openLabel = toggle.getAttribute('data-open-label') || 'Open menu';
		var closeLabel = toggle.getAttribute('data-close-label') || 'Close menu';

		toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		toggle.setAttribute('aria-label', open ? closeLabel : openLabel);
		backdrop.classList.toggle('is-visible', open);
		mobileNav.classList.toggle('is-open', open);
		header.classList.toggle('is-menu-open', open);
		backdrop.tabIndex = open ? 0 : -1;

		if (open) {
			mobileNav.removeAttribute('inert');
			bodyOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
		} else {
			mobileNav.setAttribute('inert', '');
			document.body.style.overflow = bodyOverflow;
		}
	}

	function closeAll() {
		document.querySelectorAll('[data-nav]').forEach(function (header) {
			var toggle = header.querySelector('.site-nav-toggle');
			if (toggle && isOpen(toggle)) setOpen(header, false);
		});
	}

	document.addEventListener('click', function (event) {
		var target = event.target;
		if (!target || !target.closest) return;

		var toggle = target.closest('.site-nav-toggle');
		if (toggle) {
			var header = toggle.closest('[data-nav]');
			if (header) {
				event.preventDefault();
				setOpen(header, !isOpen(toggle));
			}
			return;
		}

		if (target.closest('.site-nav-backdrop')) {
			closeAll();
			return;
		}

		var mobileLink = target.closest('#site-mobile-nav a[href]');
		if (mobileLink) {
			var navHeader = mobileLink.closest('[data-nav]');
			if (navHeader) setOpen(navHeader, false);
		}
	}, true);

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') closeAll();
	});
})();
