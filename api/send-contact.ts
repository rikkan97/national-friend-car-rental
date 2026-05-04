import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "National Friend <onboarding@resend.dev>";
const OWNER_EMAIL = process.env.TO_EMAIL || "info@national-friend.gr";
const COMPANY_PHONE = "+30 25930-52877";
const COMPANY_MOBILE = "+30 697 4930 719";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  countryLabel?: string;
  message?: string;
  lang?: "el" | "en";
}

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ═══════════════════════════════════════════════════════
//  OWNER NOTIFICATION — always in Greek
// ═══════════════════════════════════════════════════════
function ownerHtml(d: ContactPayload): string {
  const langLabel = d.lang === "en" ? "English" : "Ελληνικά";
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111">
      <div style="background:#d97706;color:#fff;padding:22px 28px;border-radius:10px 10px 0 0">
        <h1 style="margin:0;font-size:22px">Νέο Μήνυμα Επικοινωνίας</h1>
        <p style="margin:4px 0 0;opacity:.9;font-size:13px">National Friend Car Rental</p>
      </div>
      <div style="border:1px solid #fde68a;border-top:0;padding:26px;border-radius:0 0 10px 10px;background:#fffdf7">
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
          <tr><td style="padding:6px 0;color:#6b7280;width:140px">Όνομα:</td><td><strong>${esc(d.name)}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Email:</td><td><a href="mailto:${esc(d.email)}" style="color:#d97706">${esc(d.email)}</a></td></tr>
          ${d.phone ? `<tr><td style="padding:6px 0;color:#6b7280">Τηλέφωνο:</td><td><a href="tel:${esc(d.phone)}" style="color:#d97706">${esc(d.phone)}</a></td></tr>` : ""}
          ${d.countryLabel ? `<tr><td style="padding:6px 0;color:#6b7280">Χώρα:</td><td>${esc(d.countryLabel)}</td></tr>` : ""}
          <tr><td style="padding:6px 0;color:#6b7280">Γλώσσα πελάτη:</td><td>${langLabel}</td></tr>
        </table>

        <h2 style="font-size:14px;color:#b45309;margin:0 0 12px;letter-spacing:1px;text-transform:uppercase">Μήνυμα</h2>
        <p style="background:#fff;border:1px solid #fde68a;padding:16px;border-radius:6px;margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(d.message)}</p>
      </div>
    </div>
  `;
}

// Customer email language: Greek for GR/CY, English otherwise. Falls back to UI lang if no country.
function customerIsEl(d: ContactPayload): boolean {
  if (d.country === "GR" || d.country === "CY") return true;
  if (d.country) return false;
  return d.lang !== "en";
}

// ═══════════════════════════════════════════════════════
//  CUSTOMER CONFIRMATION — in customer's language
// ═══════════════════════════════════════════════════════
function customerHtml(d: ContactPayload): string {
  const el = customerIsEl(d);
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111">
      <div style="background:#d97706;color:#fff;padding:22px 28px;border-radius:10px 10px 0 0">
        <h1 style="margin:0;font-size:22px">${el ? "Λάβαμε το μήνυμά σας" : "We received your message"}</h1>
        <p style="margin:4px 0 0;opacity:.9;font-size:13px">National Friend Car Rental</p>
      </div>
      <div style="border:1px solid #fde68a;border-top:0;padding:26px;border-radius:0 0 10px 10px;background:#fffdf7">
        <p style="font-size:15px;margin:0 0 14px">
          ${el
            ? `Γεια σας <strong>${esc(d.name)}</strong>,`
            : `Hello <strong>${esc(d.name)}</strong>,`}
        </p>
        <p style="font-size:14px;line-height:1.6;margin:0 0 20px">
          ${el
            ? "Ευχαριστούμε που επικοινωνήσατε μαζί μας. Το μήνυμά σας έφτασε με επιτυχία και θα σας απαντήσουμε το συντομότερο δυνατό."
            : "Thanks for reaching out. We've received your message and will reply as soon as possible."}
        </p>

        <h2 style="font-size:12px;color:#b45309;margin:0 0 10px;letter-spacing:1.5px;text-transform:uppercase">
          ${el ? "Το μήνυμά σας" : "Your message"}
        </h2>
        <p style="background:#fff;border:1px solid #fde68a;padding:14px;border-radius:6px;margin:0 0 22px;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(d.message)}</p>

        <div style="border-top:1px solid #fde68a;padding-top:16px;font-size:13px;color:#78716c;line-height:1.7">
          ${el ? "Με εκτίμηση," : "Kind regards,"}<br/>
          <strong style="color:#111">National Friend Car Rental</strong><br/>
          ${el ? "Λιμενάρια, Θάσος" : "Limenaria, Thassos"}<br/>
          ${COMPANY_PHONE} · ${COMPANY_MOBILE}<br/>
          <a href="mailto:info@national-friend.gr" style="color:#d97706">info@national-friend.gr</a>
        </div>
      </div>
    </div>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  try {
    const d: ContactPayload = req.body || {};

    if (!d.name || !d.email || !d.message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const el = customerIsEl(d);

    // 1. Owner notification — always in Greek
    const ownerRes = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo: d.email,
      subject: `Επικοινωνία: ${d.name}`,
      html: ownerHtml(d),
    });
    if (ownerRes.error) {
      console.error("Owner email error:", ownerRes.error);
      return res.status(500).json({ error: "Failed to notify owner" });
    }

    // 2. Customer confirmation — in customer's language
    const customerRes = await resend.emails.send({
      from: FROM_EMAIL,
      to: d.email,
      replyTo: OWNER_EMAIL,
      subject: el
        ? "Λάβαμε το μήνυμά σας — National Friend Car Rental"
        : "We received your message — National Friend Car Rental",
      html: customerHtml(d),
    });
    if (customerRes.error) {
      console.error("Customer email error:", customerRes.error);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("send-contact error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
