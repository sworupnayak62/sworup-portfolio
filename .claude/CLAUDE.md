# Sworup Ranjan Nayak portfolio

One-page personal portfolio. React 18 + TypeScript + Vite 6 + Tailwind 3, deployed on Netlify (`netlify.toml`, publishes `dist/`).

## Layout
- `src/App.tsx`: page shell; Ctrl/Cmd+K opens the finder.
- `src/components/`: one file per section. Order: `Hero` (hanging gate sign + flip door sign, role line, CTAs on the left; `FoodCart` SVG street cart on the right with the specials chalkboard as its menu board; doormat at the bottom; once-per-session rolling shutter; no metrics here, they live in Stalls), `Stalls` (projects; `cooking: true` on a frontage adds the "On the stove now" tag and the "Tonight's special" link, currently the data-entry agent), `Kitchen` (scripted pipeline demo on a thermal kitchen-order ticket; `Wok` tosses faster while cooking; on fine pointers the rack utensils can be taken down as the page cursor via `html.holding-utensil` + `--held-cursor`), `MenuBoard` (skills), `Workshop` (experience + education), `Bill` (guest check built from `portfolioData.ts`, resume metrics as prices, + Download CV and the tip card; the only CV button on the page), `Counter` (contact + Order-to-go mailto tickets). `AskDrawer` is the scripted Q&A, opened from the rail/bottom bar or the boiling `OrderPot` button bottom-right (desktop only; phones use the bottom bar's Ask tab) (section-aware starters via `useActiveDistrict`). `MarketMap` is the nav (desktop rail, phone bottom bar); `CommandPalette` is the finder.
- `src/data/portfolioData.ts`: all resume content. `src/data/agentEngine.ts`: keyword-matched answers for the counter guide.
- `src/utils/audioSynthesis.ts`: Web Audio sounds (muted by default). `src/utils/useLit.ts`: one-shot in-view hook. `src/utils/useDialog.ts`: Esc / focus trap / focus restore for the drawer and Ctrl+K.
- `public/`: authored SVG textures (`brush.svg` mask, `grain.svg`, `bulb.svg` favicon, `cursor.svg` spatula + `cursor-ladle.svg` for clickables) and `Sworup_Ranjan_Nayak_CV.pdf` (the downloadable CV; `CV_URL` in `Bill.tsx`).
- Design: `PRODUCT.md` (product truth), `DESIGN.md` (visual system), `.impeccable/surfaces/src-app-tsx.md` (direction contract).

## Commands
- `npm run dev` (port 5173; `.claude/launch.json` has a `portfolio` preview config)
- `npm run build` (tsc + vite)
- `npm test` (bundles `agentEngine.ts` with esbuild and runs `scripts/engine.test.mjs`: every question, chip and jump link must resolve)

## Gotchas
- The counter guide is NOT an LLM. Matching is whole-word; when adding keywords run `npm test` (ties go to the earlier topic; broad topics use a lower `weight`).
- Never describe the guide with RAG/vector/LangChain/latency claims.
- Only resume-backed metrics may be shown as numbers; don't invent claims (reply times, clients, testimonials).
- Brush buttons/boards use `.brushed` (CSS mask from `/brush.svg`); the outline button uses `/brush-outline.svg` as its background.
- Motion must respect `prefers-reduced-motion` (global override in `index.css`; `BulbString` draws one still frame).
- `App.tsx` sets `data-offscreen` on sections out of view; CSS pauses their animations. Hung `.sway` signs swing twice and settle; the order pot only simmers until hovered.
- The CV PDF is exported from his LaTeX source; replace `public/Sworup_Ranjan_Nayak_CV.pdf` when it changes (keep the filename).
- `index.html` keeps a script that hides the Netlify badge; leave it.
