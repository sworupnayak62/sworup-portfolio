import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ReceiptText, X, ChefHat } from 'lucide-react';
import { queryAgentKnowledge, SECTION_STARTERS } from '../data/agentEngine';
import { jumpTo } from './MarketMap';
import { soundSys } from '../utils/audioSynthesis';
import { useDialog } from '../utils/useDialog';

interface Slip { no: number; time: string; question: string; answer: string; link?: { label: string; sectionId: string } }

interface Props { open: boolean; onClose: () => void; section: string }

const TILE_TONES = ['bg-awning text-steam', 'bg-banner text-steam', 'bg-marigold text-[#17130d]', 'bg-asphalt-3 text-steam'];
const pad = (n: number) => String(n).padStart(3, '0');

// The counter, open from anywhere: an order screen. Pick from the menu or write a custom order;
// each answer prints as a receipt slip. Side drawer on desktop, bottom sheet on phones.
export const AskDrawer: React.FC<Props> = ({ open, onClose, section }) => {
  const [slips, setSlips] = useState<Slip[]>([]);
  const [q, setQ] = useState('');
  const [menu, setMenu] = useState<string[] | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);
  const roll = useRef<HTMLDivElement | null>(null);
  const input = useRef<HTMLInputElement | null>(null);

  useDialog(panel, open, onClose);

  useEffect(() => {
    if (open) requestAnimationFrame(() => input.current?.focus());
  }, [open]);
  useEffect(() => {
    roll.current?.scrollTo({ top: roll.current.scrollHeight, behavior: 'smooth' });
  }, [slips]);

  const order = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const hit = queryAgentKnowledge(t);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // the printer chatters as the slip comes out
    [0, 70, 140, 210, 280].forEach((d, i) => setTimeout(() => soundSys.playTick(0.7 + i * 0.05), d));
    setSlips((s) => [...s, { no: s.length + 1, time, question: t, answer: hit.response, link: hit.actionLink }]);
    setMenu(hit.suggestedPrompts);
    setQ('');
  };

  const newOrder = () => { setSlips([]); setMenu(null); input.current?.focus(); };

  const base = menu ?? SECTION_STARTERS[section] ?? SECTION_STARTERS[''];
  const tiles = [...base.slice(0, 3), ...(base.includes('How can I hire him?') ? [] : ['How can I hire him?'])].slice(0, 4);
  const last = slips[slips.length - 1];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onMouseDown={onClose}>
      <div aria-hidden="true" className="absolute inset-0 bg-black/55" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-title"
        onMouseDown={(e) => e.stopPropagation()}
        className="board absolute inset-x-0 bottom-0 flex max-h-[90svh] flex-col rounded-t-md bg-asphalt [animation:sheet-up_0.45s_var(--ease-out)] lg:inset-y-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[28rem] lg:rounded-none lg:[animation:drawer-in_0.45s_var(--ease-out)]"
      >
        {/* screen header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div>
            <h2 id="ask-title" className="marker-type flex items-center gap-2 text-2xl text-saffron">
              <ChefHat className="h-6 w-6" aria-hidden="true" />
              Order screen
            </h2>
            <p className="mt-0.5 text-xs text-steam-dim">Counter 1 · scripted menu · every answer written by Sworup, no AI model</p>
          </div>
          <div className="flex shrink-0 gap-1">
            {slips.length > 0 && (
              <button onClick={newOrder} className="rounded-sm px-2 py-1.5 text-xs text-steam-dim hover:text-steam">
                New order
              </button>
            )}
            <button onClick={onClose} aria-label="Close order screen" className="rounded-sm p-2 text-steam-dim hover:text-steam">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* receipt printer: slot on top, paper rolling out below */}
        <div className="relative flex min-h-[9rem] flex-1 flex-col px-5 pt-4">
          <div aria-hidden="true" className="relative z-[1] h-3 rounded-full bg-[#050506] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]" />
          <div ref={roll} className="-mt-1.5 flex-1 overflow-y-auto px-2 pb-4">
            <div className="receipt bg-[#f4efe4] px-5 pb-6 pt-5 text-[#17130d] shadow-[0_12px_24px_-12px_rgba(0,0,0,0.8)]">
              <p className="text-center font-mono text-[0.7rem] tracking-[0.18em] text-[#4a3a22]">SWORUP'S NIGHT MARKET · COUNTER 1</p>
              {slips.length === 0 ? (
                <p className="mt-4 border-t border-dashed border-[#17130d]/40 pt-4 text-[0.95rem] leading-relaxed">
                  Welcome to the counter. Pick something from the menu below or write a custom order, and the answer prints here.
                </p>
              ) : (
                slips.map((s) => (
                  <article key={s.no} className="mt-4 border-t border-dashed border-[#17130d]/40 pt-3 [animation:print-in_0.5s_var(--ease-out)]">
                    <p className="flex justify-between font-mono text-[0.72rem] text-[#4a3a22]">
                      <span>ORDER #{pad(s.no)}</span>
                      <span>{s.time}</span>
                    </p>
                    <p className="marker-type mt-2 text-[1.05rem] leading-snug">1 × {s.question}</p>
                    <p className="mt-3 whitespace-pre-line text-[0.92rem] leading-relaxed">{s.answer}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      {s.link ? (
                        <button
                          onClick={() => { onClose(); jumpTo(s.link!.sectionId); }}
                          className="flex items-center gap-1.5 text-sm font-semibold underline decoration-2 underline-offset-4 hover:no-underline"
                        >
                          {s.link.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      ) : <span />}
                      <span aria-hidden="true" className="marker-type rotate-[-8deg] rounded-sm border-2 border-banner-deep px-2 py-0.5 text-sm text-banner-deep">
                        Served
                      </span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{last ? last.answer : ''}</p>

        {/* the menu: big POS tiles */}
        <div className="border-t border-white/10 px-5 pb-2 pt-4">
          <p className="marker-type text-sm text-steam-dim">{menu ? 'Order next' : 'On the menu'}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {tiles.map((t, i) => (
              <button
                key={t}
                onClick={() => order(t)}
                className={`marker-type min-h-[3.4rem] rounded-sm px-3 py-2 text-left text-[0.92rem] leading-tight transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-px ${TILE_TONES[i % TILE_TONES.length]}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); order(q); }} className="flex items-center gap-2 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
          <label htmlFor="ask" className="sr-only">Custom order: ask a question about Sworup</label>
          <input
            id="ask"
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Custom order, e.g. Does he know FHIR?"
            autoComplete="off"
            className="min-w-0 flex-1 rounded-sm border border-white/15 bg-asphalt-2 px-3 py-2.5 text-steam placeholder:text-[#8f887c] focus:border-saffron focus:outline-none"
          />
          <button type="submit" disabled={!q.trim()} className="inline-flex items-center gap-1.5 rounded-sm bg-saffron px-3.5 py-2.5 font-semibold text-[#17130d] transition-opacity disabled:opacity-40">
            <ReceiptText className="h-4 w-4" aria-hidden="true" />
            Order
          </button>
        </form>
      </div>
    </div>
  );
};
