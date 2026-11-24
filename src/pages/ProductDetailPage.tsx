import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { useSelectionBag } from '../context/SelectionBagContext';
import { useStore } from '../context/StoreContext';
import { SizeGuideModal } from '../components/products/SizeGuideModal';
import { ProductCard } from '../components/products/ProductCard';
import {
  ShoppingBag,
  Check,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  MessageCircle,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useSelectionBag();
  const { getProductBySlug, products: allProducts } = useStore();

  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <h2 className="font-editorial text-3xl text-charcoal mb-3">Product Not Found</h2>
        <p className="text-xs text-gray-500 mb-6 font-light">
          The requested fashion item may have been moved or is currently unavailable.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-olive text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-olive-dark transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0] || '/Carousel/1.jpeg');
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors[0]?.name || product.variants[0]?.color || 'Default'
  );
  const [selectedSize, setSelectedSize] = useState(
    product.availableSizes[0] || product.variants[0]?.size || 'One Size'
  );
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Sync image if product changes
  useEffect(() => {
    setSelectedImage(product.images[0] || '/Carousel/1.jpeg');
    setSelectedColor(product.availableColors[0]?.name || product.variants[0]?.color || 'Default');
    setSelectedSize(product.availableSizes[0] || product.variants[0]?.size || 'One Size');
    setQuantity(1);
  }, [product.id]);

  // Color selection with color-associated photo switching
  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);

    // If color-specific photo exists, switch primary display image
    if (product.productImages && product.productImages.length > 0) {
      const colorMatch = product.productImages.find(
        (img) => img.colorName && img.colorName.toUpperCase() === colorName.toUpperCase()
      );
      if (colorMatch) {
        setSelectedImage(colorMatch.url);
      }
    }
  };

  // Active variant stock check
  const activeVariant = product.variants?.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  const availableStock = activeVariant
    ? (activeVariant.stockQuantity ?? (activeVariant.inStock ? 10 : 0))
    : (product.inStock ? 10 : 0);

  const isAvailable = availableStock > 0;

  const handleSelectThisItem = () => {
    if (!isAvailable) return;

    addItem({
      name: product.name,
      sku: activeVariant?.sku || product.sku,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      unitPrice: product.price,
      image: selectedImage,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  // Related products from live database
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.status || 'published') === 'published' &&
        (p.category === product.category || p.categoryId === product.category)
    )
    .slice(0, 4);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-ivory/60 border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[11px] text-charcoal/60 uppercase tracking-wider font-light">
            <Link to="/" className="hover:text-olive">Home</Link>
            <ChevronRight className="w-3 h-3 text-charcoal/30" />
            <Link to="/shop" className="hover:text-olive">Shop</Link>
            <ChevronRight className="w-3 h-3 text-charcoal/30" />
            <Link to={`/category/${product.category}`} className="hover:text-olive">
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-charcoal/30" />
            <span className="text-charcoal font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main PDP Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT: Product Images Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto sm:max-h-[580px] shrink-0">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-16 sm:w-20 aspect-[3/4] rounded overflow-hidden border transition-all ${
                      selectedImage === imgUrl
                        ? 'border-olive ring-1 ring-olive/30 shadow-xs'
                        : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image Display */}
            <div className="relative flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-ivory/50 border border-gray-100 shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.newArrival && (
                <span className="absolute top-4 left-4 bg-white/95 text-olive text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 border border-olive/20 shadow-xs">
                  New Arrival
                </span>
              )}
            </div>
          </div>

          {/* RIGHT: Product Details & Variant Selection */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Title & Price */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-dark font-semibold">
                  SKU: {product.sku}
                </span>
                <span
                  className={`text-[10px] px-2.5 py-0.5 border font-semibold uppercase tracking-wider ${
                    isAvailable
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : 'text-rose-700 bg-rose-50 border-rose-200'
                  }`}
                >
                  {isAvailable ? `${availableStock} In Stock` : 'Out of Stock'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-editorial font-normal text-charcoal tracking-tight mt-1.5 mb-2">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-bold text-charcoal">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                  Color: <span className="font-normal text-gray-600">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2.5">
                  {product.availableColors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => handleColorChange(color.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-all ${
                          isSelected
                            ? 'border-olive bg-ivory text-olive font-semibold ring-1 ring-olive/20'
                            : 'border-gray-200 text-charcoal hover:border-gray-400'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="uppercase">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection & Size Guide */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                    Select Size
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-[11px] text-gold-dark hover:text-olive uppercase tracking-wider font-semibold underline underline-offset-4"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.availableSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    const variantForSize = product.variants?.find(
                      (v) => v.size === size && v.color === selectedColor
                    );
                    const isSizeOutOfStock = variantForSize
                      ? (variantForSize.stockQuantity ?? 0) <= 0
                      : false;

                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={isSizeOutOfStock}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-center text-xs font-semibold uppercase tracking-wider border transition-all ${
                          isSelected
                            ? 'border-olive bg-olive text-ivory shadow-xs'
                            : isSizeOutOfStock
                            ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed line-through'
                            : 'border-gray-200 text-charcoal hover:border-gray-400 bg-white'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center border border-gray-300">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="p-2.5 text-charcoal hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1 || !isAvailable}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-xs font-semibold text-charcoal">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.min(availableStock, prev + 1))}
                  className="p-2.5 text-charcoal hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                  disabled={quantity >= availableStock || !isAvailable}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Select This Item / CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSelectThisItem}
                disabled={!isAvailable}
                className={`w-full py-4 text-xs font-semibold uppercase tracking-widestPlus flex items-center justify-center gap-2 transition-all shadow-md ${
                  !isAvailable
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : justAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-olive text-ivory hover:bg-olive-dark'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Selection Bag</span>
                  </>
                ) : !isAvailable ? (
                  <span>Currently Out of Stock</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-gold" />
                    <span>Select This Item</span>
                  </>
                )}
              </button>
            </div>

            {/* Product Description */}
            {product.description && (
              <div className="pt-4 border-t border-gray-100 text-xs text-charcoal/80 leading-relaxed font-light space-y-2">
                <h3 className="font-semibold text-charcoal uppercase tracking-wider text-[11px]">
                  Description & Fit
                </h3>
                <p>{product.description}</p>
              </div>
            )}

            {/* Fabric & Care */}
            {(product.fabric || (product.care && product.care.length > 0)) && (
              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                {product.fabric && (
                  <div>
                    <h4 className="font-semibold text-charcoal uppercase tracking-wider text-[10px]">
                      Fabric
                    </h4>
                    <p className="text-charcoal/70 font-light mt-0.5">{product.fabric}</p>
                  </div>
                )}
                {product.care && product.care.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-semibold text-charcoal uppercase tracking-wider text-[10px]">
                      Care Guide
                    </h4>
                    <ul className="list-disc list-inside text-charcoal/70 font-light mt-0.5 space-y-0.5">
                      {product.care.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Boutique Perks */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-[11px] text-charcoal/70">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold shrink-0" />
                <span>Doorstep Islandwide Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-gold shrink-0" />
                <span>7-Day Return & Exchange</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-editorial font-normal text-charcoal text-center mb-8">
              You May Also Adore
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
      )}
    </div>
  );
};
