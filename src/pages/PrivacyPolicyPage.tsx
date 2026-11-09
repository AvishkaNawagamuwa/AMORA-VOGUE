import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-100 pb-6 mb-8 text-center sm:text-left">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-2">
            Legal & Trust
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-charcoal font-normal">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2 font-light">
            Last updated: November 2026
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
          <section>
            <h2 className="font-editorial text-xl text-charcoal font-medium mb-2">
              1. Information We Collect
            </h2>
            <p>
              AMORA VOGUE respects your privacy. When you use our website, we only collect customer details (such as your full name, contact number, delivery address, and notes) that you voluntarily enter into our WhatsApp order form to prepare your order message.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl text-charcoal font-medium mb-2">
              2. No Payment Card Data Storage
            </h2>
            <p>
              We do NOT collect, store, or process debit or credit card details on our website. Orders are submitted directly through WhatsApp and confirmed individually with our customer service team.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl text-charcoal font-medium mb-2">
              3. Local Storage Usage
            </h2>
            <p>
              Your browser&apos;s local storage is utilized strictly to remember the clothing items and variants you have chosen in your Selection Bag between page refreshes.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-xl text-charcoal font-medium mb-2">
              4. Contact Us
            </h2>
            <p>
              For any questions regarding your data or to request deletion of any order history, please contact us at care@amoravogue.lk.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
