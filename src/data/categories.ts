export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: 'dresses',
    name: 'Dresses',
    slug: 'dresses',
    description: 'Effortless maxi dresses, floral silhouettes, and modern daywear.',
    image: '/Carousel/Chevron Maxi Dress in Ivory Studio.png',
    itemCount: 6,
  },
  {
    id: 'tops',
    name: 'Tops',
    slug: 'tops',
    description: 'Chic blousons, linen shirts, and elegant everyday blouses.',
    image: '/Carousel/Colorful Floral Maxi Dress Catalog Pose.png',
    itemCount: 5,
  },
  {
    id: 't-shirts',
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Soft premium cotton basics, boxy tees, and graphic silhouettes.',
    image: '/Carousel/Minimalist Abstract Pattern Dress Portrait.png',
    itemCount: 4,
  },
  {
    id: 'pants-trousers',
    name: 'Pants & Trousers',
    slug: 'pants-trousers',
    description: 'High-waisted wide-leg trousers, linen pants, and tailored culottes.',
    image: '/Carousel/Minimalist Abstract Pattern Dress Portrait.png',
    itemCount: 5,
  },
  {
    id: 'jeans',
    name: 'Jeans',
    slug: 'jeans',
    description: 'Flattering straight-leg, wide-leg, and comfort stretch denim.',
    image: '/Carousel/Chevron Maxi Dress in Ivory Studio.png',
    itemCount: 3,
  },
  {
    id: 'skirts',
    name: 'Skirts',
    slug: 'skirts',
    description: 'Pleated midi skirts, wrap skirts, and flowy bohemian layers.',
    image: '/Carousel/Colorful Floral Maxi Dress Catalog Pose.png',
    itemCount: 4,
  },
  {
    id: 'co-ord-sets',
    name: 'Co-Ord Sets',
    slug: 'co-ord-sets',
    description: 'Coordinated linen top & pant pairings for effortless styling.',
    image: '/Carousel/Chevron Maxi Dress in Ivory Studio.png',
    itemCount: 4,
  },
  {
    id: 'casual-wear',
    name: 'Casual Wear',
    slug: 'casual-wear',
    description: 'Relaxed weekend outfits made for comfort and confidence.',
    image: '/Carousel/Colorful Floral Maxi Dress Catalog Pose.png',
    itemCount: 6,
  },
];
