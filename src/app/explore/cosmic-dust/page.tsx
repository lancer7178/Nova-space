"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useRef, useMemo, useState } from "react";

const DustCloud = ({ color, scale }: { color: string; scale: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 5000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0001;
      pointsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <group scale={[scale, scale, scale]}>
      <Points
        ref={pointsRef}
        positions={particles}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color={color}
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const FloatingCrystal = ({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x += 0.003 + (hovered ? 0.005 : 0);
      ref.current.rotation.y += 0.002 + (hovered ? 0.004 : 0);
      ref.current.position.y = position[1] + Math.sin(t) * 0.5;
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      castShadow
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <octahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1 : 0.4}
        metalness={0.9}
        roughness={0.1}
        wireframe={hovered}
      />
    </mesh>
  );
};

export default function CosmicDustSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white relative z-10 overflow-hidden">
      <div className="w-full h-[100vh]">
        <Canvas camera={{ position: [0, 0, 30], fov: 45 }} shadows>
          <color attach="background" args={["#0a0514"]} />
          <DustCloud color="#ff69b4" scale={0.8} />
          <DustCloud color="#00ff88" scale={0.5} />
          <DustCloud color="#ffd700" scale={0.6} />

          {/* Floating crystals */}
          <FloatingCrystal position={[-15, 10, -5]} color="#ff69b4" />
          <FloatingCrystal position={[15, 10, -5]} color="#00ff88" />
          <FloatingCrystal position={[0, -12, -5]} color="#ffd700" />
          <FloatingCrystal position={[-8, -5, 10]} color="#00d9ff" />
          <FloatingCrystal position={[8, -5, 10]} color="#ff006e" />

          <Stars
            radius={300}
            depth={50}
            count={800}
            factor={4}
            fade
            speed={0.3}
          />
          <ambientLight intensity={0.4} />
          <pointLight position={[20, 20, 20]} intensity={1.5} color="#ff69b4" />
          <pointLight
            position={[-20, 20, 20]}
            intensity={1.5}
            color="#00ff88"
          />
          <OrbitControls autoRotate autoRotateSpeed={0.2} />
        </Canvas>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-20 px-6 pt-20 md:pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Cosmic Dust Clouds
        </motion.h2>
        <motion.p
          className="text-center text-gray-300 text-sm md:text-base max-w-2xl mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Navigate through nebular dust clouds where stellar matter coalesces
          and new worlds are born. Discover crystalline formations within the
          cosmic fog.
        </motion.p>
      </div>
    </section>
  );
}
