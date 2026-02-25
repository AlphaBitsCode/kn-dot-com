import type { Config, Context } from "@netlify/functions";
import { Resend } from "resend";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { name?: string; email?: string; city?: string };

  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, email, city } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Reject +alias emails (only primary addresses allowed)
  const [localPart, domain] = email.toLowerCase().split("@");
  if (!domain) {
    return new Response(JSON.stringify({ error: "Invalid email address." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (localPart.includes("+")) {
    return new Response(JSON.stringify({ error: "Email aliases (e.g. you+alias@domain.com) are not accepted. Please use your primary email." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Reject disposable/temporary email domains
  const { default: disposableDomains } = await import("disposable-email-domains");
  if (disposableDomains.includes(domain)) {
    return new Response(JSON.stringify({ error: "Disposable or temporary email addresses are not accepted. Please use your primary email." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = Netlify.env.get("RESEND_API_KEY");
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Server configuration error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resend = new Resend(apiKey);

  const cityLabel = city === "danang" ? "Da Nang (April 2026)" : "Ho Chi Minh City (March 2026)";
  const displayName = name || "there";

  const confirmationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the list</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #111827; padding: 40px 48px; }
    .header h1 { margin: 0; color: #f59e0b; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
    .header p { margin: 6px 0 0; color: #9ca3af; font-size: 14px; }
    .body { padding: 40px 48px; }
    .body p { color: #374151; font-size: 16px; line-height: 1.7; margin: 0 0 16px; }
    .highlight { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 0 6px 6px 0; margin: 24px 0; }
    .highlight p { margin: 0; color: #92400e; font-size: 15px; font-weight: 500; }
    .detail { color: #6b7280; font-size: 14px; margin: 0; }
    .cta { display: inline-block; margin-top: 24px; background: #f59e0b; color: #111827; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 15px; }
    .footer { background: #f9fafb; padding: 24px 48px; border-top: 1px solid #e5e7eb; }
    .footer p { margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.6; }
    .footer a { color: #6b7280; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>You're on the waitlist ✓</h1>
      <p>AI Workshop for Solo Founders — Vietnam</p>
    </div>
    <div class="body">
      <p>Hi ${displayName},</p>
      <p>
        Thanks for signing up. You're now on the early-access waitlist for the
        <strong>AI Workshop for Solo Founders</strong> in Vietnam.
      </p>
      <div class="highlight">
        <p>📍 ${cityLabel}</p>
        <p class="detail" style="margin-top:6px;">9:30 AM – 12:00 PM · English · 30 seats only · Venue TBC</p>
      </div>
      <p>
        We'll email you the moment dates, venue, and early-bird pricing are confirmed.
        No spam — just the one announcement when it's ready.
      </p>
      <p>
        In the meantime, if you have any questions about the workshop format,
        tools we'll cover, or anything else — just hit reply.
      </p>
      <a href="https://www.kentnguyen.com/ai-workshop-for-founders" class="cta">View Workshop Details →</a>
    </div>
    <div class="footer">
      <p>
        You received this because you signed up at kentnguyen.com.<br />
        Questions? Reply to this email or reach out at
        <a href="mailto:kent@alphabits.team">kent@alphabits.team</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

  const ccHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Workshop Waitlist Signup</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 560px; margin: 32px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #111827; padding: 28px 36px; }
    .header h1 { margin: 0; color: #f59e0b; font-size: 18px; font-weight: 700; }
    .body { padding: 28px 36px; }
    .row { display: flex; margin-bottom: 12px; }
    .label { width: 100px; color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0; padding-top: 2px; }
    .value { color: #111827; font-size: 15px; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; }
    p { color: #6b7280; font-size: 13px; margin: 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🆕 New Workshop Waitlist Signup</h1>
    </div>
    <div class="body">
      <div class="row"><span class="label">Name</span><span class="value">${name || "—"}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${email}</span></div>
      <div class="row"><span class="label">City</span><span class="value">${cityLabel}</span></div>
      <hr class="divider" />
      <p>Submitted via kentnguyen.com · ${new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", dateStyle: "medium", timeStyle: "short" })} (ICT)</p>
    </div>
  </div>
</body>
</html>
`;

  try {
    const { error } = await resend.emails.send({
      from: "Kent Nguyen <kent@alphabits.team>",
      to: [email],
      cc: ["kent@alphabits.team"],
      subject: "You're on the waitlist — AI Workshop for Founders in Vietnam",
      html: confirmationHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config: Config = {
  path: "/api/workshop-notify",
};
