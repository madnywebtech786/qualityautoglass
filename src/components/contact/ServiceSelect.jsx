"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const OPTIONS = [
  { value: "", label: "Select a service…" },
  { value: "windshield-replacement", label: "Windshield Replacement" },
  { value: "rock-chip-repair", label: "Rock Chip Repair" },
  { value: "glass-tinting", label: "Glass Tinting" },
  { value: "adas-calibration", label: "ADAS Calibration" },
  { value: "unsure", label: "Not sure — need assessment" },
];

export default function ServiceSelect({ value, onChange, name = "service", disabled = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = OPTIONS.find((o) => o.value === value) || OPTIONS[0];

  useEffect(() => {
    function onOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  function pick(opt) {
    if (disabled) return;
    onChange({ target: { name, value: opt.value } });
    setOpen(false);
  }

  return (
    <>
      <style>{`
        .ss-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1.5px solid var(--color-border);
          background: var(--color-surface);
          font-family: var(--font-body);
          font-size: 14.5px;
          cursor: pointer;
          text-align: left;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          position: relative;
          user-select: none;
        }
        .ss-trigger:focus, .ss-trigger[data-open="true"] {
          border-color: var(--color-brand-primary);
          box-shadow: 0 0 0 3px rgba(10,106,245,0.1);
        }
        .ss-trigger-text {
          color: var(--color-text-muted);
          transition: color 0.15s;
          flex: 1;
          line-height: 1.3;
        }
        .ss-trigger-text.has-value { color: var(--color-text-primary); }

        .ss-chevron {
          color: var(--color-text-muted);
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
        }
        .ss-trigger[data-open="true"] .ss-chevron { transform: rotate(180deg); }

        .ss-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0; right: 0;
          background: var(--color-surface);
          border: 1.5px solid var(--color-border);
          border-radius: 14px;
          box-shadow: var(--shadow-deep);
          overflow: hidden;
          z-index: 50;
          opacity: 0;
          transform: translateY(-6px) scale(0.98);
          transform-origin: top center;
          pointer-events: none;
          transition: opacity 0.2s cubic-bezier(0.22,1,0.36,1), transform 0.2s cubic-bezier(0.22,1,0.36,1);
        }
        .ss-dropdown.open {
          opacity: 1;
          transform: none;
          pointer-events: auto;
        }

        .ss-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 16px;
          font-size: 14px;
          font-family: var(--font-body);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          border-bottom: 1px solid var(--color-border);
        }
        .ss-option:last-child { border-bottom: none; }
        .ss-option:first-child { display: none; }
        .ss-option:hover { background: var(--color-brand-accent-muted); color: var(--color-brand-primary); }
        .ss-option.selected { color: var(--color-brand-primary); font-weight: 600; }
        .ss-option.selected:hover { background: var(--color-brand-accent-muted); }
        .ss-check { color: var(--color-brand-primary); flex-shrink: 0; }
      `}</style>

      <div ref={ref} style={{ position: "relative" }}>
        <button
          type="button"
          className="ss-trigger"
          data-open={open}
          onClick={() => !disabled && setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
          style={disabled ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
        >
          <span className={`ss-trigger-text${value ? " has-value" : ""}`}>
            {selected.label}
          </span>
          <ChevronDown size={15} strokeWidth={2.5} className="ss-chevron" />
        </button>

        <div className={`ss-dropdown${open ? " open" : ""}`} role="listbox">
          {OPTIONS.map((opt) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`ss-option${value === opt.value ? " selected" : ""}`}
              onClick={() => pick(opt)}
            >
              {opt.label}
              {value === opt.value && <Check size={14} strokeWidth={2.5} className="ss-check" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
