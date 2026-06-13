"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

const SERVICE_IMAGES = [
  "/images/Windshield-Replacement.webp",
  "/images/Rock-Chip-Repair.webp",
  "/images/Glass-Tinting.webp",
  "/images/ADAS-Calibration.webp",
];

const PANEL_ACCENTS = [
  "var(--color-brand-primary)",
  "var(--color-brand-accent)",
  "#6c3ce0",
  "var(--color-promo)",
];

const INTERVAL_MS = 5000;

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tickKey, setTickKey] = useState(0);

  const sectionRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const timerRef = useRef(null);
  /* desktop-only pause flag — stored in a ref so it doesn't cause re-renders */
  const desktopPausedRef = useRef(false);
  /* flag to suppress the onScroll handler while we are programmatically scrolling */
  const suppressScrollRef = useRef(false);

  /* ── Core advance function (always uses latest activeIndex via ref) ── */
  const activeIndexRef = useRef(0);
  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  function advance() {
    const next = (activeIndexRef.current + 1) % services.length;
    activeIndexRef.current = next;
    setActiveIndex(next);
    setTickKey((k) => k + 1);
    scrollMobileTo(next);
  }

  /* ── Start / restart the interval ── */
  function startTimer() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!desktopPausedRef.current) advance();
    }, INTERVAL_MS);
  }

  /* Start once on mount */
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Scroll mobile strip to a given index ── */
  function scrollMobileTo(idx) {
    const strip = mobileScrollRef.current;
    if (!strip) return;
    const card = strip.children[idx];
    if (!card) return;
    suppressScrollRef.current = true;
    const cardLeft = card.offsetLeft;
    const stripWidth = strip.offsetWidth;
    const cardWidth = card.offsetWidth;
    strip.scrollTo({ left: cardLeft - (stripWidth - cardWidth) / 2, behavior: "smooth" });
    /* re-enable scroll detection after animation */
    setTimeout(() => { suppressScrollRef.current = false; }, 700);
  }

  /* ── Scroll reveal ── */
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
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* User manually picks a panel — restart timer from 0 */
  function selectPanel(i) {
    activeIndexRef.current = i;
    setActiveIndex(i);
    setTickKey((k) => k + 1);
    scrollMobileTo(i);
    startTimer();
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 lg:py-24 bg-[var(--color-text-primary)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* ── Header ── */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 lg:mb-12">
          <div>
            <span className="inline-block mb-3 text-[11px] font-700 text-[var(--color-brand-accent)] tracking-[0.2em] uppercase">
              Our Services
            </span>
            <h2 className="font-display font-800 text-[clamp(2.1rem,4.2vw,3rem)] text-white tracking-tight leading-[1.06]">
              Every Auto Glass<br />Service, Done Right
            </h2>
          </div>
          <Link
            href="/contact/"
            className="group hidden sm:flex items-center gap-2 text-[13.5px] font-600 text-white/50 hover:text-white transition-colors duration-200 shrink-0 pb-1"
          >
            Get a free estimate
            <ArrowRight size={13} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── Desktop: expanding accordion panels ── */}
        <div
          className="reveal hidden lg:flex rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-deep)]"
          style={{ height: "520px" }}
          onMouseEnter={() => { desktopPausedRef.current = true; }}
          onMouseLeave={() => { desktopPausedRef.current = false; }}
        >
          {services.map((service, i) => {
            const isActive = activeIndex === i;
            const accent = PANEL_ACCENTS[i];

            return (
              <div
                key={service.id}
                onMouseEnter={() => selectPanel(i)}
                className="relative overflow-hidden cursor-pointer"
                style={{
                  flex: isActive ? "3.8 1 0%" : "1 1 0%",
                  transition: "flex 0.6s cubic-bezier(0.77,0,0.175,1)",
                  minWidth: 0,
                }}
              >
                {/* Photo */}
                <Image
                  src={SERVICE_IMAGES[i]}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover"
                  style={{
                    transform: isActive ? "scale(1.04)" : "scale(1.12)",
                    transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  loading={i === 0 ? "eager" : "lazy"}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

                {/* Colour tint on active */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(160deg, ${accent}28 0%, transparent 55%)`,
                    opacity: isActive ? 1 : 0,
                  }}
                />

                {/* Progress bar — runs for INTERVAL_MS, resets on each tick */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
                    <div
                      key={tickKey}
                      className="h-full rounded-full"
                      style={{
                        background: accent,
                        animation: `drawLine ${INTERVAL_MS}ms linear forwards`,
                      }}
                    />
                  </div>
                )}

                {/* Collapsed: vertical title */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                  style={{ opacity: isActive ? 0 : 1, pointerEvents: isActive ? "none" : "auto" }}
                >
                  <span
                    className="font-display font-800 text-[12px] text-white/45 tracking-[0.24em] uppercase whitespace-nowrap"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {service.title}
                  </span>
                </div>

                {/* Expanded: full content */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-7 flex flex-col gap-4"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(18px)",
                    transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-700 tracking-[0.2em] uppercase" style={{ color: accent }}>
                      0{i + 1} / 0{services.length}
                    </span>
                    {service.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-700 tracking-wide text-white" style={{ background: accent }}>
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-800 text-[1.85rem] text-white leading-tight tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-[13.5px] text-white/62 leading-[1.7] max-w-xs">
                    {service.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.features.slice(0, 3).map((f) => (
                      <span key={f} className="px-3 py-1 rounded-full text-[11px] font-600 text-white/65 border border-white/14 bg-white/5">
                        {f}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={service.slug}
                    className="group/cta w-fit flex items-center gap-2 mt-1 px-5 py-2.5 rounded-[var(--radius-btn)] text-[13px] font-700 text-white hover:gap-3 transition-all duration-250"
                    style={{ background: `${accent}cc`, backdropFilter: "blur(8px)" }}
                  >
                    Learn More
                    <ArrowRight size={13} strokeWidth={2.5} className="transition-transform duration-200 group-hover/cta:translate-x-1" />
                  </Link>
                </div>

                {/* Watermark index */}
                <span
                  className="absolute top-5 right-5 font-display font-800 leading-none select-none pointer-events-none transition-all duration-500"
                  style={{
                    color: "rgba(255,255,255,0.04)",
                    fontSize: isActive ? "5.5rem" : "2.8rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Desktop dot indicators ── */}
        <div className="hidden lg:flex items-center justify-center gap-3 mt-5">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => selectPanel(i)}
              aria-label={`View service ${i + 1}`}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: activeIndex === i ? "2rem" : "0.5rem",
                background: activeIndex === i ? PANEL_ACCENTS[i] : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* ── Mobile: horizontal scroll snap ── */}
        <div className="reveal lg:hidden overflow-hidden">
          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto pb-2 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              paddingLeft: "calc(50% - 39vw)",
              paddingRight: "calc(50% - 39vw)",
            }}
            onScroll={(e) => {
              if (suppressScrollRef.current) return;
              const strip = e.currentTarget;
              /* find which card is closest to the center of the viewport */
              const center = strip.scrollLeft + strip.offsetWidth / 2;
              let closest = 0;
              let minDist = Infinity;
              Array.from(strip.children).forEach((card, i) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const dist = Math.abs(center - cardCenter);
                if (dist < minDist) { minDist = dist; closest = i; }
              });
              if (closest !== activeIndexRef.current) {
                activeIndexRef.current = closest;
                setActiveIndex(closest);
                setTickKey((k) => k + 1);
                startTimer();
              }
            }}
          >
            {services.map((service, i) => {
              const accent = PANEL_ACCENTS[i];
              const isActive = activeIndex === i;
              return (
                <div
                  key={service.id}
                  onClick={() => selectPanel(i)}
                  className="relative rounded-2xl overflow-hidden shrink-0 snap-center mr-4 last:mr-0"
                  style={{
                    width: "78vw",
                    maxWidth: "340px",
                    height: "420px",
                    outline: isActive ? `2px solid ${accent}` : "2px solid transparent",
                    outlineOffset: "2px",
                    transition: "outline-color 0.3s ease",
                  }}
                >
                  <Image
                    src={SERVICE_IMAGES[i]}
                    alt={service.title}
                    fill
                    sizes="78vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/28 to-transparent" />

                  {/* Progress bar on active mobile card */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
                      <div
                        key={`m-${tickKey}`}
                        className="h-full rounded-full"
                        style={{
                          background: accent,
                          animation: `drawLine ${INTERVAL_MS}ms linear forwards`,
                        }}
                      />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-700 tracking-[0.2em] uppercase" style={{ color: accent }}>
                        0{i + 1}
                      </span>
                      {service.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9.5px] font-700 text-white" style={{ background: accent }}>
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-800 text-[1.45rem] text-white leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-[12.5px] text-white/60 leading-[1.65]">
                      {service.shortDesc}
                    </p>
                    <Link
                      href={service.slug}
                      onClick={(e) => e.stopPropagation()}
                      className="w-fit flex items-center gap-1.5 text-[12px] font-700 text-white/80 hover:text-white transition-colors duration-150 mt-1"
                    >
                      Learn more <ArrowRight size={12} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile dot indicators — tappable */}
          <div className="flex justify-center gap-2.5 mt-4">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => selectPanel(i)}
                aria-label={`View service ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === i ? "1.75rem" : "0.5rem",
                  height: "0.375rem",
                  background: activeIndex === i ? PANEL_ACCENTS[i] : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="reveal mt-10 lg:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/8">
          <p className="text-[14.5px] text-white/45">
            Not sure what you need? We&apos;ll assess and recommend for free.
          </p>
          <Link
            href="/contact/"
            className="group flex items-center gap-2.5 px-7 py-3.5 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[14px] font-700 rounded-[var(--radius-btn)] shadow-[var(--shadow-glow)] hover:shadow-xl transition-all duration-300 hover:scale-105 shrink-0"
          >
            Get a Free Estimate
            <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
