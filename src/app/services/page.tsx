"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

interface LegalService {
  id: string;
  num: string;
  title: string;
  summary: string;
  deliverables: string[];
  icon: string;
}

const legalServicesList: LegalService[] = [
  {
    id: "cyber-banking",
    num: "01",
    title: "Cybercrime & Banking Dispute Assistance",
    summary:
      "Strategic assistance in legal issues involving digital transactions, financial cyber fraud, unauthorized account freezes, debit restrictions, and banking representations.",
    deliverables: [
      "Review of cybercrime complaints and transaction audit trails",
      "Drafting legal representations regarding bank account freezes, debit freezes, and liens",
      "Assistance with formal banking complaints, nodal appeals, and ombudsman representations",
      "Legal documentation relating to UPI fraud, payment gateway holds, and digital impersonation",
      "Procedural guidance on NCRP cyber portal complaints and law enforcement liaison",
      "Statutory remedies and court applications for lifting unjustified bank account liens",
    ],
    icon: "\u26A1",
  },
  {
    id: "drafting",
    num: "02",
    title: "Legal Drafting & Documentation",
    summary:
      "Precision drafting, vetting, and negotiation of legal instruments for individuals, founders, startups, and commercial corporations.",
    deliverables: [
      "Statutory legal notices, demand notices, and formal legal replies",
      "Commercial contracts, vendor agreements, and master service agreements (MSAs)",
      "Bespoke Non-Disclosure Agreements (NDAs) and trade secret covenants",
      "Software development, SaaS, license, and technology agreements",
      "Formal representations to statutory authorities and regulatory bodies",
      "Affidavits, power of attorney documents, declarations, and court applications",
      "Comprehensive contractual audit, risk-mapping, and clause enforcement review",
    ],
    icon: "\u270E",
  },
  {
    id: "advisory",
    num: "03",
    title: "Legal Consultation & Advisory",
    summary:
      "Rigorous pre-litigation evaluation, statutory interpretation, risk mitigation, and actionable legal guidance.",
    deliverables: [
      "Preliminary review of legal disputes, rights, and potential liabilities",
      "Critical examination of primary agreements, deeds, and evidentiary documents",
      "Deep research into applicable central/state statutes and landmark judicial precedents",
      "Assessment of viable legal strategies and dispute resolution options",
      "Guidance regarding procedural court timelines, court fees, and jurisdiction",
      "Structured advisory reports detailing recommended next steps",
    ],
    icon: "\u2696",
  },
  {
    id: "litigation",
    num: "04",
    title: "Litigation & Court Proceedings",
    summary:
      "Strategic representation before District Courts, Delhi High Court, specialized tribunals, and the Supreme Court of India.",
    deliverables: [
      "Preparation of plaints, writ petitions, special leave petitions (SLPs), and pleadings",
      "Civil suits, summary suits, recovery claims, and injunction proceedings",
      "Criminal complaints, quashing petitions, and trial defence advocacy",
      "Bail applications (regular, interim, and anticipatory bail) before competent courts",
      "Detailed judicial research, written submissions, and oral courtroom advocacy",
      "Interlocutory applications, stay petitions, and supporting affidavits",
      "Appellate filings, revisions, and execution petitions",
    ],
    icon: "\u25C8",
  },
  {
    id: "corporate",
    num: "05",
    title: "Corporate & Commercial Legal Services",
    summary:
      "Support concerning commercial relationships, statutory obligations, corporate governance, and transaction risk.",
    deliverables: [
      "Drafting and review of cross-border and domestic business agreements",
      "Vendor, distributor, consultant, and service provider contracts",
      "Employment contracts, senior executive covenants, and confidentiality documentation",
      "Contractual risk identification and pre-dispute commercial risk management",
      "Legal notices for breach of commercial contract and recovery of corporate dues",
      "Statutory compliance review under the Companies Act, 2013 and allied rules",
    ],
    icon: "\u2746",
  },
  {
    id: "pmla",
    num: "06",
    title: "PMLA & Financial Crime Matters",
    summary:
      "High-stakes documentation and legal assistance in proceedings involving alleged financial crime, money laundering, and economic offences.",
    deliverables: [
      "Review of case documents, ECIR allegations, and investigative summons",
      "Preparation of formal legal representations and responses to investigative agencies",
      "Research concerning provisional attachment orders and confiscation procedures",
      "Assistance in appropriate proceedings involving the Enforcement Directorate (ED)",
      "Procedural and statutory compliance under the Prevention of Money Laundering Act",
      "Support with interconnected banking freeze proceedings and white-collar remedies",
    ],
    icon: "\u26E8",
  },
  {
    id: "dispute-res",
    num: "07",
    title: "Dispute Resolution & Settlement",
    summary:
      "Structured facilitation of out-of-court settlements, institutional mediation, and statutory arbitration proceedings.",
    deliverables: [
      "Pre-litigation negotiation strategy and settlement documentation",
      "Mediation-related advocacy and conciliation representation",
      "Arbitration clause drafting, invocation notices, and arbitrator nominations",
      "Section 9 urgent interim relief and Section 11 judicial appointment petitions",
      "Drafting comprehensive, legally binding settlement terms and consent awards",
      "Assistance with Section 34 arbitral challenges and execution of domestic/foreign awards",
    ],
    icon: "\u29BF",
  },
  {
    id: "civil-prop",
    num: "08",
    title: "Civil, Property & Recovery Matters",
    summary:
      "Legal representation and advisory concerning civil rights, property titles, possession disputes, and monetary claims.",
    deliverables: [
      "Property disputes, partition suits, title disputes, and possession claims",
      "Civil recovery suits for contractual dues, loan debts, and outstanding balances",
      "Injunction petitions (temporary, permanent, mandatory) and declaration suits",
      "Landlord–tenant disputes, lease renewals, and eviction proceedings",
      "Statutory legal notices under Section 106 Transfer of Property Act and Section 138 NI Act",
      "Review and vetting of title deeds, sale agreements, and conveyance documents",
    ],
    icon: "\u25A3",
  },
  {
    id: "traffic",
    num: "09",
    title: "Traffic Challan & Transport Legal Assistance",
    summary:
      "Structured procedural assistance for vehicle owners, transport operators, and commercial fleets facing compounding or court summons.",
    deliverables: [
      "Detailed audit of pending electronic traffic challans and court notices",
      "Guidance on compounding procedures, fine settlement, and Lok Adalat schedules",
      "Preparation of formal applications and petitions before Virtual Courts",
      "Representation in Regular Traffic Court proceedings for compoundable offences",
      "Legal support for commercial transport operators and vehicle release proceedings",
      "Remedies concerning arbitrary challans and transport department grievances",
    ],
    icon: "\u2699",
  },
];

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Cybercrime & Banking Dispute Assistance");

  const openForService = (title: string) => {
    setSelectedService(title);
    setModalOpen(true);
  };

  return (
    <div className="page-shell">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      {/* ── Services Hero ── */}
      <section className="inner-hero-section">
        <div className="inner-hero-bg">
          <Image
            src="/const-wide.jpg"
            alt="Legal Consultation and Documentation"
            fill
            sizes="100vw"
            priority
            className="inner-hero-img"
          />
          <div className="inner-hero-overlay" />
        </div>

        <div className="container inner-hero-content">
          <span className="subtitle-eyebrow">OUR LEGAL SERVICES</span>
          <h1 className="inner-hero-title">
            Professional Legal Assistance<br />
            <span>For Individuals &amp; Businesses.</span>
          </h1>
          <p className="inner-hero-desc">
            From legal consultation and contract drafting to litigation advocacy and dispute resolution, our services address a full range of legal requirements under applicable Indian law.
          </p>
          <div className="inner-hero-cta">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-gold"
              type="button"
            >
              Request Legal Assistance &rarr;
            </button>
            <Link href="/practice-areas" className="btn-ghost">
              Explore Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Distinction Banner ── */}
      <section className="services-distinction-banner">
        <div className="container">
          <div className="distinction-card">
            <div className="distinction-col">
              <span className="distinction-label">PRACTICE AREAS</span>
              <h4>Which branch of law does the matter concern?</h4>
              <p>Cyber law, criminal law, corporate law, civil litigation, PMLA, banking, arbitration, consumer rights, transport.</p>
            </div>
            <div className="distinction-divider" />
            <div className="distinction-col">
              <span className="distinction-label">OUR SERVICES</span>
              <h4>What kind of legal work can our firm undertake?</h4>
              <p>Strategic consultation, contract drafting, court litigation, bail advocacy, bank freeze representations, settlements, challan disposal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-header text-center">
            <span className="subtitle-eyebrow">LEGAL WORK WE UNDERTAKE</span>
            <h2 className="section-heading">Services Portfolio</h2>
            <p className="services-sub">
              P&amp;P Legal Consultants provides legal assistance across selected areas of litigation, advisory, drafting and dispute resolution. The nature and scope of assistance depend on the facts, applicable law, jurisdiction and professional requirements of each matter.
            </p>
          </div>

          <div className="services-catalog-grid">
            {legalServicesList.map((service) => (
              <div key={service.id} id={service.id} className="service-catalog-card">
                <div className="svc-card-top">
                  <span className="svc-icon">{service.icon}</span>
                  <span className="svc-num">{service.num}</span>
                </div>
                <h3 className="svc-title">{service.title}</h3>
                <p className="svc-desc">{service.summary}</p>

                <div className="svc-deliverables-wrap">
                  <span className="svc-deliverables-title">Scope of Legal Work:</span>
                  <ul className="svc-deliverables-list">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx}>
                        <span className="svc-check">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="svc-card-bottom">
                  <button
                    onClick={() => openForService(service.title)}
                    className="btn-gold"
                    style={{ width: "100%", justifyContent: "center" }}
                    type="button"
                  >
                    Engage Chambers for This Service &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How Our Services Work (4 Steps) ── */}
      <section className="how-services-work-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle-eyebrow">SYSTEMATIC ENGAGEMENT PROCESS</span>
            <h2 className="section-heading">How Our Services Work</h2>
            <p className="section-sub-desc">
              A transparent, four-step protocol ensuring thorough diligence and client clarity from first contact.
            </p>
          </div>

          <div className="engagement-steps-grid">
            <div className="engagement-step-card">
              <div className="step-circle">1</div>
              <span className="step-phase">STEP 1</span>
              <h3 className="step-name">Initial Enquiry</h3>
              <p className="step-text">
                Explain the nature of your legal issue, the parties or institutions involved, and the specific relief or legal outcome you are seeking.
              </p>
            </div>

            <div className="engagement-step-card">
              <div className="step-circle">2</div>
              <span className="step-phase">STEP 2</span>
              <h3 className="step-name">Preliminary Assessment</h3>
              <p className="step-text">
                Relevant facts, documents, court jurisdiction, statutory limitations, and potential procedural requirements are rigorously evaluated.
              </p>
            </div>

            <div className="engagement-step-card">
              <div className="step-circle">3</div>
              <span className="step-phase">STEP 3</span>
              <h3 className="step-name">Scope of Assistance</h3>
              <p className="step-text">
                The appropriate service, necessary documents, timeline expectations, professional fees and proposed scope of work are agreed upon, subject to professional obligations.
              </p>
            </div>

            <div className="engagement-step-card">
              <div className="step-circle">4</div>
              <span className="step-phase">STEP 4</span>
              <h3 className="step-name">Legal Work &amp; Execution</h3>
              <p className="step-text">
                The agreed legal work proceeds in accordance with applicable law, Bar Council ethical standards, procedural codes, and disciplined execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chambers Presence Banner ── */}
      <section className="services-presence-banner">
        <div className="container">
          <div className="presence-banner-card">
            <div className="presence-banner-content">
              <span className="subtitle-eyebrow">DELHI &amp; PAN-INDIA ASSISTANCE</span>
              <h2>Legal Services in Delhi &amp; Across India</h2>
              <p>
                <strong>P&amp;P Legal Consultants</strong> is based in Delhi and considers suitable legal matters across India, subject to jurisdiction, applicable professional rules and appropriate representation arrangements.
              </p>
              <div className="chambers-quick-contact">
                <p><strong>Chambers Office:</strong> D-20, Nawada Housing Complex, Vipin Garden, Dwarka Mor, New Delhi, Delhi, India.</p>
                <p><strong>General Enquiries:</strong> <a href="tel:+919472568264">+91-9472568264</a></p>
              </div>
            </div>
            <div className="presence-banner-action">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-gold"
                type="button"
              >
                Schedule Private Consultation &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPractice={selectedService}
      />
    </div>
  );
}
