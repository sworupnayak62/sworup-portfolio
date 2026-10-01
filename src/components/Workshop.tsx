import React from 'react';
import { ChevronDown } from 'lucide-react';
import { PORTFOLIO_DATA, ExperienceRole } from '../data/portfolioData';
import { useLit } from '../utils/useLit';

const Role: React.FC<{ r: ExperienceRole; tone: string }> = ({ r, tone }) => {
  const [ref, lit] = useLit<HTMLElement>(0.2);
  const groups = r.bulletPoints.reduce<Record<string, string[]>>((acc, b) => {
    (acc[b.category] ||= []).push(b.text);
    return acc;
  }, {});

  return (
    <article ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className={`hang ${lit ? 'swing-in' : ''}`}>
          <div className={`brushed ${tone} px-7 pb-7 pt-6`}>
            <h3 className="brush-type text-[2.6rem] sm:text-[3rem]">{r.role}</h3>
            <p className="mt-2">{r.company} · {r.location}</p>
            <p className="marker-type mt-1 text-base opacity-85">{r.period}</p>
          </div>
        </div>
        <p className="mt-6 max-w-[60ch] text-[1.05rem] leading-relaxed text-steam">{r.summary}</p>
      </div>

      <div className="lg:col-span-7">
        {/* each number is threaded to this role, so it never floats free of where it came from */}
        <ul className="relative flex flex-wrap gap-x-5 gap-y-8 pt-6" aria-label={`Results as ${r.role}`}>
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[#6b5a40]" />
          {r.impactMetrics.map((m, i) => (
            <li key={m.label} className="relative pt-5">
              <span aria-hidden="true" className="absolute left-8 top-[-1.5rem] h-11 w-px bg-[#6b5a40]" />
              <div className="hang sway" style={{ animationDelay: `${-i * 1.3}s`, animationDuration: '6.5s' }}>
                <div className="marker-card w-[9.4rem] px-3 py-3 sm:w-[11.5rem] sm:px-4" style={{ rotate: `${[-2, 1.5, -1, 2][i % 4]}deg` }}>
                  <span className="marker-type block text-[2.1rem] leading-none text-banner-deep">{m.value}</span>
                  <span className="marker-type mt-1 block text-[0.95rem] leading-tight">{m.label}</span>
                  <span className="mt-2 block text-[0.78rem] leading-snug text-[#3a2c18]">{m.detail}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <details className="group mt-10 border-t border-white/10 pt-4">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-steam-dim transition-colors hover:text-saffron [&::-webkit-details-marker]:hidden">
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            <span className="marker-type">Read the full ledger ({r.bulletPoints.length} entries)</span>
          </summary>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {Object.entries(groups).map(([cat, items]) => (
              <div key={cat}>
                <h4 className="marker-type text-lg text-saffron">{cat}</h4>
                <ul className="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-steam-dim">
                  {items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[0.78rem] text-[#8f887c]">{r.skillsUsed.join(' · ')}</p>
        </details>
      </div>
    </article>
  );
};

export const Workshop: React.FC = () => {
  const { experiences, education } = PORTFOLIO_DATA;
  return (
    <section id="workshop" className="relative bg-asphalt-2 py-24 lg:py-32" style={{ backgroundImage: "url('/grain.svg')" }}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="brush-type text-[clamp(3.2rem,7vw,5.5rem)] text-saffron">The workshop</h2>
          <p className="mt-4 text-lg leading-relaxed text-steam-dim">
            Where the stalls were built: three years (2023 to 2026) shipping hospital software at Squbix, from form engines to agent pipelines.
          </p>
        </div>

        <div className="mt-16 space-y-24">
          {experiences.map((r, i) => (
            <Role key={r.id} r={r} tone={i === 0 ? 'bg-banner text-steam' : 'bg-marigold text-[#17130d]'} />
          ))}
        </div>

        {/* the diploma pinned on the workshop wall */}
        <div className="mt-24 grid grid-cols-1 items-center gap-10 border-t border-white/10 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="brush-type text-[2.6rem] text-steam">{education.degree}</h3>
            <p className="mt-2 text-steam">{education.institution} · class of {education.graduationDate}</p>
          </div>
          <div className="flex flex-wrap items-start gap-8 lg:col-span-7">
            <div className="marker-card px-6 py-4" style={{ rotate: '2deg' }}>
              <span className="marker-type block text-5xl leading-none text-banner-deep">9.1</span>
              <span className="marker-type mt-1 block">CGPA out of 10</span>
            </div>
            <ul className="max-w-md flex-1 space-y-2 text-[0.95rem] leading-relaxed text-steam-dim">
              {education.highlights.slice(1).map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
