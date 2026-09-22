import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, CheckCircle, Sparkles, FileDown, Terminal } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundSys } from '../utils/audioSynthesis';

export const ContactHub: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleOrSubject: 'Opportunity / Engineering Discussion',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    soundSys.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundSys.playSuccess();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#10b981', '#38bdf8'],
      });
    } catch {
      // Confetti fallback
    }

    // Build mailto link as fallback transmission
    const subject = encodeURIComponent(`[Portfolio Transmission] ${formData.roleOrSubject} from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.roleOrSubject}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-white/10">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="tracking-widest uppercase">TRANSMISSION LINK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Initiate Direct Transmission
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Available for senior AI/ML engineering, Agentic Systems architecture, and scalable React frontend leadership opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Channels & Verified Badges */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Email Card */}
          <div className="p-5 rounded-2xl bg-obsidian-900/90 border border-white/10 hover:border-cyan-500/40 transition-all font-mono space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider flex items-center">
                <Mail className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                Primary Email
              </span>
              <button
                onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.email, 'email')}
                className="text-[11px] text-cyan-300 hover:text-white flex items-center space-x-1"
              >
                {copiedKey === 'email' ? (
                  <span className="text-emerald-400 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" /> Copied!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Copy className="w-3 h-3 mr-1" /> Copy
                  </span>
                )}
              </button>
            </div>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="text-white text-sm font-semibold hover:text-cyan-300 transition-colors block truncate"
            >
              {PORTFOLIO_DATA.personal.email}
            </a>
          </div>

          {/* Phone Card */}
          <div className="p-5 rounded-2xl bg-obsidian-900/90 border border-white/10 hover:border-emerald-500/40 transition-all font-mono space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider flex items-center">
                <Phone className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Direct Line
              </span>
              <button
                onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.phone, 'phone')}
                className="text-[11px] text-emerald-300 hover:text-white flex items-center space-x-1"
              >
                {copiedKey === 'phone' ? (
                  <span className="text-emerald-400 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" /> Copied!
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Copy className="w-3 h-3 mr-1" /> Copy
                  </span>
                )}
              </button>
            </div>
            <a
              href={`tel:${PORTFOLIO_DATA.personal.phone}`}
              className="text-white text-sm font-semibold hover:text-emerald-300 transition-colors block"
            >
              {PORTFOLIO_DATA.personal.phone}
            </a>
          </div>

          {/* Location Card */}
          <div className="p-5 rounded-2xl bg-obsidian-900/90 border border-white/10 font-mono space-y-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
              Operating Base
            </span>
            <div className="text-white text-sm font-semibold">
              {PORTFOLIO_DATA.personal.location}
            </div>
            <div className="text-[11px] text-slate-500">
              Open to Remote, Hybrid &amp; Relocation
            </div>
          </div>

          {/* Social Profiles Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundSys.playClick()}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-sky-400 hover:bg-sky-500/10 text-slate-200 hover:text-sky-300 transition-all font-mono text-xs flex items-center justify-center space-x-2"
            >
              <LinkedinIcon className="w-4 h-4 text-sky-400" />
              <span>LinkedIn Profile</span>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundSys.playClick()}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/40 hover:bg-white/10 text-slate-200 hover:text-white transition-all font-mono text-xs flex items-center justify-center space-x-2"
            >
              <GithubIcon className="w-4 h-4 text-slate-300" />
              <span>GitHub Account</span>
            </a>
          </div>

          {/* Download Resume Button */}
          <a
            href="mailto:sworupnayak62@gmail.com?subject=Sworup%20Ranjan%20Nayak%20-%20Resume%20Request"
            onClick={() => soundSys.playSuccess()}
            className="w-full p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-sky-500/20 border border-cyan-400/40 hover:border-cyan-300 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-cyan-950/40 transition-all block text-center"
          >
            <FileDown className="w-4 h-4 text-cyan-400" />
            <span>Request Verified PDF Resume</span>
          </a>

        </div>

        {/* Right Column: Transmission Console Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-obsidian-900/90 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs text-white font-semibold">
                  Secure Message Transmission Gateway
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ENCRYPTED_CHANNEL
              </span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-white">Transmission Prepared</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your email client has been summoned with this transmission. Sworup will respond promptly within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-xs text-slate-300 hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 text-[11px] uppercase tracking-wider">
                      Your Name / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova / Google Health"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1.5 text-[11px] uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. elena@healthtech.io"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 text-[11px] uppercase tracking-wider">
                    Transmission Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.roleOrSubject}
                    onChange={(e) => setFormData({ ...formData, roleOrSubject: e.target.value })}
                    placeholder="e.g. Senior AI / Frontend Engineering Role"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 text-[11px] uppercase tracking-wider">
                    Message Brief
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your system architecture, project needs, or role details..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-obsidian-950 font-bold tracking-wide shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2 text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Message to Sworup</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

      {/* Global Terminal Footer */}
      <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} Sworup Ranjan Nayak. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-cyan-400/80">React 18 • TypeScript • Tailwind • Web Audio API</span>
          <span>Bhubaneswar, IN</span>
        </div>
      </footer>

    </section>
  );
};
