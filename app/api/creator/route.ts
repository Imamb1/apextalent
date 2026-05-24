import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { firstName, youtube, instagram, tiktok, reason } = await req.json();

    if (!firstName || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const row = (label: string, value: string) =>
      value
        ? `<tr>
            <td style="padding:12px 0;border-bottom:1px solid #eee;color:#666;font-size:12px;width:140px;vertical-align:top;">${label}</td>
            <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;">
              <a href="${value}" style="color:#090909;">${value}</a>
            </td>
          </tr>`
        : "";

    await resend.emails.send({
      from:    "Apex Talent Group <onboarding@resend.dev>",
      to:      ["imam@apextalentgrp.com"],
      subject: `New Creator Application: ${firstName}`,
      html: `
        <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:580px;margin:0 auto;background:#f9f9f9;border:1px solid #e5e5e5;">
          <div style="background:#090909;padding:28px 32px;">
            <p style="color:#E8FF00;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 6px;">Apex Talent Group</p>
            <p style="color:rgba(242,240,236,0.5);font-size:12px;margin:0;">New Creator Application</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eee;color:#666;font-size:12px;width:140px;vertical-align:top;">First Name</td>
                <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;font-weight:600;">${firstName}</td>
              </tr>
              ${row("YouTube", youtube)}
              ${row("Instagram", instagram)}
              ${row("TikTok", tiktok)}
              <tr>
                <td style="padding:12px 0;color:#666;font-size:12px;vertical-align:top;">Message</td>
                <td style="padding:12px 0;font-size:14px;line-height:1.7;color:#333;">
                  ${reason.replace(/\n/g, "<br>")}
                </td>
              </tr>
            </table>
          </div>
          <div style="background:#f0f0ee;padding:16px 32px;border-top:1px solid #e5e5e5;">
            <p style="margin:0;font-size:11px;color:#999;">Sent from apextalentgrp.com creator application form</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Creator form error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
