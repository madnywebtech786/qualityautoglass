import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DealsPageClient from "@/components/deals/DealsPageClient";

export const metadata = {
  title: "Auto Glass Deals & Specials Calgary | $29.95 Rock Chip Repair — Quality Auto Glass Ltd",
  description:
    "Exclusive auto glass deals in Calgary from Quality Auto Glass Ltd. $29.95 rock chip repair special, windshield replacement discounts, and our food bank donation deal. Save on quality service.",
  openGraph: {
    title: "Calgary Auto Glass Deals | $29.95 Rock Chip Repair Special — Quality Auto Glass Ltd",
    description:
      "Save on windshield replacement and rock chip repair in Calgary. $29.95 chip repair special and windshield discounts from Quality Auto Glass Ltd — Calgary's trusted auto glass specialists since 2018.",
    type: "website",
    locale: "en_CA",
    siteName: "Quality Auto Glass Ltd",
  },
};

export default function DealsPage() {
  return (
    <>
      <Navbar />
      <main>
        <DealsPageClient />
      </main>
      <Footer />
    </>
  );
}
