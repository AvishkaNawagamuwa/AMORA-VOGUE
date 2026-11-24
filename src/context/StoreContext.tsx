import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Category,
  Product,
  HomepageBanner,
  StoreSettings,
  DashboardMetrics,
} from '../types/store';
import { storeService } from '../services/storeService';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  banners: HomepageBanner[];
  settings: StoreSettings;
  metrics: DashboardMetrics;
  loading: boolean;
  refreshStore: () => void;
  // Getters
  getProductBySlug: (slug: string) => Product | null;
  getProductById: (id: string) => Product | null;
  getProductsByCategory: (categorySlug: string) => Product[];
  getCategoryBySlug: (slug: string) => Category | null;
  // Actions
  saveProduct: (product: Partial<Product>) => Promise<Product>;
  duplicateProduct: (id: string) => Promise<Product>;
  archiveProduct: (id: string) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  updateProductStock: (
    productId: string,
    variant: { size: string; color: string },
    newQty: number
  ) => Promise<void>;
  saveCategory: (category: Partial<Category>) => Promise<Category>;
  deleteCategory: (id: string, reassignToId?: string) => Promise<void>;
  saveBanner: (banner: Partial<HomepageBanner>) => Promise<HomepageBanner>;
  deleteBanner: (id: string) => Promise<void>;
  reorderBanners: (orderedIds: string[]) => Promise<void>;
  updateStoreSettings: (settings: Partial<StoreSettings>) => Promise<StoreSettings>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => storeService.getProducts({ status: 'all' }));
  const [categories, setCategories] = useState<Category[]>(() => storeService.getCategories(true));
  const [banners, setBanners] = useState<HomepageBanner[]>(() => storeService.getBanners(true));
  const [settings, setSettings] = useState<StoreSettings>(() => storeService.getStoreSettings());
  const [metrics, setMetrics] = useState<DashboardMetrics>(() => storeService.getDashboardMetrics());
  const [loading, setLoading] = useState(false);

  const syncState = useCallback(() => {
    setProducts(storeService.getProducts({ status: 'all' }));
    setCategories(storeService.getCategories(true));
    setBanners(storeService.getBanners(true));
    setSettings(storeService.getStoreSettings());
    setMetrics(storeService.getDashboardMetrics());
  }, []);

  useEffect(() => {
    syncState();
    const unsubscribe = storeService.subscribe(() => {
      syncState();
    });
    return unsubscribe;
  }, [syncState]);

  const refreshStore = useCallback(() => {
    syncState();
  }, [syncState]);

  const getProductBySlug = useCallback((slug: string) => {
    return storeService.getProductBySlug(slug);
  }, []);

  const getProductById = useCallback((id: string) => {
    return storeService.getProductById(id);
  }, []);

  const getProductsByCategory = useCallback((categorySlug: string) => {
    return storeService.getProducts({ category: categorySlug, status: 'published' });
  }, []);

  const getCategoryBySlug = useCallback((slug: string) => {
    return storeService.getCategoryBySlug(slug);
  }, []);

  const saveProduct = async (product: Partial<Product>) => {
    const res = await storeService.saveProduct(product);
    syncState();
    return res;
  };

  const duplicateProduct = async (id: string) => {
    const res = await storeService.duplicateProduct(id);
    syncState();
    return res;
  };

  const archiveProduct = async (id: string) => {
    const res = await storeService.archiveProduct(id);
    syncState();
    return res;
  };

  const deleteProduct = async (id: string) => {
    await storeService.deleteProduct(id);
    syncState();
  };

  const updateProductStock = async (
    productId: string,
    variant: { size: string; color: string },
    newQty: number
  ) => {
    await storeService.updateProductStock(productId, variant, newQty);
    syncState();
  };

  const saveCategory = async (category: Partial<Category>) => {
    const res = await storeService.saveCategory(category);
    syncState();
    return res;
  };

  const deleteCategory = async (id: string, reassignToId?: string) => {
    await storeService.deleteCategory(id, reassignToId);
    syncState();
  };

  const saveBanner = async (banner: Partial<HomepageBanner>) => {
    const res = await storeService.saveBanner(banner);
    syncState();
    return res;
  };

  const deleteBanner = async (id: string) => {
    await storeService.deleteBanner(id);
    syncState();
  };

  const reorderBanners = async (orderedIds: string[]) => {
    await storeService.reorderBanners(orderedIds);
    syncState();
  };

  const updateStoreSettings = async (newSettings: Partial<StoreSettings>) => {
    const res = await storeService.updateStoreSettings(newSettings);
    syncState();
    return res;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        banners,
        settings,
        metrics,
        loading,
        refreshStore,
        getProductBySlug,
        getProductById,
        getProductsByCategory,
        getCategoryBySlug,
        saveProduct,
        duplicateProduct,
        archiveProduct,
        deleteProduct,
        updateProductStock,
        saveCategory,
        deleteCategory,
        saveBanner,
        deleteBanner,
        reorderBanners,
        updateStoreSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
