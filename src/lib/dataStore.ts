import { Project, Skill, ProfileSettings, ContactMessage } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  PROJECTS: 'ubaid_portfolio_projects_v1',
  SKILLS: 'ubaid_portfolio_skills_v1',
  PROFILE: 'ubaid_portfolio_profile_v1',
  MESSAGES: 'ubaid_portfolio_messages_v1',
  LOCAL_ADMIN_AUTH: 'ubaid_portfolio_local_admin_session'
};

export const INITIAL_PROFILE: ProfileSettings = {
  id: 'ubaid_khatri',
  name: 'Ubaid Khatri',
  role: 'Web Developer | AI Website Creator | Frontend Developer',
  headline: 'Building Digital Experiences That Make Businesses Stand Out.',
  bio: 'I create modern, responsive websites and AI-powered digital experiences for businesses and brands. Focused on clean architecture, lightning-fast interfaces, and high-impact digital presence.',
  about_paragraphs: [
    'I am a passionate Web Developer and AI Website Creator specializing in transforming modern concepts into high-converting, resilient digital platforms. Whether building custom e-commerce storefronts, scalable management portals, or AI-integrated business interfaces, my focus is always on speed, aesthetics, and measurable results.',
    'With deep expertise in React.js, TypeScript, and modern styling architectures like Tailwind CSS, I ensure every line of code serves both the end user experience and the client’s growth strategy.',
    'I actively integrate modern AI tools, automated deployment workflows on Vercel, and robust backend integrations to deliver projects rapidly without compromising on code quality or design integrity.'
  ],
  avatar_url: '/assets/aistudio/github_profile_under_1mb_d95b38b4.jpg',
  email: 'ubaidphelwan@gmail.com',
  whatsapp_number: '03152768037',
  github_url: 'https://github.com/ubaid-dev-coder',
  linkedin_url: 'https://linkedin.com/in/ubaid-khatri',
  cv_url: '',
  stats: [
    { label: 'Web Projects Built', value: '18+' },
    { label: 'Client Satisfaction', value: '99%' },
    { label: 'Core Tech Stack', value: '9+ Tools' },
    { label: 'Avg Turnaround', value: '2 Weeks' }
  ]
};

export const INITIAL_SKILLS: Skill[] = [
  { id: 'sk-1', name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 'Expert', icon_name: 'Layout', sort_order: 1 },
  { id: 'sk-2', name: 'JavaScript & TypeScript', category: 'Frontend', proficiency: 'Advanced', icon_name: 'Code2', sort_order: 2 },
  { id: 'sk-3', name: 'React.js', category: 'Frontend', proficiency: 'Advanced', icon_name: 'Atom', sort_order: 3 },
  { id: 'sk-4', name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Expert', icon_name: 'Palette', sort_order: 4 },
  { id: 'sk-5', name: 'Responsive Web Design', category: 'Frontend', proficiency: 'Expert', icon_name: 'Smartphone', sort_order: 5 },
  { id: 'sk-6', name: 'E-commerce Website Development', category: 'Solutions', proficiency: 'Advanced', icon_name: 'ShoppingBag', sort_order: 6 },
  { id: 'sk-7', name: 'Google AI Studio', category: 'AI & Tools', proficiency: 'Advanced', icon_name: 'Sparkles', sort_order: 7 },
  { id: 'sk-8', name: 'Git & GitHub', category: 'DevOps & Tools', proficiency: 'Advanced', icon_name: 'GitBranch', sort_order: 8 },
  { id: 'sk-9', name: 'Vercel Deployment', category: 'DevOps & Tools', proficiency: 'Advanced', icon_name: 'Zap', sort_order: 9 }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Asmuraa — Perfume E-commerce Website',
    short_description: 'Luxury fragrance boutique with rich sensory catalog browsing, cart system, and refined checkout experience.',
    detailed_description: 'A high-end e-commerce destination engineered for Asmuraa luxury perfumes. Features custom fragrance note explorers, sleek category filtration, fluid product cards with micro-animations, shopping cart state management, and optimized high-resolution visuals designed for maximum brand prestige.',
    thumbnail_url: '/src/assets/images/project_asmuraa_perfume_1792738296836.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'E-commerce', 'Responsive Design'],
    live_url: 'https://asmura-perfume-best-perfumes.vercel.app/',
    github_url: 'https://github.com/ubaid-dev-coder',
    is_featured: true,
    category: 'E-commerce',
    is_published: true,
    sort_order: 1,
    created_at: '2026-08-15T10:00:00Z'
  },
  {
    id: 'proj-2',
    title: 'Unique Care Pharmacy I.M — Pharmacy Management Website',
    short_description: 'Comprehensive prescription fulfillment and pharmaceutical inventory tracking platform.',
    detailed_description: 'Engineered for clinical precision, Unique Care Pharmacy I.M is a web management portal streamlining patient medication schedules, prescription tracking, stock level alerts, and dosage guidelines with accessible data tables and clean status tracking.',
    thumbnail_url: '/src/assets/images/project_unique_pharmacy_1792738297060.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Management Portal', 'Healthcare UI'],
    live_url: 'https://best-unique-care-pharmacy-im.vercel.app/',
    github_url: 'https://github.com/ubaid-dev-coder',
    is_featured: true,
    category: 'Management System',
    is_published: true,
    sort_order: 2,
    created_at: '2026-09-02T14:30:00Z'
  },
  {
    id: 'proj-3',
    title: 'Restaurant Website',
    short_description: 'Atmospheric dining showcase featuring interactive menu curation and table reservation booking flow.',
    detailed_description: 'A bespoke hospitality website designed for gourmet fine dining. Incorporates interactive course menus, chef culinary highlights, real-time table reservation forms with date/time pickers, and mobile-first responsive layouts.',
    thumbnail_url: '/src/assets/images/project_restaurant_web_1792738297776.jpg',
    technologies: ['React', 'Tailwind CSS', 'Table Reservations', 'UI/UX Design'],
    live_url: '', // Initial placeholder: editable in Admin
    github_url: 'https://github.com/ubaid-dev-coder',
    is_featured: false,
    category: 'Web Application',
    is_published: true,
    sort_order: 3,
    created_at: '2026-09-20T18:00:00Z'
  },
  {
    id: 'proj-4',
    title: 'Inventory Management System',
    short_description: 'Real-time warehouse stock tracking, supply chain metrics, and order dispatch workflow dashboard.',
    detailed_description: 'A robust enterprise inventory dashboard equipped with SKU monitoring, stock movement bar charts, low-stock notifications, replenishment automation logs, and instant search for multi-warehouse tracking.',
    thumbnail_url: '/src/assets/images/project_inventory_system_1792738297924.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Analytics', 'Enterprise SaaS'],
    live_url: '', // Initial placeholder: editable in Admin
    github_url: 'https://github.com/ubaid-dev-coder',
    is_featured: false,
    category: 'Management System',
    is_published: true,
    sort_order: 4,
    created_at: '2026-10-05T09:15:00Z'
  }
];

// Helper to load localStorage safely
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch (err) {
    console.warn(`Failed to read ${key} from localStorage:`, err);
  }
  return defaultValue;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to write ${key} to localStorage:`, err);
  }
}

// -------------------------------------------------------------
// Unified Data Store APIs
// -------------------------------------------------------------

export const dataStore = {
  // --- PROJECTS ---
  async getProjects(): Promise<Project[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('sort_order', { ascending: true });
        
        if (!error && data && data.length > 0) {
          return data as Project[];
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store:', err);
      }
    }
    const storedProjects = loadFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    let updated = false;
    const migrated = storedProjects.map((p) => {
      if ((p.id === 'proj-1' || p.title.includes('Asmuraa')) && (!p.live_url || p.live_url === '')) {
        updated = true;
        return { ...p, live_url: 'https://asmura-perfume-best-perfumes.vercel.app/' };
      }
      if ((p.id === 'proj-2' || p.title.includes('Unique Care Pharmacy')) && (!p.live_url || p.live_url === '')) {
        updated = true;
        return { ...p, live_url: 'https://best-unique-care-pharmacy-im.vercel.app/' };
      }
      return p;
    });
    if (updated) {
      saveToStorage(STORAGE_KEYS.PROJECTS, migrated);
    }
    return migrated;
  },

  async saveProject(project: Project): Promise<Project> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .upsert([project])
          .select()
          .single();
        if (!error && data) {
          return data as Project;
        }
      } catch (err) {
        console.warn('Supabase save failed, updating local store:', err);
      }
    }

    const current = loadFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    const existingIndex = current.findIndex((p) => p.id === project.id);
    let updated: Project[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...project, updated_at: new Date().toISOString() };
    } else {
      updated = [...current, { ...project, created_at: new Date().toISOString() }];
    }
    saveToStorage(STORAGE_KEYS.PROJECTS, updated);
    return project;
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase delete failed:', err);
      }
    }
    const current = loadFromStorage<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    const filtered = current.filter((p) => p.id !== id);
    saveToStorage(STORAGE_KEYS.PROJECTS, filtered);
    return true;
  },

  // --- SKILLS ---
  async getSkills(): Promise<Skill[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('sort_order', { ascending: true });
        if (!error && data && data.length > 0) {
          return data as Skill[];
        }
      } catch (err) {
        console.warn('Supabase skills fetch failed:', err);
      }
    }
    return loadFromStorage<Skill[]>(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
  },

  async saveSkill(skill: Skill): Promise<Skill> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.from('skills').upsert([skill]).select().single();
        if (!error && data) return data as Skill;
      } catch (err) {
        console.warn('Supabase skill save failed:', err);
      }
    }
    const current = loadFromStorage<Skill[]>(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
    const existingIndex = current.findIndex((s) => s.id === skill.id);
    let updated: Skill[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = skill;
    } else {
      updated = [...current, skill];
    }
    saveToStorage(STORAGE_KEYS.SKILLS, updated);
    return skill;
  },

  async deleteSkill(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase skill delete failed:', err);
      }
    }
    const current = loadFromStorage<Skill[]>(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
    saveToStorage(STORAGE_KEYS.SKILLS, current.filter((s) => s.id !== id));
    return true;
  },

  async reorderSkills(skills: Skill[]): Promise<void> {
    const ordered = skills.map((s, idx) => ({ ...s, sort_order: idx + 1 }));
    saveToStorage(STORAGE_KEYS.SKILLS, ordered);
    if (isSupabaseConfigured() && supabase) {
      for (const item of ordered) {
        await supabase.from('skills').update({ sort_order: item.sort_order }).eq('id', item.id);
      }
    }
  },

  // --- PROFILE SETTINGS ---
  async getProfile(): Promise<ProfileSettings> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('profile_settings')
          .select('*')
          .eq('id', 'ubaid_khatri')
          .single();
        if (!error && data) return data as ProfileSettings;
      } catch (err) {
        console.warn('Supabase profile fetch failed:', err);
      }
    }
    const stored = loadFromStorage<ProfileSettings>(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
    let changed = false;
    // Automatically migrate to user's real uploaded picture if previous generated avatar was stored
    if (!stored.avatar_url || stored.avatar_url.includes('ubaid_developer_portrait')) {
      stored.avatar_url = '/assets/aistudio/github_profile_under_1mb_d95b38b4.jpg';
      changed = true;
    }
    // Automatically migrate old placeholder phone numbers to 03152768037
    if (!stored.whatsapp_number || stored.whatsapp_number === '+923001234567' || stored.whatsapp_number === '+923000000000') {
      stored.whatsapp_number = '03152768037';
      changed = true;
    }
    if (changed) {
      saveToStorage(STORAGE_KEYS.PROFILE, stored);
    }
    return stored;
  },

  async saveProfile(profile: ProfileSettings): Promise<ProfileSettings> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('profile_settings')
          .upsert([{ ...profile, id: 'ubaid_khatri', updated_at: new Date().toISOString() }])
          .select()
          .single();
        if (!error && data) return data as ProfileSettings;
      } catch (err) {
        console.warn('Supabase profile save failed:', err);
      }
    }
    saveToStorage(STORAGE_KEYS.PROFILE, profile);
    return profile;
  },

  // --- CONTACT MESSAGES ---
  async getMessages(): Promise<ContactMessage[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data as ContactMessage[];
      } catch (err) {
        console.warn('Supabase messages fetch failed:', err);
      }
    }
    return loadFromStorage<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
  },

  async saveMessage(msg: Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>): Promise<ContactMessage> {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      created_at: new Date().toISOString(),
      is_read: false
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('contact_messages').insert([newMsg]);
      } catch (err) {
        console.warn('Supabase insert message failed:', err);
      }
    }

    const current = loadFromStorage<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
    saveToStorage(STORAGE_KEYS.MESSAGES, [newMsg, ...current]);
    return newMsg;
  },

  async markMessageRead(id: string): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
      } catch (err) {
        console.warn('Supabase mark read error:', err);
      }
    }
    const current = loadFromStorage<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
    saveToStorage(STORAGE_KEYS.MESSAGES, current.map(m => m.id === id ? { ...m, is_read: true } : m));
  },

  async deleteMessage(id: string): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('contact_messages').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete message error:', err);
      }
    }
    const current = loadFromStorage<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
    saveToStorage(STORAGE_KEYS.MESSAGES, current.filter(m => m.id !== id));
  },

  // Reset to initial demo data if user desires
  resetToDefaults(): void {
    saveToStorage(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    saveToStorage(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
    saveToStorage(STORAGE_KEYS.PROFILE, INITIAL_PROFILE);
  }
};
