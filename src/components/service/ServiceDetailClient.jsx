"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Shield, Clock, DollarSign, ChevronRight } from "lucide-react";
import ServiceProcess from "./ServiceProcess";

const ICON_MAP = {
  Shield,
  Zap: ({ size, strokeWidth, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Wrench: ({ size, strokeWidth, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Car: ({ size, strokeWidth, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
      <path d="M19 17H5v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7l2.5-6.5A2 2 0 0 1 6.4 4h11.2a2 2 0 0 1 1.9 1.5L22 12v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2z" />
      <circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" />
    </svg>
  ),
};

export default function ServiceDetailClient({ service, allServices }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((c) => c.classList.add("revealed"));
          obs.disconnect();
        }
      },
      { threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Icon = ICON_MAP[service.icon] || Shield;
  const otherServices = allServices.filter((s) => s.id !== service.id && s.slug !== "/services/");

  return (
    <div ref={sectionRef}>

      {/* ══════════════════════════
          HERO
      ══════════════════════════ */}
      <div
        className="relative overflow-hidden bg-[var(--color-surface)]"
        style={{ paddingTop: "80px" }}
      >
        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.4]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="sg" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="var(--color-border)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sg)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">

          {/* Breadcrumb */}
          <div className="reveal flex items-center gap-2 mb-8 text-[11px] font-600 tracking-[0.15em] uppercase">
            <Link href="/" className="text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] transition-colors duration-200">Home</Link>
            <ChevronRight size={10} className="text-[var(--color-border-strong)]" />
            <Link href="/#services" className="text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] transition-colors duration-200">Services</Link>
            <ChevronRight size={10} className="text-[var(--color-border-strong)]" />
            <span className="text-[var(--color-brand-primary)]">{service.title}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

            {/* Left — title + desc */}
            <div>
              <div className="reveal flex items-center gap-3 mb-6">
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-2xl"
                  style={{ background: "var(--color-brand-accent-muted)", border: "1px solid var(--color-border)" }}
                >
                  <Icon size={22} strokeWidth={2} className="text-[var(--color-brand-primary)]" />
                </span>
                {service.badge && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-700 tracking-wide text-white bg-[var(--color-brand-primary)]">
                    {service.badge}
                  </span>
                )}
              </div>

              <h1
                className="reveal font-display text-[var(--color-text-primary)] leading-[1.0] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
              >
                {service.title}
              </h1>

              <p className="reveal text-[16.5px] leading-[1.85] text-[var(--color-text-secondary)] max-w-2xl">
                {service.fullDesc}
              </p>

              {/* Quick trust pills */}
              <div className="reveal mt-8 flex flex-wrap gap-3">
                {[
                  { icon: DollarSign, label: "Free Estimate" },
                  { icon: Shield,     label: "OEM-Grade Glass" },
                  { icon: Clock,      label: "Same-Day Service" },
                ].map(({ icon: TIcon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[12.5px] font-600 text-[var(--color-text-secondary)] shadow-sm"
                  >
                    <TIcon size={12} strokeWidth={2.5} className="text-[var(--color-brand-primary)]" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — CTA card */}
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-deep)]">
                <div className="px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]">
                  <p className="text-[12px] font-700 tracking-[0.22em] uppercase text-[var(--color-brand-primary)] mb-1">
                    Get Started Today
                  </p>
                  <p className="text-[var(--color-text-primary)] font-display font-700 text-[1.2rem] leading-tight">
                    Free estimate on<br />every job
                  </p>
                </div>
                <div className="px-6 py-5 flex flex-col gap-3">
                  <Link
                    href="/contact/"
                    className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-[var(--radius-btn)] bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[14px] font-700 transition-all duration-200 hover:scale-[1.02] shadow-[var(--shadow-glow)]"
                  >
                    Get a Free Estimate
                    <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <a
                    href="tel:+14033544422"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-[var(--radius-btn)] border-2 border-[var(--color-border)] text-[14px] font-600 text-[var(--color-text-primary)] hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-brand-accent-muted)] transition-all duration-200"
                  >
                    <Phone size={14} strokeWidth={2.5} className="text-[var(--color-brand-primary)]" />
                    Call 403 354 4422
                  </a>
                </div>
                <div className="px-6 pb-5 text-center">
                  <p className="text-[11.5px] text-[var(--color-text-muted)]">
                    No obligation · No pressure · Same-day available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="border-b border-[var(--color-border)]" />
      </div>

      {/* ══════════════════════════
          WHAT'S INCLUDED + HOW IT WORKS
      ══════════════════════════ */}
      <ServiceProcess
        process={service.process}
        features={service.features}
        serviceTitle={service.title}
      />

      {/* ══════════════════════════
          OTHER SERVICES
      ══════════════════════════ */}
      {otherServices.length > 0 && (
        <div className="bg-[var(--color-surface-alt)] border-t border-[var(--color-border)] py-14 lg:py-18">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="reveal flex items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[11px] font-700 tracking-[0.26em] uppercase text-[var(--color-brand-primary)] block mb-1">
                  More Services
                </span>
                <h3
                  className="font-display text-[var(--color-text-primary)] leading-tight"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)" }}
                >
                  Other Auto Glass Services
                </h3>
              </div>
              <Link
                href="/#services"
                className="hidden sm:flex items-center gap-1.5 text-[13px] font-600 text-[var(--color-brand-primary)] hover:underline underline-offset-4 shrink-0"
              >
                View all <ArrowRight size={13} strokeWidth={2.5} />
              </Link>
            </div>

            <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherServices.map((s) => (
                <Link
                  key={s.id}
                  href={s.slug}
                  className="group flex items-center justify-between p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand-primary)]/30 hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div>
                    {s.badge && (
                      <span className="block text-[10px] font-700 tracking-widest uppercase text-[var(--color-brand-primary)] mb-1">
                        {s.badge}
                      </span>
                    )}
                    <span className="text-[14.5px] font-600 text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors duration-200">
                      {s.title}
                    </span>
                    <p className="text-[12.5px] text-[var(--color-text-muted)] mt-1 leading-snug line-clamp-1">
                      {s.shortDesc}
                    </p>
                  </div>
                  <ChevronRight size={16} strokeWidth={2} className="text-[var(--color-border-strong)] group-hover:text-[var(--color-brand-primary)] shrink-0 ml-3 transition-colors duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════
          BOTTOM CTA
      ══════════════════════════ */}
      <div className="relative overflow-hidden py-16 lg:py-20 text-center bg-[var(--color-surface-alt)] border-t border-[var(--color-border)]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-full"
            style={{ background: "radial-gradient(ellipse at 50% 0%, var(--color-brand-accent-muted) 0%, transparent 70%)" }}
          />
        </div>
        <div className="relative max-w-2xl mx-auto px-5 lg:px-8">
          <h2
            className="reveal font-display text-[var(--color-text-primary)] leading-[1.08] tracking-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Ready to Fix Your {service.title.split(" ")[0]} Glass?
          </h2>
          <p className="reveal text-[15.5px] leading-[1.8] text-[var(--color-text-secondary)] mb-8">
            Free estimate. No pressure. Same-day service available across Calgary and surrounding areas.
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
              403 354 4422
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
