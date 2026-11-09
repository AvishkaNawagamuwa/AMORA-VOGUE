import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SelectionBagProvider } from './context/SelectionBagContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SelectionBagDrawer } from './components/selection-bag/SelectionBagDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopAllPage } from './pages/ShopAllPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { BestSellersPage } from './pages/BestSellersPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SelectionBagPage } from './pages/SelectionBagPage';
import { WhatsAppOrderPage } from './pages/WhatsAppOrderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DeliveryInfoPage } from './pages/DeliveryInfoPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  return (
    <SelectionBagProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-charcoal">
          {/* Section 01: Announcement Bar */}
          <AnnouncementBar />

          {/* Section 02: Sticky Header & Navbar */}
          <Navbar />

          {/* Global Slide-In Selection Bag Drawer */}
          <SelectionBagDrawer />

          {/* Main Routing Views */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopAllPage />} />
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />
              <Route path="/best-sellers" element={<BestSellersPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/selection-bag" element={<SelectionBagPage />} />
              <Route path="/whatsapp-order" element={<WhatsAppOrderPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/delivery-information" element={<DeliveryInfoPage />} />
              <Route path="/returns-exchanges" element={<ReturnsPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-conditions" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          {/* Section 12: Footer */}
          <Footer />
        </div>
      </Router>
    </SelectionBagProvider>
  );
};

export default App;
