import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import FloatingShape from "./FloatingShape";
import ParticleField from "./ParticleField";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HeroCanvas = () => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [reducedMotion] = useState(prefersReducedMotion);

  // Stop the render loop while the hero is scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting)
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const animate = inView && !reducedMotion;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop={animate ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <FloatingShape />
        <ParticleField count={150} />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
