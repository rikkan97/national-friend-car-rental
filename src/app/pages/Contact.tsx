import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { BookingForm } from "../components/BookingForm";
import { useT } from "../../i18n/LanguageContext";

export function Contact() {
  const { t, lang } = useT();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [bookingOpen, setBookingOpen] = useState(false);

  const cars = [
    { id: "2",  name: "RENAULT TWINGO",         category: "A",  price: 35 },
    { id: "3",  name: "TOYOTA AYGO",            category: "A",  price: 35 },
    { id: "4",  name: "TOYOTA AYGO",        category: "A",  price: 38 },
    { id: "5",  name: "HYUNDAI i10",            category: "B",  price: 40 },
    { id: "6",  name: "KIA PICANTO",        category: "B",  price: 45 },
    { id: "7",  name: "NISSAN MICRA",           category: "B",  price: 40 },
    { id: "8",  name: "HYUNDAI i10",  category: "B1", price: 50 },
    { id: "9",  name: "KIA PICANTO",  category: "B1", price: 55 },
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

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lang }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Contact submit failed:", err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers, spaces, +, -, and ()
    const value = e.target.value.replace(/[^\d\s+\-()]/g, '');
    setFormData({
      ...formData,
      phone: value
    });
  };

  const emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email.trim());
  const phoneDigits = formData.phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length === 0 || phoneDigits.length >= 8;
  const isFormValid =
    formData.name.trim().length > 1 &&
    emailValid &&
    phoneValid &&
    formData.message.trim().length > 2;

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Header onBookingClick={() => setBookingOpen(true)} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white to-[#F5F1E8]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-gray-700">
              {t("contact.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 text-amber-600">{t("contact.infoTitle")}</h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="bg-gradient-to-br from-white via-white to-amber-50 border border-amber-200 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
                  <div className="flex flex-col sm:flex-row items-stretch gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <MapPin className="text-amber-600" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-amber-600 mb-2 text-lg">{t("contact.address")}</h3>
                        <p className="text-gray-800 font-semibold">National Friend Car Rental</p>
                        <p className="text-gray-600">{t("contact.addressValue")}</p>
                        <a
                          href="https://www.google.com/maps/place/National+friend+car+rental/@40.6264423,24.5707062,832m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14aee881bfbfe601:0x94151992b898ba44!8m2!3d40.6264383!4d24.5755771!16s%2Fg%2F11clynv1z6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-3 text-sm text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                        >
                          {t("contact.openMaps")}
                        </a>
                      </div>
                    </div>
                    <a
                      href="https://www.google.com/maps/place/National+friend+car+rental/@40.6264423,24.5707062,832m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14aee881bfbfe601:0x94151992b898ba44!8m2!3d40.6264383!4d24.5755771!16s%2Fg%2F11clynv1z6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full sm:w-72 h-44 rounded-xl overflow-hidden border-2 border-amber-200 flex-shrink-0 hover:border-amber-400 shadow-md hover:shadow-lg transition-all"
                      aria-label={t("contact.mapLabel")}
                    >
                      <iframe
                        src="https://maps.google.com/maps?q=40.62647656135406,24.5755827332496&z=16&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0, pointerEvents: "none" }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={t("contact.mapTitle")}
                      />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white border border-amber-200 p-6 rounded-xl shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-600 mb-2">{t("contact.phone")}</h3>
                      <p className="text-gray-700">Τ/F: (+30) 25930-52877</p>
                      <p className="text-gray-700">M: +30 697 4930 719</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white border border-amber-200 p-6 rounded-xl shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-600 mb-2">Email</h3>
                      <a href="mailto:info@national-friend.gr" className="text-gray-700 hover:text-amber-600 transition-colors">
                        info@national-friend.gr
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white border border-amber-200 p-6 rounded-xl shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-600 mb-2">{t("contact.hours")}</h3>
                      <p className="text-gray-700 font-semibold">{t("contact.daysRange")}</p>
                      <p className="text-gray-600">09:00 - 22:30</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 text-amber-600">{t("contact.formTitle")}</h2>
              
              {status === "success" ? (
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 p-8 rounded-xl shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle2 size={36} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("contact.successTitle")}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{t("contact.successMessage")}</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                  >
                    {t("contact.sendAnother")}
                  </button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 p-8 rounded-xl space-y-6 shadow-lg">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.firstName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                    placeholder={t("contact.firstNamePH")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900 ${
                      formData.email && !emailValid ? "border-red-400" : "border-amber-200"
                    }`}
                    placeholder="email@example.com"
                  />
                  {formData.email && !emailValid && (
                    <p className="mt-1 text-xs text-red-600">Μη έγκυρο email (π.χ. name@example.com)</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.phoneField")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900 ${
                      formData.phone && !phoneValid ? "border-red-400" : "border-amber-200"
                    }`}
                    placeholder="+30 6912345678"
                  />
                  {formData.phone && !phoneValid && (
                    <p className="mt-1 text-xs text-red-600">Συμπληρώστε έγκυρο τηλέφωνο (≥8 ψηφία)</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact.message")}
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none text-gray-900"
                    placeholder={t("contact.messagePH")}
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{t("contact.errorAlert")}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || !isFormValid}
                  className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                    isFormValid && !submitting
                      ? "bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-600/50 cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  {submitting ? t("contact.sending") : t("contact.send")} <Send size={20} />
                </button>
              </form>
              )}
            </motion.div>
          </div>
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