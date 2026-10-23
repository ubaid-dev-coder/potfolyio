import React from 'react';
import { Sparkles, ShoppingBag, Code, Rocket, CheckCircle } from 'lucide-react';
import { ProfileSettings } from '../types';

interface AboutProps {
  profile: ProfileSettings;
  onNavigateToProjects: () => void;
  onNavigateToContact: () => void;
}

export const About: React.FC<AboutProps> = ({ profile, onNavigateToProjects, onNavigateToContact }) => {
  const highlights = [
    {
      icon: Code,
      title: 'Modern Frontend Engineering',
      description: 'Building robust, maintainable interfaces with React, TypeScript, and modern component systems.'
    },
    {
      icon: ShoppingBag,
      title: 'E-commerce & Business Platforms',
      description: 'Creating high-converting online stores with optimized user journeys, catalogs, and smooth checkout flows.'
    },
    {
      icon: Sparkles,
      title: 'AI Tooling & Smart Integrations',
      description: 'Leveraging AI capabilities and rapid prototyping with Google AI Studio to build intelligent user experiences.'
    },
    {
      icon: Rocket,
      title: 'Performance & Vercel Deployment',
      description: 'Shipping responsive, SEO-ready websites with instantaneous page loads, zero bloat, and CI/CD pipelines.'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
            Background & Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Crafting Digital Solutions That Bridge Technical Rigor and Commercial Impact
          </h2>
        </div>

        {/* 2-Column Content: Left Column Editorial Story | Right Column Capability Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Editable Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
            {profile.about_paragraphs && profile.about_paragraphs.length > 0 ? (
              profile.about_paragraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-300">
                  {paragraph}
                </p>
              ))
            ) : (
              <>
                <p>
                  I am a passionate Web Developer and AI Website Creator committed to crafting digital solutions that elevate modern brands. My work bridges the gap between clean frontend engineering and practical business objectives.
                </p>
                <p>
                  Specializing in modern web technologies including React, TypeScript, and Tailwind CSS, I design and engineer scalable web applications, e-commerce storefronts, and intuitive management systems.
                </p>
                <p>
                  Beyond standard development, I leverage modern AI tooling to streamline user interactions, accelerate workflows, and build intelligent web platforms that give businesses a distinct competitive edge.
                </p>
              </>
            )}

            {/* Quick checkmarks of delivery promise */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Pixel-perfect responsive execution',
                'Clean, documented TypeScript code',
                'Fast turnaround & clear communication',
                'Optimized for search engines & mobile'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onNavigateToProjects}
                className="text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors cursor-pointer group"
              >
                <span>Explore Featured Case Studies</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: 4 Capability Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {highlights.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="glass-panel p-5 rounded-xl border border-purple-500/15 hover:border-purple-500/35 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-purple-600/15 border border-purple-500/30 text-purple-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-normal">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
