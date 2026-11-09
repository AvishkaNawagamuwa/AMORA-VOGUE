import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelectionBag } from '../context/SelectionBagContext';
import { formatPrice } from '../utils/formatPrice';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

export const SelectionBagPage: React.FC = () => {
  const { items, subtotal, totalItems, updateQuantity, removeItem } = useSelectionBag();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-ivory/30 flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 sm:p-12 rounded-xs border border-olive/10 shadow-xs max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center mx-auto text-gray-400 mb-4">
            <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl text-charcoal font-medium mb-2">
            Your Selection Bag is Empty
          </h2>
          <p className="text-xs text-charcoal/60 mb-6 font-light">
            You haven&apos;t selected any clothing items yet. Explore our latest maxi dresses, chic tops, and co-ords.
          </p>
          <Link
            to="/shop"
            className="inline-block px-7 py-3 bg-olive text-ivory text-xs tracking-widest uppercase font-semibold hover:bg-olive-dark transition-colors shadow-sm"
          >
            Start Exploring Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-100 pb-4 mb-8">
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-dark block mb-1">
            Boutique Cart
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-charcoal font-normal">
            Your Selection Bag ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})
          </h1>
          <p className="text-xs text-charcoal/70 mt-1 font-light">
            Review your selected fashion items before continuing to WhatsApp order submission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table / List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 bg-ivory/20 border border-olive/10 rounded-xs"
              >
                {/* Thumbnail */}
                <Link
                  to={`/product/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="w-24 h-32 sm:w-28 sm:h-36 bg-ivory rounded-xs overflow-hidden shrink-0 self-center sm:self-start"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                          SKU: {item.sku}
                        </span>
                        <h3 className="text-sm sm:text-base font-medium text-charcoal">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-charcoal/70 mt-2">
                      <div>Size: <strong className="text-charcoal">{item.size}</strong></div>
                      <div>•</div>
                      <div>Color: <strong className="text-charcoal">{item.color}</strong></div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-gray-100 sm:border-0">
                    <div className="flex items-center border border-gray-300 bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-semibold text-olive">
                        {formatPrice(item.quantity * item.unitPrice)}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {formatPrice(item.unitPrice)} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-olive hover:text-gold-dark transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping More Styles</span>
              </Link>
            </div>
          </div>

          {/* Right: Summary Box */}
          <div className="lg:col-span-4 bg-ivory/50 p-6 rounded-xs border border-olive/15 shadow-xs space-y-5">
            <h3 className="font-editorial text-xl font-normal text-charcoal border-b border-olive/15 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-charcoal">
                <span>Total Items</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="flex justify-between text-charcoal text-sm">
                <span>Merchandise Subtotal</span>
                <span className="font-bold text-olive">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-[11px] pt-1 border-t border-olive/10">
                <span>Delivery Charges</span>
                <span className="italic text-gold-dark font-medium">To be confirmed</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-olive/10 rounded-xs space-y-2 text-[11px] text-charcoal/80">
              <div className="flex items-start gap-2">
                <Truck className="w-3.5 h-3.5 text-olive shrink-0 mt-0.5" />
                <span>Islandwide doorstep delivery confirmed via WhatsApp.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-olive shrink-0 mt-0.5" />
                <span>No online card payment required. Free exchange within 7 days.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/whatsapp-order')}
              className="w-full py-3.5 bg-olive text-ivory hover:bg-olive-dark transition-all text-xs tracking-widestPlus uppercase font-bold flex items-center justify-center gap-2 shadow-md group"
            >
              <span>Continue to WhatsApp Order</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
