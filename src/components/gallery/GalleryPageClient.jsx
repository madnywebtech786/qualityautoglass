"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { X, ZoomIn, ArrowRight, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "Windshield", "Rock Chip", "Side Window", "Before & After"];

const ITEMS = [
  // Windshield
  { id: 1,  cat: "Windshield",     title: "Full Windshield Replacement",   sub: "2022 Ford F-150",          w: 2, h: 1, img: "/images/Windshield-Replacement.webp" },
  { id: 2,  cat: "Windshield",     title: "OEM Windshield Install",        sub: "2021 Toyota RAV4",         w: 1, h: 1, img: "/images/Windshield-Replacement.webp" },
  { id: 3,  cat: "Windshield",     title: "Honda CRV Windshield",          sub: "2020 Honda CR-V",          w: 1, h: 2, img: "/images/Windshield-Replacement.webp" },
  { id: 4,  cat: "Windshield",     title: "Ram 1500 Replacement",          sub: "2023 RAM 1500",            w: 1, h: 1, img: "/images/Windshield-Replacement.webp" },
  { id: 5,  cat: "Windshield",     title: "Chevy Silverado Glass",         sub: "2019 Chevrolet Silverado", w: 2, h: 1, img: "/images/Windshield-Replacement.webp" },
  // Rock Chip
  { id: 6,  cat: "Rock Chip",      title: "Bullseye Chip Repair",          sub: "2021 Hyundai Tucson",      w: 1, h: 1, img: "/images/Rock-Chip-Repair.webp" },
  { id: 7,  cat: "Rock Chip",      title: "Star Crack Fixed",              sub: "2020 Toyota Camry",        w: 1, h: 2, img: "/images/Rock-Chip-Repair.webp" },
  { id: 8,  cat: "Rock Chip",      title: "Multi-chip Repair",             sub: "2022 Mazda CX-5",          w: 2, h: 1, img: "/images/Rock-Chip-Repair.webp" },
  { id: 9,  cat: "Rock Chip",      title: "Combination Break Repair",      sub: "2018 Subaru Forester",     w: 1, h: 1, img: "/images/Rock-Chip-Repair.webp" },
  // Side Window (no dedicated image — use windshield as closest match)
  { id: 10, cat: "Side Window",    title: "Driver Door Glass",             sub: "2021 VW Tiguan",           w: 1, h: 1, img: "/images/Windshield-Replacement.webp" },
  { id: 11, cat: "Side Window",    title: "Rear Quarter Window",           sub: "2020 Nissan Murano",       w: 2, h: 1, img: "/images/Windshield-Replacement.webp" },
  { id: 12, cat: "Side Window",    title: "Passenger Window Replace",      sub: "2022 Kia Sportage",        w: 1, h: 2, img: "/images/Windshield-Replacement.webp" },
  { id: 13, cat: "Side Window",    title: "Vent Glass Installation",       sub: "2019 Ford Escape",         w: 1, h: 1, img: "/images/Windshield-Replacement.webp" },
  // Before & After
  { id: 14, cat: "Before & After", title: "Cracked → Crystal Clear",       sub: "2021 Jeep Grand Cherokee", w: 2, h: 1, img: "/images/Rock-Chip-Repair.webp" },
  { id: 15, cat: "Before & After", title: "Shattered → Replaced",          sub: "2020 GMC Sierra",          w: 1, h: 1, img: "/images/Windshield-Replacement.webp" },
  { id: 16, cat: "Before & After", title: "Starred Chip → Invisible Fix",  sub: "2022 Audi Q5",            w: 1, h: 2, img: "/images/Rock-Chip-Repair.webp" },
  { id: 17, cat: "Before & After", title: "Broken Side → Like New",        sub: "2019 BMW X5",             w: 1, h: 1, img: "/images/Glass-Tinting.webp" },
  { id: 18, cat: "Before & After", title: "Full Restoration",              sub: "2023 Lexus RX",            w: 2, h: 1, img: "/images/ADAS-Calibration.webp" },
];

function MasonryGrid({ items, onOpen }) {
  return (
    <div className="gl-masonry">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`gl-item reveal${item.w === 2 ? " gl-wide" : ""}${item.h === 2 ? " gl-tall" : ""}`}
          style={{ animationDelay: `${i * 55}ms` }}
          onClick={() => onOpen(item)}
        >
          <img
            src={item.img}
            alt={item.title}
            className="gl-img"
            loading="lazy"
          />
          <div className="gl-overlay">
            <div className="gl-overlay-inner">
              <span className="gl-cat-pill">{item.cat}</span>
              <p className="gl-title">{item.title}</p>
              <p className="gl-sub">{item.sub}</p>
            </div>
            <span className="gl-zoom-icon">
              <ZoomIn size={18} strokeWidth={2} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GalleryPageClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  const filtered = activeFilter === "All" ? ITEMS : ITEMS.filter((i) => i.cat === activeFilter);

  const openLightbox = useCallback((item) => {
    setLightbox(item);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const navLightbox = useCallback((dir) => {
    if (!lightbox) return;
    const idx = filtered.findIndex((i) => i.id === lightbox.id);
    const next = filtered[(idx + dir + filtered.length) % filtered.length];
    setLightbox(next);
  }, [lightbox, filtered]);

  useEffect(() => {
    function onKey(e) {
      if (!lightbox) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navLightbox(-1);
      if (e.key === "ArrowRight") navLightbox(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, navLightbox]);

  useEffect(() => {
    const els = [heroRef.current, gridRef.current];
    const observers = els.map((el) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".reveal").forEach((c, i) => {
              setTimeout(() => c.classList.add("revealed"), i * 50);
            });
            obs.disconnect();
          }
        },
        { threshold: 0.04 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    el.querySelectorAll(".reveal").forEach((c) => {
      c.classList.remove("revealed");
      requestAnimationFrame(() => c.classList.add("revealed"));
    });
  }, [activeFilter]);

  return (
    <>
      <style>{`
        /* ── Reveal ── */
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.revealed { opacity: 1; transform: none; }

        /* ── Filter tabs ── */
        .gl-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .gl-tab {
          padding: 9px 20px;
          border-radius: 99px;
          border: 1.5px solid var(--color-border);
          background: var(--color-surface);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-muted);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.22,1,0.36,1);
          letter-spacing: 0.01em;
        }
        .gl-tab:hover {
          border-color: var(--color-brand-primary);
          color: var(--color-brand-primary);
          background: var(--color-brand-accent-muted);
        }
        .gl-tab.active {
          background: var(--color-brand-primary);
          border-color: var(--color-brand-primary);
          color: #fff;
          box-shadow: 0 4px 16px rgba(10,106,245,0.25);
        }

        /* ── Masonry grid ── */
        .gl-masonry {
          columns: 3;
          column-gap: 16px;
        }
        @media (max-width: 1024px) { .gl-masonry { columns: 2; } }
        @media (max-width: 640px)  { .gl-masonry { columns: 1; } }

        .gl-item {
          break-inside: avoid;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          margin-bottom: 16px;
          background: var(--color-surface-alt);
        }

        .gl-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }

        .gl-item:hover .gl-img {
          transform: scale(1.06);
        }

        /* ── Overlay ── */
        .gl-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,15,30,0.82) 0%, rgba(10,15,30,0.18) 55%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          padding: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gl-item:hover .gl-overlay { opacity: 1; }

        .gl-overlay-inner { margin-top: auto; }

        .gl-cat-pill {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-brand-accent);
          background: rgba(0,212,255,0.12);
          border: 1px solid rgba(0,212,255,0.3);
          padding: 3px 10px;
          border-radius: 99px;
          margin-bottom: 8px;
        }
        .gl-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
          margin-bottom: 3px;
        }
        .gl-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
        }
        .gl-zoom-icon {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          transition: background 0.2s, transform 0.2s;
        }
        .gl-item:hover .gl-zoom-icon {
          background: var(--color-brand-primary);
          transform: scale(1.1);
        }

        /* ── Lightbox ── */
        .lb-backdrop {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(10,15,30,0.94);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.22s ease both;
        }
        .lb-panel {
          position: relative;
          max-width: 900px;
          width: 100%;
          animation: scaleIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .lb-img {
          width: 100%;
          border-radius: 18px;
          display: block;
          max-height: 80vh;
          object-fit: cover;
        }
        .lb-info {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 24px 24px 20px;
          background: linear-gradient(to top, rgba(10,15,30,0.88) 0%, transparent 100%);
          border-radius: 0 0 18px 18px;
        }
        .lb-close {
          position: absolute;
          top: -14px; right: -14px;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          z-index: 10;
        }
        .lb-close:hover { background: rgba(255,255,255,0.22); transform: scale(1.08); }

        .lb-nav {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1.5px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .lb-nav:hover { background: var(--color-brand-primary); transform: translateY(-50%) scale(1.08); }
        .lb-prev { left: -54px; }
        .lb-next { right: -54px; }
        @media (max-width: 1024px) {
          .lb-prev { left: 10px; }
          .lb-next { right: 10px; }
        }

        /* ── Count badge ── */
        .gl-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 99px;
          background: var(--color-brand-accent-muted);
          border: 1px solid rgba(10,106,245,0.15);
          font-size: 12px;
          font-weight: 600;
          color: var(--color-brand-primary);
        }
      `}</style>

      {/* ── Hero ── */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-[var(--color-surface)] border-b border-[var(--color-border)]"
        style={{ paddingTop: "80px" }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.4]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gldg" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="var(--color-border)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gldg)" />
          </svg>
        </div>

        {/* Subtle brand accent arc — top right */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: "-80px",
            right: "-80px",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            border: "1px solid rgba(10,106,245,0.08)",
            background: "radial-gradient(circle, rgba(10,106,245,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">
          <div className="reveal flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-[var(--color-brand-primary)]" />
            <span className="text-[10.5px] font-700 tracking-[0.3em] uppercase text-[var(--color-brand-primary)]">
              Our Work
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-xl">
              <h1
                className="reveal font-display text-[var(--color-text-primary)] leading-none tracking-tight mb-5"
                style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
              >
                Our work<br />
                <span className="text-gradient">speaks for itself</span>
              </h1>
              <p className="reveal text-[16px] leading-[1.8] text-[var(--color-text-secondary)]">
                Browse our real Calgary jobs — windshield replacements, chip repairs, side windows, and dramatic before &amp; after results.
              </p>
            </div>

            <div className="reveal flex flex-col gap-3 lg:items-end shrink-0">
              <div className="gl-count-badge">
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--color-brand-primary)",
                    display: "inline-block",
                  }}
                />
                {ITEMS.length}+ completed jobs
              </div>
              <Link
                href="/contact/"
                className="group flex items-center gap-2 px-6 py-3 rounded-[var(--radius-btn)] bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[14px] font-700 shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-200"
              >
                Get a Free Estimate
                <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid + Filters ── */}
      <div ref={gridRef} className="bg-[var(--color-surface)] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Filter tabs */}
          <div className="reveal mb-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="gl-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`gl-tab${activeFilter === cat ? " active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-[13px] text-[var(--color-text-muted)] ml-auto shrink-0">
              {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Masonry */}
          <MasonryGrid items={filtered} onOpen={openLightbox} />

        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-[var(--color-surface-alt)] border-t border-[var(--color-border)] py-14 lg:py-18">
        <div className="max-w-2xl mx-auto px-5 lg:px-8 text-center">
          <h2
            className="font-display text-[var(--color-text-primary)] leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Need glass work done?
          </h2>
          <p className="text-[15px] text-[var(--color-text-secondary)] leading-relaxed mb-7">
            Free estimates, same-day service, honest pricing — Calgary&apos;s family-owned auto glass specialists since 2018.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact/"
              className="group flex items-center gap-2 px-6 py-3 rounded-[var(--radius-btn)] bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[14px] font-700 shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-200"
            >
              Get a Free Estimate
              <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+14033544422"
              className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-btn)] border border-[var(--color-border)] text-[14px] font-600 text-[var(--color-text-secondary)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-accent-muted)] transition-all duration-200"
            >
              <Phone size={14} strokeWidth={2.5} />
              403 354 4422
            </a>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lb-backdrop" onClick={closeLightbox}>
          <div className="lb-panel" onClick={(e) => e.stopPropagation()}>
            <button className="lb-close" onClick={closeLightbox} aria-label="Close">
              <X size={16} strokeWidth={2.5} />
            </button>

            <button className="lb-nav lb-prev" onClick={() => navLightbox(-1)} aria-label="Previous">
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button className="lb-nav lb-next" onClick={() => navLightbox(1)} aria-label="Next">
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>

            <img src={lightbox.img} alt={lightbox.title} className="lb-img" />

            <div className="lb-info">
              <span
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-brand-accent)",
                  marginBottom: "6px",
                }}
              >
                {lightbox.cat}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.3,
                  marginBottom: "3px",
                }}
              >
                {lightbox.title}
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>
                {lightbox.sub}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
