import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  FolderGit2, 
  Layers, 
  User, 
  Inbox, 
  Database, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Check, 
  X, 
  AlertCircle, 
  Lock, 
  LogOut, 
  Eye, 
  ChevronUp, 
  ChevronDown, 
  Copy, 
  Sparkles, 
  CheckCircle2,
  Menu,
  Save,
  Globe,
  RefreshCw,
  Mail
} from 'lucide-react';
import { Project, Skill, ProfileSettings, ContactMessage } from '../types';
import { dataStore, INITIAL_PROJECTS, INITIAL_SKILLS } from '../lib/dataStore';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AdminPanelProps {
  onBackToSite: () => void;
  onDataUpdated: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToSite, onDataUpdated }) => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>('admin@ubaidkhatri.com');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [authMode, setAuthMode] = useState<'supabase' | 'local'>(isSupabaseConfigured() ? 'supabase' : 'local');

  // Navigation tab
  const [currentTab, setCurrentTab] = useState<'overview' | 'projects' | 'skills' | 'profile' | 'inbox' | 'supabase'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profile, setProfile] = useState<ProfileSettings | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  // Toast notifications
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Project Modal Editor
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<Project | null>(null);

  // Skill Modal Editor
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isNewSkillModalOpen, setIsNewSkillModalOpen] = useState<boolean>(false);

  // Check auth session on mount
  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);

      // Check if Supabase auth is active
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setIsAuthenticated(true);
            setAuthLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Supabase session check error:', err);
        }
      }

      // Check local admin session
      const localSession = localStorage.getItem('ubaid_admin_authenticated');
      if (localSession === 'true') {
        setIsAuthenticated(true);
      }

      setAuthLoading(false);
    };

    checkAuth();
  }, []);

  // Fetch data when authenticated
  const loadAllData = async () => {
    setLoadingData(true);
    try {
      const [projData, skillData, profData, msgData] = await Promise.all([
        dataStore.getProjects(),
        dataStore.getSkills(),
        dataStore.getProfile(),
        dataStore.getMessages()
      ]);
      setProjects(projData);
      setSkills(skillData);
      setProfile(profData);
      setMessages(msgData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      showToast('error', 'Failed to load portfolio records.');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // -------------------------------------------------------------
  // Authentication Handlers
  // -------------------------------------------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password: loginPassword
        });

        if (error) {
          setAuthError(error.message);
          return;
        }

        if (data.session) {
          setIsAuthenticated(true);
          showToast('success', 'Logged in successfully via Supabase Auth.');
          return;
        }
      } catch (err: any) {
        setAuthError(err.message || 'Supabase authentication failed.');
        return;
      }
    }

    // Local admin mode if Supabase is unconfigured or user chooses sandbox
    if (loginPassword.trim() === 'admin123' || loginPassword.trim() === 'ubaid2026') {
      localStorage.setItem('ubaid_admin_authenticated', 'true');
      setIsAuthenticated(true);
      showToast('success', 'Logged in in Local Admin mode.');
    } else {
      setAuthError('Invalid password. For local testing use "admin123", or configure Supabase Auth in .env.');
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('ubaid_admin_authenticated');
    setIsAuthenticated(false);
    showToast('success', 'Logged out safely.');
  };

  // -------------------------------------------------------------
  // Project CRUD
  // -------------------------------------------------------------
  const handleSaveProject = async (projectToSave: Project) => {
    try {
      await dataStore.saveProject(projectToSave);
      showToast('success', `Project "${projectToSave.title}" saved successfully.`);
      setEditingProject(null);
      setIsNewProjectModalOpen(false);
      await loadAllData();
      onDataUpdated();
    } catch (err: any) {
      showToast('error', 'Failed to save project: ' + err.message);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await dataStore.deleteProject(id);
      showToast('success', 'Project removed.');
      setDeleteConfirmProject(null);
      await loadAllData();
      onDataUpdated();
    } catch (err: any) {
      showToast('error', 'Failed to delete project: ' + err.message);
    }
  };

  const handleTogglePublish = async (project: Project) => {
    const updated = { ...project, is_published: !project.is_published };
    await handleSaveProject(updated);
  };

  const handleToggleFeatured = async (project: Project) => {
    const updated = { ...project, is_featured: !project.is_featured };
    await handleSaveProject(updated);
  };

  // -------------------------------------------------------------
  // Skill CRUD & Reorder
  // -------------------------------------------------------------
  const handleSaveSkill = async (skillToSave: Skill) => {
    try {
      await dataStore.saveSkill(skillToSave);
      showToast('success', `Skill "${skillToSave.name}" updated.`);
      setEditingSkill(null);
      setIsNewSkillModalOpen(false);
      await loadAllData();
      onDataUpdated();
    } catch (err: any) {
      showToast('error', 'Failed to save skill: ' + err.message);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await dataStore.deleteSkill(id);
      showToast('success', 'Skill deleted.');
      await loadAllData();
      onDataUpdated();
    } catch (err: any) {
      showToast('error', 'Failed to delete skill: ' + err.message);
    }
  };

  const handleMoveSkill = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === skills.length - 1)
    ) {
      return;
    }
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...skills];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    setSkills(reordered);
    await dataStore.reorderSkills(reordered);
    onDataUpdated();
  };

  // -------------------------------------------------------------
  // Profile Update
  // -------------------------------------------------------------
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      await dataStore.saveProfile(profile);
      showToast('success', 'Profile & About details updated.');
      onDataUpdated();
    } catch (err: any) {
      showToast('error', 'Failed to update profile: ' + err.message);
    }
  };

  // Copy helper
  const [copiedSql, setCopiedSql] = useState(false);
  const handleCopySql = () => {
    const sqlScript = `-- Run this in your Supabase SQL Editor:
-- See /supabase-schema.sql for the complete schema and RLS policies.
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT,
    thumbnail_url TEXT,
    technologies TEXT[] DEFAULT '{}',
    live_url TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    is_featured BOOLEAN DEFAULT FALSE,
    category TEXT DEFAULT 'Web Application',
    is_published BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Admin can modify projects" ON public.projects FOR ALL TO authenticated USING (true);
`;
    navigator.clipboard.writeText(sqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // -------------------------------------------------------------
  // RENDER: LOGIN SCREEN IF NOT AUTHENTICATED
  // -------------------------------------------------------------
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#09090F] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
          <span>Verifying administrator privileges...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090F] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="p-3 bg-purple-950/60 border border-purple-500/30 rounded-2xl text-purple-400 shadow-xl shadow-purple-950/50">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Ubaid Khatri Portfolio Admin
          </h2>
          <p className="mt-2 text-center text-xs text-slate-400">
            Secure console for managing projects, live URLs, skills, and client inquiries.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <div className="glass-panel py-8 px-6 sm:px-8 rounded-2xl border border-purple-500/20 shadow-2xl bg-[#0F0E1C]">
            
            {/* Supabase status notice */}
            {isSupabaseConfigured() ? (
              <div className="mb-6 p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-start gap-2.5 text-xs text-purple-200">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Supabase configuration detected. Login with your administrator credentials.</span>
              </div>
            ) : (
              <div className="mb-6 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">Local Administrative Sandbox Mode</span>
                  <span>Supabase credentials not yet set in .env. Enter password <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300 font-mono">admin123</code> to access local management.</span>
                </div>
              </div>
            )}

            {authError && (
              <div className="mb-6 p-3 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-[#141324] text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/60 transition-colors"
                  placeholder="admin@ubaidkhatri.com"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#141324] text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/60 transition-colors"
                    placeholder="Enter admin password..."
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Shield className="w-4 h-4" />
                <span>Authenticate into Admin Console</span>
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-purple-500/10 flex items-center justify-between">
              <button
                onClick={onBackToSite}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>← Back to Public Portfolio</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  const publishedCount = projects.filter((p) => p.is_published).length;
  const draftCount = projects.filter((p) => !p.is_published).length;
  const unreadMessagesCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-[#09090F] text-slate-100 flex flex-col md:flex-row">
      
      {/* Toast popup */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border shadow-xl flex items-center gap-2.5 text-xs animate-fade-in ${
          toast.type === 'success' 
            ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200' 
            : 'bg-red-950/90 border-red-500/40 text-red-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-purple-500/15 bg-[#0D0C18]">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          <span className="font-bold text-white text-sm">Ubaid Khatri Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-64 bg-[#0B0A14] border-r border-purple-500/15 p-6 flex flex-col justify-between shrink-0 ${
        sidebarOpen ? 'block' : 'hidden md:flex'
      }`}>
        <div>
          {/* Brand & Status */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Portfolio Admin</div>
              <div className="text-[10px] text-purple-400 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{isSupabaseConfigured() ? 'Supabase Auth' : 'Local Admin'}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-medium">
            <button
              onClick={() => { setCurrentTab('overview'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                currentTab === 'overview'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => { setCurrentTab('projects'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                currentTab === 'projects'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderGit2 className="w-4 h-4" />
                <span>Projects ({projects.length})</span>
              </div>
              {draftCount > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/30 text-amber-300 font-mono">
                  {draftCount} draft
                </span>
              )}
            </button>

            <button
              onClick={() => { setCurrentTab('skills'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                currentTab === 'skills'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Skills & Stack ({skills.length})</span>
            </button>

            <button
              onClick={() => { setCurrentTab('profile'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                currentTab === 'profile'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              <User className="w-4 h-4" />
              <span>About & Socials</span>
            </button>

            <button
              onClick={() => { setCurrentTab('inbox'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                currentTab === 'inbox'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Contact Inquiries</span>
              </div>
              {unreadMessagesCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-500 text-white font-mono">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setCurrentTab('supabase'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                currentTab === 'supabase'
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Supabase & RLS Setup</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-6 border-t border-purple-500/10 space-y-2">
          <button
            onClick={onBackToSite}
            className="w-full py-2.5 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-[#141324] hover:bg-[#1D1B33] border border-purple-500/20 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span>Preview Public Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 text-xs font-medium text-slate-400 hover:text-red-300 hover:bg-red-950/20 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Top contextual header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-purple-500/15">
          <div>
            <h1 className="text-2xl font-bold text-white font-display">
              {currentTab === 'overview' && 'Dashboard Overview'}
              {currentTab === 'projects' && 'Project Showcase Management'}
              {currentTab === 'skills' && 'Skills & Competencies'}
              {currentTab === 'profile' && 'Profile & About Me Settings'}
              {currentTab === 'inbox' && 'Contact Inquiries Inbox'}
              {currentTab === 'supabase' && 'Supabase Database & RLS Guide'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Changes saved here reflect immediately on Ubaid Khatri's live developer portfolio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              disabled={loadingData}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-[#141324] hover:bg-[#1E1C36] border border-purple-500/20 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            {currentTab === 'projects' && (
              <button
                onClick={() => {
                  setEditingProject({
                    id: 'proj-' + Date.now(),
                    title: '',
                    short_description: '',
                    detailed_description: '',
                    thumbnail_url: '/src/assets/images/project_asmuraa_perfume_1792738296836.jpg',
                    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
                    live_url: '',
                    github_url: 'https://github.com/ubaid-dev-coder',
                    is_featured: false,
                    category: 'E-commerce',
                    is_published: true,
                    sort_order: projects.length + 1,
                    created_at: new Date().toISOString()
                  });
                  setIsNewProjectModalOpen(true);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-purple-600/30 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            )}

            {currentTab === 'skills' && (
              <button
                onClick={() => {
                  setEditingSkill({
                    id: 'sk-' + Date.now(),
                    name: '',
                    category: 'Frontend',
                    proficiency: 'Advanced',
                    icon_name: 'Code2',
                    sort_order: skills.length + 1
                  });
                  setIsNewSkillModalOpen(true);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-purple-600/30 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            )}
          </div>
        </div>

        {/* ---------------- TAB 1: OVERVIEW ---------------- */}
        {currentTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-purple-500/15">
                <div className="text-xs text-slate-400 mb-1">Total Projects</div>
                <div className="text-3xl font-extrabold text-white font-mono tabular-nums">{projects.length}</div>
                <div className="text-[11px] text-purple-400 mt-2">{publishedCount} live on portfolio</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-purple-500/15">
                <div className="text-xs text-slate-400 mb-1">Published Projects</div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">{publishedCount}</div>
                <div className="text-[11px] text-slate-400 mt-2">{draftCount} in draft state</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-purple-500/15">
                <div className="text-xs text-slate-400 mb-1">Active Skills</div>
                <div className="text-3xl font-extrabold text-purple-300 font-mono tabular-nums">{skills.length}</div>
                <div className="text-[11px] text-slate-400 mt-2">Across 4 domain categories</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-purple-500/15">
                <div className="text-xs text-slate-400 mb-1">Contact Inquiries</div>
                <div className="text-3xl font-extrabold text-violet-400 font-mono tabular-nums">{messages.length}</div>
                <div className="text-[11px] text-slate-400 mt-2">{unreadMessagesCount} unread messages</div>
              </div>
            </div>

            {/* Quick Project Showcase Status */}
            <div className="glass-panel rounded-2xl p-6 border border-purple-500/15">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white font-display">Recent Projects Quick Actions</h3>
                <button
                  onClick={() => setCurrentTab('projects')}
                  className="text-xs text-purple-400 hover:text-purple-300"
                >
                  Manage All →
                </button>
              </div>

              <div className="space-y-3">
                {projects.slice(0, 4).map((p) => (
                  <div key={p.id} className="p-3.5 bg-[#121120] rounded-xl border border-purple-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.thumbnail_url}
                        alt=""
                        className="w-12 h-10 object-cover rounded-lg border border-purple-500/20"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{p.title}</span>
                          {p.is_featured && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {p.live_url ? (
                            <span className="text-emerald-400">Live: {p.live_url}</span>
                          ) : (
                            <span className="text-slate-500">No Live URL configured</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                          p.is_published
                            ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {p.is_published ? 'Published' : 'Draft'}
                      </button>

                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setIsNewProjectModalOpen(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-purple-950/40 transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supabase status callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-violet-950/30 to-[#0F0E1C] border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>Supabase PostgreSQL Integration</span>
                </div>
                <h4 className="text-sm font-bold text-white">Row Level Security & Database Migration</h4>
                <p className="text-xs text-slate-400 max-w-xl">
                  {isSupabaseConfigured()
                    ? 'Connected to Supabase PostgreSQL database. Row Level Security policies ensure only authorized admin sessions can mutate portfolio data.'
                    : 'Currently operating in Local Sandbox mode. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect live Supabase RLS.'}
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('supabase')}
                className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-md shadow-purple-600/30"
              >
                View Supabase Guide →
              </button>
            </div>

          </div>
        )}

        {/* ---------------- TAB 2: PROJECTS MANAGEMENT ---------------- */}
        {currentTab === 'projects' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Manage your showcase projects. Update live website URLs, descriptions, screenshots, and visibility.
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="glass-panel p-5 rounded-2xl border border-purple-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={project.thumbnail_url}
                      alt=""
                      className="w-20 h-14 object-cover rounded-xl border border-purple-500/20 shrink-0 bg-[#141324]"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white font-display">
                          {project.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-950/60 text-purple-300 border border-purple-500/25">
                          {project.category}
                        </span>
                        {project.is_featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Featured
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          project.is_published 
                            ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30' 
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {project.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-1 line-clamp-1 max-w-xl">
                        {project.short_description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-2 font-mono">
                        <span>
                          Live URL:{' '}
                          {project.live_url ? (
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
                              {project.live_url}
                            </a>
                          ) : (
                            <span className="text-slate-500 italic">None (add live URL)</span>
                          )}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Tech: {project.technologies.slice(0, 3).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => handleTogglePublish(project)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        project.is_published
                          ? 'bg-amber-950/30 text-amber-300 border-amber-500/30 hover:bg-amber-900/40'
                          : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/40'
                      }`}
                    >
                      {project.is_published ? 'Unpublish' : 'Publish'}
                    </button>

                    <button
                      onClick={() => {
                        setEditingProject(project);
                        setIsNewProjectModalOpen(true);
                      }}
                      className="p-2 text-slate-300 hover:text-white bg-[#151425] hover:bg-purple-950/50 border border-purple-500/20 rounded-lg transition-colors cursor-pointer"
                      title="Edit project"
                    >
                      <Edit3 className="w-4 h-4 text-purple-400" />
                    </button>

                    <button
                      onClick={() => setDeleteConfirmProject(project)}
                      className="p-2 text-slate-400 hover:text-red-300 hover:bg-red-950/30 border border-transparent hover:border-red-500/30 rounded-lg transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ---------------- TAB 3: SKILLS MANAGEMENT ---------------- */}
        {currentTab === 'skills' && (
          <div className="space-y-6">
            <div className="text-xs text-slate-400">
              Manage competencies displayed in the portfolio Skills section. Reorder items to adjust presentation.
            </div>

            <div className="glass-panel rounded-2xl border border-purple-500/15 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#121120] text-slate-400 border-b border-purple-500/10 font-mono">
                  <tr>
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4">Skill Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Proficiency</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10 text-slate-200">
                  {skills.map((skill, index) => (
                    <tr key={skill.id} className="hover:bg-purple-950/20 transition-colors">
                      <td className="py-3 px-4 text-slate-400 font-mono">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveSkill(index, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:text-white disabled:opacity-20"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveSkill(index, 'down')}
                            disabled={index === skills.length - 1}
                            className="p-1 hover:text-white disabled:opacity-20"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <span className="ml-1">{index + 1}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-white">
                        {skill.name}
                      </td>
                      <td className="py-3 px-4 text-purple-300">
                        {skill.category}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {skill.proficiency}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingSkill(skill);
                              setIsNewSkillModalOpen(true);
                            }}
                            className="p-1.5 text-slate-400 hover:text-purple-300 hover:bg-purple-950/40 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- TAB 4: PROFILE & ABOUT ME ---------------- */}
        {currentTab === 'profile' && profile && (
          <form onSubmit={handleSaveProfile} className="space-y-6 max-w-4xl">
            
            <div className="glass-panel p-6 rounded-2xl border border-purple-500/15 space-y-4">
              <h3 className="text-sm font-bold text-white font-display">Hero & Header Identity</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-[#141324] text-xs text-white p-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Role / Tagline</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full bg-[#141324] text-xs text-white p-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Hero Display Headline</label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full bg-[#141324] text-xs text-white p-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Hero Short Bio</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-[#141324] text-xs text-white p-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Profile Photo / Avatar URL</label>
                <div className="flex items-center gap-3">
                  <img
                    src={profile.avatar_url || '/assets/aistudio/github_profile_under_1mb_d95b38b4.jpg'}
                    alt="Preview"
                    className="w-12 h-14 object-cover object-top rounded-xl border border-purple-500/30 bg-[#121122]"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/aistudio/github_profile_under_1mb_d95b38b4.jpg'; }}
                  />
                  <input
                    type="text"
                    value={profile.avatar_url}
                    onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                    className="flex-1 bg-[#141324] text-xs text-white p-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/50 font-mono"
                    placeholder="/assets/aistudio/github_profile_under_1mb_d95b38b4.jpg"
                  />
                </div>
              </div>
            </div>

            {/* About Me Story Paragraphs */}
            <div className="glass-panel p-6 rounded-2xl border border-purple-500/15 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-display">About Me Narrative Paragraphs</h3>
                <button
                  type="button"
                  onClick={() => {
                    setProfile({
                      ...profile,
                      about_paragraphs: [...profile.about_paragraphs, '']
                    });
                  }}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Paragraph</span>
                </button>
              </div>

              {profile.about_paragraphs.map((p, pIdx) => (
                <div key={pIdx} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>Paragraph {pIdx + 1}</span>
                    {profile.about_paragraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = profile.about_paragraphs.filter((_, idx) => idx !== pIdx);
                          setProfile({ ...profile, about_paragraphs: updated });
                        }}
                        className="text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => {
                      const updated = [...profile.about_paragraphs];
                      updated[pIdx] = e.target.value;
                      setProfile({ ...profile, about_paragraphs: updated });
                    }}
                    className="w-full bg-[#141324] text-xs text-white p-2.5 rounded-xl border border-purple-500/20 focus:outline-none focus:border-purple-500/50 resize-none"
                  />
                </div>
              ))}
            </div>

            {/* Contact & Social Links */}
            <div className="glass-panel p-6 rounded-2xl border border-purple-500/15 space-y-4">
              <h3 className="text-sm font-bold text-white font-display">Contact & Social Channels</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-[#141324] text-xs text-white p-2.5 rounded-xl border border-purple-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp Phone Number</label>
                  <input
                    type="text"
                    value={profile.whatsapp_number}
                    onChange={(e) => setProfile({ ...profile, whatsapp_number: e.target.value })}
                    className="w-full bg-[#141324] text-xs text-white p-2.5 rounded-xl border border-purple-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={profile.github_url}
                    onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                    className="w-full bg-[#141324] text-xs text-white p-2.5 rounded-xl border border-purple-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={profile.linkedin_url}
                    onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                    className="w-full bg-[#141324] text-xs text-white p-2.5 rounded-xl border border-purple-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="py-3 px-6 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-md shadow-purple-600/30 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save All Profile Changes</span>
            </button>
          </form>
        )}

        {/* ---------------- TAB 5: INBOX ---------------- */}
        {currentTab === 'inbox' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              Inquiries submitted through your portfolio contact form.
            </div>

            {messages.length === 0 ? (
              <div className="glass-panel rounded-2xl p-8 text-center text-slate-400 text-xs">
                No inquiries received yet. Submissions from the contact form will appear here.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`glass-panel p-5 rounded-2xl border transition-all ${
                      msg.is_read ? 'border-purple-500/10 opacity-75' : 'border-purple-500/30 bg-[#121122]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{msg.name}</span>
                        <span className="text-xs text-purple-300 font-mono">&lt;{msg.email}&gt;</span>
                        {!msg.is_read && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-600 text-white font-mono">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {new Date(msg.created_at).toLocaleString()}
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-purple-200 mb-2">
                      Subject: {msg.subject}
                    </div>

                    <p className="text-xs text-slate-300 bg-[#141324] p-3 rounded-xl border border-purple-500/10 whitespace-pre-wrap">
                      {msg.message}
                    </p>

                    <div className="mt-3 pt-3 border-t border-purple-500/10 flex items-center justify-between">
                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent('Re: ' + msg.subject)}`}
                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply via Email</span>
                      </a>

                      <div className="flex items-center gap-2">
                        {!msg.is_read && (
                          <button
                            onClick={async () => {
                              await dataStore.markMessageRead(msg.id);
                              await loadAllData();
                            }}
                            className="text-[11px] text-slate-400 hover:text-white"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={async () => {
                            await dataStore.deleteMessage(msg.id);
                            await loadAllData();
                            showToast('success', 'Inquiry deleted.');
                          }}
                          className="text-[11px] text-red-400 hover:text-red-300 ml-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ---------------- TAB 6: SUPABASE & DEPLOYMENT GUIDE ---------------- */}
        {currentTab === 'supabase' && (
          <div className="space-y-6 max-w-4xl text-xs text-slate-300">
            
            {/* Status card */}
            <div className={`p-5 rounded-2xl border ${
              isSupabaseConfigured()
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
            }`}>
              <div className="flex items-center gap-3">
                {isSupabaseConfigured() ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isSupabaseConfigured() ? 'Supabase Configuration Active' : 'Supabase Not Yet Configured in .env'}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-300">
                    {isSupabaseConfigured() 
                      ? 'Connected to your Supabase project. Row Level Security policies are active.'
                      : 'Running safely in persistent Local Sandbox mode. Follow the 3 steps below to connect your free Supabase database.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Setup Steps */}
            <div className="glass-panel p-6 rounded-2xl border border-purple-500/15 space-y-6">
              <h3 className="text-base font-bold text-white font-display">
                Production Setup Guide: Supabase + GitHub + Vercel
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#121120] border border-purple-500/15 space-y-2">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">1</span>
                    <span>Create Free Supabase Project & Run SQL Schema</span>
                  </div>
                  <p className="text-slate-400">
                    Visit <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">supabase.com</a>, create a free project, open the <strong>SQL Editor</strong>, and paste the contents of <code className="text-purple-300">supabase-schema.sql</code> (or use the button below).
                  </p>
                  <button
                    onClick={handleCopySql}
                    className="mt-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-950 hover:bg-purple-900 border border-purple-500/30 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'SQL Schema Copied!' : 'Copy SQL Schema to Clipboard'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-[#121120] border border-purple-500/15 space-y-2">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">2</span>
                    <span>Create Your Admin Account in Supabase</span>
                  </div>
                  <p className="text-slate-400">
                    In your Supabase Dashboard, go to <strong>Authentication &gt; Users</strong> and click <strong>Add User &gt; Create User</strong>. Enter your email (<code className="text-purple-300">ubaidphelwan@gmail.com</code>) and a strong password. This user will have full administrative privileges via RLS.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#121120] border border-purple-500/15 space-y-2">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">3</span>
                    <span>Set Environment Variables on Vercel</span>
                  </div>
                  <p className="text-slate-400">
                    Push this code to your GitHub repo (<a href="https://github.com/ubaid-dev-coder" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">github.com/ubaid-dev-coder</a>), import the repository in <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">Vercel</a>, and add the following Environment Variables in Project Settings:
                  </p>
                  <div className="p-3 bg-[#09090F] rounded-lg font-mono text-[11px] text-purple-300 space-y-1">
                    <div>VITE_SUPABASE_URL = https://your-project.supabase.co</div>
                    <div>VITE_SUPABASE_ANON_KEY = your-anon-key-here</div>
                    <div>CONTACT_NOTIFICATION_EMAIL = ubaidphelwan@gmail.com</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ---------------- PROJECT EDIT / ADD MODAL ---------------- */}
      {isNewProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/30 bg-[#0F0E1C] shadow-2xl">
            <button
              onClick={() => {
                setIsNewProjectModalOpen(false);
                setEditingProject(null);
              }}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4 font-display">
              {projects.some((p) => p.id === editingProject.id) ? 'Edit Project' : 'Add New Project'}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                  placeholder="e.g. Asmuraa — Perfume E-commerce Website"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                  >
                    <option value="E-commerce">E-commerce</option>
                    <option value="Management System">Management System</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Frontend">Frontend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={editingProject.sort_order}
                    onChange={(e) => setEditingProject({ ...editingProject, sort_order: parseInt(e.target.value, 10) || 1 })}
                    className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Short Description (Card view) *</label>
                <input
                  type="text"
                  required
                  value={editingProject.short_description}
                  onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value })}
                  className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                  placeholder="Brief 1-2 sentence overview"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Detailed Description (Modal view)</label>
                <textarea
                  rows={4}
                  value={editingProject.detailed_description}
                  onChange={(e) => setEditingProject({ ...editingProject, detailed_description: e.target.value })}
                  className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20 resize-none"
                  placeholder="In-depth explanation of architecture, challenges solved, and commercial outcomes..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Live Website URL</label>
                  <input
                    type="url"
                    value={editingProject.live_url}
                    onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                    className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                    placeholder="https://example.com (leave empty for placeholder)"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={editingProject.github_url}
                    onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                    className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                    placeholder="https://github.com/ubaid-dev-coder/repo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Thumbnail / Screenshot URL</label>
                <input
                  type="text"
                  value={editingProject.thumbnail_url}
                  onChange={(e) => setEditingProject({ ...editingProject, thumbnail_url: e.target.value })}
                  className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20 mb-2"
                />
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
                  <span>Quick Presets:</span>
                  <button
                    type="button"
                    onClick={() => setEditingProject({ ...editingProject, thumbnail_url: '/src/assets/images/project_asmuraa_perfume_1792738296836.jpg' })}
                    className="text-purple-400 hover:underline"
                  >
                    Asmuraa Perfume
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setEditingProject({ ...editingProject, thumbnail_url: '/src/assets/images/project_unique_pharmacy_1792738297060.jpg' })}
                    className="text-purple-400 hover:underline"
                  >
                    Pharmacy Portal
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setEditingProject({ ...editingProject, thumbnail_url: '/src/assets/images/project_restaurant_web_1792738297776.jpg' })}
                    className="text-purple-400 hover:underline"
                  >
                    Restaurant
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setEditingProject({ ...editingProject, thumbnail_url: '/src/assets/images/project_inventory_system_1792738297924.jpg' })}
                    className="text-purple-400 hover:underline"
                  >
                    Inventory
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.technologies.join(', ')}
                  onChange={(e) => setEditingProject({
                    ...editingProject,
                    technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                  })}
                  className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                  placeholder="React, TypeScript, Tailwind CSS"
                />
              </div>

              <div className="pt-2 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_published}
                    onChange={(e) => setEditingProject({ ...editingProject, is_published: e.target.checked })}
                    className="rounded bg-[#141324] border-purple-500/30 text-purple-600 focus:ring-0"
                  />
                  <span className="text-white font-medium">Published on Portfolio</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_featured}
                    onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                    className="rounded bg-[#141324] border-purple-500/30 text-purple-600 focus:ring-0"
                  />
                  <span className="text-white font-medium">Featured Case Study</span>
                </label>
              </div>

              <div className="pt-6 border-t border-purple-500/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewProjectModalOpen(false);
                    setEditingProject(null);
                  }}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveProject(editingProject)}
                  className="px-5 py-2 text-white bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold shadow-md shadow-purple-600/30 cursor-pointer"
                >
                  Save Project
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ---------------- DELETE PROJECT CONFIRMATION ---------------- */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel p-6 rounded-2xl border border-red-500/30 bg-[#0F0E1C] max-w-md w-full">
            <h3 className="text-base font-bold text-white mb-2">Delete Project?</h3>
            <p className="text-xs text-slate-300 mb-6">
              Are you sure you want to delete <strong>"{deleteConfirmProject.title}"</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmProject(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(deleteConfirmProject.id)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-md cursor-pointer"
              >
                Yes, Delete Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- SKILL EDIT / ADD MODAL ---------------- */}
      {isNewSkillModalOpen && editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 bg-[#0F0E1C] max-w-md w-full text-xs">
            <h3 className="text-base font-bold text-white mb-4">
              {skills.some((s) => s.id === editingSkill.id) ? 'Edit Skill' : 'Add New Skill'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                  placeholder="e.g. Next.js / Docker"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Category</label>
                <select
                  value={editingSkill.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Solutions">Solutions</option>
                  <option value="AI & Tools">AI & Tools</option>
                  <option value="DevOps & Tools">DevOps & Tools</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Proficiency Level</label>
                <select
                  value={editingSkill.proficiency}
                  onChange={(e) => setEditingSkill({ ...editingSkill, proficiency: e.target.value })}
                  className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                >
                  <option value="Expert">Expert</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Proficient">Proficient</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Icon Representation</label>
                <select
                  value={editingSkill.icon_name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, icon_name: e.target.value })}
                  className="w-full bg-[#141324] text-white p-2.5 rounded-xl border border-purple-500/20"
                >
                  <option value="Code2">Code / Programming</option>
                  <option value="Layout">Layout / Web Design</option>
                  <option value="Palette">Design / Tailwind</option>
                  <option value="Atom">React / Framework</option>
                  <option value="Smartphone">Mobile / Responsive</option>
                  <option value="ShoppingBag">E-commerce</option>
                  <option value="Sparkles">AI / Google AI Studio</option>
                  <option value="GitBranch">Git & GitHub</option>
                  <option value="Zap">Vercel Deployment</option>
                </select>
              </div>

              <div className="pt-4 border-t border-purple-500/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewSkillModalOpen(false);
                    setEditingSkill(null);
                  }}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveSkill(editingSkill)}
                  className="px-4 py-2 text-white bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold shadow-md shadow-purple-600/30"
                >
                  Save Skill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
