import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useLit } from '../utils/useLit';

const SHORT_TITLES = ['AI & agents', 'Frontend', 'Backend & real-time', 'Cloud & delivery'];

export const MenuBoard: React.FC = () => {
  const [ref, lit] = useLit<HTMLDivElement>(0.15);
  return (
    <section id="skills" className="relative mx-auto max-w-[1240px] px-4 py-24 sm:px-8 lg:py-32">
      <div className="max-w-2xl">
        <h2 className="brush-type text-[clamp(3.2rem,7vw,5.5rem)] text-saffron">The menu</h2>
        <p className="mt-4 text-lg leading-relaxed text-steam-dim">
          What he cooks with. Items in <span className="text-saffron">saffron</span> are the house specials, his strongest tools.
        </p>
      </div>

      <div ref={ref} className={`hang mt-12 ${lit ? 'swing-in' : ''}`} style={{ animationDuration: '2.2s' }}>
        <div className="board border-[10px] border-[#2a2219] px-6 py-10 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2">
            {PORTFOLIO_DATA.skillsCategories.map((cat, i) => (
              <div key={cat.title}>
                <h3 className="marker-type border-b-2 border-dashed border-[#4a4032] pb-2 text-2xl text-steam">{SHORT_TITLES[i] ?? cat.title}</h3>
                <p className="mt-2 text-sm text-steam-dim">{cat.description}</p>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
