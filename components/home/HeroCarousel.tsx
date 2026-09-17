'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';
import { MessageCircle, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Truck, Video, ShieldCheck } from 'lucide-react';

interface SlideData {
  id: number;
  label: string;
  title: string;
  highlightText: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  alt: string;
  badge: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    label: 'BOUQUET OF THE MONTH',
    title: 'Handcrafted Fresh',
    highlightText: 'Red Rose Bouquets',
    subtext: 'Farm-fresh Grade-A Ecuadorian & local roses hand-tied by master florists. Includes live HD WhatsApp video preview before dispatch.',
    ctaText: 'Explore Bouquets',
    ctaLink: '/red-rose-bouquets',
    image: '/images/banners/hero-slide-1.webp',
    alt: 'Fresh red rose bouquet with black wrapping - FlowerDeliveryPK Pakistan',
    badge: 'Same-Day 2–3 Hours Delivery'
  },
  {
    id: 2,
    label: 'FEATURED LUXURY COLLECTION',
    title: 'Velvet Keepsake Boxes &',
    highlightText: 'Ferrero Hampers',
    subtext: 'Opulent flower arrangements in velvet round and heart keepsake boxes paired with Belgian chocolates, imported Ferrero Rocher & plush teddy bears.',
    ctaText: 'Shop Luxury Boxes',
    ctaLink: '/flower-boxes',
    image: '/images/banners/hero-slide-2.webp',
    alt: 'Luxury velvet flower box arrangement with fresh blossoms - FlowerDeliveryPK',
    badge: 'Anniversary & Birthday Choice'
  },
  {
    id: 3,
    label: 'CELEBRATION COMBOS',
    title: 'Artisan Bakery Cakes &',
    highlightText: 'Fresh Floral Combos',
    subtext: 'Celebrate birthdays and milestones across Pakistan with freshly baked 2 lbs chocolate fudge cakes and radiant rose bouquets in chilled express vans.',
    ctaText: 'View Cake Combos',
    ctaLink: '/cake-and-flower-combos',
    image: '/images/banners/hero-slide-3.webp',
    alt: 'Fresh rose bouquet and birthday cake combo gift set - FlowerDeliveryPK',
    badge: 'Over 10,000+ Happy Celebrations'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-slide effect every 4.5 seconds (paused on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left -> next slide
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev slide
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#FAFAFA] border-b border-[#C5A880]/25 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured Flower Collections Banner"
    >
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-[#8B1538]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Slides Container */}
        <div className="relative min-h-[500px] sm:min-h-[520px] lg:min-h-[480px]">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;

            return (
              <div
                key={slide.id}
                className={`transition-all duration-700 ease-in-out ${
                  isActive
                    ? 'opacity-100 translate-x-0 relative z-10'
                    : 'opacity-0 absolute inset-0 pointer-events-none -translate-x-4 z-0'
                }`}
                aria-hidden={!isActive}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Editorial Text & Action CTAs (Competitor lahoreblooms style) */}
                  <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
                    {/* Top Pill / Small Label */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#C5A880]/60 shadow-xs backdrop-blur-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#8B1538]" />
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#8B1538]">
                        {slide.label}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-[11px] font-medium text-stone-600">
                        {slide.badge}
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-[50px] font-bold text-[#1F1F1F] tracking-tight leading-[1.16]">
                      {slide.title}{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1538] via-[#a81c45] to-[#6e102c] block sm:inline">
                        {slide.highlightText}
                      </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      {slide.subtext}
                    </p>

                    {/* CTAs */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                      <Link
                        href={slide.ctaLink}
                        className="w-full sm:w-auto py-3.5 px-7 rounded-full bg-[#8B1538] hover:bg-[#6e102c] text-white font-semibold text-sm shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <a
                        href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(`Hi FlowerDeliveryPK! I want to inquire about "${slide.title} ${slide.highlightText}" from the homepage banner.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1faa53] text-white font-semibold text-sm shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Order on WhatsApp</span>
                      </a>
                    </div>

                    {/* Trust Micro Badges */}
                    <div className="pt-4 border-t border-[#C5A880]/25 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-stone-600">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Video className="w-4 h-4 text-[#25D366]" />
                        <span>Live Video Before Dispatch</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Truck className="w-4 h-4 text-[#8B1538]" />
                        <span>2–3h Express Delivery</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                        <span>100% Stem Freshness</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Hero Showcase Image */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/4] sm:aspect-[4/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-white group">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 420px"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                      />
                      {/* Soft Gradient Overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                      {/* Floating Quality Tag */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#C5A880]/40 shadow-lg flex items-center justify-between">
                        <div className="text-left">
                          <p className="text-[10px] uppercase tracking-wider text-[#8B1538] font-extrabold">
                            FlowerDeliveryPK Studio
                          </p>
                          <p className="text-xs font-serif font-bold text-stone-800 truncate">
                            {slide.title} {slide.highlightText}
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-[#8B1538] text-white text-[10px] font-bold">
                          Fresh Today
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Indicators & Manual Navigation (lahoreblooms.com style) */}
        <div className="mt-8 pt-4 flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-8 h-8 rounded-full bg-white/90 border border-[#C5A880]/50 hover:bg-[#8B1538] hover:text-white hover:border-[#8B1538] text-stone-700 flex items-center justify-center transition-all shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 3 Clickable Dots */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((_, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-8 h-2.5 bg-[#8B1538] shadow-sm'
                      : 'w-2.5 h-2.5 bg-[#C5A880]/50 hover:bg-[#8B1538]/60'
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-8 h-8 rounded-full bg-white/90 border border-[#C5A880]/50 hover:bg-[#8B1538] hover:text-white hover:border-[#8B1538] text-stone-700 flex items-center justify-center transition-all shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
