import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, Shield } from 'lucide-react';
import { ProfileSettings } from '../types';

interface FooterProps {
  profile: ProfileSettings;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-purple-500/15 bg-[#07060C] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-purple-500/10">
          {/* Brand */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="text-lg font-bold text-white tracking-tight font-display">
              Ubaid Khatri
            </span>
            <span className="hidden sm:inline text-purple-500/30">|</span>
            <span className="text-xs text-slate-400">
              Web Developer & AI Website Creator
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href={profile.github_url || 'https://github.com/ubaid-dev-coder'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-white hover:bg-purple-950/40 rounded-lg transition-colors border border-transparent hover:border-purple-500/20"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedin_url || 'https://linkedin.com/in/ubaid-khatri'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-950/40 rounded-lg transition-colors border border-transparent hover:border-purple-500/20"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.email || 'ubaidphelwan@gmail.com'}`}
              className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-950/40 rounded-lg transition-colors border border-transparent hover:border-purple-500/20"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="ml-2 p-2 text-slate-400 hover:text-white hover:bg-purple-950/40 rounded-lg transition-colors border border-purple-500/20 cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ubaid Khatri. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/admin')}
              className="text-xs text-purple-400/80 hover:text-purple-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
