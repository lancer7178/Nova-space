"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import DestinationFrame from "@/components/universe/DestinationFrame";

const AuroraWaves = () => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!linesRef.current) return;

    // Create aurora lines
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions: number[] = [];

      for (let x = -50; x <= 50; x += 2) {
        positions.push(x);
        positions.push(Math.sin(x / 10 + i) * 8 + i * 0.8);
        positions.push(0);
      }

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHSL(0.5 + i * 0.01, 1, 0.6),
        linewidth: 2,
        transparent: true,
        opacity: 0.7,
      });

      const line = new THREE.Line(geometry, material);
      linesRef.current.add(line);
    }
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3;
    }

    if (linesRef.current) {
      linesRef.current.children.forEach((line, index) => {
        if (line instanceof THREE.Line) {
          const material = line.material as THREE.LineBasicMaterial;
          const t = state.clock.getElapsedTime();
          const hue = (0.5 + index * 0.01 + t * 0.2) % 1;
          if (material.color) {
            material.color.setHSL(hue, 1, 0.6);
          }
          material.opacity = 0.5 + Math.sin(t + index) * 0.3;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={linesRef} />
    </group>
  );
};

const AuroraSphere = ({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x += speed * 0.01;
      ref.current.rotation.y += speed * 0.02;
      ref.current.scale.setScalar(
        1 + (hovered ? 0.25 : 0) + Math.sin(t * 2) * 0.08,
      );
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      castShadow
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.6}
        metalness={0.6}
        roughness={0.3}
        wireframe={false}
      />
    </mesh>
  );
};

const ParticleField = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 2000;
  const particles = useRef<THREE.Vector3[]>([]);

  useEffect(() => {
    particles.current = Array.from({ length: particleCount }, () => {
      return new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 50,
      );
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current && particles.current.length > 0) {
      const t = state.clock.getElapsedTime();
      particles.current.forEach((particle, index) => {
        particle.y += Math.sin(t + index) * 0.01;
        if (particle.y > 20) particle.y = -20;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.current.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]} scale={0.05}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={`hsl(${200 + (i % 50)}, 100%, 70%)`} />
        </mesh>
      ))}
    </group>
  );
};

export default function Aurora3DSection() {
  return (
    <DestinationFrame id="aurora-3d">
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 10, 30], fov: 55 }} shadows>
          <color attach="background" args={["#001a33"]} />
          <AuroraWaves />
          <AuroraSphere position={[-15, 0, 0]} color="#00ff88" speed={0.5} />
          <AuroraSphere position={[15, 0, 0]} color="#00d9ff" speed={0.7} />
          <AuroraSphere position={[0, 15, 0]} color="#00ffaa" speed={0.4} />
          <ParticleField />
          <Stars
            radius={300}
            depth={50}
            count={1000}
            factor={4}
            fade
            speed={0.2}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 20, 20]} intensity={2} color="#00ff88" />
          <pointLight
            position={[-20, 10, 15]}
            intensity={1.5}
            color="#00d9ff"
          />
          <pointLight position={[20, 10, 15]} intensity={1.5} color="#00ffaa" />
          <OrbitControls autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>
    </DestinationFrame>
  );
}
