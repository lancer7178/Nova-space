'use client'

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Sparkles } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { motion } from 'framer-motion'

export default function FirePlanetPage() {
  return (
    <div className="bg-black min-h-screen flex flex-col overflow-x-hidden">
      {/* نص فوق */}
      <header className="relative z-20 w-full py-6 flex justify-center px-4 max-w-full box-border">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg max-w-4xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Fiery Planet of Doom
        </motion.h2>
      </header>

      {/* الجزء الخاص بالكانفس */}
      <main className="flex-grow relative z-10 w-full h-screen">
        <Canvas
          camera={{ position: [0, 2, 8], fov: 60 }}
          style={{ width: '100vw', height: '100vh', display: 'block' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={3} color="orange" />
          <Suspense fallback={null}>
            <FirePlanet />
            <Stars radius={100} depth={50} count={2000} factor={4} fade />
            <Sparkles count={80} scale={6} speed={1} size={2} color="orange" />
            <OrbitControls enableZoom={true} />
          </Suspense>
        </Canvas>
      </main>
    </div>
  );
}


function FirePlanet() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          emissive="orange"
          emissiveIntensity={1.5}
          color="#331100"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      <mesh position={[0, 2.2, 0]}>
        <coneGeometry args={[0.6, 1.2, 32]} />
        <meshStandardMaterial
          color="darkred"
          emissive="red"
          emissiveIntensity={3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      <mesh position={[0, 2.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="orange" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}
