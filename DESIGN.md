---
name: Sworup Ranjan Nayak
description: A one-page engineering portfolio built as a night market at dusk.
colors:
  asphalt: "#0d0e11"
  asphalt-2: "#15171c"
  asphalt-3: "#1e2027"
  saffron: "#f7b32b"
  saffron-hot: "#ffd46b"
  awning-blue: "#2446a8"
  banner-red: "#c7372b"
  marigold: "#e2721b"
  steam: "#efe9df"
  steam-dim: "#bdb5a8"
  kraft: "#caa66c"
  ink: "#17130d"
typography:
  display:
    fontFamily: "Caveat Brush, cursive"
    fontSize: "clamp(4.2rem, 11.5vw, 9.25rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Caveat Brush, cursive"
    fontSize: "clamp(3.2rem, 7vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Caveat Brush, cursive"
    fontSize: "2.35rem"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Permanent Marker, cursive"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.01em"
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.625
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  sm: "2px"
  md: "4px"
  full: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter: "32px"
  section: "96px"
  section-lg: "128px"
  container: "1240px"
  rail: "208px"
components:
  button-glow:
    backgroundColor: "{colors.saffron}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "16px 30px 17px"
  button-glow-hover:
    backgroundColor: "{colors.saffron-hot}"
  button-awning:
    textColor: "{colors.steam}"
    typography: "{typography.label}"
    padding: "16px 30px 17px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.saffron-hot}"
    typography: "{typography.label}"
    padding: "16px 30px 17px"
  marker-card:
    backgroundColor: "{colors.kraft}"
    textColor: "{colors.ink}"
    padding: "12px 16px"
    width: "11.5rem"
  board:
    backgroundColor: "{colors.asphalt-2}"
    textColor: "{colors.steam}"
    padding: "8px 28px 24px"
  sign-plate:
    backgroundColor: "{colors.awning-blue}"
    textColor: "{colors.steam}"
    typography: "{typography.title}"
    padding: "12px 24px 16px"
  chip-tech:
    backgroundColor: "{colors.asphalt-3}"
    textColor: "{colors.steam-dim}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  toggle-order:
    backgroundColor: "{colors.saffron}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
---

# Design System: Sworup Ranjan Nayak

## Overview

**Creative North Star: "The Night-Market Sign River"**

The site is a street market at dusk. The ground is wet asphalt with grain on it. The only light comes from saffron bulbs strung across the top and down the left rail, and the bulbs light up as the visitor walks past. Everything else is paint: flat sign inks on rough, brush-edged boards, kraft price tags hanging on strings, and striped awnings with scalloped hems over each stall. The mood is warm and busy but still readable. Signs carry the personality and the body copy stays plain.

Nothing is glossy. There is no glass, no gradient text and no neon on black. Depth comes from boards casting soft shadows on the asphalt and from signs hanging off a top pivot. The motion follows the same logic: signs swing and settle, cards sway on their strings, steam drifts up, and bulbs flicker on. With reduced motion everything is shown lit and still.

The layout reads as a street. A fixed market-map rail on the left shows the current district, and the sections are laid out along the page as stalls, a kitchen, a menu board, a workshop ledger and finally the counter.

**Key Characteristics:**
- Grain-textured asphalt ground; saffron is the only emitted light.
- Flat sign inks (awning blue, banner red, marigold) used as painted planes, never as glows or gradients.
- Brush-edged silhouettes come from an authored SVG mask, not from border-radius.
- Brush lettering for names and headings, marker for labels and numbers, a plain grotesque for reading, mono only for real data.
- Objects hang: signs and cards pivot from the top and sway.

## Colors

The palette is a dark, slightly blue-black ground with warm paper whites, one light source and three flat sign inks.

### Primary
- **Bulb Saffron** (saffron): the single light color. It is used for lit bulbs, the primary "Email" button, section headings on asphalt, the active district in the map, house-special skills, the focus ring and text selection. It also floods the whole contact section, where the counter is lit.
- **Filament Gold** (saffron-hot): the brighter core of the bulb. It is used for fully lit bulbs, the hover state of the saffron button, and the ink button's lettering.

### Secondary
- **Awning Blue** (awning-blue): the default awning stripe and sign plate, the outline button's hover fill, the visitor's chat bubbles, and the ground of the kitchen section. The kitchen derives darker navy shades from it for step rows, the unselected order toggle and the EMR panel.
- **Banner Red** (banner-red): red awnings and sign plates, the dry-brush stroke under the hero role line, and the big numbers on marker cards.

### Tertiary
- **Marigold** (marigold): the third awning stripe and sign plate. It is a mid-value ink, so text on it needs care (see Named Rules).

### Neutral
- **Wet Asphalt** (asphalt): the page ground, always under `grain.svg`.
- **Stall Shade** (asphalt-2): the board surface for stalls and the menu.
- **Counter Top** (asphalt-3): tech chips, assistant chat bubbles and mobile tool buttons.
- **Steam** (steam): primary text on dark grounds, and the paper of the kitchen order ticket.
- **Dim Steam** (steam-dim): secondary text, meta lines and inactive navigation.
- **Kraft** (kraft): the price-tag card stock, with grain and a faint vertical fibre stripe.
- **Sign Ink** (ink): text on saffron, kraft and steam paper, and the ink button's ground.
- **Supporting wire browns**: hanging strings (#6b5a40), map wire and menu rules (#4a4032), the menu frame (#2a2219) and the tertiary muted text (#8f887c). These recur, but they only appear inside components.

### Named Rules
**The One Light Rule.** Saffron is the only color that glows. Only saffron and filament gold may carry a `box-shadow` or `drop-shadow` glow or a radial light pool. The sign inks stay flat. Fire is the one exception: burner, wok and pot flames may use a flame gradient.

**The Painted Plane Rule.** Awning blue, banner red and marigold always fill a whole plane: a sign plate, an awning stripe, a section ground or a brush stroke. They are never used as thin text accents or borders on asphalt.

**The Legible Sign Rule.** Steam lettering is allowed on awning blue and banner red. On marigold and kraft, lettering must be ink. Marigold cannot hold steam text at a readable contrast (about 2.6:1).

## Typography

**Display Font:** Caveat Brush (cursive fallback)
**Label Font:** Permanent Marker (cursive fallback)
**Body Font:** Bricolage Grotesque (system-ui, sans-serif fallback; variable opsz 12–96, wght 400–800)
**Data Font:** JetBrains Mono (ui-monospace fallback; 400 and 600)

**Character:** The two hand-lettered faces are the sign painter's brush and marker, and they carry the voice. The grotesque body is plain on purpose, like printed matter under the signs.

### Hierarchy
- **Display** (400, clamp(3.5rem, 6.6vw, 7rem), 0.92): the gate sign, which is the name in the hero, set on two lines. A smaller variant (clamp(3.6rem, 8.5vw, 7rem)) is used for the contact heading.
- **Headline** (400, clamp(3.2rem, 7vw, 5.5rem), 0.92): section headings ("The stalls", "The menu"), in saffron on asphalt or steam on blue.
- **Title** (400, 2–3rem, 0.95): stall sign plates, role and degree plates, and the rail wordmark (2.6rem).
- **Label** (Permanent Marker 400, 0.9–1.5rem, 0.01em): button text, marker-card numbers and captions, map district names, dates, skill levels, menu category heads and ledger toggles. Numbers on marker cards go up to 2.6rem in banner red.
- **Body** (400, 1.05–1.25rem, relaxed ~1.625): reading copy. Paragraphs are capped at about 34rem in the hero and at 60ch in stalls. Secondary lines drop to 0.8–0.95rem in steam-dim.
- **Data** (400, 0.7–0.85rem): the structured EMR record, the skills-used line, and `kbd` hints. Nothing else.

### Named Rules
**The Real-Data Mono Rule.** Mono is only for machine output and key hints. Never use it for decoration, labels or headings.

**The Sentence-Case Sign Rule.** Brush and marker lettering is set in sentence or title case at natural tracking. The faces already carry the character, so no uppercase tracking is added.

## Layout

The page is one scrolling street. On desktop (`lg`, 1024px and up) a fixed 208px market-map rail sits on the left and the content is offset by it. Below `lg` the rail becomes a fixed bottom sign bar (icon, bulb and marker label per district) plus two round tool buttons in the top right.

Content sits in a 1240px container with 16px gutters on mobile and 32px from `sm` up. Sections are spaced 96px apart vertically (128px at `lg`). Section grounds change color at story beats: the kitchen is awning blue and the counter is saffron. Everything else is asphalt.

Grids are 12 columns at `lg`. The stalls use a 6-column street where wide and narrow frontages alternate (4+2, 3+3, 4+2) with a 28px column gap and 64px row gap, so the stalls do not form a uniform card grid. The hero splits 7/5: the gate sign, role line and actions on the left, and a street-food cart on the right whose menu board is the specials chalkboard. A doormat sits centered at the bottom, and the whole hero fits one screen at 1440×900 and 1920×950. The hero shows no metrics; those live on the stall frontages. On phones everything stacks, with the cart after the actions.

## Elevation & Depth

Depth is physical rather than tonal. Boards and paper cast soft, low, dark shadows onto the asphalt as if lit from above. The only other depth cue is emitted light, and it always belongs to saffron.

### Shadow Vocabulary
- **Board cast** (`box-shadow: 0 18px 40px -18px rgba(0,0,0,0.9)`): painted sign boards (stalls, menu).
- **Tag cast** (`box-shadow: 0 10px 22px -8px rgba(0,0,0,0.7)`): kraft marker cards.
- **Ticket cast** (`box-shadow: 0 20px 40px -18px rgba(0,0,0,0.8)`): the steam-paper order ticket.
- **Button bloom** (`filter: drop-shadow(0 6px 18px rgba(247,179,43,0.28))`, hover `0 10px 26px / 0.45`): the saffron button only.
- **Bulb glow** (`0 0 10px 2px rgba(247,179,43,0.65), 0 0 28px 6px rgba(247,179,43,0.22)`): lit bulbs. The warm, dimmer state is `0 0 6px 1px / 0.3`.
- **Light pool**: a radial saffron wash (0.13 alpha) under the hero bulb string.

### Named Rules
**The Hanging Rule.** Signs and cards hang from a top pivot (`transform-origin: top center`), often at a slight fixed tilt (−3° to 2.5°). They enter with a damped swing (1.6s, ease-out `cubic-bezier(0.16,1,0.3,1)`) and may sway at ±1.6° on long loops of 5.5–7s. They never slide in from the side or fade up.

## Shapes

Silhouettes are painted, not geometric. Sign plates and primary buttons use the authored `brush.svg` mask for rough, dry-brush edges. The outline button is an authored `brush-outline.svg` stroke. Awnings are repeating 2.25rem stripes with a scalloped hem cut by a radial mask. Kraft cards and paper tickets are sharp-cornered rectangles that are tilted rather than rounded. Radius is kept for small functional controls only: 2px on chips, toggles, chat bubbles and palette rows, 4px on the focus ring and `kbd`, and full circles for bulbs, pins and mobile tool buttons. Dashed and dotted rules in wire brown make the menu's price leaders.

## Components

### Buttons
Painted signs you can press. All three share Permanent Marker at 1.15rem and 1rem/1.9rem padding. They lift 2px and tilt about 1° on hover, and press down to `translateY(1px) scale(0.98)`.
- **Saffron glow (primary):** saffron plane with a brush mask, ink lettering and the button bloom. Hover changes it to filament gold with a stronger bloom.
- **Awning outline:** a painted brush-stroke outline with steam lettering. Hover fills it with awning blue at 55%.
- **Ink:** a sign-ink plane with a brush mask and filament-gold lettering, used on the saffron counter ground. Hover goes to pure black.
- **Quiet text actions:** body-weight text with a small icon. On asphalt they are steam-dim and turn saffron on hover. On saffron they get an ink/10% wash.

### Chips
- **Tech chip:** Counter Top ground, steam-dim text at 0.8rem, 2px radius, 4px/10px padding. Not interactive.
- **Prompt chip:** a 15% white hairline border with steam-dim text at 0.75rem. Hover turns the border and text saffron.

### Cards / Containers
- **Marker card (price tag):** kraft stock with grain and fibre stripe, the tag cast shadow and square corners. It hangs on a wire-brown string with a pin, at a slight tilt. Content is a big banner-red marker number, a marker caption, and a hairline-separated body line that says where and when (#3a2c18). Every number carries its source.
- **Board:** the Stall Shade surface with grain and the board cast shadow. The menu version adds a 10px dark-wood frame (#2a2219).
- **Stall:** an awning (tone blue, red or gold), then a row of bulbs, then a board with a hanging brushed sign plate as its heading. On hover the awning lifts and stretches, the sign tilts −1.5°, and a chase of light runs along the bulbs.

### Inputs / Fields
- **Style:** transparent field on its container with no stroke. Separation comes from a 10% white top rule. Placeholder is #8f887c. On the saffron palette the input uses marker lettering in ink.
- **Focus:** the global saffron outline (3px, 3px offset, 4px radius).
- **Disabled:** the submit button drops to 40% opacity.

### Navigation
- **Market map rail:** the brush wordmark in saffron, then an ordered list of districts hung on a vertical wire. Each district has a bulb (warm when idle, fully on when current), a marker name and a small plain descriptor. The current district is saffron, marked with `aria-current="location"`. Jumping between districts sends a chase of light along the wire.
- **Phone sign bar:** fixed to the bottom with a backdrop blur over asphalt at 95%. It shows icon, bulb dot and marker label per district, with saffron marking the active one.
- **Find palette (Ctrl K):** a saffron sheet with ink marker input. The selected row inverts to ink with saffron text.

### Bulb String (signature)
A verlet rope of bulbs sags across the top of the hero. The bulbs light one by one with a flicker and sway away from the pointer. Bulbs are 0.7×0.85rem teardrops in three states: off (#3b3326), warm, and on. The same bulb element is reused under awnings and in the map, so the light always looks like the same string.

### Hero Shopfront
- **Gate sign:** the name on an awning-blue brushed board hanging from the bulb wire on two ropes. It swings in on load and leans up to ±1.5° toward the pointer.
- **Flip door sign:** a kraft "Open for work" tag hanging off the gate sign. It starts on a banner-red "Closed" face and flips over in 3D once the shop is up; clicking it flips back to "…kidding, still open" for about a second.
- **Food cart (`FoodCart`):** an authored SVG street cart. It has a banner-red and steam striped canopy fanned in perspective over a wooden ridge, with a scalloped valance and a sagging bulb string whose saffron glows flicker. The menu board hangs between two wooden poles: an A-frame-style chalkboard (#1d2622 with faint chalk smudges, 6px kraft-brown frame) listing what he builds, with drawn sparkle bullets. On the counter are a steaming kadhai of curry, stacked bowls and three spice jars. Below is an awning-blue cart body painted "Sworup's · agents · pipelines · clinical UI" on two spoked wheels. No employer or dates appear in the hero.
- **Doormat:** a coir mat (#a67c45 with fibre stripes, tilted back in perspective) reading "Welcome · wipe your feet, then walk the stalls". It scrolls to the stalls and squashes on hover.
- **Rolling shutter:** on the first visit of a browser session, a ribbed metal shutter painted "Opening up…" rolls up over the hero, under the bulbs. It is skipped under reduced motion.

### Order Pot and Cursor
- **Order pot:** a fixed button in the bottom-right corner (above the phone bar) that opens the order screen. It is a banner-red pot with an awning-blue lid over a small flame: the lid chatters and lifts every few seconds with side puffs, smoke curls up, and froth and bubbles spill over. Hover boils it harder and shows an "Ask the counter" kraft tag on desktop.
- **Cursor:** a steel spatula (`/cursor.svg`); over anything clickable, a wooden ladle of saffron curry (`/cursor-ladle.svg`). Text fields keep the text caret.

### Order Screen (Ask the counter)
The scripted Q&A as a POS order screen: a side drawer on desktop, a bottom sheet on phones. Answers print as receipt slips on #f4efe4 paper with a zigzag torn edge (order number, time, "1 × question", the answer, a jump link, a banner-red "Served" stamp). Questions sit on 2×2 menu tiles in awning, banner, marigold and counter-top inks, with a "Custom order" field. It is labelled as scripted, with no AI model.

### The Bill (CV download)
A dark leather check folder (#3a2616, dashed stitched edge) tilted −1.5° on the asphalt, holding a receipt-paper guest check with a zigzag torn edge. Each line is built from `portfolioData.ts`: both roles with dates, project count, tool count, degree and CGPA. The total reads "3 years of production software", and a banner-red "Open for work" stamp thumps on once it has printed. Two wrapped mints sit on the tray. The primary action is "Download CV" (saffron glow button). The same label appears in the hero as the outline button and in the Ctrl K finder.

### Motion Budget
Hung signs sway twice and settle. The order pot only simmers (steam) at rest and boils on hover or focus. Any section off screen has its CSS animation paused.

### Kitchen Replay
The blue kitchen has a faint 56px tile grid, a steel utensil rack top right (ladle, spatula, pan, whisk swaying on hooks, faster while cooking) and a wok by the heading that tosses its stir-fry faster while an order cooks. The ticket hangs from a steel rail with a clip. Each step has a burner that flames while it is active and glows as embers once done. The finished record gets a "Served" stamp, or "Held" in red when the guardrail rejects the drug.

A steam-paper order ticket pinned and tilted −1.5° on the blue ground. Next to it is a stack of steps that go from pending navy to cooking saffron (with drifting steam) to done navy. The output is a mono EMR record on deep navy.

## Do's and Don'ts

### Do:
- **Do** put every page ground on asphalt with `grain.svg`, and switch the section ground to a flat ink only at a story beat (blue kitchen, saffron counter).
- **Do** keep glow, light pools and bloom on saffron and filament gold only.
- **Do** use the brush mask or the brush-outline stroke for sign plates and primary buttons. Keep border-radius for small functional controls (2px, 4px, full).
- **Do** hang signs and cards from a top pivot with a slight tilt, and animate them with the damped swing and slow sway, with a lit, still state under reduced motion.
- **Do** attach where and when to every number on a marker card.
- **Do** put ink lettering on saffron, kraft, steam paper and marigold.

### Don't:
- **Don't** use glass cards, backdrop-blurred panels (except the phone nav bar), gradient text or neon-on-black accents.
- **Don't** give awning blue, banner red or marigold a glow or a gradient.
- **Don't** set steam text on marigold.
- **Don't** use JetBrains Mono for anything that is not real data or a key hint.
- **Don't** put small tracked uppercase labels above headings.
