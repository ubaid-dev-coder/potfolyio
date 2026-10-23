import React, { useState } from 'react';
import { Mail, MessageCircle, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';
import { ProfileSettings } from '../types';
import { dataStore } from '../lib/dataStore';

interface ContactProps {
  profile: ProfileSettings;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Anti-spam hidden field
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successInfo, setSuccessInfo] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setStatus('submitting');

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      // 1. Submit to real backend endpoint /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.honeypot
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry to server.');
      }

      // 2. Also persist in unified data store (Supabase or local messages inbox)
      await dataStore.saveMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message
      });

      setStatus('success');
      setSuccessInfo(result.message || 'Thank you! Your message was received and Ubaid will respond promptly.');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err: any) {
      console.error('Contact submission error:', err);
      // Fallback: save to client store if offline/network hiccup
      try {
        await dataStore.saveMessage({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message
        });
        setStatus('success');
        setSuccessInfo('Message logged successfully! Ubaid will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      } catch (fallbackErr) {
        setStatus('error');
        setErrorMessage(err.message || 'Unable to submit your message at this moment. Please email directly.');
      }
    }
  };

  let cleanWhatsApp = (profile.whatsapp_number || '').replace(/[^0-9]/g, '');
  if (cleanWhatsApp.startsWith('03')) {
    cleanWhatsApp = '92' + cleanWhatsApp.slice(1);
  } else if (cleanWhatsApp.startsWith('3') && cleanWhatsApp.length === 10) {
    cleanWhatsApp = '92' + cleanWhatsApp;
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-800/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
            Let's Collaborate
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Start a Conversation About Your Next Project
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Have a project in mind, need an AI-powered website, or looking for a skilled developer to elevate your brand? Reach out below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Cards (Configurable from Admin) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <a
              href={`mailto:${profile.email || 'ubaidphelwan@gmail.com'}`}
              className="glass-panel p-6 rounded-2xl border border-purple-500/15 hover:border-purple-500/40 transition-all flex items-start justify-between group block"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Direct Email</div>
                  <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {profile.email || 'ubaidphelwan@gmail.com'}
                  </div>
                  <div className="text-xs text-purple-400/80 mt-1">Available for new client inquiries</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
            </a>

            {/* WhatsApp Card */}
            {cleanWhatsApp && (
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent('Hello Ubaid, I saw your portfolio and would like to discuss a project.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-6 rounded-2xl border border-purple-500/15 hover:border-emerald-500/40 transition-all flex items-start justify-between group block"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">WhatsApp Instant Chat</div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {profile.whatsapp_number || '03152768037'}
                    </div>
                    <div className="text-xs text-emerald-400/80 mt-1">Quick responses for urgent scopes</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            )}

            {/* GitHub Card */}
            <a
              href={profile.github_url || 'https://github.com/ubaid-dev-coder'}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-2xl border border-purple-500/15 hover:border-purple-500/40 transition-all flex items-start justify-between group block"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">GitHub Profile</div>
                  <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                    github.com/ubaid-dev-coder
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Open source code, repositories & contributions</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
            </a>

            {/* LinkedIn Card */}
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-6 rounded-2xl border border-purple-500/15 hover:border-purple-500/40 transition-all flex items-start justify-between group block"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">LinkedIn Network</div>
                    <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                      Ubaid Khatri
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Professional network & recommendations</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </a>
            )}

          </div>

          {/* Right Column: Secure Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-2xl border border-purple-500/20 shadow-xl shadow-black/40">
              
              <h3 className="text-xl font-bold text-white mb-2 font-display">
                Send an Inquiry
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill in the details below and I will get back to you within 24 hours.
              </p>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-200">Message Delivered</h4>
                    <p className="text-xs text-emerald-300/90 mt-1">{successInfo}</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-200">Submission Error</h4>
                    <p className="text-xs text-red-300/90 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Honeypot field (hidden from legitimate users for spam bots) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#141324] text-sm text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Email <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#141324] text-sm text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. New E-commerce Storefront / Web App"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#141324] text-sm text-white placeholder-slate-500 px-4 py-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Message & Requirements <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Describe your vision, timeline, or business goals..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#141324] text-sm text-white placeholder-slate-500 p-4 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/60 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800/50 rounded-xl transition-all duration-200 shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Message</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 text-center pt-2">
                  Your information is kept private and only used to respond to your project request.
                </p>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
