import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductListTemplate } from '../components/products/ProductListTemplate';

export const BestSellersPage: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);

  return (
    <ProductListTemplate
      title="Best Sellers"
      subtitle="Most Loved by Our Community"
      initialProducts={bestSellers}
    />
  );
};
