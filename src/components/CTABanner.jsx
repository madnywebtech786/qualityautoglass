import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="relative py-20 lg:py-24 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-primary-dark) 0%, var(--color-brand-primary) 50%, #0060e6 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Geometric overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full border border-white/10" />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border border-white/8 animate-spin-slow" />
      </div>

      {/* Beam */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{ animation: "beamSweep 5s ease-in-out infinite 2s" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <div className="reveal flex flex-col items-center gap-6">
          <h2 className="font-display font-800 text-[clamp(2rem,4.5vw,3rem)] text-white tracking-tight leading-tight">
            Need Auto Glass Help Today?
          </h2>
          <p className="text-[17px] text-white/80 max-w-xl leading-relaxed">
            If your windshield is damaged, do not wait for the problem to get
            worse. Contact Quality Auto Glass Ltd for a free estimate and fast
            service you can trust.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact/"
              className="group flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--color-brand-primary)] text-[15px] font-700 rounded-[var(--radius-btn)] shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get a Free Estimate
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <a
              href="tel:+14033544422"
              className="flex items-center gap-2.5 px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white text-[15px] font-700 rounded-[var(--radius-btn)] hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <Phone size={16} strokeWidth={2.5} />
              Call 403 354 4422
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
