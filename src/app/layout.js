import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Quality Auto Glass Ltd | Windshield Replacement, Tinting & ADAS Calibration — Calgary",
  description:
    "Quality Auto Glass Ltd — Calgary's trusted auto glass specialists since 2018. Windshield replacement, rock chip repair, glass tinting, and ADAS calibration. Same-day service, free estimates. Serving Calgary, Airdrie, Cochrane, Okotoks & surrounding areas.",
  keywords:
    "windshield replacement Calgary, rock chip repair Calgary, auto glass Calgary, window tinting Calgary, ADAS calibration Calgary, same-day windshield repair, auto glass Airdrie, windshield chip repair Calgary",
  authors: [{ name: "Quality Auto Glass Ltd" }],
  creator: "Quality Auto Glass Ltd",
  publisher: "Quality Auto Glass Ltd",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Quality Auto Glass Ltd | Calgary Auto Glass Specialists Since 2018",
    description:
      "Windshield replacement, rock chip repair, glass tinting, and ADAS calibration in Calgary. Same-day service, OEM-grade glass, free estimates. Serving Calgary and surrounding areas.",
    type: "website",
    locale: "en_CA",
    siteName: "Quality Auto Glass Ltd",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quality Auto Glass Ltd | Calgary's Auto Glass Specialists",
    description:
      "Same-day windshield replacement, $29.95 rock chip repair, window tinting, and ADAS calibration in Calgary. Free estimates — call 403 354 4422.",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": "https://qualityautoglass.ca/#business",
  name: "Quality Auto Glass Ltd",
  description:
    "Calgary's family-owned auto glass specialists since 2018. Windshield replacement, rock chip repair, glass tinting, and ADAS calibration. Same-day service, OEM-grade materials, free estimates.",
  url: "https://qualityautoglass.ca",
  telephone: "+14033544422",
  email: "info@qualityautoglass.ca",
  foundingDate: "2018",
  priceRange: "$$",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  areaServed: [
    { "@type": "City", name: "Calgary", containedInPlace: { "@type": "Province", name: "Alberta", containedInPlace: { "@type": "Country", name: "Canada" } } },
    { "@type": "City", name: "Airdrie" },
    { "@type": "City", name: "Cochrane" },
    { "@type": "City", name: "Okotoks" },
    { "@type": "City", name: "Chestermere" },
    { "@type": "City", name: "Strathmore" },
    { "@type": "City", name: "High River" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calgary",
    addressRegion: "AB",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.0447,
    longitude: -114.0719,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Auto Glass Services — Calgary",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Windshield Replacement Calgary",
          description: "OEM-matched windshield replacement for all vehicle makes and models. Same-day service. Includes leak test and drive-away time check.",
          provider: { "@id": "https://qualityautoglass.ca/#business" },
          areaServed: { "@type": "City", name: "Calgary" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Rock Chip Repair Calgary",
          description: "Fast windshield chip repair starting at $29.95. Walk-ins welcome. Under 30 minutes.",
          provider: { "@id": "https://qualityautoglass.ca/#business" },
          areaServed: { "@type": "City", name: "Calgary" },
        },
        price: "29.95",
        priceCurrency: "CAD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Window Tinting Calgary",
          description: "Professional automotive window film — dyed, carbon, and ceramic options. UV protection, heat rejection. Alberta-regulation compliant.",
          provider: { "@id": "https://qualityautoglass.ca/#business" },
          areaServed: { "@type": "City", name: "Calgary" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ADAS Calibration Calgary",
          description: "Factory-accurate ADAS camera and sensor recalibration after windshield replacement. Required for vehicles built after 2015 with windshield-mounted cameras.",
          provider: { "@id": "https://qualityautoglass.ca/#business" },
          areaServed: { "@type": "City", name: "Calgary" },
        },
      },
    ],
  },
  sameAs: [],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does windshield replacement cost in Calgary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Windshield replacement cost in Calgary varies by vehicle make, model, and glass type. Many Alberta comprehensive insurance policies cover windshield replacement with no deductible. Call Quality Auto Glass Ltd at 403 354 4422 for a free estimate.",
      },
    },
    {
      "@type": "Question",
      name: "How much does rock chip repair cost in Calgary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rock chip repair at Quality Auto Glass Ltd in Calgary starts at $29.95 per chip. Most repairs are completed in under 30 minutes. Walk-ins are welcome.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need ADAS calibration after windshield replacement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Vehicles manufactured after 2015 with features like forward collision warning or lane departure warning require ADAS recalibration after any windshield replacement. Quality Auto Glass Ltd offers in-house ADAS calibration alongside windshield replacement in Calgary.",
      },
    },
    {
      "@type": "Question",
      name: "Is window tinting legal in Alberta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with restrictions. Alberta law requires front side windows to allow at least 50% visible light transmission. Rear and rear side windows can be tinted darker. All tinting at Quality Auto Glass Ltd is Alberta-regulation compliant.",
      },
    },
    {
      "@type": "Question",
      name: "Does Quality Auto Glass Ltd offer same-day windshield replacement in Calgary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Quality Auto Glass Ltd offers same-day windshield replacement in Calgary and surrounding areas including Airdrie, Cochrane, and Okotoks, subject to glass availability and scheduling.",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
