'use client';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { SendHorizonal } from 'lucide-react';

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
    <section className="min-h-screen bg-black text-white py-24 px-4 sm:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-center text-muted mb-10">
          Have a question, idea, or feedback? Reach out and we&#39;ll respond shortly.
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full px-4 py-2 rounded-md bg-muted text-black border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full px-4 py-2 rounded-md bg-muted text-black border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full px-4 py-2 rounded-md bg-muted text-black border border-border focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md flex items-center justify-center gap-2 transition disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Message'}
            {!loading && <SendHorizonal size={18} />}
          </button>

          {sent && (
            <p className="text-green-400 text-sm text-center mt-4">Message sent successfully ✅</p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
