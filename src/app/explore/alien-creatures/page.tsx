"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useRef } from "react";

type CreatureProps = {
  position: [number, number, number];
  size?: number;
  color?: string;
};

const HorrorCreature = ({
  position,
  size = 2,
  color = "#300000",
}: CreatureProps) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = Math.sin(t / 3) * 0.3;
      ref.current.rotation.x = Math.cos(t / 4) * 0.2;
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow receiveShadow>
      <icosahedronGeometry args={[size, 2]} />
      <meshStandardMaterial
        color={color}
        emissive="#550000"
        emissiveIntensity={0.7}
        metalness={0.7}
        roughness={0.15}
        flatShading
      />
    </mesh>
  );
};

export default function AlienHorrorSection() {
  return (
    <section className="w-full min-h-screen bg-black text-red-100 relative z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-20 md:pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          👁️‍🗨️ Terrifying Alien Creatures
        </motion.h2>
      </div>

      <div className="w-full h-[100vh]">
        <Canvas shadows camera={{ position: [0, 5, 30], fov: 60 }}>
          {/* إضاءة مرعبة حمراء مع ظل خفيف */}
          <ambientLight intensity={0.05} />
          <pointLight
            position={[0, -5, 0]}
            intensity={3}
            color="#ff1100"
            castShadow
          />
          <spotLight
            position={[10, 15, 10]}
            angle={0.3}
            intensity={1.8}
            penumbra={1}
            castShadow
          />

          {/* نجوم خافتة لإضافة عمق */}
          <Stars radius={80} depth={50} count={1000} factor={3} fade />

          {/* ضباب أسود عميق لتعزيز الجو */}
          <fog attach="fog" args={["#000000", 8, 50]} />
          <color attach="background" args={["#000000"]} />

          {/* السماح بالتكبير والتصغير */}
          <OrbitControls enableZoom={true} minDistance={10} maxDistance={40} />

          {/* مخلوقات فضائية مرعبة */}
          <HorrorCreature position={[-15, 0, -5]} size={2.5} color="#550000" />
          <HorrorCreature position={[-7, 0.5, 3]} size={1.8} color="#330000" />
          <HorrorCreature position={[2, -1, -4]} size={3} color="#220000" />
          <HorrorCreature position={[10, 0, 5]} size={2.2} color="#440011" />
        </Canvas>
      </div>
    </section>
  );
}
