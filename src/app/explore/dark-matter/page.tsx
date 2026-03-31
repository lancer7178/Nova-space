"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useRef, useMemo, useState } from "react";

const DarkMatterParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 3000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0002;
      pointsRef.current.rotation.y += 0.0003;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={particles}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#2d0a4e"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const DarkMatterOrb = ({
  position,
  size = 2,
}: {
  position: [number, number, number];
  size?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.003;
      ref.current.scale.setScalar(1 + (hovered ? 0.2 : 0) + Math.sin(t) * 0.05);
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      castShadow
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "#6b0ac8" : "#2d0a4e"}
        emissive="#4a0080"
        emissiveIntensity={hovered ? 0.8 : 0.4}
        metalness={0.8}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
};

const GeometricShapes = () => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.3) * 0.5;
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Octahedron */}
      <mesh position={[-8, 5, 0]} castShadow>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#4a0080"
          emissive="#7a2be2"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Tetrahedron */}
      <mesh position={[8, 5, 0]} castShadow>
        <tetrahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#6b0ac8"
          emissive="#9d4edd"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Icosahedron */}
      <mesh position={[0, -5, 0]} castShadow>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial
          color="#3c096c"
          emissive="#5a189a"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
};

export default function DarkMatterSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white relative z-10 overflow-hidden">
      <div className="w-full h-[100vh]">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }} shadows>
          <color attach="background" args={["#0a0014"]} />
          <DarkMatterParticles />
          <DarkMatterOrb position={[-10, 0, 0]} size={3} />
          <DarkMatterOrb position={[10, 0, 0]} size={2} />
          <DarkMatterOrb position={[0, 8, 0]} size={1.5} />
          <GeometricShapes />
          <Stars
            radius={100}
            depth={50}
            count={1000}
            factor={4}
            fade
            speed={0.5}
          />
          <ambientLight intensity={0.3} />
          <pointLight position={[-10, 10, 10]} intensity={1} color="#6b0ac8" />
          <pointLight position={[10, 10, 10]} intensity={1} color="#4a0080" />
          <OrbitControls autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-20 px-6 pt-20 md:pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Dark Matter & Black Energy
        </motion.h2>
        <motion.p
          className="text-center text-purple-200 text-sm md:text-base max-w-2xl mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Explore the invisible forces that bind and expand the universe.
          Discover the mysteries of dark matter and the enigmatic dark energy
          driving cosmic acceleration.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 pointer-events-none z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-2 h-2 rounded-full bg-purple-500" />
        <div className="w-2 h-2 rounded-full bg-purple-400" />
        <div className="w-2 h-2 rounded-full bg-purple-500" />
      </motion.div>
    </section>
  );
}
