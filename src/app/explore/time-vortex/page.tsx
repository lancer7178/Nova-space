"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import DestinationFrame from "@/components/universe/DestinationFrame";

type NumRef = React.MutableRefObject<number>;

/**
 * A single shared "time" value drives every animation, advanced each frame by
 * delta * speed. The speed control can run it forward, pause it, speed it up,
 * or reverse it — so the whole vortex responds as one, and negative speed makes
 * the rings and particles genuinely run backward.
 */
function TimeDriver({ timeRef, speedRef }: { timeRef: NumRef; speedRef: NumRef }) {
  useFrame((_, delta) => {
    timeRef.current += delta * speedRef.current;
  });
  return null;
}

const TimeRing = ({
  index,
  rotation,
  timeRef,
  speedRef,
}: {
  index: number;
  rotation: THREE.Euler;
  timeRef: NumRef;
  speedRef: NumRef;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const radius = 5 + index * 1.5;
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (ref.current) {
      const t = timeRef.current;
      ref.current.rotation.x = rotation.x;
      ref.current.rotation.y +=
        (hovered ? 0.008 : 0.003) *
        (index % 2 === 0 ? 1 : -1) *
        speedRef.current *
        delta *
        60;
      ref.current.rotation.z = rotation.z + Math.sin(t + index) * 0.1;
      ref.current.scale.setScalar(1 + (hovered ? 0.15 : 0));
    }
  });

  const color = `hsl(${index * 30}, 100%, 60%)`;

  return (
    <mesh
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <torusGeometry args={[radius, 0.3, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.5}
        metalness={0.7}
        roughness={0.2}
        wireframe={hovered}
      />
    </mesh>
  );
};

const VortexCore = ({ timeRef, speedRef }: { timeRef: NumRef; speedRef: NumRef }) => {
  const coneRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coneRef.current) {
      coneRef.current.rotation.z += 0.01 * speedRef.current * delta * 60;
      coneRef.current.scale.setScalar(1 + Math.sin(timeRef.current * 2) * 0.1);
    }
  });

  return (
    <mesh ref={coneRef} position={[0, 0, 0]} scale={[2, 4, 2]}>
      <coneGeometry args={[2, 5, 32, 32]} />
      <meshStandardMaterial
        color="#ff00ff"
        emissive="#ff00ff"
        emissiveIntensity={0.8}
        metalness={0.6}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
};

const TimeParticles = ({ timeRef }: { timeRef: NumRef }) => {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const count = 150;

  const initialPositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const distance = 8 + Math.random() * 4;
      positions.push(
        new THREE.Vector3(
          Math.cos(angle) * distance,
          (Math.random() - 0.5) * 20,
          Math.sin(angle) * distance,
        ),
      );
    }
    return positions;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const t = timeRef.current;
      initialPositions.forEach((_, i) => {
        const angle = (i / count) * Math.PI * 2 + t * 0.3;
        const distance = 8 + Math.sin(t + i) * 2;
        const matrix = new THREE.Matrix4();
        matrix.setPosition(
          Math.cos(angle) * distance,
          Math.sin(t * 2 + i) * 8,
          Math.sin(angle) * distance,
        );
        particlesRef.current!.setMatrixAt(i, matrix);
      });
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={particlesRef}
      args={[new THREE.SphereGeometry(0.15, 8, 8), undefined, count]}
    >
      <meshStandardMaterial
        color="#ffff00"
        emissive="#ffff00"
        emissiveIntensity={0.9}
      />
    </instancedMesh>
  );
};

const SPEEDS = [
  { label: "◀◀", value: -1, title: "Reverse time" },
  { label: "❚❚", value: 0, title: "Pause time" },
  { label: "▶", value: 1, title: "Normal flow" },
  { label: "▶▶", value: 2, title: "Accelerate time" },
];

export default function TimeVortexSection() {
  const timeRef = useRef(0);
  const speedRef = useRef(1);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  return (
    <DestinationFrame
      id="time-vortex"
      action={
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">
            Flow of time
          </span>
          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md">
            {SPEEDS.map((o) => (
              <button
                key={o.value}
                onClick={() => setSpeed(o.value)}
                title={o.title}
                aria-label={o.title}
                aria-pressed={speed === o.value}
                className={`rounded-full px-4 py-2 text-sm tabular-nums transition-colors ${
                  speed === o.value
                    ? "bg-white/15 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 25], fov: 50 }} shadows>
          <color attach="background" args={["#0a0a14"]} />

          <TimeDriver timeRef={timeRef} speedRef={speedRef} />

          {/* Time rings with different rotations */}
          <TimeRing index={0} rotation={new THREE.Euler(0.3, 0.2, 0)} timeRef={timeRef} speedRef={speedRef} />
          <TimeRing index={1} rotation={new THREE.Euler(0.5, 0.1, 0.2)} timeRef={timeRef} speedRef={speedRef} />
          <TimeRing index={2} rotation={new THREE.Euler(0.2, 0.4, 0.1)} timeRef={timeRef} speedRef={speedRef} />
          <TimeRing index={3} rotation={new THREE.Euler(0.4, 0.3, 0.3)} timeRef={timeRef} speedRef={speedRef} />
          <TimeRing index={4} rotation={new THREE.Euler(0.1, 0.5, 0.2)} timeRef={timeRef} speedRef={speedRef} />

          <VortexCore timeRef={timeRef} speedRef={speedRef} />
          <TimeParticles timeRef={timeRef} />

          <Stars
            radius={300}
            depth={50}
            count={1000}
            factor={4}
            fade
            speed={0.4}
          />
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 20]} intensity={2} color="#ff00ff" />
          <pointLight position={[15, 15, 15]} intensity={1.5} color="#ffff00" />
          <pointLight
            position={[-15, -15, 15]}
            intensity={1.5}
            color="#00ffff"
          />

          <OrbitControls autoRotate autoRotateSpeed={0.1} />
        </Canvas>
      </div>
    </DestinationFrame>
  );
}
