'use client';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { SendHorizonal, Mail, Star } from 'lucide-react';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!form.current) return;

    emailjs
      .sendForm(
        'service_uxyie5j',
        'template_76u6a06',
        form.current,
        '-vAphwlP-xaTdFksd'
      )
      .then(
        () => {
          setSent(true);
          setLoading(false);
          form.current?.reset();
          setTimeout(() => setSent(false), 4000);
        },
        (error) => {
          setLoading(false);
          alert('Error sending message: ' + error.text);
        }
      );
  };

  return (
    <section className="relative min-h-screen bg-black text-white py-32 px-4 sm:px-8 lg:px-16 overflow-hidden flex items-center">
      
      {/* Background Decor */}
      <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-blue-900/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Star size={14} className="text-gray-400" />
              <span className="text-xs font-medium uppercase tracking-widest text-gray-300">Get in touch</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight">
              Hail <br/> Frequencies <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600">
                Open.
              </span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-md">
              Whether you want to report a wormhole anomaly, suggest a new planet, or just say hello — the comms channel is open. Reach out and we&apos;ll respond at lightspeed.
            </p>
            
            <div className="flex items-center gap-4 text-gray-400">
               <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                 <Mail size={20} className="text-white" />
               </div>
               <div>
                  <div className="text-sm font-semibold text-white">Direct Channel</div>
                  <div className="text-sm">comms@novaspace.universe</div>
               </div>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full"
          >
            <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
               {/* Subtle inner glow */}
               <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 blur-[50px] rounded-full pointer-events-none" />
               
              <form ref={form} onSubmit={sendEmail} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Transmission Alias</label>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="e.g. Commander Shepard"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 focus:bg-white/5 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Return Coordinates (Email)</label>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="you@starfleet.com"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 focus:bg-white/5 transition-all"
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Message Log</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Enter your transmission data here..."
                    required
                    className="w-full px-5 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 focus:bg-white/5 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold tracking-wide rounded-xl transition-all hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? 'Transmitting...' : 'Send Transmission'}
                    {!loading && <SendHorizonal size={18} className="transition-transform group-hover:translate-x-1" />}
                  </span>
                </button>

                {sent && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md rounded-[2rem] z-20"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                        <SendHorizonal size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Transmission Sent</h3>
                      <p className="text-gray-400">Message received in our databanks.</p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
