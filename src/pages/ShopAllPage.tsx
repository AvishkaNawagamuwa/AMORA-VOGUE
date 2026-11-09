import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductListTemplate } from '../components/products/ProductListTemplate';

export const ShopAllPage: React.FC = () => {
  return (
    <ProductListTemplate
      title="All Women's Clothing"
      subtitle="Complete Boutique Collection"
      initialProducts={PRODUCTS}
    />
  );
};
