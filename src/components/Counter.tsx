import React, { useState } from 'react';
import { Mail, Copy, Check, Phone } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { soundSys } from '../utils/audioSynthesis';
import { useLit } from '../utils/useLit';

// Order-to-go tickets: each opens an email already addressed and started for that kind of visitor.
const TICKETS = [
  {
    title: 'Hiring',
    note: 'An AI/ML, agentic or fullstack role',
    subject: 'Role at [company]: AI/ML engineer',
    body: 'Hi Sworup,\n\nRole: \nTeam / company: \nLocation or remote: \nTimeline: \n\n',
    tilt: '-2deg',
  },
  {
    title: 'Contract build',
    note: 'An agent, RAG or React build',
    subject: 'Contract build: [project]',
    body: 'Hi Sworup,\n\nWhat we want to build: \nTimeline: \nBudget range: \n\n',
    tilt: '1.5deg',
  },
  {
    title: 'Talk shop',
    note: 'LangGraph, MCP, clinical software',
    subject: 'Talking shop: [topic]',
    body: 'Hi Sworup,\n\n',
    tilt: '-1deg',
  },
];

export const Counter: React.FC = () => {
  const { email, phone, linkedin, github } = PORTFOLIO_DATA.personal;
  const [copied, setCopied] = useState(false);
  const [ref, lit] = useLit<HTMLElement>(0.35);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      soundSys.playSuccess();
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const mailto = (t: (typeof TICKETS)[number]) =>
    `mailto:${email}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`;

  return (
    <section ref={ref} id="contact" className="relative bg-saffron pb-32 pt-20 text-[#17130d] lg:pb-20 lg:pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70 mix-blend-multiply" style={{ backgroundImage: "url('/grain.svg')" }} />

      {/* the counter's own string: it comes on as you arrive, so the market ends open */}
      <div aria-hidden="true" className="relative mx-auto max-w-[1240px] px-4 sm:px-8">
        <span className="absolute inset-x-4 top-0 h-px bg-[#17130d]/40 sm:inset-x-8" />
        <div className="flex justify-between">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className={`relative block h-[1.05rem] w-[0.85rem] rounded-[50%_50%_48%_48%] border border-[#17130d]/30 transition-[background,box-shadow] duration-300 ${i > 9 ? 'hidden sm:block' : ''}`}
              style={{
                transitionDelay: `${i * 70}ms`,
                background: lit ? '#fff7de' : '#c98a12',
                boxShadow: lit ? '0 0 10px 3px rgba(255,250,230,0.9), 0 0 26px 8px rgba(255,255,255,0.35)' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-[1240px] grid-cols-1 gap-14 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="brush-type text-[clamp(3.6rem,8.5vw,7rem)]">
            Pull up
            <br />a stool.
          </h2>
          <p className="mt-6 max-w-md text-xl leading-relaxed">
            Hiring for AI/ML or agentic systems, need a fullstack build, or want to talk shop? Email is the fastest way in.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={`mailto:${email}`} onClick={() => soundSys.playClick()} className="btn-ink brushed">
              <Mail className="h-5 w-5" aria-hidden="true" />
              Email Sworup
            </a>
            <button onClick={copy} className="inline-flex items-center gap-2 rounded-sm px-3 py-2 font-semibold transition-colors hover:bg-[#17130d]/10">
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
            </button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[1.05rem] font-semibold">
            <li>
              <a href={linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#17130d] hover:underline">
                <LinkedinIcon className="h-5 w-5" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#17130d] hover:underline">
                <GithubIcon className="h-5 w-5" /> GitHub
              </a>
            </li>
            <li>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-[#17130d] hover:underline">
                <Phone className="h-5 w-5" aria-hidden="true" /> {phone}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-6">
          <h3 className="marker-type text-2xl">Order to go</h3>
          <p className="mt-1 max-w-sm">Pick a ticket and your email opens already started.</p>
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {TICKETS.map((t) => (
              <li key={t.title}>
                <a href={mailto(t)} onClick={() => soundSys.playClick()} className="group block text-[#17130d] no-underline">
                  <span className="hang block transition-transform duration-500 group-hover:rotate-[-2deg]">
                    <span
                      className="block border-2 border-dashed border-[#17130d]/35 bg-steam px-5 py-4 shadow-[0_14px_28px_-14px_rgba(0,0,0,0.55)] transition-colors group-hover:bg-white"
                      style={{ rotate: t.tilt }}
                    >
                      <span className="marker-type block text-xl">{t.title}</span>
                      <span className="mt-1 block text-sm text-[#3a2c18]">{t.note}</span>
                      <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold">
                        <Mail className="h-4 w-4" aria-hidden="true" /> Start this email
                      </span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="relative mx-auto mt-20 max-w-[1240px] px-4 text-sm sm:px-8">
        Built by Sworup Ranjan Nayak in Bhubaneswar. The lights stay on.
      </p>
    </section>
  );
};
