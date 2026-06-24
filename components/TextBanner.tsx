'use client';

import { motion } from 'motion/react';

export default function TextBanner() {
  return (
    <section className="w-full bg-lux-light px-6 py-24 md:py-36 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl text-center px-4"
      >
        {/* Subtle Luxury Subheading */}
        <span className="block text-[10px] uppercase tracking-[0.25em] text-lux-taupe mb-6 font-semibold">
          THE LUXMINT WAY
        </span>

        {/* Elegant Gold Leaf Divider */}
        <div className="w-12 h-[1px] bg-lux-warm/40 mx-auto mb-10" />

        {/* Main Editorial Text */}
        <p className="font-serif text-[18px] md:text-[22px] lg:text-[25px] leading-[1.8] md:leading-[1.95] text-lux-dark/95 font-light">
          Not sure where to start? Tell us your style and we&rsquo;ll help you find it. A quick message on WhatsApp connects you with us directly &mdash; for honest advice on the right chain, the perfect gift, or how to layer your pieces. Chosen with care, delivered to your door anywhere in Nigeria.
        </p>

        {/* Fine-print details */}
        <div className="mt-10 flex items-center justify-center gap-6 text-[9px] uppercase tracking-[0.2em] text-lux-taupe">
          <span>PERSONAL STYLING HELP</span>
          <span className="w-1.5 h-1.5 rounded-full bg-lux-warm/30" />
          <span>NATIONWIDE DELIVERY</span>
        </div>
      </motion.div>
    </section>
  );
}
