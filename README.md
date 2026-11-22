# SkillSangam

SkillSangam is a React/Vite marketplace prototype connecting fresh software graduates with startups through paid, focused two-week micro-internships.

## Current product

The application has three separate role experiences:

- Student: discover internships, calculate skill-match scores, apply, manage applications, and maintain a profile.
- Employer: complete verification, manage company details, create and edit internships, and review applicants.
- Admin: review employers, manage reports, inspect platform counts, and review the audit log.

All three roles have separate layouts, navigation links, role badges, dashboards, and accent colours.

## Routes

### Public

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/how-it-works` | Student/startup workflow tabs |
| `/internships` | Read-only public internship browser |
| `/login` | Sign in |
| `/register` | Student/employer registration |
| `/verify-email` | Employer OTP and verification flow |
| `/account` | Account settings for authenticated users |
| `/about` | About page |
| `/terms` | Terms page |
| `/privacy` | Privacy page |
| `/unauthorized` | Role access error page |

### Student

| Route | Purpose |
| --- | --- |
| `/student` | Student dashboard |
| `/student/browse` | Search, filter, sort, and match internships |
| `/student/internships/:id` | Internship detail, apply, and report employer |
| `/student/applications` | Application status list |
| `/student/profile` | Profile, skills, consent, and GitHub skill detection |

### Employer

| Route | Purpose |
| --- | --- |
| `/employer` | Employer dashboard |
| `/employer/verify` | Email OTP and company verification wizard |
| `/employer/internships` | Manage internship listings |
| `/employer/internships/new` | Create an internship |
| `/employer/internships/:id/edit` | Edit an internship with no applicants |
| `/employer/internships/:id/applicants` | Shortlist, accept, or reject applicants |
| `/employer/company` | View and edit company profile |

### Admin

| Route | Purpose |
| --- | --- |
| `/admin` | Admin dashboard with computed counts |
| `/admin/employers` | Employer approval, suspension, and reinstatement |
| `/admin/reports` | Report status tabs and moderation actions |
| `/admin/audit` | Recorded administrative actions |

## Architecture

```text
src/
├── main.jsx                  # React bootstrap
├── Root.jsx                  # React Router route definitions
├── index.css                 # Tailwind directives and application styles
├── api/                      # Async localStorage API modules and seed data
├── context/                  # Authentication context
├── layouts/                  # Public, Student, Employer, and Admin layouts
├── components/               # Shared modal, toast, badge, tag, and state UI
├── pages/
│   ├── public/               # Landing, auth, browse, and static pages
│   ├── student/              # Student dashboard and workflows
│   ├── employer/             # Employer dashboard and workflows
│   ├── admin/                # Admin dashboard and moderation workflows
│   └── shared/               # Account and unauthorized pages
└── utils/                    # Match scoring, validation, and GitHub integration
```

The frontend and server are separate applications. The frontend in `frontend/` calls the Express API in `server/` over HTTP and neither application imports modules from the other. The backend uses MongoDB when `MONGO_URI` is configured, otherwise MongoDB Memory Server. Verification uploads use Cloudinary when `CLOUDINARY_URL` is configured, otherwise local disk.

## Technology

- React 18
- Vite 6
- React Router 6
- JavaScript ES modules
- Tailwind CSS with PostCSS
- Lucide React icons
- Express and MongoDB/MongoDB Memory Server
- JWT authentication and bcrypt password hashing
- Cloudinary or local-disk document storage

## Getting started

Requirements: Node.js 18+ and npm.

```bash
npm install
cd server
npm install
npm run dev

# In another terminal
cd frontend
npm install
npm run dev
```

Copy `server/.env.example` to `server/.env` and set `JWT_SECRET`. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` there when you need to create an admin account; no demo credentials are hardcoded.

Create a production build with:

```bash
cd frontend
npm run build
```

## Suggested demo flows

1. Student: log in, open Browse, inspect an internship, apply with a 20+ character note, then review My applications.
2. Employer: open the dashboard, complete verification if needed, post an internship, then inspect applicants.
3. Admin: open Employer approvals, approve the pending employer, then review Reports and Audit log.

## Phase 1 limitations

- Authentication, verification, uploaded proof documents, and data storage are local demo implementations.
- Employer OTP is printed to the browser console and shown in a dismissible development banner.
- GitHub skill detection calls the public GitHub repositories API only after explicit consent.
- No production backend, database, payment processing, real-time messaging, or production security controls are connected.
- Match scores and dashboards are computed from the seeded/localStorage data.
