import { notFound } from "next/navigation";
import { services } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetailClient from "@/components/service/ServiceDetailClient";

export function generateStaticParams() {
  return services
    .filter((s) => s.slug !== "/services/")
    .map((s) => ({ service: s.slug.replace(/^\/|\/$/g, "") }));
}

export async function generateMetadata({ params }) {
  const { service } = await params;
  const slug = `/${service}/`;
  const found = services.find((s) => s.slug === slug);
  if (!found) return {};
  return {
    title: found.metaTitle || `${found.title} | Quality Auto Glass Ltd Calgary`,
    description: found.metaDesc || found.fullDesc,
    keywords: `${found.title.toLowerCase()} Calgary, ${found.title.toLowerCase()} near me, auto glass Calgary, Quality Auto Glass Ltd`,
    openGraph: {
      title: found.metaTitle || `${found.title} | Quality Auto Glass Ltd Calgary`,
      description: found.metaDesc || found.fullDesc,
      type: "website",
      locale: "en_CA",
      siteName: "Quality Auto Glass Ltd",
    },
    twitter: {
      card: "summary_large_image",
      title: found.metaTitle || `${found.title} | Quality Auto Glass Ltd Calgary`,
      description: found.metaDesc || found.fullDesc,
    },
  };
}

export default async function ServicePage({ params }) {
  const { service } = await params;
  const slug = `/${service}/`;
  const data = services.find((s) => s.slug === slug);
  if (!data) notFound();
  return (
    <>
      <Navbar />
      <main>
        <ServiceDetailClient service={data} allServices={services} />
      </main>
      <Footer />
    </>
  );
}
