/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Project, Skill, ProfileSettings } from './types';
import { dataStore, INITIAL_PROFILE, INITIAL_PROJECTS, INITIAL_SKILLS } from './lib/dataStore';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CVModal } from './components/CVModal';
import { AdminPanel } from './components/AdminPanel';
import { NotFound } from './components/NotFound';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [profile, setProfile] = useState<ProfileSettings>(INITIAL_PROFILE);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCVOpen, setIsCVOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Synchronize browser history and path
  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch portfolio data from unified store (Supabase or persistent local storage)
  const loadPortfolioData = useCallback(async () => {
    try {
      const [profData, projData, skillData] = await Promise.all([
        dataStore.getProfile(),
        dataStore.getProjects(),
        dataStore.getSkills()
      ]);
      setProfile(profData);
      setProjects(projData);
      setSkills(skillData);
    } catch (err) {
      console.error('Error loading portfolio data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPortfolioData();
  }, [loadPortfolioData]);

  // Handle smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // -------------------------------------------------------------
  // Route Dispatching
  // -------------------------------------------------------------

  // Route: Admin Panel (/admin)
  if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
    return (
      <AdminPanel
        onBackToSite={() => navigate('/')}
        onDataUpdated={loadPortfolioData}
      />
    );
  }

  // Route: Public Portfolio (/)
  if (currentPath === '/' || currentPath === '' || currentPath === '/index.html') {
    return (
      <div className="min-h-screen bg-[#05050A] text-slate-100 flex flex-col font-sans selection:bg-purple-600/30 selection:text-purple-200">
        
        {/* Navigation */}
        <Navbar
          currentPath={currentPath}
          onNavigate={navigate}
          isAdminLoggedIn={localStorage.getItem('ubaid_admin_authenticated') === 'true'}
        />

        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenCV={() => setIsCVOpen(true)}
          onNavigateToProjects={() => scrollToSection('projects')}
          onNavigateToContact={() => scrollToSection('contact')}
        />

        {/* About Me Section */}
        <About
          profile={profile}
          onNavigateToProjects={() => scrollToSection('projects')}
          onNavigateToContact={() => scrollToSection('contact')}
        />

        {/* Skills Section */}
        <Skills skills={skills} />

        {/* Projects Showcase Section */}
        <Projects
          projects={projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Engineering Methodology / Process */}
        <Process />

        {/* Services & Capabilities Section */}
        <Services
          onNavigateToContact={() => scrollToSection('contact')}
        />

        {/* Client Endorsements & Proof */}
        <Testimonials />

        {/* Contact Section */}
        <Contact profile={profile} />

        {/* Footer */}
        <Footer
          profile={profile}
          onNavigate={navigate}
        />

        {/* Project Details Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* CV / Resume Viewer Modal */}
        <CVModal
          isOpen={isCVOpen}
          onClose={() => setIsCVOpen(false)}
          profile={profile}
        />

      </div>
    );
  }

  // 404 Not Found fallback
  return <NotFound onGoHome={() => navigate('/')} />;
}
