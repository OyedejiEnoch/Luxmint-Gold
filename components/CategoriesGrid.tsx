'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const CATEGORIES = [
  {
    id: 'chains',
    eyebrow: 'STATEMENT & LAYERING LINKS',
    title: 'Gold Chains',
    desc: 'From delicate everyday links to bold statement chains.',
    image: 'https://i.pinimg.com/1200x/c2/4f/11/c24f1185a20006322bec7f5b93c64e44.jpg',
    link: '/shop/chains',
  },
  {
    id: 'earrings',
    eyebrow: 'HOOPS, STUDS & CUFFS',
    title: 'Fine Earrings',
    desc: 'Hoops, ear cuffs and studs for every occasion.',
    image: 'https://i.pinimg.com/736x/2f/39/4d/2f394d20289fc6c99b26035e95ab82a4.jpg',
    link: '/shop/earrings',
  },
  {
    id: 'pendants',
    eyebrow: 'EVERYDAY ICONS',
    title: 'Pendants',
    desc: 'Meaningful pieces to wear close, every single day.',
    image: 'https://i.pinimg.com/1200x/54/12/33/5412332151911548de612554a8fa5be2.jpg',
    link: '/shop/pendants',
  },
  {
    id: 'rings',
    eyebrow: 'SIGNETS & STACKING BANDS',
    title: 'Signature Rings',
    desc: 'Polished signets and slim bands made to stack.',
    image: 'https://i.pinimg.com/736x/a4/c3/5e/a4c35eb64e16357b030f984f0dfaba09.jpg',
    link: '/shop/rings',
  }
];

export default function CategoriesGrid() {
  return (
    <section className="w-full bg-white py-16 md:py-28 border-t border-lux-sand/15">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Section Heading */}
        <div className="max-w-[720px] mx-auto text-center mb-16 md:mb-24">
          <span className="block text-[9px] tracking-[0.3em] text-black uppercase mb-4 font-semibold">
            SHOP BY CATEGORY
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-lux-dark mb-6 font-normal tracking-tight">
            Find your <i className="font-serif font-light text-black">forever</i> piece.
          </h2>
          <div className="w-12 h-[1px] bg-black/20 mx-auto my-6" />
          <p className="text-black text-[14px] md:text-[15px] leading-relaxed font-light max-w-lg mx-auto">
            A hand-picked edit of gold accessories &mdash; chosen for shine, quality and the way they wear. Browse the categories and find the one that&rsquo;s yours.
          </p>
        </div>

        {/* Editorial Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full overflow-hidden group/card cursor-pointer"
            >
              {/* Image Frame */}
              <div className="absolute inset-0 bg-[#f9f8f6]">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover object-center transition-transform duration-[2000ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover/card:scale-105 filter brightness-[0.85] contrast-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35 group-hover/card:from-black/85 group-hover/card:via-black/30 group-hover/card:to-black/45 transition-colors duration-700" />
              </div>

              {/* Card Text Content (Centered, elegant editorial layout) */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 lg:p-16 text-center text-white z-10">
                
                {/* Top Eyebrow */}
                <span className="block text-[9px] md:text-[10px] tracking-[0.3em] text-lux-sand/90 font-semibold uppercase">
                  {category.eyebrow}
                </span>

                {/* Centered Large Headline */}
                <div className="my-auto space-y-4">
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-white group-hover/card:text-lux-sand transition-colors duration-500">
                    {category.title}
                  </h3>
                  <p className="text-[12px] md:text-[13px] text-lux-light/80 font-light max-w-sm mx-auto leading-relaxed opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0 transition-all duration-700 ease-out hidden sm:block">
                    {category.desc}
                  </p>
                </div>

                {/* Bottom Call to Action Button */}
                <div>
                  <Link
                    href={category.link}
                    className="inline-block px-10 py-3.5 bg-white/10 hover:bg-white text-white hover:text-lux-dark border border-white/20 text-[10px] tracking-[0.25em] font-semibold uppercase transition-all duration-500"
                  >
                    SHOP NOW
                  </Link>
                </div>

              </div>

              {/* Subtle outer light boundary on hover */}
              <div className="absolute inset-4 border border-white/0 group-hover/card:border-white/10 transition-all duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
