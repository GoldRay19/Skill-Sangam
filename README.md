# SkillSangam — React frontend prototype

SkillSangam is a concept for an AI-assisted marketplace connecting students with startups through short, paid, clearly scoped micro-internships. The frontend demonstrates the end-to-end experience for students, startups and platform administrators.

## What is included

### Public introduction page (opens first)
- Product motive, problem statement and target users
- How the two-week micro-internship flow works
- Feature overview and trust & safety principles
- Frequently asked questions
- Role selector to enter the demo as a student, startup or administrator

### Student workspace
- Browse, search, filter, sort and bookmark tasks
- Review compensation, deliverables and milestone plans
- Apply and track application status
- Profile editor with optional GitHub-consent controls
- Skills Lab quiz with scoring and explanations
- Project workroom and milestone submission UI
- Messages, proof-of-work portfolio placeholder and Trust Centre

### Startup workspace
- Create task listings with compensation, skills and deliverables
- View sample candidate recommendations and shortlist candidates
- Manage task listings, applications, workrooms and messages

### Administrator workspace
- Task moderation UI
- Sample analytics and audit views
- Dispute queue and Trust Centre

### Additional product features
- Report a concern flow for suspicious listings, unclear compensation, scope changes and disputes
- Human-review safeguards and explainable AI messaging
- Responsive layouts for desktop and mobile
- Demo data persistence in a namespaced LocalStorage area

## Run locally

Requirements: Node.js 18 or later and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

## Demo notes and limitations

- This project intentionally starts with a generic, empty student profile and an empty proof-of-work portfolio. It does not include any real person's name, institution, location, GitHub account, resume, projects or portfolio details.
- Sample companies, task listings, candidate profiles, conversations and admin metrics are fictional demonstration data.
- LocalStorage is used only to demonstrate persistence in the browser.
- Authentication, MongoDB, real-time messaging, GitHub OAuth, AI ranking, email notifications, payment processing, employer verification and moderation APIs are not connected.
- Match scores and analytics are illustrative only. AI should assist rather than make hiring or review decisions.
- The report workflow is a local UI demonstration; production requires a secure API, moderation queue, audit trail and notification process.

## Suggested backend integration

A production implementation can connect this frontend to a Node.js + Express REST API, MongoDB, JWT/session authentication, consent-based GitHub integration, an explainable matching service, Socket.IO messaging, and a compliant payment provider.
