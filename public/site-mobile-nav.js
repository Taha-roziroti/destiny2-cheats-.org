/**
 * Mobile nav toggle — external file required because production CSP is script-src 'self'
 * (inline scripts in HTML are blocked).
 */
(function () {
	if (window.__siteMobileNavBound) return;
	window.__siteMobileNavBound = true;

	var bodyOverflow = '';

	function getParts(header) {
		return {
			header: header,
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
		mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
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

	function handleToggle(event) {
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
	}

	document.addEventListener('click', handleToggle, true);
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') closeAll();
	});
})();
