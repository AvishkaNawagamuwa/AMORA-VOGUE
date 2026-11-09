import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { formatPrice } from '../../utils/formatPrice';
import { useSelectionBag } from '../../context/SelectionBagContext';
import { ShoppingBag, Check } from 'lucide-react';

export const ShopTheLook: React.FC = () => {
  const lookProduct1 = PRODUCTS.find((p) => p.id === 'av-004') || PRODUCTS[3]; // Linen top
  const lookProduct2 = PRODUCTS.find((p) => p.id === 'av-005') || PRODUCTS[4]; // Linen trousers

  const { addItem } = useSelectionBag();
  const [selectedSize1, setSelectedSize1] = useState(lookProduct1.availableSizes[0]);
  const [selectedSize2, setSelectedSize2] = useState(lookProduct2.availableSizes[0]);
  const [added1, setAdded1] = useState(false);
  const [added2, setAdded2] = useState(false);

  const handleSelectProduct1 = () => {
    addItem({
      name: lookProduct1.name,
      sku: lookProduct1.sku,
      size: selectedSize1,
      color: lookProduct1.availableColors[0].name,
      quantity: 1,
      unitPrice: lookProduct1.price,
      image: lookProduct1.images[0],
    });
    setAdded1(true);
    setTimeout(() => setAdded1(false), 2000);
  };

  const handleSelectProduct2 = () => {
    addItem({
      name: lookProduct2.name,
      sku: lookProduct2.sku,
      size: selectedSize2,
      color: lookProduct2.availableColors[0].name,
      quantity: 1,
      unitPrice: lookProduct2.price,
      image: lookProduct2.images[0],
    });
    setAdded2(true);
    setTimeout(() => setAdded2(false), 2000);
  };

  return (
    <section className="py-14 md:py-20 bg-ivory/60 border-t border-b border-olive/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-2">
            Curated Outfits
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal tracking-tight text-charcoal">
            Shop The Look
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-charcoal/70">
            Effortlessly styled pairings. Select items together and order in one easy WhatsApp message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Look Photo */}
          <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-xs bg-white shadow-sm border border-olive/10">
            <img
              src="/Carousel/Minimalist Abstract Pattern Dress Portrait.png"
              alt="Shop The Look Outfit Amora Vogue"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 border border-olive/20 text-[10px] tracking-widest uppercase font-semibold text-olive">
              The Earthy Minimalist Ensemble
            </div>
          </div>

          {/* Outfit Items Breakdown */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Item 1 */}
            <div className="p-4 bg-white border border-gray-100 shadow-xs rounded-xs flex gap-4 items-center">
              <Link to={`/product/${lookProduct1.slug}`} className="w-20 h-24 flex-shrink-0 bg-ivory overflow-hidden">
                <img
                  src={lookProduct1.images[0]}
                  alt={lookProduct1.name}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-gray-400">
                  {lookProduct1.sku}
                </span>
                <h4 className="text-xs sm:text-sm font-medium text-charcoal truncate">
                  {lookProduct1.name}
                </h4>
                <div className="text-xs font-semibold text-olive mt-0.5">
                  {formatPrice(lookProduct1.price)}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 uppercase">Size:</span>
                  <div className="flex gap-1">
                    {lookProduct1.availableSizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize1(s)}
                        className={`px-2 py-0.5 text-[10px] border ${
                          selectedSize1 === s
                            ? 'border-olive bg-olive text-white'
                            : 'border-gray-200 text-charcoal hover:border-gray-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSelectProduct1}
                  className="mt-2.5 w-full py-1.5 bg-ivory border border-olive/30 hover:bg-olive hover:text-white text-olive text-[11px] tracking-wider uppercase font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  {added1 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Select This Item</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-4 bg-white border border-gray-100 shadow-xs rounded-xs flex gap-4 items-center">
              <Link to={`/product/${lookProduct2.slug}`} className="w-20 h-24 flex-shrink-0 bg-ivory overflow-hidden">
                <img
                  src={lookProduct2.images[0]}
                  alt={lookProduct2.name}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-gray-400">
                  {lookProduct2.sku}
                </span>
                <h4 className="text-xs sm:text-sm font-medium text-charcoal truncate">
                  {lookProduct2.name}
                </h4>
                <div className="text-xs font-semibold text-olive mt-0.5">
                  {formatPrice(lookProduct2.price)}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 uppercase">Size:</span>
                  <div className="flex gap-1">
                    {lookProduct2.availableSizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize2(s)}
                        className={`px-2 py-0.5 text-[10px] border ${
                          selectedSize2 === s
                            ? 'border-olive bg-olive text-white'
                            : 'border-gray-200 text-charcoal hover:border-gray-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSelectProduct2}
                  className="mt-2.5 w-full py-1.5 bg-ivory border border-olive/30 hover:bg-olive hover:text-white text-olive text-[11px] tracking-wider uppercase font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  {added2 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Select This Item</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
