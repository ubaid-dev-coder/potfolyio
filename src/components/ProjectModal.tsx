import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenLiveUrlNotice?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const hasLiveUrl = Boolean(project.live_url && project.live_url.trim().length > 0);
  const hasGithubUrl = Boolean(project.github_url && project.github_url.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-purple-500/25 bg-[#0F0E1C] shadow-2xl shadow-purple-950/60 p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-[#1A182E] hover:bg-purple-950/50 border border-purple-500/20 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Thumbnail Hero */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-purple-500/20 bg-[#12111F]">
          <img
            src={project.thumbnail_url}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E1C] via-transparent to-transparent opacity-80" />
          
          {/* Category Overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-purple-600/90 text-white shadow-md">
              {project.category}
            </span>
            {project.is_featured && (
              <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-amber-500/90 text-white shadow-md">
                Featured Case Study
              </span>
            )}
          </div>
        </div>

        {/* Header Details */}
        <div className="mb-6">
          <div className="text-xs text-slate-400 flex items-center gap-2 mb-2 font-mono">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Updated {new Date(project.created_at).toLocaleDateString()}</span>
            <span aria-hidden="true">·</span>
            <span>Ubaid Khatri Engineering</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
            {project.title}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {project.short_description}
          </p>
        </div>

        {/* Placeholder Advisory (as required by prompt: "These are placeholder entries. Do not invent real website URLs or claim projects are live when they are not.") */}
        {!hasLiveUrl && (
          <div className="mb-6 p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-purple-300">Initial Showcase Entry: </span>
              This project is an editable showcase entry. The live website deployment URL can be added or updated at any time directly through the{' '}
              <a href="/admin" className="text-purple-400 underline hover:text-purple-300">
                Admin Panel
              </a>.
            </div>
          </div>
        )}

        {/* Detailed Description */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-3">
            Project Overview & Architecture
          </h3>
          <div className="text-sm text-slate-300 leading-relaxed space-y-3 bg-[#141324] p-5 rounded-xl border border-purple-500/10">
            {project.detailed_description ? (
              <p>{project.detailed_description}</p>
            ) : (
              <p>
                Engineered with modern frontend patterns focusing on modular component structures,
                seamless state management, and fluid responsive layouts across all mobile and desktop viewports.
              </p>
            )}

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Clean TypeScript typed architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Responsive mobile-first layout</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>High-performance optimized assets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Scalable design system</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies List */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5">
            <Tag className="w-4 h-4" />
            <span>Technologies & Tools</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-xs font-mono rounded-lg bg-purple-950/50 text-purple-200 border border-purple-500/25"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons in Modal */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-purple-500/20">
          <div className="flex items-center gap-3">
            {hasLiveUrl ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-md shadow-purple-600/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                disabled
                className="px-5 py-2.5 text-xs font-semibold text-slate-500 bg-[#161528] rounded-xl border border-slate-800 cursor-not-allowed flex items-center gap-2"
                title="Live URL can be configured in Admin"
              >
                <span>Live URL Not Set</span>
              </button>
            )}

            {hasGithubUrl && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#141324] hover:bg-[#1E1C36] rounded-xl border border-purple-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
