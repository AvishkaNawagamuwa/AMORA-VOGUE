import { CATEGORIES as INITIAL_CATEGORIES } from '../data/categories';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import {
  Category,
  Product,
  HomepageBanner,
  StoreSettings,
  DashboardMetrics,
} from '../types/store';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEYS = {
  CATEGORIES: 'amora_vogue_db_categories',
  PRODUCTS: 'amora_vogue_db_products',
  BANNERS: 'amora_vogue_db_banners',
  SETTINGS: 'amora_vogue_db_settings',
};

const DEFAULT_BANNERS: HomepageBanner[] = [
  {
    id: 'banner-01',
    title: 'Modern Essentials Fashion Banner',
    image: '/Carousel/Modern Essentials Fashion Banner.png',
    link: '/new-arrivals',
    displayOrder: 1,
    isActive: true,
    alt: 'AMORA VOGUE - Modern Essentials: Curated Feminine Elegance',
  },
  {
    id: 'banner-02',
    title: 'After Hours Maxi Dress',
    image: '/Carousel/1.jpeg',
    link: '/category/dresses',
    displayOrder: 2,
    isActive: true,
    alt: 'AMORA VOGUE - After Hours: A quiet statement of elegance',
  },
  {
    id: 'banner-03',
    title: 'Elevated Lines Ensemble',
    image: '/Carousel/2.jpeg',
    link: '/new-arrivals',
    displayOrder: 3,
    isActive: true,
    alt: 'AMORA VOGUE - Elevated Lines: Grace in every detail',
  },
  {
    id: 'banner-04',
    title: 'Soft Poise Linen Dress',
    image: '/Carousel/3.jpeg',
    link: '/best-sellers',
    displayOrder: 4,
    isActive: true,
    alt: 'AMORA VOGUE - Soft Poise: Where elegance meets ease',
  },
  {
    id: 'banner-05',
    title: 'Effortless Style Portrait',
    image: '/Carousel/Effortless Style Fashion Portrait.png',
    link: '/shop',
    displayOrder: 5,
    isActive: true,
    alt: 'AMORA VOGUE - Effortless Style: Contemporary Silhouette & Poise',
  },
];

const DEFAULT_SETTINGS: StoreSettings = {
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567',
  contactNumber: '+94 77 123 4567',
  businessEmail: 'care@amoravogue.lk',
  instagramUrl: 'https://instagram.com',
  facebookUrl: 'https://facebook.com',
  storeAddress: 'Colombo, Sri Lanka (Islandwide Doorstep Delivery)',
  storeName: import.meta.env.VITE_STORE_NAME || 'AMORA VOGUE',
  storeTagline: import.meta.env.VITE_STORE_TAGLINE || 'Everyday Feminine Elegance',
  deliveryInfo: 'Islandwide doorstep delivery within 2-3 business days across Sri Lanka. Cash on delivery & bank transfer available via WhatsApp ordering.',
  returnsPolicy: 'We accept exchanges within 7 days of delivery for unworn items with tags attached.',
  sizeGuide: 'Standard Sri Lankan / UK sizing: XS (UK 6), S (UK 8), M (UK 10), L (UK 12), XL (UK 14), XXL (UK 16).',
};

// Convert initial hardcoded data into enriched data structures
const initializeInitialCategories = (): Category[] => {
  return INITIAL_CATEGORIES.map((cat, idx) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image: cat.image,
    displayOrder: idx + 1,
    isActive: true,
    showInNav: true,
    itemCount: cat.itemCount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

const initializeInitialProducts = (): Product[] => {
  return INITIAL_PRODUCTS.map((prod, idx) => ({
    ...prod,
    status: 'published',
    displayOrder: idx + 1,
    categoryId: prod.category,
    variants: prod.variants.map((v) => ({
      ...v,
      colorHex: prod.availableColors.find((c) => c.name === v.color)?.hex || '#333333',
      stockQuantity: v.inStock ? 10 : 0,
    })),
    productImages: prod.images.map((img, i) => ({
      id: `img-${prod.id}-${i}`,
      url: img,
      alt: prod.name,
      isPrimary: i === 0,
      displayOrder: i + 1,
      viewType: i === 0 ? 'front' : 'side',
    })),
  }));
};

class StoreService {
  private categories: Category[] = [];
  private products: Product[] = [];
  private banners: HomepageBanner[] = [];
  private settings: StoreSettings = DEFAULT_SETTINGS;
  private listeners: Set<() => void> = new Set();
  private initialized = false;

  constructor() {
    this.init();
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error in store listener:', err);
      }
    });
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private init() {
    if (this.initialized) return;

    // 1. Try to load from localStorage cache first
    try {
      const cachedCats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      const cachedProds = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      const cachedBanners = localStorage.getItem(STORAGE_KEYS.BANNERS);
      const cachedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);

      if (cachedCats) {
        this.categories = JSON.parse(cachedCats);
      } else {
        this.categories = initializeInitialCategories();
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
      }

      if (cachedProds) {
        this.products = JSON.parse(cachedProds);
      } else {
        this.products = initializeInitialProducts();
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
      }

      if (cachedBanners) {
        this.banners = JSON.parse(cachedBanners);
      } else {
        this.banners = DEFAULT_BANNERS;
        localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(this.banners));
      }

      if (cachedSettings) {
        this.settings = JSON.parse(cachedSettings);
      } else {
        this.settings = DEFAULT_SETTINGS;
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
      }
    } catch (e) {
      this.categories = initializeInitialCategories();
      this.products = initializeInitialProducts();
      this.banners = DEFAULT_BANNERS;
      this.settings = DEFAULT_SETTINGS;
    }

    this.initialized = true;

    // 2. If Supabase is configured, fetch live database records in background
    if (isSupabaseConfigured() && supabase) {
      this.fetchFromSupabase();
    }
  }

  private async fetchFromSupabase() {
    if (!supabase) return;

    try {
      const [catRes, prodRes, bannerRes, settingsRes] = await Promise.all([
        supabase.from('categories').select('*').order('display_order', { ascending: true }),
        supabase.from('products').select('*, product_images(*), product_variants(*)').order('display_order', { ascending: true }),
        supabase.from('homepage_banners').select('*').order('display_order', { ascending: true }),
        supabase.from('store_settings').select('*'),
      ]);

      let changed = false;

      if (catRes.data && catRes.data.length > 0) {
        this.categories = catRes.data.map((c: any) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          description: c.description,
          image: c.image,
          displayOrder: c.display_order,
          isActive: c.is_active,
          showInNav: c.show_in_nav,
          createdAt: c.created_at,
          updatedAt: c.updated_at,
        }));
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
        changed = true;
      }

      if (prodRes.data && prodRes.data.length > 0) {
        this.products = prodRes.data.map((p: any) => {
          const imgs = (p.product_images || []).sort((a: any, b: any) => a.display_order - b.display_order);
          const vars = p.product_variants || [];
          return {
            id: p.id,
            sku: p.sku,
            name: p.name,
            slug: p.slug,
            description: p.description,
            price: Number(p.price),
            compareAtPrice: p.compare_at_price ? Number(p.compare_at_price) : undefined,
            category: p.category_id,
            categoryId: p.category_id,
            collection: p.collection,
            fabric: p.fabric,
            care: Array.isArray(p.care) ? p.care : [],
            inStock: p.in_stock,
            featured: p.featured,
            newArrival: p.new_arrival,
            bestSeller: p.best_seller,
            status: p.status,
            displayOrder: p.display_order,
            createdAt: p.created_at,
            updatedAt: p.updated_at,
            images: imgs.length > 0 ? imgs.map((i: any) => i.image_url) : [],
            productImages: imgs.map((i: any) => ({
              id: i.id,
              url: i.image_url,
              alt: i.alt_text,
              isPrimary: i.is_primary,
              displayOrder: i.display_order,
              colorName: i.color_name,
              viewType: i.view_type,
            })),
            availableSizes: Array.from(new Set(vars.map((v: any) => v.size))),
            availableColors: Array.from(
              new Map(
                vars.map((v: any) => [v.color_name, { name: v.color_name, hex: v.color_hex || '#333333' }])
              ).values()
            ),
            variants: vars.map((v: any) => ({
              id: v.id,
              size: v.size,
              color: v.color_name,
              colorHex: v.color_hex,
              stockQuantity: v.stock_quantity ?? (v.in_stock ? 10 : 0),
              inStock: v.in_stock,
              sku: v.sku || `${p.sku}-${v.size}`,
            })),
          };
        });
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
        changed = true;
      }

      if (bannerRes.data && bannerRes.data.length > 0) {
        this.banners = bannerRes.data.map((b: any) => ({
          id: b.id,
          title: b.title,
          image: b.image_url,
          mobileImage: b.mobile_image_url,
          link: b.link,
          displayOrder: b.display_order,
          isActive: b.is_active,
          alt: b.alt_text,
          createdAt: b.created_at,
        }));
        localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(this.banners));
        changed = true;
      }

      if (settingsRes.data && settingsRes.data.length > 0) {
        const generalSettings = settingsRes.data.find((s: any) => s.key === 'general');
        if (generalSettings && generalSettings.value) {
          this.settings = { ...DEFAULT_SETTINGS, ...generalSettings.value };
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
          changed = true;
        }
      }

      if (changed) {
        this.notify();
      }
    } catch (err) {
      console.warn('Could not sync from Supabase, using local store:', err);
    }
  }

  // ================= CATEGORIES =================

  public getCategories(includeInactive = false): Category[] {
    this.init();
    const cats = includeInactive ? this.categories : this.categories.filter((c) => c.isActive);
    return [...cats].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public getCategoryBySlug(slug: string): Category | null {
    this.init();
    return this.categories.find((c) => c.slug === slug || c.id === slug) || null;
  }

  public getCategoryById(id: string): Category | null {
    this.init();
    return this.categories.find((c) => c.id === id) || null;
  }

  public async saveCategory(categoryData: Partial<Category>): Promise<Category> {
    this.init();
    const now = new Date().toISOString();
    const id = categoryData.id || `cat-${Date.now()}`;
    const slug = categoryData.slug || categoryData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || id;

    const existingIndex = this.categories.findIndex((c) => c.id === id || c.slug === slug);
    let updatedCat: Category;

    if (existingIndex >= 0) {
      updatedCat = {
        ...this.categories[existingIndex],
        ...categoryData,
        id,
        slug,
        updatedAt: now,
      };
      this.categories[existingIndex] = updatedCat;
    } else {
      updatedCat = {
        id,
        name: categoryData.name || 'Untitled Category',
        slug,
        description: categoryData.description || '',
        image: categoryData.image || '/Carousel/Chevron Maxi Dress in Ivory Studio.png',
        displayOrder: categoryData.displayOrder ?? this.categories.length + 1,
        isActive: categoryData.isActive ?? true,
        showInNav: categoryData.showInNav ?? true,
        itemCount: 0,
        createdAt: now,
        updatedAt: now,
      };
      this.categories.push(updatedCat);
    }

    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
    this.notify();

    // Sync to Supabase if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('categories').upsert({
          id: updatedCat.id,
          name: updatedCat.name,
          slug: updatedCat.slug,
          description: updatedCat.description,
          image: updatedCat.image,
          display_order: updatedCat.displayOrder,
          is_active: updatedCat.isActive,
          show_in_nav: updatedCat.showInNav,
          updated_at: updatedCat.updatedAt,
        });
      } catch (err) {
        console.error('Failed to sync category to Supabase:', err);
      }
    }

    return updatedCat;
  }

  public async deleteCategory(id: string, reassignToId?: string): Promise<void> {
    this.init();
    // Reassign products if requested
    if (reassignToId) {
      this.products = this.products.map((p) => {
        if (p.category === id || p.categoryId === id) {
          return { ...p, category: reassignToId, categoryId: reassignToId };
        }
        return p;
      });
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
    }

    this.categories = this.categories.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
    this.notify();

    if (isSupabaseConfigured() && supabase) {
      try {
        if (reassignToId) {
          await supabase.from('products').update({ category_id: reassignToId }).eq('category_id', id);
        }
        await supabase.from('categories').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete category on Supabase:', err);
      }
    }
  }

  // ================= PRODUCTS =================

  public getProducts(filter?: {
    category?: string;
    status?: 'published' | 'draft' | 'archived' | 'all';
    search?: string;
    inStockOnly?: boolean;
    featured?: boolean;
    newArrival?: boolean;
    bestSeller?: boolean;
  }): Product[] {
    this.init();
    let prods = [...this.products];

    // Status filter
    if (filter?.status && filter.status !== 'all') {
      prods = prods.filter((p) => (p.status || 'published') === filter.status);
    } else if (!filter?.status) {
      // By default for public customer queries, return published only
      prods = prods.filter((p) => (p.status || 'published') === 'published');
    }

    // Category filter
    if (filter?.category && filter.category !== 'all') {
      const cat = filter.category.toLowerCase();
      prods = prods.filter(
        (p) =>
          p.category?.toLowerCase() === cat ||
          p.categoryId?.toLowerCase() === cat ||
          p.slug.toLowerCase().includes(cat)
      );
    }

    // In-stock only
    if (filter?.inStockOnly) {
      prods = prods.filter((p) => p.inStock);
    }

    // Special badges
    if (filter?.featured) prods = prods.filter((p) => p.featured);
    if (filter?.newArrival) prods = prods.filter((p) => p.newArrival);
    if (filter?.bestSeller) prods = prods.filter((p) => p.bestSeller);

    // Search query
    if (filter?.search && filter.search.trim().length > 0) {
      const q = filter.search.toLowerCase().trim();
      prods = prods.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q)
      );
    }

    return prods.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  public getProductBySlug(slug: string): Product | null {
    this.init();
    return this.products.find((p) => p.slug === slug || p.id === slug) || null;
  }

  public getProductById(id: string): Product | null {
    this.init();
    return this.products.find((p) => p.id === id) || null;
  }

  public async saveProduct(productData: Partial<Product>): Promise<Product> {
    this.init();
    const now = new Date().toISOString();
    const id = productData.id || `av-prod-${Date.now()}`;
    const slug =
      productData.slug ||
      productData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
      id;

    const existingIndex = this.products.findIndex((p) => p.id === id);
    let updatedProduct: Product;

    // Calculate overall inStock based on variants
    const variants = productData.variants || [];
    const hasStock = variants.some((v) => (v.stockQuantity ?? 0) > 0 && v.inStock !== false);

    if (existingIndex >= 0) {
      updatedProduct = {
        ...this.products[existingIndex],
        ...productData,
        id,
        slug,
        inStock: variants.length > 0 ? hasStock : productData.inStock ?? true,
        updatedAt: now,
      };
      this.products[existingIndex] = updatedProduct;
    } else {
      updatedProduct = {
        id,
        sku: productData.sku || `AV-${Math.floor(100000 + Math.random() * 900000)}`,
        name: productData.name || 'Untitled Product',
        slug,
        description: productData.description || '',
        price: productData.price || 0,
        compareAtPrice: productData.compareAtPrice,
        category: productData.category || 'dresses',
        categoryId: productData.category || 'dresses',
        collection: productData.collection || '',
        images: productData.images || ['/Carousel/1.jpeg'],
        productImages: productData.productImages || [],
        availableColors: productData.availableColors || [],
        availableSizes: productData.availableSizes || ['S', 'M', 'L'],
        variants: variants,
        inStock: variants.length > 0 ? hasStock : productData.inStock ?? true,
        featured: productData.featured ?? false,
        newArrival: productData.newArrival ?? true,
        bestSeller: productData.bestSeller ?? false,
        fabric: productData.fabric || '',
        care: productData.care || [],
        status: productData.status || 'published',
        displayOrder: productData.displayOrder ?? this.products.length + 1,
        createdAt: now,
        updatedAt: now,
      };
      this.products.unshift(updatedProduct);
    }

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
    this.notify();

    // Sync to Supabase
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('products').upsert({
          id: updatedProduct.id,
          sku: updatedProduct.sku,
          name: updatedProduct.name,
          slug: updatedProduct.slug,
          description: updatedProduct.description,
          price: updatedProduct.price,
          compare_at_price: updatedProduct.compareAtPrice,
          category_id: updatedProduct.category,
          collection: updatedProduct.collection,
          fabric: updatedProduct.fabric,
          care: updatedProduct.care,
          in_stock: updatedProduct.inStock,
          featured: updatedProduct.featured,
          new_arrival: updatedProduct.newArrival,
          best_seller: updatedProduct.bestSeller,
          status: updatedProduct.status,
          display_order: updatedProduct.displayOrder,
          updated_at: updatedProduct.updatedAt,
        });

        // Upsert images
        if (updatedProduct.images && updatedProduct.images.length > 0) {
          await supabase.from('product_images').delete().eq('product_id', updatedProduct.id);
          const imagesToInsert = updatedProduct.images.map((img, i) => ({
            product_id: updatedProduct.id,
            image_url: img,
            alt_text: updatedProduct.name,
            is_primary: i === 0,
            display_order: i + 1,
            view_type: i === 0 ? 'front' : 'side',
          }));
          await supabase.from('product_images').insert(imagesToInsert);
        }

        // Upsert variants
        if (updatedProduct.variants && updatedProduct.variants.length > 0) {
          await supabase.from('product_variants').delete().eq('product_id', updatedProduct.id);
          const variantsToInsert = updatedProduct.variants.map((v) => ({
            product_id: updatedProduct.id,
            size: v.size,
            color_name: v.color,
            color_hex: v.colorHex || '#333333',
            stock_quantity: v.stockQuantity,
            in_stock: v.stockQuantity > 0,
            sku: v.sku,
          }));
          await supabase.from('product_variants').insert(variantsToInsert);
        }
      } catch (err) {
        console.error('Failed to sync product to Supabase:', err);
      }
    }

    return updatedProduct;
  }

  public async duplicateProduct(id: string): Promise<Product> {
    this.init();
    const source = this.getProductById(id);
    if (!source) throw new Error('Product not found');

    const newId = `av-prod-${Date.now()}`;
    const newSku = `AV-${Math.floor(100000 + Math.random() * 900000)}`;
    const newName = `${source.name} (Copy)`;
    const newSlug = `${source.slug}-copy-${Math.floor(Math.random() * 1000)}`;

    const duplicated: Product = {
      ...source,
      id: newId,
      sku: newSku,
      name: newName,
      slug: newSlug,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      variants: source.variants.map((v) => ({
        ...v,
        id: `var-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        sku: `${newSku}-${v.size}`,
      })),
    };

    this.products.unshift(duplicated);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
    this.notify();

    if (isSupabaseConfigured() && supabase) {
      await this.saveProduct(duplicated);
    }

    return duplicated;
  }

  public async archiveProduct(id: string): Promise<Product> {
    this.init();
    const prod = this.getProductById(id);
    if (!prod) throw new Error('Product not found');

    return this.saveProduct({ ...prod, status: 'archived' });
  }

  public async deleteProduct(id: string): Promise<void> {
    this.init();
    this.products = this.products.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
    this.notify();

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('product_images').delete().eq('product_id', id);
        await supabase.from('product_variants').delete().eq('product_id', id);
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete product from Supabase:', err);
      }
    }
  }

  public async updateProductStock(
    productId: string,
    variantIdentifier: { size: string; color: string },
    newQuantity: number
  ): Promise<void> {
    this.init();
    const prod = this.getProductById(productId);
    if (!prod) throw new Error('Product not found');

    const updatedVariants = prod.variants.map((v) => {
      if (v.size === variantIdentifier.size && v.color === variantIdentifier.color) {
        const qty = Math.max(0, newQuantity);
        return {
          ...v,
          stockQuantity: qty,
          inStock: qty > 0,
        };
      }
      return v;
    });

    const hasStock = updatedVariants.some((v) => (v.stockQuantity ?? 0) > 0);

    const updatedProduct = {
      ...prod,
      variants: updatedVariants,
      inStock: hasStock,
      updatedAt: new Date().toISOString(),
    };

    const idx = this.products.findIndex((p) => p.id === productId);
    if (idx >= 0) {
      this.products[idx] = updatedProduct;
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
      this.notify();
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase
          .from('product_variants')
          .update({
            stock_quantity: Math.max(0, newQuantity),
            in_stock: newQuantity > 0,
            updated_at: new Date().toISOString(),
          })
          .eq('product_id', productId)
          .eq('size', variantIdentifier.size)
          .eq('color_name', variantIdentifier.color);

        await supabase
          .from('products')
          .update({ in_stock: hasStock, updated_at: new Date().toISOString() })
          .eq('id', productId);
      } catch (err) {
        console.error('Failed to update variant stock on Supabase:', err);
      }
    }
  }

  // ================= BANNERS =================

  public getBanners(includeInactive = false): HomepageBanner[] {
    this.init();
    const banners = includeInactive ? this.banners : this.banners.filter((b) => b.isActive);
    return [...banners].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public async saveBanner(bannerData: Partial<HomepageBanner>): Promise<HomepageBanner> {
    this.init();
    const id = bannerData.id || `banner-${Date.now()}`;
    const existingIndex = this.banners.findIndex((b) => b.id === id);
    let updatedBanner: HomepageBanner;

    if (existingIndex >= 0) {
      updatedBanner = {
        ...this.banners[existingIndex],
        ...bannerData,
        id,
      };
      this.banners[existingIndex] = updatedBanner;
    } else {
      updatedBanner = {
        id,
        title: bannerData.title || 'Featured Collection',
        image: bannerData.image || '/Carousel/1.jpeg',
        mobileImage: bannerData.mobileImage,
        link: bannerData.link || '/shop',
        displayOrder: bannerData.displayOrder ?? this.banners.length + 1,
        isActive: bannerData.isActive ?? true,
        alt: bannerData.alt || 'AMORA VOGUE Banner',
        createdAt: new Date().toISOString(),
      };
      this.banners.push(updatedBanner);
    }

    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(this.banners));
    this.notify();

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('homepage_banners').upsert({
          id: updatedBanner.id,
          title: updatedBanner.title,
          image_url: updatedBanner.image,
          mobile_image_url: updatedBanner.mobileImage,
          link: updatedBanner.link,
          display_order: updatedBanner.displayOrder,
          is_active: updatedBanner.isActive,
          alt_text: updatedBanner.alt,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Failed to sync banner to Supabase:', err);
      }
    }

    return updatedBanner;
  }

  public async deleteBanner(id: string): Promise<void> {
    this.init();
    this.banners = this.banners.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(this.banners));
    this.notify();

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('homepage_banners').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete banner on Supabase:', err);
      }
    }
  }

  public async reorderBanners(orderedIds: string[]): Promise<void> {
    this.init();
    this.banners = this.banners.map((b) => {
      const idx = orderedIds.indexOf(b.id);
      if (idx >= 0) {
        return { ...b, displayOrder: idx + 1 };
      }
      return b;
    });

    this.banners.sort((a, b) => a.displayOrder - b.displayOrder);
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(this.banners));
    this.notify();

    if (isSupabaseConfigured() && supabase) {
      try {
        for (const banner of this.banners) {
          await supabase.from('homepage_banners').update({ display_order: banner.displayOrder }).eq('id', banner.id);
        }
      } catch (err) {
        console.error('Failed to reorder banners on Supabase:', err);
      }
    }
  }

  // ================= SETTINGS =================

  public getStoreSettings(): StoreSettings {
    this.init();
    return { ...this.settings };
  }

  public async updateStoreSettings(newSettings: Partial<StoreSettings>): Promise<StoreSettings> {
    this.init();
    this.settings = {
      ...this.settings,
      ...newSettings,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
    this.notify();

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('store_settings').upsert({
          key: 'general',
          value: this.settings,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Failed to sync store settings to Supabase:', err);
      }
    }

    return { ...this.settings };
  }

  // ================= METRICS =================

  public getDashboardMetrics(): DashboardMetrics {
    this.init();
    const prods = this.products;

    let totalProducts = prods.length;
    let publishedProducts = 0;
    let draftProducts = 0;
    let archivedProducts = 0;
    let inStockProducts = 0;
    let outOfStockProducts = 0;
    let lowStockProducts = 0;
    let newArrivals = 0;
    let bestSellers = 0;

    prods.forEach((p) => {
      const status = p.status || 'published';
      if (status === 'published') publishedProducts++;
      else if (status === 'draft') draftProducts++;
      else if (status === 'archived') archivedProducts++;

      if (p.newArrival) newArrivals++;
      if (p.bestSeller) bestSellers++;

      // Check total variant inventory
      const totalStock = p.variants?.reduce((sum, v) => sum + (v.stockQuantity || 0), 0) ?? (p.inStock ? 10 : 0);
      if (totalStock === 0 || !p.inStock) {
        outOfStockProducts++;
      } else if (totalStock <= 5) {
        lowStockProducts++;
        inStockProducts++;
      } else {
        inStockProducts++;
      }
    });

    return {
      totalProducts,
      publishedProducts,
      draftProducts,
      archivedProducts,
      totalCategories: this.categories.length,
      inStockProducts,
      outOfStockProducts,
      lowStockProducts,
      newArrivals,
      bestSellers,
    };
  }
}

export const storeService = new StoreService();
