import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../data/products';
import { useSelectionBag } from '../../context/SelectionBagContext';

interface NewArrivalsSliderProps {
  products: Product[];
}

export const NewArrivalsSlider: React.FC<NewArrivalsSliderProps> = ({ products }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const { addToBag } = useSelectionBag();

  // Filter or take products with flog images or newArrivals
  const displayProducts = products.filter((p) => p.newArrival && p.images[0]?.startsWith('/flog/'));
  const items = displayProducts.length > 0 ? displayProducts : products.slice(0, 10);

  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    // Scroll by roughly one or two cards width
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Mouse drag to scroll handlers for effortless sliding
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Matching GFLOCK reference */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-light tracking-[0.14em] text-neutral-900 uppercase">
              NEW ARRIVALS
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-500 tracking-[0.2em] uppercase mt-1">
              Curated Everyday Elegance • Fresh Off The Runway
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Explore All Button */}
            <Link
              to="/new-arrivals"
              className="bg-[#111111] hover:bg-olive text-white px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-200 shadow-xs hover:shadow-sm"
            >
              EXPLORE ALL
            </Link>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-neutral-300 transition-colors ${
                  canScrollLeft
                    ? 'hover:border-neutral-900 text-neutral-900 cursor-pointer hover:bg-neutral-50'
                    : 'text-neutral-300 border-neutral-200 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
              </button>

              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-neutral-300 transition-colors ${
                  canScrollRight
                    ? 'hover:border-neutral-900 text-neutral-900 cursor-pointer hover:bg-neutral-50'
                    : 'text-neutral-300 border-neutral-200 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidly Movable Product Carousel Row */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {items.map((product) => {
            const firstColor = product.availableColors[0]?.name || 'Standard';
            const firstSize = product.availableSizes[0] || 'M';

            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-[240px] sm:w-[270px] md:w-[290px] lg:w-[calc(25%-18px)] snap-start group flex flex-col"
              >
                {/* Product Image Card */}
                <div className="relative aspect-[3/4] w-full bg-[#f9f8f6] overflow-hidden border border-neutral-200/80 mb-3.5">
                  <Link
                    to={`/product/${product.slug}`}
                    className="block w-full h-full"
                    tabIndex={0}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className={`w-full h-full object-cover object-top transition-all duration-500 ease-out ${
                        product.images[1] ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'
                      }`}
                    />
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={`${product.name} - Side Pose`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:scale-105"
                      />
                    )}
                  </Link>

                  {/* Brand Monogram Watermark at Bottom Right */}
                  <div className="absolute bottom-2.5 right-2.5 pointer-events-none">
                    <span className="text-[9px] font-editorial tracking-[0.25em] text-neutral-800/60 uppercase font-semibold">
                      AMORA VOGUE
                    </span>
                  </div>

                  {/* Quick Action Overlay on Desktop Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2 pointer-events-none group-hover:pointer-events-auto">
                    <button
                      type="button"
                      onClick={() =>
                        addToBag({
                          product,
                          size: firstSize,
                          color: firstColor,
                          quantity: 1,
                        })
                      }
                      className="flex-1 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 py-2 px-3 text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD TO BAG</span>
                    </button>

                    <Link
                      to={`/product/${product.slug}`}
                      className="w-8 h-8 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 flex items-center justify-center transition-colors shadow-sm"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Product Title in Uppercase with Code */}
                <Link
                  to={`/product/${product.slug}`}
                  className="block group/link"
                >
                  <h3 className="text-[11px] sm:text-xs font-medium tracking-[0.08em] text-neutral-900 uppercase truncate group-hover/link:text-olive transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Price Line (GFLOCK formatted e.g. 7,420.00) */}
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-[11px] sm:text-xs font-semibold text-neutral-800 font-sans tracking-wide">
                    LKR {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-[10px] text-neutral-400 line-through">
                      LKR {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>

                {/* Color Swatch Boxes (GFLOCK exact styling) */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {product.availableColors.slice(0, 3).map((c, i) => (
                    <span
                      key={i}
                      className="inline-block border border-neutral-300 px-2 py-0.5 text-[8.5px] sm:text-[9px] font-medium tracking-[0.12em] uppercase text-neutral-600 bg-white hover:border-neutral-800 transition-colors"
                    >
                      {c.name}
                    </span>
                  ))}
                  {product.availableColors.length > 3 && (
                    <span className="inline-block px-1 py-0.5 text-[8.5px] text-neutral-400">
                      +{product.availableColors.length - 3}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
