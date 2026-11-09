import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { formatPrice } from '../../utils/formatPrice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasSidePose = product.images.length > 1 && Boolean(product.images[1]);

  return (
    <div className="group flex flex-col h-full bg-white transition-all duration-300">
      {/* Product Image Container */}
      <Link
        to={`/product/${product.slug}`}
        className="product-image-container block relative w-full aspect-[3/4] bg-[#f8f6f2] overflow-hidden rounded-xs border border-neutral-200/70 shadow-xs"
      >
        {/* Normal / Front Pose */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover object-top transition-all duration-500 ease-out ${
            hasSidePose
              ? 'group-hover:opacity-0 group-hover:scale-105'
              : 'group-hover:scale-105'
          }`}
        />

        {/* Side Pose Revealed on Mouse Over */}
        {hasSidePose && (
          <img
            src={product.images[1]}
            alt={`${product.name} - Side Pose`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-105"
          />
        )}

        {/* Badges on Top-Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.newArrival && (
            <span className="bg-white/95 text-olive text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 border border-olive/20 shadow-xs backdrop-blur-xs">
              New
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-gold text-white text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 shadow-xs">
              Best Seller
            </span>
          )}
        </div>

        {/* Side Pose Badge on Top-Right on Hover */}
        {hasSidePose && (
          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            <span className="bg-charcoal/85 text-ivory text-[9px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-xs shadow-xs backdrop-blur-xs flex items-center gap-1">
              Side Pose
            </span>
          </div>
        )}

        {/* Quick View Button on Hover (desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block z-10">
          <div className="w-full py-2 bg-white/95 text-olive hover:bg-olive hover:text-white transition-colors text-center text-xs tracking-widest uppercase font-medium shadow-sm">
            View Details
          </div>
        </div>
      </Link>

      {/* Product Information */}
      <div className="pt-3.5 pb-2 px-1 flex flex-col flex-1">
        {/* Colors Swatches */}
        {product.availableColors && product.availableColors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2">
            {product.availableColors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="w-2.5 h-2.5 rounded-full border border-gray-300 transition-transform hover:scale-125"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        )}

        {/* Title */}
        <Link
          to={`/product/${product.slug}`}
          className="font-sans text-xs sm:text-sm font-medium text-charcoal hover:text-olive transition-colors line-clamp-1 mb-1.5"
        >
          {product.name}
        </Link>

        {/* Price & SKU */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-semibold text-charcoal">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-[11px] text-gray-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">
            {product.sku}
          </span>
        </div>
      </div>
    </div>
  );
};
