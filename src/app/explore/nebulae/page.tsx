// components/NebulaeSection.jsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls, Cloud } from "@react-three/drei";
import { motion } from "framer-motion";

const Nebula = () => (
  <>
    {/* سحابة سديمية كبيرة */}
    <Cloud
      segments={100}
      bounds={[15, 10, 5]}
      volume={10}
      opacity={0.3}
      color="#e0727d"
      fade={100}
    />
    <Cloud
      segments={70}
      bounds={[10, 10, 5]}
      volume={7}
      opacity={0.2}
      color="#ff99cc"
      fade={80}
      position={[5, 3, -2]}
    />
  </>
);

export default function NebulaeSection() {
  return (
    <section className="w-full min-h-screen bg-black text-white relative z-10">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start z-10 px-6 pt-12 pointer-events-none">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold text-center text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Nebulae{" "}
        </motion.h2>
      </div>

      <div className="w-full h-[100vh]">
        <Canvas
          camera={{ position: [0, 0, 25], fov: 50 }}
          style={{ background: "#000" }}
        >
          <fog attach="fog" args={["#0a0a0a", 20, 80]} />
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#ff99cc" />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
          />
          <OrbitControls enableZoom={true} />
          <Nebula />
        </Canvas>
      </div>
    </section>
  );
}
