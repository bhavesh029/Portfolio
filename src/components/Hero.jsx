import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroCanvas from "./canvas/HeroCanvas";
import { personalInfo } from "../constants";

const Hero = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
      )
        .fromTo(
          nameRef.current.querySelectorAll(".name-line"),
          { opacity: 0, y: 60, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8, stagger: 0.15 },
          "-=0.3"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      id="home"
    >
      {/* 3D Canvas Background */}
      <HeroCanvas />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/20 bg-electric/5 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-electric">
              {personalInfo.title} · {personalInfo.subtitle}
            </span>
          </div>

          {/* Name */}
          <div ref={nameRef} className="mb-6">
            <h1 className="name-line font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight">
              BHAVESH
            </h1>
            <h1 className="name-line font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight text-gradient-mixed">
              CHAUHAN
            </h1>
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            {personalInfo.tagline}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-16">
            <a href="#contact" className="btn-primary">
              Hire Me
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              View Resume
            </a>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="flex flex-wrap gap-8 md:gap-12 border-t border-glass-border pt-8"
          >
            <div>
              <div className="text-3xl font-display font-bold text-white">
                {personalInfo.yearsOfExperience}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Years of Experience
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white">
                {personalInfo.companiesWorked}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Companies Worked
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white">
                {personalInfo.usersServed}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Users Served
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white">
                {personalInfo.teamSize}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Engineers Led
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-gray-600 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-electric rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
