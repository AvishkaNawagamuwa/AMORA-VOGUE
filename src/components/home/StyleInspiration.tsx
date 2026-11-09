import React from 'react';
import { Instagram } from 'lucide-react';

export const StyleInspiration: React.FC = () => {
  const lookImages = [
    {
      src: '/Carousel/Chevron Maxi Dress in Ivory Studio.png',
      caption: 'The Chevron Maxi Silhouette',
      tag: '@amoravogue.lk',
    },
    {
      src: '/Carousel/Colorful Floral Maxi Dress Catalog Pose.png',
      caption: 'Summer Florals & Sunlight',
      tag: '@amoravogue.lk',
    },
    {
      src: '/Carousel/Minimalist Abstract Pattern Dress Portrait.png',
      caption: 'Modernist Earth Tone Shift',
      tag: '@amoravogue.lk',
    },
    {
      src: '/Carousel/Chevron Maxi Dress in Ivory Studio.png',
      caption: 'Weekend Everyday Elegance',
      tag: '@amoravogue.lk',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-2">
            Social Inspiration
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal tracking-tight text-charcoal">
            Styled by AMORA VOGUE
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-charcoal/70">
            Follow our journey and discover real everyday styling inspiration.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {lookImages.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square overflow-hidden bg-white shadow-xs border border-olive/10"
            >
              <img
                src={item.src}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-olive/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white">
                <Instagram className="w-6 h-6 mb-2 stroke-[1.5]" />
                <span className="text-xs font-medium tracking-wide">
                  {item.caption}
                </span>
                <span className="text-[10px] text-ivory/80 tracking-widest mt-1">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
