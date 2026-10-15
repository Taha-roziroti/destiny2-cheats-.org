/**
 * Optional locale banner for EN pages — no React/i18n bundle (Lighthouse + CSP).
 */
(function () {
	if (window.__localeSuggestBound) return;
	window.__localeSuggestBound = true;

	function run() {
		var mount = document.getElementById('locale-suggest-mount');
		if (!mount || mount.hidden) return;

		var defaultLocale = mount.getAttribute('data-default-locale') || 'en';
		var current = mount.getAttribute('data-current-locale') || defaultLocale;
		if (current !== defaultLocale) return;
		if (sessionStorage.getItem('fc_locale_dismissed')) return;

		var locales = [];
		var pageSlugs = {};
		try {
			locales = JSON.parse(mount.getAttribute('data-locales') || '[]');
			pageSlugs = JSON.parse(mount.getAttribute('data-page-slugs') || '{}');
		} catch {
			return;
		}

		function detectPreferred() {
			var cookie = document.cookie.match(/(?:^|;\s*)fc_locale=([^;]+)/);
			if (cookie && locales.some(function (l) { return l.code === cookie[1]; })) return cookie[1];

			var langs = navigator.languages && navigator.languages.length
				? navigator.languages
				: [navigator.language];
			for (var i = 0; i < langs.length; i++) {
				var primary = String(langs[i]).toLowerCase().split('-')[0];
				if (locales.some(function (l) { return l.code === primary; })) return primary;
			}
			return defaultLocale;
		}

		var preferred = detectPreferred();
		if (preferred === defaultLocale) return;

		var target = locales.find(function (l) { return l.code === preferred; });
		if (!target) return;

		var slug = pageSlugs[preferred];
		var href = slug ? '/' + preferred + '/' + slug + '/' : '/' + preferred + '/';

		var strings = {};
		try {
			strings = JSON.parse(mount.getAttribute('data-strings') || '{}');
		} catch {
			return;
		}

		var lead = (strings.lead || '')
			.replace('{{nativeName}}', target.nativeName)
			.replace('{{region}}', target.region);

		var bar = document.createElement('div');
		bar.className = 'locale-suggest';
		bar.setAttribute('role', 'region');
		bar.setAttribute('aria-label', strings.regionAria || 'Language suggestion');

		var text = document.createElement('p');
		text.className = 'locale-suggest__text';
		text.textContent = lead + ' ';

		var link = document.createElement('a');
		link.href = href;
		link.textContent = (strings.version || '').replace('{{name}}', target.name);
		link.addEventListener('click', function () {
			document.cookie = 'fc_locale=' + target.code + ';path=/;max-age=31536000;SameSite=Lax';
		});
		text.appendChild(link);

		var dismiss = document.createElement('button');
		dismiss.type = 'button';
		dismiss.className = 'locale-suggest__dismiss';
		dismiss.setAttribute('aria-label', strings.dismiss || 'Dismiss');
		dismiss.textContent = '×';
		dismiss.addEventListener('click', function () {
			sessionStorage.setItem('fc_locale_dismissed', '1');
			bar.remove();
		});

		bar.appendChild(text);
		bar.appendChild(dismiss);
		mount.replaceWith(bar);
	}

	function schedule() {
		if (typeof window.requestIdleCallback === 'function') {
			window.requestIdleCallback(run, { timeout: 4000 });
		} else {
			window.setTimeout(run, 500);
		}
	}

	if (document.readyState === 'complete') schedule();
	else window.addEventListener('load', schedule, { once: true });
})();
