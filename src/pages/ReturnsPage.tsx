import React from 'react';
import { RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { getWhatsAppNumber } from '../utils/whatsapp';

export const ReturnsPage: React.FC = () => {
  const whatsappNum = getWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello AMORA VOGUE! I would like to request an exchange for an item.')}`;

  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-100 pb-6 mb-8 text-center sm:text-left">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-2">
            Peace of Mind
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-charcoal font-normal">
            Returns & Exchanges Policy
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2 font-light">
            We want you to feel confident and beautiful in every AMORA VOGUE garment.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
          <div className="p-6 bg-ivory/50 border border-olive/15 rounded-xs space-y-4">
            <h2 className="font-editorial text-2xl text-charcoal font-medium flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-olive" />
              <span>7-Day Exchange Period</span>
            </h2>
            <p>
              If a size does not fit as expected or you wish to exchange for another available style or color, you may request an exchange within <strong>7 days</strong> of receiving your package.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-charcoal uppercase tracking-wider text-xs">
              Eligibility Conditions:
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>The garment must be unworn, unwashed, unaltered, and free of perfume, makeup, or stains.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>All original AMORA VOGUE tags, labels, and packaging must remain intact.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Proof of purchase or your original WhatsApp order details must be provided.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-xs">
            <h4 className="font-semibold text-charcoal uppercase tracking-wider text-xs mb-1">
              How to Initiate an Exchange
            </h4>
            <p className="text-xs text-gray-600 mb-3">
              Simply message our boutique care team on WhatsApp with your order code and the size or style you would like in exchange.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 bg-olive text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-olive-dark"
            >
              Contact Exchange Concierge
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
