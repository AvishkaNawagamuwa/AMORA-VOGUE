import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ShoppingBag } from 'lucide-react';
import { useSelectionBag } from '../../context/SelectionBagContext';
import { buildDirectWhatsAppMessageLink } from '../../utils/whatsapp';

interface ShowcaseItem {
  id: string;
  orderNum: string;
  pillTag: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  price: number;
  categoryLink: string;
  colors: { name: string; hex: string }[];
  fabric: string;
  description: string;
  sku: string;
  aspectRatioClass: string;
  objectPositionClass: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'crop-top-showcase',
    orderNum: '01',
    pillTag: 'NEW EDITION • TIERED HALTER CROP TOPS',
    title: 'The Ruffle Halter Crop Top.',
    subtitle: 'Scroll to immerse yourself in 4 refreshing pastel hues crafted for tropical sunny days.',
    image: '/new/crop-top.png',
    alt: 'AMORA VOGUE tiered ruffle halter crop top in sky blue, sage green, blush pink, and pure white',
    price: 3850,
    categoryLink: '/category/tops',
    colors: [
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Sage Green', hex: '#9CAF88' },
      { name: 'Blush Pink', hex: '#F4C2C2' },
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    fabric: '100% Breathable Embroidered Cotton Voile',
    description:
      'Delicate multi-tiered ruffles with flattering halter neck silhouette and tie-back closure. Designed for effortless pairing with high-waisted denim, palazzo pants, and casual weekend ensembles.',
    sku: 'AV-CT-01',
    aspectRatioClass: 'aspect-[16/9] min-h-[340px] sm:min-h-[480px] md:min-h-[580px]',
    objectPositionClass: 'object-center',
  },
  {
    id: 'striped-shirt-showcase',
    orderNum: '02',
    pillTag: 'EVERYDAY STAPLE • OVERSIZED OXFORD STRIPES',
    title: 'The Relaxed Pinstripe Shirt.',
    subtitle: 'Scroll to explore 6 vibrant spectrum stripes tailored for chic office-to-weekend living.',
    image: '/new/striped-shirt.png',
    alt: 'AMORA VOGUE oversized striped oxford shirts in azure blue, candy pink, sunset orange, caramel, lime green, and grey',
    price: 4950,
    categoryLink: '/category/tops',
    colors: [
      { name: 'Azure Blue', hex: '#3B82F6' },
      { name: 'Candy Pink', hex: '#EC4899' },
      { name: 'Sunset Orange', hex: '#F97316' },
      { name: 'Caramel Tan', hex: '#D97706' },
      { name: 'Lime Green', hex: '#84CC16' },
      { name: 'Silver Grey', hex: '#9CA3AF' },
    ],
    fabric: '100% Crisp Pre-Washed Oxford Cotton',
    description:
      'Cut in an effortlessly modern boyfriend fit featuring crisp vertical pinstripes, classic pointed collar, cuffed sleeves, and front button placket. The ultimate versatile everyday layer.',
    sku: 'AV-SS-02',
    aspectRatioClass: 'aspect-[16/10] min-h-[380px] sm:min-h-[520px] md:min-h-[640px]',
    objectPositionClass: 'object-[center_5%]',
  },
  {
    id: 'cut-lone-frock-showcase',
    orderNum: '03',
    pillTag: 'SIGNATURE SILHOUETTE • TIERED EYELET FROCKS',
    title: 'The Cut-Loin Tiered Frock.',
    subtitle: 'Scroll to explore 5 handcrafted shades with romantic tiered flounces and delicate eyelet detailing.',
    image: '/new/cut-lone-frock.png',
    alt: 'AMORA VOGUE cut-loin tiered eyelet frocks in sage green, dusty rose, sand beige, slate blue, and petal pink',
    price: 7450,
    categoryLink: '/category/dresses',
    colors: [
      { name: 'Sage Green', hex: '#9CAF88' },
      { name: 'Dusty Rose', hex: '#BE7B72' },
      { name: 'Sand Beige', hex: '#D2B48C' },
      { name: 'Slate Blue', hex: '#6B7A8F' },
      { name: 'Petal Pink', hex: '#FAD2E1' },
    ],
    fabric: '100% Pure Embroidered Eyelet Cotton with Voile Lining',
    description:
      'Our iconic tiered cut-loin sun frock tailored with precision-gathered ruffles, comfortable camisole straps, and a flattering fitted bodice. A beloved Sri Lankan boutique silhouette.',
    sku: 'AV-CF-03',
    aspectRatioClass: 'aspect-[16/10] min-h-[380px] sm:min-h-[520px] md:min-h-[640px]',
    objectPositionClass: 'object-[center_5%]',
  },
];

interface SingleShowcaseCardProps {
  item: ShowcaseItem;
  index: number;
}

const SingleShowcaseCard: React.FC<SingleShowcaseCardProps> = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToBag } = useSelectionBag();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const whatsAppOrderUrl = buildDirectWhatsAppMessageLink(
    `Hello AMORA VOGUE, I would like to order the ${item.title} (SKU: ${item.sku}) priced at LKR ${formatPrice(item.price)}. Please share available sizes and delivery details.`
  );

  return (
    <div
      id={item.id}
      ref={cardRef}
      className={`scroll-mt-24 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-[0.97]'
      }`}
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
        {/* Heading */}
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-neutral-900">
          {item.title}
        </h3>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-neutral-600 tracking-wide font-normal mt-2 max-w-2xl mx-auto leading-relaxed">
          {item.subtitle}
        </p>
      </div>

      {/* Pop-Up Image Showcase Frame: 3C Ceylon Rounded Card Style */}
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-200/90 shadow-xl bg-white p-2 sm:p-3 group w-full">
        <div
          className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-neutral-100 w-full ${item.aspectRatioClass}`}
        >
          <img
            src={item.image}
            alt={item.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${item.objectPositionClass}`}
          />

          {/* Watermark / Brand Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
            <span className="bg-white/90 backdrop-blur-xs text-charcoal px-3 py-1 text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase border border-neutral-200/80 shadow-xs">
              AMORA VOGUE • {item.orderNum}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
            <span className="bg-charcoal/90 text-white backdrop-blur-xs px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold tracking-[0.16em] uppercase shadow-sm">
              LKR {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Details & Action Bar below the image */}
      <div className="mt-5 sm:mt-6 bg-[#FAF8F5] border border-neutral-200/80 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 w-full">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-olive uppercase">
              {item.fabric}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="text-[10px] sm:text-xs text-neutral-500 font-mono">
              SKU: {item.sku}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-2xl">
            {item.description}
          </p>

          {/* Color Palette Swatches */}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-neutral-500 uppercase mr-1">
              Colors:
            </span>
            {item.colors.map((c, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 border border-neutral-300 bg-white px-2.5 py-1 text-[9px] sm:text-[10px] font-medium tracking-wider uppercase text-neutral-800 shadow-2xs"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Buttons: Add to Bag + WhatsApp Order */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() =>
              addToBag({
                product: {
                  id: item.id,
                  sku: item.sku,
                  name: item.title,
                  slug: item.id,
                  description: item.description,
                  price: item.price,
                  category: 'showcase',
                  images: [item.image],
                  availableColors: item.colors,
                  availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
                  variants: [],
                  inStock: true,
                  featured: true,
                  newArrival: true,
                  bestSeller: true,
                  fabric: item.fabric,
                  createdAt: '2026-11-09',
                },
                size: 'M',
                color: item.colors[0]?.name || 'Standard',
                quantity: 1,
              })
            }
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-olive text-white px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase transition-colors shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD TO BAG</span>
          </button>

          <a
            href={whatsAppOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-xs font-semibold tracking-[0.16em] uppercase transition-colors shadow-xs"
            title="Instant Order on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="hidden sm:inline">ORDER ON WHATSAPP</span>
            <span className="sm:hidden">WHATSAPP</span>
          </a>

          <Link
            to={item.categoryLink}
            className="w-10 h-10 border border-neutral-300 bg-white hover:border-neutral-900 text-neutral-800 flex items-center justify-center transition-colors"
            title="Explore Collection"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ScrollShowcaseSection: React.FC = () => {
  const scrollToItem = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      className="py-14 sm:py-20 md:py-24 bg-white border-b border-neutral-100"
      aria-label="Amora Vogue Curated Fashion Showcase"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Navigation Jump Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 flex-wrap">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-neutral-500 uppercase mr-1">
            Jump to:
          </span>
          {SHOWCASE_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToItem(item.id)}
              className="px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all rounded-full shadow-2xs"
            >
              {idx + 1}. {item.title.replace('.', '')}
            </button>
          ))}
        </div>

        {/* The 3 Showcase Sections One by One */}
        <div className="space-y-16 sm:space-y-24 md:space-y-28">
          {SHOWCASE_ITEMS.map((item, index) => (
            <SingleShowcaseCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
