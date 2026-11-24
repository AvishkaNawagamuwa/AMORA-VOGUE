import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductListTemplate } from '../components/products/ProductListTemplate';

export const NewArrivalsPage: React.FC = () => {
  const { products } = useStore();
  const newArrivals = products.filter(
    (p) => (p.status || 'published') === 'published' && p.newArrival
  );

  return (
    <ProductListTemplate
      title="New Arrivals"
      subtitle="Fresh Season Drops"
      initialProducts={newArrivals}
    />
  );
};
