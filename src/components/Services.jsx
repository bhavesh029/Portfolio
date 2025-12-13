import { motion } from "framer-motion";
import { services } from "../constants";

const ServiceIcon = ({ icon }) => {
  const icons = {
    server: (
      <svg
        className="w-8 h-8 text-primary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 01-2 2v4a2 2 0 012 2h14a2 2 0 012-2v-4m-2-4h.01M17 16h.01"
        ></path>
      </svg>
    ),
    code: (
      <svg
        className="w-8 h-8 text-accent"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        ></path>
      </svg>
    ),
    cpu: (
      <svg
        className="w-8 h-8 text-purple-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
        ></path>
      </svg>
    ),
  };
  return icons[icon] || null;
};

const Services = () => {
  return (
    <section className="py-24 bg-surface-50" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-text-primary mb-4"
          >
            How I Can Help Your Business
          </motion.h2>
          <p className="text-lg text-text-secondary">
            I don't just write code; I provide complete technical solutions.
            From optimizing legacy systems to building new AI-powered apps from
            scratch.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-border hover:border-primary/50 shadow-portfolio hover:shadow-cta transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-surface-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ServiceIcon icon={service.icon} />
              </div>

              <h3 className="font-display text-xl font-bold mb-3">
                {service.title}
              </h3>
              <p className="text-text-secondary mb-6 text-sm leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center text-sm font-medium text-text-primary"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
