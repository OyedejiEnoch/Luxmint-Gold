'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function Atelier() {
  return (
    <section id="world" className="w-full bg-[#FAF9F6] py-24 md:py-36 border-t border-lux-sand/15 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="block text-[9px] tracking-[0.3em] text-black uppercase mb-6 font-semibold">
              THE HOUSE LEGACY • ATELIER
            </span>
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-lux-dark mb-8 font-normal tracking-tight">
              Ancients secrets, refined by modern <i className="font-serif font-light text-black">Swiss</i> standards.
            </h2>
            
            <div className="w-12 h-[1px] bg-black/20 mb-8" />
            
            <p className="text-black/85 text-[15px] leading-[1.8] font-light mb-6">
              Our gold masters at the Lagos atelier fuse time-honored West African metal-smithing traditions with rigorous Swiss refining parameters. Each piece begins with pure, conflict-free bullion, alloyed in-house to achieve our signature deep-warm 18-karat and 22-karat sovereign golds.
            </p>
            
            <p className="text-black/80 text-[15px] leading-[1.8] font-light mb-8">
              We reject modern mass-stamping in favor of slow, hand-cast, and hand-drawn gold wires, creating a molecular density that is heavy to the touch and virtually indestructible. It is gold made not just to shine, but to endure as a family heirloom for centuries.
            </p>

            <blockquote className="border-l-2 border-black/25 pl-5 my-4">
              <p className="font-serif italic text-lux-dark/85 text-[16px] leading-relaxed">
                &ldquo;Our ancestors measured the weight of kingdoms in raw gold. Today, we measure the legacy of families in the absolute perfection of our craft.&rdquo;
              </p>
              <cite className="block font-mono text-[9px] tracking-widest text-lux-taupe uppercase mt-3 not-italic">
                — ADESOLA ALABI, CHIEF SMITH OF THE ATELIER
              </cite>
            </blockquote>
          </div>

          {/* Right Image Frame - Asymmetric Editorial Grid */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
            {/* Ambient gold texture light effect background */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-lux-warm/5 rounded-full filter blur-3xl pointer-events-none" />

            {/* Primary Large Image */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="col-span-8 relative aspect-[4/5] bg-white border border-lux-sand/10 shadow-sm overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80"
                alt="Gold smithing detailing"
                fill
                referrerPolicy="no-referrer"
                className="object-cover object-center filter grayscale-[10%] hover:scale-[1.03] transition-transform duration-[1200ms]"
                sizes="(max-width: 1024px) 60vw, 40vw"
              />
            </motion.div>

            {/* Secondary Floating Overlap Image */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="col-span-4 self-end -ml-8 mb-8 relative aspect-[3/4] bg-white border border-lux-sand/15 shadow-md overflow-hidden z-10"
            >
              <Image
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80"
                alt="Finished high carat gold piece close up"
                fill
                referrerPolicy="no-referrer"
                className="object-cover object-center hover:scale-[1.03] transition-transform duration-[1200ms]"
                sizes="(max-width: 1024px) 30vw, 20vw"
              />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
