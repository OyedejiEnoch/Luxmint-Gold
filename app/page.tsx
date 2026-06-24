import Hero from "@/components/Hero";
import TextBanner from "@/components/TextBanner";
import Offerings from "@/components/Offerings";
import CategoriesGrid from "@/components/CategoriesGrid";
import Atelier from "@/components/Atelier";
import Advisory from "@/components/Advisory";
// import AccessoryGuide from "@/components/AccessoryGuide";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <Hero />
      <TextBanner />
      <Offerings />
      <CategoriesGrid />
      <Atelier />
      <Advisory />
      {/* <AccessoryGuide /> */}
      <Booking />
      <Footer />
    </main>
  );
}
