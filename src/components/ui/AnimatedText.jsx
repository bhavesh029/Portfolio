import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedText = ({ text, className = "", delay = 0 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll(".anim-char");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: "power3.out",
          delay,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  const renderChars = () => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="anim-char inline-block"
        style={{ perspective: "500px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <h2 ref={containerRef} className={className}>
      {renderChars()}
    </h2>
  );
};

export default AnimatedText;
