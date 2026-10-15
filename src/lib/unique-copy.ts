/** Normalize heading / anchor text for duplicate checks. */
export function normCopy(text: string): string {
	return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Ensure section H2s and gallery title do not repeat the page H1 or each other. */
export function uniquifyPageHeadings(
	pageH1: string,
	galleryTitle: string,
	sections: { h2: string }[],
	fallbackGalleryTitle: string,
): { galleryTitle: string; sections: { h2: string }[] } {
	const used = new Set<string>([normCopy(pageH1)]);

	let gallery = galleryTitle.trim();
	if (!gallery || used.has(normCopy(gallery))) {
		gallery = fallbackGalleryTitle.trim();
	}
	if (used.has(normCopy(gallery))) {
		gallery = `${fallbackGalleryTitle.trim()} — screenshots`;
	}
	used.add(normCopy(gallery));

	const nextSections = sections.map((section, index) => {
		let h2 = section.h2.trim();
		const key = normCopy(h2);
		if (!h2 || used.has(key)) {
			h2 = `${pageH1.trim()} — part ${index + 1}`;
			while (used.has(normCopy(h2))) {
				h2 = `${pageH1.trim()} — section ${index + 1}`;
			}
		}
		used.add(normCopy(h2));
		return { ...section, h2 };
	});

	return { galleryTitle: gallery, sections: nextSections };
}
