import React from 'react';
import { Download, ExternalLink, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundSys } from '../utils/audioSynthesis';
import { useLit } from '../utils/useLit';

export const CV_URL = '/Sworup_Ranjan_Nayak_CV.pdf';

const { personal, experiences, projects, skillsCategories, education } = PORTFOLIO_DATA;
const TOOLS = skillsCategories.reduce((n, c) => n + c.skills.length, 0);

type Line = { qty: string; item: string; note: string; extras?: [string, string][]; price?: string };

// Every line comes from portfolioData.ts; the "prices" are resume metrics, nothing on the bill is invented.
const LINES: Line[] = [
  ...experiences.map((r): Line => ({
    qty: '1',
    item: `${r.role}, ${r.company.replace(' Pvt Ltd', '')}`,
    note: r.period,
    extras: r.impactMetrics.slice(0, 2).map((m): [string, string] => [m.label.toLowerCase(), m.value]),
  })),
  { qty: String(projects.length), item: 'Projects from the stalls', note: 'see above' },
  { qty: String(TOOLS), item: 'Tools on the menu', note: 'AI, frontend, backend, cloud' },
  { qty: '1', item: 'B.Tech, Computer Science and Engineering', note: education.institution.split(',')[0], price: `${education.cgpa.split(' /')[0]} CGPA` },
];

// The bill: a guest check in a leather folder on a tray, with the CV as the thing you take away.
export const Bill: React.FC = () => {
  const [ref, lit] = useLit<HTMLDivElement>(0.3);
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <section id="bill" className="relative mx-auto max-w-[1240px] px-4 py-24 sm:px-8 lg:py-32">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-y-12">
        <div className="lg:col-span-5 lg:self-end">
          <h2 className="brush-type text-[clamp(3.2rem,7vw,5.5rem)] text-saffron">The bill</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-steam-dim">
            Everything you saw tonight, itemized on one page. The prices are his numbers, straight off the resume.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={CV_URL} download onClick={() => soundSys.playSuccess()} className="btn-glow brushed">
              <Download className="h-5 w-5" aria-hidden="true" />
              Download CV
            </a>
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-steam-dim underline decoration-dashed underline-offset-4 transition-colors hover:text-saffron"
            >
              Open in a new tab
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-3 text-sm text-[#8f887c]">PDF, one page</p>
        </div>

        {/* the tray: leather check folder, the printed check, two mints */}
        <div ref={ref} className="relative mx-auto w-full max-w-[36rem] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div className="relative rounded-md bg-[#3a2616] p-2.5 shadow-[0_30px_50px_-24px_rgba(0,0,0,0.9)] sm:p-6" style={{ rotate: '-1.5deg' }}>
            <span aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[4px] border border-dashed border-[#8a6a3a]/50" />
            <div className={`receipt relative mx-auto max-w-[27rem] bg-[#f4efe4] px-4 pb-8 pt-6 sm:px-6 text-[#17130d] ${lit ? '[animation:print-in_0.9s_var(--ease-out)_both]' : 'opacity-0'}`}>
              <p className="text-center font-mono text-[0.72rem] tracking-[0.18em] text-[#4a3a22]">SWORUP'S NIGHT MARKET</p>
              <p className="text-center font-mono text-[0.7rem] text-[#5a4a32]">{personal.location}</p>
              <p className="brush-type mt-1 text-center text-3xl">Guest check</p>
              <div className="mt-3 flex justify-between font-mono text-[0.7rem] text-[#4a3a22]">
                <span>Table: you</span>
                <span>Server: Sworup</span>
                <span>{today}</span>
              </div>

              <table className="mt-2 w-full border-t border-dashed border-[#17130d]/40 font-mono text-[0.74rem] tabular-nums sm:text-[0.8rem]">
                <caption className="sr-only">What the CV covers</caption>
                <tbody>
                  {LINES.map(({ qty, item, note, extras, price }) => (
                    <React.Fragment key={item}>
                      <tr className="align-top">
                        <td className="w-7 pr-1.5 pt-3 sm:w-8 sm:pr-2 text-[#4a3a22]">{qty}×</td>
                        <td className="pt-3">
                          <span className="block font-body text-[0.95rem] font-semibold leading-snug">{item}</span>
                          <span className="block text-[#5a4a32]">{note}</span>
                        </td>
                        <td className="whitespace-nowrap pl-3 pt-3 text-right align-top font-semibold">{price}</td>
                      </tr>
                      {extras?.map(([label, value]) => (
                        <tr key={label} className="text-[#3a2e1c]">
                          <td />
                          <td className="pt-0.5 before:mr-1 before:content-['+']">{label}</td>
                          <td className="whitespace-nowrap pl-3 pt-0.5 text-right font-semibold">{value}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              <div className="mt-5 border-t-2 border-[#17130d] pt-3">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="marker-type text-lg">Total</span>
                  <span className="text-right font-mono text-[0.85rem]">3 years of production software</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className={`marker-type rotate-[-8deg] rounded-sm border-[3px] border-banner-deep px-2.5 py-0.5 text-lg text-banner-deep ${lit ? 'stamp-in [animation-delay:0.8s]' : 'opacity-0'}`}>
                    Open for work
                  </span>
                </div>
              </div>
              {/* barcode + sign-off */}
              <div aria-hidden="true" className="mt-5 h-9 bg-[repeating-linear-gradient(90deg,#17130d_0_2px,transparent_2px_4px,#17130d_4px_5px,transparent_5px_8px,#17130d_8px_11px,transparent_11px_12px)]" />
              <p className="mt-2 text-center font-mono text-[0.7rem] tracking-[0.2em] text-[#4a3a22]">THANK YOU, COME AGAIN</p>
            </div>
          </div>
          {/* two wrapped mints on the tray */}
          <span aria-hidden="true" className="absolute -bottom-3 left-10 flex gap-3">
            {['#efe9df', '#f7b32b'].map((c) => (
              <span key={c} className="relative block h-5 w-9 rounded-full border-2 border-[#17130d]/60 shadow-[0_6px_8px_-4px_rgba(0,0,0,0.7)]" style={{ background: c }}>
                <span className="absolute -left-2 top-1/2 h-3 w-2.5 -translate-y-1/2 bg-inherit [clip-path:polygon(0_0,100%_50%,0_100%)]" style={{ background: c }} />
                <span className="absolute -right-2 top-1/2 h-3 w-2.5 -translate-y-1/2 [clip-path:polygon(100%_0,0_50%,100%_100%)]" style={{ background: c }} />
              </span>
            ))}
          </span>
        </div>
        {/* the tip card: the only tip that matters is a conversation (under the check on phones) */}
        <div className="lg:col-span-5 lg:self-start">
          <div className="relative mx-auto max-w-sm lg:mx-0 rotate-[1.5deg] bg-kraft px-5 pb-5 pt-6 text-[#17130d] shadow-[0_18px_30px_-16px_rgba(0,0,0,0.85)]">
            <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-steam/70" />
            <p className="marker-type text-xl">Leaving a tip?</p>
            <p className="mt-2 leading-relaxed text-[#3a2e1c]">
              The best one is a conversation. He's open for AI/ML, agentic and fullstack work, full-time or contract.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={`mailto:${personal.email}?subject=${encodeURIComponent('Saw your portfolio')}`}
                onClick={() => soundSys.playClick()}
                className="inline-flex items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4 hover:text-banner-deep"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email him
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4 hover:text-banner-deep"
              >
                LinkedIn
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
