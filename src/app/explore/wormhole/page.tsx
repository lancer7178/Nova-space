"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import DestinationFrame from "@/components/universe/DestinationFrame";

/**
 * Flies the camera down the tunnel and back. The travel *is* the interaction —
 * so there's no free orbit here; the camera stays aimed down the throat and
 * eases (damp) between the outer mouth (z=8) and deep inside (z=-17).
 */
function TunnelTravel({ target }: { target: number }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target, 2, delta);
    camera.lookAt(0, 0, -25);
  });
  return null;
}

function WormholeTunnel() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorA = new THREE.Color("#7B2FBE");
    const colorB = new THREE.Color("#00D4FF");

    for (let i = 0; i < count; i++) {
      const t = (i / count) * 40 - 20;
      const angle = (i / count) * Math.PI * 60 + Math.random() * 0.5;
      const radius = 2 + Math.abs(t) * 0.15 + Math.random() * 0.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = t;

      const mixFactor = (t + 20) / 40;
      const color = colorA.clone().lerp(colorB, mixFactor);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.005;
      const posAttr = ref.current.geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        let z = posAttr.getZ(i);
        z += 0.05;
        if (z > 20) z -= 40;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WormholeRings() {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      z: -20 + i * 2,
      radius: 2.5 + Math.abs(-20 + i * 2) * 0.12,
      opacity: 0.15 - Math.abs(i - 10) * 0.01,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, i * 0.3]}>
          <ringGeometry args={[ring.radius - 0.05, ring.radius + 0.05, 64]} />
          <meshBasicMaterial
            color="#9B59B6"
            transparent
            opacity={Math.max(0.03, ring.opacity)}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function CenterGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -20]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#00D4FF" transparent opacity={0.2} />
    </mesh>
  );
}

export default function WormholeSection() {
  const [inside, setInside] = useState(false);

  return (
    <DestinationFrame
      id="wormhole"
      action={
        <button
          onClick={() => setInside((v) => !v)}
          className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm tracking-wide text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
        >
          {inside ? "↺ Travel back" : "Travel through the tunnel →"}
        </button>
      }
    >
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        camera={{ position: [0, 0, 8], fov: 70 }}
      >
        <ambientLight intensity={0.1} />
        <pointLight
          position={[0, 0, -20]}
          intensity={3}
          color="#00D4FF"
          distance={50}
        />
        <pointLight
          position={[0, 0, 0]}
          intensity={1}
          color="#9B59B6"
          distance={30}
        />
        <Stars radius={200} depth={80} count={2000} factor={4} fade />
        <TunnelTravel target={inside ? -17 : 8} />
        <WormholeTunnel />
        <WormholeRings />
        <CenterGlow />
      </Canvas>
    </DestinationFrame>
  );
}
