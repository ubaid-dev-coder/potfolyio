# Ubaid Khatri — Premium Developer Portfolio & CMS

A high-performance, dark-themed developer portfolio and project management system designed for **Ubaid Khatri** (Web Developer, AI Website Creator & Frontend Engineer). Built with React, TypeScript, Tailwind CSS, Supabase PostgreSQL with Row Level Security (RLS), and prepared for direct deployment to Vercel and GitHub.

---

## 🌟 Key Features

1. **Brand & Visuals**
   - Premium Dark Black (`#09090F`) + Purple (`#8B5CF6`) and violet accents.
   - Glassmorphic panels, subtle glow effects, responsive layouts.
   - Zero-pill metadata design following high-end editorial standards.

2. **Hero & About Me**
   - Dynamic headline, role kicker, and editable biographical story.
   - Verified metrics bar (Projects Delivered, Client Satisfaction, Core Tech Breadth).
   - Direct CTA buttons: *View My Work*, *Contact Me*, and *Download CV* (with print/PDF preview modal).
   - Social links to GitHub (`https://github.com/ubaid-dev-coder`), LinkedIn, and Email (`ubaidphelwan@gmail.com`).

3. **Skills & Competencies**
   - Categorized skills: Frontend, E-commerce Solutions, AI & Tools, DevOps.
   - Add, edit, reorder, and remove skills directly from `/admin`.

4. **Project Showcase (Initial Editable Entries)**
   - **Asmuraa** — Perfume E-commerce Website
   - **Unique Care Pharmacy I.M** — Pharmacy Management Website
   - **Restaurant Website**
   - **Inventory Management System**
   - Dynamic search, category filtering, and featured projects toggle.
   - Working buttons: *Live Demo* (opens external site or shows configuration status), *Source Code* (GitHub), and *View Details* (modal with architecture breakdown).

5. **Secure Admin Dashboard (`/admin`)**
   - Project CRUD (Add, edit, delete, publish/unpublish, feature, and update Live URLs).
   - Skill manager with reordering.
   - Bio, narrative paragraphs, stats, and contact link editor.
   - Contact messages inbox with email reply shortcut.
   - Supabase & RLS security guide with one-click SQL copying.

6. **Contact Section & Backend Endpoint**
   - Real `/api/contact` endpoint with anti-spam honeypot and validation.
   - Direct clickable email, WhatsApp, and GitHub connection cards.

---

## 🚀 Setup & Deployment Instructions

### 1. Supabase Configuration (Database & Authentication)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase project.
3. Open the file `supabase-schema.sql` located in this repository, copy all the SQL, and click **Run**.
   - This creates `projects`, `skills`, `profile_settings`, and `contact_messages`.
   - It enables **Row Level Security (RLS)** ensuring only authenticated administrators can mutate data while public visitors can only read published content.
4. Go to **Authentication > Users** in the Supabase Dashboard.
5. Click **Add User > Create User**:
   - Email: `ubaidphelwan@gmail.com`
   - Set your secure administrator password.
6. Retrieve your credentials from **Project Settings > API**:
   - `Project URL`
   - `anon public` key

### 2. Environment Variables

Create or update your `.env` file with your credentials:

```bash
# Supabase Configuration
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"

# Contact Form Notification Email
CONTACT_NOTIFICATION_EMAIL="ubaidphelwan@gmail.com"
```

*Note: If these variables are not provided, the application runs in a resilient **Local Administrative Sandbox** using persistent browser storage (`localStorage`), allowing immediate testing without crashing.*

### 3. Deploying to Vercel & Connecting GitHub

1. Initialize git and commit all files:
   ```bash
   git init
   git add .
   git commit -m "feat: Ubaid Khatri premium portfolio"
   ```
2. Create a new repository on your GitHub account (`https://github.com/ubaid-dev-coder/portfolio`):
   ```bash
   git remote add origin https://github.com/ubaid-dev-coder/portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. Visit [vercel.com](https://vercel.com) and click **Add New > Project**.
4. Select your GitHub repository (`portfolio`).
5. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `CONTACT_NOTIFICATION_EMAIL`
6. Click **Deploy**. Vercel will build using `npm run build` and serve the application with seamless client routing as defined in `vercel.json`.

---

## 🛠️ Local Development Commands

- `npm run dev`: Starts the full-stack dev server on `http://localhost:3000` with Express backend and Vite middleware.
- `npm run build`: Builds the production bundle to `dist/`.
- `npm run lint`: Validates TypeScript types across all files.
