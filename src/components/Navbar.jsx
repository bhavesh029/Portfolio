import { useState, useEffect } from "react";
import { navLinks, personalInfo } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setToggle(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-space-900/80 backdrop-blur-xl border-b border-glass-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-1 group"
          onClick={() => {
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-electric transition-colors duration-300">
            BC
          </span>
          <span className="font-display text-2xl font-bold text-amber">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    active === link.title
                      ? "text-electric"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setActive(link.title)}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm py-2 px-5"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400 hover:text-white p-2 transition-colors"
          onClick={() => setToggle(!toggle)}
          aria-label={toggle ? "Close menu" : "Open menu"}
          aria-expanded={toggle}
        >
          {toggle ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-0 bg-space-900/95 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
          toggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Close button in overlay */}
        <button
          className="absolute top-5 right-6 text-gray-400 hover:text-white p-2"
          onClick={() => setToggle(false)}
          aria-label="Close menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {navLinks.map((link, index) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`text-2xl font-display font-bold transition-all duration-300 ${
              active === link.title ? "text-electric" : "text-gray-300 hover:text-white"
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
            onClick={() => {
              setToggle(false);
              setActive(link.title);
            }}
          >
            {link.title}
          </a>
        ))}

        <a
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-4"
          onClick={() => setToggle(false)}
        >
          Download Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
