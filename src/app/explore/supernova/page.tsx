'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function SupernovaCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 3) * 0.15;
      coreRef.current.scale.setScalar(pulse);
    }
    if (glowRef.current) {
      const glow = 1.5 + Math.sin(t * 2) * 0.3;
      glowRef.current.scale.setScalar(glow);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.12 + Math.sin(t * 4) * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#FFE066" transparent opacity={0.15} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={5} color="#FFD700" distance={40} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FF4500" distance={60} />
    </group>
  );
}

function ExplosionShell({ radius, count, color, speed, sizeVal }: {
  radius: number;
  count: number;
  color: string;
  speed: number;
  sizeVal: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.8 + Math.random() * 0.4);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      vel[i * 3] = pos[i * 3] * speed;
      vel[i * 3 + 1] = pos[i * 3 + 1] * speed;
      vel[i * 3 + 2] = pos[i * 3 + 2] * speed;
    }
    return { positions: pos, velocities: vel };
  }, [count, radius, speed]);

  useFrame((_, delta) => {
    if (ref.current) {
      const posAttr = ref.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const x = posAttr.getX(i) + velocities[i * 3] * delta;
        const y = posAttr.getY(i) + velocities[i * 3 + 1] * delta;
        const z = posAttr.getZ(i) + velocities[i * 3 + 2] * delta;

        const dist = Math.sqrt(x * x + y * y + z * z);
        if (dist > radius * 3) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = radius * (0.3 + Math.random() * 0.3);
          posAttr.setXYZ(
            i,
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          );
        } else {
          posAttr.setXYZ(i, x, y, z);
        }
      }
      posAttr.needsUpdate = true;
      ref.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={sizeVal}
        color={color}
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SupernovaSection() {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Supernova
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Witness the violent death of a massive star — an explosion brighter than entire galaxies
        </motion.p>
      </div>

      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 0, 18], fov: 60 }}
      >
        <ambientLight intensity={0.1} />
        <Stars radius={200} depth={80} count={3000} factor={4} fade />
        <OrbitControls enableZoom={true} />
        <SupernovaCore />
        <ExplosionShell radius={2} count={2000} color="#FFFFFF" speed={0.08} sizeVal={0.08} />
        <ExplosionShell radius={3.5} count={1500} color="#FFD700" speed={0.06} sizeVal={0.1} />
        <ExplosionShell radius={5.5} count={1200} color="#FF8C00" speed={0.04} sizeVal={0.12} />
        <ExplosionShell radius={8} count={800} color="#FF4500" speed={0.03} sizeVal={0.15} />
        <ExplosionShell radius={10} count={500} color="#8B0000" speed={0.02} sizeVal={0.18} />
      </Canvas>
    </section>
  );
}
