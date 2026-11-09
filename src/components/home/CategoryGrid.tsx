import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  // Show top categories on homepage
  const displayCategories = CATEGORIES.slice(0, 8);

  return (
    <section className="py-12 md:py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-2">
            Curated Wardrobe
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal tracking-tight text-charcoal">
            Shop by Category
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-charcoal/70 font-light">
            Explore everyday elegance and handcrafted styles designed for young women and modern silhouettes.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-white shadow-xs border border-olive/5"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent transition-opacity duration-300" />

              {/* Category Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between text-white">
                <div>
                  <h3 className="font-editorial text-lg sm:text-xl font-medium tracking-wide">
                    {category.name}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-ivory/80 tracking-wider">
                    {category.itemCount} Styles
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center transform translate-y-1 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 group-hover:bg-white group-hover:text-olive transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
