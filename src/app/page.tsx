"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

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
    id: "cyber",
    num: "01",
    title: "Cyber Law & Cybercrime",
    desc: "Cyber fraud, online financial scams, bank account freezes, debit freezes, lien disputes, UPI fraud, and NCRP procedural remedies.",
    img: "/practice-cyber.jpg",
    badge: "IT Act & Cybercrime",
  },
  {
    id: "corporate",
    num: "02",
    title: "Corporate & Commercial Law",
    desc: "Company advisory, commercial contracts, bespoke NDAs, software development agreements, compliance governance, and contract dispute resolution.",
    img: "/practice-corporate.jpg",
    badge: "Contracts & Transactions",
  },
  {
    id: "criminal",
    num: "03",
    title: "Criminal Law & Defence",
    desc: "Criminal complaints and trial defence, regular and anticipatory bail, cheating, financial fraud, forgery, and investigative representations.",
    img: "/practice-litigation.jpg",
    badge: "Trial & Bail Advocacy",
  },
  {
    id: "civil",
    num: "04",
    title: "Civil Litigation",
    desc: "Property and possession disputes, money recovery suits, temporary and permanent injunctions, declaration suits, and landlord–tenant matters.",
    img: "/practice-advisory.jpg",
    badge: "Property & Recovery",
  },
  {
    id: "pmla",
    num: "05",
    title: "PMLA & Financial Crime",
    desc: "PMLA research, proceedings involving the Enforcement Directorate (ED), attachment and confiscation matters, and white-collar crime defense.",
    img: "/supreme.jpg",
    badge: "ED & White-Collar",
  },
  {
    id: "dispute",
    num: "06",
    title: "Dispute Resolution & Other Legal Services",
    desc: "Negotiation, structured mediation, commercial arbitration proceedings, banking lien disputes, consumer disputes, and traffic challan matters.",
    img: "/practice-dispute.jpg",
    badge: "Arbitration & Mediation",
  },
];

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState("Cyber Law & Cybercrime");

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
      <Navbar onOpenConsultation={(practice) => openConsultation(practice)} />

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
      <section className="credibility-ribbon" aria-label="Chambers Jurisdictions & Credentials">
        <div className="ribbon-ambient-glow" aria-hidden="true" />
        <div className="container ribbon-container">
          {/* Item 1 */}
          <div className="ribbon-badge">
            <div className="ribbon-badge-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3L2 8h20L12 3z" />
                <path d="M5 8v9M9 8v9M15 8v9M19 8v9" />
                <path d="M2 17h20M1 21h22" />
              </svg>
            </div>
            <div className="ribbon-badge-content">
              <span className="ribbon-badge-category">APEX JURISDICTION</span>
              <span className="ribbon-badge-title">Supreme Court of India</span>
            </div>
          </div>

          <div className="ribbon-divider" aria-hidden="true">
            <span className="ribbon-diamond" />
          </div>

          {/* Item 2 */}
          <div className="ribbon-badge">
            <div className="ribbon-badge-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v17M8 21h8M3 7h18" />
                <path d="M6 7l-3 7a3 3 0 0 0 6 0L6 7z" />
                <path d="M18 7l-3 7a3 3 0 0 0 6 0L18 7z" />
              </svg>
            </div>
            <div className="ribbon-badge-content">
              <span className="ribbon-badge-category">HIGH COURT OF RECORD</span>
              <span className="ribbon-badge-title">High Court of Delhi</span>
            </div>
          </div>

          <div className="ribbon-divider" aria-hidden="true">
            <span className="ribbon-diamond" />
          </div>

          {/* Item 3 */}
          <div className="ribbon-badge">
            <div className="ribbon-badge-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <circle cx="12" cy="14" r="1.5" />
              </svg>
            </div>
            <div className="ribbon-badge-content">
              <span className="ribbon-badge-category">STRATEGIC COUNSEL</span>
              <span className="ribbon-badge-title">Corporate &amp; Commercial</span>
            </div>
          </div>

          <div className="ribbon-divider" aria-hidden="true">
            <span className="ribbon-diamond" />
          </div>

          {/* Item 4 */}
          <div className="ribbon-badge">
            <div className="ribbon-badge-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 13l-7.5 7.5a2.12 2.12 0 0 1-3-3L11 10" />
                <path d="M16 8l3-3a1.5 1.5 0 0 1 2.12 2.12L18.12 10.12" />
                <path d="M8.5 6.5l9 9" />
                <path d="M6 9l9 9" />
                <path d="M2 21h6" />
              </svg>
            </div>
            <div className="ribbon-badge-content">
              <span className="ribbon-badge-category">TRIAL &amp; APPELLATE</span>
              <span className="ribbon-badge-title">Civil &amp; Criminal Litigation</span>
            </div>
          </div>

          <div className="ribbon-divider" aria-hidden="true">
            <span className="ribbon-diamond" />
          </div>

          {/* Item 5 */}
          <div className="ribbon-badge">
            <div className="ribbon-badge-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M8 7h8M8 11h6" />
              </svg>
            </div>
            <div className="ribbon-badge-content">
              <span className="ribbon-badge-category">LEGAL SCHOLARSHIP</span>
              <span className="ribbon-badge-title">TeachMeLegal Founder</span>
            </div>
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

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/practice-areas" className="btn-gold" style={{ display: "inline-flex" }}>
              Explore All 10 Practice Areas In Detail &rarr;
            </Link>
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
                </div>
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

      {/* ── 09. Legal Insights Preview Section ── */}
      <section className="legal-insights-home-section" style={{ padding: "6rem 0", background: "var(--bg-obsidian)" }}>
        <div className="container">
          <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
            <div>
              <span className="subtitle-eyebrow">LEGAL INSIGHTS &amp; ANALYSIS</span>
              <h2 className="section-heading">Knowledge from Practice</h2>
              <p style={{ color: "var(--text-muted)", maxWidth: "560px", fontSize: "1rem", marginTop: "0.5rem" }}>
                Informative articles on cybercrime, banking freezes, commercial contracts, bail jurisprudence, and Indian civil procedure.
              </p>
            </div>
            <Link href="/blog" className="btn-ghost">
              View All Articles &rarr;
            </Link>
          </div>

          <div className="domains-cards-grid">
            <div className="domain-card">
              <div className="domain-tag">CYBER LAW &bull; BANKING DISPUTES</div>
              <h3 className="domain-title">Bank Account Freeze vs. Lien: Procedural Remedies</h3>
              <p className="domain-desc">
                An analysis of Section 102 CrPC / Section 106 BNSS versus banker&apos;s lien rights under Section 171 Indian Contract Act, and legal steps to restore debit operations.
              </p>
              <Link href="/blog#freeze-vs-lien" className="domain-link">
                Read Statutory Analysis &rarr;
              </Link>
            </div>

            <div className="domain-card">
              <div className="domain-tag">COMMERCIAL CONTRACTS</div>
              <h3 className="domain-title">What Should a Business NDA Strictly Contain?</h3>
              <p className="domain-desc">
                Critical drafting clauses for bilateral non-disclosure agreements, IP safeguards, trade secret protection, and court injunction clauses.
              </p>
              <Link href="/blog#business-nda-clauses" className="domain-link">
                Read Statutory Analysis &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Contact / Consultation Section ── */}
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
                  <span className="channel-icon">&#9906;</span>
                  <div className="channel-details">
                    <h4>Chambers Office Address</h4>
                    <p style={{ color: "var(--ivory)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                      D-20, Nawada Housing Complex, Vipin Garden, Dwarka Mor, New Delhi, Delhi, India.
                    </p>
                  </div>
                </div>

                <div className="contact-channel">
                  <span className="channel-icon">&#9742;</span>
                  <div className="channel-details">
                    <h4>Direct Chambers Phone</h4>
                    <a href="tel:+918409949411" style={{ fontSize: "1.05rem", fontWeight: 700 }}>+91-8409949411</a>
                  </div>
                </div>

                <div className="contact-channel">
                  <span className="channel-icon">&#9742;</span>
                  <div className="channel-details">
                    <h4>General Enquiries</h4>
                    <a href="tel:+919472568264">+91-9472568264</a>
                  </div>
                </div>

                <div className="contact-channel">
                  <span className="channel-icon">&#9993;</span>
                  <div className="channel-details">
                    <h4>Electronic Mail</h4>
                    <a href="mailto:info@pnplegalconsultants.com">info@pnplegalconsultants.com</a>
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

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPractice={selectedPractice}
      />
    </>
  );
}
