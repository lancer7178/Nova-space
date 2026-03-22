'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function WormholeTunnel() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorA = new THREE.Color('#7B2FBE');
    const colorB = new THREE.Color('#00D4FF');

    for (let i = 0; i < count; i++) {
      const t = (i / count) * 40 - 20;
      const angle = (i / count) * Math.PI * 60 + Math.random() * 0.5;
      const radius = 2 + Math.abs(t) * 0.15 + Math.random() * 0.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = t;

      const mixFactor = (t + 20) / 40;
      const color = colorA.clone().lerp(colorB, mixFactor);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z += 0.005;
      const posAttr = ref.current.geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        let z = posAttr.getZ(i);
        z += 0.05;
        if (z > 20) z -= 40;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={particles.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={particles.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WormholeRings() {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      z: -20 + i * 2,
      radius: 2.5 + Math.abs(-20 + i * 2) * 0.12,
      opacity: 0.15 - Math.abs(i - 10) * 0.01,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, i * 0.3]}>
          <ringGeometry args={[ring.radius - 0.05, ring.radius + 0.05, 64]} />
          <meshBasicMaterial
            color="#9B59B6"
            transparent
            opacity={Math.max(0.03, ring.opacity)}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function CenterGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -20]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#00D4FF" transparent opacity={0.2} />
    </mesh>
  );
}

export default function WormholeSection() {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Wormhole
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          A shortcut through spacetime — spiraling through a tunnel that connects distant corners of the universe
        </motion.p>
      </div>

      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 0, 8], fov: 70 }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, -20]} intensity={3} color="#00D4FF" distance={50} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#9B59B6" distance={30} />
        <Stars radius={200} depth={80} count={2000} factor={4} fade />
        <OrbitControls enableZoom={true} />
        <WormholeTunnel />
        <WormholeRings />
        <CenterGlow />
      </Canvas>
    </section>
  );
}
