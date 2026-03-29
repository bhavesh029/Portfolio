import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import FloatingShape from "./FloatingShape";
import ParticleField from "./ParticleField";

const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#4f8fff" />
          <pointLight position={[-5, -5, 3]} intensity={0.3} color="#f5a623" />

          <FloatingShape />
          <ParticleField count={150} />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
