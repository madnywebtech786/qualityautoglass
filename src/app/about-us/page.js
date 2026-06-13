import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutTeamCTA from "@/components/about/AboutTeamCTA";

export const metadata = {
  title: "About Us | Quality Auto Glass Ltd — Family-Owned Calgary Auto Glass Since 2018",
  description:
    "Quality Auto Glass Ltd is a family-owned auto glass business serving Calgary and surrounding areas since 2018. We offer windshield replacement, rock chip repair, glass tinting, and ADAS calibration with honest pricing and OEM-grade materials.",
  openGraph: {
    title: "About Quality Auto Glass Ltd | Calgary's Trusted Auto Glass Specialists Since 2018",
    description:
      "Family-owned and Calgary-based since 2018. We provide windshield replacement, rock chip repair, window tinting, and ADAS calibration with honest pricing and guaranteed workmanship.",
    type: "website",
    locale: "en_CA",
    siteName: "Quality Auto Glass Ltd",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutValues />
        <AboutTeamCTA />
      </main>
      <Footer />
    </>
  );
}
