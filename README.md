# 🎓 SkillSangam — Turn Skills into Real-World Experience

<p align="center">
  <strong>Bridging the gap between student talent and startup opportunities through short, structured, skill-based micro-internships.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Status-Frontend%20Prototype-orange" alt="Project Status" />
  <img src="https://img.shields.io/badge/Responsive-Yes-brightgreen" alt="Responsive" />
</p>

---

## 📌 Overview

**SkillSangam** is a skill-based micro-internship platform designed to connect students and emerging developers with startups that need practical, project-oriented support.

Traditional internships can require long commitments, extensive experience, and lengthy recruitment processes. At the same time, students often struggle to find opportunities where they can demonstrate their abilities through real work.

SkillSangam addresses this gap by introducing short-duration, clearly defined micro-internships with specific deliverables, milestones, compensation information, and transparent progress tracking.

The platform brings students, startups, and administrators together in one structured ecosystem.

### 🎯 Our Vision

To make practical experience more accessible by allowing students to demonstrate their skills, work on meaningful projects, receive feedback, and build credible portfolios while helping startups discover emerging talent.

---

## 🚀 Key Features

### 👨‍🎓 1. Student Workspace

A dedicated workspace that helps students discover opportunities and manage their professional growth.

- **Opportunity Discovery:** Browse available micro-internships and explore different domains.
- **Advanced Filtering:** Search and filter opportunities based on skills, compensation, and other criteria.
- **Opportunity Details:** Review task descriptions, expected deliverables, and milestone plans.
- **Bookmarking:** Save interesting opportunities for later.
- **Application Tracking:** Apply for opportunities and monitor application status.
- **Student Profile:** Maintain a professional profile with relevant information and skills.
- **Skills Lab:** Attempt skill-based quizzes, receive scores, and review explanations.
- **Project Workroom:** Access the project workspace and milestone submission interface.
- **Messaging Interface:** Explore communication workflows between students and startups.
- **Trust Centre:** Access trust-related information and platform safeguards.

### 🏢 2. Startup Workspace

A workspace designed to help startups publish tasks and discover suitable student talent.

- **Create Opportunities:** Publish structured micro-internship listings.
- **Define Deliverables:** Specify expected outcomes and project requirements.
- **Set Compensation:** Display compensation details transparently.
- **Skill Requirements:** Identify the technical and professional skills required.
- **Candidate Discovery:** Explore sample candidate recommendations.
- **Shortlisting Interface:** Review and shortlist potential candidates.
- **Application Management:** View and manage incoming applications.
- **Workroom Management:** Track project workspaces and milestones.
- **Communication:** Access the messaging interface.

### 🛡️ 3. Administrator Workspace

A centralized administrative interface for platform oversight.

- Review and moderate task listings.
- Explore platform analytics and sample performance metrics.
- Access audit-related views.
- Review reported concerns and dispute workflows.
- Monitor trust and safety-related interfaces.

### 🤖 4. AI-Assisted Matching Concept

SkillSangam is designed around intelligent talent discovery.

The proposed matching experience can consider:

- Student skills and technical capabilities.
- Startup requirements.
- Project complexity and expected deliverables.
- Learning goals and areas of interest.
- Relevant experience and portfolio evidence.

The current candidate recommendation and match-score interfaces use demonstration data. A production AI matching service is not yet connected.

### 🏆 5. Trust, Safety and Transparency

Trust is essential when students and startups collaborate remotely.

The frontend includes interfaces and workflows for:

- Reporting suspicious or misleading listings.
- Flagging unclear compensation details.
- Reporting unexpected project scope changes.
- Raising project disputes.
- Reviewing trust-related information.
- Supporting human review instead of relying entirely on automated decisions.

---

## 🔄 How SkillSangam Works

The platform is designed around a structured micro-internship lifecycle.

```text
       STUDENT                         STARTUP
          |                               |
          |                         Create Opportunity
          |                               |
          |                               |
     Create Profile                 Define Requirements
          |                               |
          |                               |
          +---------- Discover -----------+
                         |
                         |
                  Apply for Task
                         |
                         |
                  Application Review
                         |
                         |
                    Shortlisting
                         |
                         |
                  Project Workroom
                         |
                         |
                  Milestone Submission
                         |
                         |
                   Review & Feedback
                         |
                         |
                Portfolio Development
```

The goal is to make every opportunity transparent, structured, and focused on demonstrable outcomes.

---

## 🧰 Technology Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 |
| Build Tool | Vite 6 |
| Programming Language | JavaScript (ES Modules) |
| UI Icons | Lucide React |
| Styling | CSS |
| Browser Persistence | LocalStorage |
| Package Manager | npm |

### Current Project Dependencies

- `react`
- `react-dom`
- `vite`
- `@vitejs/plugin-react`
- `lucide-react`

---

## ⚙️ Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js 18 or later
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/GoldRay19/Skill-Sangam.git
```

### 2. Navigate to the Project

```bash
cd Skill-Sangam
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal by Vite.

### 5. Create a Production Build

```bash
npm run build
```

### 6. Preview the Production Build

```bash
npm run preview
```

---

## 🧪 Current Implementation Status

SkillSangam currently provides a frontend prototype with interactive product workflows and demonstration data.

| Module | Current Status |
|---|---|
| Public landing page | Frontend implemented |
| Student workspace | Frontend implemented |
| Startup workspace | Frontend implemented |
| Administrator workspace | Frontend implemented |
| Opportunity discovery | Frontend implemented |
| Application workflows | Frontend demonstration |
| Skills Lab | Frontend demonstration |
| Project workroom | Frontend demonstration |
| Candidate recommendations | Sample data |
| Trust and reporting interfaces | Frontend demonstration |
| Local browser persistence | Implemented using LocalStorage |
| Backend APIs | Not connected |
| Database integration | Not connected |
| Real authentication | Not connected |
| AI-powered matching service | Not connected |
| Real-time messaging | Not connected |
| Payment processing | Not connected |

**Important:** The current version is a frontend prototype. Sample companies, student profiles, applications, messages, analytics, and recommendations are demonstration data, not verified real-world records.

---

## 🔮 Future Roadmap

The following improvements can help evolve SkillSangam into a production-ready platform.

### Backend and Infrastructure
- Develop a Node.js and Express backend.
- Integrate MongoDB for persistent data storage.
- Implement secure authentication and role-based authorization.
- Build REST APIs for students, startups, applications, and projects.

### AI and Intelligent Features
- Develop explainable AI-based student-opportunity matching.
- Introduce skill-gap analysis and personalized learning recommendations.
- Build portfolio-based candidate evaluation.
- Add AI-assisted project requirement generation.
- Introduce intelligent application screening with human oversight.

### Collaboration and Productivity
- Enable real-time messaging using Socket.IO.
- Implement milestone submission and review APIs.
- Introduce project activity notifications.
- Support file attachments and proof-of-work verification.

### Trust and Payments
- Introduce startup and employer verification.
- Implement secure payment and compensation workflows.
- Build dispute resolution and moderation services.
- Maintain auditable project and payment histories.

These are proposed development directions, not claims about existing functionality.

---

## 🔐 Privacy and Security

SkillSangam is designed with transparency and responsible platform usage in mind.

- Avoid collecting unnecessary personal information.
- Obtain explicit consent before connecting external accounts.
- Protect student and startup information through appropriate access controls.
- Keep payment and verification workflows auditable.
- Provide reporting and human-review mechanisms.
- Never expose API keys, credentials, or private configuration files in public commits.

The current prototype does not provide production-grade authentication or server-side security.

---

## 🤝 Contributing

Contributions are welcome!

Whether you are a frontend developer, backend developer, AI/ML enthusiast, UI/UX designer, or student contributor, you can help improve SkillSangam.

### Contribution Workflow

1. Fork this repository.
2. Create a feature branch.
3. Implement your changes.
4. Test the application locally.
5. Commit your changes with a meaningful message.
6. Push your branch.
7. Open a Pull Request with a clear description of your contribution.

Example:

```bash
git checkout -b feature/your-feature-name

git add .

git commit -m "Add: describe your feature"

git push origin feature/your-feature-name
```

Please keep pull requests focused, explain the problem being solved, and include screenshots when UI changes are involved.

---

## 🌍 Who Can Benefit?

| Audience | Benefits |
|---|---|
| Students | Practical experience and portfolio development |
| Startups | Access to emerging talent |
| Developers | Opportunities to demonstrate technical skills |
| Freshers | Exposure to real project workflows |
| Educational Communities | Stronger industry collaboration |

---

## 📈 Expected Impact

SkillSangam aims to create a more accessible and transparent skill-development ecosystem.

- Reduce the gap between theoretical learning and practical experience.
- Help students build portfolios through real project work.
- Enable startups to discover emerging talent.
- Encourage outcome-based learning.
- Promote transparent compensation and deliverables.
- Create opportunities for continuous professional growth.

---

## 📄 License

A license should be selected and added to the repository before distributing the project under specific open-source terms.

---

## ⭐ Support the Project

If you find SkillSangam interesting, consider giving the repository a star!

Your support helps increase visibility and encourages further development.

**Repository:**  
https://github.com/GoldRay19/Skill-Sangam

---

<p align="center">
  <strong>SkillSangam — Where Skills Meet Opportunities.</strong>
  <br />
  <em>Learn. Build. Collaborate. Grow.</em>
</p>
