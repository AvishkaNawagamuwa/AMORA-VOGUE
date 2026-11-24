import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductListTemplate } from '../components/products/ProductListTemplate';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getCategoryBySlug, getProductsByCategory } = useStore();

  const category = getCategoryBySlug(slug || '');

  if (!category) {
    return <Navigate to="/shop" replace />;
  }

  const categoryProducts = getProductsByCategory(category.slug || category.id);

  return (
    <ProductListTemplate
      title={category.name}
      subtitle="Category Collection"
      initialProducts={categoryProducts}
      currentCategory={category.slug || category.id}
    />
  );
};
