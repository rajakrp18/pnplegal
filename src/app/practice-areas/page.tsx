"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

interface PracticeDetail {
  id: string;
  num: string;
  title: string;
  badge: string;
  statutes: string;
  summary: string;
  services: string[];
  img: string;
}

const detailedPracticeAreas: PracticeDetail[] = [
  {
    id: "cyber",
    num: "01",
    title: "Cyber Law & Cybercrime",
    badge: "Digital Transactions & IT Act",
    statutes: "Information Technology Act, 2000 & RBI Master Directions",
    summary:
      "We assist individuals and business entities with complex legal issues arising from online financial transactions, digital communications, cyber fraud, electronic evidence, and banking restrictions.",
    services: [
      "Online financial fraud and UPI-related disputes",
      "Bank account freezes, debit freezes and lien-related issues",
      "Cybercrime complaints, representations and NCRP procedural remedies",
      "Digital payment disputes, SIM swap fraud, and online impersonation",
      "Cybercrime investigation-related procedural guidance and police liaison",
      "Digital evidence forensics and cyber law advisory under Indian IT Law",
    ],
    img: "/practice-cyber.jpg",
  },
  {
    id: "corporate",
    num: "02",
    title: "Corporate & Commercial Law",
    badge: "Contracts, Advisory & Structuring",
    statutes: "Companies Act, 2013 & Indian Contract Act, 1872",
    summary:
      "Strategic legal support concerning commercial relationships, commercial transactions, contractual obligations, executive advisory and compliance governance.",
    services: [
      "Commercial agreements and bespoke contract drafting",
      "Non-disclosure agreements (NDAs) and confidentiality covenants",
      "Software development, SaaS, IP and technology agreements",
      "Contract review, risk mitigation, and breach of contract disputes",
      "Business documentation, board resolutions, and statutory notices",
      "Corporate legal advisory and regulatory compliance support",
    ],
    img: "/practice-corporate.jpg",
  },
  {
    id: "criminal",
    num: "03",
    title: "Criminal Law & Defence",
    badge: "Trial & Appellate Advocacy",
    statutes: "Bharatiya Nyaya Sanhita, 2023 & Bharatiya Nagarik Suraksha Sanhita, 2023",
    summary:
      "Serious representation and legal assistance in criminal complaints, investigative proceedings, bail applications, financial offences, and court-related litigation.",
    services: [
      "Criminal complaints filing and defence representation",
      "Regular bail, interim bail, and anticipatory bail proceedings",
      "Cheating, financial fraud, criminal breach of trust, and forgery matters",
      "Criminal intimidation, extortion, and related statutory offences",
      "Legal representations to police authorities and supervisory officers",
      "Criminal litigation before Metropolitan Magistrate, Sessions & High Courts",
    ],
    img: "/practice-litigation.jpg",
  },
  {
    id: "civil",
    num: "04",
    title: "Civil Litigation",
    badge: "Property, Money Claims & Injunctions",
    statutes: "Code of Civil Procedure, 1908 & Specific Relief Act",
    summary:
      "Comprehensive assistance in civil disputes involving legal rights, contractual obligations, immovable property titles, damages, and monetary recoveries.",
    services: [
      "Property disputes, title verification, partition, and possession suits",
      "Recovery of money, summary suits, and commercial debt claims",
      "Temporary and permanent injunctions and declaratory suits",
      "Contractual and commercial breach litigation",
      "Landlord–tenant disputes, eviction proceedings, and rent recovery",
      "Civil legal notices, applications, written statements, and pleadings",
    ],
    img: "/practice-advisory.jpg",
  },
  {
    id: "pmla",
    num: "05",
    title: "PMLA & Financial Crime",
    badge: "Enforcement Directorate & White-Collar Matters",
    statutes: "Prevention of Money Laundering Act, 2002 (PMLA)",
    summary:
      "Legal research, high-stakes documentation, and representation in proceedings involving allegations of money laundering, statutory investigations, and asset attachment.",
    services: [
      "PMLA-related legal research, advice, and procedural defense",
      "Attachment and confiscation proceedings before Adjudicating Authorities",
      "Proceedings, summons, and representations involving the Enforcement Directorate (ED)",
      "High-value financial fraud, banking irregularities, and money-laundering allegations",
      "Preparation of formal legal representations and statutory replies",
      "Appellate remedies before PMLA Appellate Tribunal and High Courts",
    ],
    img: "/supreme.jpg",
  },
  {
    id: "dispute",
    num: "06",
    title: "Dispute Resolution & Arbitration",
    badge: "ADR, Mediation & Tribunal Advocacy",
    statutes: "Arbitration and Conciliation Act, 1996",
    summary:
      "Assistance in resolving complex commercial and private disputes through structured non-litigation mechanisms, statutory mediation, and arbitration tribunals.",
    services: [
      "Strategic negotiation and settlement documentation",
      "Mediation-related assistance and conciliation facilitation",
      "Domestic and international commercial arbitration proceedings",
      "Section 9 interim measures, Section 11 arbitrator appointments",
      "Enforcement and Section 34 challenges to arbitral awards",
      "Drafting binding settlement agreements and consent awards",
    ],
    img: "/practice-dispute.jpg",
  },
  {
    id: "banking",
    num: "07",
    title: "Banking & Financial Disputes",
    badge: "Account Freezes, Liens & Credit Disputes",
    statutes: "Banking Regulation Act, SARFAESI & RBI Grievance Guidelines",
    summary:
      "Legal assistance concerning disputes between individuals, corporations, and scheduled banks, non-banking financial companies (NBFCs), or financial authorities.",
    services: [
      "Bank account restrictions, debit freezes, and lien disputes resolution",
      "Formal representations to bank nodal officers and banking ombudsman",
      "Digital payment gateway disputes, chargeback conflicts, and remittance holds",
      "Loan classification disputes, recovery harassment, and settlement agreements",
      "Assistance with documentation for unfreezing legitimate merchant accounts",
      "Statutory court remedies under writ jurisdiction for arbitrary restrictions",
    ],
    img: "/practice-banking.jpg",
  },
  {
    id: "consumer",
    num: "08",
    title: "Consumer & Service Disputes",
    badge: "Consumer Commissions & Unfair Trade",
    statutes: "Consumer Protection Act, 2019",
    summary:
      "Strategic counsel and representation in disputes concerning substandard goods, deficient professional services, unfair commercial terms, and consumer rights.",
    services: [
      "Consumer complaints drafting and representation",
      "Deficiency in service disputes across real estate, aviation, insurance, and medical sectors",
      "Unfair contract terms and deceptive trade practice matters",
      "Refund claims, compensation, and contractual service failures",
      "Legal notices and statutory pre-action protocols",
      "Proceedings before District, State, and National Consumer Commissions (NCDRC)",
    ],
    img: "/practice-consumer.jpg",
  },
  {
    id: "employment",
    num: "09",
    title: "Employment & Labour Law",
    badge: "Workplace Contracts & Dispute Advisory",
    statutes: "Industrial Disputes Act & Applicable State Labour Codes",
    summary:
      "Legal advisory and dispute resolution in employment-related relationships, executive contracts, statutory separations, and workplace rights.",
    services: [
      "Employment agreements, non-compete clauses, and IP assignment contracts",
      "Salary withholding, wrongful termination, and severance disputes",
      "Workplace-related legal notices and formal representations",
      "Employer–employee contractual covenants and restrictive terms",
      "Representation before labour commissioners and industrial tribunals",
      "Advisory on workplace compliance, POSH guidelines, and separation terms",
    ],
    img: "/practice-employment.jpg",
  },
  {
    id: "traffic",
    num: "10",
    title: "Motor Vehicle & Traffic Challan Matters",
    badge: "Transport Law & Virtual Court Procedures",
    statutes: "Motor Vehicles Act, 1988 & Delhi Traffic Regulations",
    summary:
      "Structured legal assistance concerning traffic challans, compounding procedures, transport disputes, and court disposal for vehicle owners and commercial fleets.",
    services: [
      "Review and audit of pending traffic challans and electronic notices",
      "Preparation of challan-related applications and compounding petitions",
      "Representation in Virtual Court and Regular Traffic Court proceedings",
      "Guidance on applicable compounding schemes, Lok Adalat disposal, and fines",
      "Disputes involving commercial fleet owners, transport permits, and impounded vehicles",
      "Applicable legal remedies before competent transport authorities",
    ],
    img: "/practice-traffic.jpg",
  },
];

export default function PracticeAreasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState("Cyber Law & Cybercrime");

  const openForPractice = (title: string) => {
    setSelectedPractice(title);
    setModalOpen(true);
  };

  return (
    <div className="page-shell">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      {/* ── Page Hero ── */}
      <section className="inner-hero-section">
        <div className="inner-hero-bg">
          <Image
            src="/supreme.jpg"
            alt="Supreme Court of India pillars"
            fill
            sizes="100vw"
            priority
            className="inner-hero-img"
          />
          <div className="inner-hero-overlay" />
        </div>

        <div className="container inner-hero-content">
          <span className="subtitle-eyebrow">OUR AREAS OF PRACTICE</span>
          <h1 className="inner-hero-title">
            Legal Knowledge. Strategic Representation.<br />
            <span>Professional Integrity.</span>
          </h1>
          <p className="inner-hero-desc">
            Explore our specialized areas of legal practice spanning cyber law, corporate transactions, trial and appellate criminal defense, civil litigation, PMLA and dispute resolution.
          </p>
          <div className="inner-hero-cta">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-gold"
              type="button"
            >
              Consult On Your Legal Matter &rarr;
            </button>
            <Link href="/services" className="btn-ghost">
              View Our Services Breakdown
            </Link>
          </div>
        </div>
      </section>

      {/* ── Practice Overview Notice ── */}
      <section className="practice-intro-banner">
        <div className="container">
          <div className="intro-card-glass">
            <h3>Our Areas of Legal Practice</h3>
            <p>
              P&amp;P Legal Consultants provides legal assistance across a range of practice areas. The appropriate approach to each matter depends on its facts, applicable law, jurisdiction and procedural requirements.
            </p>
            <span className="intro-sub-tag">
              Select a practice category below to view specific legal services and statutory frameworks.
            </span>
          </div>
        </div>
      </section>

      {/* ── Detailed Practice Areas List ── */}
      <section className="detailed-practice-section">
        <div className="container">
          <div className="practice-details-list">
            {detailedPracticeAreas.map((area) => (
              <div key={area.id} id={area.id} className="practice-detailed-card">
                <div className="pd-header">
                  <div className="pd-meta-top">
                    <span className="pd-num">{area.num}</span>
                    <span className="pd-badge">{area.badge}</span>
                  </div>
                  <h2 className="pd-title">{area.title}</h2>
                  <div className="pd-statute-tag">
                    <strong>Statutory Framework:</strong> {area.statutes}
                  </div>
                </div>

                <div className="pd-body-grid">
                  <div className="pd-summary-col">
                    <p className="pd-desc">{area.summary}</p>
                    <div className="pd-thumb-wrapper">
                      <Image
                        src={area.img}
                        alt={area.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="pd-thumb-img"
                      />
                    </div>
                  </div>

                  <div className="pd-services-col">
                    <h3 className="pd-services-heading">Key Legal Services Undertaken:</h3>
                    <ul className="pd-services-list">
                      {area.services.map((svc, i) => (
                        <li key={i}>
                          <span className="pd-bullet">&bull;</span>
                          <span>{svc}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pd-card-actions">
                      <button
                        onClick={() => openForPractice(area.title)}
                        className="btn-gold"
                        type="button"
                      >
                        Inquire About {area.title} &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Approach to Every Matter ── */}
      <section className="matter-approach-section">
        <div className="container">
          <div className="approach-header text-center">
            <span className="subtitle-eyebrow">PROCEDURAL DISCIPLINE</span>
            <h2 className="section-heading">Our Approach to Every Matter</h2>
            <p className="approach-intro">
              Regardless of the practice domain, our chambers adheres to four systematic procedural stages:
            </p>
          </div>

          <div className="four-steps-grid">
            <div className="step-card">
              <span className="step-badge">STEP 1</span>
              <h3 className="step-title">Legal Assessment</h3>
              <p className="step-desc">
                Thorough evaluation of the underlying facts, primary evidentiary records, timelines, and legal controversies involved.
              </p>
            </div>

            <div className="step-card">
              <span className="step-badge">STEP 2</span>
              <h3 className="step-title">Legal Research</h3>
              <p className="step-desc">
                In-depth examination of applicable statutes, procedural codes, latest Supreme Court and High Court precedents.
              </p>
            </div>

            <div className="step-card">
              <span className="step-badge">STEP 3</span>
              <h3 className="step-title">Drafting &amp; Procedure</h3>
              <p className="step-desc">
                Meticulous preparation of notices, representations, writ petitions, plaints, or commercial contract clauses.
              </p>
            </div>

            <div className="step-card">
              <span className="step-badge">STEP 4</span>
              <h3 className="step-title">Legal Representation</h3>
              <p className="step-desc">
                Dedicated representation before courts, investigative bodies, tribunals, or negotiated alternative dispute forums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final Practice CTA ── */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="closing-card">
            <span className="subtitle-eyebrow">P&amp;P LEGAL CONSULTANTS</span>
            <h2 className="closing-title">Looking for Legal Assistance?</h2>
            <p className="closing-desc">
              Contact the firm to discuss your legal matter and identify the appropriate remedies and procedures applicable to your circumstances.
            </p>
            <div className="closing-actions">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-gold"
                type="button"
              >
                Schedule Private Consultation &rarr;
              </button>
              <Link href="/contact" className="btn-ghost">
                Chambers Contact Details
              </Link>
            </div>
            <div className="closing-meta">
              Delhi, India &bull; Pan-India matters where appropriate
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
    </div>
  );
}
