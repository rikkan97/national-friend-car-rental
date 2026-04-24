# Deployment — Vercel + Resend

Αυτός ο οδηγός θα σε βοηθήσει να συνδέσεις το site σε Vercel (hosting) και να
ρυθμίσεις το Resend (email) ώστε οι φόρμες **Κράτηση** και **Επικοινωνία** να
στέλνουν πραγματικά emails.

---

## 1 — Resend (email service)

1. Φτιάξε account στο https://resend.com (free: 3 000 emails/μήνα, 100/ημέρα).
2. Στο dashboard → **API Keys** → *Create API Key* → αντίγραψε το key (ξεκινά
   με `re_...`). Θα το βάλεις στο `RESEND_API_KEY`.
3. **Verify domain** (προαιρετικό αλλά συνιστάται):
   - Dashboard → **Domains** → *Add Domain* → `national-friend.gr`
   - Πρόσθεσε τις εγγραφές DNS (TXT, MX, CNAME) που σου δίνει το Resend στον DNS
     πάροχό σου.
   - Μόλις γίνει verified, χρησιμοποίησε `noreply@national-friend.gr` ως
     `FROM_EMAIL`.
   - Αν δεν κάνεις verify, μπορείς να στείλεις ΜΟΝΟ προς τη διεύθυνση που
     χρησιμοποίησες για να εγγραφείς στο Resend, και ως sender θα είναι
     `onboarding@resend.dev`.

---

## 2 — Vercel (hosting + serverless API)

1. https://vercel.com → Sign up με GitHub.
2. Push το project σε GitHub repo (αν δεν είναι ήδη).
3. Vercel → **Add New Project** → επέλεξε το repo → *Deploy* (τα πάντα auto-detected).
4. Project → **Settings** → **Environment Variables** → πρόσθεσε:

   | Name             | Value                                                  |
   | ---------------- | ------------------------------------------------------ |
   | `RESEND_API_KEY` | `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                    |
   | `FROM_EMAIL`     | `National Friend <noreply@national-friend.gr>` *(ή `onboarding@resend.dev` για αρχή)* |
   | `TO_EMAIL`       | `info@national-friend.gr`                              |

   Διάλεξε **Production, Preview, Development** και πάτα *Save*.

5. Deployments → **Redeploy** την τελευταία deployment ώστε να πάρει τις νέες
   μεταβλητές.

---

## 3 — Τοπικό testing (προαιρετικό)

Αν θες να δοκιμάσεις τα `/api/*` τοπικά πριν το push:

```bash
npm i -g vercel
vercel link                 # συνδέει τον φάκελο με το Vercel project
vercel env pull .env.local  # κατεβάζει τις env vars τοπικά
vercel dev                  # τρέχει Vite + serverless στο :3000
```

Χωρίς Resend API key, τα endpoints επιστρέφουν 500 ("Email service not
configured").

---

## 4 — Τι έχει ήδη στηθεί στο repo

- `api/send-booking.ts` — serverless endpoint, λαμβάνει booking form, στέλνει
  email με όλα τα πεδία (όνομα, ημερομηνίες, αυτοκίνητο, σύνολο κλπ.).
- `api/send-contact.ts` — serverless endpoint για τη φόρμα επικοινωνίας.
- `BookingForm.tsx` + `Contact.tsx` — κάνουν `POST` στα endpoints με
  loading / success / error states.
- `vercel.json` — rewrite rules ώστε το SPA να δουλεύει σωστά αλλά το `/api/*`
  να μην ανακατευθύνεται στο `index.html`.
- `.env.example` — οδηγός για τις μεταβλητές.
- `.gitignore` — κρατά το `.env` εκτός commit.

Μόλις μπουν τα 3 env vars στο Vercel, οι φόρμες δουλεύουν αυτόματα — **χωρίς
άλλη αλλαγή κώδικα**.
