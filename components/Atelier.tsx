'use client';

import { motion, useReducedMotion } from 'motion/react';

const PROMISE = [
  {
    num: '01',
    title: 'Hand-selected',
    desc: 'Every piece is personally chosen for its quality, shine and finish.',
  },
  {
    num: '02',
    title: 'Everyday luxury',
    desc: 'Gold made to be worn on repeat — to work, to dinner, to everything.',
  },
  {
    num: '03',
    title: 'Ready to gift',
    desc: 'Beautifully boxed and ready to give — for someone you love, or you.',
  },
];

export default function OurStory() {
  const reduce = useReducedMotion();

  const fade = {
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
  };

  return (
    <section
      id="world"
      className="w-full bg-[#FAF9F6] text-lux-dark py-24 md:py-36 border-t border-lux-sand/20"
    >
      <div className="w-full max-w-3xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <motion.span
          {...fade}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 text-[11px] tracking-[0.32em] text-lux-taupe uppercase font-medium mb-8"
        >
          <span className="h-px w-8 bg-lux-warm/60" aria-hidden="true" />
          The Luxmint Story
          <span className="h-px w-8 bg-lux-warm/60" aria-hidden="true" />
        </motion.span>

        {/* Headline */}
        <motion.h2
          {...fade}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.08] font-light tracking-[-0.01em] text-lux-dark mb-10"
        >
          Every piece,{' '}
          <span className="italic text-lux-brown">chosen by hand.</span>
        </motion.h2>

        {/* Story */}
        <motion.p
          {...fade}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lux-dark/75 text-[16px] md:text-[20px] leading-[1.85] font-light max-w-2xl mx-auto"
        >
          Luxmint Gold began with a simple belief — that beautiful gold shouldn&rsquo;t be reserved
          for special occasions or impossible budgets. Founded and run in Nigeria, we curate gold
          accessories piece by piece, choosing each one for its shine, its weight, and the way it
          sits against the skin. Gold made for real life, worn every day, and passed on when the
          moment is right.
        </motion.p>

        {/* Quote */}
        <motion.blockquote
          {...fade}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 md:mt-16 max-w-2xl mx-auto"
        >
          <p className="font-serif italic text-lux-dark text-[20px] md:text-[28px] leading-[1.5]">
            &ldquo;Gold should feel like a part of you — not something you save for
            &lsquo;someday.&rsquo;&rdquo;
          </p>
          <cite className="block font-mono text-[12px] tracking-[0.25em] text-lux-taupe uppercase mt-6 not-italic">
            — The Founder, Luxmint Gold
          </cite>
        </motion.blockquote>
      </div>

      {/* The Luxmint promise — clean minimal row */}
      <div className="w-full max-w-4xl mx-auto px-6 mt-20 md:mt-28">
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-lux-sand/40">
          {PROMISE.map((item, i) => (
            <motion.div
              key={item.num}
              {...fade}
              transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="px-2 sm:px-8 py-10 text-center sm:border-l border-lux-sand/40 first:border-l-0 border-b sm:border-b-0 last:border-b-0"
            >
              <span className="block font-mono text-[11px] tracking-[0.2em] text-lux-warm mb-4">
                {item.num}
              </span>
              <h3 className="font-serif text-[24px] text-lux-dark mb-2.5 font-normal">{item.title}</h3>
              <p className="text-lux-dark/60 text-[15px] leading-relaxed font-light max-w-[22ch] mx-auto">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
