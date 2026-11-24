import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Plus,
  Store,
} from 'lucide-react';
import { authService } from '../../services/authService';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  actions,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = authService.getCurrentUser();

  // Prevent search engine indexing of admin pages
  useEffect(() => {
    let metaTag = document.querySelector('meta[name="robots"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'robots');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', 'noindex, nofollow');

    return () => {
      // Revert when leaving admin
      metaTag?.setAttribute('content', 'index, follow');
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { name: 'Banners', path: '/admin/banners', icon: ImageIcon },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF9] text-charcoal flex flex-col lg:flex-row font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-olive/15 shrink-0 min-h-screen sticky top-0 h-screen">
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-ivory border border-gold/40 flex items-center justify-center shadow-xs">
              <img src="/logo.png" alt="AMORA VOGUE" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-editorial text-lg tracking-wider font-semibold text-charcoal block leading-tight">
                AMORA VOGUE
              </span>
              <span className="text-[9px] tracking-widestPlus uppercase text-gold font-semibold block">
                Store Admin
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Add Product Button */}
        <div className="px-5 pt-5 pb-2">
          <Link
            to="/admin/products/new"
            className="w-full py-2.5 px-4 bg-olive text-ivory hover:bg-olive-dark transition-all rounded-md text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4 text-gold" />
            <span>Add Product</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs tracking-wider uppercase font-medium transition-all ${
                  isActive
                    ? 'bg-olive/10 text-olive font-semibold border-l-4 border-olive pl-2'
                    : 'text-charcoal/75 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-olive' : 'text-charcoal/50'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs text-charcoal/70 hover:text-olive rounded-md hover:bg-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              <span>View Storefront</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-ivory border border-gold/30 flex items-center justify-center shadow-xs">
            <img src="/logo.png" alt="AMORA VOGUE" className="w-full h-full object-contain" />
          </div>
          <span className="font-editorial text-base tracking-wider font-semibold text-charcoal uppercase">
            AMORA ADMIN
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products/new"
            className="p-1.5 bg-olive text-ivory rounded-full hover:bg-olive-dark shadow-xs"
            aria-label="Add product"
          >
            <Plus className="w-4 h-4 text-gold" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-charcoal hover:text-olive focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-down Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 shadow-md z-30">
          <div className="space-y-1 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs tracking-wider uppercase font-medium ${
                    isActive ? 'bg-olive/10 text-olive font-semibold' : 'text-charcoal/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-charcoal/70 py-1"
            >
              <Store className="w-4 h-4" />
              <span>View Storefront</span>
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-600 font-medium py-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Page Header */}
        {(title || actions) && (
          <div className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-5">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                {title && (
                  <h1 className="text-xl sm:text-2xl font-editorial font-semibold text-charcoal tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-charcoal/60 mt-0.5 font-light">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && <div className="flex items-center gap-2.5">{actions}</div>}
            </div>
          </div>
        )}

        {/* Page Body */}
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (Large touch targets for store owner on smartphone) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-30 px-2 py-1.5 shadow-lg">
        <div className="grid grid-cols-5 items-center">
          <Link
            to="/admin/dashboard"
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[10px] tracking-wider uppercase font-medium ${
              location.pathname === '/admin/dashboard'
                ? 'text-olive font-bold'
                : 'text-charcoal/60'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            <span>Home</span>
          </Link>

          <Link
            to="/admin/products"
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[10px] tracking-wider uppercase font-medium ${
              location.pathname.startsWith('/admin/products')
                ? 'text-olive font-bold'
                : 'text-charcoal/60'
            }`}
          >
            <Package className="w-5 h-5 mb-0.5" />
            <span>Products</span>
          </Link>

          <Link
            to="/admin/inventory"
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[10px] tracking-wider uppercase font-medium ${
              location.pathname.startsWith('/admin/inventory')
                ? 'text-olive font-bold'
                : 'text-charcoal/60'
            }`}
          >
            <Boxes className="w-5 h-5 mb-0.5" />
            <span>Stock</span>
          </Link>

          <Link
            to="/admin/categories"
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[10px] tracking-wider uppercase font-medium ${
              location.pathname.startsWith('/admin/categories')
                ? 'text-olive font-bold'
                : 'text-charcoal/60'
            }`}
          >
            <FolderTree className="w-5 h-5 mb-0.5" />
            <span>Cats</span>
          </Link>

          <Link
            to="/admin/settings"
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md text-[10px] tracking-wider uppercase font-medium ${
              location.pathname.startsWith('/admin/settings') || location.pathname.startsWith('/admin/banners')
                ? 'text-olive font-bold'
                : 'text-charcoal/60'
            }`}
          >
            <Settings className="w-5 h-5 mb-0.5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
