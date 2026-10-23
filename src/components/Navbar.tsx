import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, isAdminLoggedIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['about', 'skills', 'projects', 'services', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05050A]/85 backdrop-blur-xl border-b border-purple-500/15 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract: Brand - 4 to 5 Nav Links - 1 Primary Action */}
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark with jewel highlight */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 group-hover:scale-125 transition-transform"></span>
              <span className="absolute w-4 h-4 rounded-full bg-purple-500/40 beacon-pulse -z-10"></span>
            </div>
            <span className="font-display font-extrabold tracking-tight">Ubaid Khatri</span>
          </a>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-semibold text-slate-400">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className={`hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 relative py-1.5 ${
                activeSection === 'about' ? 'text-white' : ''
              }`}
            >
              About
              {activeSection === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" />
              )}
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, 'skills')}
              className={`hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 relative py-1.5 ${
                activeSection === 'skills' ? 'text-white' : ''
              }`}
            >
              Skills
              {activeSection === 'skills' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" />
              )}
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className={`hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 relative py-1.5 ${
                activeSection === 'projects' ? 'text-white' : ''
              }`}
            >
              Projects
              {activeSection === 'projects' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" />
              )}
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className={`hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 relative py-1.5 ${
                activeSection === 'services' ? 'text-white' : ''
              }`}
            >
              Services
              {activeSection === 'services' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" />
              )}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 relative py-1.5 ${
                activeSection === 'contact' ? 'text-white' : ''
              }`}
            >
              Contact
              {activeSection === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" />
              )}
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Admin shortcut */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/admin')}
              title={isAdminLoggedIn ? 'Admin Panel (Logged In)' : 'Admin Login'}
              className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-purple-300 hover:bg-purple-950/40 rounded-xl transition-all border border-purple-500/20 hover:border-purple-500/40 flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline font-mono">{isAdminLoggedIn ? 'Dashboard' : 'Admin'}</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 rounded-xl transition-all duration-200 shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer border border-purple-400/20"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-purple-950/30 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-500/20 bg-[#080712]/95 backdrop-blur-2xl px-6 py-6 transition-all shadow-2xl">
          <nav className="flex flex-col gap-4 text-sm font-medium text-slate-200">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-purple-400 py-1 transition-colors flex items-center justify-between"
            >
              <span>About Me</span>
              <span className="text-purple-500/40 text-xs font-mono">01</span>
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, 'skills')}
              className="hover:text-purple-400 py-1 transition-colors flex items-center justify-between"
            >
              <span>Skills & Tech Stack</span>
              <span className="text-purple-500/40 text-xs font-mono">02</span>
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="hover:text-purple-400 py-1 transition-colors flex items-center justify-between"
            >
              <span>Featured Projects</span>
              <span className="text-purple-500/40 text-xs font-mono">03</span>
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="hover:text-purple-400 py-1 transition-colors flex items-center justify-between"
            >
              <span>Services & Solutions</span>
              <span className="text-purple-500/40 text-xs font-mono">04</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hover:text-purple-400 py-1 transition-colors flex items-center justify-between"
            >
              <span>Contact & Inquiries</span>
              <span className="text-purple-500/40 text-xs font-mono">05</span>
            </a>
            <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/admin');
                }}
                className="text-xs text-purple-300 flex items-center gap-1.5 py-1.5"
              >
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Go to Admin Panel</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
