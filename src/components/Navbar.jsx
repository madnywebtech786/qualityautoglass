"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Shield } from "lucide-react";
import { services } from "@/data/services";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us/" },

  {
    label: "Services",
    href: "#services",
    hasDropdown: true,
  },
  { label: "Deals", href: "/online-deals/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact Us", href: "/contact/" },
];

const MOBILE_FLAT_LINKS = [
  { label: "About", href: "/about-us/" },
  { label: "Deals", href: "/online-deals/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact Us", href: "/contact/" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  function closeDrawer() {
    setDrawerClosing(true);
    setTimeout(() => {
      setDrawerOpen(false);
      setDrawerClosing(false);
      setMobileServicesOpen(false);
    }, 320);
  }

  function openDrawer() {
    setDrawerOpen(true);
    setDrawerClosing(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-surface-glass)] backdrop-blur-xl border-b border-[var(--color-border)] shadow-[var(--shadow-card)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--color-brand-primary)] shadow-[var(--shadow-glow)] transition-transform duration-300 group-hover:scale-105">
              <Shield size={18} className="text-white" strokeWidth={2.5} />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-800 text-[15px] text-[var(--color-text-primary)] tracking-tight">
                Quality Auto Glass
              </span>
              <span className="text-[10px] font-500 text-[var(--color-brand-primary)] tracking-widest uppercase">
                Ltd — Calgary
              </span>
            </div>
          </Link>

          {/* Desktop Nav — 6 links */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="relative nav-dropdown-trigger">
                  <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-[14.5px] font-500 text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-accent-muted)] transition-all duration-200">
                    {link.label}
                    <ChevronDown
                      size={13}
                      strokeWidth={2.5}
                      className="opacity-60"
                    />
                  </button>
                  <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl p-1.5 shadow-[var(--shadow-deep)] border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <div className="flex flex-col gap-0.5">
                      {services.map((s) => (
                        <Link
                          key={s.id}
                          href={s.slug}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-500 text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-accent-muted)] transition-all duration-150 group/item"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] opacity-40 shrink-0 group-hover/item:opacity-100 transition-opacity duration-150" />
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-[14.5px] font-500 text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-accent-muted)] transition-all duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="tel:+14033544422"
              className="flex items-center gap-2 text-[13.5px] font-600 text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors duration-200"
            >
              <Phone size={14} strokeWidth={2.5} />
              403 354 4422
            </a>
            <Link
              href="/contact/"
              className="px-5 py-2.5 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[13.5px] font-600 rounded-[var(--radius-btn)] shadow-[var(--shadow-glow)] transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Free Estimate
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={openDrawer}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[var(--color-surface-alt)] transition-colors duration-200"
            aria-label="Open menu"
          >
            <Menu
              size={22}
              strokeWidth={2}
              className="text-[var(--color-text-primary)]"
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 animate-fade-in"
          onClick={closeDrawer}
        >
          <div className="absolute inset-0 bg-[var(--color-text-primary)] opacity-40" />
        </div>
      )}

      {/* Mobile Drawer Panel */}
      {drawerOpen && (
        <aside
          ref={drawerRef}
          className={`fixed top-0 right-0 bottom-0 z-50 w-[82vw] max-w-[360px] bg-[var(--color-surface)] shadow-[var(--shadow-deep)] flex flex-col overflow-y-auto ${
            drawerClosing ? "drawer-exit" : "drawer-enter"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--color-brand-primary)]">
                <Shield size={16} className="text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display font-800 text-[14px] text-[var(--color-text-primary)]">
                Quality Auto Glass Ltd
              </span>
            </div>
            <button
              onClick={closeDrawer}
              className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-[var(--color-surface-alt)] transition-colors duration-200"
              aria-label="Close menu"
            >
              <X
                size={20}
                strokeWidth={2}
                className="text-[var(--color-text-secondary)]"
              />
            </button>
          </div>

          {/* Drawer Nav */}
          <nav className="flex-1 px-4 py-5 flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeDrawer}
              className="px-4 py-3 rounded-xl text-[15px] font-600 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] transition-colors duration-200"
            >
              Home
            </Link>

            {/* Services Accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-600 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] transition-colors duration-200"
              >
                Services
                <ChevronDown
                  size={16}
                  strokeWidth={2.5}
                  className={`text-[var(--color-text-muted)] transition-transform duration-300 ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileServicesOpen
                    ? "max-h-[600px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-4 pt-1 pb-2 flex flex-col gap-0.5">
                  {services.map((s) => (
                    <Link
                      key={s.id}
                      href={s.slug}
                      onClick={closeDrawer}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-500 text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-accent-muted)] transition-all duration-150"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] opacity-60 shrink-0" />
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {MOBILE_FLAT_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeDrawer}
                className="px-4 py-3 rounded-xl text-[15px] font-600 text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Drawer Footer */}
          <div className="px-4 pb-6 pt-3 border-t border-[var(--color-border)] flex flex-col gap-3">
            <a
              href="tel:+14033544422"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[var(--color-border)] text-[15px] font-600 text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-accent-muted)] transition-all duration-200"
            >
              <Phone size={16} strokeWidth={2.5} />
              403 354 4422
            </a>
            <Link
              href="/contact/"
              onClick={closeDrawer}
              className="flex items-center justify-center w-full py-3.5 bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary-dark)] text-white text-[15px] font-700 rounded-xl shadow-[var(--shadow-glow)] transition-all duration-200"
            >
              Get Free Estimate
            </Link>
          </div>
        </aside>
      )}
    </>
  );
}
