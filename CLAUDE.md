# CLAUDE.md: Agent guide for this repository

You are working on **Bhavesh Chauhan's personal portfolio** (https://bhaveshchauhan.me), a single-page React 19 + Vite 7 site with a Three.js hero, GSAP scroll animations and Tailwind styling. It is a static site: there is no backend, no router, no database and no tests.

Read this file fully before making changes. For deeper context see:
- `README.md`: overview, setup, env vars, deployment
- `docs/ARCHITECTURE.md`: how rendering, animation, 3D, styling and data flow work
- `docs/CONTENT_AND_SECTIONS.md`: how to edit content and how to add a new section
- `docs/DESIGN_SYSTEM.md`: colors, fonts, reusable CSS classes
- `docs/KNOWN_ISSUES.md`: known bugs and gaps (check before "fixing" something, and update it)
- `docs/CHANGELOG.md`: history of notable changes

## Who this site is for

- **Owner:** Bhavesh Chauhan, Senior Software Engineer (backend, Node.js/NestJS, AWS, PostgreSQL, microservices, AI integrations). Currently at HabileLabs leading 4 engineers on a US healthcare client. Also solo-founding **Akira** (AI financial-ops SaaS).
- **Audience:** recruiters, hiring managers and potential freelance clients.
- **Goals:** show credibility (experience, metrics, projects), drive **contact form submissions** and **resume downloads**.
- **Tone of copy:** confident, outcome/metric-driven, concise. Keep claims consistent with the resume PDF in `public/`.

## Commands

```bash
npm ci --legacy-peer-deps        # same as CI (use `npm install --legacy-peer-deps <pkg>` to add deps)
npm run dev                       # localhost:5173
npm run lint                      # must pass before you finish
npm run build                     # must pass before you finish
bash scripts/render-social-card.sh   # regenerate public/social-preview.jpg after editing scripts/social-card.html
```

## Ground rules

1. **Content lives in `src/constants/index.js`.** Don't hardcode personal data, links or lists inside components. The build-time SEO plugin (`vite-plugins/seo.js`) also reads it to generate JSON-LD, the `<noscript>` copy, `sitemap.xml` and `llms.txt`. If you add a section with new content, add it to the plugin's noscript/llms output too, so crawlers see it.
2. **Follow the existing section pattern** exactly (see `docs/CONTENT_AND_SECTIONS.md`): `<section id=… className="relative py-20 md:py-28">` → `max-w-7xl mx-auto px-6 lg:px-8` → `section-subtitle` + `section-title` header → GSAP `gsap.context` + `ScrollTrigger` reveal in `useEffect`, cleaned up with `ctx.revert()`.
3. **Use the design tokens.** Colors `space-*`, `electric`, `amber`, `glass-*`; fonts `font-display` / `font-body` / `font-mono`; classes `glass-card`, `glow-card`, `btn-primary`, `btn-outline`, `form-input`, `skill-orb`, `text-gradient-*`. Don't introduce new color hexes or another UI/animation library.
4. **Only use Tailwind classes that exist.** The default spacing scale has no `6.5`, `7.5` etc. A non-existent class silently does nothing (this once broke the Experience timeline dots). Use arbitrary values like `left-[26px]` or extend `tailwind.config.js`.
5. **Plain JavaScript + JSX**, functional components, default exports, double quotes, 2-space indent. Inline SVG icons (no icon library). No TypeScript, no PropTypes.
6. **Animation = GSAP** (+ `ScrollTrigger`). No other animation library.
7. **3D code stays in `src/components/canvas/`**, is lazy-loaded from `Hero.jsx`, and must stay lightweight. Never add three/R3F to `manualChunks` (that forces it into the initial load).
8. **Never commit `.env`.** Env vars are `VITE_*` and documented in `README.md` / `.env.example`. If you add one, update both, plus `.github/workflows/deploy.yml` and the GitHub secrets note.
9. **Deploys happen on push to `main`.** Don't push to `main` or merge without the owner's explicit OK.
10. **Static assets** that need a stable URL (PDFs, OG images) go in `public/`; images imported by components go in `src/assets/`.
11. **SEO meta lives only in `index.html`** (no Helmet). Positioning: Senior SWE **available for freelance & contract work**. Keep titles/descriptions in that voice.
12. **Track conversions** with helpers in `src/utils/analytics.js` (`trackResumeDownload`, `trackOutboundClick`, `trackEvent`) for any new CTA.

## Keep the docs in sync (required)

These docs are how the next agent gets context, so treat updating them as part of the task, not an extra:

- **Added/removed/renamed a section or component** → update the section list in `README.md`, the component map in `docs/ARCHITECTURE.md`, and the section table in `docs/CONTENT_AND_SECTIONS.md`.
- **Changed the shape of data in `constants/index.js`** → update the data-model table in `docs/CONTENT_AND_SECTIONS.md`.
- **Added a dependency, env var, script or build/deploy change** → update `README.md` (and `.env.example` for env vars).
- **New color, font, CSS class or visual pattern** → update `docs/DESIGN_SYSTEM.md`.
- **Fixed a known issue** → remove it from `docs/KNOWN_ISSUES.md`. **Found a new one you aren't fixing** → add it there.
- **Any user-visible change** → add a dated entry at the top of `docs/CHANGELOG.md`.
- Update the "Who this site is for" facts above if the owner's role/company changes.
