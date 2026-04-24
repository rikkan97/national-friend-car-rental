import { motion, AnimatePresence } from "motion/react";
import { X, Car, User, Mail, Phone, MapPin, Baby, Calendar as CalendarIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Calendar } from "./Calendar";
import { DateRange } from "react-day-picker";
import { useT } from "../../i18n/LanguageContext";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: { id: string; name: string; price: number } | null;
  cars: { id: string; name: string; category: string; price: number }[];
}

export function BookingForm({ isOpen, onClose, selectedCar, cars }: BookingFormProps) {
  const { t, lang } = useT();
  const [formData, setFormData] = useState({
    car: "",
    pickupDate: "",
    returnDate: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickupLocation: "Λιμενάρια",
    childSeats: 0,
    comments: ""
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Sync dateRange -> formData pickupDate/returnDate (ISO yyyy-mm-dd)
  useEffect(() => {
    const toISO = (d?: Date) => (d ? d.toISOString().split("T")[0] : "");
    setFormData(prev => ({
      ...prev,
      pickupDate: toISO(dateRange?.from),
      returnDate: toISO(dateRange?.to),
    }));
  }, [dateRange]);

  // Update car selection when selectedCar changes
  useEffect(() => {
    if (selectedCar) {
      setFormData(prev => ({
        ...prev,
        car: selectedCar.id
      }));
    }
  }, [selectedCar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus("idle");
    try {
      const selectedCarData = cars.find(c => c.id === formData.car);
      const days = calculateDays();
      const total = calculateTotal();

      const res = await fetch("/api/send-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          carName: selectedCarData?.name ?? formData.car,
          category: selectedCarData?.category,
          days,
          total,
          lang,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch (err) {
      console.error("Booking submit failed:", err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStatus("idle");
    onClose();
  };

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    const pickup = new Date(formData.pickupDate);
    const returnDate = new Date(formData.returnDate);
    const diffTime = Math.abs(returnDate.getTime() - pickup.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = () => {
    const days = calculateDays();
    if (days === 0 || !formData.car) return 0;
    const car = cars.find(c => c.id === formData.car);
    if (!car) return 0;
    const carPrice = car.price * days;
    const childSeatsPrice = formData.childSeats * 2 * days;
    return carPrice + childSeatsPrice;
  };

  const emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email.trim());
  const phoneDigits = formData.phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length > 0;
  const isFormValid =
    !!formData.car &&
    !!dateRange?.from &&
    !!dateRange?.to &&
    formData.firstName.trim().length > 0 &&
    formData.lastName.trim().length > 0 &&
    emailValid &&
    phoneValid &&
    !!formData.pickupLocation;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto"
          >
            <div className="bg-white border border-amber-200 rounded-2xl shadow-2xl max-w-4xl w-full my-4 sm:my-8 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-amber-600 text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl z-10">
                <h2 className="text-lg sm:text-2xl font-bold">{t("bookingForm.title")}</h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {status === "success" ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 size={44} className="text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{t("bookingForm.successTitle")}</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">{t("bookingForm.successMessage")}</p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-bold shadow-lg shadow-amber-600/40 min-h-[48px]"
                  >
                    {t("bookingForm.close")}
                  </button>
                </div>
              ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                {/* Car Selection */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Car size={18} className="text-amber-600" />
                    {t("bookingForm.car")}
                  </label>
                  <select
                    name="car"
                    required
                    value={formData.car}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                  >
                    <option value="">{t("bookingForm.pickCar")}</option>
                    {cars.map(car => (
                      <option key={car.id} value={car.id}>
                        {car.name} - {car.category} (€{car.price}{t("home.popular.perDay")})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates - Range Picker */}
                <div className="relative">
                  <label className="block text-[11px] font-semibold text-amber-700 mb-2 tracking-[0.15em] uppercase">
                    {t("home.booking.rentalDates")}
                  </label>
                  <button
                    type="button"
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

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <User size={18} className="text-amber-600" />
                      {t("bookingForm.firstName")}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                      placeholder={t("bookingForm.firstNamePH")}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <User size={18} className="text-amber-600" />
                      {t("bookingFormExt.lastName")}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                      placeholder={t("bookingFormExt.lastNamePH")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Mail size={18} className="text-amber-600" />
                      {t("bookingForm.email")}
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
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Phone size={18} className="text-amber-600" />
                      {t("bookingForm.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900 ${
                        formData.phone && !phoneValid ? "border-red-400" : "border-amber-200"
                      }`}
                      placeholder="+30 6912345678"
                    />
                    {formData.phone && !phoneValid && (
                      <p className="mt-1 text-xs text-red-600">Συμπληρώστε έγκυρο τηλέφωνο</p>
                    )}
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <MapPin size={18} className="text-amber-600" />
                    {t("bookingFormExt.pickupLocLabel")}
                  </label>
                  <select
                    name="pickupLocation"
                    required
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                  >
                    <option value="Λιμενάρια">{t("bookingFormExt.pickupLimenaria")}</option>
                    <option value="Λιμάνι Θάσου">{t("bookingFormExt.pickupPort")}</option>
                    <option value="Κατάλυμα">{t("bookingFormExt.pickupDelivery")}</option>
                  </select>
                </div>

                {/* Child Seats */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Baby size={18} className="text-amber-600" />
                    {t("bookingFormExt.childSeatsLabel")}
                  </label>
                  <input
                    type="number"
                    name="childSeats"
                    min="0"
                    max="3"
                    value={formData.childSeats}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-900"
                  />
                </div>

                {/* Comments */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    {t("bookingFormExt.commentsLabel")}
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none text-gray-900"
                    placeholder={t("bookingFormExt.commentsPH")}
                  />
                </div>

                {/* Price Summary */}
                {calculateDays() > 0 && formData.car && (
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-4">
                    <h3 className="font-bold text-amber-700 mb-3">{t("bookingFormExt.summary")}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-700">
                        <span>{t("bookingFormExt.sumDays")}</span>
                        <span className="font-semibold">{calculateDays()}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>{t("bookingFormExt.sumCar")}</span>
                        <span className="font-semibold">€{cars.find(c => c.id === formData.car)?.price} x {calculateDays()}</span>
                      </div>
                      {formData.childSeats > 0 && (
                        <div className="flex justify-between text-gray-700">
                          <span>{t("bookingFormExt.sumChildSeats")} ({formData.childSeats}):</span>
                          <span className="font-semibold">€{formData.childSeats * 2} x {calculateDays()}</span>
                        </div>
                      )}
                      <div className="border-t border-amber-300 pt-2 flex justify-between text-lg">
                        <span className="font-bold text-amber-700">{t("bookingFormExt.sumTotal")}</span>
                        <span className="font-bold text-amber-700">€{calculateTotal()}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{t("bookingFormExt.sumVat")}</p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                    <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{t("bookingForm.errorAlert")}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 border-2 border-amber-300 text-gray-700 rounded-lg hover:bg-amber-50 transition-colors font-semibold min-h-[48px]"
                  >
                    {t("bookingForm.cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !isFormValid}
                    className={`flex-1 px-6 py-3 rounded-lg font-bold transition-colors min-h-[48px] ${
                      isFormValid && !submitting
                        ? "bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-600/50 cursor-pointer"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                    }`}
                  >
                    {submitting ? t("bookingForm.submitting") : t("bookingForm.submit")}
                  </button>
                </div>
              </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}