"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function AboutHero() {
  const revealRef = useRef(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    // stagger children on mount
    const children = el.querySelectorAll("[data-reveal]");
    children.forEach((child, i) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(22px)";
      child.style.transition = `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 90}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 90}ms`;
      requestAnimationFrame(() => {
        setTimeout(() => {
          child.style.opacity = "1";
          child.style.transform = "translateY(0)";
        }, 80 + i * 90);
      });
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-surface)]" style={{ paddingTop: "80px" }}>

      {/* ── Two-column full-bleed layout ── */}
      <div className="relative z-10 grid lg:grid-cols-2 min-h-[calc(100vh-80px)]">

        {/* ════════ LEFT — Typography column ════════ */}
        <div ref={revealRef} className="flex flex-col px-6 sm:px-10 lg:px-14 xl:px-20">

          {/* Top meta bar */}
          <div
            data-reveal
            className="flex items-center justify-between pt-10 pb-8 border-b border-[var(--color-border)]"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-block w-2 h-2 rounded-full bg-[var(--color-brand-primary)]"
                style={{ boxShadow: "0 0 0 3px rgba(10,106,245,0.15)" }}
              />
              <span className="text-[11px] font-700 tracking-[0.28em] uppercase text-[var(--color-text-muted)]">
                Est. 2018 · Calgary, AB
              </span>
            </div>
            <span className="font-mono text-[11px] text-[var(--color-border-strong)] tracking-[0.15em]">
              001 / ABOUT
            </span>
          </div>

          {/* Headline block */}
          <div className="flex-1 flex flex-col justify-center py-10 lg:py-0">

            <div data-reveal className="mb-4">
              <span className="text-[11px] font-700 tracking-[0.3em] uppercase text-[var(--color-brand-primary)]">
                Quality Auto Glass Ltd
              </span>
            </div>

            <h1
              data-reveal
              className="font-display text-[var(--color-text-primary)] tracking-[-0.03em] leading-[0.92] mb-8"
              style={{ fontSize: "clamp(4.6rem, 8vw, 6.8rem)" }}
            >
              Built on<br />
              <em
                className="not-italic relative inline-block"
                style={{
                  color: "var(--color-brand-primary)",
                  fontStyle: "normal",
                }}
              >
                Honest
                {/* Underline accent */}
                <span
                  className="absolute left-0 right-0 bottom-0 h-[3px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, var(--color-brand-primary), var(--color-brand-accent))",
                    bottom: "4px",
                  }}
                />
              </em>
              <br />
              Work.
            </h1>

            <p
              data-reveal
              className="text-[15.5px] leading-[1.85] text-[var(--color-text-secondary)] max-w-[380px] mb-10"
            >
              Since 2018, Calgary&apos;s drivers have trusted us for no-pressure
              estimates, OEM-grade glass, and jobs done right the first time.
              Family-owned. Locally operated.
            </p>

            {/* CTA row */}
            <div data-reveal className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/contact/"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[13.5px] font-700 rounded-[var(--radius-btn)] transition-all duration-300 hover:scale-[1.03]"
                style={{ boxShadow: "0 6px 28px rgba(10,106,245,0.30)" }}
              >
                Get a Free Estimate
                <ArrowRight size={13} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <a
                href="tel:+14033544422"
                className="inline-flex items-center gap-2 text-[13.5px] font-600 text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors duration-200"
              >
                <Phone size={13} strokeWidth={2} />
                403 354 4422
              </a>
            </div>

            {/* Stats — horizontal rule treatment */}
            <div data-reveal className="border-t border-[var(--color-border)]">
              <div className="grid grid-cols-3 divide-x divide-[var(--color-border)]">
                {[
                  { n: "6+",  sub: "Years in Calgary" },
                  { n: "5K+", sub: "Vehicles Serviced" },
                  { n: "5★",  sub: "Average Rating" },
                ].map((s) => (
                  <div key={s.n} className="pt-5 pb-6 pr-5 pl-0 first:pl-0 [&:not(:first-child)]:pl-5">
                    <span
                      className="block font-display font-800 leading-none mb-1.5 text-[var(--color-text-primary)]"
                      style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
                    >
                      {s.n}
                    </span>
                    <span className="text-[11px] font-500 text-[var(--color-text-muted)] tracking-wide uppercase leading-snug">
                      {s.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ════════ RIGHT — Full-bleed image ════════ */}
        <div className="relative hidden lg:block">

          {/* Full-height photo */}
          <div className="absolute inset-0">
            <Image
              src="/images/about-page-side.webp"
              alt="Auto glass technician at work in Calgary"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Gradient fade on left edge to blend with left column */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, var(--color-surface) 0%, transparent 12%)",
              }}
            />
            {/* Bottom gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(10,15,30,0.55) 0%, transparent 45%)",
              }}
            />
          </div>

          {/* Corner caption — bottom left */}
          <div className="absolute bottom-8 left-8 z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-px bg-white/50" />
              <span className="text-[10px] font-700 tracking-[0.3em] uppercase text-white/60">
                Professional Installation
              </span>
            </div>
            <p className="text-white font-display font-700 text-[1.25rem] leading-tight">
              Calgary&apos;s Trusted<br />Glass Specialists
            </p>
          </div>

          {/* Corner stamp — top right */}
          <div className="absolute top-8 right-8 z-10">
            <div
              className="flex flex-col items-center justify-center w-20 h-20 rounded-full border border-white/20 backdrop-blur-sm"
              style={{ background: "rgba(10,106,245,0.75)" }}
            >
              <span className="font-display font-800 text-white leading-none text-[1.4rem]">5★</span>
              <span className="text-[9px] font-600 tracking-[0.15em] text-white/80 uppercase mt-0.5">Rated</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile image strip ── */}
      <div className="lg:hidden relative h-[55vw] max-h-72 overflow-hidden border-t border-[var(--color-border)]">
        <Image
          src="/images/about-page-side.webp"
          alt="Auto glass technician at work"
          fill
          sizes="100vw"
          className="object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* ── Ticker bar ── */}
      <div className="relative z-10 border-t border-[var(--color-border)] bg-[var(--color-surface-alt)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20 py-3 flex items-center justify-between">
          <div className="flex items-center gap-7">
            {["Windshield Replacement", "Rock Chip Repair", "Side Windows", "ADAS Recalibration"].map((s, i) => (
              <span key={s} className={`text-[10.5px] font-600 text-[var(--color-text-muted)] tracking-[0.2em] uppercase ${i > 1 ? "hidden lg:block" : "hidden sm:block"}`}>
                {s}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
            <span className="text-[10.5px] font-600 text-[var(--color-text-muted)] tracking-wide uppercase">
              Open · Same-Day Available
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
