import React, { useState, useEffect } from 'react';
import { Bot, Terminal, Volume2, VolumeX, Menu, X, FileDown } from 'lucide-react';
import { soundSys } from '../utils/audioSynthesis';

interface NavbarProps {
  onOpenAgent: () => void;
  onOpenCommandPalette: () => void;
  audioMuted: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAgent,
  onOpenCommandPalette,
  audioMuted,
  onToggleAudio,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'AI Demo', href: '#demo', highlight: true },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    soundSys.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-obsidian-950/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/40 py-2.5 sm:py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer shrink-0"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 group-hover:border-cyan-400/70 transition-all shrink-0">
              <span className="font-mono font-bold text-cyan-400 text-xs">SN</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-xs sm:text-sm tracking-wide text-white group-hover:text-cyan-300 transition-colors truncate max-w-[170px] sm:max-w-none">
                Sworup Ranjan Nayak
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 truncate">
                AI/ML &bull; Fullstack
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Hidden on iPad portrait and mobile, visible on desktop >= 1024px) */}
          <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  link.highlight
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 hover:bg-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Deck */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Quick Command Palette Button (Tablet & Desktop) */}
            <button
              onClick={() => {
                soundSys.playClick();
                onOpenCommandPalette();
              }}
              className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all"
              title="Command Palette (Cmd+K)"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>⌘K</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => onToggleAudio()}
              className={`p-2 rounded-lg border transition-all ${
                audioMuted
                  ? 'border-white/10 text-slate-400 hover:text-slate-200'
                  : 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
              }`}
              title={audioMuted ? 'Unmute procedural audio' : 'Mute audio'}
            >
              {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Resume Button */}
            <a
              href="mailto:sworupnayak62@gmail.com?subject=Resume%20Request%20-%20Sworup%20Ranjan%20Nayak"
              onClick={() => soundSys.playClick()}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-xs font-mono text-slate-200 hover:text-white transition-all"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>CV</span>
            </a>

            {/* AI Agent Chat Trigger */}
            <button
              onClick={() => {
                soundSys.playChirp();
                onOpenAgent();
              }}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/40 hover:bg-cyan-500/20 text-xs font-mono text-cyan-300 hover:text-white transition-all shrink-0"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden xs:inline">Sworup AI</span>
              <span className="xs:hidden">AI</span>
            </button>

            {/* Hamburger Menu (iPad & Mobile: < 1024px) */}
            <button
              onClick={() => {
                soundSys.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 lg:hidden rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 ml-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & iPad Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-obsidian-950/95 backdrop-blur-2xl flex flex-col pt-20 px-6 animate-fadeIn">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="font-mono text-xs text-slate-400">Navigation Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg border border-white/10 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-2 py-6 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`py-3 px-3 rounded-xl flex items-center justify-between transition-colors ${
                  link.highlight
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-slate-500 text-xs">&rarr;</span>
              </a>
            ))}
          </div>

          <div className="mt-auto pb-8 pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgent();
              }}
              className="w-full py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center space-x-2"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Launch Sworup AI Chat</span>
            </button>

            <a
              href="mailto:sworupnayak62@gmail.com?subject=Resume%20Request%20-%20Sworup%20Ranjan%20Nayak"
              onClick={() => {
                soundSys.playClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center space-x-2 text-center"
            >
              <FileDown className="w-4 h-4 text-emerald-400" />
              <span>Request Verified CV (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
