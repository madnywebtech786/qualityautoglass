import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import PromoSection from "@/components/PromoSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceAreasSection from "@/components/ServiceAreasSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ServicesSection />
        <PromoSection />
        <WhyUsSection />
        <TestimonialsSection />
        <ServiceAreasSection />
        <FAQSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
