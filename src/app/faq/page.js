import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqPageClient from "@/components/faq/FaqPageClient";

export const metadata = {
  title: "FAQ | Windshield Replacement & Auto Glass Questions — Quality Auto Glass Ltd Calgary",
  description:
    "Answers to the most common questions about windshield replacement, rock chip repair, window tinting, ADAS calibration, pricing, and insurance in Calgary. Quality Auto Glass Ltd.",
  openGraph: {
    title: "Auto Glass FAQ Calgary | Windshield Replacement & Repair Questions Answered",
    description:
      "How much does windshield replacement cost in Calgary? Is chip repair covered by insurance? Does my car need ADAS calibration? Find answers from Quality Auto Glass Ltd.",
    type: "website",
    locale: "en_CA",
    siteName: "Quality Auto Glass Ltd",
  },
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main>
        <FaqPageClient />
      </main>
      <Footer />
    </>
  );
}
