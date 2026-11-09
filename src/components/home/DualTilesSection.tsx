import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface TileItem {
  id: number;
  image: string;
  alt: string;
  buttonLabel: string;
  subtitle: string;
  link: string;
}

const TILES: TileItem[] = [
  {
    id: 1,
    image: '/4images/tile-1-fabric-floral.jpeg',
    alt: 'AMORA VOGUE Botanical Noir Floral Detail',
    buttonLabel: 'DRESSES',
    subtitle: 'THE NOIR BOTANICAL EDIT',
    link: '/product/noir-botanical-floral-sleeveless-midi-dress',
  },
  {
    id: 2,
    image: '/4images/tile-2-portrait-floral.jpeg',
    alt: 'AMORA VOGUE Modern Feminine Floral Portrait',
    buttonLabel: 'NEW ARRIVALS',
    subtitle: 'TIMELESS SILHOUETTES',
    link: '/product/noir-botanical-floral-sleeveless-midi-dress',
  },
  {
    id: 3,
    image: '/4images/tile-3-fabric-geometric.jpeg',
    alt: 'AMORA VOGUE Modernist Geometric Earth Tone Drape',
    buttonLabel: 'CASUAL WEAR',
    subtitle: 'EARTH & GEOMETRY',
    link: '/product/contemporary-geometric-abstract-shift-dress',
  },
  {
    id: 4,
    image: '/4images/tile-4-portrait-geometric.jpeg',
    alt: 'AMORA VOGUE Contemporary Shift Dress Model Portrait',
    buttonLabel: 'BEST SELLERS',
    subtitle: 'CONTEMPORARY POISE',
    link: '/product/contemporary-geometric-abstract-shift-dress',
  },
];

export const DualTilesSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-1 md:py-2">
      {/* 
        2x2 Edge-to-Edge Big Fashion Tiles Grid
        Inspired directly by GFLOCK Sri Lanka's full-bleed dual tiles section
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-1.5 w-full">
        {TILES.map((tile) => (
          <Link
            key={tile.id}
            to={tile.link}
            className="group relative block w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden bg-ivory focus:outline-none"
          >
            {/* Tile Photograph */}
            <img
              src={tile.image}
              alt={tile.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Gradient Shadow for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

            {/* Centered Outlined Action Button (GFLOCK Signature Style) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="transform transition-all duration-300 group-hover:-translate-y-1">
                <span className="hidden sm:block text-[10px] md:text-xs tracking-[0.25em] uppercase text-ivory/90 font-medium mb-2 drop-shadow-sm">
                  {tile.subtitle}
                </span>
                <span className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-white/90 hover:bg-white text-charcoal group-hover:bg-olive group-hover:text-ivory backdrop-blur-xs text-xs sm:text-sm tracking-[0.22em] uppercase font-semibold border border-white/60 shadow-md transition-all duration-300">
                  <span>{tile.buttonLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>
            </div>

            {/* 
              Brand Watermark in Bottom-Right Corner
              Directly reproducing the GFLOCK watermark layout with AMORA VOGUE
            */}
            <div className="absolute bottom-4 right-5 sm:bottom-6 sm:right-7 z-10 pointer-events-none select-none">
              <div className="flex items-center gap-1.5 text-white/80 drop-shadow-md">
                <span className="font-editorial text-lg sm:text-2xl md:text-3xl tracking-[0.22em] uppercase font-light">
                  AMORA VOGUE
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
