import React from 'react';

const SPECIALS = ['LangGraph agents', 'FastMCP servers', 'React clinical UIs'];

const INK = '#17130d';
const CREAM = '#f3e9d7';
const BRUSH = "'Caveat Brush', cursive";

// All three layers share a 480-wide coordinate system, so they line up at any width. Wood grain is a
// feTurbulence streak laid over flat wood fills.
const Grain: React.FC<{ id: string }> = ({ id }) => (
  <filter id={id} x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.22" numOctaves="3" seed="7" />
    <feColorMatrix type="matrix" values="0 0 0 0 0.08  0 0 0 0 0.04  0 0 0 0 0.01  0 0 0 1.1 -0.38" />
  </filter>
);
const Woody: React.FC<{ id: string; a: string; b: string }> = ({ id, a, b }) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stopColor={a} />
    <stop offset="1" stopColor={b} />
  </linearGradient>
);

// Noren banners hanging off the rod: the letters stacked top to bottom, font size, line gap, first baseline
const NOREN: { word: string; size: number; gap: number; y: number }[] = [
  { word: 'S', size: 36, gap: 0, y: 163 },
  { word: 'AI', size: 30, gap: 31, y: 148 },
  { word: 'LLM', size: 23, gap: 22, y: 138 },
  { word: 'EMR', size: 23, gap: 22, y: 138 },
  { word: 'UI', size: 30, gap: 31, y: 148 },
];

// Terracotta pot, round-bellied with a thick rim and soil showing (rim top at y=186, base at y=216).
const Pot: React.FC = () => (
  <g>
    <ellipse cy="217" rx="30" ry="5" fill="#000" opacity="0.4" />
    <ellipse cy="187" rx="21" ry="4.6" fill="#2a1a0e" stroke={INK} strokeWidth="1.2" />
    <ellipse cx="-6" cy="187" rx="5" ry="1.4" fill="#4a7a2f" opacity="0.8" />
    {[[-10, 188.4], [4, 189], [11, 187.6]].map(([px, py]) => (
      <ellipse key={px} cx={px} cy={py} rx="1.8" ry="1" fill="#8a8479" />
    ))}
    <path d="M-22 187H22V192Q17 194 18.5 198C25 204 23 213 13 215H-13C-23 213-25 204-18.5 198Q-17 194-22 192Z" fill="url(#fc-pot)" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M-22 187H22V192H-22Z" fill="#b5683a" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <ellipse cy="187" rx="22" ry="4.8" fill="none" stroke="#5a2e16" strokeWidth="1.2" />
    <path d="M-22 191.4H22" stroke="#4a2410" strokeWidth="1.2" opacity="0.6" />
    <path d="M-17 199C-20 205-18 211-12 213" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity="0.18" />
    <path d="M-12 213Q0 215.5 12 213" fill="none" stroke="#e8d9bc" strokeWidth="1.4" opacity="0.4" />
    {[[8, 200], [14, 206], [-4, 208], [4, 211]].map(([px, py]) => (
      <circle key={`${px}${py}`} cx={px} cy={py} r="0.8" fill="#5a2e16" opacity="0.5" />
    ))}
  </g>
);

// Arching blade leaves rising from a pot (origin at the soil): tip x, tip y, shade.
const BLADES: [number, number, 'd' | 'm' | 'l'][] = [
  [-34, -16, 'd'], [34, -14, 'd'], [-24, -36, 'm'], [26, -34, 'm'], [-12, -50, 'm'], [12, -48, 'm'], [0, -58, 'l'], [-6, -42, 'l'], [8, -40, 'l'],
];
const Blades: React.FC = () => (
  <g transform="translate(0 186)">
    {BLADES.map(([tx, ty, t], i) => {
      const cx = tx * 0.3, cy = ty * 0.9;
      return (
        <g key={i}>
          <path d={`M-3.2 0Q${cx - 4} ${cy} ${tx} ${ty}Q${cx + 5} ${cy + 6} 3.2 0Z`} fill={`url(#fc-leaf-${t})`} stroke="#10260f" strokeWidth="0.8" strokeLinejoin="round" />
          <path d={`M0 -2Q${cx} ${cy + 3} ${tx * 0.92} ${ty * 0.92}`} fill="none" stroke="#d6f0a0" strokeWidth="0.8" opacity="0.45" />
        </g>
      );
    })}
  </g>
);

// A small potted tree beside the cart (pot base at y=216): a forked trunk with foliage built from dark,
// mid and light clusters and scattered leaves on top, in the terracotta pot.
const CLUSTERS: [number, number, number, string][] = [
  [-20, 138, 16, 'd'], [20, 136, 17, 'd'], [0, 120, 21, 'd'],
  [-24, 124, 15, 'm'], [22, 122, 16, 'm'], [2, 106, 17, 'm'], [-6, 140, 13, 'm'],
  [-14, 112, 11, 'l'], [12, 110, 11, 'l'], [-1, 98, 11, 'l'], [-26, 132, 8, 'l'], [24, 130, 8, 'l'],
];
const LEAVES: [number, number, number][] = [
  [-30, 126, -40], [-18, 112, -20], [-8, 100, 10], [6, 96, 25], [16, 106, 40], [26, 118, 55], [30, 134, 70],
  [-22, 142, -60], [-4, 128, 0], [10, 126, 30], [-12, 122, -30], [18, 142, 60], [0, 112, 15], [-26, 116, -50],
];
const Tree: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} 0)`}>
    {/* the tree, scaled up from the pot rim */}
    <g transform="translate(0 188) scale(1.2) translate(0 -188)">
      <path d="M0 188C-2 172 2 160-2 146M-1 150C-8 144-14 138-18 132M0 148C6 142 12 136 18 130M-2 138C-3 128-2 120 0 112" fill="none" stroke="#2c1a0d" strokeWidth="7" strokeLinecap="round" />
      <path d="M0 188C-2 172 2 160-2 146M-1 150C-8 144-14 138-18 132M0 148C6 142 12 136 18 130M-2 138C-3 128-2 120 0 112" fill="none" stroke="#5a3a1f" strokeWidth="4.4" strokeLinecap="round" />
      <path d="M-1 184C-3 172 1 162-2 150" fill="none" stroke="#8a6238" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <g transform="translate(0 11)">
        <g className="sway" style={{ transformBox: 'fill-box', transformOrigin: '50% 100%', animationDuration: '7s' }}>
          {CLUSTERS.map(([cx, cy, r, t], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={`url(#fc-leaf-${t})`} stroke={t === 'd' ? '#10260f' : 'none'} strokeWidth="0.8" />
          ))}
          {LEAVES.map(([lx, ly, rot], i) => (
            <ellipse key={i} cx={lx} cy={ly} rx="3.2" ry="6.5" fill={i % 3 ? '#8fd05a' : '#b6e27a'} opacity="0.75" transform={`rotate(${rot} ${lx} ${ly})`} />
          ))}
          <path d="M-14 96C-6 88 8 88 15 95" fill="none" stroke="#d6f0a0" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
        </g>
      </g>
    </g>
    <Pot />
  </g>
);

// A smaller pot of arching blade leaves, sized down about the street line.
const Shrub: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} 216) scale(0.72) translate(0 -216)`}>
    <g className="sway" style={{ transformBox: 'fill-box', transformOrigin: '50% 100%', animationDuration: '6s' }}>
      <Blades />
    </g>
    <Pot />
  </g>
);

// A wooden stool: round seat with grain rings, four splayed legs and rungs (seat at y=148, feet at y=216).
const Stool: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} 0)`}>
    <ellipse cy="217" rx="30" ry="5" fill="#000" opacity="0.4" />
    <path d="M-10 156 -13 214M10 156 13 214" stroke="#3a2210" strokeWidth="3.6" strokeLinecap="round" />
    <path d="M-11.4 184H11.4" stroke="#3a2210" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M-19 156-25 214M19 156 25 214" stroke="#6e4423" strokeWidth="4.6" strokeLinecap="round" />
    <path d="M-17.6 156-23.6 214M20.4 156 26.4 214" stroke="#a9763a" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M-22 186H22" stroke="#5a3a1f" strokeWidth="3.4" strokeLinecap="round" />
    <path d="M-23.4 185H21.2" stroke="#a9763a" strokeWidth="0.9" opacity="0.6" />
    <path d="M-25 148v7a25 6.5 0 0 0 50 0v-7z" fill="#5a3a1f" stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
    <ellipse cy="148" rx="25" ry="6.5" fill="url(#fc-seat)" stroke={INK} strokeWidth="1.2" />
    <ellipse cy="148" rx="17" ry="4.1" fill="none" stroke="#7a5230" strokeWidth="0.8" opacity="0.6" />
    <ellipse cy="148" rx="9" ry="2.2" fill="none" stroke="#7a5230" strokeWidth="0.8" opacity="0.6" />
    <ellipse cx="-9" cy="146.6" rx="9" ry="1.6" fill="#fff" opacity="0.2" />
  </g>
);

// A yatai-style street cart. Top: tiled roof with the wooden name board, a rod of noren banners, a hanging
// vertical sign and a glowing paper lantern. Middle: the stall interior, with a stove of steaming pots behind
// the counter. Bottom: the counter, a drawer cabinet and plank, spoked wheels, potted plants, wooden stools, the lantern's light
// pooling on the street, and the specials chalkboard standing on the street at the front left (the menu
// board lists what he builds).
export const FoodCart: React.FC = () => (
  <div className="relative mx-auto w-full max-w-[30rem]">
    {/* roof, name board, noren, lantern */}
    <svg viewBox="0 0 480 214" className="relative z-[3] block w-full overflow-visible" aria-hidden="true">
      <defs>
        <Grain id="fc-t-grain" />
        <Woody id="fc-t-wood" a="#4f2e14" b="#2b180a" />
        <Woody id="fc-t-board" a="#6a4220" b="#3a2210" />
        <pattern id="fc-tile" width="16" height="12" patternUnits="userSpaceOnUse">
          <rect width="16" height="12" fill="#2a2522" />
          <path d="M0 12Q8 3 16 12" fill="#36312c" stroke="#121010" strokeWidth="1" />
        </pattern>
        <linearGradient id="fc-roof-side" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.42" />
          <stop offset="0.6" stopColor="#000" stopOpacity="0.05" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="fc-noren" x1="0" x2="1">
          <stop offset="0" stopColor="#b3301f" />
          <stop offset="0.5" stopColor="#992619" />
          <stop offset="1" stopColor="#b3301f" />
        </linearGradient>
        <linearGradient id="fc-fold" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.3" stopColor="#000" stopOpacity="0.14" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <radialGradient id="fc-spill" cx="404" cy="168" r="160" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffb347" stopOpacity="0.34" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fc-glow" cx="404" cy="168" r="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffd46b" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ffd46b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fc-lantern" cx="50%" cy="50%" r="62%">
          <stop offset="0" stopColor="#fff6cc" />
          <stop offset="0.45" stopColor="#ffd46b" />
          <stop offset="1" stopColor="#e2872a" />
        </radialGradient>
      </defs>

      {/* hip roof: tiles, ridge cap, side light from the lantern */}
      <rect x="88" y="21" width="304" height="10" rx="3" fill="#1c1815" stroke="#0a0807" strokeWidth="1.2" />
      <path d="M96 24h288" stroke="#6a6258" strokeWidth="1" opacity="0.6" />
      <path d="M100 31H380L452 90H28Z" fill="url(#fc-tile)" stroke="#0a0807" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M100 31H380L452 90H28Z" fill="url(#fc-roof-side)" />

      {/* the name board, mounted on the roof */}
      <rect x="120" y="44" width="240" height="46" rx="8" fill="#000" opacity="0.35" />
      <path d="M126 36H354Q364 36 364 46V78Q364 88 354 88H126Q116 88 116 78V46Q116 36 126 36Z" fill="url(#fc-t-board)" stroke="#120a05" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="116" y="36" width="248" height="52" filter="url(#fc-t-grain)" opacity="0.6" />
      <path d="M126 41H354Q359 41 359 46V78Q359 83 354 83H126Q121 83 121 78V46Q121 41 126 41Z" fill="none" stroke="#c9a24a" strokeWidth="1" opacity="0.55" />
      <text x="240" y="69" textAnchor="middle" fontFamily={BRUSH} fontSize="36" fill="#f0d9a0" stroke="#120a05" strokeWidth="0.6" paintOrder="stroke">Sworup's</text>
      <text x="240" y="80" textAnchor="middle" fontFamily="'Permanent Marker', cursive" fontSize="8.5" fill="#f7b32b" letterSpacing="0.6">AI/ML &amp; FULLSTACK ENGINEER</text>
      {[[124, 44], [356, 44], [124, 80], [356, 80]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="1.8" fill="#8a8479" />
      ))}

      {/* fascia board under the eave */}
      <rect x="22" y="88" width="436" height="16" rx="2" fill="url(#fc-t-wood)" stroke="#0a0807" strokeWidth="1.2" />
      <rect x="22" y="88" width="436" height="16" filter="url(#fc-t-grain)" opacity="0.6" />
      <rect x="24" y="99" width="432" height="1.6" fill="#c9a24a" opacity="0.55" />

      {/* the rod the noren hang from */}
      <rect x="46" y="104" width="326" height="4" rx="2" fill="#7a5a30" stroke="#17130d" strokeWidth="0.8" />

      {/* noren: each banner sways a little from the rod */}
      {NOREN.map((n, i) => {
        const x = 54 + i * 60;
        const cx = x + 29;
        return (
          <g key={n.word} className="sway" style={{ transformBox: 'fill-box', transformOrigin: '50% 0%', animationDuration: `${5.2 + i * 0.7}s`, animationDelay: `${-i * 0.9}s` }}>
            <path d={`M${x} 108H${x + 58}V204L${cx} 197L${x} 204Z`} fill="url(#fc-noren)" stroke="#4a0f08" strokeWidth="1.2" strokeLinejoin="round" />
            <rect x={x} y="108" width="58" height="96" fill="url(#fc-fold)" />
            <rect x={x} y="108" width="58" height="5" fill="#5c150d" opacity="0.55" />
            <rect x={x + 5} y="116" width="48" height="2.4" fill={CREAM} opacity="0.9" />
            <rect x={x + 5} y="120" width="48" height="1" fill={CREAM} opacity="0.6" />
            <rect x={x + 5} y="187" width="48" height="1" fill={CREAM} opacity="0.6" />
            <rect x={x + 5} y="190" width="48" height="2.4" fill={CREAM} opacity="0.9" />
            {i === 0 ? (
              <>
                <circle cx={cx} cy="150" r="21" fill="none" stroke={CREAM} strokeWidth="2.4" />
                <circle cx={cx} cy="150" r="16.5" fill="none" stroke={CREAM} strokeWidth="1" opacity="0.8" />
                <text x={cx} y={n.y} textAnchor="middle" fontFamily={BRUSH} fontSize={n.size} fill={CREAM}>{n.word}</text>
              </>
            ) : (
              [...n.word].map((c, k) => (
                <text key={k} x={cx} y={n.y + k * n.gap} textAnchor="middle" fontFamily={BRUSH} fontSize={n.size} fill={CREAM}>{c}</text>
              ))
            )}
          </g>
        );
      })}

      {/* a vertical sign hanging off the left of the eave */}
      <g className="sway" style={{ transformBox: 'fill-box', transformOrigin: '50% 0%', animationDuration: '6.4s', animationDelay: '-1.4s' }}>
        <path d="M30 104v9M44 104v9" stroke="#8a7350" strokeWidth="1.2" />
        <rect x="24" y="112" width="26" height="104" rx="1.5" fill="url(#fc-noren)" stroke="#4a0f08" strokeWidth="1.2" />
        <rect x="24" y="112" width="26" height="104" fill="url(#fc-fold)" />
        <rect x="27.5" y="115.5" width="19" height="97" fill="none" stroke={CREAM} strokeWidth="1" opacity="0.8" />
        {[...'AGENTS'].map((c, k) => (
          <text key={k} x="37" y={133 + k * 15.5} textAnchor="middle" fontFamily={BRUSH} fontSize="16" fill={CREAM}>{c}</text>
        ))}
      </g>

      {/* the lantern's light spilling over the banners, then the lantern itself */}
      <circle cx="404" cy="168" r="160" fill="url(#fc-spill)" />
      <circle cx="404" cy="168" r="96" fill="url(#fc-glow)" className="cart-bulb" />
      <path d="M404 104v17" stroke="#8a7350" strokeWidth="1.6" />
      <rect x="392" y="120" width="24" height="7" rx="1.6" fill="#1b1209" stroke={INK} strokeWidth="1" />
      <path d="M392 127C375 140 375 192 392 204H416C433 192 433 140 416 127Z" fill="url(#fc-lantern)" stroke="#2a1608" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M381 142Q404 149 427 142M378 160Q404 167 430 160M378 178Q404 185 430 178M381 195Q404 202 427 195" fill="none" stroke="#8a3d12" strokeWidth="0.7" opacity="0.55" />
      <path d="M385 140C380 156 380 176 385 192" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {[...'OPEN'].map((c, k) => (
        <text key={k} x="404" y={150 + k * 15} textAnchor="middle" fontFamily={BRUSH} fontSize="15" fill="#7a1f12">{c}</text>
      ))}
      <rect x="392" y="204" width="24" height="7" rx="1.6" fill="#1b1209" stroke={INK} strokeWidth="1" />
      <path d="M404 211v8M399 211v6M409 211v6" stroke="#e2872a" strokeWidth="1.6" strokeLinecap="round" />
    </svg>

    {/* the stall interior: dark wood, lantern light from the right, a stove of steaming pots behind the counter */}
    <div className="relative z-[1]" style={{ marginTop: `-${(110 / 480) * 100}%` }}>
      <div
        className="relative mx-[7.5%] flex gap-[3%] bg-[radial-gradient(60%_70%_at_88%_40%,rgba(255,179,71,0.26),transparent),linear-gradient(180deg,#0b0604,#1d1109_50%,#2b1a0e)] pr-[4%]"
        style={{ paddingTop: `${(100 / 480) * 100}%` }}
      >
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2.45%] bg-gradient-to-r from-[#6e4a20] to-[#3d2711]" />
        <span aria-hidden="true" className="absolute inset-y-0 right-0 w-[2.45%] bg-gradient-to-l from-[#6e4a20] to-[#3d2711]" />
        <svg viewBox="0 0 300 150" className="relative ml-[3.5%] block min-w-0 flex-1" aria-hidden="true">
          <defs>
            <linearGradient id="fc-steel" x1="0" x2="1">
              <stop offset="0" stopColor="#b9bec6" />
              <stop offset="0.5" stopColor="#8a8f98" />
              <stop offset="1" stopColor="#5c6068" />
            </linearGradient>
            <radialGradient id="fc-cooklight" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#ffb347" stopOpacity="0.22" />
              <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="150" cy="70" rx="120" ry="80" fill="url(#fc-cooklight)" />

          {/* shelves on the back wall */}
          <rect x="6" y="42" width="92" height="4" rx="1" fill="#6e4a20" stroke={INK} strokeWidth="0.8" />
          {['#b3301f', '#f7b32b', '#5b9e3c', '#caa66c', '#efe9df'].map((c, i) => (
            <g key={c} transform={`translate(${12 + i * 17} 0)`}>
              <rect x="0" y="29" width="11" height="13" rx="2" fill="rgba(239,233,223,0.16)" stroke={INK} strokeWidth="0.9" />
              <rect x="1.5" y="34" width="8" height="7" rx="1" fill={c} />
              <rect x="-0.5" y="26" width="12" height="4" rx="1" fill="#caa66c" stroke={INK} strokeWidth="0.8" />
            </g>
          ))}
          <rect x="6" y="80" width="84" height="4" rx="1" fill="#6e4a20" stroke={INK} strokeWidth="0.8" />
          {[16, 40].map((x) => (
            <g key={x} transform={`translate(${x} 0)`}>
              <path d="M0 70Q0 80 11 80Q22 80 22 70Z" fill={CREAM} stroke={INK} strokeWidth="0.9" />
              <path d="M2 74Q11 77 20 74" fill="none" stroke="#2446a8" strokeWidth="1" />
              <path d="M2 63Q2 72 12 72Q22 72 22 63Z" fill="#e6dbc6" stroke={INK} strokeWidth="0.9" transform="translate(-1 -1)" />
            </g>
          ))}
          <path d="M68 80V72Q68 66 76 66Q84 66 84 72V80Z" fill="#8a8479" stroke={INK} strokeWidth="0.9" />
          <path d="M84 72Q91 70 90 66" fill="none" stroke="#8a8479" strokeWidth="2" strokeLinecap="round" />
          <rect x="72" y="62" width="8" height="4" rx="1" fill="#6a6258" stroke={INK} strokeWidth="0.8" />

          {/* utensil rail over the pot */}
          <rect x="196" y="22" width="98" height="3" rx="1.5" fill="#7a5a30" />
          <path d="M208 25V52" stroke="#a8622b" strokeWidth="2.4" strokeLinecap="round" />
          <ellipse cx="208" cy="56" rx="6" ry="5" fill="#c98a4b" stroke={INK} strokeWidth="0.9" />
          <path d="M228 25V50" stroke="#a8622b" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="228" cy="57" r="7" fill="none" stroke="#9aa0a8" strokeWidth="2" />
          <path d="M222 57H234M228 51V63" stroke="#9aa0a8" strokeWidth="0.9" />
          <path d="M248 25V38" stroke="#b3301f" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M248 38C241 46 242 58 248 64 254 58 255 46 248 38Z" fill="none" stroke="#c9ccd1" strokeWidth="1.2" />
          <path d="M268 25V36" stroke="#2a251d" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="261" y="36" width="19" height="22" rx="2" fill="#d7d9dd" stroke={INK} strokeWidth="1" />
          <circle cx="266" cy="41" r="1.6" fill="#2b1a0e" />

          {/* strings of dried chillies hanging over the stove */}
          <path d="M112 22H184" stroke="#7a5a30" strokeWidth="2" strokeLinecap="round" />
          {[34, 40, 30, 38, 32, 36, 29].map((len, i) => (
            <g key={i} transform={`translate(${116 + i * 11} 23) rotate(${i % 2 ? 7 : -7})`}>
              <path d="M0 0v5" stroke="#8a7350" strokeWidth="1" />
              <path d={`M0 5C-5 13 -4 ${len - 8} 0 ${len} 4 ${len - 8} 5 13 0 5Z`} fill="#c43a22" stroke="#4a0f08" strokeWidth="0.8" />
              <path d={`M-1.4 8C-2.4 13 -2.4 ${len / 2} -1.6 ${len / 2 + 5}`} fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
              <path d="M-2 5l2-3 2 3z" fill="#3f7a35" />
            </g>
          ))}

          {/* the stove: burners with real flames under two pots */}
          <rect x="100" y="138" width="180" height="12" rx="1" fill="#1f1a15" stroke={INK} strokeWidth="1.2" />
          {[134, 146, 158, 220, 232, 244].map((x, i) => (
            <path key={x} d="M0 8C-3 4-1 0 0-5 1 0 3 4 0 8Z" transform={`translate(${x} 138)`} fill="#ffb347" className="burner-flame" style={{ transformBox: 'fill-box', animationDelay: `${-i * 0.07}s` }} />
          ))}

          {/* stockpot with its lid ajar */}
          <path d="M118 98H186V132Q186 138 178 138H126Q118 138 118 132Z" fill="url(#fc-steel)" stroke={INK} strokeWidth="1.6" />
          <path d="M126 104V130" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.28" />
          <rect x="116" y="95" width="72" height="6" rx="2" fill="#7d838c" stroke={INK} strokeWidth="1.2" />
          <rect x="106" y="106" width="12" height="4" rx="2" fill="#40444c" stroke={INK} strokeWidth="1" />
          <rect x="186" y="106" width="12" height="4" rx="2" fill="#40444c" stroke={INK} strokeWidth="1" />
          <g transform="rotate(-9 184 95)">
            <path d="M118 95Q152 68 186 95Z" fill="url(#fc-steel)" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="152" cy="77" r="4" fill="#40444c" stroke={INK} strokeWidth="1" />
          </g>

          {/* a smaller pot on the boil with a ladle standing in it */}
          <path d="M208 114H258V132Q258 138 250 138H216Q208 138 208 132Z" fill="#23262b" stroke={INK} strokeWidth="1.6" />
          <path d="M214 120V132" stroke="#6a707b" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          <ellipse cx="233" cy="114" rx="25" ry="5.5" fill="#2a2d33" stroke={INK} strokeWidth="1.4" />
          <ellipse cx="233" cy="114" rx="21.5" ry="3.8" fill="#c9792b" />
          <path d="M240 112 266 70" stroke="#a8622b" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M266 70q4-2 6 2" fill="none" stroke="#a8622b" strokeWidth="3" strokeLinecap="round" />

          {/* steam off both pots */}
          {[[126, 90], [138, 88], [228, 106], [242, 106]].map(([x, y], k) => (
            <ellipse key={x} cx={x} cy={y} rx="5" ry="9" fill="#efe9df" opacity="0.55" className="steam-rise" style={{ transformBox: 'fill-box', filter: 'blur(3px)', animationDelay: `${k * 0.9}s`, animationDuration: '3.6s' }} />
          ))}
        </svg>
        {/* a window lit by the lantern */}
        <span
          aria-hidden="true"
          className="cart-bulb relative w-[12.5%] shrink-0 self-stretch rounded-[2px] border-2 border-[#3d2711] bg-[repeating-linear-gradient(90deg,rgba(40,20,6,0.55)_0_1.5px,transparent_1.5px_9px),repeating-linear-gradient(0deg,rgba(40,20,6,0.55)_0_1.5px,transparent_1.5px_9px),linear-gradient(180deg,#ffe3a0,#f0a64a)]"
        />
      </div>
    </div>

    {/* counter, cabinet, wheels, plant */}
    <div className="relative z-[2]">
      <svg viewBox="0 0 480 236" className="block w-full overflow-visible" aria-hidden="true">
        <defs>
          <Grain id="fc-b-grain" />
          <Woody id="fc-b-wood" a="#4a2a12" b="#2a170a" />
          <Woody id="fc-b-top" a="#a9763a" b="#7a4f22" />
          <radialGradient id="fc-leaf-d" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#2c5e2a" />
            <stop offset="1" stopColor="#173a18" />
          </radialGradient>
          <radialGradient id="fc-leaf-m" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#4a8f3a" />
            <stop offset="1" stopColor="#26602a" />
          </radialGradient>
          <radialGradient id="fc-leaf-l" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#8cc85a" />
            <stop offset="1" stopColor="#4f9a3a" />
          </radialGradient>
          <linearGradient id="fc-pot" x1="0" x2="1">
            <stop offset="0" stopColor="#c9784a" />
            <stop offset="0.45" stopColor="#a55a32" />
            <stop offset="1" stopColor="#6e3418" />
          </linearGradient>
          <radialGradient id="fc-seat" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#c08a4c" />
            <stop offset="1" stopColor="#8a5a2c" />
          </radialGradient>
          <radialGradient id="fc-ground" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffb347" stopOpacity="0.3" />
            <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fc-under" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.55" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* the lantern's light pooling on the street */}
        <ellipse cx="250" cy="216" rx="250" ry="22" fill="url(#fc-ground)" className="cart-bulb" />

        {/* wheels sit behind the cabinet */}
        {[112, 352].map((cx) => (
          <g key={cx} transform={`translate(${cx} 170)`}>
            <ellipse cy="48" rx="50" ry="5" fill="#000" opacity="0.4" />
            <circle r="46" fill="#1b1814" stroke={INK} strokeWidth="1.6" />
            <circle r="41" fill="none" stroke="#6b4423" strokeWidth="6" />
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1="-38" y1="0" x2="38" y2="0" stroke="#7a5230" strokeWidth="2.6" transform={`rotate(${i * 15})`} />
            ))}
            <circle r="7.5" fill="#3a352e" stroke={INK} strokeWidth="1.4" />
            <circle r="2.6" fill="#8a8479" />
          </g>
        ))}
        {/* axle and struts joining the cabinet to the wheels */}
        <rect x="112" y="167" width="240" height="6" rx="2" fill="#26221d" stroke={INK} strokeWidth="1" />
        {[112, 352].map((cx) => (
          <rect key={cx} x={cx - 6} y="118" width="12" height="56" fill="url(#fc-b-wood)" stroke={INK} strokeWidth="1.2" />
        ))}
        <rect x="60" y="122" width="360" height="8" rx="1.5" fill="#1c1209" stroke={INK} strokeWidth="1.2" />
        <path d="M444 52H466Q476 52 476 64V176" fill="none" stroke="#2a2d33" strokeWidth="5.4" strokeLinecap="round" />
        <path d="M444 52H466Q476 52 476 64V176" fill="none" stroke="#7d828b" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />

        {/* counter slab: lit top face, front edge, shadow beneath */}
        <path d="M26 2H454L470 14H10Z" fill="url(#fc-b-top)" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M40 6H440" stroke="#d6a463" strokeWidth="1" opacity="0.6" />
        <rect x="10" y="14" width="460" height="14" rx="1" fill="url(#fc-b-wood)" stroke={INK} strokeWidth="1.6" />
        <rect x="10" y="14" width="460" height="14" filter="url(#fc-b-grain)" opacity="0.6" />

        {/* things on the counter, leaving the middle clear for the stove */}
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(76 ${-k * 8})`}>
            <path d="M-22 -6Q-20 12 0 12Q20 12 22 -6Z" fill={CREAM} stroke={INK} strokeWidth="1.6" />
            <ellipse cy="-6" rx="22" ry="4" fill="#e6dbc6" stroke={INK} strokeWidth="1.4" />
            <path d="M-19 0Q0 6 19 0" fill="none" stroke="#2446a8" strokeWidth="1.6" />
          </g>
        ))}
        <g transform="translate(124 2)">
          <rect x="-9" y="-30" width="18" height="30" rx="2" fill="#efe9df" stroke={INK} strokeWidth="1.4" />
          <ellipse cy="-30" rx="9" ry="2.6" fill="#fff8e8" stroke={INK} strokeWidth="1.2" />
          <path d="M-9 -22H9M-9 -14H9" stroke="#bdb5a8" strokeWidth="0.8" />
        </g>
        {[
          [356, '#b3301f'],
          [386, '#f7b32b'],
          [416, '#5b9e3c'],
        ].map(([x, c]) => (
          <g key={x as number} transform={`translate(${x} 2)`}>
            <rect x="-11" y="-34" width="22" height="34" rx="4" fill="rgba(239,233,223,0.16)" stroke={INK} strokeWidth="1.6" />
            <rect x="-9" y="-20" width="18" height="17" rx="3" fill={c as string} />
            <rect x="-12" y="-40" width="24" height="7" rx="2" fill="#caa66c" stroke={INK} strokeWidth="1.6" />
            <path d="M-6 -30v7" stroke="#fff8e3" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
          </g>
        ))}

        {/* cabinet */}
        <rect x="36" y="28" width="408" height="96" fill="#1e1108" stroke={INK} strokeWidth="1.8" />
        <rect x="36" y="28" width="408" height="22" fill="url(#fc-under)" />
        <rect x="36" y="28" width="10" height="96" fill="url(#fc-b-wood)" />
        <rect x="434" y="28" width="10" height="96" fill="url(#fc-b-wood)" />
        <rect x="36" y="116" width="408" height="8" fill="url(#fc-b-wood)" stroke={INK} strokeWidth="1.2" />
        {[0, 1].map((row) =>
          [0, 1, 2].map((col) => {
            const x = 54 + col * 59;
            const y = 38 + row * 38;
            return (
              <g key={`${row}${col}`}>
                <rect x={x} y={y} width="54" height="34" rx="1.6" fill="url(#fc-b-wood)" stroke="#0e0804" strokeWidth="1.4" />
                <rect x={x} y={y} width="54" height="34" filter="url(#fc-b-grain)" opacity="0.55" />
                <rect x={x + 4} y={y + 4} width="46" height="26" fill="none" stroke="#6b4423" strokeWidth="0.8" opacity="0.8" />
                <rect x={x + 17} y={y + 7} width="20" height="6" rx="1" fill="#c9a24a" opacity="0.85" />
                <rect x={x + 19} y={y + 9} width="16" height="2" fill="#3a2a10" opacity="0.6" />
                <rect x={x + 21} y={y + 19} width="12" height="3.6" rx="1.8" fill="#d9b25a" stroke="#4a3510" strokeWidth="0.8" />
              </g>
            );
          })
        )}

        {/* plank */}
        <rect x="240" y="38" width="186" height="72" rx="2" fill="url(#fc-b-wood)" stroke="#0e0804" strokeWidth="1.4" />
        <rect x="240" y="38" width="186" height="72" filter="url(#fc-b-grain)" opacity="0.5" />
        <rect x="246" y="44" width="174" height="60" fill="none" stroke="#b3301f" strokeWidth="2" opacity="0.9" />
        {[[250, 48], [416, 48], [250, 100], [416, 100]].map(([cx, cy]) => (
          <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="1.8" fill="#8a8479" />
        ))}
        <text x="333" y="78" textAnchor="middle" fontFamily={BRUSH} fontSize="31" fill={CREAM}>Built to order</text>
        <text x="333" y="97" textAnchor="middle" fontFamily="'Permanent Marker', cursive" fontSize="10.5" fill="#f7b32b">agents · pipelines · clinical UI</text>

        {/* three wooden stools in front of the cabinet */}
        {[162, 233, 298].map((x) => (
          <Stool key={x} x={x} />
        ))}

        {/* terracotta pots to the right */}
        <Shrub x={418} />
        <Tree x={462} />
      </svg>

      {/* the specials board: a small A-frame easel standing on the street at the front left */}
      <div className="absolute bottom-[7%] left-[-2%] z-[4] w-[27%] min-w-[6.75rem] origin-bottom -rotate-[4deg]">
        <span aria-hidden="true" className="absolute -bottom-1 left-[-6%] right-[-6%] h-2 rounded-[50%] bg-black/45 blur-[3px]" />
        <span aria-hidden="true" className="absolute bottom-0 left-[14%] h-[24px] w-[5px] origin-top -rotate-[5deg] rounded-b-[1px] bg-gradient-to-r from-[#5a3a1a] to-[#3a2410]" />
        <span aria-hidden="true" className="absolute bottom-0 right-[14%] h-[24px] w-[5px] origin-top rotate-[5deg] rounded-b-[1px] bg-gradient-to-r from-[#5a3a1a] to-[#3a2410]" />
        <span aria-hidden="true" className="absolute bottom-[8px] left-[17%] right-[17%] h-[3px] bg-[#3a2410]" />
        <div className="relative mb-[22px]">
          <div className="chalkboard relative rounded-[2px] border-[4px] border-[#5a3a1a] px-1.5 pb-1 pt-1shadow-[0_10px_16px_-8px_rgba(0,0,0,0.9),inset_0_0_14px_rgba(0,0,0,0.5)] [border-image:linear-gradient(135deg,#7a5128,#4a2e14)_1]">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_40%_at_30%_25%,rgba(239,233,223,0.07),transparent)]" />
            <p className="marker-type relative text-center text-[0.74rem] leading-tight text-steam sm:text-[0.8rem]">Today's specials</p>
            <span aria-hidden="true" className="relative mx-auto mt-0.5 block h-px w-[70%] bg-steam/40" />
            <p className="sr-only">He builds:</p>
            <ul className="relative mt-1 space-y-px text-[0.66rem] leading-snug text-steam/85 sm:text-[0.7rem]">
              {SPECIALS.map((s) => (
                <li key={s} className="flex gap-1">
                  <span aria-hidden="true" className="text-saffron/80">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <span aria-hidden="true" className="absolute -bottom-[5px] left-[-4px] right-[-4px] h-[5px] rounded-[1px] bg-gradient-to-b from-[#6e4a20] to-[#3d2711] shadow-[0_3px_4px_rgba(0,0,0,0.6)]" />
          <span aria-hidden="true" className="absolute -bottom-[5px] right-[22%] h-[3px] w-[10px] rounded-[1px] bg-steam/90" />
        </div>
      </div>
    </div>
  </div>
);
