# Design System

Dark "deep space + glass" look: near-black navy background, a faint 60 px grid, frosted glass cards, electric-blue as the primary accent and amber for calls to action. Defined in `tailwind.config.js` and `src/index.css`.

## Colors (`tailwind.config.js`)

| Token | Value | Use |
|---|---|---|
| `space-900` | `#050816` | Page background |
| `space-800` | `#0a0f1e` | Card / input background |
| `space-700` | `#111633` | Hover surfaces, pills |
| `space-600` | `#1a1f45` | Spare |
| `electric` (DEFAULT `#4f8fff`, 50–600) | blue | Primary accent: links, subtitles, tags, icons, 3D wireframe |
| `amber` (DEFAULT `#f5a623`, 50–600) | amber | CTAs (`btn-primary`), highlights, logo dot, education dot. **Overrides Tailwind's built-in amber.** |
| `glass-border` | `rgba(79,143,255,0.15)` | Card / divider borders |
| `glass-surface`, `glass-hover` | translucent navy | Glass fills |

Text: headings `text-white`, body `text-gray-300`/`gray-400`, muted `gray-500`. Status colors: `green-400` (checks, "open to work"), `red-400` (errors), `purple-400` (one project badge).

## Typography

| Class | Font | Use |
|---|---|---|
| `font-display` | Space Grotesk | Headings (applied to all `h1–h6` by default), buttons, numbers |
| `font-body` | Inter | Body (default on `body`) |
| `font-mono` | JetBrains Mono | Subtitles, dates, tech tags |

## Reusable classes (`src/index.css`)

| Class | What it is |
|---|---|
| `glass-card` | Translucent rounded-2xl card with blur + border; lifts 4 px and glows on hover |
| `glow-card` | Solid card with a blue→amber gradient 1 px border (via `::before` mask). Put content in a `relative z-10` child |
| `btn-primary` | Amber filled button with glow |
| `btn-outline` | Electric-blue outlined button |
| `form-input` | Dark input/select/textarea with blue focus ring |
| `section-subtitle` | Small uppercase mono eyebrow label (blue) above a section title |
| `section-title` | `text-4xl md:text-5xl` bold section heading |
| `timeline-dot` | 16 px glowing blue dot |
| `skill-orb` | Rounded pill for skills |
| `text-gradient-blue` / `-amber` / `-mixed` | Gradient text fills |

Tailwind extras: shadows `shadow-glow-blue`, `shadow-glow-amber`, `shadow-glow-sm`, `shadow-glass`, `shadow-glass-hover`; animations `animate-float`, `animate-float-delayed`, `animate-glow-pulse`, `animate-slide-up`, `animate-fade-in`, `animate-spin-slow`; background `bg-grid-pattern bg-grid`, `bg-gradient-radial`.

## Layout conventions

- Section: `relative py-20 md:py-28`; container `max-w-7xl mx-auto px-6 lg:px-8` (Contact uses `max-w-4xl`).
- Section header: `section-subtitle` + `section-title`, usually centered with `mb-16`.
- Grids: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Breakpoints: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Mobile nav switches at `md`.
- Icons: inline SVG, Heroicons-outline style (`stroke="currentColor"`, `strokeWidth` 1.5–2), sized `w-4/5/8`.
- Motion: GSAP reveals of `opacity 0→1, y 30–50→0`, `power3.out`, `stagger 0.1–0.2`.
