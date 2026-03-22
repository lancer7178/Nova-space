"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

function CometHead({
  startPos,
  direction,
  speed,
  color,
}: {
  startPos: [number, number, number];
  direction: [number, number, number];
  speed: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = ((state.clock.elapsedTime * speed) % 60) - 30;
    if (meshRef.current) {
      meshRef.current.position.x = startPos[0] + direction[0] * t;
      meshRef.current.position.y = startPos[1] + direction[1] * t;
      meshRef.current.position.z = startPos[2] + direction[2] * t;
    }
    if (glowRef.current) {
      glowRef.current.position.copy(meshRef.current!.position);
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.2;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </>
  );
}

function CometTail({
  startPos,
  direction,
  speed,
  color,
}: {
  startPos: [number, number, number];
  direction: [number, number, number];
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => new Float32Array(count * 3), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime * speed) % 60) - 30;

    const headX = startPos[0] + direction[0] * t;
    const headY = startPos[1] + direction[1] * t;
    const headZ = startPos[2] + direction[2] * t;

    const posAttr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const trailFactor = (i / count) * 5;
      posAttr.setXYZ(
        i,
        headX -
          direction[0] * trailFactor +
          (Math.random() - 0.5) * trailFactor * 0.3,
        headY -
          direction[1] * trailFactor +
          (Math.random() - 0.5) * trailFactor * 0.3,
        headZ -
          direction[2] * trailFactor +
          (Math.random() - 0.5) * trailFactor * 0.3,
      );
    }
    posAttr.needsUpdate = true;
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
        size={0.06}
        color={color}
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Comet(props: {
  startPos: [number, number, number];
  direction: [number, number, number];
  speed: number;
  color: string;
}) {
  return (
    <>
      <CometHead {...props} />
      <CometTail {...props} />
    </>
  );
}

const COMETS = [
  {
    startPos: [-15, 8, -5] as [number, number, number],
    direction: [1, -0.3, 0.2] as [number, number, number],
    speed: 2.5,
    color: "#88CCFF",
  },
  {
    startPos: [20, -3, -8] as [number, number, number],
    direction: [-1, 0.15, 0.3] as [number, number, number],
    speed: 1.8,
    color: "#99DDFF",
  },
  {
    startPos: [-10, -6, 5] as [number, number, number],
    direction: [0.8, 0.5, -0.2] as [number, number, number],
    speed: 3.0,
    color: "#AAEEFF",
  },
  {
    startPos: [5, 15, -10] as [number, number, number],
    direction: [-0.3, -1, 0.4] as [number, number, number],
    speed: 2.0,
    color: "#77BBEE",
  },
  {
    startPos: [-20, 2, 10] as [number, number, number],
    direction: [1, -0.1, -0.5] as [number, number, number],
    speed: 1.5,
    color: "#66AADD",
  },
  {
    startPos: [12, 10, -15] as [number, number, number],
    direction: [-0.6, -0.7, 0.3] as [number, number, number],
    speed: 2.2,
    color: "#BBDDFF",
  },
];

function IceDust() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#CCDDFF" transparent opacity={0.4} />
    </points>
  );
}

export default function CometsSection() {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-20 md:pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Comets
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-300 text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Frozen wanderers blazing across the sky — icy bodies trailing
          brilliant tails of gas and dust
        </motion.p>
      </div>

      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 0, 20], fov: 65 }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[30, 20, 10]} intensity={1.5} color="#FFFFFF" />
        <Stars radius={200} depth={80} count={3000} factor={4} fade />
        <OrbitControls enableZoom={true} />
        {COMETS.map((comet, i) => (
          <Comet key={i} {...comet} />
        ))}
        <IceDust />
      </Canvas>
    </section>
  );
}
