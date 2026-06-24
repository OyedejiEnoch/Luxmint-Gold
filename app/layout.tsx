import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';

// Fallbacks for the requested fonts. 
// We use Cormorant Garamond as a fallback for BST Spyre (assuming elegant serif) 
// and Jost for Centra No2 (clean geometric sans).
const headingFont = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading' 
});

const bodyFont = Jost({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500'],
  variable: '--font-body' 
});

export const metadata: Metadata = {
  title: 'Luxmint Gold | Curated Gold Accessories',
  description: 'A Nigerian house of curated gold accessories — chains, pendants, rings and more, hand-picked for everyday elegance and delivered nationwide.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="font-sans bg-lux-light text-lux-dark antialiased selection:bg-lux-sand" suppressHydrationWarning>
        <SmoothScroll />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
