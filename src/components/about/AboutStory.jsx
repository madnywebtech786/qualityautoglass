import Image from "next/image";

const FACTS = [
  { num: "5,000+", label: "Vehicles completed across Greater Calgary" },
  { num: "100%",   label: "Word-of-mouth growth — no paid ads" },
  { num: "OEM",    label: "Grade glass and adhesives, every single job" },
  { num: "1-Day",  label: "Most repairs done same day you call" },
];

export default function AboutStory() {
  return (
    <section className="relative overflow-hidden">

      {/* ══════════════════════════════════════════
          SPLIT LAYOUT — dark left / light right
      ══════════════════════════════════════════ */}
      <div className="grid lg:grid-cols-2 min-h-[600px]">

        {/* ── LEFT HALF — origin / then ── */}
        <div
          className="relative flex flex-col justify-between px-8 py-16 sm:px-12 lg:px-16 xl:px-20 overflow-hidden"
          style={{ background: "var(--color-text-primary)" }}
        >
          {/* Watermark year */}
          <span
            className="absolute right-[-0.05em] bottom-[-0.15em] font-display font-800 leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(8rem, 18vw, 16rem)",
              color: "rgba(255,255,255,0.04)",
              letterSpacing: "-0.04em",
            }}
            aria-hidden="true"
          >
            2018
          </span>

          {/* Subtle blue glow blob */}
          <div
            className="absolute top-0 left-0 w-[60%] h-[50%] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 0% 0%, rgba(10,106,245,0.18) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Top label */}
          <div data-sr className="flex items-center gap-3 relative z-10">
            <span className="w-6 h-px bg-[var(--color-brand-accent)]" />
            <span className="text-[10.5px] font-700 tracking-[0.3em] uppercase text-[var(--color-brand-accent)]">
              Where It Started
            </span>
          </div>

          {/* Core quote */}
          <div className="relative z-10 flex flex-col gap-8 py-12 lg:py-0">
            <h2
              data-sr
              className="font-display leading-[1.05] tracking-tight text-white"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)" }}
            >
              Calgary needed a glass shop that didn&apos;t cut corners.
              <br /><br />
              <span style={{ color: "var(--color-brand-accent)", opacity: 0.9 }}>
                So we built one.
              </span>
            </h2>

            <p data-sr className="text-[15px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "380px" }}>
              Founded in 2018 with one commitment — give every driver the same honest
              service we&apos;d want for our own vehicles. No pressure tactics,
              no inflated quotes, no shortcuts.
            </p>
          </div>

          {/* Bottom image strip */}
          <div data-sr className="relative z-10 rounded-xl overflow-hidden" style={{ aspectRatio: "16/7" }}>
            <Image
              src="/images/Where-It-Started-left-img.webp"
              alt="Rock chip repair work"
              fill
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,15,30,0.5) 0%, transparent 60%)" }} />
            <span className="absolute bottom-3 left-4 text-[10px] font-700 tracking-[0.25em] uppercase text-white/50">
              Precision repair work
            </span>
          </div>
        </div>

        {/* ── RIGHT HALF — present / now ── */}
        <div
          className="relative flex flex-col justify-between px-8 py-16 sm:px-12 lg:px-16 xl:px-20 overflow-hidden bg-[var(--color-surface-alt)]"
        >
          {/* Top label */}
          <div data-sr className="flex items-center gap-3">
            <span className="w-6 h-px bg-[var(--color-brand-primary)]" />
            <span className="text-[10.5px] font-700 tracking-[0.3em] uppercase text-[var(--color-brand-primary)]">
              Where We Are Now
            </span>
          </div>

          {/* Main image — tall portrait */}
          <div
            data-sr
            className="relative rounded-2xl overflow-hidden my-10 shadow-[var(--shadow-deep)]"
            style={{ aspectRatio: "3/2" }}
          >
            <Image
              src="/images/Where-It-Started-right-img.webp"
              alt="Professional auto glass installation Calgary"
              fill
              className="object-cover object-center"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,15,30,0.45) 0%, transparent 50%)" }}
            />
            {/* Image badge */}
            <div
              className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-[10.5px] font-700 text-white tracking-widest uppercase"
              style={{ background: "rgba(10,106,245,0.85)", backdropFilter: "blur(8px)" }}
            >
              Calgary, AB
            </div>
          </div>

          {/* Fact rows */}
          <div data-sr className="flex flex-col gap-0 border border-[var(--color-border)] rounded-2xl overflow-hidden bg-white">
            {FACTS.map((f, i) => (
              <div
                key={f.num}
                className="group flex items-center gap-5 px-6 py-4 hover:bg-[var(--color-brand-accent-muted)] transition-colors duration-200"
                style={{ borderBottom: i < FACTS.length - 1 ? "1px solid var(--color-border)" : "none" }}
              >
                <span
                  className="font-display font-800 leading-none shrink-0 text-[var(--color-brand-primary)] group-hover:scale-105 transition-transform duration-200"
                  style={{ fontSize: "1.35rem", minWidth: "3.5rem" }}
                >
                  {f.num}
                </span>
                <span className="w-px h-6 bg-[var(--color-border)] shrink-0" />
                <span className="text-[14px] leading-[1.5] text-[var(--color-text-secondary)]">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════
          BOTTOM STRIP — city coverage
      ══════════════════════════════════════════ */}
      <div className="bg-[var(--color-surface)] border-t border-[var(--color-border)] px-8 sm:px-12 lg:px-16 xl:px-20 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="text-[10.5px] font-700 tracking-[0.25em] uppercase text-[var(--color-brand-primary)] shrink-0">
            Serving
          </span>
          {["Calgary", "Airdrie", "Cochrane", "Okotoks", "Chestermere", "Strathmore", "High River"].map((city, i, arr) => (
            <span key={city} className="flex items-center gap-8">
              <span className="text-[13px] font-500 text-[var(--color-text-secondary)]">{city}</span>
              {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]" />}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
