"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import DestinationFrame from "@/components/universe/DestinationFrame";

const AnomalyCore = ({
  position,
  type,
}: {
  position: [number, number, number];
  type: "gravitational" | "electromagnetic" | "temporal";
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const colorMap = {
    gravitational: "#ff4444",
    electromagnetic: "#44ff44",
    temporal: "#4444ff",
  };

  useFrame((state) => {
    if (groupRef.current) {
      if (type === "gravitational") {
        groupRef.current.rotation.z += 0.005;
      } else if (type === "electromagnetic") {
        groupRef.current.rotation.x += 0.003;
        groupRef.current.rotation.y += 0.005;
      } else {
        groupRef.current.rotation.y += 0.002;
      }
    }

    if (coreRef.current) {
      const t = state.clock.getElapsedTime();
      if (hovered) {
        coreRef.current.scale.setScalar(1.3 + Math.sin(t * 4) * 0.2);
      } else {
        coreRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Core */}
      <mesh ref={coreRef} castShadow>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color={colorMap[type]}
          emissive={colorMap[type]}
          emissiveIntensity={hovered ? 1.5 : 0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Rings */}
      <mesh>
        <torusGeometry args={[2.5, 0.2, 16, 100]} />
        <meshStandardMaterial
          color={colorMap[type]}
          emissive={colorMap[type]}
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Outer shell */}
      <mesh>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial
          color={colorMap[type]}
          wireframe
          opacity={hovered ? 0.8 : 0.4}
          transparent
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

const DistortionField = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} scale={3}>
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#ffaa00"
          wireframe
          emissive="#ffaa00"
          emissiveIntensity={0.5}
          opacity={0.3}
          transparent
        />
      </mesh>
    </group>
  );
};

export default function SpaceAnomaliesSection() {
  return (
    <DestinationFrame id="space-anomalies">
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 25], fov: 50 }} shadows>
          <color attach="background" args={["#0a0a0a"]} />
          <AnomalyCore position={[-12, 8, 0]} type="gravitational" />
          <AnomalyCore position={[12, 8, 0]} type="electromagnetic" />
          <AnomalyCore position={[0, -6, 0]} type="temporal" />
          <DistortionField />
          <Stars
            radius={200}
            depth={50}
            count={1200}
            factor={4}
            fade
            speed={0.5}
          />
          <ambientLight intensity={0.3} />
          <pointLight position={[-12, 8, 15]} intensity={2} color="#ff4444" />
          <pointLight position={[12, 8, 15]} intensity={2} color="#44ff44" />
          <pointLight position={[0, -6, 15]} intensity={2} color="#4444ff" />
          <OrbitControls autoRotate autoRotateSpeed={0.4} />
        </Canvas>
      </div>
    </DestinationFrame>
  );
}
