import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, UtensilsCrossed, Trees, Landmark, Heart, Award, Waves, Mountain, Camera, Sun, Users, Star, Palmtree, Ship, Compass, Car } from "lucide-react";
import { useState, useRef } from "react";
import { BookingForm } from "../components/BookingForm";
import { Link } from "react-router";
import { useT } from "../../i18n/LanguageContext";
import goldenBeachImage from "figma:asset/golden-beach.jpg";
import paradiseBeachImage from "figma:asset/paradise-beach.jpg";
import marbleBeachImage from "figma:asset/marble-beach.jpg";
import psiliAmmosImage from "figma:asset/psili-ammos.jpg";
import limenariaImage from "figma:asset/limenaria.png";
import panagiaImage from "figma:asset/panagia.png";
import theologosImage from "figma:asset/theologos.png";
import limenasImage from "figma:asset/limenas.jpg";
import potosImage from "figma:asset/potos.webp";
import meliImage from "figma:asset/meli.jpg";
import loukoumadesImage from "figma:asset/loukoumades.jpg";
import fishLocalImage from "figma:asset/fish.jpeg";
import oilImage from "figma:asset/oil.jpg";

const heroImage = "https://images.unsplash.com/photo-1665451778420-b44c9c9f22f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFzb3MlMjBncmVlY2UlMjBiZWFjaCUyMGNyeXN0YWwlMjB3YXRlcnxlbnwxfHx8fDE3NzIxMzY5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const villageImage = "https://images.unsplash.com/photo-1601883509837-bd0b602ea1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMGlzbGFuZCUyMHZpbGxhZ2UlMjB3aGl0ZSUyMGhvdXNlc3xlbnwxfHx8fDE3NzIxMzY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Food & Culture Images
const olivesImage = "https://images.unsplash.com/photo-1761047726992-4e47b1dda7a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMG9saXZlcyUyMGRpc2glMjBib3lsJTIwbWVkaXRlcnJhbmVhbiUyMGZvb2R8ZW58MXx8fHwxNzcyMTM3Nzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const fishImage = "https://images.unsplash.com/photo-1683700100386-106dbf01a615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZpc2glMjBwbGF0ZSUyMGxlbW9uJTIwc2VhZm9vZHxlbnwxfHx8fDE3NzIxMzc3OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const loukoumatesImage = "https://images.unsplash.com/photo-1711919432544-ba04b9b18169?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3Vrb3VtYWRlcyUyMGdyZWVrJTIwZG9udXRzJTIwaG9uZXl8ZW58MXx8fHwxNzcyMTM3NTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const villageImage2 = "https://images.unsplash.com/photo-1596562308037-cd8fd6f61c5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlayUyMHZpbGxhZ2UlMjB0cmFkaXRpb2ναλυMHdoaXRlJTIwaG91c2VzfGVufDF8fHx8MTc3MjEzNzUxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function Thasos() {
  const { t } = useT();
  const [bookingOpen, setBookingOpen] = useState(false);

  const cars = [
    { id: "1",  name: "KIA PICANTO",            category: "A",  price: 35 },
    { id: "2",  name: "RENAULT TWINGO",         category: "A",  price: 35 },
    { id: "3",  name: "TOYOTA AYGO",            category: "A",  price: 35 },
    { id: "4",  name: "TOYOTA AYGO NEW",        category: "A",  price: 38 },
    { id: "5",  name: "HYUNDAI i10",            category: "B",  price: 40 },
    { id: "6",  name: "KIA PICANTO NEW",        category: "B",  price: 45 },
    { id: "7",  name: "NISSAN MICRA",           category: "B",  price: 40 },
    { id: "8",  name: "HYUNDAI i10 Automatic",  category: "B1", price: 50 },
    { id: "9",  name: "KIA PICANTO Automatic",  category: "B1", price: 55 },
    { id: "10", name: "HYUNDAI i20",            category: "C",  price: 45 },
    { id: "11", name: "PEUGEOT 207",            category: "C",  price: 45 },
    { id: "12", name: "RENAULT CLIO",           category: "C",  price: 45 },
    { id: "13", name: "RENAULT CLIO NEW",       category: "C",  price: 50 },
    { id: "14", name: "DACIA SANDERO",          category: "C",  price: 45 },
    { id: "15", name: "FIAT DOBLO",             category: "D",  price: 55 },
    { id: "16", name: "DACIA DUSTER 4x2",       category: "G",  price: 65 },
    { id: "17", name: "SUZUKI JIMNY 4x4",       category: "G1", price: 75 },
  ];

  const beaches = [
    { name: t("thasos.beaches.b1Name"), description: t("thasos.beaches.b1Desc"), icon: Star },
    { name: t("thasos.beaches.b2Name"), description: t("thasos.beaches.b2Desc"), icon: Palmtree },
    { name: t("thasos.beaches.b3Name"), description: t("thasos.beaches.b3Desc"), icon: Trees },
    { name: t("thasos.beaches.b4Name"), description: t("thasos.beaches.b4Desc"), icon: Waves },
    { name: t("thasos.beaches.b5Name"), description: t("thasos.beaches.b5Desc"), icon: Mountain },
    { name: t("thasos.beaches.b6Name"), description: t("thasos.beaches.b6Desc"), icon: Users },
  ];

  const villages = [
    { name: t("thasos.villages.v1Name"), description: t("thasos.villages.v1Desc"), highlight: t("thasos.villages.v1High"), image: limenariaImage, objectPosition: "center",     zoom: 1,    origin: "center" },
    { name: t("thasos.villages.v2Name"), description: t("thasos.villages.v2Desc"), highlight: t("thasos.villages.v2High"), image: panagiaImage,   objectPosition: "center",     zoom: 1,    origin: "center" },
    { name: t("thasos.villages.v3Name"), description: t("thasos.villages.v3Desc"), highlight: t("thasos.villages.v3High"), image: theologosImage, objectPosition: "center",     zoom: 1,    origin: "center" },
    { name: t("thasos.villages.v4Name"), description: t("thasos.villages.v4Desc"), highlight: t("thasos.villages.v4High"), image: limenasImage,   objectPosition: "center",     zoom: 1,    origin: "center" },
    { name: t("thasos.villages.v5Name"), description: t("thasos.villages.v5Desc"), highlight: t("thasos.villages.v5High"), image: potosImage,     objectPosition: "center top", zoom: 1.15, origin: "center top" },
  ];

  const [activeVillage, setActiveVillage] = useState(0);
  const villageSectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const nextVillage = () => setActiveVillage((prev) => (prev + 1) % villages.length);
  const prevVillage = () => setActiveVillage((prev) => (prev - 1 + villages.length) % villages.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) nextVillage();
      else prevVillage();
    }
    touchStartX.current = null;
  };

  const activities = [
    { icon: Compass,         title: t("thasos.activities.a1Title"), description: t("thasos.activities.a1Desc") },
    { icon: Mountain,        title: t("thasos.activities.a2Title"), description: t("thasos.activities.a2Desc") },
    { icon: Ship,            title: t("thasos.activities.a3Title"), description: t("thasos.activities.a3Desc") },
    { icon: Trees,           title: t("thasos.activities.a4Title"), description: t("thasos.activities.a4Desc") },
    { icon: Camera,          title: t("thasos.activities.a5Title"), description: t("thasos.activities.a5Desc") },
    { icon: UtensilsCrossed, title: t("thasos.activities.a6Title"), description: t("thasos.activities.a6Desc") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f3ee] via-[#F5F1E8] to-[#ece7df]">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 relative overflow-hidden min-h-[420px] sm:min-h-[520px] lg:min-h-[620px] flex items-center">
        {/* Hero Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${goldenBeachImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#F5F1E8]" />

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
              <div className="h-1 w-1 rounded-full bg-amber-400" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
            </div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight px-2"
            >
              <span className="text-white">{t("thasos.hero.title1")} </span>
              <span className="text-amber-400">{t("thasos.hero.title2")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-2xl md:text-3xl text-white font-light tracking-wide leading-relaxed mb-3 px-4"
            >
              {t("thasos.hero.subtitle")}
            </motion.p>
            
            {/* Decorative Bottom Line */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beaches Section */}
      <section className="pt-6 pb-20 bg-gradient-to-br from-[#f6f3ee] via-[#F5F1E8] to-[#ece7df]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg">
                <Waves className="inline mr-2" size={16} />
                {t("thasos.beaches.badge")}
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("thasos.beaches.title1")} <span className="text-blue-600">{t("thasos.beaches.title2")}</span> {t("thasos.beaches.title3")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("thasos.beaches.subtitle")}
            </p>
          </motion.div>

          {/* Beach Images Grid - 3 Photos with Names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-72 group"
            >
              <img
                src={psiliAmmosImage}
                alt={t("thasos.beaches.imgPsiliAmmos")}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{t("thasos.beaches.imgPsiliAmmos")}</h3>
                
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-72 group"
            >
              <img
                src={goldenBeachImage}
                alt={t("thasos.beaches.imgGoldenBeach")}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{t("thasos.beaches.imgGoldenBeach")}</h3>
                
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-72 group"
            >
              <img
                src={marbleBeachImage}
                alt={t("thasos.beaches.imgMarble")}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{t("thasos.beaches.imgMarble")}</h3>
                
              </div>
            </motion.div>
          </div>

          {/* Beach Image Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]"
          >
            <img
              src={paradiseBeachImage}
              alt="Παράδεισος"
              style={{ transform: "scale(1.25)", transformOrigin: "right center" }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
              <div className="p-8 md:p-12 w-full">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  {t("thasos.beaches.bannerTitle")}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-gray-200 max-w-2xl"
                >{t("thasos.beaches.bannerDesc")}</motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Villages Section */}
      <section className="py-20 bg-gradient-to-br from-[#f6f3ee] via-[#F5F1E8] to-[#ece7df]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <div className="bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg">
                <MapPin className="inline mr-2" size={16} />
                {t("thasos.villages.badge")}
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("thasos.villages.title1")} <span className="text-amber-600">{t("thasos.villages.title2")}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("thasos.villages.subtitle")}
            </p>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            {/* Image Carousel */}
            <motion.div
              ref={villageSectionRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[320px] sm:h-[400px] lg:h-[500px] lg:sticky lg:top-24 touch-pan-y select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVillage}
                  src={villages[activeVillage].image}
                  alt={villages[activeVillage].name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    objectPosition: villages[activeVillage].objectPosition,
                    transform: `scale(${villages[activeVillage].zoom})`,
                    transformOrigin: villages[activeVillage].origin,
                  }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

              {/* Active village label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeVillage}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="inline-block bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                      {villages[activeVillage].highlight}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                      {villages[activeVillage].name}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dot indicators */}
              <div className="absolute top-4 right-4 flex gap-2">
                {villages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVillage(i)}
                    aria-label={`${t("thasos.villages.showLabel")} ${villages[i].name}`}
                    className={`h-2 rounded-full transition-all ${
                      i === activeVillage ? "w-6 bg-amber-400" : "w-2 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>

              {/* Prev/Next arrows (always visible; primarily for mobile) */}
              <button
                onClick={prevVillage}
                aria-label="Προηγούμενο χωριό"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center shadow-lg backdrop-blur-sm active:scale-95 transition"
              >
                <span className="text-xl leading-none">‹</span>
              </button>
              <button
                onClick={nextVillage}
                aria-label="Επόμενο χωριό"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-900 flex items-center justify-center shadow-lg backdrop-blur-sm active:scale-95 transition"
              >
                <span className="text-xl leading-none">›</span>
              </button>
            </motion.div>

            {/* Villages List */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-4"
            >
              {villages.map((village, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setActiveVillage(index)}
                  onClick={() => setActiveVillage(index)}
                  className={`bg-gradient-to-r from-amber-50 to-white p-6 rounded-2xl border transition-all cursor-pointer hover:shadow-lg hover:-translate-x-2 ${
                    activeVillage === index
                      ? "border-amber-500 shadow-lg -translate-x-2"
                      : "border-amber-200 hover:border-amber-400"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{village.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{village.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {village.highlight}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Food & Culture Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg">
                  <UtensilsCrossed className="inline mr-2" size={16} />
                  {t("thasos.food.badge")}
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t("thasos.food.title1")} <span className="text-amber-700">{t("thasos.food.title2")}</span>
              </h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                {t("thasos.food.content")}
              </p>
            </motion.div>

            {/* Images Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-64">
                  <img
                    src={oilImage}
                    alt="Παρθένο ελαιόλαδο Θάσου"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-48">
                  <img
                    src={loukoumadesImage}
                    alt="Λουκουμάδες"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-48">
                  <img
                    src={fishLocalImage}
                    alt="Φρέσκα ψάρια"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-64">
                  <img
                    src={meliImage}
                    alt="Θασίτικο μέλι"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-gradient-to-br from-[#f6f3ee] via-[#F5F1E8] to-[#ece7df]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg">
                <Compass className="inline mr-2" size={16} />
                {t("thasos.activities.badge")}
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("thasos.activities.title1")} <span className="text-green-600">{t("thasos.activities.title2")}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("thasos.activities.subtitle")}
            </p>
          </motion.div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all sm:hover:-translate-y-2 border border-green-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <activity.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                <p className="text-gray-600 leading-relaxed">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-amber-500 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-56 h-56 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-3"
            >
              <Car className="text-white" size={36} />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {t("thasos.cta.title")}
            </h2>
            <p className="text-base md:text-lg text-white/90 mb-5 leading-relaxed">
              {t("thasos.cta.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/fleet"
                className="inline-block bg-white text-amber-600 px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 font-bold text-base tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {t("thasos.cta.fleetBtn")} →
              </Link>
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 font-bold text-base tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {t("thasos.cta.bookBtn")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      <BookingForm
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedCar={null}
        cars={cars}
      />
    </div>
  );
}