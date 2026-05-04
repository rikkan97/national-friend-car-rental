export const COUNTRIES = [
  { code: "GR", el: "Ελλάδα",            en: "Greece" },
  { code: "BG", el: "Βουλγαρία",         en: "Bulgaria" },
  { code: "RO", el: "Ρουμανία",          en: "Romania" },
  { code: "RS", el: "Σερβία",            en: "Serbia" },
  { code: "MK", el: "Β. Μακεδονία",      en: "North Macedonia" },
  { code: "DE", el: "Γερμανία",          en: "Germany" },
  { code: "GB", el: "Ηνωμένο Βασίλειο",  en: "United Kingdom" },
  { code: "FR", el: "Γαλλία",            en: "France" },
  { code: "IT", el: "Ιταλία",            en: "Italy" },
  { code: "NL", el: "Ολλανδία",          en: "Netherlands" },
  { code: "BE", el: "Βέλγιο",            en: "Belgium" },
  { code: "AT", el: "Αυστρία",           en: "Austria" },
  { code: "CZ", el: "Τσεχία",            en: "Czech Republic" },
  { code: "PL", el: "Πολωνία",           en: "Poland" },
  { code: "HU", el: "Ουγγαρία",          en: "Hungary" },
  { code: "SK", el: "Σλοβακία",          en: "Slovakia" },
  { code: "SI", el: "Σλοβενία",          en: "Slovenia" },
  { code: "HR", el: "Κροατία",           en: "Croatia" },
  { code: "CY", el: "Κύπρος",            en: "Cyprus" },
  { code: "TR", el: "Τουρκία",           en: "Turkey" },
  { code: "UA", el: "Ουκρανία",          en: "Ukraine" },
  { code: "ES", el: "Ισπανία",           en: "Spain" },
  { code: "PT", el: "Πορτογαλία",        en: "Portugal" },
  { code: "CH", el: "Ελβετία",           en: "Switzerland" },
  { code: "SE", el: "Σουηδία",           en: "Sweden" },
  { code: "NO", el: "Νορβηγία",          en: "Norway" },
  { code: "DK", el: "Δανία",             en: "Denmark" },
  { code: "FI", el: "Φινλανδία",         en: "Finland" },
  { code: "IE", el: "Ιρλανδία",          en: "Ireland" },
  { code: "IL", el: "Ισραήλ",            en: "Israel" },
  { code: "US", el: "ΗΠΑ",               en: "United States" },
  { code: "CA", el: "Καναδάς",           en: "Canada" },
  { code: "AU", el: "Αυστραλία",         en: "Australia" },
  { code: "OTHER", el: "Άλλη χώρα",      en: "Other" },
] as const;

export type Lang = "el" | "en";

export function countryLabel(code: string | undefined, lang: Lang): string {
  if (!code) return "";
  const c = COUNTRIES.find((x) => x.code === code);
  return c ? c[lang] : code;
}
