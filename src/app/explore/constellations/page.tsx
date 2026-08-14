"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import DestinationFrame from "@/components/universe/DestinationFrame";

const Constellation = () => {
  const stars = useMemo(
    () => [
      [0, 0, 0],
      [2, 2, -1],
      [4, 1, 0],
      [6, 3, -2],
      [8, 0, 1],
    ],
    [],
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
    <DestinationFrame id="constellations">
      <div className="w-full h-full">
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
    </DestinationFrame>
  );
}
