import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { Users, Fuel, SlidersHorizontal, X, Briefcase, CheckCircle, ChevronDown, DoorClosed } from "lucide-react";
import { useState, useEffect } from "react";
import { BookingForm } from "../components/BookingForm";
import { useLocation } from "react-router";
import { TransmissionIcon } from "../components/TransmissionIcon";
import { EngineIcon } from "../components/EngineIcon";
import { useT, useTv } from "../../i18n/LanguageContext";
import aygoImg from "../../assets/cars/aygo.webp";
import aygo2Img from "../../assets/cars/aygo2.webp";
import i10Img from "../../assets/cars/i10.webp";
import picantoImg from "../../assets/cars/picanto.webp";
import picantoOldImg from "../../assets/cars/picanto-old.webp";
import micraImg from "../../assets/cars/micra.webp";
import i20Img from "../../assets/cars/i20.webp";
import peugeot208Img from "../../assets/cars/peugeot-208.webp";
import clioImg from "../../assets/cars/clio.webp";
import dobloImg from "../../assets/cars/doblo.webp";
import dusterImg from "../../assets/cars/duster.webp";
import jimnyImg from "../../assets/cars/jimny.webp";
import mg3Image from "../../assets/cars/mg3.webp";
import mgZsImage from "../../assets/cars/zs.webp";
import nissanJukeImage from "../../assets/cars/juke.webp";
import mg3HybridImage from "../../assets/cars/mg3-hybrid.webp";

type RoadType = "onlyRoad" | "beachOrMountain" | "forBeaches";

interface CarType {
  id: string;
  name: string;
  category: string;
  image: string;
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
  const [selectedCar, setSelectedCar] = useState<{ id: string; name: string } | null>(null);
  const [detailsModalCar, setDetailsModalCar] = useState<CarType | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    category: [] as string[],
    transmission: [] as string[],
    passengers: [] as string[],
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

  const carImages = {
    toyotaAygo:       aygoImg,
    toyotaAygoNew:    aygo2Img,
    hyundaiI10:       i10Img,
    kiaPicantoNew:    picantoImg,
    nissanMicra:      micraImg,
    kiaPicantoAuto:   picantoOldImg,
    hyundaiI20:       i20Img,
    peugeot208:       peugeot208Img,
    renaultClio:      clioImg,
    fiatDoblo:        dobloImg,
    daciaDuster:      dusterImg,
    suzukiJimny:      jimnyImg,
  };
  const standardFeatures = ["Κλιματισμός", "Ηλεκτρικά Παράθυρα", "Radio / CD", "Κεντρικό Κλείδωμα", "Υδραυλικό Τιμόνι"];

  const cars: CarType[] = [
    { id: "3",  name: "TOYOTA AYGO",              category: "A",  image: carImages.toyotaAygo,      passengers: 4, luggage: 1.5, engine: "1000cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.8, features: standardFeatures, roadType: "onlyRoad" },
    { id: "4",  name: "TOYOTA AYGO",              category: "A",  image: carImages.toyotaAygoNew,   passengers: 4, luggage: 1.5, engine: "1000cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "5",  name: "HYUNDAI i10",              category: "B",  image: carImages.hyundaiI10,      passengers: 5, luggage: 2, engine: "1086cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "7",  name: "NISSAN MICRA",             category: "B",  image: carImages.nissanMicra,     passengers: 5, luggage: 2.5, engine: "1200cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "6",  name: "KIA PICANTO",              category: "B",  image: carImages.kiaPicantoNew,   passengers: 5, luggage: 2, engine: "1200cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 5,   features: standardFeatures, roadType: "onlyRoad" },
    { id: "9",  name: "KIA PICANTO",              category: "B1", image: carImages.kiaPicantoAuto,  passengers: 5, luggage: 2, engine: "1200cc", doors: 5, transmission: "Αυτόματο",    fuel: "Βενζίνη", rating: 5,   features: standardFeatures, roadType: "onlyRoad" },
    { id: "10", name: "HYUNDAI i20",              category: "C",  image: carImages.hyundaiI20,      passengers: 5, luggage: 3, engine: "1400cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "11", name: "PEUGEOT 208",              category: "C",  image: carImages.peugeot208,      passengers: 5, luggage: 3, engine: "1400cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "18", name: "MG MG3",                   category: "C",  image: mg3Image,                  passengers: 5, luggage: 3, engine: "1500cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.8, features: standardFeatures, roadType: "onlyRoad" },
    { id: "13", name: "RENAULT CLIO",             category: "C",  image: carImages.renaultClio,     passengers: 5, luggage: 3, engine: "1200cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 5,   features: standardFeatures, roadType: "onlyRoad" },
    { id: "21", name: "MG MG3 HYBRID+",           category: "C1", image: mg3HybridImage,            passengers: 5, luggage: 3, engine: "1500cc", doors: 5, transmission: "Αυτόματο",    fuel: "Υβριδικό", rating: 5,   features: standardFeatures, roadType: "forBeaches" },
    { id: "15", name: "FIAT DOBLO",               category: "D",  image: carImages.fiatDoblo,       passengers: 7, luggage: 1, engine: "1400cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "onlyRoad" },
    { id: "16", name: "DACIA DUSTER 4x2",         category: "G",  image: carImages.daciaDuster,     passengers: 5, luggage: 4, engine: "1200cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "beachOrMountain" },
    { id: "17", name: "SUZUKI JIMNY 4x4",         category: "G1", image: carImages.suzukiJimny,     passengers: 4, luggage: 1, engine: "1300cc", doors: 2, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 5,   features: standardFeatures, roadType: "beachOrMountain" },
    { id: "19", name: "MG ZS MAX",                category: "G2", image: mgZsImage,                 passengers: 5, luggage: 4, engine: "1500cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "forBeaches" },
    { id: "20", name: "NISSAN JUKE",              category: "G2", image: nissanJukeImage,           passengers: 5, luggage: 3, engine: "1000cc", doors: 5, transmission: "Χειροκίνητο", fuel: "Βενζίνη", rating: 4.9, features: standardFeatures, roadType: "forBeaches" },
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
      fuel: []
    });
  };

  const handleBookNow = (car?: { id: string; name: string }) => {
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
      <Header onBookingClick={() => setBookingOpen(true)} />

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
                <div className="text-2xl md:text-4xl font-bold text-amber-400">{new Date().getFullYear() - 2000}</div>
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
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <SlidersHorizontal size={17} className="text-amber-600" strokeWidth={2.2} />
                    </div>
                    <span className="text-sm text-gray-600 leading-tight min-w-0">
                      <span className="font-bold text-amber-600 text-base">{filteredCars.length}</span> {t("fleet.filters.available")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      onClick={(e) => { e.stopPropagation(); clearAllFilters(); }}
                      className="text-[9px] tracking-[0.12em] uppercase text-amber-700 hover:text-amber-900 font-semibold px-2 py-1 rounded-full bg-amber-50 border border-amber-200 cursor-pointer"
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
                className="group relative bg-white rounded-2xl overflow-hidden ring-1 ring-amber-200/60 shadow-[0_4px_20px_-8px_rgba(245,158,11,0.18),_0_15px_40px_-18px_rgba(120,80,20,0.12)] sm:hover:ring-amber-300 sm:hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.4),_0_30px_60px_-18px_rgba(120,80,20,0.3)] sm:hover:-translate-y-1.5 transition-all duration-500 ease-out"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="relative w-full h-full object-cover transition-transform duration-700 ease-out sm:group-hover:scale-[1.06] sm:transform-gpu sm:backface-hidden sm:will-change-transform"
                  />

                  {/* Road Type chip — top left */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-amber-700 border border-amber-300 shadow-md px-2.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap pointer-events-none">
                    {t(`fleet.roadType.${car.roadType}`)}
                  </div>
                  {/* Category chip — top right */}
                  <div className="absolute top-3 right-3 bg-gradient-to-br from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full shadow-lg shadow-amber-600/30 text-[10px] font-bold tracking-[0.15em] uppercase pointer-events-none">
                    {categoryLabel[car.category] ?? car.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-5">
                  <h3 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">{car.name}</h3>

                  {/* 6 Specs in 2 columns */}
                  <div className="grid grid-cols-2 gap-2.5 mb-5">
                    <div className="flex items-center gap-2">
                      <TransmissionIcon className="text-amber-600" size={18} />
                      <span className="text-sm text-gray-700">{tv(car.transmission)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="text-amber-600" size={18} />
                      <span className="text-sm text-gray-700">{car.luggage} {t(car.luggage <= 1.5 ? "fleet.card.luggageSingular" : "fleet.card.luggage")}</span>
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

                  {/* Gradient divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent mb-5"></div>

                  {/* Price */}
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
              <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-2xl">
                <img
                  src={detailsModalCar.image}
                  alt={detailsModalCar.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 break-words">{detailsModalCar.name}</h2>
                <p className="text-amber-600 font-semibold mb-4 text-sm">{categoryLabel[detailsModalCar.category] ?? detailsModalCar.category} • {t(`fleet.roadType.${detailsModalCar.roadType}`)}</p>

                {/* Specs Grid - 2x3 with amber backgrounds */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <div className="bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-1.5 text-amber-600 mb-0.5">
                      <Users size={16} />
                      <p className="text-[11px] text-gray-600">{t("details.passengers")}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{detailsModalCar.passengers} {t("details.people")}</p>
                  </div>
                  <div className="bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-1.5 text-amber-600 mb-0.5">
                      <Briefcase size={16} />
                      <p className="text-[11px] text-gray-600">{t("details.luggage")}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{detailsModalCar.luggage} {t(detailsModalCar.luggage <= 1.5 ? "details.luggageUnitSingular" : "details.luggageUnit")}</p>
                  </div>
                  <div className="bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-1.5 text-amber-600 mb-0.5">
                      <TransmissionIcon size={16} />
                      <p className="text-[11px] text-gray-600">{t("details.transmission")}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{tv(detailsModalCar.transmission)}</p>
                  </div>
                  <div className="bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-1.5 text-amber-600 mb-0.5">
                      <EngineIcon size={16} />
                      <p className="text-[11px] text-gray-600">{t("details.engine")}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{detailsModalCar.engine}</p>
                  </div>
                  <div className="bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-1.5 text-amber-600 mb-0.5">
                      <Fuel size={16} />
                      <p className="text-[11px] text-gray-600">{t("details.fuel")}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{tv(detailsModalCar.fuel)}</p>
                  </div>
                  <div className="bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-1.5 text-amber-600 mb-0.5">
                      <DoorClosed size={16} />
                      <p className="text-[11px] text-gray-600">{t("details.doors")}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{detailsModalCar.doors}</p>
                  </div>
                </div>

                {/* Equipment */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t("details.features")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1.5">
                    {detailsModalCar.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="text-amber-600 flex-shrink-0" size={16} />
                        <span className="text-gray-700 text-sm">{tv(feature)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setDetailsModalCar(null);
                    handleBookNow(detailsModalCar);
                  }}
                  className="w-full bg-amber-600 text-white py-3 rounded-xl hover:bg-amber-700 transition-all duration-300 font-bold text-base tracking-wide shadow-lg shadow-amber-600/40 hover:shadow-2xl hover:shadow-amber-700/50 hover:-translate-y-1 relative overflow-hidden group"
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