import React, { useState, useMemo } from 'react';
import {
  Boxes,
  Search,
  Filter,
  Plus,
  Minus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from '../../components/admin/AdminLayout';

export const AdminInventoryPage: React.FC = () => {
  const { products, categories, updateProductStock } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockLevelFilter, setStockLevelFilter] = useState<'all' | 'low' | 'out'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        if (!matchesName && !matchesSku) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (p.category !== selectedCategory && p.categoryId !== selectedCategory) {
          return false;
        }
      }

      // Stock level
      const totalStock = p.variants?.reduce((sum, v) => sum + (v.stockQuantity || 0), 0) ?? (p.inStock ? 10 : 0);
      if (stockLevelFilter === 'out' && totalStock > 0) return false;
      if (stockLevelFilter === 'low' && (totalStock > 5 || totalStock === 0)) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, stockLevelFilter]);

  const handleStockAdjust = async (
    productId: string,
    size: string,
    color: string,
    newQty: number
  ) => {
    try {
      await updateProductStock(productId, { size, color }, Math.max(0, newQty));
      showToast(`Stock updated to ${Math.max(0, newQty)}.`);
    } catch {
      showToast('Failed to update stock.');
    }
  };

  return (
    <AdminLayout
      title="Inventory Management"
      subtitle="Quickly adjust size and colour quantities directly from your phone."
    >
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-charcoal text-ivory text-xs px-4 py-2.5 rounded-lg shadow-xl border border-gold/40 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs mb-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-gray-50/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-gray-50/50 text-charcoal"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug || c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Level Filter */}
          <div>
            <select
              value={stockLevelFilter}
              onChange={(e) => setStockLevelFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-gray-50/50 text-charcoal"
            >
              <option value="all">All Stock Levels</option>
              <option value="low">Low Stock Only (≤ 5)</option>
              <option value="out">Out of Stock Only (0)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Cards List */}
      <div className="space-y-4">
        {filteredProducts.map((p) => {
          const primaryImg = p.images[0] || '/Carousel/1.jpeg';
          const totalStock = p.variants?.reduce((sum, v) => sum + (v.stockQuantity || 0), 0) ?? (p.inStock ? 10 : 0);

          return (
            <div
              key={p.id}
              className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-xs space-y-4"
            >
              {/* Product Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-14 rounded-md overflow-hidden bg-ivory shrink-0 border border-gray-200">
                    <img
                      src={primaryImg}
                      alt={p.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-xs sm:text-sm text-charcoal truncate">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] text-charcoal/50 mt-0.5">
                      <span className="font-mono">SKU: {p.sku}</span>
                      <span>•</span>
                      <span className="uppercase">{p.category}</span>
                      <span>•</span>
                      <span className="font-semibold text-charcoal">
                        Rs. {p.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Stock Indicator */}
                <div className="text-right shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      totalStock === 0
                        ? 'bg-rose-50 text-rose-700'
                        : totalStock <= 5
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    <span>Total: {totalStock}</span>
                  </span>
                </div>
              </div>

              {/* Variants Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {p.variants?.map((v) => {
                  const qty = v.stockQuantity ?? 0;
                  return (
                    <div
                      key={`${v.size}-${v.color}`}
                      className="p-2.5 rounded-lg border border-gray-200 bg-gray-50/50 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: v.colorHex || '#333' }}
                        />
                        <div className="truncate">
                          <span className="font-semibold text-xs text-charcoal block truncate">
                            {v.color}
                          </span>
                          <span className="text-[10px] text-charcoal/50 font-bold font-mono">
                            Size {v.size}
                          </span>
                        </div>
                      </div>

                      {/* Touch-Friendly Stepper */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStockAdjust(p.id, v.size, v.color, qty - 1)}
                          disabled={qty <= 0}
                          className="w-7 h-7 rounded-md bg-white border border-gray-300 text-charcoal flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <input
                          type="number"
                          min="0"
                          value={qty}
                          onChange={(e) =>
                            handleStockAdjust(
                              p.id,
                              v.size,
                              v.color,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-12 h-7 text-center font-bold text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-olive bg-white"
                        />

                        <button
                          type="button"
                          onClick={() => handleStockAdjust(p.id, v.size, v.color, qty + 1)}
                          className="w-7 h-7 rounded-md bg-white border border-gray-300 text-charcoal flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
};
