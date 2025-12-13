import { motion } from "framer-motion";
import { techStack } from "../constants";

const TechStack = () => {
  return (
    <section
      className="py-20 bg-surface-50 border-t border-border"
      id="tech-stack"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-text-primary">
            Technical Arsenal
          </h2>
          <p className="text-text-secondary mt-2">
            Tools I use to build production-grade software
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-white rounded-xl shadow-subtle hover:shadow-portfolio hover:-translate-y-1 transition-all duration-300 text-center group border border-transparent hover:border-primary/20"
            >
              <div className="font-bold text-gray-800 group-hover:text-primary transition-colors">
                {tech.name}
              </div>
              <div className="text-xs text-text-muted mt-1">{tech.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
