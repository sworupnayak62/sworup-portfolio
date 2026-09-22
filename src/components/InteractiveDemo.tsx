import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldAlert, CheckCircle, Heart, Pill } from 'lucide-react';
import { soundSys } from '../utils/audioSynthesis';

export const InteractiveDemo: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(true);

  const scenarios = [
    {
      label: 'Cardiology Follow-Up',
      input:
        '“Patient is 4 days post-op. BP recorded at 134 over 82, pulse 76 bpm. Starting Metoprolol Tartrate 25mg twice daily. Note severe allergy to Penicillin, patient had hives in 2021.”',
      vitals: [
        { label: 'BP', value: '134/82 mmHg' },
        { label: 'Pulse', value: '76 bpm' },
      ],
      meds: [{ name: 'Metoprolol Tartrate', dose: '25mg Oral BID' }],
      alert: 'Severe Penicillin G Allergy (Hives)',
      timeSaved: 'Saved ~6 minutes of manual charting',
    },
    {
      label: 'General Intake & Vitals',
      input:
        '“New intake. Reports mild fever since yesterday, temp 101.2 F. Oxygen saturation 98% room air, heart rate 84. Prescribed Paracetamol 650mg SOS. No known drug allergies.”',
      vitals: [
        { label: 'Temp', value: '101.2 °F' },
        { label: 'SpO2', value: '98%' },
      ],
      meds: [{ name: 'Paracetamol', dose: '650mg Oral SOS' }],
      alert: 'No Known Drug Allergies (NKDA)',
      timeSaved: 'Saved ~4 minutes of manual charting',
    },
  ];

  const current = scenarios[selectedScenario];

  const handleTransform = () => {
    soundSys.playChirp();
    setIsProcessing(true);
    setShowResult(false);

    setTimeout(() => {
      soundSys.playSuccess();
      setIsProcessing(false);
      setShowResult(true);
    }, 500);
  };

  return (
    <section id="demo" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Interactive AI Demo</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight px-2">
          Turning Messy Clinical Audio into Clean Records
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 px-2">
          Experience how Sworup&apos;s LangGraph multi-agent pipeline cuts documentation time by 50% by extracting vitals, medications, and allergy alerts automatically.
        </p>

        {/* Scenario Switcher Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5 sm:mt-6">
          {scenarios.map((sc, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundSys.playClick();
                setSelectedScenario(idx);
                setShowResult(true);
              }}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                selectedScenario === idx
                  ? 'bg-cyan-500 text-obsidian-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Transformation Card */}
      <div className="rounded-2xl bg-obsidian-900/90 border border-white/10 p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          
          {/* Left: Raw Spoken Dictation */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
                  1. Spoken Dictation
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  Unstructured Speech
                </span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-obsidian-950 border border-white/10 text-slate-300 text-xs sm:text-sm italic leading-relaxed min-h-[120px] sm:min-h-[140px] flex items-center">
                {current.input}
              </div>
            </div>

            <button
              onClick={handleTransform}
              disabled={isProcessing}
              className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-obsidian-950 font-bold font-mono text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{isProcessing ? 'Agent Extracting...' : 'Click to Run AI Pipeline'}</span>
            </button>
          </div>

          {/* Center: Arrow Divider */}
          <div className="lg:col-span-2 flex items-center justify-center text-slate-600">
            <div className="hidden lg:flex p-2 rounded-full bg-white/5 border border-white/10 text-cyan-400">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Right: Clean Structured Clinical Cards */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider">
                2. Structured EMR Record
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </span>
            </div>

            {showResult ? (
              <div className="space-y-2.5 animate-fadeIn">
                {/* Vitals Row */}
                <div className="p-3 rounded-xl bg-obsidian-950 border border-white/10 flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
                  <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono shrink-0">
                    <Heart className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Extracted Vitals:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono font-bold text-white">
                    {current.vitals.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px]">
                        {v.label}: {v.value}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Medication Row */}
                <div className="p-3 rounded-xl bg-obsidian-950 border border-white/10 flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
                  <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono shrink-0">
                    <Pill className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Prescription:</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-cyan-300 truncate">
                    {current.meds[0].name} ({current.meds[0].dose})
                  </div>
                </div>

                {/* Allergy / Safety Alert */}
                <div className="p-3 rounded-xl bg-obsidian-950 border border-amber-500/30 flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
                  <div className="flex items-center space-x-2 text-xs text-amber-400 font-mono shrink-0">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Safety Check:</span>
                  </div>
                  <div className="text-xs font-mono font-semibold text-amber-300">
                    {current.alert}
                  </div>
                </div>

                {/* Impact Note */}
                <div className="text-right text-[11px] font-mono text-emerald-400 pt-1">
                  ✓ {current.timeSaved}
                </div>
              </div>
            ) : (
              <div className="h-[140px] sm:h-[180px] rounded-xl bg-obsidian-950 border border-white/10 flex items-center justify-center text-cyan-400 text-xs font-mono">
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                LangGraph Multi-Agent parsing in progress...
              </div>
            )}
          </div>

        </div>
      </div>

    </section>
  );
};
