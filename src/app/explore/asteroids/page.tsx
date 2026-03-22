"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

function Asteroid({
  position,
  size,
  speed,
  rotationAxis,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  rotationAxis: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef(0);
  const orbitRadius = Math.sqrt(position[0] ** 2 + position[2] ** 2);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed * rotationAxis[0];
      meshRef.current.rotation.y += delta * speed * rotationAxis[1];
      meshRef.current.rotation.z += delta * speed * rotationAxis[2];

      orbitRef.current += delta * speed * 0.3;
      meshRef.current.position.x = Math.cos(orbitRef.current) * orbitRadius;
      meshRef.current.position.z = Math.sin(orbitRef.current) * orbitRadius;
      meshRef.current.position.y =
        position[1] + Math.sin(orbitRef.current * 2) * 0.5;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.DodecahedronGeometry(size, 1);
    const positionAttr = geo.attributes.position;
    for (let i = 0; i < positionAttr.count; i++) {
      const x = positionAttr.getX(i);
      const y = positionAttr.getY(i);
      const z = positionAttr.getZ(i);
      const noise = (Math.random() - 0.5) * size * 0.4;
      positionAttr.setXYZ(i, x + noise, y + noise, z + noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, [size]);

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial
        color={new THREE.Color().setHSL(
          0.08 + Math.random() * 0.05,
          0.3,
          0.25 + Math.random() * 0.15,
        )}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

function AsteroidBelt() {
  const asteroids = useMemo(() => {
    const items = [];
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const radius = 6 + Math.random() * 8;
      items.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 3,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        size: 0.15 + Math.random() * 0.5,
        speed: 0.3 + Math.random() * 0.8,
        rotationAxis: [Math.random(), Math.random(), Math.random()] as [
          number,
          number,
          number,
        ],
      });
    }
    return items;
  }, []);

  return (
    <>
      {asteroids.map((a, i) => (
        <Asteroid key={i} {...a} />
      ))}
    </>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 10;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] =
        Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#8B7355" transparent opacity={0.6} />
    </points>
  );
}

export default function AsteroidsSection() {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-20 md:pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Asteroid Belt
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Navigate through a field of tumbling space rocks orbiting between Mars
          and Jupiter
        </motion.p>
      </div>

      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 8, 20], fov: 60 }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[20, 15, 10]} intensity={1.5} color="#FFF5E0" />
        <pointLight position={[-10, -5, -10]} intensity={0.4} color="#FFD700" />
        <Stars radius={200} depth={80} count={3000} factor={4} fade />
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.3} />
        <AsteroidBelt />
        <Dust />
      </Canvas>
    </section>
  );
}
