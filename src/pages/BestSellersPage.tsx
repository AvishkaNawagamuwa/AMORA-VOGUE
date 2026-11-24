import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductListTemplate } from '../components/products/ProductListTemplate';

export const BestSellersPage: React.FC = () => {
  const { products } = useStore();
  const bestSellers = products.filter(
    (p) => (p.status || 'published') === 'published' && p.bestSeller
  );

  return (
    <ProductListTemplate
      title="Best Sellers"
      subtitle="Most Loved by Our Community"
      initialProducts={bestSellers}
    />
  );
};
