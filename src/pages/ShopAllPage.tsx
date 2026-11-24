import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductListTemplate } from '../components/products/ProductListTemplate';

export const ShopAllPage: React.FC = () => {
  const { products } = useStore();
  const publishedProducts = products.filter((p) => (p.status || 'published') === 'published');

  return (
    <ProductListTemplate
      title="All Women's Clothing"
      subtitle="Complete Boutique Collection"
      initialProducts={publishedProducts}
    />
  );
};
