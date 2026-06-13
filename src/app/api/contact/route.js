import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Sanitize: strip HTML tags and trim
function sanitize(value) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

// ── Validate fields, return array of error strings
function validate({ name, email, phone, service, message }) {
  const errors = [];

  if (!name || name.length < 2)
    errors.push("Name must be at least 2 characters.");
  if (name && name.length > 100)
    errors.push("Name must be under 100 characters.");

  if (!email) {
    errors.push("Email address is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  } else if (email.length > 254) {
    errors.push("Email address is too long.");
  }

  if (phone && phone.length > 30)
    errors.push("Phone number is too long.");
  if (phone && !/^[\d\s\-\+\(\)\.]+$/.test(phone))
    errors.push("Phone number contains invalid characters.");

  if (message && message.length > 2000)
    errors.push("Message must be under 2000 characters.");

  return errors;
}

// ── Service label map
const SERVICE_LABELS = {
  "windshield-replacement": "Windshield Replacement",
  "rock-chip-repair": "Rock Chip Repair",
  "glass-tinting": "Glass Tinting",
  "adas-calibration": "ADAS Calibration",
  "unsure": "Not sure — needs assessment",
};

// ── HTML email template
function buildEmailHtml({ name, email, phone, service, message }) {
  const serviceLabel = SERVICE_LABELS[service] || service || "Not specified";
  const messageHtml = message
    ? message.replace(/\n/g, "<br>")
    : "<em style='color:#8494b2;'>No message provided.</em>";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fc;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #dde4f0;box-shadow:0 4px 24px rgba(10,20,80,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:#0a6af5;padding:28px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-flex;align-items:center;gap:10px;">
                      <div style="width:36px;height:36px;background:rgba(255,255,255,0.18);border-radius:10px;display:inline-block;vertical-align:middle;text-align:center;line-height:36px;">
                        <span style="color:#fff;font-size:18px;font-weight:700;">Q</span>
                      </div>
                      <span style="color:#fff;font-size:17px;font-weight:700;letter-spacing:-0.02em;vertical-align:middle;margin-left:10px;">Quality Auto Glass Ltd</span>
                    </div>
                    <p style="color:rgba(255,255,255,0.75);font-size:12px;margin:8px 0 0;letter-spacing:0.12em;text-transform:uppercase;">New Website Inquiry</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px 8px;">
              <p style="margin:0 0 24px;font-size:15px;color:#3a4568;line-height:1.6;">
                You have a new contact form submission from your website. Details below.
              </p>

              <!-- Fields -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dde4f0;border-radius:12px;overflow:hidden;">

                <tr>
                  <td style="padding:14px 18px;background:#f4f7fc;border-bottom:1px solid #dde4f0;width:34%;">
                    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8494b2;">Full Name</span>
                  </td>
                  <td style="padding:14px 18px;border-bottom:1px solid #dde4f0;">
                    <span style="font-size:14.5px;font-weight:600;color:#0a0f1e;">${name}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 18px;background:#f4f7fc;border-bottom:1px solid #dde4f0;">
                    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8494b2;">Email</span>
                  </td>
                  <td style="padding:14px 18px;border-bottom:1px solid #dde4f0;">
                    <a href="mailto:${email}" style="font-size:14.5px;font-weight:600;color:#0a6af5;text-decoration:none;">${email}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 18px;background:#f4f7fc;border-bottom:1px solid #dde4f0;">
                    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8494b2;">Phone</span>
                  </td>
                  <td style="padding:14px 18px;border-bottom:1px solid #dde4f0;">
                    ${phone
                      ? `<a href="tel:${phone.replace(/\s/g, "")}" style="font-size:14.5px;font-weight:600;color:#0a6af5;text-decoration:none;">${phone}</a>`
                      : `<span style="font-size:14px;color:#8494b2;font-style:italic;">Not provided</span>`
                    }
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 18px;background:#f4f7fc;border-bottom:1px solid #dde4f0;">
                    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8494b2;">Service</span>
                  </td>
                  <td style="padding:14px 18px;border-bottom:1px solid #dde4f0;">
                    <span style="display:inline-block;font-size:12px;font-weight:700;color:#0a6af5;background:#e0f7ff;padding:3px 12px;border-radius:99px;">${serviceLabel}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 18px;background:#f4f7fc;vertical-align:top;">
                    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8494b2;">Message</span>
                  </td>
                  <td style="padding:14px 18px;">
                    <span style="font-size:14px;color:#3a4568;line-height:1.7;">${messageHtml}</span>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:28px 36px 36px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="mailto:${email}" style="display:inline-block;padding:12px 22px;background:#0a6af5;color:#fff;text-decoration:none;border-radius:10px;font-size:13.5px;font-weight:700;">
                      Reply to ${name.split(" ")[0]}
                    </a>
                  </td>
                  ${phone ? `
                  <td>
                    <a href="tel:${phone.replace(/\s/g, "")}" style="display:inline-block;padding:12px 22px;background:#f4f7fc;color:#0a6af5;text-decoration:none;border-radius:10px;font-size:13.5px;font-weight:700;border:1px solid #dde4f0;">
                      Call ${name.split(" ")[0]}
                    </a>
                  </td>` : ""}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 36px;background:#f4f7fc;border-top:1px solid #dde4f0;">
              <p style="margin:0;font-size:11.5px;color:#8494b2;">
                This email was sent from the contact form at
                <a href="https://qualityautoglass.ca" style="color:#0a6af5;text-decoration:none;">qualityautoglass.ca</a>.
                Submitted on ${new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton", dateStyle: "full", timeStyle: "short" })}.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Plain-text fallback
function buildEmailText({ name, email, phone, service, message }) {
  const serviceLabel = SERVICE_LABELS[service] || service || "Not specified";
  return [
    "NEW CONTACT FORM SUBMISSION — qualityautoglass.ca",
    "─".repeat(48),
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || "Not provided"}`,
    `Service: ${serviceLabel}`,
    "",
    "Message:",
    message || "(none)",
    "─".repeat(48),
    `Submitted: ${new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton" })}`,
  ].join("\n");
}

// ── Route handler
export async function POST(req) {
  // Parse body
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Sanitize all fields
  const name    = sanitize(body.name);
  const email   = sanitize(body.email);
  const phone   = sanitize(body.phone);
  const service = sanitize(body.service);
  const message = sanitize(body.message);

  // Validate
  const errors = validate({ name, email, phone, service, message });
  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0], errors }, { status: 422 });
  }

  // Check env vars
  const gmailUser     = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  const toEmail       = process.env.CONTACT_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailPassword) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars.");
    return NextResponse.json(
      { error: "Server email configuration is missing. Please contact us by phone." },
      { status: 500 }
    );
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });

  const serviceLabel = SERVICE_LABELS[service] || service || "General inquiry";

  try {
    await transporter.sendMail({
      from: `"Quality Auto Glass Website" <${gmailUser}>`,
      to: toEmail,
      replyTo: `"${name}" <${email}>`,
      subject: `New inquiry: ${serviceLabel} — ${name}`,
      text: buildEmailText({ name, email, phone, service, message }),
      html: buildEmailHtml({ name, email, phone, service, message }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please call us at 403 354 4422." },
      { status: 500 }
    );
  }
}
