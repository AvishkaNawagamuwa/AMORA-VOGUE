import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  alt: string;
  link: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: '/Carousel/1.jpeg',
    alt: 'AMORA VOGUE - After Hours: A quiet statement of elegance',
    link: '/category/dresses',
  },
  {
    id: 2,
    image: '/Carousel/2.jpeg',
    alt: 'AMORA VOGUE - Elevated Lines: Grace in every detail',
    link: '/new-arrivals',
  },
  {
    id: 3,
    image: '/Carousel/3.jpeg',
    alt: 'AMORA VOGUE - Soft Poise: Where elegance meets ease',
    link: '/best-sellers',
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, totalSlides]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, totalSlides]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // Autoplay every 5 seconds, pauses when hovered
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isHovered) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (diff > swipeThreshold) {
      nextSlide();
    } else if (diff < -swipeThreshold) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      ref={containerRef}
      className="hero-carousel group relative w-full overflow-hidden select-none bg-[#f5e9e0]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="AMORA VOGUE Featured Collections Carousel"
      aria-roledescription="carousel"
    >
      {/* Slides Container - Smooth horizontal slide transition */}
      <div
        className="flex w-full"
        style={{
          transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
          transition: 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className="hero-slide relative w-full flex-shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${totalSlides}`}
          >
            {/* Clean Slide Banner without HTML overlay text */}
            <Link
              to={slide.link}
              className="block relative w-full aspect-[16/9] overflow-hidden cursor-pointer"
              tabIndex={idx === currentIndex ? 0 : -1}
              aria-label={slide.alt}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                width={2752}
                height={1536}
                loading={idx === 0 ? 'eager' : 'lazy'}
                // @ts-ignore fetchpriority for modern browser LCP optimization
                fetchpriority={idx === 0 ? 'high' : 'auto'}
                className="w-full h-full block object-cover object-center transition-transform duration-700 hover:scale-[1.01]"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows: minimal, semi-transparent, visible on hover on desktop */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/75 hover:bg-white text-charcoal flex items-center justify-center backdrop-blur-xs transition-all duration-200 opacity-80 md:opacity-0 md:group-hover:opacity-100 shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-olive/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/75 hover:bg-white text-charcoal flex items-center justify-center backdrop-blur-xs transition-all duration-200 opacity-80 md:opacity-0 md:group-hover:opacity-100 shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-olive/30"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
      </button>

      {/* Subtle bottom pagination indicators (GFLOCK inspired lines/pills) */}
      <div
        className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Carousel pagination"
      >
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full focus:outline-none ${
                isActive
                  ? 'w-7 bg-olive'
                  : 'w-2 bg-olive/30 hover:bg-olive/60'
              }`}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
};
