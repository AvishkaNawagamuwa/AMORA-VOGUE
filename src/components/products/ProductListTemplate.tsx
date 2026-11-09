import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../data/products';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../../data/categories';
import { Filter, X, ChevronDown, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface ProductListTemplateProps {
  title: string;
  subtitle?: string;
  initialProducts: Product[];
  currentCategory?: string;
}

export const ProductListTemplate: React.FC<ProductListTemplateProps> = ({
  title,
  subtitle,
  initialProducts,
  currentCategory,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamQuery = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory || 'all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Extract unique available sizes and colors from initialProducts
  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => p.availableSizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [initialProducts]);

  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    initialProducts.forEach((p) =>
      p.availableColors.forEach((c) => map.set(c.name, c.hex))
    );
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [initialProducts]);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Search query filter
      if (searchParamQuery.trim()) {
        const query = searchParamQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSku && !matchesCategory) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Size filter
      if (selectedSize !== 'all' && !product.availableSizes.includes(selectedSize)) {
        return false;
      }

      // Color filter
      if (
        selectedColor !== 'all' &&
        !product.availableColors.some((c) => c.name === selectedColor)
      ) {
        return false;
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // In stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (priceSort === 'price-asc') return a.price - b.price;
      if (priceSort === 'price-desc') return b.price - a.price;
      if (priceSort === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0; // default featured
    });
  }, [
    initialProducts,
    searchParamQuery,
    selectedCategory,
    selectedSize,
    selectedColor,
    maxPrice,
    onlyInStock,
    priceSort,
  ]);

  const resetFilters = () => {
    setSelectedCategory(currentCategory || 'all');
    setSelectedSize('all');
    setSelectedColor('all');
    setMaxPrice(10000);
    setOnlyInStock(false);
    setPriceSort('featured');
    if (searchParamQuery) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  const hasActiveFilters =
    (selectedCategory !== 'all' && selectedCategory !== currentCategory) ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
    maxPrice < 10000 ||
    onlyInStock ||
    Boolean(searchParamQuery);

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          {subtitle && (
            <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-1.5">
              {subtitle}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-editorial font-normal tracking-tight text-charcoal">
            {title}
          </h1>
          {searchParamQuery && (
            <p className="mt-2 text-xs text-charcoal/70">
              Showing search results for &ldquo;<strong>{searchParamQuery}</strong>&rdquo;
            </p>
          )}
        </div>

        {/* Filter Toolbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-gray-100 text-xs">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-ivory text-charcoal font-semibold uppercase tracking-wider text-[11px]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {hasActiveFilters && '• Active'}</span>
          </button>

          {/* Product Count */}
          <div className="text-gray-500 text-[11px] uppercase tracking-wider">
            Showing <strong className="text-charcoal">{filteredProducts.length}</strong> styles
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-gray-500 uppercase tracking-wider text-[11px] hidden sm:inline">
              Sort By:
            </span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="px-3 py-1.5 border border-gray-200 bg-white text-xs text-charcoal font-medium focus:border-olive focus:outline-none"
            >
              <option value="featured">Featured Collection</option>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 pr-4 border-r border-gray-100">
            {/* Filter Reset */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2 px-3 bg-ivory border border-olive/20 text-olive text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 hover:bg-olive hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All Filters</span>
              </button>
            )}

            {/* Category Filter */}
            {!currentCategory && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal mb-3">
                  Categories
                </h3>
                <div className="space-y-1.5 text-xs text-charcoal/80">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`block w-full text-left py-1 px-2 rounded-xs transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-olive text-white font-semibold'
                        : 'hover:bg-ivory'
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`block w-full text-left py-1 px-2 rounded-xs transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-olive text-white font-semibold'
                          : 'hover:bg-ivory'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedSize('all')}
                  className={`px-3 py-1.5 text-[11px] uppercase font-semibold border ${
                    selectedSize === 'all'
                      ? 'bg-olive text-white border-olive'
                      : 'border-gray-200 text-charcoal hover:border-gray-400'
                  }`}
                >
                  All
                </button>
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-[11px] uppercase font-semibold border ${
                      selectedSize === size
                        ? 'bg-olive text-white border-olive'
                        : 'border-gray-200 text-charcoal hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal mb-3">
                Color
              </h3>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedColor('all')}
                  className={`text-xs block py-0.5 ${
                    selectedColor === 'all' ? 'font-bold text-olive' : 'text-charcoal hover:text-olive'
                  }`}
                >
                  All Colors
                </button>
                {availableColors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-2 text-xs py-0.5 ${
                      selectedColor === color.name ? 'font-bold text-olive' : 'text-charcoal hover:text-olive'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-gray-300 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                <span>Price Under:</span>
                <span>Rs. {new Intl.NumberFormat('en-LK').format(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-olive"
              />
            </div>

            {/* Availability Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded-xs text-olive focus:ring-olive"
                />
                <span className="font-medium text-charcoal">Only In-Stock Items</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-ivory/50 p-12 text-center rounded-xs border border-olive/10">
                <h3 className="font-editorial text-2xl text-charcoal font-medium mb-2">
                  No Products Match Your Filter
                </h3>
                <p className="text-xs text-gray-500 mb-6 font-light max-w-sm mx-auto">
                  Try adjusting your price range, selected size, or clearing applied filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-olive text-ivory text-xs tracking-widest uppercase font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col z-10 overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-editorial text-xl font-semibold uppercase text-olive">
                Filter Products
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-gray-400 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 flex-1 text-xs">
              {/* Category */}
              {!currentCategory && (
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-charcoal mb-2">
                    Category
                  </h4>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Size */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-charcoal mb-2">Size</h4>
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setSelectedSize('all')}
                    className={`px-2.5 py-1 text-[11px] border ${
                      selectedSize === 'all' ? 'bg-olive text-white' : 'border-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {availableSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-2.5 py-1 text-[11px] border ${
                        selectedSize === s ? 'bg-olive text-white' : 'border-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-charcoal mb-2">
                  Max Price: Rs. {new Intl.NumberFormat('en-LK').format(maxPrice)}
                </h4>
                <input
                  type="range"
                  min="2000"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-olive"
                />
              </div>

              {/* In stock */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                  />
                  <span>Only In-Stock</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="w-1/2 py-2.5 border border-gray-300 text-charcoal text-xs uppercase font-medium"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-olive text-white text-xs uppercase font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
