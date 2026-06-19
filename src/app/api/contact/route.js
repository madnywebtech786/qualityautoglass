import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function sanitize(value) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

function sanitizeArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v) => typeof v === "string")
    .map((v) => sanitize(v))
    .filter(Boolean);
}

function validate({ firstName, lastName, email, vehicle, serviceTypes, otherDetails, message }) {
  const errors = [];

  if (!firstName || firstName.length < 2)
    errors.push("First name must be at least 2 characters.");
  if (firstName && firstName.length > 60)
    errors.push("First name is too long.");

  if (!lastName || lastName.length < 2)
    errors.push("Last name must be at least 2 characters.");
  if (lastName && lastName.length > 60)
    errors.push("Last name is too long.");

  if (!email) {
    errors.push("Email address is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address.");
  } else if (email.length > 254) {
    errors.push("Email address is too long.");
  }

  if (!vehicle || vehicle.length < 3)
    errors.push("Vehicle year, make & model is required.");
  if (vehicle && vehicle.length > 120)
    errors.push("Vehicle info is too long.");

  if (!Array.isArray(serviceTypes))
    errors.push("Service types must be an array.");

  if (!Array.isArray(otherDetails))
    errors.push("Other details must be an array.");

  if (message && message.length > 2000)
    errors.push("Message must be under 2000 characters.");

  return errors;
}

const ALLOWED_SERVICE_TYPES = [
  "Windshield",
  "Front Vent Glass",
  "Front Door Glass",
  "Sunroof",
  "Rear Door Glass",
  "Rear Vent Glass",
  "Rear Quarter Glass",
  "Back Glass",
];

const ALLOWED_OTHER_DETAILS = [
  "Rain Sensor",
  "Heated Glass",
  "Lane Departure Warning",
  "Heads-Up Display",
];

function buildEmailHtml({ firstName, lastName, email, vehicle, serviceTypes, otherDetails, message }) {
  const fullName = `${firstName} ${lastName}`;
  const messageHtml = message
    ? message.replace(/\n/g, "<br>")
    : "<em style='color:#8494b2;'>No comments provided.</em>";

  const serviceList = serviceTypes.length
    ? serviceTypes.map((s) => `<span style="display:inline-block;font-size:12px;font-weight:700;color:#0a6af5;background:#e0f7ff;padding:3px 10px;border-radius:99px;margin:2px 3px 2px 0;">${s}</span>`).join("")
    : "<em style='color:#8494b2;'>None selected</em>";

  const otherList = otherDetails.length
    ? otherDetails.map((d) => `<span style="display:inline-block;font-size:12px;font-weight:600;color:#3a4568;background:#f4f7fc;padding:3px 10px;border-radius:99px;border:1px solid #dde4f0;margin:2px 3px 2px 0;">${d}</span>`).join("")
    : "<em style='color:#8494b2;'>None selected</em>";

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
                    <div>
                      <div style="display:inline-block;width:36px;height:36px;background:rgba(255,255,255,0.18);border-radius:10px;text-align:center;line-height:36px;vertical-align:middle;">
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

              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dde4f0;border-radius:12px;overflow:hidden;">

                <tr>
                  <td style="padding:14px 18px;background:#f4f7fc;border-bottom:1px solid #dde4f0;width:34%;">
                    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8494b2;">Name</span>
                  </td>
                  <td style="padding:14px 18px;border-bottom:1px solid #dde4f0;">
                    <span style="font-size:14.5px;font-weight:600;color:#0a0f1e;">${fullName}</span>
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
                    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8494b2;">Vehicle</span>
                  </td>
                  <td style="padding:14px 18px;border-bottom:1px solid #dde4f0;">
                    <span style="font-size:14.5px;font-weight:600;color:#0a0f1e;">${vehicle}</span>
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 18px;background:#f4f7fc;border-bottom:1px solid #dde4f0;vertical-align:top;">
                    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8494b2;">Service Type</span>
                  </td>
                  <td style="padding:12px 18px;border-bottom:1px solid #dde4f0;">
                    ${serviceList}
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 18px;background:#f4f7fc;border-bottom:1px solid #dde4f0;vertical-align:top;">
                    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8494b2;">Other Details</span>
                  </td>
                  <td style="padding:12px 18px;border-bottom:1px solid #dde4f0;">
                    ${otherList}
                  </td>
                </tr>

                <tr>
                  <td style="padding:14px 18px;background:#f4f7fc;vertical-align:top;">
                    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#8494b2;">Comments</span>
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
              <a href="mailto:${email}" style="display:inline-block;padding:12px 22px;background:#0a6af5;color:#fff;text-decoration:none;border-radius:10px;font-size:13.5px;font-weight:700;">
                Reply to ${firstName}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 36px;background:#f4f7fc;border-top:1px solid #dde4f0;">
              <p style="margin:0;font-size:11.5px;color:#8494b2;">
                Sent from the contact form at
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

function buildEmailText({ firstName, lastName, email, vehicle, serviceTypes, otherDetails, message }) {
  return [
    "NEW CONTACT FORM SUBMISSION — qualityautoglass.ca",
    "─".repeat(48),
    `Name:          ${firstName} ${lastName}`,
    `Email:         ${email}`,
    `Vehicle:       ${vehicle}`,
    `Service Types: ${serviceTypes.length ? serviceTypes.join(", ") : "None selected"}`,
    `Other Details: ${otherDetails.length ? otherDetails.join(", ") : "None selected"}`,
    "",
    "Comments:",
    message || "(none)",
    "─".repeat(48),
    `Submitted: ${new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton" })}`,
  ].join("\n");
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const firstName    = sanitize(body.firstName);
  const lastName     = sanitize(body.lastName);
  const email        = sanitize(body.email);
  const vehicle      = sanitize(body.vehicle);
  const serviceTypes = sanitizeArray(body.serviceTypes).filter((v) => ALLOWED_SERVICE_TYPES.includes(v));
  const otherDetails = sanitizeArray(body.otherDetails).filter((v) => ALLOWED_OTHER_DETAILS.includes(v));
  const message      = sanitize(body.message);

  const errors = validate({ firstName, lastName, email, vehicle, serviceTypes, otherDetails, message });
  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0], errors }, { status: 422 });
  }

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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPassword },
  });

  const serviceLabel = serviceTypes.length
    ? serviceTypes.join(", ")
    : "General inquiry";

  try {
    await transporter.sendMail({
      from: `"Quality Auto Glass Website" <${gmailUser}>`,
      to: toEmail,
      replyTo: `"${firstName} ${lastName}" <${email}>`,
      subject: `New inquiry: ${serviceLabel} — ${firstName} ${lastName}`,
      text: buildEmailText({ firstName, lastName, email, vehicle, serviceTypes, otherDetails, message }),
      html: buildEmailHtml({ firstName, lastName, email, vehicle, serviceTypes, otherDetails, message }),
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
