import React from 'react';
import { ChevronDown } from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '../data/portfolioData';
import { useLit } from '../utils/useLit';

const SHORT_TITLES = ['AI & agents', 'Frontend', 'Backend & real-time', 'Cloud & delivery'];

const SkillList: React.FC<{ cat: SkillCategory }> = ({ cat }) => (
  <ul className="mt-5 space-y-3">
    {cat.skills.map((s) => (
      <li key={s.name} className="group">
        <span className={`text-[1.05rem] font-semibold ${s.highlight ? 'text-saffron' : 'text-steam'}`}>
          {s.name}
          {s.highlight && <span className="sr-only"> (house special)</span>}
        </span>
        <p className="mt-0.5 text-sm text-[#8f887c] transition-colors group-hover:text-steam-dim">{s.tags.join(' · ')}</p>
      </li>
    ))}
  </ul>
);

export const MenuBoard: React.FC = () => {
  const [ref, lit] = useLit<HTMLDivElement>(0.15);
  const cats = PORTFOLIO_DATA.skillsCategories;
  return (
    <section id="skills" className="relative mx-auto max-w-[1240px] overflow-x-clip px-4 py-24 sm:px-8 lg:py-32">
      <div className="max-w-2xl">
        <h2 className="brush-type text-[clamp(3.2rem,7vw,5.5rem)] text-saffron">The menu</h2>
        <p className="mt-4 text-lg leading-relaxed text-steam-dim">
          What he cooks with. Items in <span className="text-saffron">saffron</span> are the house specials, his strongest tools.
        </p>
      </div>

      {/* tablet and up: the whole board hangs and settles (gently, it is tall) */}
      <div ref={ref} className={`hang mt-12 hidden md:block ${lit ? 'settle-in' : ''}`} style={{ animationDuration: '1.6s' }}>
        <div className="board border-[10px] border-[#2a2219] px-6 py-10 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 gap-x-14 gap-y-12">
            {cats.map((cat, i) => (
              <div key={cat.title}>
                <h3 className="marker-type border-b-2 border-dashed border-[#4a4032] pb-2 text-2xl text-steam">{SHORT_TITLES[i] ?? cat.title}</h3>
                <p className="mt-2 text-sm text-steam-dim">{cat.description}</p>
                <SkillList cat={cat} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* phones: one course open at a time, the specials previewed on the closed rows, so the
          board is a few screens shorter and never swings */}
      <div className="board mt-10 border-[6px] border-[#2a2219] px-4 py-2 md:hidden">
        {cats.map((cat, i) => {
          const specials = cat.skills.filter((s) => s.highlight).slice(0, 3).map((s) => s.name.replace(/ \(.*\)$/, ''));
          return (
            <details key={cat.title} {...({ name: 'menu' } as object)} open={i === 0} className="group border-b-2 border-dashed border-[#4a4032] last:border-b-0">
              <summary className="flex list-none items-start gap-3 py-4 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1">
                  <span className="marker-type block text-2xl leading-tight text-steam">{SHORT_TITLES[i] ?? cat.title}</span>
                  <span className="mt-1 block text-sm text-saffron group-open:hidden">{specials.join(' · ')}</span>
                </span>
                <ChevronDown className="mt-1.5 h-5 w-5 shrink-0 text-saffron transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="pb-5">
                <p className="text-sm text-steam-dim">{cat.description}</p>
                <SkillList cat={cat} />
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
};
