import React from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, MessageCircle } from 'lucide-react';
import { ProfileSettings } from '../types';

interface HeroProps {
  profile: ProfileSettings;
  onOpenCV: () => void;
  onNavigateToProjects: () => void;
  onNavigateToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onOpenCV,
  onNavigateToProjects,
  onNavigateToContact
}) => {
  return (
    <section id="hero" className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Multi-layered luxury ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-600/15 via-violet-600/10 to-indigo-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[400px] h-[350px] bg-violet-700/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Subtle hairline geometric grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Hero: Left Column Typography & Actions | Right Column Visual Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: 7 Cols */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Editorial Kicker / Availability Tagline */}
            <div className="inline-flex items-center gap-2.5 text-xs font-medium tracking-wide text-purple-300 mb-6 bg-purple-950/40 border border-purple-500/25 px-4 py-1.5 rounded-full shadow-lg shadow-purple-950/40">
              <span className="relative flex h-2 w-2">
                <span className="beacon-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300">
                {profile.role || 'Web Developer · AI Website Creator · Frontend Developer'}
              </span>
            </div>

            {/* Display Headline with balanced wrap & luxury gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 text-balance font-display">
              Building Digital Experiences That Make Businesses{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-fuchsia-300 animate-shimmer">
                Stand Out.
              </span>
            </h1>

            {/* Lead Description */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mb-8 leading-relaxed font-sans">
              {profile.bio || 'I create modern, responsive websites and AI-powered digital experiences for businesses and brands. Focused on clean architecture, high conversion, and fluid interactivity.'}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onNavigateToProjects}
                className="w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-wider font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 rounded-xl transition-all duration-200 shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 flex items-center justify-center gap-2.5 group cursor-pointer border border-purple-400/30"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onNavigateToContact}
                className="w-full sm:w-auto px-6 py-3.5 text-xs uppercase tracking-wider font-bold text-slate-200 hover:text-white bg-[#100F1E] hover:bg-[#18162E] border border-purple-500/20 hover:border-purple-500/50 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg shadow-black/40"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Contact Me</span>
              </button>

              <button
                onClick={onOpenCV}
                className="w-full sm:w-auto px-5 py-3.5 text-xs uppercase tracking-wider font-bold text-slate-300 hover:text-white hover:bg-purple-950/30 border border-slate-800 hover:border-purple-500/30 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                title="View & Download Curriculum Vitae"
              >
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-300" />
                <span>Download CV</span>
              </button>
            </div>

            {/* Social Links & Trust row */}
            <div className="flex items-center gap-6 pt-5 border-t border-purple-500/15 w-full">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Direct Channels:</span>
              <div className="flex items-center gap-3">
                <a
                  href={profile.github_url || 'https://github.com/ubaid-dev-coder'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white hover:bg-purple-950/50 p-2 rounded-xl transition-colors border border-purple-500/10 hover:border-purple-500/30"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin_url || 'https://linkedin.com/in/ubaid-khatri'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-purple-300 hover:bg-purple-950/50 p-2 rounded-xl transition-colors border border-purple-500/10 hover:border-purple-500/30"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email || 'ubaidphelwan@gmail.com'}`}
                  className="text-slate-400 hover:text-purple-300 hover:bg-purple-950/50 p-2 rounded-xl transition-colors border border-purple-500/10 hover:border-purple-500/30"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                {profile.whatsapp_number && (() => {
                  let cleanWa = profile.whatsapp_number.replace(/[^0-9]/g, '');
                  if (cleanWa.startsWith('03')) cleanWa = '92' + cleanWa.slice(1);
                  else if (cleanWa.startsWith('3') && cleanWa.length === 10) cleanWa = '92' + cleanWa;
                  return (
                    <a
                      href={`https://wa.me/${cleanWa}?text=${encodeURIComponent('Hello Ubaid, I saw your portfolio and would like to discuss a project.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/40 p-2 rounded-xl transition-colors border border-purple-500/10 hover:border-emerald-500/30"
                      aria-label="WhatsApp Message"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  );
                })()}
              </div>
            </div>

          </div>

          {/* Right Column: 5 Cols Photo Showcase with Floating Glass Accents */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px]">
              
              {/* Outer decorative glowing halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/35 via-violet-500/25 to-transparent rounded-3xl blur-2xl transform -rotate-3 scale-105 pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-purple-500/30 bg-[#0C0B18] shadow-2xl shadow-purple-950/60 card-spotlight">
                <img
                  src={profile.avatar_url || '/assets/aistudio/github_profile_under_1mb_d95b38b4.jpg'}
                  alt="Ubaid Khatri — Web Developer & AI Website Creator"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.03]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/aistudio/github_profile_under_1mb_d95b38b4.jpg';
                  }}
                />

                {/* Ambient vignette bottom overlay */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05050A] via-[#05050A]/70 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold text-white font-display text-sm">Ubaid Khatri</span>
                    <span className="text-purple-300 font-mono text-[11px] bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                      Active Developer
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating tech badge 1: AI Website Creator */}
              <div className="absolute -bottom-5 -left-5 glass-panel px-4 py-3 rounded-2xl border border-purple-500/30 shadow-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-500 border border-purple-400/40 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-purple-600/30">
                  AI
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium font-mono uppercase tracking-wider">Engineered For</div>
                  <div className="text-xs font-bold text-white">Businesses & Brands</div>
                </div>
              </div>

              {/* Floating tech badge 2: Top rated frontend */}
              <div className="absolute -top-4 -right-4 glass-panel px-3.5 py-2 rounded-xl border border-purple-500/30 shadow-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 beacon-pulse"></div>
                <span className="text-[11px] font-mono font-medium text-slate-200">React · TypeScript · Tailwind</span>
              </div>

            </div>
          </div>

        </div>

        {/* Claim-to-Proof Adjacency: Full-width Metrics Row */}
        <div className="mt-20 pt-10 border-t border-purple-500/15 grid grid-cols-2 md:grid-cols-4 gap-6">
          {(profile.stats && profile.stats.length > 0 ? profile.stats : [
            { label: 'Web Projects Built', value: '18+' },
            { label: 'Client Satisfaction', value: '99%' },
            { label: 'Core Tech Stack', value: '9+ Tools' },
            { label: 'Avg Turnaround', value: '2 Weeks' }
          ]).map((stat, i) => (
            <div key={i} className="flex flex-col p-4 rounded-xl bg-[#0B0A16]/50 border border-purple-500/10">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 mt-1.5 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
