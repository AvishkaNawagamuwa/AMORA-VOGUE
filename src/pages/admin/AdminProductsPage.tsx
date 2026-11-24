import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Copy,
  Trash2,
  Archive,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Boxes,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Product } from '../../types/store';

export const AdminProductsPage: React.FC = () => {
  const { products, categories, duplicateProduct, archiveProduct, deleteProduct, saveProduct } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'out_of_stock'>('all');

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesDesc) return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (p.category !== selectedCategory && p.categoryId !== selectedCategory) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus !== 'all') {
        const pStatus = p.status || 'published';
        if (pStatus !== selectedStatus) return false;
      }

      // Stock filter
      if (stockFilter === 'in_stock' && !p.inStock) return false;
      if (stockFilter === 'out_of_stock' && p.inStock) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, stockFilter]);

  const handleDuplicate = async (id: string) => {
    try {
      const copy = await duplicateProduct(id);
      showToast(`Duplicated as "${copy.name}" in Drafts.`);
      setActionMenuId(null);
    } catch {
      showToast('Failed to duplicate product.');
    }
  };

  const handleToggleStatus = async (p: Product) => {
    const nextStatus = (p.status || 'published') === 'published' ? 'draft' : 'published';
    try {
      await saveProduct({ ...p, status: nextStatus });
      showToast(`Product set to ${nextStatus}.`);
    } catch {
      showToast('Failed to update status.');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await archiveProduct(id);
      showToast('Product archived.');
      setActionMenuId(null);
    } catch {
      showToast('Failed to archive.');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteProduct(deleteConfirmId);
      showToast('Product permanently deleted.');
      setDeleteConfirmId(null);
    } catch {
      showToast('Failed to delete product.');
    }
  };

  return (
    <AdminLayout
      title="Product Catalogue"
      subtitle={`Manage all ${products.length} products in your store.`}
      actions={
        <Link
          to="/admin/products/new"
          className="py-2 px-4 bg-olive text-ivory hover:bg-olive-dark rounded-md text-xs tracking-wider uppercase font-semibold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add Product</span>
        </Link>
      }
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-charcoal text-ivory text-xs px-4 py-2.5 rounded-lg shadow-xl border border-gold/40 animate-fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs mb-6 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, SKU, details..."
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

          {/* Category Selector */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-gray-50/50 text-charcoal"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug || c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selector */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-gray-50/50 text-charcoal"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-gray-50/50 text-charcoal"
            >
              <option value="all">All Stock Statuses</option>
              <option value="in_stock">In Stock Only</option>
              <option value="out_of_stock">Out of Stock Only</option>
            </select>
          </div>
        </div>

        {/* Results Count & Reset */}
        <div className="flex items-center justify-between text-xs text-charcoal/60 pt-1">
          <span>
            Showing <strong className="text-charcoal">{filteredProducts.length}</strong> of{' '}
            {products.length} products
          </span>
          {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all' || stockFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
                setStockFilter('all');
              }}
              className="text-olive hover:underline font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Desktop Products Table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50/75 border-b border-gray-200/80 text-[11px] uppercase tracking-wider text-charcoal/60">
              <th className="py-3 px-4">Item</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((p) => {
              const primaryImg = p.images[0] || '/Carousel/1.jpeg';
              const totalStock = p.variants?.reduce((sum, v) => sum + (v.stockQuantity || 0), 0) ?? (p.inStock ? 10 : 0);
              const pStatus = p.status || 'published';

              return (
                <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                  {/* Item Image + Name + SKU */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-14 rounded-md overflow-hidden bg-ivory shrink-0 border border-gray-200">
                        <img
                          src={primaryImg}
                          alt={p.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`/admin/products/edit/${p.id}`}
                          className="font-medium text-charcoal hover:text-olive block truncate max-w-xs"
                        >
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-charcoal/50 font-mono">
                          SKU: {p.sku}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 text-charcoal/70 uppercase">
                    {p.category}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-semibold text-charcoal">
                    Rs. {p.price.toLocaleString()}
                    {p.compareAtPrice && (
                      <span className="block text-[10px] text-charcoal/40 line-through font-normal">
                        Rs. {p.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                        totalStock === 0
                          ? 'bg-rose-50 text-rose-700'
                          : totalStock <= 5
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${totalStock === 0 ? 'bg-rose-500' : totalStock <= 5 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <span>{totalStock} in stock</span>
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(p)}
                      className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-all ${
                        pStatus === 'published'
                          ? 'bg-emerald-100/70 text-emerald-800 hover:bg-emerald-200'
                          : pStatus === 'draft'
                          ? 'bg-amber-100/70 text-amber-800 hover:bg-amber-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      title="Click to toggle publish status"
                    >
                      {pStatus}
                    </button>
                  </td>

                  {/* Action Menu */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/product/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-charcoal/50 hover:text-charcoal hover:bg-gray-100 rounded-md"
                        title="View live product page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        to={`/admin/products/edit/${p.id}`}
                        className="p-1.5 text-olive hover:bg-olive/10 rounded-md"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(p.id)}
                        className="p-1.5 text-charcoal/60 hover:text-charcoal hover:bg-gray-100 rounded-md"
                        title="Duplicate product"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-md"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Products Cards View */}
      <div className="md:hidden space-y-3">
        {filteredProducts.map((p) => {
          const primaryImg = p.images[0] || '/Carousel/1.jpeg';
          const totalStock = p.variants?.reduce((sum, v) => sum + (v.stockQuantity || 0), 0) ?? (p.inStock ? 10 : 0);
          const pStatus = p.status || 'published';

          return (
            <div
              key={p.id}
              className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-16 h-20 rounded-lg overflow-hidden bg-ivory shrink-0 border border-gray-200">
                  <img
                    src={primaryImg}
                    alt={p.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-charcoal/50 font-mono">
                      {p.sku}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(p)}
                      className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold ${
                        pStatus === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {pStatus}
                    </button>
                  </div>

                  <Link
                    to={`/admin/products/edit/${p.id}`}
                    className="font-medium text-xs text-charcoal hover:text-olive block mt-0.5 leading-snug truncate"
                  >
                    {p.name}
                  </Link>

                  <div className="text-xs font-semibold text-charcoal mt-1">
                    Rs. {p.price.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className={`text-[10px] font-medium ${
                        totalStock === 0
                          ? 'text-rose-600'
                          : totalStock <= 5
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}
                    >
                      {totalStock} in stock
                    </span>
                    <span className="text-charcoal/30">•</span>
                    <span className="text-[10px] text-charcoal/50 uppercase">
                      {p.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                <Link
                  to={`/product/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-charcoal/60 hover:text-charcoal py-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View</span>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDuplicate(p.id)}
                    className="p-1.5 text-charcoal/60 hover:text-charcoal hover:bg-gray-100 rounded-md"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <Link
                    to={`/admin/products/edit/${p.id}`}
                    className="py-1 px-3 bg-olive text-ivory rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-1 shadow-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(p.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl border border-gray-200">
            <h3 className="font-editorial text-lg font-semibold text-charcoal mb-2">
              Delete Product?
            </h3>
            <p className="text-xs text-charcoal/70 leading-relaxed mb-6 font-light">
              Are you sure you want to permanently delete this item? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="py-2 px-4 rounded-md text-xs font-semibold text-charcoal/70 hover:bg-gray-100 uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-2 px-4 rounded-md text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white uppercase tracking-wider shadow-sm"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
