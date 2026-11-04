# Changelog

Notable, user-visible or structural changes. Newest first. Agents: add an entry for every change you make (date, short summary, files/areas touched).

## 2026-10-30: Installable PWA + mobile polish (branch `feature/pwa`)
- Site is now an installable Progressive Web App (`vite-plugin-pwa`): generated manifest with 192/512/maskable icons and "Hire me"/"Resume" shortcuts, and a Workbox service worker that precaches the whole site (incl. 3D hero and resume) for offline use, with auto-update.
- Install UI via `src/hooks/useInstallPrompt.js`: "Install app" button in the desktop navbar, an install icon and button on mobile (Chrome/Edge/Android), and an iOS "Add to Home Screen" hint in the mobile menu. GA4 events `pwa_install_prompt`, `pwa_installed`.
- iOS standalone meta tags, `viewport-fit=cover`, safe-area padding for navbar, menu, toast, footer and body sides.
- Mobile pass at 390 px: no horizontal overflow, tap targets ≥ 44 px (contact/footer/project/nav links), form fields 16 px, hero uses `min-h-svh`, mobile menu fits short phones, full-width toast on phones.
- Contact form shows an "offline, email me" message when there's no connection.
- Removed `public/site.webmanifest` (manifest is generated now). Icon sources: `scripts/app-icon.html`, `scripts/render-app-icons.sh`.

## 2026-10-30: Bug fixes + freelance visibility (branch `fix/bugs-and-seo`)
**Bugs fixed**
- Mobile menu no longer clipped to the navbar after scrolling (overlay moved outside the blurred `<nav>`). Added Escape-to-close, scroll lock, `inert` when closed, and a skip-to-content link.
- Navbar highlights the current section on scroll (IntersectionObserver scroll-spy).
- Experience timeline dots aligned with the line on all widths (invalid `md:left-6.5` → arbitrary values). All experience bullets shown.
- Contact form shows success when the inquiry is sent even if the auto-reply fails. Added honeypot, missing-config handling, length limits and autocomplete.
- Projects: placeholder GitHub links replaced with "Private codebase · details on request". Fixed misattributed PostGIS metric.
- Single `<h1>` in the hero. GlassCard tilt no longer re-renders on every mouse move and keeps its hover lift. ParticleField positions memoized.
- Removed unused `AnimatedText`, `SectionWrapper`, duplicate root resume PDF, and unused deps (`@react-three/drei`, `framer-motion`, `@gsap/react`, `react-helmet-async`).

**Performance**
- 3D hero lazy-loaded: initial JS went from ~1.27 MB to ~370 kB (~126 kB gzip). The canvas pauses when off-screen and stays static for `prefers-reduced-motion`.

**Visibility / SEO**
- Freelance-focused title, description and keywords. Canonical, robots, theme-color, full Open Graph and Twitter tags.
- New `vite-plugins/seo.js` generates JSON-LD (Person, ProfessionalService with offered services, WebSite, ProfilePage), a `<noscript>` text copy of the site, `sitemap.xml` and `llms.txt` from `src/constants/index.js`.
- `robots.txt`, `site.webmanifest`, `apple-touch-icon.png`. New 1200×630 social preview card (`scripts/social-card.html`, `scripts/render-social-card.sh`).
- "Available for freelance & contract work" badge in the hero. Freelance-oriented About/Contact copy.
- GA4 events: `generate_lead`, `resume_download`, `outbound_click` (`src/utils/analytics.js`).

**CI**
- Workflow runs lint + build on PRs to `main` and uses `npm ci`. Deploy still only on push to `main`.

## 2026-10-30: Documentation
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
