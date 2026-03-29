import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../constants";
import GlassCard from "./ui/GlassCard";

gsap.registerPlugin(ScrollTrigger);

const colorMap = {
  amber: {
    badge: "bg-amber/10 text-amber border-amber/20",
    glow: "amber",
  },
  blue: {
    badge: "bg-electric/10 text-electric border-electric/20",
    glow: "electric",
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    glow: "electric",
  },
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 50 },
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
    <section ref={sectionRef} id="projects" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-16">
          <div>
            <span className="section-subtitle">Featured Work</span>
            <h2 className="section-title mb-0">Selected Projects</h2>
          </div>
          <a
            href="https://github.com/bhavesh029"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric font-semibold hover:text-electric-300 flex items-center gap-1 group transition-colors"
          >
            View GitHub
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const colors = colorMap[project.color] || colorMap.blue;
            return (
              <div key={project.id} className="project-card">
                <GlassCard
                  className="h-full flex flex-col"
                  glowColor={colors.glow}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide border ${colors.badge}`}
                    >
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-500 font-mono shrink-0">
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-display font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{project.subtitle}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-mono bg-space-700/60 text-gray-400 rounded-md border border-glass-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="pt-4 border-t border-glass-border mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-electric text-sm font-medium hover:text-electric-300 flex items-center gap-1 group transition-colors"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      View Project
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
