import React, { useState } from 'react';
import { Terminal, Cpu, Bot, Layers, Mic, FileCheck, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';
import { soundSys } from '../utils/audioSynthesis';

export const ProjectsBento: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

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
          Click on any card to view architectural details
        </p>
      </div>

      {/* Clean Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PORTFOLIO_DATA.projects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              soundSys.playClick();
              setActiveModalProject(project);
            }}
            className="group relative rounded-2xl bg-obsidian-900/80 border border-white/10 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-cyan-950/30 backdrop-blur-sm cursor-pointer"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                  {getIcon(project.iconName)}
                </div>
                <div className="flex items-center space-x-1.5 text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span className="text-[11px] font-mono">Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    soundSys.playClick();
                  }}
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

      {/* Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

    </section>
  );
};
