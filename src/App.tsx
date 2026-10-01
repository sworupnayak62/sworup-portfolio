import React, { useCallback, useEffect, useState } from 'react';
import { MarketMap, useActiveDistrict } from './components/MarketMap';
import { Hero } from './components/Hero';
import { Stalls } from './components/Stalls';
import { Kitchen } from './components/Kitchen';
import { MenuBoard } from './components/MenuBoard';
import { Workshop } from './components/Workshop';
import { Counter } from './components/Counter';
import { Bill } from './components/Bill';
import { CommandPalette } from './components/CommandPalette';
import { AskDrawer } from './components/AskDrawer';
import { OrderPot } from './components/OrderPot';
import { soundSys } from './utils/audioSynthesis';

export const App: React.FC = () => {
  const [isFindOpen, setIsFindOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(soundSys.getMuted());
  const active = useActiveDistrict();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsFindOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleAudio = () => setAudioMuted(soundSys.toggleMute());
  const openAsk = useCallback(() => { soundSys.playTick(); setIsAskOpen(true); }, []);
  const closeAsk = useCallback(() => setIsAskOpen(false), []);
  const closeFind = useCallback(() => setIsFindOpen(false), []);

  // pause CSS animation in sections that are off screen
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.toggleAttribute('data-offscreen', !e.isIntersecting)));
    document.querySelectorAll('main > section').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen lg:pl-[208px]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-sm focus:bg-saffron focus:px-4 focus:py-2 focus:font-semibold focus:text-[#17130d]"
      >
        Skip to content
      </a>
      <CommandPalette isOpen={isFindOpen} onClose={closeFind} onAsk={openAsk} onToggleAudio={toggleAudio} audioMuted={audioMuted} />
      <AskDrawer open={isAskOpen} onClose={closeAsk} section={active} />
      {!isAskOpen && <OrderPot onClick={openAsk} />}
      <MarketMap active={active} onFind={() => setIsFindOpen(true)} onAsk={openAsk} audioMuted={audioMuted} onToggleAudio={toggleAudio} />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Stalls />
        <Kitchen />
        <MenuBoard />
        <Workshop />
        <Bill />
        <Counter />
      </main>
    </div>
  );
};

export default App;
