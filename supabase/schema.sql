-- AMORA VOGUE Database Schema for Supabase (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  show_in_nav BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories(display_order);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(100) PRIMARY KEY,
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  compare_at_price NUMERIC(10, 2),
  category_id VARCHAR(100) REFERENCES categories(id) ON DELETE RESTRICT,
  collection VARCHAR(100),
  fabric TEXT,
  care JSONB DEFAULT '[]'::jsonb,
  in_stock BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  new_arrival BOOLEAN DEFAULT FALSE,
  best_seller BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON products(new_arrival);
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(best_seller);

-- 4. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  color_name VARCHAR(100),
  view_type VARCHAR(50) DEFAULT 'front' CHECK (view_type IN ('front', 'side', 'back', 'detail')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_order ON product_images(display_order);

-- 5. PRODUCT VARIANTS TABLE
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(50) NOT NULL,
  color_name VARCHAR(100) NOT NULL,
  color_hex VARCHAR(20),
  stock_quantity INT DEFAULT 0,
  in_stock BOOLEAN DEFAULT TRUE,
  sku VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, size, color_name)
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);

-- 6. HOMEPAGE BANNERS TABLE
CREATE TABLE IF NOT EXISTS homepage_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  mobile_image_url TEXT,
  link TEXT DEFAULT '/shop',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_homepage_banners_order ON homepage_banners(display_order);

-- 7. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS store_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public can READ published products, active categories, active banners, and settings
CREATE POLICY "Public categories are readable by everyone" ON categories
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public products are readable by everyone" ON products
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public product images are readable by everyone" ON product_images
  FOR SELECT USING (TRUE);

CREATE POLICY "Public product variants are readable by everyone" ON product_variants
  FOR SELECT USING (TRUE);

CREATE POLICY "Public banners are readable by everyone" ON homepage_banners
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public store settings are readable by everyone" ON store_settings
  FOR SELECT USING (TRUE);

-- Authenticated / Service role has full CRUD
CREATE POLICY "Admin full access on categories" ON categories
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access on products" ON products
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access on product images" ON product_images
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access on product variants" ON product_variants
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access on homepage banners" ON homepage_banners
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

CREATE POLICY "Admin full access on store settings" ON store_settings
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

-- STORAGE BUCKET CONFIGURATION (Run in Supabase SQL editor)
INSERT INTO storage.buckets (id, name, public)
VALUES ('amora-assets', 'amora-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access to Amora Assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'amora-assets');

CREATE POLICY "Authenticated users can upload to Amora Assets" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'amora-assets');

CREATE POLICY "Authenticated users can update Amora Assets" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'amora-assets');

CREATE POLICY "Authenticated users can delete from Amora Assets" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'amora-assets');
