/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

type PlanetProps = {
  size: number;
  position: [number, number, number];
  color: string;
  name: string;
};

const Planet = ({ size, position, color, name }: PlanetProps) => {
  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
    </mesh>
  );
};

export default function PlanetsSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Canvas 3D Fullscreen */}
      <Canvas camera={{ position: [0, 5, 35], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 10]} intensity={1.5} />
        <Stars radius={200} depth={60} count={2000} factor={5} fade />
        <OrbitControls enableZoom={true} enablePan={true} autoRotate />

        {/* Planets */}
        <Planet size={1.5} position={[-18, 0, -2]} color="#ff5733" name="Mercury" />
        <Planet size={2.5} position={[-12, 0, 3]} color="#ffbd33" name="Venus" />
        <Planet size={3.2} position={[-6, 0, -2]} color="#3399ff" name="Earth" />
        <Planet size={2.7} position={[0, 0, 3]} color="#ff6633" name="Mars" />
        <Planet size={5.5} position={[8, 0, -4]} color="#ffcc66" name="Jupiter" />
        <Planet size={4.2} position={[16, 0, 3]} color="#f0e68c" name="Saturn" />
      </Canvas>

      {/* Overlay Text */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🪐 Our Solar System
        </motion.h2>

        <motion.p
          className="mt-6 max-w-2xl text-center text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Discover the planets of our solar system in full 3D. Zoom, explore, and feel the scale of space like never before.
        </motion.p>
      </div>
    </div>
  );
}
