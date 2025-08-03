'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const BlackHole = () => {
  const swirlRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (swirlRef.current) {
      swirlRef.current.rotation.z += 0.002;
    }
  });

  return (
    <>
      {/* الثقب الأسود */}
      <mesh>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial color="black" emissive="black" />
      </mesh>

      {/* الحلقة المحيطة بالثقب */}
      <mesh ref={swirlRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.25, 16, 100]} />
        <meshStandardMaterial
          color="#444"
          metalness={1}
          roughness={0.4}
          emissive="#222"
          emissiveIntensity={0.5}
        />
      </mesh>
    </>
  );
};

const CameraZoom = () => {
  const { camera } = useThree();
  const [z, setZ] = useState(10);

  useFrame(() => {
    if (z > 4) {
      const newZ = z - 0.02;
      camera.position.z = newZ;
      setZ(newZ);
    }
  });

  return null;
};

export default function BlackHoleSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white relative z-10 overflow-hidden">
      {/* النص المتحرك */}
      <motion.h2
        className="text-center text-4xl font-bold pt-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        Falling into the Unknown
      </motion.h2>

      <motion.p
        className="text-center text-lg pt-4 text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1.5 }}
      >
        A journey beyond the fabric of space and time...
      </motion.p>

      <div className="w-full h-[100vh] mt-8">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={2} />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
          <OrbitControls enableZoom={false} enablePan={false} />
          <BlackHole />
          <CameraZoom />
        </Canvas>
      </div>
    </section>
  );
}
