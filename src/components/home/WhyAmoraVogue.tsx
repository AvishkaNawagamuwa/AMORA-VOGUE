import React from 'react';
import { Sparkles, HeartHandshake, MessageCircle, ShieldCheck } from 'lucide-react';

export const WhyAmoraVogue: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Carefully Selected Styles',
      description: 'Thoughtfully curated silhouettes designed to flatter young women with timeless Sri Lankan elegance.',
    },
    {
      icon: HeartHandshake,
      title: 'Everyday Confidence',
      description: 'Chic, breathable fabrics that feel wonderful all day long, from campus mornings to special evenings.',
    },
    {
      icon: MessageCircle,
      title: 'Effortless WhatsApp Ordering',
      description: 'Select your favorite styles directly into your bag, then submit your complete order in one prefilled WhatsApp chat.',
    },
    {
      icon: ShieldCheck,
      title: 'Personal Boutique Care',
      description: 'Direct human assistance to verify size measurements, answer questions, and arrange islandwide doorstep delivery.',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-2">
            The Boutique Experience
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal tracking-tight text-charcoal">
            Why AMORA VOGUE
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-ivory/50 border border-olive/10 rounded-xs flex flex-col items-center text-center transition-all hover:border-gold hover:shadow-xs group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-olive mb-4 shadow-xs group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-charcoal mb-2">
                  {b.title}
                </h3>
                <p className="text-xs text-charcoal/70 font-light leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
