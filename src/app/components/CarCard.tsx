import { Users, Briefcase, Snowflake, Gauge } from "lucide-react";
import { motion } from "motion/react";

// Custom Icons for Transmission and Engine
function TransmissionIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14v-5H5z"/>
      <path d="M5 12V7h3l3-3h2l3 3h3v5"/>
      <circle cx="7" cy="15" r="1.5"/>
      <circle cx="17" cy="15" r="1.5"/>
    </svg>
  );
}

function EngineIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="16" height="12" rx="2"/>
      <path d="M4 10h16"/>
      <path d="M8 6V4"/>
      <path d="M12 6V4"/>
      <path d="M16 6V4"/>
      <circle cx="9" cy="14" r="1"/>
      <circle cx="15" cy="14" r="1"/>
    </svg>
  );
}

interface Car {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  transmission: string;
  passengers: number;
  luggage: number;
  ac: boolean;
  fuel: string;
  engine: string;
}

interface CarCardProps {
  car: Car;
  onBook: (car: { id: string; name: string; price: number }) => void;
}

export function CarCard({ car, onBook }: CarCardProps) {
  const hasDiscount = car.discount && car.originalPrice;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container with Discount Badge */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
              <span className="text-2xl font-bold">-{car.discount}%</span>
            </div>
          </div>
        )}
        
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category Badge */}
        <div className="inline-block">
          <span className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-amber-200">
            {car.category}
          </span>
        </div>

        {/* Car Name */}
        <h3 className="text-2xl font-bold mt-3 mb-4 text-gray-900">{car.name}</h3>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <TransmissionIcon size={18} />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={18} />
            <span>{car.passengers} Άτομα</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Briefcase size={18} />
            <span>{car.luggage} Βαλίτσες</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Snowflake size={18} />
            <span>A/C</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Gauge size={18} />
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <EngineIcon size={18} />
            <span>{car.engine}</span>
          </div>
        </div>

        {/* Pricing and CTA */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-end justify-between mb-4">
            <div>
              {hasDiscount && (
                <div className="text-sm text-gray-400 line-through mb-1">
                  €{car.originalPrice}/μέρα
                </div>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-amber-600">€{car.price}</span>
                <span className="text-gray-500 text-sm">/μέρα</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onBook({ id: car.id, name: car.name, price: car.price })}
            className="w-full bg-amber-600 text-white py-3 rounded-xl hover:bg-amber-700 transition-all duration-300 font-bold text-sm tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            ΚΡΑΤΗΣΗ
          </button>
        </div>
      </div>
    </motion.div>
  );
}
