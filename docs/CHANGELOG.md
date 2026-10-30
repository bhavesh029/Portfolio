# Changelog

Notable, user-visible or structural changes. Newest first. Agents: add an entry for every change you make (date, short summary, files/areas touched).

## 2026-10-30
- Added project documentation: rewrote `README.md`; added `CLAUDE.md`, `.env.example`, and `docs/` (`ARCHITECTURE`, `CONTENT_AND_SECTIONS`, `DESIGN_SYSTEM`, `KNOWN_ISSUES`, `CHANGELOG`).

## 2026-03-29: 3D redesign (`afaa046`, branch `feature/redesigned-3d-web`)
- Rebuilt the site with a React Three Fiber hero (wireframe icosahedron + particles), GSAP ScrollTrigger reveals, and the "space + glass" Tailwind theme.
- Content updated from the 2026 resume (HabileLabs Senior SWE role, Akira project, new resume PDF).
- Added Experience (timeline), Projects and Skills sections; removed the old `CaseStudies` and `TechStack` sections; reworked Hero, About, Services, Contact, Navbar, Footer.
- Added `ui/` components (Toast, GlassCard tilt cards, AnimatedText, SectionWrapper), SVG favicon, Vite vendor chunk splitting.

## 2025-12-13 / 14
- Migrated from a static HTML/CSS site to React + Vite + Tailwind (`8fa38c5`). Contact form via EmailJS with optional auto-reply; GitHub Pages deploy workflow.
- Google Analytics 4 and SEO meta tags; `.env` removed from git; dependency/build fixes; social preview meta fixes.

## 2025-10-30 – 2025-11-02
- Initial static portfolio, custom domain (`CNAME` → bhaveshchauhan.me), profile picture and inquiry form fixes.
