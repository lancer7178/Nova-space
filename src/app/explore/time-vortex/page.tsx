"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";

const TimeRing = ({
  index,
  rotation,
}: {
  index: number;
  rotation: THREE.Euler;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const radius = 5 + index * 1.5;
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x = rotation.x;
      ref.current.rotation.y +=
        (hovered ? 0.008 : 0.003) * (index % 2 === 0 ? 1 : -1);
      ref.current.rotation.z = rotation.z + Math.sin(t + index) * 0.1;
      ref.current.scale.setScalar(1 + (hovered ? 0.15 : 0));
    }
  });

  const color = `hsl(${index * 30}, 100%, 60%)`;

  return (
    <mesh
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <torusGeometry args={[radius, 0.3, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.5}
        metalness={0.7}
        roughness={0.2}
        wireframe={hovered}
      />
    </mesh>
  );
};

const VortexCore = () => {
  const coneRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coneRef.current) {
      const t = state.clock.getElapsedTime();
      coneRef.current.rotation.z += 0.01;
      coneRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
    }
  });

  return (
    <mesh ref={coneRef} position={[0, 0, 0]} scale={[2, 4, 2]}>
      <coneGeometry args={[2, 5, 32, 32]} />
      <meshStandardMaterial
        color="#ff00ff"
        emissive="#ff00ff"
        emissiveIntensity={0.8}
        metalness={0.6}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
};

const TimeParticles = () => {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const count = 150;

  const initialPositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const distance = 8 + Math.random() * 4;
      positions.push(
        new THREE.Vector3(
          Math.cos(angle) * distance,
          (Math.random() - 0.5) * 20,
          Math.sin(angle) * distance,
        ),
      );
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const t = state.clock.getElapsedTime();
      initialPositions.forEach((pos, i) => {
        const angle = (i / count) * Math.PI * 2 + t * 0.3;
        const distance = 8 + Math.sin(t + i) * 2;
        const matrix = new THREE.Matrix4();
        matrix.setPosition(
          Math.cos(angle) * distance,
          Math.sin(t * 2 + i) * 8,
          Math.sin(angle) * distance,
        );
        particlesRef.current!.setMatrixAt(i, matrix);
      });
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={particlesRef}
      args={[new THREE.SphereGeometry(0.15, 8, 8), undefined, count]}
    >
      <meshStandardMaterial
        color="#ffff00"
        emissive="#ffff00"
        emissiveIntensity={0.9}
      />
    </instancedMesh>
  );
};

export default function TimeVortexSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white relative z-10 overflow-hidden">
      <div className="w-full h-[100vh]">
        <Canvas camera={{ position: [0, 0, 25], fov: 50 }} shadows>
          <color attach="background" args={["#0a0a14"]} />

          {/* Time rings with different rotations */}
          <TimeRing index={0} rotation={new THREE.Euler(0.3, 0.2, 0)} />
          <TimeRing index={1} rotation={new THREE.Euler(0.5, 0.1, 0.2)} />
          <TimeRing index={2} rotation={new THREE.Euler(0.2, 0.4, 0.1)} />
          <TimeRing index={3} rotation={new THREE.Euler(0.4, 0.3, 0.3)} />
          <TimeRing index={4} rotation={new THREE.Euler(0.1, 0.5, 0.2)} />

          <VortexCore />
          <TimeParticles />

          <Stars
            radius={300}
            depth={50}
            count={1000}
            factor={4}
            fade
            speed={0.4}
          />
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 20]} intensity={2} color="#ff00ff" />
          <pointLight position={[15, 15, 15]} intensity={1.5} color="#ffff00" />
          <pointLight
            position={[-15, -15, 15]}
            intensity={1.5}
            color="#00ffff"
          />

          <OrbitControls autoRotate autoRotateSpeed={0.1} />
        </Canvas>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-20 px-6 pt-20 md:pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Time Vortex
        </motion.h2>
        <motion.p
          className="text-center text-purple-200 text-sm md:text-base max-w-2xl mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Enter a dimensional maelstrom where past, present, and future
          converge. Navigate through temporal rings and witness the flow of
          eternity.
        </motion.p>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-auto z-30">
        <motion.div
          className="bg-black/50 border border-purple-500/50 rounded-lg px-6 py-3 backdrop-blur-sm"
          animate={{
            borderColor: [
              "rgba(168, 85, 247, 0.5)",
              "rgba(168, 85, 247, 0.8)",
              "rgba(168, 85, 247, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-purple-300 text-xs font-mono">
            Temporal Coordinates: [Past ← Present → Future]
          </p>
        </motion.div>
      </div>
    </section>
  );
}
