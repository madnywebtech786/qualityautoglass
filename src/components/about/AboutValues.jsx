"use client";

import { useState } from "react";

const VALUES = [
  {
    index: "01",
    title: "Honest Pricing",
    body: "You get a clear estimate before any work begins. No hidden fees, no surprise charges — just straightforward numbers you can count on.",
    keyword: "HONEST",
    accent: "var(--color-brand-primary)",
    dark: true,
  },
  {
    index: "02",
    title: "OEM-Grade Materials",
    body: "We use glass and adhesives that meet or exceed factory specifications. Your vehicle was built to a standard — we maintain it.",
    keyword: "QUALITY",
    accent: "var(--color-brand-accent)",
    dark: false,
  },
  {
    index: "03",
    title: "Same-Day Service",
    body: "Most repairs and replacements are completed in a single visit. We respect your time as much as you do.",
    keyword: "FAST",
    accent: "#6c3ce0",
    dark: true,
  },
  {
    index: "04",
    title: "Local & Community",
    body: "We live and work in Calgary. We know these roads because we drive them too. When you call us, you reach a real person who cares.",
    keyword: "LOCAL",
    accent: "var(--color-promo)",
    dark: false,
  },
];

function ValueCard({ val }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden cursor-default transition-all duration-500 group ${
        val.dark
          ? "bg-[var(--color-text-primary)]"
          : "bg-[var(--color-surface)] border border-[var(--color-border)]"
      }`}
      style={{ minHeight: "300px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent left edge grows on hover */}
      <div
        className="absolute top-0 left-0 w-[3px] transition-all duration-500"
        style={{
          background: val.accent,
          height: hovered ? "100%" : "0%",
        }}
      />

      {/* Giant watermark keyword */}
      <span
        className="absolute bottom-0 right-2 font-display font-800 leading-none select-none pointer-events-none tracking-tighter transition-all duration-500"
        style={{
          fontSize: "clamp(5rem,9vw,8rem)",
          color: val.dark
            ? `rgba(255,255,255,${hovered ? 0.07 : 0.03})`
            : `rgba(10,106,245,${hovered ? 0.08 : 0.04})`,
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
        aria-hidden="true"
      >
        {val.keyword}
      </span>

      {/* Content */}
      <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col justify-between" style={{ minHeight: "300px" }}>
        {/* Index */}
        <div className="flex items-center justify-between">
          <span
            className="font-display font-800 text-[2rem] leading-none"
            style={{ color: val.accent }}
          >
            {val.index}
          </span>
          {/* Dot indicator */}
          <span
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: val.accent,
              opacity: hovered ? 1 : 0.25,
              transform: hovered ? "scale(1.5)" : "scale(1)",
            }}
          />
        </div>

        {/* Bottom text */}
        <div className="flex flex-col gap-3 mt-8">
          <h3
            className={`font-display font-800 leading-[1.15] tracking-tight ${
              val.dark ? "text-white" : "text-[var(--color-text-primary)]"
            }`}
            style={{ fontSize: "clamp(1.35rem,2.2vw,1.65rem)" }}
          >
            {val.title}
          </h3>
          <p
            className={`text-[14.5px] leading-[1.7] ${
              val.dark ? "text-white/55" : "text-[var(--color-text-secondary)]"
            }`}
          >
            {val.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutValues() {
  return (
    <section
      className="py-20 lg:py-28 bg-[var(--color-surface-alt)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <span className="inline-block mb-3 text-[11px] font-700 text-[var(--color-brand-primary)] tracking-[0.22em] uppercase">
              What We Stand For
            </span>
            <h2
              className="font-display text-[var(--color-text-primary)] tracking-tight leading-[1.06]"
              style={{ fontSize: "clamp(2rem,4vw,2.9rem)" }}
            >
              Our Core Values
            </h2>
          </div>
          <p className="text-[14.5px] text-[var(--color-text-muted)] max-w-sm leading-[1.7] sm:text-right pb-1">
            Four principles we&apos;ve held since day one. They&apos;re not a
            marketing list — they&apos;re how we actually operate.
          </p>
        </div>

        {/* 2×2 grid — checkerboard, dark/light alternating */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-deep)] border border-[var(--color-border)]">
          {VALUES.map((val) => (
            <ValueCard key={val.index} val={val} />
          ))}
        </div>
      </div>
    </section>
  );
}
