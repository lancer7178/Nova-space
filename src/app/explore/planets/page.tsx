"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Html, SoftShadows } from "@react-three/drei";
import { motion } from "framer-motion";

type Planet = {
  name: string;
  position: [number, number, number];
  size: number;
  color: string;
};

const planets: Planet[] = [
  { name: "Mercury", position: [-10, 0, 0], size: 0.5, color: "#a3a3a3" },
  { name: "Venus", position: [-6, 0, 0], size: 0.9, color: "#e0c16c" },
  { name: "Earth", position: [-2, 0, 0], size: 1, color: "#2e80ff" },
  { name: "Moon", position: [0.5, 0.5, 0], size: 0.25, color: "#cccccc" },
  { name: "Mars", position: [3, 0, 0], size: 0.8, color: "#c1440e" },
  { name: "Jupiter", position: [7, 0, 0], size: 2, color: "#f4c542" },
  { name: "Saturn", position: [12, 0, 0], size: 1.7, color: "#d9b382" },
  { name: "Uranus", position: [16, 0, 0], size: 1.2, color: "#8fd3f4" },
  { name: "Neptune", position: [20, 0, 0], size: 1.1, color: "#4169e1" },
];

const PlanetSystem = () => {
  return (
    <>
      {planets.map((planet, index) => (
        <mesh key={index} position={planet.position} castShadow receiveShadow>
          <sphereGeometry args={[planet.size, 64, 64]} />
          <meshStandardMaterial
            color={planet.color}
            roughness={0.3}
            metalness={0.1}
          />
          <Html
            position={[0, planet.size + 0.8, 0]}
            center
            distanceFactor={8}
            style={{
              pointerEvents: "none",
              fontSize: "0.8rem",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              textShadow: "0 0 5px black",
            }}
          >
            {planet.name}
          </Html>
        </mesh>
      ))}
    </>
  );
};

export default function PlanetsSection() {
  return (
    <section className="w-full h-screen relative z-10 bg-black text-white overflow-hidden">
      <Canvas camera={{ position: [0, 5, 25], fov: 45 }} shadows>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} castShadow />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <OrbitControls enableZoom={true} />
        <SoftShadows size={10} samples={30} focus={1} />
        <PlanetSystem />
        <Html center position={[5, 6, 0]}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white text-center"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            The Solar System
          </motion.h2>
        </Html>
      </Canvas>
    </section>
  );
}
