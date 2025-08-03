"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useMemo } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

const Constellation = () => {
  const stars = useMemo(
    () => [
      [0, 0, 0],
      [2, 2, -1],
      [4, 1, 0],
      [6, 3, -2],
      [8, 0, 1],
    ],
    []
  );

  return (
    <>
      {stars.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#88ccff"
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}

      {stars.slice(0, -1).map((start, i) => {
        const end = stars[i + 1];
        const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: "#334c66" }); // لون داكن
        const line = new THREE.Line(geometry, material);

        return <primitive key={`line-${i}`} object={line} />;
      })}
    </>
  );
};

export default function ConstellationsSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white relative z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Constellations{" "}
        </motion.h2>
      </div>

      <div className="w-full h-screen">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
          />
          <OrbitControls enableZoom={true} enablePan={false} />
          <Constellation />
        </Canvas>
      </div>
    </section>
  );
}
