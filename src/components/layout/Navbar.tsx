import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { useSelectionBag } from '../../context/SelectionBagContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const { totalItems, toggleDrawer } = useSelectionBag();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-olive/10 py-3'
            : 'bg-white border-b border-gray-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile: Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-charcoal hover:text-olive focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 ml-1 text-charcoal hover:text-olive focus:outline-none"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2.5 group">
                {/* Monogram emblem */}
                <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 border border-gold/30 bg-ivory/50">
                  <img
                    src="/logo.png"
                    alt="AMORA VOGUE Monogram"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-editorial text-xl sm:text-2xl tracking-[0.22em] font-semibold text-charcoal uppercase leading-none group-hover:text-olive transition-colors">
                    AMORA VOGUE
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-gold-dark font-medium -mt-0.5">
                    Colombo • Boutique
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium tracking-widestPlus uppercase text-charcoal">
              <Link
                to="/new-arrivals"
                className="hover:text-olive transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-olive after:transition-all"
              >
                New Arrivals
              </Link>

              {/* Shop Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <Link
                  to="/shop"
                  className="flex items-center gap-1 hover:text-olive transition-colors py-1"
                >
                  Shop
                  <ChevronDown className="w-3 h-3 text-charcoal/60" />
                </Link>

                {shopDropdownOpen && (
                  <div className="absolute top-full left-0 w-52 bg-white shadow-xl border border-olive/10 py-3 px-2 rounded-xs z-50 animate-fade-in">
                    <Link
                      to="/shop"
                      className="block px-3 py-2 text-xs tracking-wider text-charcoal hover:bg-ivory hover:text-olive transition-colors"
                    >
                      Shop All Clothing
                    </Link>
                    <Link
                      to="/best-sellers"
                      className="block px-3 py-2 text-xs tracking-wider text-charcoal hover:bg-ivory hover:text-olive transition-colors"
                    >
                      Best Sellers
                    </Link>
                    <div className="my-1 border-t border-gray-100" />
                    <Link
                      to="/category/dresses"
                      className="block px-3 py-2 text-xs tracking-wider text-charcoal hover:bg-ivory hover:text-olive transition-colors"
                    >
                      Dresses
                    </Link>
                    <Link
                      to="/category/tops"
                      className="block px-3 py-2 text-xs tracking-wider text-charcoal hover:bg-ivory hover:text-olive transition-colors"
                    >
                      Tops
                    </Link>
                    <Link
                      to="/category/pants-trousers"
                      className="block px-3 py-2 text-xs tracking-wider text-charcoal hover:bg-ivory hover:text-olive transition-colors"
                    >
                      Pants & Trousers
                    </Link>
                    <Link
                      to="/category/co-ord-sets"
                      className="block px-3 py-2 text-xs tracking-wider text-charcoal hover:bg-ivory hover:text-olive transition-colors"
                    >
                      Co-Ord Sets
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/category/dresses"
                className="hover:text-olive transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-olive after:transition-all"
              >
                Dresses
              </Link>
              <Link
                to="/category/tops"
                className="hover:text-olive transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-olive after:transition-all"
              >
                Tops
              </Link>
              <Link
                to="/category/pants-trousers"
                className="hover:text-olive transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-olive after:transition-all"
              >
                Bottoms
              </Link>
              <Link
                to="/best-sellers"
                className="hover:text-olive transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-olive after:transition-all text-gold-dark font-semibold"
              >
                Best Sellers
              </Link>
              <Link
                to="/about"
                className="hover:text-olive transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-olive after:transition-all"
              >
                About
              </Link>
            </nav>

            {/* Desktop & Mobile Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center text-charcoal hover:text-olive p-1.5 focus:outline-none"
                aria-label="Search items"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Selection Bag Trigger Button */}
              <button
                type="button"
                onClick={toggleDrawer}
                className="relative flex items-center gap-1.5 p-1.5 text-charcoal hover:text-olive focus:outline-none group"
                aria-label="Open Selection Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-charcoal group-hover:text-olive transition-colors" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-olive text-ivory text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline-block text-[11px] font-medium tracking-wider uppercase text-charcoal/80 group-hover:text-olive">
                  Bag ({totalItems})
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Predictive Search Modal / Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-2xl rounded-xs shadow-2xl p-6 border border-olive/20 animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-editorial text-xl tracking-wider uppercase text-olive font-semibold">
                Search AMORA VOGUE
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-charcoal p-1"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dresses, tops, linen, floral, sizes..."
                  className="w-full pl-11 pr-24 py-3 border border-olive/30 focus:border-olive focus:outline-none text-sm tracking-wide bg-ivory/50"
                  autoFocus
                />
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 px-4 py-1.5 bg-olive text-ivory text-xs tracking-widest uppercase font-medium hover:bg-olive-dark transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
            <div className="mt-4 pt-3 flex flex-wrap items-center gap-2 text-xs text-charcoal/70">
              <span className="text-gray-400">Popular:</span>
              <button
                onClick={() => {
                  navigate('/shop?search=maxi');
                  setSearchOpen(false);
                }}
                className="px-2.5 py-1 bg-ivory border border-gray-200 hover:border-olive text-[11px]"
              >
                Maxi Dresses
              </button>
              <button
                onClick={() => {
                  navigate('/shop?search=floral');
                  setSearchOpen(false);
                }}
                className="px-2.5 py-1 bg-ivory border border-gray-200 hover:border-olive text-[11px]"
              >
                Floral
              </button>
              <button
                onClick={() => {
                  navigate('/shop?search=linen');
                  setSearchOpen(false);
                }}
                className="px-2.5 py-1 bg-ivory border border-gray-200 hover:border-olive text-[11px]"
              >
                Linen
              </button>
              <button
                onClick={() => {
                  navigate('/category/co-ord-sets');
                  setSearchOpen(false);
                }}
                className="px-2.5 py-1 bg-ivory border border-gray-200 hover:border-olive text-[11px]"
              >
                Co-Ords
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 animate-slide-up">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="AMORA VOGUE"
                  className="w-8 h-8 object-contain rounded-full border border-gold/40 shadow-xs"
                />
                <span className="font-editorial text-lg tracking-widest uppercase font-semibold text-charcoal">
                  AMORA VOGUE
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-gray-500 hover:text-charcoal"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-6 space-y-4 text-xs tracking-widestPlus uppercase font-medium">
              <Link
                to="/new-arrivals"
                className="block py-2 text-charcoal hover:text-olive border-b border-gray-100"
              >
                New Arrivals
              </Link>
              <Link
                to="/shop"
                className="block py-2 text-charcoal hover:text-olive border-b border-gray-100"
              >
                Shop All
              </Link>
              <Link
                to="/category/dresses"
                className="block py-2 text-charcoal hover:text-olive border-b border-gray-100"
              >
                Dresses
              </Link>
              <Link
                to="/category/tops"
                className="block py-2 text-charcoal hover:text-olive border-b border-gray-100"
              >
                Tops
              </Link>
              <Link
                to="/category/pants-trousers"
                className="block py-2 text-charcoal hover:text-olive border-b border-gray-100"
              >
                Bottoms & Trousers
              </Link>
              <Link
                to="/category/co-ord-sets"
                className="block py-2 text-charcoal hover:text-olive border-b border-gray-100"
              >
                Co-Ord Sets
              </Link>
              <Link
                to="/best-sellers"
                className="block py-2 text-gold-dark font-semibold border-b border-gray-100"
              >
                Best Sellers
              </Link>
              <Link
                to="/about"
                className="block py-2 text-charcoal hover:text-olive border-b border-gray-100"
              >
                About AMORA VOGUE
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-charcoal hover:text-olive"
              >
                Contact & WhatsApp
              </Link>
            </nav>

            <div className="p-4 bg-ivory/60 border-t border-gray-200 text-xs">
              <p className="text-gray-500 text-[11px] mb-2">Order easily via WhatsApp</p>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  toggleDrawer();
                }}
                className="w-full py-2.5 bg-olive text-ivory text-center tracking-widest uppercase font-semibold text-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                View Selection Bag ({totalItems})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
