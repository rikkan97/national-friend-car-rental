import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { AlertTriangle, Shield, FileText, User, Calendar, DollarSign, MapPin, Baby, Navigation, Fuel as FuelIcon } from "lucide-react";
import { useState } from "react";
import { BookingForm } from "../components/BookingForm";
import contractImage from "figma:asset/contract.avif";
import { useT } from "../../i18n/LanguageContext";

export function Terms() {
  const { t } = useT();
  const [bookingOpen, setBookingOpen] = useState(false);

  const cars = [
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

  const topFeatures = [
    { icon: User,       title: t("terms.f1Title"), description: t("terms.f1Desc") },
    { icon: FileText,   title: t("terms.f2Title"), description: t("terms.f2Desc") },
    { icon: Calendar,   title: t("terms.f3Title"), description: t("terms.f3Desc") },
    { icon: DollarSign, title: t("terms.f4Title"), description: t("terms.f4Desc") },
    { icon: FuelIcon,   title: t("terms.f5Title"), description: t("terms.f5Desc") },
    { icon: Baby,       title: t("terms.f6Title"), description: t("terms.f6Desc") },
    { icon: Navigation, title: t("terms.f7Title"), description: t("terms.f7Desc") },
    { icon: MapPin,     title: t("terms.f8Title"), description: t("terms.f8Desc") },
  ];

  return (
    <div className="min-h-screen bg-slate-800">
      <Header onBookingClick={() => setBookingOpen(true)} />

      {/* Hero Section - Extended with Gradient Fade */}
      <section className="pt-32 pb-72 relative overflow-hidden">
        {/* Background Image with Gradient Fade */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${contractImage})`,
          }}
        />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-transparent to-gray-900/60" />
        
        {/* Gradient Fade to Background - extends downward */}
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-b from-transparent via-slate-800/60 to-slate-800" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 tracking-tight text-amber-500 leading-tight">
              {t("terms.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white font-bold tracking-wide leading-relaxed">
              {t("terms.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Top 8 Features Grid - Dark Theme */}
      <section className="relative -mt-64 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Wide Horizontal Cards - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20 relative z-10">
            {topFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:hover:-translate-y-0.5 flex items-start gap-5"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <feature.icon className="text-white" size={24} />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-amber-600 font-bold mb-2 text-base">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Three Boxes: Ασφάλεια | Φόροι | Πρόστιμα - White Background */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* ΑΣΦΑΛΕΙΑ */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                  <Shield className="text-white" size={22} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t("terms.insTitle")}</h2>
              </div>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                {t("terms.insDesc")}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="inline-block bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-xs w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">α</span>
                  <span className="text-gray-700 text-sm leading-relaxed">{t("terms.insItem1")} <span className="text-amber-600 font-bold">{t("terms.insAmount")}</span></span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="inline-block bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-xs w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">β</span>
                  <span className="text-gray-700 text-sm leading-relaxed">{t("terms.insItem2")} <span className="text-amber-600 font-bold">{t("terms.insAmount")}</span></span>
                </div>
              </div>
            </motion.div>

            {/* ΦΟΡΟΙ */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                  <FileText className="text-white" size={22} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t("terms.taxTitle")}</h2>
              </div>
              <div className="space-y-4 mt-12">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{t("terms.tax1")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{t("terms.tax2")}</span>
                </div>
              </div>
            </motion.div>

            {/* ΠΡΟΣΤΙΜΑ */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                  <AlertTriangle className="text-white" size={22} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{t("terms.finesTitle")}</h2>
              </div>
              <p className="text-gray-700 text-sm mt-12 leading-relaxed">
                {t("terms.finesDesc")}
              </p>
            </motion.div>
          </div>

          {/* ΑΠΑΛΛΑΓΕΣ - Υ��ΧΡΕΩΣΕΙΣ ΕΝΟΙΚΙΑΣΤΗ - White Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-10 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                <AlertTriangle className="text-white" size={26} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t("terms.liabTitle")}</h2>
            </div>
            <p className="text-gray-700 mb-8 leading-relaxed text-base">
              {t("terms.liabDesc")}
            </p>
            <div className="space-y-4">
              {[
                t("terms.liab1"),
                t("terms.liab2"),
                t("terms.liab3"),
                t("terms.liab4"),
                t("terms.liab5"),
                t("terms.liab6"),
                t("terms.liab7"),
                t("terms.liab8"),
                t("terms.liab9"),
              ].map((liability, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-700 text-base leading-relaxed">{liability}</span>
                </div>
              ))}
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