import heroLcp from '../styles/hero-lcp.css?raw';

/** Hero + below-fold hints so the poster can paint before the Tailwind bundle parses. */
const belowFoldHints = `
main.page{content-visibility:auto;contain-intrinsic-size:0 2400px}
`.trim();

export const lcpPosterCriticalCss = `${heroLcp.trim()}\n${belowFoldHints}`;
