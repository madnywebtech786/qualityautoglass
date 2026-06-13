"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Star } from "lucide-react";

const HERO_STATS = [
  { value: "6+", label: "Years" },
  { value: "5K+", label: "Vehicles" },
  { value: "5★", label: "Rating" },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let width, height;
    const DOTS = [];
    const DOT_COUNT = 55;

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    function initDots() {
      DOTS.length = 0;
      for (let i = 0; i < DOT_COUNT; i++) {
        DOTS.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5 + 0.4,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          o: Math.random() * 0.35 + 0.08,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < DOTS.length; i++) {
        const d = DOTS[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > width) d.vx *= -1;
        if (d.y < 0 || d.y > height) d.vy *= -1;
        for (let j = i + 1; j < DOTS.length; j++) {
          const d2 = DOTS[j];
          const dist = Math.hypot(d.x - d2.x, d.y - d2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(10,106,245,${0.055 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(10,106,245,${d.o})`;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    initDots();
    draw();
    const ro = new ResizeObserver(() => { resize(); initDots(); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-surface)]">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[65vw] h-[65vh] bg-gradient-radial from-[var(--color-brand-accent-muted)] to-transparent opacity-55" />
        <div className="absolute bottom-0 right-0 w-[45vw] h-[50vh] bg-gradient-radial from-[#e8f1ff] to-transparent opacity-65" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-conic from-[#e0f7ff]/20 via-transparent to-[#dce8ff]/15 animate-spin-slow" />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />

      {/* Beam sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/18 to-transparent" style={{ animation: "beamSweep 7s ease-in-out infinite" }} />
      </div>

      {/* Main layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full pt-24 pb-12 lg:pt-28 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left — stripped, editorial */}
          <div className="flex flex-col gap-8">

            {/* Eyebrow badge */}
            <div className="animate-fade-up flex items-center gap-2.5 w-fit">
              <span className="animate-pulse-ring flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-brand-primary)]/12">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-primary)]" />
              </span>
              <span className="text-[12px] font-700 text-[var(--color-brand-primary)] tracking-[0.12em] uppercase">
                Calgary&apos;s Auto Glass Specialists
              </span>
            </div>

            {/* Headline — large, airy */}
            <div className="animate-fade-up delay-100 flex flex-col gap-1">
              <h1 className="font-display font-800 text-[clamp(2.75rem,5.8vw,4.25rem)] leading-[1.06] text-[var(--color-text-primary)] tracking-tight">
                Same-Day
                <br />
                <span className="text-shimmer">Windshield</span>
                <br />
                Replacement
              </h1>
              <p className="mt-4 text-[16.5px] leading-[1.72] text-[var(--color-text-secondary)] max-w-[440px]">
                Fast, reliable auto glass repair and replacement for Calgary drivers — chip repairs, cracks, full replacements, and more.
              </p>
            </div>

            {/* CTAs */}
            <div className="animate-fade-up delay-200 flex flex-wrap items-center gap-3">
              <Link
                href="/contact/"
                className="group flex items-center gap-2.5 px-7 py-3.5 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[15px] font-700 rounded-[var(--radius-btn)] shadow-[var(--shadow-glow)] hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Free Estimate
                <ArrowRight size={15} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+14033544422"
                className="flex items-center gap-2 text-[15px] font-600 text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors duration-200"
              >
                <Phone size={15} strokeWidth={2.5} />
                403 354 4422
              </a>
            </div>

            {/* Stats row — clean dividers */}
            <div className="animate-fade-up delay-300 flex items-center gap-0 pt-1">
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className="flex items-center">
                  <div className="flex flex-col pr-6 lg:pr-8">
                    <span className="font-display font-800 text-[1.85rem] leading-none text-[var(--color-brand-primary)]">
                      {s.value}
                    </span>
                    <span className="text-[11px] font-600 text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
                      {s.label}
                    </span>
                  </div>
                  {i < HERO_STATS.length - 1 && (
                    <div className="w-px h-10 bg-[var(--color-border)] mr-6 lg:mr-8 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative animate-fade-up delay-300">
            <div className="relative rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-deep)] animate-float">
              <Image
                src="/images/landing-hero-side.webp"
                alt="Professional windshield replacement service in Calgary"
                width={800}
                height={560}
                className="w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-text-primary)]/20 via-transparent to-transparent" />
            </div>

            {/* Floating badge — top left */}
            <div className="absolute -top-5 -left-5 lg:-left-8 glass-card rounded-2xl px-4 py-3 shadow-[var(--shadow-deep)] animate-scale-in delay-600">
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-700 text-[var(--color-text-primary)]">Rock Chip Special</span>
                <span className="text-[22px] font-display font-800 text-[var(--color-brand-primary)] leading-none mt-0.5">$29.95</span>
                <span className="text-[11px] text-[var(--color-text-muted)] mt-0.5">2 repairs included</span>
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute -bottom-5 -right-5 lg:-right-8 glass-card rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-[var(--shadow-deep)] animate-scale-in delay-700">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-700 text-[var(--color-text-primary)]">5-Star Rated</span>
                <span className="text-[11px] text-[var(--color-text-muted)]">Calgary trusted</span>
              </div>
            </div>

            {/* Decorative rings */}
            <div className="absolute -z-10 -top-8 -right-8 w-52 h-52 rounded-full border-2 border-dashed border-[var(--color-brand-primary)]/12 animate-spin-slow" />
            <div className="absolute -z-10 -bottom-10 -left-10 w-36 h-36 rounded-full border border-[var(--color-brand-accent)]/18" />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 L0 60 Z" fill="var(--color-surface-alt)" />
        </svg>
      </div>
    </section>
  );
}
