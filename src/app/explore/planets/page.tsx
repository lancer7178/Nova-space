'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Head from 'next/head';

type PlanetProps = {
  size: number;
  position: [number, number, number];
  color: string;
};

const Planet = ({ size, position, color }: PlanetProps) => {
  const ref = useRef<THREE.Mesh>(null);

  return (

    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  );
};

export default function PlanetsSection() {
  return (

    <>

    <Head>
      <title>planets</title>
      <meta name="description" content="Explore the wonders of the universe with Nova Space Web. Discover galaxies, black holes, and more." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <section className="w-full min-h-screen bg-black text-white relative z-10 overflow-hidden">
      <motion.h2
        className="text-center text-4xl font-bold pt-16 mb-6"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Planets
      </motion.h2>
      <div className="w-full h-[100vh] mt-8">
        <Canvas camera={{ position: [0, 5, 35], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 10]} intensity={1.5} />
          <Stars radius={200} depth={60} count={2000} factor={5} fade />
          <OrbitControls enableZoom={false} />

          {/* Improved Planets Layout */}
          <Planet size={1.5} position={[-18, 0, -2]} color="#ff5733" />  {/* Mercury */}
          <Planet size={2.5} position={[-12, 0, 3]} color="#ffbd33" />   {/* Venus */}
          <Planet size={3.2} position={[-6, 0, -2]} color="#3399ff" />   {/* Earth */}
          <Planet size={2.7} position={[0, 0, 3]} color="#ff6633" />     {/* Mars */}
          <Planet size={5.5} position={[8, 0, -4]} color="#ffcc66" />    {/* Jupiter */}
          <Planet size={4.2} position={[16, 0, 3]} color="#f0e68c" />    {/* Saturn */}
        </Canvas>
      </div>
    </section>
    </>

  );
}
