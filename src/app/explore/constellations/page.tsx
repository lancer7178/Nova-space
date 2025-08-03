'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Constellation = () => {
  const stars = useMemo(() => [
    [0, 0, 0],
    [2, 2, -1],
    [4, 1, 0],
    [6, 3, -2],
    [8, 0, 1],
  ], []);

  return (
    <>
      {stars.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </mesh>
      ))}

      {stars.slice(0, -1).map((start, i) => {
        const end = stars[i + 1];
        const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: '#88ccff' });
        const line = new THREE.Line(geometry, material);

        return <primitive key={`line-${i}`} object={line} />;
      })}
    </>
  );
};

export default function ConstellationsSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white relative z-10">
      <motion.h2
        className="text-center text-4xl font-bold pt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Constellations
      </motion.h2>

      <div className="w-full h-[100vh] mt-8">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <Stars />
          <OrbitControls enableZoom={false} />
          <Constellation />
        </Canvas>
      </div>
    </section>
  );
}
