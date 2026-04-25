import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { Users, Fuel, SlidersHorizontal, X, Briefcase, Gauge, CheckCircle, Star, ChevronDown, DoorClosed, Car, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { BookingForm } from "../components/BookingForm";
import { useLocation } from "react-router";
import { TransmissionIcon } from "../components/TransmissionIcon";
import { EngineIcon } from "../components/EngineIcon";
import { useT, useTv } from "../../i18n/LanguageContext";
import mg3Image from "figma:asset/mg3.jpg";
import mgZsImage from "figma:asset/mg-zs.jpg";
import nissanJukeImage from "figma:asset/nissan-juke.jpg";
import mg3HybridImage from "figma:asset/mg3-hybrid.jpg";

type RoadType = "onlyRoad" | "beachOrMountain" | "forBeaches";

interface CarType {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  passengers: number;
  luggage: number;
  engine: string;
  doors: number;
  transmission: string;
  fuel: string;
  rating: number;
  features: string[];
  roadType: RoadType;
}

export function Fleet() {
  const { t } = useT();
  const tv = useTv();
  const location = useLocation();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<{ id: string; name: string; price: number } | null>(null);
  const [detailsModalCar, setDetailsModalCar] = useState<CarType | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    category: [] as string[],
    transmission: [] as string[],
    passengers: [] as string[],
    priceRange: [25, 80] as [number, number],
    fuel: [] as string[]
  });

  // Handle filters passed via navigation state from the home hero search
  useEffect(() => {
    const s = location.state as
      | { categoryFilter?: string; transmission?: string; fuel?: string; passengers?: string }
      | null;
    if (!s) return;
    setFilters(prev => ({
      ...prev,
      ...(s.categoryFilter ? { category: [s.categoryFilter] } : {}),
      ...(s.transmission   ? { transmission: [s.transmission] } : {}),
      ...(s.fuel           ? { fuel: [s.fuel] } : {}),
      ...(s.passengers     ? { passengers: [s.passengers] } : {}),
    }));
  }, [location.state]);

  const categories = [
    { id: "A",  name: t("home.booking.catA") },
    { id: "B",  name: t("home.booking.catB") },
    { id: "B1", name: t("home.booking.catB1") },
    { id: "C",  name: t("home.booking.catC") },
    { id: "C1", name: t("home.booking.catC1") },
    { id: "D",  name: t("home.booking.catD") },
    { id: "G",  name: t("home.booking.catG") },
    { id: "G1", name: t("home.booking.catG1") },
    { id: "G2", name: t("home.booking.catG2") },
  ];

  const categoryLabel: Record<string, string> = Object.fromEntries(categories.map(c => [c.id, c.name]));

  const transmissions = [
    { id: "Χειροκίνητο", name: t("fleet.filters.manual") },
    { id: "Αυτόματο",    name: t("fleet.filters.automatic") }
  ];

  const passengerOptions = [
    { id: "2-4", name: t("fleet.filters.people24") },
    { id: "5",   name: t("fleet.filters.people5") },
    { id: "7+",  name: t("fleet.filters.people7plus") }
  ];

  const fuelTypes = [
    { id: "Βενζίνη",  name: t("fleet.filters.petrol") },
    { id: "Πετρέλαιο", name: t("fleet.filters.diesel") },
    { id: "Υβριδικό", name: t("fleet.filters.hybrid") }
  ];

  const nfBase = "https://www.national-friend.gr/media/k2/items/cache/";
  const carImages = {
    kiaPicanto:       nfBase + "2fa67f482133f1c934235b73c2a03954_M.jpg",
    renaultTwingo:    nfBase + "e0a70f72bdae9885bfc32d7cd19a26a1_M.jpg",
    toyotaAygo:       nfBase + "94d43e327d9303539cb1e2aac7032668_M.jpg",
    toyotaAygoNew:    nfBase + "077ab55046ce80eaf9a3ddea999597ca_M.jpg",
    hyundaiI10:       nfBase + "2ff2ba0051687eef5ca0459cf942940c_M.jpg",
    kiaPicantoNew:    nfBase + "9caa2793658f3cc387f216157300b1ce_M.jpg",
    nissanMicra:      nfBase + "184b7cb84d7b456c96a0bdfbbeaa5f14_M.jpg",
    kiaPicantoAuto:   nfBase + "e31ace2a15a7c70645ad83df9ecd43b0_M.jpg",
    hyundaiI20:       nfBase + "c889234799e865bbe90cee71f6cd2e53_M.jpg",
    peugeot208:       nfBase + "c82cc4e14a1d2c8c8ffff9840d24b558_M.jpg",
    renaultClio:      nfBase + "3899dfe821816fbcb3db3e3b23f81585_M.jpg",
    renaultClioNew:   nfBase + "f4b6dca0e2911082f0eb6e1df1a0e11d_M.jpg",
    fiatDoblo:        nfBase + "fc1da7257992fc36032e11db3df7a664_M.jpg",
    daciaDuster:      nfBase + "9b2c4b44fb86522964124ed80d03c5e8_M.jpg",
    suzukiJimny:      nfBase + "4965657af186b9092c7a96976ffe881c_M.jpg",
  };
  const standardFeatures = ["Κλιματισμός", "Ηλεκτρικά Παράθυρα", "Radio / CD", "Κεντρικό Κλείδωμα", "Υδραυλικό Τιμόνι"];

  const cars: CarType[] = [
    { id: "2",  name: "RENAULT TWINGO",           category: "A",  image: carImages.renaultTwingo,   price: 35, passengers: 4, luggage: 3, engine: "1200cc", doors: 2, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.8, features: standardFeatures, roadType: "onlyRoad" },
    { id: "3",  name: "TOYOTA AYGO",              category: "A",  image: carImages.toyotaAygo,      price: 35, passengers: 4, luggage: 3, engine: "1000cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.8, features: standardFeatures, roadType: "onlyRoad" },
    { id: "4",  name: "TOYOTA AYGO NEW",          category: "A",  image: carImages.toyotaAygoNew,   price: 38, passengers: 4, luggage: 3, engine: "1000cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "5",  name: "HYUNDAI i10",              category: "B",  image: carImages.hyundaiI10,      price: 40, passengers: 5, luggage: 3, engine: "1086cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "6",  name: "KIA PICANTO NEW",          category: "B",  image: carImages.kiaPicantoNew,   price: 45, passengers: 5, luggage: 3, engine: "1200cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 5,   features: standardFeatures, roadType: "onlyRoad" },
    { id: "7",  name: "NISSAN MICRA",             category: "B",  image: carImages.nissanMicra,     price: 40, passengers: 5, luggage: 3, engine: "1200cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "8",  name: "HYUNDAI i10 Automatic",    category: "B1", image: carImages.hyundaiI10,      price: 50, passengers: 5, luggage: 3, engine: "1086cc", doors: 5, transmission: "Αυτόματο",    fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "9",  name: "KIA PICANTO Automatic",    category: "B1", image: carImages.kiaPicantoAuto,  price: 55, passengers: 5, luggage: 3, engine: "1200cc", doors: 5, transmission: "Αυτόματο",    fuel: "Βενζίνη", rating: 5,   features: standardFeatures, roadType: "onlyRoad" },
    { id: "10", name: "HYUNDAI i20",              category: "C",  image: carImages.hyundaiI20,      price: 45, passengers: 5, luggage: 4, engine: "1400cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "11", name: "PEUGEOT 207",              category: "C",  image: carImages.peugeot208,      price: 45, passengers: 5, luggage: 4, engine: "1400cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "13", name: "RENAULT CLIO",             category: "C",  image: carImages.renaultClioNew,  price: 50, passengers: 5, luggage: 4, engine: "1200cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 5,   features: standardFeatures, roadType: "onlyRoad" },
    { id: "14", name: "DACIA SANDERO",            category: "C",  image: carImages.renaultClio,     price: 45, passengers: 5, luggage: 4, engine: "1200cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "18", name: "MG3",                      category: "C",  image: mg3Image,                  price: 48, passengers: 5, luggage: 3, engine: "1500cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.8, features: standardFeatures, roadType: "onlyRoad" },
    { id: "15", name: "FIAT DOBLO",               category: "D",  image: carImages.fiatDoblo,       price: 55, passengers: 7, luggage: 4, engine: "1400cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "16", name: "DACIA DUSTER 4x2",         category: "G",  image: carImages.daciaDuster,     price: 65, passengers: 5, luggage: 4, engine: "1200cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "beachOrMountain" },
    { id: "17", name: "SUZUKI JIMNY 4x4",         category: "G1", image: carImages.suzukiJimny,     price: 75, passengers: 4, luggage: 2, engine: "1300cc", doors: 2, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 5,   features: standardFeatures, roadType: "beachOrMountain" },
    { id: "19", name: "MG ZS MAX",                category: "G2", image: mgZsImage,                 price: 70, passengers: 5, luggage: 3, engine: "1500cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "forBeaches" },
    { id: "20", name: "NISSAN JUKE",              category: "G2", image: nissanJukeImage,           price: 70, passengers: 5, luggage: 3, engine: "1000cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "forBeaches" },
    { id: "21", name: "MG3 HYBRID+",              category: "G2", image: mg3HybridImage,            price: 75, passengers: 5, luggage: 3, engine: "1500cc", doors: 5, transmission: "Αυτόματο",    fuel: "Υβριδικό", rating: 5,   features: standardFeatures, roadType: "forBeaches" },
  ];

  // Filter logic
  const filteredCars = cars.filter(car => {
    if (filters.category.length > 0 && !filters.category.includes(car.category)) return false;
    if (filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) return false;
    if (filters.passengers.length > 0) {
      let matchesPassengers = false;
      filters.passengers.forEach(p => {
        if (p === "2-4" && car.passengers >= 2 && car.passengers <= 4) matchesPassengers = true;
        if (p === "5" && car.passengers === 5) matchesPassengers = true;
        if (p === "7+" && car.passengers >= 7) matchesPassengers = true;
      });
      if (!matchesPassengers) return false;
    }
    if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false;
    if (filters.fuel.length > 0 && !filters.fuel.includes(car.fuel)) return false;
    return true;
  });

  const toggleFilter = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[filterType] as string[];
      if (currentArray.includes(value)) {
        return { ...prev, [filterType]: currentArray.filter(item => item !== value) };
      } else {
        return { ...prev, [filterType]: [...currentArray, value] };
      }
    });
  };

  const clearAllFilters = () => {
    setFilters({
      category: [],
      transmission: [],
      passengers: [],
      priceRange: [25, 80],
      fuel: []
    });
  };

  const handleBookNow = (car?: { id: string; name: string; price: number }) => {
    if (car) {
      setSelectedCar(car);
    }
    setBookingOpen(true);
  };

  const FilterDropdown = ({ title, items, filterKey }: { title: string; items: { id: string; name: string }[]; filterKey: keyof typeof filters }) => {
    const isOpen = openDropdown === filterKey;
    const selectedCount = (filters[filterKey] as string[]).length;

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : filterKey)}
          className={`px-5 py-2.5 rounded-full border transition-all font-medium text-sm flex items-center gap-2.5 ${
            selectedCount > 0
              ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/30'
              : 'bg-white text-gray-700 border-gray-200 hover:border-amber-500 hover:text-amber-700'
          }`}
        >
          {title}
          {selectedCount > 0 && (
            <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold ${
              selectedCount > 0 ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-700'
            }`}>
              {selectedCount}
            </span>
          )}
          <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={16} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              data-filter-popup
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute top-full mt-3 bg-white rounded-xl shadow-2xl shadow-amber-500/10 border border-amber-200 p-3 min-w-[220px] z-50"
            >
              <div className="space-y-1">
                {items.map(item => {
                  const checked = (filters[filterKey] as string[]).includes(item.id);
                  return (
                    <label key={item.id} className={`flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-lg transition-colors ${checked ? 'bg-amber-50' : 'hover:bg-gray-50'}`}>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${checked ? 'bg-amber-600 border-amber-600' : 'border-gray-300'}`}>
                        {checked && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1 5L4 8L9 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFilter(filterKey, item.id)}
                        className="sr-only"
                      />
                      <span className={`text-sm ${checked ? 'text-amber-900 font-medium' : 'text-gray-700'}`}>{item.name}</span>
                    </label>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };


  // Close dropdowns when clicking outside (robust — ignores clicks inside any filter popup)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-filter-popup]')) return;
      setOpenDropdown(null);
    };
    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f3ee] via-[#F5F1E8] to-[#ece7df]">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="pt-32 pb-40 relative overflow-hidden">
        {/* Background Image with Layered Overlay */}
        <div
          className="absolute inset-0 bg-cover scale-105"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1707809170983-ebce00b63dbd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundPosition: "center 75%",
          }}
        />
        {/* Dark layered gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-[#F5F1E8]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-amber-900/20" />

        {/* Corner accents */}
        <div className="absolute top-28 left-4 md:left-10 w-10 h-10 border-t-2 border-l-2 border-amber-400/50 hidden md:block" />
        <div className="absolute top-28 right-4 md:right-10 w-10 h-10 border-t-2 border-r-2 border-amber-400/50 hidden md:block" />

        {/* Subtle gold accent lines on sides */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-amber-400/60 to-transparent hidden lg:block" />
        <div className="absolute top-1/2 right-8 -translate-y-1/2 w-px h-40 bg-gradient-to-b from-transparent via-amber-400/60 to-transparent hidden lg:block" />

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 md:gap-5 mb-6 flex-wrap justify-center">
              <div className="h-px w-8 md:w-12 bg-amber-400" />
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                {t("fleet.hero.title1")} <span className="italic text-amber-400">{t("fleet.hero.title2")}</span> {t("fleet.hero.title3")}
              </h1>
              <div className="h-px w-8 md:w-12 bg-amber-400" />
            </div>
            <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto px-2 font-light leading-relaxed">
              {t("fleet.hero.subtitle")}
            </p>

            {/* Premium stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-6 md:gap-12 text-white"
            >
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-amber-400">{cars.length}</div>
                <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/60 mt-1">{t("fleet.hero.statModels")}</div>
              </div>
              <div className="h-10 w-px bg-amber-400/30" />
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-amber-400">{categories.length}</div>
                <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/60 mt-1">{t("fleet.hero.statCategories")}</div>
              </div>
              <div className="h-10 w-px bg-amber-400/30" />
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-amber-400">25+</div>
                <div className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/60 mt-1">{t("fleet.hero.statYears")}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="-mt-20 py-12 bg-[#F5F1E8]">
        <div className="container mx-auto px-4">
          {/* Filters Section - Premium */}
          <div className="relative mb-10 z-30">
            {/* Subtle gold glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/20 via-amber-300/5 to-amber-400/20 rounded-2xl blur-sm" />

            <div className="relative bg-white/98 backdrop-blur-sm rounded-2xl border border-amber-200/80 shadow-[0_20px_50px_-20px_rgba(245,158,11,0.2)]">
              {/* Top Label Bar — also acts as toggle on mobile */}
              <button
                type="button"
                onClick={() => setFiltersOpen((v) => !v)}
                aria-expanded={filtersOpen}
                className="w-full lg:cursor-default px-4 sm:px-7 py-3.5 sm:py-4 border-b border-amber-100/80 bg-gradient-to-r from-amber-50/50 to-transparent rounded-t-2xl text-left"
              >
                {/* Mobile: stacked premium layout */}
                <div className="flex items-center justify-between gap-3 lg:hidden">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <SlidersHorizontal size={15} className="text-amber-600" strokeWidth={2.2} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] tracking-[0.25em] text-amber-700 uppercase font-bold leading-tight">
                        {t("fleet.filters.label")}
                      </span>
                      <span className="text-[11px] text-gray-500 leading-tight mt-0.5">
                        <span className="font-bold text-amber-600">{filteredCars.length}</span> {t("fleet.filters.available")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      onClick={(e) => { e.stopPropagation(); clearAllFilters(); }}
                      className="text-[10px] tracking-[0.15em] uppercase text-amber-700 hover:text-amber-900 font-semibold px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 cursor-pointer"
                    >
                      {t("fleet.filters.clear")}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-amber-600 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* Desktop: single row */}
                <div className="hidden lg:flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <SlidersHorizontal size={16} className="text-amber-600" strokeWidth={2} />
                    <span className="text-[11px] tracking-[0.3em] text-amber-700 uppercase font-semibold">{t("fleet.filters.label")}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-sm text-gray-600">
                      <span className="font-bold text-amber-600">{filteredCars.length}</span> {t("fleet.filters.available")}
                    </span>
                    <span
                      onClick={(e) => { e.stopPropagation(); clearAllFilters(); }}
                      className="text-xs tracking-[0.15em] uppercase text-amber-700 hover:text-amber-900 font-semibold transition-colors border-l border-amber-200 pl-5 cursor-pointer"
                    >
                      {t("fleet.filters.clear")}
                    </span>
                  </div>
                </div>
              </button>

              {/* Filter Row — expandable on mobile */}
              <div className={`px-4 sm:px-7 py-4 sm:py-5 ${filtersOpen ? "block" : "hidden"} lg:block`}>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3" onClick={(e) => e.stopPropagation()}>
                  <FilterDropdown title={t("fleet.filters.category")} items={categories} filterKey="category" />
                  <FilterDropdown title={t("fleet.filters.transmission")} items={transmissions} filterKey="transmission" />
                  <FilterDropdown title={t("fleet.filters.passengers")} items={passengerOptions} filterKey="passengers" />
                  <div className="relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === 'priceRange' ? null : 'priceRange')}
                      className="px-5 py-2.5 rounded-full border bg-white text-gray-700 border-gray-200 hover:border-amber-500 hover:text-amber-700 transition-all font-medium text-sm flex items-center gap-2.5"
                    >
                      {t("fleet.filters.price")}
                      <ChevronDown className={`transition-transform ${openDropdown === 'priceRange' ? 'rotate-180' : ''}`} size={16} />
                    </button>

                    {openDropdown === 'priceRange' && (
                      <div
                        data-filter-popup
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        className="absolute top-full mt-3 bg-white rounded-xl shadow-2xl shadow-amber-500/10 border border-amber-200 p-5 min-w-[280px] z-50"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] tracking-[0.2em] text-amber-700 uppercase font-semibold">{t("fleet.filters.priceTitle")}</span>
                          <div className="flex items-baseline gap-1.5 text-amber-600">
                            <span className="text-lg font-bold">{filters.priceRange[0]}€</span>
                            <span className="text-gray-400">—</span>
                            <span className="text-lg font-bold">{filters.priceRange[1]}€</span>
                          </div>
                        </div>

                        {/* Dual-range slider */}
                        <div className="relative h-6 flex items-center">
                          <div className="absolute inset-x-0 h-1.5 bg-amber-100 rounded-full pointer-events-none" />
                          <div
                            className="absolute h-1.5 bg-amber-500 rounded-full pointer-events-none"
                            style={{
                              left: `${((filters.priceRange[0] - 25) / (80 - 25)) * 100}%`,
                              right: `${100 - ((filters.priceRange[1] - 25) / (80 - 25)) * 100}%`,
                            }}
                          />
                          <input
                            type="range"
                            min="25"
                            max="80"
                            step="1"
                            value={filters.priceRange[0]}
                            onChange={(e) => {
                              const v = parseInt(e.target.value);
                              setFilters(prev => ({ ...prev, priceRange: [Math.min(v, prev.priceRange[1] - 1), prev.priceRange[1]] }));
                            }}
                            className="absolute inset-x-0 w-full h-6 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                          />
                          <input
                            type="range"
                            min="25"
                            max="80"
                            step="1"
                            value={filters.priceRange[1]}
                            onChange={(e) => {
                              const v = parseInt(e.target.value);
                              setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Math.max(v, prev.priceRange[0] + 1)] }));
                            }}
                            className="absolute inset-x-0 w-full h-6 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                          <span>25€</span>
                          <span>80€</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <FilterDropdown title={t("fleet.filters.fuel")} items={fuelTypes} filterKey="fuel" />
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                layout
                className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-shadow sm:hover:-translate-y-1 border border-amber-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{car.name}</h3>
                    <p className="text-sm text-amber-600">{categoryLabel[car.category] ?? car.category}</p>
                  </div>

                  {/* 6 Specs in 2 columns */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <TransmissionIcon className="text-amber-600" size={18} />
                      <span className="text-sm text-gray-700">{tv(car.transmission)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="text-amber-600" size={18} />
                      <span className="text-sm text-gray-700">{car.luggage} {t("fleet.card.luggage")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <EngineIcon className="text-amber-600" size={18} />
                      <span className="text-sm text-gray-700">{car.engine}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="text-amber-600" size={18} />
                      <span className="text-sm text-gray-700">{tv(car.fuel)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DoorClosed className="text-amber-600" size={18} />
                      <span className="text-sm text-gray-700">{car.doors} {t("fleet.card.doors")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="text-amber-600" size={18} />
                      <span className="text-sm text-gray-700">{car.passengers} {t("fleet.card.people")}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 mb-4"></div>

                  {/* Price + Road Type */}
                  <div className="mb-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t("fleet.card.from")}</p>
                      <p className="text-3xl font-bold text-amber-600">
                        {car.price}€<span className="text-base text-gray-600">{t("fleet.card.perDay")}</span>
                      </p>
                    </div>
                    <span
                      className={`text-[10px] tracking-wide uppercase font-bold px-2.5 py-1.5 rounded-full border whitespace-nowrap ${
                        car.roadType === "onlyRoad"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : car.roadType === "beachOrMountain"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-300"
                      }`}
                    >
                      {t(`fleet.roadType.${car.roadType}`)}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setDetailsModalCar(car)}
                      className="w-full bg-white border-2 border-amber-500 text-amber-700 py-3.5 rounded-xl hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 font-bold text-base tracking-wide shadow-md hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5"
                    >
                      {t("fleet.card.details")}
                    </button>
                    <button
                      onClick={() => handleBookNow(car)}
                      className="w-full bg-amber-600 text-white py-3.5 rounded-xl hover:bg-amber-700 transition-all duration-300 font-bold text-base tracking-wide shadow-lg shadow-amber-600/40 hover:shadow-2xl hover:shadow-amber-700/50 hover:-translate-y-0.5 relative overflow-hidden group"
                    >
                      <span className="relative z-10">{t("fleet.card.book")} →</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredCars.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border-2 border-amber-200">
              <p className="text-xl text-gray-600 mb-4">{t("fleetExt.noResultsDesc")}</p>
              <button
                onClick={clearAllFilters}
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                {t("fleetExt.clearFilters")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Details Modal */}
      <AnimatePresence>
        {detailsModalCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setDetailsModalCar(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setDetailsModalCar(null)}
                className="absolute top-4 right-4 z-10 bg-amber-500 hover:bg-amber-600 p-2 rounded-full transition-colors"
              >
                <X className="text-white" size={24} />
              </button>

              {/* Image */}
              <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={detailsModalCar.image}
                  alt={detailsModalCar.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 break-words">{detailsModalCar.name}</h2>
                <p className="text-amber-600 font-semibold mb-5 sm:mb-6 text-sm sm:text-base">{categoryLabel[detailsModalCar.category] ?? detailsModalCar.category} • {detailsModalCar.engine}</p>

                {/* Specs Grid - 2x3 with amber backgrounds */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                      <Users size={20} />
                      <p className="text-xs text-gray-600">{t("details.passengers")}</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{detailsModalCar.passengers} {t("details.people")}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                      <Briefcase size={20} />
                      <p className="text-xs text-gray-600">{t("details.luggage")}</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{detailsModalCar.luggage} {t("details.luggageUnit")}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                      <TransmissionIcon size={20} />
                      <p className="text-xs text-gray-600">{t("details.transmission")}</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{tv(detailsModalCar.transmission)}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                      <EngineIcon size={20} />
                      <p className="text-xs text-gray-600">{t("details.engine")}</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{detailsModalCar.engine}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                      <Fuel size={20} />
                      <p className="text-xs text-gray-600">{t("details.fuel")}</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{tv(detailsModalCar.fuel)}</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-2 text-amber-600 mb-1">
                      <DoorClosed size={20} />
                      <p className="text-xs text-gray-600">{t("details.doors")}</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{detailsModalCar.doors}</p>
                  </div>
                </div>

                {/* Road Type */}
                <div className="mb-6 p-4 rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center flex-shrink-0">
                    <Car size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold">{t("fleet.roadType.label")}</p>
                    <p className="text-sm sm:text-base font-bold text-gray-800">{t(`fleet.roadType.${detailsModalCar.roadType}`)}</p>
                  </div>
                </div>

                {/* Equipment */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("details.features")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {detailsModalCar.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="text-amber-600" size={20} />
                        <span className="text-gray-700">{tv(feature)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Box */}
                <div className="mb-6 p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border-2 border-amber-400">
                  <p className="text-sm text-gray-600 mb-2">{t("details.price")}</p>
                  <p className="text-5xl font-bold text-amber-600">
                    {detailsModalCar.price}€<span className="text-xl text-gray-600">{t("details.perDay")}</span>
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setDetailsModalCar(null);
                    handleBookNow(detailsModalCar);
                  }}
                  className="w-full bg-amber-600 text-white py-4 rounded-xl hover:bg-amber-700 transition-all duration-300 font-bold text-lg tracking-wide shadow-lg shadow-amber-600/40 hover:shadow-2xl hover:shadow-amber-700/50 hover:-translate-y-1 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t("details.bookNow")}
                    <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Booking Modal */}
      <BookingForm
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedCar={selectedCar}
        cars={cars}
      />
    </div>
  );
}