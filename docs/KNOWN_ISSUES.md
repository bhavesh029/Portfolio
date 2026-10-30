# Known Issues & Gaps

Audit of the codebase as of **2026-10-30** (branch `feature/redesigned-3d-web`, commit `afaa046`). `npm run lint` passes and `npm run build` succeeds. These are behavioral, content and quality problems that the tooling doesn't catch.

**Agents:** when you fix an item, delete it. When you find a new one you aren't fixing, add it.

## Bugs

### High
1. **Mobile menu is clipped to the navbar after scrolling.** `Navbar.jsx`: once `scrollY > 50`, the `<nav>` gets `backdrop-blur-xl`. `backdrop-filter` makes the nav the containing block for `position: fixed` descendants, so the full-screen overlay (`fixed inset-0`, rendered *inside* `<nav>`) becomes only as large as the navbar bar. Opening the menu anywhere except the very top of the page looks broken. Fix: render the overlay as a sibling of `<nav>` (or via a portal), or move the blur onto a separate background element.
2. **Timeline dots misaligned on tablet/desktop.** `Experience.jsx:78,130` uses `md:left-6.5`, which doesn't exist in Tailwind's default spacing scale. No CSS is generated (verified in the built CSS), so at ≥768 px the dots stay at `left-2.5` while the line moves to `left-8`. Fix: `md:left-[26px]`.
3. **Experience bullets are silently truncated.** `Experience.jsx:102` renders `exp.bullets.slice(0, 3)`. HabileLabs has 5 bullets and the freelance and Newton roles have 4, so content in constants never appears (e.g. the codebase-ownership and pre-push-hooks wins). Either show all bullets, add a "show more", or trim the data.
4. **Contact form reports failure when the message was actually sent.** `Contact.jsx:64-91`: if the main email succeeds but the optional auto-reply fails, the shared `.catch` shows "Something went wrong" and keeps the form filled, so visitors resubmit and Bhavesh gets duplicates. Handle the auto-reply failure separately.

### Medium
5. **Project links are placeholders.** `Akira` and `Student Transport System` link to the GitHub profile root (`https://github.com/bhavesh029`) while saying "View Project". Use real URLs, or hide/relabel the link when there isn't one.
6. **Project content mixes up achievements.** "AI-Powered Spam Detection" lists "35% improvement in query performance with PostGIS", but that metric belongs to the Trigsy Technologies role. Check it against the resume.
7. **Navbar active state is click-only.** No scroll-spy, so the highlighted link goes stale as soon as the user scrolls, and nothing is highlighted on load or after using the hero CTA.
8. **Mobile menu accessibility.** No body scroll lock, no Escape-to-close, no focus trap. Focus can land on hidden links behind the overlay.
9. **Two `<h1>` elements in the hero** ("BHAVESH" and "CHAUHAN" are separate `h1`s). Use one `h1` with two spans.
10. **Title mismatch.** `index.html` title is "…Senior Software Engineer — Backend & Distributed Systems" but Helmet in `App.jsx` replaces it with a shorter one. Pick one.
11. **`react-vendor` chunk is empty.** `vite.config.js` `manualChunks` produces an empty `react-vendor-*.js` (build warns "Generated an empty chunk"). React lands in `index-*.js`. Remove the entry or use a function-form `manualChunks`.
12. **GlassCard hover lift is overridden.** `.glass-card:hover { transform: translateY(-4px) }` is overridden by GlassCard's inline tilt `transform`, so project cards lose the lift and only tilt. GlassCard also calls `setState` on every `mousemove`, re-rendering the card each frame. Use a ref + direct style write instead.

### Low
13. `ParticleField` regenerates random positions on every render when `count !== 200` (the hero passes 150). Memoize with `useMemo`.
14. Scene lights in `HeroCanvas` do nothing: every material is `meshBasicMaterial` / `pointsMaterial`.
15. Twitter meta tags in `index.html` use `property="twitter:*"`. The spec is `name="twitter:*"` (most parsers tolerate it).
16. `formRef` in `Contact.jsx` is created but never used. `gsap.registerPlugin(ScrollTrigger)` is repeated in 6 files (already done in `main.jsx`).
17. About stats and bio, the Projects "View GitHub" URL and the Contact project-type options are hardcoded in components instead of `constants/index.js`.

## Things the site doesn't do (or does poorly)

### Performance
- **Heavy first load:** `three-vendor` is ~1.08 MB minified / ~299 kB gzip, loaded eagerly before anything is interactive. Lazy-load `HeroCanvas` (`React.lazy` + `Suspense`) with a static gradient fallback.
- **WebGL runs non-stop:** the canvas renders every frame even when scrolled off-screen or in a background tab. Use `frameloop="demand"` or pause via IntersectionObserver.
- **No low-power / mobile fallback:** full 3D scene on every phone. No `prefers-reduced-motion` handling for the 3D scene or any GSAP animation.
- **Unoptimized images:** `your-photo.jpg` (257 kB) has no `width`/`height`, `loading`, or modern format. `public/social-preview.jpg` is byte-for-byte the same photo at 1024×768 rather than a proper 1200×630 share card.
- **Unused dependencies shipped/installed:** `framer-motion`, `@gsap/react`. Unused components: `ui/AnimatedText.jsx`, `ui/SectionWrapper.jsx`.

### SEO
- No `robots.txt`, `sitemap.xml`, `<link rel="canonical">`, or JSON-LD `Person` structured data.
- Client-rendered only: crawlers that don't execute JS see an empty `<div id="root">`. Consider prerendering (e.g. `vite-plugin-prerender` / static export).
- No `theme-color`, no Apple touch icon or PNG favicons (SVG favicon only).

### Contact / lead capture
- No spam protection (honeypot, captcha, or EmailJS rate limiting).
- No field-level validation feedback beyond native `required`, and no length limits.
- If EmailJS env vars are missing (e.g. a CI secret not set) the form just shows a generic error. Nothing warns at build time.

### Analytics
- Only a single pageview is sent. No events for resume downloads, form submits, outbound GitHub/LinkedIn clicks or section views, which are the conversions the site exists for.
- No cookie/consent banner (matters for EU/UK visitors with GA4).

### Accessibility
- Reveal animations start at `opacity: 0`. If GSAP/ScrollTrigger fails, sections stay invisible.
- No custom `:focus-visible` styles, and several low-contrast texts (`text-gray-500` on `space-900`).
- No skip-to-content link.

### Content & UX
- No dark/light toggle (dark only, by design).
- No dedicated project detail pages, case studies, blog or testimonials.
- No 404 handling (single page, so it only matters if routes are added).

### Engineering / repo hygiene
- **No tests** (unit, visual, or e2e) and **no lint/build check on PRs**. CI only runs on push to `main`, so a broken build is discovered at deploy time.
- CI uses `npm install --legacy-peer-deps` instead of `npm ci`, so lockfile drift is possible.
- `Bhavesh_Chauhan_Resume_2026.pdf` is duplicated at the repo root and in `public/`. Only the `public/` copy is served.
- `.env` was committed in early history (commit `8fa38c5`, removed in `65dfa73`). The values are EmailJS/GA identifiers that ship in the public bundle anyway, so the risk is low, but consider rotating the EmailJS keys and enabling EmailJS domain allow-listing.
- Browserslist data is stale (`npx update-browserslist-db@latest`).
