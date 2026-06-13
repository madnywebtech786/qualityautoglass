import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { serviceAreas } from "@/data/services";

export default function ServiceAreasSection() {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/landing-hero-side.webp"
          alt="Calgary cityscape"
          fill
          sizes="100vw"
          className="object-cover opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#0a0f1e]/95 to-[#0a2050]" />
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-[var(--color-brand-primary)]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[var(--color-brand-accent)]/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-7">
            <div className="reveal">
              <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-accent)] text-[12px] font-700 tracking-widest uppercase border border-[var(--color-brand-primary)]/20">
                Service Areas
              </span>
              <h2 className="font-display font-800 text-[clamp(1.9rem,3.8vw,2.6rem)] text-white tracking-tight leading-tight">
                Serving Calgary &
                <br />
                <span className="text-gradient">Surrounding Areas</span>
              </h2>
              <p className="mt-4 text-[16px] leading-[1.7] text-white/70">
                Quality Auto Glass Ltd proudly serves Calgary and nearby communities with
                fast, dependable auto glass repair and replacement services. Whether you
                are in the city or just outside it, our team is ready to help.
              </p>
            </div>

            {/* Area cards */}
            <div className="reveal-stagger grid grid-cols-2 gap-3">
              {serviceAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[var(--color-brand-primary)]/40 transition-all duration-200"
                >
                  <MapPin
                    size={14}
                    strokeWidth={2.5}
                    className="text-[var(--color-brand-accent)] shrink-0"
                  />
                  <span className="text-[14px] font-600 text-white/85">{area}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/10 bg-white/5">
                <MapPin size={14} strokeWidth={2.5} className="text-white/40 shrink-0" />
                <span className="text-[14px] font-600 text-white/40">+ More areas</span>
              </div>
            </div>

            {/* Why local */}
            <div className="reveal flex flex-col gap-3">
              <p className="text-[14px] font-600 text-white/60 uppercase tracking-widest">
                Why local service matters
              </p>
              {[
                "Easier communication and faster scheduling",
                "We understand Calgary weather and road conditions",
                "Familiar with the needs of local drivers",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} strokeWidth={2.5} className="text-[var(--color-brand-accent)] shrink-0 mt-0.5" />
                  <span className="text-[14px] text-white/75">{item}</span>
                </div>
              ))}
            </div>

          
          </div>

          {/* Right — stylized map visual */}
          <div className="reveal relative flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square">
              {/* Rings */}
              <div className="absolute inset-0 rounded-full border border-[var(--color-brand-primary)]/10" />
              <div className="absolute inset-[10%] rounded-full border border-[var(--color-brand-primary)]/15" />
              <div className="absolute inset-[22%] rounded-full border border-[var(--color-brand-primary)]/20" />
              <div className="absolute inset-[35%] rounded-full border border-[var(--color-brand-primary)]/30 animate-pulse" />

              {/* Center dot */}
              <div className="absolute inset-[42%] rounded-full bg-[var(--color-brand-primary)] shadow-[0_0_40px_8px_rgba(10,106,245,0.5)] flex items-center justify-center">
                <MapPin size={18} className="text-white" strokeWidth={2.5} />
              </div>

              {/* Area dots */}
              {[
                { label: "Airdrie", top: "8%", left: "38%" },
                { label: "Cochrane", top: "28%", left: "8%" },
                { label: "Chestermere", top: "44%", left: "78%" },
                { label: "Okotoks", top: "74%", left: "44%" },
                { label: "High River", top: "84%", left: "25%" },
                { label: "Strathmore", top: "64%", left: "82%" },
              ].map((dot) => (
                <div
                  key={dot.label}
                  className="absolute flex flex-col items-center gap-1"
                  style={{ top: dot.top, left: dot.left, transform: "translate(-50%, -50%)" }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-accent)] shadow-[0_0_10px_rgba(0,212,255,0.7)]" />
                  <span className="text-[10px] font-600 text-white/70 whitespace-nowrap bg-[var(--color-text-primary)]/40 px-1.5 py-0.5 rounded backdrop-blur-sm">
                    {dot.label}
                  </span>
                </div>
              ))}

              {/* Calgary label */}
              <div className="absolute inset-[38%] flex items-end justify-center pb-1">
                <span className="text-[9px] font-700 text-white/50 whitespace-nowrap">Calgary</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
