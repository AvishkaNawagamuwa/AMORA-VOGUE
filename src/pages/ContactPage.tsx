import React from 'react';
import { MessageCircle, Mail, MapPin, Clock, Phone } from 'lucide-react';
import { getWhatsAppNumber } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const whatsappNum = getWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello AMORA VOGUE! I have a question regarding an order or product.')}`;

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-2">
            Get in Touch
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-charcoal font-normal">
            Contact AMORA VOGUE
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2 font-light max-w-lg mx-auto">
            We are always delighted to assist you with sizing recommendations, islandwide delivery inquiries, or styling advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Direct WhatsApp Channel */}
          <div className="p-8 bg-ivory/60 border border-olive/20 rounded-xs shadow-xs text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="font-editorial text-2xl text-charcoal font-semibold">
              Instant WhatsApp Concierge
            </h2>
            <p className="text-xs text-charcoal/70 font-light leading-relaxed">
              For immediate assistance with orders, custom measurement requests, or tracking delivery, chat directly with our team.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-olive text-ivory hover:bg-olive-dark text-xs tracking-widest uppercase font-semibold shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Details & Hours */}
          <div className="space-y-6 bg-white p-8 border border-gray-100 rounded-xs shadow-xs">
            <h3 className="font-editorial text-xl text-charcoal font-medium pb-2 border-b border-gray-100">
              Boutique Information
            </h3>

            <div className="space-y-4 text-xs text-charcoal/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-charcoal">Location:</strong>
                  <span>Colombo, Western Province, Sri Lanka</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-charcoal">Operating Hours:</strong>
                  <span>Monday – Saturday: 9:00 AM – 7:00 PM</span>
                  <span className="block text-gray-500 text-[11px]">Sunday: 10:00 AM – 5:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-charcoal">Email Support:</strong>
                  <a href="mailto:care@amoravogue.lk" className="hover:text-olive">
                    care@amoravogue.lk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-charcoal">Phone:</strong>
                  <span>+94 77 123 4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
