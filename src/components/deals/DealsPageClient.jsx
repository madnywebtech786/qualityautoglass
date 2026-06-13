import Link from "next/link";
import PromoSection from "@/components/PromoSection";
import { ArrowRight, Phone, Tag } from "lucide-react";

export default function DealsPageClient() {
  return (
    <div>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-[var(--color-surface)] pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.4]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dg" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="var(--color-border)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dg)" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <div className="reveal inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
            <Tag size={12} className="text-[var(--color-brand-primary)]" strokeWidth={2.5} />
            <span className="text-[11px] font-700 tracking-[0.25em] uppercase text-[var(--color-brand-primary)]">
              Current Offers · Calgary
            </span>
          </div>

          <h1
            className="reveal font-display text-[var(--color-text-primary)] leading-none tracking-tight mb-5"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
          >
            Save on Your<br />
            <span className="text-gradient">Auto Glass Service</span>
          </h1>

          <p className="reveal text-[16px] leading-[1.8] text-[var(--color-text-secondary)] max-w-xl mx-auto mb-10">
            Two exclusive offers from Quality Auto Glass Ltd — Calgary&apos;s
            family-owned glass specialists since 2018.
          </p>

          <div className="reveal flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+14033544422"
              className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-btn)] border-2 border-[var(--color-border)] text-[var(--color-text-secondary)] text-[14px] font-600 hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition-all duration-200"
            >
              <Phone size={14} strokeWidth={2.5} />
              403 354 4422
            </a>
            <Link
              href="/contact/"
              className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-btn)] bg-[var(--color-brand-primary)] text-white text-[14px] font-700 shadow-[var(--shadow-glow)] hover:bg-[var(--color-brand-primary-dark)] hover:scale-105 transition-all duration-200"
            >
              Get a Free Estimate
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Deals ── */}
      <PromoSection />

      {/* ── Bottom CTA ── */}
      <div className="bg-[var(--color-surface-alt)] py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-5 lg:px-8 text-center">
          <h2
            className="reveal font-display text-[var(--color-text-primary)] leading-[1.08] tracking-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
          >
            Not Sure Which Deal Fits You?
          </h2>
          <p className="reveal text-[15.5px] leading-[1.8] text-[var(--color-text-secondary)] mb-8">
            Call us or send a message — we&apos;ll assess your damage and
            recommend the right service at the right price.
          </p>
          <div className="reveal flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact/"
              className="group flex items-center gap-2 px-7 py-3.5 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[14px] font-700 rounded-[var(--radius-btn)] shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-300"
            >
              Get a Free Estimate
              <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+14033544422"
              className="flex items-center gap-2 text-[14px] font-600 text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors duration-200"
            >
              <Phone size={14} strokeWidth={2.5} />
              Call 403 354 4422
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
