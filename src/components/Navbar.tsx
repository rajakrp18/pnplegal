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

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("pnplegal-theme") as "dark" | "light" | null;
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      setTheme(saved);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  // Sync active section on homepage with IntersectionObserver and hash
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    if (typeof window !== "undefined" && window.location.hash === "#counsel") {
      setActiveSection("counsel");
    }

    const counselEl = document.getElementById("counsel");
    if (!counselEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("counsel");
          } else {
            const rect = counselEl.getBoundingClientRect();
            // If scrolled above or well below
            if (rect.top > window.innerHeight * 0.4 || rect.bottom < 0) {
              setActiveSection("");
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-15% 0px -35% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(counselEl);

    const handleHashChange = () => {
      if (window.location.hash === "#counsel") {
        setActiveSection("counsel");
      } else {
        setActiveSection("");
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

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

  const isLinkActive = (href: string) => {
    if (pathname === "/") {
      if (href === "/#counsel") {
        return activeSection === "counsel";
      }
      if (href === "/") {
        return activeSection !== "counsel";
      }
      return false;
    }
    if (href === "/" || href.startsWith("/#")) {
      return false;
    }
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <>
      <header className="nav-wrapper">
        <nav className="navbar" aria-label="Main Navigation">
          <Link href="/" className="nav-brand" onClick={() => setActiveSection("")}>
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
              const active = isLinkActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${active ? "active-tab" : ""}`}
                  onClick={() => {
                    if (link.href === "/#counsel") {
                      setActiveSection("counsel");
                    } else if (link.href === "/") {
                      setActiveSection("");
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="nav-actions">
            {/* Premium Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} theme`}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} theme`}
            >
              <span className="theme-toggle-inner">
                {theme === "dark" ? (
                  /* Elegant Golden Sun vector */
                  <svg
                    className="theme-svg theme-svg-sun"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="4.25" />
                    <path d="M12 2.5v2.2" />
                    <path d="M12 19.3v2.2" />
                    <path d="M4.93 4.93l1.55 1.55" />
                    <path d="M17.52 17.52l1.55 1.55" />
                    <path d="M2.5 12h2.2" />
                    <path d="M19.3 12h2.2" />
                    <path d="M4.93 19.07l1.55-1.55" />
                    <path d="M17.52 6.48l1.55-1.55" />
                  </svg>
                ) : (
                  /* Royal Slender Crescent Moon & Star vector */
                  <svg
                    className="theme-svg theme-svg-moon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20.5 13.05A9 9 0 1 1 10.95 3.5 7.2 7.2 0 0 0 20.5 13.05z" />
                    <path d="M18.5 4.5v3" strokeWidth="1.4" />
                    <path d="M17 6h3" strokeWidth="1.4" />
                  </svg>
                )}
              </span>
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
            const active = isLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link mobile-nav-link ${active ? "active-tab" : ""}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.href === "/#counsel") {
                    setActiveSection("counsel");
                  } else if (link.href === "/") {
                    setActiveSection("");
                  }
                }}
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
