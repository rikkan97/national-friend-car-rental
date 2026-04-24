import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoImage from "figma:asset/0f6b906dfc0ff21309735e67dcdb8ae0299ae747.png";
import { useT } from "../../i18n/LanguageContext";
import type { Lang } from "../../i18n/translations";

interface HeaderProps {
  onBookingClick?: () => void;
}

interface NavItem {
  key: string;
  path: string;
  external?: boolean;
}

export function Header({ onBookingClick }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, lang, setLang } = useT();

  const navItems: NavItem[] = [
    { key: "nav.home",          path: "/" },
    { key: "nav.fleet",         path: "/fleet" },
    { key: "nav.thasos",        path: "/thasos" },
    { key: "nav.terms",         path: "/terms" },
    { key: "nav.contact",       path: "/contact" },
    { key: "nav.accommodation", path: "https://egeo-travel.com", external: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleBookingClick = () => {
    if (onBookingClick) {
      onBookingClick();
    }
    if (!onBookingClick && location.pathname !== "/fleet") {
      window.location.href = "/fleet";
    }
  };

  const LangDropdown = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;
      const onClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }, [open]);

    const options: { value: Lang; code: string; label: string }[] = [
      { value: "el", code: "gr", label: "Ελληνικά" },
      { value: "en", code: "gb", label: "English" },
    ];
    const current = options.find(o => o.value === lang)!;

    const Flag = ({ code }: { code: string }) => (
      <img
        src={`https://flagcdn.com/w40/${code}.png`}
        srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
        alt=""
        width={20}
        height={14}
        className="inline-block object-cover"
        style={{ width: 20, height: 14 }}
      />
    );

    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-amber-600 transition-colors"
          aria-label="Language"
        >
          <Flag code={current.code} />
          <span className="text-sm font-medium">{current.label}</span>
          <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 min-w-[140px] rounded-lg bg-white border border-gray-200 shadow-lg overflow-hidden z-50"
            >
              {options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { setLang(opt.value); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    opt.value === lang
                      ? "bg-amber-50 text-amber-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Flag code={opt.code} />
                  <span>{opt.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white via-white to-white/95 backdrop-blur-md border-b-2 border-amber-200/50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== "/") {
                navigate("/");
              }
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }}
            className="flex items-center gap-4 group shrink-0 cursor-pointer"
          >
            <img
              src={logoImage}
              alt="National Friend Car Rental"
              style={{ height: "56px", width: "auto", maxHeight: "56px" }}
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 relative transition-all duration-300 font-bold text-sm tracking-wider rounded-lg text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                >
                  {t(item.key)}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-2.5 relative transition-all duration-300 font-bold text-sm tracking-wider rounded-lg ${
                    isActive(item.path)
                      ? "text-amber-600"
                      : "text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                  }`}
                >
                  {t(item.key)}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-1 left-2 right-2 h-0.5 bg-amber-500 rounded-full shadow-lg shadow-amber-600/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LangDropdown />
            {/* CTA Button */}
            <button
              onClick={handleBookingClick}
              className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-all duration-300 font-bold text-sm tracking-wider shadow-lg shadow-amber-600/40 hover:shadow-xl hover:shadow-amber-700/60 hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="relative z-10">{t("nav.rentOnline")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <LangDropdown />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  item.external ? (
                    <a
                      key={item.path}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm tracking-wide text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                    >
                      {t(item.key)}
                    </a>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm tracking-wide ${
                        isActive(item.path)
                          ? "bg-amber-600 text-white shadow-lg shadow-amber-600/40"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  )
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleBookingClick();
                  }}
                  className="block w-full bg-amber-600 text-white px-4 py-3 rounded-xl text-center hover:bg-amber-700 transition-all duration-300 font-bold text-sm tracking-wider shadow-lg shadow-amber-600/40 hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">{t("nav.rentOnline")}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
