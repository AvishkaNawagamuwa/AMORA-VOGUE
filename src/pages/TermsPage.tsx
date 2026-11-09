import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-100 pb-6 mb-8 text-center sm:text-left">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-2">
            Legal & Terms
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-charcoal font-normal">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2 font-light">
            Last updated: November 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
          <section>
            <h2 className="font-editorial text-xl text-charcoal font-medium mb-2">
              1. Boutique Orders & Inquiries
            </h2>
            <p>
              By browsing and placing orders via WhatsApp through AMORA VOGUE, you agree to provide truthful and accurate delivery information. Generating an order message on this website does not automatically finalize a sale until our boutique team confirms item availability, sizing, and delivery fees with you.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl text-charcoal font-medium mb-2">
              2. Product Visuals & Color Accuracy
            </h2>
            <p>
              We take great care to represent fabric colors, silhouettes, and textures authentically using genuine studio photographs. Due to varying monitor displays and mobile screen calibrations, slight color variations may occur.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl text-charcoal font-medium mb-2">
              3. Pricing in Sri Lankan Rupees
            </h2>
            <p>
              All prices shown on AMORA VOGUE are in Sri Lankan Rupees (LKR / Rs.). Prices are subject to revision without prior notice, though confirmed orders will always be honored at the agreed price.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
