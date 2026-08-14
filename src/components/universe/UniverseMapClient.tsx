"use client";

import dynamic from "next/dynamic";

// Client boundary so the heavy WebGL map can be loaded lazily with no SSR.
const UniverseMap = dynamic(() => import("@/components/universe/UniverseMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-black">
      <span className="font-mono text-xs tracking-[0.35em] text-gray-500 uppercase">
        Initializing deep space
      </span>
    </div>
  ),
});

export default function UniverseMapClient() {
  return <UniverseMap />;
}
