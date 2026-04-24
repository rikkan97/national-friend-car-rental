import { motion, AnimatePresence } from "motion/react";
import { X, Users, Briefcase, Gauge, Car, Shield, Wind, Radio, Lock, CheckCircle, XCircle, Star } from "lucide-react";

interface CarDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  car: {
    id: string;
    name: string;
    category: string;
    categoryCode: string;
    image: string;
    price: number;
    passengers: number;
    luggage: number;
    engine: string;
    doors: number;
    rating: number;
  } | null;
  onBookNow: () => void;
}

export function CarDetailsModal({ isOpen, onClose, car, onBookNow }: CarDetailsProps) {
  if (!car) return null;

  const features = [
    { icon: Gauge, label: "Κυβισμός", value: car.engine, available: true },
    { icon: Car, label: "Πόρτες", value: car.doors, available: true },
    { icon: Users, label: "Επιβάτες", value: car.passengers, available: true },
    { icon: Briefcase, label: "Βαλίτσες", value: car.luggage, available: true },
    { icon: Wind, label: "Air Condition", value: "", available: true },
    { icon: Wind, label: "Power Steering", value: "", available: true },
    { icon: Wind, label: "Electric Windows", value: "", available: true },
    { icon: Radio, label: "Radio/CD", value: "", available: true },
    { icon: Lock, label: "Central Locking", value: "", available: true },
    { icon: Shield, label: "GPS Navigation", value: "", available: true },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white border border-amber-200 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-amber-600 text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-bold">{car.name}</h2>
                  <p className="text-sm font-semibold">{car.category}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content - Grid Layout */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-full">
                  {/* Left Column - Sticky Image */}
                  <div className="lg:sticky lg:top-0 lg:h-[calc(90vh-80px)] bg-gray-50 p-6">
                    <div className="relative h-full rounded-xl overflow-hidden border border-amber-200">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                        €{car.price}/ημέρα
                      </div>
                      <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1 shadow-lg">
                        <Star size={16} fill="currentColor" />
                        {car.rating}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Scrollable Content */}
                  <div className="p-6 space-y-6">
                    {/* Price Badge */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-4">
                      <p className="text-gray-600 text-sm mb-1">Τιμή από</p>
                      <p className="text-4xl font-bold text-amber-600">
                        {car.price}€<span className="text-xl text-gray-600">/ημέρα</span>
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-amber-600 mb-3">Περιγραφή</h3>
                      <p className="text-gray-700">
                        Το {car.name} είναι ένα εξαιρετικό όχημα της κατηγορίας {car.category}, ιδανικό για την εξερεύνηση της Θάσου. 
                        Με χωρητικότητα έως {car.passengers} άτομα και {car.luggage} βαλίτσες, προσφέρει άνεση και ασφάλεια για τις διακοπές σας.
                      </p>
                    </div>

                    {/* Main Specs Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-amber-200 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Users className="text-amber-600" size={20} />
                          </div>
                          <span className="text-gray-600 text-sm">Επιβάτες</span>
                        </div>
                        <p className="text-2xl font-bold text-amber-600">{car.passengers} άτομα</p>
                      </div>

                      <div className="bg-white border border-amber-200 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Car className="text-amber-600" size={20} />
                          </div>
                          <span className="text-gray-600 text-sm">Πόρτες</span>
                        </div>
                        <p className="text-2xl font-bold text-amber-600">{car.doors}</p>
                      </div>

                      <div className="bg-white border border-amber-200 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Briefcase className="text-amber-600" size={20} />
                          </div>
                          <span className="text-gray-600 text-sm">Αποσκευές</span>
                        </div>
                        <p className="text-2xl font-bold text-amber-600">{car.luggage} βαλίτσες</p>
                      </div>

                      <div className="bg-white border border-amber-200 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Gauge className="text-amber-600" size={20} />
                          </div>
                          <span className="text-gray-600 text-sm">Κυβισμός</span>
                        </div>
                        <p className="text-2xl font-bold text-amber-600">{car.engine}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h3 className="text-xl font-bold text-amber-600 mb-4">Εξοπλισμός</h3>
                      <div className="bg-white border border-amber-200 rounded-xl p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {features.slice(4).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="text-amber-600 flex-shrink-0" size={18} />
                              <span className="text-gray-700 text-sm">{feature.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Included */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4">
                      <h3 className="text-lg font-bold text-green-700 mb-3">Περιλαμβάνεται</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-600" size={18} />
                          <span className="text-sm text-gray-700">Απεριόριστα χιλιόμετρα</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-600" size={18} />
                          <span className="text-sm text-gray-700">Πλήρης ασφάλεια</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-600" size={18} />
                          <span className="text-sm text-gray-700">GPS χωρίς χρέωση</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-600" size={18} />
                          <span className="text-sm text-gray-700">24/7 Υποστήριξη</span>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 sticky bottom-0 bg-white py-4 -mx-6 px-6 border-t border-amber-200">
                      <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border-2 border-amber-300 text-gray-700 rounded-lg hover:bg-amber-50 transition-colors font-semibold"
                      >
                        Κλείσιμο
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onBookNow();
                        }}
                        className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-bold shadow-lg shadow-amber-600/50"
                      >
                        Κράτηση Τώρα
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
