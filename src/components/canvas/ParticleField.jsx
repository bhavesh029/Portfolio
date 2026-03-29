import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate positions outside the component to avoid impurity in render
const generatePositions = (count) => {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  return pos;
};

const DEFAULT_POSITIONS = generatePositions(200);

const ParticleField = ({ count = 200 }) => {
  const pointsRef = useRef();
  const positions = count === 200 ? DEFAULT_POSITIONS : generatePositions(count);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#4f8fff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleField;
