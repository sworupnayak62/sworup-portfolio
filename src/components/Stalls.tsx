import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Wrench, X } from 'lucide-react';
import { jumpTo } from './MarketMap';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { soundSys } from '../utils/audioSynthesis';
import { useLit } from '../utils/useLit';

type Tone = 'blue' | 'red' | 'gold';
interface Frontage { id: string; span: string; tone: Tone; demo?: boolean; cooking?: boolean; tools?: [string, string][] }

// Street order and frontage width (of 6 columns) for each stall
const STREET: Frontage[] = [
  {
    id: 'langgraph-clinical-agent', span: 'xl:col-span-4', tone: 'red',
    demo: true,
  },
  {
    id: 'github-mcp', span: 'xl:col-span-2', tone: 'blue',
    // generic Git operations the server exposes to agents (names simplified)
    tools: [
      ['list_repositories', 'owner'],
      ['get_file_contents', 'repo, path, ref?'],
      ['search_code', 'query'],
      ['list_commits', 'repo, branch?'],
      ['list_pull_requests', 'repo, state?'],
      ['get_pull_request_diff', 'repo, number'],
      ['create_issue', 'repo, title, body'],
      ['comment_on_issue', 'repo, number, body'],
    ],
  },
  { id: 'telephony-voice-agent', span: 'xl:col-span-2', tone: 'gold' },
  { id: 'data-entry-ai-agent', span: 'xl:col-span-2', tone: 'red', cooking: true },
  { id: 'rag-chatbot-framework', span: 'xl:col-span-2', tone: 'blue' },
  { id: 'sts-coding-assistant', span: 'xl:col-span-4', tone: 'gold' },
  { id: 'ai-portfolio-agent', span: 'xl:col-span-2', tone: 'red' },
];

const SIGN_BG = { blue: 'bg-awning text-steam', red: 'bg-banner text-steam', gold: 'bg-marigold text-[#17130d]' };

const Stall: React.FC<{ p: Project; f: Frontage; wide: boolean; index: number }> = ({ p, f, wide, index }) => {
  const { span, tone, demo, cooking, tools } = f;
  const [ref, lit] = useLit<HTMLElement>(0.2);
  const [menu, setMenu] = useState(false);
  const [passed, setPassed] = useState(false);
  const self = useRef<HTMLElement | null>(null);

  // night shift: once you've walked past a stall, its lights go down
  useEffect(() => {
    const el = self.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPassed(!e.isIntersecting && e.boundingClientRect.bottom < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <article
      id={p.id}
      ref={(el) => { ref.current = el; self.current = el; }}
      onMouseEnter={() => soundSys.playTick(1.2)}
      className={`group relative flex scroll-mt-24 flex-col self-start ${span} md:col-span-3`}
    >
      {/* tonight's special: a chalk tag clipped to the awning of whatever he is building now */}
      {cooking && (
        <span className="marker-type absolute -right-1 -top-4 z-10 flex rotate-[4deg] items-center gap-2 rounded-sm bg-[#1c1a17] px-3 py-1.5 text-[0.95rem] text-steam shadow-[0_10px_18px_-8px_rgba(0,0,0,0.8)] ring-2 ring-[#4a4032]">
          <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-marigold opacity-70" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-marigold" />
          </span>
          On the stove now
        </span>
      )}
      <div className="awning transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-y-[1.06]" data-tone={tone === 'blue' ? undefined : tone} aria-hidden="true" />

      {/* bulbs under the awning: they chase toward the stall you are looking at */}
      <div aria-hidden="true" className="-mt-1 flex justify-around px-4">
        {Array.from({ length: wide ? 12 : 6 }).map((_, i) => (
          <span
            key={i}
            className={`bulb ${passed ? 'is-warm' : lit ? 'is-on' : ''} group-hover:[animation:chase_0.7s_var(--d)_ease-out_2]`}
            style={{ '--d': `${i * 55}ms`, transitionDelay: `${index * 120 + i * 60}ms` } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="board mt-3 flex flex-1 flex-col px-5 pb-6 pt-2 sm:px-7">
        {/* hanging sign board */}
        <div className={`hang -mt-1 self-start ${lit ? 'swing-in' : ''} transition-transform duration-500 group-hover:rotate-[-1.5deg]`}>
          <h3 className={`brushed brush-type ${SIGN_BG[tone]} px-6 pb-4 pt-3 text-[2rem] leading-[0.95] sm:text-[2.35rem]`}>
            {p.title}
          </h3>
        </div>

        {menu && tools ? (
          <div className="mt-5">
            <p className="text-xs text-steam-dim">tools/list · generic Git operations (names simplified)</p>
            <ul className="mt-3 space-y-1.5 font-mono text-[0.78rem] leading-snug" aria-label="Tools the server exposes">
              {tools.map(([name, args]) => (
                <li key={name} className="[animation:flicker-on_0.4s_ease-out]">
                  <span className="text-saffron">{name}</span>
                  <span className="text-steam-dim">({args})</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-relaxed text-steam">{p.tagline}</p>
        )}
        {tools && (
          <button
            onClick={() => { setMenu((m) => !m); soundSys.playClick(); }}
            aria-expanded={menu}
            className="mt-4 inline-flex items-center gap-2 self-start text-sm text-saffron underline decoration-dashed underline-offset-4 hover:no-underline"
          >
            {menu ? <X className="h-4 w-4" aria-hidden="true" /> : <Wrench className="h-4 w-4" aria-hidden="true" />}
            {menu ? 'Back to the stall' : 'Show the tool menu agents see'}
          </button>
        )}

        {wide && (
          <ul className="mt-5 space-y-2 text-[0.95rem] text-steam-dim">
            {p.architecture.map((a) => (
              <li key={a} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                {a}
              </li>
            ))}
          </ul>
        )}


        {demo && (
          <button onClick={() => jumpTo('demo')} className="mt-6 inline-flex w-fit items-center gap-2 font-semibold text-saffron underline decoration-dashed underline-offset-4 hover:no-underline">
            Watch it cook in the kitchen
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </button>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
          <ul className="flex flex-wrap gap-2" aria-label="Built with">
            {p.techStack.slice(0, wide ? 6 : 3).map((t) => (
              <li key={t} className="rounded-sm bg-asphalt-3 px-2.5 py-1 text-[0.8rem] text-steam-dim">
                {t}
              </li>
            ))}
          </ul>
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundSys.playClick()}
              aria-label={`GitHub profile (${p.title})`}
              className="inline-flex items-center gap-1.5 text-sm text-steam-dim no-underline transition-colors hover:text-saffron"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub profile
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const Stalls: React.FC = () => {
  const byId = Object.fromEntries(PORTFOLIO_DATA.projects.map((p) => [p.id, p]));
  return (
    <section id="stalls" className="relative mx-auto max-w-[1240px] px-4 py-24 sm:px-8 lg:py-32">
      <div className="max-w-2xl">
        <h2 className="brush-type text-[clamp(3.2rem,7vw,5.5rem)] text-saffron">The stalls</h2>
        <p className="mt-4 text-lg leading-relaxed text-steam-dim">
          Seven things he has built, from the clinical agent pipeline that halved charting time to a voice agent that answers the phone.
        </p>
        <button
          onClick={() => jumpTo('data-entry-ai-agent')}
          className="group/special mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-left text-steam"
        >
          <span className="marker-type whitespace-nowrap text-marigold">Tonight's special:</span>
          <span className="underline decoration-marigold decoration-dashed underline-offset-4 group-hover/special:text-saffron">
            the handwritten data-entry agent, still cooking
            <ArrowDown className="ml-1.5 inline h-4 w-4 align-[-0.15em]" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-7 gap-y-16 md:grid-cols-6">
        {STREET.map((s, i) =>
          byId[s.id] ? <Stall key={s.id} p={byId[s.id]} f={s} wide={s.span.includes('4')} index={i} /> : null
        )}
      </div>
    </section>
  );
};
