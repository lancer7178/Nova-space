// components/NebulaeSection.jsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls, Cloud } from "@react-three/drei";
import DestinationFrame from "@/components/universe/DestinationFrame";

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
    <DestinationFrame id="nebulae">
      <div className="w-full h-full">
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
    </DestinationFrame>
  );
}
