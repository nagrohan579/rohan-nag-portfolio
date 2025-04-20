**Product Requirements Document (PRD) – Rohan Nag’s Professional Portfolio Website**

---

## Overview
This document outlines the requirements, features, and technical specifications for the development of **Rohan Nag’s Professional Portfolio Website**. The website will present Rohan’s professional profile, skills, projects, and blog posts with a clean, modern, and interactive UI.

---

## Goals
| Goal | Description |
|------|-------------|
| Professional Showcase | Present Rohan's career, education, projects, and skills effectively. |
| Blogging | Provide a section for blog posts, including initial demo content. |
| Modern UI | Implement a responsive, animated, and visually engaging UI. |
| Deployment | Host on a reliable platform with good performance and accessibility. |

---

## Target Audience
| Audience | Description |
|----------|-------------|
| Recruiters | To evaluate Rohan's skills, projects, and professional background. |
| Tech Enthusiasts | To follow Rohan’s projects and blog content. |
| Potential Employers | For hiring and collaboration purposes. |

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React with TypeScript |
| Styling | Tailwind CSS, ShadCN UI Components |
| Animations | Framer Motion |
| Hosting | Firebase Hosting |
| Version Control | Git and GitHub |

---

## Site Structure & Layout

### Home Page
| Feature | Description |
|--------|-------------|
| Hero Section | Animated introduction with name, title, and call-to-action buttons. |
| Brief Summary | One-liner professional summary with profile image. |

### About Me
| Feature | Description |
|--------|-------------|
| Biography | Description derived from resume. |
| Skills | Tech stack represented via icons, progress bars or animated charts. |
| Aspirations | Career goals and focus areas. |

### Experience
| Company | Calsoft |
| Role | DevOps Intern |
| Location | Kolkata |
| Display Style | Vertical timeline format with key responsibilities. |

### Education
| Institution | Qualification | Year | Result |
|-------------|---------------|------|--------|
| Asansol Engineering College | B.Tech CSE | 2025 | CGPA 8.765 |
| St. Patrick's H.S. School | 12th | 2021 | 90.4% |
| St. Vincent's High & Technical School | 10th | 2019 | 89% |

### Projects
Each project will include:
- Title
- Technologies Used
- Summary
- Visual (GIF/Screenshot)

| Project | Tech Stack |
|---------|------------|
| Final Year Project (SDM-EONs) | Python, Shell Scripting |
| Bank Management System | Java, Swing, MySQL, JDBC |
| Snake Game | Java, Swing |
| Kids’ Drawing App | Kotlin, Android Studio, XML |

### Certifications & Achievements
| Title | Description |
|-------|-------------|
| TechNova Winner | First place in technical paper presentation. |
| NPTEL Certifications | Top 1% in DSA & Java; Top 5% in DBMS. |
| Coursera | Python + OS interaction course (Google). |
| AWS | Cloud Practitioner Badge (AWS Cloud Foundations). |

### Blog Section
| Feature | Description |
|--------|-------------|
| Demo Blogs | Initially populate section with demo content. |
| UI | Title, date, preview with navigation. |
| Features | Pagination/lazy loading. Future integration with CMS optional. |

### Contact & Footer
| Method | Details |
|--------|---------|
| Email | rohan.nag.india@gmail.com |
| Phone | +91 6296495546 |
| GitHub | github.com/[your-username] |
| LinkedIn | linkedin.com/in/[your-profile] |
| Form | Optional contact form or mailto link |

---

## Feature Highlights
| Feature | Description |
|---------|-------------|
| Responsive Design | Fully mobile-compatible UI with optimized layout for both PC and mobile devices. |
| Theme Toggle | Light/Dark mode switching. |
| Animations | Section transitions, scroll reveal, interactive elements via Framer Motion. |
| UI Components | Modern layouts with ShadCN elements (cards, tabs, buttons). |

---

## SEO & Performance
| Area | Implementation |
|------|----------------|
| SEO | Metadata, title tags, OpenGraph support |
| Image Optimization | Use of WebP/AVIF formats |
| Performance | Lazy loading components and code splitting |

---

## Deployment Strategy
| Area | Details |
|------|---------|
| Hosting Platform | Firebase Hosting |
| Deployment | Via Firebase CLI tools |
| CI/CD | Optional GitHub Actions for automated deployment |

---

## Suggested Folder Structure
```bash
src/
├── assets/
├── components/
├── pages/
├── data/
├── blog/
├── styles/
├── utils/
└── App.tsx
```

---

## Milestones
| Stage | Deliverable |
|-------|-------------|
| Phase 1 | Firebase setup & domain integration |
| Phase 2 | Base layout, routing, and ShadCN component integration |
| Phase 3 | Section development: Home → Blog |
| Phase 4 | Blog mock data integration (static JSON/TS files) |
| Phase 5 | Final polish: animations, accessibility, responsiveness |
| Phase 6 | Production deployment on Firebase |

---

## Contact
| Field | Value |
|-------|-------|
| Name | Rohan Nag |
| Email | rohan.nag.india@gmail.com |
| Phone | +91 6296495546 |
| Location | Asansol, West Bengal |
| GitHub | github.com/[your-username] |
| LinkedIn | linkedin.com/in/[your-profile] |

