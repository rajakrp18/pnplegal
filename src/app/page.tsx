"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface PracticeArea {
  id: string;
  num: string;
  title: string;
  desc: string;
  img: string;
  badge: string;
}

const practiceAreas: PracticeArea[] = [
  {
    id: "litigation",
    num: "01",
    title: "Litigation",
    desc: "Strategic representation from preparation to final adjudication across District Courts, Delhi High Court, and the Supreme Court of India.",
    img: "/practice-litigation.jpg",
    badge: "Supreme Court & High Courts",
  },
  {
    id: "corporate",
    num: "02",
    title: "Corporate & Commercial",
    desc: "Counsel for complex business transactions, regulatory compliance, commercial disputes, and statutory governance.",
    img: "/practice-corporate.jpg",
    badge: "Advisory & Structuring",
  },
  {
    id: "dispute",
    num: "03",
    title: "Dispute Resolution",
    desc: "Arbitration, commercial mediation, high-stakes negotiation, and pre-litigation risk mitigation.",
    img: "/practice-dispute.jpg",
    badge: "Arbitration & Mediation",
  },
  {
    id: "advisory",
    num: "04",
    title: "Legal Advisory",
    desc: "Practical, research-driven counsel for informed executive decisions, statutory interpretation, and ongoing compliance.",
    img: "/practice-advisory.jpg",
    badge: "Statutory & Governance",
  },
  {
    id: "cyber",
    num: "05",
    title: "Cyber Cases & Digital Forensics",
    desc: "Strategic defense and remedies for financial cyber fraud, IT Act offenses, unauthorized data breaches, digital defamation, and electronic evidence forensics.",
    img: "/practice-cyber.jpg",
    badge: "IT Act & Cyber Crime",
  },
];

export default function HomePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState("Litigation");

  // Sync theme with localStorage and document data-theme
  useEffect(() => {
    const saved = localStorage.getItem("pnplegal-theme") as "dark" | "light" | null;
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      requestAnimationFrame(() => {
        setTheme(saved);
      });
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

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    practiceArea: "Litigation",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openConsultation = (practice?: string) => {
    if (practice) {
      setSelectedPractice(practice);
      setFormData((prev) => ({ ...prev, practiceArea: practice }));
    }
    setModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSubmissionSuccess(data.inquiryId || "PNP-REC-SUCCESS");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        practiceArea: "Litigation",
        message: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── 01. Floating Navigation ── */}
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

          {/* Cleaned navbar links — Removed redundant Home heading */}
          <div className="nav-links">
            <Link href="#about" className="nav-link">About</Link>
            <Link href="#practice" className="nav-link">Practice Areas</Link>
            <Link href="#counsel" className="nav-link">The Counsel</Link>
            <Link href="#principle" className="nav-link">Principle</Link>
            <Link href="#contact" className="nav-link">Contact</Link>
          </div>

          <div className="nav-actions">
            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={toggleTheme}
              className="btn-theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} theme`}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} theme`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => openConsultation()}
              className="btn-nav"
              type="button"
            >
              Book Consultation &rarr;
            </button>

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
        <Link
          href="#about"
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          About
        </Link>
        <Link
          href="#practice"
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Practice Areas
        </Link>
        <Link
          href="#counsel"
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          The Counsel
        </Link>
        <Link
          href="#principle"
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Principle
        </Link>
        <Link
          href="#contact"
          className="nav-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact
        </Link>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "1rem" }}>
          <button
            onClick={toggleTheme}
            className="btn-theme-toggle"
            type="button"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <button
          onClick={() => {
            setMobileMenuOpen(false);
            openConsultation();
          }}
          className="btn-gold"
          style={{ marginTop: "1.5rem" }}
        >
          Book Consultation &rarr;
        </button>
      </div>

      {/* ── 02. HERO SECTION ── */}
      <section className="hero-section" id="hero">
        <div className="hero-backdrop">
          <Image
            src="/supreme-wide.jpg"
            alt="Supreme Court of India Architectural Heritage"
            fill
            sizes="100vw"
            className="hero-bg-img"
            priority
          />
          <div className="hero-overlay" />
        </div>

        <div className="container">
          <div className="hero-grid-layout">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-top">ADVOCATES & LEGAL ADVISORS</span>
                <span className="hero-eyebrow-bottom">SUPREME COURT OF INDIA</span>
              </div>

              <h1 className="hero-title">
                Trusted<br />
                <span className="title-accent">Counsel.</span>
              </h1>

              <p className="hero-desc">
                Legal guidance rooted in law, experience and a deep understanding of India.
                Strategic representation from Delhi trial courts to the Supreme Court.
              </p>

              <div className="hero-buttons">
                <button
                  onClick={() => openConsultation()}
                  className="btn-gold"
                  type="button"
                >
                  Book a Consultation &rarr;
                </button>
                <Link href="#about" className="btn-ghost">
                  About Advocate Jha
                </Link>
              </div>

              {/* 3 Credibility Stats */}
              <div className="hero-stats-row">
                <div className="hero-stat-item">
                  <span className="hero-stat-val">10+ Years</span>
                  <span className="hero-stat-label">Combined Experience</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-val">Supreme Court</span>
                  <span className="hero-stat-label">&amp; Delhi High Court</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-val">Strategic Counsel</span>
                  <span className="hero-stat-label">Civil &amp; Criminal Litigation</span>
                </div>
              </div>
            </div>

            {/* Right Card: Advocate Portrait updated for Prashant Jha */}
            <div className="hero-advocate-card">
              <div className="advocate-card-inner">
                <Image
                  src="/adv.jpg"
                  alt="Advocate Prashant Jha — Supreme Court & High Court Counsel"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="advocate-portrait-img"
                  priority
                />
                <div className="advocate-card-bottom">
                  <div className="advocate-signature-wrap">
                    <span className="advocate-name-tag">Prashant Jha</span>
                    <span className="advocate-title-tag">Advocate, Supreme Court</span>
                  </div>
                  <span className="advocate-sig-script">P. Jha</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. Credibility Ribbon ── */}
      <section className="credibility-ribbon" aria-label="Jurisdictions & Domains">
        <div className="container ribbon-container">
          <div className="ribbon-item">
            <span className="ribbon-icon">&#9878;</span>
            <span>Supreme Court of India</span>
          </div>
          <div className="ribbon-sep" />
          <div className="ribbon-item">
            <span className="ribbon-icon">&#9878;</span>
            <span>High Court of Delhi</span>
          </div>
          <div className="ribbon-sep" />
          <div className="ribbon-item">
            <span className="ribbon-icon">&#9874;</span>
            <span>Corporate &amp; Commercial</span>
          </div>
          <div className="ribbon-sep" />
          <div className="ribbon-item">
            <span className="ribbon-icon">&#9878;</span>
            <span>Civil &amp; Criminal Litigation</span>
          </div>
          <div className="ribbon-sep" />
          <div className="ribbon-item">
            <span className="ribbon-icon">&#128220;</span>
            <span>TeachMeLegal Founder</span>
          </div>
        </div>
      </section>

      {/* ── 04. Dedicated About Section (Advocate Prashant Jha) ── */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-grid-layout">
            {/* Bio Column */}
            <div className="about-bio-panel">
              <span className="subtitle-eyebrow">ABOUT THE COUNSEL</span>
              <h2 className="about-title">Advocate Prashant Jha</h2>
              <span className="about-designation">
                Advocate, Bar Council of Delhi &bull; Founder, TeachMeLegal
              </span>

              <p className="about-paragraph">
                Advocate Prashant Jha is enrolled with the <strong>Bar Council of Delhi</strong>, actively engaged in
                high-stakes civil and criminal litigation across District Courts, the High Court of Delhi, Tribunals, and the Supreme Court of India.
              </p>

              <p className="about-paragraph">
                His professional practice encompasses comprehensive trial preparation, court appearances, and the precision
                drafting of plaints, written statements, legal notices, bail applications, affidavits, Special Leave Petitions (SLPs),
                and procedural case management. With deep experience in case law research, statutory interpretation, and judicial precedents,
                he provides structured, result-oriented representation.
              </p>

              <p className="about-paragraph">
                Alongside his active courtroom litigation practice, Advocate Jha is the founder of <strong>TeachMeLegal</strong>,
                a premier digital legal learning platform where he simplifies complex legal doctrines for law aspirants, advocates, and judiciary candidates.
              </p>

              {/* Focus tags */}
              <div className="about-focus-tags">
                <span className="about-tag">Civil &amp; Criminal Litigation</span>
                <span className="about-tag">Trial &amp; Appellate Advocacy</span>
                <span className="about-tag">Legal Research &amp; Pleadings</span>
                <span className="about-tag">Bar Council of Delhi</span>
                <span className="about-tag">TeachMeLegal (38K+ Community)</span>
              </div>

              <div>
                <button
                  onClick={() => openConsultation()}
                  className="btn-gold"
                  type="button"
                >
                  Consult Advocate Prashant Jha &rarr;
                </button>
              </div>
            </div>

            {/* Feature Cards Column */}
            <div className="about-cards-col">
              <div className="about-feature-card">
                <span className="about-card-badge">PRACTICE JURISDICTION</span>
                <h3 className="about-card-heading">Multi-Court Litigation</h3>
                <p className="about-card-body">
                  Regular representation before District Courts, High Court of Delhi, Supreme Court of India,
                  and specialized tribunals for procedural hearings, trial arguments, bail, and contested litigation.
                </p>
              </div>

              <div className="about-feature-card">
                <span className="about-card-badge">RESEARCH &amp; DRAFTING</span>
                <h3 className="about-card-heading">Analytical Depth &amp; Pleadings</h3>
                <p className="about-card-body">
                  Rigorous statutory interpretation, drafting of plaints, writ petitions, commercial contracts,
                  affidavits, and meticulous preparation of trial evidence with clear articulation.
                </p>
              </div>

              <div className="about-feature-card">
                <span className="about-card-badge">LEGAL EDUCATION LEADERSHIP</span>
                <h3 className="about-card-heading">TeachMeLegal Platform</h3>
                <p className="about-card-body">
                  Built a vibrant community of <strong>38,000+ legal scholars</strong> (35,000+ YouTube subscribers
                  and 10,000+ Telegram members) focusing on core jurisprudence, procedural codes, and judicial services analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05. Practice Areas (Editorial Rows) ── */}
      <section className="practice-section" id="practice">
        <div className="container">
          <div className="practice-header-grid">
            <div>
              <span className="subtitle-eyebrow">AREAS OF PRACTICE</span>
              <h2 className="section-heading">Legal Expertise</h2>
            </div>
            <p className="section-desc">
              Strategic legal solutions across litigation, corporate advisory, and dispute resolution.
              Tailored guidance designed for precision and high-stakes matters.
            </p>
          </div>

          <div className="practice-rows-list">
            {practiceAreas.map((area) => (
              <div
                key={area.id}
                className="practice-row-item"
                onClick={() => openConsultation(area.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openConsultation(area.title);
                }}
              >
                <div className="practice-idx">{area.num}</div>

                <div className="practice-thumb-wrap">
                  <Image
                    src={area.img}
                    alt={area.title}
                    width={180}
                    height={95}
                    className="practice-thumb-img"
                  />
                </div>

                <div className="practice-info">
                  <h3 className="practice-title">{area.title}</h3>
                  <p className="practice-summary">{area.desc}</p>
                </div>

                <div className="practice-arrow-icon" aria-label={`Consult for ${area.title}`}>
                  &rarr;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06. Counsel With Authority ── */}
      <section className="counsel-section" id="counsel">
        <div className="container">
          <div className="counsel-grid">
            {/* Bio Column */}
            <div className="counsel-bio-col">
              <span className="subtitle-eyebrow">THE COUNSEL</span>
              <h2 className="counsel-headline">Counsel With Authority.</h2>
              <span className="counsel-advocate-sub">Advocate Prashant Jha &mdash; Supreme Court of India</span>
              <p className="counsel-desc-p">
                With a practice built on a solid foundation of law, strategy, and real-world experience,
                Advocate Prashant Jha advises and represents clients across complex civil, criminal, and commercial matters
                with discretion, intellectual rigor, and unwavering commitment.
              </p>

              <div>
                <button
                  onClick={() => openConsultation()}
                  className="btn-gold"
                  type="button"
                >
                  Schedule Private Consultation &rarr;
                </button>
              </div>
            </div>

            {/* Photo Column */}
            <div className="counsel-photo-col">
              <div className="counsel-portrait-frame">
                <div className="counsel-photo-wrapper">
                  <Image
                    src="/adv.jpg"
                    alt="Advocate Prashant Jha — Counsel at Supreme Court of India"
                    fill
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="counsel-photo"
                  />
                  <div className="counsel-quote-ribbon">
                    <p className="counsel-quote-text">
                      &ldquo;Committed to the rule of law, structured litigation, and just outcomes.&rdquo;
                    </p>
                    <span className="counsel-sig-author">— Prashant Jha</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07. Constitution / Principle Centerpiece ── */}
      <section className="constitution-section" id="principle">
        <div className="const-backdrop">
          <Image
            src="/const-wide.jpg"
            alt="Constitution of India Gold Embossed Leather"
            fill
            sizes="100vw"
            className="const-bg-img"
          />
          <div className="const-gradient-overlay" />
        </div>

        <div className="container const-container">
          <div className="const-card-editorial">
            <span className="const-eyebrow">LAW. RIGHTS. RESPONSIBILITY.</span>
            <blockquote className="const-quote-text">
              &ldquo;The Constitution is not only a document of law. It is a framework of rights, responsibility and justice.&rdquo;
            </blockquote>

            <div className="const-metrics-row">
              <div className="metric-item">
                <span className="metric-title">10+ Years</span>
                <span className="metric-sub">Combined Experience</span>
              </div>
              <div className="metric-item">
                <span className="metric-title">Supreme Court</span>
                <span className="metric-sub">High Stake Matters</span>
              </div>
              <div className="metric-item">
                <span className="metric-title">Strategic Counsel</span>
                <span className="metric-sub">Result Oriented Approach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08. Supreme Court Closing Statement ── */}
      <section className="closing-banner-section">
        <div className="closing-backdrop">
          <Image
            src="/supreme-wide.jpg"
            alt="Supreme Court of India Grand Portico"
            fill
            sizes="100vw"
            className="closing-bg-img"
          />
          <div className="closing-overlay" />
        </div>

        <div className="container">
          <div className="closing-content">
            <span className="subtitle-eyebrow">SUPREME COURT OF INDIA</span>
            <h2 className="closing-title">
              Advocacy grounded in preparation, principle and precision.
            </h2>
            <button
              onClick={() => openConsultation()}
              className="btn-gold"
              type="button"
            >
              Discuss Your Matter &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ── 09. Contact / Consultation Section ── */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Left Info Panel */}
            <div className="contact-info-panel">
              <span className="subtitle-eyebrow">REACH OUR CHAMBERS</span>
              <h2 className="section-heading">Initiate Strategic Counsel</h2>
              <p className="section-desc" style={{ marginTop: "1rem" }}>
                We operate with utmost confidentiality and discernment. Contact our chambers
                to schedule an initial discussion or submit your legal matter for preliminary review.
              </p>

              <div className="contact-card-box">
                <div className="contact-channel">
                  <span className="channel-icon">&#128205;</span>
                  <div className="channel-details">
                    <h4>Chamber Jurisdiction</h4>
                    <p>Delhi High Court &amp; Supreme Court of India, New Delhi</p>
                  </div>
                </div>

                <div className="contact-channel">
                  <span className="channel-icon">&#9993;</span>
                  <div className="channel-details">
                    <h4>Electronic Mail</h4>
                    <a href="mailto:info@pnplegalconsultants.com">info@pnplegalconsultants.com</a>
                  </div>
                </div>

                <div className="contact-channel">
                  <span className="channel-icon">&#9742;</span>
                  <div className="channel-details">
                    <h4>Chambers Contact</h4>
                    <a href="tel:+919876543210">+91 98765 43210</a> &nbsp;|&nbsp;{" "}
                    <a href="tel:+919472568264">+91 94725 68264</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Box */}
            <div className="form-box-card">
              <h3 className="form-header-title">Request a Consultation</h3>
              <p className="form-header-sub">
                Share your inquiry and Advocate Prashant Jha will review the matter.
              </p>

              {submissionSuccess ? (
                <div className="form-success-box">
                  <h4 style={{ color: "var(--champagne-light)", fontSize: "1.3rem" }}>
                    Inquiry Recorded With Discretion
                  </h4>
                  <p style={{ color: "var(--ivory)", margin: "0.75rem 0" }}>
                    Thank you. Your consultation inquiry has been safely received by our chamber.
                  </p>
                  <div className="success-badge-code">
                    Reference ID: {submissionSuccess}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    A representative will contact you via your provided email or telephone number.
                  </p>
                  <button
                    onClick={() => setSubmissionSuccess(null)}
                    className="btn-ghost"
                    style={{ marginTop: "1.5rem" }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="legal-form">
                  {errorMessage && (
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        background: "rgba(239, 68, 68, 0.15)",
                        border: "1px solid rgba(239, 68, 68, 0.4)",
                        borderRadius: "6px",
                        color: "#FCA5A5",
                        fontSize: "0.85rem",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="form-row-2col">
                    <div className="form-field-wrap">
                      <label className="field-label" htmlFor="fullName">
                        Full Name <span>*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Adv. Arvind Verma / Dr. Sharma"
                        className="form-input"
                      />
                    </div>

                    <div className="form-field-wrap">
                      <label className="field-label" htmlFor="email">
                        Email Address <span>*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@domain.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="form-field-wrap">
                      <label className="field-label" htmlFor="phone">
                        Phone Number (Optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 XXXXX"
                        className="form-input"
                      />
                    </div>

                    <div className="form-field-wrap">
                      <label className="field-label" htmlFor="practiceArea">
                        Practice Area <span>*</span>
                      </label>
                      <select
                        id="practiceArea"
                        name="practiceArea"
                        value={formData.practiceArea}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="Litigation">Litigation (District, High Court &amp; Supreme Court)</option>
                        <option value="Corporate & Commercial">Corporate &amp; Commercial Advisory</option>
                        <option value="Dispute Resolution">Dispute Resolution &amp; Arbitration</option>
                        <option value="Legal Advisory">Legal Advisory &amp; Compliance</option>
                        <option value="Cyber Cases & Digital Forensics">Cyber Cases &amp; Digital Forensics</option>
                        <option value="Supreme Court SLP">Supreme Court SLP / Writ Petition</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field-wrap">
                    <label className="field-label" htmlFor="message">
                      Brief Description of Matter <span>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly summarize the legal issue or advisory required. Please avoid sensitive or confidential credentials."
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-disclaimer">
                    <strong>Confidentiality Notice:</strong> Submission of this inquiry does not
                    establish an advocate-client relationship. In accordance with the Bar Council of
                    India guidelines, information is accepted strictly on a privileged basis.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold"
                    style={{ width: "100%", marginTop: "0.5rem" }}
                  >
                    {isSubmitting ? "Securing Submission..." : "Submit Consultation Request \u2192"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Consultation Modal Popup ── */}
      {modalOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-content-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-icon"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>

            <span className="subtitle-eyebrow">CONFIDENTIAL INQUIRY</span>
            <h3 className="form-header-title">Book a Consultation</h3>
            <p className="form-header-sub">
              Regarding: <strong style={{ color: "var(--champagne)" }}>{selectedPractice}</strong>
            </p>

            {submissionSuccess ? (
              <div className="form-success-box">
                <h4 style={{ color: "var(--champagne-light)", fontSize: "1.3rem" }}>
                  Inquiry Recorded
                </h4>
                <p style={{ color: "var(--ivory)", margin: "0.75rem 0" }}>
                  Your matter has been prioritized under Reference ID:
                </p>
                <div className="success-badge-code">{submissionSuccess}</div>
                <button
                  onClick={() => {
                    setSubmissionSuccess(null);
                    setModalOpen(false);
                  }}
                  className="btn-gold"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="legal-form">
                {errorMessage && (
                  <div
                    style={{
                      padding: "0.75rem",
                      background: "rgba(239, 68, 68, 0.15)",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      borderRadius: "6px",
                      color: "#FCA5A5",
                      fontSize: "0.85rem",
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="form-field-wrap">
                  <label className="field-label" htmlFor="modalFullName">
                    Full Name <span>*</span>
                  </label>
                  <input
                    id="modalFullName"
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your Full Name"
                    className="form-input"
                  />
                </div>

                <div className="form-row-2col">
                  <div className="form-field-wrap">
                    <label className="field-label" htmlFor="modalEmail">
                      Email Address <span>*</span>
                    </label>
                    <input
                      id="modalEmail"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@domain.com"
                      className="form-input"
                    />
                  </div>

                  <div className="form-field-wrap">
                    <label className="field-label" htmlFor="modalPhone">
                      Phone Number
                    </label>
                    <input
                      id="modalPhone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field-wrap">
                  <label className="field-label" htmlFor="modalPractice">
                    Selected Practice Area <span>*</span>
                  </label>
                  <select
                    id="modalPractice"
                    name="practiceArea"
                    value={formData.practiceArea}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="Litigation">Litigation (District, High Court &amp; Supreme Court)</option>
                    <option value="Corporate & Commercial">Corporate &amp; Commercial</option>
                    <option value="Dispute Resolution">Dispute Resolution &amp; Arbitration</option>
                    <option value="Legal Advisory">Legal Advisory &amp; Compliance</option>
                    <option value="Cyber Cases & Digital Forensics">Cyber Cases &amp; Digital Forensics</option>
                    <option value="Supreme Court SLP">Supreme Court SLP / Writ</option>
                  </select>
                </div>

                <div className="form-field-wrap">
                  <label className="field-label" htmlFor="modalMessage">
                    Brief Matter Summary <span>*</span>
                  </label>
                  <textarea
                    id="modalMessage"
                    name="message"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Briefly state your matter..."
                    className="form-textarea"
                  />
                </div>

                <div className="form-disclaimer">
                  All communications remain subject to attorney-client privilege upon formal engagement.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold"
                  style={{ width: "100%", marginTop: "0.5rem" }}
                >
                  {isSubmitting ? "Transmitting..." : "Send Confidential Request \u2192"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── 11. Authority Footer ── */}
      <footer className="footer-wrap">
        <div className="container">
          <div className="footer-top-grid">
            {/* Brand Col */}
            <div className="footer-brand-col">
              <div className="nav-brand">
                <Image
                  src="/pnplegallogo.png"
                  alt="P&P Legal Consultants"
                  width={60}
                  height={60}
                  style={{ objectFit: "contain", height: "48px", width: "auto" }}
                />
                <div className="nav-brand-text">
                  <span className="nav-brand-title">
                    P&P <span>LEGAL</span>
                  </span>
                  <span className="nav-brand-sub">CONSULTANTS</span>
                </div>
              </div>
              <p className="footer-tagline">
                Strategic counsel.<br />
                Serious representation.
              </p>
            </div>

            {/* Practice Areas */}
            <div>
              <h4 className="footer-col-title">Practice Areas</h4>
              <ul className="footer-links-list">
                <li><Link href="#practice" onClick={() => openConsultation("Litigation")}>Litigation &amp; SLP</Link></li>
                <li><Link href="#practice" onClick={() => openConsultation("Corporate & Commercial")}>Corporate Advisory</Link></li>
                <li><Link href="#practice" onClick={() => openConsultation("Dispute Resolution")}>Dispute Resolution</Link></li>
                <li><Link href="#practice" onClick={() => openConsultation("Legal Advisory")}>Regulatory Governance</Link></li>
                <li><Link href="#practice" onClick={() => openConsultation("Cyber Cases & Digital Forensics")}>Cyber &amp; IT Act</Link></li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-links-list">
                <li><Link href="#about">About Advocate Jha</Link></li>
                <li><Link href="#practice">Areas of Practice</Link></li>
                <li><Link href="#counsel">The Counsel</Link></li>
                <li><Link href="#principle">Constitutional Principle</Link></li>
                <li><Link href="#contact">Contact Chambers</Link></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="footer-col-title">Chambers Contact</h4>
              <ul className="footer-links-list">
                <li style={{ color: "var(--ivory)" }}>Delhi, India</li>
                <li>
                  <a href="mailto:info@pnplegalconsultants.com">info@pnplegalconsultants.com</a>
                </li>
                <li>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </li>
                <li>
                  <a href="tel:+919472568264">+91 94725 68264</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bar Council of India Mandatory Disclaimer */}
          <div className="footer-bci-disclaimer">
            <p className="bci-text">
              <strong>Bar Council of India Disclaimer:</strong> As per the rules of the Bar Council of
              India, advocates and legal advisors are not permitted to solicit work or advertise in any
              manner. By accessing this website (pnplegalconsultants.com), the user acknowledges that the
              information provided is solely for general informational purposes and does not create an
              advocate-client relationship. The user wishes to gain more information about Advocate Prashant Jha
              and P&amp;P Legal Consultants of their own volition. None of the contents herein should be construed as legal
              advice or formal opinion.
            </p>
          </div>

          <div className="footer-bottom-bar">
            <span>&copy; {new Date().getFullYear()} P&amp;P Legal Consultants &bull; Adv. Prashant Jha. All rights reserved.</span>
            <span>Advocates &amp; Legal Advisors &mdash; Supreme Court of India</span>
            <span>New Delhi, India</span>
          </div>
        </div>
      </footer>
    </>
  );
}
