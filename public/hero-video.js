/**
 * Hero/banner background video — fade in when frames are ready.
 * External file required because production CSP is script-src 'self'.
 */
(function () {
	if (window.__heroVideoBound) return;
	window.__heroVideoBound = true;

	function initVideo(video) {
		if (!(video instanceof HTMLVideoElement) || video.dataset.heroBound === '1') return;
		video.dataset.heroBound = '1';

		video.muted = true;
		video.defaultMuted = true;
		video.playsInline = true;

		function markReady() {
			video.classList.add('is-ready');
		}

		function play() {
			var attempt = video.play();
			if (attempt && typeof attempt.catch === 'function') {
				attempt.catch(function () {});
			}
		}

		video.addEventListener('loadeddata', markReady);
		video.addEventListener('canplay', markReady);
		video.addEventListener('playing', markReady);
		if (video.readyState >= 2) markReady();

		video.addEventListener('loadeddata', play);
		video.addEventListener('canplay', play);
		video.addEventListener('canplaythrough', play);
		play();

		var tries = 0;
		var retry = window.setInterval(function () {
			if (video.paused && tries < 12) {
				play();
				tries += 1;
				return;
			}
			window.clearInterval(retry);
		}, 400);
	}

	function scan() {
		document.querySelectorAll('.hero__video, .banner__video').forEach(initVideo);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', scan);
	} else {
		scan();
	}
})();
