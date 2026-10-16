"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    practiceArea: "Cyber Law & Cybercrime",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        throw new Error(data.error || "Failed to submit consultation inquiry.");
      }

      setSubmissionSuccess(
        "Your consultation request has been securely delivered to Chambers of Advocate Prashant Jha. We will review the matter and contact you promptly."
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please contact Chambers directly via phone.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />

      {/* ── Contact Hero ── */}
      <section className="inner-hero-section">
        <div className="inner-hero-bg">
          <Image
            src="/supreme-wide.jpg"
            alt="P&P Legal Consultants Chambers"
            fill
            sizes="100vw"
            priority
            className="inner-hero-img"
          />
          <div className="inner-hero-overlay" />
        </div>

        <div className="container inner-hero-content">
          <span className="subtitle-eyebrow">CHAMBERS CONTACT &amp; CONSULTATIONS</span>
          <h1 className="inner-hero-title">
            Direct Access to Counsel.<br />
            <span>Strict Confidentiality.</span>
          </h1>
          <p className="inner-hero-desc">
            Reach out to P&amp;P Legal Consultants for inquiries regarding court representation, cyber dispute resolution, legal drafting, and corporate commercial advisory.
          </p>
        </div>
      </section>

      {/* ── Contact Details & Form Section ── */}
      <section className="contact-page-main">
        <div className="container">
          <div className="contact-layout-grid">
            {/* Left Chambers Card */}
            <div className="contact-card-box">
              <span className="subtitle-eyebrow">NEW DELHI CHAMBERS</span>
              <h2 className="contact-title">Chambers Information</h2>
              <p className="contact-desc">
                Consultations are conducted by prior appointment at our Delhi chambers or via secure video conference for outstation and pan-India matters.
              </p>

              <div className="contact-channels-list">
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
                    <a href="tel:+918409949411" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                      +91-8409949411
                    </a>
                  </div>
                </div>

                <div className="contact-channel">
                  <span className="channel-icon">&#9742;</span>
                  <div className="channel-details">
                    <h4>General Enquiries</h4>
                    <a href="tel:+919472568264" style={{ fontSize: "1.05rem" }}>
                      +91-9472568264
                    </a>
                  </div>
                </div>

                <div className="contact-channel">
                  <span className="channel-icon">&#9993;</span>
                  <div className="channel-details">
                    <h4>Electronic Mail</h4>
                    <a href="mailto:info@pnplegalconsultants.com">
                      info@pnplegalconsultants.com
                    </a>
                    <span style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      For general enquiries and case correspondence
                    </span>
                  </div>
                </div>

                <div className="contact-channel">
                  <span className="channel-icon">&#9878;</span>
                  <div className="channel-details">
                    <h4>Primary Jurisdiction</h4>
                    <span style={{ color: "var(--ivory)", fontSize: "0.9rem" }}>
                      Supreme Court of India &bull; High Court of Delhi &bull; Pan-India matters where appropriate
                    </span>
                  </div>
                </div>
              </div>

              <div className="chambers-hours-note">
                <strong>Chambers Consultation Hours:</strong> Monday &ndash; Saturday, 10:00 AM &ndash; 7:30 PM IST (Prior appointment requested).
              </div>
            </div>

            {/* Right Consultation Form */}
            <div className="form-box-card">
              <span className="subtitle-eyebrow">CONFIDENTIAL TRANSMISSION</span>
              <h3 className="form-header-title">Request Legal Consultation</h3>
              <p className="form-header-sub">
                Share your matter details and Advocate Prashant Jha will review the applicable legal facts.
              </p>

              {submissionSuccess ? (
                <div className="form-alert-success">
                  <h4>Consultation Request Received</h4>
                  <p>{submissionSuccess}</p>
                  <button
                    onClick={() => setSubmissionSuccess(null)}
                    className="btn-gold"
                    style={{ marginTop: "1.25rem" }}
                    type="button"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-inner">
                  {errorMessage && (
                    <div className="form-alert-error">
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  <div className="form-field-wrap">
                    <label className="field-label" htmlFor="contactFullName">
                      Full Legal Name <span>*</span>
                    </label>
                    <input
                      id="contactFullName"
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
                      <label className="field-label" htmlFor="contactEmail">
                        Email Address <span>*</span>
                      </label>
                      <input
                        id="contactEmail"
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
                      <label className="field-label" htmlFor="contactPhone">
                        Phone Number <span>*</span>
                      </label>
                      <input
                        id="contactPhone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91-8409949411"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-field-wrap">
                    <label className="field-label" htmlFor="contactPracticeArea">
                      Relevant Legal Domain <span>*</span>
                    </label>
                    <select
                      id="contactPracticeArea"
                      name="practiceArea"
                      value={formData.practiceArea}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="Cyber Law & Cybercrime">Cyber Law &amp; Cybercrime (Fraud, Account Freeze, UPI)</option>
                      <option value="Corporate & Commercial Law">Corporate &amp; Commercial Law (Contracts, NDAs)</option>
                      <option value="Criminal Law & Bail">Criminal Law &amp; Bail Defence</option>
                      <option value="Civil Litigation">Civil Litigation (Property, Recovery, Injunctions)</option>
                      <option value="PMLA & Financial Crime">PMLA &amp; Financial Crime (ED, Attachment)</option>
                      <option value="Dispute Resolution & Arbitration">Dispute Resolution &amp; Arbitration</option>
                      <option value="Banking Disputes">Banking Disputes &amp; Account Lien</option>
                      <option value="Consumer & Service Disputes">Consumer &amp; Service Disputes</option>
                      <option value="Employment & Labour Law">Employment &amp; Labour Law</option>
                      <option value="Traffic Challan Matters">Traffic Challan &amp; Transport Matters</option>
                      <option value="Supreme Court SLP / Writ">Supreme Court SLP / Writ Petition</option>
                    </select>
                  </div>

                  <div className="form-field-wrap">
                    <label className="field-label" htmlFor="contactMessage">
                      Brief Matter Summary <span>*</span>
                    </label>
                    <textarea
                      id="contactMessage"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please summarize primary facts, dispute background, court/authority involved, and assistance required..."
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-disclaimer">
                    Privilege Notice: Receipt of communication does not immediately constitute an advocate-client relationship. All inquiries are maintained strictly confidential in adherence to Bar Council of India guidelines.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold"
                    style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                  >
                    {isSubmitting ? "Transmitting Confidential Inquiry..." : "Transmit Consultation Request \u2192"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
