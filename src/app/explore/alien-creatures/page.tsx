"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import DestinationFrame from "@/components/universe/DestinationFrame";

type CreatureProps = {
  position: [number, number, number];
  size?: number;
  color?: string;
};

const HorrorCreature = ({
  position,
  size = 2,
  color = "#300000",
}: CreatureProps) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = Math.sin(t / 3) * 0.3;
      ref.current.rotation.x = Math.cos(t / 4) * 0.2;
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow receiveShadow>
      <icosahedronGeometry args={[size, 2]} />
      <meshStandardMaterial
        color={color}
        emissive="#550000"
        emissiveIntensity={0.7}
        metalness={0.7}
        roughness={0.15}
        flatShading
      />
    </mesh>
  );
};

export default function AlienHorrorSection() {
  return (
    <DestinationFrame id="alien-creatures">
      <div className="w-full h-full">
        <Canvas shadows camera={{ position: [0, 5, 30], fov: 60 }}>
          {/* إضاءة مرعبة حمراء مع ظل خفيف */}
          <ambientLight intensity={0.05} />
          <pointLight
            position={[0, -5, 0]}
            intensity={3}
            color="#ff1100"
            castShadow
          />
          <spotLight
            position={[10, 15, 10]}
            angle={0.3}
            intensity={1.8}
            penumbra={1}
            castShadow
          />

          {/* نجوم خافتة لإضافة عمق */}
          <Stars radius={80} depth={50} count={1000} factor={3} fade />

          {/* ضباب أسود عميق لتعزيز الجو */}
          <fog attach="fog" args={["#000000", 8, 50]} />
          <color attach="background" args={["#000000"]} />

          {/* السماح بالتكبير والتصغير */}
          <OrbitControls enableZoom={true} minDistance={10} maxDistance={40} />

          {/* مخلوقات فضائية مرعبة */}
          <HorrorCreature position={[-15, 0, -5]} size={2.5} color="#550000" />
          <HorrorCreature position={[-7, 0.5, 3]} size={1.8} color="#330000" />
          <HorrorCreature position={[2, -1, -4]} size={3} color="#220000" />
          <HorrorCreature position={[10, 0, 5]} size={2.2} color="#440011" />
        </Canvas>
      </div>
    </DestinationFrame>
  );
}
