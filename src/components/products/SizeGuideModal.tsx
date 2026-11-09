import React from 'react';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-xs shadow-2xl border border-olive/20 animate-slide-up relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-charcoal p-1"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] tracking-widestPlus uppercase font-semibold text-gold-dark block mb-1">
          Boutique Sizing Chart
        </span>
        <h3 className="font-editorial text-2xl text-charcoal font-normal mb-2">
          AMORA VOGUE Size Guide
        </h3>
        <p className="text-xs text-charcoal/70 mb-6 font-light">
          All measurements are in inches. If you are between sizes, we recommend sizing up or messaging us on WhatsApp for personal advice.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-ivory border-b border-olive/20 text-olive uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3 font-semibold">Size</th>
                <th className="py-2.5 px-3 font-semibold">UK / LK</th>
                <th className="py-2.5 px-3 font-semibold">Bust</th>
                <th className="py-2.5 px-3 font-semibold">Waist</th>
                <th className="py-2.5 px-3 font-semibold">Hips</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-charcoal">
              <tr>
                <td className="py-2.5 px-3 font-semibold">XS</td>
                <td className="py-2.5 px-3 text-gray-500">6 - 8</td>
                <td className="py-2.5 px-3">31 - 32"</td>
                <td className="py-2.5 px-3">24 - 25"</td>
                <td className="py-2.5 px-3">34 - 35"</td>
              </tr>
              <tr className="bg-ivory/30">
                <td className="py-2.5 px-3 font-semibold">S</td>
                <td className="py-2.5 px-3 text-gray-500">8 - 10</td>
                <td className="py-2.5 px-3">33 - 34"</td>
                <td className="py-2.5 px-3">26 - 27"</td>
                <td className="py-2.5 px-3">36 - 37"</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">M</td>
                <td className="py-2.5 px-3 text-gray-500">10 - 12</td>
                <td className="py-2.5 px-3">35 - 36"</td>
                <td className="py-2.5 px-3">28 - 29"</td>
                <td className="py-2.5 px-3">38 - 39"</td>
              </tr>
              <tr className="bg-ivory/30">
                <td className="py-2.5 px-3 font-semibold">L</td>
                <td className="py-2.5 px-3 text-gray-500">12 - 14</td>
                <td className="py-2.5 px-3">37 - 39"</td>
                <td className="py-2.5 px-3">30 - 32"</td>
                <td className="py-2.5 px-3">40 - 42"</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">XL</td>
                <td className="py-2.5 px-3 text-gray-500">14 - 16</td>
                <td className="py-2.5 px-3">40 - 42"</td>
                <td className="py-2.5 px-3">33 - 35"</td>
                <td className="py-2.5 px-3">43 - 45"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-3 bg-ivory/60 border border-olive/10 text-[11px] text-charcoal/80 rounded-xs">
          <strong>Tip:</strong> You can request exact garment measurements when your order is placed on WhatsApp!
        </div>
      </div>
    </div>
  );
};
