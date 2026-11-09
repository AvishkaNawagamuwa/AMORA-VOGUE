# AMORA VOGUE — Premium Women's Fashion Boutique

A production-ready, mobile-first women's fashion e-commerce website for **AMORA VOGUE**, inspired by the visual shopping structure of Sri Lanka's leading fashion boutiques like GFLOCK.

---

## 🌸 Brand Identity & Aesthetic
- **Official Brand Name**: **AMORA VOGUE** (always two separate words)
- **Target Audience**: Young women, university students, and fashion-conscious female customers who appreciate stylish, elegant, trendy, and affordable clothing.
- **Palette**:
  - **Ivory**: `#F8F5EB` (Backgrounds & Soft spaces)
  - **Dark Olive**: `#303915` (Primary typography & accents)
  - **Champagne Gold**: `#C8A35D` (Decorative details & highlights)
  - **White**: `#FFFFFF` (Card surfaces & contrasts)
  - **Charcoal**: `#1B1B1B` (Readability & Footers)
- **Primary Ordering Channel**: Direct WhatsApp order submission (no card payment or account creation required).

---

## 🚀 Key Features

### 1. Full-Width Homepage Hero Image Carousel
- Edge-to-edge 16:9 full-width fashion carousel positioned directly below the navbar.
- **Image-Only Specification**: Clean visual presentation without promotional slogans or cluttered overlays, featuring authentic high-resolution studio photography with models positioned naturally on the right.
- Smooth **700ms horizontal sliding transitions**.
- Automatic slide advancement every 5 seconds.
- Pause-on-hover functionality.
- Mobile touch swipe support & keyboard arrow navigation (`←` / `→`).
- Minimal semi-transparent navigation arrows and subtle bottom indicator pills.

### 2. Multi-Product "Selection Bag" Experience (No Traditional Add to Cart)
- Customers select **Color**, **Size**, and **Quantity**, then click **"SELECT THIS ITEM"**.
- Automatically groups identical variants together and increments quantity rather than creating duplicate lines.
- Slide-in drawer with live subtotal calculation and quantity adjustments (+ / -).
- Full `localStorage` persistence across page reloads.

### 3. WhatsApp Order Submission & Form Validation
- Customer completes required delivery fields: Full Name, Contact Number (with Sri Lankan 07XXXXXXXX validation), Delivery Address, City/Town, and District.
- Generates a prefilled, formatted WhatsApp message.
- Deep links via `https://wa.me/NUMBER?text=ENCODED_MESSAGE`.
- Customer reviews and manually clicks **Send** in WhatsApp.

### 4. Comprehensive Store Pages
- **Homepage** (All 12 sections: Announcement Bar, Sticky Navbar, Hero Carousel, Shop by Category, New Arrivals, Campaign Banner, Best Sellers, Shop The Look, Why Amora Vogue, Style Inspiration, Stay in Style VIP, Footer)
- **Shop All**, **New Arrivals**, **Best Sellers**
- **Category Collection Pages** (Dresses, Tops, Bottoms, Co-Ord Sets, etc.)
- **Product Details Page** (Gallery, SKU, price, size guide, fabric & care)
- **Selection Bag Page** & **WhatsApp Order Details Page**
- **Customer Care**: Delivery Information, Returns & Exchanges, Privacy Policy, Terms & Conditions, 404 Not Found.

---

## 🛠️ Technology Stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + Custom Design System
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Animations**: CSS Transitions & Keyframes

---

## 💻 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build
```

The application will be running at `http://localhost:5173/`.

---

## 📱 WhatsApp Number Configuration

Open `.env` (or set in your deployment environment):
```env
VITE_WHATSAPP_NUMBER=94771234567
```
*Note: Format the number with the country code (94 for Sri Lanka) without `+`, spaces, or leading zeroes.*

---

## 👗 Managing Products & Categories

- **Products**: Edit or add clothing items in [src/data/products.ts](file:///Users/zinexai/Desktop/Amora%20Vogue/src/data/products.ts).
- **Categories**: Modify category cards in [src/data/categories.ts](file:///Users/zinexai/Desktop/Amora%20Vogue/src/data/categories.ts).
- **Hero Carousel Slides**: Manage slides in [src/components/home/HeroCarousel.tsx](file:///Users/zinexai/Desktop/Amora%20Vogue/src/components/home/HeroCarousel.tsx).
