// Build-time SEO for a client-rendered SPA. Crawlers, link unfurlers and AI
// assistants often don't run JavaScript, so this generates everything they need
// from src/constants/index.js (the single source of truth for site content):
//   - JSON-LD structured data (Person + ProfessionalService) in <head>
//   - a <noscript> text version of the whole page
//   - sitemap.xml and llms.txt in the build output

import {
  personalInfo,
  socialLinks,
  experiences,
  education,
  projects,
  skillCategories,
  services,
} from "../src/constants/index.js";

const SITE_URL = personalInfo.siteUrl;
const OG_IMAGE = `${SITE_URL}/social-preview.jpg`;

const profileUrls = socialLinks
  .filter((link) => link.url.startsWith("http"))
  .map((link) => link.url);
const allSkills = skillCategories.flatMap((category) => category.skills);
const currentJob = experiences.find((exp) => exp.date.includes("Present"));

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildJsonLd = () => {
  const personId = `${SITE_URL}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: `${personalInfo.name} | ${personalInfo.title}`,
        inLanguage: "en",
        about: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: personalInfo.name,
        jobTitle: personalInfo.title,
        description: personalInfo.tagline,
        url: `${SITE_URL}/`,
        image: OG_IMAGE,
        email: `mailto:${personalInfo.email}`,
        sameAs: profileUrls,
        knowsAbout: allSkills,
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        ...(currentJob && {
          worksFor: { "@type": "Organization", name: currentJob.company },
        }),
        alumniOf: { "@type": "CollegeOrUniversity", name: education.university },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: `${personalInfo.name}: Freelance ${personalInfo.subtitle} Engineering`,
        description: `${personalInfo.availability}. ${services.map((s) => s.title).join(", ")}.`,
        url: `${SITE_URL}/`,
        image: OG_IMAGE,
        email: personalInfo.email,
        founder: { "@id": personId },
        provider: { "@id": personId },
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        knowsAbout: allSkills,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Engineering services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              serviceType: service.tags.join(", "),
            },
          })),
        },
      },
    ],
  };
};

const buildNoscript = () => {
  const list = (items) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;

  return `
<div style="max-width:48rem;margin:0 auto;padding:6rem 1.5rem;color:#d1d5db;font-family:Inter,sans-serif;line-height:1.6">
  <h1>${escapeHtml(personalInfo.name)}: ${escapeHtml(personalInfo.title)}, ${escapeHtml(personalInfo.subtitle)}</h1>
  <p><strong>${escapeHtml(personalInfo.availability)}.</strong> ${escapeHtml(personalInfo.tagline)}. ${escapeHtml(personalInfo.location)}.</p>
  <p>Contact: <a href="mailto:${escapeHtml(personalInfo.email)}">${escapeHtml(personalInfo.email)}</a> · <a href="${escapeHtml(personalInfo.resumeUrl)}">Resume (PDF)</a> · ${socialLinks
    .filter((link) => link.url.startsWith("http"))
    .map((link) => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.name)}</a>`)
    .join(" · ")}</p>

  <h2>Services</h2>
  ${services
    .map((s) => `<h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.description)}</p>${list(s.tags)}`)
    .join("")}

  <h2>Experience</h2>
  ${experiences
    .map(
      (exp) =>
        `<h3>${escapeHtml(exp.role)}, ${escapeHtml(exp.company)} (${escapeHtml(exp.date)})</h3><p>${escapeHtml(exp.description)} · ${escapeHtml(exp.location)}</p>${list(exp.bullets)}<p>Tech: ${escapeHtml(exp.tech.join(", "))}</p>`
    )
    .join("")}
  <h3>${escapeHtml(education.degree)}, ${escapeHtml(education.university)} (${escapeHtml(education.period)})</h3>
  <p>${escapeHtml(education.achievement)}</p>

  <h2>Projects</h2>
  ${projects
    .map(
      (p) =>
        `<h3>${escapeHtml(p.title)}: ${escapeHtml(p.subtitle)}</h3><p>${escapeHtml(p.description)}</p>${list(p.highlights)}<p>Tech: ${escapeHtml(p.tech.join(", "))}</p>`
    )
    .join("")}

  <h2>Skills</h2>
  ${skillCategories.map((c) => `<p><strong>${escapeHtml(c.title)}:</strong> ${escapeHtml(c.skills.join(", "))}</p>`).join("")}
</div>`;
};

const buildLlmsTxt = () => {
  const bullets = (items) => items.map((item) => `- ${item}`).join("\n");

  return `# ${personalInfo.name}

> ${personalInfo.title} (${personalInfo.subtitle}). ${personalInfo.availability}. ${personalInfo.tagline}. ${personalInfo.location}.

Contact: ${personalInfo.email}
Website: ${SITE_URL}/
Resume: ${SITE_URL}${personalInfo.resumeUrl}
${socialLinks
  .filter((link) => link.url.startsWith("http"))
  .map((link) => `${link.name}: ${link.url}`)
  .join("\n")}

## Services offered

${services.map((s) => `### ${s.title}\n\n${s.description}\n\n${bullets(s.tags)}`).join("\n\n")}

## Experience

${experiences
  .map(
    (exp) =>
      `### ${exp.role}, ${exp.company} (${exp.date})\n\n${exp.description} · ${exp.location}\n\n${bullets(exp.bullets)}\n\nTech: ${exp.tech.join(", ")}`
  )
  .join("\n\n")}

### ${education.degree}, ${education.university} (${education.period})

${education.achievement}

## Projects

${projects
  .map(
    (p) =>
      `### ${p.title}: ${p.subtitle} (${p.status})\n\n${p.description}\n\n${bullets(p.highlights)}\n\nTech: ${p.tech.join(", ")}`
  )
  .join("\n\n")}

## Skills

${skillCategories.map((c) => `- **${c.title}:** ${c.skills.join(", ")}`).join("\n")}
`;
};

const buildSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

export default function seoPlugin() {
  return {
    name: "portfolio-seo",
    transformIndexHtml() {
      return [
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          // Escape "<" so content can never close the script tag early
          children: JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c"),
          injectTo: "head",
        },
        {
          tag: "noscript",
          children: buildNoscript(),
          injectTo: "body-prepend",
        },
      ];
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "llms.txt", source: buildLlmsTxt() });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemap() });
    },
  };
}
