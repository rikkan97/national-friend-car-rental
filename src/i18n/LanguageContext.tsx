import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Lang } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const LS_KEY = "nf_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "el";
    const saved = localStorage.getItem(LS_KEY) as Lang | null;
    return saved === "en" || saved === "el" ? saved : "el";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LS_KEY, l); } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (path: string): string => {
    const parts = path.split(".");
    let node: any = translations;
    for (const p of parts) {
      if (node == null) return path;
      node = node[p];
    }
    if (node && typeof node === "object" && (node.el || node.en)) {
      return node[lang] ?? node.el ?? path;
    }
    return typeof node === "string" ? node : path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}

// Map runtime Greek values (stored in car data) → translated string
const VALUE_MAP_EN: Record<string, string> = {
  "Χειροκίνητο": "Manual",
  "Αυτόματο": "Automatic",
  "Βενζίνη": "Petrol",
  "Πετρέλαιο": "Diesel",
  "Υβριδικό": "Hybrid",
  "Κλιματισμός": "Air Conditioning",
  "Ηλεκτρικά Παράθυρα": "Electric Windows",
  "Radio / CD": "Radio / CD",
  "Κεντρικό Κλείδωμα": "Central Locking",
  "Υδραυλικό Τιμόνι": "Power Steering",
  "Bluetooth": "Bluetooth",
  "Cruise Control": "Cruise Control",
  "USB Charging": "USB Charging",
  "Πλοήγηση GPS": "GPS Navigation",
  "Κάμερα Οπισθοπορείας": "Reversing Camera",
  "Δερμάτινα Καθίσματα": "Leather Seats",
  "Full Κλιματισμός": "Full Air Conditioning",
  "Bluetooth Premium": "Bluetooth Premium",
};

export function useTv() {
  const { lang } = useT();
  return (value: string): string => {
    if (lang === "en" && VALUE_MAP_EN[value]) return VALUE_MAP_EN[value];
    return value;
  };
}
