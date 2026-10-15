import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#080B10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "P&P Legal Consultants | Advocates & Legal Advisors — Supreme Court of India",
  description:
    "Legal guidance rooted in law, experience and a deep understanding of India. Strategic counsel and serious representation from Delhi to the Supreme Court of India.",
  keywords: [
    "P&P Legal Consultants",
    "Advocate Supreme Court of India",
    "Delhi High Court Advocate",
    "Litigation Lawyer Delhi",
    "Corporate & Commercial Legal Advisory",
    "Dispute Resolution Counsel India",
  ],
  authors: [{ name: "P&P Legal Consultants" }],
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "P&P Legal Consultants | Advocates & Legal Advisors",
    description:
      "Strategic counsel. Serious representation. Advocates at the Supreme Court of India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#080B10] text-[#F0E8D9] font-sans antialiased selection:bg-[#B99B62] selection:text-[#080B10]">
        {children}
      </body>
    </html>
  );
}
