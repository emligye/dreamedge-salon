import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/services/ServicesSection";
import StylistsSection from "@/components/stylists/StylistsSection";
import GallerySection from "@/components/gallery/GallerySection";
import BookingSection from "@/components/booking/BookingSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StylistsSection />
      <GallerySection />
      <BookingSection />
      <ContactSection />
    </>
  );
}
