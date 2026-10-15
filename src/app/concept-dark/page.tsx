import Link from "next/link";

export const metadata = {
  title: "P&P Legal Consultants | Modern Authority",
  description: "Get a free consultation for your legal issues today.",
};

export default function ConceptDark() {
  return (
    <div className="dark-mode">
      <nav className="dark-nav">
        <div className="dark-logo">P&P LEGAL</div>
        <div className="dark-nav-links">
          <Link href="#">Practice Areas</Link>
          <Link href="#">Our Team</Link>
          <Link href="#">Case Results</Link>
        </div>
        <Link href="#" className="dark-btn-primary">Free Consultation</Link>
      </nav>

      <main className="dark-hero">
        <div className="dark-glow"></div>
        
        <div className="dark-hero-content">
          <span className="dark-badge">Top Rated Law Firm</span>
          <h1 className="dark-hero-title">
            Relentless Advocacy.<br />
            <span>Unmatched Results.</span>
          </h1>
          <p className="dark-hero-desc">
            We specialize in complex corporate and family law. When your future is on the line, trust the experts at P&P Legal Consultants to fight for you.
          </p>
          <Link href="#" className="dark-btn-primary">Learn More About Us</Link>
        </div>

        <div className="dark-glass-form">
          <h3>Request a Consultation</h3>
          <form>
            <input type="text" placeholder="Full Name" className="dark-input" />
            <input type="email" placeholder="Email Address" className="dark-input" />
            <input type="tel" placeholder="Phone Number" className="dark-input" />
            <button type="submit" className="dark-btn-submit">Get Started</button>
          </form>
        </div>
      </main>
    </div>
  );
}
