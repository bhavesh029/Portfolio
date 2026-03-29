import { useRef, useState } from "react";

const GlassCard = ({ children, className = "", tiltEnabled = true, glowColor = "electric" }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e) => {
    if (!tiltEnabled || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  const glowColors = {
    electric: "hover:shadow-glow-blue",
    amber: "hover:shadow-glow-amber",
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card p-6 md:p-8 ${glowColors[glowColor] || ""} ${className}`}
      style={{
        transform,
        transition: transform ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default GlassCard;
