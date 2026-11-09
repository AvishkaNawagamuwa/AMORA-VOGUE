import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, Product } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import { useSelectionBag } from '../context/SelectionBagContext';
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

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-editorial text-3xl text-charcoal mb-3">Product Not Found</h2>
        <p className="text-xs text-gray-500 mb-6">
          The requested fashion item may have been moved or is currently unavailable.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-olive text-ivory text-xs uppercase tracking-widest font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.availableColors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0] || 'One Size');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Active variant stock check
  const activeVariant = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );
  const isAvailable = activeVariant ? activeVariant.inStock : product.inStock;

  const handleSelectThisItem = () => {
    if (!isAvailable) return;

    addItem({
      name: product.name,
      sku: product.sku,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      unitPrice: product.price,
      image: selectedImage,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  // Related products from same category or collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, 4);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-ivory/60 border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[11px] text-charcoal/60 uppercase tracking-wider font-light">
            <Link to="/" className="hover:text-olive">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link to="/shop" className="hover:text-olive">Shop</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link to={`/category/${product.category}`} className="hover:text-olive capitalize">
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-charcoal font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Product Images Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start">
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-2.5 overflow-x-auto w-full md:w-20 shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-20 md:w-20 md:h-24 overflow-hidden border transition-all ${
                      selectedImage === img
                        ? 'border-olive shadow-xs ring-1 ring-olive/20'
                        : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] bg-ivory overflow-hidden rounded-xs border border-olive/10">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
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
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 border border-emerald-200 font-semibold uppercase tracking-wider">
                  {isAvailable ? 'In Stock' : 'Out of Stock'}
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
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Color: <span className="font-normal text-gray-600">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {product.availableColors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
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
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection & Size Guide */}
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
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-semibold tracking-wider uppercase border transition-all ${
                        isSelected
                          ? 'bg-olive text-ivory border-olive shadow-xs'
                          : 'bg-white text-charcoal border-gray-200 hover:border-charcoal'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center border border-gray-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-2 text-charcoal hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-2 text-xs font-bold text-charcoal min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-2 text-charcoal hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 
              SECTION 9 MANDATORY REQUIREMENT:
              NO TRADITIONAL ADD TO CART BUTTON
              CLEARLY LABELED "SELECT THIS ITEM"
            */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleSelectThisItem}
                disabled={!isAvailable}
                className={`w-full py-4 text-xs sm:text-sm tracking-widestPlus uppercase font-bold flex items-center justify-center gap-2.5 transition-all shadow-md ${
                  justAdded
                    ? 'bg-emerald-700 text-white'
                    : isAvailable
                    ? 'bg-olive text-ivory hover:bg-olive-dark'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>ITEM SELECTED & ADDED TO BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>SELECT THIS ITEM</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-500 text-center font-light">
                Selecting stores items in your bag. You can select multiple dresses and submit together via WhatsApp.
              </p>
            </div>

            {/* Description, Fabric & Care */}
            <div className="pt-4 border-t border-gray-100 space-y-4 text-xs leading-relaxed text-charcoal/80">
              <div>
                <h4 className="font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Description
                </h4>
                <p className="font-light">{product.description}</p>
              </div>

              {product.fabric && (
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Fabric Composition
                  </h4>
                  <p className="font-light">{product.fabric}</p>
                </div>
              )}

              {product.care && (
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-charcoal mb-1">
                    Care Instructions
                  </h4>
                  <ul className="list-disc list-inside font-light space-y-0.5 text-gray-600">
                    {product.care.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Shipping & Delivery Guarantee Accordion */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs">
              <div className="flex items-center gap-3 text-charcoal/80">
                <Truck className="w-4 h-4 text-olive shrink-0" />
                <span>Islandwide Delivery within 2–4 business days across Sri Lanka</span>
              </div>
              <div className="flex items-center gap-3 text-charcoal/80">
                <RotateCcw className="w-4 h-4 text-olive shrink-0" />
                <span>Exchange allowed within 7 days for unworn items with tags intact</span>
              </div>
              <div className="flex items-center gap-3 text-charcoal/80">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct WhatsApp concierge for sizing & fabric inquiries</span>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like / Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-12 border-t border-gray-100">
            <div className="text-center mb-8">
              <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-1">
                Complete Your Look
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-normal tracking-tight text-charcoal">
                You May Also Like
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
};
