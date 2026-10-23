import React, { useState } from 'react';
import { Search, ExternalLink, Github, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenLiveUrlNotice?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlyFeatured, setShowOnlyFeatured] = useState<boolean>(false);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];

  // Filtering logic
  const filteredProjects = projects.filter((project) => {
    // Only show published projects on public portfolio
    if (!project.is_published) return false;

    // Category match
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;

    // Search query match
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.short_description.toLowerCase().includes(query) ||
      project.technologies.some((t) => t.toLowerCase().includes(query));

    // Featured toggle
    const matchesFeatured = !showOnlyFeatured || project.is_featured;

    return matchesCategory && matchesSearch && matchesFeatured;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Commercial Products & Digital Solutions
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Explore web platforms built for real-world business outcomes, e-commerce conversion, and operational efficiency.
            </p>
          </div>

          {/* Featured Toggle button */}
          <button
            onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              showOnlyFeatured
                ? 'bg-purple-600/30 text-purple-200 border-purple-500/50 shadow-sm shadow-purple-600/20'
                : 'bg-[#131221] text-slate-400 border-purple-500/15 hover:text-white hover:border-purple-500/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{showOnlyFeatured ? 'Showing Featured' : 'Filter: Featured Only'}</span>
          </button>
        </div>

        {/* Filter Controls Bar: Search & Categories */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-purple-500/15">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#12111F] rounded-xl border border-purple-500/15 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-purple-950/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects or stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12111F] text-xs text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-purple-500/15 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center border border-purple-500/15">
            <AlertCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white mb-1">No matching projects found</h3>
            <p className="text-xs text-slate-400 mb-4">Try clearing your search query or choosing another category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setShowOnlyFeatured(false);
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => {
              const hasLiveUrl = Boolean(project.live_url && project.live_url.trim().length > 0);
              const hasGithub = Boolean(project.github_url && project.github_url.trim().length > 0);

              return (
                <div
                  key={project.id}
                  className="glass-panel glass-panel-interactive rounded-2xl overflow-hidden border border-purple-500/15 hover:border-purple-500/40 transition-all duration-300 flex flex-col group shadow-xl shadow-black/60 hover:shadow-purple-950/30 card-spotlight"
                >
                  {/* Simulated Browser Chrome Top Bar */}
                  <div className="px-4 py-2.5 bg-[#0C0B18] border-b border-purple-500/15 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 inline-block"></span>
                    </div>
                    <div className="bg-[#141224] px-3 py-0.5 rounded-md text-[10px] text-slate-400 max-w-[180px] truncate border border-purple-500/10">
                      {project.live_url ? project.live_url.replace(/^https?:\/\//, '') : `${project.category.toLowerCase().replace(/\s+/g, '-')}.ubaidkhatri.dev`}
                    </div>
                    <span className="text-[10px] text-purple-400/80 font-semibold">{project.category}</span>
                  </div>

                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0A0914] border-b border-purple-500/10">
                    <img
                      src={project.thumbnail_url}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B18] via-transparent to-transparent opacity-80" />

                    {/* Featured Overlay Badge */}
                    {project.is_featured && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-white shadow-lg backdrop-blur-md">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-purple-300 transition-colors font-display">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300/90 mb-4 line-clamp-2 leading-relaxed">
                        {project.short_description}
                      </p>

                      {/* Clean Unboxed Metadata for Tech Stack (Zero-Pill Discipline) */}
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-purple-300/90 font-mono mb-6">
                        {project.technologies.slice(0, 5).map((tech, idx) => (
                          <React.Fragment key={idx}>
                            <span className="hover:text-white transition-colors">{tech}</span>
                            {idx < Math.min(project.technologies.length, 5) - 1 && (
                              <span aria-hidden="true" className="text-purple-500/40">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Working Action Buttons (Single-line, clear purpose) */}
                    <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between gap-3">
                      
                      <div className="flex items-center gap-2">
                        {/* Live Demo button */}
                        {hasLiveUrl ? (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/30 cursor-pointer border border-purple-400/20"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span
                            className="px-3 py-1.5 text-xs font-medium text-slate-400 bg-[#121122] rounded-lg border border-purple-500/15 flex items-center gap-1.5 cursor-help"
                            title="Placeholder entry: You can configure the live website URL anytime in the Admin Dashboard."
                          >
                            <span>Live URL Pending</span>
                          </span>
                        )}

                        {/* Source Code button */}
                        {hasGithub && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-[#141224] hover:bg-[#1E1B38] border border-purple-500/20 hover:border-purple-500/40 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                            aria-label="View Source Code"
                          >
                            <Github className="w-3.5 h-3.5 text-purple-400" />
                            <span className="hidden sm:inline">Code</span>
                          </a>
                        )}
                      </div>

                      {/* View Details modal trigger */}
                      <button
                        onClick={() => onSelectProject(project)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-purple-300 hover:text-white hover:bg-purple-950/50 border border-purple-500/30 hover:border-purple-500/50 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5 text-purple-400" />
                        <span>View Details</span>
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
