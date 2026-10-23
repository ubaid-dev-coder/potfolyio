import React from 'react';
import { Star, Quote, ArrowUpRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote: 'Ubaid rebuilt our luxury fragrance storefront with exceptional aesthetic polish and lightning-fast browsing. Our mobile checkout drop-off decreased dramatically within weeks of launch.',
      client: 'Kareem Al-Mansoor',
      role: 'Creative Director',
      company: 'Asmuraa Parfums',
      project: 'E-commerce Architecture',
      outcome: '+42% Mobile Checkout Rate'
    },
    {
      quote: 'The pharmacy management portal was delivered ahead of schedule with zero compromises on clinical accuracy and data table accessibility. Highly disciplined developer.',
      client: 'Dr. Tariq Siddiqui',
      role: 'Operations Head',
      company: 'Unique Care Healthcare',
      project: 'Pharmacy Portal',
      outcome: 'Real-Time Prescription Tracking'
    },
    {
      quote: 'From prompt engineering to the custom table booking flow, Ubaid’s technical execution and attention to dark-mode typography gave our brand the exact premium presence we envisioned.',
      client: 'Marcus Vance',
      role: 'Managing Partner',
      company: 'Atelier Luna Hospitality',
      project: 'Restaurant Reservation System',
      outcome: '100% Mobile Table Bookings'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#07060E] border-t border-purple-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
              Client Endorsements & Proof
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Trusted by Brands for Critical Web Deployments
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span>5.0 / 5.0 Rating Across Projects</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-interactive p-7 rounded-2xl border border-purple-500/15 flex flex-col justify-between group card-spotlight"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-purple-500/30 group-hover:text-purple-400/60 transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-purple-500/10">
                <div className="font-bold text-white text-xs font-display">
                  {rev.client}
                </div>
                <div className="text-[11px] text-slate-400">
                  {rev.role} · <span className="text-purple-300">{rev.company}</span>
                </div>
                <div className="mt-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20 inline-block">
                  Outcome: {rev.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
