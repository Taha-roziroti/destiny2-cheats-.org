// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { brandStudioPlugin } from './scripts/brand-studio/vite-plugin.mjs';

// Static Cloudflare Pages site — no deployment adapter.
// Do not add @astrojs/cloudflare; sitemaps and HTML must emit to dist/ root.
// https://astro.build/config
export default defineConfig({
	site: 'https://destiny2cheats.org',
	trailingSlash: 'always',
	compressHTML: true,
	prefetch: {
		prefetchAll: false,
		defaultStrategy: 'viewport',
	},
	devToolbar: { enabled: false },
	server: {
		// Bind IPv4 + IPv6 so localhost/port-forwarding works (not ::1-only).
		host: true,
		port: 4321,
	},
	integrations: [react()],
	build: {
		// 'auto' keeps small styles inline but emits the large Tailwind bundle as a
		// cached external file — 'always' inflated HTML to ~160KB and tanked the
		// text/HTML ratio that SEO checkers score.
		// Inline component CSS to cut render-blocking requests (Lighthouse perf).
		inlineStylesheets: 'always',
		format: 'directory',
	},
	vite: {
		server: {
			// Allow Cloud Agent port forwards and public dev tunnels (loca.lt, trycloudflare.com).
			allowedHosts: true,
		},
		plugins: [tailwindcss(), brandStudioPlugin()],
		build: {
			cssMinify: true,
			minify: 'terser',
			assetsInlineLimit: 4096,
			target: 'es2022',
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
							return 'react';
						}
						if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
							return 'i18n';
						}
					},
				},
			},
		},
	},
});
