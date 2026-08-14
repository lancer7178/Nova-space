"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import DestinationFrame from "@/components/universe/DestinationFrame";

export default function BlackHolePage() {
  return (
    <DestinationFrame id="black-hole">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Suspense fallback={null}>
          <BlackHole />
        </Suspense>
        <OrbitControls enableZoom={true} />
        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
        />
      </Canvas>
    </DestinationFrame>
  );
}

function BlackHole() {
  return (
    <>
      {/* Core black hole */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Accretion Disk */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.4, 2, 100]} />
        <meshStandardMaterial
          color="#27272A"
          emissive="#27272A"
          emissiveIntensity={2}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
    </>
  );
}
