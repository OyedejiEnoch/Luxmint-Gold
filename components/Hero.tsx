'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const CAROUSEL_IMAGES = [
  'https://i.pinimg.com/1200x/c2/4f/11/c24f1185a20006322bec7f5b93c64e44.jpg', // Gold chain
  'https://i.pinimg.com/1200x/54/12/33/5412332151911548de612554a8fa5be2.jpg', // Pendant
  'https://i.pinimg.com/1200x/93/ff/36/93ff367a87915d3acc452f9769e9eccc.jpg', // Bracelet
];

const CAPTIONS = [
  { collection: "THE APEX SERIES", desc: "Solid 24 Karat Solid Gold Chains • Lagos, Nigeria" },
  { collection: "THE MONARCH", desc: "Exquisite Pendants Handcrafted in Solid Gold" },
  { collection: "THE CONTINUUM", desc: "Sculpted Heavy Gold Bracelets & Cuffs" }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 8000); // Super slow 8-second transition for a "slow, confident" rhythm
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-116px)] md:h-[calc(100vh-132px)] overflow-hidden bg-lux-dark">
      {/* Carousel Background */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }} // Exquisite buttery transition
          className="absolute inset-0 z-0"
        >
          <Image
            src={CAROUSEL_IMAGES[currentIndex]}
            alt="Luxmint Gold Collection"
            fill
            priority
            referrerPolicy="no-referrer"
            className="object-cover object-center filter brightness-[0.85] contrast-[1.05]"
          />
          {/* Elegant shadow filters so the artwork feels integrated with real-life luxury lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-20 py-12 md:py-16">
        
        {/* Empty top spacing to balance the layout */}
        <div />

        {/* Main Title Content */}
        <div className="max-w-xl">
          <div className="overflow-hidden mb-2">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-block text-[9px] md:text-[10px] tracking-[0.3em] font-medium text-lux-sand uppercase"
            >
              LUXMINT HOUSE • PRESTIGE LANDING
            </motion.span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-5 font-normal text-white"
          >
            The art <br /> of <i className="font-serif font-light text-lux-sand">enduring</i> luxury
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lux-light/85 text-[12px] md:text-[13px] mb-8 max-w-sm tracking-[0.04em] leading-relaxed font-light"
          >
            A curated house of gold masterpieces, crafted in Nigeria for those who view gold not merely as ornament, but as their legacy.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex items-center gap-8"
          >
            <Link 
              href="#shop" 
              className="group relative text-[10px] uppercase tracking-[0.2em] text-white pb-2.5 font-medium"
            >
              <span>Explore Collection</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-lux-sand scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40" />
            </Link>
            <Link 
              href="#viewing" 
              className="group relative text-[10px] uppercase tracking-[0.2em] text-white pb-2.5 font-medium"
            >
              <span>The Atelier</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-lux-sand scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom Panel containing indicators and photo technical description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-8 border-t border-white/10">
          
          {/* Slideshow Progress Lines */}
          <div className="flex gap-4 items-center">
            {CAROUSEL_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                suppressHydrationWarning
                className="group py-3 -my-3 pr-1 focus:outline-none cursor-pointer flex items-center"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div 
                  className={`h-[1px] transition-all duration-1000 ease-in-out ${
                    currentIndex === idx ? 'w-16 bg-lux-sand' : 'w-6 bg-white/20 group-hover:bg-white/50'
                  }`} 
                />
              </button>
            ))}
          </div>

          {/* Slide Description - Real world details like Strathberry */}
          <div className="text-left md:text-right text-white/70 max-w-xs">
            <span className="block font-mono text-[8px] md:text-[9px] tracking-widest text-lux-sand uppercase">
              {CAPTIONS[currentIndex].collection}
            </span>
            <span className="block text-[10px] md:text-[11px] tracking-wide font-light text-lux-light/90">
              {CAPTIONS[currentIndex].desc}
            </span>
          </div>
          
          {/* Tiny Animated Scroll Line */}
          <div className="hidden lg:flex flex-col items-center gap-3">
            <span className="text-[8px] tracking-[0.3em] uppercase text-white/50">Scroll</span>
            <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
              <motion.div 
                animate={{ 
                  y: ["-100%", "100%"] 
                }} 
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 left-0 w-full h-1/2 bg-lux-sand" 
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
