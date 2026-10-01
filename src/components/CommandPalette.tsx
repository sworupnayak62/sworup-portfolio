import React, { useEffect, useRef, useState } from 'react';
import { Search, ArrowRight, Copy, ExternalLink, Volume2, VolumeX, MessageCircle, CornerDownLeft, Download } from 'lucide-react';
import { CV_URL } from './Bill';
import { soundSys } from '../utils/audioSynthesis';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { DISTRICTS, jumpTo } from './MarketMap';
import { useDialog } from '../utils/useDialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAsk: () => void;
  onToggleAudio: () => void;
  audioMuted: boolean;
}

interface Item { id: string; title: string; hint: string; icon: React.ReactNode; run: () => void }

export const CommandPalette: React.FC<Props> = ({ isOpen, onClose, onAsk, onToggleAudio, audioMuted }) => {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const [note, setNote] = useState('');
  const input = useRef<HTMLInputElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);
  useDialog(panel, isOpen, onClose);
  const { email, phone, linkedin, github } = PORTFOLIO_DATA.personal;

  useEffect(() => {
    if (!isOpen) return;
    setQ('');
    setSel(0);
    setNote('');
    requestAnimationFrame(() => input.current?.focus());
  }, [isOpen]);

  const go = (id: string) => { onClose(); jumpTo(id); };
  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text).then(() => { soundSys.playSuccess(); setNote(`${label} copied`); }, () => setNote('Copy failed'));
  };

  const items: Item[] = [
    ...DISTRICTS.map((d) => ({ id: d.id, title: `Go to ${d.sign}`, hint: d.plain, icon: <ArrowRight className="h-4 w-4" />, run: () => go(d.id) })),
    {
      id: 'ask', title: 'Ask at the counter', hint: 'Scripted Q&A about his work', icon: <MessageCircle className="h-4 w-4" />,
      run: () => { onClose(); onAsk(); },
    },
    { id: 'cv', title: 'Download CV', hint: 'PDF, one page', icon: <Download className="h-4 w-4" />, run: () => { const a = document.createElement('a'); a.href = CV_URL; a.download = ''; a.click(); onClose(); } },
    { id: 'email', title: 'Copy email', hint: email, icon: <Copy className="h-4 w-4" />, run: () => copy(email, 'Email') },
    { id: 'phone', title: 'Copy phone', hint: phone, icon: <Copy className="h-4 w-4" />, run: () => copy(phone, 'Phone') },
    { id: 'li', title: 'Open LinkedIn', hint: 'linkedin.com/in/sworup-ranjan-nayak', icon: <ExternalLink className="h-4 w-4" />, run: () => window.open(linkedin, '_blank', 'noopener') },
    { id: 'gh', title: 'Open GitHub', hint: 'github.com/sworupnayak62', icon: <ExternalLink className="h-4 w-4" />, run: () => window.open(github, '_blank', 'noopener') },
    {
      id: 'sound', title: audioMuted ? 'Turn market sounds on' : 'Turn market sounds off', hint: 'Clacks, bulb ticks, a bell',
      icon: audioMuted ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />, run: onToggleAudio,
    },
  ];

  const needle = q.toLowerCase();
  const list = items.filter((i) => `${i.title} ${i.hint}`.toLowerCase().includes(needle));

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => (s + 1) % (list.length || 1)); soundSys.playTick(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => (s - 1 + list.length) % (list.length || 1)); soundSys.playTick(); }
    if (e.key === 'Enter') { e.preventDefault(); list[sel]?.run(); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[12vh]" onMouseDown={onClose}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Find anything"
        onMouseDown={(e) => e.stopPropagation()}
        className="hang swing-in w-full max-w-lg"
      >
        <div className="marker-card overflow-hidden">
          <div className="flex items-center gap-3 border-b-2 border-dashed border-[#8a6a3a]/60 px-4 py-3">
            <Search className="h-5 w-5 shrink-0" aria-hidden="true" />
            <input
              ref={input}
              value={q}
              onChange={(e) => { setQ(e.target.value); setSel(0); }}
              onKeyDown={onKey}
              placeholder="Find a stall, copy an email…"
              aria-label="Search"
              className="marker-type w-full bg-transparent text-lg text-[#17130d] placeholder:text-[#6b5332] focus:outline-none"
            />
            <kbd className="rounded border border-[#17130d]/30 px-1.5 font-mono text-[0.7rem]">Esc</kbd>
          </div>
          {note && <p className="bg-[#17130d] px-4 py-1.5 text-sm text-saffron" aria-live="polite">{note}</p>}
          <ul className="max-h-80 overflow-y-auto p-2" aria-label="Results">
            {list.length === 0 && <li className="px-3 py-6 text-center">Nothing on this street matches “{q}”.</li>}
            {list.map((it, i) => (
              <li key={it.id}>
                <button
                  onClick={it.run}
                  onMouseEnter={() => setSel(i)}
                  className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left ${i === sel ? 'bg-[#17130d] text-saffron' : 'text-[#17130d]'}`}
                >
                  <span aria-hidden="true">{it.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="marker-type block">{it.title}</span>
                    <span className={`block truncate text-xs ${i === sel ? 'text-steam-dim' : 'text-[#4a3a22]'}`}>{it.hint}</span>
                  </span>
                  {i === sel && <CornerDownLeft className="h-4 w-4" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
