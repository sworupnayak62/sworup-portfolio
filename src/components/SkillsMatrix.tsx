import React from 'react';
import { Cpu, Layout, Server, Cloud } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const getSkillCategoryIcon = (index: number) => {
    switch (index) {
      case 0: return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 1: return <Layout className="w-5 h-5 text-emerald-400" />;
      case 2: return <Server className="w-5 h-5 text-purple-400" />;
      default: return <Cloud className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-10 pb-4 border-b border-white/10">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="tracking-widest uppercase">TECHNICAL TOOLKIT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Core Technologies &amp; Skills
        </h2>
      </div>

      {/* 4-Quadrant Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PORTFOLIO_DATA.skillsCategories.map((category, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-obsidian-900/80 border border-white/10 p-6 space-y-4 hover:border-cyan-500/30 transition-all backdrop-blur-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                {getSkillCategoryIcon(idx)}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{category.title}</h3>
                <p className="text-xs text-slate-400">{category.description}</p>
              </div>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs border transition-colors ${
                    skill.highlight
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
