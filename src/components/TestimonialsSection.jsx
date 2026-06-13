
const TESTIMONIALS = [
  {
    id: 0,
    name: "Sarah M.",
    service: "Rock Chip Repair",
    quote: "Had a rock chip fixed in under 20 minutes. Price was exactly what they quoted. Couldn't be easier.",
    initial: "S",
  },
  {
    id: 1,
    name: "James T.",
    service: "Windshield Replacement",
    quote: "Full windshield replaced on my F-150. Glass looks perfect, no leaks after a week of Calgary rain. Fast and professional.",
    initial: "J",
  },
  {
    id: 2,
    name: "Priya K.",
    service: "Glass Tinting",
    quote: "Best price after calling 4 places. Tinting done same day. Clean finish, no bubbles. Really happy.",
    initial: "P",
  },
  {
    id: 3,
    name: "Mike D.",
    service: "ADAS Calibration",
    quote: "ADAS recalibration handled perfectly. Lane assist, auto brake — all verified before I left. Great service.",
    initial: "M",
  },
  {
    id: 4,
    name: "Lisa R.",
    service: "Rock Chip Repair",
    quote: "Result is nearly invisible. Saved me from a full replacement. Friendly staff, fair price. Will be back.",
    initial: "L",
  },
];

const AVATAR_BG = ["#0a6af5", "#0050cc", "#1a7aff", "#0a6af5", "#0050cc"];

// Duplicate for seamless infinite loop
const TRACK = [...TESTIMONIALS, ...TESTIMONIALS];

function StarRow() {
  return (
    <span style={{ display: "inline-flex", gap: 2, color: "#f59e0b", verticalAlign: "middle" }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

export default function TestimonialsSection() {
  return (
    <>
      <style>{`
        /* ── keyframe ── */
        @keyframes ts-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── section ── */
        .ts-wrap {
          background: var(--color-surface-alt);
          border-top: 1px solid var(--color-border);
          overflow: hidden;
          padding: 56px 0 60px;
          position: relative;
        }

        /* subtle top rule gradient */
        .ts-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg,
            transparent 0%,
            var(--color-brand-primary) 30%,
            var(--color-brand-accent) 60%,
            transparent 100%
          );
          opacity: 0.35;
        }

        /* ── header ── */
        .ts-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          max-width: 1280px;
          margin: 0 auto 36px;
          padding: 0 20px;
          flex-wrap: wrap;
        }
        @media (min-width: 1024px) { .ts-head { padding: 0 32px; } }

        .ts-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .ts-eyebrow-line {
          width: 22px; height: 1px;
          background: var(--color-brand-primary);
          flex-shrink: 0;
        }
        .ts-eyebrow-text {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-brand-primary);
        }
        .ts-title {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 2.8vw, 2rem);
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .ts-title em {
          font-style: normal;
          background: linear-gradient(90deg, var(--color-brand-primary), var(--color-brand-accent));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* right meta */
        .ts-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .ts-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 99px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          box-shadow: 0 2px 10px rgba(10,20,80,0.05);
        }
        .ts-badge-score {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 800;
          color: var(--color-text-primary);
          letter-spacing: -0.03em;
        }
        .ts-badge-sub {
          font-size: 11.5px;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        .ts-since {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--color-text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── marquee track ── */
        .ts-overflow {
          overflow: hidden;
          /* edge fade masks */
          -webkit-mask-image: linear-gradient(90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .ts-track {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: ts-scroll 38s linear infinite;
        }
        .ts-track:hover { animation-play-state: paused; }

        /* ── individual card ── */
        .ts-card {
          width: 300px;
          flex-shrink: 0;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 18px;
          padding: 22px 22px 18px;
          position: relative;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          display: flex;
          flex-direction: column;
          gap: 12px;
          cursor: default;
        }
        .ts-card:hover {
          border-color: rgba(10,106,245,0.25);
          box-shadow: 0 8px 32px rgba(10,106,245,0.09);
          transform: translateY(-3px);
        }

        /* decorative quote glyph */
        .ts-glyph {
          position: absolute;
          top: 14px;
          right: 18px;
          font-family: var(--font-display);
          font-size: 52px;
          font-weight: 800;
          line-height: 1;
          color: var(--color-brand-primary);
          opacity: 0.07;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.05em;
        }

        .ts-card-stars {
          display: flex;
          gap: 2px;
          color: #f59e0b;
        }

        .ts-card-quote {
          font-size: 13.5px;
          line-height: 1.65;
          color: var(--color-text-secondary);
          flex: 1;
        }

        .ts-card-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 12px;
          border-top: 1px solid var(--color-border);
        }

        .ts-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          letter-spacing: -0.01em;
        }

        .ts-card-name {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .ts-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10.5px;
          font-weight: 600;
          color: var(--color-brand-primary);
          background: var(--color-brand-accent-muted);
          padding: 2px 9px 2px 7px;
          border-radius: 99px;
          margin-top: 2px;
          letter-spacing: 0.01em;
        }
        .ts-pill-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--color-brand-primary);
          flex-shrink: 0;
        }

        /* ── reveals ── */
        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                      transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.revealed { opacity: 1; transform: none; }
      `}</style>

      <section className="ts-wrap">

        {/* ── Header ── */}
        <div className="ts-head">
          <div className="reveal">
            <div className="ts-eyebrow">
              <span className="ts-eyebrow-line" />
              <span className="ts-eyebrow-text">Customer Reviews</span>
            </div>
            <h2 className="ts-title">
              Trusted by <em>hundreds</em><br />across Calgary
            </h2>
          </div>

          <div className="ts-meta reveal" style={{ transitionDelay: "80ms" }}>
            <div className="ts-badge">
              <StarRow />
              <span className="ts-badge-score">5.0</span>
              <span className="ts-badge-sub">· 100+ reviews</span>
            </div>
            <span className="ts-since">Since 2018</span>
          </div>
        </div>

        {/* ── Marquee ── */}
        <div className="ts-overflow">
          <div className="ts-track">
            {TRACK.map((t, i) => (
              <article key={i} className="ts-card">
                <span className="ts-glyph" aria-hidden="true">"</span>

                <div className="ts-card-stars">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p className="ts-card-quote">{t.quote}</p>

                <div className="ts-card-footer">
                  <div
                    className="ts-avatar"
                    style={{ background: AVATAR_BG[t.id] }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="ts-card-name">{t.name}</p>
                    <span className="ts-pill">
                      <span className="ts-pill-dot" />
                      {t.service}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}
