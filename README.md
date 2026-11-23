# Skill Sangam

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
| `/admin/verifications` | Employer verification review with proof documents |
| `/admin/reports` | Report status tabs and moderation actions |
| `/admin/audit` | Recorded administrative actions |

## Architecture

```text
frontend/
├── src/                      # React application source
│   ├── api/                  # HTTP clients for the Express API
│   ├── components/           # Shared UI components
│   ├── context/              # Authentication context
│   ├── layouts/              # Role-specific layouts
│   ├── pages/                # Public, student, employer, and admin pages
│   └── utils/                # Validation, matching, and GitHub integration
└── package.json              # Frontend dependencies and Vite scripts

server/
├── config/                   # Database connection and memory fallback
├── middleware/               # Authentication and role authorization
├── models/                   # Mongoose models
├── services/                 # Cloudinary or local upload storage
├── index.js                  # Express API and route definitions
└── package.json              # Backend dependencies and scripts
```

The frontend and server are separate applications. The frontend in `frontend/` calls the Express API in `server/` over HTTP, and neither application imports modules from the other.

The backend uses MongoDB when `MONGO_URI` is configured, otherwise MongoDB Memory Server. Verification uploads use Cloudinary when `CLOUDINARY_URL` is configured, otherwise local disk under `uploads/`. Runtime uploads and local environment files are ignored by Git.

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
cd server
npm install
npm run dev

# In another terminal
cd frontend
npm install
npm run dev
```

Copy `server/.env.example` to `server/.env` and configure:

- `JWT_SECRET` for session signing.
- `MONGO_URI` for hosted MongoDB; leave blank to use MongoDB Memory Server.
- `CLOUDINARY_URL` for hosted proof-document storage; leave blank to use local disk.
- `CLIENT_ORIGIN` for the frontend URL.
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optionally `ADMIN_NAME` to bootstrap an admin account.

No demo credentials are hardcoded in the application.

Create a production build with:

```bash
cd frontend
npm run build
```

## Suggested demo flows

1. Student: log in, open Browse, inspect an internship, apply with a 20+ character note, then review My applications.
2. Employer: open the dashboard, complete verification if needed, post an internship, then inspect applicants.
3. Admin: open Employer approvals, approve the pending employer, then review Reports and Audit log.

## Development notes

- Employer OTP is currently a development-only browser flow. It is shown in the development banner and is not sent by email.
- GitHub skill detection calls the public GitHub repositories API only after explicit consent.
- Production deployments should use a hosted MongoDB database, Cloudinary, a strong JWT secret, HTTPS, and an email provider for OTP delivery.
- Payment processing and real-time messaging are not connected.
