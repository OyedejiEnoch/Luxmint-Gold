'use client';

import Image from 'next/image';
import Link from 'next/link';

const CATEGORIES = [
  {
    id: 'rings',
    title: 'SIGNATURE INVEST RINGS',
    price: 'FROM ₦450,000 NGN',
    image: 'https://i.pinimg.com/736x/a4/c3/5e/a4c35eb64e16357b030f984f0dfaba09.jpg',
  },
  {
    id: 'bracelets',
    title: 'BESPOKE CHAIN BRACELET',
    price: 'FROM ₦950,000 NGN',
    image: 'https://i.pinimg.com/736x/7b/d4/9a/7bd49abf106ccdd58678dd0b9a5876a6.jpg',
  },
  {
    id: 'earrings',
    title: 'STATEMENT SHIELD HOOPS',
    price: 'FROM ₦380,000 NGN',
    image: 'https://i.pinimg.com/736x/2f/39/4d/2f394d20289fc6c99b26035e95ab82a4.jpg',
  },
  {
    id: 'necklaces',
    title: 'LUXMINT ANCHOR NECKLACE',
    price: 'FROM ₦850,000 NGN',
    image: 'https://i.pinimg.com/1200x/05/35/3e/05353e841b8f9ebaa0ee3d5b4a4e04a5.jpg',
  }
];

export default function Offerings() {
  return (
    <section id="shop" className="w-full bg-white py-24 md:py-32 border-t border-lux-sand/15">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="max-w-[720px] mx-auto text-center mb-16 md:mb-24 px-4">
          <span className="block text-[9px] tracking-[0.3em] text-black uppercase mb-5 font-semibold">
            WHAT WE OFFER
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-lux-dark mb-4 font-normal tracking-tight">
            Everything gold, crafted for your <i className="font-serif font-light text-black">lifestyle</i> and your legacy.
          </h2>
          <p className="text-black text-[14px] md:text-[15px] leading-relaxed font-light mt-4">
            From gold chains, to necklace, pendants, rings.....
          </p>
        </div>

        {/* Outer Grid/Scroll Container */}
        <div className="relative">
          
          {/* Horizontal Scrolling Wrapper */}
          <div 
            className="w-full overflow-x-auto scrollbar-none flex gap-4 md:gap-6 lg:gap-8 pb-4 scroll-smooth snap-x snap-mandatory"
          >
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/shop/${category.id}`}
                className="w-[280px] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-start flex flex-col group/item cursor-pointer"
              >
                {/* Image Frame with precise off-white high-end presentation */}
                <div className="relative w-full aspect-[4/5] bg-[#f9f8f6] border border-lux-sand/10 overflow-hidden mb-5">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover object-center transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover/item:scale-[1.04]"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/[0.02] mix-blend-multiply pointer-events-none" />
                </div>

                {/* Info Text - Perfectly Left Aligned per reference */}
                <div className="flex flex-col text-left px-1">
                  <h3 className="text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-lux-dark font-medium mb-1 group-hover/item:text-black transition-colors duration-300">
                    {category.title}
                  </h3>
                  <span className="font-mono text-[9px] tracking-widest text-lux-taupe">
                    {category.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
