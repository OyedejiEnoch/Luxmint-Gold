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
          THE LUXMINT COUNSEL • SERVICES
        </span>

        {/* Elegant Gold Leaf Divider (Very restrained - as requested for Strathberry style) */}
        <div className="w-12 h-[1px] bg-lux-warm/40 mx-auto mb-10" />

        {/* Main Editorial Text */}
        <p className="font-serif text-[18px] md:text-[22px] lg:text-[25px] leading-[1.8] md:leading-[1.95] text-lux-dark/95 font-light">
          At our private salon, our advisors are at your disposal to assist in selecting pieces that align with both your personal style and your asset objectives. Our bespoke recommendations will guide you through the precise karat weights, traditional Nigerian smithing heritage, and proper preservation of your Luxmint Gold heirloom.
        </p>

        {/* Fine-print details */}
        <div className="mt-10 flex items-center justify-center gap-6 text-[9px] uppercase tracking-[0.2em] text-lux-taupe">
          <span>PRIVATE SALON VISITS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-lux-warm/30" />
          <span>PORTFOLIO CONSULTATIONS</span>
        </div>
      </motion.div>
    </section>
  );
}
