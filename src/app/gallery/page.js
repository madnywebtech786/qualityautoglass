import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryPageClient from "@/components/gallery/GalleryPageClient";

export const metadata = {
  title: "Auto Glass Gallery Calgary | Windshield Replacement & Tinting Work — Quality Auto Glass Ltd",
  description:
    "Browse real auto glass jobs completed by Quality Auto Glass Ltd in Calgary — windshield replacements, rock chip repairs, window tinting, and before & after transformations.",
  openGraph: {
    title: "Auto Glass Work Gallery | Quality Auto Glass Ltd Calgary",
    description:
      "See completed windshield replacements, chip repairs, window tinting, and ADAS calibration jobs from Quality Auto Glass Ltd — Calgary's trusted auto glass specialists since 2018.",
    type: "website",
    locale: "en_CA",
    siteName: "Quality Auto Glass Ltd",
  },
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <GalleryPageClient />
      </main>
      <Footer />
    </>
  );
}
