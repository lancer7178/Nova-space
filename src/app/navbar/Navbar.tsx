"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Rocket, Menu, X, ChevronDown } from "lucide-react";
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
          ? "bg-black/70 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-2xl font-bold text-white tracking-tight"
        >
          <Rocket
            size={28}
            className="text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 duration-300"
          />
          <span>
            Nova<span className="text-gray-400 font-light">Space</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium relative">
          <NavLink href="/">Home</NavLink>

          {/* Explore Dropdown (Mega Menu) */}
          <div
            className="relative group"
            onMouseEnter={handleExploreEnter}
            onMouseLeave={handleExploreLeave}
          >
            <button className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-2">
              Explore
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${exploreDropdown ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {exploreDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl z-40 w-[300px]"
                >
                  <div className="grid grid-cols-1 gap-y-3">
                    {EXPLORE_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setExploreDropdown(false)}
                        className="group/link flex items-center text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 mr-3 group-hover/link:bg-white transition-colors"></span>
                        {link.label}
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
          className="md:hidden text-white p-2 rounded-md hover:bg-white/5 transition-colors"
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
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
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
                <div className="text-sm font-bold text-gray-500 tracking-wider uppercase">
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

// Helper component for desktop links with animated underline
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
      className="relative group text-gray-300 hover:text-white transition-colors py-2"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}
