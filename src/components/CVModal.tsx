import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Github, Globe, Phone } from 'lucide-react';
import { ProfileSettings } from '../types';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileSettings;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose, profile }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel rounded-2xl border border-purple-500/30 bg-[#0C0B17] text-slate-100 shadow-2xl p-6 sm:p-10 print:max-h-none print:overflow-visible print:border-none print:bg-white print:text-black print:p-8 print:shadow-none"
        role="dialog"
      >
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-purple-500/20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Curriculum Vitae Preview</span>
            <span className="text-xs text-purple-400">· Ubaid Khatri</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-purple-600/30"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#161528] hover:bg-purple-950/40 border border-purple-500/20 transition-colors"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div className="space-y-8 font-sans print:text-black">
          
          {/* CV Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-purple-500/20 print:border-slate-300">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight font-display print:text-black">
                {profile.name || 'Ubaid Khatri'}
              </h1>
              <p className="text-sm font-medium text-purple-400 print:text-purple-700 mt-1">
                {profile.role || 'Web Developer | AI Website Creator | Frontend Developer'}
              </p>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1 max-w-xl">
                {profile.headline || 'Building Digital Experiences That Make Businesses Stand Out.'}
              </p>
            </div>

            <div className="text-xs space-y-1 text-slate-300 print:text-slate-700 shrink-0">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-purple-400 print:text-purple-600" />
                <span>{profile.email || 'ubaidphelwan@gmail.com'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-purple-400 print:text-purple-600" />
                <span>github.com/ubaid-dev-coder</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-purple-400 print:text-purple-600" />
                <span>Portfolio & Client Showcase</span>
              </div>
              {profile.whatsapp_number && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-purple-400 print:text-purple-600" />
                  <span>{profile.whatsapp_number}</span>
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 print:text-purple-700 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
              Dynamic and results-driven Web Developer and AI Website Creator with verified experience architecting responsive frontend applications, high-converting e-commerce storefronts, and intelligent digital systems. Proven record in leveraging modern frameworks (React.js, TypeScript, Tailwind CSS), serverless deployments (Vercel), and modern AI tooling to build resilient, fast-loading, client-ready software.
            </p>
          </div>

          {/* Technical Competencies */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 print:text-purple-700 mb-2">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 print:text-slate-800">
              <div className="p-3 bg-[#131221] print:bg-slate-100 rounded-lg border border-purple-500/10 print:border-slate-300">
                <span className="font-semibold text-white print:text-black block mb-1">Frontend Engineering</span>
                <span>React.js, TypeScript, JavaScript (ESNext), HTML5/CSS3, Tailwind CSS, Component Design Systems, State Management</span>
              </div>
              <div className="p-3 bg-[#131221] print:bg-slate-100 rounded-lg border border-purple-500/10 print:border-slate-300">
                <span className="font-semibold text-white print:text-black block mb-1">E-Commerce & Digital Solutions</span>
                <span>Custom Storefronts, Cart & Catalog Architectures, Pharmacy Portals, Booking & Reservation Systems, Data Dashboards</span>
              </div>
              <div className="p-3 bg-[#131221] print:bg-slate-100 rounded-lg border border-purple-500/10 print:border-slate-300">
                <span className="font-semibold text-white print:text-black block mb-1">AI & Modern Prototyping</span>
                <span>Google AI Studio, Prompt Engineering, Generative Interface Integration, Workflow Automation</span>
              </div>
              <div className="p-3 bg-[#131221] print:bg-slate-100 rounded-lg border border-purple-500/10 print:border-slate-300">
                <span className="font-semibold text-white print:text-black block mb-1">Tooling & Infrastructure</span>
                <span>Git/GitHub Version Control, Vercel Production Deployment, Supabase PostgreSQL & Auth, RESTful APIs, Performance Tuning</span>
              </div>
            </div>
          </div>

          {/* Key Portfolio Projects & Case Studies */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 print:text-purple-700 mb-2">
              Selected Projects & Case Studies
            </h2>
            <div className="space-y-3 text-xs text-slate-300 print:text-slate-800">
              <div className="p-3 bg-[#131221] print:bg-slate-50 rounded-lg border border-purple-500/10 print:border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white print:text-black">Asmuraa — Perfume E-commerce Website</span>
                  <span className="font-mono text-purple-400 print:text-purple-700">React · TypeScript · Tailwind CSS</span>
                </div>
                <p className="text-slate-400 print:text-slate-600">
                  Architected high-end fragrance boutique interface with catalog filtering, responsive fragrance note showcases, shopping cart persistence, and mobile-optimized checkout journey.
                </p>
              </div>

              <div className="p-3 bg-[#131221] print:bg-slate-50 rounded-lg border border-purple-500/10 print:border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white print:text-black">Unique Care Pharmacy I.M — Pharmacy Management Portal</span>
                  <span className="font-mono text-purple-400 print:text-purple-700">React · Management SaaS · Data Tables</span>
                </div>
                <p className="text-slate-400 print:text-slate-600">
                  Engineered pharmacy inventory and prescription tracking platform featuring patient dosage timelines, catalog alerts, and clean tabular status views.
                </p>
              </div>

              <div className="p-3 bg-[#131221] print:bg-slate-50 rounded-lg border border-purple-500/10 print:border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white print:text-black">Inventory Management System</span>
                  <span className="font-mono text-purple-400 print:text-purple-700">Analytics SaaS · Supply Chain · Dark Theme</span>
                </div>
                <p className="text-slate-400 print:text-slate-600">
                  Designed stock metric dashboard with real-time SKU alerts, weekly movement tracking, and dispatch status monitoring.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Values */}
          <div className="pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 print:text-purple-700 mb-2">
              Education & Certifications
            </h2>
            <div className="text-xs text-slate-300 print:text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-white print:text-black">Web Development & Software Engineering</span>
                <span>Active Practice & Continuous Professional Development</span>
              </div>
              <div className="text-slate-400 print:text-slate-600">
                Specialized in Modern JavaScript/TypeScript Ecosystems, Responsive UI Systems, and AI Prototyping.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
