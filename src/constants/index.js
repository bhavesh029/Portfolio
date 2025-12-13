// src/constants/index.js

export const navLinks = [
  { id: "services", title: "Services" },
  { id: "case-studies", title: "Case Studies" },
  { id: "tech-stack", title: "Tech Stack" },
  { id: "about", title: "About" },
];

export const services = [
  {
    id: "backend",
    title: "Backend & Cloud Architecture",
    description: "Scalable architectures using Node.js, NestJS, and Microservices. I optimize AWS infrastructure (Lambda, Docker) to reduce costs.",
    icon: "server", 
    tags: ["API Optimization", "Database Tuning", "AWS Cost Reduction"],
  },
  {
    id: "frontend",
    title: "Frontend & Full Stack",
    description: "Converting Figma designs into pixel-perfect, fully responsive applications using React, Redux, and Tailwind CSS.",
    icon: "code", 
    tags: ["Figma to Code", "Responsive UI", "State Management"],
  },
  {
    id: "ai",
    title: "AI Integration & Automation",
    description: "Integrating AI models directly into your codebase for features like spam detection, smart classification, and automated workflows.",
    icon: "cpu", 
    tags: ["AI Models", "Automation", "Spam Detection"],
  },
];

export const caseStudies = [
  {
    id: 1,
    title: "AI-Powered Spam Detection",
    category: "AI & Cloud",
    date: "Nov 2024",
    description: "Designed a secure phone directory system integrating AI-based classification for real-time spam detection. Built on a cloud-native architecture using AWS services.",
    tech: ["Node.js", "AI Integration", "Redis", "AWS"],
    link: "https://github.com/bhavesh029/Truecaller-backend",
    result: "Real-time AI Classification",
    color: "purple",
  },
  {
    id: 2,
    title: "Legacy Monolith Refactoring",
    category: "Microservices",
    date: "Apr 2025",
    description: "Decoupled a complex Order Management System from WooCommerce/Zoho into independent microservices. Resulted in a 28% improvement in query speed.",
    tech: ["NestJS", "Docker", "Microservices"],
    link: "https://github.com/bhavesh029",
    result: "28% Performance Boost",
    color: "blue",
  },
  {
    id: 3,
    title: "Student Transport Automation",
    category: "Full Stack System",
    date: "Nov 2023 - Present",
    description: "End-to-end transport tracking system serving 3000+ students. Features real-time tracking, automated capacity management, and bulk data imports.",
    tech: ["React", "Node.js", "AWS Lambda"],
    link: "https://github.com/bhavesh029",
    result: "15+ Admin Hours Saved",
    color: "green",
  },
];

export const techStack = [
  { name: "Node.js", role: "Runtime" },
  { name: "NestJS", role: "Framework" },
  { name: "TypeScript", role: "Language" },
  { name: "React", role: "Frontend" },
  { name: "Redux", role: "State" },
  { name: "Tailwind", role: "Styling" },
  { name: "Docker", role: "DevOps" },
  { name: "Jenkins", role: "CI/CD" },
  { name: "AWS", role: "Cloud" },
  { name: "PostgreSQL", role: "Database" },
  { name: "Redis", role: "Caching" },
  { name: "AI Tools", role: "Automation" },
];