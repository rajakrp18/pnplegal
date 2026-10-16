"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-brand-row">
              <Image
                src="/pnplegallogo.png"
                alt="P&P Legal Consultants"
                width={50}
                height={50}
                style={{ objectFit: "contain", height: "42px", width: "auto" }}
              />
              <div className="nav-brand-text">
                <span className="nav-brand-title footer-brand-title">
                  P&P <span>LEGAL</span>
                </span>
                <span className="nav-brand-sub footer-brand-sub">CONSULTANTS</span>
              </div>
            </Link>

            <p className="footer-tagline">
              Delhi-based legal practice with a focus on legal analysis, documentation, dispute resolution and litigation-related work.
            </p>

            <div className="footer-meta-pill">
              Advocates &bull; Supreme Court of India &bull; Delhi High Court &bull; Tribunals
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="footer-col-title">Core Practice Areas</h4>
            <ul className="footer-links-list">
              <li><Link href="/practice-areas#cyber">Cyber Law &amp; Cybercrime</Link></li>
              <li><Link href="/practice-areas#corporate">Corporate &amp; Commercial Law</Link></li>
              <li><Link href="/practice-areas#criminal">Criminal Law &amp; Bail Defence</Link></li>
              <li><Link href="/practice-areas#civil">Civil Litigation &amp; Injunctions</Link></li>
              <li><Link href="/practice-areas#pmla">PMLA &amp; Financial Crime</Link></li>
              <li><Link href="/practice-areas#dispute">Dispute Resolution &amp; Arbitration</Link></li>
              <li><Link href="/practice-areas#banking">Banking &amp; Account Lien Disputes</Link></li>
            </ul>
          </div>

          {/* Quick Links & Services */}
          <div>
            <h4 className="footer-col-title">Navigation &amp; Services</h4>
            <ul className="footer-links-list">
              <li><Link href="/about">About P&amp;P Legal</Link></li>
              <li><Link href="/services">Our Legal Services</Link></li>
              <li><Link href="/#counsel">Advocate Prashant Jha</Link></li>
              <li><Link href="/blog">Legal Insights &amp; Articles</Link></li>
              <li><Link href="/contact">Chambers Office &amp; Contact</Link></li>
              <li><Link href="/services#drafting">Legal Drafting &amp; Notices</Link></li>
              <li><Link href="/services#traffic">Traffic Challan Matters</Link></li>
            </ul>
          </div>

          {/* Chambers Contact Info */}
          <div>
            <h4 className="footer-col-title">Chambers Contact</h4>
            <ul className="footer-links-list">
              <li className="footer-address-text">
                <strong>Office Address:</strong><br />
                D-20, Nawada Housing Complex, Vipin Garden, Dwarka Mor, New Delhi, Delhi, India.
              </li>
              <li style={{ marginTop: "0.5rem" }}>
                <strong>Direct Chambers:</strong><br />
                <a href="tel:+918409949411">+91-8409949411</a>
              </li>
              <li>
                <strong>General Enquiries:</strong><br />
                <a href="tel:+919472568264">+91-9472568264</a>
              </li>
              <li style={{ marginTop: "0.5rem" }}>
                <strong>Email:</strong><br />
                <a href="mailto:info@pnplegalconsultants.com">info@pnplegalconsultants.com</a>
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
            advice or formal legal opinion.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <span>&copy; {new Date().getFullYear()} P&amp;P Legal Consultants &bull; Adv. Prashant Jha. All rights reserved.</span>
          <div className="footer-legal-links">
            <span>Supreme Court of India &bull; Delhi High Court</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
