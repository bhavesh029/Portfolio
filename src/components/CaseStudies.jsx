import { motion } from "framer-motion";
import { caseStudies } from "../constants";

const CaseStudies = () => {
  return (
    <section className="py-24 bg-white" id="case-studies">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-bold text-text-primary mb-4">
              Selected Case Studies
            </h2>
            <p className="text-lg text-text-secondary">
              Real-world problems solved with Engineering & AI.
            </p>
          </div>
          <a
            href="https://github.com/bhavesh029"
            target="_blank"
            className="text-primary font-semibold hover:text-primary-700 flex items-center group"
          >
            View GitHub
            <svg
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border border-border rounded-2xl overflow-hidden hover:shadow-portfolio transition-all duration-300 bg-white flex flex-col"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`inline-block px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide 
                        ${
                          project.color === "purple"
                            ? "bg-purple-50 text-purple-600"
                            : project.color === "blue"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-green-50 text-green-600"
                        }`}
                  >
                    {project.category}
                  </div>
                  <span className="text-text-muted text-sm">
                    {project.date}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-text-secondary mb-6 leading-relaxed text-sm flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-surface-100 text-text-secondary text-xs font-semibold rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-border mt-auto flex justify-between items-center">
                  <div className="text-green-600 font-semibold text-sm flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
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
                    {project.result}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    className="text-text-muted hover:text-primary"
                  >
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
