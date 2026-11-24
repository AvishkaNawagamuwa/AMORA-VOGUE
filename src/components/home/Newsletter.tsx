import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Instagram, Play, Pause } from 'lucide-react';
import { getWhatsAppNumber } from '../../utils/whatsapp';

export const Newsletter: React.FC = () => {
  const whatsappNum = getWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello AMORA VOGUE! I would like to join your VIP VIP style updates on WhatsApp.')}`;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Respect accessibility preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }

    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      } else if (!document.hidden && videoRef.current && isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative w-full min-h-[540px] sm:min-h-[620px] md:min-h-[680px] lg:h-[720px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-charcoal text-ivory border-t border-b border-gold/25">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover object-[center_top] pointer-events-none transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/videos/vip-preview.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Luxury Overlays */}
      {/* 1. Base dark tint gradient for readability and section blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/40 to-charcoal/85 pointer-events-none" />

      {/* 2. Radial vignette to softly focus center text without hiding the model */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(27,27,27,0.35)_0%,_rgba(27,27,27,0.75)_100%)] pointer-events-none" />

      {/* 3. Subtle backdrop blur for elegant depth */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-charcoal/60 backdrop-blur-md border border-gold/40 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[10px] md:text-xs tracking-widestPlus uppercase font-semibold text-gold-light">
            Connect & VIP Previews
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal tracking-tight text-white mb-4 drop-shadow-md">
          Stay in Style with AMORA VOGUE
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-ivory/90 max-w-xl mx-auto font-light leading-relaxed mb-8 drop-shadow-sm">
          Be the first to preview new boutique drops, limited edition releases, and special seasonal offerings directly on WhatsApp and Instagram.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 bg-olive hover:bg-olive-dark text-ivory border border-gold/40 hover:border-gold transition-all duration-300 text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2.5 shadow-lg shadow-black/40 hover:scale-[1.02] group"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Join WhatsApp VIP</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/50 text-white backdrop-blur-md transition-all duration-300 text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-2.5 shadow-lg shadow-black/30 hover:scale-[1.02] group"
          >
            <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>

      {/* Ambient Video Control */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20">
        <button
          type="button"
          onClick={togglePlay}
          className="p-2 sm:p-2.5 rounded-full bg-charcoal/60 hover:bg-charcoal/90 text-ivory/70 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-md"
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          title={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
        </button>
      </div>
    </section>
  );
};
