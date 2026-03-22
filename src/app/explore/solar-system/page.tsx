'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const PLANETS = [
  { name: 'Mercury', distance: 3, size: 0.15, color: '#A0A0A0', speed: 2.0 },
  { name: 'Venus', distance: 4.2, size: 0.25, color: '#E8CDA0', speed: 1.6 },
  { name: 'Earth', distance: 5.5, size: 0.28, color: '#4B92DB', speed: 1.3 },
  { name: 'Mars', distance: 7, size: 0.2, color: '#C1440E', speed: 1.1 },
  { name: 'Jupiter', distance: 9.5, size: 0.7, color: '#C88B3A', speed: 0.7 },
  { name: 'Saturn', distance: 12, size: 0.6, color: '#E8D5A3', speed: 0.55, hasRing: true },
  { name: 'Uranus', distance: 14.5, size: 0.4, color: '#7EC8E3', speed: 0.4 },
  { name: 'Neptune', distance: 16.5, size: 0.38, color: '#3F54BE', speed: 0.3 },
];

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.15 + Math.sin(t * 2) * 0.05);
    }
  });

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" transparent opacity={0.15} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={3} color="#FDB813" distance={50} />
    </group>
  );
}

function Planet({ distance, size, color, speed, hasRing }: {
  distance: number;
  size: number;
  color: string;
  speed: number;
  hasRing?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed * 0.3;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * distance;
      groupRef.current.position.z = Math.sin(t) * distance;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
      </mesh>
      {hasRing && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
          <meshBasicMaterial color="#D4C5A0" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

function OrbitRing({ distance }: { distance: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[distance - 0.02, distance + 0.02, 128]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

function SolarSystemScene() {
  return (
    <>
      <Sun />
      {PLANETS.map((planet) => (
        <group key={planet.name}>
          <OrbitRing distance={planet.distance} />
          <Planet {...planet} />
        </group>
      ))}
    </>
  );
}

export default function SolarSystemSection() {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Solar System
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Eight worlds orbiting our star — from scorching Mercury to frozen Neptune
        </motion.p>
      </div>

      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [5, 15, 25], fov: 55 }}
      >
        <ambientLight intensity={0.15} />
        <Stars radius={250} depth={100} count={4000} factor={5} fade />
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.2} />
        <SolarSystemScene />
      </Canvas>
    </section>
  );
}
