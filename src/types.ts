export interface Project {
  id: string;
  title: string;
  short_description: string;
  detailed_description: string;
  thumbnail_url: string;
  technologies: string[];
  live_url: string;
  github_url: string;
  is_featured: boolean;
  category: 'E-commerce' | 'Management System' | 'Web Application' | 'Frontend' | string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'DevOps & Tools' | 'AI & Tools' | 'Solutions' | string;
  proficiency: 'Expert' | 'Advanced' | 'Proficient' | string;
  icon_name: string;
  sort_order: number;
  created_at?: string;
}

export interface ProfileStat {
  label: string;
  value: string;
}

export interface ProfileSettings {
  id: string;
  name: string;
  role: string;
  headline: string;
  bio: string;
  about_paragraphs: string[];
  avatar_url: string;
  email: string;
  whatsapp_number: string;
  github_url: string;
  linkedin_url: string;
  cv_url: string;
  stats: ProfileStat[];
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}
