import React, { useEffect, useRef, useState } from 'react';
import { soundSys } from '../utils/audioSynthesis';

// Text that reacts to the kitchen utensil you are holding: the knife cuts a word where you click,
// the whisk mixes its letters, the ladle stirs them, the pan flips the word, the spatula smashes it.
// Every effect plays once and settles back, so the copy is never left broken. With no utensil held
// the text renders as plain text, so this costs nothing until someone picks one up. Press on a word, or
// press and drag across several, to work them all.
const MS: Record<string, number> = { knife: 2600, whisk: 1800, ladle: 1800, 'frying pan': 1100, spatula: 1000 };

interface Fx { tool: string; cut: number; mixed: string; k: number }

const mix = (s: string) => {
  const a = [...s];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const r = a.join('');
  return r === s ? a.reverse().join('') : r;
};

export const Words: React.FC<{ text: string; tool: string | null }> = ({ text, tool }) => {
  const [fx, setFx] = useState<Record<number, Fx>>({});
  const timers = useRef<Record<number, number>>({});
  useEffect(() => () => Object.values(timers.current).forEach(clearTimeout), []);
  if (!tool) return <>{text}</>;

  // `drag`: the pointer swept in with the button held, so the knife cuts mid-word instead of at the entry edge
  const use = (i: number, word: string, e: React.PointerEvent<HTMLElement>, drag: boolean) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const len = [...word].length;
    const at = drag ? len / 2 : ((e.clientX - r.left) / r.width) * len;
    const cut = Math.min(len - 1, Math.max(1, Math.round(at)));
    clearTimeout(timers.current[i]);
    setFx((m) => ({ ...m, [i]: { tool, cut, mixed: mix(word), k: Date.now() } }));
    timers.current[i] = window.setTimeout(() => setFx((m) => { const { [i]: _gone, ...rest } = m; return rest; }), MS[tool] ?? 1500);
    if (tool === 'knife') soundSys.playClick(3200);
    else if (tool === 'spatula') soundSys.playClick(600);
    else soundSys.playTick(tool === 'frying pan' ? 0.7 : 1.6);
  };

  const body = (word: string, f?: Fx) => {
    if (!f) return word;
    const chars = [...word];
    switch (f.tool) {
      case 'knife':
        return (
          <span key={f.k}>
            <span className="fx-cut-l">{chars.slice(0, f.cut).join('')}</span>
            <span className="fx-cut-r">{chars.slice(f.cut).join('')}</span>
          </span>
        );
      case 'whisk':
        return (
          <span key={f.k}>
            <span aria-hidden="true" className="fx-whisk">{f.mixed}</span>
            <span className="sr-only">{word}</span>
          </span>
        );
      case 'ladle':
        return (
          <span key={f.k}>
            {chars.map((c, j) => <span key={j} className="fx-stir" style={{ animationDelay: `${j * 70}ms` }}>{c}</span>)}
          </span>
        );
      case 'frying pan':
        return <span key={f.k} className="fx-flip">{word}</span>;
      default:
        return <span key={f.k} className="fx-smash">{word}</span>;
    }
  };

  return (
    <>
      {text.split(/(\s+)/).map((part, i) =>
        part === '' || /^\s+$/.test(part) ? (
          part
        ) : (
          <span
            key={i}
            onPointerDown={(e) => e.button === 0 && use(i, part, e, false)}
            onPointerEnter={(e) => e.buttons === 1 && use(i, part, e, true)}
            className="inline-block rounded-[2px] hover:bg-saffron/25"
          >
            {body(part, fx[i])}
          </span>
        )
      )}
    </>
  );
};
