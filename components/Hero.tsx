'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Link from 'next/link';

const CAROUSEL_IMAGES = [
  'https://i.pinimg.com/1200x/c2/4f/11/c24f1185a20006322bec7f5b93c64e44.jpg', // Gold chain
  'https://i.pinimg.com/1200x/54/12/33/5412332151911548de612554a8fa5be2.jpg', // Pendant
  'https://i.pinimg.com/1200x/93/ff/36/93ff367a87915d3acc452f9769e9eccc.jpg', // Bracelet
];

// Honest, "accessible elegance" editorial captions — real accessory categories,
// not investment-bullion claims.
const CAPTIONS = [
  { collection: "THE CHAIN EDIT", desc: "Layering chains in radiant gold" },
  { collection: "THE PENDANT EDIT", desc: "Pendants made for everyday wear" },
  { collection: "THE CUFF EDIT", desc: "Bracelets & cuffs that catch the light" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Respect prefers-reduced-motion: don't auto-advance the carousel.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 7000); // Slow, confident rhythm.
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative w-full h-[calc(100vh-116px)] md:h-[calc(100vh-132px)] min-h-[520px] overflow-hidden bg-lux-dark">
      {/* Carousel Background */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.4 : 1.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={CAROUSEL_IMAGES[currentIndex]}
            alt={`Luxmint Gold — ${CAPTIONS[currentIndex].collection.toLowerCase()}`}
            fill
            priority={currentIndex === 0}
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-center brightness-[0.82] contrast-[1.04]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic legibility scrim:
          - bottom-up gradient anchors the lower panel
          - left-side gradient guarantees contrast behind the left-aligned headline */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/65 via-black/25 to-black/15" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/10 to-transparent" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-20 py-10 md:py-14">

        {/* Empty top spacing to balance the layout */}
        <div />

        {/* Main Title Content */}
        <div className="max-w-2xl">
          <div className="overflow-hidden mb-4 md:mb-5">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 text-[11px] tracking-[0.32em] font-medium text-lux-sand uppercase"
            >
              <span className="h-px w-8 bg-lux-warm/70" aria-hidden="true" />
              Curated Gold Accessories · Nigeria
            </motion.span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.98] mb-6 md:mb-7 font-light text-white tracking-[-0.01em]"
          >
            Gold you&rsquo;ll<br />
            <i className="font-serif font-light text-lux-sand">never take off.</i>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-lux-light/90 text-[14px] md:text-[15px] mb-9 max-w-md tracking-[0.01em] leading-relaxed font-light"
          >
            Chains, pendants, bracelets and more — curated piece by piece for the
            woman who lets her jewellery do the talking. Everyday luxury, made to be lived in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.75 }}
            className="flex flex-wrap items-center gap-5 sm:gap-7"
          >
            {/* Primary CTA — one clear action */}
            <Link
              href="#shop"
              className="group inline-flex items-center justify-center min-h-[48px] px-8 border border-lux-sand/70 text-[11px] uppercase tracking-[0.22em] text-white font-medium transition-colors duration-500 hover:bg-lux-sand hover:text-lux-dark hover:border-lux-sand"
            >
              Shop the Collection
            </Link>

            {/* Secondary CTA — visually subordinate text link */}
            <Link
              href="#world"
              className="group relative inline-flex items-center min-h-[48px] text-[11px] uppercase tracking-[0.22em] text-white/90 font-medium"
            >
              <span>Our Story</span>
              <span className="absolute bottom-3 left-0 w-full h-px bg-lux-sand scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="absolute bottom-3 left-0 w-full h-px bg-white/30" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom Panel: slide indicators, editorial caption, scroll cue */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-7 border-t border-white/12">

          {/* Slideshow Progress Lines */}
          <div className="flex gap-4 items-center">
            {CAROUSEL_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                suppressHydrationWarning
                className="group py-3 -my-3 pr-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lux-sand cursor-pointer flex items-center"
                aria-label={`View ${CAPTIONS[idx].collection.toLowerCase()}`}
                aria-current={currentIndex === idx}
              >
                <span
                  className={`h-px transition-all duration-700 ease-in-out ${
                    currentIndex === idx ? 'w-16 bg-lux-sand' : 'w-6 bg-white/25 group-hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Slide Description */}
          <div className="text-left md:text-right text-white/75 max-w-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className="block font-mono text-[10px] tracking-[0.25em] text-lux-sand uppercase">
                  {CAPTIONS[currentIndex].collection}
                </span>
                <span className="block text-[12px] md:text-[13px] tracking-wide font-light text-lux-light/90">
                  {CAPTIONS[currentIndex].desc}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Animated Scroll Cue */}
          <div className="hidden lg:flex flex-col items-center gap-3">
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/55">Scroll</span>
            <div className="w-px h-12 bg-white/20 relative overflow-hidden">
              {prefersReducedMotion ? (
                <span className="absolute top-0 left-0 w-full h-1/2 bg-lux-sand/70" />
              ) : (
                <motion.span
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-full h-1/2 bg-lux-sand"
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
