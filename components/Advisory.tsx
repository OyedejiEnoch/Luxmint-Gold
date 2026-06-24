'use client';

import { motion } from 'motion/react';
import { Gem, Truck, MessageCircle } from 'lucide-react';

const COUNSEL_SERVICES = [
  {
    icon: Gem,
    label: '01 / QUALITY YOU CAN SEE',
    title: 'Hand-checked pieces',
    description: 'Every order is looked over before it ships — for finish, shine and the little details that make gold feel special. If it wouldn’t pass our own eye, it doesn’t go out.',
  },
  {
    icon: Truck,
    label: '02 / DELIVERED TO YOU',
    title: 'Nationwide delivery',
    description: 'We deliver carefully right across Nigeria, wrapped and ready — whether it’s a treat for yourself or a gift on its way to someone you love.',
  },
  {
    icon: MessageCircle,
    label: '03 / HERE TO HELP',
    title: 'Style help on WhatsApp',
    description: 'Tell us what you’re after and we’ll guide you — sizing, layering, gifting ideas. A quick message is all it takes to start.',
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
            WHY LUXMINT
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-white mb-6 font-normal tracking-tight">
            Beautiful gold, made <i className="font-serif font-light text-lux-sand">effortless</i> to own.
          </h2>
          <div className="w-12 h-[1px] bg-lux-sand/30 mx-auto my-6" />
          <p className="text-white/60 text-[13px] md:text-[14px] leading-relaxed font-light max-w-lg mx-auto">
            No queues, no pressure — just gorgeous pieces, honest advice, and delivery to your door anywhere in Nigeria.
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
                    The Luxmint Promise
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
