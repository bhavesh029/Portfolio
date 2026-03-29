import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences, education } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );

      // Animate cards
      gsap.fromTo(
        ".exp-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
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
    <section ref={sectionRef} id="experience" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-subtitle">Career Journey</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 origin-top"
            style={{
              background:
                "linear-gradient(180deg, rgba(79,143,255,0.6) 0%, rgba(79,143,255,0.1) 100%)",
            }}
          />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="exp-card relative pl-12 md:pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-2.5 md:left-6.5 top-2 timeline-dot" />

                {/* Card */}
                <div className="glass-card p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-electric font-medium">
                        {exp.company}{" "}
                        <span className="text-gray-500">· {exp.location}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm text-gray-400 font-mono">
                        {exp.date}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{exp.description}</p>

                  <ul className="space-y-2 mb-5">
                    {exp.bullets.slice(0, 3).map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-300"
                      >
                        <span className="text-electric mt-1.5 shrink-0">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-mono font-medium rounded-md bg-electric/10 text-electric border border-electric/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Education */}
            <div className="exp-card relative pl-12 md:pl-20">
              <div className="absolute left-2.5 md:left-6.5 top-2 w-4 h-4 rounded-full bg-amber border-4 border-space-900" style={{ boxShadow: '0 0 15px rgba(245,166,35,0.5)' }} />
              <div className="glass-card p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {education.degree}
                    </h3>
                    <p className="text-amber font-medium">{education.university}</p>
                  </div>
                  <span className="text-sm text-gray-400 font-mono">
                    {education.period}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{education.achievement}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
