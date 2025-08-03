'use client'; 

import Link from 'next/link';
import { Rocket } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <Rocket className="text-white mb-6 animate-pulse" size={64} />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8 text-center">
        The page you&#39;re looking for is lost in space.
      </p>
      <Link
        href="/"
        className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-300 transition font-semibold"
      >
        Back to Home
      </Link>

      <div className="mt-12 text-sm text-gray-600 text-center max-w-md">
        <p>
          Maybe it was swallowed by a black hole, drifted into a nebula, or it
          simply never existed.
        </p>
      </div>
    </div>
  );
}
