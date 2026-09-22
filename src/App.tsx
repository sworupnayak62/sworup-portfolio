import React, { useState } from 'react';
import { AgentCanvas } from './components/AgentCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsBento } from './components/ProjectsBento';
import { InteractiveDemo } from './components/InteractiveDemo';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EducationSection } from './components/EducationSection';
import { ContactHub } from './components/ContactHub';
import { CommandPalette } from './components/CommandPalette';
import { AIAgentDrawer } from './components/AIAgentDrawer';
import { soundSys } from './utils/audioSynthesis';

export const App: React.FC = () => {
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(soundSys.getMuted());

  const handleToggleAudio = () => {
    const newMuted = soundSys.toggleMute();
    setAudioMuted(newMuted);
  };

  return (
    <div className="relative min-h-screen bg-obsidian-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Interactive 2D Neural Node Background Canvas */}
      <AgentCanvas />

      {/* Global Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenAgent={() => setIsAgentOpen(true)}
        onToggleAudio={handleToggleAudio}
        audioMuted={audioMuted}
      />

      {/* Embedded Sworup AI Conversational Assistant Drawer */}
      <AIAgentDrawer
        isOpen={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
      />

      {/* Navigation Command Header */}
      <Navbar
        onOpenAgent={() => setIsAgentOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        audioMuted={audioMuted}
        onToggleAudio={handleToggleAudio}
      />

      {/* Clean, Non-Cluttered Main Sections */}
      <main className="relative z-10">
        <Hero onOpenAgent={() => setIsAgentOpen(true)} />
        <ProjectsBento />
        <InteractiveDemo />
        <SkillsMatrix />
        <EducationSection />
        <ContactHub />
      </main>
    </div>
  );
};

export default App;
