import Link from "next/link";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import ContactForm from "./ContactForm";

const CONTACT_METHODS = [
  { icon: Phone,  label: "Call Us",       value: "403 354 4422",               sub: "Available Mon – Sat",                             href: "tel:+14033544422" },
  { icon: Mail,   label: "Email",         value: "info@qualityautoglass.ca",   sub: "We reply within a few hours",                     href: "mailto:info@qualityautoglass.ca" },
  { icon: MapPin, label: "Service Area",  value: "Calgary & Surrounding Areas", sub: "Airdrie · Cochrane · Okotoks · Chestermere",     href: null },
  { icon: Clock,  label: "Hours",         value: "Mon – Sat: 8am – 6pm",       sub: "Same-day service available",                      href: null },
];

export default function ContactPageClient() {
  return (
    <>
      <style>{`
        @keyframes ct-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: none; }
        }
        @supports (animation-timeline: view()) {
          .ct-reveal {
            animation: ct-up 0.55s cubic-bezier(0.22,1,0.36,1) both;
            animation-timeline: view();
            animation-range: entry 0% entry 30%;
          }
        }

        .ct-method {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 14px;
          border: 1px solid var(--color-border);
          background: white;
          text-decoration: none;
          box-shadow: 0 2px 12px rgba(10,20,80,0.06), 0 1px 3px rgba(10,20,80,0.04);
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .ct-method:hover {
          border-color: rgba(10,106,245,0.3);
          box-shadow: 0 8px 28px rgba(10,106,245,0.1), 0 2px 6px rgba(10,20,80,0.06);
          transform: translateY(-2px);
        }
        .ct-method-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--color-brand-accent-muted);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      {/* ── Hero — light, consistent with rest of site ── */}
      <div
        className="relative overflow-hidden bg-[var(--color-surface)] border-b border-[var(--color-border)]"
        style={{ paddingTop: "80px" }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full opacity-[0.4]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ctdg" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="var(--color-border)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ctdg)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">
          <div className="ct-reveal flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-[var(--color-brand-primary)]" />
            <span className="text-[10.5px] font-700 tracking-[0.3em] uppercase text-[var(--color-brand-primary)]">
              Contact Us
            </span>
          </div>
          <div className="max-w-2xl">
            <h1
              className="ct-reveal font-display text-[var(--color-text-primary)] leading-none tracking-tight mb-5"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
            >
              Let&apos;s get your<br />
              <span className="text-gradient">glass sorted</span>
            </h1>
            <p className="ct-reveal text-[16px] leading-[1.8] text-[var(--color-text-secondary)]">
              Reach out by phone, email, or fill in the form below — we typically respond within a few hours.
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="bg-[var(--color-surface)] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_620px] gap-10 lg:gap-16 items-start">

            {/* Left — contact info */}
            <div>
              <h2
                className="ct-reveal font-display text-[var(--color-text-primary)] leading-tight tracking-tight mb-2"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
              >
                Get in touch
              </h2>
              <p className="ct-reveal text-[14.5px] text-[var(--color-text-muted)] leading-relaxed mb-8">
                Calgary&apos;s family-owned auto glass specialists since 2018.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {CONTACT_METHODS.map((m) => {
                  const Icon = m.icon;
                  const inner = (
                    <>
                      <span className="ct-method-icon">
                        <Icon size={16} strokeWidth={2} className="text-[var(--color-brand-primary)]" />
                      </span>
                      <div>
                        <p className="text-[10.5px] font-700 tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-0.5">{m.label}</p>
                        <p className="text-[14px] font-600 text-[var(--color-text-primary)] leading-tight">{m.value}</p>
                        <p className="text-[12px] text-[var(--color-text-muted)] mt-0.5">{m.sub}</p>
                      </div>
                    </>
                  );
                  return m.href ? (
                    <a key={m.label} href={m.href} className="ct-method ct-reveal">{inner}</a>
                  ) : (
                    <div key={m.label} className="ct-method ct-reveal">{inner}</div>
                  );
                })}
              </div>

              {/* Trust pills */}
              <div className="ct-reveal flex flex-wrap gap-2.5">
                {["Free Estimate", "Same-Day Service", "No Hidden Fees", "OEM-Grade Glass"].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[12px] font-600 text-[var(--color-text-secondary)]"
                  >
                    <CheckCircle2 size={12} strokeWidth={2.5} className="text-[var(--color-brand-primary)]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — shared form */}
            <div className="ct-reveal">
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
