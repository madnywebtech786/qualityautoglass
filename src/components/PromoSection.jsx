import Link from "next/link";
import { Zap, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

const DEAL_1_FEATURES = [
  "1 rock chip repair — $19.99",
  "Fast, same-appointment service",
  "Prevents small chips from cracking further",
];

const DEAL_2_FEATURES = [
  "Single windshield crack repair — $29.95",
  "Two crack repairs in one visit — $59.90",
  "Half the regular price",
  "Preserves structural integrity & visibility",
];

export default function PromoSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--color-surface)] overflow-hidden">
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

          {/* Deal 1 — Rock Chip */}
          <div className="reveal relative group rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border)] bg-gradient-to-br from-[#f0f6ff] to-[#e8f1ff] card-shine shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-deep)] hover:-translate-y-1 transition-all duration-300">
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

              {/* Price callout */}
              <div className="flex items-end gap-3">
                <span className="font-display font-800 text-[3rem] leading-none text-gradient">$19.99</span>
                <span className="text-[13px] text-[var(--color-text-muted)] pb-1.5 leading-snug">for 1 rock chip<br />repair</span>
              </div>

              <div>
                <h3 className="font-display font-800 text-[clamp(1.35rem,2.6vw,1.75rem)] text-[var(--color-text-primary)] leading-tight">
                  Rock Chip Repair for $19.99
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                  Don&apos;t let a small chip turn into a costly crack. Get your rock chip
                  repaired fast in a single visit — affordable, and done right.
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {DEAL_1_FEATURES.map((item) => (
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
                <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Deal 2 — Crack Repair 50% Off */}
          <div className="reveal relative group rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border)] bg-gradient-to-br from-[#fff5f0] to-[#fff0ea] card-shine shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-deep)] hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[var(--color-promo)]/6 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[var(--color-promo)]/8 pointer-events-none" />

            <div className="relative p-7 lg:p-9 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-promo)]/10">
                  <ShieldCheck size={22} strokeWidth={2.5} className="text-[var(--color-promo)]" />
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--color-promo)] text-white text-[11px] font-700 tracking-wide">
                  50% Off
                </span>
              </div>

              {/* Price callout */}
              <div className="flex items-end gap-3">
                <span className="font-display font-800 text-[3rem] leading-none" style={{ color: "var(--color-promo)" }}>$29.95</span>
                <span className="text-[13px] text-[var(--color-text-muted)] pb-1.5 leading-snug">windshield crack<br />repair</span>
              </div>

              <div>
                <h3 className="font-display font-800 text-[clamp(1.35rem,2.6vw,1.75rem)] text-[var(--color-text-primary)] leading-tight">
                  50% Off Windshield Crack Repair
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
                  A cracked windshield affects both visibility and your vehicle&apos;s
                  structural integrity. Get it fixed now at half the regular price —
                  single or double crack repairs available in one visit.
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {DEAL_2_FEATURES.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[14px] text-[var(--color-text-secondary)]">
                    <Sparkles size={13} style={{ color: "var(--color-promo)" }} className="shrink-0" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/online-deals/"
                className="group/btn mt-2 flex items-center gap-2 w-fit px-6 py-3 text-white text-[14px] font-700 rounded-[var(--radius-btn)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ background: "var(--color-promo)" }}
              >
                Claim This Offer
                <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
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
            View all current deals &amp; specials
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </section>
  );
}
