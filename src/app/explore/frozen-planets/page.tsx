// components/FrozenPlanetsSection.jsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Cloud } from '@react-three/drei';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

type PlanetProps = {
  size: number;
  position: [number, number, number];
  color: string;
};

const FrozenPlanet = ({ size, position, color }: PlanetProps) => {
  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        color={color}
        roughness={0.9}
        metalness={0.1}
        emissive="#aafaff"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
};

export default function FrozenPlanetsSection() {
  return (
    <section className="w-full min-h-screen bg-[#0a0e11] text-white relative z-10 overflow-hidden">
      <motion.h2
        className="text-center text-4xl font-bold pt-16"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Frozen Horror Planets
      </motion.h2>
      <div className="w-full h-[100vh] mt-8">
        <Canvas camera={{ position: [0, 8, 25], fov: 60 }}>
          <fog attach="fog" args={['#0a0e11', 10, 40]} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 10, 5]} intensity={1.2} color="#cceeff" />
          <Stars radius={100} depth={50} count={1500} factor={4} fade />

          {/* Frozen Planets */}
          <FrozenPlanet size={3.5} position={[-12, 0, 0]} color="#cfdde8" />
          <FrozenPlanet size={4} position={[-5, -1, -3]} color="#e4f6f9" />
          <FrozenPlanet size={2.5} position={[4, 0, 3]} color="#d7f2fa" />
          <FrozenPlanet size={5.5} position={[12, 0, -2]} color="#a8cfd9" />

          {/* Cold Mist Clouds */}
          <Cloud position={[-5, 3, 0]} scale={5} speed={0.2} opacity={0.3} />
          <Cloud position={[8, 2, -4]} scale={4} speed={0.2} opacity={0.25} />
          <Cloud position={[0, 4, 2]} scale={6} speed={0.15} opacity={0.3} />

          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </section>
  );
}
