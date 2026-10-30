# Bhavesh Chauhan — Professional Portfolio

Personal portfolio site for **Bhavesh Chauhan, Senior Software Engineer (Backend & Distributed Systems)**, live at **https://bhaveshchauhan.me**.

It is a single-page React app with a 3D hero (Three.js via React Three Fiber), GSAP scroll animations, a dark "space + glass" visual theme, and a working contact form (EmailJS). Its job is to present Bhavesh's experience, projects, skills and freelance services, and to turn visitors into leads (contact form, resume download).

> **Working on this repo with an AI agent?** Read [`CLAUDE.md`](./CLAUDE.md) first, then the files in [`docs/`](./docs).

---

## Tech stack

| Concern | Library |
|---|---|
| UI framework | React 19 (JavaScript/JSX, no TypeScript) |
| Build tool / dev server | Vite 7 |
| Styling | Tailwind CSS 3 + custom component classes in `src/index.css` |
| 3D | `three`, `@react-three/fiber` 9, `@react-three/drei` 10 |
| Animation | GSAP 3 + `ScrollTrigger` (Framer Motion is installed but **unused**) |
| Contact form | `@emailjs/browser` (sends email straight from the browser, no backend) |
| Analytics | `react-ga4` (Google Analytics 4) |
| SEO head tags | `react-helmet-async` + static meta in `index.html` |
| Hosting | GitHub Pages, custom domain via `public/CNAME` |

## Page sections (top to bottom)

1. **Navbar**: fixed top bar, anchor links, resume button, full-screen mobile menu
2. **Hero** (`#home`): 3D wireframe icosahedron + particle field, name, tagline, CTAs, headline stats
3. **About** (`#about`): photo, "Open to Work" card, bio, 4 impact stats
4. **Experience** (`#experience`): animated vertical timeline of jobs + education
5. **Projects** (`#projects`): 3 project cards with mouse-tilt effect
6. **Skills** (`#skills`): 6 categories of skill "orbs"
7. **Services** (`#services`): 3 freelance service offerings
8. **Contact** (`#contact`): EmailJS form + social links + resume download
9. **Footer**: copyright, social links, back-to-top

Almost all text content lives in **`src/constants/index.js`**. Edit that file to update experience, projects, skills, services, links or personal info.

## Getting started

Requirements: Node **20.19+** (Vite 7 requirement; CI uses Node 20).

```bash
npm install --legacy-peer-deps   # same flag CI uses
cp .env.example .env              # then fill in values (see below)
npm run dev                       # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint (flat config, `eslint.config.js`) |

There is no test suite.

## Environment variables

All are read at **build time** through `import.meta.env` and end up in the public JS bundle (none of them are secret by design).

| Variable | Used in | Purpose |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | `Contact.jsx` | EmailJS service |
| `VITE_EMAILJS_TEMPLATE_ID` | `Contact.jsx` | Template for the inquiry email sent to Bhavesh |
| `VITE_EMAILJS_PUBLIC_KEY` | `Contact.jsx` | EmailJS public key |
| `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` | `Contact.jsx` | Optional auto-reply to the visitor |
| `VITE_GOOGLE_ANALYTICS_ID` | `App.jsx` | GA4 measurement ID; GA is skipped if unset |

Locally they come from `.env` (gitignored). In CI they come from **GitHub repository secrets** with the same names.

## Deployment

`.github/workflows/deploy.yml` runs on every push to **`main`**: `npm install --legacy-peer-deps` → `npm run build` (with secrets injected) → upload `dist/` → deploy to GitHub Pages. Anything in `public/` (resume PDF, favicon, social preview image, `CNAME`) is copied as-is to the site root.

Feature branches are **not** deployed. Merge to `main` to publish.

## Project structure

```
.
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD
├── docs/                          # Developer & agent documentation
├── public/                        # Static files served at site root
│   ├── Bhavesh_Chauhan_Resume_2026.pdf
│   ├── CNAME                      # bhaveshchauhan.me
│   ├── favicon.svg
│   └── social-preview.jpg         # og:image / twitter:image
├── src/
│   ├── main.jsx                   # React root, HelmetProvider, GSAP plugin registration
│   ├── App.jsx                    # Page composition, GA init, Helmet meta
│   ├── index.css                  # Tailwind layers + shared component classes
│   ├── constants/index.js         # ALL site content (single source of truth)
│   ├── assets/images/your-photo.jpg
│   └── components/
│       ├── Navbar.jsx  Hero.jsx  About.jsx  Experience.jsx  Projects.jsx
│       ├── Skills.jsx  Services.jsx  Contact.jsx  Footer.jsx
│       ├── canvas/                # React Three Fiber scene for the hero
│       │   ├── HeroCanvas.jsx  FloatingShape.jsx  ParticleField.jsx
│       └── ui/                    # Reusable UI pieces
│           ├── GlassCard.jsx  Toast.jsx  AnimatedText.jsx*  SectionWrapper.jsx*
├── index.html                     # Static SEO/OG meta, fonts, favicon
├── tailwind.config.js             # Design tokens (colors, fonts, shadows, animations)
├── vite.config.js                 # manualChunks vendor splitting
└── eslint.config.js
```
`*` = present but currently unused.

## Documentation

| File | Contents |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | Rules and orientation for AI agents (start here) |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | How the app is put together: rendering, animation, 3D, styling, data flow |
| [`docs/CONTENT_AND_SECTIONS.md`](./docs/CONTENT_AND_SECTIONS.md) | How to edit content and add a new section, step by step |
| [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) | Colors, fonts, reusable CSS classes, visual conventions |
| [`docs/KNOWN_ISSUES.md`](./docs/KNOWN_ISSUES.md) | Current bugs and missing capabilities, prioritized |
| [`docs/CHANGELOG.md`](./docs/CHANGELOG.md) | Notable changes, newest first |
