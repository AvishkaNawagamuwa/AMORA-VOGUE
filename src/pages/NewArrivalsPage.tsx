import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductListTemplate } from '../components/products/ProductListTemplate';

export const NewArrivalsPage: React.FC = () => {
  const newArrivals = PRODUCTS.filter((p) => p.newArrival);

  return (
    <ProductListTemplate
      title="New Arrivals"
      subtitle="Fresh Season Drops"
      initialProducts={newArrivals}
    />
  );
};
