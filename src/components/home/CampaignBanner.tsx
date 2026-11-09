import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CampaignBanner: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#E8DDD2]"
      aria-label="Amora Vogue Campaign Banner"
    >
      {/* Enhanced Height Container: 60vh to 80vh on desktop */}
      <Link
        to="/shop"
        className="group relative block w-full aspect-[16/9] min-h-[460px] sm:min-h-[560px] md:min-h-[660px] lg:min-h-[740px] overflow-hidden cursor-pointer"
        aria-label="Urban Elegance - Discover AMORA VOGUE Collection"
      >
        {/* Full-bleed crisp background image */}
        <img
          src="/now/urban-elegance-in-beige.png"
          alt="AMORA VOGUE Urban Elegance in Beige - Grace in every detail"
          loading="lazy"
          className="w-full h-full object-cover object-top sm:object-top transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
        />

        {/* Subtle Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/25 pointer-events-none" />

        {/* Interactive CTA overlay placed elegantly in the bottom area */}
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-14 right-4 sm:right-8 md:right-16 z-10 flex flex-col items-end gap-3 pointer-events-none">
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 backdrop-blur-xs text-[10px] font-semibold tracking-[0.22em] text-neutral-800 uppercase shadow-2xs border border-white/60">
            <Sparkles className="w-3 h-3 text-gold-dark" />
            <span>EDITION 2026 • LIMITED BOUTIQUE DROP</span>
          </div>

          <div className="pointer-events-auto">
            <span className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#111111] hover:bg-olive text-white transition-all duration-300 text-[10px] sm:text-xs tracking-[0.22em] uppercase font-semibold shadow-lg hover:shadow-xl group-hover:bg-olive">
              <span>DISCOVER THE COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
};

