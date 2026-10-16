"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

interface ArticleItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  statutes: string;
  content: string[];
}

const articlesData: ArticleItem[] = [
  // ── Category 1: Cyber Law & Banking ──
  {
    id: "freeze-vs-lien",
    category: "Cyber Law & Banking",
    title: "What is the Difference Between a Bank Account Freeze and a Lien?",
    excerpt:
      "Understanding the critical procedural distinctions under Section 102 CrPC / Section 106 BNSS versus contractual bank lien rights under Section 171 Indian Contract Act.",
    author: "Advocate Prashant Jha",
    date: "October 2026",
    readTime: "6 min read",
    statutes: "Section 102 CrPC / Sec 106 BNSS & Sec 171 Indian Contract Act, 1872",
    content: [
      "A complete bank account freeze completely stops all debits and credits on an account, usually initiated by a cyber crime police station or magistrate under Section 102 CrPC (now Section 106 BNSS) during an investigation into disputed financial transactions.",
      "In contrast, a bank lien restricts only a specified dollar/rupee amount corresponding to an alleged disputed transaction or loan default, allowing the account holder to continue operating the remaining surplus balance.",
      "Remedies: To lift an account freeze, the account holder must identify the originating Police Station / NCRP Acknowledgement Number, demonstrate that they are a bona fide payee or merchant with legitimate tax/invoice records, and submit a formal representation to the Investigating Officer or petition the jurisdictional Magistrate under Section 451/457 CrPC.",
    ],
  },
  {
    id: "debit-freeze-steps",
    category: "Cyber Law & Banking",
    title: "What Should an Account Holder Do Immediately After Discovering a Debit Freeze?",
    excerpt:
      "A systematic legal roadmap to uncover the originating cyber cell notice, obtain transaction IDs, and restore account operations without unnecessary delay.",
    author: "Advocate Prashant Jha",
    date: "October 2026",
    readTime: "7 min read",
    statutes: "Information Technology Act, 2000 & RBI Master Circular on Grievance Redressal",
    content: [
      "Step 1: Contact your bank's branch manager and demand the formal notice details under which the freeze was placed. Banks are legally required to provide the originating Cyber Cell state, district, Police Station, and Notice Reference Number.",
      "Step 2: Collect all underlying commercial records—tax invoices, payment gateway receipts, KYC documentation, chat logs, and delivery receipts—proving you had no criminal nexus with the alleged cyber fraudster.",
      "Step 3: Submit a formal legal representation through counsel to the concerned Investigating Officer (IO) requesting limitation of the lien to the disputed amount only or complete unfreezing upon furnishing an indemnity or verification.",
    ],
  },
  {
    id: "reporting-online-fraud",
    category: "Cyber Law & Banking",
    title: "How Can a Person Report Online Financial Fraud and UPI Scams in India?",
    excerpt:
      "Statutory reporting protocols through the 1930 Citizen Financial Cyber Fraud Reporting System, National Cyber Crime Portal (NCRP), and formal police complaints.",
    author: "Advocate Prashant Jha",
    date: "October 2026",
    readTime: "5 min read",
    statutes: "Section 66C, 66D Information Technology Act, 2000 & Sec 318 BNS",
    content: [
      "Immediate action within the 'Golden Hour' (the first 2-4 hours of fraud) is vital to stop fund siphonage. Victims should immediately dial the national cyber helpline '1930' to register the fraud and prompt inter-bank alerts.",
      "Simultaneously, register a formal complaint on the official NCRP portal (cybercrime.gov.in) with transaction UTR numbers, account numbers, screenshots, and call records.",
      "If the fraud amount is substantial, file a signed written complaint under Section 173 BNSS with the local Cyber Crime Police Station to ensure the registration of an FIR and prompt evidence preservation orders.",
    ],
  },

  // ── Category 2: Corporate & Commercial Law ──
  {
    id: "business-nda-clauses",
    category: "Corporate & Commercial Law",
    title: "What Should a Business Non-Disclosure Agreement (NDA) Strictly Contain?",
    excerpt:
      "Essential drafting safeguards for bilateral and unilateral NDAs to protect proprietary algorithms, commercial data, client lists, and trade secrets.",
    author: "Advocate Prashant Jha",
    date: "October 2026",
    readTime: "6 min read",
    statutes: "Indian Contract Act, 1872 & Specific Relief Act, 1963",
    content: [
      "Precise Definition of Confidential Information: Avoid boilerplate clauses. Clearly specify whether source codes, financial projections, customer pipelines, and oral disclosures confirmed in writing are covered.",
      "Standard of Care & Non-Circumvention: Include explicit obligations requiring the recipient party to apply at least reasonable commercial care and strictly prohibit circumvention of business opportunities.",
      "Remedies for Breach: Monetary damages alone are rarely adequate for leaked proprietary data. Always include an express stipulation acknowledging the disclosing party's entitlement to seek immediate interim injunctive relief from competent courts without proving special damages.",
    ],
  },
  {
    id: "software-dev-agreements",
    category: "Corporate & Commercial Law",
    title: "Important Clauses to Scrutinize in a Software Development Agreement",
    excerpt:
      "Key legal protections concerning Intellectual Property assignment, acceptance testing criteria, warranty periods, and indemnity limitations.",
    author: "Advocate Prashant Jha",
    date: "October 2026",
    readTime: "8 min read",
    statutes: "Copyright Act, 1957 & Indian Contract Act, 1872",
    content: [
      "IP Assignment vs. License: In Indian law, unless an agreement explicitly contains a 'work for hire' and absolute written assignment of copyright in the code, the developer may retain residual authorship rights.",
      "Milestone-Based Acceptance Criteria: Clearly articulate objective testing procedures, user acceptance testing (UAT) timelines, and deemed acceptance triggers to prevent open-ended payment delays.",
      "Limitation of Liability & IP Infringement Indemnity: Standard vendor clauses seek to cap liabilities to fees paid. Clients must carve out gross negligence, willful misconduct, data privacy violations, and third-party IP infringement indemnities from liability caps.",
    ],
  },
  {
    id: "breach-commercial-contracts",
    category: "Corporate & Commercial Law",
    title: "What Happens When a Party Breaches a Commercial Contract in India?",
    excerpt:
      "Understanding statutory remedies under Sections 73, 74 of the Indian Contract Act and urgent interim relief under Section 9 of the Arbitration Act.",
    author: "Advocate Prashant Jha",
    date: "October 2026",
    readTime: "7 min read",
    statutes: "Sections 73 & 74 Indian Contract Act, 1872 & Commercial Courts Act, 2015",
    content: [
      "Notice of Default & Cure Period: The non-defaulting party must issue a formal Legal Notice of Default granting the contractually stipulated cure period before declaring termination.",
      "Damages vs. Liquidated Penalties: Under Section 73, unliquidated damages must represent actual natural loss rather than remote damages. Under Section 74, stipulated liquidated sums represent the ceiling, requiring proof of reasonable compensation unless loss is incapable of exact quantification.",
      "Mandatory Pre-Institution Mediation: Under Section 12A of the Commercial Courts Act, 2015, commercial suits must undergo pre-institution mediation unless urgent interim relief is genuinely sought.",
    ],
  },

  // ── Category 3: Litigation & Criminal Law ──
  {
    id: "criminal-complaint-process",
    category: "Litigation & Criminal Law",
    title: "How Does the Criminal Complaint Process Work Under Indian Law?",
    excerpt:
      "A procedural comparison between police FIRs under Section 173 BNSS and private judicial complaints before Magistrates under Section 223 BNSS.",
    author: "Advocate Prashant Jha",
    date: "October 2026",
    readTime: "7 min read",
    statutes: "Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS)",
    content: [
      "Filing with Police: For cognizable offences (cheating, forgery, assault), a complaint is filed before the SHO. If the police refuse to register an FIR, a representation is escalated to the Superintendent/DCP under Section 175(3) BNSS.",
      "Private Complaint Before Magistrate: If police inaction persists, the complainant approaches the Judicial Magistrate under Section 223 BNSS. Under the new BNSS procedure, the Magistrate examines the complainant and witnesses under oath before issuing summons.",
      "Investigation Direction: The Magistrate may order an investigation under Section 175(3) BNSS by police or conduct a direct inquiry to determine whether sufficient grounds exist for issuing process against the accused.",
    ],
  },
  {
    id: "anticipatory-bail-law",
    category: "Litigation & Criminal Law",
    title: "What is Anticipatory Bail Under Indian Law and When Can It Be Sought?",
    excerpt:
      "Judicial parameters for pre-arrest bail under Section 482 BNSS (formerly Section 438 CrPC) and constitutional safeguards against custodial abuse.",
    author: "Advocate Prashant Jha",
    date: "October 2026",
    readTime: "8 min read",
    statutes: "Section 482 BNSS, 2023 & Article 21 Constitution of India",
    content: [
      "Grounds for Reasonable Apprehension: Anticipatory bail is sought before the Sessions Court or the High Court when a person reasonably apprehends imminent arrest in connection with a non-bailable offence.",
      "Judicial Factors: The court evaluates the nature and gravity of the accusation, the role attributed to the applicant, prior criminal antecedents, flight risk, and whether custodial interrogation is strictly indispensable.",
      "Bail Conditions: Courts frequently impose stringent conditions—mandating cooperation with police investigations, deposit of passport, refraining from contacting prosecution witnesses, and remaining available for questioning.",
    ],
  },
  {
    id: "civil-injunctions",
    category: "Litigation & Criminal Law",
    title: "How Do Civil Injunction Proceedings Work: The Three-Pronged Test",
    excerpt:
      "An in-depth analysis of Order XXXIX Rules 1 & 2 of the Code of Civil Procedure and the Specific Relief Act principles for temporary and permanent injunctions.",
    author: "Advocate Prashant Jha",
    date: "October 2026",
    readTime: "6 min read",
    statutes: "Order 39 Rules 1 & 2 CPC, 1908 & Specific Relief Act, 1963",
    content: [
      "The Three Pillars: To grant an ad-interim or temporary injunction restraining another party, the court must be satisfied of three concurrent legal tests: (1) Prima Facie Case, (2) Balance of Convenience, and (3) Irreparable Injury.",
      "Ex-Parte Urgent Relief: In situations of immediate threat (demolition, illegal alienation of property, or breach of patent), the court may dispense with advance notice to the defendant under Rule 3 of Order XXXIX, subject to strict timeline compliance.",
      "Permanent Injunctions: Granted only upon the conclusion of a full trial through a final decree under Section 38 of the Specific Relief Act, perpetually restraining the defendant from violating the plaintiff's established legal rights.",
    ],
  },
];

export default function BlogPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const categories = ["All", "Cyber Law & Banking", "Corporate & Commercial Law", "Litigation & Criminal Law"];

  const filteredArticles =
    activeCategory === "All"
      ? articlesData
      : articlesData.filter((a) => a.category === activeCategory);

  return (
    <div className="page-shell">
      <Navbar onOpenConsultation={() => setModalOpen(true)} />

      {/* ── Blog Hero ── */}
      <section className="inner-hero-section">
        <div className="inner-hero-bg">
          <Image
            src="/supreme-wide.jpg"
            alt="Legal Insights & Knowledge"
            fill
            sizes="100vw"
            priority
            className="inner-hero-img"
          />
          <div className="inner-hero-overlay" />
        </div>

        <div className="container inner-hero-content">
          <span className="subtitle-eyebrow">LEGAL INSIGHTS &amp; ANALYSIS</span>
          <h1 className="inner-hero-title">
            Informed Legal Analysis.<br />
            <span>Reliable Practical Guidance.</span>
          </h1>
          <p className="inner-hero-desc">
            Informative articles and statutory analyses on cybercrime, bank account freezes, commercial contracts, bail law, and Indian civil jurisprudence authored by Advocate Prashant Jha.
          </p>
          <div className="inner-hero-cta">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-gold"
              type="button"
            >
              Consult On Legal Queries &rarr;
            </button>
            <Link href="/practice-areas" className="btn-ghost">
              Explore Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category Filter Tabs ── */}
      <section className="blog-filter-section">
        <div className="container">
          <div className="filter-tabs-wrapper">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-tab-btn ${activeCategory === cat ? "active" : ""}`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles Grid ── */}
      <section className="blog-articles-section">
        <div className="container">
          <div className="articles-editorial-grid">
            {filteredArticles.map((article) => {
              const isExpanded = expandedArticle === article.id;

              return (
                <article key={article.id} id={article.id} className="article-editorial-card">
                  <div className="article-meta-row">
                    <span className="article-category-badge">{article.category}</span>
                    <span className="article-read-time">{article.readTime}</span>
                  </div>

                  <h2 className="article-title">{article.title}</h2>

                  <div className="article-statute-cite">
                    <strong>Statutory Reference:</strong> {article.statutes}
                  </div>

                  <p className="article-excerpt">{article.excerpt}</p>

                  {isExpanded && (
                    <div className="article-expanded-body">
                      {article.content.map((para, pIdx) => (
                        <p key={pIdx} className="article-body-p">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="article-footer-row">
                    <div className="article-author-info">
                      <span className="author-name">{article.author}</span>
                      <span className="author-role">Supreme Court of India &bull; {article.date}</span>
                    </div>

                    <button
                      onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                      className="btn-article-toggle"
                      type="button"
                    >
                      {isExpanded ? "Collapse Article \u2191" : "Read Full Analysis \u2192"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Editorial Policy Banner ── */}
      <section className="editorial-policy-section">
        <div className="container">
          <div className="editorial-policy-card">
            <h4>Editorial &amp; Informational Notice</h4>
            <p>
              These articles are prepared by Advocate Prashant Jha for general educational and informational purposes. They do not constitute formal legal opinion or substitute for individualized case assessment. Legal outcomes depend upon precise facts, applicable statutory amendments, and judicial discretion.
            </p>
            <div className="editorial-policy-btn-wrap">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-gold"
                type="button"
              >
                Schedule Specific Case Review &rarr;
              </button>
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
