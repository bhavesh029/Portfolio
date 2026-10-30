# Content & Sections Guide

## Current sections

Rendered in this order by `src/App.jsx`. Nav links come from `navLinks` in constants.

| Order | Component | Anchor id | In navbar? | Content source |
|---|---|---|---|---|
| 1 | `Hero` | `home` | Logo scrolls here | `personalInfo` |
| 2 | `About` | `about` | Yes | `aboutStats`, `personalInfo`; bio hardcoded in `About.jsx` |
| 3 | `Experience` | `experience` | Yes | `experiences`, `education` |
| 4 | `Projects` | `projects` | Yes | `projects` |
| 5 | `Skills` | `skills` | Yes | `skillCategories` |
| 6 | `Services` | `services` | Yes | `services` |
| 7 | `Contact` | `contact` | Yes | `personalInfo`, `socialLinks`, `projectTypes` |
| 8 | `Footer` | none | No | `socialLinks` |

## Data model: `src/constants/index.js`

| Export | Shape | Used by |
|---|---|---|
| `navLinks` | `[{ id, title }]`, `id` must equal the section's `id` attribute | `Navbar` |
| `personalInfo` | `{ name, title, subtitle, tagline, email, location, siteUrl, resumeUrl, yearsOfExperience, companiesWorked, usersServed, teamSize, availability }` | `Hero`, `Navbar`, `About`, `Contact`, SEO plugin |
| `aboutStats` | `[{ value, label }]` (4 tiles) | `About` |
| `socialLinks` | `[{ name, url, icon }]`, `icon` ∈ `github \| linkedin \| email` | `Contact`, `Footer` |
| `experiences` | `[{ id, role, company, location, date, type, description, bullets[], tech[] }]`, newest first. A `date` containing "Present" marks the current job (used in JSON-LD `worksFor`) | `Experience`, SEO plugin (`type` is not rendered) |
| `education` | `{ degree, university, period, achievement }` | `Experience` |
| `projects` | `[{ id, title, subtitle, category, status, description, highlights[], tech[], link, color }]`, `color` ∈ `amber \| blue \| purple`, `link` is a URL or `null` for private work | `Projects`, SEO plugin |
| `skillCategories` | `[{ title, icon, skills[] }]`, `icon` ∈ `code \| cloud \| database \| cpu \| architecture \| tools` | `Skills` |
| `services` | `[{ id, title, description, icon, tags[] }]`, `icon` ∈ `server \| code \| cpu` | `Services`, SEO plugin (JSON-LD offers) |
| `projectTypes` | `[{ value, label }]` | `Contact` select options |

Everything above (except `navLinks`, `aboutStats`, `projectTypes`) is also read by `vite-plugins/seo.js` to build JSON-LD, the `<noscript>` copy and `llms.txt`. Keep it accurate: it's what Google and AI assistants read. `experiences[].type` is not rendered anywhere.

## Common content edits

- **New job:** add an object at the **top** of `experiences` (newest first) with a unique `id`, strongest bullets first. Update `personalInfo.yearsOfExperience` / `companiesWorked` and the About bio in `About.jsx` if relevant.
- **New project:** append to `projects`. Use a real repo/demo URL in `link`, or `null` for private/client work. The grid is 3 columns on desktop, so 3 or 6 cards look best.
- **New skill:** add to the right `skillCategories[].skills`. New category: add an object, and if you use a new `icon` key, add its SVG to `categoryIcons` in `Skills.jsx`.
- **New resume:** replace `public/Bhavesh_Chauhan_Resume_2026.pdf` (or add a new file and update `personalInfo.resumeUrl`). Also keep the stats/claims on the site consistent with it.
- **New photo:** replace `src/assets/images/your-photo.jpg` (square crop, ideally ≤ 150 kB WebP/JPEG).
- **Availability:** change `personalInfo.availability` (hero badge, JSON-LD, llms.txt) and the text in `scripts/social-card.html`.
- **Social preview:** edit `scripts/social-card.html` and run `bash scripts/render-social-card.sh` to regenerate `public/social-preview.jpg` (1200×630).
- **SEO text:** title/description/OG/Twitter tags live only in `index.html`. Structured data updates itself from constants.

## Adding a new section (checklist)

1. **Data:** add an export to `src/constants/index.js` (e.g. `export const testimonials = [...]`). Keep the shape flat and document it in the table above.
2. **Component:** create `src/components/<Name>.jsx` using this template:

   ```jsx
   import { useEffect, useRef } from "react";
   import gsap from "gsap";
   import { ScrollTrigger } from "gsap/ScrollTrigger";
   import { testimonials } from "../constants";

   gsap.registerPlugin(ScrollTrigger);

   const Testimonials = () => {
     const sectionRef = useRef(null);

     useEffect(() => {
       const ctx = gsap.context(() => {
         gsap.fromTo(
           ".testimonial-card",
           { opacity: 0, y: 40 },
           {
             opacity: 1,
             y: 0,
             duration: 0.7,
             stagger: 0.15,
             ease: "power3.out",
             scrollTrigger: {
               trigger: sectionRef.current,
               start: "top 75%",
             },
           }
         );
       }, sectionRef);

       return () => ctx.revert();
     }, []);

     return (
       <section ref={sectionRef} id="testimonials" className="relative py-20 md:py-28">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="text-center mb-16">
             <span className="section-subtitle">Kind Words</span>
             <h2 className="section-title">Testimonials</h2>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {testimonials.map((t) => (
               <div key={t.id} className="testimonial-card glass-card p-6">
                 {/* ... */}
               </div>
             ))}
           </div>
         </div>
       </section>
     );
   };

   export default Testimonials;
   ```
3. **Mount it:** import and place it in `src/App.jsx` in the right order.
4. **Navigation:** if it should be in the menu, add `{ id: "<anchor>", title: "<Label>" }` to `navLinks` in the matching position. The `id` must equal the section's `id`. The mobile menu picks it up automatically. Check that the desktop nav still fits at the `md` breakpoint (768 px). It's already 6 links + Resume button.
5. **Styles:** reuse `glass-card` / `glow-card` / `section-*` / tokens from `DESIGN_SYSTEM.md`. Only use Tailwind classes that actually exist.
6. **Verify:** `npm run lint`, `npm run build`, and check in `npm run dev` at mobile (375 px) and desktop widths. Confirm the reveal animation fires and the nav anchor scrolls to the section.
7. **Update docs:** this file's tables, `README.md` section list, `docs/ARCHITECTURE.md` component map, `docs/CHANGELOG.md`.
