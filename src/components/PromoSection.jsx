import Link from "next/link";
import Image from "next/image";
import { Zap, Heart, ArrowRight, Sparkles } from "lucide-react";

export default function PromoSection() {
  return (
    <section
      className="py-20 lg:py-28 bg-[var(--color-surface)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="reveal text-center mb-14">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[var(--color-brand-primary)]/8 text-[var(--color-brand-primary)] text-[12px] font-700 tracking-widest uppercase">
            Current Offers
          </span>
          <h2 className="font-display font-800 text-[clamp(1.9rem,3.8vw,2.6rem)] text-[var(--color-text-primary)] tracking-tight heading-line heading-line-center">
            Save on Your Auto Glass Service
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-7">

          {/* Offer 1 — Rock Chip */}
          <div className="reveal relative group rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border)] bg-gradient-to-br from-[#f0f6ff] to-[#e8f1ff] card-shine shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-deep)] hover:-translate-y-1 transition-all duration-300">
            {/* Decorative circle */}
            <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[var(--color-brand-primary)]/6 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[var(--color-brand-accent)]/10 pointer-events-none" />

            <div className="relative p-7 lg:p-9 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-brand-primary)]/10">
                  <Zap size={22} strokeWidth={2.5} className="text-[var(--color-brand-primary)]" />
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--color-brand-primary)] text-white text-[11px] font-700 tracking-wide">
                  Limited Time
                </span>
              </div>

              <div>
                <h3 className="font-display font-800 text-[clamp(1.5rem,3vw,1.9rem)] text-[var(--color-text-primary)] leading-tight">
                  Fix Two Rock Chips for{" "}
                  <span className="text-gradient">$29.95</span>
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                  Do not let a small chip turn into a bigger, more expensive
                  problem. Our rock chip repair offer is designed to help
                  drivers fix damage quickly and affordably.
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {[
                  "2 rock chip repairs for $29.95",
                  "Or 1 crack repair at a reduced price",
                  "Fast same-visit service",
                  "Ideal for minor windshield damage",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[14px] text-[var(--color-text-secondary)]">
                    <Sparkles size={13} className="text-[var(--color-brand-primary)] shrink-0" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/online-deals/"
                className="group/btn mt-2 flex items-center gap-2 w-fit px-6 py-3 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[14px] font-700 rounded-[var(--radius-btn)] shadow-[var(--shadow-glow)] hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Claim This Offer
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover/btn:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Offer 2 — Food Bank */}
          <div className="reveal relative group rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border)] card-shine shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-deep)] hover:-translate-y-1 transition-all duration-300">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src="/images/Ready-to-Get-Started.webp"
                alt="Community donation"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-15"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#fff8f5] via-white/90 to-white/80" />
            </div>

            <div className="relative p-7 lg:p-9 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-promo)]/10">
                  <Heart size={22} strokeWidth={2.5} className="text-[var(--color-promo)]" />
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--color-promo)] text-white text-[11px] font-700 tracking-wide">
                  Community Offer
                </span>
              </div>

              <div>
                <h3 className="font-display font-800 text-[clamp(1.5rem,3vw,1.9rem)] text-[var(--color-text-primary)] leading-tight">
                  Save on Windshield Replacement with a{" "}
                  <span className="text-[var(--color-promo)]">Food Bank Donation</span>
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                  As a family-owned Calgary business, we believe in giving back
                  to the community. Bring a non-perishable food donation to
                  support the Veterans Food Bank of Calgary and receive a
                  special discount on your windshield replacement.
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {[
                  "Special discount on windshield replacement",
                  "Supports the Veterans Food Bank of Calgary",
                  "Non-perishable food items accepted",
                  "Family-owned, community-focused business",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[14px] text-[var(--color-text-secondary)]">
                    <Sparkles size={13} className="text-[var(--color-promo)] shrink-0" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact/"
                className="group/btn mt-2 flex items-center gap-2 w-fit px-6 py-3 bg-[var(--color-promo)] hover:opacity-90 text-white text-[14px] font-700 rounded-[var(--radius-btn)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Ask About This Offer
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover/btn:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* All deals CTA */}
        <div className="reveal mt-10 text-center">
          <Link
            href="/online-deals/"
            className="inline-flex items-center gap-2 text-[14px] font-600 text-[var(--color-brand-primary)] hover:underline underline-offset-4 transition-all duration-200"
          >
            View all current deals & specials
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
