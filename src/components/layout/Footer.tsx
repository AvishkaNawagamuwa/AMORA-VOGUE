import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, MapPin, Mail, Phone } from 'lucide-react';
import { getWhatsAppNumber } from '../../utils/whatsapp';

export const Footer: React.FC = () => {
  const whatsappNum = getWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello AMORA VOGUE!')}`;

  return (
    <footer className="bg-charcoal text-ivory pt-16 pb-12 border-t border-olive/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-ivory border border-gold/40 flex items-center justify-center shadow-xs">
                <img
                  src="/logo.png"
                  alt="AMORA VOGUE"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-editorial text-2xl tracking-[0.2em] uppercase font-semibold text-ivory">
                AMORA VOGUE
              </span>
            </div>
            <p className="text-xs text-ivory/70 font-light leading-relaxed max-w-sm mb-6">
              A premier women's fashion and clothing boutique based in Colombo, Sri Lanka. Curating everyday feminine elegance, floral aesthetics, and effortless WhatsApp shopping for modern women.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-charcoal flex items-center justify-center transition-colors text-ivory"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold hover:text-charcoal flex items-center justify-center transition-colors text-ivory"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-ivory"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widestPlus text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/80 font-light">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gold transition-colors">Shop All</Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-gold transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/best-sellers" className="hover:text-gold transition-colors">Best Sellers</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widestPlus text-gold mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/80 font-light">
              <li>
                <Link to="/delivery-information" className="hover:text-gold transition-colors">Delivery Information</Link>
              </li>
              <li>
                <Link to="/returns-exchanges" className="hover:text-gold transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-gold transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/selection-bag" className="hover:text-gold transition-colors">My Selection Bag</Link>
              </li>
            </ul>
          </div>

          {/* Boutique Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widestPlus text-gold mb-4">
              Boutique Inquiries
            </h4>
            <div className="space-y-3 text-xs text-ivory/80 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Colombo, Sri Lanka (Islandwide Doorstep Delivery)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={whatsappUrl} className="hover:text-gold transition-colors">
                  WhatsApp: +94 77 123 4567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>care@amoravogue.lk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory/50">
          <p>© {new Date().getFullYear()} AMORA VOGUE. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-editorial tracking-wider text-xs text-gold">
            Designed for everyday feminine elegance in Sri Lanka.
          </p>
        </div>
      </div>
    </footer>
  );
};
