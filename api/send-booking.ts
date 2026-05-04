import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "National Friend <onboarding@resend.dev>";
const OWNER_EMAIL = process.env.TO_EMAIL || "info@national-friend.gr";
const COMPANY_PHONE = "+30 25930-52877";
const COMPANY_MOBILE = "+30 697 4930 719";

interface BookingPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  countryLabel?: string;
  carName?: string;
  category?: string;
  pickupDate?: string;
  returnDate?: string;
  pickupLocation?: string;
  childSeats?: number;
  comments?: string;
  days?: number;
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

function pickupLabel(v: string | undefined, lang: "el" | "en"): string {
  if (!v) return "—";
  const map: Record<string, { el: string; en: string }> = {
    "Λιμενάρια":     { el: "Λιμενάρια (Γραφείο)", en: "Limenaria (Office)" },
    "Λιμάνι Θάσου":  { el: "Λιμάνι Θάσου",         en: "Thassos Port" },
    "Κατάλυμα":      { el: "Παράδοση στο κατάλυμα", en: "Delivery to accommodation" },
  };
  return map[v]?.[lang] ?? v;
}

// ═══════════════════════════════════════════════════════
//  OWNER NOTIFICATION — always in Greek
// ═══════════════════════════════════════════════════════
function ownerHtml(d: BookingPayload): string {
  const langLabel = d.lang === "en" ? "English" : "Ελληνικά";
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111">
      <div style="background:#d97706;color:#fff;padding:22px 28px;border-radius:10px 10px 0 0">
        <h1 style="margin:0;font-size:22px">Νέα Κράτηση</h1>
        <p style="margin:4px 0 0;opacity:.9;font-size:13px">National Friend Car Rental</p>
      </div>
      <div style="border:1px solid #fde68a;border-top:0;padding:26px;border-radius:0 0 10px 10px;background:#fffdf7">
        <h2 style="font-size:14px;color:#b45309;margin:0 0 12px;letter-spacing:1px;text-transform:uppercase">Στοιχεία Πελάτη</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
          <tr><td style="padding:6px 0;color:#6b7280;width:170px">Ονοματεπώνυμο:</td><td><strong>${esc(d.firstName)} ${esc(d.lastName)}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Email:</td><td><a href="mailto:${esc(d.email)}" style="color:#d97706">${esc(d.email)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Τηλέφωνο:</td><td><a href="tel:${esc(d.phone)}" style="color:#d97706">${esc(d.phone)}</a></td></tr>
          ${d.countryLabel ? `<tr><td style="padding:6px 0;color:#6b7280">Χώρα:</td><td>${esc(d.countryLabel)}</td></tr>` : ""}
          <tr><td style="padding:6px 0;color:#6b7280">Γλώσσα πελάτη:</td><td>${langLabel}</td></tr>
        </table>

        <h2 style="font-size:14px;color:#b45309;margin:0 0 12px;letter-spacing:1px;text-transform:uppercase">Κράτηση</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
          <tr><td style="padding:6px 0;color:#6b7280;width:170px">Αυτοκίνητο:</td><td><strong>${esc(d.carName)}</strong>${d.category ? ` <span style="color:#6b7280">(Κατηγορία ${esc(d.category)})</span>` : ""}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Ημ/νία Παραλαβής:</td><td>${esc(d.pickupDate)}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Ημ/νία Επιστροφής:</td><td>${esc(d.returnDate)}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Διάρκεια:</td><td>${esc(d.days)} ημέρες</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Σημείο Παραλαβής:</td><td>${esc(pickupLabel(d.pickupLocation, "el"))}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Παιδικά Καθίσματα:</td><td>${esc(d.childSeats ?? 0)}</td></tr>
        </table>

        ${d.comments ? `
          <h2 style="font-size:14px;color:#b45309;margin:0 0 12px;letter-spacing:1px;text-transform:uppercase">Σχόλια</h2>
          <p style="background:#fff;border:1px solid #fde68a;padding:14px;border-radius:6px;margin:0;font-size:14px;white-space:pre-wrap">${esc(d.comments)}</p>
        ` : ""}
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════
//  CUSTOMER CONFIRMATION — in customer's language
// ═══════════════════════════════════════════════════════
function customerHtml(d: BookingPayload): string {
  const el = d.lang !== "en";
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111">
      <div style="background:#d97706;color:#fff;padding:22px 28px;border-radius:10px 10px 0 0">
        <h1 style="margin:0;font-size:22px">${el ? "Λάβαμε την κράτησή σας" : "We received your booking"}</h1>
        <p style="margin:4px 0 0;opacity:.9;font-size:13px">National Friend Car Rental</p>
      </div>
      <div style="border:1px solid #fde68a;border-top:0;padding:26px;border-radius:0 0 10px 10px;background:#fffdf7">
        <p style="font-size:15px;margin:0 0 14px">
          ${el
            ? `Γεια σας <strong>${esc(d.firstName)}</strong>,`
            : `Hello <strong>${esc(d.firstName)}</strong>,`}
        </p>
        <p style="font-size:14px;line-height:1.6;margin:0 0 20px">
          ${el
            ? "Λάβαμε το αίτημα κράτησής σας. Θα επικοινωνήσουμε μαζί σας το συντομότερο για επιβεβαίωση και τις τελευταίες λεπτομέρειες."
            : "We've received your booking request. We will get back to you shortly to confirm availability and finalize the details."}
        </p>

        <h2 style="font-size:12px;color:#b45309;margin:0 0 10px;letter-spacing:1.5px;text-transform:uppercase">
          ${el ? "Συνοπτικά" : "Summary"}
        </h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:22px">
          <tr><td style="padding:6px 0;color:#6b7280;width:160px">${el ? "Αυτοκίνητο:" : "Vehicle:"}</td><td><strong>${esc(d.carName)}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">${el ? "Παραλαβή:" : "Pick-up:"}</td><td>${esc(d.pickupDate)} · ${esc(pickupLabel(d.pickupLocation, el ? "el" : "en"))}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">${el ? "Επιστροφή:" : "Return:"}</td><td>${esc(d.returnDate)}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">${el ? "Διάρκεια:" : "Duration:"}</td><td>${esc(d.days)} ${el ? "ημέρες" : "days"}</td></tr>
        </table>

        <p style="font-size:13px;color:#6b7280;margin:0 0 18px;line-height:1.6">
          ${el
            ? `Για άμεση επικοινωνία καλέστε στο <a href="tel:${COMPANY_MOBILE.replace(/\s/g, "")}" style="color:#d97706;text-decoration:none;font-weight:600">${COMPANY_MOBILE}</a> ή απαντήστε σε αυτό το email.`
            : `For urgent matters call <a href="tel:${COMPANY_MOBILE.replace(/\s/g, "")}" style="color:#d97706;text-decoration:none;font-weight:600">${COMPANY_MOBILE}</a> or reply to this email.`}
        </p>

        <div style="border-top:1px solid #fde68a;padding-top:16px;font-size:13px;color:#78716c;line-height:1.7">
          ${el ? "Με εκτίμηση," : "Kind regards,"}<br/>
          <strong style="color:#111">Αντώνης Αντωνίου</strong><br/>
          National Friend Car Rental · ${el ? "Λιμενάρια, Θάσος" : "Limenaria, Thassos"}<br/>
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
    const d: BookingPayload = req.body || {};

    if (!d.firstName || !d.lastName || !d.email || !d.phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const el = d.lang !== "en";

    // 1. Owner notification — always in Greek
    const ownerRes = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      replyTo: d.email,
      subject: `Νέα Κράτηση — ${d.firstName ?? ""} ${d.lastName ?? ""} — ${d.carName ?? ""}`,
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
      subject: el
        ? "Λάβαμε την κράτησή σας — National Friend Car Rental"
        : "We received your booking — National Friend Car Rental",
      html: customerHtml(d),
    });
    if (customerRes.error) {
      console.error("Customer email error:", customerRes.error);
      // Owner email already succeeded — still return ok
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("send-booking error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
