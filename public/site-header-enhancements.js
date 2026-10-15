/**
 * Header scroll state + locale cookie on language switch (CSP: external script only).
 */
(function () {
	if (window.__siteHeaderEnhancementsBound) return;
	window.__siteHeaderEnhancementsBound = true;

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
})();
