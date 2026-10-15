import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // 1. Try Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/contact_inquiries?select=*&order=created_at.desc`, {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          cache: "no-store",
        });
        if (res.ok) {
          const supabaseInquiries = await res.json();
          return NextResponse.json({
            source: "supabase",
            total: supabaseInquiries.length,
            inquiries: supabaseInquiries,
          });
        }
      } catch (err) {
        console.warn("Supabase query fallback to file:", err);
      }
    }

    // 2. Check local data directory or /tmp for serverless
    const localPath = path.join(process.cwd(), "data", "inquiries.json");
    const tmpPath = "/tmp/inquiries.json";
    const targetPath = fs.existsSync(localPath) ? localPath : fs.existsSync(tmpPath) ? tmpPath : null;

    if (!targetPath) {
      return NextResponse.json({
        total: 0,
        inquiries: [],
        message: "No consultation inquiries recorded yet. Submissions from the contact form will appear here.",
      });
    }

    const fileContent = fs.readFileSync(targetPath, "utf8");
    const inquiries = JSON.parse(fileContent);

    return NextResponse.json({
      source: targetPath,
      total: Array.isArray(inquiries) ? inquiries.length : 0,
      inquiries,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not retrieve inquiries: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
