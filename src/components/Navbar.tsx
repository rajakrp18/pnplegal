"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenConsultation?: (practice?: string) => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pnplegal-theme") as "dark" | "light" | null;
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      setTheme(saved);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("pnplegal-theme", nextTheme);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Practice Areas", href: "/practice-areas" },
    { label: "Our Services", href: "/services" },
    { label: "The Counsel", href: "/#counsel" },
    { label: "Legal Insights", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="nav-wrapper">
        <nav className="navbar" aria-label="Main Navigation">
          <Link href="/" className="nav-brand">
            <Image
              src="/pnplegallogo.png"
              alt="P&P Legal Consultants Logo"
              width={60}
              height={60}
              style={{ objectFit: "contain", height: "46px", width: "auto" }}
              priority
            />
            <div className="nav-brand-text">
              <span className="nav-brand-title">
                P&P <span>LEGAL</span>
              </span>
              <span className="nav-brand-sub">CONSULTANTS</span>
            </div>
          </Link>

          {/* Desktop Tabbed Navbar Links */}
          <div className="nav-links nav-tabs-container">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "active-tab" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="nav-actions">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} theme`}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} theme`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Book Consultation Button */}
            {onOpenConsultation ? (
              <button
                onClick={() => onOpenConsultation()}
                className="btn-nav"
                type="button"
              >
                Book Consultation &rarr;
              </button>
            ) : (
              <Link href="/contact" className="btn-nav">
                Book Consultation &rarr;
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="nav-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              &#9776;
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <button
          className="mobile-close-btn"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation"
        >
          &times;
        </button>

        <div className="mobile-drawer-brand">
          <Image
            src="/pnplegallogo.png"
            alt="P&P Legal Consultants"
            width={48}
            height={48}
            style={{ objectFit: "contain", height: "40px", width: "auto" }}
          />
          <div style={{ marginLeft: "10px" }}>
            <span style={{ fontWeight: 700, letterSpacing: "1px", color: "var(--champagne)" }}>
              P&P LEGAL
            </span>
            <div style={{ fontSize: "0.6rem", letterSpacing: "2px", color: "var(--text-muted)" }}>
              CONSULTANTS
            </div>
          </div>
        </div>

        <div className="mobile-links-list">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link mobile-nav-link ${isActive ? "active-tab" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: "2rem" }}>
          {onOpenConsultation ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="btn-gold"
              style={{ width: "100%", justifyContent: "center" }}
              type="button"
            >
              Book Consultation &rarr;
            </button>
          ) : (
            <Link
              href="/contact"
              className="btn-gold"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Consultation &rarr;
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
