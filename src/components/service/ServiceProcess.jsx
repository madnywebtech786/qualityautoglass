import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function ServiceProcess({ process: steps, features }) {
  const hasProcess = steps && steps.length > 0;

  return (
    <>
      <style>{`
        .sp-root { --e: cubic-bezier(0.22,1,0.36,1); }

        /* ══════════════════════════════════
           WHAT'S INCLUDED  — spec-sheet
        ══════════════════════════════════ */
        .wi-label, .wi-heading, .wi-kicker, .wi-badge, .hw-label, .hw-heading, .hw-cta {
          opacity: 1; transform: none;
        }
        .wi-row {
          border-top: 1px solid var(--color-border);
          display: grid;
          grid-template-columns: 52px 1fr;
          align-items: center;
          gap: 0;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .wi-row::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-brand-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .3s var(--e);
          z-index: 0;
        }
        .wi-row:hover::after { transform: scaleX(1); }
        .wi-row:hover .wi-num,
        .wi-row:hover .wi-text { color: white; }
        .wi-row:last-child { border-bottom: 1px solid var(--color-border); }

        .wi-num {
          position: relative; z-index: 1;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: .12em;
          color: var(--color-brand-primary);
          padding: 18px 0 18px 0;
          border-right: 1px solid var(--color-border);
          text-align: center;
          transition: color .2s;
        }
        .wi-text {
          position: relative; z-index: 1;
          font-size: 14.5px;
          font-weight: 500;
          color: var(--color-text-secondary);
          padding: 18px 0 18px 20px;
          line-height: 1.4;
          transition: color .2s;
        }

        /* count badge */
        .wi-badge {
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: -.04em;
          line-height: 1;
          background: linear-gradient(135deg, var(--color-brand-primary) 0%, var(--color-brand-accent) 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* rule */
        .wi-rule { background: var(--color-brand-primary); }

        /* ══════════════════════════════════
           HOW IT WORKS  — 2×grid cards
        ══════════════════════════════════ */
        .hw-root {
          background: var(--color-surface-alt);
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--color-border);
        }

        .hw-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 32px 28px 28px;
          position: relative;
          transition: border-color .25s ease, box-shadow .25s ease;
        }
        .hw-card:hover {
          border-color: rgba(10,106,245,.25);
          box-shadow: 0 8px 40px rgba(10,106,245,.09);
        }

        .hw-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: var(--color-text-primary);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          flex-shrink: 0;
          transition: transform .25s var(--e), box-shadow .25s ease;
        }
        .hw-card:hover .hw-icon {
          transform: scale(1.08);
          box-shadow: 0 4px 20px rgba(10,106,245,.25);
        }

        .hw-step-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--color-brand-primary);
          margin-bottom: 6px;
          display: block;
        }
        .hw-card-rule {
          height: 1px;
          background: var(--color-border);
          margin-bottom: 14px;
          width: 100%;
        }
        .hw-step-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          color: var(--color-text-primary);
          line-height: 1.2;
          margin-bottom: 10px;
          transition: color .2s;
        }
        .hw-card:hover .hw-step-title { color: var(--color-brand-primary); }
        .hw-card:hover .hw-step-bignum { color: rgba(10,106,245,.18) !important; }

        .hw-step-body {
          font-size: 14px;
          font-weight: 400;
          color: var(--color-text-muted);
          line-height: 1.65;
          margin-bottom: 20px;
        }
        .hw-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px 6px 10px;
          border-radius: 999px;
          border: 1px solid var(--color-border);
          background: var(--color-surface-alt);
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-secondary);
          transition: border-color .2s, color .2s, background .2s;
        }
        .hw-card:hover .hw-pill {
          border-color: rgba(10,106,245,.3);
          color: var(--color-brand-primary);
          background: var(--color-brand-accent-muted);
        }
        .hw-pill-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--color-brand-primary);
          flex-shrink: 0;
        }

        /* CSS scroll-driven entrance animations */
        @keyframes sp-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes sp-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes sp-rule-in {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes sp-slide-x {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: none; }
        }

        @supports (animation-timeline: view()) {
          .wi-label, .wi-heading, .wi-kicker, .wi-badge,
          .hw-label, .hw-heading, .hw-cta {
            animation: sp-fade-up 0.6s var(--e) both;
            animation-timeline: view();
            animation-range: entry 0% entry 30%;
          }
          .wi-rule {
            animation: sp-rule-in 1s var(--e) both;
            animation-timeline: view();
            animation-range: entry 0% entry 30%;
          }
          .wi-row {
            animation: sp-slide-x 0.45s var(--e) both;
            animation-timeline: view();
            animation-range: entry 0% entry 30%;
          }
          .wi-row:nth-child(1) { animation-delay: .00s; }
          .wi-row:nth-child(2) { animation-delay: .07s; }
          .wi-row:nth-child(3) { animation-delay: .14s; }
          .wi-row:nth-child(4) { animation-delay: .21s; }
          .wi-row:nth-child(5) { animation-delay: .28s; }
          .wi-row:nth-child(6) { animation-delay: .35s; }
          .hw-card {
            animation: sp-fade-up 0.5s var(--e) both;
            animation-timeline: view();
            animation-range: entry 0% entry 35%;
          }
          .hw-card:nth-child(1) { animation-delay: .00s; }
          .hw-card:nth-child(2) { animation-delay: .09s; }
          .hw-card:nth-child(3) { animation-delay: .18s; }
          .hw-card:nth-child(4) { animation-delay: .27s; }
          .hw-card:nth-child(5) { animation-delay: .36s; }
        }
      `}</style>

      <div className="sp-root">

        {/* ═══════════════════════════════
            WHAT'S INCLUDED
        ════════════════════════════════ */}
        <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">

            {/* top meta bar */}
            <div className="flex items-center justify-between mb-1">
              <div className="wi-label flex items-center gap-3">
                <span className="w-6 h-px bg-[var(--color-brand-primary)]" />
                <span className="text-[10px] font-700 tracking-[.32em] uppercase text-[var(--color-brand-primary)]">
                  What&apos;s Included
                </span>
              </div>
              <span className="wi-kicker text-[11px] font-500 tracking-[.12em] uppercase text-[var(--color-text-muted)]">
                {features.length} items
              </span>
            </div>

            {/* full-width rule */}
            <div className="relative h-px bg-[var(--color-border)] mb-8 overflow-hidden">
              <div className="wi-rule absolute inset-y-0 left-0 bg-[var(--color-brand-primary)]" />
            </div>

            <div className="grid lg:grid-cols-[1fr_240px] gap-0 lg:gap-16 items-start">

              {/* spec list */}
              <div>
                <h2
                  className="wi-heading font-display text-[var(--color-text-primary)] leading-none tracking-tight mb-8"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
                >
                  Everything in<br />this service
                </h2>

                <ul>
                  {features.map((f, i) => (
                    <li key={f} className="wi-row">
                      <span className="wi-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="wi-text">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* right: big number + blurb */}
              <div className="hidden lg:flex flex-col gap-8 pt-1">
                <div className="flex flex-col items-start">
                  <span
                    className="wi-badge"
                    style={{ fontSize: "clamp(5rem, 8vw, 7rem)" }}
                  >
                    {features.length}
                  </span>
                  <span className="wi-kicker block text-[11px] font-600 tracking-[.28em] uppercase text-[var(--color-text-muted)] mt-2">
                    services covered
                  </span>
                </div>
                <div className="wi-kicker border-t border-[var(--color-border)] pt-6">
                  <p className="text-[13.5px] text-[var(--color-text-muted)] leading-relaxed">
                    Free estimate before we start — you know the price before we touch your vehicle.
                  </p>
                  <Link
                    href="/contact/"
                    className="group mt-5 inline-flex items-center gap-2 text-[13px] font-700 text-[var(--color-brand-primary)] hover:gap-3 transition-all duration-200"
                  >
                    Get estimate
                    <ArrowRight size={13} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ═══════════════════════════════
            HOW IT WORKS
        ════════════════════════════════ */}
        {hasProcess && (
          <div className="hw-root">
            <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">

              {/* header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                <div>
                  <div className="hw-label flex items-center gap-3 mb-5">
                    <span className="w-6 h-px bg-[var(--color-brand-primary)]" />
                    <span className="text-[10px] font-700 tracking-[.32em] uppercase text-[var(--color-brand-primary)]">
                      How It Works
                    </span>
                  </div>
                  <h2
                    className="hw-heading font-display text-[var(--color-text-primary)] leading-none tracking-tight"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                  >
                    What happens when<br />you book with us
                  </h2>
                </div>
                <p
                  className="hw-heading text-[13.5px] text-[var(--color-text-muted)] max-w-[220px] leading-relaxed sm:text-right"
                  style={{ transitionDelay: ".1s" }}
                >
                  Fast, honest, and clear at every step.
                </p>
              </div>

              {/* 2-col card grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                {steps.map((step, i) => {
                  const icons = [
                    /* phone */ <svg key="ph" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.36a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                    /* clipboard */ <svg key="cb" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1" ry="1"/><path d="M9 12h6M9 16h4"/></svg>,
                    /* check */ <svg key="ck" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
                    /* car */ <svg key="car" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17H5v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7l2.5-6.5A2 2 0 0 1 6.4 4h11.2a2 2 0 0 1 1.9 1.5L22 12v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>,
                    /* star */ <svg key="st" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
                  ];
                  const pills = [
                    "Free, no obligation",
                    "Estimate in minutes",
                    "Same-day available",
                    "OEM-grade glass used",
                    "Drive away same day",
                  ];
                  const stepTitle = typeof step === "string" ? step : step.title;
                  const stepDesc  = typeof step === "object" ? step.desc : null;
                  return (
                    <div key={i} className="hw-card">
                      {/* icon + step number on same row */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="hw-icon" style={{ marginBottom: 0 }}>
                          {icons[i] ?? icons[0]}
                        </div>
                        <span
                          className="hw-step-bignum font-display font-800 leading-none tracking-tight"
                          style={{
                            fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                            color: "var(--color-border)",
                            letterSpacing: "-0.04em",
                            transition: "color .25s",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {/* step label + rule */}
                      <span className="hw-step-label">Step {String(i + 1).padStart(2, "0")}</span>
                      <div className="hw-card-rule" />
                      {/* title */}
                      <p className="hw-step-title">{stepTitle}</p>
                      {/* description if available */}
                      {stepDesc && <p className="hw-step-body">{stepDesc}</p>}
                      {/* pill */}
                      <div className="hw-pill">
                        <span className="hw-pill-dot" />
                        {pills[i] ?? "Fast service"}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA bar */}
              <div className="hw-cta mt-10 pt-8 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-5">
                <div>
                  <p className="font-display font-700 text-[var(--color-text-primary)] text-[1.05rem] leading-tight">
                    Ready to book?
                  </p>
                  <p className="text-[12.5px] text-[var(--color-text-muted)] mt-0.5">
                    Free estimate · No obligation · Same-day available
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+14033544422"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-btn)] border border-[var(--color-border)] text-[13px] font-600 text-[var(--color-text-secondary)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-accent-muted)] transition-all duration-200"
                  >
                    <Phone size={13} strokeWidth={2.5} />
                    403 354 4422
                  </a>
                  <Link
                    href="/contact/"
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-btn)] bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[13px] font-700 shadow-[var(--shadow-glow)] hover:scale-105 transition-all duration-200"
                  >
                    Free Estimate
                    <ArrowRight size={13} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </>
  );
}
