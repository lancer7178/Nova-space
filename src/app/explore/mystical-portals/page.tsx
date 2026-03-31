"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useRef, useState } from "react";

const Portal = ({
  position,
  color,
  rotation,
}: {
  position: [number, number, number];
  color: string;
  rotation: [number, number, number];
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x =
        rotation[0] + state.clock.getElapsedTime() * 0.3;
      groupRef.current.rotation.y =
        rotation[1] + state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.z =
        rotation[2] + state.clock.getElapsedTime() * 0.15;
    }
    if (torusRef.current) {
      torusRef.current.scale.setScalar(
        1 +
          (hovered ? 0.3 : 0) +
          Math.sin(state.clock.getElapsedTime() * 2) * 0.1,
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Outer torus */}
      <mesh ref={torusRef}>
        <torusGeometry args={[3, 0.4, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.6}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <torusGeometry args={[3, 0.2, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      {/* Center sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1 : 0.5}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

const PortalParticles = ({
  portalPosition,
  color,
}: {
  portalPosition: [number, number, number];
  color: string;
}) => {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const count = 100;

  useFrame((state) => {
    if (particlesRef.current) {
      const t = state.clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const distance = 4 + Math.sin(t + i) * 1;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(t + i) * 3;
        const z = Math.sin(angle) * distance;

        const matrix = new THREE.Matrix4();
        matrix.setPosition(
          portalPosition[0] + x,
          portalPosition[1] + y,
          portalPosition[2] + z,
        );
        particlesRef.current.setMatrixAt(i, matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={particlesRef}
      args={[new THREE.SphereGeometry(0.1, 8, 8), undefined, count]}
    >
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
      />
    </instancedMesh>
  );
};

export default function MysticalPortalsSection() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white relative z-10 overflow-hidden">
      <div className="w-full h-[100vh]">
        <Canvas camera={{ position: [0, 0, 20], fov: 50 }} shadows>
          <color attach="background" args={["#0a0514"]} />
          <Portal
            position={[-10, 5, 0]}
            color="#ff006e"
            rotation={[0.5, 0.3, 0.2]}
          />
          <Portal
            position={[10, 5, 0]}
            color="#00d9ff"
            rotation={[0.2, 0.5, 0.3]}
          />
          <Portal
            position={[0, -8, 0]}
            color="#ffd60a"
            rotation={[0.3, 0.2, 0.5]}
          />
          <PortalParticles portalPosition={[-10, 5, 0]} color="#ff006e" />
          <PortalParticles portalPosition={[10, 5, 0]} color="#00d9ff" />
          <PortalParticles portalPosition={[0, -8, 0]} color="#ffd60a" />
          <Stars
            radius={200}
            depth={50}
            count={1000}
            factor={4}
            fade
            speed={0.5}
          />
          <ambientLight intensity={0.4} />
          <pointLight position={[-10, 5, 10]} intensity={2} color="#ff006e" />
          <pointLight position={[10, 5, 10]} intensity={2} color="#00d9ff" />
          <pointLight position={[0, -8, 10]} intensity={2} color="#ffd60a" />
          <OrbitControls autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-20 px-6 pt-20 md:pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Mystical Portals
        </motion.h2>
        <motion.p
          className="text-center text-purple-200 text-sm md:text-base max-w-2xl mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Step through dimensional gateways and witness the convergence of
          parallel realities. Each portal reveals new worlds and infinite
          possibilities.
        </motion.p>
      </div>
    </section>
  );
}
