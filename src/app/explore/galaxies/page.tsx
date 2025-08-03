'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Galaxy() {
  const galaxyRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color('#ffffff');
    const colorOutside = new THREE.Color('#00aaff');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const radius = Math.random() * 10;
      const angle = radius * 2.5;
      const spin = radius * 0.5;
      const branch = (i % 5) * ((Math.PI * 2) / 5);

      const randomX = (Math.random() - 0.5) * 0.5;
      const randomY = (Math.random() - 0.5) * 0.5;
      const randomZ = (Math.random() - 0.5) * 0.5;

      positions[i3] = Math.cos(branch + angle + spin) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branch + angle + spin) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 10);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, []);

  useFrame(() => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <points ref={galaxyRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={particles.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={particles.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

export default function GalaxiesSection() {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* العنوان */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        Galaxies Beyond
        </motion.h2>
      </div>
      {/* مشهد المجرة */}
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 0, 25], fov: 70 }}
      >
        <ambientLight intensity={0.3} />
        <Stars radius={150} depth={60} count={2000} factor={4} fade />
        <OrbitControls enableZoom={true} />
        <Galaxy />
      </Canvas>
    </section>
  );
}
