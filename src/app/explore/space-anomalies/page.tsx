"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useRef, useState } from "react";

const AnomalyCore = ({
  position,
  type,
}: {
  position: [number, number, number];
  type: "gravitational" | "electromagnetic" | "temporal";
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const colorMap = {
    gravitational: "#ff4444",
    electromagnetic: "#44ff44",
    temporal: "#4444ff",
  };

  useFrame((state) => {
    if (groupRef.current) {
      if (type === "gravitational") {
        groupRef.current.rotation.z += 0.005;
      } else if (type === "electromagnetic") {
        groupRef.current.rotation.x += 0.003;
        groupRef.current.rotation.y += 0.005;
      } else {
        groupRef.current.rotation.y += 0.002;
      }
    }

    if (coreRef.current) {
      const t = state.clock.getElapsedTime();
      if (hovered) {
        coreRef.current.scale.setScalar(1.3 + Math.sin(t * 4) * 0.2);
      } else {
        coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Core */}
      <mesh ref={coreRef} castShadow>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color={colorMap[type]}
          emissive={colorMap[type]}
          emissiveIntensity={hovered ? 1.5 : 0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Rings */}
      <mesh>
        <torusGeometry args={[2.5, 0.2, 16, 100]} />
        <meshStandardMaterial
          color={colorMap[type]}
          emissive={colorMap[type]}
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Outer shell */}
      <mesh>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial
          color={colorMap[type]}
          wireframe
          opacity={hovered ? 0.8 : 0.4}
          transparent
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

const DistortionField = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} scale={3}>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#ffaa00"
          wireframe
          emissive="#ffaa00"
          emissiveIntensity={0.5}
          opacity={0.3}
          transparent
        />
      </mesh>
    </group>
  );
};

export default function SpaceAnomaliesSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white relative z-10 overflow-hidden">
      <div className="w-full h-[100vh]">
        <Canvas camera={{ position: [0, 0, 25], fov: 50 }} shadows>
          <color attach="background" args={["#0a0a0a"]} />
          <AnomalyCore position={[-12, 8, 0]} type="gravitational" />
          <AnomalyCore position={[12, 8, 0]} type="electromagnetic" />
          <AnomalyCore position={[0, -6, 0]} type="temporal" />
          <DistortionField />
          <Stars
            radius={200}
            depth={50}
            count={1200}
            factor={4}
            fade
            speed={0.5}
          />
          <ambientLight intensity={0.3} />
          <pointLight position={[-12, 8, 15]} intensity={2} color="#ff4444" />
          <pointLight position={[12, 8, 15]} intensity={2} color="#44ff44" />
          <pointLight position={[0, -6, 15]} intensity={2} color="#4444ff" />
          <OrbitControls autoRotate autoRotateSpeed={0.4} />
        </Canvas>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-20 px-6 pt-20 md:pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Space Anomalies
        </motion.h2>
        <motion.p
          className="text-center text-gray-300 text-sm md:text-base max-w-2xl mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Investigate gravitational distortions, electromagnetic phenomena, and
          temporal rifts. Hover over anomalies to examine their unique
          properties.
        </motion.p>
      </div>

      <div className="absolute top-20 left-6 bg-black/30 border border-gray-500 rounded-lg p-4 backdrop-blur-sm pointer-events-auto z-30 max-w-xs">
        <div className="text-xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-red-300">Gravitational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-green-300">Electromagnetic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-blue-300">Temporal</span>
          </div>
        </div>
      </div>
    </section>
  );
}
