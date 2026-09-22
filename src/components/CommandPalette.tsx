import React, { useState, useEffect, useRef } from 'react';
import { Search, Bot, Sparkles, ExternalLink, Copy, Volume2, VolumeX, ArrowRight, CornerDownLeft } from 'lucide-react';
import { soundSys } from '../utils/audioSynthesis';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAgent: () => void;
  onToggleAudio: () => void;
  audioMuted: boolean;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'External';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenAgent,
  onToggleAudio,
  audioMuted,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, label: string) => {
    soundSys.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const navigateTo = (selector: string) => {
    soundSys.playClick();
    onClose();
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const commands: CommandItem[] = [
    {
      id: 'ai-agent',
      category: 'Actions',
      title: 'Launch Sworup AI Chat Assistant',
      subtitle: 'Ask about LangGraph, React, or his projects',
      icon: <Bot className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        onOpenAgent();
      },
    },
    {
      id: 'nav-proj',
      category: 'Navigation',
      title: 'Jump to Featured Projects',
      subtitle: 'GitHub MCP, Clinical Pipeline, Data Entry AI Agent',
      icon: <ArrowRight className="w-4 h-4 text-slate-400" />,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'nav-demo',
      category: 'Navigation',
      title: 'Jump to Interactive AI Demo',
      subtitle: 'Test live LangGraph clinical text extraction',
      icon: <ArrowRight className="w-4 h-4 text-cyan-400" />,
      action: () => navigateTo('#demo'),
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Explore Technical Skills',
      subtitle: 'LangGraph, React, TypeScript, Python, AWS',
      icon: <ArrowRight className="w-4 h-4 text-slate-400" />,
      action: () => navigateTo('#skills'),
    },
    {
      id: 'copy-email',
      category: 'Actions',
      title: 'Copy Email Address',
      subtitle: PORTFOLIO_DATA.personal.email,
      icon: <Copy className="w-4 h-4 text-cyan-300" />,
      action: () => copyToClipboard(PORTFOLIO_DATA.personal.email, 'Email copied!'),
    },
    {
      id: 'copy-phone',
      category: 'Actions',
      title: 'Copy Phone Number',
      subtitle: PORTFOLIO_DATA.personal.phone,
      icon: <Copy className="w-4 h-4 text-cyan-300" />,
      action: () => copyToClipboard(PORTFOLIO_DATA.personal.phone, 'Phone copied!'),
    },
    {
      id: 'toggle-sound',
      category: 'Actions',
      title: audioMuted ? 'Enable Procedural Audio SFX' : 'Mute Audio SFX',
      subtitle: 'Procedural Web Audio feedback',
      icon: audioMuted ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />,
      action: () => onToggleAudio(),
    },
    {
      id: 'ext-linkedin',
      category: 'External',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/sworup-ranjan-nayak',
      icon: <ExternalLink className="w-4 h-4 text-sky-400" />,
      action: () => window.open(PORTFOLIO_DATA.personal.linkedin, '_blank'),
    },
    {
      id: 'ext-github',
      category: 'External',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/sworupnayak62',
      icon: <ExternalLink className="w-4 h-4 text-slate-300" />,
      action: () => window.open(PORTFOLIO_DATA.personal.github, '_blank'),
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      soundSys.playClick();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      soundSys.playClick();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-obsidian-950/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-obsidian-900 border border-white/15 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col z-10 animate-slideDown">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-white/5">
          <Search className="w-4 h-4 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownList}
            placeholder="Search commands or jump to section..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-mono"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/10 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Copy Feedback */}
        {copiedText && (
          <div className="px-4 py-1.5 bg-emerald-500/20 border-b border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between">
            <span>{copiedText}</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-500 font-mono text-xs">
              No matching commands found
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-cyan-500/15 border border-cyan-500/30 text-white'
                      : 'hover:bg-white/5 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-medium font-sans">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="text-[11px] font-mono text-slate-400 truncate">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 ml-2 hidden sm:flex items-center text-slate-500">
                    <CornerDownLeft className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/10 bg-obsidian-950 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span className="text-cyan-400/80">Sworup Navigation</span>
        </div>
      </div>
    </div>
  );
};
