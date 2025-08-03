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
        metalness={0.2}
        emissive="#aafaff"
        emissiveIntensity={0.08}
      />
    </mesh>
  );
};

export default function FrozenPlanetsSection() {
  return (
    <section className="relative w-full h-screen bg-[#0a0e11] text-white overflow-hidden">
      {/* عنوان متحرك في الأعلى */}
         <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        Frozen Horror Planets
        </motion.h2>
      </div>

      {/* مشهد 3D يغطي الشاشة بالكامل */}
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 8, 25], fov: 60 }}
      >
        {/* ضباب جليدي */}
        <fog attach="fog" args={['#0a0e11', 10, 40]} />

        {/* إضاءة */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#bbddff" />

        {/* نجوم الخلفية */}
        <Stars radius={100} depth={50} count={1500} factor={4} fade />

        {/* الكواكب المجمدة */}
        <FrozenPlanet size={3.5} position={[-12, 0, 0]} color="#cfdde8" />
        <FrozenPlanet size={4} position={[-5, -1, -3]} color="#e4f6f9" />
        <FrozenPlanet size={2.5} position={[4, 0, 3]} color="#d7f2fa" />
        <FrozenPlanet size={5.5} position={[12, 0, -2]} color="#a8cfd9" />

        {/* سحب باردة ثلجية */}
        <Cloud position={[-5, 3, 0]} scale={5} speed={0.2} opacity={0.3} />
        <Cloud position={[8, 2, -4]} scale={4} speed={0.2} opacity={0.25} />
        <Cloud position={[0, 4, 2]} scale={6} speed={0.15} opacity={0.3} />

        {/* تحكم في الكاميرا مع تكبير/تصغير */}
        <OrbitControls enableZoom={true} />
      </Canvas>
    </section>
  );
}
