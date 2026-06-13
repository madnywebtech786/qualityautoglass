import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Star, CheckCircle2, Shield, Clock, DollarSign, MapPin, Wrench, Users } from "lucide-react";

const PROMISES = [
  {
    icon: DollarSign,
    title: "Free Estimate",
    body: "Every job starts with a clear, no-obligation quote. You know the price before we touch your vehicle.",
  },
  {
    icon: Shield,
    title: "OEM-Grade Materials",
    body: "Factory-spec glass and certified adhesives on every repair — regardless of job size.",
  },
  {
    icon: CheckCircle2,
    title: "No Hidden Fees",
    body: "The price you're quoted is the price you pay. No surprises at pickup, ever.",
  },
  {
    icon: MapPin,
    title: "Calgary-Local",
    body: "Our technicians live in Calgary and know these roads. When you call, you reach us — not a call center.",
  },
  {
    icon: Clock,
    title: "Same-Day Service",
    body: "Most repairs and replacements are completed in a single visit. We work around your schedule.",
  },
  {
    icon: Star,
    title: "5-Star Experience",
    body: "Hundreds of 5-star reviews, earned one vehicle at a time since 2018.",
  },
];

function PromiseCard({ item, index }) {
  const Icon = item.icon;
  return (
    <div
      className="reveal group flex flex-col gap-4 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand-primary)]/30 hover:shadow-[var(--shadow-card)] transition-all duration-300"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
        style={{ background: "var(--color-brand-accent-muted)" }}
      >
        <Icon size={18} strokeWidth={2} className="text-[var(--color-brand-primary)]" />
      </div>
      <div>
        <h3 className="font-display font-700 text-[var(--color-text-primary)] text-[1.05rem] leading-tight mb-2">
          {item.title}
        </h3>
        <p className="text-[14px] leading-[1.7] text-[var(--color-text-secondary)]">
          {item.body}
        </p>
      </div>
    </div>
  );
}

export default function AboutTeamCTA() {
  return (
    <section
      className="relative bg-[var(--color-surface)] overflow-hidden"
    >

      {/* ══════════════════════════════════════════════
          ZONE 1 — Our Promise banner
      ══════════════════════════════════════════════ */}
      <div className="relative bg-[var(--color-surface-alt)] border-y border-[var(--color-border)] py-20 lg:py-24 overflow-hidden">

        {/* Geometric background accent */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 right-0 w-[45vw] h-full"
            style={{
              background: "linear-gradient(135deg, transparent 30%, var(--color-brand-accent-muted) 100%)",
            }}
          />
          <svg className="absolute right-[8%] top-1/2 -translate-y-1/2 opacity-[0.06]" width="320" height="320" viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="155" stroke="var(--color-brand-primary)" strokeWidth="1.5" />
            <circle cx="160" cy="160" r="110" stroke="var(--color-brand-primary)" strokeWidth="1" />
            <circle cx="160" cy="160" r="65"  stroke="var(--color-brand-primary)" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

          {/* Header */}
          <div className="reveal flex items-center gap-4 mb-10">
            <span className="w-10 h-px bg-[var(--color-brand-primary)]" />
            <span className="text-[11px] font-700 text-[var(--color-brand-primary)] tracking-[0.26em] uppercase">
              Our Promise
            </span>
            <span className="flex-1 h-px bg-[var(--color-border)]" />
          </div>

          {/* Large heading + subtext side by side */}
          <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <h2
              className="font-display text-[var(--color-text-primary)] leading-[1.03] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)" }}
            >
              Six Commitments<br />
              We Never Compromise On
            </h2>
            <p className="text-[15px] leading-[1.75] text-[var(--color-text-secondary)] max-w-sm lg:text-right lg:pb-1">
              Not marketing copy — these are the actual standards
              we hold ourselves to on every single job.
            </p>
          </div>

          {/* Promise cards — 3×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROMISES.map((item, i) => (
              <PromiseCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          ZONE 2 — CTA split
      ══════════════════════════════════════════════ */}
      <div className="relative py-20 lg:py-28">

        {/* Subtle bg tint */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[50vw] h-[60%] bg-[var(--color-brand-accent-muted)]/50 blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — image with review card */}
            <div className="reveal relative">
              <div
                className="relative rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-deep)]"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src="/images/Ready-to-Get-Started.webp"
                  alt="Quality Auto Glass Ltd team"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-text-primary)]/45 via-transparent to-transparent" />
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-5 -right-4 lg:-right-8 glass-card rounded-2xl px-5 py-4 shadow-[var(--shadow-deep)] animate-scale-in">
                <div className="flex items-center gap-1 mb-1.5">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[13px] font-600 text-[var(--color-text-primary)] max-w-[180px] leading-[1.5]">
                  &ldquo;Best auto glass shop in Calgary. Fast, honest, and fair.&rdquo;
                </p>
                <span className="text-[11px] text-[var(--color-text-muted)] mt-1 block">— Google Review</span>
              </div>
            </div>

            {/* Right — CTA copy + buttons */}
            <div className="reveal flex flex-col gap-7">

              <div>
                <span className="inline-block mb-3 text-[11px] font-700 text-[var(--color-brand-primary)] tracking-[0.26em] uppercase">
                  Ready to Get Started?
                </span>
                <h2
                  className="font-display text-[var(--color-text-primary)] tracking-tight leading-[1.06] mb-4"
                  style={{ fontSize: "clamp(2.4rem, 3.8vw, 2.9rem)" }}
                >
                  Get Your Free<br />Estimate Today
                </h2>
                <p className="text-[15.5px] leading-[1.75] text-[var(--color-text-secondary)] max-w-md">
                  Most jobs are completed same-day. Call us directly or request a
                  free estimate online — no obligation, no pressure.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-row flex-wrap gap-3">
                <Link
                  href="/contact/"
                  className="group flex items-center justify-center gap-2 px-5 py-3.5 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[14px] font-700 rounded-[var(--radius-btn)] shadow-[var(--shadow-glow)] hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Get a Free Estimate
                  <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+14033544422"
                  className="group flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-[var(--color-border)] hover:border-[var(--color-brand-primary)] text-[var(--color-text-primary)] text-[14px] font-600 rounded-[var(--radius-btn)] hover:bg-[var(--color-brand-accent-muted)] transition-all duration-300"
                >
                  <Phone size={14} strokeWidth={2.5} className="text-[var(--color-brand-primary)] shrink-0" />
                  Call 403 354 4422
                </a>
              </div>

              <p className="text-[12.5px] text-[var(--color-text-muted)] flex items-center gap-2">
                <span className="w-4 h-px bg-[var(--color-border)]" />
                Serving Calgary and surrounding areas since 2018
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
