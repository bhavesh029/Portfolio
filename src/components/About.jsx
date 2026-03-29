import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePic from "../assets/images/your-photo.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-anim",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "25%", label: "Cloud Cost Reduction" },
    { value: "35%", label: "Query Performance Boost" },
    { value: "3,000+", label: "Students Served" },
    { value: "50+", label: "Reports Shipped in 18 Days" },
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Side */}
          <div className="about-anim relative">
            <div className="relative rounded-2xl overflow-hidden border border-glass-border bg-space-800/40 aspect-square max-w-md mx-auto lg:mx-0">
              {/* Profile Image */}
              <img
                src={profilePic}
                alt="Bhavesh Chauhan"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://ui-avatars.com/api/?name=Bhavesh+Chauhan&background=0a0f1e&color=4f8fff&size=512&font-size=0.35&bold=true";
                }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-space-900/80 via-transparent to-transparent" />

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Open to Work</div>
                    <div className="text-xs text-gray-400">Remote-Ready · India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-2xl border border-electric/10 -z-10" />
          </div>

          {/* Text Side */}
          <div>
            <span className="about-anim section-subtitle">About Me</span>
            <h2 className="about-anim section-title">
              More Than Just Code.{" "}
              <span className="text-gradient-blue">I Build Business Assets.</span>
            </h2>

            <p className="about-anim text-gray-400 text-lg leading-relaxed mb-6">
              I'm a <span className="text-white font-semibold">Senior Software Engineer</span> with 4+
              years specializing in cloud-native backend systems, microservices, and event-driven
              architectures. I don't just "make it work" — I make it scalable, cost-efficient, and
              resilient.
            </p>

            <p className="about-anim text-gray-400 text-lg leading-relaxed mb-8">
              Currently leading a team of 4 engineers at{" "}
              <span className="text-electric font-semibold">HabileLabs</span> for a US healthcare client.
              Previously built transport systems at{" "}
              <span className="text-electric font-semibold">Newton Classroom</span> serving 3,000+ students
              and optimized location APIs at{" "}
              <span className="text-electric font-semibold">Trigsy Technologies</span>. I also solo-founded{" "}
              <span className="text-amber font-semibold">Akira</span>, an AI-powered financial operations platform.
            </p>

            {/* Stats Grid */}
            <div className="about-anim grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 text-center hover:border-electric/30 transition-all"
                >
                  <div className="text-2xl font-display font-bold text-electric mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
