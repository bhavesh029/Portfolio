import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name: form.name,
      email: form.email,
      project_type: form.projectType,
      message: form.message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        // Optional: Send Auto-Reply if configured
        if (import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID) {
          return emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
            {
              ...templateParams,
              to_name: form.name,
              to_email: form.email,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );
        }
        return Promise.resolve();
      })
      .then(() => {
        setLoading(false);
        alert("Thank you! I'll get back to you within 24 hours.");
        setForm({
          name: "",
          email: "",
          projectType: "",
          message: "",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error("EmailJS Error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold text-text-primary mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-text-secondary">
            Ready to build scalable solutions? Let's discuss your project
            requirements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-surface-50 p-8 md:p-10 rounded-2xl border border-border shadow-portfolio"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="form-input bg-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@company.com"
                  className="form-input bg-white"
                  required
                />
              </div>
            </div>

            {/* Project Type */}
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Project Type *
              </label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                className="form-input bg-white"
                required
              >
                <option value="">Select project type</option>
                <option value="backend">Backend Development</option>
                <option value="api">API Development</option>
                <option value="microservices">
                  Microservices Architecture
                </option>
                <option value="cloud">Cloud Migration</option>
                <option value="optimization">Performance Optimization</option>
                <option value="consulting">Technical Consulting</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Project Description
              </label>
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project requirements..."
                className="form-input bg-white"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full text-lg shadow-cta hover:shadow-cta-hover disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Project Inquiry"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
