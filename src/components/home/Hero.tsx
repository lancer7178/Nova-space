"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function EarthSection() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Earth
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthTexture = new THREE.TextureLoader().load("/earth.jpg");
    const earthMaterial = new THREE.MeshStandardMaterial({ 
      map: earthTexture,
      roughness: 0.8,
      metalness: 0.1
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Atmosphere Glow
    const atmosGeometry = new THREE.SphereGeometry(1.05, 64, 64);
    const atmosMaterial = new THREE.MeshBasicMaterial({
      color: "#4B92DB",
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmos = new THREE.Mesh(atmosGeometry, atmosMaterial);
    scene.add(atmos);

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 10000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 2000;
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.7,
      transparent: true,
      opacity: 0.8 
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Animate
    let angle = 0;
    const animate = () => {
      angle += 0.0005;
      camera.position.x = Math.sin(angle) * 4;
      camera.position.z = Math.cos(angle) * 4;
      camera.lookAt(earth.position);

      earth.rotation.y += 0.002;
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      
      {/* Dark Vignette Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black pointer-events-none" />
      
      {/* Content wrapper */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
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
