'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Heart, 
  ShoppingBag, 
  SlidersHorizontal, 
  X, 
  ArrowLeft, 
  Check, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';
import Footer from '@/components/Footer';

// Define the comprehensive luxury gold inventory
const INVENTORY: Record<string, Array<{
  id: string;
  title: string;
  specs: string;
  material: string;
  price: number;
  priceFormatted: string;
  image: string;
  badge?: string;
  description: string;
}>> = {
  earrings: [
    {
      id: 'er-1',
      title: 'DUO FRECKLES EARRINGS',
      specs: '18 Carat Yellow Gold',
      material: '18K Gold & Dalmatian Jasper',
      price: 360000,
      priceFormatted: '₦360,000 NGN',
      image: 'https://i.pinimg.com/736x/2f/39/4d/2f394020289fc6c99b26035e95ab82a4.jpg',
      badge: 'NEW',
      description: 'Handcrafted hollow-form 18-karat hoops supporting a detachable pair of hand-cut Dalmatian Jasper rings. An asymmetric masterpiece inspired by modern organic shapes.'
    },
    {
      id: 'er-2',
      title: 'FINE GOSSAMER HOOP',
      specs: '18 Carat Yellow Gold',
      material: '18K Solid Gold • Micro-Brilliants',
      price: 455000,
      priceFormatted: '₦455,000 NGN',
      image: 'https://i.pinimg.com/736x/04/1d/61/041d610bf23b28878f78ffb77b78f775.jpg',
      badge: 'TIMELESS',
      description: 'Sophisticated lightweight hoops lined with brilliant-cut micro diamonds. Perfect daily statement studs designed for high-density light reflection.'
    },
    {
      id: 'er-3',
      title: 'JASMINE DROP EARRINGS',
      specs: '22 Carat Gold Gilded',
      material: '22K Gilded Silver',
      price: 320000,
      priceFormatted: '₦320,000 NGN',
      image: 'https://i.pinimg.com/736x/49/c5/ec/49c5ec1bc1a35a3e524988137c2e939a.jpg',
      badge: 'EXCLUSIVE',
      description: 'Elegant cast teardrop earrings hanging from a secure micro-link chain. Features a mirror-smooth liquid gold finish.'
    },
    {
      id: 'er-4',
      title: 'STATEMENT SHIELD HOOPS',
      specs: '18 Carat Solid Gold',
      material: '18K Yellow Gold',
      price: 380000,
      priceFormatted: '₦380,000 NGN',
      image: 'https://i.pinimg.com/736x/8e/d6/fb/8ed6fb5b53fd8b893e8bf92af1a0497c.jpg',
      badge: 'ATELIER',
      description: 'Heavy architectural-profile hoops utilizing a hollow-core technique. Deep golden hues reminiscent of traditional Nigerian jewelry smithing.'
    },
    {
      id: 'er-5',
      title: 'STATEMENT SHIELD HOOPS',
      specs: '18 Carat Solid Gold',
      material: '18K Yellow Gold',
      price: 380000,
      priceFormatted: '₦380,000 NGN',
      image: 'https://i.pinimg.com/736x/d5/ef/ef/d5efeff384e150ad3eb1992296fcfe7c.jpg',
      badge: 'ATELIER',
      description: 'Heavy architectural-profile hoops utilizing a hollow-core technique. Deep golden hues reminiscent of traditional Nigerian jewelry smithing.'
    },
    {
      id: 'er-6',
      title: 'STATEMENT SHIELD HOOPS',
      specs: '18 Carat Solid Gold',
      material: '18K Yellow Gold',
      price: 380000,
      priceFormatted: '₦380,000 NGN',
      image: 'https://i.pinimg.com/736x/09/c9/a2/09c9a2f97cc25c437bee165c44de9002.jpg',
      badge: 'ATELIER',
      description: 'Heavy architectural-profile hoops utilizing a hollow-core technique. Deep golden hues reminiscent of traditional Nigerian jewelry smithing.'
    }
  ],
  rings: [
    {
      id: 'rg-1',
      title: 'VIVA VANILLA XL RING',
      specs: '22 Carat Yellow Gold',
      material: '22K Solid Gold',
      price: 450000,
      priceFormatted: '₦450,000 NGN',
      image: 'https://i.pinimg.com/736x/a4/c3/5e/a4c35eb64e16357b030f984f0dfaba09.jpg',
      badge: 'NEW',
      description: 'An organic, dome-styled heavy signet ring crafted to feel heavy and substantial. Featuring a flawless hand-buffed satin finish.'
    },
    {
      id: 'rg-2',
      title: 'BOTT MINI RING',
      specs: '18 Carat Solid Gold',
      material: '18K Yellow Gold',
      price: 280000,
      priceFormatted: '₦280,000 NGN',
      image: 'https://i.pinimg.com/1200x/4a/ae/1b/4aae1b2e86553ffc91dc8716569b83b5.jpg',
      badge: 'TIMELESS',
      description: 'Interlinked beaded design, serving as an outstanding stackable daily companion or understated solo statement.'
    },
    {
      id: 'rg-3',
      title: 'VIVA BLACK XL RING',
      specs: '22 Carat Yellow Gold',
      material: '22K Gold & Black Onyx',
      price: 459000,
      priceFormatted: '₦459,000 NGN',
      image: 'https://i.pinimg.com/736x/e1/75/9b/e1759b9c291d6ba8c35787264e407cbc.jpg',
      badge: 'EXCLUSIVE',
      description: 'Bold high-carat gold dome ring split with an exquisite, masterfully carved black onyx natural stone inlay.'
    },
    {
      id: 'rg-4',
      title: 'PEARL LINK RING',
      specs: '22 Carat Yellow Gold',
      material: '22K Gold & South Sea Pearl',
      price: 520000,
      priceFormatted: '₦520,000 NGN',
      image: 'https://i.pinimg.com/736x/61/8c/19/618c19dd8e4129ca8f36b64896a3b419.jpg',
      badge: 'ATELIER',
      description: 'Heavy interlocking link-work structured directly into the band, supporting a single pristine, high-luster South Sea Pearl.'
    },
    {
      id: 'rg-5',
      title: 'PEARL LINK RING',
      specs: '22 Carat Yellow Gold',
      material: '22K Gold & South Sea Pearl',
      price: 520000,
      priceFormatted: '₦520,000 NGN',
      image: 'https://i.pinimg.com/736x/80/34/13/80341388cfef554455c03f0e61849432.jpg',
      badge: 'ATELIER',
      description: 'Heavy interlocking link-work structured directly into the band, supporting a single pristine, high-luster South Sea Pearl.'
    },
    {
      id: 'rg-6',
      title: 'PEARL LINK RING',
      specs: '22 Carat Yellow Gold',
      material: '22K Gold & South Sea Pearl',
      price: 520000,
      priceFormatted: '₦520,000 NGN',
      image: 'https://i.pinimg.com/736x/61/8c/19/618c19dd8e4129ca8f36b64896a3b419.jpg',
      badge: 'ATELIER',
      description: 'Heavy interlocking link-work structured directly into the band, supporting a single pristine, high-luster South Sea Pearl.'
    }
  ],
  bracelets: [
    {
      id: 'br-1',
      title: 'BESPOKE CHAIN BRACELET',
      specs: '18 Carat Yellow Gold',
      material: '18K Solid Gold',
      price: 950000,
      priceFormatted: '₦950,000 NGN',
      image: 'https://i.pinimg.com/736x/7b/d4/9a/7bd49abf106ccdd58678dd0b9a5876a6.jpg',
      badge: 'NEW',
      description: 'Intricately forged asymmetric chunky chain bracelet incorporating our proprietary luxury spring toggle clasp.'
    },
    {
      id: 'br-2',
      title: 'LUNETTE BRACELET',
      specs: '18 Carat Yellow Gold',
      material: '18K Gold • Bezel Diamond',
      price: 320000,
      priceFormatted: '₦320,000 NGN',
      image: 'https://i.pinimg.com/736x/a1/f0/c1/a1f0c10c4d220bdce40a9e8fbf69a355.jpg',
      badge: 'TIMELESS',
      description: 'A whisper-light trace chain accented with a brilliant-cut solitaire diamond encased in an 18-karat bezel setting.'
    },
    {
      id: 'br-3',
      title: 'CORDA DOUBLE WRAP BRACELET',
      specs: '22 Carat Gold Gilded',
      material: '22K Gold & Full Grain Leather',
      price: 625000,
      priceFormatted: '₦625,000 NGN',
      image: 'https://i.pinimg.com/736x/19/ca/be/19cabeeb03ee85a0e4c4b6d441748815.jpg',
      badge: 'EXCLUSIVE',
      description: 'Premium double-wrapped espresso-toned Italian leather featuring a structural 22-karat solid gold lock fixture.'
    },
    {
      id: 'br-4',
      title: 'KITE ARCH CUFF',
      specs: '18 Carat Yellow Gold',
      material: '18K Solid Gold',
      price: 580000,
      priceFormatted: '₦580,000 NGN',
      image: 'https://i.pinimg.com/736x/3a/1c/28/3a1c28b203c6ef64eaed6e94315df170.jpg',
      badge: 'ATELIER',
      description: 'A hand-hammered rigid gold cuff featuring geometric edge facets designed to hug the wrist perfectly.'
    },
    {
      id: 'br-5',
      title: 'KITE ARCH CUFF',
      specs: '18 Carat Yellow Gold',
      material: '18K Solid Gold',
      price: 580000,
      priceFormatted: '₦580,000 NGN',
      image: 'https://i.pinimg.com/1200x/87/a0/29/87a029893b1ac9906ba68fdf1b1db838.jpg',
      badge: 'ATELIER',
      description: 'A hand-hammered rigid gold cuff featuring geometric edge facets designed to hug the wrist perfectly.'
    },
    {
      id: 'br-6',
      title: 'KITE ARCH CUFF',
      specs: '18 Carat Yellow Gold',
      material: '18K Solid Gold',
      price: 580000,
      priceFormatted: '₦580,000 NGN',
      image: 'https://i.pinimg.com/736x/b9/a8/4d/b9a84d1eda3ce3f97f9608e7dd24bbff.jpg',
      badge: 'ATELIER',
      description: 'A hand-hammered rigid gold cuff featuring geometric edge facets designed to hug the wrist perfectly.'
    }
  ],
  pendants: [
    {
      id: 'pd-1',
      title: 'THE MONARCH PENDANT',
      specs: '22 Carat Yellow Gold',
      material: '22K Solid Gold',
      price: 680000,
      priceFormatted: '₦680,000 NGN',
      image: 'https://i.pinimg.com/1200x/54/12/33/5412332151911548de612554a8fa5be2.jpg',
      badge: 'NEW',
      description: 'A sovereign heirloom tag intricately hand-etched with traditional geometric shield patterns from Lagos.'
    },
    {
      id: 'pd-2',
      title: 'SOVEREIGN SUN MEDALLION',
      specs: '18 Carat Solid Gold',
      material: '18K Yellow Gold',
      price: 720000,
      priceFormatted: '₦720,000 NGN',
      image: 'https://i.pinimg.com/736x/b9/c6/24/b9c624e258e58273324b5eb9d0f2787c.jpg',
      badge: 'EXCLUSIVE',
      description: 'A circular sunburst medallion representing abundance and strength. Hand-finished wirework frame.'
    },
    {
      id: 'pd-3',
      title: 'LAGOON POURED TAG',
      specs: '24 Carat Gold Bullion',
      material: '24K Pure Gold',
      price: 850000,
      priceFormatted: '₦850,000 NGN',
      image: 'https://i.pinimg.com/736x/25/22/93/252293b384a361af92617f08e4cf62b1.jpg',
      badge: 'ATELIER',
      description: 'Forged from physical investment bullion, presenting natural, fluid sand-ripple structures across its surface.'
    }
  ],
  necklaces: [
    {
      id: 'nc-1',
      title: 'FINE GOSSAMER NECKLACE',
      specs: '18 Carat Yellow Gold',
      material: '18K Gold • Solitaire Diamond',
      price: 525000,
      priceFormatted: '₦525,000 NGN',
      image: 'https://i.pinimg.com/1200x/05/35/3e/05353e841b8f9ebaa0ee3d5b4a4e04a5.jpg',
      badge: 'TIMELESS',
      description: 'An exceptionally fine link chain supporting a single brilliant-cut diamond pendant. Subtle, understated luxury.'
    },
    {
      id: 'nc-2',
      title: 'LUXMINT ANCHOR NECKLACE',
      specs: '22 Carat Yellow Gold',
      material: '22K Yellow Gold',
      price: 850000,
      priceFormatted: '₦850,000 NGN',
      image: 'https://i.pinimg.com/736x/25/22/93/252293b384a361af92617f08e4cf62b1.jpg',
      badge: 'EXCLUSIVE',
      description: 'Heavy architectural-profile chain combining thick custom links and a hand-crafted bar toggle clasp.'
    },
    {
      id: 'nc-3',
      title: 'HERITAGE BEADED CHOKER',
      specs: '18 Carat Solid Gold',
      material: '18K Yellow Gold',
      price: 980000,
      priceFormatted: '₦980,000 NGN',
      image: 'https://i.pinimg.com/736x/05/a6/38/05a638b356f03a53f874cbb407b2bcc1.jpg',
      badge: 'ATELIER',
      description: 'Stunning array of solid hollow gold beads strung together beautifully. Brings historical African prestige into modern day.'
    }
  ],
  chains: [
    {
      id: 'ch-1',
      title: 'APEX 24K SOVEREIGN CHAIN',
      specs: '24 Carat Pure Gold Bullion',
      material: '24K Pure Gold (99.99%)',
      price: 1850000,
      priceFormatted: '₦1,850,000 NGN',
      image: 'https://i.pinimg.com/1200x/c2/4f/11/c24f1185a20006322bec7f5b93c64e44.jpg',
      badge: 'TREASURY',
      description: 'The ultimate store of liquid asset. Masterfully hand-drawn solid gold bullion links, presenting maximum weight and purity.'
    },
    {
      id: 'ch-2',
      title: 'STANDARD CABLE LINK CHAIN',
      specs: '18 Carat Yellow Gold',
      material: '18K Solid Yellow Gold',
      price: 650000,
      priceFormatted: '₦650,000 NGN',
      image: 'https://i.pinimg.com/736x/fc/b2/51/fcb251916714c5152fa68f78ad380a76.jpg',
      badge: 'TIMELESS',
      description: 'A sleek, classical cable chain with high-polish faceted links that catch lights from every angle.'
    },
    {
      id: 'ch-3',
      title: 'TRADITIONAL ROPE BRAID CHAIN',
      specs: '22 Carat Solid Gold',
      material: '22K Solid Gold',
      price: 1200000,
      priceFormatted: '₦1,200,000 NGN',
      image: 'https://i.pinimg.com/736x/05/a6/38/05a638b356f03a53f874cbb407b2bcc1.jpg',
      badge: 'ATELIER',
      description: 'Masterfully hand-woven gold threads forming a dense, complex rope spiral structure. Extremely strong and heirloom-ready.'
    }
  ]
};

const CATEGORY_META: Record<string, { title: string; subtitle: string; desc: string }> = {
  earrings: {
    title: 'FINE EARRINGS',
    subtitle: 'SHIELD HOOPS & DIAMOND STUDS',
    desc: 'Unprecedented architectural statements and light-catching studs handcrafted in 18-karat and 22-karat gold.'
  },
  rings: {
    title: 'SIGNATURE RINGS',
    subtitle: 'INVESTMENT BANDS & DOME SIGNETS',
    desc: 'Bespoke solid gold bands, high-polished domes, and black onyx signets crafted to be passed down through generations.'
  },
  bracelets: {
    title: 'BESPOKE BRACELETS',
    subtitle: 'HEAVY CUFFS & FLUID LINKS',
    desc: 'Hand-drawn gold wires, rigid faceted cuffs, and interlocking link-works showcasing structural luxury.'
  },
  pendants: {
    title: 'SOVEREIGN PENDANTS',
    subtitle: 'HAND-CAST MEDALLIONS & TAGS',
    desc: 'Curated tokens combining ancient West African smithing tradition and modern Swiss structural geometry.'
  },
  necklaces: {
    title: 'FINE NECKLACES',
    subtitle: 'DELICATE CHAINS & CHOKERS',
    desc: 'Sleek neckpieces embedded with pristine South Sea pearls and hand-selected brilliant-cut solitaire diamonds.'
  },
  chains: {
    title: 'INVESTMENT CHAINS',
    subtitle: '24K BULLION & HEAVY APEX LINKS',
    desc: 'Pure, certified 24-karat solid gold bullion chains, presenting a flawless synthesis of art and timeless assets.'
  }
};

const CATEGORY_EDITORIAL: Record<string, {
  intro: string;
  title: string;
  p1: React.ReactNode;
  p2: React.ReactNode;
  whyHeader: string;
  bullets: string[];
}> = {
  earrings: {
    intro: "Are you looking for solid gold, high-carat, or certified diamond earrings for any occasion? Want jewelry that is both versatile and makes you stand out from the crowd? At Luxmint, we combine historic Lagos-inspired design lines with Swiss refining standards, creating original and expressive earrings that add a lasting glow to every silhouette. Jewelry that complements your features is the absolute best way to express your personal asset ledger and style. At Luxmint, you'll find timeless, sovereign earring designs that exceed expectations.",
    title: "Fine earrings - Luxmint Atelier collection",
    p1: (
      <>
        At Luxmint, we create unique and original earrings. We combine heritage-steeped prestige with modern geometries, employing robust hollow-form techniques and original composite materials. Our <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">shield hoops</span>, <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">gossamer studs</span>, and <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">asymmetric shapes</span> encourage self-expression and the curation of unique wealth assets. The Luxmint collection of delicate patterns and substantial gold volumes allows you to find earrings to suit every aesthetic profile.
      </>
    ),
    p2: (
      <>
        We offer <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">18-karat and 22-karat gold earrings</span>, adorned with exquisite South Sea pearls, or inlaid with the natural beauty of hand-selected Dalmatian Jasper stones. Our products combine physical asset security with a conscious embrace of timeless architectural trends, ensuring they remain liquid and pristine forever.
      </>
    ),
    whyHeader: "Why is it worth choosing earrings from the Luxmint Atelier Collection?",
    bullets: [
      "Unique designs full of cultural history and pure light.",
      "Ultra-high-density workmanship with meticulous attention to assays and hallmarks.",
      "A secure catalog of models with customizable secure fasteners.",
      "Solid gold compositions verified by global laboratory standards.",
      "Timeless patterns designed for modern wealth portfolios."
    ]
  },
  rings: {
    intro: "Are you seeking a bold physical signet, an investment-grade band, or a custom precious stone ring? Want pieces that merge solid-metal weight with timeless geometry? At Luxmint, we forge rings that feel substantial and carry immediate visual presence. Whether worn as a personal stamp or stacked, our signature rings offer an unyielding statement of prestige and durable capital. Discover sovereign rings crafted to be worn daily and passed down through generations.",
    title: "Signature rings - Luxmint Atelier collection",
    p1: (
      <>
        At Luxmint, we create unique and original rings. We combine ancient sand-cast textures with flawless modern buffing, employing premium heavy hollow-form and solid-core methods. Our <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">dome signets</span>, <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">beaded bands</span>, and <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">geometric stacks</span> encourage experimental curation and the statement of personal power. The Luxmint collection of rings provides an exquisite variety of physical gold weights to suit every hand.
      </>
    ),
    p2: (
      <>
        We offer <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">22-karat solid rings</span> split with flawless inlays like rich black onyx, or crowned with magnificent South Sea pearls. Our products merge raw physical gold values with state-of-the-art designs, ensuring they remain timeless heirlooms of lasting value.
      </>
    ),
    whyHeader: "Why is it worth choosing rings from the Luxmint Atelier Collection?",
    bullets: [
      "Heavy-cast solid gold weights with unparalleled structural integrity.",
      "Masterful hand-buffed satin and mirror-polished gold finishes.",
      "Precision-carved natural stone and precious gem inlays.",
      "Officially registered hallmark stamps confirming actual metal carat assays.",
      "Ergonomically designed profiles for daily wear comfort and luxury feel."
    ]
  },
  bracelets: {
    intro: "Searching for a rigid structural cuff, a fluid hand-drawn link, or a heavy statement bangle? Want wristwear that pairs effortlessly with other valuables? At Luxmint, we construct bracelets that balance structural rigidity with natural bodily movement. Each piece is hand-hammered or linked to reflect maximum light and convey a sense of secure, high-density craftsmanship.",
    title: "Bespoke bracelets - Luxmint Atelier collection",
    p1: (
      <>
        At Luxmint, we create unique and original bracelets. We combine centuries-old wirework with state-of-the-art clasp mechanics. Our <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">asymmetric chunky chains</span>, <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">rigid hand-hammered cuffs</span>, and <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">delicate trace bands</span> encourage versatile style statements. The collection allows you to explore both lightweight daily markers and heavy gold assets.
      </>
    ),
    p2: (
      <>
        We offer <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">18-karat and 22-karat bracelets</span>, adorned with brilliant bezel-set solitaire diamonds and fitted with structural gold locks. Our designs align physical gold asset preservation with high-end aesthetic value.
      </>
    ),
    whyHeader: "Why is it worth choosing bracelets from the Luxmint Atelier Collection?",
    bullets: [
      "Individually forged structural links and heavy rigid bands.",
      "Secure proprietary clasp locks engineered for active life defense.",
      "Masterful texturing, from satin sand-brushing to high-gloss mirror polishes.",
      "Certified gold purity levels compliant with Swiss and Nigerian hallmark assays.",
      "Elegant gift presentation with comprehensive assay certificates of origin."
    ]
  },
  pendants: {
    intro: "Looking for a historical medallion, a poured asset tag, or an intricate talisman pendant? Want a central showcase piece that anchors your favorite gold chains? At Luxmint, our pendants are inspired by traditional West African motifs and engineered using precise geometric parameters. They represent strength, abundance, and sovereign historical prestige.",
    title: "Sovereign pendants - Luxmint Atelier collection",
    p1: (
      <>
        At Luxmint, we create unique and original pendants. We combine ancient engraving methods with modern laser etching. Our <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">sovereign shield tags</span>, <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">sunburst medallions</span>, and <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">fluid poured bullion tags</span> are designed to be immediate conversation starters. Every piece is an artistic ledger documenting premium metal craft.
      </>
    ),
    p2: (
      <>
        We offer <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">22-karat and pure 24-karat gold pendants</span>, showcasing hand-worked filigree frames or organic sand-ripple details. Our products are investments that can be styled on necklaces or collected as secure bullion assets.
      </>
    ),
    whyHeader: "Why is it worth choosing pendants from the Luxmint Atelier Collection?",
    bullets: [
      "High-carat and pure gold castings displaying remarkable weight.",
      "Intricately etched designs inspired by authentic historical motifs.",
      "Versatile bail sizes compatible with various chain thicknesses and links.",
      "Rigorous assay testing with officially registered registry numbers.",
      "Collectible investment value rooted in high-purity gold volumes."
    ]
  },
  necklaces: {
    intro: "Seeking an exquisite diamond-drop necklace, a heavy architectural link chain, or a classic beaded choker? At Luxmint, we craft necklaces that redefine the collarbone landscape. Combining delicate, whisper-light chains with substantial, hand-threaded hollow gold beads, our collections bring authentic historical elegance to the forefront of modern high-end fashion.",
    title: "Fine necklaces - Luxmint Atelier collection",
    p1: (
      <>
        At Luxmint, we create unique and original necklaces. We combine traditional Nigerian bead-weaving logic with fine European link engineering. Our <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">beaded chokers</span>, <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">solitaire drops</span>, and <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">heavy anchor links</span> encourage diverse styling options. The Luxmint necklace selection offers the perfect harmony between subtle everyday accents and heavy ceremonial displays.
      </>
    ),
    p2: (
      <>
        We offer <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">18-karat and 22-karat necklaces</span>, showcasing magnificent South Sea pearls and hand-selected brilliant-cut solitaire diamonds. Our products are forged to hold physical density while moving with flawless, liquid-like grace.
      </>
    ),
    whyHeader: "Why is it worth choosing necklaces from the Luxmint Atelier Collection?",
    bullets: [
      "Exceptionally strong links and secure high-grade lock clasps.",
      "Hand-picked brilliant-cut diamonds and pristine South Sea pearls.",
      "Perfect physical balance ensuring the necklace rests comfortably.",
      "Officially registered carat specifications and quality certifications.",
      "An exquisite fusion of cultural prestige and modern minimal lines."
    ]
  },
  chains: {
    intro: "Are you looking for maximum weight, pure liquid gold bullion chains, or a heavy classical cable link chain? Want a chain that serves as both an ultimate store of wealth and an imposing style signature? At Luxmint, our investment chains are drawn by hand from pure solid bullion, offering the ultimate physical asset in its most beautiful, portable form.",
    title: "Investment chains - Luxmint Atelier collection",
    p1: (
      <>
        At Luxmint, we draw unique and original chains. We combine pure physical treasury parameters with exquisite gold thread weaving. Our <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">apex 24-karat chains</span>, <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">rope braids</span>, and <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">faceted cable links</span> represent the peak of raw gold asset value. The Luxmint collection offers high-density jewelry designed to withstand market cycles and maintain absolute liquid worth.
      </>
    ),
    p2: (
      <>
        We offer <span className="underline decoration-black/40 underline-offset-4 cursor-pointer hover:text-black transition-all duration-300">22-karat and 24-karat solid pure chains</span>, meticulously tested for gold content purity and assayed globally. Each piece acts as a portable ledger, representing a pristine fusion of fine craft and investment bullion security.
      </>
    ),
    whyHeader: "Why is it worth choosing chains from the Luxmint Atelier Collection?",
    bullets: [
      "Solid gold compositions up to 99.9% pure bullion.",
      "Exceptional heavy weights calculated to serve as physical assets.",
      "Masterfully woven links with maximum tensile strength.",
      "Certified assay reports from international sovereign refineries.",
      "Seamless integration with Luxmint sovereign bails and pendants."
    ]
  }
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const rawCategory = params?.category as string;
  
  // Normalize category name
  const category = useMemo(() => {
    return rawCategory?.toLowerCase() || 'earrings';
  }, [rawCategory]);

  const meta = useMemo(() => {
    return CATEGORY_META[category] || {
      title: 'THE GOLD ATELIER',
      subtitle: 'EXCLUSIVE ARCHIVE',
      desc: 'Explore the highly secure catalog of pure, ethically-sourced gold offerings meticulously designed in Lagos.'
    };
  }, [category]);

  const items = useMemo(() => {
    return INVENTORY[category] || INVENTORY.earrings;
  }, [category]);

  const editorial = useMemo(() => {
    return CATEGORY_EDITORIAL[category] || CATEGORY_EDITORIAL.earrings;
  }, [category]);

  // States
  const [filterMetal, setFilterMetal] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [activeProductModal, setActiveProductModal] = useState<any | null>(null);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Filter & Sort Logic
  const processedItems = useMemo(() => {
    let result = [...items];

    // Filter by Metal
    if (filterMetal !== 'all') {
      result = result.filter(item => {
        if (filterMetal === '18k') return item.specs.includes('18');
        if (filterMetal === '22k') return item.specs.includes('22');
        if (filterMetal === '24k') return item.specs.includes('24');
        return true;
      });
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [items, filterMetal, sortBy]);

  // Handle Wishlist Toggle
  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Handle Add to Bag
  const addToBag = (product: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart(prev => [...prev, product.id]);
    setCartCount(prev => prev + 1);
    
    // Smooth high-end toast notifications if needed
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-6 right-6 z-[100] bg-lux-dark text-white text-[10px] tracking-widest uppercase py-4 px-6 border border-lux-sand/20 flex items-center gap-3 animate-fade-in shadow-xl';
    notification.innerHTML = `
      <svg class="w-4 h-4 text-lux-warm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
      <span>ADDED ${product.title} TO BAG</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('opacity-0');
      setTimeout(() => notification.remove(), 500);
    }, 2500);
  };

  // Share Item
  const shareItem = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${window.location.href}?product=${product.id}`);
      const info = document.createElement('div');
      info.className = 'fixed bottom-6 right-6 z-[100] bg-lux-dark text-white text-[10px] tracking-widest uppercase py-4 px-6 border border-lux-sand/20 animate-fade-in shadow-xl';
      info.innerText = 'LINK COPED TO PATRON CLIPBOARD';
      document.body.appendChild(info);
      setTimeout(() => {
        info.classList.add('opacity-0');
        setTimeout(() => info.remove(), 500);
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      
      {/* Dynamic Sub-header padding for absolute positioned navbar offset */}
      <div className="pt-32 md:pt-40">
        
        {/* Editorial Top breadcrumbs & Title Header */}
        <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 mb-12 md:mb-16">
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-lux-taupe mb-8">
            <Link href="/" className="hover:text-lux-dark transition-colors">House</Link>
            <span>/</span>
            <span className="text-lux-dark font-medium">Shop</span>
            <span>/</span>
            <span className="text-lux-dark font-semibold">{category}</span>
          </div>

          <div className="max-w-4xl">
            <span className="block font-mono text-[9px] md:text-[10px] tracking-[0.35em] text-black uppercase mb-4">
              {meta.subtitle}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-tight text-lux-dark mb-6">
              {meta.title}
            </h1>
            <p className="text-black/90 text-[15px] leading-relaxed font-light max-w-2xl">
              {meta.desc}
            </p>
          </div>
        </section>

        {/* Minimalist Bordered Filter & Sort Bar (Strathberry Reference) */}
        <section className="w-full border-t border-b border-lux-sand/20 py-5 bg-[#FAF9F6]">
          <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 flex items-center justify-between">
            
            {/* Left Filter & Sort Button */}
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setShowFilterDrawer(true)}
                className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.2em] font-medium text-lux-dark hover:text-black transition-colors cursor-pointer focus:outline-none"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 stroke-[1.2]" />
                <span>Filter & Sort</span>
              </button>

              {/* Inline Quick Carat Filters (Only on desktop) */}
              <div className="hidden lg:flex items-center gap-4 border-l border-lux-sand/30 pl-8">
                <span className="text-[9px] uppercase tracking-[0.2em] text-lux-taupe mr-2">Purity:</span>
                {[
                  { label: 'All', value: 'all' },
                  { label: '18K Gold', value: '18k' },
                  { label: '22K Gold', value: '22k' },
                  { label: '24K Gold', value: '24k' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilterMetal(opt.value)}
                    className={`text-[9px] uppercase tracking-[0.15em] py-1 px-3 border transition-all duration-300 focus:outline-none ${
                      filterMetal === opt.value
                        ? 'bg-lux-dark text-white border-lux-dark'
                        : 'bg-white text-lux-dark border-lux-sand/15 hover:border-black/40'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Product count & quick sort */}
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.15em] text-lux-taupe">
              <span className="font-mono">{processedItems.length} Products</span>
              
              <div className="relative group/sort hidden sm:block">
                <button className="flex items-center gap-1 text-lux-dark hover:text-black uppercase tracking-[0.15em] transition-colors focus:outline-none cursor-pointer">
                  <span>Sort By: {sortBy}</span>
                  <ChevronDown className="w-3.5 h-3.5 stroke-[1.2]" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-lux-sand/20 shadow-md p-2 hidden group-hover/sort:block z-30">
                  {[
                    { label: 'Featured', value: 'featured' },
                    { label: 'Price: Low to High', value: 'price-low' },
                    { label: 'Price: High to Low', value: 'price-high' },
                    { label: 'Alphabetical', value: 'alphabetical' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className="w-full text-left px-4 py-2.5 hover:bg-lux-light text-[9px] uppercase tracking-[0.15em] text-lux-dark block"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Exquisite Product Grid */}
        <section className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-24">
          {processedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {processedItems.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setActiveProductModal(product)}
                  className="group/card flex flex-col cursor-pointer"
                >
                  {/* Image Frame with high-end premium off-white canvas */}
                  <div className="relative w-full aspect-[4/5] bg-[#FAF9F6] border border-lux-sand/10 overflow-hidden mb-6">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover object-center transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover/card:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                    />
                    
                    {/* Shadow Blend multiplier */}
                    <div className="absolute inset-0 bg-black/[0.015] mix-blend-multiply pointer-events-none" />

                    {/* Subtle Top Left Tag Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10 bg-lux-dark text-white text-[8px] font-mono tracking-widest uppercase px-3 py-1.5 border border-white/5">
                        {product.badge}
                      </div>
                    )}

                    {/* Top Right Heart/Wishlist Button */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-lux-dark hover:text-red-500 transition-all duration-300 shadow-sm focus:outline-none cursor-pointer border border-lux-sand/10"
                      aria-label="Add to Wishlist"
                    >
                      <Heart 
                        className={`w-3.5 h-3.5 stroke-[1.5] ${
                          wishlist.includes(product.id) ? 'fill-red-500 stroke-red-500' : ''
                        }`} 
                      />
                    </button>

                    {/* Quick Access Bottom Bar (Hover animation) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex justify-end gap-2">
                      <button
                        onClick={(e) => shareItem(product, e)}
                        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-lux-dark transition-colors cursor-pointer border border-lux-sand/10"
                        aria-label="Share Piece"
                      >
                        <Share2 className="w-4 h-4 stroke-[1.2]" />
                      </button>
                      <button
                        onClick={(e) => addToBag(product, e)}
                        className="w-10 h-10 rounded-full bg-lux-dark hover:bg-lux-espresso flex items-center justify-center text-white transition-colors cursor-pointer"
                        aria-label="Quick Purchase"
                      >
                        <ShoppingBag className="w-4 h-4 stroke-[1.2]" />
                      </button>
                    </div>
                  </div>

                  {/* Left-Aligned Information Details (Strathberry inspired typography) */}
                  <div className="flex flex-col text-left px-1">
                    <span className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] text-lux-taupe uppercase mb-1.5 block">
                      {product.specs}
                    </span>
                    <h3 className="text-[12px] md:text-[13px] tracking-[0.16em] uppercase text-lux-dark font-medium mb-1.5 group-hover/card:text-black transition-colors duration-300 flex items-center gap-1 justify-between">
                      <span>{product.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.2] opacity-0 group-hover/card:opacity-100 transform translate-y-1 group-hover/card:translate-y-0 transition-all duration-300 text-black" />
                    </h3>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-wider text-lux-dark/95 font-medium">
                      {product.priceFormatted}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 flex flex-col items-center justify-center">
              <span className="block text-[10px] tracking-[0.3em] text-lux-taupe uppercase mb-4">
                NO ASSETS FOUND
              </span>
              <h3 className="font-serif text-2xl text-lux-dark mb-6">
                No luxury pieces match your current parameters.
              </h3>
              <button
                onClick={() => {
                  setFilterMetal('all');
                  setSortBy('featured');
                }}
                className="px-10 py-3.5 bg-lux-dark text-white text-[10px] tracking-widest uppercase font-semibold"
              >
                Reset Ledger Parameters
              </button>
            </div>
          )}
        </section>

      </div>

      {/* Brand Editorial Copy Block (Cartier & Strathberry SEO Copy Inspiration) */}
      <section className="w-full border-t border-lux-sand/25 bg-[#FAF9F6] py-16 md:py-24">
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-4xl space-y-8 text-left">
            
            {/* Editorial Intro Text */}
            <p className="text-black text-[14px] md:text-[15px] leading-[1.8] font-light">
              {editorial.intro}
            </p>

            {/* Subheading */}
            <h3 className="font-serif text-xl md:text-2xl text-lux-dark font-medium tracking-tight">
              {editorial.title}
            </h3>

            {/* Paragraph 1 */}
            <p className="text-black text-[14px] md:text-[15px] leading-[1.8] font-light">
              {editorial.p1}
            </p>

            {/* Paragraph 2 */}
            <p className="text-black text-[14px] md:text-[15px] leading-[1.8] font-light">
              {editorial.p2}
            </p>

            {/* Bullets Subheading */}
            <h4 className="font-serif text-lg text-lux-dark font-medium tracking-tight pt-4">
              {editorial.whyHeader}
            </h4>

            {/* Bullet List */}
            <ul className="space-y-4 text-black text-[14px] md:text-[15px] font-light pl-1">
              {editorial.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-black mt-1.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </section>

      {/* Exquisite Detail Modal View (High Carat Atelier Experience) */}
      <AnimatePresence>
        {activeProductModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            
            {/* Dark glass backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProductModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white border border-lux-sand/20 shadow-2xl w-full max-w-5xl relative overflow-hidden z-10 max-h-[90vh] flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveProductModal(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-lux-dark hover:text-white flex items-center justify-center text-lux-dark transition-all focus:outline-none cursor-pointer shadow-md"
                aria-label="Close details"
              >
                <X className="w-5 h-5 stroke-[1.2]" />
              </button>

              {/* Left Image Side */}
              <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto relative bg-[#FAF9F6] border-b lg:border-b-0 lg:border-r border-lux-sand/15 overflow-hidden">
                <Image
                  src={activeProductModal.image}
                  alt={activeProductModal.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
              </div>

              {/* Right Content Side */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-lux-dark uppercase">
                      {activeProductModal.specs}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-lux-sand" />
                    <span className="font-mono text-[9px] tracking-[0.2em] text-lux-taupe uppercase">
                      Atelier Certified
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-lux-dark uppercase tracking-tight">
                    {activeProductModal.title}
                  </h2>

                  <div className="font-mono text-lg text-lux-dark font-medium border-b border-lux-sand/20 pb-4">
                    {activeProductModal.priceFormatted}
                  </div>

                  <p className="text-lux-dark/80 text-[13px] leading-[1.8] font-light">
                    {activeProductModal.description}
                  </p>

                  {/* High level specifications */}
                  <div className="bg-[#FAF9F6] border border-lux-sand/15 p-5 space-y-3">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-lux-taupe">Metal Composition:</span>
                      <span className="text-lux-dark font-medium">{activeProductModal.material}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-lux-taupe">Atelier Origin:</span>
                      <span className="text-lux-dark font-medium">Lagos Salon Studio</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-lux-taupe">Shipping Protocol:</span>
                      <span className="text-lux-dark font-medium">Secured Valuables Transit</span>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons inside modal */}
                <div className="space-y-4 mt-8 pt-6 border-t border-lux-sand/20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => addToBag(activeProductModal)}
                      className="flex-1 h-14 bg-lux-dark hover:bg-lux-espresso text-white text-[10px] tracking-[0.25em] font-medium uppercase transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[1.2]" />
                      <span>Purchase Piece</span>
                    </button>
                    
                    <button
                      onClick={(e) => toggleWishlist(activeProductModal.id, e)}
                      className="w-14 h-14 border border-lux-sand/30 hover:border-lux-dark bg-white flex items-center justify-center text-lux-dark hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Add to Wishlist"
                    >
                      <Heart 
                        className={`w-4 h-4 stroke-[1.5] ${
                          wishlist.includes(activeProductModal.id) ? 'fill-red-500 stroke-red-500' : ''
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Secure advice statement */}
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-lux-taupe justify-center pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 stroke-[1.5] text-lux-dark" />
                    <span>Includes certified hallmark assay registry and insurance</span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Filter Sidebar Drawer */}
      <AnimatePresence>
        {showFilterDrawer && (
          <div className="fixed inset-0 z-[90]">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterDrawer(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Drawer Body */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="absolute top-0 right-0 h-full w-full max-w-md bg-white border-l border-lux-sand/20 shadow-2xl flex flex-col justify-between"
            >
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-lux-sand/20 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] font-bold text-lux-dark uppercase">
                  FILTER & SORT LEDGER
                </span>
                <button 
                  onClick={() => setShowFilterDrawer(false)}
                  className="w-8 h-8 rounded-full bg-lux-light hover:bg-lux-dark hover:text-white flex items-center justify-center text-lux-dark transition-all focus:outline-none cursor-pointer"
                >
                  <X className="w-4 h-4 stroke-[1.2]" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Section 1: Purity / Carat */}
                <div className="space-y-4">
                  <h4 className="text-[9px] uppercase tracking-[0.2em] font-semibold text-lux-taupe">
                    Gold Composition Purity
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Show All Purity', value: 'all' },
                      { label: '18 Karat Yellow Gold (75% Pure)', value: '18k' },
                      { label: '22 Karat Sovereign Gold (91.6% Pure)', value: '22k' },
                      { label: '24 Karat Solid Pure Gold (99.9% Pure)', value: '24k' }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFilterMetal(opt.value)}
                        className={`w-full p-4 border text-left text-[11px] uppercase tracking-wider flex items-center justify-between transition-all duration-300 ${
                          filterMetal === opt.value
                            ? 'bg-lux-dark text-white border-lux-dark'
                            : 'bg-lux-light/50 text-lux-dark border-lux-sand/20 hover:border-lux-warm/50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {filterMetal === opt.value && <Check className="w-3.5 h-3.5 stroke-[1.5]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 2: Sorting Options */}
                <div className="space-y-4">
                  <h4 className="text-[9px] uppercase tracking-[0.2em] font-semibold text-lux-taupe">
                    Sort Arrangement
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Featured Choice', value: 'featured' },
                      { label: 'Price: Low to High', value: 'price-low' },
                      { label: 'Price: High to Low', value: 'price-high' },
                      { label: 'Alphabetical', value: 'alphabetical' }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSortBy(opt.value)}
                        className={`p-3 border text-center text-[9px] uppercase tracking-wider transition-all duration-300 focus:outline-none ${
                          sortBy === opt.value
                            ? 'bg-lux-dark text-white border-lux-dark'
                            : 'bg-lux-light/30 text-lux-dark/80 border-lux-sand/20 hover:border-lux-warm/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-lux-sand/20 bg-[#FAF9F6] space-y-3">
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="w-full h-14 bg-lux-dark hover:bg-lux-espresso text-white text-[10px] tracking-[0.25em] uppercase font-semibold flex items-center justify-center cursor-pointer"
                >
                  APPLY REFINEMENTS
                </button>
                <button
                  onClick={() => {
                    setFilterMetal('all');
                    setSortBy('featured');
                  }}
                  className="w-full py-3.5 border border-lux-sand/30 hover:border-lux-dark text-lux-dark text-[10px] tracking-[0.2em] uppercase transition-colors"
                >
                  RESET REFINE LEDGER
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />

    </main>
  );
}
