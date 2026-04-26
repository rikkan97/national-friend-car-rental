import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { Car, Shield, MapPin, Star, CheckCircle, ArrowRight, Calendar as CalendarIcon, Users, DoorClosed, Fuel, Briefcase, X } from "lucide-react";
import { useState, useEffect } from "react";
import { BookingForm } from "../components/BookingForm";
import { useNavigate } from "react-router";
import { Calendar } from "../components/Calendar";
import { DateRange } from "react-day-picker";
import { TransmissionIcon } from "../components/TransmissionIcon";
import { EngineIcon } from "../components/EngineIcon";
import { useT, useTv } from "../../i18n/LanguageContext";
import twingoImg from "../../assets/cars/twingo.webp";
import aygo2Img from "../../assets/cars/aygo2.webp";
import i10Img from "../../assets/cars/i10.webp";
import picantoOldImg from "../../assets/cars/picanto-old.webp";
import i20Img from "../../assets/cars/i20.webp";
import dobloImg from "../../assets/cars/doblo.webp";
import dusterImg from "../../assets/cars/duster.webp";
import jimnyImg from "../../assets/cars/jimny.webp";
import mgZsImg from "../../assets/cars/zs.webp";

const heroImage = "https://images.unsplash.com/photo-1760976396211-5546ce83a400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYXIlMjByZW50YWwlMjBsdXh1cnklMjB2ZWhpY2xlfGVufDF8fHx8MTc3MTM3MzEwNHww&ixlib=rb-4.1.0&q=80&w=1080";

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

export function Home() {
  const { t, lang } = useT();
  const tv = useTv();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [detailsModalCar, setDetailsModalCar] = useState<CarType | null>(null);
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const [heroBooking, setHeroBooking] = useState({
    carType: "",
    passengers: "",
    fuelType: "",
    transmission: ""
  });
  const [selectedCar, setSelectedCar] = useState<{ id: string; name: string; price: number } | null>(null);

  const cars = [
    { id: "2",  name: "RENAULT TWINGO",         category: "A",  price: 35 },
    { id: "3",  name: "TOYOTA AYGO",            category: "A",  price: 35 },
    { id: "4",  name: "TOYOTA AYGO",        category: "A",  price: 38 },
    { id: "5",  name: "HYUNDAI i10",            category: "B",  price: 40 },
    { id: "6",  name: "KIA PICANTO",        category: "B",  price: 45 },
    { id: "7",  name: "NISSAN MICRA",           category: "B",  price: 40 },
    { id: "9",  name: "KIA PICANTO",  category: "B1", price: 55 },
    { id: "10", name: "HYUNDAI i20",            category: "C",  price: 45 },
    { id: "11", name: "PEUGEOT 208",            category: "C",  price: 45 },
    { id: "13", name: "RENAULT CLIO",           category: "C",  price: 50 },
    { id: "14", name: "DACIA SANDERO",          category: "C",  price: 45 },
    { id: "18", name: "MG3",                    category: "C",  price: 48 },
    { id: "15", name: "FIAT DOBLO",             category: "D",  price: 55 },
    { id: "16", name: "DACIA DUSTER 4x2",       category: "G",  price: 65 },
    { id: "17", name: "SUZUKI JIMNY 4x4",       category: "G1", price: 75 },
    { id: "19", name: "MG ZS MAX",              category: "G2", price: 70 },
    { id: "20", name: "NISSAN JUKE",            category: "G2", price: 70 },
    { id: "21", name: "MG3 HYBRID+",            category: "G2", price: 75 },
  ];

  const popularCarFeatures = ["Κλιματισμός", "Ηλεκτρικά Παράθυρα", "Radio / CD", "Κεντρικό Κλείδωμα", "Υδραυλικό Τιμόνι"];

  const popularCars: CarType[] = [
    {
      id: "2",
      name: "RENAULT TWINGO",
      category: "A",
      image: twingoImg,
      price: 35,
      passengers: 4,
      luggage: 3,
      engine: "1200cc",
      doors: 2,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 4.8,
      features: popularCarFeatures,
      roadType: "onlyRoad"
    },
    {
      id: "4",
      name: "TOYOTA AYGO",
      category: "A",
      image: aygo2Img,
      price: 38,
      passengers: 4,
      luggage: 3,
      engine: "1000cc",
      doors: 5,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 4.9,
      features: popularCarFeatures,
      roadType: "onlyRoad"
    },
    {
      id: "5",
      name: "HYUNDAI i10",
      category: "B",
      image: i10Img,
      price: 40,
      passengers: 5,
      luggage: 3,
      engine: "1086cc",
      doors: 5,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 4.9,
      features: popularCarFeatures,
      roadType: "onlyRoad"
    },
    {
      id: "9",
      name: "KIA PICANTO",
      category: "B1",
      image: picantoOldImg,
      price: 55,
      passengers: 5,
      luggage: 3,
      engine: "1200cc",
      doors: 5,
      transmission: "Αυτόματο",
      fuel: "Βενζίνη",
      rating: 5,
      features: popularCarFeatures,
      roadType: "onlyRoad"
    },
    {
      id: "10",
      name: "HYUNDAI i20",
      category: "C",
      image: i20Img,
      price: 45,
      passengers: 5,
      luggage: 4,
      engine: "1400cc",
      doors: 5,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 4.9,
      features: popularCarFeatures,
      roadType: "onlyRoad"
    },
    {
      id: "15",
      name: "FIAT DOBLO",
      category: "D",
      image: dobloImg,
      price: 55,
      passengers: 7,
      luggage: 4,
      engine: "1400cc",
      doors: 5,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 4.9,
      features: popularCarFeatures,
      roadType: "onlyRoad"
    },
    {
      id: "16",
      name: "DACIA DUSTER 4x2",
      category: "G",
      image: dusterImg,
      price: 65,
      passengers: 5,
      luggage: 4,
      engine: "1200cc",
      doors: 5,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 4.9,
      features: popularCarFeatures,
      roadType: "beachOrMountain"
    },
    {
      id: "17",
      name: "SUZUKI JIMNY 4x4",
      category: "G1",
      image: jimnyImg,
      price: 75,
      passengers: 4,
      luggage: 2,
      engine: "1300cc",
      doors: 2,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 5,
      features: popularCarFeatures,
      roadType: "beachOrMountain"
    },
    {
      id: "19",
      name: "MG ZS MAX",
      category: "G2",
      image: mgZsImg,
      price: 70,
      passengers: 5,
      luggage: 3,
      engine: "1500cc",
      doors: 5,
      transmission: "Χειροκίνητο",
      fuel: "Βενζίνη",
      rating: 4.9,
      features: popularCarFeatures,
      roadType: "forBeaches"
    }
  ];

  const handleBookNow = (car: CarType) => {
    setSelectedCar({ id: car.id, name: car.name, price: car.price });
    setBookingOpen(true);
  };

  const features = [
    { icon: Car,     title: t("home.features.f1Title"), description: t("home.features.f1Desc") },
    { icon: Shield,  title: t("home.features.f2Title"), description: t("home.features.f2Desc") },
    { icon: MapPin,  title: t("home.features.f3Title"), description: t("home.features.f3Desc") },
    { icon: Star,    title: t("home.features.f4Title"), description: t("home.features.f4Desc") },
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Car Rental"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F1E8]/60 via-[#F5F1E8]/30 to-transparent" />
        </div>

        {/* Subtle gold accent lines */}
        <div className="absolute top-24 left-8 w-px h-24 bg-gradient-to-b from-transparent via-amber-600/40 to-transparent hidden lg:block" />
        <div className="absolute bottom-24 right-8 w-px h-24 bg-gradient-to-b from-transparent via-amber-600/40 to-transparent hidden lg:block" />

        <div className="relative z-10 container mx-auto px-4 pt-20 lg:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content - About */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-12 bg-amber-600" />
                <span className="text-amber-700 tracking-[0.3em] text-xs uppercase font-medium">{t("home.hero.eyebrow")}</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-gray-900">
                <span className="text-amber-600">{t("home.hero.brand1")}</span>
                <br />
                <span className="text-gray-900">{t("home.hero.brand2")}</span>
              </h1>

              <div className="h-px w-20 bg-amber-600/60 mb-8" />

              <p className="text-base md:text-lg text-gray-700 mb-5 leading-relaxed">{t("home.hero.para1")}</p>
              <p className="text-base md:text-lg text-gray-700 mb-5 leading-relaxed">{t("home.hero.para2")}</p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">{t("home.hero.para3")}</p>
            </motion.div>

            {/* Right Booking Module */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Orange border glow */}
              <div className="absolute -inset-0.5 bg-amber-500/60 rounded-2xl blur-sm" />

              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-amber-300 p-8 shadow-2xl shadow-amber-600/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px w-8 bg-amber-600" />
                  <span className="text-amber-700 tracking-[0.25em] text-[10px] uppercase font-medium">{t("home.booking.eyebrow")}</span>
                </div>
                <h3 className="text-2xl font-bold text-amber-600 mb-7">{t("home.booking.title")}</h3>

                <div className="space-y-5">
                  {/* Τύπος Οχήματος */}
                  <div>
                    <label className="block text-[11px] font-semibold text-amber-700 mb-2 tracking-[0.15em] uppercase">
                      {t("home.booking.vehicleType")}
                    </label>
                    <select
                      value={heroBooking.carType}
                      onChange={(e) => setHeroBooking({ ...heroBooking, carType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors bg-white text-gray-900"
                    >
                      <option value="">{t("home.booking.allCategories")}</option>
                      <option value="A">{t("home.booking.catA")}</option>
                      <option value="B">{t("home.booking.catB")}</option>
                      <option value="B1">{t("home.booking.catB1")}</option>
                      <option value="C">{t("home.booking.catC")}</option>
                      <option value="C1">{t("home.booking.catC1")}</option>
                      <option value="D">{t("home.booking.catD")}</option>
                      <option value="G">{t("home.booking.catG")}</option>
                      <option value="G1">{t("home.booking.catG1")}</option>
                      <option value="G2">{t("home.booking.catG2")}</option>
                    </select>
                  </div>

                  {/* Ημερομηνίες Παραλαβής & Επιστροφής */}
                  <div className="relative">
                    <label className="block text-[11px] font-semibold text-amber-700 mb-2 tracking-[0.15em] uppercase">
                      {t("home.booking.rentalDates")}
                    </label>
                    <button
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors bg-white text-left flex items-center justify-between"
                    >
                      <span className={dateRange?.from ? "text-gray-900" : "text-gray-500"}>
                        {dateRange?.from && dateRange?.to
                          ? `${dateRange.from.toLocaleDateString(lang === "en" ? "en-GB" : "el-GR")} - ${dateRange.to.toLocaleDateString(lang === "en" ? "en-GB" : "el-GR")}`
                          : t("home.booking.pickDates")}
                      </span>
                      <CalendarIcon className="text-amber-600" size={20} />
                    </button>

                    {showCalendar && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setShowCalendar(false)}
                        />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                          <Calendar
                            mode="range"
                            numberOfMonths={isMobile ? 1 : 2}
                            selected={dateRange}
                            onSelect={(range) => setDateRange(range as DateRange)}
                            disabled={(date) => date < new Date()}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Grid για Επιβάτες & Καύσιμο */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-amber-700 mb-2 tracking-[0.15em] uppercase">
                        {t("home.booking.passengers")}
                      </label>
                      <select
                        value={heroBooking.passengers}
                        onChange={(e) => setHeroBooking({ ...heroBooking, passengers: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors bg-white text-gray-900"
                      >
                        <option value="">{t("home.booking.all")}</option>
                        <option value="2-4">2 - 4</option>
                        <option value="5">5</option>
                        <option value="7+">7+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-amber-700 mb-2 tracking-[0.15em] uppercase">
                        {t("home.booking.fuel")}
                      </label>
                      <select
                        value={heroBooking.fuelType}
                        onChange={(e) => setHeroBooking({ ...heroBooking, fuelType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors bg-white text-gray-900"
                      >
                        <option value="">{t("home.booking.all")}</option>
                        <option value="Βενζίνη">{t("home.booking.petrol")}</option>
                        <option value="Πετρέλαιο">{t("home.booking.diesel")}</option>
                        <option value="Υβριδικό">{t("home.booking.hybrid")}</option>
                      </select>
                    </div>
                  </div>

                  {/* Κιβώτιο Ταχυτήτων */}
                  <div>
                    <label className="block text-[11px] font-semibold text-amber-700 mb-2 tracking-[0.15em] uppercase">
                      {t("home.booking.transmission")}
                    </label>
                    <select
                      value={heroBooking.transmission}
                      onChange={(e) => setHeroBooking({ ...heroBooking, transmission: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors bg-white text-gray-900"
                    >
                      <option value="">{t("home.booking.all")}</option>
                      <option value="Αυτόματο">{t("home.booking.automatic")}</option>
                      <option value="Χειροκίνητο">{t("home.booking.manual")}</option>
                    </select>
                  </div>

                  {/* Κουμπί Αναζήτησης */}
                  {(() => {
                    const heroValid = !!dateRange?.from && !!dateRange?.to;
                    return (
                      <button
                        disabled={!heroValid}
                        onClick={() => {
                          navigate('/fleet', {
                            state: {
                              categoryFilter: heroBooking.carType || undefined,
                              transmission:   heroBooking.transmission || undefined,
                              fuel:           heroBooking.fuelType || undefined,
                              passengers:     heroBooking.passengers || undefined,
                            },
                          });
                        }}
                        className={`group relative w-full overflow-hidden px-6 py-4 rounded-lg transition-all font-semibold text-base tracking-wider uppercase flex items-center justify-center gap-3 mt-2 ${
                          heroValid
                            ? "bg-amber-600 text-white hover:bg-amber-700 hover:shadow-2xl hover:shadow-amber-600/40 hover:scale-[1.02] shadow-lg shadow-amber-600/50 cursor-pointer"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        }`}
                      >
                        <span className="relative z-10">{t("home.booking.search")}</span>
                        <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        {heroValid && (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        )}
                      </button>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.03 }}
                className="group relative bg-white rounded-2xl overflow-hidden ring-1 ring-amber-200/60 shadow-[0_4px_20px_-8px_rgba(245,158,11,0.18),_0_15px_40px_-18px_rgba(120,80,20,0.12)] hover:ring-amber-300 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.4),_0_30px_60px_-18px_rgba(120,80,20,0.3)] hover:-translate-y-1.5 transition-all duration-500 ease-out"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="relative w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] transform-gpu backface-hidden will-change-transform"
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
                      <span className="text-sm text-gray-700">{car.luggage} {t("home.popular.luggage")}</span>
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

                  {/* Gradient divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent mb-5"></div>

                  {/* Price */}
                  <div className="mb-5">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-amber-700/80 font-semibold mb-1">{t("home.popular.from")}</p>
                    <p className="text-4xl font-bold leading-none bg-gradient-to-br from-amber-600 to-amber-700 bg-clip-text text-transparent">
                      {car.price}€<span className="text-sm text-gray-500 font-medium">{t("home.popular.perDay")}</span>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setDetailsModalCar(car)}
                      className="w-full bg-white border-2 border-amber-500 text-amber-700 py-3.5 rounded-xl hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 font-bold text-base tracking-wide shadow-md hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5"
                    >
                      {t("home.popular.details")}
                    </button>
                    <button
                      onClick={() => handleBookNow(car)}
                      className="w-full bg-amber-600 text-white py-3.5 rounded-xl hover:bg-amber-700 transition-all duration-300 font-bold text-base tracking-wide shadow-lg shadow-amber-600/40 hover:shadow-2xl hover:shadow-amber-700/50 hover:-translate-y-0.5 relative overflow-hidden group"
                    >
                      <span className="relative z-10">{t("home.popular.book")} →</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Fleet CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => navigate('/fleet')}
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
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={detailsModalCar.image}
                alt={detailsModalCar.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{detailsModalCar.name}</h2>
              <p className="text-amber-600 font-semibold mb-6">{detailsModalCar.category} • {detailsModalCar.engine}</p>

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

              {/* Equipment */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("details.features")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {detailsModalCar.features.map((feature, idx) => (
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
    </div>
  );
}