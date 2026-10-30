# Architecture

A static, client-rendered single-page app. Vite bundles React + JSX; GitHub Pages serves `dist/`. There is no server, router, state library or API of its own. The only network calls at runtime are EmailJS (contact form), Google Analytics, Google Fonts and the `ui-avatars.com` image fallback.

## Boot sequence

```
index.html                     static <head>: title, description, canonical, OG/Twitter meta, fonts, icons
                               (+ JSON-LD and <noscript> injected at build by vite-plugins/seo.js)
  └─ src/main.jsx              registers GSAP ScrollTrigger, mounts <App/> in StrictMode
       └─ src/App.jsx          initAnalytics(), renders Navbar, <main id="main"> sections, Footer
```

`App.jsx` wraps everything in `div.relative.bg-space-900.overflow-hidden` and draws a fixed full-screen grid background (`bg-grid-pattern bg-grid`) behind all sections.

## Component map

| File | Renders | Data source | Notes |
|---|---|---|---|
| `components/Navbar.jsx` | Skip link, fixed top nav, desktop links, mobile full-screen overlay | `navLinks`, `personalInfo` | Blurred/solid after `scrollY > 50`. Scroll-spy via IntersectionObserver sets the active link. **The mobile overlay must stay outside `<nav>`**: the nav's `backdrop-filter` would make it the containing block and clip the fixed overlay. Escape closes; body scroll is locked while open. |
| `components/Hero.jsx` (`#home`) | 3D canvas, availability badge, single `<h1>` name, title, tagline, 2 CTAs, 4 stats | `personalInfo` | GSAP timeline on mount. `HeroCanvas` is `React.lazy` so three.js never blocks first paint. |
| `components/canvas/HeroCanvas.jsx` | R3F `<Canvas>` with `FloatingShape`, `ParticleField count={150}` | none | `frameloop` switches to `"demand"` when off-screen (IntersectionObserver) or under `prefers-reduced-motion`. |
| `components/canvas/FloatingShape.jsx` | Wireframe icosahedron (blue + amber) + faint core sphere | none | `useFrame`: slow rotation, eased pointer-follow, vertical float, opacity pulse. |
| `components/canvas/ParticleField.jsx` | Points cloud in a 20×20×20 cube, additive blending | none | Slowly rotates. |
| `components/About.jsx` (`#about`) | Photo + availability card, bio, 4 stat tiles | `aboutStats`, `personalInfo`; bio is hardcoded | Photo is `src/assets/images/your-photo.jpg`; falls back to ui-avatars.com on error. |
| `components/Experience.jsx` (`#experience`) | Timeline line + job cards + education card | `experiences`, `education` | Line scales with scroll (`scrub`). Dots are positioned with arbitrary values (`left-[9px] md:left-[25px]`) to centre on the line. |
| `components/Projects.jsx` (`#projects`) | Grid of project cards | `projects`, `socialLinks` | Uses `GlassCard` (mouse tilt). `project.color` → `colorMap` (`amber`/`blue`/`purple`). `link: null` renders "Private codebase · details on request". |
| `components/Skills.jsx` (`#skills`) | Category cards with skill pills | `skillCategories` | `category.icon` → `categoryIcons` map (`code`, `cloud`, `database`, `cpu`, `architecture`, `tools`). |
| `components/Services.jsx` (`#services`) | 3 service cards (`glow-card`) | `services` | `service.icon` → `serviceIcons` map (`server`, `code`, `cpu`). |
| `components/Contact.jsx` (`#contact`) | Form (name, email, project type, message + hidden honeypot), toast, social links, resume link | `personalInfo`, `socialLinks`, `projectTypes` | See "Contact form" below. |
| `components/Footer.jsx` | Logo, © year, social links, back-to-top | `socialLinks` | |
| `components/ui/GlassCard.jsx` | `glass-card` div with 3D tilt on pointer move | props | Props: `className`, `tiltEnabled=true`, `glowColor="electric"\|"amber"`. Writes `style.transform` via ref (no re-render per move). |
| `components/ui/Toast.jsx` | Fixed top-right notification, auto-closes after 4 s | props | Props: `message`, `type="success"\|"error"`, `isVisible`, `onClose` (must be stable, e.g. `useCallback`). |
| `utils/analytics.js` | n/a | env | `initAnalytics()`, `trackEvent()`, `trackResumeDownload(location)`, `trackOutboundClick(label, url)`. All no-op without `VITE_GOOGLE_ANALYTICS_ID`. |

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

## 3D (React Three Fiber)

- Single `<Canvas>` only in the hero, lazy-loaded. Camera at `z=7`, `fov 50`. No lights: all materials are unlit (`meshBasicMaterial`/`pointsMaterial`).
- Pointer interaction uses `state.pointer` (normalized −1…1) inside `useFrame`.
- Render loop pauses when the hero is off-screen and is static under `prefers-reduced-motion`.
- Don't add three.js/R3F to `manualChunks` in `vite.config.js`: a manual chunk gets preloaded with the entry and defeats the lazy load.

## Styling

- Tailwind 3 with an extended theme in `tailwind.config.js` (colors, fonts, shadows, keyframes, grid background).
- Shared component classes are defined with `@apply` in `src/index.css` under `@layer components`. See `DESIGN_SYSTEM.md`.
- Fonts (Space Grotesk, Inter, JetBrains Mono) load from Google Fonts in `index.html`.

## Contact form

`Contact.jsx` → `emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY)` with params `{ name, email, project_type, message }`. EmailJS templates must use those exact variable names.
- If the hidden `website` honeypot is filled, it fakes success and sends nothing.
- If EmailJS env vars are missing, it warns in the console and shows an error toast with the email address.
- If `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID` is set, a second send goes to the visitor with `{ …params, to_name, to_email }`. A failure here is only logged: the inquiry was already delivered, so the visitor still sees success.
- On success it fires GA4 `generate_lead`.

## SEO & analytics

- Static meta (title, description, canonical, robots, OG, Twitter) lives **only** in `index.html`. There's no runtime head management.
- `vite-plugins/seo.js` reads `src/constants/index.js` at build time and:
  - injects JSON-LD (`WebSite`, `ProfilePage`, `Person`, `ProfessionalService` with an `OfferCatalog` of `services`) into `<head>`
  - injects a `<noscript>` text copy of the whole page (for crawlers/AI bots that don't run JS)
  - emits `dist/sitemap.xml` (lastmod = build date) and `dist/llms.txt` (markdown profile for AI assistants)
- `public/robots.txt` points to the sitemap.
- GA4 events: `page_view` on load, `generate_lead` (form success), `resume_download` (with `location`), `outbound_click` (GitHub/LinkedIn/email/project links).

## Build & deploy

- Initial JS is about 370 kB min / 126 kB gzip (`index` + `gsap-vendor`). The lazy `HeroCanvas` chunk (three.js) is about 880 kB / 238 kB gzip. `chunkSizeWarningLimit` is raised to 1000 kB for it.
- CI: `.github/workflows/deploy.yml`. PRs → lint + build. Push to `main` → lint + build + deploy to GitHub Pages. Custom domain via `public/CNAME`.

## PWA (installable app + offline)

Configured by `VitePWA` in `vite.config.js` (`vite-plugin-pwa`, Workbox `generateSW`).

- **Manifest:** generated as `/manifest.webmanifest` (name, `display: standalone`, theme `#050816`, 192/512/maskable icons, "Hire me" and "Resume" shortcuts). The plugin injects the `<link rel="manifest">`. There's no hand-written manifest.
- **Service worker:** `/sw.js`, registered by the injected `/registerSW.js` (deferred). It precaches JS, CSS, HTML, the photo, icons and the resume PDF (about 1.7 MB, `social-preview.jpg` excluded), so the whole site, including the 3D hero, works offline. Google Fonts are cached at runtime.
- **Updates:** `autoUpdate` + `skipWaiting` + `clientsClaim`. A new deploy activates on the visitor's next load. `cleanupOutdatedCaches` removes old precaches.
- **`navigateFallback: null` on purpose.** "/" is served from the precache directly. A SPA fallback would answer `/llms.txt`, `/sitemap.xml` and `/robots.txt` navigations with `index.html`. Don't re-enable it unless routes are added, and if you do, add a denylist for those files.
- **Kill switch:** `selfDestroying: true` → deploy → all clients unregister the SW.
- **Dev:** the SW is disabled in `npm run dev`. Use `npm run build && npm run preview` to test. Unregister it afterwards (DevTools → Application) so it doesn't serve stale files on that port.
- **Install UI:** `src/hooks/useInstallPrompt.js` captures `beforeinstallprompt` (Chromium) and exposes `canInstall`/`promptInstall`, detects iOS (no prompt API, so it shows an "Add to Home Screen" hint) and hides everything when already running standalone. It fires GA4 `pwa_install_prompt` (with `outcome`) and `pwa_installed`. Used in `Navbar.jsx` (desktop button, mobile icon, mobile-menu button/hint).
- **Installed-app chrome:** `viewport-fit=cover` + `apple-mobile-web-app-*` meta in `index.html`. Safe-area insets are handled on the navbar (`pt-[env(safe-area-inset-top)]`), the mobile-menu close button, the toast, the footer (`safe-area-inset-bottom`) and body side padding.
- **Offline contact form:** checks `navigator.onLine` and shows an "offline, email me" toast instead of attempting EmailJS.

## Mobile conventions
- Tap targets are at least 44 px tall (`min-h-[44px]` on text links). Form controls stay at 16 px font so iOS doesn't zoom on focus.
- The hero uses `min-h-svh` (stable when mobile browser bars show/hide), not `min-h-screen`.
- No horizontal overflow at 390 px. Check this after layout changes.
