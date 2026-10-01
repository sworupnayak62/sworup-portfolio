import React from 'react';
import { Sparkle } from 'lucide-react';

const SPECIALS = ['LangGraph multi-agent pipelines', 'FastMCP servers', 'The React clinical software they run inside'];

const INK = '#17130d';
const WOOD = '#5e3f1b';
const RED = '#b3301f';
const STEAM = '#efe9df';

// Canopy: 8 stripes fanning out from a narrow ridge to a wide hem, so it reads in perspective.
const STRIPES = 8;
const TOP = [58, 358];
const HEM = [12, 404];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Bulbs along a sagging wire under the valance (quadratic from (22,116) via (208,140) to (394,116)).
const BULBS = Array.from({ length: 9 }, (_, i) => {
  const t = 0.07 + (i * 0.86) / 8;
  const x = (1 - t) ** 2 * 22 + 2 * (1 - t) * t * 208 + t ** 2 * 394;
  const y = (1 - t) ** 2 * 116 + 2 * (1 - t) * t * 140 + t ** 2 * 116;
  return { x, y };
});

// Poles sit at the same x in all three layers so they read as one post.
const Pole = ({ side }: { side: 'l' | 'r' }) => (
  <span aria-hidden="true" className={`absolute inset-y-0 w-[2.4%] bg-gradient-to-r from-[#6e4a20] to-[#4a3218] ${side === 'l' ? 'left-[5.3%]' : 'right-[5.3%]'}`} />
);

// A street-food cart: striped canopy with a bulb string, the menu chalkboard hanging under it,
// and a counter with a steaming kadhai, bowls and spice jars over a painted cart on spoked wheels.
export const FoodCart: React.FC = () => (
  <div className="relative mx-auto w-full max-w-[30rem]">
    {/* canopy + valance + bulbs */}
    <svg viewBox="0 0 416 150" className="relative z-[1] block w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="cart-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cart-glow">
          <stop offset="0" stopColor="#f7b32b" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f7b32b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="22" y="92" width="10" height="58" fill={WOOD} />
      <rect x="384" y="92" width="10" height="58" fill={WOOD} />
      <rect x="50" y="10" width="316" height="10" rx="4" fill={WOOD} stroke={INK} strokeWidth="2" />
      {Array.from({ length: STRIPES }, (_, i) => {
        const a = i / STRIPES, b = (i + 1) / STRIPES;
        const pts = [lerp(TOP[0], TOP[1], a), 18, lerp(TOP[0], TOP[1], b), 18, lerp(HEM[0], HEM[1], b), 88, lerp(HEM[0], HEM[1], a), 88];
        return <polygon key={i} points={pts.join(' ')} fill={i % 2 ? STEAM : RED} />;
      })}
      <polygon points={`${TOP[0]},18 ${TOP[1]},18 ${HEM[1]},88 ${HEM[0]},88`} fill="url(#cart-shade)" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      {Array.from({ length: STRIPES }, (_, i) => {
        const w = (HEM[1] - HEM[0]) / STRIPES;
        const x = HEM[0] + i * w;
        return <path key={i} d={`M${x} 88h${w}v10a${w / 2} ${w / 2 - 12} 0 0 1 -${w} 0z`} fill={i % 2 ? STEAM : RED} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />;
      })}
      <path d="M22 116Q208 140 394 116" fill="none" stroke="#4a4032" strokeWidth="1.6" />
      {BULBS.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <circle cy="9" r="16" fill="url(#cart-glow)" className="cart-bulb" style={{ animationDelay: `${-i * 0.37}s` }} />
          <rect x="-2.5" y="-1" width="5" height="4" fill="#2a251d" />
          <ellipse cy="8.5" rx="4" ry="5.5" fill="#ffd46b" />
          <ellipse cx="-1.2" cy="7" rx="1.1" ry="1.8" fill="#fff8e3" />
        </g>
      ))}
    </svg>

    {/* the menu board hanging under the canopy */}
    <div className="relative -mt-6 px-[11%] pb-3">
      <Pole side="l" />
      <Pole side="r" />
      <div className="hang sway relative" style={{ animationDuration: '6.5s' }}>
        <span aria-hidden="true" className="absolute -top-7 left-[22%] h-7 w-px bg-[#6b5a40]" />
        <span aria-hidden="true" className="absolute -top-7 right-[22%] h-7 w-px bg-[#6b5a40]" />
        <div className="chalkboard rounded-sm border-[6px] border-[#8a6a3a] px-5 pb-4 pt-3 shadow-[0_18px_30px_-14px_rgba(0,0,0,0.85)]">
          <p className="marker-type text-center text-xl text-saffron">Today's specials</p>
          <p className="sr-only">He builds:</p>
          <ul className="mt-2 space-y-1.5 text-[1.02rem] leading-snug text-steam/90">
            {SPECIALS.map((s) => (
              <li key={s} className="flex gap-2">
                <Sparkle className="mt-1 h-3.5 w-3.5 shrink-0 text-saffron/80" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* counter, cart body, wheels */}
    <div className="relative">
      {[0, 1, 2].map((k) => (
        <span
          key={k}
          aria-hidden="true"
          className="steam-rise absolute top-[2%] h-10 w-2.5 rounded-full bg-steam/45 blur-[3px]"
          style={{ left: `${24 + k * 7}%`, animationDelay: `${k * 1.1}s`, animationDuration: '3.6s' }}
        />
      ))}
      <svg viewBox="0 0 416 236" className="block w-full" aria-hidden="true">
        <rect x="22" y="0" width="10" height="80" fill={WOOD} />
        <rect x="384" y="0" width="10" height="80" fill={WOOD} />

        {/* kadhai of curry with ring handles */}
        <circle cx="68" cy="58" r="6" fill="none" stroke="#40444c" strokeWidth="3" />
        <circle cx="172" cy="58" r="6" fill="none" stroke="#40444c" strokeWidth="3" />
        <path d="M72 56h96c0 16-20 22-48 22s-48-6-48-22z" fill="#2a2d33" stroke={INK} strokeWidth="2.2" />
        <ellipse cx="120" cy="56" rx="48" ry="6" fill="#e2721b" stroke={INK} strokeWidth="2" />
        <ellipse cx="108" cy="55" rx="12" ry="2" fill="#ffd46b" opacity="0.7" />

        {/* stacked bowls */}
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(0 ${-k * 9})`}>
            <path d="M196 70h52c0 6-10 9-26 9s-26-3-26-9z" fill={STEAM} stroke={INK} strokeWidth="1.8" />
            <path d="M200 73c8 3 36 3 44 0" fill="none" stroke="#2446a8" strokeWidth="1.8" />
          </g>
        ))}

        {/* spice jars */}
        {[
          [272, '#b3301f'],
          [308, '#f7b32b'],
          [344, '#5b9e3c'],
        ].map(([x, c]) => (
          <g key={x as number} transform={`translate(${x} 0)`}>
            <rect x="0" y="44" width="26" height="34" rx="5" fill="rgba(239,233,223,0.16)" stroke={INK} strokeWidth="1.8" />
            <rect x="3" y="58" width="20" height="17" rx="3" fill={c as string} />
            <rect x="-1" y="38" width="28" height="7" rx="2" fill="#caa66c" stroke={INK} strokeWidth="1.8" />
            <path d="M5 49v6" stroke="#fff8e3" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
          </g>
        ))}

        {/* counter top */}
        <rect x="6" y="78" width="404" height="12" rx="3" fill="#8a6a3a" stroke={INK} strokeWidth="2" />
        <rect x="10" y="87" width="396" height="3" fill="#5e3f1b" />

        {/* painted cart body */}
        <rect x="20" y="90" width="376" height="94" fill="#2446a8" stroke={INK} strokeWidth="2.4" />
        <rect x="20" y="90" width="376" height="7" fill={WOOD} />
        <rect x="20" y="177" width="376" height="7" fill={WOOD} />
        <path d="M114 97v80M302 97v80" stroke="#1a3585" strokeWidth="2" />
        <text x="208" y="146" textAnchor="middle" fontFamily="'Caveat Brush', cursive" fontSize="42" fill={STEAM}>Sworup's</text>
        <text x="208" y="166" textAnchor="middle" fontFamily="'Permanent Marker', cursive" fontSize="11.5" fill="#f7b32b">agents · pipelines · clinical UI</text>
        <path d="M396 118l16-8" stroke={WOOD} strokeWidth="5" strokeLinecap="round" />

        {/* ground shadow + spoked wheels */}
        <ellipse cx="208" cy="229" rx="196" ry="6" fill="#000" opacity="0.45" />
        {[104, 312].map((cx) => (
          <g key={cx} transform={`translate(${cx} 198)`}>
            <circle r="30" fill="#2a251d" stroke={INK} strokeWidth="2.4" />
            <circle r="25" fill="none" stroke="#8a6a3a" strokeWidth="4" />
            {[0, 30, 60, 90, 120, 150].map((a) => (
              <line key={a} x1="-24" y1="0" x2="24" y2="0" stroke="#8a6a3a" strokeWidth="2.2" transform={`rotate(${a})`} />
            ))}
            <circle r="5" fill="#caa66c" stroke={INK} strokeWidth="1.8" />
          </g>
        ))}
      </svg>
    </div>
  </div>
);
