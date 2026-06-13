"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const REASONS = [
  {
    keyword: "SPEED",
    title: "Same-day service",
    desc: "Most jobs done in a single visit. No waiting days — we work around your schedule.",
    img: "/images/Same-day-service.webp",
    dark: true,
  },
  {
    keyword: "QUALITY",
    title: "OEM-grade glass",
    desc: "Matched glass and professional adhesives. The same standard your vehicle was built with.",
    img: null,
    dark: false,
  },
  {
    keyword: "LOCAL",
    title: "Calgary-rooted since 2018",
    desc: "Family-owned, community-focused. We know these roads because we drive them too.",
    img: null,
    dark: false,
  },
  {
    keyword: "TRUST",
    title: "No-surprise pricing",
    desc: "Free estimate before anything starts. Honest answers, zero pressure, every time.",
    img: "/images/No-surprise-pricing.webp",
    dark: true,
  },
];

const STATS = [
  { value: "6+", label: "Years serving Calgary" },
  { value: "5K+", label: "Vehicles completed" },
  { value: "5★", label: "Customer rating" },
];

function FeatureCell({ reason, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden cursor-default transition-all duration-500 ${
        reason.dark
          ? "bg-[var(--color-text-primary)]"
          : "bg-[var(--color-surface)] border border-[var(--color-border)]"
      }`}
      style={{ minHeight: "280px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo layer (dark cells only) */}
      {reason.img && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            hovered ? "opacity-30" : "opacity-0"
          }`}
        >
          <Image
            src={reason.img}
            alt={reason.title}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Watermark keyword */}
      <span
        className={`absolute font-display font-800 select-none pointer-events-none leading-none tracking-tighter transition-all duration-500 ${
          reason.dark
            ? "text-white/[0.04] bottom-2 right-3 text-[6.5rem] lg:text-[8rem]"
            : "text-[var(--color-brand-primary)]/[0.055] bottom-2 right-3 text-[6.5rem] lg:text-[8rem]"
        } ${hovered ? "scale-105 opacity-70" : "scale-100"}`}
        style={{ lineHeight: 1 }}
        aria-hidden="true"
      >
        {reason.keyword}
      </span>

      {/* Content */}
      <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col justify-between gap-8">
        {/* Top: index tag */}
        <span
          className={`text-[11px] font-700 tracking-[0.18em] uppercase ${
            reason.dark ? "text-white/35" : "text-[var(--color-text-muted)]"
          }`}
        >
          0{index + 1}
        </span>

        {/* Bottom: title + desc */}
        <div className="flex flex-col gap-3">
          <h3
            className={`font-display font-800 text-[1.55rem] lg:text-[1.75rem] leading-[1.15] tracking-tight ${
              reason.dark ? "text-white" : "text-[var(--color-text-primary)]"
            }`}
          >
            {reason.title}
          </h3>
          <p
            className={`text-[14.5px] leading-[1.65] ${
              reason.dark
                ? "text-white/65"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            {reason.desc}
          </p>
        </div>
      </div>

      {/* Hover corner accent */}
      <div
        className={`absolute top-0 left-0 w-0.5 transition-all duration-500 ${
          reason.dark ? "bg-[var(--color-brand-accent)]" : "bg-[var(--color-brand-primary)]"
        } ${hovered ? "h-full" : "h-0"}`}
      />
    </div>
  );
}

export default function WhyUsSection() {
  return (
    <section
      className="py-20 lg:py-28 bg-[var(--color-surface-alt)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header row */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-700 text-[var(--color-brand-primary)] tracking-[0.18em] uppercase">
              Why Choose Us
            </span>
            <h2 className="font-display font-800 text-[clamp(2rem,4vw,2.9rem)] text-[var(--color-text-primary)] tracking-tight leading-[1.08]">
              What Sets Us Apart
            </h2>
          </div>

          {/* Stats inline on desktop */}
          <div className="hidden sm:flex items-center gap-6 shrink-0 pb-1">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-display font-800 text-[1.4rem] leading-none text-[var(--color-brand-primary)]">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5 whitespace-nowrap">
                    {s.label}
                  </div>
                </div>
                {i < STATS.length - 1 && (
                  <div className="w-px h-8 bg-[var(--color-border)]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2×2 checkerboard grid */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-deep)] border border-[var(--color-border)]">
          {REASONS.map((reason, i) => (
            <FeatureCell key={reason.keyword} reason={reason} index={i} />
          ))}
        </div>

        {/* Bottom row */}
        <div className="reveal mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          {/* Mobile stats */}
          <div className="flex sm:hidden items-center gap-6">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                <div>
                  <div className="font-display font-800 text-[1.3rem] leading-none text-[var(--color-brand-primary)]">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">{s.label}</div>
                </div>
                {i < STATS.length - 1 && <div className="w-px h-7 bg-[var(--color-border)]" />}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/about-us/"
              className="group flex items-center gap-2 px-6 py-3 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[14px] font-700 rounded-[var(--radius-btn)] shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105"
            >
              About Our Company
              <ArrowRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/contact/"
              className="flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-border)] hover:border-[var(--color-brand-primary)] text-[var(--color-text-primary)] text-[14px] font-600 rounded-[var(--radius-btn)] hover:bg-[var(--color-brand-accent-muted)] transition-all duration-300"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
