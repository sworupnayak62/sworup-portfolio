import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, ArrowLeftRight, Undo2, Mic } from 'lucide-react';
import { soundSys } from '../utils/audioSynthesis';
import { Wok } from './Wok';

interface Variant {
  drug: string;
  record: [string, string][];
  flag: string;
  /** Station visits in order. A repeat means the guardrail sent the state back. */
  path: number[];
  rejected?: boolean;
}
interface Order { label: string; no: string; where: string; time: string; secs: string; scrawl: string; before: string; after: string; variants: Variant[] }

const HAPPY = [0, 1, 2, 3];
const LOOP = [0, 1, 2, 1, 2, 3];

const ORDERS: Order[] = [
  {
    label: 'Cardiology follow-up',
    no: '0412', where: 'Ward 3B · Bed 12', time: '09:41', secs: '0:14', scrawl: 'check allergy!',
    before: '“Patient is 4 days post-op. BP recorded at 134 over 82, pulse 76 bpm. Starting ',
    after: ' twice daily. Note severe allergy to Penicillin, patient had hives in 2021.”',
    variants: [
      {
        drug: 'Metoprolol Tartrate 25mg',
        record: [
          ['vitals.bp', '134/82 mmHg'],
          ['vitals.pulse', '76 bpm'],
          ['medication', 'Metoprolol Tartrate · 25 mg oral BID'],
          ['allergy', 'Penicillin · severe (hives, 2021)'],
        ],
        flag: 'Guardrail passed. Allergy alert raised: Penicillin.',
        path: HAPPY,
      },
      {
        drug: 'Amoxicillin 500mg',
        record: [
          ['vitals.bp', '134/82 mmHg'],
          ['vitals.pulse', '76 bpm'],
          ['medication', 'Amoxicillin · 500 mg oral BID · HELD'],
          ['allergy', 'Penicillin · severe (hives, 2021)'],
        ],
        flag: 'Guardrail rejected it: amoxicillin is a penicillin-class drug. Sent back to Extract, re-checked, and held for clinician review.',
        path: LOOP,
        rejected: true,
      },
    ],
  },
  {
    label: 'General intake',
    no: '0413', where: 'OPD · Room 4', time: '09:48', secs: '0:11', scrawl: 'NKDA',
    before: '“New intake. Reports mild fever since yesterday, temp 101.2 F. Oxygen saturation 98% room air, heart rate 84. Prescribed ',
    after: ' SOS. No known drug allergies.”',
    variants: [
      {
        drug: 'Paracetamol 650mg',
        record: [
          ['vitals.temp', '101.2 °F'],
          ['vitals.spo2', '98% room air'],
          ['vitals.hr', '84 bpm'],
          ['medication', 'Paracetamol · 650 mg oral SOS'],
          ['allergy', 'None known (NKDA)'],
        ],
        flag: 'Guardrail passed. No allergy conflicts.',
        path: HAPPY,
      },
    ],
  },
];

const STATIONS = [
  { name: 'Transcribe', does: 'speech to text' },
  { name: 'Extract', does: 'vitals, meds, allergies' },
  { name: 'Validate', does: 'guardrail agent checks' },
  { name: 'Format', does: 'EMR-ready JSON' },
];

const STEP_MS = 700;

const INK = '#17130d';
// Utensils on the rack over the pass, drawn hanging (head down) from a hook at the top of each viewBox.
// The same art becomes the cursor when a visitor takes one down.
const UTENSILS: { name: string; w: number; h: number; dur: string; art: string }[] = [
  {
    name: 'ladle', w: 26, h: 96, dur: '4.6s',
    art: `<rect x="11" y="6" width="4" height="66" rx="2" fill="#a8622b" stroke="${INK}" stroke-width="1.5"/>
      <ellipse cx="13" cy="82" rx="11" ry="10" fill="#c98a4b" stroke="${INK}" stroke-width="1.8"/>
      <ellipse cx="13" cy="83" rx="7" ry="6" fill="#8a5a2b"/>`,
  },
  {
    name: 'spatula', w: 26, h: 104, dur: '5.3s',
    art: `<rect x="10" y="6" width="6" height="52" rx="3" fill="#a8622b" stroke="${INK}" stroke-width="1.5"/>
      <rect x="12" y="56" width="2" height="12" fill="#9aa0a8"/>
      <rect x="3" y="67" width="20" height="32" rx="3" fill="#d7d9dd" stroke="${INK}" stroke-width="1.8"/>
      <path d="M9 73v20M13 73v20M17 73v20" stroke="#5c6068" stroke-width="1.6" stroke-linecap="round"/>`,
  },
  {
    name: 'frying pan', w: 60, h: 118, dur: '6.4s',
    art: `<rect x="26" y="6" width="8" height="46" rx="4" fill="#2a251d" stroke="${INK}" stroke-width="1.5"/>
      <circle cx="30" cy="84" r="27" fill="#2a2d33" stroke="${INK}" stroke-width="2"/>
      <circle cx="30" cy="84" r="20" fill="#3a3e46"/>
      <path d="M17 76a15 15 0 0 1 12-9" fill="none" stroke="#6a707b" stroke-width="2.4" stroke-linecap="round"/>`,
  },
  {
    name: 'whisk', w: 28, h: 100, dur: '4.9s',
    art: `<rect x="11" y="6" width="6" height="36" rx="3" fill="#b3301f" stroke="${INK}" stroke-width="1.5"/>
      <path d="M14 42C3 60 4 84 14 96 24 84 25 60 14 42z M14 42C8 62 9 84 14 96 19 84 20 62 14 42z M14 42v54" fill="none" stroke="#c9ccd1" stroke-width="1.6"/>`,
  },
];

// A 40px cursor: the utensil flipped head-up and tilted so the head points up-left, like an arrow.
// The hotspot sits on the head, near the top-left corner.
const cursorFor = ({ w, h, art }: (typeof UTENSILS)[number]) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g transform="translate(20 20) rotate(135) scale(${(50 / h).toFixed(3)}) translate(${-w / 2} ${-h / 2})">${art}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 5 5, auto`;
};

const holdUtensil = (i: number | null) => {
  const root = document.documentElement;
  if (i === null) {
    root.classList.remove('holding-utensil');
    root.style.removeProperty('--held-cursor');
  } else {
    root.style.setProperty('--held-cursor', cursorFor(UTENSILS[i]));
    root.classList.add('holding-utensil');
  }
};

// Order-ticket waveform: fixed bar heights so it reads as a recording, not noise on every render.
const WAVE = [3, 6, 9, 5, 11, 14, 8, 12, 6, 10, 15, 9, 5, 12, 8, 4, 10, 13, 7, 5, 9, 6, 3, 5];

export const Kitchen: React.FC = () => {
  const [order, setOrder] = useState(0);
  const [variant, setVariant] = useState(0);
  const [pos, setPos] = useState(-1); // -1 idle, index into path while cooking, path.length when served
  const timers = useRef<number[]>([]);
  const [held, setHeld] = useState<number | null>(null);
  const [canHold] = useState(() => window.matchMedia('(pointer: fine)').matches);
  useEffect(() => holdUtensil(held), [held]);
  useEffect(() => () => holdUtensil(null), []);
  // taking the one you hold hangs it back; taking another swaps
  const take = (i: number) => {
    soundSys.playTick(held === i ? 0.8 : 1.4);
    setHeld(held === i ? null : i);
  };
  const cur = ORDERS[order];
  const v = cur.variants[variant];
  const path = v.path;

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clear, []);

  const cook = () => {
    clear();
    setPos(0);
    soundSys.playClick();
    for (let i = 1; i <= path.length; i++) {
      timers.current.push(
        window.setTimeout(() => {
          setPos(i);
          if (i === path.length) soundSys.playSuccess();
          else if (path[i] < path[i - 1]) soundSys.playTick(0.6); // sent back
          else soundSys.playClick();
        }, i * STEP_MS)
      );
    }
  };

  const pick = (i: number) => { clear(); setOrder(i); setVariant(0); setPos(-1); soundSys.playClick(); };
  const swap = () => { clear(); setVariant((x) => (x + 1) % cur.variants.length); setPos(-1); soundSys.playClick(); };

  const served = pos >= path.length;
  const cooking = pos >= 0 && !served;
  const station = pos >= 0 && !served ? path[pos] : -1;
  const sentBack = pos > 0 && path.slice(1, pos + 1).some((s, i) => s < path[i]);
  const firstExtract = path.indexOf(1);
  const fieldsShown = served ? v.record.length : pos > firstExtract ? Math.min(v.record.length, pos - firstExtract) : 0;

  const status =
    pos < 0 ? '' :
    served ? v.flag :
    v.rejected && station === 1 && sentBack ? 'Validate rejected the medication. State sent back to Extract to re-read the dictation.' :
    `${STATIONS[station].name}: ${STATIONS[station].does}`;

  return (
    <section id="demo" className="relative overflow-hidden bg-awning py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: "url('/grain.svg')" }} />
      {/* tiled backsplash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.06) 2px, transparent 2px)', backgroundSize: '56px 56px' }}
      />
      {/* the utensil rack over the pass: it rattles while an order cooks, and with a mouse you can take a
          utensil down to use as your cursor (click it again to hang it back) */}
      <div className="absolute right-4 top-0 z-[2] hidden sm:block lg:right-16">
        <div aria-hidden="true" className="h-3 w-[19rem] rounded-b-sm bg-gradient-to-b from-[#c9ccd1] to-[#7d828b] shadow-[0_6px_10px_-4px_rgba(0,0,0,0.6)]" />
        <div className="flex items-start justify-around px-2">
          {UTENSILS.map((u, i) => {
            const gone = held === i;
            const art = (
              <svg width={u.w} height={u.h} viewBox={`0 0 ${u.w} ${u.h}`} aria-hidden="true" className="drop-shadow-[0_10px_8px_rgba(0,0,0,0.45)]">
                <circle cx={u.w / 2} cy="5" r="3.5" fill="none" stroke="#9aa0a8" strokeWidth="2" />
                <g dangerouslySetInnerHTML={{ __html: u.art }} />
              </svg>
            );
            return (
              <span key={u.name} className="relative -mt-0.5 flex flex-col items-center">
                <span aria-hidden="true" className="block h-4 w-3 rounded-b-full border-2 border-t-0 border-[#9aa0a8]" />
                <span className="hang sway -mt-1.5 block" style={{ animationDuration: cooking ? '0.9s' : u.dur, animationDelay: `${-i * 1.3}s` }}>
                  {canHold ? (
                    <button
                      onClick={() => take(i)}
                      aria-pressed={gone}
                      aria-label={gone ? `Hang the ${u.name} back on the rack` : `Take the ${u.name} as your cursor`}
                      className="group/utensil block rounded-sm"
                    >
                      <span className={`block transition-[transform,opacity] duration-300 ease-out ${gone ? '-translate-y-6 rotate-12 opacity-0' : 'group-hover/utensil:translate-y-1.5'}`}>{art}</span>
                    </button>
                  ) : (
                    art
                  )}
                </span>
              </span>
            );
          })}
        </div>
        {canHold && (
          <p className="marker-type ml-auto mt-3 w-fit max-w-[19rem] rotate-[-3deg] bg-kraft px-2.5 py-1 text-[0.85rem] leading-snug text-[#17130d] shadow-[0_8px_14px_-8px_rgba(0,0,0,0.8)]">
            {held === null ? 'Take one down, it becomes your pointer' : `Holding the ${UTENSILS[held].name}. Click its empty hook to hang it back`}
          </p>
        )}
      </div>
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-end gap-4 sm:gap-6">
              <h2 className="brush-type text-[clamp(3.2rem,7vw,5.5rem)] text-steam">The kitchen</h2>
              <Wok hot={cooking} className="mb-1 h-20 w-[7.5rem] shrink-0 sm:h-28 sm:w-[10.5rem]" />
            </div>
            <p className="mt-4 text-lg leading-relaxed text-[#dfe5f5]">
              How his clinical pipeline turns a doctor's spoken note into a structured record, one agent at a time, and what the guardrail does when something is unsafe.
            </p>
          </div>
          <div role="group" aria-label="Choose an order" className="flex flex-wrap gap-3">
            {ORDERS.map((o, i) => (
              <button
                key={o.label}
                onClick={() => pick(i)}
                aria-pressed={order === i}
                className={`marker-type rounded-sm px-4 py-2 text-base transition-colors ${order === i ? 'bg-saffron text-[#17130d]' : 'bg-[#1a3585] text-steam hover:bg-[#15296a]'}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* the order ticket */}
          <div className="lg:col-span-4">
            {/* the ticket rail over the pass: an aluminium channel, the ticket tucked into its groove
                and pinned by a rolling steel ball */}
            <div aria-hidden="true" className="relative z-[1] h-[18px] rounded-[3px] bg-[linear-gradient(180deg,#f1f3f5_0%,#c3c8cf_38%,#8d939c_62%,#b7bcc4_100%)] shadow-[0_6px_10px_-4px_rgba(0,0,0,0.65)] ring-1 ring-[#5c6068]/70">
              <span className="absolute inset-x-1 top-[7px] h-[3px] rounded-full bg-[#4a4f57]/70 shadow-[0_1px_0_rgba(255,255,255,0.55)]" />
              <span className="absolute -bottom-[7px] left-[22%] h-[15px] w-[15px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff_0%,#d5d9de_28%,#7d838c_70%,#4a4f57_100%)] shadow-[0_3px_4px_rgba(0,0,0,0.45)]" />
            </div>
            <div className="hang sway -mt-[7px]" style={{ animationDuration: '7s' }}>
              {/* a kitchen order ticket off the pass printer: thermal paper, torn at the foot, a chef's scrawl on it */}
              <div className="receipt relative overflow-hidden bg-[#f7f4ec] px-5 pb-9 pt-7 text-[#17130d] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.8)] sm:px-6" style={{ rotate: '-1.5deg' }}>
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.07),transparent_16%,transparent_80%,rgba(120,90,40,0.07))]" />
                <span aria-hidden="true" className="pointer-events-none absolute -bottom-7 -right-6 h-24 w-24 rounded-full border-[5px] border-[#8a5a2b]/[0.13]" />

                <div className="relative flex items-baseline justify-between font-mono text-[0.78rem] font-semibold tracking-[0.08em]">
                  <span>KITCHEN ORDER</span>
                  <span className="text-base">#{cur.no}</span>
                </div>
                <div className="relative mt-0.5 flex justify-between font-mono text-[0.72rem] text-[#4a3a22]">
                  <span>{cur.where}</span>
                  <span>{cur.time}</span>
                </div>

                <div className="relative mt-3 flex items-center gap-2 border-t border-dashed border-[#17130d]/40 pt-3 font-mono text-[0.7rem] tracking-[0.12em] text-[#4a3a22]">
                  <Mic className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">VOICE NOTE · {cur.secs}</span>
                  <span aria-hidden="true" className="ml-auto flex h-4 items-center gap-[2px]">
                    {WAVE.map((h, k) => <span key={k} className="block w-[2px] rounded-full bg-[#17130d]/55" style={{ height: h }} />)}
                  </span>
                </div>

                <p className="relative mt-3 text-[1.02rem] leading-relaxed">
                  {cur.before}
                  {cur.variants.length > 1 ? (
                    <button
                      onClick={swap}
                      aria-label={`Swap the drug. Now: ${v.drug}`}
                      className={`rounded-[2px] px-0.5 font-semibold underline decoration-dashed decoration-1 underline-offset-4 ${v.rejected ? 'bg-[linear-gradient(transparent_50%,rgba(199,55,43,0.35)_50%)] text-banner-deep' : 'bg-[linear-gradient(transparent_50%,rgba(247,179,43,0.6)_50%)]'}`}
                    >
                      {v.drug}
                    </button>
                  ) : (
                    <span className="bg-[linear-gradient(transparent_50%,rgba(247,179,43,0.6)_50%)] px-0.5 font-semibold">{v.drug}</span>
                  )}
                  {cur.after}
                </p>

                <div className="relative mt-4 flex items-end justify-between gap-3 border-t border-dashed border-[#17130d]/40 pt-3">
                  <span className="font-mono text-[0.68rem] tracking-[0.12em] text-[#4a3a22]">TO: CLINICAL PIPELINE</span>
                  <span aria-hidden="true" className="marker-type -mb-1 rotate-[-6deg] whitespace-nowrap text-lg leading-none text-banner-deep underline decoration-2 underline-offset-2">{cur.scrawl}</span>
                </div>
              </div>
            </div>
            {cur.variants.length > 1 && (
              <button onClick={swap} className="mt-5 inline-flex items-center gap-2 text-sm text-[#e6ebf8] underline decoration-dashed underline-offset-4 hover:text-saffron">
                {v.rejected ? <Undo2 className="h-4 w-4" aria-hidden="true" /> : <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />}
                {v.rejected ? 'Put the original drug back' : 'Tap the guardrail: swap in a drug that clashes with the allergy'}
              </button>
            )}
            <div className="mt-6">
              <button onClick={cook} className="btn-glow brushed" disabled={pos >= 0 && !served}>
                {served ? <RotateCcw className="h-5 w-5" aria-hidden="true" /> : <Play className="h-5 w-5" aria-hidden="true" />}
                {served ? 'Cook it again' : pos >= 0 ? 'Cooking…' : 'Cook this order'}
              </button>
            </div>
          </div>

          {/* stations: a compact row on phones so the record stays in view */}
          <div className="self-start lg:col-span-4">
            <ol className="grid grid-cols-4 gap-2 lg:grid-cols-1 lg:gap-4" aria-label="Pipeline stations">
              {STATIONS.map((s, i) => {
                const isHere = station === i;
                const visited = pos >= 0 && (served || path.slice(0, pos).includes(i));
                const rejecting = v.rejected && sentBack && i === 2 && !served;
                const tone = isHere
                  ? 'bg-saffron text-[#17130d]'
                  : rejecting
                    ? 'bg-banner text-steam'
                    : visited
                      ? 'bg-[#15296a] text-steam'
                      : 'bg-[#1a3585]/70 text-[#c9d3ee]';
                return (
                  <li key={s.name} className={`relative flex flex-col items-center gap-1.5 rounded-sm px-2 py-3 text-center transition-colors duration-300 lg:flex-row lg:gap-4 lg:px-4 lg:py-3.5 lg:text-left ${tone}`}>
                    <span className={`marker-type flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-base lg:h-9 lg:w-9 lg:text-lg ${isHere ? 'border-[#17130d]' : 'border-current'}`}>
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="marker-type block text-[0.8rem] leading-tight lg:text-lg">{s.name}</span>
                      <span className="hidden text-sm opacity-85 lg:block">{rejecting ? 'rejected, sent back' : s.does}</span>
                    </span>
                    {/* the burner under each station: flame while cooking here, embers once visited */}
                    <span aria-hidden="true" className="absolute -bottom-1.5 left-1/2 flex -translate-x-1/2 items-end gap-[3px] lg:-bottom-2">
                      {[0, 1, 2, 3, 4].map((k) => (
                        <span
                          key={k}
                          className={`block w-1.5 rounded-t-full ${isHere ? 'burner-flame bg-gradient-to-t from-[#4d7cff] to-[#ffd46b]' : visited ? 'h-1 bg-marigold/70' : 'h-0.5 bg-[#0d1a45]'}`}
                          style={isHere ? { animationDelay: `${-k * 0.07}s`, height: k % 2 ? '0.7rem' : '1rem' } : undefined}
                        />
                      ))}
                    </span>
                    {isHere && (
                      <span aria-hidden="true" className="absolute -top-2 right-4 flex gap-1.5">
                        {[0, 1, 2].map((k) => (
                          <span key={k} className="steam-rise block h-7 w-1.5 rounded-full bg-white/40 blur-[3px]" style={{ animationDelay: `${k * 0.4}s`, animationDuration: '1.4s' }} />
                        ))}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 min-h-[3rem] text-sm leading-snug text-[#e6ebf8]" aria-live="polite">
              {sentBack && !served && v.rejected ? '↺ ' : ''}
              {status}
            </p>
          </div>

          {/* the served record */}
          <div className="lg:col-span-4">
            <div className="relative rounded-sm bg-[#101a3d] p-6 font-mono text-[0.85rem] leading-relaxed text-[#dfe5f5]">
              <p className="marker-type font-body text-sm text-saffron">Structured EMR record</p>
              {pos < 0 ? (
                <p className="mt-4 font-body text-base text-[#aebce2]">Press “Cook this order” to watch the record fill in.</p>
              ) : (
                <dl className="mt-4 space-y-2">
                  {v.record.slice(0, fieldsShown).map(([k, val]) => (
                    <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 [animation:flicker-on_0.5s_ease-out]">
                      <dt className="text-[#8fa0d0]">{k}</dt>
                      <dd className={val.endsWith('HELD') ? 'text-saffron' : 'text-steam'}>{val}</dd>
                    </div>
                  ))}
                  {!served && <div className="text-[#8fa0d0]">…</div>}
                </dl>
              )}
              {served && (
                <span aria-hidden="true" className={`stamp-in marker-type absolute -right-3 -top-4 rounded-sm border-[3px] bg-[#101a3d] px-3 py-1 text-xl ${v.rejected ? 'border-banner text-[#ff8a73]' : 'border-saffron text-saffron'}`}>
                  {v.rejected ? 'Held' : 'Served'}
                </span>
              )}
              {served && <p className="mt-5 border-t border-white/10 pt-3 font-body text-sm text-saffron">{v.flag}</p>}
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-sm text-[#c2cceb]">
          This is a scripted replay: the outputs are pre-written to show how the production pipeline behaves, and no model runs in your browser.
          In production this pipeline cut manual documentation by 50%.
        </p>
      </div>
    </section>
  );
};
