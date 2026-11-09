import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useSelectionBag } from '../../context/SelectionBagContext';
import { formatPrice } from '../../utils/formatPrice';

export const SelectionBagDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
  } = useSelectionBag();

  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleCheckoutClick = () => {
    setIsDrawerOpen(false);
    navigate('/whatsapp-order');
  };

  const handleViewBagClick = () => {
    setIsDrawerOpen(false);
    navigate('/selection-bag');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-up">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-ivory/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-olive" />
              <h3 className="font-editorial text-lg tracking-wider uppercase font-semibold text-charcoal">
                Selection Bag ({totalItems})
              </h3>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-gray-400 hover:text-charcoal focus:outline-none"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center text-gray-400 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h4 className="font-editorial text-xl text-charcoal font-medium mb-1">
                  Your Selection Bag is Empty
                </h4>
                <p className="text-xs text-charcoal/60 max-w-xs mb-6 font-light">
                  Browse our boutique collections and select your preferred dresses, tops, or outfits.
                </p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 bg-olive text-ivory text-xs tracking-widest uppercase font-semibold hover:bg-olive-dark transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-ivory/30 border border-olive/10 rounded-xs relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover object-top bg-ivory rounded-xs shrink-0"
                  />

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-medium text-charcoal truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
                        Code: {item.sku}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-charcoal/70 mt-1">
                        <span>Size: <strong className="text-charcoal">{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-charcoal">{item.color}</strong></span>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-gray-300 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-600 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-600 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-semibold text-olive">
                          {formatPrice(item.quantity * item.unitPrice)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-gray-400">
                            {formatPrice(item.unitPrice)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-gray-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-charcoal font-medium">
                  <span>Merchandise Subtotal</span>
                  <span className="font-semibold text-sm">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-[11px]">
                  <span>Delivery Charges</span>
                  <span className="italic text-gold-dark font-medium">To be confirmed</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-olive text-ivory hover:bg-olive-dark transition-all text-xs tracking-widestPlus uppercase font-semibold flex items-center justify-center gap-2 shadow-md group"
                >
                  <span>Continue to WhatsApp Order</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={handleViewBagClick}
                  className="w-full py-2 bg-ivory text-charcoal hover:bg-ivory/80 border border-olive/20 text-xs tracking-widest uppercase font-medium transition-colors"
                >
                  Review Selection Bag Page
                </button>
              </div>

              <p className="text-[10px] text-gray-400 text-center">
                Your order is reviewed and submitted directly on WhatsApp. No card payment required.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
