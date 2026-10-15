import Link from "next/link";

export const metadata = {
  title: "P&P Legal Consultants | Professional Legal Advice",
  description: "Secure your future with P&P Legal Consultants.",
};

export default function ConceptLight() {
  return (
    <div className="light-mode">
      <nav className="light-nav">
        <div className="light-logo">P&P<span>LEGAL</span></div>
        <div className="light-nav-links">
          <Link href="#">Practice Areas</Link>
          <Link href="#">Our Team</Link>
          <Link href="#">Case Results</Link>
        </div>
        <Link href="#" className="light-btn-primary">Contact Us</Link>
      </nav>

      <main className="light-hero">
        <div className="light-hero-content">
          <span className="light-badge">Decades of Experience</span>
          <h1 className="light-hero-title">
            Protecting Your Rights,<br />
            <span>Securing Your Future.</span>
          </h1>
          <p className="light-hero-desc">
            Navigating the legal system can be overwhelming. Let our team of experienced attorneys provide the clear guidance and aggressive representation you need.
          </p>
          <Link href="#" className="light-btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>View Practice Areas</Link>
        </div>

        <div className="light-form-container">
          <h3>Get a Free Case Review</h3>
          <form>
            <input type="text" placeholder="Full Name" className="light-input" />
            <input type="email" placeholder="Email Address" className="light-input" />
            <input type="text" placeholder="Briefly describe your case..." className="light-input" style={{ height: '80px' }} />
            <button type="submit" className="light-btn-submit">Submit Request</button>
          </form>
        </div>
      </main>
    </div>
  );
}
