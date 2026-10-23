-- =====================================================================
-- UBAID KHATRI DEVELOPER PORTFOLIO — SUPABASE SQL SCHEMA & RLS POLICIES
-- =====================================================================
-- Execute this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- to create tables, enable Row Level Security (RLS), and populate initial seed data.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Frontend',
    proficiency TEXT DEFAULT 'Advanced',
    icon_name TEXT DEFAULT 'Code',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PROFILE & ABOUT ME SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.profile_settings (
    id TEXT PRIMARY KEY DEFAULT 'ubaid_khatri',
    name TEXT NOT NULL DEFAULT 'Ubaid Khatri',
    role TEXT NOT NULL DEFAULT 'Web Developer | AI Website Creator | Frontend Developer',
    headline TEXT NOT NULL DEFAULT 'Building Digital Experiences That Make Businesses Stand Out.',
    bio TEXT NOT NULL,
    about_paragraphs JSONB DEFAULT '[]'::jsonb,
    avatar_url TEXT,
    email TEXT DEFAULT 'ubaidphelwan@gmail.com',
    whatsapp_number TEXT DEFAULT '+923000000000',
    github_url TEXT DEFAULT 'https://github.com/ubaid-dev-coder',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/in/ubaid-khatri',
    cv_url TEXT DEFAULT '',
    stats JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CONTACT MESSAGES INBOX
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- PROJECTS POLICIES
-- Public: Anyone can read published projects
CREATE POLICY "Public can view published projects"
    ON public.projects FOR SELECT
    USING (is_published = true);

-- Admin: Authenticated users can read all projects (including drafts)
CREATE POLICY "Admin can view all projects"
    ON public.projects FOR SELECT
    TO authenticated
    USING (true);

-- Admin: Authenticated users can insert, update, and delete projects
CREATE POLICY "Admin can insert projects"
    ON public.projects FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Admin can update projects"
    ON public.projects FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Admin can delete projects"
    ON public.projects FOR DELETE
    TO authenticated
    USING (true);

-- SKILLS POLICIES
-- Public: Anyone can view skills
CREATE POLICY "Public can view skills"
    ON public.skills FOR SELECT
    USING (true);

-- Admin: Authenticated users can manage skills
CREATE POLICY "Admin can manage skills"
    ON public.skills FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- PROFILE SETTINGS POLICIES
-- Public: Anyone can view profile settings
CREATE POLICY "Public can view profile settings"
    ON public.profile_settings FOR SELECT
    USING (true);

-- Admin: Authenticated users can update profile settings
CREATE POLICY "Admin can update profile settings"
    ON public.profile_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- CONTACT MESSAGES POLICIES
-- Public: Anyone can submit a contact message
CREATE POLICY "Public can submit contact messages"
    ON public.contact_messages FOR INSERT
    WITH CHECK (true);

-- Admin: Only authenticated users can view and manage received messages
CREATE POLICY "Admin can view contact messages"
    ON public.contact_messages FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admin can update contact messages"
    ON public.contact_messages FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Admin can delete contact messages"
    ON public.contact_messages FOR DELETE
    TO authenticated
    USING (true);

-- =====================================================================
-- INITIAL SEED DATA
-- =====================================================================

-- Insert Default Profile Settings
INSERT INTO public.profile_settings (
    id, name, role, headline, bio, about_paragraphs, avatar_url, email, whatsapp_number, github_url, linkedin_url, stats
) VALUES (
    'ubaid_khatri',
    'Ubaid Khatri',
    'Web Developer | AI Website Creator | Frontend Developer',
    'Building Digital Experiences That Make Businesses Stand Out.',
    'I create modern, responsive websites and AI-powered digital experiences for businesses and brands. With a deep passion for clean architecture, fluid interaction design, and performant web technologies, I help clients transform complex ideas into high-converting digital products.',
    '[
      "Hello! I am Ubaid Khatri, a forward-thinking Web Developer and AI Website Creator committed to crafting digital solutions that elevate modern brands. My work bridges the gap between clean frontend engineering and practical business objectives.",
      "Specializing in modern web technologies including React, TypeScript, and Tailwind CSS, I design and engineer scalable web applications, e-commerce storefronts, and intuitive management systems.",
      "Beyond standard development, I leverage modern AI tooling to streamline user interactions, accelerate workflows, and build intelligent web platforms that give businesses a distinct competitive edge."
    ]'::jsonb,
    '/assets/aistudio/github_profile_under_1mb_d95b38b4.jpg',
    'ubaidphelwan@gmail.com',
    '03152768037',
    'https://github.com/ubaid-dev-coder',
    'https://linkedin.com/in/ubaid-khatri',
    '[
      {"label": "Web Projects Delivered", "value": "18+"},
      {"label": "Client Satisfaction Rate", "value": "99%"},
      {"label": "Frontend & AI Tooling", "value": "9+ Core Techs"},
      {"label": "Average Project Delivery", "value": "2 Weeks"}
    ]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Insert Required Initial Skills
INSERT INTO public.skills (name, category, proficiency, icon_name, sort_order) VALUES
('HTML5 & CSS3', 'Frontend', 'Expert', 'Layout', 1),
('JavaScript & TypeScript', 'Frontend', 'Advanced', 'Code2', 2),
('React.js', 'Frontend', 'Advanced', 'Atom', 3),
('Tailwind CSS', 'Frontend', 'Expert', 'Palette', 4),
('Responsive Web Design', 'Frontend', 'Expert', 'Smartphone', 5),
('E-commerce Website Development', 'Solutions', 'Advanced', 'ShoppingBag', 6),
('Google AI Studio', 'AI & Tools', 'Advanced', 'Sparkles', 7),
('Git & GitHub', 'DevOps & Tools', 'Advanced', 'GitBranch', 8),
('Vercel Deployment', 'DevOps & Tools', 'Advanced', 'Zap', 9)
ON CONFLICT DO NOTHING;

-- Insert Required Initial Projects (Placeholder entries as specified)
INSERT INTO public.projects (
    title, short_description, detailed_description, thumbnail_url,
    technologies, live_url, github_url, is_featured, category, is_published, sort_order
) VALUES
(
    'Asmuraa — Perfume E-commerce Website',
    'Luxury fragrance boutique with rich sensory catalog browsing, cart system, and refined checkout experience.',
    'A high-end e-commerce destination engineered for Asmuraa luxury perfumes. Features custom fragrance note explorers, sleek category filtration, fluid product cards with micro-animations, shopping cart state management, and optimized high-resolution visuals designed for maximum brand prestige.',
    '/src/assets/images/project_asmuraa_perfume_1792738296836.jpg',
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'E-commerce', 'Responsive Design'],
    'https://asmura-perfume-best-perfumes.vercel.app/',
    'https://github.com/ubaid-dev-coder',
    true,
    'E-commerce',
    true,
    1
),
(
    'Unique Care Pharmacy I.M — Pharmacy Management Website',
    'Comprehensive prescription fulfillment and pharmaceutical inventory tracking platform.',
    'Engineered for clinical precision, Unique Care Pharmacy I.M is a web management portal streamlining patient medication schedules, prescription tracking, stock level alerts, and dosage guidelines with accessible data tables and clean status tracking.',
    '/src/assets/images/project_unique_pharmacy_1792738297060.jpg',
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Management Portal', 'Healthcare UI'],
    'https://best-unique-care-pharmacy-im.vercel.app/',
    'https://github.com/ubaid-dev-coder',
    true,
    'Management System',
    true,
    2
),
(
    'Restaurant Website',
    'Atmospheric dining showcase featuring interactive menu curation and table reservation booking flow.',
    'A bespoke hospitality website designed for gourmet fine dining. Incorporates interactive course menus, chef culinary highlights, real-time table reservation forms with date/time pickers, and mobile-first responsive layouts.',
    '/src/assets/images/project_restaurant_web_1792738297776.jpg',
    ARRAY['React', 'Tailwind CSS', 'Table Reservations', 'UI/UX Design'],
    '',
    'https://github.com/ubaid-dev-coder',
    false,
    'Web Application',
    true,
    3
),
(
    'Inventory Management System',
    'Real-time warehouse stock tracking, supply chain metrics, and order dispatch workflow dashboard.',
    'A robust enterprise inventory dashboard equipped with SKU monitoring, stock movement bar charts, low-stock notifications, replenishment automation logs, and instant search for multi-warehouse tracking.',
    '/src/assets/images/project_inventory_system_1792738297924.jpg',
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Analytics', 'Enterprise SaaS'],
    '',
    'https://github.com/ubaid-dev-coder',
    false,
    'Management System',
    true,
    4
);
