'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, Shield, Award } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface GuideItem {
  id: string;
  num: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; val: string }[];
  image: string;
}

const GUIDE_ITEMS: GuideItem[] = [
  {
    id: 'rings',
    num: '01',
    category: 'RINGS',
    title: 'Signature Signet & Dress Rings',
    subtitle: 'BESPOKE IMMORTAL BANDS',
    description: 'A masterfully engineered signet ring is more than an ornament—it is a physical seal of private capital. Hand-carved in solid 18K and 22K gold, our signature rings offer an unyielding presence. From the classic Lagos sunburst sigils to heavy polished bands, each ring is alloyed to endure a lifetime of daily wear.',
    specs: [
      { label: 'Purity', val: '18K / 22K Solid Gold' },
      { label: 'Craftsmanship', val: 'Hand-Forge & Swiss Refined' },
      { label: 'Weight Range', val: '18g - 42g Solid' }
    ],
    image: 'https://i.pinimg.com/736x/a4/c3/5e/a4c35eb64e16357b030f984f0dfaba09.jpg'
  },
  {
    id: 'chains',
    num: '02',
    category: 'CHAINS',
    title: 'Solid 22K Investment Chains',
    subtitle: 'HEAVY LIQUID LINKS',
    description: 'The foundational anchor of the modern gold wardrobe. Our sovereign link chains are hand-fused at the Lagos atelier using historical West African gold-smithing techniques. Standardized to rigorous Swiss parameters, these heavy chains feature solid interlocking designs, delivering an immediate premium physical sensation and lasting security.',
    specs: [
      { label: 'Purity', val: 'Certified 22K Fine Gold' },
      { label: 'Lock Type', val: 'Signature Safety Lock' },
      { label: 'Weight Range', val: '45g - 150g Liquid' }
    ],
    image: 'https://i.pinimg.com/1200x/c2/4f/11/c24f1185a20006322bec7f5b93c64e44.jpg'
  },
  {
    id: 'pendants',
    num: '03',
    category: 'PENDANTS',
    title: 'Atelier Sovereign Pendants',
    subtitle: 'HAND-CAST TALISMANS',
    description: 'A centerpiece of historical prestige. Our medallion pendants are hand-cast with high-carat bullion, designed to hook seamlessly onto Luxmint bails. Featuring intricate laser-etched geometric shield lines, they represent strength, abundance, and the custodian protection of family assets.',
    specs: [
      { label: 'Purity', val: '22K Pure Atelier Bullion' },
      { label: 'Detailing', val: 'Precision Laser Etched' },
      { label: 'Inspiration', val: 'Lagos Shield Motifs' }
    ],
    image: 'https://i.pinimg.com/1200x/54/12/33/5412332151911548de612554a8fa5be2.jpg'
  }
];

export default function AccessoryGuide() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const horizontalElement = horizontalRef.current;
    const containerElement = containerRef.current;
    if (!horizontalElement || !containerElement) return;

    // Set horizontal scroll trigger animation
    const calculateScrollWidth = () => {
      return horizontalElement.scrollWidth - window.innerWidth + (window.innerWidth >= 1024 ? 450 : 0);
    };

    const scrollTween = gsap.to(horizontalElement, {
      x: () => -calculateScrollWidth(),
      ease: 'none',
      scrollTrigger: {
        trigger: containerElement,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${horizontalElement.scrollWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Dynamically map progress to 3 slides (0, 1, 2)
          const itemsCount = GUIDE_ITEMS.length;
          const index = Math.min(
            Math.floor(progress * itemsCount * 1.05),
            itemsCount - 1
          );
          setActiveIndex(index);
        },
      },
    });

    return () => {
      if (scrollTween.scrollTrigger) {
        scrollTween.scrollTrigger.kill();
      }
      scrollTween.kill();
    };
  }, [mounted]);

  // Handler to scroll to a specific item
  const handleTabClick = (index: number) => {
    if (typeof window === 'undefined') return;
    
    const containerElement = containerRef.current;
    const horizontalElement = horizontalRef.current;
    if (!containerElement || !horizontalElement) return;

    const totalScroll = horizontalElement.scrollWidth;
    const progress = index / (GUIDE_ITEMS.length - 1);
    const scrollStart = containerElement.offsetTop;
    const scrollEnd = scrollStart + totalScroll;
    const targetScroll = scrollStart + (scrollEnd - scrollStart) * progress * 0.85;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    setActiveIndex(index);
  };

  if (!mounted) {
    // Elegant Server-Side Hydration Placeholder
    return (
      <section className="w-full bg-[#0a0a0a] py-24 text-white">
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-[400px]">
            <span className="text-[10px] tracking-[0.3em] text-lux-sand">LOADING THE SCRIPT...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-[#0d0d0d] text-white relative overflow-hidden select-none min-h-screen flex flex-col justify-center border-t border-white/5"
    >
      {/* Dynamic atmospheric ambient glow behind active item */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-all duration-1000 ease-in-out">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lux-warm/5 rounded-full filter blur-[150px]" />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 relative z-10 py-16 md:py-0 md:h-screen flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
        
        {/* Left Sticky Panel */}
        <div 
          ref={leftContentRef}
          className="w-full md:w-[380px] lg:w-[420px] flex flex-col justify-between py-8 md:h-[80vh] shrink-0"
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-lux-sand animate-pulse" />
              <span className="text-[9px] tracking-[0.3em] text-lux-sand font-semibold uppercase">
                THE SOVEREIGN GUIDE
              </span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-white font-normal tracking-tight mb-8">
              Interactive <br />
              <i className="font-serif font-light text-lux-sand">Accessory</i> Guide.
            </h2>

            {/* Navigation Tabs (RINGS, CHAINS, PENDANTS) */}
            <div className="flex gap-4 border-b border-white/10 pb-4 mb-8">
              {GUIDE_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(idx)}
                  className="relative pb-2 text-[10px] tracking-[0.25em] uppercase font-medium focus:outline-none transition-colors duration-300 cursor-pointer"
                  style={{ color: activeIndex === idx ? '#d4b27c' : 'rgba(255,255,255,0.4)' }}
                >
                  {item.category}
                  {activeIndex === idx && (
                    <motion.div 
                      layoutId="activeGuideLine"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-lux-sand" 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Active Content with Fade & Slide Animation */}
            <div className="min-h-[220px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-lux-sand bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                      SECTION {GUIDE_ITEMS[activeIndex].num}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] text-white/50 font-mono">
                      {GUIDE_ITEMS[activeIndex].subtitle}
                    </span>
                  </div>
                  
                  <p className="text-white/70 text-[13px] lg:text-[14px] leading-relaxed font-light">
                    {GUIDE_ITEMS[activeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Call To Action */}
          <div className="pt-6 border-t border-white/5">
            <Link 
              href={`/shop/${GUIDE_ITEMS[activeIndex].id}`}
              className="inline-flex items-center gap-4 text-[10px] tracking-[0.25em] text-lux-sand hover:text-white transition-colors duration-300 group"
            >
              <span>EXPLORE {GUIDE_ITEMS[activeIndex].category} ARCHIVE</span>
              <div className="w-8 h-8 rounded-full border border-lux-sand/30 flex items-center justify-center group-hover:border-white group-hover:bg-lux-sand group-hover:text-black transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Horizontal Scrolling Track */}
        <div className="w-full md:flex-1 overflow-x-auto md:overflow-x-visible hide-scrollbar py-4 md:py-0">
          <div 
            ref={horizontalRef} 
            className="flex gap-8 md:gap-12 pl-0 md:pl-8 lg:pl-16 w-max items-center"
          >
            {GUIDE_ITEMS.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={item.id}
                  className="w-[290px] sm:w-[340px] md:w-[420px] lg:w-[460px] aspect-[4/5] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-between group/card relative overflow-hidden transition-all duration-700 ease-out shrink-0"
                  style={{
                    borderColor: isActive ? 'rgba(212, 178, 124, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    transform: isActive ? 'scale(1.02)' : 'scale(0.98)',
                    opacity: isActive ? 1 : 0.6
                  }}
                >
                  {/* Decorative Subtle Background Aura */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-lux-warm/10 rounded-full filter blur-3xl transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Top Row: Index and Title */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <span className="block text-[10px] font-mono text-lux-sand/80 tracking-widest uppercase mb-1">
                        {item.category} / SPEC
                      </span>
                      <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-white font-normal leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-2xl md:text-3xl lg:text-4xl text-white/10 font-bold group-hover/card:text-lux-sand/20 transition-colors duration-500">
                      {item.num}
                    </span>
                  </div>

                  {/* Centered Image with custom elegant layout mimicking the video */}
                  <div className="relative z-10 w-full aspect-[4/3] flex items-center justify-center my-6">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(212,178,124,0.05)] transition-all duration-700 group-hover/card:scale-105 group-hover/card:border-lux-sand/40">
                      
                      {/* Gold Ambient Ring */}
                      <div className="absolute inset-2 border border-lux-sand/20 rounded-full pointer-events-none z-10 group-hover/card:scale-95 group-hover/card:border-lux-sand/50 transition-all duration-700" />
                      
                      <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover transition-transform duration-[3000ms] group-hover/card:scale-110 filter brightness-[0.9]"
                        sizes="320px"
                      />
                    </div>
                  </div>

                  {/* Bottom Row: Technical Specifications (Credibility & Craftsmanship) */}
                  <div className="relative z-10 border-t border-white/5 pt-4 md:pt-6 space-y-2 md:space-y-3">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center text-[10px] md:text-[11px]">
                        <span className="text-white/45 uppercase tracking-widest font-mono">
                          {spec.label}
                        </span>
                        <span className="text-lux-sand font-medium font-mono uppercase tracking-wide">
                          {spec.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
