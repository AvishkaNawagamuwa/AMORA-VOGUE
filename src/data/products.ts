export interface ProductVariant {
  size: string;
  color: string;
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  collection?: string;
  images: string[];
  availableColors: { name: string; hex: string }[];
  availableSizes: string[];
  variants: ProductVariant[];
  inStock: boolean;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  fabric?: string;
  care?: string[];
  createdAt: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'av-flog-01',
    sku: 'AV-061101',
    name: 'Geometric Abstract Chocolate Shift Dress',
    slug: 'geometric-abstract-chocolate-shift-dress',
    description: 'Modernist abstract shift dress showcasing chocolate brown and ivory organic curved shapes. Featuring a jewel neckline, sleeveless silhouette, and breezy knee-length drape.',
    price: 6950,
    compareAtPrice: 7800,
    category: 'dresses',
    collection: 'Best Sellers',
    images: ['/flog/1/front.jpeg', '/flog/1/side.png'],
    availableColors: [
      { name: 'CHOCOLATE BROWN', hex: '#4E3629' },
      { name: 'IVORY', hex: '#FFFFF0' },
      { name: 'TERRACOTTA', hex: '#D87040' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { size: 'XS', color: 'CHOCOLATE BROWN', inStock: true, sku: 'AV-061101-XS-CB' },
      { size: 'S', color: 'CHOCOLATE BROWN', inStock: true, sku: 'AV-061101-S-CB' },
      { size: 'M', color: 'CHOCOLATE BROWN', inStock: true, sku: 'AV-061101-M-CB' },
      { size: 'L', color: 'CHOCOLATE BROWN', inStock: true, sku: 'AV-061101-L-CB' },
      { size: 'XL', color: 'CHOCOLATE BROWN', inStock: true, sku: 'AV-061101-XL-CB' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    fabric: 'Structured Linen-Cotton Weave with smooth breathable handfeel',
    care: ['Gentle cold wash', 'Medium iron on reverse', 'Do not tumble dry'],
    createdAt: '2026-11-09'
  },
  {
    id: 'av-flog-02',
    sku: 'AV-061102',
    name: 'Summer Bloom Square-Neck Pleated Midi Dress',
    slug: 'summer-bloom-square-neck-pleated-midi-dress',
    description: 'Pure ivory cotton midi dress embellished with bright violet and coral hand-painted blossoms. Structured with an elegant square neckline, wide shoulder straps, and inverted waist pleats.',
    price: 7450,
    compareAtPrice: 8400,
    category: 'dresses',
    collection: 'Best Sellers',
    images: ['/flog/2/front.jpeg', '/flog/2/side.png'],
    availableColors: [
      { name: 'WHITE/VIOLET', hex: '#8A2BE2' },
      { name: 'CORAL', hex: '#FF7043' },
      { name: 'PASTEL LILAC', hex: '#E1BEE7' }
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { size: 'S', color: 'WHITE/VIOLET', inStock: true, sku: 'AV-061102-S-WV' },
      { size: 'M', color: 'WHITE/VIOLET', inStock: true, sku: 'AV-061102-M-WV' },
      { size: 'L', color: 'WHITE/VIOLET', inStock: true, sku: 'AV-061102-L-WV' },
      { size: 'XL', color: 'WHITE/VIOLET', inStock: true, sku: 'AV-061102-XL-WV' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    fabric: '100% Pure Sateen Cotton with Slight Lustre and Cotton Lining',
    care: ['Gentle wash cold', 'Medium steam iron', 'Line dry in shade'],
    createdAt: '2026-11-09'
  },
  {
    id: 'av-flog-03',
    sku: 'AV-061103',
    name: 'Cornflower Daisy Blossom Buttoned Midi Dress',
    slug: 'cornflower-daisy-blossom-buttoned-midi-dress',
    description: 'Vintage-inspired button front midi dress in porcelain white covered in cornflower blue daisy florals. Finished with relaxed kimono sleeves, functional buttons, and a flattering fitted empire waist.',
    price: 7850,
    compareAtPrice: 8900,
    category: 'dresses',
    collection: 'Best Sellers',
    images: ['/flog/3/front.jpeg', '/flog/3/side.png'],
    availableColors: [
      { name: 'COBALT BLUE', hex: '#1E88E5' },
      { name: 'SKY BLUE', hex: '#64B5F6' },
      { name: 'PORCELAIN WHITE', hex: '#FAFAFA' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { size: 'XS', color: 'COBALT BLUE', inStock: true, sku: 'AV-061103-XS-CB' },
      { size: 'S', color: 'COBALT BLUE', inStock: true, sku: 'AV-061103-S-CB' },
      { size: 'M', color: 'COBALT BLUE', inStock: true, sku: 'AV-061103-M-CB' },
      { size: 'L', color: 'COBALT BLUE', inStock: true, sku: 'AV-061103-L-CB' },
      { size: 'XL', color: 'COBALT BLUE', inStock: true, sku: 'AV-061103-XL-CB' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    fabric: '100% Soft Washed Cotton Chambray Floral with full button front',
    care: ['Hand wash or cold machine wash', 'Line dry', 'Warm iron'],
    createdAt: '2026-11-09'
  },
  {
    id: 'av-flog-04',
    sku: 'AV-061104',
    name: 'Blush Floral Garden Tiered Smock Dress',
    slug: 'blush-floral-garden-tiered-smock-dress',
    description: 'Romantic blush pink smock dress blooming with multi-color garden florals. Designed with an easy V-neck, elbow flutter sleeves, and playful tiered flounce hemline.',
    price: 6850,
    compareAtPrice: 7650,
    category: 'dresses',
    collection: 'Best Sellers',
    images: ['/flog/4/front.jpeg', '/flog/4/side.png'],
    availableColors: [
      { name: 'BLUSH PINK', hex: '#F4C2C2' },
      { name: 'ROSE', hex: '#E08080' },
      { name: 'CREAM', hex: '#FFFDD0' }
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { size: 'S', color: 'BLUSH PINK', inStock: true, sku: 'AV-061104-S-BP' },
      { size: 'M', color: 'BLUSH PINK', inStock: true, sku: 'AV-061104-M-BP' },
      { size: 'L', color: 'BLUSH PINK', inStock: true, sku: 'AV-061104-L-BP' },
      { size: 'XL', color: 'BLUSH PINK', inStock: true, sku: 'AV-061104-XL-BP' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    fabric: 'Silky Rayon-Chiffon with Breathable Cotton Blend Underlay',
    care: ['Gentle cycle wash', 'Do not tumble dry', 'Cool iron'],
    createdAt: '2026-11-09'
  },
  {
    id: 'av-flog-05',
    sku: 'AV-061105',
    name: 'Sky Blue Oxford Pinstripe Collared Shirt Dress',
    slug: 'sky-blue-oxford-pinstripe-collared-shirt-dress',
    description: 'Crisp pinstripe collared shirt dress in powdery sky blue, finished with a neat vertical button front, handy deep side pockets, and cuffed elbow sleeves for elevated smart-casual style.',
    price: 7200,
    compareAtPrice: 8100,
    category: 'dresses',
    collection: 'Best Sellers',
    images: ['/flog/5/front.jpeg', '/flog/5/side.png'],
    availableColors: [
      { name: 'SKY BLUE', hex: '#87CEEB' },
      { name: 'WHITE', hex: '#FFFFFF' },
      { name: 'NAVY', hex: '#000080' }
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { size: 'S', color: 'SKY BLUE', inStock: true, sku: 'AV-061105-S-SB' },
      { size: 'M', color: 'SKY BLUE', inStock: true, sku: 'AV-061105-M-SB' },
      { size: 'L', color: 'SKY BLUE', inStock: true, sku: 'AV-061105-L-SB' },
      { size: 'XL', color: 'SKY BLUE', inStock: true, sku: 'AV-061105-XL-SB' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    fabric: '100% Crisp Oxford Cotton Blend with fine woven pinstripes',
    care: ['Machine wash 30°C', 'Steam iron medium', 'Hang dry'],
    createdAt: '2026-11-09'
  },
  {
    id: 'av-flog-06',
    sku: 'AV-061106',
    name: 'Monochrome Botanical Gathered Babydoll Dress',
    slug: 'monochrome-botanical-gathered-babydoll-dress',
    description: 'Playful sleeveless swing mini dress in striking black and white botanical floral print. Features a round neck, relaxed armholes, and gathered babydoll tiered skirt that floats with ease.',
    price: 6450,
    compareAtPrice: 7200,
    category: 'dresses',
    collection: 'Best Sellers',
    images: ['/flog/6/front.jpeg', '/flog/6/side.png'],
    availableColors: [
      { name: 'BLACK/WHITE', hex: '#222222' },
      { name: 'MONO', hex: '#424242' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    variants: [
      { size: 'XS', color: 'BLACK/WHITE', inStock: true, sku: 'AV-061106-XS-BW' },
      { size: 'S', color: 'BLACK/WHITE', inStock: true, sku: 'AV-061106-S-BW' },
      { size: 'M', color: 'BLACK/WHITE', inStock: true, sku: 'AV-061106-M-BW' },
      { size: 'L', color: 'BLACK/WHITE', inStock: true, sku: 'AV-061106-L-BW' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    fabric: '100% Breathable Lightweight Cotton Poplin with Botanical Print',
    care: ['Machine wash cold', 'Tumble dry low', 'Warm iron'],
    createdAt: '2026-11-09'
  },
  {
    id: 'av-flog-07',
    sku: 'AV-061107',
    name: 'Heather Grey Tailored Linen Button Midi Dress',
    slug: 'heather-grey-tailored-linen-button-midi-dress',
    description: 'Tailored from natural breathable linen blend in heather grey. Features a structured notch lapel collar, full-length tortoiseshell buttons, and a gently flared A-line skirt with a tie belt.',
    price: 7150,
    compareAtPrice: 7950,
    category: 'dresses',
    collection: 'Best Sellers',
    images: ['/flog/7/front.jpeg', '/flog/7/side.png'],
    availableColors: [
      { name: 'HEATHER GREY', hex: '#9E9E9E' },
      { name: 'CHARCOAL', hex: '#333333' },
      { name: 'SAND BEIGE', hex: '#D2B48C' }
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    variants: [
      { size: 'S', color: 'HEATHER GREY', inStock: true, sku: 'AV-061107-S-HG' },
      { size: 'M', color: 'HEATHER GREY', inStock: true, sku: 'AV-061107-M-HG' },
      { size: 'L', color: 'HEATHER GREY', inStock: true, sku: 'AV-061107-L-HG' },
      { size: 'XL', color: 'HEATHER GREY', inStock: true, sku: 'AV-061107-XL-HG' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    fabric: 'Pure Cotton-Linen Weave with natural texture and cooling breathability',
    care: ['Wash cold with mild detergent', 'Hang dry in shade', 'Warm iron'],
    createdAt: '2026-11-09'
  },
  {
    id: 'av-flog-08',
    sku: 'AV-061108',
    name: 'Midnight Pleated V-Neck Waisted Crepe Midi Dress',
    slug: 'midnight-pleated-v-neck-waisted-crepe-midi-dress',
    description: 'Flattering deep V-neck midi dress in midnight black crepe with intricate front waist pin-tucks, short kimono sleeves, and button front detailing. Sleek, slimming, and versatile.',
    price: 8250,
    compareAtPrice: 9400,
    category: 'dresses',
    collection: 'Best Sellers',
    images: ['/flog/8/front.jpeg', '/flog/8/side.png'],
    availableColors: [
      { name: 'MIDNIGHT BLACK', hex: '#111111' },
      { name: 'FOREST GREEN', hex: '#1E3F20' },
      { name: 'DEEP MAROON', hex: '#800000' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { size: 'XS', color: 'MIDNIGHT BLACK', inStock: true, sku: 'AV-061108-XS-MB' },
      { size: 'S', color: 'MIDNIGHT BLACK', inStock: true, sku: 'AV-061108-S-MB' },
      { size: 'M', color: 'MIDNIGHT BLACK', inStock: true, sku: 'AV-061108-M-MB' },
      { size: 'L', color: 'MIDNIGHT BLACK', inStock: true, sku: 'AV-061108-L-MB' },
      { size: 'XL', color: 'MIDNIGHT BLACK', inStock: true, sku: 'AV-061108-XL-MB' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    fabric: 'Fine Texture Georgette Crepe with Soft Inner Lining and Pin-Tuck Details',
    care: ['Dry clean or delicate hand wash cold', 'Do not wring', 'Cool iron'],
    createdAt: '2026-11-09'
  },
  {
    id: 'av-flog-09',
    sku: 'AV-061109',
    name: 'Soft Sage Ruffled Tiered Eyelet Cotton Frock',
    slug: 'soft-sage-ruffled-tiered-eyelet-cotton-frock',
    description: 'A breathless summer silhouette cut from fine eyelet cotton in romantic soft sage. Featuring delicate tiered ruffled flounces, fitted smocked bodice, and adjustable camisole straps for sun-drenched afternoons.',
    price: 7650,
    compareAtPrice: 8500,
    category: 'dresses',
    collection: 'Best Sellers',
    images: ['/flog/9/front.png', '/flog/9/side.png'],
    availableColors: [
      { name: 'SAGE GREEN', hex: '#9CAF88' },
      { name: 'OLIVE', hex: '#556B2F' },
      { name: 'LIGHT BEIGE', hex: '#E8D8C8' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    variants: [
      { size: 'XS', color: 'SAGE GREEN', inStock: true, sku: 'AV-061109-XS-SG' },
      { size: 'S', color: 'SAGE GREEN', inStock: true, sku: 'AV-061109-S-SG' },
      { size: 'M', color: 'SAGE GREEN', inStock: true, sku: 'AV-061109-M-SG' },
      { size: 'L', color: 'SAGE GREEN', inStock: true, sku: 'AV-061109-L-SG' }
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    bestSeller: true,
    fabric: '100% Breathable Eyelet Cotton with Soft Voile Lining',
    care: ['Hand wash cold', 'Line dry in shade', 'Warm iron on reverse'],
    createdAt: '2026-11-09'
  },
  {
    id: 'av-004',
    sku: 'AV-004',
    name: 'Palazzo High-Waist Linen Trousers',
    slug: 'palazzo-high-waist-linen-trousers',
    description: 'Effortlessly tailored wide-leg palazzo trousers cut from organic breathable linen. Designed with a flattering high-rise waistband, deep slash side pockets, and gentle front pleats.',
    price: 4200,
    category: 'pants-trousers',
    collection: 'Linen Essentials',
    images: ['/Carousel/Minimalist Abstract Pattern Dress Portrait.png'],
    availableColors: [
      { name: 'Natural Oatmeal', hex: '#D7C4B7' },
      { name: 'Olive Green', hex: '#556B2F' },
      { name: 'Charcoal Black', hex: '#2B2B2B' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      { size: 'S', color: 'Natural Oatmeal', inStock: true, sku: 'AV-004-S-NO' },
      { size: 'M', color: 'Natural Oatmeal', inStock: true, sku: 'AV-004-M-NO' },
      { size: 'L', color: 'Natural Oatmeal', inStock: true, sku: 'AV-004-L-NO' }
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: false,
    fabric: '100% Organic Pure Washed Linen',
    care: ['Machine wash cold gentle', 'Line dry in shade', 'Warm iron if desired'],
    createdAt: '2026-10-25'
  },
  {
    id: 'av-005',
    sku: 'AV-005',
    name: 'Elegance Resort Linen Co-Ord Set',
    slug: 'elegance-resort-linen-co-ord-set',
    description: 'A luxurious two-piece resort ensemble featuring a boxy crop silhouette top with subtle sleeve cuffs paired with matching high-rise relaxed shorts.',
    price: 6450,
    compareAtPrice: 7200,
    category: 'co-ord-sets',
    collection: 'Resort 2026',
    images: ['/Carousel/Chevron Maxi Dress in Ivory Studio.png'],
    availableColors: [
      { name: 'Warm Terracotta', hex: '#E07A5F' },
      { name: 'Soft Cream', hex: '#F4F1DE' }
    ],
    availableSizes: ['S', 'M', 'L'],
    variants: [
      { size: 'S', color: 'Warm Terracotta', inStock: true, sku: 'AV-005-S-WT' },
      { size: 'M', color: 'Warm Terracotta', inStock: true, sku: 'AV-005-M-WT' },
      { size: 'L', color: 'Warm Terracotta', inStock: true, sku: 'AV-005-L-WT' }
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: false,
    fabric: 'Premium 70% Linen, 30% Modal blend',
    care: ['Cold hand wash or dry clean', 'Steam finish'],
    createdAt: '2026-10-22'
  },
  {
    id: 'av-006',
    sku: 'AV-006',
    name: 'Ruffled Halter Linen Crop Top',
    slug: 'ruffled-halter-linen-crop-top',
    description: 'Whimsical high-neck halter top detailed with feminine ruffled borders and open back tie strap.',
    price: 3650,
    category: 'tops',
    collection: 'Resort 2026',
    images: ['/new/crop-top.png'],
    availableColors: [
      { name: 'Lemon Drop', hex: '#FFF275' },
      { name: 'Pistachio Mint', hex: '#B8E0D2' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    variants: [
      { size: 'S', color: 'Lemon Drop', inStock: true, sku: 'AV-006-S-LD' },
      { size: 'M', color: 'Lemon Drop', inStock: true, sku: 'AV-006-M-LD' }
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    bestSeller: false,
    fabric: '100% Washed Linen',
    care: ['Cold hand wash', 'Line dry'],
    createdAt: '2026-10-28'
  }
];
