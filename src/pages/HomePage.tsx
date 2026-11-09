import React from 'react';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { NewArrivalsSlider } from '../components/home/NewArrivalsSlider';
import { DualTilesSection } from '../components/home/DualTilesSection';
import { ScrollShowcaseSection } from '../components/home/ScrollShowcaseSection';
import { WhyChooseAmoraVogue } from '../components/home/WhyChooseAmoraVogue';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CampaignBanner } from '../components/home/CampaignBanner';
import { ShopTheLook } from '../components/home/ShopTheLook';
import { StyleInspiration } from '../components/home/StyleInspiration';
import { Newsletter } from '../components/home/Newsletter';
import { PRODUCTS } from '../data/products';

export const HomePage: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);

  return (
    <div className="bg-white">
      {/* 
        Section 03: Full-Width Fashion Hero Image Carousel
        Image-only as mandated, 16:9 ratio, smooth 700ms horizontal transitions,
        infinite loop, indicators, mobile swipe, pause on hover.
      */}
      <HeroCarousel />

      {/* 
        GFLOCK-Style Horizontally Scrollable "NEW ARRIVALS" Carousel
        Featuring the real catalog dresses from flog/ with descriptions & swatches
      */}
      <NewArrivalsSlider products={PRODUCTS} />

      {/* 
        GFLOCK-Style 4 Big Images Dual Tiles Section
      */}
      <DualTilesSection />

      {/* 
        3C Ceylon Style Scroll Pop-Up Showcase Section:
        1st: Crop Top, 2nd: Striped Shirt, 3rd: Cut-Loin Frock
      */}
      <ScrollShowcaseSection />

      {/* 
        3C Ceylon Style 3D Rotating Vertical Panels:
        "Why choose AMORA VOGUE?" with 5 flog images and rotatable captions
      */}
      <WhyChooseAmoraVogue />

      {/* Section 06: Fashion Campaign Banner */}
      <CampaignBanner />

      {/* Section 07: Best Sellers */}
      <FeaturedProducts
        title="Best Sellers"
        subtitle="Our Most Desired Silhouettes"
        products={bestSellers}
        viewAllLink="/best-sellers"
      />

      {/* Section 08: Shop the Look */}
      <ShopTheLook />

      {/* Section 09: Instagram / Style Inspiration Gallery */}
      <StyleInspiration />

      {/* Section 10: Newsletter / Stay in Style */}
      <Newsletter />
    </div>
  );
};

