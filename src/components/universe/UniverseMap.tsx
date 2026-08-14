"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { DESTINATIONS, TOTAL_DESTINATIONS, getDestination } from "@/lib/destinations";
import { useDiscovery } from "@/components/universe/DiscoveryProvider";

/* -------------------------------------------------------------------------- */
/*  Layout: deterministic golden-spiral placement on a slightly flattened     */
/*  shell, so the map is a stable "place" that looks the same on every visit.  */
/* -------------------------------------------------------------------------- */

type Node = {
  id: string;
  name: string;
  color: string;
  pos: THREE.Vector3;
};

function useNodes(): Node[] {
  return useMemo(() => {
    const n = DESTINATIONS.length;
    const golden = Math.PI * (1 + Math.sqrt(5));
    return DESTINATIONS.map((d, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = golden * i;
      const r = 9 + ((i * 2.3) % 5); // vary radius 9–14 for depth
      return {
        id: d.id,
        name: d.name,
        color: d.color,
        pos: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.7, // flatten vertically → galactic-disk feel
          r * Math.sin(phi) * Math.sin(theta),
        ),
      };
    });
  }, []);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* -------------------------------------------------------------------------- */
/*  A single destination node                                                 */
/* -------------------------------------------------------------------------- */

function DestinationNode({
  node,
  discovered,
  hovered,
  dimmed,
  onHover,
  onSelect,
}: {
  node: Node;
  discovered: boolean;
  hovered: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (haloRef.current) {
      const pulse =
        1 + Math.sin(t * 1.5 + node.pos.x) * (hovered ? 0.18 : 0.07);
      haloRef.current.scale.setScalar(pulse * (hovered ? 1.5 : 1));
    }
  });

  // Undiscovered nodes stay pale and mysterious; discovered ones glow in colour.
  const coreColor = discovered ? node.color : "#8fa3c8";
  const targetOpacity = dimmed ? 0.25 : 1;
  const showLabel = discovered || hovered;

  return (
    <group position={node.pos}>
      {/* invisible larger hit area for comfortable clicking/tapping */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
      >
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* glowing core */}
      <mesh ref={coreRef} scale={hovered ? 1.35 : 1}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={targetOpacity}
          toneMapped={false}
        />
      </mesh>

      {/* soft halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial
          color={coreColor}
          transparent
          opacity={0.18 * targetOpacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {showLabel && (
        <Html
          center
          distanceFactor={18}
          position={[0, 0.7, 0]}
          style={{ pointerEvents: "none", userSelect: "none" }}
          zIndexRange={[20, 0]}
        >
          <div
            className={`whitespace-nowrap text-center transition-opacity duration-300 ${
              dimmed ? "opacity-40" : "opacity-100"
            }`}
          >
            <span
              className="text-[13px] font-medium tracking-wide"
              style={{ color: discovered ? "#fff" : "#c3cee0" }}
            >
              {discovered ? node.name : "Unknown signal"}
            </span>
            {discovered && (
              <span className="ml-1.5 text-[11px] text-emerald-300/90">✓</span>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Camera rig — idle drift via OrbitControls, cinematic fly-to on select     */
/* -------------------------------------------------------------------------- */

function CameraRig({
  nodes,
  travelId,
  reducedMotion,
  onArrive,
}: {
  nodes: Node[];
  travelId: string | null;
  reducedMotion: boolean;
  onArrive: (id: string) => void;
}) {
  const { camera } = useThree();
  const state = useRef<{ from: THREE.Vector3; t: number; fired: boolean } | null>(
    null,
  );

  useFrame((_, delta) => {
    if (!travelId) {
      state.current = null;
      return;
    }
    const node = nodes.find((n) => n.id === travelId);
    if (!node) return;

    if (!state.current) {
      state.current = { from: camera.position.clone(), t: 0, fired: false };
    }
    const s = state.current;
    const duration = reducedMotion ? 0.35 : 1.15;
    s.t = Math.min(s.t + delta / duration, 1);

    const dest = node.pos.clone().multiplyScalar(1.35); // arrive just beyond it
    camera.position.lerpVectors(s.from, dest, easeInOutCubic(s.t));
    camera.lookAt(node.pos);

    if (s.t >= 1 && !s.fired) {
      s.fired = true;
      onArrive(node.id);
    }
  });

  return null;
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                      */
/* -------------------------------------------------------------------------- */

function Scene({
  nodes,
  hoveredId,
  travelId,
  reducedMotion,
  isMobile,
  onHover,
  onSelect,
  onArrive,
}: {
  nodes: Node[];
  hoveredId: string | null;
  travelId: string | null;
  reducedMotion: boolean;
  isMobile: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  onArrive: (id: string) => void;
}) {
  const { isDiscovered } = useDiscovery();

  return (
    <>
      <ambientLight intensity={0.2} />
      <Stars
        radius={160}
        depth={60}
        count={isMobile ? 2500 : 6000}
        factor={4}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.4}
      />

      {/* "You are here" — the origin the user departs from */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {nodes.map((node) => (
        <DestinationNode
          key={node.id}
          node={node}
          discovered={isDiscovered(node.id)}
          hovered={hoveredId === node.id}
          dimmed={hoveredId !== null && hoveredId !== node.id}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        enabled={!travelId}
        enablePan={false}
        enableZoom
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.25}
        minDistance={8}
        maxDistance={30}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />

      <CameraRig
        nodes={nodes}
        travelId={travelId}
        reducedMotion={reducedMotion}
        onArrive={onArrive}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Overlays + orchestration                                                   */
/* -------------------------------------------------------------------------- */

export default function UniverseMap() {
  const router = useRouter();
  const nodes = useNodes();
  const reducedMotion = usePrefersReducedMotion();
  const { discovered, lastId, ready } = useDiscovery();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [travelId, setTravelId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showList, setShowList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    // Reveal the map on the next frame; no artificial delay.
    const raf = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Show the controls hint briefly the first time, then let it fade.
  useEffect(() => {
    if (!loaded) return;
    if (localStorage.getItem("nova-space:hinted") === "1") return;
    setShowHint(true);
    const t = setTimeout(() => {
      setShowHint(false);
      try {
        localStorage.setItem("nova-space:hinted", "1");
      } catch {
        /* ignore */
      }
    }, 5000);
    return () => clearTimeout(t);
  }, [loaded]);

  const select = useCallback((id: string) => {
    setHoveredId(null);
    setTravelId(id);
    document.body.style.cursor = "auto";
  }, []);

  const arrive = useCallback(
    (id: string) => {
      router.push(`/explore/${id}`);
    },
    [router],
  );

  const hovered = hoveredId ? getDestination(hoveredId) : null;
  const traveling = travelId !== null;
  const count = discovered.length;
  const last = lastId ? getDestination(lastId) : null;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black text-white">
      <Canvas
        camera={{ position: [0, 3, 22], fov: 55 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#000000", 24, 46]} />
        <Scene
          nodes={nodes}
          hoveredId={hoveredId}
          travelId={travelId}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
          onHover={setHoveredId}
          onSelect={select}
          onArrive={arrive}
        />
      </Canvas>

      {/* Loading veil — initializing deep space */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.35em] text-gray-400 uppercase">
              Initializing deep space
            </span>
            <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full w-full bg-white/60"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Travel fade — cinematic hand-off into the destination */}
      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-black transition-opacity ${
          traveling ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: reducedMotion ? "300ms" : "1100ms" }}
      />

      {/* ------------------------------------------------------------------ */}
      {/*  UI overlays (kept minimal — cosmic, not a HUD)                     */}
      {/* ------------------------------------------------------------------ */}

      {/* Discovery counter */}
      <div className="pointer-events-none absolute left-6 top-24 z-30 select-none md:left-10">
        <div className="font-mono text-[11px] tracking-[0.3em] text-gray-500 uppercase">
          Discovered
        </div>
        <div className="mt-1 font-mono text-2xl font-light tabular-nums text-white/90">
          {String(count).padStart(2, "0")}
          <span className="text-gray-600"> / {TOTAL_DESTINATIONS}</span>
        </div>
      </div>

      {/* You are here */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 select-none text-center">
        <span className="font-mono text-[10px] tracking-[0.4em] text-gray-500 uppercase">
          You are here
        </span>
      </div>

      {/* Hovered destination read-out */}
      <AnimatePresence>
        {hovered && !traveling && (
          <motion.div
            key={hovered.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute bottom-20 left-1/2 z-30 w-[min(90vw,520px)] -translate-x-1/2 text-center"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {hovered.name}
            </h2>
            <p className="mt-1 text-sm text-gray-400">{hovered.tagline}</p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase">
              Sector / {hovered.sector} &nbsp;·&nbsp; Click to enter
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First-time controls hint */}
      <AnimatePresence>
        {showHint && !traveling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute right-6 top-24 z-30 text-right font-mono text-[10px] leading-relaxed tracking-[0.25em] text-gray-500 uppercase md:right-10"
          >
            <div>Drag to explore</div>
            <div>Scroll to approach</div>
            <div>Click to enter</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue exploring */}
      {ready && last && !traveling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-8 right-6 z-30 text-right md:right-10"
        >
          <div className="font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase">
            Continue exploring
          </div>
          <button
            onClick={() => select(last.id)}
            className="mt-1 text-sm text-gray-300 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {last.name} →
          </button>
        </motion.div>
      )}

      {/* Accessible destination list (fallback explorer) */}
      <button
        onClick={() => setShowList((v) => !v)}
        className="absolute left-6 bottom-8 z-30 font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase underline-offset-4 transition-colors hover:text-white hover:underline md:left-10"
      >
        {showList ? "Hide list" : "Destination list"}
      </button>

      <AnimatePresence>
        {showList && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-0 top-0 z-40 flex h-full w-[min(88vw,360px)] flex-col border-r border-white/10 bg-black/90 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
                Destinations
              </h2>
              <button
                onClick={() => setShowList(false)}
                className="text-gray-500 hover:text-white"
                aria-label="Close destination list"
              >
                ✕
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {DESTINATIONS.map((d) => (
                <Link
                  key={d.id}
                  href={`/explore/${d.id}`}
                  className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: discovered.includes(d.id)
                          ? d.color
                          : "#3a4257",
                      }}
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white">
                      {d.name}
                    </span>
                  </span>
                  {discovered.includes(d.id) && (
                    <span className="text-[11px] text-emerald-300/80">✓</span>
                  )}
                </Link>
              ))}
            </nav>
            <p className="border-t border-white/10 px-6 py-4 text-xs text-gray-500">
              Select a destination to travel there directly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
