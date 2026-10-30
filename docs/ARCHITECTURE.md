# Architecture

A static, client-rendered single-page app. Vite bundles React + JSX; GitHub Pages serves `dist/`. There is no server, router, state library or API of its own. The only network calls at runtime are EmailJS (contact form), Google Analytics, Google Fonts and the `ui-avatars.com` image fallback.

## Boot sequence

```
index.html                     static <head>: title, description, OG/Twitter meta, fonts, favicon
  └─ src/main.jsx              registers GSAP ScrollTrigger, mounts <App/> in StrictMode + HelmetProvider
       └─ src/App.jsx          inits GA4 (if VITE_GOOGLE_ANALYTICS_ID), <Helmet> meta, renders sections in order
```

`App.jsx` wraps everything in `div.relative.bg-space-900.overflow-hidden` and draws a fixed full-screen grid background (`bg-grid-pattern bg-grid`) behind all sections.

## Component map

| File | Renders | Data source | Notes |
|---|---|---|---|
| `components/Navbar.jsx` | Fixed top nav, desktop links, mobile full-screen overlay | `navLinks`, `personalInfo.resumeUrl` | Becomes blurred/solid after `scrollY > 50`. "Active" link is set on click only (no scroll-spy). |
| `components/Hero.jsx` (`#home`) | 3D canvas, badge, name, tagline, 2 CTAs, 4 stats | `personalInfo` | GSAP timeline on mount (not scroll-triggered). |
| `components/canvas/HeroCanvas.jsx` | R3F `<Canvas>` with lights, `FloatingShape`, `ParticleField count={150}` | none | `dpr={[1, 1.5]}`, transparent background, absolutely positioned behind hero content. |
| `components/canvas/FloatingShape.jsx` | Wireframe icosahedron (blue + amber) + faint core sphere | none | `useFrame`: slow rotation, eased pointer-follow, vertical float, opacity pulse. |
| `components/canvas/ParticleField.jsx` | Points cloud in a 20×20×20 cube, additive blending | none | Slowly rotates. |
| `components/About.jsx` (`#about`) | Photo + "Open to Work" card, bio, 4 stat tiles | **hardcoded** (bio, stats) | Photo is `src/assets/images/your-photo.jpg`; falls back to ui-avatars.com on error. |
| `components/Experience.jsx` (`#experience`) | Timeline line + job cards + education card | `experiences`, `education` | Line scales with scroll (`scrub`). **Only the first 3 bullets per job are shown.** |
| `components/Projects.jsx` (`#projects`) | Grid of project cards | `projects` | Uses `GlassCard` (mouse tilt). `project.color` → `colorMap` (`amber`/`blue`/`purple`). |
| `components/Skills.jsx` (`#skills`) | Category cards with skill pills | `skillCategories` | `category.icon` → `categoryIcons` map (`code`, `cloud`, `database`, `cpu`, `architecture`, `tools`). |
| `components/Services.jsx` (`#services`) | 3 service cards (`glow-card`) | `services` | `service.icon` → `serviceIcons` map (`server`, `code`, `cpu`). |
| `components/Contact.jsx` (`#contact`) | Form (name, email, project type, message), toast, social links, resume link | `personalInfo`, `socialLinks` | See "Contact form" below. Project-type `<option>`s are hardcoded. |
| `components/Footer.jsx` | Logo, © year, social links, back-to-top | `socialLinks` | |
| `components/ui/GlassCard.jsx` | `glass-card` div with 3D tilt on mousemove | props | Props: `className`, `tiltEnabled=true`, `glowColor="electric"\|"amber"`. |
| `components/ui/Toast.jsx` | Fixed top-right notification, auto-closes after 4 s | props | Props: `message`, `type="success"\|"error"`, `isVisible`, `onClose` (must be stable, e.g. `useCallback`). |
| `components/ui/AnimatedText.jsx` | Per-character GSAP reveal heading | props | **Unused.** |
| `components/ui/SectionWrapper.jsx` | Generic animated `<section>` wrapper | props | **Unused.** Sections duplicate this pattern inline instead. |

## Data flow

All content is exported from `src/constants/index.js` as plain arrays/objects and imported directly by components. There's no context, store or fetching. To change what the site says, edit constants (see `CONTENT_AND_SECTIONS.md` for the schema of each export).

Icon names in constants (`skillCategories[].icon`, `services[].icon`, `socialLinks[].icon`) are **string keys into inline-SVG maps defined inside each component**. Adding a new icon name means adding the SVG to that component's map too, or nothing renders.

## Animation pattern (GSAP)

Every animated section uses the same shape:

```jsx
const sectionRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(".about-anim",                       // class selector, scoped to sectionRef
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
  }, sectionRef);
  return () => ctx.revert();                         // required: cleans up tweens + ScrollTriggers
}, []);
```

- `gsap.context(…, sectionRef)` scopes selector strings to the section, so class names like `.exp-card` only need to be unique per section.
- Each file also calls `gsap.registerPlugin(ScrollTrigger)`. That's redundant with `main.jsx` but harmless.
- Elements start at `opacity: 0` via the `from` state, so if a ScrollTrigger never fires the content stays invisible. Keep `start` values reasonable.
- `@gsap/react` (`useGSAP`) and `framer-motion` are installed but unused.

## 3D (React Three Fiber)

- Single `<Canvas>` only in the hero. Camera at `z=7`, `fov 50`.
- Materials are all `meshBasicMaterial`/`pointsMaterial`, so the lights in `HeroCanvas` have no visible effect (basic materials ignore lighting).
- Pointer interaction uses `state.pointer` (normalized −1…1) inside `useFrame`.
- The canvas keeps rendering every frame even when the hero is scrolled out of view.

## Styling

- Tailwind 3 with an extended theme in `tailwind.config.js` (colors, fonts, shadows, keyframes, grid background).
- Shared component classes are defined with `@apply` in `src/index.css` under `@layer components`. See `DESIGN_SYSTEM.md`.
- Fonts (Space Grotesk, Inter, JetBrains Mono) load from Google Fonts in `index.html`.

## Contact form

`Contact.jsx` → `emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY)` with params `{ name, email, project_type, message }`. If `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` is set, a second send goes to the visitor with `{ …params, to_name, to_email }`. Success/failure shows a `Toast`. EmailJS templates must use those exact variable names.

## SEO & analytics

- Static meta (title, description, keywords, OG, Twitter) in `index.html`. That's what crawlers and link unfurlers see, since they don't run JS.
- `react-helmet-async` in `App.jsx` overrides `<title>`/description at runtime (with a slightly different, shorter title).
- GA4: one `pageview` sent on mount. No event tracking (e.g. resume clicks, form submits).

## Build & deploy

- `vite.config.js` splits vendors into `three-vendor`, `gsap-vendor`, `react-vendor` chunks. (`react-vendor` comes out empty; see KNOWN_ISSUES.)
- `three-vendor` is about 1.08 MB min / 299 kB gzip and is loaded eagerly.
- CI: `.github/workflows/deploy.yml`, push to `main` → build with secrets → GitHub Pages. Custom domain via `public/CNAME`.
