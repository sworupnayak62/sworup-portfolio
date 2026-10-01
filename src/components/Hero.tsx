import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { BulbString } from './BulbString';
import { FoodCart } from './FoodCart';
import { jumpTo } from './MarketMap';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundSys } from '../utils/audioSynthesis';


// First visit of the session (and motion allowed): the shop opens with its shutter rolling up.
const shouldRollShutter = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem('shutter');
  } catch {
    return true; // storage blocked: just roll it
  }
};

export const Hero: React.FC = () => {
  const sign = useRef<HTMLDivElement | null>(null);
  const [shutter, setShutter] = useState(shouldRollShutter);
  const [open, setOpen] = useState(false);
  const [teased, setTeased] = useState(false);

  // the gate sign leans a little toward the pointer, like a board hanging in a breeze
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: PointerEvent) => {
      if (!sign.current) return;
      const lean = ((e.clientX / window.innerWidth) - 0.5) * 3;
      sign.current.style.rotate = `${lean.toFixed(2)}deg`;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem('shutter', '1'); } catch { /* fine */ }
  }, []);

  // the door sign flips to "Open" once the shop is up
  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), shutter ? 2100 : 700);
    return () => clearTimeout(t);
  }, []);

  const flip = () => {
    soundSys.playClick();
    setTeased(true);
    setOpen(false);
    window.setTimeout(() => setOpen(true), 1300);
  };

  return (
  <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden">
    {/* pooled light under the string */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
      style={{ background: 'radial-gradient(60% 100% at 45% 0%, rgba(247,179,43,0.13), transparent 70%)' }}
    />

    {/* the rolling shutter: up once per visit, then gone */}
    {shutter && (
      <div
        aria-hidden="true"
        onAnimationEnd={() => setShutter(false)}
        className="shutter pointer-events-none absolute inset-0 z-[4] flex flex-col"
      >
        <div className="relative flex flex-1 items-center justify-center">
          <p className="brush-type -rotate-6 text-[clamp(3rem,9vw,7rem)] text-saffron/90 [text-shadow:0_2px_0_#17130d]">Opening up…</p>
        </div>
        <div className="flex h-7 items-center justify-center border-t-2 border-[#17130d] bg-[#5a5e66]">
          <span className="h-2.5 w-24 rounded-full border-2 border-[#17130d] bg-[#9aa0a8]" />
        </div>
      </div>
    )}

    <BulbString className="absolute inset-x-0 top-0 z-[5] h-[230px]" />

    <div className="relative mx-auto grid w-full max-w-[1240px] flex-1 grid-cols-1 items-center gap-12 px-4 pb-8 pt-28 sm:px-8 sm:pt-36 lg:grid-cols-12 lg:gap-8 lg:pb-2 lg:pt-32">
      <div className="lg:col-span-7">
        {/* the market's gate sign, hung from the bulb wire */}
        <div ref={sign} className="relative inline-block max-w-full transition-[rotate] duration-[1400ms] ease-out" style={{ transformOrigin: '50% -8rem' }}>
          <div className="hang swing-in relative" style={{ animationDuration: '2.4s' }}>
            {/* the hanging wires run from the bulb string down to steel grommets punched into the board */}
            {['left-[14%]', 'right-[14%]'].map((side) => (
              <span key={side} aria-hidden="true" className={`absolute ${side} top-[1.4rem] z-[1] flex w-3.5 flex-col items-center sm:top-[1.9rem]`}>
                <span className="absolute bottom-[0.45rem] h-[14rem] w-[2px] bg-[#6b5a40]" />
                <span className="h-3.5 w-3.5 rounded-full border-[3px] border-[#c9ccd1] bg-[#0d0e11] shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
              </span>
            ))}
            <div className="brushed bg-awning px-7 pb-9 pt-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:px-12 sm:pb-12 sm:pt-10">
              <h1 className="brush-type text-[clamp(3.5rem,6.6vw,7rem)] text-steam">
                Sworup Ranjan
                <br />
                <span className="text-saffron">Nayak</span>
              </h1>
            </div>
          </div>
          {/* the door sign: flips to Open when the shop is up; tap it and it teases */}
          <div className="absolute -bottom-10 right-6 z-[1] sm:right-10">
            <span aria-hidden="true" className="absolute bottom-full left-1/2 h-5 w-px bg-[#6b5a40]" />
            <div className="hang sway" style={{ animationDuration: '4.2s' }}>
              <button onClick={flip} aria-label="Open for work: remote, hybrid or relocation" className="block [perspective:600px]">
                <span
                  className="grid transition-transform duration-700 ease-out [transform-style:preserve-3d]"
                  style={{ transform: `rotateY(${open ? 0 : 180}deg)`, rotate: '4deg' }}
                >
                  <span className="marker-card px-3.5 py-2 text-center leading-tight [backface-visibility:hidden] [grid-area:1/1]">
                    <span className="marker-type block text-lg text-banner-deep">Open for work</span>
                    <span className="block text-[0.72rem] text-[#3a2c18]">remote · hybrid · relocation</span>
                  </span>
                  <span aria-hidden="true" className="flex flex-col items-center justify-center bg-banner px-3.5 py-2 text-center leading-tight text-steam shadow-[0_10px_22px_-8px_rgba(0,0,0,0.7)] [backface-visibility:hidden] [grid-area:1/1] [transform:rotateY(180deg)]">
                    <span className="marker-type block text-lg">Closed</span>
                    <span className="block text-[0.72rem]">{teased ? '…kidding, still open' : 'back in a sec'}</span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* role line painted beneath the name, over a dry-brush red stroke */}
        <p className="relative mt-11 block w-fit px-1 pb-3">
          <span className="marker-type relative z-[1] text-lg text-steam sm:text-2xl">
            <span className="whitespace-nowrap">AI/ML engineer ·</span> <span className="whitespace-nowrap">agentic systems ·</span>{' '}
            <span className="whitespace-nowrap">fullstack</span>
          </span>
          <span aria-hidden="true" className="brushed absolute inset-x-0 bottom-0 h-3.5 bg-banner" />
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} onClick={() => soundSys.playSuccess()} className="btn-glow brushed">
            <Mail className="h-5 w-5" aria-hidden="true" />
            Email Sworup
          </a>
          <button onClick={() => { soundSys.playClick(); jumpTo('stalls'); }} className="btn-awning">
            <ArrowDown className="h-5 w-5" aria-hidden="true" />
            Walk the stalls
          </button>
        </div>
      </div>

      {/* a street-food cart; its menu board lists what he builds */}
      <div className="lg:col-span-5 lg:pl-10 xl:pl-16">
        <FoodCart />
      </div>
    </div>

    {/* the doormat at the entrance: step on it to walk in */}
    <div className="relative flex justify-center px-4 pb-28 lg:pb-5">
      <button onClick={() => { soundSys.playClick(); jumpTo('stalls'); }} className="doormat group flex flex-col items-center rounded-md border-4 border-[#5e3f1b] px-10 pb-2 pt-1.5 text-[#2a1a08] sm:px-14">
        <span className="brush-type text-[1.9rem] leading-none">Welcome</span>
        <span className="marker-type flex items-center gap-1 text-[0.78rem]">
          wipe your feet, then walk the stalls <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </button>
    </div>
  </section>
);
};
