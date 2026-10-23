import React from 'react';
import { Compass, Palette, Terminal, Rocket, Check } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Strategy & System Architecture',
      subtitle: 'Discovery & Schemas',
      icon: Compass,
      description: 'Aligning business objectives with scalable data models, user flows, and modern tech choices (React, Supabase, Tailwind).',
      points: ['Requirement & scope analysis', 'Database & API schema design', 'Security and RLS planning']
    },
    {
      num: '02',
      title: 'UI/UX & AI-Powered Prototyping',
      subtitle: 'Visual Design Systems',
      icon: Palette,
      description: 'Crafting responsive, high-contrast dark interfaces and rapid generative prototypes that reflect brand prestige.',
      points: ['Component library & design tokens', 'Micro-interactions & animation', 'Rapid Google AI Studio prototypes']
    },
    {
      num: '03',
      title: 'Production Full-Stack Engineering',
      subtitle: 'Clean Code & Integration',
      icon: Terminal,
      description: 'Translating design into strict TypeScript architecture, robust state handling, and resilient backend integrations.',
      points: ['Clean modular React code', 'Form validation & anti-spam', 'State persistence & CRUD APIs']
    },
    {
      num: '04',
      title: 'Optimization & Vercel Deployment',
      subtitle: 'Launch & Performance',
      icon: Rocket,
      description: 'Deploying on edge infrastructure with sub-second loading, SEO meta optimization, and automated CI/CD pipelines.',
      points: ['Vercel zero-config routing', 'Core Web Vitals tuning', 'Client handoff & documentation']
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#06050C] border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
            Engineering Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            How I Bring Vision into High-Performance Reality
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            A structured, transparent workflow designed to guarantee precision, speed, and measurable business impact.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-interactive p-6 rounded-2xl border border-purple-500/15 flex flex-col justify-between group card-spotlight"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-extrabold text-purple-400/80 font-mono tracking-tight group-hover:text-purple-300 transition-colors">
                      {step.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-purple-300 transition-colors font-display">
                    {step.title}
                  </h3>

                  <div className="text-[11px] font-mono text-purple-400/80 mb-3">
                    {step.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-500/10 space-y-2">
                  {step.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <Check className="w-3 h-3 text-purple-400 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
