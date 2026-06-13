"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import ServiceSelect from "./ServiceSelect";

const EMPTY = { name: "", phone: "", email: "", service: "", message: "" };

// Client-side validation mirrors server rules
function validate(form) {
  if (!form.name.trim() || form.name.trim().length < 2)
    return "Please enter your full name.";
  if (!form.email.trim())
    return "Email address is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    return "Please enter a valid email address.";
  if (form.phone && !/^[\d\s\-\+\(\)\.]+$/.test(form.phone))
    return "Phone number contains invalid characters.";
  if (form.message && form.message.length > 2000)
    return "Message must be under 2000 characters.";
  return null;
}

export default function ContactForm({
  headerLabel = "Free Estimate",
  headerTitle = "Tell us about your vehicle",
}) {
  const [form, setForm]       = useState(EMPTY);
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldError, setFieldError] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    // Clear field error as user types
    if (fieldError) setFieldError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Client validation
    const clientError = validate(form);
    if (clientError) {
      setFieldError(clientError);
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    setFieldError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  function handleReset() {
    setForm(EMPTY);
    setStatus("idle");
    setErrorMsg("");
    setFieldError("");
  }

  const isLoading = status === "loading";

  return (
    <>
      <style>{`
        .cf-input, .cf-textarea {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1.5px solid var(--color-border);
          background: var(--color-surface);
          font-family: var(--font-body);
          font-size: 14.5px;
          color: var(--color-text-primary);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cf-input::placeholder, .cf-textarea::placeholder {
          color: var(--color-text-muted);
        }
        .cf-input:focus, .cf-textarea:focus {
          border-color: var(--color-brand-primary);
          box-shadow: 0 0 0 3px rgba(10,106,245,0.1);
        }
        .cf-input:disabled, .cf-textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .cf-textarea { resize: vertical; min-height: 110px; }
        .cf-label {
          display: block;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 7px;
        }
        .cf-field-error {
          font-size: 12px;
          color: #dc2626;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .cf-error-banner {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 16px;
          border-radius: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          font-size: 13.5px;
          line-height: 1.5;
        }
        @keyframes cf-spin {
          to { transform: rotate(360deg); }
        }
        .cf-spinner {
          animation: cf-spin 0.75s linear infinite;
        }
        .cf-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px;
          border-radius: var(--radius-btn);
          background: var(--color-brand-primary);
          color: #fff;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          box-shadow: var(--shadow-glow);
          transition: background 0.2s, transform 0.2s, opacity 0.2s;
        }
        .cf-btn:hover:not(:disabled) {
          background: var(--color-brand-primary-dark);
          transform: scale(1.02);
        }
        .cf-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>

      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-deep)] overflow-hidden">

        {/* Card header */}
        <div className="px-7 py-5 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <p className="text-[10.5px] font-700 tracking-[0.26em] uppercase text-[var(--color-brand-primary)] mb-0.5">
            {headerLabel}
          </p>
          <p className="font-display font-700 text-[var(--color-text-primary)] text-[1.1rem] leading-tight">
            {headerTitle}
          </p>
        </div>

        {/* ── Success state ── */}
        {status === "success" ? (
          <div className="px-7 py-14 text-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-brand-accent-muted)] mx-auto mb-5">
              <CheckCircle2 size={26} strokeWidth={2} className="text-[var(--color-brand-primary)]" />
            </div>
            <h3 className="font-display font-700 text-[var(--color-text-primary)] text-[1.3rem] mb-2">
              Message sent!
            </h3>
            <p className="text-[14px] text-[var(--color-text-muted)] leading-relaxed mb-6">
              Thanks, {form.name.split(" ")[0]}. We&apos;ll be in touch within a few hours.
            </p>
            <button
              onClick={handleReset}
              className="text-[13.5px] font-600 text-[var(--color-brand-primary)] hover:underline underline-offset-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} noValidate className="px-7 py-6 flex flex-col gap-5">

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="cf-label" htmlFor="cf-name">Your Name</label>
                <input
                  id="cf-name"
                  className="cf-input"
                  type="text"
                  name="name"
                  placeholder="John Smith"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label className="cf-label" htmlFor="cf-phone">Phone Number</label>
                <input
                  id="cf-phone"
                  className="cf-input"
                  type="tel"
                  name="phone"
                  placeholder="403 000 0000"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="tel"
                />
              </div>
            </div>

            <div>
              <label className="cf-label" htmlFor="cf-email">Email Address</label>
              <input
                id="cf-email"
                className="cf-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="cf-label">Service Needed</label>
              <ServiceSelect
                value={form.service}
                onChange={handleChange}
                name="service"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="cf-label" htmlFor="cf-message">Message (optional)</label>
              <textarea
                id="cf-message"
                className="cf-textarea"
                name="message"
                placeholder="Describe the damage, vehicle make/model, or any questions…"
                value={form.message}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Field validation error */}
            {fieldError && (
              <div className="cf-field-error" role="alert">
                <AlertCircle size={13} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
                {fieldError}
              </div>
            )}

            {/* Server error banner */}
            {status === "error" && errorMsg && (
              <div className="cf-error-banner" role="alert">
                <AlertCircle size={16} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="cf-btn"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} strokeWidth={2.5} className="cf-spinner" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message &amp; Get Estimate
                  <ArrowRight size={14} strokeWidth={2.5} style={{ transition: "transform 0.2s" }} />
                </>
              )}
            </button>

            <p className="text-center text-[11.5px] text-[var(--color-text-muted)]">
              No obligation · We respond within a few hours
            </p>
          </form>
        )}
      </div>
    </>
  );
}
