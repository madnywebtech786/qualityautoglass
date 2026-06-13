const MILESTONES = [
  {
    year: "2018",
    label: "Founded",
    headline: "Quality Auto Glass Ltd Opens",
    body: "Started with a single mission: provide Calgary drivers with honest, quality auto glass service. First location opens in northeast Calgary.",
    accent: "var(--color-brand-primary)",
  },
  {
    year: "2019",
    label: "Growth",
    headline: "Word Spreads Across Calgary",
    body: "Rapid growth driven entirely by referrals and repeat customers. Expanded service capacity to meet same-day demand across the city.",
    accent: "var(--color-brand-accent)",
  },
  {
    year: "2021",
    label: "Recognition",
    headline: "$29.95 Rock Chip Special Launched",
    body: "Introduced our signature rock chip special — fast, affordable, and accessible. Became one of Calgary's most recognized auto glass promotions.",
    accent: "#6c3ce0",
  },
  {
    year: "2023",
    label: "Expansion",
    headline: "Serving All of Greater Calgary",
    body: "Expanded coverage to Airdrie, Chestermere, Cochrane, Okotoks, Strathmore, and High River. Over 5,000 vehicles completed.",
    accent: "var(--color-promo)",
  },
  {
    year: "Today",
    label: "Now",
    headline: "Calgary's Trusted Glass Specialists",
    body: "5-star rated and community-trusted. We continue to serve Calgary with the same standards that built our reputation — honest work, quality materials, no pressure.",
    accent: "var(--color-success)",
  },
];

export default function AboutTimeline() {
  return (
    <section
      className="relative py-20 lg:py-32 bg-[var(--color-text-primary)] overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tgrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0 L0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tgrid)" />
        </svg>
        <div className="absolute top-0 right-0 w-[40vw] h-[50vh] bg-[var(--color-brand-primary)]/8 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[40vh] bg-[var(--color-brand-accent)]/6 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div className="reveal flex items-end justify-between gap-5 mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="inline-block mb-3 text-[11px] font-700 text-[var(--color-brand-accent)] tracking-[0.22em] uppercase">
              Our Journey
            </span>
            <h2
              className="font-display text-white tracking-tight leading-[1.04]"
              style={{ fontSize: "clamp(2rem,4vw,2.9rem)" }}
            >
              Six Years of Earned Trust
            </h2>
          </div>
          <span className="text-[11px] font-600 text-white/20 tracking-widest uppercase hidden sm:block pb-1">
            2018 — 2024
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line — CSS scroll-driven grow */}
          <div className="absolute left-[88px] lg:left-[160px] top-0 bottom-0 w-px bg-white/10">
            <div
              className="w-full bg-gradient-to-b from-[var(--color-brand-primary)] via-[var(--color-brand-accent)] to-[var(--color-success)] tl-line"
            />
            <style>{`
              .tl-line { height: 0%; }
              @supports (animation-timeline: view()) {
                @keyframes tl-grow { from { height: 0%; } to { height: 100%; } }
                .tl-line {
                  animation: tl-grow 1s cubic-bezier(0.22,1,0.36,1) both;
                  animation-timeline: view();
                  animation-range: entry 5% cover 80%;
                }
              }
            `}</style>
          </div>

          {/* Milestones */}
          <div className="flex flex-col gap-0">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className="reveal relative grid grid-cols-[88px_1fr] lg:grid-cols-[160px_1fr] gap-0 group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Left — year label */}
                <div className="flex flex-col items-end pr-6 lg:pr-10 pt-1 pb-12">
                  <span
                    className="font-display font-800 text-right leading-none transition-colors duration-300"
                    style={{
                      fontSize: "clamp(1rem,1.8vw,1.3rem)",
                      color: "rgba(255,255,255,0.2)",
                    }}
                  >
                    {m.year}
                  </span>
                  <span className="text-[10px] font-600 text-white/20 tracking-widest uppercase mt-1 text-right">
                    {m.label}
                  </span>
                </div>

                {/* Timeline node */}
                <div className="absolute left-[80px] lg:left-[152px] top-1.5 w-4 h-4 -translate-x-1/2 flex items-center justify-center">
                  <div
                    className="w-3 h-3 rounded-full border-2 transition-all duration-300 group-hover:scale-125"
                    style={{
                      borderColor: m.accent,
                      background: i === MILESTONES.length - 1 ? m.accent : "var(--color-text-primary)",
                      boxShadow: `0 0 ${i === MILESTONES.length - 1 ? "16px" : "0"} ${m.accent}`,
                    }}
                  />
                </div>

                {/* Right — content */}
                <div className="pl-8 lg:pl-12 pb-12 border-b border-white/[0.05] last:border-0">
                  {/* Accent pill */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                    style={{ background: `${m.accent}18`, border: `1px solid ${m.accent}30` }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: m.accent }}
                    />
                    <span
                      className="text-[10px] font-700 tracking-widest uppercase"
                      style={{ color: m.accent }}
                    >
                      {m.label}
                    </span>
                  </div>

                  <h3
                    className="font-display font-800 text-white leading-[1.15] tracking-tight mb-3 transition-colors duration-300 group-hover:text-[var(--color-brand-accent)]"
                    style={{ fontSize: "clamp(1.2rem,2vw,1.5rem)" }}
                  >
                    {m.headline}
                  </h3>
                  <p className="text-[14.5px] leading-[1.75] text-white/50 max-w-lg">
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
