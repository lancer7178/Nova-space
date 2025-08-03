'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const MagneticField = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.2;
    }
  });

  const positions = useMemo(() => {
    const count = 1000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 10 + 5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.1}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

export default function MagneticFieldsSection() {
  return (
    <section className="w-full h-screen bg-black text-white relative z-10 overflow-hidden">
      {/* النص العلوي */}
      <motion.h2
        className="absolute top-10 w-full text-center text-4xl font-bold z-20 pointer-events-none"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Mysterious Magnetic Fields
      </motion.h2>

      {/* الـ Canvas 3D */}
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 0, 20], fov: 60 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={1500} factor={3} fade />
        <OrbitControls enableZoom={true} />
        <MagneticField />
      </Canvas>
    </section>
  );
}
