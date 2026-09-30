# CareerSync — Student Career & Placement Portal

A modern, production-grade, centralized web application built for college students and Training & Placement Cells (TPO) to manage career profiles, skill portfolios, industrial certifications, projects, campus recruitment drives, aptitude practice, and structured preparation roadmaps.

---

## 🚀 Quick Start Instructions

To run this application locally:

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev
```

Then open your browser and navigate to: **`http://localhost:3000`** (or the port displayed in your terminal).

---

## 🔑 Demo Login Credentials

The application comes pre-loaded with comprehensive demo accounts and sample records stored in `localStorage`. You can also use the **1-Click Instant Demo Login** buttons on the login screen.

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Demo Student** | `alex@college.edu` | `password123` | Pre-populated with 8 skills, 3 projects, 3 certifications, test results & roadmap progress |
| **Demo Admin** | `admin@placement.edu` | `admin123` | Placement Dean account with access to student records, drives, question bank & broadcasts |

---

## 🎯 Main Features & Modules

### 1. 📊 Student Dashboard
- Real-time **Placement Readiness Index** meter (0–100%) with formula breakdown.
- Metric cards for Skills, Certifications, Projects, Internships, and Aptitude average score.
- Dynamic **Recommended Actions** checklist with quick links.
- Interactive **Recent Activity** log.
- Recommended campus hiring opportunities with instant bookmarking and application.

### 2. 👤 My Profile
- Academic and personal details (Full name, College, Branch, Year, Semester, CGPA, Location).
- Social links (LinkedIn, GitHub, Portfolio).
- Career objective, professional summary, and key honors/achievements list.
- Live Edit, Save, and Cancel support with instant synchronization to LocalStorage.

### 3. 💡 Skills Tracker
- Categorized across *Programming, Electronics, Web Development, Data Analytics, AI/ML, Communication, Aptitude, Other*.
- Proficiency tracking: *Beginner (33%), Intermediate (66%), Advanced (100%)*.
- Filter by category and real-time search.
- Full Add, Edit, and Delete modals.

### 4. 📜 Certifications & Credentials
- Add/Edit/Delete credentials with issuing organization, issue date, credential ID, and verification URLs.
- 1-Click Credential ID copy to clipboard.

### 5. 💻 Technical Projects Portfolio
- Document projects with tech stack tags, project classifications (Capstone, Hackathon, Personal), GitHub repository links, and live preview URLs.
- Highlight key metrics and impact points.

### 6. 💼 Campus Opportunities & Internships
- Over 9 realistic sample postings from **Google Cloud, Microsoft, Amazon AWS, Cisco, Razorpay, TCS Digital, Swiggy, Infosys, and Zomato**.
- Multi-criteria filtering by Type (*Full-time Job* vs *Internship*), Work Mode (*Remote, Hybrid, Onsite*), Bookmarks, and Applied status.
- Interactive **Apply Modal** for one-click campus application or external careers portal redirection.

### 7. 🧠 Timed Aptitude Practice & Assessment
- 20+ MCQs across **Quantitative Aptitude, Logical Reasoning, and Verbal Ability** with difficulty ratings and comprehensive step-by-step mathematical explanations.
- Timed test runner with question navigation palette (Answered, Unanswered, Current).
- Instant scorecard with correct/incorrect breakdown, accuracy %, and historical test tracking.

### 8. 🗺️ Placement Preparation Roadmap
- Structured 6-phase journey (*Phase 1: Aptitude & Reasoning, Phase 2: Technical CS, Phase 3: Coding & DSA, Phase 4: Communication, Phase 5: Resume & Portfolio, Phase 6: Mock Interviews*).
- Individual task status tracking (*Not Started, In Progress, Completed*) with phase-by-phase completion percentages.

### 9. 📈 Transparent Placement Readiness Formula
The readiness score is calculated as a transparent personal preparation progress indicator:
- **Profile Completion**: 10%
- **Skills**: 15%
- **Projects**: 15%
- **Certifications**: 10%
- **Internships**: 15%
- **Aptitude Performance**: 20%
- **Roadmap Progress**: 15%

### 10. 📄 ATS-Ready Resume Builder
- Auto-generates a clean 1-page professional resume from profile data, skills, projects, and certifications.
- Template switcher (*Modern Tech* / *Classic ATS*).
- **Print / Save as PDF** support using browser print stylesheet.

### 11. 🔔 Notifications & Broadcasts
- Categorized notifications for new drives, test completions, deadlines, and milestones.
- Mark as read, mark all read, and direct jump to opportunities.

### 12. ⚙️ Settings & Data Diagnostics
- Update LocalStorage password credentials.
- Export student profile snapshot as JSON.
- 1-Click Reset to default demo data.

### 13. 🛡️ Placement Admin Panel (`/admin`)
- **Admin Dashboard**: Real-time stats on registered students, active drives, question bank, and batch readiness averages.
- **Student Directory**: Inspect registered students, branch distribution, and CGPAs.
- **Placement Drives Management**: Create, edit, and delete job postings with broadcast triggers.
- **Question Bank Management**: Add/Edit/Delete MCQs with custom solutions and options.
- **Announcements**: Post campus-wide urgent notices and PPT schedules.

---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS**
- **React Router v6**
- **Lucide React** (Icons)
- **LocalStorage API** (Persistent State)
