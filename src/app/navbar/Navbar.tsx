"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Rocket, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreDropdown, setExploreDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleExploreEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setExploreDropdown(true);
  };

  const handleExploreLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setExploreDropdown(false);
    }, 150);
  };

  // Handle click outside or scroll to close dropdowns
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (exploreDropdown) setExploreDropdown(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [exploreDropdown]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-2xl font-bold text-white tracking-tight"
        >
          <div className="bg-white/10 p-2 rounded-xl border border-white/5 group-hover:bg-white/20 transition-colors">
            <Rocket
              size={24}
              className="text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 duration-300"
            />
          </div>
          <span>
            Nova<span className="text-gray-400 font-light">Space</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium relative">
          <NavLink href="/">Home</NavLink>

          {/* Explore Dropdown (Mega Menu) */}
          <div
            className="relative group"
            onMouseEnter={handleExploreEnter}
            onMouseLeave={handleExploreLeave}
          >
            <button className="flex items-center gap-1 text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300">
              Explore
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${exploreDropdown ? "rotate-180 text-white" : ""}`}
              />
            </button>

            <AnimatePresence>
              {exploreDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-4 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] z-40 w-[440px] max-h-[75vh] overflow-y-auto origin-top-right"
                >
                  {/* Subtle inner top highlight */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="mb-4 px-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">Select Destination</span>
                    <span className="text-xs text-gray-600 bg-white/5 px-2 py-1 rounded-md">14 Topics Active</span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {EXPLORE_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setExploreDropdown(false)}
                        className="group/link flex items-center justify-between hover:bg-white-[0.04] bg-transparent border border-transparent hover:border-white/5 p-3 rounded-2xl transition-all duration-300"
                      >
                       <span className="text-gray-400 group-hover/link:text-white transition-colors">
                          {link.label}
                       </span>
                       <ArrowRight size={14} className="text-gray-600 -translate-x-2 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 group-hover/link:text-white" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-lg text-gray-300 hover:text-white"
              >
                Home
              </Link>

              <div className="space-y-4">
                <div className="text-xs font-bold text-gray-500 tracking-wider uppercase">
                  Explore Topics
                </div>
                <div className="grid grid-cols-2 gap-4 pl-2">
                  {EXPLORE_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="text-lg text-gray-300 hover:text-white"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-lg text-gray-300 hover:text-white"
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// Helper component for desktop links with sleek pill hover
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-full transition-all duration-300"
    >
      {children}
    </Link>
  );
}
