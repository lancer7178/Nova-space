import Link from "next/link";
import { Rocket, ArrowRight, CornerDownRight } from "lucide-react";

const EXPLORE_LINKS = [
  { href: "/explore/planets", label: "Planets" },
  { href: "/explore/black-hole", label: "Black Hole" },
  { href: "/explore/magnetic-fields", label: "Magnetic Fields" },
  { href: "/explore/galaxies", label: "Galaxies" },
  { href: "/explore/frozen-planets", label: "Frozen Planets" },
  { href: "/explore/nebulae", label: "Nebulae" },
  { href: "/explore/constellations", label: "Constellations" },
  { href: "/explore/AlienCreaturesSection", label: "Alien Creatures" },
  { href: "/explore/fire-planet", label: "Fire Planet" },
  { href: "/explore/asteroids", label: "Asteroids" },
  { href: "/explore/solar-system", label: "Solar System" },
  { href: "/explore/supernova", label: "Supernova" },
  { href: "/explore/wormhole", label: "Wormhole" },
  { href: "/explore/comets", label: "Comets" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Premium Glowing Top Border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)]" />

      {/* Subtle Background Glow Orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.015] blur-[120px] rounded-full pointer-events-none translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
        {/* Brand & Newsletter (Col span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <Link
              href="/"
              className="group flex items-center gap-3 text-3xl font-bold text-white tracking-tight mb-6 w-max"
            >
              <div className="bg-black p-2 rounded-xl border border-white/10 group-hover:border-white/30 transition-colors shadow-2xl">
                <Rocket
                  size={28}
                  className="text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 duration-300"
                />
              </div>
              <span>
                Nova<span className="text-gray-400 font-light">Space</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm mb-10">
              Pushing the boundaries of web experiences. Journey through
              galaxies, witness supernovas, and explore the mysteries of the
              universe in glorious, interactive 3D.
            </p>
          </div>
        </div>

        {/* General Navigation (Col span 2) */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold mb-6 tracking-wider uppercase text-sm border-b border-white/10 pb-4 inline-block">
            Systems
          </h3>
          <ul className="space-y-4">
            {["Home", "About", "Contact"].map((label, i) => (
              <li key={i}>
                <Link
                  href={
                    label === "Home"
                      ? "/"
                      : `/${label.toLowerCase().replace(" ", "-")}`
                  }
                  className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">
                    <CornerDownRight size={14} className="text-white/50 mr-2" />
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore Links in Pill Format (Col span 6) */}
        <div className="lg:col-span-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h3 className="text-white font-semibold tracking-wider uppercase text-sm">
              Known Destinations
            </h3>
            <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md border border-white/10">
              {EXPLORE_LINKS.length} Active
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {EXPLORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white bg-black border border-white/10 hover:border-white/30 px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-[2px]"
              >
                {link.label}
                <ArrowRight
                  size={12}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="container mx-auto max-w-7xl px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 relative z-10">
        <p className="flex items-center gap-1">
          &copy; {new Date().getFullYear()} Nova Space. Built with Next.js &
          Three.js
        </p>
        <div className="flex gap-6 mt-4 md:mt-0 font-medium">
          <Link href="#" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">
            Security
          </Link>
        </div>
      </div>
    </footer>
  );
}
