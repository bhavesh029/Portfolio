import { socialLinks } from "../constants";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-glass-border py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo + Copyright */}
          <div className="text-center md:text-left">
            <span className="font-display text-xl font-bold text-white tracking-tight">
              BC<span className="text-amber">.</span>
            </span>
            <p className="text-gray-500 text-sm mt-2">
              &copy; {new Date().getFullYear()} Bhavesh Chauhan. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.icon !== "email" ? "_blank" : undefined}
                rel={link.icon !== "email" ? "noopener noreferrer" : undefined}
                className="text-gray-500 hover:text-electric transition-colors duration-300 text-sm font-medium"
                aria-label={link.name}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-glass-border bg-space-800/60 flex items-center justify-center text-gray-400 hover:text-electric hover:border-electric/30 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
