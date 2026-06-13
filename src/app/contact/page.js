import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata = {
  title: "Contact Quality Auto Glass Ltd | Free Estimate — Calgary Auto Glass",
  description:
    "Contact Quality Auto Glass Ltd in Calgary for a free estimate on windshield replacement, rock chip repair, window tinting, or ADAS calibration. Call 403 354 4422 or fill out our online form.",
  openGraph: {
    title: "Contact Quality Auto Glass Ltd | Calgary Auto Glass — Free Estimate",
    description:
      "Get a free estimate from Calgary's trusted auto glass specialists. Call 403 354 4422 or send us a message. Same-day service available across Calgary, Airdrie, Cochrane & Okotoks.",
    type: "website",
    locale: "en_CA",
    siteName: "Quality Auto Glass Ltd",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactPageClient />
      </main>
      <Footer />
    </>
  );
}
