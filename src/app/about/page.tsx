'use client';
import { motion } from 'framer-motion';
import { Sparkles, Telescope, Infinity as InfinityIcon } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 container mx-auto py-32 px-6 lg:px-24"
      >
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-black mb-8 tracking-tight"
          >
            About 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600 ml-4">
              Nova Space
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed font-light"
          >
            Nova Space is more than a journey through the stars — it’s a dive into the most surreal and mysterious corners of the cosmos. From frozen horror planets to intergalactic magnetic fields, this universe is crafted for dreamers, explorers, and visionaries who believe in the beauty of the unknown.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="group relative bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors" />
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
              <Sparkles className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To create a unique space experience where fantasy meets science, and imagination fuels discovery.
            </p>
          </motion.div>

          {/* Explore Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="group relative bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-colors" />
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
              <Telescope className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-4 tracking-tight">What We Explore</h2>
            <p className="text-gray-400 leading-relaxed">
              Galaxies, black holes, frozen planets, magnetic mysteries, nebulae, and everything in between. We bring space to life through immersive visuals and storytelling.
            </p>
          </motion.div>

          {/* Why Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="group relative bg-white/[0.03] hover:bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors" />
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
              <InfinityIcon className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Why Nova?</h2>
            <p className="text-gray-400 leading-relaxed">
              “Nova” symbolizes a powerful cosmic event — a new beginning. Our universe is your portal to endless wonder, rebirth, and infinite inspiration.
            </p>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
