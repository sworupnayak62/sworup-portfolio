import React from 'react';

// Food in the wok: [left, colour, shape, sideways drift on the toss, spin].
const FOOD: [string, string, string, string, string][] = [
  ['26%', '#b3301f', 'h-[9%] w-[9%] rounded-[3px]', '-10px', '260deg'],
  ['36%', '#5b9e3c', 'h-[6%] w-[12%] rounded-full', '6px', '-300deg'],
  ['46%', '#f7b32b', 'h-[8%] w-[8%] rounded-full', '-4px', '200deg'],
  ['55%', '#efe9df', 'h-[5%] w-[11%] rounded-full', '12px', '-240deg'],
  ['31%', '#e2721b', 'h-[7%] w-[7%] rounded-[2px]', '14px', '320deg'],
  ['50%', '#5b9e3c', 'h-[7%] w-[7%] rounded-[2px]', '-14px', '-280deg'],
];

// A wok over a high flame, tossing its stir-fry. `hot` tosses faster and the flame jumps higher.
export const Wok: React.FC<{ className?: string; hot?: boolean }> = ({ className = '', hot }) => (
  <span aria-hidden="true" className={`wok-art pot-art relative block ${hot ? 'is-hot' : ''} ${className}`}>
    {['30%', '50%'].map((left, i) => (
      <span key={left} className="pot-steam absolute top-[6%] h-[26%] w-[13%] rounded-full bg-steam/60 blur-[3px]" style={{ left, animationDelay: `${-i * 1.4}s` }} />
    ))}
    {/* flame licking up the sides of the wok */}
    <span className="wok-fire absolute bottom-[4%] left-[22%] h-[30%] w-[40%] rounded-[50%_50%_45%_45%] bg-gradient-to-t from-[#e2721b] via-[#f7b32b] to-transparent blur-[2px]" />
    <span className="wok-pan absolute inset-0 block">
      {FOOD.map(([left, bg, shape, dx, spin], i) => (
        <span
          key={i}
          className={`wok-food absolute top-[35%] border border-[#17130d]/60 ${shape}`}
          style={{ left, background: bg, animationDelay: `${i * 0.03}s`, ['--dx' as string]: dx, ['--spin' as string]: spin }}
        />
      ))}
      {[0, 1, 2].map((k) => (
        <span key={k} className="wok-spark absolute left-[44%] top-[44%] h-1 w-1 rounded-full bg-[#ffd46b]" style={{ animationDelay: `${k * 0.25}s`, ['--dx' as string]: `${(k - 1) * 18}px` }} />
      ))}
      <svg viewBox="0 0 96 64" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_10px_14px_rgba(0,0,0,0.6)]">
        <path d="M68 29l24-5a3 3 0 0 1 1 6l-24 4z" fill="#a8622b" stroke="#17130d" strokeWidth="2" strokeLinejoin="round" />
        <path d="M4 28h68c0 13-15 22-34 22S4 41 4 28z" fill="#2a2d33" stroke="#17130d" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M12 34c5 7 14 10 24 10" fill="none" stroke="#6a707b" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="2" y="25.5" width="72" height="4" rx="2" fill="#40444c" stroke="#17130d" strokeWidth="2" />
      </svg>
    </span>
  </span>
);
