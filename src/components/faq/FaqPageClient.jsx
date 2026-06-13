"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { faqs } from "@/data/services";
import { ArrowRight, Phone, Plus, Minus } from "lucide-react";

export default function FaqPageClient() {
  const [open, setOpen] = useState(0);
  const heroRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const els = [heroRef.current, bodyRef.current];
    const observers = els.map((el) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.querySelectorAll(".fq-reveal").forEach((c, i) => {
              setTimeout(() => c.classList.add("fq-in"), i * 70);
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

  return (
    <>
      <style>{`
        .fq-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .fq-reveal.fq-in { opacity: 1; transform: none; }

        /* accordion answer */
        .fq-answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .fq-answer.open { grid-template-rows: 1fr; }
        .fq-answer-inner { overflow: hidden; }

        /* accordion row */
        .fq-row {
          border-bottom: 1px solid var(--color-border);
          transition: background 0.2s ease;
        }
        .fq-row:first-child { border-top: 1px solid var(--color-border); }

        .fq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 0;
          text-align: left;
          cursor: pointer;
          background: none;
          border: none;
          outline: none;
        }

        .fq-q-text {
          font-family: var(--font-display);
          font-size: clamp(0.95rem, 1.5vw, 1.08rem);
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.35;
          transition: color 0.2s;
          text-align: left;
        }
        .fq-row.active .fq-q-text { color: var(--color-brand-primary); }

        .fq-icon {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1.5px solid var(--color-border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--color-text-muted);
          transition: border-color 0.2s, color 0.2s, background 0.2s, transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .fq-row.active .fq-icon {
          border-color: var(--color-brand-primary);
          color: white;
          background: var(--color-brand-primary);
        }

        .fq-a-text {
          font-size: 15px;
          line-height: 1.75;
          color: var(--color-text-secondary);
          padding-bottom: 22px;
          padding-right: 46px;
        }

        /* left sticky panel */
        .fq-left-border {
          width: 3px;
          background: linear-gradient(to bottom, var(--color-brand-primary), var(--color-brand-accent));
          border-radius: 99px;
          flex-shrink: 0;
        }

        /* contact method cards */
        .fq-contact-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          text-decoration: none;
        }
        .fq-contact-card:hover {
          border-color: rgba(10,106,245,0.3);
          box-shadow: 0 4px 20px rgba(10,106,245,0.08);
          transform: translateY(-2px);
        }
        .fq-contact-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--color-brand-accent-muted);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      {/* ── Hero ── */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-[var(--color-surface)] border-b border-[var(--color-border)]"
        style={{ paddingTop: "80px" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.4]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="fqg" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="var(--color-border)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fqg)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">
          <div className="fq-reveal flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-[var(--color-brand-primary)]" />
            <span className="text-[10.5px] font-700 tracking-[0.3em] uppercase text-[var(--color-brand-primary)]">
              FAQ
            </span>
          </div>
          <div className="max-w-2xl">
            <h1
              className="fq-reveal font-display text-[var(--color-text-primary)] leading-none tracking-tight mb-5"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
            >
              Questions we<br />
              <span className="text-gradient">hear every day</span>
            </h1>
            <p className="fq-reveal text-[16px] leading-[1.8] text-[var(--color-text-secondary)]">
              Straight answers about our auto glass services, pricing, and process — no fluff.
            </p>
          </div>
        </div>
      </div>

      {/* ── Body: sticky left + accordion right ── */}
      <div ref={bodyRef} className="bg-[var(--color-surface)] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-[300px_1fr] gap-12 lg:gap-20 items-start">

            {/* Left sticky panel */}
            <div className="fq-reveal lg:sticky lg:top-28">
              <div className="flex gap-4">
                <div className="fq-left-border" />
                <div>
                  <p className="text-[11px] font-700 tracking-[0.28em] uppercase text-[var(--color-brand-primary)] mb-3">
                    Still have questions?
                  </p>
                  <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-6">
                    Our team is happy to help. Reach out directly and we'll get back to you fast.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="tel:+14033544422"
                      className="fq-contact-card"
                    >
                      <span className="fq-contact-icon">
                        <Phone size={16} strokeWidth={2} className="text-[var(--color-brand-primary)]" />
                      </span>
                      <div>
                        <p className="text-[11px] font-700 tracking-[0.18em] uppercase text-[var(--color-text-muted)] mb-0.5">Call Us</p>
                        <p className="text-[14px] font-600 text-[var(--color-text-primary)]">403 354 4422</p>
                      </div>
                    </a>
                    <Link
                      href="/contact/"
                      className="fq-contact-card"
                    >
                      <span className="fq-contact-icon">
                        <ArrowRight size={16} strokeWidth={2} className="text-[var(--color-brand-primary)]" />
                      </span>
                      <div>
                        <p className="text-[11px] font-700 tracking-[0.18em] uppercase text-[var(--color-text-muted)] mb-0.5">Get Estimate</p>
                        <p className="text-[14px] font-600 text-[var(--color-text-primary)]">Free, no obligation</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right accordion */}
            <div className="fq-reveal">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`fq-row${open === i ? " active" : ""}`}
                >
                  <button
                    className="fq-question"
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                  >
                    <span className="fq-q-text">{faq.q}</span>
                    <span className="fq-icon">
                      {open === i
                        ? <Minus size={13} strokeWidth={2.5} />
                        : <Plus size={13} strokeWidth={2.5} />
                      }
                    </span>
                  </button>
                  <div className={`fq-answer${open === i ? " open" : ""}`}>
                    <div className="fq-answer-inner">
                      <p className="fq-a-text">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-[var(--color-surface-alt)] border-t border-[var(--color-border)] py-14 lg:py-18">
        <div className="max-w-2xl mx-auto px-5 lg:px-8 text-center">
          <h2
            className="font-display text-[var(--color-text-primary)] leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            Ready to get your glass fixed?
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
    </>
  );
}
