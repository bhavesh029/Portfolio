import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingShape = () => {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.2, 1), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Slow base rotation
    meshRef.current.rotation.x = time * 0.08;
    meshRef.current.rotation.y = time * 0.12;

    // Mouse follow (smooth)
    const targetX = (state.pointer.y * 0.3);
    const targetY = (state.pointer.x * 0.3);
    mousePos.current.x += (targetX - mousePos.current.x) * 0.02;
    mousePos.current.y += (targetY - mousePos.current.y) * 0.02;

    meshRef.current.rotation.x += mousePos.current.x;
    meshRef.current.rotation.y += mousePos.current.y;

    // Gentle float
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;

    // Wireframe subtle pulse
    if (wireframeRef.current) {
      wireframeRef.current.material.opacity = 0.3 + Math.sin(time * 1.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Main wireframe shape */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          color="#4f8fff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner glow shape */}
      <mesh ref={wireframeRef} geometry={geometry} scale={0.98}>
        <meshBasicMaterial
          color="#f5a623"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Core glow sphere */}
      <mesh scale={0.6}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#4f8fff"
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  );
};

export default FloatingShape;
