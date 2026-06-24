'use client';

import { motion } from 'motion/react';
import { Shield, TrendingUp, Coins } from 'lucide-react';

const COUNSEL_SERVICES = [
  {
    icon: Coins,
    label: '01 / ASSET ACQUISITION',
    title: '24K Sovereign Bullion',
    description: 'Direct procurement of physical, 99.99% pure gold bars. Hand-stamped and certified by the Luxmint Treasury with a secure assay mark, serving as the ultimate store of generational value.',
  },
  {
    icon: Shield,
    label: '02 / CUSTODIAN SERVICES',
    title: 'Sovereign Safe Storage',
    description: 'Fully-insured, climate-regulated private vault facilities situated in Victoria Island, Lagos, and Geneva, Switzerland. Subject to regular third-party audits with instantaneous client verification.',
  },
  {
    icon: TrendingUp,
    label: '03 / ESTATE ADVISORY',
    title: 'Bespoke Family Portfolios',
    description: 'Bespoke consultancies to structuralize private family wealth through high-grade physical gold. Seamless transition protocols designed to pass wealth securely down through generations.',
  }
];

export default function Advisory() {
  return (
    <section id="advisory" className="w-full bg-[#111111] py-24 md:py-36 text-white border-t border-white/5 relative overflow-hidden">
      {/* Absolute glowing gold dust ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lux-warm/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 relative z-10">
        
        {/* Header */}
        <div className="max-w-[720px] mx-auto text-center mb-20 md:mb-28">
          <span className="block text-[9px] tracking-[0.3em] text-lux-sand uppercase mb-5 font-semibold">
            THE SOVEREIGN COUNSEL • WEALTH
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-white mb-6 font-normal tracking-tight">
            Protecting your hard work with <i className="font-serif font-light text-lux-sand">indestructible</i> assets.
          </h2>
          <div className="w-12 h-[1px] bg-lux-sand/30 mx-auto my-6" />
          <p className="text-white/60 text-[13px] md:text-[14px] leading-relaxed font-light max-w-lg mx-auto">
            Gold is not merely an ornament. It is the only currency that has outlived every empire. We help you hold it securely.
          </p>
        </div>

        {/* 3-Column Luxury Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
          {COUNSEL_SERVICES.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="bg-white/[0.02] border border-white/5 p-8 md:p-10 lg:p-12 hover:bg-white/[0.04] hover:border-lux-sand/20 transition-all duration-500 flex flex-col justify-between group h-full"
              >
                <div>
                  {/* Subtle Top Label */}
                  <span className="block font-mono text-[8px] md:text-[9px] tracking-[0.2em] text-lux-sand uppercase mb-8">
                    {item.label}
                  </span>

                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-full text-lux-sand mb-8 group-hover:bg-lux-sand group-hover:text-black transition-all duration-500">
                    <IconComponent className="w-4 h-4 stroke-[1.2]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl md:text-2xl text-white font-normal tracking-tight mb-4 group-hover:text-lux-sand transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-[13px] leading-[1.75] font-light">
                    {item.description}
                  </p>
                </div>

                {/* Learn More link with micro line */}
                <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/45 group-hover:text-lux-sand transition-colors">
                    Treasury Protocol
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-lux-sand transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
