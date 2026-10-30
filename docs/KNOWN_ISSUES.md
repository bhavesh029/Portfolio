# Known Issues & Gaps

Last audited **2026-10-30** on branch `fix/bugs-and-seo`. `npm run lint` and `npm run build` pass. The items fixed in that branch are recorded in `CHANGELOG.md`. What's below is what is still open.

**Agents:** when you fix an item, delete it. When you find a new one you aren't fixing, add it.

## Bugs

### Low
1. `gsap.registerPlugin(ScrollTrigger)` is repeated in each section file (already done in `main.jsx`). Harmless.
2. About bio paragraphs are still hardcoded in `About.jsx` (stats were moved to `aboutStats` in constants).
3. Footer social links don't fire `trackOutboundClick` like the Contact ones do.
4. Twitter/X has no `twitter:site` / `twitter:creator` tag (no handle known).

## Things the site doesn't do (or does poorly)

### Performance
- `src/assets/images/your-photo.jpg` is still a 257 kB JPEG. Export a ~600 px WebP/AVIF (it now has `loading="lazy"` and dimensions).
- GSAP reveal animations ignore `prefers-reduced-motion` (the 3D hero already respects it). Wrap them in `gsap.matchMedia()`.
- The lazy three.js chunk is ~880 kB / 238 kB gzip. Fine since it no longer blocks first paint, but a static image fallback on low-end phones would save data.

### SEO / visibility
- No real prerendering. Content for non-JS crawlers comes from the generated `<noscript>` block, JSON-LD and `llms.txt` (see `vite-plugins/seo.js`). Full prerendering would be the next step if search rankings matter more.
- **Owner actions (can't be done in code):** verify the domain in Google Search Console and Bing Webmaster Tools and submit `https://bhaveshchauhan.me/sitemap.xml`. In GA4, mark `generate_lead` and `resume_download` as key events. Re-scrape the link preview with the LinkedIn Post Inspector after deploying.
- No dedicated pages per project/case study or blog, which limits long-tail search traffic.
- No testimonials/client logos section (strong social proof for freelance clients).

### Contact / lead capture
- Spam protection is a honeypot only. Add EmailJS domain allow-listing / rate limits in the EmailJS dashboard, or a captcha if spam appears.
- No budget/timeline fields, and no calendar booking link (e.g. Cal.com) for clients who prefer a call.

### Analytics & privacy
- No cookie/consent banner for GA4 (matters for EU/UK visitors).

### Accessibility
- Reveal animations start at `opacity: 0`. If GSAP fails to load, sections stay invisible.
- No custom `:focus-visible` styles, and several low-contrast texts (`text-gray-500` on `space-900`).

### Engineering / repo hygiene
- No tests (unit, visual or e2e). CI now runs lint + build on PRs, but nothing checks behavior.
- `.env` was committed in early history (commit `8fa38c5`, removed in `65dfa73`). The values are EmailJS/GA identifiers that ship in the public bundle anyway, but consider rotating the EmailJS keys.
- Browserslist data is stale (`npx update-browserslist-db@latest`).
- `npm install` reports audit advisories. Review with `npm audit`.
