import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { personalInfo, socialLinks } from "../constants";
import Toast from "./ui/Toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCloseToast = useCallback(() => {
    setToast({ show: false, message: "", type: "success" });
  }, []);

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
        if (import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID) {
          return emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
            { ...templateParams, to_name: form.name, to_email: form.email },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          );
        }
        return Promise.resolve();
      })
      .then(() => {
        setLoading(false);
        setToast({ show: true, message: "Thanks! I'll get back to you within 24 hours.", type: "success" });
        setForm({ name: "", email: "", projectType: "", message: "" });
      })
      .catch((error) => {
        setLoading(false);
        console.error("EmailJS Error:", error);
        setToast({ show: true, message: "Something went wrong. Please try again.", type: "error" });
      });
  };

  const socialIcons = {
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    email: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 md:py-28">
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={handleCloseToast}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="contact-anim text-center mb-16">
          <span className="section-subtitle">Get in Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="text-gray-400 text-lg">
            Ready to build scalable solutions? Let's discuss your project requirements.
          </p>
        </div>

        {/* Form Card */}
        <div className="contact-anim glass-card p-8 md:p-10">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@company.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label htmlFor="contact-project" className="block text-sm font-semibold text-gray-300 mb-2">
                Project Type *
              </label>
              <select
                id="contact-project"
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select project type</option>
                <option value="backend">Backend Development</option>
                <option value="api">API Development</option>
                <option value="microservices">Microservices Architecture</option>
                <option value="cloud">Cloud Migration / Optimization</option>
                <option value="ai">AI Integration</option>
                <option value="fullstack">Full-Stack Application</option>
                <option value="consulting">Technical Consulting</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-300 mb-2">
                Project Description *
              </label>
              <textarea
                id="contact-message"
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project requirements..."
                className="form-input resize-none"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Project Inquiry"
              )}
            </button>
          </form>
        </div>

        {/* Social Links + Resume */}
        <div className="contact-anim flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.icon !== "email" ? "_blank" : undefined}
              rel={link.icon !== "email" ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 text-gray-400 hover:text-electric transition-colors duration-300"
              aria-label={link.name}
            >
              {socialIcons[link.icon]}
              <span className="text-sm font-medium">{link.name}</span>
            </a>
          ))}
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-amber hover:text-amber-300 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-medium">Download Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
