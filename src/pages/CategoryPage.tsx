import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductListTemplate } from '../components/products/ProductListTemplate';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return <Navigate to="/shop" replace />;
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.slug);

  return (
    <ProductListTemplate
      title={category.name}
      subtitle="Category Collection"
      initialProducts={categoryProducts}
      currentCategory={category.slug}
    />
  );
};
