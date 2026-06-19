import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { services } from "@/data/services";

const FOOTER_LINKS = [
  {
    heading: "Services",
    links: services.slice(0, 5).map((s) => ({ label: s.title, href: s.slug })),
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "Online Deals", href: "/online-deals/" },
      { label: "Service Areas", href: "/service-areas/" },
      { label: "Gallery", href: "/gallery/" },
      { label: "FAQ", href: "/faq/" },
    ],
  },
  {
    heading: "Get Started",
    links: [
      { label: "Free Estimate", href: "/contact/" },
      { label: "Contact Us", href: "/contact/" },
      { label: "Rock Chip Repair", href: "/rock-chip-repair/" },
      { label: "Windshield Replacement", href: "/windshield-replacement/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-text-primary)] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/qualityglass-logo.png"
                alt="Quality Auto Glass Ltd"
                width={160}
                height={56}
                className="h-20 w-auto object-contain "
                loading="lazy"
              />
            </Link>

            <p className="text-[14px] leading-[1.75] text-white/60 max-w-xs">
              Quality Auto Glass Ltd provides trusted windshield replacement,
              rock chip repair, and auto glass services in Calgary and
              surrounding areas. Contact us for a free estimate today.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:+14033544422"
                className="flex items-center gap-3 text-[14px] text-white/70 hover:text-white transition-colors duration-200"
              >
                <Phone size={15} strokeWidth={2.5} className="text-[var(--color-brand-accent)] shrink-0" />
                +1 403 354 4422
              </a>
              <a
                href="mailto:services@qualityautoglassltd.com"
                className="flex items-center gap-3 text-[14px] text-white/70 hover:text-white transition-colors duration-200"
              >
                <Mail size={15} strokeWidth={2.5} className="text-[var(--color-brand-accent)] shrink-0" />
                services@qualityautoglassltd.com
              </a>
              <div className="flex items-start gap-3 text-[14px] text-white/70">
                <MapPin size={15} strokeWidth={2.5} className="text-[var(--color-brand-accent)] shrink-0 mt-0.5" />
                3770 Westwinds Dr NE #134,
                <br />
                Calgary, AB T3J 5H3
              </div>
              <div className="flex items-center gap-3 text-[14px] text-white/70">
                <Clock size={15} strokeWidth={2.5} className="text-[var(--color-brand-accent)] shrink-0" />
                Mon–Sat: 8am–6pm
              </div>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h4 className="text-[12px] font-700 text-white/40 uppercase tracking-widest">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/65 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/40">
            &copy; {new Date().getFullYear()} Quality Auto Glass Ltd. All rights reserved. Calgary, AB.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/contact/" className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/contact/" className="text-[13px] text-white/40 hover:text-white/70 transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
