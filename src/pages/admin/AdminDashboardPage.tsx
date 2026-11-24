import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  FolderTree,
  Boxes,
  Image as ImageIcon,
  Plus,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Tag,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from '../../components/admin/AdminLayout';

export const AdminDashboardPage: React.FC = () => {
  const { metrics, products, categories } = useStore();

  const recentProducts = products.slice(0, 6);

  return (
    <AdminLayout
      title="Store Overview"
      subtitle="Manage your boutique catalogue, stock levels, and store promotions."
    >
      {/* Prominent Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <Link
          to="/admin/products/new"
          className="p-4 rounded-xl bg-olive text-ivory hover:bg-olive-dark transition-all shadow-sm flex flex-col items-center sm:items-start justify-between min-h-[96px] group"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase mt-2">
            Add Product
          </span>
        </Link>

        <Link
          to="/admin/categories"
          className="p-4 rounded-xl bg-white border border-olive/20 hover:border-olive text-charcoal hover:text-olive transition-all shadow-xs flex flex-col items-center sm:items-start justify-between min-h-[96px] group"
        >
          <div className="w-8 h-8 rounded-full bg-olive/10 flex items-center justify-center text-olive group-hover:scale-110 transition-transform">
            <FolderTree className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase mt-2">
            Add Category
          </span>
        </Link>

        <Link
          to="/admin/inventory"
          className="p-4 rounded-xl bg-white border border-olive/20 hover:border-olive text-charcoal hover:text-olive transition-all shadow-xs flex flex-col items-center sm:items-start justify-between min-h-[96px] group"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
            <Boxes className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase mt-2">
            Update Stock
          </span>
        </Link>

        <Link
          to="/admin/banners"
          className="p-4 rounded-xl bg-white border border-olive/20 hover:border-olive text-charcoal hover:text-olive transition-all shadow-xs flex flex-col items-center sm:items-start justify-between min-h-[96px] group"
        >
          <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-gold-dark group-hover:scale-110 transition-transform">
            <ImageIcon className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase mt-2">
            Homepage Banners
          </span>
        </Link>
      </div>

      {/* Catalogue Metrics Grid */}
      <div className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-widestPlus text-gold-dark mb-3">
          Catalogue Statistics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Total Products */}
          <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between text-charcoal/60 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">Total Products</span>
              <Package className="w-4 h-4 text-charcoal/40" />
            </div>
            <div className="text-2xl font-editorial font-bold text-charcoal">
              {metrics.totalProducts}
            </div>
            <div className="text-[10px] text-charcoal/50 mt-1">
              Across {categories.length} categories
            </div>
          </div>

          {/* Published Products */}
          <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between text-charcoal/60 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">Published</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-editorial font-bold text-emerald-700">
              {metrics.publishedProducts}
            </div>
            <div className="text-[10px] text-charcoal/50 mt-1">
              Active on storefront
            </div>
          </div>

          {/* Draft Products */}
          <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between text-charcoal/60 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">Drafts</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-editorial font-bold text-amber-600">
              {metrics.draftProducts}
            </div>
            <div className="text-[10px] text-charcoal/50 mt-1">
              Hidden from public
            </div>
          </div>

          {/* In Stock */}
          <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between text-charcoal/60 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">In Stock</span>
              <Boxes className="w-4 h-4 text-olive" />
            </div>
            <div className="text-2xl font-editorial font-bold text-olive">
              {metrics.inStockProducts}
            </div>
            <div className="text-[10px] text-charcoal/50 mt-1">
              Available to order
            </div>
          </div>

          {/* Low / Out of Stock */}
          <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between text-charcoal/60 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-medium">Needs Attention</span>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-editorial font-bold text-rose-600">
              {metrics.lowStockProducts + metrics.outOfStockProducts}
            </div>
            <div className="text-[10px] text-charcoal/50 mt-1">
              {metrics.outOfStockProducts} out / {metrics.lowStockProducts} low stock
            </div>
          </div>
        </div>
      </div>

      {/* Featured Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold block">
              New Arrivals
            </span>
            <span className="text-xl font-editorial font-semibold text-charcoal">
              {metrics.newArrivals} Items
            </span>
          </div>
          <Sparkles className="w-5 h-5 text-gold" />
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold block">
              Best Sellers
            </span>
            <span className="text-xl font-editorial font-semibold text-charcoal">
              {metrics.bestSellers} Items
            </span>
          </div>
          <TrendingUp className="w-5 h-5 text-gold" />
        </div>

        <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-xs flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold block">
              Categories
            </span>
            <span className="text-xl font-editorial font-semibold text-charcoal">
              {metrics.totalCategories} Active
            </span>
          </div>
          <Tag className="w-5 h-5 text-gold" />
        </div>
      </div>

      {/* Recent Products Overview */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-lg font-semibold text-charcoal">
              Recent Catalogue Items
            </h3>
            <p className="text-xs text-charcoal/60 font-light">
              Latest items in your fashion inventory.
            </p>
          </div>
          <Link
            to="/admin/products"
            className="text-xs font-semibold tracking-wider uppercase text-olive hover:text-olive-dark flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {recentProducts.map((p) => {
            const primaryImg = p.images[0] || '/Carousel/1.jpeg';
            return (
              <div
                key={p.id}
                className="p-4 flex items-center justify-between gap-3 hover:bg-gray-50/70 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-14 rounded-md overflow-hidden bg-ivory shrink-0 border border-gray-200">
                    <img
                      src={primaryImg}
                      alt={p.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      to={`/admin/products/edit/${p.id}`}
                      className="text-xs sm:text-sm font-medium text-charcoal hover:text-olive truncate block"
                    >
                      {p.name}
                    </Link>
                    <div className="flex items-center gap-2 text-[10px] text-charcoal/50 mt-0.5">
                      <span>SKU: {p.sku}</span>
                      <span>•</span>
                      <span className="uppercase">{p.category}</span>
                      <span>•</span>
                      <span className="font-semibold text-charcoal">
                        Rs. {p.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${
                      p.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {p.status || 'published'}
                  </span>
                  <Link
                    to={`/admin/products/edit/${p.id}`}
                    className="p-2 text-charcoal/60 hover:text-olive hover:bg-gray-100 rounded-md transition-colors"
                    aria-label={`Edit ${p.name}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};
