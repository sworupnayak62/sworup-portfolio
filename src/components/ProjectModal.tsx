import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Terminal, Cpu, Bot, Layers, Mic, FileCheck, Copy, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '../data/portfolioData';
import { soundSys } from '../utils/audioSynthesis';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Terminal': return <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />;
      case 'Bot': return <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />;
      case 'Layers': return <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />;
      case 'Mic': return <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />;
      default: return <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />;
    }
  };

  const copyUrl = () => {
    if (project.githubUrl) {
      soundSys.playSuccess();
      navigator.clipboard.writeText(project.githubUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian-950/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-obsidian-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-10 max-h-[88vh] flex flex-col animate-slideDown">
        
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-obsidian-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3 truncate mr-2">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
              {getIcon(project.iconName)}
            </div>
            <div className="truncate">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {project.badge}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1 truncate">{project.title}</h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundSys.playClick();
              onClose();
            }}
            className="p-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto font-sans text-xs sm:text-sm">
          
          {/* Tagline */}
          <div className="text-xs sm:text-sm font-mono text-cyan-300 bg-cyan-950/30 border border-cyan-500/20 p-3 rounded-xl leading-relaxed">
            {project.tagline}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">System Overview</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture Highlights */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Architectural Components</h4>
            <div className="space-y-1.5">
              {project.architecture.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-200 font-mono bg-white/5 p-2.5 rounded-lg border border-white/5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Quantified Engineering Impact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-obsidian-950 border border-emerald-500/20 text-center font-mono">
                  <Sparkles className="w-3 h-3 text-emerald-400 mx-auto mb-1" />
                  <div className="text-xs font-bold text-white">{metric}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Tech Stack &amp; Libraries</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="tech-badge text-[11px]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3.5 bg-obsidian-950 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            onClick={copyUrl}
            className="flex items-center justify-center sm:justify-start space-x-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors py-1"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Repository Link</span>
          </button>

          <div className="flex items-center justify-end space-x-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundSys.playClick()}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs flex items-center justify-center space-x-2 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repo</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
