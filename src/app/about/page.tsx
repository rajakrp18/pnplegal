"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="page-shell">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      {/* ── Page Hero ── */}
      <section className="inner-hero-section">
        <div className="inner-hero-bg">
          <Image
            src="/supreme-wide.jpg"
            alt="Supreme Court of India"
            fill
            sizes="100vw"
            priority
            className="inner-hero-img"
          />
          <div className="inner-hero-overlay" />
        </div>

        <div className="container inner-hero-content">
          <span className="subtitle-eyebrow">ABOUT OUR FIRM</span>
          <h1 className="inner-hero-title">
            Committed to Professionalism.<br />
            <span>Focused on Legal Solutions.</span>
          </h1>
          <p className="inner-hero-desc">
            A Delhi-based legal practice providing strategic assistance in litigation, cyber law, corporate and commercial matters, financial crimes and dispute resolution.
          </p>
          <div className="inner-hero-cta">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-gold"
              type="button"
            >
              Consult With Our Chambers &rarr;
            </button>
            <Link href="/practice-areas" className="btn-ghost">
              Explore Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who We Are & Overview ── */}
      <section className="about-overview-section">
        <div className="container">
          <div className="about-grid-editorial">
            <div className="about-editorial-text">
              <span className="subtitle-eyebrow">WHO WE ARE</span>
              <h2 className="section-heading">
                Diligent Legal Counsel Rooted in Law &amp; Precision
              </h2>
              <div className="editorial-lead-p">
                <p>
                  <strong>P&amp;P Legal Consultants</strong> is a Delhi-based legal practice engaged in litigation, legal advisory, legal drafting and dispute resolution. The firm works across a wide range of legal matters involving individuals, emerging enterprises, and established business organisations.
                </p>
                <p>
                  Our practice encompasses <strong>cyber law, criminal law, civil litigation, corporate and commercial law, banking disputes, PMLA-related proceedings</strong> and other areas of Indian law, depending on the nature of the matter and applicable professional requirements.
                </p>
                <p>
                  We recognise that every legal issue involves distinct facts, legal considerations and procedural requirements. Our approach centres on understanding each matter carefully, examining the relevant documents and statutes, and identifying appropriate, structured legal options.
                </p>
              </div>

              {/* Mission & Vision Cards */}
              <div className="mission-vision-grid">
                <div className="mv-card">
                  <div className="mv-icon">&#9878;</div>
                  <h3 className="mv-title">Our Mission</h3>
                  <p className="mv-text">
                    To provide thoughtful, diligent and professionally responsible legal assistance through careful legal analysis, effective documentation and a clear understanding of our clients&apos; legal concerns.
                  </p>
                </div>

                <div className="mv-card">
                  <div className="mv-icon">&#9733;</div>
                  <h3 className="mv-title">Our Vision</h3>
                  <p className="mv-text">
                    To develop a professional legal practice recognised for integrity, sound legal reasoning, meticulous attention to detail and a responsible approach to resolving complex legal challenges.
                  </p>
                </div>
              </div>
            </div>

            {/* Counsel Portrait & Authority Card (Merged into single card) */}
            <div className="about-counsel-card-wrap">
              <div className="counsel-portrait-frame">
                <div className="counsel-photo-wrapper">
                  <Image
                    src="/adv.jpg"
                    alt="Advocate Prashant Jha — Supreme Court of India"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="counsel-photo"
                  />
                </div>
                <div className="counsel-unified-card">
                  <blockquote className="counsel-unified-quote">
                    &ldquo;Committed to the rule of law, structured litigation, and just outcomes.&rdquo;
                  </blockquote>
                  <div className="counsel-unified-divider" />
                  <div className="counsel-unified-details">
                    <div className="counsel-unified-title-row">
                      <strong className="counsel-unified-name">Advocate Prashant Jha</strong>
                      <span className="counsel-court-pill">Supreme Court of India</span>
                    </div>
                    <p className="counsel-unified-meta">
                      Enrolled with Bar Council of Delhi &bull; Founder, TeachMeLegal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Professional Approach ── */}
      <section className="about-approach-section">
        <div className="container">
          <div className="approach-header text-center">
            <span className="subtitle-eyebrow">STANDARDS OF EXCELLENCE</span>
            <h2 className="section-heading">Our Professional Approach</h2>
            <p className="approach-intro">
              Every matter entrusted to our chambers undergoes rigorous procedural review and research-backed strategy.
            </p>
          </div>

          <div className="approach-pillars-grid">
            <div className="pillar-card">
              <span className="pillar-num">01</span>
              <h3 className="pillar-title">Detailed Legal Analysis</h3>
              <p className="pillar-desc">
                We carefully examine facts, supporting evidentiary records, applicable statutes and procedural requirements before advising on a course of action.
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-num">02</span>
              <h3 className="pillar-title">Careful Drafting &amp; Documentation</h3>
              <p className="pillar-desc">
                We place premium emphasis on precision, structural clarity and statutory relevance across legal notices, commercial contracts, representations, and court pleadings.
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-num">03</span>
              <h3 className="pillar-title">Clear Communication</h3>
              <p className="pillar-desc">
                We explain legal issues, remedies, procedural timelines, and realistic risks in an accessible, practical, and transparent manner.
              </p>
            </div>

            <div className="pillar-card">
              <span className="pillar-num">04</span>
              <h3 className="pillar-title">Professional Integrity</h3>
              <p className="pillar-desc">
                Our practice is strictly guided by absolute client confidentiality, ethical obligations under the Advocates Act, 1961, and unwavering fidelity to the rule of law.
              </p>
            </div>
          </div>

          <div className="approach-checklist-wrap">
            <div className="benchmarks-header-row">
              <div className="benchmarks-title-block">
                <span className="benchmarks-kicker">CHAMBERS INTEGRITY &amp; PRACTICE STANDARDS</span>
                <h3 className="checklist-heading">Core Benchmarks We Uphold</h3>
              </div>
              <span className="benchmarks-badge">Institutional Rigor</span>
            </div>

            <div className="benchmarks-grid">
              <div className="benchmark-item">
                <span className="benchmark-check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="benchmark-text">Careful examination of all primary facts and primary documents</span>
              </div>

              <div className="benchmark-item">
                <span className="benchmark-check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="benchmark-text">Research-based statutory interpretation and authoritative precedents</span>
              </div>

              <div className="benchmark-item">
                <span className="benchmark-check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="benchmark-text">Clear, unvarnished legal communication and procedural transparency</span>
              </div>

              <div className="benchmark-item">
                <span className="benchmark-check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="benchmark-text">Strictly confidential handling of client data, financial files and communications</span>
              </div>

              <div className="benchmark-item">
                <span className="benchmark-check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="benchmark-text">Meticulous compliance with procedural court rules and filing deadlines</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Core Practice Pillars ── */}
      <section className="about-practice-overview">
        <div className="container">
          <div className="section-header">
            <span className="subtitle-eyebrow">AREAS OF ENGAGEMENT</span>
            <h2 className="section-heading">Our Core Practice Domains</h2>
          </div>

          <div className="domains-cards-grid">
            <div className="domain-card">
              <div className="domain-tag">01 / DIGITAL &amp; FINANCIAL</div>
              <h3 className="domain-title">Cyber Law &amp; Banking Disputes</h3>
              <p className="domain-desc">
                Assistance with cybercrime-related matters, online financial fraud, account restrictions, debit freezes, lien issues, banking representations and digital evidence forensics.
              </p>
              <Link href="/practice-areas#cyber" className="domain-link">
                View Specific Services &rarr;
              </Link>
            </div>

            <div className="domain-card">
              <div className="domain-tag">02 / BUSINESS &amp; TRANSACTIONS</div>
              <h3 className="domain-title">Corporate &amp; Commercial Law</h3>
              <p className="domain-desc">
                Legal drafting, commercial agreements, non-disclosure agreements (NDAs), technology contracts, corporate legal advisory and resolution of commercial breach disputes.
              </p>
              <Link href="/practice-areas#corporate" className="domain-link">
                View Specific Services &rarr;
              </Link>
            </div>

            <div className="domain-card">
              <div className="domain-tag">03 / COURTROOM ADVOCACY</div>
              <h3 className="domain-title">Litigation &amp; Dispute Resolution</h3>
              <p className="domain-desc">
                Assistance in civil and criminal proceedings before District Courts, Delhi High Court and the Supreme Court of India, along with structured mediation and arbitration.
              </p>
              <Link href="/practice-areas#criminal" className="domain-link">
                View Specific Services &rarr;
              </Link>
            </div>

            <div className="domain-card">
              <div className="domain-tag">04 / STATUTORY ENFORCEMENT</div>
              <h3 className="domain-title">Financial Crime &amp; Regulatory Matters</h3>
              <p className="domain-desc">
                Legal research, documentation and advisory in PMLA proceedings, Enforcement Directorate (ED) investigations, attachment disputes, and regulatory compliance.
              </p>
              <Link href="/practice-areas#pmla" className="domain-link">
                View Specific Services &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Presence & Pan-India Scope ── */}
      <section className="about-presence-section">
        <div className="container">
          <div className="presence-card">
            <div className="presence-content">
              <span className="subtitle-eyebrow">DELHI &bull; PAN-INDIA MATTERS</span>
              <h2 className="section-heading">Chambers Presence &amp; Jurisdictions</h2>
              <p className="presence-p">
                Based in Delhi, <strong>P&amp;P Legal Consultants</strong> undertakes legal matters across Delhi courts and tribunals, and may assist with matters throughout India through suitable legal arrangements, associate counsel networks, and appellate representation.
              </p>
              <div className="presence-chambers-box">
                <h4>Chambers Address</h4>
                <p>D-20, Nawada Housing Complex, Vipin Garden, Dwarka Mor, New Delhi, Delhi, India.</p>
                <div className="presence-phones">
                  <span><strong>Direct:</strong> <a href="tel:+918409949411">+91-8409949411</a></span>
                  <span><strong>General:</strong> <a href="tel:+919472568264">+91-9472568264</a></span>
                </div>
              </div>
            </div>
            <div className="presence-cta-col">
              <h3>Let&apos;s Discuss Your Legal Matter</h3>
              <p>
                For enquiries regarding our practice areas, document drafting, or court representation, consult with our chambers.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-gold"
                type="button"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Schedule Private Consultation &rarr;
              </button>
              <Link
                href="/contact"
                className="btn-ghost"
                style={{ width: "100%", justifyContent: "center", marginTop: "0.75rem" }}
              >
                View Contact Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
