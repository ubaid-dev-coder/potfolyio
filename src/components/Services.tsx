import React from 'react';
import { ShoppingBag, Sparkles, Layout, Database, Check } from 'lucide-react';

interface ServicesProps {
  onNavigateToContact: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigateToContact }) => {
  const serviceList = [
    {
      icon: ShoppingBag,
      title: 'E-commerce & Storefront Development',
      badge: 'High Conversion',
      description: 'Custom e-commerce platforms engineered for rapid browsing, product discovery, smooth cart operations, and frictionless checkout.',
      deliverables: [
        'Luxury & retail product catalog showcases',
        'Intuitive cart and checkout flows',
        'Mobile optimization and performance auditing',
        'Payment gateway & inventory synchronization'
      ]
    },
    {
      icon: Sparkles,
      title: 'AI Website Creation & Intelligent Apps',
      badge: 'Next-Gen UI',
      description: 'Harnessing modern AI tooling to build intelligent web apps, conversational interactions, and interactive business tools that captivate users.',
      deliverables: [
        'AI Studio and LLM workflow integrations',
        'Dynamic generative content interfaces',
        'Automated workflows & prompt architecture',
        'Rapid MVP prototyping and staging'
      ]
    },
    {
      icon: Layout,
      title: 'Frontend Architecture & UI/UX Engineering',
      badge: 'Design Systems',
      description: 'Transforming complex product requirements and design prototypes into pixel-perfect, accessible, and ultra-fast web experiences.',
      deliverables: [
        'Component libraries with React & TypeScript',
        'Tailwind CSS styling and responsive layouts',
        'Micro-interactions and fluid motion',
        'WCAG AA accessible and SEO optimized'
      ]
    },
    {
      icon: Database,
      title: 'Management Portals & Custom SaaS Dashboards',
      badge: 'Operational Tools',
      description: 'Data-intensive web applications built for business teams: inventory management, pharmacy systems, and operational workflow trackers.',
      deliverables: [
        'Data table filtering, sorting, and reporting',
        'Role-based access control and security',
        'Real-time data visualization & charts',
        'Supabase / SQL persistent database schema'
      ]
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#0A0912]/80 border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
            What I Deliver
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Tailored Web Solutions Built for Growth
          </h2>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Every engagement is focused on clean software architecture, business conversion, and end-to-end polish.
          </p>
        </div>

        {/* Services Grid: 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass-panel p-8 rounded-2xl border border-purple-500/15 hover:border-purple-500/35 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-purple-400/90 font-mono">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors font-display">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-purple-500/10 mb-8">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={onNavigateToContact}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-purple-300 hover:text-white bg-[#151425] hover:bg-purple-950/50 border border-purple-500/25 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Discuss Your Project</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
