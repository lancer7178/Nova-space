'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Rocket, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreDropdown, setExploreDropdown] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleExplore = () => setExploreDropdown(!exploreDropdown);
  const closeExplore = () => setExploreDropdown(false);

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
          <Rocket size={28} className="text-white" />
          <span>Nova Space</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium relative">
          <Link href="/" className="hover:text-gray-300 transition">Home</Link>

          {/* Explore Dropdown */}
          <div className="relative group">
            <button
              onClick={toggleExplore}
              className="flex items-center gap-1 hover:text-gray-300 transition"
            >
              Explore <ChevronDown size={16} />
            </button>
            {exploreDropdown && (
              <div className="absolute left-0 mt-2 bg-black border border-gray-700 rounded-md p-2 shadow-lg z-40 w-52 space-y-2">
                <Link href="/explore/planets" onClick={closeExplore} className="block hover:text-gray-300">Planets</Link>
                <Link href="/explore/black-hole" onClick={closeExplore} className="block hover:text-gray-300">Black Hole</Link>
                <Link href="/explore/magnetic-fields" onClick={closeExplore} className="block hover:text-gray-300">Magnetic Fields</Link>
                <Link href="/explore/galaxies" onClick={closeExplore} className="block hover:text-gray-300">Galaxies</Link>
                <Link href="/explore/frozen-planets" onClick={closeExplore} className="block hover:text-gray-300">Frozen Planets</Link>
                <Link href="/explore/nebulae" onClick={closeExplore} className="block hover:text-gray-300">Nebulae</Link>
                <Link href="/explore/constellations" onClick={closeExplore} className="block hover:text-gray-300">Constellations</Link>
                <Link href="/explore/AlienCreaturesSection" onClick={closeExplore} className="block hover:text-gray-300">Alien Creatures</Link>
                <Link href="/explore/fire-planet" onClick={closeExplore} className="block hover:text-gray-300">Fire Planet</Link>
              </div>
            )}
          </div>

          <Link href="/about" className="hover:text-gray-300 transition">About</Link>
          <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-black px-4 pb-4 pt-2 space-y-2 text-sm border-t border-gray-700">
          <Link href="/" className="block hover:text-gray-300">Home</Link>
          <div>
            <details className="group">
              <summary className="cursor-pointer hover:text-gray-300">Explore</summary>
              <div className="pl-4 mt-2 space-y-1">
                <Link href="/explore/planets" className="block hover:text-gray-300">Planets</Link>
                <Link href="/explore/black-hole" className="block hover:text-gray-300">Black Hole</Link>
                <Link href="/explore/magnetic-fields" className="block hover:text-gray-300">Magnetic Fields</Link>
                <Link href="/explore/galaxies" className="block hover:text-gray-300">Galaxies</Link>
                <Link href="/explore/frozen-planets" className="block hover:text-gray-300">Frozen Planets</Link>
                <Link href="/explore/nebulae" className="block hover:text-gray-300">Nebulae</Link>
                <Link href="/explore/constellations" className="block hover:text-gray-300">Constellations</Link>
                <Link href="/explore/AlienCreaturesSection" className="block hover:text-gray-300">Alien Creatures</Link>
                <Link href="/explore/fire-planet" className="block hover:text-gray-300">Fire Planet</Link>

              </div>
            </details>
          </div>
          <Link href="/about" className="block hover:text-gray-300">About</Link>
          <Link href="/contact" className="block hover:text-gray-300">Contact</Link>
        </nav>
      )}
    </header>
  );
}
