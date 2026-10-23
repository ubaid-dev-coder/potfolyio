import React, { useState } from 'react';
import { 
  Code2, 
  Layout, 
  Palette, 
  Atom, 
  Smartphone, 
  ShoppingBag, 
  Sparkles, 
  GitBranch, 
  Zap, 
  Check, 
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

// Icon dictionary helper
export const getSkillIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case 'code2':
    case 'code':
      return Code2;
    case 'layout':
      return Layout;
    case 'palette':
      return Palette;
    case 'atom':
    case 'react':
      return Atom;
    case 'smartphone':
    case 'mobile':
      return Smartphone;
    case 'shoppingbag':
    case 'ecommerce':
      return ShoppingBag;
    case 'sparkles':
    case 'ai':
      return Sparkles;
    case 'gitbranch':
    case 'git':
      return GitBranch;
    case 'zap':
    case 'vercel':
      return Zap;
    case 'terminal':
      return Terminal;
    case 'cpu':
      return Cpu;
    default:
      return Layers;
  }
};

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0A0912]/60 border-y border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Subheading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
              Technical Stack & Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Engineered for Modern Web Standards
            </h2>
          </div>

          {/* Interactive Category Segmented Control (Allow functional buttons with click handlers) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#12111F] rounded-xl border border-purple-500/15 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-purple-950/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => {
            const Icon = getSkillIcon(skill.icon_name);
            return (
              <div
                key={skill.id}
                className="glass-panel p-5 rounded-2xl border border-purple-500/15 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-500/30 text-purple-400 group-hover:text-purple-300 group-hover:scale-105 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Clean unboxed metadata separator */}
                  <div className="text-xs text-purple-400/90 font-mono flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-purple-400" />
                    <span>{skill.proficiency || 'Advanced'}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                  {skill.name}
                </h3>

                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>{skill.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology philosophy kicker */}
        <div className="mt-12 p-6 glass-panel rounded-2xl border border-purple-500/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Full-Stack Scalability & Continuous Integration</h4>
            <p className="text-xs text-slate-400 max-w-2xl">
              From responsive component architecture to production deployment on Vercel with serverless functions and modern database schemas.
            </p>
          </div>
          <a
            href="https://github.com/ubaid-dev-coder"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 rounded-xl transition-all whitespace-nowrap"
          >
            Review GitHub Commits →
          </a>
        </div>

      </div>
    </section>
  );
};
