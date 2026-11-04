import { useRef } from "react";

// Keep the glass-card colour transitions while overriding the transform timing
const surfaceTransition = "background-color 0.3s, border-color 0.3s, box-shadow 0.3s";

const glowColors = {
  electric: "hover:shadow-glow-blue",
  amber: "hover:shadow-glow-amber",
};

const GlassCard = ({ children, className = "", tiltEnabled = true, glowColor = "electric" }) => {
  const cardRef = useRef(null);

  // Writes the style directly instead of via state so mousemove doesn't re-render the card
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!tiltEnabled || !card || e.pointerType === "touch") return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transition = `transform 0.1s ease-out, ${surfaceTransition}`;
    card.style.transform = `perspective(800px) translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = `transform 0.4s ease-out, ${surfaceTransition}`;
    card.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card p-6 md:p-8 ${glowColors[glowColor] || ""} ${className}`}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default GlassCard;
