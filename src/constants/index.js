// src/constants/index.js — All portfolio data from 2026 resume

export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "skills", title: "Skills" },
  { id: "services", title: "Services" },
  { id: "contact", title: "Contact" },
];

export const personalInfo = {
  name: "Bhavesh Chauhan",
  title: "Senior Software Engineer",
  subtitle: "Backend & Distributed Systems",
  tagline: "Building cloud-native microservices, event-driven systems & AI-powered platforms",
  email: "chouhanbhavesh9@gmail.com",
  location: "India · Remote-Ready",
  resumeUrl: "/Bhavesh_Chauhan_Resume_2026.pdf",
  yearsOfExperience: "4+",
  companiesWorked: "4",
  usersServed: "3,000+",
  teamSize: "4",
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/bhavesh029", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/bhavesh029", icon: "linkedin" },
  { name: "Email", url: "mailto:chouhanbhavesh9@gmail.com", icon: "email" },
];

export const experiences = [
  {
    id: 1,
    role: "Senior Software Engineer",
    company: "HabileLabs",
    location: "Jaipur, India",
    date: "January 2026 – Present",
    type: "Full-time",
    description: "Healthcare domain · Leading a team of 4 engineers",
    bullets: [
      "Identified and resolved a critical security vulnerability on day 2 — without any KT — by independently tracing the root cause and delivering a fix within the same day.",
      "Lead a team of 4 engineers — onboarding new joiners, unblocking juniors, conducting code reviews, and driving technical decisions for a US healthcare client.",
      "Delivered 50 caregiver and client operational reports across frontend and backend within 18 days — shipped end-to-end with no prior codebase context.",
      "Streamlined Git workflow with pre-push hooks enforcing TypeScript checks, ESLint, and build validation — eliminating recurring PR rejections.",
      "Took full codebase ownership after the US team transitioned off — resolved critical legacy bugs and established development standards.",
    ],
    tech: ["Node.js", "Next.js", "PostgreSQL", "Payload CMS", "Devbox"],
  },
  {
    id: 2,
    role: "Freelance Software Engineer",
    company: "Independent Contract",
    location: "Remote",
    date: "April 2025 – December 2025",
    type: "Contract",
    description: "Internal tooling · Full-stack delivery",
    bullets: [
      "Built an internal operations tool for a manufacturing client — React + Node.js dashboard for inventory tracking, RBAC, and automated reporting.",
      "Implemented role-based access control with scoped views for factory staff, supervisors, and admins.",
      "Designed automated report generation reducing manual tracking effort with real-time visibility into stock levels.",
      "Handled full delivery independently — from requirements gathering to deployment on Vercel with Supabase-backed PostgreSQL.",
    ],
    tech: ["React", "Node.js", "NestJS", "PostgreSQL", "Supabase", "Vercel"],
  },
  {
    id: 3,
    role: "Backend Engineer II",
    company: "Newton Classroom",
    location: "Hyderabad, India",
    date: "November 2023 – April 2025",
    type: "Full-time",
    description: "EdTech SaaS · Core platform engineering",
    bullets: [
      "Engineered the full Transport System — student application workflow, real-time vehicle/route tracking, bus capacity management — serving 3,000+ students.",
      "Reduced compute costs by 25% by leveraging AWS Lambda for scheduled background tasks.",
      "Accelerated financial report generation by 23% by eliminating performance-intensive lateral joins.",
      "Built a generalized report utility using Excel.js that reduced per-report boilerplate and cut generation time by 20%.",
    ],
    tech: ["Node.js", "AWS Lambda", "PostgreSQL", "Excel.js"],
  },
  {
    id: 4,
    role: "Software Engineer",
    company: "Trigsy Technologies",
    location: "Bangalore, India",
    date: "June 2022 – November 2023",
    type: "Full-time",
    description: "Location-based platform · Performance optimization",
    bullets: [
      "Designed and optimized a location-based search API using PostgreSQL PostGIS with advanced indexing — improving query performance by 35%.",
      "Implemented secure phone-based authentication and two-way number masking for user privacy.",
      "Automated CI/CD pipelines with GitHub Actions for pre-deployment quality checks.",
    ],
    tech: ["Node.js", "PostgreSQL", "PostGIS", "GitHub Actions"],
  },
];

export const education = {
  degree: "B.Tech in Information Technology",
  university: "Bikaner Technical University",
  period: "2018 – 2022",
  achievement: "Secured 3rd place (out of 47 teams) in College Hackathon — awarded a one-year Red Hat subscription.",
};

export const projects = [
  {
    id: 1,
    title: "Akira",
    subtitle: "Intelligent Financial Operations Platform",
    category: "AI · SaaS",
    status: "In Progress",
    description: "AI-powered B2C SaaS that automatically extracts structured transaction data from bank statements using Google Gemini 2.5 Flash and Vision multimodal. Features a full AI analytics dashboard with cashflow trends, expense categories, subscription detection, and anomaly alerts.",
    highlights: [
      "Unified PostgreSQL + pgvector database for relational data and 768-dimensional AI embeddings",
      "DPDP compliance with CASCADE deletes for Right to Erasure",
      "Production-grade CI/CD, structured logging, and full API documentation",
    ],
    tech: ["NestJS", "React 19", "Supabase", "pgvector", "Gemini 2.5"],
    link: "https://github.com/bhavesh029",
    color: "amber",
  },
  {
    id: 2,
    title: "Student Transport System",
    subtitle: "Newton Classroom — EdTech Platform",
    category: "Full Stack",
    status: "Deployed",
    description: "End-to-end transport tracking system serving 3,000+ students. Features real-time vehicle/route tracking, automated capacity management, bulk data imports, and saved 15+ admin hours weekly.",
    highlights: [
      "25% compute cost reduction via AWS Lambda",
      "23% faster financial report generation",
      "Generalized report utility cutting generation time by 20%",
    ],
    tech: ["React", "Node.js", "AWS Lambda", "PostgreSQL"],
    link: "https://github.com/bhavesh029",
    color: "blue",
  },
  {
    id: 3,
    title: "AI-Powered Spam Detection",
    subtitle: "Truecaller-Style Backend",
    category: "AI · Cloud",
    status: "Completed",
    description: "Secure phone directory system integrating AI-based classification for real-time spam detection. Built on cloud-native architecture with phone-based auth and privacy-preserving number masking.",
    highlights: [
      "Real-time AI classification engine",
      "Two-way number masking for user privacy",
      "35% improvement in query performance with PostGIS",
    ],
    tech: ["Node.js", "AI Integration", "Redis", "AWS", "PostgreSQL"],
    link: "https://github.com/bhavesh029/Truecaller-backend",
    color: "purple",
  },
];

export const skillCategories = [
  {
    title: "Languages & Frameworks",
    icon: "code",
    skills: ["TypeScript", "JavaScript", "Java", "Node.js", "Express.js", "NestJS", "React", "Next.js"],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    skills: ["AWS Lambda", "EC2", "S3", "RDS", "SNS/SES/SQS", "Kafka", "Docker", "GitHub Actions", "Vercel", "Supabase"],
  },
  {
    title: "Databases & Caching",
    icon: "database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "pgvector", "TypeORM", "Sequelize"],
  },
  {
    title: "AI & Integrations",
    icon: "cpu",
    skills: ["Google Gemini 2.5", "RAG / pgvector", "PDF Extraction", "LLM Integrations"],
  },
  {
    title: "System Design",
    icon: "architecture",
    skills: ["Microservices", "Event-Driven", "Distributed Systems", "Caching Strategies", "REST APIs", "JWT/OAuth2"],
  },
  {
    title: "Testing & Tools",
    icon: "tools",
    skills: ["Jest", "Mocha", "Postman", "Git", "Payload CMS", "Devbox"],
  },
];

export const services = [
  {
    id: "backend",
    title: "Backend & Cloud Architecture",
    description: "Scalable architectures using Node.js, NestJS, and Microservices. I optimize AWS infrastructure — Lambda, Docker, Kafka — to reduce costs and boost performance.",
    icon: "server",
    tags: ["API Optimization", "Database Tuning", "AWS Cost Reduction", "Microservices"],
  },
  {
    id: "fullstack",
    title: "Full-Stack Development",
    description: "End-to-end application delivery from React frontends to Node.js backends. Figma-to-code, role-based dashboards, and production deployment.",
    icon: "code",
    tags: ["React / Next.js", "Responsive UI", "RBAC", "Supabase / Vercel"],
  },
  {
    id: "ai",
    title: "AI Integration & Automation",
    description: "Integrating AI models directly into your codebase — document extraction with Gemini Vision, RAG pipelines, spam detection, and automated workflows.",
    icon: "cpu",
    tags: ["Gemini 2.5", "RAG Pipelines", "PDF Extraction", "LLM Integration"],
  },
];