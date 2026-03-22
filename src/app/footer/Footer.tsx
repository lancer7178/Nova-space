import Link from 'next/link';
import { Rocket, ArrowRight } from 'lucide-react';

const EXPLORE_LINKS = [
  { href: '/explore/planets', label: 'Planets' },
  { href: '/explore/black-hole', label: 'Black Hole' },
  { href: '/explore/magnetic-fields', label: 'Magnetic Fields' },
  { href: '/explore/galaxies', label: 'Galaxies' },
  { href: '/explore/frozen-planets', label: 'Frozen Planets' },
  { href: '/explore/nebulae', label: 'Nebulae' },
  { href: '/explore/constellations', label: 'Constellations' },
  { href: '/explore/AlienCreaturesSection', label: 'Alien Creatures' },
  { href: '/explore/fire-planet', label: 'Fire Planet' },
  { href: '/explore/asteroids', label: 'Asteroids' },
  { href: '/explore/solar-system', label: 'Solar System' },
  { href: '/explore/supernova', label: 'Supernova' },
  { href: '/explore/wormhole', label: 'Wormhole' },
  { href: '/explore/comets', label: 'Comets' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/5 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.02] blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 text-sm relative z-10">

        {/* Brand & Description (Col span 4) */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-6 tracking-tight group">
              <Rocket size={24} className="text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 duration-300" />
              <span>Nova<span className="text-gray-400 font-light">Space</span></span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Pushing the boundaries of web experiences. Journey through galaxies, witness supernovas, and explore the mysteries of the universe in glorious 3D.
            </p>
          </div>
        </div>

        {/* General Navigation (Col span 2) */}
        <div className="md:col-span-2">
          <h3 className="text-white font-semibold mb-6 tracking-wider uppercase text-xs">Menu</h3>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">
                  <ArrowRight size={14} className="mr-1 text-white/50" />
                </span>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">
                  <ArrowRight size={14} className="mr-1 text-white/50" />
                </span>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300">
                  <ArrowRight size={14} className="mr-1 text-white/50" />
                </span>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore Links in a 2-Column Grid (Col span 6) */}
        <div className="md:col-span-6">
          <h3 className="text-white font-semibold mb-6 tracking-wider uppercase text-xs">Explore Destinations</h3>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group flex items-center text-gray-400 hover:text-white transition-colors">
                  <span className="h-[1px] w-2 bg-white/20 mr-3 group-hover:bg-white group-hover:w-4 transition-all duration-300" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} Nova Space. Built with Next.js & React Three Fiber.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
