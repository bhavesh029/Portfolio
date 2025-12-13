// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <span className="font-display text-2xl font-bold text-primary tracking-tight">
            Bhavesh Chauhan<span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="list-none flex gap-8">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-primary" : "text-text-secondary"
                } hover:text-primary text-sm font-medium cursor-pointer transition-colors`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
            Book a Discovery Call
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <button
            className="text-text-secondary p-2"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Mobile Menu Dropdown */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-white border border-border absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl shadow-xl sidebar`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4 w-full">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title
                      ? "text-primary"
                      : "text-text-secondary"
                  } font-medium cursor-pointer text-[16px] w-full border-b border-border/50 pb-2 last:border-0`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              <li className="w-full pt-2">
                <a
                  href="#contact"
                  className="btn-primary text-sm w-full block text-center"
                  onClick={() => setToggle(false)}
                >
                  Book Call
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
