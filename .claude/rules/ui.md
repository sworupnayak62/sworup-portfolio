---
paths:
  - "src/**/*.tsx"
  - "src/index.css"
---

# UI rules

- Stay in the night-market world: flat sign inks (awning blue, banner red, marigold), saffron as the only glow, brush display (`brush-type`), marker labels (`marker-type`), Bricolage Grotesque body. Mono only for real data (e.g. the EMR record).
- No eyebrows/kickers above headings, no gradient text, no glass cards, no neon-cyan.
- Every metric shown must trace to `portfolioData.ts` and carry where/when it came from.
- Interactive controls: real `<button>`/`<a>`, visible `:focus-visible` (saffron outline is global), `aria-*` state where it toggles.
- Canvas/animation work pauses offscreen and has a reduced-motion still state.
