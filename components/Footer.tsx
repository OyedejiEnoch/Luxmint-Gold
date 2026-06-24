'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Send, Instagram, MessageCircle, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1200);
  };

  return (
    <footer className="w-full bg-[#000000] text-white/90 border-t border-white/5 py-20 lg:py-28 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-lux-sand/20 to-transparent" />
      
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="font-sans text-xl lg:text-2xl tracking-[0.25em] font-light uppercase text-white block">
              L U X M I N T
            </Link>
            <p className="text-[12px] text-white/50 leading-relaxed font-light max-w-sm">
              A Nigerian house of curated gold accessories &mdash; chains, pendants, rings and more, hand-picked for everyday elegance and delivered across Nigeria.
            </p>
            <div className="pt-2 flex items-center gap-4 text-white/40 text-[10px] uppercase tracking-[0.15em]">
              <span>Online · Nigeria</span>
              <span className="w-1 h-1 rounded-full bg-lux-sand/30" />
              <span>Nationwide Delivery</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] font-semibold text-lux-sand uppercase">
              The House
            </h4>
            <ul className="space-y-3 text-[11px] uppercase tracking-[0.15em] text-white/60">
              <li><Link href="#shop" className="hover:text-lux-sand transition-colors duration-300">Shop the Collection</Link></li>
              <li><Link href="#world" className="hover:text-lux-sand transition-colors duration-300">Our Story</Link></li>
              <li><Link href="#advisory" className="hover:text-lux-sand transition-colors duration-300">Why Luxmint</Link></li>
              <li><Link href="#book" className="hover:text-lux-sand transition-colors duration-300">Book a Styling Session</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] tracking-[0.2em] font-semibold text-lux-sand uppercase">
              Reach Us
            </h4>
            <ul className="space-y-4 text-[11px] font-light leading-relaxed text-white/60">
              <li>
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="flex items-start gap-2.5 group">
                  <MessageCircle className="w-3.5 h-3.5 mt-0.5 text-lux-sand/75 shrink-0 stroke-[1.2]" />
                  <div>
                    <span className="font-medium text-white uppercase block tracking-wider text-[9px] group-hover:text-lux-sand transition-colors">WhatsApp</span>
                    <span className="text-[10px] tracking-wide text-white/45">Orders &amp; styling help</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/luxmintgold" target="_blank" rel="noreferrer" className="flex items-start gap-2.5 group">
                  <Instagram className="w-3.5 h-3.5 mt-0.5 text-lux-sand/75 shrink-0 stroke-[1.2]" />
                  <div>
                    <span className="font-medium text-white uppercase block tracking-wider text-[9px] group-hover:text-lux-sand transition-colors">Instagram</span>
                    <span className="text-[10px] tracking-wide text-white/45">@luxmintgold</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] tracking-[0.25em] font-semibold text-lux-sand uppercase">
              Join the List
            </h4>
            <p className="text-[11px] text-white/50 leading-relaxed font-light">
              Be first to see new arrivals, restocks and seasonal gifting edits &mdash; plus the occasional treat for subscribers only.
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form 
                  key="subscribe-form"
                  onSubmit={handleSubscribe}
                  className="flex gap-2 items-center border-b border-white/10 pb-2 focus-within:border-lux-sand transition-colors duration-500"
                >
                  <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    suppressHydrationWarning
                    className="flex-1 bg-transparent border-none py-2 text-[10px] uppercase tracking-widest placeholder-white/20 focus:outline-none"
                  />
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    className="p-2 text-lux-sand hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
                    aria-label="Subscribe"
                  >
                    {isSubmitting ? (
                      <div className="w-3 h-3 border border-white/35 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5 stroke-[1.5]" />
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="subscribe-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 p-3 text-[10px] uppercase tracking-widest"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Your email has been safely ledgered.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="border-t border-white/5 mt-16 lg:mt-24 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] uppercase tracking-[0.2em] text-white/45 font-mono">
          <span>© 2026 LUXMINT GOLD. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <Link href="#privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
