import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, practice, phone, email, message } = body;

    // Validate required fields
    if (!name || !practice || !phone || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"NoShowZero Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `🦷 New Demo Request — ${practice}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; background: #0D1B2A; color: #F0F4F8; padding: 32px; border-radius: 12px;">
          <h2 style="color: #00C2A8; margin-bottom: 24px; font-size: 22px;">
            New Demo Request — NoShowZero
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #8CA0B5; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #F0F4F8; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8CA0B5; vertical-align: top;">Practice</td>
              <td style="padding: 10px 0; color: #F0F4F8; font-weight: 600;">${practice}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8CA0B5; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; color: #F0F4F8;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8CA0B5; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; color: #00C2A8;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8CA0B5; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #F0F4F8; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>

          <div style="margin-top: 32px; padding: 16px; background: #132236; border-radius: 8px; border-left: 3px solid #00C2A8;">
            <p style="color: #8CA0B5; font-size: 13px; margin: 0;">
              Reply directly to this email to contact ${name} at ${email}
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
