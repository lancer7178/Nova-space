"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getDestination } from "@/lib/destinations";
import { useDiscovery } from "@/components/universe/DiscoveryProvider";

/**
 * Wraps a destination's 3D scene with the shared Nova Space experience layer:
 * quiet metadata, one concise revealable fact, a "signal detected" moment the
 * first time you arrive, and a clear route back to the universe. The scene
 * itself (passed as children) stays untouched and keeps its own interactions.
 */
export default function DestinationFrame({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const destination = getDestination(id);
  const { discover, isDiscovered } = useDiscovery();
  const [alreadyKnown] = useState(() => isDiscovered(id));
  const [detected, setDetected] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [factOpen, setFactOpen] = useState(false);

  // Record the discovery shortly after arrival, so entering feels like finding.
  useEffect(() => {
    if (!destination) return;
    const t = setTimeout(() => {
      if (!isDiscovered(id)) setDetected(true);
      discover(id);
    }, 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!destination) {
    return <SignalLost />;
  }

  const facts = destination.facts ?? [];
  const hasFacts = facts.length > 0;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black text-white">
      {/* The destination's own 3D scene */}
      <div className="absolute inset-0">{children}</div>

      {/* Subtle vignette so overlay text stays legible over the scene */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      {/* Metadata — top left, quiet */}
      <div className="pointer-events-none absolute left-6 top-24 z-20 select-none font-mono text-[10px] leading-relaxed tracking-[0.25em] text-gray-500 uppercase md:left-10">
        <div className="text-gray-400">Destination / {destination.name}</div>
        <div>Sector / {destination.sector}</div>
        <div>Type / {destination.type}</div>
        <div>
          Status /{" "}
          <span className="text-emerald-300/80">
            {alreadyKnown ? "Revisited" : "Discovered"}
          </span>
        </div>
      </div>

      {/* Name + tagline — bottom left */}
      <div className="pointer-events-none absolute bottom-8 left-6 z-20 max-w-[min(90vw,560px)] md:left-10 md:bottom-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl font-semibold tracking-tight text-white md:text-6xl"
        >
          {destination.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="mt-3 text-base text-gray-400 md:text-lg"
        >
          {destination.tagline}
        </motion.p>

        {/* One concise fact, revealed on request — curiosity, not a wall of text */}
        {hasFacts && (
          <div className="pointer-events-auto mt-6">
            {!factOpen ? (
              <button
                onClick={() => setFactOpen(true)}
                className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
                  Did you know?
                </span>
                <span className="text-gray-600 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={factIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-md"
                >
                  <p className="text-sm leading-relaxed text-gray-300">
                    {facts[factIndex]}
                  </p>
                  {facts.length > 1 && (
                    <button
                      onClick={() => setFactIndex((i) => (i + 1) % facts.length)}
                      className="mt-3 font-mono text-[10px] tracking-[0.3em] text-gray-500 uppercase underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      Discover more →
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        )}
      </div>

      {/* Return to Universe — top right */}
      <Link
        href="/explore"
        className="group absolute right-6 top-24 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-md transition-all hover:border-white/30 hover:text-white md:right-10"
      >
        <ArrowLeft
          size={15}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        <span className="tracking-wide">Return to Universe</span>
      </Link>

      {/* "Signal detected" moment — only on genuinely new discoveries */}
      <AnimatePresence>
        {detected && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
              setTimeout(() => setDetected(false), 2600);
            }}
            className="pointer-events-none absolute left-1/2 top-28 z-30 -translate-x-1/2 text-center"
          >
            <span className="font-mono text-[11px] tracking-[0.4em] text-emerald-300/90 uppercase">
              ✦ New discovery
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SignalLost() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-black text-center text-white">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
        Signal lost.
      </h1>
      <p className="mt-4 max-w-md text-gray-400">
        We couldn&apos;t establish a connection to this destination.
      </p>
      <Link
        href="/explore"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-gray-300 transition-all hover:border-white/30 hover:text-white"
      >
        <ArrowLeft size={15} />
        Return to Universe
      </Link>
    </div>
  );
}
