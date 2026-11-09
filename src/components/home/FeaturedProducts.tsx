import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink: string;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
}) => {
  // Display all 9 flog items in enhanced large layout
  const displayProducts = products.slice(0, 9);

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-gray-100">
          <div>
            {subtitle && (
              <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                {subtitle}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal tracking-tight text-charcoal">
              {title}
            </h2>
            <p className="text-xs text-charcoal/60 mt-1 font-light tracking-wide">
              Hover over any dress silhouette to reveal the complementary side pose
            </p>
          </div>
          <Link
            to={viewAllLink}
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-olive hover:text-gold-dark transition-colors group py-1"
          >
            <span>View All Collection ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Enhanced 3-column large grid for 9 products (3 x 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
