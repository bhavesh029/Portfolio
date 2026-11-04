import { useState, useEffect } from "react";
import { navLinks, personalInfo } from "../constants";
import { trackResumeDownload } from "../utils/analytics";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

const installIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { canInstall, showIOSHint, promptInstall } = useInstallPrompt();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: highlight the link of the section crossing the middle of the viewport
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setToggle(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock page scroll and allow Escape while the mobile menu is open
  useEffect(() => {
    if (!toggle) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setToggle(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [toggle]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] btn-primary py-2 px-4"
      >
        Skip to content
      </a>

      <nav
        className={`fixed top-0 w-full z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${
          scrolled
            ? "bg-space-900/80 backdrop-blur-xl border-b border-glass-border"
            : "bg-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center transition-all duration-500 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-1 min-h-[44px] group"
            aria-label={`${personalInfo.name}, back to top`}
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
                    aria-current={active === link.id ? "true" : undefined}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      active === link.id
                        ? "text-electric"
                        : "text-gray-400 hover:text-white"
                    }`}
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
              onClick={() => trackResumeDownload("navbar")}
            >
              Resume
            </a>
            {canInstall && (
              <button
                onClick={promptInstall}
                className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {installIcon}
                Install app
              </button>
            )}
          </div>

          {/* Mobile: install shortcut + menu button */}
          <div className="md:hidden flex items-center gap-1">
            {canInstall && (
              <button
                onClick={promptInstall}
                className="text-gray-400 hover:text-white p-3 transition-colors"
                aria-label="Install app"
              >
                {installIcon}
              </button>
            )}
            <button
              className="text-gray-400 hover:text-white p-2 transition-colors"
              onClick={() => setToggle(!toggle)}
              aria-label={toggle ? "Close menu" : "Open menu"}
              aria-expanded={toggle}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay: kept outside <nav> because the nav's backdrop-filter
          would otherwise become the containing block and clip this fixed overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!toggle}
        inert={!toggle}
        className={`md:hidden fixed inset-0 z-[60] bg-space-900/95 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-5 overflow-y-auto py-20 ${
          toggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="absolute top-[calc(env(safe-area-inset-top)+1.25rem)] right-6 text-gray-400 hover:text-white p-2"
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
            className={`text-2xl font-display font-bold py-1.5 px-4 transition-all duration-300 ${
              active === link.id ? "text-electric" : "text-gray-300 hover:text-white"
            }`}
            style={{ transitionDelay: `${index * 50}ms` }}
            onClick={() => setToggle(false)}
          >
            {link.title}
          </a>
        ))}

        <a
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-4"
          onClick={() => {
            setToggle(false);
            trackResumeDownload("mobile_menu");
          }}
        >
          Download Resume
        </a>

        {canInstall && (
          <button
            onClick={() => {
              setToggle(false);
              promptInstall();
            }}
            className="btn-outline flex items-center gap-2"
          >
            {installIcon}
            Install as app
          </button>
        )}

        {showIOSHint && (
          <p className="max-w-[16rem] text-center text-sm text-gray-400">
            Install this site as an app: tap{" "}
            <span className="text-white font-semibold">Share</span>, then{" "}
            <span className="text-white font-semibold">Add to Home Screen</span>.
          </p>
        )}
      </div>
    </>
  );
};

export default Navbar;
