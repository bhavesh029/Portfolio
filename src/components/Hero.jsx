// src/components/Hero.jsx
import { motion } from "framer-motion";
import profilePic from "../assets/images/your-photo.jpg";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-surface-50 via-white to-primary-50 relative overflow-hidden min-h-screen flex items-center">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Available for Freelance Projects
            </div>

            <h1 className="font-display text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Scalable Backend Systems & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                AI-Powered Automations
              </span>
            </h1>

            <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl">
              I help businesses build robust Node.js/NestJS architectures,
              optimize AWS cloud costs, and integrate AI into web applications.
              From Figma designs to fully deployed scalable systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#contact" className="btn-primary text-center">
                Start Your Project
              </a>
              <a
                href="#case-studies"
                className="btn-secondary bg-white text-text-primary border border-border hover:border-primary hover:text-primary text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300"
              >
                View Case Studies
              </a>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">25%</div>
                <div className="text-sm text-text-secondary leading-tight">
                  Reduced Cloud
                  <br />
                  Costs
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">35%</div>
                <div className="text-sm text-text-secondary leading-tight">
                  Faster Query
                  <br />
                  Performance
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">3k+</div>
                <div className="text-sm text-text-secondary leading-tight">
                  Daily Users
                  <br />
                  Supported
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full transform rotate-6"></div>
              <div className="absolute inset-0 border-2 border-accent/20 rounded-full transform -rotate-3"></div>

              <div className="absolute inset-2 rounded-full overflow-hidden shadow-2xl bg-white border-4 border-white">
                <img
                  src={profilePic}
                  alt="Bhavesh Chauhan"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=Bhavesh+Chauhan&background=1E3A8A&color=fff&size=512";
                  }}
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-8 -left-4 bg-white p-3 rounded-lg shadow-cta border border-border flex items-center gap-3"
              >
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-text-secondary">
                    Code Quality
                  </div>
                  <div class="text-sm font-bold text-text-primary">
                    Verified
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
