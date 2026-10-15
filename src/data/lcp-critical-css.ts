/** Tiny rules so the hero poster can paint before the full Tailwind bundle parses. */
export const lcpPosterCriticalCss = `
.hero{position:relative;isolation:isolate;display:grid;overflow:hidden;background:#0D0A14;width:100%;aspect-ratio:3.15/1}
.hero__media{position:absolute;inset:0;z-index:0;overflow:hidden}
.hero__media picture,.hero__media picture img,.hero__poster{display:block;width:100%;height:100%;object-fit:cover;object-position:right 28%;transform:translateZ(0)}
.hero__video{position:absolute;inset:0;opacity:0;pointer-events:none}
@media (max-width:900px){
.hero{aspect-ratio:auto;display:block;overflow:hidden;min-height:clamp(15rem,48svh,22rem)}
.hero__media img,.hero__poster{object-fit:cover;object-position:78% 10%}
.hero__content{min-height:clamp(15rem,48svh,22rem);display:flex;align-items:flex-end;box-sizing:border-box}
}
`.trim();
