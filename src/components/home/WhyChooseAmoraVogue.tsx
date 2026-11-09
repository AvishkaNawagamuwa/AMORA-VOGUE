import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Panel {
  id: string;
  order: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  link: string;
  objectPosition: string;
}

const PANELS: Panel[] = [
  {
    id: 'panel-1',
    order: '01',
    title: 'Signature Confidence',
    description: 'Designed to celebrate everyday feminine poise, tailored with clean structure, modest lapels, and timeless Sri Lankan charm.',
    image: '/amora_blue_dress_6_poses/03_hand_on_hip.jpg',
    alt: 'AMORA VOGUE signature blue sleeveless button-down A-line dress - front confidence pose',
    link: '/category/dresses',
    objectPosition: 'center 10%',
  },
  {
    id: 'panel-2',
    order: '02',
    title: 'Flattering Tailored Silhouette',
    description: 'Crafted with a gently flared A-line drape and fitted bodice that accentuates your natural grace from every perspective.',
    image: '/amora_blue_dress_6_poses/02_side_pose.jpg',
    alt: 'AMORA VOGUE signature blue dress - elegant side profile pose',
    link: '/category/dresses',
    objectPosition: 'center 10%',
  },
  {
    id: 'panel-3',
    order: '03',
    title: 'Effortless Versatility',
    description: 'From university lectures to evening café dates, our breathable cotton fabrics ensure all-day comfort and easy poise.',
    image: '/amora_blue_dress_6_poses/04_hair_touch_pose.jpg',
    alt: 'AMORA VOGUE signature blue dress - candid smiling pose',
    link: '/category/dresses',
    objectPosition: 'center 10%',
  },
  {
    id: 'panel-4',
    order: '04',
    title: 'Exquisite 360° Detailing',
    description: 'Every seam, hemline, and button placket is meticulously stitched for durability, seamless elegance, and lasting quality.',
    image: '/amora_blue_dress_6_poses/05_back_pose.jpg',
    alt: 'AMORA VOGUE signature blue dress - back silhouette pose',
    link: '/category/dresses',
    objectPosition: 'center 10%',
  },
  {
    id: 'panel-5',
    order: '05',
    title: 'Flow & Natural Movement',
    description: 'Breezy, lightweight cotton weave that floats naturally with your steps, keeping you cool and radiant under the tropical sun.',
    image: '/amora_blue_dress_6_poses/06_skirt_pose.jpg',
    alt: 'AMORA VOGUE signature blue dress - flowing skirt flare pose',
    link: '/category/dresses',
    objectPosition: 'center 10%',
  },
];

export const WhyChooseAmoraVogue: React.FC = () => {
  const [activeFlippedIndex, setActiveFlippedIndex] = useState<number | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (idx: number) => {
    setActiveFlippedIndex(idx);
  };

  const handleMouseLeave = () => {
    setActiveFlippedIndex(null);
  };

  const handlePanelClick = (idx: number) => {
    setActiveFlippedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      className="py-16 sm:py-20 md:py-24 bg-white overflow-hidden border-b border-neutral-100"
      aria-label="Why choose AMORA VOGUE"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Inspired by 3C Ceylon "Why explore Sri Lanka with us?" */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-300 bg-neutral-100/70 backdrop-blur-xs text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-neutral-800 uppercase shadow-2xs mb-3">
            <Sparkles className="w-3 h-3 text-gold-dark" />
            <span>THE AMORA VOGUE PROMISE • ELEVATED SHOPPING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-neutral-900 leading-tight">
            Why choose AMORA VOGUE?
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-600 tracking-wide font-normal mt-3 max-w-xl mx-auto leading-relaxed">
            Hover or tap each panel to explore the craft, fabrics, and boutique dedication woven into every silhouette.
          </p>
        </div>

        {/* Desktop View: 5 Vertical Panels Side-by-Side with 3D Flip */}
        <div className="hidden md:flex h-[580px] lg:h-[640px] xl:h-[680px] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-neutral-950 border border-neutral-200/80">
          {PANELS.map((panel, idx) => {
            const isFlipped = activeFlippedIndex === idx;

            return (
              <div
                key={panel.id}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label={`${panel.title}: ${panel.description}`}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handlePanelClick(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePanelClick(idx);
                  }
                }}
                className={`relative flex-1 h-full cursor-pointer select-none border-r-[3px] last:border-r-0 border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-olive ${
                  isFlipped ? 'z-20' : 'z-10'
                }`}
                style={{
                  perspective: '1200px',
                  WebkitPerspective: '1200px',
                }}
              >
                {/* Inner 3D Rotating Container */}
                <div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                    willChange: 'transform',
                  }}
                >
                  {/* FRONT FACE: Crystal clear original photograph */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-900"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                    }}
                  >
                    <img
                      src={panel.image}
                      alt={panel.alt}
                      loading={idx < 2 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      style={{ objectPosition: panel.objectPosition }}
                    />

                    {/* Subtle top indicator number */}
                    <div className="absolute top-4 left-4 z-10 pointer-events-none">
                      <span className="bg-white/85 backdrop-blur-xs text-charcoal px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-widest rounded-xs border border-white/60 shadow-2xs">
                        {panel.order}
                      </span>
                    </div>

                    {/* Bottom subtle title pill on front */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                      <span className="text-white text-xs font-semibold tracking-wider uppercase drop-shadow-sm truncate">
                        {panel.title}
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE: Dark overlay, cinematic blur, and centered white description */}
                  <div
                    className="absolute inset-0 w-full h-full overflow-hidden bg-black"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {/* Underlying image with cinematic blur */}
                    <img
                      src={panel.image}
                      alt={panel.alt}
                      className="w-full h-full object-cover filter blur-[8px] scale-[1.08]"
                      style={{ objectPosition: panel.objectPosition }}
                    />

                    {/* Dark translucent overlay */}
                    <div className="absolute inset-0 bg-black/65" />

                    {/* Centered white description text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 lg:p-8 text-center select-none z-10">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-2">
                        {panel.order} • {panel.title}
                      </span>
                      <p className="text-white text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed max-w-[90%] mx-auto drop-shadow-sm">
                        {panel.description}
                      </p>

                      <Link
                        to={panel.link}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 hover:bg-white text-charcoal text-[10px] font-semibold tracking-[0.18em] uppercase transition-all rounded-xs shadow-xs"
                      >
                        <span>EXPLORE</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Touch-friendly horizontal carousel with 3D Flip */}
        <div className="md:hidden w-full">
          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-4 no-scrollbar -mx-4 px-4 touch-pan-x"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {PANELS.map((panel, idx) => {
              const isFlipped = activeFlippedIndex === idx;

              return (
                <div
                  key={panel.id}
                  onClick={() => handlePanelClick(idx)}
                  className="relative w-[78vw] sm:w-[50vw] shrink-0 h-[480px] snap-center select-none rounded-xl overflow-hidden border-[2px] border-white cursor-pointer shadow-lg bg-neutral-900"
                  style={{
                    perspective: '1200px',
                    WebkitPerspective: '1200px',
                  }}
                >
                  {/* 3D Flipper Container */}
                  <div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: 'preserve-3d',
                      WebkitTransformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      transition: 'transform 850ms cubic-bezier(0.22, 1, 0.36, 1)',
                      willChange: 'transform',
                    }}
                  >
                    {/* Front Face */}
                    <div
                      className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-900"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                      }}
                    >
                      <img
                        src={panel.image}
                        alt={panel.alt}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: panel.objectPosition }}
                      />

                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-white/90 text-charcoal px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-widest rounded-xs">
                          {panel.order}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between">
                        <span className="text-white text-xs font-semibold tracking-wider uppercase">
                          {panel.title}
                        </span>
                        <span className="text-white/80 text-[10px] tracking-widest uppercase border border-white/40 px-2 py-0.5 rounded-xs">
                          TAP TO FLIP
                        </span>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      className="absolute inset-0 w-full h-full overflow-hidden bg-black"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      <img
                        src={panel.image}
                        alt={panel.alt}
                        className="w-full h-full object-cover filter blur-[8px] scale-[1.08]"
                        style={{ objectPosition: panel.objectPosition }}
                      />
                      <div className="absolute inset-0 bg-black/65" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none z-10">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-gold font-semibold mb-2">
                          {panel.order} • {panel.title}
                        </span>
                        <p className="text-white text-sm font-normal leading-relaxed max-w-[90%] mx-auto drop-shadow-sm">
                          {panel.description}
                        </p>

                        <Link
                          to={panel.link}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 bg-white text-charcoal text-[10px] font-semibold tracking-[0.16em] uppercase rounded-xs"
                        >
                          <span>EXPLORE</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicator Dots on Mobile */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            {PANELS.map((panel, idx) => (
              <button
                key={panel.id}
                onClick={() => handlePanelClick(idx)}
                aria-label={`Go to panel ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeFlippedIndex === idx
                    ? 'w-8 bg-olive'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
