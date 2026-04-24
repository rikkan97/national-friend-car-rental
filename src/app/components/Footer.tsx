import { Phone, Mail, Facebook, Instagram, Clock } from "lucide-react";
import logoImage from "figma:asset/0f6b906dfc0ff21309735e67dcdb8ae0299ae747.png";
import { useT } from "../../i18n/LanguageContext";

export function Footer() {
  const { t } = useT();

  return (
    <footer className="bg-white text-gray-700 border-t border-amber-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-amber-600 text-xl mb-4 font-bold">National Friend Car Rental</h3>
            <img
              src={logoImage}
              alt="National Friend Car Rental"
              style={{ height: "64px", width: "auto", maxHeight: "64px" }}
              className="mb-4"
            />
            <p className="text-sm text-gray-600">{t("footer.ownerName")}</p>
            <p className="text-sm text-gray-600">{t("footer.address")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-amber-600 text-xl mb-4 font-bold">{t("footer.links")}</h3>
            <div className="space-y-2">
              <a href="/" className="block text-sm text-gray-600 hover:text-amber-600 transition-colors">{t("footer.home")}</a>
              <a href="/fleet" className="block text-sm text-gray-600 hover:text-amber-600 transition-colors">{t("footer.fleet")}</a>
              <a href="/thasos" className="block text-sm text-gray-600 hover:text-amber-600 transition-colors">{t("footer.thasos")}</a>
              <a href="/terms" className="block text-sm text-gray-600 hover:text-amber-600 transition-colors">{t("footer.terms")}</a>
              <a href="/contact" className="block text-sm text-gray-600 hover:text-amber-600 transition-colors">{t("footer.contact")}</a>
              <a href="https://egeo-travel.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-amber-600 transition-colors">{t("footer.accommodation")}</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-amber-600 text-xl mb-4 font-bold">{t("footer.contactInfo")}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-amber-600" />
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Τ/F: (+30) 25930-52877</p>
                  <p className="text-gray-600">M: +30 697 4930 719</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-amber-600" />
                </div>
                <a href="mailto:info@national-friend.gr" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                  info@national-friend.gr
                </a>
              </div>
            </div>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="text-amber-600 text-xl mb-4 font-bold">{t("footer.hours")}</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-amber-600" />
                </div>
                <div className="text-sm">
                  <p className="text-gray-700 font-semibold">{t("footer.monSun")}</p>
                  <p className="text-gray-600">09:00 - 22:30</p>
                </div>
              </div>
            </div>

            <h3 className="text-amber-600 text-lg mb-3 font-bold">{t("footer.follow")}</h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/NationalFriendCarRentalThassos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-amber-100 rounded-lg flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors text-amber-600"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/explore/locations/854398541/national-friend-car-rental---thassos/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-amber-100 rounded-lg flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors text-amber-600"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-200 text-center text-sm text-gray-600">
          <p>© 2026 National Friend Car Rental. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
