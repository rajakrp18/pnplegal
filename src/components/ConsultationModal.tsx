"use client";

import React, { useState } from "react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPractice?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  defaultPractice = "Cyber Law & Cybercrime",
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    practiceArea: defaultPractice,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

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
        "Your consultation request has been securely delivered to Chambers of Advocate Prashant Jha. We will contact you shortly."
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please call Chambers directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content-panel">
        <button
          onClick={onClose}
          className="modal-close-btn"
          type="button"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="modal-header-wrap">
          <span className="subtitle-eyebrow">CHAMBERS OF ADVOCATE PRASHANT JHA</span>
          <h3 className="modal-title">Schedule Legal Consultation</h3>
        </div>
        <p className="modal-sub">
          Please provide a brief summary of the matter. We will review facts, applicable jurisdiction and procedural options.
        </p>

        {submissionSuccess ? (
          <div className="form-alert-success" style={{ margin: "2rem 0" }}>
            <h4>Inquiry Received</h4>
            <p>{submissionSuccess}</p>
            <button
              onClick={() => {
                setSubmissionSuccess(null);
                onClose();
              }}
              className="btn-gold"
              style={{ marginTop: "1rem" }}
              type="button"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form-grid">
            {errorMessage && (
              <div className="form-alert-error">
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="form-row-2col">
              <div className="form-field-wrap">
                <label className="field-label" htmlFor="modalFullName">
                  Full Legal Name <span>*</span>
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

              <div className="form-field-wrap">
                <label className="field-label" htmlFor="modalPhone">
                  Phone Number <span>*</span>
                </label>
                <input
                  id="modalPhone"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 XXXXX"
                  className="form-input"
                />
              </div>
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
                <label className="field-label" htmlFor="modalPractice">
                  Relevant Legal Category <span>*</span>
                </label>
                <select
                  id="modalPractice"
                  name="practiceArea"
                  value={formData.practiceArea}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Cyber Law & Cybercrime">Cyber Law &amp; Cybercrime (Fraud, Account Freeze, UPI)</option>
                  <option value="Corporate & Commercial Law">Corporate &amp; Commercial Law (Contracts, NDAs)</option>
                  <option value="Criminal Law & Bail">Criminal Law &amp; Bail-Related Proceedings</option>
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
            </div>

            <div className="form-field-wrap">
              <label className="field-label" htmlFor="modalMessage">
                Brief Matter Summary <span>*</span>
              </label>
              <textarea
                id="modalMessage"
                name="message"
                rows={2}
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Briefly state facts, court/authority involved, and assistance required..."
                className="form-textarea"
              />
            </div>

            <div className="form-disclaimer">
              Confidentiality guaranteed. All communications remain subject to advocate-client privilege upon formal engagement in accordance with Bar Council of India standards.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold"
              style={{ width: "100%", marginTop: "0.25rem" }}
            >
              {isSubmitting ? "Transmitting..." : "Send Confidential Request \u2192"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
