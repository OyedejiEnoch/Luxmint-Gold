'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);

  // Close megamenu on scroll
  useEffect(() => {
    const handleScroll = () => {
      setActiveMegaMenu(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Framer Motion variants for mobile menu items
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const,
        stiffness: 110,
        damping: 14
      } 
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-lux-sand/20">
      
      {/* Main Luxury Navbar */}
      <div className="w-full px-6 md:px-12 h-20 md:h-24 flex items-center justify-between text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium text-lux-dark relative">
        
        {/* Left Navigation (Desktop) */}
        <nav className="hidden md:flex gap-8 lg:gap-10 items-center">
          <button 
            onMouseEnter={() => setActiveMegaMenu('shop')}
            onClick={() => setActiveMegaMenu(activeMegaMenu === 'shop' ? null : 'shop')}
            suppressHydrationWarning
            className={`hover:text-black transition-colors duration-300 pb-1 cursor-pointer relative ${
              activeMegaMenu === 'shop' ? 'text-black font-semibold' : ''
            }`}
          >
            Shop
            {activeMegaMenu === 'shop' && (
              <motion.span layoutId="activeNavDot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black" />
            )}
          </button>
          
          <button 
            onMouseEnter={() => setActiveMegaMenu('collections')}
            onClick={() => setActiveMegaMenu(activeMegaMenu === 'collections' ? null : 'collections')}
            suppressHydrationWarning
            className={`hover:text-black transition-colors duration-300 pb-1 cursor-pointer relative ${
              activeMegaMenu === 'collections' ? 'text-black font-semibold' : ''
            }`}
          >
            Collections
            {activeMegaMenu === 'collections' && (
              <motion.span layoutId="activeNavDot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black" />
            )}
          </button>

          <Link href="#book" className="hover:text-black transition-colors duration-300 pb-1">
            Styling
          </Link>

          <Link href="#world" className="hover:text-black transition-colors duration-300 pb-1">
            Our Story
          </Link>
        </nav>

        {/* Mobile Menu Button (Balanced on Left) */}
        <div className="flex md:hidden items-center absolute left-6">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            suppressHydrationWarning
            className="w-10 h-10 -ml-2.5 flex flex-col justify-center items-center focus:outline-none cursor-pointer group"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              {/* Top line */}
              <motion.span 
                animate={{ 
                  rotate: isOpen ? 45 : 0, 
                  y: isOpen ? 7.5 : 0 
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="block w-5 h-[1.2px] bg-lux-dark origin-center"
              />
              {/* Middle line */}
              <motion.span 
                animate={{ 
                  opacity: isOpen ? 0 : 1,
                  scale: isOpen ? 0.5 : 1
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="block w-5 h-[1.2px] bg-lux-dark"
              />
              {/* Bottom line */}
              <motion.span 
                animate={{ 
                  rotate: isOpen ? -45 : 0, 
                  y: isOpen ? -7.5 : 0 
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="block w-5 h-[1.2px] bg-lux-dark origin-center"
              />
            </div>
          </button>
        </div>

        {/* Center Logo - Extra letter spacing for high fashion luxury aesthetic */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          <Link 
            href="/" 
            className="font-sans text-lg md:text-xl lg:text-2xl tracking-[0.25em] font-light uppercase text-lux-dark hover:opacity-85 transition-opacity"
            onClick={() => {
              setActiveMegaMenu(null);
              setIsOpen(false);
            }}
          >
            L U X M I N T
          </Link>
          <span className="text-[7px] tracking-[0.4em] font-semibold text-black/80 -mt-0.5 md:-mt-1 select-none">
            G O L D
          </span>
        </div>

        {/* Right Utilities (Desktop) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <button suppressHydrationWarning className="hover:text-black transition-colors duration-300 uppercase tracking-[0.2em] cursor-pointer">
            Search
          </button>
          <button suppressHydrationWarning className="hover:text-black transition-colors duration-300 uppercase tracking-[0.2em] cursor-pointer">
            Account
          </button>
          <Link href="#wishlist" className="hover:text-black transition-colors duration-300 uppercase tracking-[0.2em]">
            Wishlist
          </Link>
          <button suppressHydrationWarning className="flex items-center gap-1.5 hover:text-black transition-colors duration-300 uppercase tracking-[0.2em] cursor-pointer">
            <ShoppingBag className="w-3.5 h-3.5 stroke-[1.2]" />
            <span>Bag (0)</span>
          </button>
        </div>

        {/* Mobile Bag Button (Balanced on Right) */}
        <div className="flex md:hidden items-center absolute right-6">
          <button suppressHydrationWarning className="relative w-10 h-10 -mr-2.5 flex items-center justify-center hover:text-lux-warm transition-colors focus:outline-none cursor-pointer">
            <ShoppingBag className="w-4 h-4 stroke-[1.2] text-lux-dark" />
            <span className="absolute top-1.5 right-1.5 font-mono text-[8px] bg-lux-dark text-white w-3.5 h-3.5 rounded-full flex items-center justify-center scale-90">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Mega-Menu (Shop / Categories) */}
      <AnimatePresence>
        {activeMegaMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onMouseLeave={() => setActiveMegaMenu(null)}
            className="absolute left-0 right-0 top-full bg-white border-b border-lux-sand/30 shadow-sm z-40 hidden md:block"
          >
            <div className="max-w-[1920px] mx-auto px-12 lg:px-24 py-12 grid grid-cols-4 gap-12">
              <div>
                <h4 className="text-[10px] tracking-[0.25em] font-semibold text-black mb-4 uppercase">
                  Categories
                </h4>
                <ul className="space-y-3 text-[11px] uppercase tracking-[0.15em] text-lux-dark/80">
                  <li><Link href="/shop/necklaces" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Gold Necklaces</Link></li>
                  <li><Link href="/shop/chains" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Gold Chains</Link></li>
                  <li><Link href="/shop/pendants" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Pendants</Link></li>
                  <li><Link href="/shop/rings" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Signature Rings</Link></li>
                  <li><Link href="/shop/bracelets" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Bracelets &amp; Cuffs</Link></li>
                  <li><Link href="/shop/earrings" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Earrings</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] tracking-[0.25em] font-semibold text-black mb-4 uppercase">
                  Shop The Edit
                </h4>
                <ul className="space-y-3 text-[11px] uppercase tracking-[0.15em] text-lux-dark/80">
                  <li><Link href="#shop" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>New Arrivals</Link></li>
                  <li><Link href="#shop" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Best Sellers</Link></li>
                  <li><Link href="#shop" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Gift Ideas</Link></li>
                  <li><Link href="#shop" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Layering Sets</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] tracking-[0.25em] font-semibold text-black mb-4 uppercase">
                  Discover
                </h4>
                <ul className="space-y-3 text-[11px] uppercase tracking-[0.15em] text-lux-dark/80">
                  <li><Link href="#world" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Our Story</Link></li>
                  <li><Link href="#advisory" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Why Luxmint</Link></li>
                  <li><Link href="#care" className="hover:text-lux-brown transition-colors" onClick={() => setActiveMegaMenu(null)}>Gold Care Guide</Link></li>
                </ul>
              </div>

              <div className="bg-lux-light p-6 flex flex-col justify-between border border-lux-sand/20">
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] font-semibold text-lux-charcoal uppercase mb-2">
                    Need a Hand?
                  </h4>
                  <p className="text-[11px] text-lux-taupe normal-case tracking-normal leading-relaxed">
                    Tell us what you love and we&rsquo;ll help you find it &mdash; free styling help over WhatsApp.
                  </p>
                </div>
                <Link
                  href="#book"
                  onClick={() => setActiveMegaMenu(null)}
                  className="inline-flex items-center gap-2 text-[9px] tracking-[0.2em] font-semibold text-lux-brown hover:text-lux-espresso mt-4"
                >
                  <span>BOOK A STYLING SESSION</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ultra-Premium Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-20 bottom-0 bg-lux-light/98 backdrop-blur-xl z-40 md:hidden flex flex-col border-t border-lux-sand/20 overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
              
              {/* Navigation list */}
              <motion.nav 
                variants={menuContainerVariants}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                
                {/* 1. Shop Accordion Option */}
                <motion.div variants={menuItemVariants} className="border-b border-lux-sand/30 pb-3.5">
                  <button 
                    onClick={() => setMobileShopOpen(!mobileShopOpen)}
                    suppressHydrationWarning
                    className="w-full flex justify-between items-center text-left py-1 text-[13px] uppercase tracking-[0.18em] font-medium text-lux-dark hover:text-lux-warm transition-colors"
                  >
                    <span>Shop Gold</span>
                    {mobileShopOpen ? (
                      <ChevronUp className="w-4 h-4 stroke-[1.2] text-lux-taupe" />
                    ) : (
                      <ChevronDown className="w-4 h-4 stroke-[1.2] text-lux-taupe" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileShopOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pl-3 ml-1 mt-3 space-y-3.5 border-l border-lux-sand/50"
                      >
                        <Link href="/shop/necklaces" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-lux-dark/80 hover:text-black">
                          <span>Gold Necklaces</span>
                          <span className="text-[8px] font-mono text-lux-taupe">Layering</span>
                        </Link>
                        <Link href="/shop/chains" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-lux-dark/80 hover:text-black">
                          <span>Gold Chains</span>
                          <span className="text-[8px] font-mono text-lux-taupe">Statement</span>
                        </Link>
                        <Link href="/shop/pendants" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-lux-dark/80 hover:text-black">
                          <span>Pendants</span>
                          <span className="text-[8px] font-mono text-lux-taupe">Everyday</span>
                        </Link>
                        <Link href="/shop/rings" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-lux-dark/80 hover:text-black">
                          <span>Signature Rings</span>
                          <span className="text-[8px] font-mono text-lux-taupe">Signet &amp; Stack</span>
                        </Link>
                        <Link href="/shop/bracelets" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-lux-dark/80 hover:text-black">
                          <span>Bracelets &amp; Cuffs</span>
                          <span className="text-[8px] font-mono text-lux-taupe">Cuffs</span>
                        </Link>
                        <Link href="/shop/earrings" onClick={() => setIsOpen(false)} className="flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-lux-dark/80 hover:text-black">
                          <span>Earrings</span>
                          <span className="text-[8px] font-mono text-lux-taupe">Hoops &amp; Studs</span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 2. Collections Accordion Option */}
                <motion.div variants={menuItemVariants} className="border-b border-lux-sand/30 pb-3.5">
                  <button 
                    onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                    suppressHydrationWarning
                    className="w-full flex justify-between items-center text-left py-1 text-[13px] uppercase tracking-[0.18em] font-medium text-lux-dark hover:text-lux-warm transition-colors"
                  >
                    <span>Collections</span>
                    {mobileCollectionsOpen ? (
                      <ChevronUp className="w-4 h-4 stroke-[1.2] text-lux-taupe" />
                    ) : (
                      <ChevronDown className="w-4 h-4 stroke-[1.2] text-lux-taupe" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileCollectionsOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden pl-3 ml-1 mt-3 space-y-3.5 border-l border-lux-sand/50"
                      >
                        <Link href="#shop" onClick={() => setIsOpen(false)} className="block text-[11px] uppercase tracking-[0.15em] text-lux-dark/80 hover:text-black">
                          New Arrivals
                        </Link>
                        <Link href="#shop" onClick={() => setIsOpen(false)} className="block text-[11px] uppercase tracking-[0.15em] text-lux-dark/80 hover:text-black">
                          Best Sellers
                        </Link>
                        <Link href="#shop" onClick={() => setIsOpen(false)} className="block text-[11px] uppercase tracking-[0.15em] text-lux-dark/80 hover:text-black">
                          Gift Ideas
                        </Link>
                        <Link href="#shop" onClick={() => setIsOpen(false)} className="block text-[11px] uppercase tracking-[0.15em] text-lux-dark/80 hover:text-black">
                          Layering Sets
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 3. Bespoke Direct Link */}
                <motion.div variants={menuItemVariants} className="border-b border-lux-sand/30 pb-3.5">
                  <Link
                    href="#book"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center py-1 text-[13px] uppercase tracking-[0.18em] font-medium text-lux-dark hover:text-lux-warm transition-colors"
                  >
                    <span>Styling Session</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[1] text-lux-taupe" />
                  </Link>
                </motion.div>

                {/* 4. Our World Direct Link */}
                <motion.div variants={menuItemVariants} className="border-b border-lux-sand/30 pb-3.5">
                  <Link
                    href="#world"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between items-center py-1 text-[13px] uppercase tracking-[0.18em] font-medium text-lux-dark hover:text-lux-warm transition-colors"
                  >
                    <span>Our Story</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[1] text-lux-taupe" />
                  </Link>
                </motion.div>

              </motion.nav>

              {/* Lower Showroom details and actions */}
              <div className="space-y-6 mt-8">
                
                {/* Delivery Detail */}
                <div className="bg-white/60 border border-lux-sand/30 p-4 rounded-sm space-y-2">
                  <div className="flex items-center gap-2 text-lux-dark">
                    <MapPin className="w-3.5 h-3.5 text-lux-warm stroke-[1.5]" />
                    <span className="text-[8px] font-mono tracking-[0.2em] font-semibold uppercase">NATIONWIDE DELIVERY · NIGERIA</span>
                  </div>
                  <p className="text-[10px] text-lux-taupe leading-relaxed pl-5 font-light">
                    Shop online and order on WhatsApp. Every piece is hand-checked and carefully delivered to your door.
                  </p>
                </div>

                {/* Secure Contacts Grid */}
                <div className="flex justify-between items-center border-t border-b border-lux-sand/20 py-4 px-1">
                  <a href="https://wa.me/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-lux-dark hover:text-lux-warm transition-colors">
                    <Phone className="w-3.5 h-3.5 stroke-[1.2]" />
                    <span>WHATSAPP</span>
                  </a>
                  <a href="mailto:hello@luxmint.gold" className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-lux-dark hover:text-lux-warm transition-colors">
                    <Mail className="w-3.5 h-3.5 stroke-[1.2]" />
                    <span>EMAIL</span>
                  </a>
                  <a href="https://instagram.com/luxmintgold" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-lux-dark hover:text-lux-warm transition-colors">
                    <Instagram className="w-3.5 h-3.5 stroke-[1.2]" />
                    <span>INSTAGRAM</span>
                  </a>
                </div>

                {/* Call to Action Button */}
                <div className="space-y-3">
                  <Link
                    href="#book"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 bg-lux-dark text-white hover:bg-lux-espresso transition-all rounded-sm text-center text-[10px] tracking-[0.25em] font-medium block uppercase border border-lux-dark"
                  >
                    Book a Styling Session
                  </Link>
                  <div className="flex justify-center items-center gap-1.5 text-[8px] tracking-[0.15em] text-lux-taupe uppercase text-center">
                    <ShieldCheck className="w-3 h-3 text-lux-warm" />
                    <span>Hand-checked Quality · Nationwide Delivery</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
