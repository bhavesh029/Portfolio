import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-24 bg-white border-t border-border" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image / Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-surface-50 aspect-video lg:aspect-square group">
              {/* Abstract Code Visual */}
              <div className="absolute inset-0 bg-primary/5 p-8 font-mono text-sm text-primary/40 overflow-hidden select-none">
                <p>class Engineer implements Solution {"{"}</p>
                <p className="pl-4">constructor() {"{"}</p>
                <p className="pl-8">this.name = "Bhavesh Chauhan";</p>
                <p className="pl-8">this.skills = ["Node.js", "AWS", "AI"];</p>
                <p className="pl-8">this.passion = "Scalable Architecture";</p>
                <p className="pl-4">{"}"}</p>
                <p className="pl-4 mt-4">optimize(system) {"{"}</p>
                <p className="pl-8">return system.performance * 100;</p>
                <p className="pl-4">{"}"}</p>
                <p>{"}"}</p>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute bottom-8 right-8 bg-white p-6 rounded-xl shadow-cta border border-border max-w-xs z-10 hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary">
                      Proven Track Record
                    </div>
                    <div className="font-bold text-text-primary">
                      High-Impact Results
                    </div>
                  </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Consistently delivering 20-30% performance improvements and
                  cost reductions for client infrastructures.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold text-text-primary mb-6">
              More Than Just Code. <br />
              <span className="text-primary">I Build Business Assets.</span>
            </h2>

            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              I am a <strong>Software Engineer</strong> specializing in
              cloud-native backend systems and microservices. With over 3 years
              of experience, I don't just "make it work"—I make it scalable,
              cost-efficient, and resilient.
            </p>

            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              My background involves refactoring legacy monoliths for companies
              like <strong>Agrim Wholesale</strong> and building automated
              transport systems for <strong>Newton Classroom</strong>. Now, I
              leverage that enterprise-grade expertise to help freelancers and
              businesses integrate AI and optimize their cloud costs.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-text-primary mb-2 flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                  Problem Solver
                </h4>
                <p className="text-sm text-text-secondary">
                  I look for the root cause, not just the quick fix.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-2 flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Cloud Native
                </h4>
                <p className="text-sm text-text-secondary">
                  AWS, Docker, and Microservices are my playground.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
