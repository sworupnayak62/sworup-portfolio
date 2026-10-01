import React from 'react';

const WISPS = [
  ['40%', '0s', '3.2s'],
  ['52%', '-0.8s', '2.8s'],
  ['46%', '-1.6s', '3.6s'],
  ['58%', '-2.3s', '3s'],
  ['34%', '-2.9s', '3.4s'],
];
const BUBBLES = [
  ['12%', '0s'],
  ['80%', '-0.7s'],
  ['18%', '-1.3s'],
  ['74%', '-1.8s'],
];

// A pot on the boil: the lid chatters, lifts every few seconds with a puff, smoke curls up, froth and bubbles spill over.
// `hot` boils it harder. Size it with className.
export const Pot: React.FC<{ className?: string; hot?: boolean }> = ({ className = '', hot }) => (
  <span aria-hidden="true" className={`pot-art relative block ${hot ? 'is-hot' : ''} ${className}`}>
    {WISPS.map(([left, delay, dur]) => (
      <span key={delay} className="pot-steam absolute top-[14%] h-[28%] w-[16%] rounded-full bg-steam/70 blur-[3px]" style={{ left, animationDelay: delay, animationDuration: dur }} />
    ))}
    {/* the puffs that escape when the lid lifts */}
    <span className="pot-puff absolute left-[2%] top-[28%] h-[22%] w-[30%] rounded-full bg-steam/80 blur-[4px]" />
    <span className="pot-puff is-right absolute right-[2%] top-[28%] h-[22%] w-[30%] rounded-full bg-steam/80 blur-[4px]" />
    {BUBBLES.map(([left, delay]) => (
      <span key={delay} className="pot-bubble absolute top-[36%] z-[1] h-[11%] w-[11%] rounded-full border border-[#ffd46b] bg-saffron/40" style={{ left, animationDelay: delay }} />
    ))}
    <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_10px_14px_rgba(0,0,0,0.7)]">
      <g className="pot-flame">
        <path d="M22 62c-2-4 1-6 2-9 1 3 4 4 2 9z" fill="#e2721b" />
        <path d="M31 62c-3-5 1-8 1-12 2 4 5 6 2 12z" fill="#f7b32b" />
        <path d="M40 62c-2-4 1-6 2-9 1 3 4 4 2 9z" fill="#e2721b" />
      </g>
      <path d="M9 34h-4a3 3 0 0 0 0 6h4M55 34h4a3 3 0 0 1 0 6h-4" fill="none" stroke="#17130d" strokeWidth="3" />
      <path d="M9 30h46v18a8 8 0 0 1-8 8H17a8 8 0 0 1-8-8z" fill="#b3301f" stroke="#17130d" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M13 36v10" stroke="#e8735f" strokeWidth="2.4" strokeLinecap="round" />
      {/* froth bubbling up under the lid */}
      <path className="pot-froth" d="M10 30c1-4 4-4 6-1 1-4 5-4 6-1 1-4 5-4 6-1 1-4 5-4 6-1 1-4 5-4 6-1 1-4 5-4 6-1 1-3 4-3 6 1z" fill="#ffe7a8" stroke="#17130d" strokeWidth="1" />
      <rect x="7" y="28" width="50" height="4.5" rx="2" fill="#8f1f14" stroke="#17130d" strokeWidth="2" />
      <g className="pot-lid">
        <g className="pot-chatter">
          <path d="M10 27c3-9 41-9 44 0z" fill="#2446a8" stroke="#17130d" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M16 23c4-3 12-4 18-4" fill="none" stroke="#6b8ae0" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="28" y="16" width="8" height="4.5" rx="2" fill="#f7b32b" stroke="#17130d" strokeWidth="2" />
        </g>
      </g>
    </svg>
  </span>
);

// Always-there way into the order screen on desktop: the pot on the boil, bottom-right. Hover boils it harder.
// Phones use the Ask tab in the bottom bar instead, so the pot never sits on top of text.
export const OrderPot: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Open the order screen and ask about Sworup"
    className="pot group fixed bottom-6 right-6 z-40 hidden items-end gap-2 lg:flex"
  >
    <span className="marker-card pointer-events-none mb-3 hidden translate-x-2 px-3 py-1.5 text-[1.05rem] leading-none opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 lg:block" style={{ rotate: '-3deg' }}>
      <span className="marker-type">Ask the counter</span>
    </span>
    <Pot className="h-[5.4rem] w-[5.4rem]" />
  </button>
);
