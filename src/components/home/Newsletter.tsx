import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { getWhatsAppNumber } from '../../utils/whatsapp';

export const Newsletter: React.FC = () => {
  const whatsappNum = getWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello AMORA VOGUE! I would like to join your VIP VIP style updates on WhatsApp.')}`;

  return (
    <section className="py-14 md:py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-2">
          Connect & VIP Previews
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal tracking-tight text-charcoal mb-3">
          Stay in Style with AMORA VOGUE
        </h2>
        <p className="text-xs sm:text-sm text-charcoal/70 max-w-lg mx-auto font-light leading-relaxed mb-6">
          Be the first to preview new boutique drops, limited edition releases, and special seasonal offerings directly on WhatsApp and Instagram.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-olive text-ivory hover:bg-olive-dark transition-colors text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Join WhatsApp VIP</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-ivory border border-olive/20 text-charcoal hover:border-olive hover:text-olive transition-colors text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2"
          >
            <Instagram className="w-4 h-4 text-pink-600" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
