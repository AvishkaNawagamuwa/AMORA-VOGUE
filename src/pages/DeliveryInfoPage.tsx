import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const DeliveryInfoPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-100 pb-6 mb-8 text-center sm:text-left">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-2">
            Customer Care
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-charcoal font-normal">
            Delivery Information
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2 font-light">
            Reliable doorstep delivery across all 25 districts of Sri Lanka.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-ivory/60 border border-olive/15 rounded-xs">
              <Truck className="w-6 h-6 text-olive mb-3" />
              <h3 className="font-semibold text-charcoal uppercase tracking-wider text-xs mb-1">
                Islandwide Reach
              </h3>
              <p className="text-xs text-gray-600">
                Doorstep courier service covering Colombo, Kandy, Galle, Jaffna, and all provincial towns.
              </p>
            </div>

            <div className="p-5 bg-ivory/60 border border-olive/15 rounded-xs">
              <Clock className="w-6 h-6 text-olive mb-3" />
              <h3 className="font-semibold text-charcoal uppercase tracking-wider text-xs mb-1">
                Delivery Timeline
              </h3>
              <p className="text-xs text-gray-600">
                Colombo & Suburbs: 1–2 business days.<br />
                Outstations: 2–4 business days.
              </p>
            </div>

            <div className="p-5 bg-ivory/60 border border-olive/15 rounded-xs">
              <ShieldCheck className="w-6 h-6 text-olive mb-3" />
              <h3 className="font-semibold text-charcoal uppercase tracking-wider text-xs mb-1">
                Careful Packaging
              </h3>
              <p className="text-xs text-gray-600">
                Every dress and ensemble is inspected, pressed, and wrapped in protective boutique packaging.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-100 rounded-xs space-y-4">
            <h2 className="font-editorial text-2xl text-charcoal font-medium">
              Delivery Rates & Confirmation
            </h2>
            <p>
              Delivery fees are determined by the weight of your parcel and destination district, and will be communicated to you for confirmation before dispatch via WhatsApp.
            </p>
            <p>
              Once your parcel is dispatched with our courier partner, we will provide you with a tracking number so you can follow the journey of your AMORA VOGUE package.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
