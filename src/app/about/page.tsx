'use client';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black text-white py-20 px-6 lg:px-24"
    >
      <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-center text-white">
        About Nova Space
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-gray-300 text-center mb-12">
        Nova Space is more than a journey through the stars — it’s a dive into the most surreal and mysterious corners of the cosmos. From frozen horror planets to intergalactic magnetic fields, this universe is crafted for dreamers, explorers, and visionaries who believe in the beauty of the unknown.
      </p>

      <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-400">
            To create a unique space experience where fantasy meets science, and imagination fuels discovery.
          </p>
        </div>

        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">What We Explore</h2>
          <p className="text-gray-400">
            Galaxies, black holes, frozen planets, magnetic mysteries, nebulae, and everything in between. We bring space to life through immersive visuals and storytelling.
          </p>
        </div>

        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Why Nova?</h2>
          <p className="text-gray-400">
            “Nova” symbolizes a powerful cosmic event — a new beginning. Our universe is your portal to endless wonder, rebirth, and infinite inspiration.
          </p>
        </div>
      </div>

      <p className="mt-20 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Nova Space. All rights reserved.
      </p>
    </motion.div>
  );
}
