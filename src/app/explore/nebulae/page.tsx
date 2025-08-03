// components/NebulaeSection.jsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

const Nebula = () => (
  <mesh>
    <sphereGeometry args={[5, 64, 64]} />
    <meshStandardMaterial
      color="#e0727d"
      transparent
      opacity={0.3}
      emissive="#e0727d"
      emissiveIntensity={1}
    />
  </mesh>
);

export default function NebulaeSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white relative z-10">
      <motion.h2 className="text-center text-4xl font-bold pt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        Nebulae
      </motion.h2>
      <div className="w-full h-[100vh] mt-8">
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 10]} intensity={1.5} color="#ffaaaa" />
          <Stars />
          <OrbitControls enableZoom={false} />
          <Nebula />
        </Canvas>
      </div>
    </section>
  );
}
