import React from 'react';
import { Terminal, Cpu, Bot, Layers, Mic, FileCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { soundSys } from '../utils/audioSynthesis';

export const ProjectsBento: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-cyan-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-purple-400" />;
      case 'Mic': return <Mic className="w-5 h-5 text-sky-400" />;
      default: return <FileCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-widest uppercase">FEATURED WORK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Key Systems &amp; Projects
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-400 mt-2 sm:mt-0">
          Production architectures &amp; open-source implementations
        </p>
      </div>

      {/* Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PORTFOLIO_DATA.projects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl bg-obsidian-900/80 border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-cyan-950/30 backdrop-blur-sm"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                  {getIcon(project.iconName)}
                </div>
                <span className="text-[10px] font-mono text-cyan-400/90 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                  {project.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Bottom Meta */}
            <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech, tIdx) => (
                  <span key={tIdx} className="tech-badge text-[10px]">
                    {tech}
                  </span>
                ))}
              </div>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundSys.playClick()}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="View GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
