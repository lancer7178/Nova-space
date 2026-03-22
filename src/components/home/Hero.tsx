'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import * as THREE from 'three';

function BlackHole() {
  const accretionDiskRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Generate particles for the accretion disk
  const particles = useMemo(() => {
    const count = 8000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInner = new THREE.Color('#ffffff'); // White hot near singularity
    const colorMid = new THREE.Color('#FF8C00');   // Fiery orange in middle
    const colorOuter = new THREE.Color('#4B0082'); // Deep purple/blue on edge

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribution: denser in the middle
      const radius = 2.5 + Math.pow(Math.random(), 1.5) * 6; 
      const angle = Math.random() * Math.PI * 2;
      
      // Elliptical distortion to simulate gravitational lensing/tilt
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      // Vertical thickness (thicker further out, pinched near singularity)
      const thickness = (radius - 2.5) * 0.1;
      const y = (Math.random() - 0.5) * thickness;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // Color based on distance from singularity
      const mixRatio = (radius - 2.5) / 6;
      const mixedColor = new THREE.Color();
      
      if (mixRatio < 0.3) {
        mixedColor.copy(colorInner).lerp(colorMid, mixRatio / 0.3);
      } else {
        mixedColor.copy(colorMid).lerp(colorOuter, (mixRatio - 0.3) / 0.7);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    if (accretionDiskRef.current) {
      // Rotate the entire disk
      accretionDiskRef.current.rotation.y += delta * 0.15;
      accretionDiskRef.current.rotation.z = Math.sin(time * 0.2) * 0.05; // Subtle wobble
    }
    
    if (glowRef.current) {
      // Pulse the event horizon glow
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group rotation={[0.2, 0, 0.1]}>
      {/* Event Horizon (Pure Black Sphere) */}
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Atmospheric Gravitational Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.6, 64, 64]} />
        <meshBasicMaterial 
          color="#FFaa00" 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Accretion Disk (Particles) */}
      <points ref={accretionDiskRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particles.positions}
            count={particles.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={particles.colors}
            count={particles.colors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* Core lighting */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#FFFFFF" distance={20} />
      <pointLight position={[0, 2, 0]} intensity={1.5} color="#FF8C00" distance={15} />
      <pointLight position={[0, -2, 0]} intensity={1.5} color="#FF8C00" distance={15} />
    </group>
  );
}

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 2, 12], fov: 60 }}>
          <fog attach="fog" args={['#000000', 10, 30]} />
          <ambientLight intensity={0.1} />
          <Stars radius={150} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={0.5} 
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
          
          <BlackHole />
        </Canvas>
      </div>
      
      {/* Dark Vignette Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90 pointer-events-none z-10" />
      
      {/* Content wrapper */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="text-center"
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6">
            Explore the <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Universe
            </span>
          </h1>
          
          <motion.p
            className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Journey through galaxies, nebulae, and bizarre cosmic phenomena with interactive 3D experiences.
          </motion.p>

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <Link 
              href="/explore/solar-system" 
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-full transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative font-medium tracking-wide">Start Exploring</span>
              <svg className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
