"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { faqs } from "@/data/services";

function FAQItem({ faq, isOpen, onToggle }) {
  const bodyRef = useRef(null);

  return (
    <div
      className={`rounded-2xl border transition-all duration-250 ${
        isOpen
          ? "border-[var(--color-brand-primary)]/30 bg-[var(--color-brand-accent-muted)] shadow-[var(--shadow-card)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand-primary)]/20"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className={`text-[15px] font-700 leading-snug transition-colors duration-200 ${isOpen ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-primary)]"}`}>
          {faq.q}
        </span>
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-[var(--color-brand-primary)] rotate-0"
              : "bg-[var(--color-surface-alt)] rotate-0"
          }`}
        >
          {isOpen ? (
            <Minus size={13} strokeWidth={3} className="text-white" />
          ) : (
            <Plus size={13} strokeWidth={3} className="text-[var(--color-text-secondary)]" />
          )}
        </span>
      </button>

      <div
        ref={bodyRef}
        className={`overflow-hidden transition-all duration-350 ease-in-out ${
          isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5">
          <div className="h-px bg-[var(--color-border)] mb-4" />
          <p className="text-[14px] leading-[1.75] text-[var(--color-text-secondary)]">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((child) =>
            child.classList.add("revealed")
          );
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[var(--color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-14 items-start">

          {/* Left — heading */}
          <div className="reveal lg:sticky lg:top-28 flex flex-col gap-5">
            <span className="inline-block w-fit px-4 py-1.5 rounded-full bg-[var(--color-brand-primary)]/8 text-[var(--color-brand-primary)] text-[12px] font-700 tracking-widest uppercase">
              FAQ
            </span>
            <h2 className="font-display font-800 text-[clamp(1.9rem,3.5vw,2.5rem)] text-[var(--color-text-primary)] tracking-tight leading-tight heading-line">
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] leading-[1.7] text-[var(--color-text-secondary)]">
              Have a question about our services, pricing, or coverage areas? Find
              quick answers below or reach out directly.
            </p>
            <Link
              href="/faq/"
              className="group flex items-center gap-2 w-fit text-[14px] font-600 text-[var(--color-brand-primary)] hover:underline underline-offset-4 transition-all duration-200"
            >
              View all FAQs
              <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <div className="mt-4 p-5 rounded-2xl bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
              <p className="text-[14px] text-[var(--color-text-secondary)] mb-3">
                Still have questions? Contact us directly.
              </p>
              <a
                href="tel:+14033544422"
                className="flex items-center gap-2 text-[15px] font-700 text-[var(--color-brand-primary)]"
              >
                403 354 4422
              </a>
              <a
                href="mailto:services@qualityautoglassltd.com"
                className="text-[13px] text-[var(--color-text-muted)]"
              >
                services@qualityautoglassltd.com
              </a>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="reveal flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
