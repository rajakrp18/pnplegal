import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  practiceArea: string;
  message: string;
  status: "new" | "contacted" | "archived";
  createdAt: string;
  userAgent?: string;
  ip?: string;
}

// Helper to generate a luxury HTML email for legal consultations
function generateConsultationEmailHtml(inquiry: ContactInquiry): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080B10; color: #F0E8D9; margin: 0; padding: 24px; }
    .card { background-color: #111923; border: 1px solid #B99B62; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #16202D 0%, #0D131C 100%); padding: 24px 30px; border-bottom: 2px solid #B99B62; text-align: left; }
    .brand { font-size: 20px; font-weight: bold; letter-spacing: 2px; color: #F0E8D9; margin: 0; }
    .brand span { color: #B99B62; }
    .badge { display: inline-block; background: rgba(185, 155, 98, 0.2); border: 1px solid #B99B62; color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 4px; margin-top: 8px; }
    .body { padding: 30px; }
    .title { font-size: 18px; color: #D4AF37; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid rgba(185, 155, 98, 0.2); padding-bottom: 10px; }
    .row { margin-bottom: 16px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #858A90; margin-bottom: 4px; }
    .value { font-size: 15px; color: #FFFFFF; font-weight: 500; }
    .value a { color: #D4AF37; text-decoration: none; }
    .message-box { background: rgba(8, 11, 16, 0.6); border: 1px solid rgba(185, 155, 98, 0.3); border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #F0E8D9; white-space: pre-wrap; margin-top: 6px; }
    .footer { background: #080B10; padding: 16px 30px; font-size: 12px; color: #858A90; border-top: 1px solid rgba(185, 155, 98, 0.15); text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">P&P <span>LEGAL</span> CONSULTANTS</div>
      <div class="badge">New Client Consultation Inquiry</div>
    </div>
    <div class="body">
      <h3 class="title">Client Details &amp; Legal Matter</h3>
      
      <div class="row">
        <div class="label">Reference ID</div>
        <div class="value" style="font-family: monospace; color: #B99B62;">${inquiry.id}</div>
      </div>

      <div class="row">
        <div class="label">Client Full Name</div>
        <div class="value">${inquiry.fullName}</div>
      </div>

      <div class="row">
        <div class="label">Phone / WhatsApp</div>
        <div class="value">
          ${inquiry.phone ? `<a href="tel:${inquiry.phone}">${inquiry.phone}</a>` : '<span style="color:#858A90;">Not provided</span>'}
        </div>
      </div>

      <div class="row">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
      </div>

      <div class="row">
        <div class="label">Practice Area / Consultation Subject</div>
        <div class="value" style="color: #D4AF37;">${inquiry.practiceArea}</div>
      </div>

      <div class="row">
        <div class="label">Case Description / Client Message</div>
        <div class="message-box">${inquiry.message}</div>
      </div>

      <div class="row" style="margin-top: 24px; font-size: 12px; color: #858A90;">
        Received at: ${new Date(inquiry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
      </div>
    </div>
    <div class="footer">
      P&P Legal Consultants &bull; Advocate Prashant Jha &bull; Supreme Court of India &bull; Chambers Dispatch
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, practiceArea, message } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a brief description of your inquiry." },
        { status: 400 }
      );
    }

    const inquiryId = `PNP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: ContactInquiry = {
      id: inquiryId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : undefined,
      practiceArea: practiceArea || "General Advisory",
      message: message.trim(),
      status: "new",
      createdAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || undefined,
      ip: req.headers.get("x-forwarded-for") || undefined,
    };

    // Tracking delivery channels
    const deliveryReport: {
      emailSent: boolean;
      discordSent: boolean;
      telegramSent: boolean;
      supabaseSaved: boolean;
      localSaved: boolean;
    } = {
      emailSent: false,
      discordSent: false,
      telegramSent: false,
      supabaseSaved: false,
      localSaved: false,
    };

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "pnplegalconsultants@gmail.com";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : undefined;
    const resendKey = process.env.RESEND_API_KEY;

    const emailSubject = `⚖️ New Legal Consultation Request: ${newInquiry.fullName} [${newInquiry.practiceArea}]`;
    const emailHtml = generateConsultationEmailHtml(newInquiry);

    // ─────────────────────────────────────────────────────────────
    // 1. DIRECT EMAIL: Via SMTP / Gmail App Password
    // ─────────────────────────────────────────────────────────────
    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
        });

        await transporter.sendMail({
          from: `"P&P Legal Consultants" <${smtpUser}>`,
          to: receiverEmail,
          cc: receiverEmail !== "rajpoddar8907@gmail.com" ? "rajpoddar8907@gmail.com" : undefined,
          replyTo: newInquiry.email,
          subject: emailSubject,
          html: emailHtml,
        });

        deliveryReport.emailSent = true;
        console.log("Inquiry email dispatched successfully via Gmail SMTP to:", receiverEmail);
      } catch (smtpErr) {
        console.error("SMTP Nodemailer error:", smtpErr);
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 2. DIRECT EMAIL: Via Resend API (Alternative / Vercel Edge)
    // ─────────────────────────────────────────────────────────────
    if (!deliveryReport.emailSent && resendKey) {
      try {
        let resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "P&P Legal Inquiries <onboarding@resend.dev>",
            to: [receiverEmail],
            reply_to: newInquiry.email,
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        // If Resend returns 403 (unverified domain in sandbox), retry to verified account owner
        if (!resendRes.ok && resendRes.status === 403) {
          console.warn("Resend sandbox restriction: retrying to rajpoddar8907@gmail.com...");
          resendRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "P&P Legal Inquiries <onboarding@resend.dev>",
              to: ["rajpoddar8907@gmail.com"],
              reply_to: newInquiry.email,
              subject: emailSubject,
              html: emailHtml,
            }),
          });
        }

        if (resendRes.ok) {
          deliveryReport.emailSent = true;
          console.log("Inquiry email dispatched successfully via Resend.");
        } else {
          const errData = await resendRes.text();
          console.warn("Resend email delivery notice:", errData);
        }
      } catch (resendErr) {
        console.error("Resend API error:", resendErr);
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 3. INSTANT MOBILE PUSH: Discord Webhook
    // ─────────────────────────────────────────────────────────────
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        const discordRes = await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `🔔 **New Legal Inquiry Received** for Advocate Prashant Jha!`,
            embeds: [
              {
                title: "⚖️ P&P Legal Consultants — Consultation Request",
                color: 0xb99b62,
                fields: [
                  { name: "Client Name", value: newInquiry.fullName, inline: true },
                  { name: "Phone", value: newInquiry.phone || "Not provided", inline: true },
                  { name: "Email", value: newInquiry.email, inline: true },
                  { name: "Practice Area", value: newInquiry.practiceArea, inline: true },
                  { name: "Reference ID", value: newInquiry.id, inline: true },
                  { name: "Message / Case Brief", value: newInquiry.message },
                ],
                footer: { text: "P&P Legal Website Notification" },
                timestamp: newInquiry.createdAt,
              },
            ],
          }),
        });
        if (discordRes.ok) {
          deliveryReport.discordSent = true;
        }
      } catch (discordErr) {
        console.error("Discord webhook dispatch error:", discordErr);
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 4. INSTANT MOBILE PUSH: Telegram Bot
    // ─────────────────────────────────────────────────────────────
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const tgText = `⚖️ *New Legal Consultation Request*\n\n` +
          `👤 *Name:* ${newInquiry.fullName}\n` +
          `📞 *Phone:* ${newInquiry.phone || "Not provided"}\n` +
          `📧 *Email:* ${newInquiry.email}\n` +
          `📂 *Practice Area:* ${newInquiry.practiceArea}\n` +
          `🆔 *Reference:* \`${newInquiry.id}\`\n\n` +
          `📝 *Case Details:*\n${newInquiry.message}`;

        const tgRes = await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: tgText,
              parse_mode: "Markdown",
            }),
          }
        );
        if (tgRes.ok) {
          deliveryReport.telegramSent = true;
        }
      } catch (tgErr) {
        console.error("Telegram bot dispatch error:", tgErr);
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 5. EXTERNAL FORWARDING: Formspree / Webhook Relay
    // ─────────────────────────────────────────────────────────────
    if (process.env.FORMSPREE_ENDPOINT) {
      try {
        await fetch(process.env.FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newInquiry),
        });
      } catch (formspreeErr) {
        console.error("Formspree forward error:", formspreeErr);
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 6. DATABASE: Supabase Integration
    // ─────────────────────────────────────────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/contact_inquiries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            id: newInquiry.id,
            name: newInquiry.fullName,
            email: newInquiry.email,
            phone: newInquiry.phone || null,
            practice_area: newInquiry.practiceArea,
            message: newInquiry.message,
            status: newInquiry.status,
            created_at: newInquiry.createdAt,
          }),
        });
        if (response.ok) {
          deliveryReport.supabaseSaved = true;
        }
      } catch (sbErr) {
        console.error("Supabase storage notice:", sbErr);
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 7. FILE STORAGE: Local & Serverless /tmp Fallback
    // ─────────────────────────────────────────────────────────────
    try {
      // First try standard data directory
      const localDataDir = path.join(process.cwd(), "data");
      const targetDir = fs.existsSync(localDataDir) || !process.env.VERCEL
        ? localDataDir
        : "/tmp";

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const dataFilePath = path.join(targetDir, "inquiries.json");
      let inquiries: ContactInquiry[] = [];
      if (fs.existsSync(dataFilePath)) {
        try {
          const content = fs.readFileSync(dataFilePath, "utf8");
          inquiries = JSON.parse(content);
        } catch {
          inquiries = [];
        }
      }
      inquiries.unshift(newInquiry);
      fs.writeFileSync(dataFilePath, JSON.stringify(inquiries, null, 2), "utf8");
      deliveryReport.localSaved = true;
    } catch (fsErr) {
      console.warn("Local storage write notice (safe in serverless):", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been securely recorded. Our chamber will review your matter with utmost discretion.",
      inquiryId: newInquiry.id,
      delivery: deliveryReport,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your inquiry. Please try again or reach out directly by phone." },
      { status: 500 }
    );
  }
}
