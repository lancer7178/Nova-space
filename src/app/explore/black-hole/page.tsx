"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";

export default function BlackHolePage() {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* النص في الأعلى */}

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Black Hole
        </motion.h2>

        <motion.p
          className="mt-6 max-w-2xl text-center text-lg md:text-xl text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A mysterious space phenomenon{" "}
        </motion.p>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Suspense fallback={null}>
          <BlackHole />
        </Suspense>
        <OrbitControls enableZoom={true} />
        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
        />
      </Canvas>
    </div>
  );
}

function BlackHole() {
  return (
    <>
      {/* Core black hole */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Accretion Disk */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.4, 2, 100]} />
        <meshStandardMaterial
          color="#27272A"
          emissive="#27272A"
          emissiveIntensity={2}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
    </>
  );
}
