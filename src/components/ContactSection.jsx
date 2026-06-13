import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

const CONTACT_ITEMS = [
  { icon: Phone,  label: "Phone",    value: "403 354 4422",              sub: "Available Mon – Sat",                href: "tel:+14033544422" },
  { icon: Mail,   label: "Email",    value: "info@qualityautoglass.ca",  sub: "We reply within a few hours",        href: "mailto:info@qualityautoglass.ca" },
  { icon: MapPin, label: "Location", value: "Calgary & surrounding areas", sub: "Airdrie · Cochrane · Okotoks",    href: null },
  { icon: Clock,  label: "Hours",    value: "Mon – Sat: 8am – 6pm",      sub: "Same-day service available",        href: null },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-[var(--color-surface)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 lg:mb-16">
          <div>
            <span className="inline-block mb-3 text-[11px] font-700 text-[var(--color-brand-primary)] tracking-[0.2em] uppercase">
              Get In Touch
            </span>
            <h2 className="font-display text-[clamp(2.1rem,4.2vw,3rem)] text-[var(--color-text-primary)] tracking-tight leading-[1.06]">
              Let&apos;s Fix Your Glass<br />
              <span className="text-gradient">Today</span>
            </h2>
          </div>
          <p className="text-[15px] text-[var(--color-text-secondary)] leading-[1.7] max-w-sm sm:text-right pb-1">
            Free estimates, no pressure. Reach out any way that&apos;s convenient for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left — contact info */}
          <div className="reveal lg:col-span-2 flex flex-col gap-3">
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon;
              const inner = (
                <div className="group flex items-center gap-4 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] transition-all duration-300" style={{ boxShadow: "0 2px 12px rgba(10,20,80,0.06), 0 1px 3px rgba(10,20,80,0.04)" }}>
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0 bg-[var(--color-brand-accent-muted)] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={18} strokeWidth={2} className="text-[var(--color-brand-primary)]" />
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10.5px] font-600 text-[var(--color-text-muted)] uppercase tracking-widest">{item.label}</span>
                    <span className="text-[14.5px] font-600 text-[var(--color-text-primary)] truncate mt-0.5">{item.value}</span>
                    <span className="text-[12px] text-[var(--color-text-muted)] mt-0.5">{item.sub}</span>
                  </div>
                  {item.href && (
                    <ArrowRight size={14} className="ml-auto shrink-0 text-[var(--color-text-muted)] transition-all duration-200 group-hover:text-[var(--color-brand-primary)] group-hover:translate-x-1" />
                  )}
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href}>{inner}</a>
              ) : (
                <div key={item.label}>{inner}</div>
              );
            })}

            <div className="mt-1 p-5 rounded-2xl bg-[var(--color-brand-primary)] text-white">
              <p className="text-[13.5px] font-600 leading-[1.65] opacity-90">
                Most jobs are completed same-day. Call or send a message and we&apos;ll get back to you fast.
              </p>
            </div>
          </div>

          {/* Right — shared form */}
          <div className="reveal lg:col-span-3">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
