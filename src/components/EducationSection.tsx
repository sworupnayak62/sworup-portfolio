import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, BookOpen } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-white/10">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="tracking-widest uppercase">ACADEMIC FOUNDATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Education &amp; Honors
        </h2>
      </div>

      <div className="rounded-2xl bg-obsidian-900/80 border border-white/10 p-6 sm:p-8 hover:border-cyan-500/30 transition-all backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {education.degree}
              </h3>
              <div className="text-base text-cyan-300 font-medium mt-1">
                {education.institution}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400 mt-2">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  {education.location}
                </span>
                <span className="flex items-center text-slate-300">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  Class of {education.graduationDate}
                </span>
              </div>
            </div>
          </div>

          {/* CGPA Honors Badge */}
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-obsidian-950 border border-emerald-500/30 font-mono self-start lg:self-auto">
            <Award className="w-6 h-6 text-emerald-400" />
            <div>
              <div className="text-2xl font-bold text-emerald-400">{education.cgpa}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Cumulative GPA</div>
            </div>
          </div>
        </div>

        {/* Coursework & Focus Highlights */}
        <div className="pt-6 space-y-4">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center">
            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
            Academic Rigor &amp; Engineering Focus
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            {education.highlights.map((h, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 leading-relaxed"
              >
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
