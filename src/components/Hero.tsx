import React from 'react';
import { Bot, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { soundSys } from '../utils/audioSynthesis';

interface HeroProps {
  onOpenAgent: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAgent }) => {
  const scrollTo = (id: string) => {
    soundSys.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto w-full text-center relative z-10 space-y-6 sm:space-y-8">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-[11px] sm:text-xs font-mono text-cyan-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>Available for High-Impact Roles</span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center text-slate-400">
            <MapPin className="w-3 h-3 mr-1 shrink-0" />
            Bhubaneswar, India
          </span>
        </div>

        {/* Main Name & Headline */}
        <div className="space-y-3 sm:space-y-4">
          <div className="relative inline-block max-w-full">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Sworup Ranjan Nayak
            </h1>
            {/* Ambient cyber glow behind name */}
            <div className="absolute -inset-x-4 -inset-y-2 sm:-inset-x-8 sm:-inset-y-4 bg-gradient-to-r from-cyan-500/20 via-emerald-500/15 to-sky-500/15 blur-2xl -z-10 opacity-70 pointer-events-none" />
          </div>

          <p className="text-sm sm:text-lg md:text-xl font-bold font-mono tracking-tight text-gradient-cyan px-2">
            AI/ML Engineer &bull; Agentic Systems &bull; Fullstack Developer
          </p>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed pt-1 px-2">
            Software Engineer with <strong>3+ years of experience</strong> building stateful <strong>LangGraph multi-agent pipelines</strong>, <strong>FastMCP servers</strong>, and high-performance React architectures optimized for scale and sub-second speed.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 pt-2 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => scrollTo('projects')}
            className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-obsidian-950 font-bold font-mono text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2 group"
          >
            <span>View Featured Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              soundSys.playChirp();
              onOpenAgent();
            }}
            className="px-5 sm:px-6 py-3 rounded-xl bg-obsidian-900 border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white font-mono text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-950/40"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Chat with AI</span>
          </button>

          <button
            onClick={() => scrollTo('demo')}
            className="px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-slate-200 font-mono text-xs transition-colors flex items-center justify-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Try AI Demo</span>
          </button>
        </div>

        {/* Clean 3-Metric Bar */}
        <div className="pt-4 sm:pt-6 grid grid-cols-3 max-w-xl mx-auto gap-2 sm:gap-4 font-mono text-center border-t border-white/10">
          <div className="p-2 sm:p-3 rounded-xl bg-obsidian-900/60 border border-white/5">
            <div className="text-lg sm:text-2xl font-bold text-white">3+ Years</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-tight">Production Exp</div>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-obsidian-900/60 border border-white/5">
            <div className="text-lg sm:text-2xl font-bold text-emerald-400">9.1</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-tight">B.Tech CGPA</div>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-obsidian-900/60 border border-white/5">
            <div className="text-lg sm:text-2xl font-bold text-cyan-400">35%</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-tight">Automation Gain</div>
          </div>
        </div>

      </div>
    </section>
  );
};
