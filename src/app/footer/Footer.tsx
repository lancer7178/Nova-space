import Link from 'next/link';
import { Rocket } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 border-t border-gray-700">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold mb-4">
            <Rocket size={24} className="text-white" />
            <span>Nova Space</span>
          </div>
          <p className="text-gray-400">Exploring the mysteries of the universe — from galaxies to black holes.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-white font-semibold mb-3">Explore</h3>
          <ul className="space-y-2">
            <li><Link href="/explore/planets" className="hover:text-gray-300">Planets</Link></li>
            <li><Link href="/explore/black-hole" className="hover:text-gray-300">Black Hole</Link></li>
            <li><Link href="/explore/magnetic-fields" className="hover:text-gray-300">Magnetic Fields</Link></li>
            <li><Link href="/explore/galaxies" className="hover:text-gray-300">Galaxies</Link></li>
            <li><Link href="/explore/frozen-planets" className="hover:text-gray-300">Frozen Planets</Link></li>
            <li><Link href="/explore/nebulae" className="hover:text-gray-300">Nebulae</Link></li>
            <li><Link href="/explore/constellations" className="hover:text-gray-300">Constellations</Link></li>
          </ul>
        </div>

        {/* Contact Info / Copyright */}
        <div>
          <h3 className="text-white font-semibold mb-3">Connect</h3>
          <p className="text-gray-400">Built with abdulatif</p>
          <p className="text-gray-500 mt-4 text-xs">&copy; {new Date().getFullYear()} Nova Space. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
