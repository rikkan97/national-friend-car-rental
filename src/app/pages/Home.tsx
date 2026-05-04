import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { Car, Shield, MapPin, Star, CheckCircle, ArrowRight, Users, DoorClosed, Fuel, Briefcase, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { BookingForm } from "../components/BookingForm";
import { useNavigate } from "react-router";
import { TransmissionIcon } from "../components/TransmissionIcon";
import { EngineIcon } from "../components/EngineIcon";
import { useT, useTv } from "../../i18n/LanguageContext";
import jukeImg from "../../assets/cars/juke.webp";
import clioImg from "../../assets/cars/clio.webp";
import peugeot208Img from "../../assets/cars/peugeot-208.webp";
import mgZsImg from "../../assets/cars/zs.webp";
import heroImage from "../../assets/hero-home.webp";

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

export function Home() {
  const { t, lang } = useT();
  const tv = useTv();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [detailsModalCar, setDetailsModalCar] = useState<CarType | null>(null);
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState<{ id: string; name: string } | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cars = [
    { id: "3",  name: "TOYOTA AYGO",            category: "A",  roadType: "onlyRoad"        as const },
    { id: "4",  name: "TOYOTA AYGO",            category: "A",  roadType: "onlyRoad"        as const },
    { id: "5",  name: "HYUNDAI i10",            category: "B",  roadType: "onlyRoad"        as const },
    { id: "6",  name: "KIA PICANTO",            category: "B",  roadType: "onlyRoad"        as const },
    { id: "7",  name: "NISSAN MICRA",           category: "B",  roadType: "onlyRoad"        as const },
    { id: "9",  name: "KIA PICANTO",            category: "B1", roadType: "onlyRoad"        as const },
    { id: "10", name: "HYUNDAI i20",            category: "C",  roadType: "onlyRoad"        as const },
    { id: "11", name: "PEUGEOT 208",            category: "C",  roadType: "onlyRoad"        as const },
    { id: "13", name: "RENAULT CLIO",           category: "C",  roadType: "onlyRoad"        as const },
    { id: "18", name: "MG MG3",                 category: "C",  roadType: "onlyRoad"        as const },
    { id: "21", name: "MG MG3 HYBRID+",         category: "C1", roadType: "forBeaches"      as const },
    { id: "15", name: "FIAT DOBLO",             category: "D",  roadType: "onlyRoad"        as const },
    { id: "16", name: "DACIA DUSTER 4x2",       category: "G",  roadType: "beachOrMountain" as const },
    { id: "17", name: "SUZUKI JIMNY 4x4",       category: "G1", roadType: "beachOrMountain" as const },
    { id: "19", name: "MG ZS MAX",              category: "G2", roadType: "forBeaches"      as const },
    { id: "20", name: "NISSAN JUKE",            category: "G2", roadType: "forBeaches"      as const },
  ];

  const popularCarFeatures = ["Κλιματισμός", "Ηλεκτρικά Παράθυρα", "Radio / CD", "Κεντρικό Κλείδωμα", "Υδραυλικό Τιμόνι"];

  const popularCars: CarType[] = [
    {
      id: "20",
      name: "NISSAN JUKE",
      category: "G2",
      image: jukeImg,
      passengers: 5,
      luggage: 3,
      engine: "1000cc",
      doors: 5,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 4.9,
      features: popularCarFeatures,
      roadType: "forBeaches"
    },
    {
      id: "13",
      name: "RENAULT CLIO",
      category: "C",
      image: clioImg,
      passengers: 5,
      luggage: 3,
      engine: "1200cc",
      doors: 5,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 5,
      features: popularCarFeatures,
      roadType: "onlyRoad"
    },
    {
      id: "11",
      name: "PEUGEOT 208",
      category: "C",
      image: peugeot208Img,
      passengers: 5,
      luggage: 3,
      engine: "1400cc",
      doors: 5,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 4.9,
      features: popularCarFeatures,
      roadType: "onlyRoad"
    },
    {
      id: "19",
      name: "MG ZS MAX",
      category: "G2",
      image: mgZsImg,
      passengers: 5,
      luggage: 4,
      engine: "1500cc",
      doors: 5,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 4.9,
      features: popularCarFeatures,
      roadType: "forBeaches"
    }
  ];

  const popularCount = popularCars.length;
  const goNext = () => setActiveIdx((i) => (i + 1) % popularCount);
  const goPrev = () => setActiveIdx((i) => (i - 1 + popularCount) % popularCount);

  // Touch swipe handlers for the carousel
  const touchStartX = useRef<number | null>(null);
  const onCarouselTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onCarouselTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const handleBookNow = (car: CarType) => {
    setSelectedCar({ id: car.id, name: car.name });
    setBookingOpen(true);
  };

  const yearsActive = new Date().getFullYear() - 2000;
  const fillYears = (s: string) => s.replace("{years}", String(yearsActive));

  const features = [
    { icon: Car,     title: t("home.features.f1Title"), description: t("home.features.f1Desc") },
    { icon: Shield,  title: t("home.features.f2Title"), description: t("home.features.f2Desc") },
    { icon: MapPin,  title: t("home.features.f3Title"), description: t("home.features.f3Desc") },
    { icon: Star,    title: fillYears(t("home.features.f4Title")), description: t("home.features.f4Desc") },
  ];

  const categoryLabel: Record<string, string> = {
    A:  t("home.booking.catA"),
    B:  t("home.booking.catB"),
    B1: t("home.booking.catB1"),
    C:  t("home.booking.catC"),
    C1: t("home.booking.catC1"),
    D:  t("home.booking.catD"),
    G:  t("home.booking.catG"),
    G1: t("home.booking.catG1"),
    G2: t("home.booking.catG2"),
  };

  const benefits = [
    t("home.benefits.b1"),
    t("home.benefits.b2"),
    t("home.benefits.b3"),
    t("home.benefits.b4"),
    t("home.benefits.b5"),
    t("home.benefits.b6"),
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Header onBookingClick={() => setBookingOpen(true)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Car Rental"
            className="w-full h-full object-cover opacity-110 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1E8]/85 via-[#F5F1E8]/70 to-[#F5F1E8]/85" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-amber-600" />
              <span className="text-amber-700 tracking-[0.3em] text-xs uppercase font-medium">{t("home.hero.eyebrow")}</span>
              <div className="h-px w-12 bg-amber-600" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-gray-900">
              <span className="text-amber-600">{t("home.hero.brand1")}</span>
              <br />
              <span className="text-gray-900">{t("home.hero.brand2")}</span>
            </h1>

            <div className="h-px w-20 bg-amber-600/60 mb-8 mx-auto" />

            {/* Description text — minimalist, no box */}
            <div className="space-y-5 mb-10 max-w-2xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-medium drop-shadow-sm">{t("home.hero.para1")}</p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed drop-shadow-sm">{fillYears(t("home.hero.para2"))}</p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed drop-shadow-sm">{t("home.hero.para3")}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <button
                onClick={() => navigate(`/${lang}/our-cars`)}
                className="group inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition-all duration-300 font-bold text-base tracking-wide shadow-lg shadow-amber-600/40 hover:shadow-2xl hover:shadow-amber-700/50 hover:-translate-y-0.5"
              >
                <span>{t("home.viewAllFleet")}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-amber-500 text-amber-700 px-8 py-4 rounded-xl hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 font-bold text-base tracking-wide shadow-md hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5"
              >
                <span>{t("nav.contact")}</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          
        </motion.div>
      </section>

      {/* Popular Choices Section */}
      <section className="relative py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-amber-600" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{t("home.popular.title")}</h2>
              <div className="h-px w-8 bg-amber-600" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("home.popular.subtitle")}</p>
          </motion.div>

          {/* Coverflow Carousel */}
          <div className="relative">
            {/* Arrow buttons */}
            <button
              onClick={goPrev}
              aria-label="Previous"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur shadow-lg shadow-amber-600/20 ring-1 ring-amber-200 text-amber-700 hover:bg-amber-600 hover:text-white hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            <button
              onClick={goNext}
              aria-label="Next"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur shadow-lg shadow-amber-600/20 ring-1 ring-amber-200 text-amber-700 hover:bg-amber-600 hover:text-white hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>

            {/* Stage */}
            <div
              className="relative flex items-center justify-center min-h-[640px] sm:min-h-[760px] overflow-hidden touch-pan-y select-none"
              onTouchStart={onCarouselTouchStart}
              onTouchEnd={onCarouselTouchEnd}
            >
              {popularCars.map((car, idx) => {
                let off = idx - activeIdx;
                const half = popularCount / 2;
                if (off > half) off -= popularCount;
                else if (off < -half) off += popularCount;
                const isActive = off === 0;
                const isVisible = Math.abs(off) <= 1;
                const offsetX = isMobile ? 170 : 420;
                return (
                  <motion.div
                    key={car.id}
                    animate={{
                      x: off * offsetX,
                      scale: isActive ? 1 : 0.85,
                      opacity: isVisible ? (isActive ? 1 : 0.5) : 0,
                      zIndex: isActive ? 30 : 20 - Math.abs(off),
                      filter: isActive ? "blur(0px)" : "blur(1.5px)",
                    }}
                    transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                    style={{ pointerEvents: isVisible ? "auto" : "none" }}
                    onClick={() => { if (!isActive && isVisible) setActiveIdx(idx); }}
                    className={`absolute w-[290px] sm:w-[440px] ${!isActive && isVisible ? "cursor-pointer" : ""}`}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden ring-1 ring-amber-200/60 shadow-[0_10px_30px_-10px_rgba(245,158,11,0.4),_0_30px_60px_-18px_rgba(120,80,20,0.3)]">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Content */}
                      <div className="p-6 pt-5">
                        {/* Pills row */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="bg-white text-amber-700 border border-amber-300 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap">
                            {t(`fleet.roadType.${car.roadType}`)}
                          </span>
                          <span className="bg-gradient-to-br from-amber-500 to-amber-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase whitespace-nowrap">
                            {categoryLabel[car.category] ?? car.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">{car.name}</h3>

                        <div className="grid grid-cols-2 gap-2.5 mb-5">
                          <div className="flex items-center gap-2">
                            <TransmissionIcon className="text-amber-600" size={18} />
                            <span className="text-sm text-gray-700">{tv(car.transmission)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="text-amber-600" size={18} />
                            <span className="text-sm text-gray-700">{car.luggage} {t(car.luggage <= 1.5 ? "home.popular.luggageSingular" : "home.popular.luggage")}</span>
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
                            <span className="text-sm text-gray-700">{car.doors} {t("home.popular.doors")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="text-amber-600" size={18} />
                            <span className="text-sm text-gray-700">{car.passengers} {t("home.popular.people")}</span>
                          </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent mb-5"></div>

                        <div className="space-y-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); setDetailsModalCar(car); }}
                            disabled={!isActive}
                            className="w-full bg-white border-2 border-amber-500 text-amber-700 py-3.5 rounded-xl hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 font-bold text-base tracking-wide shadow-md hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-pointer disabled:hover:translate-y-0"
                          >
                            {t("home.popular.details")}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleBookNow(car); }}
                            disabled={!isActive}
                            className="w-full bg-amber-600 text-white py-3.5 rounded-xl hover:bg-amber-700 transition-all duration-300 font-bold text-base tracking-wide shadow-lg shadow-amber-600/40 hover:shadow-2xl hover:shadow-amber-700/50 hover:-translate-y-0.5 relative overflow-hidden group disabled:opacity-60 disabled:cursor-pointer disabled:hover:translate-y-0"
                          >
                            <span className="relative z-10">{t("home.popular.book")} →</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {popularCars.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${idx === activeIdx ? "w-8 bg-amber-600" : "w-2 bg-amber-300 hover:bg-amber-400"}`}
                />
              ))}
            </div>
          </div>

          {/* View All Fleet CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => navigate(`/${lang}/our-cars`)}
              className="group inline-flex items-center gap-3 bg-white border-2 border-amber-500 text-amber-700 px-10 py-4 rounded-xl hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 font-bold text-base tracking-wide shadow-md hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5"
            >
              <span>{t("home.viewAllFleet")}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-28 bg-gradient-to-b from-[#F5F1E8] to-white overflow-hidden">
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-amber-600" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{t("home.features.title")}</h2>
              <div className="h-px w-8 bg-amber-600" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("home.features.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white border border-amber-200 p-8 rounded-xl sm:transition-all sm:duration-500 sm:hover:border-amber-500 sm:hover:shadow-xl sm:hover:shadow-amber-500/10 sm:hover:-translate-y-1"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-5 border border-amber-300 rounded-lg bg-amber-50 sm:transition-all sm:group-hover:bg-amber-100 sm:group-hover:border-amber-500">
                  <feature.icon className="text-amber-600" size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-amber-600">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/30 via-amber-300/10 to-amber-400/30 rounded-2xl blur-sm" />
            <div className="relative bg-white border-2 border-amber-300 rounded-2xl p-10 shadow-lg">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-4">
                  <div className="h-px w-6 bg-amber-600" />
                  <h3 className="text-3xl font-bold text-amber-600">{t("home.benefits.title")}</h3>
                  <div className="h-px w-6 bg-amber-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full border border-amber-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-10 bg-amber-500 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-3 flex-wrap justify-center">
              <div className="h-px w-6 bg-white/70" />
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {t("home.cta.title1")} <span>{t("home.cta.title2")}</span>
              </h2>
              <div className="h-px w-6 bg-white/70" />
            </div>
            <p className="text-base mb-5 max-w-2xl mx-auto text-white/90">
              {t("home.cta.subtitle")}
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="group relative inline-flex items-center gap-2 overflow-hidden bg-white text-amber-700 px-7 py-3 rounded-lg text-xs font-semibold tracking-[0.2em] uppercase hover:bg-amber-50 hover:shadow-xl transition-all hover:scale-105 shadow-lg"
            >
              <span className="relative z-10">{t("home.cta.button")}</span>
              <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      <BookingForm
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedCar={selectedCar}
        cars={cars}
      />

      {/* Details Modal */}
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
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{detailsModalCar.name}</h2>
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
                  {detailsModalCar.features.map((feature, idx) => (
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
    </div>
  );
}