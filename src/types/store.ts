// Comprehensive store data models for Amora Vogue

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  displayOrder: number;
  isActive: boolean;
  showInNav: boolean;
  itemCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductVariant {
  id?: string;
  size: string;
  color: string;
  colorHex?: string;
  stockQuantity: number;
  inStock: boolean;
  sku: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
  displayOrder: number;
  colorName?: string;
  viewType?: 'front' | 'side' | 'back' | 'detail';
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string; // Category slug for backward compatibility
  categoryId?: string;
  collection?: string;
  images: string[]; // Primary image string array for seamless backward compatibility
  productImages?: ProductImage[];
  availableColors: ProductColor[];
  availableSizes: string[];
  variants: ProductVariant[];
  inStock: boolean;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  fabric?: string;
  care?: string[];
  status?: 'published' | 'draft' | 'archived';
  displayOrder?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface HomepageBanner {
  id: string;
  title: string;
  image: string;
  mobileImage?: string;
  link: string;
  displayOrder: number;
  isActive: boolean;
  alt: string;
  createdAt?: string;
}

export interface StoreSettings {
  whatsappNumber: string;
  contactNumber: string;
  businessEmail: string;
  instagramUrl: string;
  facebookUrl: string;
  storeAddress: string;
  storeName: string;
  storeTagline: string;
  deliveryInfo: string;
  returnsPolicy: string;
  sizeGuide: string;
  updatedAt?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'superadmin' | 'admin';
  createdAt: string;
}

export interface DashboardMetrics {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  archivedProducts: number;
  totalCategories: number;
  inStockProducts: number;
  outOfStockProducts: number;
  lowStockProducts: number;
  newArrivals: number;
  bestSellers: number;
}
