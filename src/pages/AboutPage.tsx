import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Compass } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Editorial Header */}
      <section className="bg-ivory py-16 sm:py-24 border-b border-olive/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-3">
            Our Story & Craft
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-charcoal mb-6">
            Everyday Feminine Elegance for the Modern Sri Lankan Woman
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-charcoal/70 font-light leading-relaxed max-w-2xl mx-auto">
            AMORA VOGUE was born from a desire to bring timeless aesthetics, comfortable breathable silhouettes, and modern tropical boutique fashion to young women, university students, and fashion enthusiasts across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Main Philosophy */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 aspect-[4/5] bg-ivory rounded-xs overflow-hidden border border-olive/10 shadow-sm">
            <img
              src="/Carousel/Chevron Maxi Dress in Ivory Studio.png"
              alt="AMORA VOGUE Boutique Aesthetics"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="lg:col-span-6 space-y-6 text-charcoal/80">
            <span className="text-[10px] uppercase tracking-widestPlus font-semibold text-gold-dark">
              Boutique Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial text-charcoal font-normal">
              Style That Speaks for You
            </h2>
            <p className="text-xs sm:text-sm font-light leading-relaxed">
              We believe fashion should feel effortless. In the warm tropical climate of Sri Lanka, clothing must not only look flattering in photos—it must feel weightless, breathable, and gracefully tailored for real life.
            </p>
            <p className="text-xs sm:text-sm font-light leading-relaxed">
              From our distinctive chevron maxi dresses to hand-illustrated summer florals and everyday linen separates, every garment is selected with an eye for feminine poise, clean lines, and long-lasting quality.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-ivory/60 border border-olive/10 rounded-xs">
                <Sparkles className="w-5 h-5 text-gold-dark mb-2" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Thoughtful Curation
                </h4>
                <p className="text-[11px] text-gray-600 font-light">
                  Limited production runs that prioritize quality over fast mass production.
                </p>
              </div>

              <div className="p-4 bg-ivory/60 border border-olive/10 rounded-xs">
                <Heart className="w-5 h-5 text-gold-dark mb-2" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Accessible Luxury
                </h4>
                <p className="text-[11px] text-gray-600 font-light">
                  Premium fabrics and runway aesthetics made accessible to girls and young professionals.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-olive text-ivory text-xs tracking-widest uppercase font-semibold hover:bg-olive-dark transition-all"
              >
                <span>Explore Our Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
