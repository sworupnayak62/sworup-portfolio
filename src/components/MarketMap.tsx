import React, { useEffect, useRef, useState } from 'react';
import { Store, CookingPot, UtensilsCrossed, Hammer, MessageCircle, MessageCircleQuestion, Search, Volume2, VolumeX } from 'lucide-react';
import { soundSys } from '../utils/audioSynthesis';

export const DISTRICTS = [
  { id: 'stalls', sign: 'Stalls', plain: 'Projects', Icon: Store },
  { id: 'demo', sign: 'Kitchen', plain: 'Pipeline demo', Icon: CookingPot },
  { id: 'skills', sign: 'Menu', plain: 'Skills', Icon: UtensilsCrossed },
  { id: 'workshop', sign: 'Workshop', plain: 'Experience', Icon: Hammer },
  { id: 'contact', sign: 'Counter', plain: 'Contact', Icon: MessageCircle },
];

interface Props {
  active: string;
  onFind: () => void;
  onAsk: () => void;
  audioMuted: boolean;
  onToggleAudio: () => void;
}

export const jumpTo = (id: string) => {
  soundSys.playClick();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// Which district is in the middle of the viewport ('' while at the gate/hero).
export const useActiveDistrict = () => {
  const [active, setActive] = useState('');
  useEffect(() => {
    const els = ['hero', ...DISTRICTS.map((d) => d.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === 'hero' ? '' : e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
};

// The market map: a lit bulb river down the left edge on desktop, a sign bar at the bottom on phones.
export const MarketMap: React.FC<Props> = ({ active, onFind, onAsk, audioMuted, onToggleAudio }) => {
  const [chase, setChase] = useState<{ from: number; to: number; key: number } | null>(null);
  const prev = useRef(-1);
  const activeIdx = DISTRICTS.findIndex((d) => d.id === active);

  // light runs along the wire from the last district to the new one
  useEffect(() => {
    if (activeIdx !== prev.current) {
      setChase({ from: prev.current, to: activeIdx, key: Date.now() });
      prev.current = activeIdx;
    }
  }, [activeIdx]);


  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Market map"
        className="fixed inset-y-0 left-0 z-30 hidden w-[208px] flex-col border-r border-white/5 bg-asphalt/95 px-5 py-6 lg:flex"
      >
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); jumpTo('hero'); }}
          className="group block text-steam no-underline"
        >
          <span className="brush-type block text-[2.6rem] text-saffron transition-transform duration-500 group-hover:-rotate-2">Sworup</span>
          <span className="mt-1 block text-[0.8rem] text-steam-dim">AI/ML &amp; fullstack engineer</span>
        </a>

        <ol className="relative mt-10 flex-1 space-y-1">
          {/* the rope the district bulbs hang from; a paper lantern hangs at the stall you are in */}
          <span aria-hidden="true" className="rope absolute bottom-3 left-[9.5px] top-3 w-[3px]" />
          {DISTRICTS.map((d, i) => {
            const isActive = i === activeIdx;
            const inChase =
              chase && chase.to >= 0 && ((i > chase.from && i <= chase.to) || (i < chase.from && i >= chase.to));
            const delay = chase ? Math.abs(i - chase.from) * 90 : 0;
            return (
              <li key={d.id}>
                <a
                  href={`#${d.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => { e.preventDefault(); jumpTo(d.id); }}
                  className="group relative flex items-center gap-3 rounded py-2.5 pl-0 pr-2 no-underline"
                >
                  <span
                    key={inChase ? chase!.key : undefined}
                    className={`bulb relative z-[1] mx-[5px] shrink-0 ${isActive ? 'is-on opacity-0' : 'is-warm'}`}
                    style={inChase && !isActive ? { animation: `chase 0.5s ${delay}ms ease-out` } : undefined}
                  />
                  {isActive && (
                    <img
                      src="/lantern.svg"
                      alt=""
                      aria-hidden="true"
                      className="hang swing-in pointer-events-none absolute left-[1.5px] top-1/2 z-[2] -mt-4 h-8 w-[19px] drop-shadow-[0_0_8px_rgba(247,179,43,0.45)]"
                      style={{ animationDuration: '1.6s' }}
                    />
                  )}
                  <span className="leading-tight">
                    <span className={`marker-type block text-[1.05rem] transition-colors ${isActive ? 'text-saffron' : 'text-steam group-hover:text-saffron'}`}>
                      {d.sign}
                    </span>
                    <span className="block text-xs text-steam-dim">{d.plain}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>

        <button
          onClick={onAsk}
          className="group mb-5 flex w-full items-center gap-3 rounded-sm bg-asphalt-3 px-3 py-3 text-left transition-colors hover:bg-[#2a2c34]"
        >
          <MessageCircleQuestion className="h-5 w-5 shrink-0 text-saffron" aria-hidden="true" />
          <span className="leading-tight">
            <span className="marker-type block text-[1.05rem] text-saffron">Ask the counter</span>
            <span className="block text-xs text-steam-dim">Scripted Q&amp;A about him</span>
          </span>
        </button>

        <div className="space-y-2 text-sm">
          <button onClick={onFind} className="flex w-full items-center gap-2 rounded px-1 py-1.5 text-steam-dim transition-colors hover:text-steam">
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>Find</span>
            <kbd className="ml-auto rounded border border-white/15 px-1.5 font-mono text-[0.7rem]">Ctrl K</kbd>
          </button>
          <button
            onClick={onToggleAudio}
            aria-pressed={!audioMuted}
            className="flex w-full items-center gap-2 rounded px-1 py-1.5 text-steam-dim transition-colors hover:text-steam"
          >
            {audioMuted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4 text-saffron" aria-hidden="true" />}
            <span>{audioMuted ? 'Market sounds off' : 'Market sounds on'}</span>
          </button>
        </div>
      </nav>

      {/* Phone sign bar */}
      <nav
        aria-label="Market map"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-asphalt/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
      >
        <ol className="mx-auto flex max-w-lg items-stretch justify-between px-1">
          {DISTRICTS.map(({ id, sign, Icon }, i) => (
            <li key={id} className="flex-1">
              <a
                href={`#${id}`}
                aria-current={i === activeIdx ? 'location' : undefined}
                onClick={(e) => { e.preventDefault(); jumpTo(id); }}
                className={`flex flex-col items-center gap-1 pb-2.5 pt-1.5 text-[0.72rem] no-underline ${i === activeIdx ? 'text-saffron' : 'text-steam-dim'}`}
              >
                <span aria-hidden="true" className={`bulb -mb-0.5 h-1.5 w-1.5 ${i === activeIdx ? 'is-on' : 'is-warm opacity-40'}`} />
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="marker-type">{sign}</span>
              </a>
            </li>
          ))}
          <li className="flex-1">
            <button onClick={onAsk} className="flex w-full flex-col items-center gap-1 pb-2.5 pt-1.5 text-[0.72rem] text-saffron">
              <span aria-hidden="true" className="bulb is-on -mb-0.5 h-1.5 w-1.5" />
              <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
              <span className="marker-type">Ask</span>
            </button>
          </li>
        </ol>
      </nav>

      {/* Phone top-right tools */}
      <div className="fixed right-3 top-3 z-30 flex gap-2 lg:hidden">
        <button onClick={onFind} aria-label="Find anything" className="rounded-full bg-asphalt-3/90 p-3 text-steam">
          <Search className="h-4 w-4" aria-hidden="true" />
        </button>
        <button onClick={onToggleAudio} aria-label={audioMuted ? 'Turn market sounds on' : 'Turn market sounds off'} aria-pressed={!audioMuted} className="rounded-full bg-asphalt-3/90 p-3 text-steam">
          {audioMuted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4 text-saffron" aria-hidden="true" />}
        </button>
      </div>
    </>
  );
};
